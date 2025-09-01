import { Injectable, Logger } from '@nestjs/common';
import { TagParsingService } from './poi/tag-parsing/tag-parsing.service';
import { ClassificationService } from './poi/classification/classification.service';
import { ExportService } from './poi/export/export.service';
import { GeocodeService } from './poi/geocode/geocode.service';
import { FeatureService } from './feature/feature.service';
import { PoiService } from './poi/poi.service';
import { Cron } from '@nestjs/schedule';

@Injectable()
export class AppService {
  constructor(
    private readonly featureService: FeatureService,
    private readonly poiService: PoiService,
    private readonly geocodeService: GeocodeService,
    private readonly exportService: ExportService,
    private readonly classificationService: ClassificationService,
    private readonly tagParsingService: TagParsingService,
    private readonly logger: Logger,
  ) {
    this.main();
  }

  async main() {
    await this.initalSetup();

    await this.periodicCalculation();

    await this.start();
  }

  async start() {
    while (true) {
      try {
        await this.poiService.processAllPois();
      } catch (error) {
        console.error('An error occurred during POI processing:', error);
      }

      await new Promise((resolve) => setTimeout(resolve, 10000));
    }
  }

  async initalSetup() {
    // await this.featureService.seedFeatures();
    // await this.classificationService.classifyPois();
    await this.geocodeService.geocodePoisBatch();
    await this.tagParsingService.addNameToPois();
    await this.tagParsingService.addTypeNameToPois();
    await this.poiService.setProcessedVersionToCurrent();
  }

  // things that are not poi specific, but need to be done regularly
  @Cron('0 * * * *')
  async periodicCalculation() {
    await this.featureService.calculateImportance();
    // await this.geocodeService.deleteGeocoding();
    await this.geocodeService.deleteAllNonDutchPois();
  }
}
