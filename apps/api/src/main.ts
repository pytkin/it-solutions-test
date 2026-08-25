import 'dotenv/config';
import 'reflect-metadata';

import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';
import { readEnvironment } from './environment';

async function bootstrap(): Promise<void> {
  const environment = readEnvironment();
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    credentials: false,
    origin: (
      origin: string | undefined,
      callback: (error: Error | null, allow?: boolean) => void,
    ) => {
      if (!origin || environment.corsOrigins.includes(origin)) {
        callback(null, true);
        return;
      }

      callback(new Error('Origin is not allowed by CORS.'));
    },
  });

  await app.listen(environment.port);
  Logger.log(`API is listening on port ${environment.port}.`, 'Bootstrap');
}

void bootstrap();
