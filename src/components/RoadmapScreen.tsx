"use client";

import React, { useState } from "react";
import {
  Terminal,
  ShieldAlert,
  ArrowDown,
  Layers,
  Sparkles,
  CheckCircle2,
  Cpu,
  Globe,
  Lock,
  Code2,
  Flame,
  Zap,
  ChevronRight,
  Maximize2,
  Eye
} from "lucide-react";

interface RoadmapNode {
  id: string;
  step: string;
  level: "Beginner" | "Intermediate" | "Advanced" | "Mastery";
  title: string;
  accentBg: string; // brutalist color
  accentText: string;
  icon: string;
  subBoxes: string[];
  keyTools: string[];
  description: string;
}

const roadmapNodes: RoadmapNode[] = [
  {
    id: "box-1",
    step: "STEP 01",
    level: "Beginner",
    title: "Networking & Linux Foundations",
    accentBg: "bg-yellow-300",
    accentText: "text-black",
    icon: "Terminal",
    subBoxes: [
      "OSI 7-Layer & TCP/IP Stack",
      "Network Topologies (Star, Mesh, Bus)",
      "Routers, Switches & VLANs",
      "Critical Ports (21, 22, 53, 80, 443, 445)",
      "Subnetting & CIDR Notation",
      "Wireshark & tcpdump Packet Sniffing"
    ],
    keyTools: ["Kali Linux", "Wireshark", "Nmap", "Bash", "tcpdump"],
    description:
      "Before breaking systems, you must understand how data moves. Master TCP 3-way handshakes, IP routing, packet inspection, and essential Linux command-line tools."
  },
  {
    id: "box-2",
    step: "STEP 02",
    level: "Beginner",
    title: "Web Architecture & Proxies",
    accentBg: "bg-cyan-300",
    accentText: "text-black",
    icon: "Globe",
    subBoxes: [
      "HTTP Request / Response Lifecycle",
      "Headers, Methods (GET, POST, PUT, DELETE)",
      "Cookies, Sessions & LocalStorage",
      "Same-Origin Policy (SOP) & CORS",
      "Interception Proxy Setup (Burp Suite)",
      "Passive Recon (Shodan, Censys, WHOIS)"
    ],
    keyTools: ["Burp Suite", "OWASP ZAP", "Firefox DevTools", "Shodan"],
    description:
      "Understand how browsers communicate with web servers. Set up Burp Suite as your interception proxy to inspect, modify, and replay requests in real time."
  },
  {
    id: "box-3",
    step: "STEP 03",
    level: "Intermediate",
    title: "Reconnaissance & Asset Discovery",
    accentBg: "bg-emerald-300",
    accentText: "text-black",
    icon: "Cpu",
    subBoxes: [
      "Subdomain Enumeration (Passive & Active)",
      "Directory & File Fuzzing with ffuf",
      "SecLists Wordlists Integration",
      "JavaScript File Analysis & Secret Scraping",
      "Virtual Host & Port Scanning",
      "Automated Recon Workflows (Bash/Go)"
    ],
    keyTools: ["subfinder", "amass", "httpx", "ffuf", "SecLists", "nuclei"],
    description:
      "The best hackers spend 80% of their time on recon. Find forgotten staging subdomains, unlinked admin dashboards, and exposed API keys in public JS bundles."
  },
  {
    id: "box-4",
    step: "STEP 04",
    level: "Intermediate",
    title: "OWASP Top 10 Core Web Exploitation",
    accentBg: "bg-purple-300",
    accentText: "text-black",
    icon: "ShieldAlert",
    subBoxes: [
      "SQL Injection (In-Band, Blind, Time-Based)",
      "Cross-Site Scripting (Reflected, Stored, DOM)",
      "IDOR & Broken Object-Level Authorization",
      "CSRF & Token Validation Bypasses",
      "SSRF (Cloud 169.254.169.254 Metadata)",
      "File Upload Vulnerabilities (Web Shells)"
    ],
    keyTools: ["sqlmap", "Burp Repeater", "PortSwigger Labs", "DVWA"],
    description:
      "Master manual exploitation of the most common web application vulnerabilities. Learn to write clean PoCs demonstrating impact without automated reliance."
  },
  {
    id: "box-5",
    step: "STEP 05",
    level: "Advanced",
    title: "API Pentesting & Modern Business Logic",
    accentBg: "bg-pink-300",
    accentText: "text-black",
    icon: "Code2",
    subBoxes: [
      "REST & GraphQL Endpoint Discovery",
      "GraphQL Introspection & Circular Queries",
      "JWT Attacks (None Algorithm, Key Confusion)",
      "Multi-Step Business Logic Bypasses",
      "Race Conditions (Limit Overruns)",
      "Mass Assignment & Parameter Tampering"
    ],
    keyTools: ["Postman", "InQL", "Turbo Intruder", "JWT.io"],
    description:
      "Modern web apps live on APIs. Exploit GraphQL query execution, forge JWT signatures, and trigger race conditions to bypass payment gateways and promo limits."
  },
  {
    id: "box-6",
    step: "STEP 06",
    level: "Advanced",
    title: "Advanced Exploitation & Client-Side Attacks",
    accentBg: "bg-rose-300",
    accentText: "text-black",
    icon: "Flame",
    subBoxes: [
      "Server-Side Template Injection (SSTI -> RCE)",
      "XML External Entity (XXE & Blind OOB)",
      "Insecure Deserialization (Pickle/Java)",
      "HTTP Request Smuggling (CL.TE / TE.CL)",
      "CORS Misconfigurations & Null Origin",
      "DOM Clobbering & Prototype Pollution"
    ],
    keyTools: ["Burp Collaborator", "ysoserial", "interactsh", "tplmap"],
    description:
      "High-severity critical findings that yield $1,000+ bounties. Learn to turn template injections into remote command execution and smuggle requests behind reverse proxies."
  },
  {
    id: "box-7",
    step: "STEP 07",
    level: "Mastery",
    title: "Bug Bounty Platforms & Professional VAPT",
    accentBg: "bg-amber-300",
    accentText: "text-black",
    icon: "Zap",
    subBoxes: [
      "HackerOne & Bugcrowd Program Triage",
      "Scoping Policy & Safe Harbor Rules",
      "Writing Professional CVSS 3.1 Reports",
      "Hall of Fame Disclosures (NASA, WHO)",
      "Continuous Monitoring on Cloud VPS",
      "Delivering Corporate Pentest Audits"
    ],
    keyTools: ["HackerOne", "Bugcrowd", "Intigriti", "DigitalOcean VPS"],
    description:
      "Monetize your technical skills. Build a verified reputation, submit accepted reports to international security programs, and deliver professional penetration test assessments."
  }
];

