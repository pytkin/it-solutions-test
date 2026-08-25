# Цифровая визитка Пыткина Дмитрия

Публичная одностраничная цифровая визитка на pnpm workspaces. Frontend
реализован на React, Tailwind CSS 4 и Apollo Client: он показывает профиль,
технологии, контакты и три проектные карточки, которые загружаются из
read-only GraphQL API.

## Архитектурная граница

- `apps/web` — React 19, Vite, TypeScript, Tailwind CSS 4, Apollo Client и
  минимальная shadcn/ui-совместимая кнопка.
- `apps/api` — NestJS, GraphQL code-first, Prisma и PostgreSQL.
- Профиль, контакты и навыки находятся в локальной типизированной
  конфигурации `apps/web/src/config/business-card.ts`.
- API публикует только три проекта визитки: Seller Platform, Webloftdesign и
  Air Planner. GraphQL предоставляет единственный read-only query `projects`.
- Seed использует внутренние уникальные `slug` и при запуске создаёт или
  обновляет только эти три исходные записи, не удаляя дополнительные проекты.
- Публичный GraphQL query `projects` возвращает только три карточки визитки;
  дополнительные записи базы остаются нетронутыми и не публикуются.
- Города нет ни в конфигурации frontend, ни в Prisma, ни в GraphQL.

## Требования

- Node.js 22.12+ и Corepack;
- pnpm 11+;
- Docker Desktop с Docker Compose для контейнерного запуска.

## Локальная разработка

```bash
corepack enable
pnpm install
cp .env.example .env
pnpm prisma:validate
pnpm typecheck
pnpm lint
pnpm build
```

Для запуска приложений без Docker PostgreSQL должен быть доступен по
`DATABASE_URL` из `.env`. Миграции и seed:

```bash
pnpm --filter @business-card/api prisma:migrate:dev
pnpm prisma:seed
pnpm --filter @business-card/api dev
pnpm --filter @business-card/web dev
```

Frontend откроется на `http://localhost:5173`, API — на
`http://localhost:3000`, GraphQL endpoint — `http://localhost:3000/graphql`.

## Docker Compose

```bash
docker compose up --build
```

После готовности сервисов:

- frontend: `http://localhost:8080`;
- API healthcheck: `http://localhost:3000/health`;
- GraphQL: `http://localhost:3000/graphql`.

Пример проверочного запроса:

```bash
curl -X POST http://localhost:3000/graphql \
  -H 'content-type: application/json' \
  --data '{"query":"query { projects { title sortOrder technologies } }"}'
```

Остановка контейнеров:

```bash
docker compose down
```

`docker compose down -v` дополнительно удалит локальный volume PostgreSQL и
все данные проектов.

## Проверки

```bash
pnpm prisma:validate
pnpm typecheck
pnpm lint
pnpm build
docker compose config
```

GraphQL Code Generator предназначен для единственного documents-запроса
проектов. При доступном API его можно запустить так:

```bash
pnpm codegen
```

## Переменные окружения

`.env.example` содержит безопасные локальные значения. Файл `.env` не
коммитится. В Docker Compose `DATABASE_URL` собирается внутри сети сервисов из
`POSTGRES_DB`, `POSTGRES_USER` и `POSTGRES_PASSWORD`; frontend использует
`/graphql` через Nginx-прокси.

Публичные контакты намеренно не являются переменными окружения: они находятся
в типизированной конфигурации frontend согласно согласованной архитектуре.
