import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Poi } from '../entities/poi.entity';
import { Feature } from 'src/feature/entities/feature.entity';
import * as cliProgress from 'cli-progress';

@Injectable()
export class ClassificationService {
  constructor(
    @InjectRepository(Poi)
    private poiRepository: Repository<Poi>,
    @InjectRepository(Feature)
    private featureRepository: Repository<Feature>,
    private readonly logger: Logger,
  ) {}

  async classifyPois() {
    const features = await this.featureRepository.find();

    const progressBar = new cliProgress.SingleBar({
      format: `Classifying poi's | [{bar}] | ETA: {eta}s | {percentage}% | {value}/{total}`,
      barIncompleteChar: ' ',
      hideCursor: true,
      noTTYOutput: true,
    });

    progressBar.start(features.length, 0);

    for (let i = 0; i < features.length; i++) {
      await this.classifyFeature(features[i]);
      progressBar.increment();
    }

    progressBar.stop();

    this.logger.debug(`Classified all pois`);
  }

  async classifyFeature(feature: Feature) {
    await this.poiRepository.query(
      `
        UPDATE pois
        SET "featureId" = $1
        WHERE ${await this.constructWhereClause(feature)}
      `,
      [feature.id],
    );

    const poiCount = await this.poiRepository.count({
      where: { feature: feature },
    });

    // this.logger.log(`Found ${poiCount} pois for feature ${feature.name}`);
  }

  async getPoiFeatureType(poi: Poi): Promise<Feature | null> {
    const features = await this.featureRepository.find();

    for (const feature of features) {
      const whereClause = await this.constructWhereClause(feature);

      const result = await this.poiRepository.query(
        `
          SELECT * FROM pois
          WHERE ${whereClause} AND id = $1
        `,
        [poi.id],
      );

      if (result.length > 0) {
        return feature;
      }
    }

    this.logger.warn(`Could not classify poi ${poi.id}`);
    return null;
  }

  async constructWhereClause(feature: Feature) {
    return `tags @> '{"${feature.key}": "${feature.value}"}'`;
  }
}
