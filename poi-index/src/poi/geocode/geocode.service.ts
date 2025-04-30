import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, Repository } from 'typeorm';
import { Poi } from '../entities/poi.entity';
import { ReverseGeocodeResult } from './entities/reverse-geocode-result';

const batchSize = 250;
const concurrencyLimit = 15;

const coordinatesOffset = [
  [0.0001, 0.0001],
  [0.0001, -0.0001],
  [-0.0001, 0.0001],
  [-0.0001, -0.0001],
  [0.0005, 0.0005],
  [0.0005, -0.0005],
  [-0.0005, 0.0005],
  [-0.0005, -0.0005],
  [0.001, 0.001],
  [0.001, -0.001],
  [-0.001, 0.001],
  [-0.001, -0.001],
  [0.002, 0.002],
  [0.002, -0.002],
  [-0.002, 0.002],
  [-0.002, -0.002],
  [0.005, 0.005],
  [0.005, -0.005],
  [-0.005, 0.005],
  [-0.005, -0.005],
];

@Injectable()
export class GeocodeService {
  constructor(
    @InjectRepository(Poi)
    private poiRepository: Repository<Poi>,
  ) {}

  async deleteAllNonDutchPois() {
    await this.poiRepository.query(`
      DELETE FROM pois
      WHERE country != 'Nederland'
    `);
  }

  async deleteGeocoding() {
    await this.poiRepository.query(`
      UPDATE pois
      SET country = NULL,
          state = NULL,
          city = NULL,
          street = NULL
    `);

    console.log('Geocoding deleted from POIs');
  }

  async geocodePoisBatch() {
    const count = await this.poiRepository.count({
      where: { country: IsNull() },
    });

    console.log('POIs to geocode:', count);

    let totalProcessed = 0;

    while (true) {
      const processed = await this.geocodePois();

      totalProcessed += processed;

      console.log(
        `Processed ${processed} POIs (Total: ${totalProcessed}/${count})`,
      );

      if (processed < batchSize) break;
    }

    console.log('Geocoding complete.');
  }

  async geocodePois(): Promise<number> {
    const now = new Date();

    const pois = await this.poiRepository.find({
      where: { country: IsNull() },
      take: batchSize,
    });

    const updatedPois: Partial<Poi>[] = [];

    for (let i = 0; i < pois.length; i += concurrencyLimit) {
      const batch = pois.slice(i, i + concurrencyLimit);
      const promises = batch.map((poi) => this.reverseGeocodePoi(poi));

      const results = await Promise.all(promises);

      results.forEach((result) => {
        if (result) updatedPois.push(result);
      });
    }

    if (updatedPois.length > 0) {
      await this.poiRepository.save(updatedPois);
    }

    const then = new Date();
    const diff = then.getTime() - now.getTime();
    console.log('Time taken:', diff, 'ms');
    const timePerPoi = pois.length > 0 ? diff / pois.length : 0;
    console.log('Time per POI:', timePerPoi, 'ms');

    return pois.length;
  }

  async reverseGeocodePoi(poi: Poi): Promise<Partial<Poi> | null> {
    let [lon, lat] = poi.point.coordinates;

    let attempts = 0;
    let geocode: Partial<Poi> | null = null;

    while (geocode === null && attempts < coordinatesOffset.length) {
      geocode = await this.attemptReverseGeocodePoi(poi, lat, lon);
      if (geocode === null) {
        const offset = coordinatesOffset[attempts];
        lat += offset[0];
        lon += offset[1];
        attempts++;
      }
    }

    if (attempts > 0) {
      console.log(
        `Found geocode for POI ${poi.type} ${poi.id} after ${attempts} attempts`,
      );
      console.log('Geocode:', geocode);
    }

    return geocode;
  }

  async attemptReverseGeocodePoi(
    poi: Poi,
    lat: number,
    lon: number,
  ): Promise<Partial<Poi> | null> {
    const nominatimUrl = process.env.NOMINATIM_URL;

    const url = `${nominatimUrl}/reverse?lat=${lat}&lon=${lon}&format=geocodejson&layer=address,poi`;

    const response = await fetch(url, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });

    if (!response.ok) {
      console.warn(`Error fetching for POI ${poi.id}: ${response.statusText}`);
      return null;
    }

    const data = (await response.json()) as ReverseGeocodeResult;

    if (!data.features || data.features.length === 0) {
      console.warn(data);
      return null;
    }

    const properties = data.features[0].properties.geocoding;

    const geocode = {
      id: poi.id,
      type: poi.type,
      country: properties.country,
      state: properties.state,
      city: properties.city || properties.district || properties.name,
      street: properties.street || properties.name,
    };

    if (
      (!geocode.street || !geocode.city || !geocode.state) &&
      geocode.country === 'Nederland'
    ) {
      return null;
    }

    return geocode;
  }
}
