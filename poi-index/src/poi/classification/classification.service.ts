import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Poi } from '../entities/poi.entity';
import { Feature } from 'src/feature/entities/feature.entity';

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
    this.logger.debug(`Found ${features.length} features`);

    for (const feature of features) {
      await this.classifyFeature(feature);
    }

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

    this.logger.log(`Found ${poiCount} pois for feature ${feature.name}`);
  }

  async constructWhereClause(feature: Feature) {
    const whereClause = `tags @> '{"${feature.key}": "${feature.value}"}'`;
    return whereClause;
  }
}
