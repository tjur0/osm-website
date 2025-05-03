import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, Not, Repository } from 'typeorm';
import { Poi } from '../entities/poi.entity';
import { getName } from 'src/lib/tag-parsers/name';

const batchSize = 400;

@Injectable()
export class TagParsingService {
  constructor(
    @InjectRepository(Poi)
    private poiRepository: Repository<Poi>,
    private readonly logger: Logger,
  ) {}

  async addNameToPois() {
    await this.poiRepository.query(
      `UPDATE pois SET name = NULL WHERE name IS NOT NULL`,
    );

    await this.poiRepository.query(
      `UPDATE pois p
        SET name = TRIM(
            CONCAT_WS(' ',
                tags->>'name',
                tags->>'name:suffix',
                tags->>'branch'
            )
        )
        FROM feature
        WHERE p.name IS NULL
          AND p."featureId" IS NOT NULL
          AND feature.id = p."featureId"
          AND (
            tags->>'name' IS NOT NULL OR
            tags->>'name:suffix' IS NOT NULL OR
            tags->>'branch' IS NOT NULL
          );
      `,
    );

    this.logger.debug(`Updated pois name tag calculation`);
  }

  async addTypeNameToPois() {
    await this.poiRepository.query(
      `UPDATE pois SET "typeName" = NULL WHERE "typeName" IS NOT NULL`,
    );

    await this.poiRepository.query(
      `UPDATE pois p
        SET "typeName" = TRIM(
            COALESCE(tags->>'name:prefix', feature.name)
        )
        FROM feature
        WHERE p."typeName" IS NULL
          AND p."featureId" IS NOT NULL
          AND feature.id = p."featureId"
          AND COALESCE(tags->>'name:prefix', feature.name) IS NOT NULL;
      `,
    );

    this.logger.debug(`Updated pois type name tag calculation`);
  }
}
