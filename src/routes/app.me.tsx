import { createFileRoute } from "@tanstack/react-router";
import { ComingSoonCard, PageHeader } from "@/components/bloom/PageHeader";

export const Route = createFileRoute("/app/me")({
  head: () => ({ meta: [{ title: "Me — Bloom" }] }),
  component: () => (<><PageHeader title="Me" emoji="🎀" /><ComingSoonCard /></>),
});