import { useEffect, useMemo, useRef, useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Plus,
  X,
  UtensilsCrossed,
  Sparkles,
  ShoppingBag,
  Home,
  HeartPulse,
  Repeat,
  PiggyBank,
  Wallet,
  TrendingUp,
  TrendingDown,
  Target,
  Heart,
  Flower2,
  type LucideIcon,
} from "lucide-react";
import { BloomBubbles } from "./BloomBubbles";

/* ---------- Tokens ---------- */
const MONTHS = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
const DEFAULT_CURRENCY = "MAD";

type CategoryKey =
  | "food" | "beauty" | "shopping" | "rent" | "selfcare" | "subs" | "savings" | "other";

interface Category {
  key: CategoryKey;
  label: string;
  Icon: LucideIcon;
  color: string; // hsl/oklch hex for chart
  tint: string;  // tailwind bg utility for chips
  text: string;  // tailwind text utility
}

const CATEGORIES: Category[] = [
  { key: "food",     label: "Food",          Icon: UtensilsCrossed, color: "#ff7aa8", tint: "bg-pink-100",   text: "text-hotpink" },
  { key: "beauty",   label: "Beauty",        Icon: Sparkles,        color: "#ff5fa2", tint: "bg-rose-100",   text: "text-magenta" },
  { key: "shopping", label: "Shopping",      Icon: ShoppingBag,     color: "#f48fb1", tint: "bg-pink-50",    text: "text-hotpink" },
  { key: "rent",     label: "Rent / Home",   Icon: Home,            color: "#d96a99", tint: "bg-rose-50",    text: "text-rose" },
  { key: "selfcare", label: "Self-care",     Icon: HeartPulse,      color: "#ffb3cf", tint: "bg-pink-50",    text: "text-hotpink" },
  { key: "subs",     label: "Subscriptions", Icon: Repeat,          color: "#c97aa8", tint: "bg-rose-100",   text: "text-rose" },
  { key: "savings",  label: "Savings",       Icon: PiggyBank,       color: "#ff9ec5", tint: "bg-pink-100",   text: "text-hotpink" },
  { key: "other",    label: "Other",         Icon: Wallet,          color: "#e8a5c4", tint: "bg-blush",      text: "text-rose" },
];

const CAT_MAP = Object.fromEntries(CATEGORIES.map((c) => [c.key, c])) as Record<CategoryKey, Category>;

interface Txn {
  id: string;
  type: "expense" | "income";
  amount: number;
  category: CategoryKey;
  date: Date;
  note?: string;
}

interface Goal {
  id: string;
  name: string;
  target: number;
  saved: number;
}

const DEMO_TODAY = new Date(2026, 5, 4);

const SAMPLE_TXNS: Txn[] = [
  { id: "t1", type: "income",  amount: 8500, category: "other",    date: new Date(2026, 5, 1), note: "Salary" },
  { id: "t2", type: "expense", amount: 320,  category: "food",     date: new Date(2026, 5, 2), note: "Groceries" },
  { id: "t3", type: "expense", amount: 180,  category: "beauty",   date: new Date(2026, 5, 3), note: "Skincare" },
  { id: "t4", type: "expense", amount: 90,   category: "selfcare", date: new Date(2026, 5, 3), note: "Yoga class" },
  { id: "t5", type: "expense", amount: 250,  category: "shopping", date: new Date(2026, 5, 4), note: "Cute top" },
  { id: "t6", type: "expense", amount: 60,   category: "subs",     date: new Date(2026, 5, 4), note: "Spotify" },
];

const SAMPLE_GOALS: Goal[] = [
  { id: "g1", name: "New bag",   target: 1500, saved: 900 },
  { id: "g2", name: "Trip",      target: 6000, saved: 1800 },
  { id: "g3", name: "Emergency", target: 5000, saved: 2200 },
];

