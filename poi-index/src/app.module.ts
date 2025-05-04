import { Logger, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { PoiModule } from './poi/poi.module';
import { FeatureModule } from './feature/feature.module';
import typeorm from './config/typeorm';
import osmPoiIndex from './config/osm-poi-index';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [typeorm, osmPoiIndex],
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        const options = configService.get<TypeOrmModuleOptions>('typeorm');
        if (!options) {
          throw new Error('TypeOrm configuration is not defined');
        }
        return options;
      },
    }),

    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      name: 'osm-poi-index',
      useFactory: async (configService: ConfigService) => {
        const options =
          configService.get<TypeOrmModuleOptions>('osm-poi-index');
        if (!options) {
          throw new Error('Write DB configuration is not defined');
        }
        return options;
      },
    }),
    PoiModule,
    FeatureModule,
  ],
  controllers: [AppController],
  providers: [AppService, Logger],
})
export class AppModule {}
