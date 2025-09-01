import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, Not, Repository } from 'typeorm';
import { Poi } from '../entities/poi.entity';
import { ReverseGeocodeResult } from './entities/reverse-geocode-result';
import * as cliProgress from 'cli-progress';
import * as colors from 'ansi-colors';

const batchSize = 50;
const concurrencyLimit = 10;

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
    private readonly logger: Logger,
  ) {}

  async deleteAllNonDutchPois() {
    await this.poiRepository.query(`
      DELETE FROM pois
      WHERE country != 'Nederland'
    `);

    this.logger.debug('Deleted all non-Dutch POIs');
  }

  async deleteGeocoding() {
    await this.poiRepository.query(`
      UPDATE pois
      SET country = NULL,
          state = NULL,
          city = NULL,
          street = NULL,
          "geocodedAt" = NULL
    `);

    console.log('Geocoding deleted FROM pois');
  }

  async geocodePoisBatch() {
    const count = await this.poiRepository.count({
      where: { geocodedAt: IsNull(), feature: Not(IsNull()) },
    });

    const progressBar = new cliProgress.SingleBar({
      format: `Reverse geocoding | ${colors.cyan('{bar}')} | {percentage}% | {value}/{total}`,
      barCompleteChar: '\u2588',
      barIncompleteChar: '\u2591',
      hideCursor: true,
    });

    progressBar.start(count, 0);

    let totalProcessed = 0;

    while (true) {
      const processed = await this.geocodePois(progressBar);

      totalProcessed += processed;

      if (processed < batchSize) break;
    }

    progressBar.stop();
  }

  async geocodePois(progressBar: cliProgress.SingleBar): Promise<number> {
    const pois = await this.poiRepository.find({
      where: { geocodedAt: IsNull(), feature: Not(IsNull()) },
      take: batchSize,
    });

    if (pois.length === 0) {
      return 0;
    }

    const updatedPois: Poi[] = [];

    for (let i = 0; i < pois.length; i += concurrencyLimit) {
      const batch = pois.slice(i, i + concurrencyLimit);

      const promises = batch.map(async (poi) => {
        await this.reverseGeocodePoi(poi);

        poi.geocodedAt = new Date();
        return poi;
      });

      const results = await Promise.all(promises);

      updatedPois.push(...results);
      progressBar.increment(batch.length);
    }

    await this.poiRepository.save(updatedPois);

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
      }
      attempts++;
    }

    if (geocode === null) {
      return null;
    }

    return geocode;
  }

  async attemptReverseGeocodePoi(
    poi: Poi,
    lat: number,
    lon: number,
  ): Promise<Partial<Poi> | null> {
    const nominatimUrl = process.env.NOMINATIM_URL;

    if (!nominatimUrl) {
      console.error('NOMINATIM_URL is not defined');
      return null;
    }

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
      country: properties.country || 'Nederland',
      state: properties.state,
      city: properties.city || properties.district,
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
