import { Logger, Module } from '@nestjs/common';
import { PoiService } from './poi.service';
import { PoiController } from './poi.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Poi } from './entities/poi.entity';
import { ExportService } from './export/export.service';
import { GeocodeService } from './geocode/geocode.service';
import { Feature } from 'src/feature/entities/feature.entity';
import { ClassificationService } from './classification/classification.service';
import { TagParsingService } from './tag-parsing/tag-parsing.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Poi]),
    TypeOrmModule.forFeature([Feature]),
  ],
  controllers: [PoiController],
  providers: [
    PoiService,
    GeocodeService,
    TagParsingService,
    ExportService,
    ClassificationService,
    Logger,
  ],
  exports: [
    PoiService,
    GeocodeService,
    TagParsingService,
    ExportService,
    ClassificationService,
  ],
})
export class PoiModule {}
