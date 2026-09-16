import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  ExternalLink,
  CheckCircle2,
  Terminal,
  Layers,
  Cpu
} from "lucide-react";
import { projects } from "@/data/siteData";
import { GithubIcon } from "@/components/SocialIcons";

export async function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export default async function ProjectDetailPage({
  params
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    notFound();
  }

  return (
    <div className="py-12 sm:py-16 bg-neutral-50 min-h-screen">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Link */}
        <Link
          href="/projects"
          className="inline-flex items-center gap-2 font-bold text-sm text-neutral-700 hover:text-black mb-8 group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span>Back to All Projects</span>
        </Link>

        {/* Project Hero Header */}
        <div className="rounded-3xl border-[3.5px] border-black bg-white p-8 sm:p-12 shadow-brutal-xl mb-12">
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <span className="px-3 py-1 rounded-full border-2 border-black bg-yellow-300 font-black text-xs uppercase tracking-wider text-black">
              {project.category}
            </span>
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="px-2.5 py-0.5 rounded-full border border-black bg-neutral-100 font-bold text-xs text-neutral-800"
              >
                #{tag}
              </span>
            ))}
          </div>

          <h1 className="text-4xl sm:text-6xl font-black text-black font-display tracking-tight leading-tight mb-4">
            {project.title}
          </h1>

          <p className="text-xl sm:text-2xl font-bold text-neutral-700 mb-6">
            {project.subtitle}
          </p>

          <p className="text-base sm:text-lg text-neutral-800 font-medium leading-relaxed mb-8">
            {project.fullDescription}
          </p>

          {/* Action Links */}
          <div className="flex flex-wrap items-center gap-4 pt-6 border-t-2 border-neutral-200">
            {project.link && (
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-brutal btn-brutal-primary px-6 py-3 text-sm"
              >
                <span>Live Project Demo</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            )}
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-brutal btn-brutal-white px-6 py-3 text-sm"
              >
                <span>View Source Code</span>
                <GithubIcon className="w-4 h-4" />
              </a>
            )}
          </div>
        </div>

        {/* Key Metrics / Stats */}
        {project.stats && (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
            {project.stats.map((st) => (
              <div
                key={st.label}
                className="rounded-2xl border-[3px] border-black bg-yellow-200 p-6 shadow-brutal text-center"
              >
                <p className="text-3xl sm:text-4xl font-black text-black font-display mb-1">
                  {st.value}
                </p>
                <p className="text-xs sm:text-sm font-bold text-neutral-800 uppercase tracking-wider">
                  {st.label}
                </p>
              </div>
            ))}
          </div>
        )}

        {/* Key Architecture Features */}
        {project.features && (
          <div className="rounded-3xl border-[3px] border-black bg-white p-8 sm:p-10 shadow-brutal mb-12">
            <h2 className="text-2xl sm:text-3xl font-black text-black font-display mb-6 flex items-center gap-2.5">
              <Layers className="w-6 h-6 text-blue-600" />
              <span>Key Features &amp; Capabilities</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {project.features.map((feat, i) => (
                <div
                  key={i}
                  className="flex items-start gap-3 p-4 rounded-xl border-2 border-black bg-neutral-50 shadow-brutal-sm"
                >
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  <span className="font-bold text-sm text-neutral-900 leading-snug">
                    {feat}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tech Stack Pills */}
        {project.techStack && (
          <div className="rounded-3xl border-[3px] border-black bg-purple-100 p-8 shadow-brutal">
            <h2 className="text-2xl font-black text-black font-display mb-4 flex items-center gap-2">
              <Cpu className="w-6 h-6 text-purple-700" />
              <span>Technologies &amp; Architecture</span>
            </h2>
            <div className="flex flex-wrap gap-2.5">
              {project.techStack.map((tech) => (
                <span
                  key={tech}
                  className="px-4 py-2 rounded-xl border-2 border-black bg-white font-mono-code font-black text-xs sm:text-sm shadow-brutal-sm"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
