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
  ) {}

  async seedFeatures() {
    await this.featureRepository.upsert(features, ['id']);
  }

  async calculateImportance() {
    let poiFeatureCount = 0;

    try {
      const poiFeatureCountQuery = await this.featureRepository.query(`
      SELECT COUNT(*) as "count" FROM pois p WHERE p."featureId" IS NOT NULL
    `);

      poiFeatureCount = parseInt(poiFeatureCountQuery[0].count, 10);
    } catch (error) {
      this.logger.error('Error executing query', error);
      throw error;
    }

    if (poiFeatureCount === 0) {
      this.logger.warn(
        'No features that have pois associated with them. Skipping calculation of feature importance. Did you run the classification?',
      );
      return;
    }

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
