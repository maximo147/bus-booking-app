import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule} from '@nestjs/swagger';



async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.enableCors()
  const option = new DocumentBuilder()
    .setTitle('Bus')
    .setDescription('App de Reserva')
    .setVersion('1.0')
    .addTag('buses')
    .build();

    const document = SwaggerModule.createDocument(app, option)
    SwaggerModule.setup('api/docs', app, document, {
      explorer: true,
      swaggerOptions: {
        filter: true,
        showRequestDirection: true
      }
    })





  await app.listen(3000);
}

bootstrap();
