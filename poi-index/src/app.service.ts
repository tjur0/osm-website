import { Injectable, Logger } from '@nestjs/common';
import { TagParsingService } from './poi/tag-parsing/tag-parsing.service';
import { ClassificationService } from './poi/classification/classification.service';
import { ExportService } from './poi/export/export.service';
import { GeocodeService } from './poi/geocode/geocode.service';
import { FeatureService } from './feature/feature.service';
import { PoiService } from './poi/poi.service';

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
    this.start();
  }

  async start() {
    await this.featureService.seedFeatures();
    await this.featureService.syncFeaturesToRemote();
    // await this.classificationService.classifyPois();
    // await this.featureService.calculateImportance();

    // await this.geocodeService.deleteGeocoding();
    // await this.geocodeService.deleteAllNonDutchPois();
    // await this.geocodeService.geocodePoisBatch();
    // await this.tagParsingService.addNameToPois();
    // await this.tagParsingService.addTypeNameToPois();
    // await this.exportService.exportPoiDB();

    await this.poiService.syncPoisToRemote();
  }
}
