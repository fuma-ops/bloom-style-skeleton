import { createFileRoute } from "@tanstack/react-router";
import { ComingSoonCard, PageHeader } from "@/components/bloom/PageHeader";

export const Route = createFileRoute("/app/today")({
  head: () => ({ meta: [{ title: "Today — Bloom" }] }),
  component: TodayPage,
});

function TodayPage() {
  return (
    <>
      <PageHeader title="Today" emoji="🌸" />
      <ComingSoonCard />
    </>
  );
}