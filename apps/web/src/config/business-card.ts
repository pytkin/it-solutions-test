export interface ContactConfig {
  email: string;
  phone: string;
  telegram: string;
}

export interface SkillConfig {
  category: 'Языки и frontend' | 'Backend и API' | 'Данные' | 'Инженерные практики';
  name: string;
}

export interface BusinessCardConfig {
  bio: string;
  contacts: ContactConfig;
  fullName: string;
  headline: string;
  skills: SkillConfig[];
}

export const businessCardConfig: BusinessCardConfig = {
  fullName: 'Дмитрий Пыткин',
  headline: 'Fullstack TypeScript-разработчик',
  bio: 'Разрабатываю B2B SaaS-продукты и backend-сервисы на TypeScript',
  contacts: {
    telegram: '@pytkin',
    phone: '+7 (960) 046-37-91',
    email: 'tutbaker@gmail.com',
  },
  skills: [
    { name: 'TypeScript', category: 'Языки и frontend' },
    { name: 'React', category: 'Языки и frontend' },
    { name: 'Vue.js', category: 'Языки и frontend' },
    { name: 'Nuxt', category: 'Языки и frontend' },
    { name: 'Vite', category: 'Языки и frontend' },
    { name: 'Webpack', category: 'Языки и frontend' },
    { name: 'Node.js', category: 'Backend и API' },
    { name: 'NestJS', category: 'Backend и API' },
    { name: 'GraphQL', category: 'Backend и API' },
    { name: 'REST API', category: 'Backend и API' },
    { name: 'WebSocket', category: 'Backend и API' },
    { name: 'OAuth 2.0', category: 'Backend и API' },
    { name: 'Telegram Bot API', category: 'Backend и API' },
    { name: 'PostgreSQL', category: 'Данные' },
    { name: 'Prisma', category: 'Данные' },
    { name: 'Supabase', category: 'Данные' },
    { name: 'MongoDB', category: 'Данные' },
    { name: 'Git', category: 'Инженерные практики' },
    { name: 'GitLab CI', category: 'Инженерные практики' },
    { name: 'CI/CD', category: 'Инженерные практики' },
    { name: 'Docker', category: 'Инженерные практики' },
    { name: 'Nginx', category: 'Инженерные практики' },
    { name: 'Vitest', category: 'Инженерные практики' },
    { name: 'Playwright', category: 'Инженерные практики' },
    { name: 'Testcontainers', category: 'Инженерные практики' },
    { name: 'Storybook', category: 'Инженерные практики' },
    { name: 'Sentry', category: 'Инженерные практики' },
    { name: 'Pino', category: 'Инженерные практики' },
    { name: 'GlitchTip', category: 'Инженерные практики' },
    { name: 'AI-assisted development', category: 'Инженерные практики' },
  ],
};
