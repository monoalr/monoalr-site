"use client";

import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

type PageKey = "home" | "services" | "portfolio" | "game" | "contacts";

// Большая картинка на главной: положи файл сюда /public/hero.jpg
const HERO_IMAGE = "/hero.jpg";

type PortfolioItem = {
  title: string;
  desc: string;
  src: string;
  tags?: string[];
};

const PORTFOLIO: PortfolioItem[] = [
  { title: "Маска Междумирца", desc: "Маска в рисованном стиле", src: "/portfolio/portfolio-01.jpg" },
  { title: "Асуна из SAO", desc: "Полноценная модель без текстур", src: "/portfolio/portfolio-02.jpg" },
  { title: "Смотрящий", desc: "Смотрящий из ЛоФД", src: "/portfolio/portfolio-03.jpg" },
  { title: "Лололошка в маске", desc: "Лололошка в маске междумирца", src: "/portfolio/portfolio-04.jpg" },
  { title: "Лололошка", desc: "Лололошка мультяшная версия", src: "/portfolio/portfolio-05.jpg" },
  { title: "Вокс", desc: "Вокс из Отель Хазбин", src: "/portfolio/portfolio-06.jpg" },
];

const CONTACTS = {
  telegram: "https://t.me/monoalr",
  email: "musaevtamerlan35@gmail.com",
  discordServer: "https://discord.gg/KqSpDWUX",
  discordUser: "mono_alr",
};

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

// Цены (USD)
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

function SectionTitle({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div className="mb-6">
      <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">{title}</h2>
      {subtitle ? <p className="text-white/65 mt-2 max-w-3xl">{subtitle}</p> : null}
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
        "relative w-full text-left px-4 py-3 rounded-2xl border transition overflow-hidden",
        active
          ? "bg-white/10 border-white/15 text-white"
          : "bg-transparent border-white/0 text-white/75 hover:bg-white/5 hover:border-white/10"
      )}
    >
      <span
        className={cn(
          "absolute left-0 top-2 bottom-2 w-1 rounded-r-full transition",
          active ? "bg-white/70" : "bg-transparent"
        )}
      />
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

