"use client";

import React, { useState, useMemo } from "react";
import {
  Globe,
  Terminal,
  Search,
  Wrench,
  Bug,
  Flag,
  Award,
  Copy,
  Check,
  ExternalLink,
  Shield,
  Layers,
  Code,
  Key,
  Printer,
  Sparkles,
  ChevronDown,
  ChevronUp,
  Cpu,
  Download
} from "lucide-react";
import {
  deepNetworkingTopics,
  deepKaliCommands,
  deepToolsList,
  deepBugsList,
  deepCtfPlatforms,
  deepCertificationsList,
  DeepToolItem,
  DeepBugItem
} from "@/data/deepRoadmapData";

type SubTab = "networking" | "kali" | "osint" | "tools" | "bugs" | "ctf" | "certificate";

export default function AdminRoadmapCurriculum() {
  const [currentSubTab, setCurrentSubTab] = useState<SubTab>("networking");
  const [copiedText, setCopiedText] = useState<string | null>(null);

  // Search & Filters for Tools
  const [toolSearch, setToolSearch] = useState("");
  const [selectedToolCategory, setSelectedToolCategory] = useState<string>("All");

  // Search & Filters for Bugs
  const [bugSearch, setBugSearch] = useState("");
  const [selectedBugSeverity, setSelectedBugSeverity] = useState<string>("All");
  const [selectedBugCategory, setSelectedBugCategory] = useState<string>("All");
  const [expandedBugId, setExpandedBugId] = useState<string | null>(null);

  // Certificate Generator State
  const [studentName, setStudentName] = useState("Aditya Sharma");
  const [certCourseTitle, setCertCourseTitle] = useState("Web Penetration Testing & Bug Bounty Hunter Masterclass");
  const [certId, setCertId] = useState("TRA-PENTEST-2026-8849");
  const [certIssueDate, setCertIssueDate] = useState(new Date().toISOString().split("T")[0]);

  // Copy helper with feedback
  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(id);
    setTimeout(() => setCopiedText(null), 2000);
  };

  // Tool categories
  const toolCategories = useMemo(() => {
    const cats = new Set(deepToolsList.map((t) => t.category));
    return ["All", ...Array.from(cats)];
  }, []);

  // Filtered tools
  const filteredTools = useMemo(() => {
    return deepToolsList.filter((tool) => {
      const matchesCat = selectedToolCategory === "All" || tool.category === selectedToolCategory;
      const q = toolSearch.toLowerCase();
      const matchesQuery =
        tool.name.toLowerCase().includes(q) ||
        tool.description.toLowerCase().includes(q) ||
        tool.syntax.toLowerCase().includes(q);
      return matchesCat && matchesQuery;
    });
  }, [toolSearch, selectedToolCategory]);

  // Bug categories
  const bugCategories = useMemo(() => {
    const cats = new Set(deepBugsList.map((b) => b.category));
    return ["All", ...Array.from(cats)];
  }, []);

  // Filtered bugs
  const filteredBugs = useMemo(() => {
    return deepBugsList.filter((bug) => {
      const matchesCat = selectedBugCategory === "All" || bug.category === selectedBugCategory;
      const matchesSev = selectedBugSeverity === "All" || bug.severity === selectedBugSeverity;
      const q = bugSearch.toLowerCase();
      const matchesQuery =
        bug.name.toLowerCase().includes(q) ||
        bug.id.toLowerCase().includes(q) ||
        bug.impact.toLowerCase().includes(q) ||
        bug.testingMethod.toLowerCase().includes(q) ||
        bug.samplePayloadOrHeader.toLowerCase().includes(q);
      return matchesCat && matchesSev && matchesQuery;
    });
  }, [bugSearch, selectedBugSeverity, selectedBugCategory]);

  // Severity color mapping
  const getSeverityBadge = (severity: DeepBugItem["severity"]) => {
    switch (severity) {
      case "Critical":
        return "bg-red-500 text-white border-red-900";
      case "High":
        return "bg-orange-400 text-black border-orange-800";
      case "Medium":
        return "bg-amber-300 text-black border-amber-700";
      case "Low":
        return "bg-blue-300 text-black border-blue-700";
      case "Informational":
        return "bg-neutral-200 text-neutral-800 border-neutral-400";
      default:
        return "bg-neutral-100 text-black border-black";
    }
  };

  const handlePrintCertificate = () => {
    window.print();
  };

  const handleRegenerateCertId = () => {
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    setCertId(`TRA-PENTEST-2026-${randomNum}`);
  };

  return (
    <div className="space-y-6">
      {/* ══ HERO BANNER WITH METRICS ══════════════════════════════════════ */}
      <div className="rounded-3xl border-[3.5px] border-black bg-gradient-to-r from-amber-300 via-amber-200 to-yellow-100 p-6 sm:p-8 shadow-brutal relative overflow-hidden">
        <div className="relative z-10">
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <span className="px-3 py-1 rounded-xl bg-black text-amber-300 font-black text-xs uppercase tracking-wider border-2 border-black flex items-center gap-1.5 shadow-brutal-xs">
              <Sparkles className="w-3.5 h-3.5" />
              Paid Masterclass Curriculum
            </span>
            <span className="px-3 py-1 rounded-xl bg-white text-black font-black text-xs uppercase tracking-wider border-2 border-black shadow-brutal-xs">
              Web Pentesting & Bug Bounty
            </span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-black text-black font-display uppercase tracking-tight">
            Complete In-Depth Web Pentesting Roadmap
          </h2>
          <p className="mt-2 text-xs sm:text-sm font-bold text-neutral-800 max-w-3xl leading-relaxed">
            Production-grade curriculum covering fundamental networking protocols, Kali Linux terminal mastery, advanced OSINT recon frameworks, 53+ essential offensive tools, a 105+ vulnerability encyclopedia, premier CTF lab platforms, and verified certification credentialing.
          </p>

          {/* Quick Metrics Strip */}
          <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
            {[
              { label: "Networking Topics", count: "4 Pillars", icon: Globe, color: "bg-blue-200" },
              { label: "Kali Commands", count: "30+ Scripts", icon: Terminal, color: "bg-emerald-200" },
              { label: "OSINT Techniques", count: "25+ Dorks", icon: Search, color: "bg-purple-200" },
              { label: "Offensive Tools", count: "53+ Tools", icon: Wrench, color: "bg-orange-200" },
              { label: "Bugs Cataloged", count: "105 Vulnerabilities", icon: Bug, color: "bg-red-200" },
              { label: "CTF Platforms", count: "6 Live Labs", icon: Flag, color: "bg-pink-200" },
            ].map((stat, idx) => {
              const Icon = stat.icon;
              return (
                <div
                  key={idx}
                  className={`p-3 rounded-2xl border-2 border-black ${stat.color} shadow-brutal-xs text-black`}
                >
                  <div className="flex items-center gap-1.5 mb-1 text-[11px] font-black uppercase text-neutral-800">
                    <Icon className="w-3.5 h-3.5" />
                    <span>{stat.label}</span>
                  </div>
                  <div className="text-base sm:text-lg font-black">{stat.count}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* ══ SUB-NAVIGATION PILLS ════════════════════════════════════════ */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {[
          { id: "networking", label: "1. Networking Deep-Dive", icon: Globe },
          { id: "kali", label: "2. Kali Linux & CLI", icon: Terminal },
          { id: "osint", label: "3. OSINT Reconnaissance", icon: Search },
          { id: "tools", label: `4. 50+ Tools Matrix (${deepToolsList.length})`, icon: Wrench },
          { id: "bugs", label: `5. 100+ Bugs Encyclopedia (${deepBugsList.length})`, icon: Bug },
          { id: "ctf", label: `6. CTF Platforms (${deepCtfPlatforms.length})`, icon: Flag },
          { id: "certificate", label: "7. Certificate Studio", icon: Award },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = currentSubTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setCurrentSubTab(tab.id as SubTab)}
              className={`px-4 py-3 rounded-2xl border-[2.5px] border-black text-xs font-black uppercase tracking-wider flex items-center gap-2 whitespace-nowrap transition-all shadow-brutal-xs ${
                isActive
                  ? "bg-black text-white shadow-brutal scale-[1.02]"
                  : "bg-white text-neutral-800 hover:bg-amber-100"
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* ══════════════════════════════════════════════════════════════ */}
      {/* 1. NETWORKING DEEP DIVE                                         */}
      {/* ══════════════════════════════════════════════════════════════ */}
      {currentSubTab === "networking" && (
        <div className="space-y-6">
          <div className="p-4 rounded-2xl border-2 border-black bg-blue-50 text-xs font-bold text-neutral-800 flex items-start gap-3">
            <Globe className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
            <div>
              <span className="font-black uppercase text-blue-900 block mb-0.5">Why Networking Matters First:</span>
              Web penetration testing without networking fundamentals is like driving blindfolded. Understand packet encapsulation, stateful inspection, TCP window sizes, TTL fingerprinting, and subnets before touching any scanner.
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {deepNetworkingTopics.map((topic, i) => (
              <div
                key={i}
                className="rounded-3xl border-[3px] border-black bg-white p-6 shadow-brutal flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="px-3 py-1 rounded-xl bg-blue-100 border border-black text-blue-950 font-black text-xs uppercase tracking-wide">
                      {topic.tag}
                    </span>
                    <span className="text-xs font-black text-neutral-400 font-mono">MODULE 1.{i + 1}</span>
                  </div>

                  <h3 className="text-lg font-black text-black font-display uppercase tracking-tight mb-2">
                    {topic.title}
                  </h3>
                  <p className="text-xs font-semibold text-neutral-600 leading-relaxed mb-4">
                    {topic.summary}
                  </p>

                  <div className="space-y-2 mb-4">
                    <span className="text-[11px] font-black uppercase text-neutral-500 tracking-wider">
                      Essential Engineering Takeaways:
                    </span>
                    <ul className="space-y-1.5 text-xs text-neutral-800 font-medium">
                      {topic.keyPoints.map((point, pIdx) => (
                        <li key={pIdx} className="flex items-start gap-2">
                          <span className="text-blue-600 font-black shrink-0">•</span>
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="pt-4 border-t-2 border-neutral-100">
                  <span className="text-[11px] font-black uppercase text-neutral-500 tracking-wider block mb-2">
                    Diagnostic Commands & Tools:
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {topic.toolsAndCommands.map((cmd, cIdx) => (
                      <button
                        key={cIdx}
                        onClick={() => handleCopy(cmd, `net-${i}-${cIdx}`)}
                        className="px-2.5 py-1 rounded-lg bg-neutral-900 text-emerald-300 font-mono text-[11px] font-bold border border-black hover:bg-neutral-800 flex items-center gap-1.5 transition-colors"
                        title="Click to copy command"
                      >
                        <code>{cmd}</code>
                        {copiedText === `net-${i}-${cIdx}` ? (
                          <Check className="w-3 h-3 text-emerald-400" />
                        ) : (
                          <Copy className="w-3 h-3 text-neutral-400" />
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Quick Port Matrix Reference */}
          <div className="rounded-3xl border-[3px] border-black bg-white p-6 shadow-brutal">
            <h3 className="text-base font-black text-black uppercase font-display mb-3 flex items-center gap-2">
              <Layers className="w-4 h-4 text-blue-600" />
              Critical Pentester Port Cheat Sheet
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-8 gap-3 text-center">
              {[
                { port: "21", name: "FTP", risk: "Anon Login / Bounce" },
                { port: "22", name: "SSH", risk: "Brute / Key Leak" },
                { port: "25", name: "SMTP", risk: "Open Relay / VRFY" },
                { port: "53", name: "DNS", risk: "AXFR Zone Transfer" },
                { port: "80/443", name: "HTTP(S)", risk: "OWASP Top 10" },
                { port: "445", name: "SMB", risk: "EternalBlue / Null Session" },
                { port: "3306", name: "MySQL", risk: "Auth Bypass / UDF" },
                { port: "8080/8443", name: "Alt HTTP", risk: "Tomcat / SpringBoot" },
              ].map((p, idx) => (
                <div key={idx} className="p-2.5 rounded-xl border-2 border-black bg-neutral-50 shadow-brutal-xs">
                  <div className="text-sm font-black text-black font-mono">{p.port}</div>
                  <div className="text-[10px] font-bold text-neutral-500 uppercase">{p.name}</div>
                  <div className="text-[9px] font-bold text-red-600 mt-1">{p.risk}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ══════════════════════════════════════════════════════════════ */}
      {/* 2. KALI LINUX SETUP & COMMAND LINE                             */}
      {/* ══════════════════════════════════════════════════════════════ */}
      {currentSubTab === "kali" && (
        <div className="space-y-6">
          {/* Setup Architecture Banner */}
          <div className="rounded-3xl border-[3px] border-black bg-neutral-900 text-white p-6 shadow-brutal">
            <div className="flex items-center gap-3 mb-3">
              <Terminal className="w-6 h-6 text-emerald-400" />
              <h3 className="text-lg font-black text-white font-display uppercase tracking-tight">
                Recommended Kali Linux Environment Setup
              </h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-medium text-neutral-300">
              <div className="p-3.5 rounded-xl bg-neutral-800 border border-neutral-700">
                <span className="font-black text-amber-300 uppercase block mb-1">1. Virtualization (VMware/VirtualBox)</span>
                Allocate 4+ CPU Cores, 8GB RAM, and 50GB SSD. Install VM Guest Additions for shared clipboard and bidirectional drag-and-drop.
              </div>
              <div className="p-3.5 rounded-xl bg-neutral-800 border border-neutral-700">
                <span className="font-black text-emerald-300 uppercase block mb-1">2. Repository & Keys Update</span>
                Keep package caches fresh: <code className="text-emerald-400 bg-black px-1 py-0.5 rounded">sudo apt update && sudo apt full-upgrade -y</code>
              </div>
              <div className="p-3.5 rounded-xl bg-neutral-800 border border-neutral-700">
                <span className="font-black text-blue-300 uppercase block mb-1">3. SecLists & Wordlists</span>
                Ensure wordlists are unpacked: <code className="text-blue-400 bg-black px-1 py-0.5 rounded">sudo gunzip /usr/share/wordlists/rockyou.txt.gz</code>
              </div>
            </div>
          </div>

          {/* Categorized Kali Commands */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {deepKaliCommands.map((item, idx) => (
              <div
                key={idx}
                className="rounded-2xl border-2 border-black bg-white p-4 shadow-brutal-xs flex flex-col justify-between hover:border-emerald-600 transition-colors"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-950 font-black text-[10px] uppercase border border-emerald-300">
                      {item.category}
                    </span>
                    <span className="font-mono text-[11px] font-black text-neutral-500">#{idx + 1}</span>
                  </div>
                  <div className="text-xs font-bold text-neutral-700 mb-2">
                    {item.description}
                  </div>
                </div>

                <div className="pt-2">
                  <div className="flex items-center justify-between bg-neutral-900 text-emerald-400 p-2.5 rounded-xl font-mono text-xs border border-black overflow-x-auto">
                    <code>{item.example}</code>
                    <button
                      onClick={() => handleCopy(item.example, `kali-${idx}`)}
                      className="p-1 rounded-md bg-neutral-800 text-neutral-300 hover:text-white transition-colors shrink-0 ml-2"
                      title="Copy command"
                    >
                      {copiedText === `kali-${idx}` ? (
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ══════════════════════════════════════════════════════════════ */}
      {/* 3. OSINT RECONNAISSANCE                                        */}
      {/* ══════════════════════════════════════════════════════════════ */}
      {currentSubTab === "osint" && (
        <div className="space-y-6">
          <div className="rounded-3xl border-[3px] border-black bg-purple-50 p-6 shadow-brutal">
            <div className="flex items-center gap-3 mb-2">
              <Search className="w-6 h-6 text-purple-700" />
              <h3 className="text-xl font-black text-black font-display uppercase tracking-tight">
                Open Source Intelligence (OSINT) & Attack Surface Mapping
              </h3>
            </div>
            <p className="text-xs font-bold text-neutral-700 max-w-3xl">
              90% of bug bounty wins happen in reconnaissance before the target even knows you are testing. Discover forgotten subdomains, leaked AWS credentials, exposed admin panels, and employee credentials using automated and passive intelligence gathering.
            </p>
          </div>

          {/* Dorking & Shodan Matrix */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Google Dorking */}
            <div className="rounded-3xl border-[3px] border-black bg-white p-6 shadow-brutal space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-black text-black uppercase font-display flex items-center gap-2">
                  <Globe className="w-4 h-4 text-purple-600" />
                  Google Dorking Cheat Sheet
                </h4>
                <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-full bg-purple-200 text-purple-900 border border-purple-400">
                  Passive Recon
                </span>
              </div>

              <div className="space-y-2.5">
                {[
                  { dork: 'site:target.com filetype:pdf "internal only" | confidential', desc: "Find leaked proprietary internal documents" },
                  { dork: 'site:target.com inurl:login | inurl:admin | inurl:dashboard', desc: "Locate hidden corporate login portals" },
                  { dork: 'site:target.com ext:env | ext:yml | ext:sql | ext:log', desc: "Exposed database dumps and environment configurations" },
                  { dork: 'site:target.com inurl:api | inurl:v1 | inurl:graphql', desc: "Undocumented REST and GraphQL API gateways" },
                  { dork: 'site:target.com inurl:wp-content | inurl:wp-includes', desc: "WordPress CMS installations with vulnerable plugins" },
                  { dork: 'site:target.com "index of /" "parent directory"', desc: "Apache/Nginx open directory indexing listing files" },
                ].map((d, i) => (
                  <div key={i} className="p-3 rounded-xl border-2 border-black bg-neutral-50 flex items-center justify-between gap-2">
                    <div className="overflow-hidden">
                      <div className="text-xs font-mono font-black text-purple-900 truncate">
                        {d.dork}
                      </div>
                      <div className="text-[11px] font-bold text-neutral-600">{d.desc}</div>
                    </div>
                    <button
                      onClick={() => handleCopy(d.dork, `dork-${i}`)}
                      className="p-1.5 rounded-lg border border-black bg-white hover:bg-neutral-100 transition-colors shrink-0"
                    >
                      {copiedText === `dork-${i}` ? (
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                      ) : (
                        <Copy className="w-3.5 h-3.5 text-black" />
                      )}
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Shodan & Censys */}
            <div className="rounded-3xl border-[3px] border-black bg-white p-6 shadow-brutal space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-black text-black uppercase font-display flex items-center gap-2">
                  <Cpu className="w-4 h-4 text-orange-600" />
                  Shodan & Censys Query Operators
                </h4>
                <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-full bg-orange-200 text-orange-900 border border-orange-400">
                  Infrastructure Recon
                </span>
              </div>

              <div className="space-y-2.5">
                {[
                  { query: 'ssl.cert.subject.CN:"target.com" 200', desc: "All live HTTPS servers sharing SSL certificate with target" },
                  { query: 'org:"Target Corporation" port:80,443,8080,8443', desc: "Enumerate enterprise web assets registered under ASN" },
                  { query: 'http.title:"Dashboard" | http.title:"Admin Login" "target"', desc: "Exposed web management consoles" },
                  { query: 'http.favicon.hash:116323821', desc: "Locate Spring Boot Actuator endpoints by Murmur3 hash" },
                  { query: 'has_screenshot:true "target.com"', desc: "Visual verification of exposed cameras, routers, and web pages" },
                  { query: 'product:"Jenkins" "target"', desc: "Unauthenticated CI/CD pipelines enabling RCE via Script Console" },
                ].map((s, i) => (
                  <div key={i} className="p-3 rounded-xl border-2 border-black bg-neutral-50 flex items-center justify-between gap-2">
                    <div className="overflow-hidden">
                      <div className="text-xs font-mono font-black text-orange-900 truncate">
                        {s.query}
                      </div>
                      <div className="text-[11px] font-bold text-neutral-600">{s.desc}</div>
                    </div>
                    <button
                      onClick={() => handleCopy(s.query, `shodan-${i}`)}
                      className="p-1.5 rounded-lg border border-black bg-white hover:bg-neutral-100 transition-colors shrink-0"
                    >
                      {copiedText === `shodan-${i}` ? (
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                      ) : (
                        <Copy className="w-3.5 h-3.5 text-black" />
                      )}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ══════════════════════════════════════════════════════════════ */}
      {/* 4. 50+ TOOLS MATRIX                                            */}
      {/* ══════════════════════════════════════════════════════════════ */}
      {currentSubTab === "tools" && (
        <div className="space-y-6">
          {/* Filters & Search Toolbar */}
          <div className="rounded-3xl border-[3px] border-black bg-white p-5 shadow-brutal space-y-4">
            <div className="flex flex-col sm:flex-row items-center gap-3">
              <div className="relative flex-1 w-full">
                <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={toolSearch}
                  onChange={(e) => setToolSearch(e.target.value)}
                  placeholder="Search 53+ tools by name, command syntax, or description (e.g., burp, nmap, sqlmap, ffuf)..."
                  className="w-full pl-10 pr-4 py-2.5 rounded-2xl border-2 border-black bg-neutral-50 font-bold text-xs focus:bg-white focus:outline-none"
                />
              </div>
              <div className="text-xs font-black uppercase text-neutral-500 whitespace-nowrap">
                Showing {filteredTools.length} of {deepToolsList.length} Tools
              </div>
            </div>

            {/* Category Filter Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
              {toolCategories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedToolCategory(cat)}
                  className={`px-3 py-1.5 rounded-xl border border-black text-[11px] font-black uppercase whitespace-nowrap transition-all shadow-brutal-xs ${
                    selectedToolCategory === cat
                      ? "bg-amber-300 text-black font-black"
                      : "bg-white text-neutral-600 hover:bg-neutral-100"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Tools Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredTools.map((tool, idx) => (
              <div
                key={idx}
                className="rounded-3xl border-[2.5px] border-black bg-white p-5 shadow-brutal flex flex-col justify-between hover:border-amber-500 transition-all"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="px-2.5 py-0.5 rounded-full bg-amber-200 border border-black text-black font-black text-[10px] uppercase">
                      {tool.category}
                    </span>
                    <span className="font-mono text-[10px] font-black text-neutral-400">TOOL #{idx + 1}</span>
                  </div>

                  <h4 className="text-base font-black text-black font-display uppercase tracking-tight mb-1.5">
                    {tool.name}
                  </h4>
                  <p className="text-xs font-semibold text-neutral-600 mb-3 leading-relaxed">
                    {tool.description}
                  </p>
                </div>

                <div className="space-y-2 pt-3 border-t-2 border-neutral-100">
                  <div className="bg-neutral-900 text-emerald-400 p-2.5 rounded-xl font-mono text-[11px] flex items-center justify-between border border-black overflow-x-auto">
                    <code className="truncate mr-2">{tool.syntax}</code>
                    <button
                      onClick={() => handleCopy(tool.syntax, `tool-${idx}`)}
                      className="p-1 rounded bg-neutral-800 hover:bg-neutral-700 text-white shrink-0"
                      title="Copy command"
                    >
                      {copiedText === `tool-${idx}` ? (
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                    </button>
                  </div>

                  <div className="p-2 rounded-xl bg-neutral-50 border border-neutral-200 text-[11px] font-medium text-neutral-700">
                    <span className="font-black text-black uppercase text-[10px] block mb-0.5">💡 Pentester Pro Tip:</span>
                    {tool.proTip}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ══════════════════════════════════════════════════════════════ */}
      {/* 5. 100+ BUGS & VULNERABILITIES ENCYCLOPEDIA                    */}
      {/* ══════════════════════════════════════════════════════════════ */}
      {currentSubTab === "bugs" && (
        <div className="space-y-6">
          {/* Search & Severity Filter Header */}
          <div className="rounded-3xl border-[3px] border-black bg-white p-5 shadow-brutal space-y-4">
            <div className="flex flex-col sm:flex-row items-center gap-3">
              <div className="relative flex-1 w-full">
                <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={bugSearch}
                  onChange={(e) => setBugSearch(e.target.value)}
                  placeholder="Search 105+ bugs by title, CVE, severity, or payload (e.g., SQLi, SSRF, IDOR, XSS, JWT, RCE)..."
                  className="w-full pl-10 pr-4 py-2.5 rounded-2xl border-2 border-black bg-neutral-50 font-bold text-xs focus:bg-white focus:outline-none"
                />
              </div>

              {/* Severity Quick Pills */}
              <div className="flex items-center gap-1.5">
                {["All", "Critical", "High", "Medium", "Low"].map((sev) => (
                  <button
                    key={sev}
                    onClick={() => setSelectedBugSeverity(sev)}
                    className={`px-3 py-2 rounded-xl border border-black text-[11px] font-black uppercase transition-all shadow-brutal-xs ${
                      selectedBugSeverity === sev
                        ? "bg-black text-white font-black"
                        : "bg-white text-neutral-700 hover:bg-neutral-100"
                    }`}
                  >
                    {sev}
                  </button>
                ))}
              </div>
            </div>

            {/* Category Filter Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
              {bugCategories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedBugCategory(cat)}
                  className={`px-3 py-1.5 rounded-xl border border-black text-[11px] font-black uppercase whitespace-nowrap transition-all shadow-brutal-xs ${
                    selectedBugCategory === cat
                      ? "bg-red-400 text-black font-black"
                      : "bg-white text-neutral-600 hover:bg-neutral-100"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className="text-xs font-black uppercase text-neutral-500">
              Showing {filteredBugs.length} of {deepBugsList.length} Vulnerabilities
            </div>
          </div>

          {/* Bugs List Accordion Cards */}
          <div className="space-y-3">
            {filteredBugs.map((bug) => {
              const isExpanded = expandedBugId === bug.id;
              return (
                <div
                  key={bug.id}
                  className="rounded-2xl border-2 border-black bg-white shadow-brutal-xs overflow-hidden transition-all"
                >
                  {/* Bug Header Row */}
                  <div
                    onClick={() => setExpandedBugId(isExpanded ? null : bug.id)}
                    className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 cursor-pointer hover:bg-neutral-50 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <span className="px-2 py-0.5 rounded-md bg-neutral-900 text-white font-mono text-[11px] font-bold">
                        {bug.id}
                      </span>
                      <div>
                        <h4 className="text-sm font-black text-black font-display uppercase">
                          {bug.name}
                        </h4>
                        <span className="text-[11px] font-bold text-neutral-500">
                          {bug.category}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 self-end sm:self-auto">
                      <span
                        className={`px-2.5 py-0.5 rounded-full border text-[11px] font-black uppercase ${getSeverityBadge(
                          bug.severity
                        )}`}
                      >
                        {bug.severity}
                      </span>
                      <button className="p-1 rounded-md text-neutral-400 hover:text-black">
                        {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  {/* Bug Details Expanded Content */}
                  {isExpanded && (
                    <div className="px-4 pb-4 pt-2 border-t-2 border-neutral-100 bg-neutral-50 space-y-3 text-xs">
                      <div>
                        <span className="font-black uppercase text-neutral-500 text-[10px] block mb-1">
                          Severity & Business Impact:
                        </span>
                        <p className="font-semibold text-neutral-800">{bug.impact}</p>
                      </div>

                      <div>
                        <span className="font-black uppercase text-neutral-500 text-[10px] block mb-1">
                          Testing & Reproduction Methodology:
                        </span>
                        <p className="font-medium text-neutral-700 leading-relaxed">
                          {bug.testingMethod}
                        </p>
                      </div>

                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-black uppercase text-neutral-500 text-[10px]">
                            Sample Exploit Payload / Request Header:
                          </span>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleCopy(bug.samplePayloadOrHeader, `payload-${bug.id}`);
                            }}
                            className="text-[10px] font-black uppercase text-blue-600 hover:text-blue-800 flex items-center gap-1"
                          >
                            {copiedText === `payload-${bug.id}` ? (
                              <>
                                <Check className="w-3 h-3 text-emerald-600" /> Copied Payload!
                              </>
                            ) : (
                              <>
                                <Copy className="w-3 h-3" /> Copy Payload
                              </>
                            )}
                          </button>
                        </div>
                        <pre className="p-2.5 rounded-xl bg-neutral-900 text-amber-300 font-mono text-[11px] overflow-x-auto whitespace-pre-wrap border border-black">
                          {bug.samplePayloadOrHeader}
                        </pre>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ══════════════════════════════════════════════════════════════ */}
      {/* 6. CTF PLATFORMS & LAB LIST                                    */}
      {/* ══════════════════════════════════════════════════════════════ */}
      {currentSubTab === "ctf" && (
        <div className="space-y-6">
          <div className="rounded-3xl border-[3px] border-black bg-pink-50 p-6 shadow-brutal">
            <div className="flex items-center gap-3 mb-2">
              <Flag className="w-6 h-6 text-pink-700" />
              <h3 className="text-xl font-black text-black font-display uppercase tracking-tight">
                Recommended Hands-on CTF Labs & Wargames
              </h3>
            </div>
            <p className="text-xs font-bold text-neutral-700 max-w-3xl">
              Theory is meaningless without muscle memory. Practice these 6 hand-picked platforms in order: start with PortSwigger Web Security Academy for web attacks, TryHackMe for guided pathways, and Hack The Box for real-world enterprise pivoting.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {deepCtfPlatforms.map((platform, idx) => (
              <div
                key={idx}
                className="rounded-3xl border-[3px] border-black bg-white p-6 shadow-brutal flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="px-3 py-0.5 rounded-full bg-pink-100 border border-black text-pink-900 font-black text-[10px] uppercase">
                      {platform.category}
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full bg-neutral-100 font-bold text-[10px] text-neutral-700">
                      {platform.difficulty}
                    </span>
                  </div>

                  <h4 className="text-lg font-black text-black font-display uppercase tracking-tight mb-2">
                    {platform.name}
                  </h4>
                  <p className="text-xs font-semibold text-neutral-600 mb-4 leading-relaxed">
                    {platform.description}
                  </p>

                  <div className="space-y-2 mb-4">
                    <span className="text-[11px] font-black uppercase text-neutral-500 tracking-wider block">
                      Recommended Practice Rooms:
                    </span>
                    <ul className="space-y-1 text-xs text-neutral-800 font-medium">
                      {platform.recommendedRooms.map((room, rIdx) => (
                        <li key={rIdx} className="flex items-center gap-1.5 font-mono text-[11px]">
                          <span className="text-pink-600 font-bold">›</span>
                          <span>{room}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="pt-4 border-t-2 border-neutral-100">
                  <a
                    href={platform.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-brutal btn-brutal-primary text-xs uppercase font-black py-2 px-3 w-full flex items-center justify-center gap-2"
                  >
                    <span>Launch {platform.name}</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ══════════════════════════════════════════════════════════════ */}
      {/* 7. CERTIFICATE STUDIO & ACCREDITATION ENGINE                   */}
      {/* ══════════════════════════════════════════════════════════════ */}
      {currentSubTab === "certificate" && (
        <div className="space-y-8">
          {/* Industry Certifications Overview */}
          <div className="rounded-3xl border-[3px] border-black bg-white p-6 shadow-brutal">
            <h3 className="text-lg font-black text-black font-display uppercase tracking-tight mb-2 flex items-center gap-2">
              <Award className="w-5 h-5 text-amber-500" />
              Global Cybersecurity Industry Certifications Roadmap
            </h3>
            <p className="text-xs font-bold text-neutral-600 mb-4">
              Students following this roadmap are primed to conquer top practical certifications worldwide.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              {deepCertificationsList.map((cert, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-2xl border-2 border-black bg-neutral-50 flex flex-col justify-between"
                >
                  <div>
                    <span className="text-[10px] font-black uppercase text-amber-600 block mb-1">
                      {cert.level}
                    </span>
                    <h4 className="text-base font-black text-black font-display">{cert.name}</h4>
                    <span className="text-[11px] font-bold text-neutral-500 block mb-2">{cert.provider}</span>
                    <p className="text-xs text-neutral-600 mb-3">{cert.description}</p>
                  </div>
                  <div className="pt-2 border-t border-neutral-200 text-[11px] font-mono text-neutral-700">
                    <div>Format: {cert.format}</div>
                    <div>Exam: {cert.cost}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Interactive Certificate Generator Tool */}
          <div className="rounded-3xl border-[3.5px] border-black bg-white p-6 sm:p-8 shadow-brutal space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="px-3 py-1 rounded-xl bg-amber-300 text-black font-black text-xs uppercase border-2 border-black shadow-brutal-xs">
                  Official Verification Engine
                </span>
                <h3 className="text-2xl font-black text-black font-display uppercase mt-2">
                  Student Certificate Generator & Preview
                </h3>
                <p className="text-xs font-bold text-neutral-600">
                  Generate verifiable neobrutalist certificates for students upon course completion.
                </p>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={handleRegenerateCertId}
                  className="px-4 py-2.5 rounded-2xl border-2 border-black bg-white font-black text-xs uppercase hover:bg-neutral-100 shadow-brutal-xs"
                >
                  Randomize ID
                </button>
                <button
                  onClick={handlePrintCertificate}
                  className="btn-brutal btn-brutal-primary text-xs font-black uppercase py-2.5 px-4 flex items-center gap-2"
                >
                  <Printer className="w-4 h-4" />
                  Print / Download Certificate
                </button>
              </div>
            </div>

            {/* Controls Input Form */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-4 rounded-2xl border-2 border-black bg-neutral-50 text-xs">
              <div>
                <label className="block font-black uppercase text-black mb-1">Student Full Name</label>
                <input
                  type="text"
                  value={studentName}
                  onChange={(e) => setStudentName(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border-2 border-black bg-white font-bold focus:outline-none"
                />
              </div>
              <div>
                <label className="block font-black uppercase text-black mb-1">Course Title</label>
                <input
                  type="text"
                  value={certCourseTitle}
                  onChange={(e) => setCertCourseTitle(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border-2 border-black bg-white font-bold focus:outline-none"
                />
              </div>
              <div>
                <label className="block font-black uppercase text-black mb-1">Issue Date</label>
                <input
                  type="date"
                  value={certIssueDate}
                  onChange={(e) => setCertIssueDate(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border-2 border-black bg-white font-mono font-bold focus:outline-none"
                />
              </div>
            </div>

            {/* LIVE CERTIFICATE PREVIEW (Printable) */}
            <div
              id="printable-certificate"
              className="p-8 sm:p-12 rounded-3xl border-[5px] border-black bg-gradient-to-b from-amber-50 via-white to-yellow-50 text-black shadow-brutal-xl relative overflow-hidden"
            >
              {/* Decorative Watermark Seal */}
              <div className="absolute -right-12 -bottom-12 opacity-5 pointer-events-none select-none">
                <Award className="w-96 h-96 text-black" />
              </div>

              {/* Certificate Inner Border */}
              <div className="border-[2px] border-dashed border-black/60 p-6 sm:p-10 rounded-2xl relative z-10 text-center space-y-6">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-black text-neutral-600 tracking-widest uppercase">
                    ID: {certId}
                  </span>
                  <div className="flex items-center gap-1.5 px-3 py-1 rounded-full border-2 border-black bg-amber-300 font-black text-[11px] uppercase shadow-brutal-xs">
                    <Shield className="w-3.5 h-3.5" />
                    Verified ThatRaghavArora Credential
                  </div>
                </div>

                <div className="pt-4">
                  <span className="text-xs sm:text-sm font-black uppercase tracking-[0.25em] text-neutral-500 block mb-1">
                    Certificate of Competence & Mastery
                  </span>
                  <h1 className="text-3xl sm:text-5xl font-black font-display uppercase tracking-tight text-black">
                    Cyber Security Specialist
                  </h1>
                </div>

                <p className="text-xs sm:text-sm font-bold text-neutral-600 italic">
                  This certificate is proudly awarded to
                </p>

                <div className="py-2">
                  <div className="text-2xl sm:text-4xl font-black text-black font-display underline decoration-amber-400 decoration-4 underline-offset-8">
                    {studentName || "Student Name"}
                  </div>
                </div>

                <p className="max-w-2xl mx-auto text-xs sm:text-sm font-semibold text-neutral-700 leading-relaxed">
                  for successfully demonstrating hands-on competence in Offensive Security, Networking Fundamentals, Advanced OSINT Recon, 53+ Penetration Testing Tools, and rigorous vulnerability exploitation across the curriculum of
                </p>

                <div className="px-4 py-2 rounded-xl bg-amber-100 border-2 border-black inline-block font-black text-xs sm:text-sm uppercase tracking-wide">
                  {certCourseTitle}
                </div>

                {/* Signatures & Seal Footer */}
                <div className="pt-10 grid grid-cols-1 sm:grid-cols-3 gap-6 items-end">
                  <div className="text-center sm:text-left">
                    <div className="font-mono text-xs font-bold text-neutral-600">ISSUE DATE</div>
                    <div className="font-mono text-sm font-black text-black">{certIssueDate}</div>
                    <div className="mt-2 h-0.5 bg-black/40 w-32 mx-auto sm:mx-0"></div>
                  </div>

                  {/* Stamp Seal */}
                  <div className="flex flex-col items-center justify-center">
                    <div className="w-20 h-20 rounded-full border-[3px] border-black bg-amber-300 flex flex-col items-center justify-center font-black shadow-brutal-xs rotate-[-6deg]">
                      <Award className="w-6 h-6 text-black stroke-[2.5]" />
                      <span className="text-[8px] uppercase tracking-wider text-black">VERIFIED</span>
                    </div>
                  </div>

                  <div className="text-center sm:text-right">
                    <div className="font-display font-black text-lg italic text-black">
                      Raghav Arora
                    </div>
                    <div className="font-mono text-xs font-bold text-neutral-600 uppercase">
                      Lead Security Researcher & Founder
                    </div>
                    <div className="mt-2 h-0.5 bg-black/40 w-44 mx-auto sm:ml-auto"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
