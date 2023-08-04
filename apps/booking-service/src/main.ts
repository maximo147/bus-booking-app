import { NestFactory } from '@nestjs/core';
import { BookingServiceModule } from './booking-service.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(BookingServiceModule,{
    transport: Transport.TCP,
    options: {
      host: 'localhost',
      port: 3003
    }
  });
  await app.listen();
}
bootstrap();
