"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

type PageKey = "home" | "services" | "portfolio" | "game" | "contacts";

const CONTACTS = {
  telegram: "https://t.me/monoalr",
  email: "musaevtamerlan35@gmail.com",
  discordServer: "https://discord.gg/KqSpDWUX",
  discordUser: "mono_alr",
};

const PRICING = [
  {
    title: "Лёгкая правка / фикс",
    price: "от $5–10",
    items: [
      "Исправить баг",
      "Небольшая доработка логики",
      "Мелкая правка UI/скрипта",
      "1–2 итерации правок",
    ],
    note: "Идеально для быстрых задач.",
  },
  {
    title: "Система / механика",
    price: "от $15–50",
    items: [
      "Комбо/боёвка/способность",
      "Состояния (блок прыжка/атаки)",
      "Эффекты/тайминги/баланс",
      "Тест и полировка",
    ],
    note: "Цена зависит от сложности и объёма.",
  },
  {
    title: "Пакет под проект",
    price: "договорная",
    items: [
      "Несколько систем",
      "UI + логика",
      "Интеграция в проект",
      "Долгосрочная поддержка",
    ],
    note: "Если проект в долгую — так выгоднее и спокойнее.",
  },
];


const SERVICES = [
  {
    title: "Разработка игровых механик",
    desc:
      "Боёвка, способности, комбо, состояния персонажа (нельзя прыгать/кастовать во время удара), " +
      "синхронизация анимаций, отбрасывания, урон, UI-логика.",
    tags: ["Roblox", "Lua", "Game Systems"],
  },
  {
    title: "3D-моделинг",
    desc:
      "Ассеты, пропсы, персонажи. Оптимизация под игру, аккуратная геометрия и подготовка к импорту.",
    tags: ["Blender", "Assets", "Optimization"],
  },
  {
    title: "Анимация / риг",
    desc: "Боевые наборы, локомоция, риг/скининг и экспорт под пайплайн.",
    tags: ["Rig", "Animation", "Export"],
  },
];

// Портфолио: сюда потом добавишь свои картинки/видео
// Картинки/видео кидай в папку /public/portfolio/...
// Примеры ниже: /public/portfolio/demo.jpg и /public/portfolio/demo.mp4
type PortfolioItem =
  | {
      type: "image";
      title: string;
      desc: string;
      src: string; // "/portfolio/xxx.jpg"
      tags?: string[];
    }
  | {
      type: "video";
      title: string;
      desc: string;
      src: string; // "/portfolio/xxx.mp4"
      poster?: string; // "/portfolio/poster.jpg"
      tags?: string[];
    };

const PORTFOLIO: PortfolioItem[] = [
  {
    type: "image",
    title: "Пример: 3D ассет",
    desc: "Поставь сюда свой рендер/скрин. Файл положи в /public/portfolio/",
    src: "/portfolio/demo.jpg",
    tags: ["3D", "Asset"],
  },
  {
    type: "video",
    title: "Пример: анимация/демо",
    desc: "Видео тоже можно. Файл положи в /public/portfolio/",
    src: "/portfolio/demo.mp4",
    poster: "/portfolio/demo-poster.jpg",
    tags: ["Animation", "Video"],
  },
];

function cn(...classes: Array<string | false | undefined | null>) {
  return classes.filter(Boolean).join(" ");
}

function Card({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 shadow-[0_20px_80px_rgba(0,0,0,0.35)]">
      {children}
    </div>
  );
}

function SectionTitle({
  title,
  subtitle,
}: {
  title: string;
  subtitle?: string;
}) {
  return (
    <div className="mb-6">
      <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">
        {title}
      </h2>
      {subtitle ? (
        <p className="text-white/65 mt-2 max-w-3xl">{subtitle}</p>
      ) : null}
    </div>
  );
}