export default function RoadmapScreen() {
  const [selectedNodeId, setSelectedNodeId] = useState<string>("box-1");
  const [filterLevel, setFilterLevel] = useState<string>("All");

  const selectedNode =
    roadmapNodes.find((n) => n.id === selectedNodeId) || roadmapNodes[0];

  const filteredNodes =
    filterLevel === "All"
      ? roadmapNodes
      : roadmapNodes.filter((n) => n.level === filterLevel);

  return (
    <section className="w-full" id="roadmap-screen">
      {/* ══ THE "SCREEN OF BOXES" WINDOW ═══════════════════ */}
      <div className="rounded-3xl border-[4px] border-black shadow-brutal-xl overflow-hidden bg-neutral-950 text-white">
        
        {/* Window Top Bar (Terminal / Retro IDE style) */}
        <div className="bg-neutral-900 border-b-[3.5px] border-black px-4 sm:px-6 py-3.5 flex flex-wrap items-center justify-between gap-3">
          {/* Mac/Terminal Dots */}
          <div className="flex items-center gap-2">
            <span className="w-3.5 h-3.5 rounded-full bg-red-500 border border-black inline-block" />
            <span className="w-3.5 h-3.5 rounded-full bg-yellow-400 border border-black inline-block" />
            <span className="w-3.5 h-3.5 rounded-full bg-emerald-500 border border-black inline-block" />
            <span className="ml-3 font-mono text-xs sm:text-sm font-black text-neutral-300 hidden sm:inline">
              cybersecurity-roadmap-screen.sh — [Visual Box Architecture]
            </span>
          </div>

          {/* Level Filter Tabs */}
          <div className="flex items-center gap-1.5 font-mono text-xs font-bold">
            {["All", "Beginner", "Intermediate", "Advanced", "Mastery"].map((lvl) => (
              <button
                key={lvl}
                onClick={() => setFilterLevel(lvl)}
                className={`px-2.5 py-1 rounded-md border border-neutral-700 transition-colors ${
                  filterLevel === lvl
                    ? "bg-yellow-300 text-black border-black font-black"
                    : "bg-neutral-800 text-neutral-300 hover:bg-neutral-700"
                }`}
              >
                {lvl}
              </button>
            ))}
          </div>
        </div>

        {/* Canvas Area with Dot Grid */}
        <div
          className="p-4 sm:p-8 lg:p-10 relative"
          style={{
            backgroundImage: "radial-gradient(#333333 1.5px, transparent 1.5px)",
            backgroundSize: "20px 20px"
          }}
        >
          {/* Subtitle / Instructions */}
          <div className="flex flex-wrap items-center justify-between gap-3 mb-8 bg-neutral-900/90 border-2 border-neutral-700 rounded-2xl p-4">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping inline-block" />
              <p className="font-mono text-xs sm:text-sm font-bold text-neutral-200">
                <span className="text-yellow-400 font-black">VISUAL ROADMAP BOARD:</span> Click on any box to inspect key topics and tools.
              </p>
            </div>
            <span className="font-mono text-xs text-neutral-400 font-bold hidden md:inline">
              {filteredNodes.length} Active Roadmap Stages
            </span>
          </div>

          {/* ══ THE BOXES FLOW GRID ════════════════════════ */}
          <div className="space-y-6">
            {filteredNodes.map((node, index) => {
              const isSelected = selectedNodeId === node.id;
              const isLast = index === filteredNodes.length - 1;

              return (
                <div key={node.id} className="relative">
                  {/* The Box */}
                  <div
                    onClick={() => setSelectedNodeId(node.id)}
                    className={`cursor-pointer rounded-2xl border-[3.5px] border-black transition-all p-5 sm:p-6 relative text-black shadow-brutal-sm hover:shadow-brutal hover:-translate-y-0.5 ${
                      isSelected
                        ? `${node.accentBg} ring-4 ring-white ring-offset-2 ring-offset-black`
                        : "bg-neutral-100 dark:bg-neutral-900 text-black hover:bg-neutral-50"
                    }`}
                  >
                    {/* Header line inside the box */}
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-3 pb-2 border-b-2 border-black/20">
                      <div className="flex items-center gap-2.5">
                        <span className="px-2.5 py-0.5 rounded-md bg-black text-white text-[11px] font-mono font-black">
                          {node.step}
                        </span>
                        <span
                          className={`px-2.5 py-0.5 rounded-md border border-black text-[10px] font-black uppercase tracking-wider ${
                            isSelected ? "bg-white text-black" : "bg-neutral-200 text-black"
                          }`}
                        >
                          {node.level}
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        {isSelected ? (
                          <span className="text-xs font-black uppercase tracking-wider flex items-center gap-1">
                            <Eye className="w-3.5 h-3.5" /> Inspected
                          </span>
                        ) : (
                          <span className="text-xs font-bold text-neutral-600 flex items-center gap-1">
                            Click to expand <ChevronRight className="w-3.5 h-3.5" />
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Title */}
                    <h3 className="text-xl sm:text-2xl font-black font-display tracking-tight mb-2 text-black">
                      {node.title}
                    </h3>

                    <p className="text-xs sm:text-sm font-medium text-neutral-800 mb-4 line-clamp-2 leading-relaxed">
                      {node.description}
                    </p>

                    {/* Locked content badge */}
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl border border-black bg-white text-black font-mono text-xs font-bold shadow-brutal-sm">
                      <Lock className="w-3.5 h-3.5 text-blue-600" />
                      <span>Full sub-topics &amp; cheatsheets unlocked in roadmap (99 RS | $2)</span>
                    </div>
                  </div>

                  {/* Flow Arrow connecting to next box */}
                  {!isLast && (
                    <div className="flex justify-center my-3">
                      <div className="flex flex-col items-center">
                        <div className="w-0.5 h-3 bg-neutral-600" />
                        <div className="w-7 h-7 rounded-full border-2 border-black bg-yellow-300 text-black flex items-center justify-center shadow-brutal-sm font-black">
                          <ArrowDown className="w-4 h-4 stroke-[3]" />
                        </div>
                        <div className="w-0.5 h-3 bg-neutral-600" />
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* ══ SELECTED NODE INSPECTOR ══════════════════════ */}
          <div className="mt-8 rounded-2xl border-[3.5px] border-black bg-neutral-900 p-6 sm:p-8 shadow-brutal">
            <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b-2 border-neutral-700">
              <div>
                <span className="text-xs font-mono font-bold text-yellow-400 uppercase tracking-wider">
                  Module Name: {selectedNode.step}
                </span>
                <h4 className="text-xl sm:text-2xl font-black font-display text-white mt-1">
                  {selectedNode.title}
                </h4>
              </div>
              <span className="px-3 py-1 rounded-full border-2 border-black bg-yellow-300 text-black text-xs font-black uppercase">
                {selectedNode.level}
              </span>
            </div>

            <p className="text-sm sm:text-base font-medium text-neutral-300 mt-4 leading-relaxed">
              {selectedNode.description}
            </p>

            <div className="mt-6 p-4 rounded-xl border-2 border-dashed border-neutral-600 bg-neutral-950 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-yellow-300 border-2 border-black flex items-center justify-center text-black shrink-0 font-black">
                  <Lock className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm font-black text-white">
                    Detailed Sub-topics &amp; Hands-on Labs Protected
                  </p>
                  <p className="text-xs text-neutral-400 font-medium">
                    All specific vulnerability attack paths, methodology writeups &amp; tools are inside the 99 RS | $2 package.
                  </p>
                </div>
              </div>

              <a
                href="#pricing"
                className="btn-brutal btn-brutal-primary px-5 py-2.5 text-xs uppercase font-black tracking-wider shrink-0 whitespace-nowrap"
              >
                Unlock Module (99 RS | $2)
              </a>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
