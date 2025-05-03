import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Feature } from './entities/feature.entity';
import { features } from './seed/features';
import { calculateFeatureImportance } from './sql/calculate-feature-importace';

@Injectable()
export class FeatureService {
  constructor(
    private readonly logger: Logger,
    @InjectRepository(Feature)
    private featureRepository: Repository<Feature>,
    @InjectRepository(Feature, 'osm-poi-index')
    private featureRemoteRepository: Repository<Feature>,
  ) {
    this.start();
  }

  async start() {
    // await this.seedFeatures();
    await this.calculateImportance();
  }

  async seedFeatures() {
    await this.featureRepository.upsert(features, ['id']);
  }

  async syncFeaturesToRemote() {
    const features = await this.featureRepository.find();

    await this.featureRemoteRepository.delete({});
    await this.featureRemoteRepository.save(features);

    this.logger.log(
      `Synchronized ${features.length} features to remote database`,
    );
  }

  async calculateImportance() {
    await this.featureRepository.query(`
      UPDATE feature
      SET "importance" = NULL
    `);

    this.featureRepository.query(calculateFeatureImportance);

    this.logger.debug(
      `Calculated feature importance for all features in the database`,
    );
  }
}
