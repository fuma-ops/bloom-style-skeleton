import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  Pencil, Sparkles, Droplet, Wallet, Footprints, Flame,
  Heart, BookOpen, Flower2, UtensilsCrossed, Target, ChevronRight,
  User, Crown, Bell, Settings as SettingsIcon, Shield, LifeBuoy, LogOut,
  Award, ArrowRight,
} from "lucide-react";
import { BloomBubbles } from "@/components/bloom/BloomBubbles";

export const Route = createFileRoute("/app/me")({
  head: () => ({ meta: [{ title: "Me — Bloom" }] }),
  component: MePage,
});

/* ---------- count-up ---------- */
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

function Stat({ Icon, label, value, suffix }: { Icon: typeof Heart; label: string; value: number | string; suffix?: string }) {
  const numeric = typeof value === "number";
  const v = useCountUp(numeric ? (value as number) : 0);
  return (
    <div className="group rounded-3xl bg-white/85 backdrop-blur p-4 sm:p-5 border border-petal/50 shadow-[0_8px_24px_-12px_oklch(0.7_0.18_350/0.35)] transition hover:-translate-y-0.5 hover:shadow-[0_14px_30px_-12px_oklch(0.7_0.22_350/0.45)]">
      <div className="flex items-center gap-2 text-rose/80">
        <span className="grid h-8 w-8 place-items-center rounded-full bg-blush text-hotpink">
          <Icon className="h-4 w-4" strokeWidth={1.6} />
        </span>
        <span className="text-xs font-semibold tracking-wide uppercase">{label}</span>
      </div>
      <div className="mt-2 font-script text-3xl sm:text-4xl text-hotpink leading-none">
        {numeric ? Math.round(v).toLocaleString() : value}
        {suffix && <span className="text-base font-sans text-rose/70 ml-1">{suffix}</span>}
      </div>
    </div>
  );
}

function SectionTitle({ children, hint }: { children: React.ReactNode; hint?: string }) {
  return (
    <div className="mb-3 flex items-end justify-between gap-3">
      <h2 className="font-script text-3xl sm:text-4xl text-hotpink">{children}</h2>
      {hint && <span className="text-xs text-rose/70">{hint}</span>}
    </div>
  );
}

function GhostBtn({ children, to }: { children: React.ReactNode; to: string }) {
  return (
    <Link
      to={to}
      className="inline-flex items-center gap-1.5 rounded-full bg-blush px-3 py-1.5 text-xs font-semibold text-hotpink border border-petal/60 transition hover:bg-petal/60"
    >
      {children}
    </Link>
  );
}

function PrimaryBtn({ children, to }: { children: React.ReactNode; to: string }) {
  return (
    <Link
      to={to}
      className="inline-flex items-center gap-1.5 rounded-full bg-hotpink px-4 py-2 text-xs font-semibold text-white shadow-md shadow-hotpink/30 transition hover:scale-[1.03] hover:bg-magenta"
    >
      {children}
    </Link>
  );
}

/* ---------- Sample data ---------- */
const favorites = {
  articles: [
    { title: "Cycle syncing 101", tag: "Wellness" },
    { title: "Soft girl morning ritual", tag: "Lifestyle" },
    { title: "Pink budgeting that works", tag: "Money" },
  ],
  flows: [
    { title: "Moon salutation", mins: 15 },
    { title: "Hip openers", mins: 20 },
  ],
  recipes: [
    { title: "Strawberry oat bowl", mins: 8 },
    { title: "Rose latte", mins: 5 },
    { title: "Beet pink hummus", mins: 12 },
  ],
};

const goals = [
  { title: "Drink 2L water daily", pct: 72 },
  { title: "Save $500 this month", pct: 45 },
  { title: "Yoga 4x a week", pct: 60 },
];

const achievements = [
  { label: "First Bloom", Icon: Flower2, unlocked: true },
  { label: "7-Day Streak", Icon: Flame, unlocked: true },
  { label: "Hydration Hero", Icon: Droplet, unlocked: true },
  { label: "Soft Saver", Icon: Wallet, unlocked: true },
  { label: "Yogini", Icon: Heart, unlocked: false },
  { label: "Moon Tracker", Icon: Sparkles, unlocked: false },
];

const settingsGroups: { items: { Icon: typeof User; label: string; to?: string }[]; danger?: boolean }[] = [
  {
    items: [
      { Icon: User, label: "Account & profile" },
      { Icon: Crown, label: "Bloom Premium" },
      { Icon: Bell, label: "Notifications & reminders" },
      { Icon: SettingsIcon, label: "Preferences" },
      { Icon: Shield, label: "Privacy & data" },
      { Icon: LifeBuoy, label: "Help & support" },
    ],
  },
  { items: [{ Icon: LogOut, label: "Log out" }], danger: true },
];

