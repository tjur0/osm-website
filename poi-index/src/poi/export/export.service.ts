import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, Not, Repository } from 'typeorm';
import { Poi } from '../entities/poi.entity';
import { join } from 'path';

const outputDir = './../out';
const poiDBPath = join(outputDir, 'pois.sqlite');

@Injectable()
export class ExportService {
  constructor(
    @InjectRepository(Poi)
    private poiRepository: Repository<Poi>,
  ) {}

  async makeDir() {
    const fs = await import('fs/promises');
    const path = await import('path');
    const dir = path.join(__dirname, outputDir);
    try {
      await fs.mkdir(outputDir, { recursive: true });
    } catch (err) {
      if (err.code !== 'EEXIST') {
        console.error('Error creating directory:', err);
      } else {
        console.log('Directory already exists:', dir);
      }
    }
  }

  async makeFile() {
    const fs = await import('fs/promises');
    const path = await import('path');
    const dir = path.join(__dirname, outputDir);
    try {
      await fs.writeFile(poiDBPath, '', { flag: 'wx' });
    } catch (err) {
      if (err.code !== 'EEXIST') {
        console.error('Error creating file:', err);
      } else {
        console.log('File already exists:', dir);
      }
    }
  }

  async exportPoiDB() {
    await this.makeDir();
    await this.makeFile();
    const db = new (await import('better-sqlite3'))(poiDBPath, {});

    db.pragma('journal_mode = WAL');
    db.prepare(`DROP TABLE IF EXISTS pois`).run();

    db.prepare(
      `
      CREATE TABLE IF NOT EXISTS pois (
        id INTEGER NOT NULL,
        type TEXT NOT NULL,
        feature TEXT,
        point TEXT,
        tags TEXT,
        country TEXT,
        state TEXT,
        city TEXT,
        street TEXT,
        PRIMARY KEY (id, type)
      )
    `,
    ).run();

    const pois = await this.poiRepository.find({
      where: {
        country: 'Nederland',
        state: Not(IsNull()),
        city: Not(IsNull()),
        street: Not(IsNull()),
        feature: Not(IsNull()),
        name: Not(IsNull()),
      },
      order: { type: 'ASC', id: 'ASC' },
      relations: {
        feature: true,
      },
    });

    const insert = db.prepare(`
      INSERT OR REPLACE INTO pois (id, type, feature, point, tags, country, state, city, street)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);

    for (const {
      id,
      type,
      feature,
      point,
      tags,
      country,
      state,
      city,
      street,
    } of pois) {
      insert.run(
        id,
        type,
        feature?.name,
        JSON.stringify(point.coordinates),
        JSON.stringify(tags),
        country,
        state,
        city,
        street,
      );
    }

    db.prepare(
      `
      CREATE INDEX IF NOT EXISTS idx_country_state_city_street ON pois (country, state, city, street)
    `,
    ).run();

    console.log(`Inserted ${pois.length} POIs into SQLite`);
    console.log('POI geocoding saved to SQLite');
  }
}
