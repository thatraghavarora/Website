import React from "react";
import { notFound } from "next/navigation";
import { roadmaps } from "@/data/roadmapData";
import RoadmapDetailClient from "./RoadmapDetailClient";

export async function generateStaticParams() {
  return roadmaps.map((r) => ({ slug: r.slug }));
}

export default async function RoadmapDetailPage({
  params
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const roadmap = roadmaps.find((r) => r.slug === slug);

  if (!roadmap) {
    notFound();
  }

  return <RoadmapDetailClient roadmap={roadmap} />;
}