function MePage() {
  return (
    <div className="relative animate-bloom-bounce">
      <BloomBubbles count={10} />

      {/* HEADER */}
      <section className="relative overflow-hidden rounded-[2.5rem] border border-petal/60 shadow-[0_20px_50px_-20px_oklch(0.6_0.27_350/0.45)]">
        <img
          src="/images/me-header.png"
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-tr from-magenta/40 via-hotpink/15 to-transparent" />
        <div className="relative flex flex-col items-center gap-4 px-6 py-10 text-center sm:flex-row sm:items-end sm:gap-6 sm:px-10 sm:py-12 sm:text-left">
          <div className="relative shrink-0">
            <div className="absolute -inset-1 rounded-full bg-white/60 blur-md" />
            <img
              src="/images/me-avatar.png"
              alt="Your avatar"
              className="relative h-28 w-28 sm:h-32 sm:w-32 rounded-full border-4 border-white/90 object-cover shadow-xl shadow-hotpink/30"
            />
          </div>
          <div className="flex-1">
            <div className="flex items-center justify-center sm:justify-start gap-2">
              <h1 className="font-script text-5xl sm:text-6xl text-white drop-shadow-[0_2px_6px_oklch(0.4_0.2_350/0.6)] leading-none">
                Sofia
              </h1>
              <span className="inline-flex items-center gap-1 rounded-full bg-white/95 px-2.5 py-1 text-[10px] font-bold text-hotpink shadow">
                <Crown className="h-3 w-3" strokeWidth={2} /> PREMIUM
              </span>
            </div>
            <p className="mt-1 text-sm font-medium text-white/95 drop-shadow">blooming since 2026 ✿</p>
          </div>
          <button className="inline-flex items-center gap-1.5 rounded-full bg-white/90 px-4 py-2 text-xs font-semibold text-hotpink shadow-md transition hover:bg-white">
            <Pencil className="h-3.5 w-3.5" strokeWidth={1.8} /> Edit profile
          </button>
        </div>
      </section>

      {/* JOURNEY */}
      <section className="mt-8">
        <SectionTitle hint="this week">Your Bloom journey</SectionTitle>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
          <Stat Icon={Droplet} label="Cycle phase" value="Luteal" />
          <Stat Icon={Wallet} label="Budget left" value={840} suffix="$" />
          <Stat Icon={Footprints} label="Steps today" value={6420} />
          <Stat Icon={Flame} label="Streak" value={7} suffix="days" />
        </div>
      </section>

      {/* FAVORITES */}
      <section className="mt-10">
        <SectionTitle>Favorites & saved</SectionTitle>
        <div className="grid gap-4 md:grid-cols-3">
          <FavCard title="Saved articles" Icon={BookOpen} to="/app/read" items={favorites.articles.map((a) => ({ title: a.title, meta: a.tag }))} empty="Nothing saved yet — explore the Blog" />
          <FavCard title="Yoga flows" Icon={Heart} to="/app/tools" items={favorites.flows.map((f) => ({ title: f.title, meta: `${f.mins} min` }))} empty="No flows saved yet — discover Yoga" />
          <FavCard title="Recipes" Icon={UtensilsCrossed} to="/app/tools" items={favorites.recipes.map((r) => ({ title: r.title, meta: `${r.mins} min` }))} empty="No recipes yet — browse Kitchen" />
        </div>
      </section>

      {/* GOALS */}
      <section className="mt-10">
        <SectionTitle>My goals & intentions</SectionTitle>
        {goals.length === 0 ? (
          <EmptyCard text="Set your first intention" cta="Create a goal" to="/app/tools" Icon={Target} />
        ) : (
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {goals.map((g) => (
              <div key={g.title} className="rounded-3xl bg-white/85 backdrop-blur p-5 border border-petal/50 shadow-[0_8px_24px_-12px_oklch(0.7_0.18_350/0.3)]">
                <div className="flex items-center gap-2 text-rose">
                  <span className="grid h-8 w-8 place-items-center rounded-full bg-blush text-hotpink">
                    <Target className="h-4 w-4" strokeWidth={1.6} />
                  </span>
                  <span className="text-sm font-semibold">{g.title}</span>
                </div>
                <div className="mt-3 h-2 rounded-full bg-blush overflow-hidden">
                  <div className="h-full rounded-full bg-gradient-to-r from-hotpink to-magenta transition-all duration-700" style={{ width: `${g.pct}%` }} />
                </div>
                <div className="mt-1.5 flex items-center justify-between text-[11px] text-rose/70">
                  <span>{g.pct}% there</span>
                  <span className="font-script text-base text-hotpink">keep blooming ✿</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* ACHIEVEMENTS */}
      <section className="mt-10">
        <SectionTitle hint={`${achievements.filter((a) => a.unlocked).length}/${achievements.length} unlocked`}>Achievements</SectionTitle>
        <div className="grid grid-cols-3 gap-3 sm:grid-cols-6">
          {achievements.map((a) => (
            <div
              key={a.label}
              className={[
                "group flex flex-col items-center gap-2 rounded-3xl p-4 border transition",
                a.unlocked
                  ? "bg-white/90 border-petal/60 shadow-[0_10px_24px_-12px_oklch(0.7_0.2_350/0.4)] hover:-translate-y-0.5"
                  : "bg-white/50 border-petal/30 opacity-60",
              ].join(" ")}
            >
              <div
                className={[
                  "grid h-14 w-14 place-items-center rounded-full transition",
                  a.unlocked
                    ? "bg-gradient-to-br from-hotpink to-magenta text-white shadow-md shadow-hotpink/40 group-hover:scale-105"
                    : "bg-blush text-rose/50",
                ].join(" ")}
              >
                <a.Icon className="h-6 w-6" strokeWidth={1.6} />
              </div>
              <span className="text-[11px] font-semibold text-rose text-center leading-tight">{a.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* SETTINGS */}
      <section className="mt-10 mb-4">
        <SectionTitle>Settings</SectionTitle>
        <div className="space-y-3">
          {settingsGroups.map((group, gi) => (
            <div
              key={gi}
              className="rounded-3xl bg-white/85 backdrop-blur border border-petal/50 shadow-[0_8px_24px_-12px_oklch(0.7_0.18_350/0.3)] overflow-hidden"
            >
              {group.items.map((item, i) => (
                <button
                  key={item.label}
                  className={[
                    "flex w-full items-center gap-3 px-4 py-3.5 text-left transition hover:bg-blush/60",
                    i > 0 ? "border-t border-petal/40" : "",
                    group.danger ? "text-magenta" : "text-rose",
                  ].join(" ")}
                >
                  <span className={[
                    "grid h-9 w-9 place-items-center rounded-full",
                    group.danger ? "bg-magenta/10 text-magenta" : "bg-blush text-hotpink",
                  ].join(" ")}>
                    <item.Icon className="h-4 w-4" strokeWidth={1.6} />
                  </span>
                  <span className="flex-1 text-sm font-semibold">{item.label}</span>
                  {!group.danger && <ChevronRight className="h-4 w-4 text-rose/50" strokeWidth={1.6} />}
                </button>
              ))}
            </div>
          ))}
        </div>
        <p className="mt-6 text-center font-script text-lg text-rose/70">stay soft, bloom on ✿</p>
      </section>
    </div>
  );
}

/* ---------- Sub components ---------- */
function FavCard({
  title, Icon, items, empty, to,
}: {
  title: string;
  Icon: typeof Heart;
  items: { title: string; meta: string }[];
  empty: string;
  to: string;
}) {
  const hasItems = items.length > 0;
  return (
    <div className="rounded-3xl bg-white/85 backdrop-blur p-5 border border-petal/50 shadow-[0_8px_24px_-12px_oklch(0.7_0.18_350/0.3)] transition hover:-translate-y-0.5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="grid h-8 w-8 place-items-center rounded-full bg-blush text-hotpink">
            <Icon className="h-4 w-4" strokeWidth={1.6} />
          </span>
          <h3 className="text-sm font-bold text-rose">{title}</h3>
        </div>
        {hasItems && <GhostBtn to={to}>View all</GhostBtn>}
      </div>
      {hasItems ? (
        <ul className="mt-3 divide-y divide-petal/40">
          {items.slice(0, 3).map((it) => (
            <li key={it.title} className="flex items-center justify-between py-2.5">
              <span className="text-sm text-rose font-medium">{it.title}</span>
              <span className="text-[11px] font-semibold text-hotpink bg-blush rounded-full px-2 py-0.5">{it.meta}</span>
            </li>
          ))}
        </ul>
      ) : (
        <div className="mt-3">
          <p className="text-sm text-rose/80">{empty}</p>
          <div className="mt-3"><PrimaryBtn to={to}>Get started <ArrowRight className="h-3 w-3" strokeWidth={2} /></PrimaryBtn></div>
        </div>
      )}
    </div>
  );
}

function EmptyCard({ text, cta, to, Icon }: { text: string; cta: string; to: string; Icon: typeof Heart }) {
  return (
    <div className="rounded-3xl bg-white/85 backdrop-blur p-8 border border-petal/50 text-center">
      <span className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-blush text-hotpink">
        <Icon className="h-5 w-5" strokeWidth={1.6} />
      </span>
      <p className="mt-3 text-sm text-rose">{text}</p>
      <div className="mt-3 flex justify-center"><PrimaryBtn to={to}>{cta} <ArrowRight className="h-3 w-3" strokeWidth={2} /></PrimaryBtn></div>
    </div>
  );
}