"use client";

import React, { useState, useEffect, useCallback } from "react";
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
  Activity,
  CloudCheck,
  RotateCcw,
  RefreshCw
} from "lucide-react";
import { RoadmapItem } from "@/data/roadmapData";
import AdminRoadmapCurriculum from "@/components/AdminRoadmapCurriculum";
import ChapterRoadmapViewer from "@/components/ChapterRoadmapViewer";

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
  const [activeTab, setActiveTab] = useState<"chapters" | "phases" | "deep_curriculum">("chapters");
  const [expandedPhases, setExpandedPhases] = useState<Record<number, boolean>>({ 0: true, 1: true });
  const [completedItems, setCompletedItems] = useState<string[]>([]);
  const [syncStatus, setSyncStatus] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  // 1. Load progress from Database & LocalStorage on mount
  useEffect(() => {
    // Initial load from LocalStorage for instant UI render
    try {
      const stored = localStorage.getItem(`lms_roadmap_completed_${roadmap.slug}`);
      if (stored) {
        setCompletedItems(JSON.parse(stored));
      }
    } catch {}

    // Fetch from Supabase DB via /api/roadmap/progress
    fetch(`/api/roadmap/progress?slug=${roadmap.slug}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.completedItems && Array.isArray(data.completedItems)) {
          setCompletedItems((prev) => {
            const merged = Array.from(new Set([...prev, ...data.completedItems]));
            try {
              localStorage.setItem(`lms_roadmap_completed_${roadmap.slug}`, JSON.stringify(merged));
            } catch {}
            return merged;
          });
          setSyncStatus("DB Synced");
          setTimeout(() => setSyncStatus(null), 2000);
        }
      })
      .catch(() => {});
  }, [roadmap.slug]);

  // 2. Save progress to Database & LocalStorage
  const saveToDatabase = useCallback(
    async (updated: string[], toggledItem?: string) => {
      setIsSaving(true);
      setSyncStatus("Saving to DB...");
      try {
        const res = await fetch("/api/roadmap/progress", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            roadmapSlug: roadmap.slug,
            completedItems: updated,
            itemToggled: toggledItem,
          }),
        });
        const data = await res.json();
        if (data.success) {
          setSyncStatus("✓ Saved to Database");
        } else {
          setSyncStatus("Saved locally");
        }
      } catch {
        setSyncStatus("Saved locally");
      } finally {
        setIsSaving(false);
        setTimeout(() => setSyncStatus(null), 3000);
      }
    },
    [roadmap.slug]
  );

  // Toggle single checklist item (Topic, Goal, Tool, Bug)
  const toggleItemComplete = (itemId: string) => {
    if (!isPurchased) {
      onRequestBuy();
      return;
    }

    setCompletedItems((prev) => {
      const updated = prev.includes(itemId)
        ? prev.filter((id) => id !== itemId)
        : [...prev, itemId];

      try {
        localStorage.setItem(`lms_roadmap_completed_${roadmap.slug}`, JSON.stringify(updated));
      } catch {}

      saveToDatabase(updated, itemId);
      return updated;
    });
  };

  // Check all items in a phase
  const handleCheckAllPhase = (phaseNumber: number, itemsToCheck: string[]) => {
    if (!isPurchased) {
      onRequestBuy();
      return;
    }

    setCompletedItems((prev) => {
      const updated = Array.from(new Set([...prev, ...itemsToCheck]));
      try {
        localStorage.setItem(`lms_roadmap_completed_${roadmap.slug}`, JSON.stringify(updated));
      } catch {}
      saveToDatabase(updated);
      return updated;
    });
  };

  // Reset all items in a phase
  const handleResetPhase = (phaseNumber: number, itemsToReset: string[]) => {
    if (!isPurchased) {
      onRequestBuy();
      return;
    }

    setCompletedItems((prev) => {
      const updated = prev.filter((id) => !itemsToReset.includes(id));
      try {
        localStorage.setItem(`lms_roadmap_completed_${roadmap.slug}`, JSON.stringify(updated));
      } catch {}
      saveToDatabase(updated);
      return updated;
    });
  };

  const togglePhaseExpand = (idx: number) => {
    setExpandedPhases((prev) => ({ ...prev, [idx]: !prev[idx] }));
  };

  // Calculate totals across all phases
  const allPhaseTopics = roadmap.phases.flatMap((p) => p.topics || []);
  const allPhaseGoals = roadmap.phases.flatMap((p) => p.handsOnGoals || []);
  const totalPhaseChecklist = [...allPhaseTopics, ...allPhaseGoals];
  const completedPhaseCount = totalPhaseChecklist.filter((t) => completedItems.includes(t)).length;
  const progressPercent = totalPhaseChecklist.length > 0
    ? Math.min(100, Math.round((completedPhaseCount / totalPhaseChecklist.length) * 100))
    : 0;

  return (
    <div className="space-y-6">
      {/* ══ TOP BAR & LMS NAVIGATION ═══════════════════════════════════ */}
      <div className="rounded-3xl border-[3.5px] border-black bg-white p-5 sm:p-7 shadow-brutal space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button
              onClick={onBack}
              className="p-2.5 rounded-xl border-2 border-black bg-neutral-100 hover:bg-neutral-200 text-black transition-colors shadow-brutal-xs flex items-center gap-1.5 text-xs font-black uppercase"
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

          <div className="flex items-center gap-3 self-start sm:self-auto shrink-0">
            {/* Live Database Sync Indicator */}
            {syncStatus && (
              <span className="px-3 py-1 rounded-xl bg-emerald-100 text-emerald-900 border-2 border-emerald-600 font-mono text-[11px] font-black uppercase shadow-brutal-xs flex items-center gap-1.5">
                {isSaving ? <RefreshCw className="w-3 h-3 animate-spin" /> : <Check className="w-3 h-3" />}
                <span>{syncStatus}</span>
              </span>
            )}

            {!isPurchased && (
              <button
                onClick={onRequestBuy}
                className="btn-brutal btn-brutal-yellow py-2.5 px-4 text-xs uppercase font-black tracking-wide flex items-center justify-center gap-2"
              >
                <Zap className="w-4 h-4 fill-black" />
                <span>Unlock Full Roadmap · {roadmap.price}</span>
              </button>
            )}
          </div>
        </div>

        {/* Live Interactive Checklist Progress Strip */}
        <div className="pt-3 border-t-2 border-neutral-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex-1 max-w-xl">
            <div className="flex items-center justify-between text-xs font-black text-neutral-700 mb-1.5">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Curriculum Checklist Progress (Live DB Synced)</span>
              </span>
              <span className="font-mono text-purple-900 font-black">
                {completedPhaseCount} / {totalPhaseChecklist.length} Items Ticked ({progressPercent}%)
              </span>
            </div>
            <div className="h-3.5 rounded-full border-2 border-black bg-neutral-100 overflow-hidden shadow-brutal-xs">
              <div
                className="h-full bg-emerald-400 border-r-2 border-black transition-all duration-300"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs font-bold text-neutral-600">
            <span className="px-2.5 py-1 rounded-lg bg-neutral-100 border border-neutral-300 font-mono font-black text-[11px]">
              {roadmap.modulesCount} Master Phases
            </span>
          </div>
        </div>

        {/* View Switcher: Interactive Docs is default */}
        <div className="pt-2 flex items-center justify-between gap-2 overflow-x-auto scrollbar-none">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab("chapters")}
              className={`px-3.5 py-2 rounded-xl border-2 border-black text-xs font-black uppercase tracking-wider flex items-center gap-2 transition-all shadow-brutal-xs shrink-0 ${
                activeTab === "chapters"
                  ? "bg-yellow-300 text-black shadow-brutal-xs"
                  : "bg-white text-neutral-700 hover:bg-neutral-50"
              }`}
            >
              <BookOpen className="w-3.5 h-3.5 text-black" />
              <span>📖 Interactive Cyber Security Docs</span>
            </button>
            <button
              onClick={() => setActiveTab("deep_curriculum")}
              className={`px-3.5 py-2 rounded-xl border-2 border-black text-xs font-black uppercase tracking-wider flex items-center gap-2 transition-all shadow-brutal-xs shrink-0 ${
                activeTab === "deep_curriculum"
                  ? "bg-yellow-300 text-black shadow-brutal-xs"
                  : "bg-white text-neutral-700 hover:bg-neutral-50"
              }`}
            >
              <Layers className="w-3.5 h-3.5 text-black" />
              <span>🛠️ Reference Matrix (53+ Tools & Bugs)</span>
            </button>
          </div>
        </div>
      </div>

      {/* ══ VIEW 0: CHAPTER-WISE MASTERCLASS ═══════════════════════════ */}
      {activeTab === "chapters" && (
        <ChapterRoadmapViewer
          completedItems={completedItems}
          onToggleItem={toggleItemComplete}
          syncStatus={syncStatus}
          isUnlocked={isPurchased}
          onRequestUnlock={onRequestBuy}
        />
      )}

      {/* ══ VIEW 1: MASTER PHASE CHECKLISTS ════════════════════════════ */}
      {activeTab === "phases" && (
        <div className="space-y-4">
          <div className="p-4 rounded-2xl border-2 border-black bg-emerald-50 text-xs font-bold text-emerald-950 flex items-center justify-between gap-4">
            <div className="flex items-center gap-2.5">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
              <span>
                <strong>Interactive Checklist Mode:</strong> Click any topic or lab goal below to tick it off. Your progress is saved automatically to the database and synced across your devices.
              </span>
            </div>
            {isSaving && (
              <span className="text-[11px] font-mono text-emerald-800 flex items-center gap-1 shrink-0">
                <RefreshCw className="w-3.5 h-3.5 animate-spin" /> Saving...
              </span>
            )}
          </div>

          {roadmap.phases.map((phase, idx) => {
            const isExpanded = expandedPhases[idx] ?? false;
            const phaseTopics = phase.topics || [];
            const phaseGoals = phase.handsOnGoals || [];
            const allPhaseItems = [...phaseTopics, ...phaseGoals];
            const phaseCompletedCount = allPhaseItems.filter((t) => completedItems.includes(t)).length;
            const isPhaseFullyDone = allPhaseItems.length > 0 && phaseCompletedCount === allPhaseItems.length;

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
                    <div
                      className={`w-10 h-10 rounded-2xl border-2 border-black flex items-center justify-center font-black text-sm shrink-0 shadow-brutal-xs transition-colors ${
                        isPhaseFullyDone ? "bg-emerald-400 text-black" : "bg-black text-white"
                      }`}
                    >
                      {isPhaseFullyDone ? <Check className="w-5 h-5 stroke-[3]" /> : phase.phaseNumber}
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
                          <span
                            className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-full border ${
                              isPhaseFullyDone
                                ? "bg-emerald-400 text-black border-emerald-700"
                                : "bg-emerald-100 text-emerald-800 border-emerald-300"
                            }`}
                          >
                            {phaseCompletedCount} / {allPhaseItems.length} Checklist Items Done
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

                {/* Phase Expanded Checklist Content */}
                {isExpanded && (
                  <div className="p-5 sm:p-6 border-t-2 border-neutral-200 bg-neutral-50 space-y-6">
                    {/* Quick Phase Checklist Actions */}
                    <div className="flex items-center justify-between gap-2 flex-wrap pb-2 border-b border-neutral-200">
                      <span className="text-[11px] font-black uppercase text-neutral-500">
                        Phase {phase.phaseNumber} Checklist Controls:
                      </span>
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => handleCheckAllPhase(phase.phaseNumber, allPhaseItems)}
                          className="px-2.5 py-1 rounded-lg border border-black bg-white hover:bg-emerald-50 text-[11px] font-black uppercase text-emerald-800 shadow-brutal-xs"
                        >
                          ✓ Tick All in Phase
                        </button>
                        <button
                          type="button"
                          onClick={() => handleResetPhase(phase.phaseNumber, allPhaseItems)}
                          className="px-2.5 py-1 rounded-lg border border-black bg-white hover:bg-red-50 text-[11px] font-black uppercase text-red-700 shadow-brutal-xs"
                        >
                          ✕ Clear Phase
                        </button>
                      </div>
                    </div>

                    {/* Section 1: Topics Checklist */}
                    <div>
                      <h4 className="text-xs font-black uppercase tracking-wider text-neutral-700 mb-3 flex items-center gap-2">
                        <BookOpen className="w-4 h-4 text-purple-600" />
                        Theoretical &amp; Architectural Topics (Click box to tick)
                      </h4>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                        {phaseTopics.map((topic, tIdx) => {
                          const isDone = completedItems.includes(topic);
                          return (
                            <div
                              key={tIdx}
                              onClick={() => toggleItemComplete(topic)}
                              className={`p-3 rounded-2xl border-2 transition-all cursor-pointer flex items-start gap-3 shadow-brutal-xs select-none ${
                                isDone
                                  ? "bg-emerald-50 border-emerald-600"
                                  : "bg-white border-black hover:border-purple-600"
                              }`}
                            >
                              <div
                                className={`w-5 h-5 rounded-lg border-2 flex items-center justify-center shrink-0 mt-0.5 transition-colors ${
                                  isDone
                                    ? "bg-emerald-500 border-emerald-700 text-white"
                                    : "bg-neutral-100 border-black text-transparent hover:border-purple-600"
                                }`}
                              >
                                <Check className="w-3.5 h-3.5 stroke-[3]" />
                              </div>
                              <span
                                className={`text-xs font-bold leading-relaxed ${
                                  isDone ? "text-emerald-950 line-through opacity-75" : "text-black"
                                }`}
                              >
                                {topic}
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* Section 2: Hands-on Lab Goals Checklist */}
                    {phaseGoals.length > 0 && (
                      <div className="pt-4 border-t border-neutral-200">
                        <h4 className="text-xs font-black uppercase tracking-wider text-neutral-700 mb-3 flex items-center gap-2">
                          <Target className="w-4 h-4 text-amber-600" />
                          Practical Hands-On Lab Milestones (Click box to tick)
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                          {phaseGoals.map((goal, gIdx) => {
                            const isDone = completedItems.includes(goal);
                            return (
                              <div
                                key={gIdx}
                                onClick={() => toggleItemComplete(goal)}
                                className={`p-3 rounded-2xl border-2 transition-all cursor-pointer flex items-start gap-3 shadow-brutal-xs select-none ${
                                  isDone
                                    ? "bg-amber-100 border-amber-600"
                                    : "bg-yellow-50/70 border-black hover:border-amber-500"
                                }`}
                              >
                                <div
                                  className={`w-5 h-5 rounded-lg border-2 flex items-center justify-center shrink-0 mt-0.5 transition-colors ${
                                    isDone
                                      ? "bg-amber-500 border-amber-700 text-black"
                                      : "bg-white border-black text-transparent hover:border-amber-600"
                                  }`}
                                >
                                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                                </div>
                                <div>
                                  <span
                                    className={`text-xs font-bold leading-relaxed block ${
                                      isDone ? "text-amber-950 line-through opacity-75" : "text-black"
                                    }`}
                                  >
                                    {goal}
                                  </span>
                                  <span className="text-[10px] font-black uppercase tracking-wider text-amber-700">
                                    Lab Milestone
                                  </span>
                                </div>
                              </div>
                            );
                          })}
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
          <AdminRoadmapCurriculum
            completedItems={completedItems}
            onToggleItem={toggleItemComplete}
            syncStatus={syncStatus}
          />
        </div>
      )}
    </div>
  );
}
