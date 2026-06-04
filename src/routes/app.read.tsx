import { createFileRoute } from "@tanstack/react-router";
import { ComingSoonCard, PageHeader } from "@/components/bloom/PageHeader";

export const Route = createFileRoute("/app/read")({
  head: () => ({ meta: [{ title: "Read — Bloom" }] }),
  component: () => (<><PageHeader title="Read" emoji="📖" /><ComingSoonCard /></>),
});