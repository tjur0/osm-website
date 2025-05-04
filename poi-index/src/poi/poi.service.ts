import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, Not, Repository } from 'typeorm';
import { Poi } from './entities/poi.entity';
import { join } from 'path';

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
    private readonly logger: Logger,
  ) {}

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
