"use client";

type Project = {
  title: string;
  what: string;
  tools: string;
  link?: string;
};

const SERVICES = [
  {
    title: "Разработка игры / механик",
    desc: "Боёвка, способности, UI, системы (комбо, клики, рэгдолл и т.д.). Довожу до “играется нормально”, а не “почти работает”.",
  },
  {
    title: "3D-моделинг",
    desc: "Ассеты, персонажи, пропсы, оптимизация под игру. Чистая топология и адекватные полигоны.",
  },
  {
    title: "Анимация / риг",
    desc: "Анимации персонажей, боевые наборы, риг/скининг, экспорт под нужный пайплайн.",
  },
];

const PROJECTS: Project[] = [
  {
    title: "TSB-style Combat (Roblox)",
    what: "Комбо-клики, Uppercut/Downslam, блок прыжка во время атак, отбрасывания, синхронизация анимаций.",
    tools: "Roblox Studio, Lua",
    link: "",
  },
  {
    title: "UGC / анимации",
    what: "Подготовка и экспорт анимаций, проверка, упаковка под публикацию.",
    tools: "Blender",
    link: "",
  },
  {
    title: "3D ассеты для игры",
    what: "Модели, оптимизация, UV, подготовка к импорту.",
    tools: "Blender",
    link: "",
  },
];

const CONTACTS = {
  telegram: "https://t.me/monoalr",
  // Discord username не является ссылкой. Сделаем кнопку, которая копирует ник.
  discordUser: "mono_alr",
};

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-2xl md:text-3xl font-semibold tracking-tight mb-4">
      {children}
    </h2>
  );
}

export default function Page() {
  const copyDiscord = async () => {
    try {
      await navigator.clipboard.writeText(CONTACTS.discordUser);
      alert("Discord ник скопирован: " + CONTACTS.discordUser);
    } catch {
      alert("Не получилось скопировать. Ник: " + CONTACTS.discordUser);
    }
  };

  return (
    <main className="min-h-screen">
      <header className="max-w-5xl mx-auto px-6 pt-14 pb-10">
        <div className="flex flex-col gap-6">
          <div className="inline-flex items-center gap-2 text-sm text-white/60">
            <span className="w-2 h-2 rounded-full bg-white/40" />
            Freelance • Game Dev • 3D
          </div>

          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
            Моно — разработка игр, 3D-моделинг и анимация
          </h1>

          <p className="text-lg text-white/70 max-w-2xl">
            Собираю игровые механики и контент так, чтобы это работало стабильно и
            выглядело достойно. Если нужен исполнитель, который не сдаёт “ну почти”
            — пиши.
          </p>

          <div className="flex flex-wrap gap-3">
            <a
              href={CONTACTS.telegram}
              className="px-5 py-3 rounded-2xl bg-white text-black font-medium hover:opacity-90 transition"
            >
              Написать в Telegram
            </a>
            <a
              href="#portfolio"
              className="px-5 py-3 rounded-2xl border border-white/15 text-white/80 hover:bg-white/5 transition"
            >
              Смотреть портфолио
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-6">
            {[
              { k: "Сроки", v: "Оцениваю честно" },
              { k: "Качество", v: "Довожу до результата" },
              { k: "Связь", v: "Без пропаданий" },
            ].map((it) => (
              <div
                key={it.k}
                className="rounded-2xl border border-white/10 bg-white/5 p-4"
              >
                <div className="text-sm text-white/60">{it.k}</div>
                <div className="text-lg font-semibold">{it.v}</div>
              </div>
            ))}
          </div>
        </div>
      </header>

      <section className="max-w-5xl mx-auto px-6 py-12">
        <SectionTitle>Услуги</SectionTitle>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {SERVICES.map((s) => (
            <div
              key={s.title}
              className="rounded-2xl border border-white/10 bg-white/5 p-5"
            >
              <div className="text-lg font-semibold">{s.title}</div>
              <p className="text-white/70 mt-2 text-sm leading-relaxed">
                {s.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section id="portfolio" className="max-w-5xl mx-auto px-6 py-12">
        <SectionTitle>Портфолио</SectionTitle>
        <p className="text-white/70 mb-6 max-w-2xl">
          Заменишь проекты на свои. Идеально: ссылка + коротко “что сделал” + инструменты.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {PROJECTS.map((p) => (
            <div
              key={p.title}
              className="rounded-2xl border border-white/10 bg-white/5 p-5"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="text-lg font-semibold">{p.title}</div>
                  <div className="text-sm text-white/60 mt-1">{p.tools}</div>
                </div>
                {p.link ? (
                  <a
                    href={p.link}
                    className="text-sm text-white/70 hover:text-white underline underline-offset-4"
                  >
                    Открыть
                  </a>
                ) : null}
              </div>

              <p className="text-white/70 mt-3 text-sm leading-relaxed">
                {p.what}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-6 py-12">
        <SectionTitle>Как работаем</SectionTitle>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[
            ["1. Бриф", "Задача, референсы, сроки."],
            ["2. Оценка", "Срок/стоимость, фиксируем объём."],
            ["3. Прототип", "Промежуточные результаты по ходу."],
            ["4. Сдача", "Правки, финал, передача файлов."],
          ].map(([t, d]) => (
            <div
              key={t}
              className="rounded-2xl border border-white/10 bg-white/5 p-5"
            >
              <div className="font-semibold">{t}</div>
              <p className="text-white/70 mt-2 text-sm leading-relaxed">{d}</p>
            </div>
          ))}
        </div>
      </section>

      <footer className="max-w-5xl mx-auto px-6 pt-8 pb-16">
        <div className="rounded-2xl border border-white/10 bg-white/5 p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <div className="text-xl font-semibold">Связаться</div>
            <div className="text-white/70 text-sm mt-1">
              Пиши — отвечу, обсудим задачу и дам оценку.
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            <a
              href={CONTACTS.telegram}
              className="px-5 py-3 rounded-2xl bg-white text-black font-medium hover:opacity-90 transition"
            >
              Telegram
            </a>

            <button
              onClick={copyDiscord}
              className="px-5 py-3 rounded-2xl border border-white/15 text-white/80 hover:bg-white/5 transition"
            >
              Discord: {CONTACTS.discordUser}
            </button>
          </div>
        </div>

        <div className="text-xs text-white/40 mt-6">
          © {new Date().getFullYear()} monoalr
        </div>
      </footer>
    </main>
  );
}
