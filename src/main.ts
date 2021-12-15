import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });

  app.connectMicroservice({
    transport: Transport.KAFKA,
    options: {
      client: {
        clientId: process.env.KAFKA_CLIENT_ID,
        brokers: [process.env.KAFKA_HOST],
        ssl: process.env.KAFKA_USE_SSL === 'true',
      },
      consumer: {
        groupId: process.env.KAFKA_CONSUMER_GROUP_ID,
      },
    },
  });

  const config = new DocumentBuilder()
    .setTitle('Fincycle Documentation')
    .setDescription('Fincycle REST API docs')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/docs', app, document);

  await app.startAllMicroservices();
  await app.listen(3000);
}
bootstrap();
