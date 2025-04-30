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

  async deleteNameFromPois() {
    await this.poiRepository.query(
      `UPDATE pois SET name = NULL WHERE name IS NOT NULL`,
    );
  }

  async addNameToPoisBatch() {
    await this.poiRepository.query(
      `UPDATE pois SET name = NULL WHERE name IS NOT NULL`,
    );

    console.time('Add name to POIs');
    await this.poiRepository.query(
      `UPDATE pois p
        SET name = TRIM(
            CONCAT_WS(' ',
            COALESCE(tags->>'name:prefix', feature.name),
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
            COALESCE(tags->>'name:prefix', feature.name) IS NOT NULL
            OR tags->>'name' IS NOT NULL
            OR tags->>'name:suffix' IS NOT NULL
            OR tags->>'branch' IS NOT NULL
        );
      `,
    );

    console.timeEnd('Add name to POIs');

    // const count = await this.poiRepository.count({
    //   where: { name: IsNull(), feature: Not(IsNull()) },
    // });

    // this.logger.debug('POIs to add name:', count);

    // let totalProcessed = 0;

    // while (true) {
    //   const processed = await this.addNameToPois();

    //   totalProcessed += processed;

    //   console.log(
    //     `Processed ${processed} POIs (Total: ${totalProcessed}/${count})`,
    //   );

    //   if (processed < batchSize) break;
    // }

    // this.logger.debug('All POIs processed');
  }

  async addNameToPois(): Promise<number> {
    const now = new Date();

    const pois = await this.poiRepository.find({
      where: { name: IsNull(), feature: Not(IsNull()) },
      relations: {
        feature: true,
      },
      take: batchSize,
    });

    const updatedPois: Partial<Poi>[] = [];

    for (const poi of pois) {
      if (!poi.feature) continue;

      const name = getName(poi, false);

      if (!name) continue;

      updatedPois.push({
        id: poi.id,
        type: poi.type,
        name: name,
      });
    }

    if (updatedPois.length > 0) {
      await this.poiRepository.save(updatedPois);
    }

    const then = new Date();
    const diff = then.getTime() - now.getTime();
    console.log('Time taken:', diff, 'ms');
    const timePerPoi = pois.length > 0 ? diff / pois.length : 0;
    console.log('Time per POI:', timePerPoi, 'ms');

    return pois.length;
  }
}
