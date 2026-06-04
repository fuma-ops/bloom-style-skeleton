import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { BudgetPlanner } from "@/components/bloom/BudgetPlanner";

export const Route = createFileRoute("/budget")({
  head: () => ({
    meta: [
      { title: "Budget Planner — Bloom" },
      { name: "description", content: "Plan your soft-girl spending with Bloom's inline, no-popup budget planner." },
      { property: "og:title", content: "Budget Planner — Bloom" },
      { property: "og:description", content: "Plan your soft-girl spending with Bloom's inline, no-popup budget planner." },
    ],
  }),
  component: BudgetPage,
});

function BudgetPage() {
  return (
    <div className="relative">
      <div className="absolute top-3 left-3 z-40">
        <Link
          to="/app/tools"
          className="inline-flex items-center gap-1 rounded-full bg-white/80 backdrop-blur px-3 py-1.5 text-xs font-semibold text-[#9D5C7E] border-[0.5px] border-pink-300/40 hover:bg-pink-50 transition"
        >
          <ArrowLeft className="h-3.5 w-3.5" /> All tools
        </Link>
      </div>
      <BudgetPlanner />
    </div>
  );
}