function NavItem({
  active,
  label,
  onClick,
}: {
  active: boolean;
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "w-full text-left px-4 py-3 rounded-2xl border transition",
        active
          ? "bg-white/10 border-white/15 text-white"
          : "bg-transparent border-white/0 text-white/75 hover:bg-white/5 hover:border-white/10"
      )}
    >
      <span className="text-sm font-medium">{label}</span>
    </button>
  );
}

function PageTransition({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12, filter: "blur(6px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      exit={{ opacity: 0, y: -10, filter: "blur(6px)" }}
      transition={{ duration: 0.32, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}

export default function Page() {
  const [tab, setTab] = useState<PageKey>("home");

  const title = useMemo(() => {
    switch (tab) {
      case "home":
        return "Главная";
      case "services":
        return "Услуги и цены";
      case "portfolio":
        return "Портфолио";
      case "game":
        return "Игра в разработке";
      case "contacts":
        return "Контакты";
    }
  }, [tab]);

  return (
    <main className="min-h-screen text-white">
      {/* фон (тёмно-синий, без неона) */}
      <div className="fixed inset-0 -z-10 bg-[#071024]" />
      <div
        className="fixed inset-0 -z-10 opacity-60"
        style={{
          background:
            "radial-gradient(900px 500px at 20% 10%, rgba(25, 65, 120, 0.25), transparent 60%)," +
            "radial-gradient(900px 600px at 80% 20%, rgba(15, 45, 90, 0.25), transparent 60%)," +
            "radial-gradient(900px 700px at 50% 100%, rgba(10, 30, 60, 0.35), transparent 65%)",
        }}
      />

      <div className="max-w-7xl mx-auto px-4 md:px-6 py-6">
        {/* Top bar */}
        <div className="rounded-3xl border border-white/10 bg-white/[0.03] px-5 py-4 flex items-center justify-between gap-4">
          <div className="min-w-0">
            <div className="text-xs text-white/55">monoalr • freelance</div>
            <div className="text-lg md:text-xl font-semibold truncate">
              Моно — разработка игр / 3D / анимация
            </div>
            <div className="text-sm text-white/55 mt-1">{title}</div>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => setTab("contacts")}
              className="px-4 py-2 rounded-2xl bg-white text-slate-900 font-medium hover:opacity-90 transition"
            >
              Связаться
            </button>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-6">
          {/* Sidebar */}
          <aside className="rounded-3xl border border-white/10 bg-white/[0.03] p-4 h-fit lg:sticky lg:top-6">
            <div className="px-3 py-2">
              <div className="text-xs text-white/55">Меню</div>
              <div className="text-sm text-white/75 mt-1">
                Разделы сайта
              </div>
            </div>

            <div className="mt-3 space-y-2">
              <NavItem
                active={tab === "home"}
                label="Главная"
                onClick={() => setTab("home")}
              />
              <NavItem
                active={tab === "services"}
                label="Услуги и цены"
                onClick={() => setTab("services")}
              />
              <NavItem
                active={tab === "portfolio"}
                label="Портфолио"
                onClick={() => setTab("portfolio")}
              />
              <NavItem
                active={tab === "game"}
                label="Игра в разработке"
                onClick={() => setTab("game")}
              />
              <NavItem
                active={tab === "contacts"}
                label="Контакты"
                onClick={() => setTab("contacts")}
              />
            </div>

            <div className="mt-5 px-3">
              <div className="h-px bg-white/10" />
              <div className="mt-4 text-xs text-white/55">
                Быстрые ссылки
              </div>
              <div className="mt-2 flex flex-col gap-2">
                <a
                  className="px-3 py-2 rounded-2xl border border-white/10 bg-white/[0.03] hover:bg-white/[0.06] transition text-sm text-white/80"
                  href={CONTACTS.telegram}
                  target="_blank"
                  rel="noreferrer"
                >
                  Telegram
                </a>
                <a
                  className="px-3 py-2 rounded-2xl border border-white/10 bg-white/[0.03] hover:bg-white/[0.06] transition text-sm text-white/80"
                  href={CONTACTS.discordServer}
                  target="_blank"
                  rel="noreferrer"
                >
                  Discord сервер
                </a>
              </div>
            </div>
          </aside>

          {/* Content */}
          <section className="min-w-0">
            <AnimatePresence mode="wait">
              {tab === "home" && (
                <PageTransition key="home">
                  <Card>
                    <SectionTitle
                      title="Главная"
                      subtitle="Коротко: делаю игровые механики, 3D и анимации. Сейчас параллельно разрабатываю свою игру (название придумаем позже)."
                    />

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {[
                        {
                          t: "Геймдев / Roblox",
                          d: "Системы, боёвка, способности, UI-логика, состояния и синхронизация.",
                        },
                        {
                          t: "3D",
                          d: "Ассеты/персонажи, аккуратный импорт и оптимизация под игру.",
                        },
                        {
                          t: "Анимации",
                          d: "Боевые наборы, локомоция, риг/экспорт.",
                        },
                      ].map((x) => (
                        <div
                          key={x.t}
                          className="rounded-3xl border border-white/10 bg-white/[0.03] p-5"
                        >
                          <div className="text-sm text-white/55">{x.t}</div>
                          <div className="text-white/80 mt-2 text-sm leading-relaxed">
                            {x.d}
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="mt-6 flex flex-wrap gap-3">
                      <button
                        onClick={() => setTab("services")}
                        className="px-5 py-3 rounded-2xl bg-white text-slate-900 font-medium hover:opacity-90 transition"
                      >
                        Услуги и цены
                      </button>
                      <button
                        onClick={() => setTab("portfolio")}
                        className="px-5 py-3 rounded-2xl border border-white/15 text-white/85 hover:bg-white/5 transition"
                      >
                        Портфолио
                      </button>
                      <button
                        onClick={() => setTab("game")}
                        className="px-5 py-3 rounded-2xl border border-white/15 text-white/85 hover:bg-white/5 transition"
                      >
                        Игра
                      </button>
                    </div>
                  </Card>
                </PageTransition>
              )}

              {tab === "services" && (
                <PageTransition key="services">
                  <div className="space-y-6">
                    <Card>
                      <SectionTitle
                        title="Услуги"
                        subtitle="Конкретно что делаю. Если задача нестандартная — обсудим."
                      />
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {SERVICES.map((s) => (
                          <div
                            key={s.title}
                            className="rounded-3xl border border-white/10 bg-white/[0.03] p-5"
                          >
                            <div className="text-lg font-semibold">
                              {s.title}
                            </div>
                            <p className="text-white/70 mt-2 text-sm leading-relaxed">
                              {s.desc}
                            </p>
                            <div className="flex flex-wrap gap-2 mt-4">
                              {s.tags.map((t) => (
                                <span
                                  key={t}
                                  className="text-xs px-3 py-1 rounded-2xl bg-white/[0.04] border border-white/10 text-white/70"
                                >
                                  {t}
                                </span>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </Card>

                    <Card>
                      <SectionTitle
                        title="Примерные расценки"
                        subtitle="Это ориентиры. Точную цену скажу после короткого описания задачи."
                      />

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {PRICING.map((p) => (
                          <div
                            key={p.title}
                            className="rounded-3xl border border-white/10 bg-white/[0.03] p-6"
                          >
                            <div className="flex items-start justify-between gap-3">
                              <div className="text-lg font-semibold">
                                {p.title}
                              </div>
                              <div className="text-sm px-3 py-1 rounded-2xl bg-white text-slate-900 font-medium">
                                {p.price}
                              </div>
                            </div>

                            <ul className="mt-4 space-y-2 text-sm text-white/70">
                              {p.items.map((it) => (
                                <li key={it} className="flex gap-2">
                                  <span className="mt-[6px] w-1.5 h-1.5 rounded-full bg-white/60" />
                                  <span>{it}</span>
                                </li>
                              ))}
                            </ul>

                            <div className="text-xs text-white/55 mt-4">
                              {p.note}
                            </div>

                            <button
                              onClick={() => setTab("contacts")}
                              className="mt-5 w-full px-5 py-3 rounded-2xl bg-white text-slate-900 font-medium hover:opacity-90 transition"
                            >
                              Связаться
                            </button>
                          </div>
                        ))}
                      </div>
                    </Card>
                  </div>
                </PageTransition>
              )}

              {tab === "portfolio" && (
                <PageTransition key="portfolio">
                  <Card>
                    <SectionTitle
                      title="Портфолио"
                      subtitle='Сюда можно вставлять картинки и видео. Файлы клади в папку "public/portfolio/".'
                    />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {PORTFOLIO.map((item) => (
                        <div
                          key={item.title}
                          className="rounded-3xl border border-white/10 bg-white/[0.03] p-5 overflow-hidden"
                        >
                          <div className="text-lg font-semibold">
                            {item.title}
                          </div>
                          <p className="text-white/70 mt-2 text-sm leading-relaxed">
                            {item.desc}
                          </p>

                          <div className="mt-4 rounded-2xl border border-white/10 bg-[#06102a] overflow-hidden">
                            {item.type === "image" ? (
                              <div className="relative w-full aspect-video">
                                <Image
                                  src={item.src}
                                  alt={item.title}
                                  fill
                                  className="object-cover"
                                  sizes="(max-width: 768px) 100vw, 50vw"
                                />
                              </div>
                            ) : (
                              <video
                                className="w-full h-auto block"
                                controls
                                playsInline
                                preload="metadata"
                                poster={item.poster}
                              >
                                <source src={item.src} />
                                Ваш браузер не поддерживает видео.
                              </video>
                            )}
                          </div>

                          {item.tags?.length ? (
                            <div className="flex flex-wrap gap-2 mt-4">
                              {item.tags.map((t) => (
                                <span
                                  key={t}
                                  className="text-xs px-3 py-1 rounded-2xl bg-white/[0.04] border border-white/10 text-white/70"
                                >
                                  {t}
                                </span>
                              ))}
                            </div>
                          ) : null}
                        </div>
                      ))}
                    </div>

                    <div className="mt-6 rounded-3xl border border-white/10 bg-white/[0.03] p-5">
                      <div className="text-sm text-white/55">Как добавить свои медиа</div>
                      <div className="text-sm text-white/75 mt-2 leading-relaxed">
                        1) Создай папку: <b>public/portfolio</b><br />
                        2) Кинь туда файлы: <b>.jpg/.png/.webp</b> или <b>.mp4</b><br />
                        3) В массиве <b>PORTFOLIO</b> замени demo-пути на свои, например:
                        <div className="mt-3 font-mono text-xs text-white/70 bg-black/30 border border-white/10 rounded-2xl p-3 overflow-auto">
                          {`{ type: "image", src: "/portfolio/my-work.jpg", ... }\n{ type: "video", src: "/portfolio/my-demo.mp4", poster: "/portfolio/my-poster.jpg", ... }`}
                        </div>
                      </div>
                    </div>
                  </Card>
                </PageTransition>
              )}

              {tab === "game" && (
                <PageTransition key="game">
                  <Card>
                    <SectionTitle
                      title="Игра в разработке"
                      subtitle="Название придумаем позже. Здесь будет прогресс, фичи, скрины и devlog."
                    />

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {[
                        { t: "Статус", d: "В активной разработке" },
                        { t: "Жанр", d: "Определим позже" },
                        { t: "Платформа", d: "Определим позже" },
                      ].map((x) => (
                        <div
                          key={x.t}
                          className="rounded-3xl border border-white/10 bg-white/[0.03] p-5"
                        >
                          <div className="text-sm text-white/55">{x.t}</div>
                          <div className="text-lg font-semibold mt-1">
                            {x.d}
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-4">
                      <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6">
                        <div className="text-lg font-semibold">Что уже делаю</div>
                        <ul className="mt-3 space-y-2 text-sm text-white/70">
                          {[
                            "Прототип геймплея и механики",
                            "Первые ассеты/анимации",
                            "Управление и ощущения персонажа",
                            "Планирование контента",
                          ].map((it) => (
                            <li key={it} className="flex gap-2">
                              <span className="mt-[6px] w-1.5 h-1.5 rounded-full bg-white/60" />
                              <span>{it}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6">
                        <div className="text-lg font-semibold">Что дальше</div>
                        <ul className="mt-3 space-y-2 text-sm text-white/70">
                          {[
                            "Контент и прогрессия",
                            "UI и полировка",
                            "Оптимизация/стабильность",
                            "Публичные обновления",
                          ].map((it) => (
                            <li key={it} className="flex gap-2">
                              <span className="mt-[6px] w-1.5 h-1.5 rounded-full bg-white/60" />
                              <span>{it}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className="mt-6 flex flex-wrap gap-3">
                      <button
                        onClick={() => setTab("portfolio")}
                        className="px-5 py-3 rounded-2xl border border-white/15 text-white/85 hover:bg-white/5 transition"
                      >
                        Добавить медиа в Портфолио
                      </button>
                      <button
                        onClick={() => setTab("contacts")}
                        className="px-5 py-3 rounded-2xl bg-white text-slate-900 font-medium hover:opacity-90 transition"
                      >
                        Связаться
                      </button>
                    </div>
                  </Card>
                </PageTransition>
              )}

              {tab === "contacts" && (
                <PageTransition key="contacts">
                  <Card>
                    <SectionTitle
                      title="Контакты"
                      subtitle="Telegram — самый быстрый вариант. Discord и почта тоже ок."
                    />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6">
                        <div className="text-sm text-white/55">Telegram</div>
                        <a
                          href={CONTACTS.telegram}
                          target="_blank"
                          rel="noreferrer"
                          className="text-lg font-semibold underline underline-offset-4 hover:opacity-90"
                        >
                          t.me/monoalr
                        </a>
                        <div className="text-sm text-white/70 mt-3">
                          Лучше сразу: что нужно сделать, срок, примеры/референсы.
                        </div>
                      </div>

                      <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6">
                        <div className="text-sm text-white/55">Discord</div>
                        <div className="text-lg font-semibold">
                          {CONTACTS.discordUser}
                        </div>

                        <div className="mt-4 flex flex-wrap gap-3">
                          <button
                            onClick={async () => {
                              try {
                                await navigator.clipboard.writeText(
                                  CONTACTS.discordUser
                                );
                                alert("Скопировано: " + CONTACTS.discordUser);
                              } catch {
                                alert("Не получилось скопировать. Ник: " + CONTACTS.discordUser);
                              }
                            }}
                            className="px-5 py-3 rounded-2xl border border-white/15 text-white/85 hover:bg-white/5 transition"
                          >
                            Скопировать ник
                          </button>

                          <a
                            href={CONTACTS.discordServer}
                            target="_blank"
                            rel="noreferrer"
                            className="px-5 py-3 rounded-2xl bg-white text-slate-900 font-medium hover:opacity-90 transition"
                          >
                            Открыть сервер
                          </a>
                        </div>
                      </div>
                    </div>

                    <div className="mt-4 rounded-3xl border border-white/10 bg-white/[0.03] p-6">
                      <div className="text-sm text-white/55">Email</div>
                      <a
                        href={`mailto:${CONTACTS.email}`}
                        className="text-lg font-semibold underline underline-offset-4 hover:opacity-90"
                      >
                        {CONTACTS.email}
                      </a>
                    </div>
                  </Card>
                </PageTransition>
              )}
            </AnimatePresence>

            <div className="text-xs text-white/35 mt-10">
              © {new Date().getFullYear()} monoalr
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
