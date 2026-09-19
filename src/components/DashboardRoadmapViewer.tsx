"use client";

import React, { useState, useEffect, useCallback } from "react";
import {
  ArrowLeft,
  Check,
  BookOpen,
  Layers,
  Zap,
  RefreshCw,
  Award,
  ShieldCheck
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
  const [activeTab, setActiveTab] = useState<"chapters" | "deep_curriculum">("chapters");
  const [completedItems, setCompletedItems] = useState<string[]>([]);
  const [syncStatus, setSyncStatus] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  // 1. Load progress from Database & LocalStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(`lms_roadmap_completed_${roadmap.slug}`);
      if (stored) {
        setCompletedItems(JSON.parse(stored));
      }
    } catch {}

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

  // Toggle single checklist item
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

  return (
    <div className="space-y-6">
      {/* ══ TOP BAR & LMS NAVIGATION ═══════════════════════════════════ */}
      <div className="rounded-3xl border-[3.5px] border-black bg-white p-5 sm:p-7 shadow-brutal space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button
              onClick={onBack}
              className="p-2.5 rounded-xl border-2 border-black bg-neutral-100 hover:bg-neutral-200 text-black transition-colors shadow-brutal-xs flex items-center gap-1.5 text-xs font-black uppercase cursor-pointer"
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
                    Preview Mode
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
                className="btn-brutal btn-brutal-yellow py-2.5 px-4 text-xs uppercase font-black tracking-wide flex items-center justify-center gap-2 cursor-pointer"
              >
                <Zap className="w-4 h-4 fill-black" />
                <span>Unlock Full Roadmap · {roadmap.price}</span>
              </button>
            )}
          </div>
        </div>

        {/* View Switcher: Interactive Docs is default */}
        <div className="pt-2 flex items-center justify-between gap-2 overflow-x-auto scrollbar-none">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab("chapters")}
              className={`px-3.5 py-2 rounded-xl border-2 border-black text-xs font-black uppercase tracking-wider flex items-center gap-2 transition-all shadow-brutal-xs shrink-0 cursor-pointer ${
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
              className={`px-3.5 py-2 rounded-xl border-2 border-black text-xs font-black uppercase tracking-wider flex items-center gap-2 transition-all shadow-brutal-xs shrink-0 cursor-pointer ${
                activeTab === "deep_curriculum"
                  ? "bg-yellow-300 text-black shadow-brutal-xs"
                  : "bg-white text-neutral-700 hover:bg-neutral-50"
              }`}
            >
              <Layers className="w-3.5 h-3.5 text-black" />
              <span>🛠️ Reference Matrix (53+ Tools &amp; Bugs)</span>
            </button>
          </div>
        </div>
      </div>

      {/* ══ VIEW 0: CHAPTER-WISE MASTERCLASS DOCS ═══════════════════════ */}
      {activeTab === "chapters" && (
        <ChapterRoadmapViewer
          completedItems={completedItems}
          onToggleItem={toggleItemComplete}
          syncStatus={syncStatus}
          isUnlocked={isPurchased}
          onRequestUnlock={onRequestBuy}
        />
      )}

      {/* ══ VIEW 1: FULL DEEP MASTERCLASS MATRIX ═══════════════════════ */}
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
