"use client";

import React from "react";

type Org = { name: string; badge: string };

export default function HallOfFameMarquee({ orgs }: { orgs: Org[] }) {
  const triple = [...orgs, ...orgs, ...orgs];

  return (
    <div className="pb-10 space-y-3 overflow-hidden">
      {/* Row 1 → left */}
      <div className="overflow-hidden">
        <div
          style={{ display: "flex", width: "max-content", animation: "marqueeScroll 30s linear infinite" }}
          onMouseEnter={(e) => ((e.currentTarget as HTMLDivElement).style.animationPlayState = "paused")}
          onMouseLeave={(e) => ((e.currentTarget as HTMLDivElement).style.animationPlayState = "running")}
        >
          {triple.map((org, i) => (
            <div key={i} className="shrink-0 mx-2 flex items-center gap-2.5 px-5 py-2.5 rounded-2xl border-2 border-neutral-700 bg-neutral-900 hover:border-white transition-colors cursor-default">
              <span className="w-2.5 h-2.5 rounded-full bg-yellow-400 shrink-0" />
              <p className="font-display font-black text-sm text-white whitespace-nowrap">{org.name}</p>
              <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded bg-neutral-800 text-yellow-300 border border-neutral-700 whitespace-nowrap">
                {org.badge}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Row 2 ← right (reversed) */}
      <div className="overflow-hidden">
        <div
          style={{ display: "flex", width: "max-content", animation: "marqueeScroll 24s linear infinite reverse" }}
          onMouseEnter={(e) => ((e.currentTarget as HTMLDivElement).style.animationPlayState = "paused")}
          onMouseLeave={(e) => ((e.currentTarget as HTMLDivElement).style.animationPlayState = "running")}
        >
          {[...triple].reverse().map((org, i) => (
            <div key={i} className="shrink-0 mx-2 flex items-center gap-2.5 px-5 py-2.5 rounded-2xl border-2 border-neutral-700 bg-neutral-900 hover:border-purple-400 transition-colors cursor-default">
              <span className="w-2.5 h-2.5 rounded-full bg-purple-400 shrink-0" />
              <p className="font-display font-black text-sm text-white whitespace-nowrap">{org.name}</p>
              <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded bg-neutral-800 text-purple-300 border border-neutral-700 whitespace-nowrap">
                {org.badge}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
