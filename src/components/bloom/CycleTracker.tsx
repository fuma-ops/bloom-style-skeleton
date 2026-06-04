import { useMemo, useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Droplet,
  Sun,
  Flower2,
  Moon,
  Pill,
  Plus,
  Undo2,
  Sparkles,
  Heart,
} from "lucide-react";

/* ---------- Sample cycle data (easy to edit) ---------- */
const CYCLE = {
  lastPeriodStart: new Date(2026, 5, 1), // Jun 1, 2026
  periodLength: 5,
  cycleLength: 28,
};

type Phase = "period" | "follicular" | "fertile" | "ovulation" | "luteal" | null;

function phaseForDay(date: Date): Phase {
  const ms = 1000 * 60 * 60 * 24;
  const diff = Math.floor((date.getTime() - CYCLE.lastPeriodStart.getTime()) / ms);
  const day = ((diff % CYCLE.cycleLength) + CYCLE.cycleLength) % CYCLE.cycleLength; // 0..27
  if (day < CYCLE.periodLength) return "period";
  if (day === 13) return "ovulation";
  if (day >= 9 && day <= 15) return "fertile";
  if (day < 13) return "follicular";
  return "luteal";
}

const PHASE_META: Record<Exclude<Phase, null>, { label: string; color: string; ring: string; Icon: any }> = {
  period:     { label: "PERIOD",     color: "bg-hotpink text-white",                ring: "ring-hotpink/40",  Icon: Droplet },
  follicular: { label: "FOLLICULAR", color: "bg-amber-100 text-amber-600",          ring: "ring-amber-200",   Icon: Sun },
  fertile:    { label: "FERTILE",    color: "bg-pink-100 text-hotpink",             ring: "ring-pink-200",    Icon: Flower2 },
  ovulation:  { label: "OVULATION",  color: "bg-rose-200 text-magenta",             ring: "ring-rose-400",    Icon: Sparkles },
  luteal:     { label: "LUTEAL",     color: "bg-violet-100 text-violet-500",        ring: "ring-violet-200",  Icon: Moon },
};

const MOODS = [
  { key: "calm",      label: "Calm",      emoji: "😌" },
  { key: "happy",     label: "Happy",     emoji: "😊" },
  { key: "energetic", label: "Energetic", emoji: "✨" },
  { key: "sensitive", label: "Sensitive", emoji: "🥺" },
  { key: "sad",       label: "Sad",       emoji: "😢" },
  { key: "tired",     label: "Tired",     emoji: "😴" },
  { key: "cramps",    label: "Cramps",    emoji: "🤕" },
  { key: "bloated",   label: "Bloated",   emoji: "🫧" },
] as const;

const WEEKDAYS = ["SU", "MO", "TU", "WE", "TH", "FR", "SA"];
const MONTHS = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

function sameDay(a: Date, b: Date) {
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
}

