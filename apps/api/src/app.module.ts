import { ApolloDriver } from '@nestjs/apollo';
import type { ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';

import { HealthModule } from './health/health.module';
import { PrismaModule } from './prisma/prisma.module';
import { ProjectsModule } from './projects/projects.module';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
      sortSchema: true,
      playground: process.env.NODE_ENV !== 'production',
      introspection: true,
      formatError: (error) => {
        if (error.extensions?.code === 'INTERNAL_SERVER_ERROR') {
          return {
            message: 'Сервис временно недоступен.',
            path: error.path,
            extensions: { code: 'INTERNAL_SERVER_ERROR' },
          };
        }

        return error;
      },
    }),
    PrismaModule,
    ProjectsModule,
    HealthModule,
  ],
})
export class AppModule {}
