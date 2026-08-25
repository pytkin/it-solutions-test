# Техническая спецификация: «Цифровая визитка Дмитрия Пыткина»

## 1. Назначение и границы

Приложение представляет Дмитрия Пыткина как Fullstack TypeScript-разработчика
и служит небольшим воспроизводимым примером TypeScript-стека. Репозиторий
содержит React-клиент, NestJS API и PostgreSQL; локальный запуск обеспечивает
Docker Compose. Облачный деплой не входит в объём.

Frontend реализован как финальная одностраничная адаптивная визитка: hero с
портретом и контактными действиями, «Обо мне», технологии, три проекта,
контакты и состояния загрузки и ошибки для данных проектов.

Вне объёма: авторизация, роли, личный кабинет, админка, CMS, формы записи,
мутации GraphQL, загрузка файлов, аналитика и облачная инфраструктура.

## 2. Граница данных

Статичные данные визитки хранятся в frontend как локальная типизированная
конфигурация `apps/web/src/config/business-card.ts`:

- имя, роль и краткое профессиональное описание;
- Telegram `@pytkin`, публичный email и телефон из предоставленного резюме;
- навыки из четырёх категорий: TypeScript, React, Vue.js, Nuxt, Vite и
  Webpack; Node.js, NestJS, GraphQL, REST API, WebSocket, OAuth 2.0 и
  Telegram Bot API; PostgreSQL, Prisma, Supabase и MongoDB; Git, GitLab CI,
  CI/CD, Docker, Nginx, Vitest, Playwright, Testcontainers, Storybook, Sentry,
  Pino, GlitchTip и AI-assisted development.

Город не добавляется в frontend, Prisma-схему или GraphQL-схему. Он не
показывается и не хранится. Контакты являются согласованными публичными
данными и поэтому намеренно находятся в локальной конфигурации, а не в
переменных окружения.

PostgreSQL хранит проекты, а API публикует только три карточки визитки:
`Seller Platform`, `Webloftdesign` и `Air Planner`.

## 3. Архитектура

```text
Браузер
  ├─ локальная типизированная конфигурация визитки
  └─ Apollo Client → POST /graphql (projects)
                         ↓
                    NestJS + Prisma
                         ↓
                    PostgreSQL
```

- `apps/web`: React 19, Vite, TypeScript, Tailwind CSS 4, Apollo Client и
  точечно используемая shadcn/ui-совместимая кнопка.
- `apps/api`: Node.js, NestJS, TypeScript, GraphQL code-first и Prisma.
- `db`: PostgreSQL с именованным volume.

Frontend получает адрес API из `VITE_GRAPHQL_URL`. В Docker используется
относительный `/graphql` и Nginx проксирует запрос на сервис `api`; в локальной
разработке используется `http://localhost:3000/graphql`.

## 4. Структура репозитория

```text
.
├── apps/
│   ├── web/
│   │   ├── src/config/business-card.ts  # статичные профиль, контакты, навыки
│   │   ├── src/features/projects/       # единственный GraphQL-документ
│   │   ├── src/lib/apollo-client.ts
│   │   ├── components.json              # заготовка shadcn/ui
│   │   └── Dockerfile
│   └── api/
│       ├── prisma/schema.prisma
│       ├── prisma/migrations/
│       ├── prisma/seed.ts
│       ├── src/projects/
│       ├── src/prisma/
│       ├── src/health/
│       └── Dockerfile
├── compose.yaml
├── .env.example
├── package.json
└── README.md
```

## 5. Модель Prisma и seed

В базе хранится единственная публичная сущность `Project`:

```prisma
model Project {
  id           String   @id @default(cuid())
  slug         String?  @unique
  title        String
  summary      String
  contribution String
  technologies String[]
  sortOrder    Int      @default(0)

  @@index([sortOrder])
}
```

`slug` — внутренний стабильный ключ для исходных записей и не публикуется в
GraphQL. Он допускает `null`, чтобы существующие дополнительные записи не
требовали искусственного значения.

