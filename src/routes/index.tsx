import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Heart,
  Sparkles,
  Star,
  Quote,
  CalendarHeart,
  UtensilsCrossed,
  Flower,
  BookHeart,
  Wallet,
  BellRing,
  Calendar as CalendarIcon,
  Lock,
  type LucideIcon,
} from "lucide-react";
import { BloomLogo } from "@/components/bloom/BloomLogo";
import { SparkleRing } from "@/components/bloom/SparkleRing";
import { useEffect, useMemo, useState } from "react";

/* ============================================================
   Backgrounds
============================================================ */
function SlowBubbles({ count = 14 }: { count?: number }) {
  const bubbles = useMemo(
    () =>
      Array.from({ length: count }).map((_, i) => {
        const size = 40 + Math.round(Math.random() * 130);
        const left = Math.round(Math.random() * 100);
        const duration = 38 + Math.round(Math.random() * 30);
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
      { title: "Bloom & Zein — your softest era starts here" },
      { name: "description", content: "One soft little app where your cycle, meals, yoga, diary, budget and reminders all talk to each other. Made for you." },
      { property: "og:title", content: "Bloom & Zein — your softest era starts here" },
      { property: "og:description", content: "Every tool knows what the others know. Your softest era starts here." },
    ],
  }),
  component: Landing,
});

/* ============================================================
   Tools, universes & connections
============================================================ */
type KitTool = {
  slug: string;
  label: string;
  icon: LucideIcon;
  whisper: string;
  to?: string;
  toParams?: Record<string, string>;
};

const BODY: KitTool[] = [
  { slug: "cycle", label: "Cycle Tracker", icon: CalendarHeart, whisper: "Your cycle quietly tells your Yoga and Meals what you need today.", to: "/app/tools/$slug", toParams: { slug: "cycle" } },
  { slug: "meals", label: "Meal Planner", icon: UtensilsCrossed, whisper: "Your meals shift with your phase — softer when you need softer.", to: "/app/tools/meals" },
  { slug: "yoga", label: "Yoga Flows", icon: Flower, whisper: "Your flow gets gentler on low-energy days, without you asking.", to: "/app/tools/yoga" },
];
const MIND: KitTool[] = [
  { slug: "diary", label: "Dreamy Diary", icon: BookHeart, whisper: "How you feel today gently nudges your Budget and your week.", to: "/app/tools/$slug", toParams: { slug: "diary" } },
];
const LIFE: KitTool[] = [
  { slug: "budget", label: "Budget Planner", icon: Wallet, whisper: "Your moods help your Budget notice the days you tend to overspend.", to: "/budget" },
  { slug: "reminders", label: "Reminders", icon: BellRing, whisper: "The little dates you care about are already in your week — softly.", to: "/app/today" },
];

const KIT_TOOLS: KitTool[] = [...BODY, ...MIND, ...LIFE];

type PairKey =
  | "cycle-meals"
  | "cycle-yoga"
  | "diary-budget"
  | "reminders-calendar"
  | "cycle-calendar";

const PAIR_PHRASE: Record<PairKey, string> = {
  "cycle-meals": "You’re in your luteal phase — here are meals that reduce bloating",
  "cycle-yoga": "Low energy day predicted — your gentle flow is ready",
  "diary-budget": "You tend to overspend when you’re anxious — we noticed a pattern",
  "reminders-calendar": "Your anniversary is in 3 days — it’s already in your week view",
  "cycle-calendar": "Your next period starts Friday — your week is already adjusted",
};

