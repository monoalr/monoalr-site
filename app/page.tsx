"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type PageKey = "home" | "services" | "game" | "contacts";

const CONTACTS = {
  telegram: "https://t.me/monoalr",
  email: "musaevtamerlan35@gmail.com", // поменяй на нужную
  discordServer: "https://discord.gg/KqSpDWUX", // вставь инвайт когда будет
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
    price: "от $15–40",
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
    price: "Договорная",
    items: [
      "Несколько систем",
      "UI + логика",
      "Интеграция в проект",
      "Долгосрочная поддержка",
    ],
    note: "Лучше всего под разработку игры.",
  },
];

const SERVICES = [
  {
    title: "Разработка игровых механик",
    desc:
      "Боёвка, способности, комбо, состояния персонажа (нельзя прыгать/кастовать во время удара), " +
      "синхронизация анимаций, отбрасывания, логика урона.",
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
    desc:
      "Боевые наборы, локомоция, риг/скининг и экспорт под нужный пайплайн.",
    tags: ["Blender", "Rig", "Animation"],
  },
];

function cn(...classes: Array<string | false | undefined | null>) {
  return classes.filter(Boolean).join(" ");
}

function Pill({ children, active, onClick }: { children: React.ReactNode; active?: boolean; onClick?: () => void }) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "px-4 py-2 rounded-2xl text-sm transition border",
        active
          ? "bg-white text-slate-900 border-white"
          : "bg-white/5 text-white/80 border-white/10 hover:bg-white/10"
      )}
    >
      {children}
    </button>
  );
}

function Card({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-[0_20px_80px_rgba(0,0,0,0.35)]">
      {children}
    </div>
  );
}

function SectionTitle({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div className="mb-6">
      <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">{title}</h2>
      {subtitle ? <p className="text-white/65 mt-2 max-w-2xl">{subtitle}</p> : null}
    </div>
  );
}