`prisma/seed.ts` идемпотентно создаёт или обновляет только три исходные
записи по `slug` и не удаляет дополнительные проекты. Описание, вклад и стек
опираются на предоставленное резюме; в seed нет непроверяемых метрик или
дополнительных личных данных.

## 6. Read-only GraphQL API

Endpoint: `POST /graphql`. Схема создаётся кодом NestJS и не редактируется
вручную. Единственный бизнес-запрос:

```graphql
type Query {
  projects: [Project!]!
}

type Project {
  id: ID!
  title: String!
  summary: String!
  contribution: String!
  technologies: [String!]!
  sortOrder: Int!
}
```

Резолвер делегирует чтение сервису, который выбирает только три публичные
seed-записи по их внутренним `slug`, сортирует их по `sortOrder ASC`, затем по
`title ASC`. Дополнительные записи базы при этом не удаляются и не попадают в
публичную визитку. В схеме нет `Mutation`, `Profile`, `Contact`, `Skill`,
города или любых скрытых персональных полей. Попытка выполнить mutation
отклоняется GraphQL до обращения к резолверам.

Дополнительно API предоставляет `GET /health`, который проверяет доступность
процесса и базы. CORS разрешает только заданные локальные origins, а
`credentials` выключены.

Representative query:

```graphql
query Projects {
  projects {
    id
    title
    summary
    contribution
    technologies
    sortOrder
  }
}
```

## 7. Frontend

`BusinessCardPage` отображает публичную визитку в тёмной технической теме. В
hero находятся портрет, профиль и доступные ссылки на email и Telegram; ниже —
разделы «Обо мне», технологии, проекты и контакты. На мобильных и планшетах
портрет использует квадратный формат без обрезания лица, а на desktop
сохраняет вертикальную композицию.

Карточки проектов загружаются только через Apollo Client. Во время запроса
показываются три скелетона, а при ошибке — доступное сообщение и действие
повторной попытки. GraphQL Code Generator настроен на единственный
projects-документ; запуск `pnpm codegen` требует доступного локального API.

## 8. Docker Compose

`compose.yaml` поднимает три сервиса одной командой:

- `db`: PostgreSQL 17, volume `postgres_data` и healthcheck `pg_isready`;
- `api`: ожидает готовую базу, применяет `prisma migrate deploy`, выполняет
  идемпотентный seed и запускает NestJS;
- `web`: собирает Vite, отдаёт статику через Nginx и проксирует `/graphql` к
  `api`.

Оба Dockerfile многостадийные. `.dockerignore` исключает `.env`, зависимости,
результаты сборки и локальные артефакты. API и web выполняются непривилегированными
пользователями там, где это поддерживает базовый образ.

## 9. Переменные окружения

`.env.example` содержит безопасные значения для локальной разработки и не
содержит пользовательских контактов. Обязательные переменные API:

| Переменная         | Назначение                                    |
| ------------------ | --------------------------------------------- |
| `DATABASE_URL`     | подключение Prisma к PostgreSQL               |
| `PORT`             | порт API, по умолчанию `3000`                 |
| `CORS_ORIGIN`      | список допустимых origins через запятую       |
| `VITE_GRAPHQL_URL` | URL GraphQL при локальной frontend-разработке |

Compose формирует внутренний `DATABASE_URL` из `POSTGRES_DB`, `POSTGRES_USER`
и `POSTGRES_PASSWORD`. Файл `.env` игнорируется Git.

## 10. Проверки

Перед передачей проекта выполняются:

```bash
pnpm install
pnpm prisma:validate
pnpm typecheck
pnpm lint
pnpm build
docker compose config
docker compose up --build
```

После готовности контейнеров проверяются `GET http://localhost:3000/health` и
представленный GraphQL query. Для остановки используется `docker compose down`;
`docker compose down -v` дополнительно удалит локальный volume базы.
