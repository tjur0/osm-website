import { Logger, Module } from '@nestjs/common';
import { FeatureService } from './feature.service';
import { FeatureController } from './feature.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Feature } from './entities/feature.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Feature]),
    TypeOrmModule.forFeature([Feature], 'osm-poi-index'),
  ],
  controllers: [FeatureController],
  providers: [FeatureService, Logger],
})
export class FeatureModule {}
