import { DataSource } from 'typeorm';
import { Feature } from '../feature/entities/feature.entity';
import * as fs from 'fs';
import * as path from 'path';
import { Poi } from 'src/poi/entities/poi.entity';
import { config as dotenvConfig } from 'dotenv';

dotenvConfig({ path: '.env' });

if (process.env.NODE_ENV === 'production') {
  dotenvConfig({ path: '.env.production.local' });
}

interface FeatureData {
  key: string;
  value: string;
  name: string;
}

const featuresPath = path.resolve(__dirname, './features.json');
const featuresData = JSON.parse(
  fs.readFileSync(featuresPath, 'utf8'),
) as FeatureData[];

const AppDataSource = new DataSource({
  type: 'postgres',
  host: `${process.env.DATABASE_HOST}` || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432', 10),
  username: `${process.env.DATABASE_USERNAME}`,
  password: `${process.env.DATABASE_PASSWORD}`,
  database: `${process.env.DATABASE_NAME}`,
  entities: [Feature, Poi],
  synchronize: true,
});

async function seed() {
  try {
    console.log('Initializing database connection...');
    await AppDataSource.initialize();
    console.log('Database connected successfully');

    const featureRepo = AppDataSource.getRepository(Feature);

    const filteredFeaturesData = featuresData
      .filter((feature) => feature.name)
      .sort((a, b) => {
        if (a.name < b.name) return -1;
        if (a.name > b.name) return 1;
        return 0;
      });

    console.log(`Found ${filteredFeaturesData.length} features to seed`);

    await featureRepo.delete({});

    const batchSize = 100;
    for (let i = 0; i < filteredFeaturesData.length; i += batchSize) {
      const batch = filteredFeaturesData.slice(i, i + batchSize).map((poi) => {
        return featureRepo.create({
          key: poi.key,
          value: poi.value,
          name: poi.name,
        });
      });

      await featureRepo.save(batch);
      console.log(
        `Processed ${Math.min(i + batchSize, filteredFeaturesData.length)} of ${filteredFeaturesData.length} features`,
      );
    }

    console.log('Seeding complete');
  } catch (error) {
    console.error('Error during seeding:', error);
    process.exit(1);
  } finally {
    if (AppDataSource.isInitialized) {
      await AppDataSource.destroy();
      console.log('Database connection closed');
    }
    process.exit(1);
  }
}

seed().catch((e) => {
  console.error('Unhandled error during seeding:', e);
  process.exit(1);
});