export function CycleTracker() {
  const today = new Date(2026, 5, 4); // demo "today"
  const [cursor, setCursor] = useState(new Date(2026, 5, 1));
  const [selected, setSelected] = useState<Date>(today);
  const [pillTaken, setPillTaken] = useState(true);
  const [mood, setMood] = useState<string>("happy");
  const [slideDir, setSlideDir] = useState<"l" | "r">("r");

  const days = useMemo(() => {
    const first = new Date(cursor.getFullYear(), cursor.getMonth(), 1);
    const startWeekday = first.getDay();
    const totalDays = new Date(cursor.getFullYear(), cursor.getMonth() + 1, 0).getDate();
    const cells: (Date | null)[] = [];
    for (let i = 0; i < startWeekday; i++) cells.push(null);
    for (let d = 1; d <= totalDays; d++) cells.push(new Date(cursor.getFullYear(), cursor.getMonth(), d));
    while (cells.length % 7 !== 0) cells.push(null);
    return cells;
  }, [cursor]);

  function shift(dir: -1 | 1) {
    setSlideDir(dir === 1 ? "r" : "l");
    setCursor((c) => new Date(c.getFullYear(), c.getMonth() + dir, 1));
  }

  // Compute next period & ovulation dates from today
  const nextPeriod = useMemo(() => {
    const ms = 1000 * 60 * 60 * 24;
    const diff = Math.floor((today.getTime() - CYCLE.lastPeriodStart.getTime()) / ms);
    const cyclesPassed = Math.floor(diff / CYCLE.cycleLength) + 1;
    return new Date(CYCLE.lastPeriodStart.getTime() + cyclesPassed * CYCLE.cycleLength * ms);
  }, []);
  const daysToPeriod = Math.ceil((nextPeriod.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));

  return (
    <div className="relative">
      {/* dynamic clean background overlay (within the app shell area) */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -left-20 top-10 h-72 w-72 rounded-full bg-hotpink/15 blur-3xl animate-bloom-pulse" />
        <div className="absolute right-0 top-1/3 h-80 w-80 rounded-full bg-rose/25 blur-3xl animate-bloom-pulse" style={{ animationDelay: "1.5s" }} />
        <div className="absolute bottom-0 left-1/3 h-72 w-72 rounded-full bg-petal/40 blur-3xl animate-bloom-pulse" style={{ animationDelay: "3s" }} />
        {/* drifting petals */}
        {[...Array(6)].map((_, i) => (
          <span
            key={i}
            className="absolute text-pink-300/60 animate-bloom-float"
            style={{
              left: `${10 + i * 14}%`,
              top: `${(i * 17) % 80 + 5}%`,
              animationDelay: `${i * 0.7}s`,
              fontSize: `${14 + (i % 3) * 6}px`,
            }}
          >
            ✿
          </span>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* ============= Calendar card ============= */}
        <div className="lg:col-span-2 rounded-[2rem] bg-white/85 p-5 sm:p-7 shadow-xl shadow-rose/10 backdrop-blur animate-scale-in">
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
            <h2 className="font-script text-5xl text-hotpink">Cycle ✿</h2>
            <button className="inline-flex items-center gap-1.5 rounded-full bg-hotpink px-4 py-2 text-sm font-semibold text-white shadow-md shadow-hotpink/30 transition hover:scale-[1.03] hover:bg-magenta">
              <Plus className="h-4 w-4" /> Log & Settings
            </button>
          </div>

          {/* Month nav */}
          <div className="mb-4 flex items-center justify-center gap-4">
            <button onClick={() => shift(-1)} className="grid h-9 w-9 place-items-center rounded-full bg-blush text-hotpink transition hover:bg-petal">
              <ChevronLeft className="h-4 w-4" />
            </button>
            <div className="min-w-[140px] text-center font-script text-3xl text-rose">
              {MONTHS[cursor.getMonth()]} {cursor.getFullYear()}
            </div>
            <button onClick={() => shift(1)} className="grid h-9 w-9 place-items-center rounded-full bg-blush text-hotpink transition hover:bg-petal">
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>

          {/* Weekday header */}
          <div className="mb-2 grid grid-cols-7 text-center text-[11px] font-bold tracking-widest text-rose/70">
            {WEEKDAYS.map((d) => <div key={d}>{d}</div>)}
          </div>

          {/* Calendar grid (animated slide on month change via key) */}
          <div
            key={`${cursor.getFullYear()}-${cursor.getMonth()}-${slideDir}`}
            className="grid grid-cols-7 gap-1.5 sm:gap-2 animate-fade-in"
          >
            {days.map((d, i) => {
              if (!d) return <div key={i} />;
              const phase = phaseForDay(d);
              const isFuture = d.getTime() > today.getTime();
              const isSelected = sameDay(d, selected);
              const isToday = sameDay(d, today);
              const meta = phase ? PHASE_META[phase] : null;
              const Icon = meta?.Icon;
              const isPeak = phase === "ovulation";

              return (
                <button
                  key={i}
                  onClick={() => setSelected(d)}
                  className={[
                    "relative aspect-square rounded-2xl flex flex-col items-center justify-center text-xs font-semibold transition-all",
                    "hover:scale-105",
                    isSelected ? "scale-105 ring-2 ring-hotpink shadow-md" : "",
                    isFuture && phase === "period"
                      ? "border-2 border-dashed border-hotpink/60 bg-pink-50/50 text-hotpink"
                      : isFuture
                        ? "border border-dashed border-rose/30 text-rose/60 bg-white/40"
                        : meta?.color ?? "bg-white text-rose",
                    isPeak ? "ring-2 ring-rose-400 animate-bloom-pulse" : "",
                    isToday ? "outline outline-2 outline-offset-2 outline-hotpink/60" : "",
                  ].join(" ")}
                >
                  <span className="leading-none">{d.getDate()}</span>
                  {Icon && !isFuture && <Icon className="h-3 w-3 mt-0.5 opacity-90" />}
                  {isPeak && (
                    <span className="absolute -top-2 rounded-full bg-magenta px-1.5 py-0.5 text-[8px] font-bold text-white shadow">PEAK</span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Legend */}
          <div className="mt-5 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-[10px] font-bold tracking-wider text-rose/80">
            {(Object.entries(PHASE_META) as [Exclude<Phase, null>, typeof PHASE_META[Exclude<Phase, null>]][]).map(([k, v]) => (
              <span key={k} className="inline-flex items-center gap-1.5">
                <span className={`h-3 w-3 rounded-full ${v.color}`} />
                {v.label}
              </span>
            ))}
          </div>
        </div>

        {/* ============= Right column ============= */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-1">
          {/* Next period */}
          <div className="rounded-[2rem] bg-white/85 p-5 shadow-xl shadow-rose/10 backdrop-blur animate-scale-in" style={{ animationDelay: "60ms" }}>
            <p className="text-[10px] font-bold tracking-widest text-rose/70">NEXT PERIOD</p>
            <p className="mt-1 font-script text-4xl text-hotpink">
              {nextPeriod.toLocaleDateString("en", { weekday: "short" })}
            </p>
            <p className="text-sm text-rose/80">In {daysToPeriod} days · {MONTHS[nextPeriod.getMonth()]} {nextPeriod.getDate()}</p>
          </div>

          {/* Ovulation */}
          <div className="rounded-[2rem] bg-white/85 p-5 shadow-xl shadow-rose/10 backdrop-blur animate-scale-in" style={{ animationDelay: "120ms" }}>
            <p className="text-[10px] font-bold tracking-widest text-rose/70">OVULATION</p>
            <p className="mt-1 font-script text-4xl text-hotpink">Thu</p>
            <p className="text-sm text-rose/80">Fertile window · Jun 10–16</p>
          </div>

          {/* Daily pill */}
          <div className="rounded-[2rem] bg-white/85 p-5 shadow-xl shadow-rose/10 backdrop-blur animate-scale-in sm:col-span-2 lg:col-span-1" style={{ animationDelay: "180ms" }}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className={`grid h-11 w-11 place-items-center rounded-full transition-all duration-300 ${pillTaken ? "bg-hotpink text-white scale-100" : "bg-blush text-hotpink"}`}>
                  <Pill className="h-5 w-5" />
                </span>
                <div>
                  <p className="font-script text-2xl text-hotpink leading-none">Daily Pill</p>
                  <p className="text-xs text-rose/70 mt-0.5">Reminder · 21:00</p>
                </div>
              </div>
            </div>
            <div className="mt-4 flex items-center justify-between">
              <span
                key={String(pillTaken)}
                className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold transition-all ${
                  pillTaken ? "bg-green-100 text-green-600 animate-scale-in" : "bg-blush text-rose"
                }`}
              >
                <Heart className="h-3 w-3" />
                {pillTaken ? "Taken today" : "Not taken yet"}
              </span>
              <button
                onClick={() => setPillTaken((v) => !v)}
                className="inline-flex items-center gap-1 rounded-full bg-blush px-3 py-1.5 text-xs font-semibold text-hotpink transition hover:scale-105 hover:bg-petal"
              >
                <Undo2 className="h-3 w-3" />
                {pillTaken ? "Undo Take" : "Mark Taken"}
              </button>
            </div>
          </div>

          {/* Mood */}
          <div className="rounded-[2rem] bg-white/85 p-5 shadow-xl shadow-rose/10 backdrop-blur animate-scale-in sm:col-span-2 lg:col-span-1" style={{ animationDelay: "240ms" }}>
            <p className="text-[10px] font-bold tracking-widest text-rose/70">
              {today.toLocaleDateString("en", { weekday: "long", month: "long", day: "numeric" }).toUpperCase()}
            </p>
            <p className="font-script text-3xl text-hotpink mt-1">how is your mood today?</p>
            <div className="mt-3 grid grid-cols-4 gap-2">
              {MOODS.map((m) => {
                const active = mood === m.key;
                return (
                  <button
                    key={m.key}
                    onClick={() => setMood(m.key)}
                    className={[
                      "group flex flex-col items-center gap-1 rounded-2xl p-2 transition-all",
                      active ? "bg-hotpink/10 ring-2 ring-hotpink scale-105" : "bg-blush/60 hover:bg-petal/70",
                    ].join(" ")}
                  >
                    <span className={`text-2xl transition-transform ${active ? "scale-125" : "group-hover:scale-110 group-active:scale-95"}`}>
                      {m.emoji}
                    </span>
                    <span className="text-[10px] font-semibold text-rose">{m.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* For You */}
      <div className="mt-8">
        <h3 className="font-script text-4xl text-hotpink mb-3">For You ✿</h3>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[
            { t: "Soft yoga for cramps", d: "10-min gentle flow to ease your body." },
            { t: "Iron-rich snacks", d: "Cute recipes for your period week." },
            { t: "Why you feel extra today", d: "A gentle hormone explainer." },
          ].map((p, i) => (
            <div
              key={p.t}
              className="rounded-[1.75rem] bg-white/85 p-5 shadow-xl shadow-rose/10 backdrop-blur transition hover:-translate-y-1 animate-fade-in"
              style={{ animationDelay: `${i * 80}ms` }}
            >
              <div className="mb-2 inline-flex items-center gap-1.5 rounded-full bg-blush px-2.5 py-0.5 text-[10px] font-bold tracking-wider text-hotpink">
                <Sparkles className="h-3 w-3" /> FOR YOU
              </div>
              <p className="font-script text-2xl text-hotpink">{p.t}</p>
              <p className="text-sm text-rose/80 mt-1">{p.d}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}