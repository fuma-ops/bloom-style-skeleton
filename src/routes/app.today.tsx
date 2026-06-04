import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import {
  Sparkles, Flower2, Pill, Wallet, Footprints, Heart,
  PencilLine, ArrowRight, Clock, Flame, Sun, Moon, Smile,
  Cloud, CloudRain, Battery, Droplet, Activity,
} from "lucide-react";
import { BloomBubbles } from "@/components/bloom/BloomBubbles";

export const Route = createFileRoute("/app/today")({
  head: () => ({ meta: [{ title: "Today — Bloom" }] }),
  component: TodayPage,
});

const NAME = "Sofia";
const STORAGE = { mood: "bloom:today-mood", streak: "bloom:streak-days" };

const MOODS = [
  { key: "calm",      label: "Calm",       Icon: Cloud },
  { key: "happy",     label: "Happy",      Icon: Smile },
  { key: "energetic", label: "Energetic",  Icon: Sparkles },
  { key: "sensitive", label: "Sensitive",  Icon: Heart },
  { key: "sad",       label: "Sad",        Icon: CloudRain },
  { key: "tired",     label: "Tired",      Icon: Battery },
  { key: "cramps",    label: "Cramps",     Icon: Activity },
  { key: "bloated",   label: "Bloated",    Icon: Droplet },
] as const;

