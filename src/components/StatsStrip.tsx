"use client";

import React from "react";
import { ShieldAlert, Trophy, Zap, TrendingUp } from "lucide-react";

export default function StatsStrip() {
  const stats = [
    {
      value: "100+",
      label: "Bugs Reported",
      icon: <ShieldAlert className="w-5 h-5 text-purple-400" />
    },
    {
      value: "4",
      label: "Hackathon Wins",
      icon: <Trophy className="w-5 h-5 text-yellow-400" />
    },
    {
      value: "20+",
      label: "Hackathons\nParticipated",
      icon: <Zap className="w-5 h-5 text-blue-400" />
    },
    {
      value: "200K+",
      label: "Impressions",
      icon: <TrendingUp className="w-5 h-5 text-green-400" />
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8 -mt-2 mb-8">
      <div className="rounded-2xl sm:rounded-3xl bg-[#090D16] border-[3px] border-black text-white px-4 py-5 sm:px-8 sm:py-7 shadow-brutal-lg">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-8 items-center justify-between">
          {stats.map((stat, idx) => (
            <div key={idx} className="flex items-center gap-2.5 sm:gap-3 group">
              <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-xl sm:rounded-2xl bg-neutral-900 border-2 border-neutral-700 flex items-center justify-center group-hover:scale-110 group-hover:border-purple-400 transition-all shrink-0">
                {stat.icon}
              </div>
              <div>
                <p className="text-xl sm:text-3xl font-black text-white leading-none font-display tracking-tight">
                  {stat.value}
                </p>
                <p className="text-[11px] sm:text-xs font-bold text-neutral-400 leading-tight mt-0.5 sm:mt-1 whitespace-pre-line">
                  {stat.label}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
