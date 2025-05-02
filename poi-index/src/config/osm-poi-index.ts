import { registerAs } from '@nestjs/config';
import { config as dotenvConfig } from 'dotenv';
import { Feature } from 'src/feature/entities/feature.entity';
import { Poi } from 'src/poi/entities/poi.entity';
import { DataSource, DataSourceOptions } from 'typeorm';

dotenvConfig({ path: '.env' });

if (process.env.NODE_ENV === 'production') {
  dotenvConfig({ path: '.env.production.local' });
}

const config = {
  type: 'postgres',
  host: `${process.env.REMOTE_DATABASE_HOST}` || 'localhost',
  port: `${process.env.REMOTE_DATABASE_PORT}`,
  username: `${process.env.REMOTE_DATABASE_USERNAME}`,
  password: `${process.env.REMOTE_DATABASE_PASSWORD}`,
  database: `${process.env.REMOTE_DATABASE_NAME}`,
  entities: [Feature, Poi],
  migrations: ['dist/migrations/*{.ts,.js}'],
  autoLoadEntities: true,
  // synchronize: process.env.NODE_ENV !== 'production',
  synchronize: false,
  logging: false,
};

export default registerAs('osm-poi-index', () => config);
export const connectionSource = new DataSource(config as DataSourceOptions);
