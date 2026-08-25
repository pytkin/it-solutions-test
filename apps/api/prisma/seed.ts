import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const projects = [
  {
    slug: 'seller-platform',
    title: 'Seller Platform',
    summary:
      'Коммерческая B2B SaaS-платформа для поиска потенциальных клиентов, проверки и обогащения данных, рассылок и передачи заинтересованных контактов менеджерам.',
    contribution:
      'Уточнял требования и пользовательские сценарии, проектировал монорепозиторий с React-фронтендом и NestJS-бэкендом, контролировал API-контракты и процесс поставки.',
    technologies: ['React 19', 'TypeScript', 'NestJS 11', 'Node.js', 'PostgreSQL', 'Docker'],
    sortOrder: 10,
  },
  {
    slug: 'air-planner',
    title: 'Air Planner',
    summary:
      'Telegram-сервис, который преобразует ссылки, текст и изображения в проверяемые планы и синхронизирует подтверждённые события с Google Calendar.',
    contribution:
      'Сформировал требования и архитектуру NestJS-приложения, спроектировал интеграции, модель данных и обработку входящих сообщений.',
    technologies: [
      'TypeScript',
      'NestJS',
      'PostgreSQL',
      'Telegram Bot API',
      'Google Calendar API',
      'Docker',
    ],
    sortOrder: 30,
  },
  {
    slug: 'webloftdesign',
    title: 'Webloftdesign',
    summary:
      'SaaS-платформа для поиска работы и управления наймом с отдельными frontend- и backend-сервисами.',
    contribution:
      'Разрабатывал и поддерживал клиентскую и серверную части, внедрил GraphQL для обмена между frontend и backend, контейнеризировал сервисы.',
    technologies: ['React', 'Node.js', 'Koa', 'Apollo GraphQL', 'MongoDB', 'Docker'],
    sortOrder: 20,
  },
];

async function main(): Promise<void> {
  await prisma.$transaction(
    projects.map(({ slug, ...project }) =>
      prisma.project.upsert({
        where: { slug },
        update: project,
        create: { slug, ...project },
      }),
    ),
  );
}

main()
  .then(() => {
    console.info('Business-card project seed completed.');
  })
  .catch((error: unknown) => {
    console.error('Business-card project seed failed.', error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
