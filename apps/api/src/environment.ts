export interface AppEnvironment {
  corsOrigins: string[];
  port: number;
}

function requiredValue(name: string, value: string | undefined): string {
  if (!value?.trim()) {
    throw new Error(`Missing required environment variable: ${name}`);
  }

  return value;
}

export function readEnvironment(environment = process.env): AppEnvironment {
  requiredValue('DATABASE_URL', environment.DATABASE_URL);
  const corsOrigin = requiredValue('CORS_ORIGIN', environment.CORS_ORIGIN);
  const rawPort = environment.PORT ?? '3000';
  const port = Number(rawPort);

  if (!Number.isInteger(port) || port < 1 || port > 65535) {
    throw new Error('PORT must be an integer between 1 and 65535.');
  }

  return {
    corsOrigins: corsOrigin
      .split(',')
      .map((origin) => origin.trim())
      .filter(Boolean),
    port,
  };
}