function Lightbox({
  items,
  index,
  onClose,
  onPrev,
  onNext,
}: {
  items: PortfolioItem[];
  index: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}) {
  const item = items[index];

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "ArrowRight") onNext();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [onClose, onPrev, onNext]);

  return (
    <motion.div
      className="fixed inset-0 z-[60] flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      aria-modal="true"
      role="dialog"
    >
      {/* backdrop */}
      <button
        className="absolute inset-0 bg-black/70"
        onClick={onClose}
        aria-label="Close"
      />

      {/* panel */}
      <motion.div
        initial={{ scale: 0.98, y: 10, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        exit={{ scale: 0.98, y: 10, opacity: 0 }}
        transition={{ duration: 0.2, ease: "easeOut" }}
        className="relative w-full max-w-5xl rounded-3xl border border-white/10 bg-[#070F23] shadow-[0_30px_120px_rgba(0,0,0,0.65)] overflow-hidden"
      >
        {/* top bar */}
        <div className="flex items-center justify-between gap-3 px-5 py-4 border-b border-white/10 bg-white/[0.03]">
          <div className="min-w-0">
            <div className="font-semibold truncate">{item.title}</div>
            <div className="text-sm text-white/65 truncate">{item.desc}</div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onPrev}
              className="px-3 py-2 rounded-2xl border border-white/15 text-white/85 hover:bg-white/5 transition"
              aria-label="Previous"
              title="←"
            >
              ←
            </button>
            <button
              onClick={onNext}
              className="px-3 py-2 rounded-2xl border border-white/15 text-white/85 hover:bg-white/5 transition"
              aria-label="Next"
              title="→"
            >
              →
            </button>
            <button
              onClick={onClose}
              className="px-3 py-2 rounded-2xl bg-white text-slate-900 font-medium hover:opacity-90 transition"
              aria-label="Close"
            >
              Закрыть
            </button>
          </div>
        </div>

        {/* image */}
        <div className="relative w-full aspect-[16/9] bg-black/30">
          <Image
            src={item.src}
            alt={item.title}
            fill
            className="object-contain"
            sizes="(max-width: 1024px) 100vw, 1024px"
            priority
          />
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function Page() {
  const [tab, setTab] = useState<PageKey>("home");

  // lightbox
  const [lbOpen, setLbOpen] = useState(false);
  const [lbIndex, setLbIndex] = useState(0);

  const openLightbox = (idx: number) => {
    setLbIndex(idx);
    setLbOpen(true);
  };

  const closeLightbox = () => setLbOpen(false);

  const prevLightbox = () =>
    setLbIndex((i) => (i - 1 + PORTFOLIO.length) % PORTFOLIO.length);

  const nextLightbox = () =>
    setLbIndex((i) => (i + 1) % PORTFOLIO.length);

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
      {/* Темно-синий фон с глубиной */}
      <div className="fixed inset-0 -z-10 bg-[#050B1A]" />

      <motion.div
        className="fixed inset-0 -z-10 opacity-70"
        animate={{ opacity: [0.55, 0.75, 0.55] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        style={{
          background:
            "radial-gradient(900px 600px at 18% 18%, rgba(18, 74, 140, 0.35), transparent 60%)," +
            "radial-gradient(1000px 700px at 80% 25%, rgba(9, 44, 96, 0.35), transparent 62%)," +
            "radial-gradient(1100px 800px at 50% 95%, rgba(6, 26, 60, 0.55), transparent 65%)",
        }}
      />

      <div
        className="fixed inset-0 -z-10 opacity-[0.10]"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(255,255,255,0.06) 1px, transparent 1px)," +
            "linear-gradient(to bottom, rgba(255,255,255,0.06) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
          maskImage: "radial-gradient(700px 500px at 50% 30%, black, transparent 70%)",
        }}
      />

      <div
        className="fixed inset-0 -z-10 opacity-[0.06] mix-blend-overlay pointer-events-none"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='120' height='120' filter='url(%23n)' opacity='.4'/%3E%3C/svg%3E\")",
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
              <div className="text-sm text-white/75 mt-1">Разделы сайта</div>
            </div>

            <div className="mt-3 space-y-2">
              <NavItem active={tab === "home"} label="Главная" onClick={() => setTab("home")} />
              <NavItem active={tab === "services"} label="Услуги и цены" onClick={() => setTab("services")} />
              <NavItem active={tab === "portfolio"} label="Портфолио" onClick={() => setTab("portfolio")} />
              <NavItem active={tab === "game"} label="Игра в разработке" onClick={() => setTab("game")} />
              <NavItem active={tab === "contacts"} label="Контакты" onClick={() => setTab("contacts")} />
            </div>

            <div className="mt-5 px-3">
              <div className="h-px bg-white/10" />
              <div className="mt-4 text-xs text-white/55">Быстрые ссылки</div>
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
                      subtitle="Делаю игровые механики, 3D и анимации. Сейчас параллельно разрабатываю свою игру (название придумаем позже)."
                    />

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {[
                        { t: "Геймдев / Roblox", d: "Системы, боёвка, способности, UI-логика, состояния и синхронизация." },
                        { t: "3D", d: "Ассеты/персонажи, аккуратный импорт и оптимизация под игру." },
                        { t: "Анимации", d: "Боевые наборы, локомоция, риг/экспорт." },
                      ].map((x) => (
                        <div key={x.t} className="rounded-3xl border border-white/10 bg-white/[0.03] p-5">
                          <div className="text-sm text-white/55">{x.t}</div>
                          <div className="text-white/80 mt-2 text-sm leading-relaxed">{x.d}</div>
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

                    {/* Hero image */}
                    <div className="mt-6 rounded-3xl border border-white/10 bg-white/[0.03] overflow-hidden">
                      <div className="relative w-full aspect-[21/9]">
                        <Image
                          src={HERO_IMAGE}
                          alt="Hero"
                          fill
                          priority
                          className="object-cover"
                          sizes="(max-width: 1024px) 100vw, 900px"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#050B1A]/75 via-transparent to-transparent" />
                        <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/5 to-white/0 opacity-40" />
                      </div>
                    </div>
                  </Card>
                </PageTransition>
              )}

              {tab === "services" && (
                <PageTransition key="services">
                  <div className="space-y-6">
                    <Card>
                      <SectionTitle title="Услуги" subtitle="Конкретно что делаю. Если задача нестандартная — обсудим." />
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {SERVICES.map((s) => (
                          <div key={s.title} className="rounded-3xl border border-white/10 bg-white/[0.03] p-5">
                            <div className="text-lg font-semibold">{s.title}</div>
                            <p className="text-white/70 mt-2 text-sm leading-relaxed">{s.desc}</p>
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

                      {/* Сделал шире: больше отступы, больше колонки */}
                      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                        {PRICING.map((p) => (
                          <div
                            key={p.title}
                            className="rounded-3xl border border-white/10 bg-white/[0.03] p-7"
                          >
                            <div className="flex items-start justify-between gap-3">
                              <div className="text-xl font-semibold">{p.title}</div>
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

                            <div className="text-xs text-white/55 mt-4">{p.note}</div>

                            <button
                              onClick={() => setTab("contacts")}
                              className="mt-6 w-full px-5 py-3 rounded-2xl bg-white text-slate-900 font-medium hover:opacity-90 transition"
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
                      subtitle="Нажми на карточку, чтобы открыть изображение ближе."
                    />

                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                      {PORTFOLIO.map((item, idx) => (
                        <button
                          key={item.title}
                          onClick={() => openLightbox(idx)}
                          className="text-left rounded-3xl border border-white/10 bg-white/[0.03] p-5 overflow-hidden hover:bg-white/[0.05] transition"
                        >
                          <div className="text-lg font-semibold">{item.title}</div>
                          <p className="text-white/70 mt-2 text-sm leading-relaxed">{item.desc}</p>

                          <div className="mt-4 rounded-2xl border border-white/10 bg-[#06102a] overflow-hidden">
                            <div className="relative w-full aspect-video">
                              <Image
                                src={item.src}
                                alt={item.title}
                                fill
                                className="object-cover"
                                sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" />
                            </div>
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
                        </button>
                      ))}
                    </div>
                  </Card>
                </PageTransition>
              )}

              {tab === "game" && (
                <PageTransition key="game">
                  <Card>
                    <SectionTitle
                      title="Игра в разработке"
                      subtitle="Название придумаем позже. Тут будет прогресс, фичи и апдейты."
                    />

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {[
                        { t: "Статус", d: "В активной разработке" },
                        { t: "Жанр", d: "Определим позже" },
                        { t: "Платформа", d: "Определим позже" },
                      ].map((x) => (
                        <div key={x.t} className="rounded-3xl border border-white/10 bg-white/[0.03] p-5">
                          <div className="text-sm text-white/55">{x.t}</div>
                          <div className="text-lg font-semibold mt-1">{x.d}</div>
                        </div>
                      ))}
                    </div>

                    <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-4">
                      <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6">
                        <div className="text-lg font-semibold">Что уже делаю</div>
                        <ul className="mt-3 space-y-2 text-sm text-white/70">
                          {["Прототип геймплея и механики", "Первые ассеты/анимации", "Управление и ощущения", "Планирование контента"].map((it) => (
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
                          {["Контент и прогрессия", "UI и полировка", "Оптимизация/стабильность", "Публичные обновления"].map((it) => (
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
                        Портфолио
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
                        <div className="text-lg font-semibold">{CONTACTS.discordUser}</div>

                        <div className="mt-4 flex flex-wrap gap-3">
                          <button
                            onClick={async () => {
                              try {
                                await navigator.clipboard.writeText(CONTACTS.discordUser);
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

            <div className="text-xs text-white/35 mt-10">© {new Date().getFullYear()} monoalr</div>
          </section>
        </div>
      </div>

      {/* Lightbox overlay */}
      <AnimatePresence>
        {lbOpen && (
          <Lightbox
            items={PORTFOLIO}
            index={lbIndex}
            onClose={closeLightbox}
            onPrev={prevLightbox}
            onNext={nextLightbox}
          />
        )}
      </AnimatePresence>
    </main>
  );
}