/* ============================================================
   Landing
============================================================ */
function Landing() {
  const [scrollY, setScrollY] = useState(0);
  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="relative min-h-screen overflow-x-hidden bloom-breathe">
      <SlowBubbles count={14} />
      <BokehSparkles count={18} />
      <div className="pointer-events-none absolute -left-32 top-40 -z-0 h-80 w-80 rounded-full bg-hotpink/20 blur-3xl animate-bloom-pulse" aria-hidden />
      <div className="pointer-events-none absolute -right-32 top-[60%] -z-0 h-96 w-96 rounded-full bg-rose/30 blur-3xl animate-bloom-pulse" style={{ animationDelay: "1.5s" }} aria-hidden />

      {/* Navbar — 3 items only */}
      <header className="sticky top-0 z-40 border-b border-petal/60 bg-white/75 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3 sm:px-6">
          <BloomLogo />
          <nav className="flex items-center gap-2 sm:gap-6 text-sm font-semibold text-rose">
            <a href="#kit" className="hidden sm:inline hover:text-hotpink transition">Our Kit</a>
            <a href="#how-it-works" className="hidden sm:inline hover:text-hotpink transition">How it works</a>
            <a href="#kit" className="sm:hidden hover:text-hotpink transition">Kit</a>
            <a href="#how-it-works" className="sm:hidden hover:text-hotpink transition">How</a>
            <Link
              to="/app/today"
              className="bloom-cta relative inline-flex items-center gap-1.5 overflow-hidden rounded-full px-4 py-2 sm:px-5 sm:py-2.5 text-xs sm:text-sm font-bold text-white"
            >
              <span className="relative z-10">Start Blooming</span>
              <span className="bloom-cta-shine" aria-hidden />
            </Link>
          </nav>
        </div>
      </header>

      <main className="relative z-10 mx-auto max-w-7xl px-4 pb-16 pt-4 sm:px-6 sm:pt-6">
        {/* ========== HERO ========== */}
        <section className="relative overflow-hidden rounded-[2rem] sm:rounded-[3rem] p-5 sm:p-10 md:p-14 shadow-[0_30px_80px_-30px_oklch(0.6_0.25_0/0.45)]"
          style={{ background: "linear-gradient(135deg, oklch(0.94 0.08 350) 0%, oklch(0.88 0.14 350) 50%, oklch(0.92 0.1 10) 100%)" }}>
          <Sparkles className="absolute left-4 top-5 h-4 w-4 sm:h-6 sm:w-6 animate-bloom-sparkle text-hotpink" aria-hidden />
          <Sparkles className="absolute right-6 top-8 h-4 w-4 animate-bloom-sparkle text-magenta" style={{ animationDelay: "0.6s" }} aria-hidden />
          <Star className="absolute right-8 bottom-8 h-4 w-4 animate-bloom-sparkle fill-hotpink text-hotpink" style={{ animationDelay: "1.2s" }} aria-hidden />
          <Heart className="absolute bottom-6 left-5 h-4 w-4 animate-bloom-float fill-hotpink text-hotpink" aria-hidden />
          <Sparkles className="absolute left-[20%] top-[18%] h-3 w-3 animate-bloom-sparkle text-white/90" style={{ animationDelay: "0.3s", transform: `translateY(${scrollY * -0.06}px)` }} aria-hidden />
          <Sparkles className="absolute right-[18%] top-[28%] h-3 w-3 animate-bloom-sparkle text-white/80" style={{ animationDelay: "1.4s", transform: `translateY(${scrollY * -0.04}px)` }} aria-hidden />

          <div className="flex flex-col items-center gap-4 text-center md:grid md:grid-cols-2 md:items-center md:gap-10 md:text-left">
            <div className="relative mx-auto h-[180px] w-[180px] sm:h-[240px] sm:w-[240px] md:h-[460px] md:w-[460px]">
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

            <div className="flex flex-col items-center md:items-start min-w-0">
              <h1 className="relative font-script text-6xl sm:text-7xl md:text-[6.5rem] lg:text-[8rem] leading-none text-bloom-gradient drop-shadow-[0_4px_20px_oklch(0.7_0.25_0/0.25)] bloom-title-shimmer">
                Bloom &amp; Zein
                <Sparkles className="absolute -right-2 -top-1 h-4 w-4 sm:h-5 sm:w-5 animate-bloom-sparkle text-hotpink" aria-hidden />
              </h1>
              <p className="mt-3 font-script text-2xl sm:text-3xl md:text-4xl text-magenta">your softest era starts here</p>
              <p className="mt-3 max-w-xs sm:max-w-sm md:max-w-md text-sm sm:text-base font-medium text-magenta/90">
                One little app where your cycle, meals, yoga, diary, budget and tiny reminders all quietly take care of you.
              </p>
              <div className="mt-5 flex flex-wrap items-center justify-center gap-2.5 md:justify-start">
                <Link
                  to="/app/today"
                  className="bloom-cta relative overflow-hidden hover-scale inline-flex items-center gap-2 rounded-full px-6 py-3 sm:px-7 sm:py-3.5 text-sm sm:text-base font-bold text-white"
                >
                  <span className="relative z-10 inline-flex items-center gap-2">Start Blooming <ArrowRight className="h-4 w-4" /></span>
                  <span className="bloom-cta-shine" aria-hidden />
                </Link>
                <a
                  href="#how-it-works"
                  className="hover-scale inline-flex items-center rounded-full border-2 border-white bg-white/90 px-5 py-2.5 sm:px-6 sm:py-3 text-sm sm:text-base font-semibold text-hotpink transition hover:bg-white"
                >
                  See how it works
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ========== KIT (3 universes) ========== */}
        <section id="kit" className="mt-12 sm:mt-16 scroll-mt-20">
          <div className="text-center">
            <p className="font-script text-2xl sm:text-3xl text-hotpink">your kit</p>
            <h2 className="font-script text-4xl sm:text-6xl text-bloom-gradient leading-tight">Your Bloom &amp; Zein Kit</h2>
            <p className="mx-auto mt-3 max-w-xl text-sm sm:text-base font-medium text-magenta/85">
              Six soft little tools, sorted into three parts of you. Each one quietly helps the others — so you don’t have to.
            </p>
          </div>

          <div className="mt-8 grid gap-5 sm:gap-6 md:grid-cols-3">
            <UniverseCard tone="body" emoji="🌿" title="Body" tagline="the way you feel in yours" tools={BODY} />
            <UniverseCard tone="mind" emoji="🧠" title="Mind" tagline="the soft inside of you" tools={MIND} />
            <UniverseCard tone="life" emoji="💗" title="Life" tagline="your little everyday" tools={LIFE} />
          </div>
        </section>

        {/* ========== HOW IT WORKS ========== */}
        <section id="how-it-works" className="mt-16 sm:mt-24 scroll-mt-20">
          <div className="text-center">
            <p className="font-script text-2xl sm:text-3xl text-hotpink">how it all connects</p>
            <h2 className="font-script text-4xl sm:text-6xl text-bloom-gradient leading-tight">
              Every tool knows what the others know.
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-sm sm:text-base font-medium text-magenta/85">
              Tap a glowing thread to see how two parts of your life softly talk to each other.
            </p>
          </div>

          <ConnectionWeb />

          <div className="mt-10 text-center">
            <p className="font-script text-3xl sm:text-5xl text-bloom-gradient leading-tight">
              One app. One you. Everything connected.
            </p>
            <div className="mt-5">
              <Link
                to="/app/today"
                className="bloom-cta relative inline-flex items-center gap-2 overflow-hidden rounded-full px-6 py-3 text-sm sm:text-base font-bold text-white"
              >
                <span className="relative z-10 inline-flex items-center gap-2">
                  See it in action <ArrowRight className="h-4 w-4" />
                </span>
                <span className="bloom-cta-shine" aria-hidden />
              </Link>
            </div>
          </div>
        </section>

        {/* ========== SOCIAL PROOF ========== */}
        <section className="mt-16 sm:mt-24">
          <div className="text-center">
            <p className="font-script text-2xl sm:text-3xl text-hotpink">love notes</p>
            <h2 className="font-script text-4xl sm:text-6xl text-bloom-gradient">from girls like you</h2>
          </div>
          <div className="mt-8 grid gap-5 sm:gap-6 md:grid-cols-3">
            {QUOTES.map((q) => (
              <div key={q.name} className="rounded-[1.75rem] sm:rounded-[2rem] bg-white/85 p-5 sm:p-6 shadow-xl shadow-rose/10 backdrop-blur">
                <Quote className="h-6 w-6 text-hotpink" />
                <p className="mt-3 text-sm sm:text-base font-medium text-magenta/90 leading-relaxed">{q.text}</p>
                <div className="mt-4 flex items-center gap-3">
                  <span className="grid h-10 w-10 place-items-center rounded-full bg-hotpink font-script text-xl text-white">{q.name[0]}</span>
                  <div>
                    <p className="text-sm font-bold text-magenta">{q.name}</p>
                    <div className="flex gap-0.5 text-hotpink">{Array.from({ length: 5 }).map((_, i) => <Star key={i} className="h-3 w-3 fill-hotpink" />)}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ========== FINAL CTA ========== */}
        <section className="relative mt-16 sm:mt-24 overflow-hidden rounded-[2rem] sm:rounded-[3rem] p-8 sm:p-12 text-center shadow-2xl shadow-hotpink/30"
          style={{ background: "linear-gradient(135deg, oklch(0.72 0.26 350), oklch(0.58 0.3 0), oklch(0.7 0.25 20))" }}>
          <Sparkles className="absolute left-10 top-8 h-6 w-6 animate-bloom-sparkle text-white" aria-hidden />
          <Heart className="absolute right-10 top-10 h-6 w-6 animate-bloom-float fill-white text-white" aria-hidden />
          <Star className="absolute bottom-8 left-1/4 h-5 w-5 animate-bloom-sparkle fill-white text-white" style={{ animationDelay: "0.8s" }} aria-hidden />
          <p className="font-script text-2xl sm:text-3xl text-white/90">your turn</p>
          <h2 className="mt-2 font-script text-4xl sm:text-6xl md:text-7xl text-white drop-shadow leading-tight">Start your softest era</h2>
          <p className="mx-auto mt-4 max-w-md text-sm sm:text-base text-white/90">
            One app. One you. Everything quietly working together.
          </p>
          <div className="mt-6 flex justify-center">
            <Link
              to="/app/today"
              className="hover-scale inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm sm:text-base font-bold text-hotpink shadow-lg"
            >
              Start Blooming <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <p className="mx-auto mt-6 inline-flex max-w-md items-center justify-center gap-1.5 rounded-full bg-white/15 px-4 py-2 text-xs sm:text-sm font-medium text-white/95 backdrop-blur">
            <Lock className="h-3.5 w-3.5" aria-hidden />
            Your softest secrets stay yours — stored safely, never sold, never shared.
          </p>
        </section>
      </main>

      <footer className="relative z-10 border-t border-petal/60 bg-white/70 py-8 text-center backdrop-blur">
        <p className="font-script text-2xl text-bloom-gradient">stay soft, bloom on 🌸</p>
        <p className="mt-1 text-xs font-medium text-magenta/70">© {new Date().getFullYear()} Bloom &amp; Zein — made for you</p>
      </footer>

      {/* shared keyframes / utilities */}
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

        /* universes */
        .universe-card {
          position: relative;
          border-radius: 2rem;
          padding: 1.25rem;
          backdrop-filter: blur(8px);
          border: 1px solid oklch(1 0 0 / 0.6);
          box-shadow: 0 20px 50px -25px oklch(0.6 0.25 350 / 0.4);
          transition: transform 0.35s ease, box-shadow 0.35s ease;
        }
        .universe-card:hover { transform: translateY(-4px); box-shadow: 0 30px 60px -25px oklch(0.6 0.27 350 / 0.55); }
        .universe-body { background: linear-gradient(160deg, oklch(0.97 0.04 350 / 0.9), oklch(0.93 0.09 350 / 0.85)); }
        .universe-mind { background: linear-gradient(160deg, oklch(0.97 0.05 340 / 0.9), oklch(0.9 0.13 340 / 0.85)); }
        .universe-life { background: linear-gradient(160deg, oklch(0.97 0.05 10 / 0.9), oklch(0.9 0.13 0 / 0.85)); }

        .tool-row {
          display: flex; align-items: flex-start; gap: 0.75rem;
          padding: 0.65rem 0.75rem;
          border-radius: 1.25rem;
          background: oklch(1 0 0 / 0.65);
          border: 1px solid oklch(0.92 0.06 350 / 0.7);
          transition: transform 0.25s ease, background 0.25s ease;
        }
        .tool-row:hover { transform: translateX(2px); background: oklch(1 0 0 / 0.9); }
        .tool-bubble {
          flex-shrink: 0;
          width: 2.5rem; height: 2.5rem;
          display: grid; place-items: center;
          border-radius: 999px;
          color: white;
          background: linear-gradient(135deg, oklch(0.78 0.22 350), oklch(0.58 0.3 0));
          box-shadow: 0 6px 14px -4px oklch(0.55 0.28 0 / 0.5);
        }

        /* web diagram */
        .pair-btn { transition: transform 0.2s ease, filter 0.2s ease; }
        .pair-btn:hover { transform: scale(1.06); filter: drop-shadow(0 6px 14px oklch(0.65 0.28 350 / 0.55)); }
      `}</style>
    </div>
  );
}

/* ============================================================
   Universe card
============================================================ */
function UniverseCard({
  tone,
  emoji,
  title,
  tagline,
  tools,
}: {
  tone: "body" | "mind" | "life";
  emoji: string;
  title: string;
  tagline: string;
  tools: KitTool[];
}) {
  return (
    <div className={`universe-card universe-${tone}`}>
      <div className="flex items-baseline gap-2">
        <span className="text-2xl" aria-hidden>{emoji}</span>
        <h3 className="font-script text-4xl text-bloom-gradient leading-none">{title}</h3>
      </div>
      <p className="mt-1 text-xs sm:text-sm font-medium text-magenta/80">{tagline}</p>

      <ul className="mt-4 flex flex-col gap-2.5">
        {tools.map((t) => {
          const Icon = t.icon;
          const inner = (
            <>
              <span className="tool-bubble">
                <Icon className="h-4 w-4" strokeWidth={1.9} />
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-bold text-magenta leading-tight">{t.label}</p>
                <p className="mt-0.5 text-xs sm:text-[13px] font-medium text-magenta/75 leading-snug">{t.whisper}</p>
              </div>
            </>
          );
          if (t.to && t.toParams) {
            return (
              <li key={t.slug}>
                <Link to={t.to} params={t.toParams} className="tool-row">{inner}</Link>
              </li>
            );
          }
          if (t.to) {
            return (
              <li key={t.slug}>
                <Link to={t.to} className="tool-row">{inner}</Link>
              </li>
            );
          }
          return <li key={t.slug} className="tool-row">{inner}</li>;
        })}
      </ul>
    </div>
  );
}

/* ============================================================
   Connection web
============================================================ */
type NodeDef = { id: string; label: string; icon: LucideIcon; angle: number };

const WEB_NODES: NodeDef[] = [
  { id: "cycle",     label: "Cycle",     icon: CalendarHeart,     angle: -90 },
  { id: "meals",     label: "Meals",     icon: UtensilsCrossed,   angle: -30 },
  { id: "yoga",      label: "Yoga",      icon: Flower,            angle: 30  },
  { id: "reminders", label: "Reminders", icon: BellRing,          angle: 90  },
  { id: "budget",    label: "Budget",    icon: Wallet,            angle: 150 },
  { id: "diary",     label: "Diary",     icon: BookHeart,         angle: 210 },
];

type Pair = { a: string; b: string; key: PairKey };
const PAIRS: Pair[] = [
  { a: "cycle",     b: "calendar", key: "cycle-calendar" },
  { a: "cycle",     b: "meals",    key: "cycle-meals" },
  { a: "cycle",     b: "yoga",     key: "cycle-yoga" },
  { a: "diary",     b: "budget",   key: "diary-budget" },
  { a: "reminders", b: "calendar", key: "reminders-calendar" },
];

function ConnectionWeb() {
  const [active, setActive] = useState<PairKey | null>(null);

  // SVG viewBox 600x600, calendar at (300,300), nodes on radius 220
  const R = 220;
  const C = 300;
  const positions: Record<string, { x: number; y: number }> = { calendar: { x: C, y: C } };
  WEB_NODES.forEach((n) => {
    const rad = (n.angle * Math.PI) / 180;
    positions[n.id] = { x: C + R * Math.cos(rad), y: C + R * Math.sin(rad) };
  });

  // also connect every outer node to calendar (for visual web) — but only the 5 PAIRS are interactive with phrases
  const calendarLines = WEB_NODES.map((n) => ({ from: "calendar", to: n.id }));

  const activePair = PAIRS.find((p) => p.key === active) || null;
  const phrase = activePair ? PAIR_PHRASE[activePair.key] : null;

  const isPairActive = (p: Pair) => active === p.key;

  return (
    <div className="relative mx-auto mt-8 max-w-3xl">
      <div className="relative rounded-[2rem] bg-white/70 p-3 sm:p-6 backdrop-blur shadow-[0_25px_60px_-25px_oklch(0.55_0.28_0/0.35)] border border-white/60">
        <div className="relative aspect-square w-full">
          <svg viewBox="0 0 600 600" className="absolute inset-0 h-full w-full" aria-hidden>
            <defs>
              <radialGradient id="centerHalo" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="oklch(0.92 0.15 350 / 0.55)" />
                <stop offset="100%" stopColor="oklch(0.92 0.15 350 / 0)" />
              </radialGradient>
            </defs>

            {/* soft halo behind center */}
            <circle cx={C} cy={C} r="120" fill="url(#centerHalo)" />

            {/* calendar→tool faint lines */}
            {calendarLines.map((l) => {
              const a = positions[l.from];
              const b = positions[l.to];
              const pairForLine =
                (l.to === "cycle"     && "cycle-calendar") ||
                (l.to === "reminders" && "reminders-calendar") ||
                null;
              const isHot = pairForLine && active === pairForLine;
              const dim = active && !isHot;
              return (
                <line
                  key={`cal-${l.to}`}
                  x1={a.x} y1={a.y} x2={b.x} y2={b.y}
                  stroke={isHot ? "oklch(0.6 0.3 0)" : "oklch(0.78 0.18 350)"}
                  strokeWidth={isHot ? 4 : 1.5}
                  strokeOpacity={dim ? 0.18 : isHot ? 1 : 0.45}
                  strokeLinecap="round"
                />
              );
            })}

            {/* tool-to-tool pair lines (cycle-meals, cycle-yoga, diary-budget) */}
            {PAIRS.filter((p) => p.a !== "calendar" && p.b !== "calendar").map((p) => {
              const a = positions[p.a];
              const b = positions[p.b];
              const hot = isPairActive(p);
              const dim = active && !hot;
              return (
                <line
                  key={p.key}
                  x1={a.x} y1={a.y} x2={b.x} y2={b.y}
                  stroke={hot ? "oklch(0.6 0.3 0)" : "oklch(0.82 0.16 350)"}
                  strokeWidth={hot ? 4 : 1.5}
                  strokeOpacity={dim ? 0.15 : hot ? 1 : 0.4}
                  strokeLinecap="round"
                  strokeDasharray={hot ? "0" : "6 8"}
                />
              );
            })}
          </svg>

          {/* Center calendar node */}
          <NodeChip
            x={C} y={C}
            label="Calendar"
            icon={CalendarIcon}
            isCenter
            dimmed={false}
          />

          {/* Outer nodes */}
          {WEB_NODES.map((n) => {
            const pos = positions[n.id];
            const involved = activePair && (activePair.a === n.id || activePair.b === n.id);
            const dimmed = !!active && !involved;
            return (
              <NodeChip
                key={n.id}
                x={pos.x} y={pos.y}
                label={n.label}
                icon={n.icon}
                dimmed={dimmed}
              />
            );
          })}

          {/* invisible pair-hit buttons positioned at midpoints */}
          {PAIRS.map((p) => {
            const a = positions[p.a];
            const b = positions[p.b];
            const mx = (a.x + b.x) / 2;
            const my = (a.y + b.y) / 2;
            return (
              <button
                key={`hit-${p.key}`}
                type="button"
                onMouseEnter={() => setActive(p.key)}
                onMouseLeave={() => setActive((cur) => (cur === p.key ? null : cur))}
                onClick={() => setActive((cur) => (cur === p.key ? null : p.key))}
                aria-label={PAIR_PHRASE[p.key]}
                className="pair-btn absolute -translate-x-1/2 -translate-y-1/2 rounded-full"
                style={{
                  left: `${(mx / 600) * 100}%`,
                  top: `${(my / 600) * 100}%`,
                  width: 26, height: 26,
                  background: active === p.key
                    ? "radial-gradient(circle, oklch(0.65 0.3 0) 30%, oklch(0.78 0.25 350 / 0.4) 100%)"
                    : "radial-gradient(circle, oklch(0.85 0.2 350) 30%, oklch(0.85 0.2 350 / 0) 70%)",
                  boxShadow: active === p.key ? "0 0 24px oklch(0.65 0.3 0 / 0.7)" : "0 0 12px oklch(0.85 0.2 350 / 0.5)",
                }}
              />
            );
          })}
        </div>

        {/* Phrase display */}
        <div className="relative mt-3 sm:mt-5 min-h-[64px] sm:min-h-[72px] rounded-2xl bg-gradient-to-br from-white/95 to-blush/70 border border-petal/60 px-4 py-3 sm:px-5 sm:py-4 flex items-center justify-center text-center">
          {phrase ? (
            <p className="font-script text-xl sm:text-3xl text-bloom-gradient leading-tight animate-fade-in">
              “{phrase}”
            </p>
          ) : (
            <p className="text-xs sm:text-sm font-medium text-magenta/75">
              Tap a glowing dot between two tools to hear what they whisper to each other ✿
            </p>
          )}
        </div>

        {/* mobile-friendly pair list */}
        <div className="mt-4 flex flex-wrap justify-center gap-2">
          {PAIRS.map((p) => {
            const labelA = p.a === "calendar" ? "Calendar" : WEB_NODES.find((n) => n.id === p.a)?.label;
            const labelB = p.b === "calendar" ? "Calendar" : WEB_NODES.find((n) => n.id === p.b)?.label;
            const isActive = active === p.key;
            return (
              <button
                key={`chip-${p.key}`}
                type="button"
                onClick={() => setActive((cur) => (cur === p.key ? null : p.key))}
                className={[
                  "rounded-full px-3 py-1.5 text-[11px] sm:text-xs font-semibold transition",
                  isActive
                    ? "bg-hotpink text-white shadow-md shadow-hotpink/40"
                    : "bg-white/85 text-magenta border border-petal/60 hover:bg-white",
                ].join(" ")}
              >
                {labelA} ✿ {labelB}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function NodeChip({
  x, y, label, icon: Icon, isCenter = false, dimmed = false,
}: {
  x: number; y: number; label: string; icon: LucideIcon; isCenter?: boolean; dimmed?: boolean;
}) {
  return (
    <div
      className="absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-1 transition-opacity"
      style={{
        left: `${(x / 600) * 100}%`,
        top: `${(y / 600) * 100}%`,
        opacity: dimmed ? 0.35 : 1,
      }}
    >
      <span
        className={[
          "grid place-items-center rounded-full text-white shadow-lg",
          isCenter ? "h-16 w-16 sm:h-20 sm:w-20" : "h-11 w-11 sm:h-14 sm:w-14",
        ].join(" ")}
        style={{
          background: isCenter
            ? "linear-gradient(135deg, oklch(0.65 0.3 0), oklch(0.55 0.3 350))"
            : "linear-gradient(135deg, oklch(0.78 0.22 350), oklch(0.6 0.28 0))",
          boxShadow: isCenter
            ? "0 12px 30px -6px oklch(0.55 0.3 0 / 0.6), 0 0 30px oklch(0.78 0.25 350 / 0.5)"
            : "0 8px 18px -6px oklch(0.55 0.3 0 / 0.5)",
        }}
      >
        <Icon className={isCenter ? "h-7 w-7 sm:h-9 sm:w-9" : "h-5 w-5 sm:h-6 sm:w-6"} strokeWidth={1.8} />
      </span>
      <span
        className={[
          "rounded-full bg-white/90 px-2 py-0.5 font-bold text-magenta shadow-sm whitespace-nowrap",
          isCenter ? "font-script text-base sm:text-xl text-hotpink" : "text-[10px] sm:text-xs",
        ].join(" ")}
      >
        {label}
      </span>
    </div>
  );
}

/* ============================================================
   Quotes
============================================================ */
const QUOTES = [
  { name: "Mia",   text: "I stopped using 6 different apps the day I found Bloom & Zein. It just… gets me." },
  { name: "Luna",  text: "It’s the first app that feels like a friend instead of a to-do list." },
  { name: "Sofia", text: "My cycle, my mood, my little reminders — everything finally talks to each other." },
];