export default function Page() {
  const [tab, setTab] = useState<PageKey>("home");

  const headerHint = useMemo(() => {
    if (tab === "home") return "Главная";
    if (tab === "services") return "Услуги и цены";
    if (tab === "game") return "Игра в разработке";
    return "Контакты";
  }, [tab]);

  const go = (next: PageKey) => setTab(next);

  return (
    <main className="min-h-screen text-white">
      {/* background */}
      <div className="fixed inset-0 -z-10 bg-[#050916]" />
      <div className="fixed inset-0 -z-10 opacity-70"
        style={{
          background:
            "radial-gradient(900px 500px at 15% 15%, rgba(56, 189, 248, 0.18), transparent 60%)," +
            "radial-gradient(900px 500px at 85% 20%, rgba(99, 102, 241, 0.18), transparent 60%)," +
            "radial-gradient(900px 700px at 50% 90%, rgba(2, 132, 199, 0.10), transparent 60%)",
        }}
      />

      {/* top bar */}
      <header className="max-w-6xl mx-auto px-6 pt-10">
        <div className="flex flex-col gap-5">
          <div className="flex items-start md:items-center justify-between gap-4">
            <div className="flex flex-col">
              <div className="text-sm text-white/55">monoalr • freelance</div>
              <div className="text-xl font-semibold tracking-tight">Моно — game dev / 3D / animation</div>
              <div className="text-sm text-white/55 mt-1">{headerHint}</div>
            </div>

            <div className="flex gap-2 flex-wrap justify-end">
              <Pill active={tab === "home"} onClick={() => go("home")}>Главная</Pill>
              <Pill active={tab === "services"} onClick={() => go("services")}>Услуги</Pill>
              <Pill active={tab === "game"} onClick={() => go("game")}>Игра</Pill>
              <Pill active={tab === "contacts"} onClick={() => go("contacts")}>Контакты</Pill>
            </div>
          </div>

          <div className="h-px bg-white/10" />
        </div>
      </header>

      {/* content */}
      <section className="max-w-6xl mx-auto px-6 py-10">
        <AnimatePresence mode="wait">
          {tab === "home" && (
            <motion.div
              key="home"
              initial={{ opacity: 0, y: 14, filter: "blur(6px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -10, filter: "blur(6px)" }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="grid grid-cols-1 lg:grid-cols-3 gap-5"
            >
              <div className="lg:col-span-2">
                <Card>
                  <div className="text-sm text-white/60">Разработка игр • механики • 3D • анимация</div>
                  <h1 className="text-3xl md:text-4xl font-bold tracking-tight mt-2">
                    Делаю игровые штуки, которые реально работают стабильно
                  </h1>
                  <p className="text-white/70 mt-4 max-w-2xl leading-relaxed">
                    Могу собрать боёвку, способности, UI-логику, состояния персонажа, синхронизацию анимаций
                    и всё, что превращает “идею” в “играбельное”.
                    Параллельно у меня идёт разработка собственной игры (название придумаем потом).
                  </p>

                  <div className="flex flex-wrap gap-3 mt-6">
                    <button
                      onClick={() => go("services")}
                      className="px-5 py-3 rounded-2xl bg-white text-slate-900 font-medium hover:opacity-90 transition"
                    >
                      Посмотреть услуги и цены
                    </button>
                    <button
                      onClick={() => go("game")}
                      className="px-5 py-3 rounded-2xl border border-white/15 text-white/85 hover:bg-white/5 transition"
                    >
                      Игра в разработке
                    </button>
                    <button
                      onClick={() => go("contacts")}
                      className="px-5 py-3 rounded-2xl border border-white/15 text-white/85 hover:bg-white/5 transition"
                    >
                      Связаться
                    </button>
                  </div>
                </Card>
              </div>

              <div className="lg:col-span-1">
                <Card>
                  <SectionTitle
                    title="Быстрое меню"
                    subtitle="Тут всё, что обычно хотят заказчики."
                  />
                  <div className="flex flex-col gap-3">
                    <button
                      onClick={() => go("services")}
                      className="w-full text-left px-4 py-3 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition"
                    >
                      Услуги и примерные расценки
                    </button>
                    <button
                      onClick={() => go("game")}
                      className="w-full text-left px-4 py-3 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition"
                    >
                      Разработка моей игры
                    </button>
                    <button
                      onClick={() => go("contacts")}
                      className="w-full text-left px-4 py-3 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition"
                    >
                      Контакты
                    </button>
                  </div>

                  <div className="mt-6 grid grid-cols-1 gap-3">
                    {[
                      { k: "Сроки", v: "Оцениваю честно" },
                      { k: "Качество", v: "Довожу до результата" },
                      { k: "Связь", v: "Без пропаданий" },
                    ].map((it) => (
                      <div key={it.k} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                        <div className="text-sm text-white/55">{it.k}</div>
                        <div className="text-lg font-semibold">{it.v}</div>
                      </div>
                    ))}
                  </div>
                </Card>
              </div>
            </motion.div>
          )}

          {tab === "services" && (
            <motion.div
              key="services"
              initial={{ opacity: 0, y: 14, filter: "blur(6px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -10, filter: "blur(6px)" }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="space-y-8"
            >
              <Card>
                <SectionTitle
                  title="Услуги"
                  subtitle="Конкретно что я делаю. Если задача нестандартная — тоже ок, обсудим."
                />
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {SERVICES.map((s) => (
                    <div key={s.title} className="rounded-3xl border border-white/10 bg-white/5 p-5">
                      <div className="text-lg font-semibold">{s.title}</div>
                      <p className="text-white/70 mt-2 text-sm leading-relaxed">{s.desc}</p>
                      <div className="flex flex-wrap gap-2 mt-4">
                        {s.tags.map((t) => (
                          <span
                            key={t}
                            className="text-xs px-3 py-1 rounded-2xl bg-white/5 border border-white/10 text-white/70"
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
                  subtitle="Это ориентиры. Точную цену даю после короткого описания задачи."
                />

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {PRICING.map((p) => (
                    <div key={p.title} className="rounded-3xl border border-white/10 bg-white/5 p-6">
                      <div className="flex items-start justify-between gap-3">
                        <div className="text-lg font-semibold">{p.title}</div>
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
                        onClick={() => go("contacts")}
                        className="mt-5 w-full px-5 py-3 rounded-2xl bg-white text-slate-900 font-medium hover:opacity-90 transition"
                      >
                        Связаться
                      </button>
                    </div>
                  ))}
                </div>
              </Card>
            </motion.div>
          )}

          {tab === "game" && (
            <motion.div
              key="game"
              initial={{ opacity: 0, y: 14, filter: "blur(6px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -10, filter: "blur(6px)" }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="space-y-6"
            >
              <Card>
                <SectionTitle
                  title="Игра в разработке"
                  subtitle="Название придумаем потом. Здесь я буду показывать прогресс и ключевые фичи."
                />

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {[
                    { t: "Статус", d: "В активной разработке" },
                    { t: "Жанр", d: "Определим позже" },
                    { t: "Платформа", d: "Определим позже" },
                  ].map((x) => (
                    <div key={x.t} className="rounded-3xl border border-white/10 bg-white/5 p-5">
                      <div className="text-sm text-white/55">{x.t}</div>
                      <div className="text-lg font-semibold mt-1">{x.d}</div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-4">
                  <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
                    <div className="text-lg font-semibold">Что уже делаю</div>
                    <ul className="mt-3 space-y-2 text-sm text-white/70">
                      {[
                        "Основные механики и прототип геймплея",
                        "Первые анимации/ассеты",
                        "Система управления и ощущение персонажа",
                        "Планирование контента",
                      ].map((it) => (
                        <li key={it} className="flex gap-2">
                          <span className="mt-[6px] w-1.5 h-1.5 rounded-full bg-white/60" />
                          <span>{it}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
                    <div className="text-lg font-semibold">Что будет дальше</div>
                    <ul className="mt-3 space-y-2 text-sm text-white/70">
                      {[
                        "Добавить контент и прогрессию",
                        "Собрать UI и полировку",
                        "Стабильность/оптимизация",
                        "Публичные обновления (лог разработки)",
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
                    onClick={() => go("contacts")}
                    className="px-5 py-3 rounded-2xl bg-white text-slate-900 font-medium hover:opacity-90 transition"
                  >
                    Связаться
                  </button>
                  <button
                    onClick={() => go("services")}
                    className="px-5 py-3 rounded-2xl border border-white/15 text-white/85 hover:bg-white/5 transition"
                  >
                    Посмотреть услуги
                  </button>
                </div>
              </Card>
            </motion.div>
          )}

          {tab === "contacts" && (
            <motion.div
              key="contacts"
              initial={{ opacity: 0, y: 14, filter: "blur(6px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -10, filter: "blur(6px)" }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="space-y-6"
            >
              <Card>
                <SectionTitle
                  title="Контакты"
                  subtitle="Пиши в Telegram — это самый быстрый способ. Discord и почта тоже ок."
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
                    <div className="text-sm text-white/55">Telegram</div>
                    <a
                      href={CONTACTS.telegram}
                      className="text-lg font-semibold underline underline-offset-4 hover:opacity-90"
                    >
                      t.me/monoalr
                    </a>
                    <div className="text-sm text-white/70 mt-3">
                      Лучше сразу: что нужно сделать, срок, примеры/референсы.
                    </div>

                    <div className="mt-5">
                      <a
                        href={CONTACTS.telegram}
                        className="inline-flex px-5 py-3 rounded-2xl bg-white text-slate-900 font-medium hover:opacity-90 transition"
                      >
                        Написать
                      </a>
                    </div>
                  </div>

                  <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
                    <div className="text-sm text-white/55">Discord</div>
                    <div className="text-lg font-semibold">{CONTACTS.discordUser}</div>
                    <div className="text-sm text-white/70 mt-3">
                      Сервер: {CONTACTS.discordServer.includes("discord.gg") ? "есть ссылка" : "добавь инвайт, и будет красиво"}
                    </div>

                    <div className="mt-5 flex flex-wrap gap-3">
                      <button
                        onClick={async () => {
                          try {
                            await navigator.clipboard.writeText(CONTACTS.discordUser);
                            alert("Discord ник скопирован: " + CONTACTS.discordUser);
                          } catch {
                            alert("Не получилось скопировать. Ник: " + CONTACTS.discordUser);
                          }
                        }}
                        className="px-5 py-3 rounded-2xl border border-white/15 text-white/85 hover:bg-white/5 transition"
                      >
                        Скопировать ник
                      </button>

                      {CONTACTS.discordServer.includes("discord.gg") ? (
                        <a
                          href={CONTACTS.discordServer}
                          className="px-5 py-3 rounded-2xl bg-white text-slate-900 font-medium hover:opacity-90 transition"
                        >
                          Открыть сервер
                        </a>
                      ) : null}
                    </div>
                  </div>
                </div>

                <div className="mt-4 rounded-3xl border border-white/10 bg-white/5 p-6">
                  <div className="text-sm text-white/55">Email</div>
                  <a
                    href={`mailto:${CONTACTS.email}`}
                    className="text-lg font-semibold underline underline-offset-4 hover:opacity-90"
                  >
                    {CONTACTS.email}
                  </a>
                </div>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="text-xs text-white/35 mt-10">
          © {new Date().getFullYear()} monoalr
        </div>
      </section>
    </main>
  );
}
