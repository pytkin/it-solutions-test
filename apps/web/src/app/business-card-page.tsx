import { useQuery } from '@apollo/client/react';

import portrait from '@/assets/dmitry-pytkin-portrait.jpg';
import { Button } from '@/components/ui/button';
import { businessCardConfig } from '@/config/business-card';
import { PROJECTS_QUERY } from '@/features/projects/projects.query';

const phoneHref = `tel:${businessCardConfig.contacts.phone.replace(/[^+\d]/g, '')}`;
const telegramHref = `https://t.me/${businessCardConfig.contacts.telegram.slice(1)}`;

function ContactArrow(): React.JSX.Element {
  return <span aria-hidden="true">↗</span>;
}

function ProjectCardSkeleton({ index }: { index: number }): React.JSX.Element {
  return (
    <article
      aria-label={`Загрузка проекта ${index + 1}`}
      className="rounded-2xl border border-white/[0.08] bg-white/[0.025] p-6 sm:p-7"
    >
      <div className="h-3 w-16 animate-pulse rounded bg-white/10" />
      <div className="mt-7 h-7 w-3/5 animate-pulse rounded bg-white/10" />
      <div className="mt-5 space-y-2.5">
        <div className="h-3 animate-pulse rounded bg-white/[0.07]" />
        <div className="h-3 w-11/12 animate-pulse rounded bg-white/[0.07]" />
        <div className="h-3 w-4/5 animate-pulse rounded bg-white/[0.07]" />
      </div>
      <div className="mt-8 flex gap-2">
        <div className="h-7 w-20 animate-pulse rounded-full bg-white/[0.07]" />
        <div className="h-7 w-24 animate-pulse rounded-full bg-white/[0.07]" />
      </div>
    </article>
  );
}

