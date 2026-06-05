import { createFileRoute, Link, notFound, redirect } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { ComingSoonCard, PageHeader } from "@/components/bloom/PageHeader";
import { TOOLS } from "@/components/bloom/tools";
import { CycleTracker } from "@/components/bloom/CycleTracker";

export const Route = createFileRoute("/app/tools/$slug")({
  loader: ({ params }) => {
    if (params.slug === "budget") throw redirect({ to: "/budget" });
    if (params.slug === "yoga") throw redirect({ to: "/app/tools/yoga" });
    if (params.slug === "meals") throw redirect({ to: "/app/tools/meals" });
    const tool = TOOLS.find((t) => t.slug === params.slug);
    if (!tool) throw notFound();
    return { tool };
  },
  head: ({ loaderData }) => ({
    meta: [{ title: `${loaderData?.tool.label ?? "Tool"} — Bloom` }],
  }),
  component: ToolPage,
  notFoundComponent: () => <ComingSoonCard label="Tool not found" />,
  errorComponent: () => <ComingSoonCard label="Something wilted" />,
});

function ToolPage() {
  const { tool } = Route.useLoaderData();
  const Icon = tool.icon;
  if (tool.slug === "cycle") {
    return (
      <>
        <Link to="/app/tools" className="mb-4 inline-flex items-center gap-1 text-sm text-rose hover:text-hotpink">
          <ArrowLeft className="h-4 w-4" /> All tools
        </Link>
        <CycleTracker />
      </>
    );
  }
  return (
    <>
      <Link to="/app/tools" className="mb-4 inline-flex items-center gap-1 text-sm text-rose hover:text-hotpink">
        <ArrowLeft className="h-4 w-4" /> All tools
      </Link>
      <PageHeader title={tool.label} emoji="✿">
        <span className="grid h-12 w-12 place-items-center rounded-full bg-hotpink text-white shadow-md">
          <Icon className="h-5 w-5" />
        </span>
      </PageHeader>
      <ComingSoonCard />
    </>
  );
}