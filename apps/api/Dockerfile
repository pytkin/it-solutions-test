FROM node:24-bookworm-slim AS base

RUN apt-get update \
  && apt-get install --no-install-recommends -y openssl \
  && rm -rf /var/lib/apt/lists/* \
  && corepack enable
WORKDIR /workspace

FROM base AS dependencies

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY apps/api/package.json apps/api/package.json
COPY apps/web/package.json apps/web/package.json
COPY apps/api/prisma apps/api/prisma
RUN pnpm install --frozen-lockfile

FROM dependencies AS build

COPY . .
RUN pnpm --filter @business-card/api prisma:generate
RUN pnpm --filter @business-card/api build
RUN chmod +x apps/api/docker-entrypoint.sh
RUN pnpm --filter @business-card/api deploy --legacy --prod /opt/api

FROM node:24-bookworm-slim AS production

RUN apt-get update \
  && apt-get install --no-install-recommends -y openssl \
  && rm -rf /var/lib/apt/lists/*

WORKDIR /app
COPY --from=build --chown=node:node /opt/api ./

USER node
EXPOSE 3000

CMD ["sh", "./docker-entrypoint.sh"]
