"use client";

import React from "react";
import {
  Code2, Globe, Layers, Cpu, Server, Database, Terminal, FileCode2,
  ShieldCheck, ShieldAlert, Bug, Lock, Search, Eye,
  BarChart2, TrendingUp, Megaphone, Share2, PenTool,
} from "lucide-react";

/* ── skill data ────────────────────────────────────────────────── */
const row1 = [
  { name: "HTML",         Icon: Globe      },
  { name: "CSS",          Icon: Layers     },
  { name: "JavaScript",   Icon: Code2      },
  { name: "React JS",     Icon: Cpu        },
  { name: "Node JS",      Icon: Server     },
  { name: "SQL",          Icon: Database   },
  { name: "Python",       Icon: Terminal   },
  { name: "C",            Icon: FileCode2  },
  { name: "C++",          Icon: FileCode2  },
  { name: "Java",         Icon: FileCode2  },
];

const row2 = [
  { name: "Web Pentesting",            Icon: ShieldCheck },
  { name: "App Pentesting",            Icon: ShieldAlert },
  { name: "API Pentesting",            Icon: Bug         },
  { name: "Reverse Engineering",       Icon: Cpu         },
  { name: "Cyber Crime Investigation", Icon: Search      },
  { name: "SOC",                       Icon: Eye         },
  { name: "VAPT",                      Icon: Lock        },
];

const row3 = [
  { name: "SEO",               Icon: BarChart2  },
  { name: "Google Ads",        Icon: TrendingUp },
  { name: "Meta Ads",          Icon: Megaphone  },
  { name: "Social Media",      Icon: Share2     },
  { name: "Graphic Designing", Icon: PenTool    },
];

/* ── single pill ────────────────────────────────────────────────── */
function Pill({
  name,
  Icon,
  dark,
}: {
  name: string;
  Icon: React.ElementType;
  dark?: boolean;
}) {
  return (
    <span
      className={`
        inline-flex items-center gap-2 shrink-0 mx-3
        px-5 py-2.5 rounded-2xl border-[2.5px] border-black
        shadow-brutal-sm font-display font-extrabold text-sm
        whitespace-nowrap select-none cursor-default
        ${dark
          ? "bg-[#1a1a1a] text-white border-neutral-700"
          : "bg-white text-black"
        }
      `}
    >
      <Icon className={`w-4 h-4 shrink-0 ${dark ? "text-purple-400" : "text-black"}`} strokeWidth={2.5} />
      {name}
    </span>
  );
}

/* ── infinite marquee row ───────────────────────────────────────── */
function Marquee({
  items,
  reverse = false,
  duration = "30s",
  dark = false,
}: {
  items: { name: string; Icon: React.ElementType }[];
  reverse?: boolean;
  duration?: string;
  dark?: boolean;
}) {
  const tripled = [...items, ...items, ...items];
  return (
    <div className="overflow-hidden">
      <div
        style={{
          display: "flex",
          width: "max-content",
          animation: `marqueeScroll ${duration} linear infinite`,
          animationDirection: reverse ? "reverse" : "normal",
        }}
        onMouseEnter={(e) =>
          ((e.currentTarget as HTMLDivElement).style.animationPlayState = "paused")
        }
        onMouseLeave={(e) =>
          ((e.currentTarget as HTMLDivElement).style.animationPlayState = "running")
        }
      >
        {tripled.map((s, i) => (
          <Pill key={`${s.name}-${i}`} name={s.name} Icon={s.Icon} dark={dark} />
        ))}
      </div>
    </div>
  );
}

/* ── section ────────────────────────────────────────────────────── */
export default function SkillsSection() {
  return (
    <section
      id="skills"
      className="border-t-[3.5px] border-black overflow-hidden"
      style={{ backgroundColor: "var(--bg)" }}
    >
      {/* ── top label bar ─────────────────────────────── */}
      <div
        className="border-b-[3px] border-black py-5 px-4 sm:px-8"
        style={{ backgroundColor: "var(--bg)" }}
      >
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <h2
            className="text-2xl sm:text-4xl font-black font-display tracking-tight"
            style={{ color: "var(--fg)" }}
          >
            Skills &amp; Expertise
          </h2>
          <p className="text-xs sm:text-sm font-bold uppercase tracking-widest" style={{ color: "var(--fg-subtle)" }}>
            Development · Cyber Security · Digital Marketing
          </p>
        </div>
      </div>

      {/* ── ROW 1 — yellow — Development ──────────────── */}
      <div className="bg-[#FEF08A] border-b-[3px] border-black py-4">
        <Marquee items={row1} duration="32s" />
      </div>

      {/* ── ROW 2 — dark — Cyber Security ─────────────── */}
      <div className="bg-[#18181B] border-b-[3px] border-black py-4">
        <Marquee items={row2} reverse duration="38s" dark />
      </div>

      {/* ── ROW 3 — purple — Digital Marketing ────────── */}
      <div className="bg-[#DDD6FE] py-4">
        <Marquee items={row3} duration="24s" />
      </div>

      {/* ── keyframes ─────────────────────────────────── */}
      <style>{`
        @keyframes marqueeScroll {
          from { transform: translateX(0); }
          to   { transform: translateX(-33.333%); }
        }
      `}</style>
    </section>
  );
}
