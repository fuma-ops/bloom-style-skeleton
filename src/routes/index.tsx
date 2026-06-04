import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Heart, Instagram, Music2, Sparkles, Star, Quote } from "lucide-react";
import { BloomLogo } from "@/components/bloom/BloomLogo";
import { TOOLS } from "@/components/bloom/tools";
import { SparkleRing } from "@/components/bloom/SparkleRing";

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
    <div className="relative min-h-screen overflow-hidden bloom-aurora">
      {/* floating blobs */}
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

      <main className="relative z-10 mx-auto max-w-7xl px-4 pb-16 pt-6 sm:px-6">
        {/* Hero */}
        <section className="relative overflow-hidden rounded-[3rem] p-6 shadow-[0_30px_80px_-30px_oklch(0.6_0.25_0/0.45)] sm:p-10 md:p-14"
          style={{ background: "linear-gradient(135deg, oklch(0.94 0.08 350) 0%, oklch(0.88 0.14 350) 50%, oklch(0.92 0.1 10) 100%)" }}>
          {/* sunburst */}
          <div className="pointer-events-none absolute -right-10 -top-10 hidden h-64 w-64 opacity-60 md:block" aria-hidden>
            <Sunburst />
          </div>
          <Sparkles className="absolute left-6 top-8 h-6 w-6 animate-bloom-sparkle text-hotpink" aria-hidden />
          <Sparkles className="absolute left-1/3 top-12 h-5 w-5 animate-bloom-sparkle text-magenta" style={{ animationDelay: "0.6s" }} aria-hidden />
          <Star className="absolute right-10 bottom-10 h-5 w-5 animate-bloom-sparkle fill-hotpink text-hotpink" style={{ animationDelay: "1.2s" }} aria-hidden />
          <Heart className="absolute bottom-8 left-6 h-5 w-5 animate-bloom-float fill-hotpink text-hotpink" aria-hidden />

          <div className="grid items-center gap-10 md:grid-cols-2">
            <div className="relative mx-auto h-[360px] w-[360px] sm:h-[460px] sm:w-[460px]">
              <div className="absolute inset-0 -m-6 rounded-[45%_55%_60%_40%/55%_45%_50%_50%] bg-hotpink/40 blur-2xl animate-bloom-pulse" aria-hidden />
              <SparkleRing radius={200} />
              <div className="animate-bloom-float">
                <img
                  src="/images/hero-girl.png"
                  alt="A joyful girl with vibrant pink hair smiling"
                  width={520}
                  height={520}
                  className="relative h-[320px] w-[320px] object-cover shadow-2xl sm:h-[420px] sm:w-[420px] mx-auto mt-5"
                  style={{ borderRadius: "55% 45% 50% 50% / 60% 55% 45% 40%" }}
                />
              </div>
            </div>

            <div>
              <h1 className="font-script text-8xl leading-none text-bloom-gradient drop-shadow-[0_4px_20px_oklch(0.7_0.25_0/0.25)] sm:text-9xl">Bloom</h1>
              <p className="mt-3 font-script text-3xl text-magenta">your softest era starts here</p>
              <p className="mt-6 max-w-md text-base font-medium text-magenta/90">
                The cutest little app packed with tools for the modern girl — budgets, yoga, steps, diaries, cycles & feel-good reads. All in pink. <span className="inline-block">💕</span>
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  to="/app/tools"
                  className="hover-scale inline-flex items-center gap-2 rounded-full px-6 py-3 font-semibold text-white shadow-lg shadow-hotpink/40 transition"
                  style={{ background: "linear-gradient(135deg, oklch(0.7 0.25 350), oklch(0.6 0.28 0))" }}
                >
                  Start Blooming <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  to="/app/today"
                  className="hover-scale inline-flex items-center rounded-full border-2 border-white bg-white/90 px-6 py-3 font-semibold text-hotpink transition hover:bg-white"
                >
                  Open App
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Tools strip */}
        <section className="mt-8 animate-fade-in rounded-[2.5rem] bg-white/85 p-6 shadow-xl shadow-rose/10 backdrop-blur">
          <div className="grid grid-cols-3 gap-4 md:grid-cols-6">
            {TOOLS.map((t) => (
              <Link
                key={t.slug}
                to="/app/tools/$slug"
                params={{ slug: t.slug }}
                className="group flex flex-col items-center gap-2 text-center transition hover:-translate-y-1"
              >
                <span className="grid h-14 w-14 place-items-center rounded-full text-white shadow-lg shadow-hotpink/30 transition group-hover:scale-110"
                  style={{ background: "linear-gradient(135deg, oklch(0.72 0.24 350), oklch(0.58 0.28 0))" }}>
                  <t.icon className="h-6 w-6" />
                </span>
                <span className="text-xs font-bold text-magenta">{t.label}</span>
              </Link>
            ))}
          </div>
        </section>

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
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {POSTS.map((p) => (
              <article key={p.title} className="group overflow-hidden rounded-[2rem] bg-white/90 shadow-xl shadow-rose/10 backdrop-blur transition hover:-translate-y-2 hover:shadow-rose/30">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img src={p.img} alt={p.title} loading="lazy" width={768} height={576} className="h-full w-full object-cover transition duration-500 group-hover:scale-110" />
                  <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-bold text-hotpink shadow">{p.tag}</span>
                </div>
                <div className="p-5">
                  <h3 className="font-script text-3xl text-bloom-gradient">{p.title}</h3>
                  <p className="mt-1 text-sm font-medium text-magenta/80">{p.blurb}</p>
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
