import { NestFactory } from '@nestjs/core';
import { BusesServiceModule } from './buses-service.module';

async function bootstrap() {
  const app = await NestFactory.create(BusesServiceModule);
  await app.listen(3000);
}
bootstrap();
