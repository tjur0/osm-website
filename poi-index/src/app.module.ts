import { Logger, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { PoiModule } from './poi/poi.module';
import { FeatureModule } from './feature/feature.module';
import typeorm from './config/typeorm';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [typeorm],
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
    ScheduleModule.forRoot(),
    PoiModule,
    FeatureModule,
  ],
  controllers: [AppController],
  providers: [AppService, Logger],
})
export class AppModule {}