/* ---------- Helpers ---------- */
function sameMonth(a: Date, b: Date) {
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth();
}
function fmt(n: number, currency: string) {
  return `${Math.round(n).toLocaleString()} ${currency}`;
}
function uid() {
  return Math.random().toString(36).slice(2, 9);
}

/* ---------- Count-up hook ---------- */
function useCountUp(value: number, duration = 600) {
  const [v, setV] = useState(value);
  const from = useRef(value);
  useEffect(() => {
    const start = performance.now();
    const startV = from.current;
    const delta = value - startV;
    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setV(startV + delta * eased);
      if (p < 1) raf = requestAnimationFrame(tick);
      else from.current = value;
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [value, duration]);
  return v;
}

/* ---------- Donut chart ---------- */
function Donut({ slices, size = 200 }: { slices: { value: number; color: string }[]; size?: number }) {
  const total = slices.reduce((s, x) => s + x.value, 0) || 1;
  const r = size / 2 - 12;
  const c = 2 * Math.PI * r;
  let acc = 0;
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="-rotate-90">
      <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="oklch(0.95 0.04 350)" strokeWidth="18" />
      {slices.map((s, i) => {
        const len = (s.value / total) * c;
        const dash = `${len} ${c - len}`;
        const offset = -acc;
        acc += len;
        return (
          <circle
            key={i}
            cx={size / 2}
            cy={size / 2}
            r={r}
            fill="none"
            stroke={s.color}
            strokeWidth="18"
            strokeDasharray={dash}
            strokeDashoffset={offset}
            strokeLinecap="round"
            style={{ transition: "stroke-dasharray 700ms ease, stroke-dashoffset 700ms ease" }}
          />
        );
      })}
    </svg>
  );
}

