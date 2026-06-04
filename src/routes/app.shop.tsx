import { createFileRoute } from "@tanstack/react-router";
import { ComingSoonCard, PageHeader } from "@/components/bloom/PageHeader";

export const Route = createFileRoute("/app/shop")({
  head: () => ({ meta: [{ title: "Shop — Bloom" }] }),
  component: () => (<><PageHeader title="Shop" emoji="🛍️" /><ComingSoonCard /></>),
});