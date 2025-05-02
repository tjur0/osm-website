import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, Not, Repository } from 'typeorm';
import { Poi } from './entities/poi.entity';
import { join } from 'path';
import { GeocodeService } from './geocode/geocode.service';
import { ExportService } from './export/export.service';
import { Feature } from 'src/feature/entities/feature.entity';
import { ClassificationService } from './classification/classification.service';
import { TagParsingService } from './tag-parsing/tag-parsing.service';

@Injectable()
export class PoiService {
  batchSize = 250;
  concurrencyLimit = 15;
  outputDir = './../out';
  poiDBPath = join(this.outputDir, 'pois.sqlite');

  constructor(
    @InjectRepository(Poi)
    private poiRepository: Repository<Poi>,
    @InjectRepository(Poi, 'osm-poi-index')
    private poiRemoteRepository: Repository<Poi>,
    @InjectRepository(Feature)
    private featureRepository: Repository<Feature>,
    @InjectRepository(Feature, 'osm-poi-index')
    private featureRemoteRepository: Repository<Feature>,
    private readonly geocodeService: GeocodeService,
    private readonly exportService: ExportService,
    private readonly classificationService: ClassificationService,
    private readonly tagParsingService: TagParsingService,
    private readonly logger: Logger,
  ) {
    this.start();
  }

  async start() {
    // await this.classificationService.classifyPois();
    // await this.geocodeService.deleteGeocoding();
    // await this.geocodeService.deleteAllNonDutchPois();
    // await this.geocodeService.geocodePoisBatch();
    // await this.tagParsingService.addNameToPoisBatch();
    // await this.tagParsingService.deleteNameFromPois();
    // await this.exportService.exportPoiDB();
    // await this.syncFeaturesToRemote();
    // await this.syncPoisToRemote();
  }

  async syncFeaturesToRemote() {
    const features = await this.featureRepository.find();

    await this.featureRemoteRepository.delete({});
    await this.featureRemoteRepository.save(features);

    this.logger.log(
      `Synchronized ${features.length} features to remote database`,
    );
  }

  async syncPoisToRemote() {
    this.poiRemoteRepository.delete({});

    const pageSize = 1000;
    let page = 1;
    let totalRecords = 0;

    while (true) {
      const pois = await this.poiRepository.find({
        where: {
          country: 'Nederland',
          state: Not(IsNull()),
          city: Not(IsNull()),
          street: Not(IsNull()),
          feature: Not(IsNull()),
          name: Not(IsNull()),
        },
        order: { type: 'ASC', id: 'ASC' },
        relations: {
          feature: true,
        },
        take: pageSize,
        skip: (page - 1) * pageSize,
      });

      if (pois.length === 0) {
        break;
      }

      this.logger.log(`Found ${pois.length} pois to sync on page ${page}`);
      totalRecords += pois.length;

      await this.poiRemoteRepository.save(pois, {
        chunk: 1000,
        transaction: false,
      });

      page++;
    }

    this.logger.log(`Synchronized ${totalRecords} pois to remote database`);
  }
}