/* ---------- Main ---------- */
export function BudgetPlanner() {
  const [cursor, setCursor] = useState(new Date(2026, 5, 1));
  const [currency] = useState(DEFAULT_CURRENCY);
  const [budget] = useState(7000); // monthly spending budget cap
  const [txns, setTxns] = useState<Txn[]>(SAMPLE_TXNS);
  const [goals, setGoals] = useState<Goal[]>(SAMPLE_GOALS);
  const [txnOpen, setTxnOpen] = useState(false);
  const [goalOpen, setGoalOpen] = useState(false);
  const [bumpId, setBumpId] = useState<string | null>(null);

  function shift(dir: -1 | 1) {
    setCursor((c) => new Date(c.getFullYear(), c.getMonth() + dir, 1));
  }

  const monthTxns = useMemo(() => txns.filter((t) => sameMonth(t.date, cursor)), [txns, cursor]);
  const income = monthTxns.filter((t) => t.type === "income").reduce((s, t) => s + t.amount, 0);
  const spent  = monthTxns.filter((t) => t.type === "expense").reduce((s, t) => s + t.amount, 0);
  const remaining = income - spent;
  const pctUsed = Math.min(100, Math.round((spent / budget) * 100));

  const byCategory = useMemo(() => {
    const map = new Map<CategoryKey, number>();
    monthTxns.filter((t) => t.type === "expense").forEach((t) => {
      map.set(t.category, (map.get(t.category) ?? 0) + t.amount);
    });
    return CATEGORIES
      .map((c) => ({ ...c, value: map.get(c.key) ?? 0 }))
      .filter((c) => c.value > 0)
      .sort((a, b) => b.value - a.value);
  }, [monthTxns]);

  const allCatsForBars = useMemo(() => {
    const map = new Map<CategoryKey, number>();
    monthTxns.filter((t) => t.type === "expense").forEach((t) => {
      map.set(t.category, (map.get(t.category) ?? 0) + t.amount);
    });
    return CATEGORIES.map((c) => ({ ...c, value: map.get(c.key) ?? 0 }));
  }, [monthTxns]);

  const maxCat = Math.max(1, ...allCatsForBars.map((c) => c.value));

  const recent = useMemo(
    () => [...monthTxns].sort((a, b) => b.date.getTime() - a.date.getTime()).slice(0, 8),
    [monthTxns]
  );

  const animSpent = useCountUp(spent);
  const animRemain = useCountUp(remaining);
  const animIncome = useCountUp(income);

  function addTxn(t: Omit<Txn, "id">) {
    const id = uid();
    setTxns((arr) => [{ ...t, id }, ...arr]);
    setBumpId(id);
    setTimeout(() => setBumpId(null), 500);
  }

  function addGoal(name: string, target: number) {
    setGoals((g) => [...g, { id: uid(), name, target, saved: 0 }]);
  }

  function addToGoal(id: string, amount: number) {
    setGoals((g) => g.map((x) => x.id === id ? { ...x, saved: Math.min(x.target, x.saved + amount) } : x));
    setBumpId(id);
    setTimeout(() => setBumpId(null), 500);
  }

  const encouragement =
    pctUsed < 50 ? "You're doing great, queen 💖"
    : pctUsed < 80 ? "Steady & soft — keep blooming 🌸"
    : pctUsed < 100 ? "Mindful spending mode 🫶"
    : "Take a breath — reset next month 🌷";

  return (
    <div className="relative">
      <BloomBubbles count={22} />
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -left-20 top-10 h-72 w-72 rounded-full bg-hotpink/10 blur-3xl animate-bloom-pulse" />
        <div className="absolute right-0 top-1/3 h-80 w-80 rounded-full bg-rose/15 blur-3xl animate-bloom-pulse" style={{ animationDelay: "1.5s" }} />
        <div className="absolute bottom-0 left-1/3 h-72 w-72 rounded-full bg-petal/30 blur-3xl animate-bloom-pulse" style={{ animationDelay: "3s" }} />
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* ============== Overview card ============== */}
        <div className="lg:col-span-2 rounded-[2rem] bg-white/85 p-5 sm:p-7 shadow-xl shadow-rose/10 backdrop-blur animate-scale-in">
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
            <h2 className="font-script text-5xl text-hotpink">Budget ✿</h2>
            <button
              onClick={() => setTxnOpen(true)}
              className="inline-flex items-center gap-1.5 rounded-full bg-hotpink px-4 py-2 text-sm font-semibold text-white shadow-md shadow-hotpink/30 transition hover:scale-[1.03] hover:bg-magenta"
            >
              <Plus className="h-4 w-4" /> Add
            </button>
          </div>

          {/* Month nav */}
          <div className="mb-6 flex items-center justify-center gap-4">
            <button onClick={() => shift(-1)} className="grid h-9 w-9 place-items-center rounded-full bg-blush text-hotpink transition hover:bg-petal">
              <ChevronLeft className="h-4 w-4" />
            </button>
            <div className="min-w-[140px] text-center font-script text-3xl text-hotpink">
              {MONTHS[cursor.getMonth()]} {cursor.getFullYear()}
            </div>
            <button onClick={() => shift(1)} className="grid h-9 w-9 place-items-center rounded-full bg-blush text-hotpink transition hover:bg-petal">
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>

          {/* Donut + totals */}
          <div className="grid gap-6 md:grid-cols-[auto_1fr] md:items-center">
            <div className="relative mx-auto">
              <Donut
                slices={byCategory.length ? byCategory.map((c) => ({ value: c.value, color: c.color })) : [{ value: 1, color: "#ffd0e2" }]}
              />
              <div className="absolute inset-0 grid place-items-center text-center">
                <div>
                  <p className="text-[10px] font-bold tracking-widest text-rose/80">USED</p>
                  <p className="font-script text-4xl text-hotpink leading-none">{pctUsed}%</p>
                  <p className="text-xs text-rose mt-1">{fmt(spent, currency)} / {fmt(budget, currency)}</p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3">
              <Stat label="INCOME" value={fmt(animIncome, currency)} Icon={TrendingUp} tone="green" />
              <Stat label="SPENT"  value={fmt(animSpent, currency)}  Icon={TrendingDown} tone="rose" />
              <Stat label="LEFT"   value={fmt(animRemain, currency)} Icon={Wallet} tone="pink" />

              {/* Budget bar */}
              <div className="col-span-3 rounded-2xl bg-blush/60 p-3">
                <div className="mb-1.5 flex items-center justify-between text-[11px] font-bold tracking-wider text-rose">
                  <span>BUDGET USED</span>
                  <span>{pctUsed}%</span>
                </div>
                <div className="h-3 w-full overflow-hidden rounded-full bg-white">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-pink-300 via-hotpink to-magenta transition-all duration-700"
                    style={{ width: `${pctUsed}%` }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Donut legend */}
          {byCategory.length > 0 && (
            <div className="mt-5 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-[10px] font-bold tracking-wider text-rose/80">
              {byCategory.map((c) => (
                <span key={c.key} className="inline-flex items-center gap-1.5">
                  <span className="h-3 w-3 rounded-full" style={{ background: c.color }} />
                  {c.label.toUpperCase()}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* ============== Right column ============== */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-1">
          {/* This Month */}
          <div className="rounded-[2rem] bg-white/85 p-5 shadow-xl shadow-rose/10 backdrop-blur animate-scale-in" style={{ animationDelay: "60ms" }}>
            <div className="flex items-center gap-2">
              <span className="grid h-8 w-8 place-items-center rounded-full bg-hotpink/10 text-hotpink animate-bloom-pulse">
                <Heart className="h-4 w-4 fill-hotpink/30" />
              </span>
              <p className="text-[10px] font-bold tracking-widest text-rose">THIS MONTH</p>
            </div>
            <p className="mt-1 font-script text-3xl text-hotpink leading-tight">
              {fmt(spent, currency)} <span className="text-rose/70 text-2xl">of {fmt(budget, currency)}</span>
            </p>
            <p className="text-sm text-rose">{fmt(Math.max(0, budget - spent), currency)} left to play with</p>
            <p className="mt-2 text-xs font-semibold text-magenta">{encouragement}</p>
          </div>

          {/* Savings Goals */}
          <div className="rounded-[2rem] bg-white/85 p-5 shadow-xl shadow-rose/10 backdrop-blur animate-scale-in" style={{ animationDelay: "120ms" }}>
            <div className="mb-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="grid h-8 w-8 place-items-center rounded-full bg-magenta/10 text-magenta">
                  <Target className="h-4 w-4" />
                </span>
                <p className="text-[10px] font-bold tracking-widest text-rose">SAVINGS GOALS</p>
              </div>
              <button
                onClick={() => setGoalOpen(true)}
                className="inline-flex items-center gap-1 rounded-full bg-blush px-2.5 py-1 text-xs font-semibold text-hotpink hover:bg-petal"
              >
                <Plus className="h-3 w-3" /> Goal
              </button>
            </div>
            <div className="space-y-3">
              {goals.map((g) => {
                const pct = Math.min(100, Math.round((g.saved / g.target) * 100));
                return (
                  <div key={g.id} className={bumpId === g.id ? "animate-bloom-bounce" : ""}>
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-semibold text-rose">{g.name}</span>
                      <span className="text-rose/80">{fmt(g.saved, currency)} / {fmt(g.target, currency)}</span>
                    </div>
                    <div className="mt-1 flex items-center gap-2">
                      <div className="h-2.5 flex-1 overflow-hidden rounded-full bg-blush">
                        <div className="h-full rounded-full bg-gradient-to-r from-pink-300 to-hotpink transition-all duration-700" style={{ width: `${pct}%` }} />
                      </div>
                      <span className="text-[10px] font-bold text-hotpink w-9 text-right">{pct}%</span>
                      <button
                        onClick={() => addToGoal(g.id, 100)}
                        className="grid h-6 w-6 place-items-center rounded-full bg-hotpink text-white hover:bg-magenta"
                        aria-label={`Add to ${g.name}`}
                      >
                        <Plus className="h-3 w-3" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Categories */}
          <div className="rounded-[2rem] bg-white/85 p-5 shadow-xl shadow-rose/10 backdrop-blur animate-scale-in sm:col-span-2 lg:col-span-1" style={{ animationDelay: "180ms" }}>
            <div className="mb-3 flex items-center gap-2">
              <span className="grid h-8 w-8 place-items-center rounded-full bg-hotpink/10 text-hotpink">
                <Flower2 className="h-4 w-4" />
              </span>
              <p className="text-[10px] font-bold tracking-widest text-rose">CATEGORIES</p>
            </div>
            <div className="space-y-2.5">
              {allCatsForBars.map((c) => {
                const pct = Math.round((c.value / maxCat) * 100);
                const CIcon = c.Icon;
                return (
                  <div key={c.key} className="flex items-center gap-3">
                    <span className={`grid h-8 w-8 place-items-center rounded-xl ${c.tint} ${c.text}`}>
                      <CIcon className="h-4 w-4" />
                    </span>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-semibold text-rose truncate">{c.label}</span>
                        <span className="text-rose/80">{fmt(c.value, currency)}</span>
                      </div>
                      <div className="mt-1 h-2 w-full overflow-hidden rounded-full bg-blush">
                        <div
                          className="h-full rounded-full transition-all duration-700"
                          style={{ width: `${pct}%`, background: `linear-gradient(90deg, ${c.color}aa, ${c.color})` }}
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* ============== Recent transactions ============== */}
      <div className="mt-8 rounded-[2rem] bg-white/85 p-5 sm:p-7 shadow-xl shadow-rose/10 backdrop-blur animate-fade-in">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="font-script text-4xl text-hotpink">Recent ✿</h3>
          <span className="text-xs font-semibold text-rose/70">{monthTxns.length} this month</span>
        </div>
        {recent.length === 0 ? (
          <p className="py-8 text-center text-sm text-rose">No transactions yet — tap + Add to start 🌸</p>
        ) : (
          <ul className="divide-y divide-petal/60">
            {recent.map((t) => {
              const cat = CAT_MAP[t.category];
              const CIcon = cat.Icon;
              const isIncome = t.type === "income";
              return (
                <li key={t.id} className={`flex items-center gap-3 py-3 ${bumpId === t.id ? "animate-bloom-bounce" : ""}`}>
                  <span className={`grid h-10 w-10 place-items-center rounded-2xl ${cat.tint} ${cat.text}`}>
                    <CIcon className="h-5 w-5" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-semibold text-rose">{t.note || cat.label}</p>
                    <p className="text-xs text-rose/70">
                      {cat.label} · {MONTHS[t.date.getMonth()]} {t.date.getDate()}
                    </p>
                  </div>
                  <span className={`text-sm font-bold ${isIncome ? "text-green-600" : "text-hotpink"}`}>
                    {isIncome ? "+" : "−"}{fmt(t.amount, currency)}
                  </span>
                </li>
              );
            })}
          </ul>
        )}
      </div>

      {/* ============== For You ============== */}
      <div className="mt-8">
        <h3 className="font-script text-4xl text-hotpink mb-3">For You ✿</h3>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[
            { t: "Soft saving habit", d: "Stash 10% the day you're paid — automate the cute way.", Icon: PiggyBank },
            { t: "Glow on a budget",  d: "Beauty buys that bloom under 100 a month.",               Icon: Sparkles },
            { t: "No-spend Sunday",   d: "A dreamy reset to feel rich without spending.",           Icon: Heart },
          ].map((p, i) => (
            <div
              key={p.t}
              className="rounded-[1.75rem] bg-white/85 p-5 shadow-xl shadow-rose/10 backdrop-blur transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-hotpink/20 animate-fade-in"
              style={{ animationDelay: `${i * 80}ms` }}
            >
              <div className="mb-3 flex items-center gap-2">
                <span className="grid h-10 w-10 place-items-center rounded-2xl bg-hotpink/10 text-hotpink">
                  <p.Icon className="h-5 w-5" />
                </span>
                <span className="inline-flex items-center gap-1 rounded-full bg-blush px-2.5 py-0.5 text-[10px] font-bold tracking-wider text-hotpink">
                  <Sparkles className="h-3 w-3" /> FOR YOU
                </span>
              </div>
              <p className="font-script text-2xl text-hotpink">{p.t}</p>
              <p className="text-sm text-rose mt-1">{p.d}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Modals */}
      <AddTxnModal
        open={txnOpen}
        onClose={() => setTxnOpen(false)}
        onAdd={addTxn}
        currency={currency}
        defaultDate={DEMO_TODAY}
      />
      <AddGoalModal
        open={goalOpen}
        onClose={() => setGoalOpen(false)}
        onAdd={addGoal}
        currency={currency}
      />
    </div>
  );
}

/* ---------- Stat tile ---------- */
function Stat({ label, value, Icon, tone }: { label: string; value: string; Icon: LucideIcon; tone: "green" | "rose" | "pink" }) {
  const tones: Record<string, string> = {
    green: "bg-green-100 text-green-600",
    rose:  "bg-rose-100 text-rose",
    pink:  "bg-hotpink/10 text-hotpink",
  };
  return (
    <div className="rounded-2xl bg-white p-3 shadow-sm ring-1 ring-petal/60">
      <div className="flex items-center gap-2">
        <span className={`grid h-7 w-7 place-items-center rounded-full ${tones[tone]}`}>
          <Icon className="h-3.5 w-3.5" />
        </span>
        <p className="text-[10px] font-bold tracking-widest text-rose/80">{label}</p>
      </div>
      <p className="mt-1 font-script text-2xl text-hotpink leading-none">{value}</p>
    </div>
  );
}

/* ---------- Cute modal shell ---------- */
function ModalShell({ open, onClose, title, children }: { open: boolean; onClose: () => void; title: string; children: React.ReactNode }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-rose/30 backdrop-blur-sm animate-fade-in" onClick={onClose}>
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full sm:w-[420px] max-h-[90vh] overflow-y-auto rounded-t-[2rem] sm:rounded-[2rem] bg-white/95 p-6 shadow-2xl shadow-hotpink/20 backdrop-blur animate-scale-in"
      >
        <button onClick={onClose} className="absolute right-4 top-4 grid h-8 w-8 place-items-center rounded-full bg-blush text-hotpink hover:bg-petal">
          <X className="h-4 w-4" />
        </button>
        <h3 className="mb-4 font-script text-3xl text-hotpink">{title} ✿</h3>
        {children}
      </div>
    </div>
  );
}

/* ---------- Add Transaction modal ---------- */
function AddTxnModal({
  open, onClose, onAdd, currency, defaultDate,
}: {
  open: boolean;
  onClose: () => void;
  onAdd: (t: Omit<Txn, "id">) => void;
  currency: string;
  defaultDate: Date;
}) {
  const [type, setType] = useState<"expense" | "income">("expense");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState<CategoryKey>("food");
  const [date, setDate] = useState<Date>(defaultDate);
  const [note, setNote] = useState("");

  useEffect(() => {
    if (open) {
      setType("expense"); setAmount(""); setCategory("food"); setDate(defaultDate); setNote("");
    }
  }, [open, defaultDate]);

  function submit() {
    const n = parseFloat(amount);
    if (!n || n <= 0) return;
    onAdd({ type, amount: n, category, date, note: note.trim() || undefined });
    onClose();
  }

  return (
    <ModalShell open={open} onClose={onClose} title="Add transaction">
      {/* Type toggle */}
      <div className="mb-4 grid grid-cols-2 gap-2 rounded-full bg-blush p-1">
        {(["expense", "income"] as const).map((k) => (
          <button
            key={k}
            onClick={() => setType(k)}
            className={`rounded-full py-1.5 text-xs font-bold tracking-wider transition ${
              type === k ? "bg-hotpink text-white shadow" : "text-rose"
            }`}
          >
            {k.toUpperCase()}
          </button>
        ))}
      </div>

      {/* Amount */}
      <label className="block text-[11px] font-bold tracking-widest text-rose mb-1">AMOUNT</label>
      <div className="mb-4 flex items-center gap-2 rounded-2xl bg-blush/70 px-4 py-3 ring-1 ring-petal">
        <input
          type="number"
          inputMode="decimal"
          placeholder="0"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="w-full bg-transparent font-script text-3xl text-hotpink placeholder:text-rose/40 focus:outline-none"
        />
        <span className="text-sm font-bold text-rose">{currency}</span>
      </div>

      {/* Category picker */}
      <label className="block text-[11px] font-bold tracking-widest text-rose mb-2">CATEGORY</label>
      <div className="mb-4 grid grid-cols-4 gap-2">
        {CATEGORIES.map((c) => {
          const active = category === c.key;
          const CIcon = c.Icon;
          return (
            <button
              key={c.key}
              onClick={() => setCategory(c.key)}
              className={[
                "flex flex-col items-center gap-1 rounded-2xl p-2 transition-all active:scale-95",
                active ? "bg-hotpink/10 ring-2 ring-hotpink animate-bloom-bounce" : "bg-blush/60 hover:bg-petal/70 hover:scale-105",
              ].join(" ")}
            >
              <span className={`grid h-9 w-9 place-items-center rounded-full ${active ? "bg-hotpink text-white" : "bg-white text-hotpink ring-1 ring-petal"}`}>
                <CIcon className="h-4 w-4" />
              </span>
              <span className={`text-[10px] font-semibold ${active ? "text-hotpink" : "text-rose"}`}>{c.label}</span>
            </button>
          );
        })}
      </div>

      {/* Date picker (cute) */}
      <label className="block text-[11px] font-bold tracking-widest text-rose mb-2">DATE</label>
      <CuteDatePicker value={date} onChange={setDate} />

      {/* Note */}
      <label className="block mt-4 text-[11px] font-bold tracking-widest text-rose mb-1">NOTE (optional)</label>
      <input
        value={note}
        onChange={(e) => setNote(e.target.value)}
        placeholder="Cute coffee with mom ☕"
        className="w-full rounded-2xl bg-blush/70 px-4 py-3 text-sm text-rose ring-1 ring-petal placeholder:text-rose/40 focus:outline-none focus:ring-2 focus:ring-hotpink"
      />

      <button
        onClick={submit}
        disabled={!parseFloat(amount)}
        className="mt-6 w-full rounded-full bg-hotpink py-3 text-sm font-bold tracking-wider text-white shadow-md shadow-hotpink/30 transition hover:bg-magenta disabled:opacity-50"
      >
        SAVE TRANSACTION
      </button>
    </ModalShell>
  );
}

/* ---------- Add Goal modal ---------- */
function AddGoalModal({
  open, onClose, onAdd, currency,
}: {
  open: boolean;
  onClose: () => void;
  onAdd: (name: string, target: number) => void;
  currency: string;
}) {
  const [name, setName] = useState("");
  const [target, setTarget] = useState("");

  useEffect(() => {
    if (open) { setName(""); setTarget(""); }
  }, [open]);

  function submit() {
    const n = parseFloat(target);
    if (!name.trim() || !n || n <= 0) return;
    onAdd(name.trim(), n);
    onClose();
  }

  return (
    <ModalShell open={open} onClose={onClose} title="New goal">
      <label className="block text-[11px] font-bold tracking-widest text-rose mb-1">GOAL NAME</label>
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Dreamy trip 🌷"
        className="mb-4 w-full rounded-2xl bg-blush/70 px-4 py-3 text-sm text-rose ring-1 ring-petal placeholder:text-rose/40 focus:outline-none focus:ring-2 focus:ring-hotpink"
      />
      <label className="block text-[11px] font-bold tracking-widest text-rose mb-1">TARGET</label>
      <div className="flex items-center gap-2 rounded-2xl bg-blush/70 px-4 py-3 ring-1 ring-petal">
        <input
          type="number"
          inputMode="decimal"
          placeholder="0"
          value={target}
          onChange={(e) => setTarget(e.target.value)}
          className="w-full bg-transparent font-script text-3xl text-hotpink placeholder:text-rose/40 focus:outline-none"
        />
        <span className="text-sm font-bold text-rose">{currency}</span>
      </div>
      <button
        onClick={submit}
        disabled={!name.trim() || !parseFloat(target)}
        className="mt-6 w-full rounded-full bg-hotpink py-3 text-sm font-bold tracking-wider text-white shadow-md shadow-hotpink/30 transition hover:bg-magenta disabled:opacity-50"
      >
        CREATE GOAL
      </button>
    </ModalShell>
  );
}

/* ---------- Cute date picker ---------- */
function CuteDatePicker({ value, onChange }: { value: Date; onChange: (d: Date) => void }) {
  const [open, setOpen] = useState(false);
  const [view, setView] = useState(new Date(value.getFullYear(), value.getMonth(), 1));

  useEffect(() => { setView(new Date(value.getFullYear(), value.getMonth(), 1)); }, [value]);

  const days = useMemo(() => {
    const first = new Date(view.getFullYear(), view.getMonth(), 1);
    const startWeekday = first.getDay();
    const totalDays = new Date(view.getFullYear(), view.getMonth() + 1, 0).getDate();
    const cells: (Date | null)[] = [];
    for (let i = 0; i < startWeekday; i++) cells.push(null);
    for (let d = 1; d <= totalDays; d++) cells.push(new Date(view.getFullYear(), view.getMonth(), d));
    return cells;
  }, [view]);

  return (
    <div className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between rounded-2xl bg-blush/70 px-4 py-3 text-sm font-semibold text-hotpink ring-1 ring-petal hover:bg-petal/70"
      >
        <span>{value.toLocaleDateString("en", { weekday: "short", month: "short", day: "numeric", year: "numeric" })}</span>
        <Flower2 className="h-4 w-4 text-magenta" />
      </button>
      {open && (
        <div className="absolute z-10 mt-2 w-full rounded-2xl bg-white p-3 shadow-xl ring-1 ring-petal animate-scale-in">
          <div className="mb-2 flex items-center justify-between">
            <button onClick={() => setView((v) => new Date(v.getFullYear(), v.getMonth() - 1, 1))} className="grid h-7 w-7 place-items-center rounded-full bg-blush text-hotpink hover:bg-petal">
              <ChevronLeft className="h-3 w-3" />
            </button>
            <p className="font-script text-xl text-hotpink">{MONTHS[view.getMonth()]} {view.getFullYear()}</p>
            <button onClick={() => setView((v) => new Date(v.getFullYear(), v.getMonth() + 1, 1))} className="grid h-7 w-7 place-items-center rounded-full bg-blush text-hotpink hover:bg-petal">
              <ChevronRight className="h-3 w-3" />
            </button>
          </div>
          <div className="grid grid-cols-7 text-center text-[10px] font-bold text-rose/70">
            {["S","M","T","W","T","F","S"].map((d, i) => <div key={i} className="py-1">{d}</div>)}
          </div>
          <div className="grid grid-cols-7 gap-1">
            {days.map((d, i) => {
              if (!d) return <div key={i} />;
              const selected = d.getFullYear() === value.getFullYear() && d.getMonth() === value.getMonth() && d.getDate() === value.getDate();
              return (
                <button
                  key={i}
                  onClick={() => { onChange(d); setOpen(false); }}
                  className={`aspect-square rounded-lg text-xs font-semibold transition ${
                    selected ? "bg-hotpink text-white shadow" : "text-rose hover:bg-blush"
                  }`}
                >
                  {d.getDate()}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}