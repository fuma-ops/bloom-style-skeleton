import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState, type MouseEvent } from "react";
import { ArrowRight, Sparkles } from "lucide-react";
import { TOOLS, type Tool } from "@/components/bloom/tools";
import { BloomBubbles } from "@/components/bloom/BloomBubbles";

export const Route = createFileRoute("/app/tools/")({
  head: () => ({ meta: [{ title: "Tools — Bloom" }] }),
  component: ToolsIndex,
});

const LAST_KEY = "bloom:last-tool";

function linkPropsFor(t: Tool) {
  return t.slug === "budget"
    ? ({ to: "/budget" as const } as const)
    : ({ to: "/app/tools/$slug" as const, params: { slug: t.slug } } as const);
}

function ToolsIndex() {
  const [last, setLast] = useState<string | null>(null);

  useEffect(() => {
    try { setLast(localStorage.getItem(LAST_KEY)); } catch {}
  }, []);

  const lastTool = last ? TOOLS.find((t) => t.slug === last) : null;

  const remember = (slug: string) => {
    try { localStorage.setItem(LAST_KEY, slug); } catch {}
  };

  return (
    <div className="relative animate-fade-in">
      <BloomBubbles count={10} />

      {/* HEADER */}
      <header className="mb-6">
        <h1 className="font-script text-5xl sm:text-6xl text-hotpink leading-none">Tools</h1>
        <p className="mt-1 text-sm text-rose/80">pick your bloom for today ✿</p>
      </header>

      {/* CONTINUE STRIP */}
      {lastTool ? (
        <ContinueStrip tool={lastTool} onGo={() => remember(lastTool.slug)} />
      ) : (
        <div className="mb-6 rounded-full bg-white/70 backdrop-blur px-4 py-2.5 text-xs font-semibold text-rose/80 border border-petal/50 inline-flex items-center gap-2">
          <Sparkles className="h-3.5 w-3.5 text-hotpink" strokeWidth={1.8} />
          Start exploring below — tap any bloom to begin.
        </div>
      )}

      {/* GRID */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 mt-2 [perspective:1200px]">
        {TOOLS.map((t, i) => (
          <ClayToolCard key={t.slug} tool={t} index={i} onGo={() => remember(t.slug)} />
        ))}
      </div>

      <style>{`
        @keyframes bloom-pop {
          0% { opacity: 0; transform: translateY(18px) scale(0.92); }
          60% { opacity: 1; transform: translateY(-4px) scale(1.03); }
          100% { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes bloom-icon-bob {
          0%, 100% { transform: translateY(0) rotate(-2deg); }
          50% { transform: translateY(-7px) rotate(2deg); }
        }
        @keyframes bloom-squish {
          0% { transform: scale(1); }
          40% { transform: scale(0.93, 1.07); }
          70% { transform: scale(1.04, 0.96); }
          100% { transform: scale(1); }
        }
        .clay-card {
          opacity: 0;
          animation: bloom-pop 0.7s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
          transform-style: preserve-3d;
          transition: transform 0.35s cubic-bezier(0.2, 0.8, 0.2, 1), box-shadow 0.35s ease;
        }
        .clay-card:hover {
          transform: rotateX(6deg) rotateY(-8deg) translateY(-4px) scale(1.02);
        }
        .clay-card.squish {
          animation: bloom-squish 0.35s ease both;
        }
        .clay-icon {
          animation: bloom-icon-bob 4.5s ease-in-out infinite;
          transform-style: preserve-3d;
        }
        .clay-blob {
          background:
            radial-gradient(circle at 30% 25%, oklch(1 0 0 / 0.95), oklch(0.95 0.08 350 / 0.6) 30%, oklch(0.78 0.22 350 / 0.85) 70%, oklch(0.6 0.27 350 / 0.95));
          box-shadow:
            inset 6px 8px 14px oklch(1 0 0 / 0.55),
            inset -8px -10px 18px oklch(0.55 0.25 350 / 0.45),
            0 14px 28px -10px oklch(0.6 0.27 350 / 0.55),
            0 4px 10px oklch(0.6 0.27 350 / 0.25);
        }
        .clay-card-bg {
          background:
            radial-gradient(circle at 20% 10%, oklch(1 0 0 / 0.95), oklch(0.97 0.04 350 / 0.85) 40%, oklch(0.92 0.08 350 / 0.85));
          box-shadow:
            inset 4px 6px 14px oklch(1 0 0 / 0.85),
            inset -6px -8px 18px oklch(0.85 0.14 350 / 0.45),
            0 18px 36px -16px oklch(0.6 0.27 350 / 0.35);
        }
        .clay-card:hover .clay-card-bg {
          box-shadow:
            inset 4px 6px 14px oklch(1 0 0 / 0.9),
            inset -6px -8px 18px oklch(0.85 0.14 350 / 0.5),
            0 22px 44px -16px oklch(0.6 0.3 350 / 0.55),
            0 0 0 6px oklch(0.85 0.18 350 / 0.18);
        }
      `}</style>
    </div>
  );
}

function ContinueStrip({ tool, onGo }: { tool: Tool; onGo: () => void }) {
  const Icon = tool.icon;
  return (
    <Link
      {...linkPropsFor(tool)}
      onClick={onGo}
      className="group mb-6 flex items-center gap-3 rounded-3xl bg-white/85 backdrop-blur p-3 sm:p-4 border border-petal/60 shadow-[0_10px_24px_-14px_oklch(0.6_0.22_350/0.4)] transition hover:-translate-y-0.5"
    >
      <span className="grid h-11 w-11 sm:h-12 sm:w-12 place-items-center rounded-2xl clay-blob text-white shrink-0">
        <Icon className="h-5 w-5 sm:h-6 sm:w-6" strokeWidth={1.8} />
      </span>
      <div className="min-w-0 flex-1">
        <p className="text-[10px] font-bold uppercase tracking-wider text-rose/60">Continue</p>
        <p className="text-sm font-bold text-rose truncate">{tool.label}</p>
      </div>
      <span className="inline-flex items-center gap-1 rounded-full bg-hotpink px-3.5 py-1.5 text-xs font-semibold text-white shadow-md shadow-hotpink/30 transition group-hover:scale-[1.03] group-hover:bg-magenta">
        Continue <ArrowRight className="h-3 w-3" strokeWidth={2.2} />
      </span>
    </Link>
  );
}

function ClayToolCard({ tool, index, onGo }: { tool: Tool; index: number; onGo: () => void }) {
  const Icon = tool.icon;
  const [squish, setSquish] = useState(false);

  const handleClick = (_e: MouseEvent) => {
    setSquish(true);
    onGo();
    setTimeout(() => setSquish(false), 360);
  };

  return (
    <Link
      {...linkPropsFor(tool)}
      onClick={handleClick}
      className={`clay-card ${squish ? "squish" : ""} group block rounded-[2rem] p-6 sm:p-7`}
      style={{ animationDelay: `${index * 90}ms` }}
    >
      <div className="clay-card-bg rounded-[2rem] p-5 sm:p-6 -m-1 sm:-m-2 transition">
        <div className="flex items-start justify-between">
          <span className="clay-icon grid h-20 w-20 sm:h-24 sm:w-24 place-items-center rounded-[1.75rem] clay-blob text-white">
            <Icon className="h-9 w-9 sm:h-10 sm:w-10 drop-shadow-[0_2px_3px_oklch(0.4_0.22_350/0.4)]" strokeWidth={1.6} />
          </span>
          <span className="opacity-0 group-hover:opacity-100 transition inline-flex h-9 w-9 items-center justify-center rounded-full bg-hotpink text-white shadow-md shadow-hotpink/40">
            <ArrowRight className="h-4 w-4" strokeWidth={2.2} />
          </span>
        </div>
        <h3 className="mt-5 font-script text-3xl sm:text-4xl text-hotpink leading-none">{tool.label}</h3>
        <p className="mt-1.5 text-sm text-rose/80 leading-relaxed">{tool.blurb}</p>
      </div>
    </Link>
  );
}