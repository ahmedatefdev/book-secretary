import { NestFactory } from '@nestjs/core';
import { DocumentBuilder } from '@nestjs/swagger/dist/document-builder';
import { SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const options = new DocumentBuilder()
    .setTitle('Books secretary API')
    .setDescription('api for manage books')
    .setVersion('1.0.0')
    .addBearerAuth()
    .build();
  // .addBearerAuth(
  //   { type: 'http', scheme: 'bearer', bearerFormat: 'Token' },
  //   'access-token',
  // )
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

  await app.listen(process.env.PORT || 3000);
}
bootstrap();