function ProjectsSection(): React.JSX.Element {
  const { data, error, loading, refetch } = useQuery(PROJECTS_QUERY);

  return (
    <section
      id="projects"
      aria-labelledby="projects-title"
      className="section-anchor py-20 sm:py-28"
    >
      <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="eyebrow">Из практики</p>
          <h2 id="projects-title" className="section-title mt-4">
            Проекты
            <br />
            из практики
          </h2>
        </div>
      </div>

      <div aria-busy={loading} aria-live="polite" className="mt-10">
        {loading && (
          <div className="grid gap-4 lg:grid-cols-3">
            {[0, 1, 2].map((index) => (
              <ProjectCardSkeleton key={index} index={index} />
            ))}
          </div>
        )}

        {error && !loading && (
          <div className="flex flex-col items-start gap-4 rounded-2xl border border-rose-300/20 bg-rose-300/[0.06] p-6 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="font-semibold text-rose-100">Не удалось загрузить проекты</p>
              <p className="mt-1 text-sm leading-6 text-rose-100/70">
                Проверьте подключение к API и повторите попытку
              </p>
            </div>
            <Button type="button" variant="outline" onClick={() => void refetch()}>
              Повторить
            </Button>
          </div>
        )}

        {data && !loading && !error && (
          <div className="grid gap-4 lg:grid-cols-3">
            {data.projects.map((project, index) => (
              <article
                key={project.id}
                className="group flex min-h-[30rem] flex-col rounded-2xl border border-white/[0.08] bg-white/[0.025] p-6 transition duration-300 hover:-translate-y-1 hover:border-violet-300/35 hover:bg-violet-300/[0.055] sm:p-7"
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs tracking-[0.18em] text-violet-300/80">
                    0{index + 1}
                  </span>
                  <span className="h-px w-10 bg-white/10 transition duration-300 group-hover:w-16 group-hover:bg-violet-300/70" />
                </div>
                <h3 className="mt-8 text-2xl font-semibold tracking-tight text-white">
                  {project.title}
                </h3>
                <p className="mt-4 text-sm leading-6 text-slate-300">{project.summary}</p>
                <div className="mt-6 border-l border-violet-300/50 pl-4">
                  <p className="text-xs font-medium uppercase tracking-[0.14em] text-slate-500">
                    Вклад
                  </p>
                  <p className="mt-2 text-sm leading-6 text-slate-400">{project.contribution}</p>
                </div>
                <ul
                  aria-label={`Технологии: ${project.title}`}
                  className="mt-auto flex flex-wrap gap-2 pt-7"
                >
                  {project.technologies.map((technology) => (
                    <li
                      key={technology}
                      className="rounded-full border border-white/[0.09] bg-slate-950/60 px-3 py-1.5 text-xs text-slate-300"
                    >
                      {technology}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export function BusinessCardPage(): React.JSX.Element {
  return (
    <main className="min-h-screen overflow-hidden bg-[#090b11] text-slate-100">
      <div aria-hidden="true" className="page-glow" />
      <div id="top" className="relative z-10 mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        <section className="grid min-h-screen items-center gap-12 pb-20 pt-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-20 lg:py-20">
          <div>
            <p className="eyebrow">Fullstack / TypeScript</p>
            <h1 className="mt-5 max-w-3xl text-5xl font-semibold tracking-[-0.055em] text-white sm:text-6xl lg:text-7xl">
              {businessCardConfig.fullName}
            </h1>
            <p className="mt-6 max-w-xl text-xl leading-8 text-slate-300 sm:text-2xl">
              {businessCardConfig.headline}
            </p>
            <p className="mt-6 max-w-2xl text-base leading-7 text-slate-400 sm:text-lg">
              {businessCardConfig.bio}
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <a
                href={`mailto:${businessCardConfig.contacts.email}`}
                className="button-link button-link-primary"
              >
                Написать на почту <ContactArrow />
              </a>
              <a
                href={telegramHref}
                target="_blank"
                rel="noreferrer"
                className="button-link button-link-secondary"
              >
                Telegram <ContactArrow />
              </a>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-md lg:mr-0">
            <div
              aria-hidden="true"
              className="absolute -inset-6 rounded-[2.5rem] border border-violet-300/10"
            />
            <div
              aria-hidden="true"
              className="absolute -inset-2 rounded-[2rem] bg-gradient-to-br from-violet-400/20 via-transparent to-sky-300/10 blur-2xl"
            />
            <div className="relative overflow-hidden rounded-[1.75rem] border border-white/[0.12] bg-slate-900 p-2 shadow-2xl shadow-black/40">
              <div className="relative aspect-square overflow-hidden rounded-[1.35rem] bg-slate-800 lg:aspect-[4/5]">
                <img
                  src={portrait}
                  alt="Дмитрий Пыткин"
                  className="size-full object-cover object-center saturate-[0.9] transition duration-500 hover:scale-[1.03]"
                />
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-gradient-to-t from-[#090b11]/55 via-transparent to-transparent"
                />
                <p className="absolute bottom-5 left-5 font-mono text-xs tracking-[0.16em] text-white/75">
                  FULLSTACK / TYPESCRIPT
                </p>
              </div>
            </div>
          </div>
        </section>

        <section
          id="about"
          aria-labelledby="about-title"
          className="section-anchor grid gap-10 border-t border-white/[0.08] py-20 sm:py-28 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20"
        >
          <div>
            <p className="eyebrow">Обо мне</p>
            <h2 id="about-title" className="section-title mt-4">
              Frontend
              <br />и backend
            </h2>
          </div>
          <div className="max-w-2xl">
            <p className="text-xl leading-8 text-slate-200 sm:text-2xl">
              Работал над B2B SaaS, промышленными системами, логистикой, аналитикой и сервисами
              автоматизации.
            </p>
            <p className="mt-6 max-w-xl text-base leading-7 text-slate-400">
              Использую Vue, React и Node.js; в backend работаю с NestJS, API-интеграциями и
              данными.
            </p>
          </div>
        </section>

        <section
          id="skills"
          aria-labelledby="skills-title"
          className="section-anchor border-t border-white/[0.08] py-20 sm:py-28"
        >
          <p className="eyebrow">Технологии</p>
          <div className="mt-4 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
            <h2 id="skills-title" className="section-title">
              Технологии
              <br />в работе
            </h2>
          </div>
          <ul className="mt-11 flex flex-wrap gap-2" aria-label="Навыки и технологии">
            {businessCardConfig.skills.map((skill) => (
              <li
                key={skill.name}
                className="group rounded-lg border border-white/[0.09] bg-white/[0.025] px-3 py-2 text-xs text-slate-300 transition duration-200 hover:-translate-y-0.5 hover:border-violet-300/35 hover:bg-violet-300/[0.06] hover:text-white"
              >
                <span className="mr-2 font-mono text-[10px] text-violet-300/70">//</span>
                {skill.name}
              </li>
            ))}
          </ul>
        </section>

        <ProjectsSection />

        <section
          id="contacts"
          aria-labelledby="contacts-title"
          className="section-anchor border-t border-white/[0.08] py-20 sm:py-28"
        >
          <p className="eyebrow">Контакты</p>
          <div className="mt-4 grid gap-10 lg:grid-cols-[1fr_0.9fr] lg:items-start lg:gap-20">
            <div>
              <h2 id="contacts-title" className="section-title">
                Обсудим
                <br />
                следующий проект?
              </h2>
            </div>
            <address className="not-italic">
              <ul className="divide-y divide-white/[0.08] border-y border-white/[0.08]">
                <li>
                  <a href={telegramHref} target="_blank" rel="noreferrer" className="contact-link">
                    <span>
                      <span className="block text-xs uppercase tracking-[0.14em] text-slate-500">
                        Telegram
                      </span>
                      <span className="mt-1 block text-lg font-medium text-white">
                        {businessCardConfig.contacts.telegram}
                      </span>
                    </span>
                    <ContactArrow />
                  </a>
                </li>
                <li>
                  <a href={phoneHref} className="contact-link">
                    <span>
                      <span className="block text-xs uppercase tracking-[0.14em] text-slate-500">
                        Телефон
                      </span>
                      <span className="mt-1 block text-lg font-medium text-white">
                        {businessCardConfig.contacts.phone}
                      </span>
                    </span>
                    <ContactArrow />
                  </a>
                </li>
                <li>
                  <a href={`mailto:${businessCardConfig.contacts.email}`} className="contact-link">
                    <span>
                      <span className="block text-xs uppercase tracking-[0.14em] text-slate-500">
                        Email
                      </span>
                      <span className="mt-1 block break-all text-lg font-medium text-white">
                        {businessCardConfig.contacts.email}
                      </span>
                    </span>
                    <ContactArrow />
                  </a>
                </li>
              </ul>
            </address>
          </div>
        </section>
      </div>
    </main>
  );
}
