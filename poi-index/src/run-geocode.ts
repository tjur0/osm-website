import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AppService } from './app.service';
import { GeocodeService } from './poi/geocode/geocode.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.PORT ?? 3000);

  const appService = app.get(AppService);
  const geocodeService = app.get(GeocodeService);

  await geocodeService.waitForGeocoderAvailability();

  try {
    await appService.geocodeSetup();
  } catch (error) {
    console.error('Setup failed:', error);
    process.exit(1);
  } finally {
    await app.close();
    process.exit(0);
  }
}
bootstrap();
