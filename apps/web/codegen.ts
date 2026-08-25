import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  schema: process.env.GRAPHQL_SCHEMA_URL ?? 'http://localhost:3000/graphql',
  documents: ['src/**/*.graphql'],
  generates: {
    'src/graphql/generated/': {
      config: {
        useTypeImports: true,
      },
      preset: 'client',
      presetConfig: {
        gqlTagName: 'gql',
      },
    },
  },
};

export default config;
