import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Heart, Instagram, Music2, Sparkles } from "lucide-react";
import { BloomLogo } from "@/components/bloom/BloomLogo";
import { BloomBackground } from "@/components/bloom/BloomBackground";
import { TOOLS } from "@/components/bloom/tools";

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
  return (
    <div className="min-h-screen bg-background">
      <BloomBackground />

      {/* Announcement bar */}
      <div className="bg-hotpink py-2 text-center text-sm font-medium text-white">
        ✿ NEW! Bloom Premium is here — get 20% off today ✿
      </div>

      {/* Navbar */}
      <header className="border-b border-petal/60 bg-white/60 backdrop-blur">
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

      <main className="mx-auto max-w-7xl px-4 pb-16 pt-6 sm:px-6">
        {/* Hero */}
        <section className="relative overflow-hidden rounded-[3rem] bg-petal/70 p-6 shadow-[0_20px_60px_-30px_oklch(0.7_0.22_0/0.35)] sm:p-10 md:p-14">
          {/* sunburst */}
          <div className="pointer-events-none absolute -right-10 -top-10 hidden h-64 w-64 opacity-60 md:block" aria-hidden>
            <Sunburst />
          </div>
          <Sparkles className="absolute left-6 top-8 h-6 w-6 text-rose/70" aria-hidden />
          <Sparkles className="absolute left-1/3 top-12 h-5 w-5 text-rose/60" aria-hidden />
          <Heart className="absolute bottom-8 left-6 h-5 w-5 fill-hotpink text-hotpink" aria-hidden />

          <div className="grid items-center gap-10 md:grid-cols-2">
            <div className="relative mx-auto">
              <div className="absolute inset-0 -m-4 rounded-[45%_55%_60%_40%/55%_45%_50%_50%] bg-rose/40 blur-xl" aria-hidden />
              <img
                src="/images/hero-girl.png"
                alt="A joyful girl with vibrant pink hair smiling"
                width={520}
                height={520}
                className="relative h-[320px] w-[320px] object-cover shadow-2xl sm:h-[420px] sm:w-[420px]"
                style={{ borderRadius: "55% 45% 50% 50% / 60% 55% 45% 40%" }}
              />
            </div>

            <div>
              <h1 className="font-script text-7xl leading-none text-hotpink sm:text-8xl">Bloom</h1>
              <p className="mt-3 font-script text-3xl text-rose">your softest era starts here</p>
              <p className="mt-6 max-w-md text-rose/90">
                The cutest little app packed with tools for the modern girl — budgets, yoga, steps, diaries, cycles & feel-good reads. All in pink. <span className="inline-block">💕</span>
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  to="/app/tools"
                  className="inline-flex items-center gap-2 rounded-full bg-hotpink px-6 py-3 font-semibold text-white shadow-lg shadow-hotpink/30 transition hover:bg-magenta"
                >
                  Start Blooming <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  to="/app/today"
                  className="inline-flex items-center rounded-full border-2 border-white bg-white/80 px-6 py-3 font-semibold text-hotpink transition hover:bg-white"
                >
                  Open App
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Tools strip */}
        <section className="mt-8 rounded-[2.5rem] bg-white/85 p-6 shadow-xl shadow-rose/10 backdrop-blur">
          <div className="grid grid-cols-3 gap-4 md:grid-cols-6">
            {TOOLS.map((t) => (
              <Link
                key={t.slug}
                to="/app/tools/$slug"
                params={{ slug: t.slug }}
                className="group flex flex-col items-center gap-2 text-center"
              >
                <span className="grid h-14 w-14 place-items-center rounded-full bg-hotpink text-white shadow-md transition group-hover:scale-105 group-hover:bg-magenta">
                  <t.icon className="h-6 w-6" />
                </span>
                <span className="text-xs font-semibold text-rose">{t.label}</span>
              </Link>
            ))}
          </div>
        </section>

        {/* Striped accent */}
        <div className="mt-10 h-3 rounded-full bloom-stripes opacity-70" aria-hidden />
      </main>

      <footer className="border-t border-petal/60 bg-white/60 py-6 text-center text-xs text-rose">
        stay soft, bloom on 🌸
      </footer>
    </div>
  );
}

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
