import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, Not, Raw, Repository } from 'typeorm';
import { Poi } from './entities/poi.entity';
import { join } from 'path';
import { ClassificationService } from './classification/classification.service';
import { GeocodeService } from './geocode/geocode.service';
import { getName } from 'src/lib/tag-parsers/name';
import { getTypeName } from 'src/lib/tag-parsers/typeName';
import { poisFunction } from './sql/pois-function';

@Injectable()
export class PoiService {
  batchSize = 250;
  concurrencyLimit = 15;
  outputDir = './../out';
  poiDBPath = join(this.outputDir, 'pois.sqlite');

  constructor(
    @InjectRepository(Poi)
    private poiRepository: Repository<Poi>,
    private readonly classificationService: ClassificationService,
    private readonly geocodeService: GeocodeService,
    private readonly logger: Logger,
  ) {
    this.setupFunctions();
  }

  async setupFunctions() {
    try {
      await this.poiRepository.query(poisFunction);
      await this.poiRepository.query(`SELECT public.pois(0, 0, 0) as mvt`);

      this.logger.log('POI functions set up successfully.');
    } catch (error) {
      this.logger.error('Error setting up POI functions:', error);
    }
  }

  async setProcessedVersionToCurrent() {
    await this.poiRepository.query(`
      UPDATE pois
      SET "processedVersion" = "version"
      WHERE "processedVersion" IS NULL OR "processedVersion" < "version"
    `);
  }

  async processAllPois() {
    const pois = await this.poiRepository.find({
      where: [
        { processedVersion: IsNull() },
        {
          processedVersion: Raw((alias) => `${alias} < version`),
        },
      ],
    });

    this.logger.log(`Starting to process ${pois.length} POIs`);

    for (const poi of pois) {
      await this.processPoi(poi);
    }
  }

  async processPoi(poi: Poi) {
    const featureType = await this.classificationService.getPoiFeatureType(poi);

    if (!featureType) {
      await this.clearProcessedData(poi);
      this.logger.log(`${poi.id} Due to a update no feature type found`);
      return;
    }

    const geocode: Partial<Poi> | null =
      await this.geocodeService.reverseGeocodePoi(poi);

    if (!geocode) {
      await this.clearProcessedData(poi);
      this.logger.log(`${poi.id} Due to a update no geocode found`);
      return;
    }

    poi.country = geocode.country;
    poi.state = geocode.state;
    poi.city = geocode.city;
    poi.street = geocode.street;
    poi.geocodedAt = new Date();

    poi.feature = featureType;
    poi.processedVersion = poi.version;

    poi.name = getName(poi);
    poi.typeName = getTypeName(poi, featureType);

    await this.poiRepository.save(poi);

    this.logger.log(
      `${poi.type}/${poi.id} Processed with feature ${featureType.name} and geocode ${poi.street}, ${poi.city}`,
    );
  }

  async clearProcessedData(poi: Poi) {
    await this.poiRepository.query(`
      UPDATE pois
      SET "featureId" = NULL,
          "name" = NULL,
          "typeName" = NULL,
          "state" = NULL,
          "city" = NULL,
          "street" = NULL,
          "country" = NULL,
          "geocodedAt" = NULL
      WHERE id = ${poi.id}
    `);

    poi.processedVersion = poi.version;
    await this.poiRepository.save(poi);

    this.logger.log(`Cleared processed data for poi ${poi.id}`);
  }

  // async syncPoisToRemote() {
  //   this.poiRemoteRepository.delete({});

  //   const pageSize = 1000;
  //   let page = 1;
  //   let totalRecords = 0;

  //   while (true) {
  //     const pois = await this.poiRepository.find({
  //       where: {
  //         country: 'Nederland',
  //         state: Not(IsNull()),
  //         city: Not(IsNull()),
  //         street: Not(IsNull()),
  //         feature: Not(IsNull()),
  //       },
  //       order: { type: 'ASC', id: 'ASC' },
  //       relations: {
  //         feature: true,
  //       },
  //       take: pageSize,
  //       skip: (page - 1) * pageSize,
  //     });

  //     if (pois.length === 0) {
  //       break;
  //     }

  //     this.logger.log(`Found ${pois.length} pois to sync on page ${page}`);
  //     totalRecords += pois.length;

  //     await this.poiRemoteRepository.save(pois, {
  //       chunk: 1000,
  //       transaction: false,
  //     });

  //     page++;
  //   }

  //   this.logger.log(`Synchronized ${totalRecords} pois to remote database`);
  // }
}
