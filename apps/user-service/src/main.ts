import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common/pipes';
import { UserServiceModule } from './user-service.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    UserServiceModule, {
      transport: Transport.TCP,
      options: { 
        host: 'localhost',
        port: 3001
      }
    });
  //app.useGlobalPipes(new ValidationPipe());
  await app.listen();
}
bootstrap();
