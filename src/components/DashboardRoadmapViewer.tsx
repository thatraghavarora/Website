"use client";

import React, { useState, useEffect } from "react";
import {
  ArrowLeft,
  CheckCircle2,
  Lock,
  Unlock,
  Map,
  Layers,
  Award,
  Zap,
  Check,
  ChevronDown,
  ChevronUp,
  Sparkles,
  BookOpen,
  Target,
  ExternalLink,
  ShieldCheck,
  Activity
} from "lucide-react";
import { RoadmapItem } from "@/data/roadmapData";
import AdminRoadmapCurriculum from "@/components/AdminRoadmapCurriculum";

interface DashboardRoadmapViewerProps {
  roadmap: RoadmapItem;
  isPurchased: boolean;
  onBack: () => void;
  onRequestBuy: () => void;
}

export default function DashboardRoadmapViewer({
  roadmap,
  isPurchased,
  onBack,
  onRequestBuy,
}: DashboardRoadmapViewerProps) {
  const [activeTab, setActiveTab] = useState<"phases" | "deep_curriculum">("phases");
  const [activePhaseIdx, setActivePhaseIdx] = useState(0);
  const [expandedPhases, setExpandedPhases] = useState<Record<number, boolean>>({ 0: true, 1: true });
  const [completedTopics, setCompletedTopics] = useState<string[]>([]);

  // Load progress from localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem(`lms_roadmap_completed_${roadmap.slug}`);
      if (stored) {
        setCompletedTopics(JSON.parse(stored));
      }
    } catch {}
  }, [roadmap.slug]);

  const toggleTopicComplete = (topic: string) => {
    if (!isPurchased) {
      onRequestBuy();
      return;
    }
    setCompletedTopics((prev) => {
      const updated = prev.includes(topic)
        ? prev.filter((t) => t !== topic)
        : [...prev, topic];
      try {
        localStorage.setItem(`lms_roadmap_completed_${roadmap.slug}`, JSON.stringify(updated));
      } catch {}
      return updated;
    });
  };

  const togglePhaseExpand = (idx: number) => {
    setExpandedPhases((prev) => ({ ...prev, [idx]: !prev[idx] }));
  };

  // Calculate total topics
  const allTopics = roadmap.phases.flatMap((p) => p.topics || []);
  const totalTopicsCount = allTopics.length;
  const progressPercent = totalTopicsCount > 0
    ? Math.min(100, Math.round((completedTopics.length / totalTopicsCount) * 100))
    : 0;

  return (
    <div className="space-y-6">
      {/* Top Header & Navigation Bar */}
      <div className="rounded-3xl border-[3.5px] border-black bg-white p-5 sm:p-7 shadow-brutal space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button
              onClick={onBack}
              className="p-2 rounded-xl border-2 border-black bg-neutral-100 hover:bg-neutral-200 text-black transition-colors shadow-brutal-xs flex items-center gap-1.5 text-xs font-black uppercase"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back</span>
            </button>
            <div>
              <div className="flex items-center gap-2 mb-1 flex-wrap">
                <span className="px-2.5 py-0.5 rounded-full border border-black bg-purple-200 text-purple-900 text-[10px] font-black uppercase">
                  {roadmap.category}
                </span>
                {isPurchased ? (
                  <span className="px-2.5 py-0.5 rounded-full border border-black bg-emerald-300 text-black text-[10px] font-black uppercase flex items-center gap-1 shadow-brutal-xs">
                    <Check className="w-3 h-3" /> Unlocked &amp; Active
                  </span>
                ) : (
                  <span className="px-2.5 py-0.5 rounded-full border border-black bg-yellow-300 text-black text-[10px] font-black uppercase flex items-center gap-1">
                    <Lock className="w-3 h-3" /> Preview Mode
                  </span>
                )}
              </div>
              <h1 className="text-xl sm:text-2xl font-black text-black font-display uppercase tracking-tight">
                {roadmap.title}
              </h1>
            </div>
          </div>

          {!isPurchased && (
            <button
              onClick={onRequestBuy}
              className="btn-brutal btn-brutal-yellow py-2.5 px-4 text-xs uppercase font-black tracking-wide flex items-center justify-center gap-2 self-start sm:self-auto shrink-0"
            >
              <Zap className="w-4 h-4 fill-black" />
              <span>Unlock Full Roadmap · {roadmap.price}</span>
            </button>
          )}
        </div>

        {/* Progress Bar Strip */}
        <div className="pt-3 border-t-2 border-neutral-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex-1 max-w-xl">
            <div className="flex items-center justify-between text-xs font-black text-neutral-700 mb-1.5">
              <span>Your Curriculum Progress</span>
              <span className="font-mono text-purple-800">{completedTopics.length} / {totalTopicsCount} Topics ({progressPercent}%)</span>
            </div>
            <div className="h-3 rounded-full border-2 border-black bg-neutral-100 overflow-hidden shadow-brutal-xs">
              <div
                className="h-full bg-emerald-400 border-r-2 border-black transition-all duration-300"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-neutral-500">
              {roadmap.modulesCount} Master Phases
            </span>
          </div>
        </div>

        {/* Sub Navigation Tabs inside LMS */}
        <div className="pt-2 flex items-center gap-2 overflow-x-auto scrollbar-none">
          <button
            onClick={() => setActiveTab("phases")}
            className={`px-4 py-2.5 rounded-2xl border-[2.5px] border-black text-xs font-black uppercase tracking-wider flex items-center gap-2 transition-all shadow-brutal-xs ${
              activeTab === "phases"
                ? "bg-amber-300 text-black shadow-brutal"
                : "bg-white text-neutral-700 hover:bg-neutral-50"
            }`}
          >
            <Map className="w-4 h-4" />
            <span>1. Structured Master Phases</span>
          </button>
          <button
            onClick={() => setActiveTab("deep_curriculum")}
            className={`px-4 py-2.5 rounded-2xl border-[2.5px] border-black text-xs font-black uppercase tracking-wider flex items-center gap-2 transition-all shadow-brutal-xs ${
              activeTab === "deep_curriculum"
                ? "bg-amber-300 text-black shadow-brutal"
                : "bg-white text-neutral-700 hover:bg-neutral-50"
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>2. In-Depth Paid Masterclass Matrix (53+ Tools, 105+ Bugs, Kali, OSINT, Labs &amp; Cert)</span>
          </button>
        </div>
      </div>

      {/* ══ VIEW 1: STRUCTURED PHASES ══════════════════════════════════ */}
      {activeTab === "phases" && (
        <div className="space-y-4">
          {roadmap.phases.map((phase, idx) => {
            const isExpanded = expandedPhases[idx] ?? false;
            const phaseTopics = phase.topics || [];
            const phaseCompletedCount = phaseTopics.filter((t) => completedTopics.includes(t)).length;

            return (
              <div
                key={idx}
                className="rounded-3xl border-[3px] border-black bg-white shadow-brutal overflow-hidden transition-all"
              >
                {/* Phase Header */}
                <div
                  onClick={() => togglePhaseExpand(idx)}
                  className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 cursor-pointer hover:bg-neutral-50 transition-colors"
                >
                  <div className="flex items-start sm:items-center gap-3.5">
                    <div className="w-10 h-10 rounded-2xl border-2 border-black bg-black text-white flex items-center justify-center font-black text-sm shrink-0 shadow-brutal-xs">
                      {phase.phaseNumber}
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1 flex-wrap">
                        <span className="px-2.5 py-0.5 rounded-full border border-black bg-blue-100 text-blue-900 text-[10px] font-black uppercase">
                          {phase.badge}
                        </span>
                        <span className="text-[11px] font-bold text-neutral-500 font-mono">
                          {phase.duration}
                        </span>
                        {isPurchased && (
                          <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300">
                            {phaseCompletedCount} / {phaseTopics.length} Completed
                          </span>
                        )}
                      </div>
                      <h3 className="text-base font-black text-black font-display uppercase">
                        {phase.title}
                      </h3>
                      <p className="text-xs font-medium text-neutral-600 mt-0.5 line-clamp-1">
                        {phase.description}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 self-end sm:self-auto shrink-0">
                    <button className="p-1.5 rounded-xl border border-black bg-neutral-100 hover:bg-neutral-200">
                      {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {/* Phase Expanded Content */}
                {isExpanded && (
                  <div className="p-5 sm:p-6 border-t-2 border-neutral-200 bg-neutral-50 space-y-6">
                    {/* Topics Section */}
                    <div>
                      <h4 className="text-xs font-black uppercase tracking-wider text-neutral-500 mb-3 flex items-center gap-2">
                        <BookOpen className="w-4 h-4 text-purple-600" />
                        Core Topics to Master (Click checkbox to mark done)
                      </h4>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                        {phaseTopics.map((topic, tIdx) => {
                          const isDone = completedTopics.includes(topic);
                          return (
                            <div
                              key={tIdx}
                              onClick={() => toggleTopicComplete(topic)}
                              className={`p-3 rounded-2xl border-2 transition-all cursor-pointer flex items-start gap-3 shadow-brutal-xs ${
                                isDone
                                  ? "bg-emerald-50 border-emerald-600"
                                  : "bg-white border-black hover:border-purple-600"
                              }`}
                            >
                              <div
                                className={`w-5 h-5 rounded-lg border-2 flex items-center justify-center shrink-0 mt-0.5 transition-colors ${
                                  isDone
                                    ? "bg-emerald-500 border-emerald-700 text-white"
                                    : "bg-neutral-100 border-black text-transparent"
                                }`}
                              >
                                <Check className="w-3.5 h-3.5 stroke-[3]" />
                              </div>
                              <span
                                className={`text-xs font-bold leading-relaxed ${
                                  isDone ? "text-emerald-950 line-through opacity-80" : "text-black"
                                }`}
                              >
                                {topic}
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* Hands-on Lab Goals */}
                    {(phase.handsOnGoals?.length ?? 0) > 0 && (
                      <div className="pt-4 border-t border-neutral-200">
                        <h4 className="text-xs font-black uppercase tracking-wider text-neutral-500 mb-3 flex items-center gap-2">
                          <Target className="w-4 h-4 text-amber-600" />
                          Hands-On Lab Challenge Goals
                        </h4>
                        <div className="space-y-2">
                          {phase.handsOnGoals!.map((goal, gIdx) => (
                            <div
                              key={gIdx}
                              className="p-3 rounded-2xl border-2 border-black bg-yellow-50 flex items-start gap-2.5 shadow-brutal-xs"
                            >
                              <Zap className="w-4 h-4 text-yellow-600 shrink-0 mt-0.5 fill-yellow-400" />
                              <span className="text-xs font-bold text-black">{goal}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* ══ VIEW 2: FULL DEEP MASTERCLASS MATRIX ═══════════════════════ */}
      {activeTab === "deep_curriculum" && (
        <div className="space-y-6">
          <AdminRoadmapCurriculum />
        </div>
      )}
    </div>
  );
}
