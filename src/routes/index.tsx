import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Heart, Instagram, Music2, Sparkles, Star, Quote } from "lucide-react";
import { BloomLogo } from "@/components/bloom/BloomLogo";
import { TOOLS } from "@/components/bloom/tools";
import { SparkleRing } from "@/components/bloom/SparkleRing";
import { useEffect, useMemo, useState } from "react";

function SlowBubbles({ count = 14 }: { count?: number }) {
  const bubbles = useMemo(
    () =>
      Array.from({ length: count }).map((_, i) => {
        const size = 40 + Math.round(Math.random() * 130);
        const left = Math.round(Math.random() * 100);
        const duration = 38 + Math.round(Math.random() * 30); // very slow 38-68s
        const delay = -Math.round(Math.random() * duration);
        const drift = `${Math.round(Math.random() * 30 - 15)}px`;
        const opacity = 0.25 + Math.random() * 0.3;
        return { i, size, left, delay, duration, drift, opacity };
      }),
    [count],
  );
  return (
    <div className="pointer-events-none absolute inset-0 -z-0 overflow-hidden" aria-hidden>
      {bubbles.map((b) => (
        <span
          key={b.i}
          className="absolute bottom-[-180px] rounded-full bloom-bubble bloom-slow-bubble"
          style={{
            width: b.size,
            height: b.size,
            left: `${b.left}%`,
            animationDelay: `${b.delay}s`,
            animationDuration: `${b.duration}s`,
            // @ts-expect-error custom var
            "--drift": b.drift,
            "--o": b.opacity,
            opacity: 0,
          }}
        />
      ))}
    </div>
  );
}

function BokehSparkles({ count = 18 }: { count?: number }) {
  const items = useMemo(
    () =>
      Array.from({ length: count }).map((_, i) => {
        const size = 4 + Math.round(Math.random() * 7);
        const top = Math.round(Math.random() * 100);
        const left = Math.round(Math.random() * 100);
        const duration = 6 + Math.round(Math.random() * 8);
        const delay = -Math.round(Math.random() * duration);
        const opacity = 0.4 + Math.random() * 0.4;
        return { i, size, top, left, duration, delay, opacity };
      }),
    [count],
  );
  return (
    <div className="pointer-events-none absolute inset-0 -z-0 overflow-hidden" aria-hidden>
      {items.map((s) => (
        <span
          key={s.i}
          className="absolute rounded-full bg-white bloom-bokeh"
          style={{
            width: s.size,
            height: s.size,
            top: `${s.top}%`,
            left: `${s.left}%`,
            animationDuration: `${s.duration}s`,
            animationDelay: `${s.delay}s`,
            boxShadow: "0 0 10px 2px oklch(0.85 0.2 350 / 0.7)",
            // @ts-expect-error custom var
            "--o": s.opacity,
          }}
        />
      ))}
    </div>
  );
}

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Bloom — your softest era starts here" },
      { name: "description", content: "The cutest little app packed with tools for the modern girl — budgets, yoga, steps, diaries, cycles & feel-good reads. All in pink." },
      { property: "og:title", content: "Bloom — your softest era starts here" },
      { property: "og:description", content: "Budgets, yoga, steps, diaries, cycles & feel-good reads. All in pink." },
    ],
  }),
  component: Landing,
});

