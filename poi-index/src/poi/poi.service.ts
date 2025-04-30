import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
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
    @InjectRepository(Feature)
    private featureRepository: Repository<Feature>,
    private readonly geocodeService: GeocodeService,
    private readonly exportService: ExportService,
    private readonly classificationService: ClassificationService,
    private readonly tagParsingService: TagParsingService,
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
  }
}
