"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ShieldAlert,
  ArrowLeft,
  Map,
  RefreshCw,
  LogOut,
  Sparkles,
  Award,
  Lock,
  ExternalLink,
  BookOpen
} from "lucide-react";
import AdminRoadmapCurriculum from "@/components/AdminRoadmapCurriculum";

export default function AdminRoadmapPage() {
  const [refreshing, setRefreshing] = useState(false);

  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 600);
  };

  return (
    <div className="min-h-screen bg-neutral-100 p-4 sm:p-6 lg:p-8 space-y-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Top Header */}
        <div className="rounded-3xl border-[3.5px] border-black bg-black text-white p-5 sm:p-6 shadow-brutal flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Link
              href="/admin"
              className="p-2.5 rounded-2xl border-2 border-white bg-neutral-900 hover:bg-neutral-800 text-white transition-colors shadow-brutal-xs flex items-center gap-1.5 text-xs font-black uppercase"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Admin Panel</span>
            </Link>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="px-2.5 py-0.5 rounded-full border border-amber-400 bg-amber-400 text-black text-[10px] font-black uppercase">
                  Admin Curriculum Engine
                </span>
                <span className="text-xs font-mono text-neutral-400">/admin/roadmap</span>
              </div>
              <h1 className="text-xl sm:text-2xl font-black text-white font-display uppercase tracking-tight">
                Web Pentesting Paid Roadmap Master Center
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleRefresh}
              className="px-4 py-2.5 rounded-xl border-2 border-white bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-black uppercase tracking-wider flex items-center gap-1.5 transition-all shadow-brutal-xs"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${refreshing ? "animate-spin" : ""}`} />
              <span>Refresh</span>
            </button>
            <Link
              href="/dashboard"
              className="px-4 py-2.5 rounded-xl border-2 border-amber-300 bg-amber-300 hover:bg-amber-400 text-black text-xs font-black uppercase tracking-wider flex items-center gap-1.5 transition-all shadow-brutal-xs"
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>View In LMS Portal</span>
            </Link>
          </div>
        </div>

        {/* Deep Roadmap Curriculum Component */}
        <AdminRoadmapCurriculum />
      </div>
    </div>
  );
}