function Landing() {
  // light parallax for sparkles
  const [scrollY, setScrollY] = useState(0);
  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="relative min-h-screen overflow-hidden bloom-breathe">
      {/* gentle living background: slow bubbles + soft bokeh sparkles */}
      <SlowBubbles count={14} />
      <BokehSparkles count={18} />
      {/* floating soft blobs */}
      <div className="pointer-events-none absolute -left-32 top-40 -z-0 h-80 w-80 rounded-full bg-hotpink/20 blur-3xl animate-bloom-pulse" aria-hidden />
      <div className="pointer-events-none absolute -right-32 top-[60%] -z-0 h-96 w-96 rounded-full bg-rose/30 blur-3xl animate-bloom-pulse" style={{ animationDelay: "1.5s" }} aria-hidden />

      {/* Announcement bar */}
      <div className="bg-hotpink py-2 text-center text-sm font-medium text-white">
        ✿ NEW! Bloom Premium is here — get 20% off today ✿
      </div>

      {/* Navbar */}
      <header className="sticky top-0 z-40 border-b border-petal/60 bg-white/70 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
          <BloomLogo />
          <nav className="hidden items-center gap-8 text-sm font-medium text-rose md:flex">
            <Link to="/app/tools" className="hover:text-hotpink">Tools</Link>
            <a href="#favorites" className="hover:text-hotpink">Favorites</a>
            <a href="#blog" className="hover:text-hotpink">Blog</a>
            <a href="#subscribe" className="hover:text-hotpink">Subscribe</a>
          </nav>
          <div className="flex items-center gap-2">
            <a href="#" aria-label="Instagram" className="grid h-9 w-9 place-items-center rounded-full bg-blush text-hotpink hover:bg-petal">
              <Instagram className="h-4 w-4" />
            </a>
            <a href="#" aria-label="TikTok" className="grid h-9 w-9 place-items-center rounded-full bg-hotpink text-white hover:bg-magenta">
              <Music2 className="h-4 w-4" />
            </a>
          </div>
        </div>
      </header>

      <main className="relative z-10 mx-auto max-w-7xl px-4 pb-16 pt-4 sm:px-6 sm:pt-6">
        {/* Hero — compact, centered, lifted on mobile */}
        <section className="relative overflow-hidden rounded-[2rem] sm:rounded-[3rem] p-5 sm:p-10 md:p-14 shadow-[0_30px_80px_-30px_oklch(0.6_0.25_0/0.45)]"
          style={{ background: "linear-gradient(135deg, oklch(0.94 0.08 350) 0%, oklch(0.88 0.14 350) 50%, oklch(0.92 0.1 10) 100%)" }}>
          <div className="pointer-events-none absolute -right-10 -top-10 hidden h-64 w-64 opacity-60 md:block" aria-hidden>
            <Sunburst />
          </div>
          <Sparkles className="absolute left-4 top-5 h-4 w-4 sm:h-6 sm:w-6 animate-bloom-sparkle text-hotpink" aria-hidden />
          <Sparkles className="absolute right-6 top-8 h-4 w-4 animate-bloom-sparkle text-magenta" style={{ animationDelay: "0.6s" }} aria-hidden />
          <Star className="absolute right-8 bottom-8 h-4 w-4 animate-bloom-sparkle fill-hotpink text-hotpink" style={{ animationDelay: "1.2s" }} aria-hidden />
          <Heart className="absolute bottom-6 left-5 h-4 w-4 animate-bloom-float fill-hotpink text-hotpink" aria-hidden />
          {/* extra gentle twinkles near hero with light parallax */}
          <Sparkles className="absolute left-[20%] top-[18%] h-3 w-3 animate-bloom-sparkle text-white/90" style={{ animationDelay: "0.3s", transform: `translateY(${scrollY * -0.06}px)` }} aria-hidden />
          <Sparkles className="absolute right-[18%] top-[28%] h-3 w-3 animate-bloom-sparkle text-white/80" style={{ animationDelay: "1.4s", transform: `translateY(${scrollY * -0.04}px)` }} aria-hidden />
          <Sparkles className="absolute left-[12%] bottom-[28%] h-3 w-3 animate-bloom-sparkle text-white/80" style={{ animationDelay: "2.1s", transform: `translateY(${scrollY * -0.05}px)` }} aria-hidden />

          {/* Mobile/tablet: stacked & centered. Desktop: 2-col */}
          <div className="flex flex-col items-center gap-4 text-center md:grid md:grid-cols-2 md:items-center md:gap-10 md:text-left">
            <div className="relative mx-auto h-[180px] w-[180px] sm:h-[240px] sm:w-[240px] md:h-[460px] md:w-[460px] md:mt-0">
              {/* glowing aura behind the hero photo */}
              <div className="absolute inset-0 -m-6 rounded-[45%_55%_60%_40%/55%_45%_50%_50%] bg-hotpink/40 blur-2xl animate-bloom-pulse" aria-hidden />
              <div className="absolute inset-0 -m-10 rounded-full bg-gradient-to-br from-hotpink/30 via-magenta/20 to-transparent blur-3xl animate-bloom-pulse" style={{ animationDelay: "1s" }} aria-hidden />
              <div className="hidden md:block"><SparkleRing radius={200} /></div>
              <div className="animate-bloom-float h-full w-full">
                <img
                  src="/images/hero-girl.png"
                  alt="A joyful girl with vibrant pink hair smiling"
                  width={520}
                  height={520}
                  className="relative h-full w-full object-cover shadow-[0_25px_60px_-15px_oklch(0.55_0.28_0/0.55)] mx-auto md:h-[420px] md:w-[420px] md:mt-5"
                  style={{ borderRadius: "55% 45% 50% 50% / 60% 55% 45% 40%" }}
                />
              </div>
            </div>

            <div className="flex flex-col items-center md:items-start">
              <h1 className="relative font-script text-6xl sm:text-7xl md:text-8xl lg:text-9xl leading-none text-bloom-gradient drop-shadow-[0_4px_20px_oklch(0.7_0.25_0/0.25)] bloom-title-shimmer">
                Bloom
                <Sparkles className="absolute -right-4 -top-2 h-4 w-4 sm:h-5 sm:w-5 animate-bloom-sparkle text-hotpink" aria-hidden />
                <Sparkles className="absolute -left-3 top-2 h-3 w-3 animate-bloom-sparkle text-magenta" style={{ animationDelay: "0.8s" }} aria-hidden />
              </h1>
              <p className="mt-2 font-script text-xl sm:text-2xl md:text-3xl text-magenta">your softest era starts here</p>
              <p className="mt-3 max-w-xs sm:max-w-sm md:max-w-md text-sm sm:text-base font-medium text-magenta/90">
                Budgets, yoga, cycle, diary & feel‑good reads — all in one soft little app.
              </p>
              <div className="mt-5 flex flex-wrap items-center justify-center gap-2.5 md:justify-start">
                <Link
                  to="/app/tools"
                  className="bloom-cta relative overflow-hidden hover-scale inline-flex items-center gap-2 rounded-full px-5 py-2.5 sm:px-6 sm:py-3 text-sm sm:text-base font-semibold text-white transition"
                >
                  <span className="relative z-10 inline-flex items-center gap-2">Start Blooming <ArrowRight className="h-4 w-4" /></span>
                  <span className="bloom-cta-shine" aria-hidden />
                </Link>
                <Link
                  to="/app/today"
                  className="hover-scale inline-flex items-center rounded-full border-2 border-white bg-white/90 px-5 py-2.5 sm:px-6 sm:py-3 text-sm sm:text-base font-semibold text-hotpink transition hover:bg-white"
                >
                  Open App
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Tools strip — animated flower buttons */}
        <section className="mt-5 sm:mt-8 animate-fade-in rounded-[2rem] sm:rounded-[2.5rem] bg-white/85 p-5 sm:p-8 shadow-[0_25px_60px_-25px_oklch(0.55_0.28_0/0.35),0_0_0_1px_oklch(1_0_0/0.6)_inset] backdrop-blur">
          <div className="mb-4 sm:mb-6 text-center">
            <p className="font-script text-2xl sm:text-3xl text-bloom-gradient leading-none">your bloom kit</p>
            <p className="mt-1 text-xs sm:text-sm font-medium text-magenta/80">Everything you need in one soft little app ✿</p>
          </div>
          <div className="grid grid-cols-3 gap-3 sm:gap-5 md:grid-cols-6">
            {TOOLS.map((t, i) => (
              <Link
                key={t.slug}
                to="/app/tools/$slug"
                params={{ slug: t.slug }}
                className="bloom-flower-item group flex flex-col items-center gap-1.5 sm:gap-2 text-center"
                style={{ animationDelay: `${i * 80}ms` }}
              >
                <span className="bloom-flower relative grid h-16 w-16 sm:h-20 sm:w-20 place-items-center text-white transition-transform duration-500 group-hover:scale-110 group-active:scale-95">
                  <span className="pointer-events-none absolute inset-0 -m-2 rounded-full bg-hotpink/25 blur-xl opacity-70 group-hover:opacity-100 transition-opacity" aria-hidden />
                  <FlowerShape />
                  <t.icon className="relative z-10 h-6 w-6 sm:h-7 sm:w-7 drop-shadow-[0_2px_3px_oklch(0.4_0.22_350/0.45)]" strokeWidth={1.8} />
                </span>
                <span className="text-[11px] sm:text-xs font-bold text-magenta leading-tight">{t.label}</span>
              </Link>
            ))}
          </div>
        </section>

        <style>{`
          @keyframes bloom-breathe-bg {
            0%, 100% { background-position: 0% 50%, 100% 50%, 50% 100%, 0 0; }
            50%      { background-position: 30% 60%, 70% 40%, 40% 70%, 0 0; }
          }
          .bloom-breathe {
            background:
              radial-gradient(50rem 40rem at 10% 0%, oklch(0.92 0.12 350 / 0.55), transparent 60%),
              radial-gradient(45rem 35rem at 95% 25%, oklch(0.88 0.18 10 / 0.45), transparent 60%),
              radial-gradient(50rem 40rem at 50% 100%, oklch(0.9 0.14 330 / 0.5), transparent 60%),
              linear-gradient(180deg, oklch(0.98 0.02 350), oklch(0.95 0.05 350));
            background-size: 200% 200%;
            animation: bloom-breathe-bg 22s ease-in-out infinite;
          }

          @keyframes bloom-slow-rise {
            0%   { transform: translateY(0) translateX(0); opacity: 0; }
            10%  { opacity: var(--o, 0.5); }
            90%  { opacity: var(--o, 0.5); }
            100% { transform: translateY(-110vh) translateX(var(--drift, 10px)); opacity: 0; }
          }
          .bloom-slow-bubble { animation: bloom-slow-rise linear infinite; }

          @keyframes bloom-bokeh {
            0%, 100% { opacity: 0; transform: scale(0.7); }
            50%      { opacity: var(--o, 0.7); transform: scale(1); }
          }
          .bloom-bokeh { animation: bloom-bokeh ease-in-out infinite; }

          @keyframes bloom-title-shimmer-kf {
            0%   { background-position: -150% 0; }
            60%  { background-position: 250% 0; }
            100% { background-position: 250% 0; }
          }
          .bloom-title-shimmer::after {
            content: "";
            position: absolute; inset: 0;
            background-image: linear-gradient(110deg, transparent 35%, oklch(1 0 0 / 0.55) 50%, transparent 65%);
            background-size: 200% 100%;
            -webkit-background-clip: text; background-clip: text;
            color: transparent; pointer-events: none;
            animation: bloom-title-shimmer-kf 5.5s ease-in-out infinite;
            mix-blend-mode: screen;
          }

          .bloom-cta {
            background: linear-gradient(135deg, oklch(0.72 0.27 350), oklch(0.55 0.3 0) 60%, oklch(0.68 0.27 330));
            box-shadow:
              0 10px 25px -8px oklch(0.55 0.3 0 / 0.55),
              0 0 22px oklch(0.75 0.27 350 / 0.55),
              inset 0 1px 0 oklch(1 0 0 / 0.4);
            animation: bloom-cta-pulse 3s ease-in-out infinite;
          }
          @keyframes bloom-cta-pulse {
            0%, 100% { box-shadow: 0 10px 25px -8px oklch(0.55 0.3 0 / 0.55), 0 0 22px oklch(0.75 0.27 350 / 0.5), inset 0 1px 0 oklch(1 0 0 / 0.4); }
            50%      { box-shadow: 0 14px 30px -8px oklch(0.55 0.3 0 / 0.65), 0 0 36px oklch(0.78 0.27 350 / 0.8), inset 0 1px 0 oklch(1 0 0 / 0.5); }
          }
          .bloom-cta-shine {
            position: absolute; top: 0; bottom: 0; left: -40%; width: 35%;
            background: linear-gradient(110deg, transparent, oklch(1 0 0 / 0.55), transparent);
            transform: skewX(-20deg);
            animation: bloom-cta-shine-kf 4.5s ease-in-out infinite;
          }
          @keyframes bloom-cta-shine-kf {
            0%   { left: -40%; }
            55%  { left: 130%; }
            100% { left: 130%; }
          }

          @keyframes bloom-flower-bob {
            0%, 100% { transform: translateY(0) rotate(-3deg); }
            50% { transform: translateY(-5px) rotate(3deg); }
          }
          @keyframes bloom-flower-pop {
            0% { opacity: 0; transform: scale(0.6) translateY(12px); }
            70% { opacity: 1; transform: scale(1.06) translateY(-2px); }
            100% { opacity: 1; transform: scale(1) translateY(0); }
          }
          .bloom-flower-item { opacity: 0; animation: bloom-flower-pop 0.7s cubic-bezier(0.34, 1.56, 0.64, 1) forwards; }
          .bloom-flower > svg.flower-bg { animation: bloom-flower-bob 5s ease-in-out infinite; }
          .bloom-flower-item:hover .flower-bg { filter: drop-shadow(0 8px 18px oklch(0.65 0.28 350 / 0.55)); }
        `}</style>

        {/* Features section */}
        <section id="favorites" className="mt-20">
          <div className="text-center">
            <p className="font-script text-2xl text-hotpink">why you'll love it</p>
            <h2 className="font-script text-6xl text-bloom-gradient">made for your soft era</h2>
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {FEATURES.map((f, i) => (
              <div
                key={f.title}
                className="group relative overflow-hidden rounded-[2rem] bg-white/85 p-6 shadow-xl shadow-rose/10 backdrop-blur transition hover:-translate-y-2"
                style={{ animationDelay: `${i * 100}ms` }}
              >
                <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-hotpink/20 blur-2xl transition group-hover:bg-hotpink/40" aria-hidden />
                <span className="inline-grid h-12 w-12 place-items-center rounded-2xl text-white shadow-md"
                  style={{ background: "linear-gradient(135deg, oklch(0.7 0.25 350), oklch(0.58 0.28 0))" }}>
                  <f.icon className="h-5 w-5" />
                </span>
                <h3 className="mt-4 font-script text-3xl text-bloom-gradient">{f.title}</h3>
                <p className="mt-2 text-sm font-medium text-magenta/80">{f.text}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Big image feature */}
        <section className="mt-20 grid gap-8 rounded-[3rem] bg-white/70 p-6 shadow-xl shadow-rose/10 backdrop-blur md:grid-cols-2 md:p-10">
          <div className="relative overflow-hidden rounded-[2rem]">
            <img src="/images/feature-1.png" alt="Cozy pink bedroom" loading="lazy" width={896} height={640} className="h-full w-full object-cover" />
            <Sparkles className="absolute right-4 top-4 h-7 w-7 animate-bloom-sparkle text-white drop-shadow-lg" aria-hidden />
          </div>
          <div className="flex flex-col justify-center">
            <p className="font-script text-2xl text-hotpink">your cozy era ✿</p>
            <h2 className="mt-2 font-script text-6xl text-bloom-gradient">soft routines, big bloom</h2>
            <p className="mt-4 max-w-md text-base font-medium text-magenta/90">
              Build sweet little habits that make you feel like the main character. Track your cycle, journal your dreams, and walk your daily steps — all wrapped in pink.
            </p>
            <div className="mt-6">
              <Link to="/app/tools"
                className="hover-scale inline-flex items-center gap-2 rounded-full px-6 py-3 font-semibold text-white shadow-lg shadow-hotpink/40"
                style={{ background: "linear-gradient(135deg, oklch(0.7 0.25 350), oklch(0.6 0.28 0))" }}>
                Explore tools <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>

        {/* Blog section */}
        <section id="blog" className="mt-20">
          <div className="flex items-end justify-between">
            <div>
              <p className="font-script text-2xl text-hotpink">from the blog</p>
              <h2 className="font-script text-6xl text-bloom-gradient">feel-good reads</h2>
            </div>
            <a href="#" className="hidden text-sm font-bold text-magenta hover:text-hotpink sm:inline">see all →</a>
          </div>
          <div className="mt-8 grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-3">
            {POSTS.map((p) => (
              <article key={p.title} className="group overflow-hidden rounded-[1.5rem] sm:rounded-[2rem] bg-white/90 shadow-xl shadow-rose/10 backdrop-blur transition hover:-translate-y-2 hover:shadow-rose/30">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img src={p.img} alt={p.title} loading="lazy" width={768} height={576} className="h-full w-full object-cover transition duration-500 group-hover:scale-110" />
                  <span className="absolute left-2 top-2 sm:left-4 sm:top-4 rounded-full bg-white/90 px-2 py-0.5 sm:px-3 sm:py-1 text-[10px] sm:text-xs font-bold text-hotpink shadow">{p.tag}</span>
                </div>
                <div className="p-3 sm:p-5">
                  <h3 className="font-script text-xl sm:text-3xl text-bloom-gradient leading-tight">{p.title}</h3>
                  <p className="mt-1 text-xs sm:text-sm font-medium text-magenta/80">{p.blurb}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Testimonials */}
        <section className="mt-20">
          <div className="text-center">
            <p className="font-script text-2xl text-hotpink">our pink girls say</p>
            <h2 className="font-script text-6xl text-bloom-gradient">love letters 💌</h2>
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {QUOTES.map((q) => (
              <div key={q.name} className="rounded-[2rem] bg-white/85 p-6 shadow-xl shadow-rose/10 backdrop-blur">
                <Quote className="h-6 w-6 text-hotpink" />
                <p className="mt-3 text-sm font-medium text-magenta/90">{q.text}</p>
                <div className="mt-4 flex items-center gap-3">
                  <span className="grid h-10 w-10 place-items-center rounded-full bg-hotpink font-script text-xl text-white">{q.name[0]}</span>
                  <div>
                    <p className="text-sm font-bold text-magenta">{q.name}</p>
                    <div className="flex gap-0.5 text-hotpink">{Array.from({length: 5}).map((_, i) => <Star key={i} className="h-3 w-3 fill-hotpink" />)}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA / Subscribe */}
        <section id="subscribe" className="relative mt-20 overflow-hidden rounded-[3rem] p-10 text-center shadow-2xl shadow-hotpink/30"
          style={{ background: "linear-gradient(135deg, oklch(0.72 0.26 350), oklch(0.58 0.3 0), oklch(0.7 0.25 20))" }}>
          <Sparkles className="absolute left-10 top-8 h-6 w-6 animate-bloom-sparkle text-white" aria-hidden />
          <Heart className="absolute right-10 top-10 h-6 w-6 animate-bloom-float fill-white text-white" aria-hidden />
          <Star className="absolute bottom-8 left-1/4 h-5 w-5 animate-bloom-sparkle fill-white text-white" style={{ animationDelay: "0.8s" }} aria-hidden />
          <p className="font-script text-3xl text-white/90">join the bloom club</p>
          <h2 className="mt-2 font-script text-6xl text-white drop-shadow">your softest era awaits</h2>
          <p className="mx-auto mt-4 max-w-md text-white/90">Get weekly pink mail with feel-good rituals, recipes & reads. No spam, just sparkles.</p>
          <form className="mx-auto mt-6 flex max-w-md flex-col gap-2 sm:flex-row" onSubmit={(e) => e.preventDefault()}>
            <input
              type="email"
              placeholder="your@email.com"
              className="flex-1 rounded-full border-0 bg-white/95 px-5 py-3 text-sm font-medium text-magenta placeholder:text-rose/60 focus:outline-none focus:ring-2 focus:ring-white"
            />
            <button className="hover-scale rounded-full bg-white px-6 py-3 text-sm font-bold text-hotpink shadow-lg">Subscribe ✿</button>
          </form>
        </section>

        {/* Striped accent */}
        <div className="mt-10 h-3 rounded-full bloom-stripes opacity-70" aria-hidden />
      </main>

      <footer className="relative z-10 border-t border-petal/60 bg-white/70 py-8 text-center backdrop-blur">
        <p className="font-script text-2xl text-bloom-gradient">stay soft, bloom on 🌸</p>
        <p className="mt-1 text-xs font-medium text-magenta/70">© {new Date().getFullYear()} Bloom — all in pink</p>
      </footer>
    </div>
  );
}

import { Wallet, Heart as HeartIcon, Flower } from "lucide-react";
const FEATURES = [
  { icon: HeartIcon, title: "made with love", text: "Every tool is hand-crafted to feel cozy, cute and calm." },
  { icon: Flower, title: "all in one", text: "Budgets, yoga, diary, cycle & more — no more app juggling." },
  { icon: Wallet, title: "soft & free", text: "Start free, glow up to Premium when you're ready to bloom." },
];

const POSTS = [
  { title: "morning rituals", blurb: "5 soft habits to start your day pink.", tag: "Lifestyle", img: "/images/blog-1.png" },
  { title: "pink pilates", blurb: "A 10-min flow for your softest era.", tag: "Movement", img: "/images/blog-2.png" },
  { title: "strawberry season", blurb: "Sweet little recipes to glow on.", tag: "Treats", img: "/images/blog-3.png" },
];

const QUOTES = [
  { name: "Mia", text: "Bloom turned my chaotic mornings into a soft pink ritual. I journal every day now ✿" },
  { name: "Luna", text: "The cycle tracker is sooo cute and the mood circles literally made my week." },
  { name: "Sofia", text: "Finally an app that gets the vibe. It's like my phone got a pink makeover 💕" },
];

function Sunburst() {
  return (
    <svg viewBox="0 0 200 200" className="h-full w-full">
      <g fill="oklch(0.82 0.13 350 / 0.7)">
        {Array.from({ length: 12 }).map((_, i) => (
          <polygon
            key={i}
            points="100,100 95,0 105,0"
            transform={`rotate(${i * 18} 100 100)`}
          />
        ))}
      </g>
      <circle cx="100" cy="100" r="14" fill="oklch(0.7 0.22 0)" />
      <path d="M100 92 l8 10 -8 10 -8 -10z" fill="oklch(0.92 0.06 350)" />
    </svg>
  );
}

function FlowerShape() {
  // 6-petal flower silhouette with soft gradient + glossy highlight
  return (
    <svg viewBox="0 0 100 100" className="flower-bg absolute inset-0 h-full w-full" aria-hidden>
      <defs>
        <radialGradient id="petal-grad" cx="35%" cy="30%" r="75%">
          <stop offset="0%" stopColor="oklch(0.92 0.12 350)" />
          <stop offset="55%" stopColor="oklch(0.72 0.25 350)" />
          <stop offset="100%" stopColor="oklch(0.58 0.28 0)" />
        </radialGradient>
      </defs>
      <g fill="url(#petal-grad)">
        {Array.from({ length: 6 }).map((_, i) => (
          <ellipse key={i} cx="50" cy="22" rx="16" ry="22" transform={`rotate(${i * 60} 50 50)`} />
        ))}
      </g>
      <circle cx="50" cy="50" r="18" fill="oklch(0.78 0.22 350)" />
      <ellipse cx="42" cy="42" rx="6" ry="3" fill="oklch(1 0 0 / 0.55)" />
    </svg>
  );
}