function useCountUp(target: number, duration = 900) {
  const [v, setV] = useState(0);
  useEffect(() => {
    let raf = 0;
    const t0 = performance.now();
    const tick = (t: number) => {
      const p = Math.min((t - t0) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setV(target * eased);
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, duration]);
  return v;
}

function greeting(): { text: string; Icon: typeof Sun } {
  const h = new Date().getHours();
  if (h < 5) return { text: "Good night", Icon: Moon };
  if (h < 12) return { text: "Good morning", Icon: Sun };
  if (h < 18) return { text: "Good afternoon", Icon: Sun };
  return { text: "Good evening", Icon: Moon };
}

function fmtDate(d = new Date()) {
  return d.toLocaleDateString(undefined, { weekday: "long", month: "long", day: "numeric" });
}

function TodayPage() {
  const { text: hello, Icon: HelloIcon } = useMemo(greeting, []);
  const today = useMemo(() => fmtDate(), []);
  const [mood, setMood] = useState<string | null>(null);
  const [justPicked, setJustPicked] = useState<string | null>(null);

  useEffect(() => {
    try { setMood(localStorage.getItem(STORAGE.mood)); } catch {}
  }, []);

  const pickMood = (key: string) => {
    setMood(key);
    setJustPicked(key);
    try { localStorage.setItem(STORAGE.mood, key); } catch {}
    setTimeout(() => setJustPicked(null), 500);
  };

  // Sample data
  const steps = 6420;
  const stepsGoal = 8000;
  const spentToday = 24;
  const leftThisMonth = 840;
  const cycleDay = 14;
  const streak = 7;

  return (
    <div className="relative">
      <BloomBubbles count={10} />

      {/* GREETING HEADER */}
      <section
        className="relative overflow-hidden rounded-[2.5rem] border border-petal/60 shadow-[0_20px_50px_-20px_oklch(0.6_0.27_350/0.45)] stagger"
        style={{ animationDelay: "0ms" }}
      >
        <img src="/images/today-hero.png" alt="" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-white/85 via-white/40 to-transparent" />
        <div className="relative px-6 py-10 sm:px-12 sm:py-14 max-w-xl">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-white/85 backdrop-blur px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-hotpink border border-petal/60">
            <HelloIcon className="h-3 w-3" strokeWidth={2} /> {today}
          </div>
          <h1 className="mt-3 font-script text-5xl sm:text-6xl text-hotpink leading-none drop-shadow-[0_2px_6px_oklch(1_0_0/0.5)]">
            {hello}, {NAME}
          </h1>
          <p className="mt-4 text-base sm:text-lg text-rose italic leading-snug">
            "You are blooming at your own pace."
          </p>
          <div className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-hotpink/10 text-hotpink text-xs font-semibold px-3 py-1 border border-hotpink/20">
            <Flame className="h-3.5 w-3.5" strokeWidth={1.8} /> {streak} days blooming
          </div>
        </div>
      </section>

      {/* MOOD */}
      <section className="mt-8 stagger" style={{ animationDelay: "80ms" }}>
        <SectionTitle>How are you feeling today?</SectionTitle>
        <div className="rounded-3xl bg-white/85 backdrop-blur p-4 sm:p-5 border border-petal/50 shadow-[0_10px_24px_-14px_oklch(0.7_0.18_350/0.3)]">
          <div className="grid grid-cols-4 gap-2 sm:grid-cols-8 sm:gap-3">
            {MOODS.map((m) => {
              const active = mood === m.key;
              const bouncing = justPicked === m.key;
              return (
                <button
                  key={m.key}
                  onClick={() => pickMood(m.key)}
                  className={[
                    "group flex flex-col items-center gap-1.5 rounded-2xl p-2 sm:p-3 transition border",
                    active
                      ? "bg-hotpink/10 border-hotpink/30"
                      : "bg-transparent border-transparent hover:bg-blush/60",
                    bouncing ? "animate-bloom-bounce" : "",
                  ].join(" ")}
                >
                  <span
                    className={[
                      "grid h-11 w-11 sm:h-12 sm:w-12 place-items-center rounded-full transition",
                      active
                        ? "bg-gradient-to-br from-hotpink to-magenta text-white shadow-md shadow-hotpink/40"
                        : "bg-blush text-hotpink group-hover:bg-petal/70",
                    ].join(" ")}
                  >
                    <m.Icon className="h-5 w-5" strokeWidth={1.6} />
                  </span>
                  <span className={["text-[11px] font-semibold", active ? "text-hotpink" : "text-rose"].join(" ")}>{m.label}</span>
                </button>
              );
            })}
          </div>
          {mood && (
            <p className="mt-3 text-center text-xs text-rose/70 animate-fade-in">
              Logged — be gentle with yourself today ✿
            </p>
          )}
        </div>
      </section>

      {/* AT A GLANCE */}
      <section className="mt-8 stagger" style={{ animationDelay: "160ms" }}>
        <SectionTitle hint="today">Today at a glance</SectionTitle>
        <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
          <GlanceCard Icon={Flower2} label="Cycle" value={`Day ${cycleDay}`} note="Bloom phase — you're radiant" tone="from-hotpink to-magenta" />
          <GlanceCard Icon={Pill} label="Reminders" value="1 due" note="Vitamin D — at 9:00" tone="from-hotpink to-magenta" />
          <BudgetGlance spent={spentToday} left={leftThisMonth} />
          <StepsGlance steps={steps} goal={stepsGoal} />
        </div>
      </section>

      {/* QUICK ACTIONS */}
      <section className="mt-8 stagger" style={{ animationDelay: "240ms" }}>
        <SectionTitle>Quick actions</SectionTitle>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          <QuickAction to="/app/today" Icon={Smile} label="Log mood" />
          <QuickAction to="/budget" Icon={Wallet} label="Add expense" />
          <QuickAction to="/app/tools/$slug" params={{ slug: "diary" }} Icon={PencilLine} label="Write in diary" />
          <QuickAction to="/app/tools/$slug" params={{ slug: "yoga" }} Icon={Flower2} label="Start yoga" />
        </div>
      </section>

      {/* RITUAL */}
      <section className="mt-8 stagger" style={{ animationDelay: "320ms" }}>
        <SectionTitle>Today's ritual</SectionTitle>
        <div className="rounded-3xl border border-petal/50 bg-gradient-to-br from-white/90 to-blush/80 backdrop-blur p-5 sm:p-6 shadow-[0_10px_24px_-14px_oklch(0.7_0.18_350/0.3)] flex items-start gap-4">
          <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-hotpink to-magenta text-white shadow-md shadow-hotpink/30">
            <Heart className="h-5 w-5" strokeWidth={1.6} />
          </span>
          <div className="flex-1">
            <h3 className="font-script text-2xl text-hotpink leading-none">Soften into your day</h3>
            <p className="mt-1.5 text-sm text-rose/85">
              You're in your bloom phase — try a gentle 10-minute stretch, sip something warm, and step outside for a slow walk in the light.
            </p>
          </div>
        </div>
      </section>

      {/* FOR YOU READ */}
      <section className="mt-8 stagger" style={{ animationDelay: "400ms" }}>
        <SectionTitle hint="picked for you">Today's read</SectionTitle>
        <Link
          to="/app/read"
          className="group flex flex-col sm:flex-row items-stretch overflow-hidden rounded-3xl border border-petal/60 bg-white/85 backdrop-blur shadow-[0_10px_24px_-14px_oklch(0.7_0.18_350/0.3)] transition hover:-translate-y-0.5"
        >
          <div className="relative sm:w-64 h-44 sm:h-auto overflow-hidden">
            <img src="/images/read-selfcare.png" alt="" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy" />
          </div>
          <div className="p-5 sm:p-6 flex-1 flex flex-col">
            <span className="inline-flex w-fit items-center rounded-full bg-blush text-hotpink text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 border border-petal/60">
              Self-care
            </span>
            <h3 className="mt-3 font-script text-3xl text-hotpink leading-none">Soft girl morning ritual</h3>
            <p className="mt-1.5 text-sm text-rose/80">Ten gentle minutes that change the entire tone of your day.</p>
            <div className="mt-auto pt-3 flex items-center justify-between">
              <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-rose/70">
                <Clock className="h-3 w-3" strokeWidth={1.8} /> 4 min
              </span>
              <span className="inline-flex items-center gap-1 text-xs font-semibold text-hotpink">
                Read <ArrowRight className="h-3 w-3" strokeWidth={2} />
              </span>
            </div>
          </div>
        </Link>
      </section>

      {/* STREAK */}
      <section className="mt-8 mb-4 stagger" style={{ animationDelay: "480ms" }}>
        <div className="rounded-3xl bg-gradient-to-r from-hotpink/10 via-petal/40 to-hotpink/10 border border-hotpink/15 p-5 text-center">
          <p className="font-script text-3xl text-hotpink leading-none">{streak} days blooming ✿</p>
          <p className="mt-1 text-xs text-rose/70">Slow and steady — that's how flowers grow.</p>
        </div>
      </section>

      <style>{`
        @keyframes today-stagger {
          from { opacity: 0; transform: translateY(14px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .stagger {
          opacity: 0;
          animation: today-stagger 0.6s cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
        }
      `}</style>
    </div>
  );
}

/* ---------- atoms ---------- */
function SectionTitle({ children, hint }: { children: React.ReactNode; hint?: string }) {
  return (
    <div className="mb-3 flex items-end justify-between gap-3">
      <h2 className="font-script text-3xl sm:text-4xl text-hotpink">{children}</h2>
      {hint && <span className="text-xs text-rose/70">{hint}</span>}
    </div>
  );
}

function GlanceCard({
  Icon, label, value, note, tone,
}: { Icon: typeof Heart; label: string; value: string; note: string; tone: string }) {
  return (
    <div className="rounded-3xl bg-white/85 backdrop-blur p-4 sm:p-5 border border-petal/50 shadow-[0_8px_24px_-14px_oklch(0.7_0.18_350/0.3)] transition hover:-translate-y-0.5">
      <div className="flex items-center gap-2 text-rose/80">
        <span className={`grid h-8 w-8 place-items-center rounded-full bg-gradient-to-br ${tone} text-white shadow-md shadow-hotpink/30`}>
          <Icon className="h-4 w-4" strokeWidth={1.6} />
        </span>
        <span className="text-[10px] font-bold uppercase tracking-wider">{label}</span>
      </div>
      <div className="mt-2 font-script text-3xl text-hotpink leading-none">{value}</div>
      <p className="mt-1 text-xs text-rose/75 leading-snug">{note}</p>
    </div>
  );
}

function BudgetGlance({ spent, left }: { spent: number; left: number }) {
  const s = Math.round(useCountUp(spent));
  const l = Math.round(useCountUp(left));
  return (
    <div className="rounded-3xl bg-white/85 backdrop-blur p-4 sm:p-5 border border-petal/50 shadow-[0_8px_24px_-14px_oklch(0.7_0.18_350/0.3)] transition hover:-translate-y-0.5">
      <div className="flex items-center gap-2 text-rose/80">
        <span className="grid h-8 w-8 place-items-center rounded-full bg-gradient-to-br from-hotpink to-magenta text-white shadow-md shadow-hotpink/30">
          <Wallet className="h-4 w-4" strokeWidth={1.6} />
        </span>
        <span className="text-[10px] font-bold uppercase tracking-wider">Budget</span>
      </div>
      <div className="mt-2 font-script text-3xl text-hotpink leading-none">${s} <span className="text-base font-sans text-rose/70">today</span></div>
      <p className="mt-1 text-xs text-rose/75">${l} left this month</p>
    </div>
  );
}

function StepsGlance({ steps, goal }: { steps: number; goal: number }) {
  const v = Math.round(useCountUp(steps));
  const pct = Math.min(100, Math.round((steps / goal) * 100));
  return (
    <div className="rounded-3xl bg-white/85 backdrop-blur p-4 sm:p-5 border border-petal/50 shadow-[0_8px_24px_-14px_oklch(0.7_0.18_350/0.3)] transition hover:-translate-y-0.5">
      <div className="flex items-center gap-2 text-rose/80">
        <span className="grid h-8 w-8 place-items-center rounded-full bg-gradient-to-br from-hotpink to-magenta text-white shadow-md shadow-hotpink/30">
          <Footprints className="h-4 w-4" strokeWidth={1.6} />
        </span>
        <span className="text-[10px] font-bold uppercase tracking-wider">Steps</span>
      </div>
      <div className="mt-2 font-script text-3xl text-hotpink leading-none">{v.toLocaleString()}</div>
      <div className="mt-1.5 h-1.5 rounded-full bg-blush overflow-hidden">
        <div className="h-full rounded-full bg-gradient-to-r from-hotpink to-magenta transition-all duration-700" style={{ width: `${pct}%` }} />
      </div>
      <p className="mt-1 text-xs text-rose/75">Try a 15-min slow yoga flow tonight</p>
    </div>
  );
}

type QuickActionProps =
  | { to: "/budget" | "/app/today" | "/app/read"; params?: undefined; Icon: typeof Heart; label: string }
  | { to: "/app/tools/$slug"; params: { slug: string }; Icon: typeof Heart; label: string };

function QuickAction(props: QuickActionProps) {
  const { Icon, label } = props;
  const linkProps: any = props.params ? { to: props.to, params: props.params } : { to: props.to };
  return (
    <Link
      {...linkProps}
      className="group flex flex-col items-center justify-center gap-2 rounded-3xl bg-white/85 backdrop-blur p-4 sm:p-5 border border-petal/50 shadow-[0_8px_24px_-14px_oklch(0.7_0.18_350/0.3)] transition hover:-translate-y-1 hover:shadow-[0_14px_30px_-12px_oklch(0.7_0.22_350/0.45)]"
    >
      <span className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-hotpink to-magenta text-white shadow-md shadow-hotpink/30 transition group-hover:scale-105">
        <Icon className="h-5 w-5" strokeWidth={1.6} />
      </span>
      <span className="text-xs font-semibold text-rose text-center">{label}</span>
      <span className="inline-flex items-center gap-0.5 text-[10px] font-semibold text-hotpink opacity-0 group-hover:opacity-100 transition">
        Open <ArrowRight className="h-2.5 w-2.5" strokeWidth={2} />
      </span>
    </Link>
  );
}