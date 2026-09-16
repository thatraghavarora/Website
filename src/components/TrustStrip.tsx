"use client";

import React from "react";
import { Plus } from "lucide-react";
import { trustedLogos } from "@/data/siteData";

export default function TrustStrip() {
  return (
    <section
      className="py-8 border-b-[3px] border-black"
      style={{ backgroundColor: "var(--bg-secondary)" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p
          className="text-xs font-black uppercase tracking-widest mb-4 text-center sm:text-left"
          style={{ color: "var(--fg-subtle)" }}
        >
          TRUSTED BY &amp; RECOGNISED BY
        </p>

        <div className="flex items-center gap-3.5 overflow-x-auto pb-2 scrollbar-none">
          {trustedLogos.map((item) => (
            <div
              key={item.name}
              className="shrink-0 px-4 py-2.5 rounded-xl border-[2.5px] shadow-brutal-sm hover:-translate-y-1 hover:shadow-brutal transition-all flex items-center gap-2 group cursor-pointer"
              style={{
                backgroundColor: "var(--bg-card)",
                borderColor: "var(--border)",
              }}
              title={`${item.name} - ${item.role}`}
            >
              <span
                className="w-3 h-3 rounded-full border border-black shrink-0 group-hover:scale-125 transition-transform"
                style={{ backgroundColor: item.color, borderColor: "var(--border)" }}
              />
              <span
                className="font-display font-extrabold text-sm sm:text-base tracking-tight whitespace-nowrap"
                style={{ color: "var(--fg)" }}
              >
                {item.name}
              </span>
            </div>
          ))}

          <div
            className="shrink-0 w-11 h-11 rounded-xl border-[2.5px] shadow-brutal-sm hover:-translate-y-1 hover:opacity-80 transition-all flex items-center justify-center cursor-pointer"
            style={{ backgroundColor: "var(--bg-card)", borderColor: "var(--border)" }}
            title="And more organizations & startups"
          >
            <Plus className="w-5 h-5 text-blue-500 stroke-[3]" />
          </div>
        </div>
      </div>
    </section>
  );
}
