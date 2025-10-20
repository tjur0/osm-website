import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, Not, Repository } from 'typeorm';
import { Poi } from '../entities/poi.entity';
import { ReverseGeocodeResult } from './entities/reverse-geocode-result';
import * as cliProgress from 'cli-progress';

const batchSize = 50;
const concurrencyLimit = 10;
const TIMEOUT_MS = 10 * 1000; // 10 seconds

@Injectable()
export class GeocodeService {
  constructor(
    @InjectRepository(Poi)
    private poiRepository: Repository<Poi>,
    private readonly logger: Logger,
  ) {
    this.validateGeocoder();
  }

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

  async waitForGeocoderAvailability(): Promise<void> {
    if (process.env.SKIP_GEOCODER_CHECK === 'true') {
      this.logger.warn(
        'Skipping geocoder availability check as per configuration.',
      );
      return;
    }

    this.logger.log('Checking geocoding service availability...');

    while (!(await this.validateGeocoder())) {
      this.logger.log('Geocoding service not available yet');
      await new Promise((resolve) => setTimeout(resolve, TIMEOUT_MS));
    }
  }

  async validateGeocoder(): Promise<boolean> {
    const nominatimUrl = process.env.NOMINATIM_URL;
    const skipGeocoderCheck = process.env.SKIP_GEOCODER_CHECK;

    if (skipGeocoderCheck === 'true') {
      this.logger.warn('Skipping geocoder validation as per configuration.');
      return true;
    }

    if (!nominatimUrl) {
      throw new Error('NOMINATIM_URL is not defined');
    }

    try {
      const geocode = await this.getGeocode(
        `${nominatimUrl}/reverse?lat=52.70937628&lon=5.72573745&format=geocodejson`,
      );

      if (!geocode) {
        return false;
      }

      const paritalTestObject = {
        state: 'Flevoland',
        city: 'Emmeloord',
        street: 'Middelplaat',
      };

      for (const [key, value] of Object.entries(paritalTestObject)) {
        if (geocode[key as keyof Partial<Poi>] !== value) {
          return false;
        }
      }

      this.logger.debug('Geocoder validation succeeded');
      return true;
    } catch (_error) {
      return false;
    }
  }

  async geocodePoisBatch() {
    if (!process.env.NOMINATIM_URL) {
      throw new Error('NOMINATIM_URL is not defined');
    }

    if (process.env.SKIP_GEOCODING === 'true') {
      this.logger.warn('Skipping geocoding as per configuration.');
      return;
    }

    const validGeocoder = await this.validateGeocoder();
    if (!validGeocoder) {
      this.logger.error('Geocoder validation failed. Aborting geocoding.');
      return;
    }

    const count = await this.poiRepository.count({
      where: { geocodedAt: IsNull(), feature: Not(IsNull()) },
    });

    this.logger.debug(`Starting geocoding for ${count} POIs`);

    const progressBar = new cliProgress.SingleBar({
      format: `Reverse geocoding | [{bar}] | ETA: {eta}s | {percentage}% | {value}/{total}`,
      barIncompleteChar: ' ',
      hideCursor: true,
      noTTYOutput: true,
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
        const geocode = await this.reverseGeocodePoi(poi);

        if (geocode) {
          poi.geocodedAt = new Date();
          Object.assign(poi, geocode);
        }

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
    const [lon, lat] = poi.point.coordinates;

    return await this.attemptReverseGeocodePoi(poi, lat, lon);
  }

  async attemptReverseGeocodePoi(
    poi: Poi,
    lat: number,
    lon: number,
  ): Promise<Partial<Poi> | null> {
    const nominatimUrl = process.env.NOMINATIM_URL;

    if (!nominatimUrl) {
      throw new Error('NOMINATIM_URL is not defined');
    }

    const url = `${nominatimUrl}/reverse?lat=${lat}&lon=${lon}&format=geocodejson&layer=address,poi`;

    const geocode = await this.getGeocode(url);

    if (!geocode) {
      return null;
    }

    geocode.id = poi.id;
    geocode.type = poi.type;

    return geocode;
  }

  async getGeocode(url: string): Promise<Partial<Poi> | null> {
    const data = await this.fetchGeocoder(url);

    if (!data || !data.features || data.features.length === 0) {
      console.warn(data);
      return null;
    }

    const properties = data.features[0].properties.geocoding;

    const geocode = {
      country: properties.country || 'Nederland',
      state: properties.state,
      city: properties.city || properties.district,
      street: properties.street || properties.name,
    };

    return geocode;
  }

  async fetchGeocoder(url: string): Promise<ReverseGeocodeResult | null> {
    const response = await fetch(url, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });

    return (await response.json()) as ReverseGeocodeResult;
  }
}
