import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHeader } from "@/components/bloom/PageHeader";
import { TOOLS } from "@/components/bloom/tools";

export const Route = createFileRoute("/app/tools/")({
  head: () => ({ meta: [{ title: "Tools — Bloom" }] }),
  component: ToolsIndex,
});

function ToolsIndex() {
  return (
    <>
      <PageHeader title="Tools" emoji="✿" />
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {TOOLS.map((t) => (
          <Link
            key={t.slug}
            to="/app/tools/$slug"
            params={{ slug: t.slug }}
            className="group rounded-[2rem] bg-white/85 p-6 shadow-xl shadow-rose/10 backdrop-blur transition hover:-translate-y-1 hover:shadow-rose/20"
          >
            <span className="grid h-14 w-14 place-items-center rounded-full bg-hotpink text-white shadow-md transition group-hover:bg-magenta">
              <t.icon className="h-6 w-6" />
            </span>
            <h3 className="mt-4 font-script text-3xl text-hotpink">{t.label}</h3>
            <p className="mt-1 text-sm text-rose/80">{t.blurb}</p>
          </Link>
        ))}
      </div>
    </>
  );
}