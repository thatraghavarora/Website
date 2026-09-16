"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  Star,
  BookOpen,
  Award,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Lock,
  Flag,
  Flame,
  Globe,
  ShieldAlert,
  Bug,
  Cpu,
  Target,
  Check,
  ShieldCheck,
  Layers,
  Zap
} from "lucide-react";
import confetti from "canvas-confetti";
import { RoadmapItem } from "@/data/roadmapData";
import { YoutubeIcon } from "@/components/SocialIcons";

export default function RoadmapDetailClient({ roadmap }: { roadmap: RoadmapItem }) {
  const [isPurchaseModalOpen, setIsPurchaseModalOpen] = useState(false);
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  const handleEnroll = () => {
    setIsPurchaseModalOpen(true);
    confetti({
      particleCount: 120,
      spread: 70,
      origin: { y: 0.6 }
    });
  };

  const learningOutcomes = [
    "Master the complete methodology of Web Application Penetration Testing from scratch",
    "Identify, manually exploit, and document all critical OWASP Top 10 vulnerabilities",
    "Understand modern API security flaws across REST and GraphQL architectures",
    "Execute systematic reconnaissance to discover hidden subdomains, parameters, and endpoints",
    "Transition from theoretical learning to solving real hands-on Labs and CTF challenges",
    "Learn to write professional vulnerability reports for Bug Bounty platforms and corporate audits"
  ];

  const owaspTop10 = [
    { name: "SQL Injection (SQLi)", desc: "In-band, Error-based, Blind Boolean, and Time-based data exfiltration." },
    { name: "Cross-Site Scripting (XSS)", desc: "Reflected, Stored, and DOM-based attacks, cookie hijacking & payload bypasses." },
    { name: "Insecure Direct Object References (IDOR)", desc: "Horizontal and vertical authorization bypasses across accounts." },
    { name: "Cross-Site Request Forgery (CSRF)", desc: "Action spoofing, SameSite bypasses, and state-changing request exploitation." },
    { name: "Server-Side Request Forgery (SSRF)", desc: "Internal port scanning and cloud instance metadata (169.254.169.254) extraction." },
    { name: "Broken Authentication & Session Flaws", desc: "JWT signature tampering, session fixation, and brute-force vulnerabilities." },
    { name: "Security Misconfigurations", desc: "Exposed admin endpoints, default credentials, CORS misconfigurations & debug headers." },
    { name: "Unrestricted File Upload", desc: "Bypassing extension blacklists and MIME filters to achieve Web Shell execution." },
    { name: "XML External Entity (XXE)", desc: "Arbitrary file retrieval and blind Out-of-Band (OOB) data exfiltration." },
    { name: "Server-Side Template Injection (SSTI)", desc: "Exploiting template engines (Jinja2, Twig) to achieve Remote Code Execution (RCE)." }
  ];

  const bugClasses = [
    "Business Logic Flaws & Price / Quantity Tampering",
    "Race Conditions & Limit Overrun (Concurrency Exploits)",
    "Authentication & 2FA / OTP Verification Bypasses",
    "Mass Assignment & Privilege Escalation via JSON keys",
    "CORS Misconfiguration (Arbitrary & Null Origin reflection)",
    "Sensitive Data Exposure & Leaked API Keys in JS files",
    "Subdomain Takeovers via Dangling DNS & CNAME records",
    "Rate Limiting Bypasses & Automated Abuse vectors"
  ];

  const labsCovered = [
    {
      name: "PortSwigger Web Security Academy",
      type: "Official Burp Suite Labs",
      desc: "Gold standard 200+ interactive web labs structured from Apprentice to Practitioner to Expert level."
    },
    {
      name: "TryHackMe (Pre-Security & Jr Pentester)",
      type: "Guided Browser Labs",
      desc: "Gamified step-by-step rooms covering networking, Linux, web basics, and guided attack simulations."
    },
    {
      name: "HackTheBox (HTB Academy & Machines)",
      type: "Realistic Machines",
      desc: "Challenging real-world web environments, active machine exploitation, and modular academy tracks."
    },
    {
      name: "Local Sandboxes (DVWA, bWAPP, Juice Shop)",
      type: "Offline Legal Targets",
      desc: "Self-hosted PHP/Node targets with adjustable difficulty levels for safe offline testing and exploit creation."
    },
    {
      name: "VulnHub",
      type: "Boot-to-Root VMs",
      desc: "Downloadable virtual machines for VMware/VirtualBox to practice full-chain penetration testing."
    }
  ];

  const ctfTopics = [
    {
      title: "PicoCTF & Beginner Web Challenges",
      desc: "Understanding source inspection, cookie manipulation, simple SQLi, and request tampering in CTF environments."
    },
    {
      title: "Web Exploitation CTF Mindset",
      desc: "How to deconstruct problem statements, analyze hinted vulnerabilities, and craft custom Python solver scripts."
    },
    {
      title: "CTF to Real-World Pentesting Transition",
      desc: "Key differences between artificial CTF flags and finding genuine vulnerabilities in live production targets."
    },
    {
      title: "Recommended CTF Platforms & Events",
      desc: "Structured list of ongoing platforms (CTFtime, HackTheBox CTFs, OverTheWire) to practice problem-solving."
    }
  ];

  const youtubeChannels = [
    {
      name: "The Cyber Mentor (Heath Adams)",
      focus: "Practical Ethical Hacking & Web Pentesting",
      desc: "Complete hands-on masterclasses teaching real-world penetration testing workflows from the ground up."
    },
    {
      name: "Rana Khalil",
      focus: "Web Security Academy Walkthroughs",
      desc: "Deeply technical, crystal-clear video solutions solving PortSwigger Academy labs with manual & scripted methods."
    },
    {
      name: "NahamSec (Ben Sadeghipour)",
      focus: "Bug Bounty Hunting & Live Recon",
      desc: "Live recon sessions, tooling setups, interview series with top bounty hunters, and practical hunting advice."
    },
    {
      name: "InsiderPhD (Katie Paxton-Fear)",
      focus: "Bug Bounty Guides & API Testing",
      desc: "Beginner-friendly explanations of finding your first bug, API vulnerability research, and structured methodology."
    },
    {
      name: "John Hammond",
      focus: "CTFs & In-Depth Exploit Analysis",
      desc: "Detailed CTF challenge walkthroughs, reverse engineering, and real-world vulnerability post-mortems."
    },
    {
      name: "NetworkChuck",
      focus: "Networking & Linux Fundamentals",
      desc: "High-energy tutorials explaining TCP/IP, IP subnetting, Wireshark packet analysis, and lab setups."
    },
    {
      name: "STÖK (Fredrik Alexandersson)",
      focus: "Hacker Mindset & Bounty Thursdays",
      desc: "Practical Burp Suite tips, hardware setups, conference recaps, and mental resilience for security researchers."
    }
  ];

  const websitesToTest = [
    {
      name: "PortSwigger Practice Labs",
      desc: "Official legal test environment with live sandboxed targets for every web attack vector."
    },
    {
      name: "OWASP Juice Shop & WebGoat",
      desc: "The most modern and sophisticated deliberately insecure web applications written in Node.js and Java."
    },
    {
      name: "HackerOne & Bugcrowd Sandbox Programs",
      desc: "Authorized public testing grounds designed specifically for researchers to practice without risk."
    },
    {
      name: "Google Gruyere & TestPHP VulnWeb",
      desc: "Classic public legal playgrounds to practice manual SQL injection, XSS, and parameter tampering."
    },
    {
      name: "Responsible Disclosure VDPs (NASA, WHO, Fortune 500s)",
      desc: "Real organizations with authorized vulnerability disclosure policies where you can hunt bugs legally for Hall of Fame credits."
    }
  ];

  return (
    <div className="py-12 bg-neutral-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back navigation */}
        <Link
          href="/roadmap"
          className="inline-flex items-center gap-2 font-bold text-sm text-neutral-700 hover:text-black mb-8 group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span>Back to All Roadmaps</span>
        </Link>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left Column: 8 cols */}
          <div className="lg:col-span-8 space-y-10">
            {/* Header Card */}
            <div className="rounded-3xl border-[3.5px] border-black bg-white p-8 sm:p-10 shadow-brutal-xl">
              <div className="flex flex-wrap items-center gap-2 mb-4">
                <span className="px-3 py-1 rounded-full border-2 border-black bg-purple-200 text-purple-900 font-black text-xs uppercase tracking-wider">
                  {roadmap.category}
                </span>
                <span className="px-3 py-1 rounded-full border-2 border-black bg-yellow-200 text-black font-black text-xs uppercase tracking-wider">
                  {roadmap.level}
                </span>
                {roadmap.badge && (
                  <span className="px-3 py-1 rounded-full border-2 border-black bg-amber-300 text-black font-black text-xs uppercase tracking-wider shadow-brutal-sm">
                    {roadmap.badge}
                  </span>
                )}
              </div>

              <h1 className="text-3xl sm:text-5xl font-black text-black font-display tracking-tight leading-tight mb-4">
                {roadmap.title}
              </h1>

              <p className="text-lg sm:text-xl font-bold text-neutral-700 mb-6 leading-relaxed">
                {roadmap.subtitle}
              </p>

              {/* Meta stats */}
              <div className="flex flex-wrap items-center gap-6 text-sm font-bold text-neutral-800 pb-6 border-b-2 border-neutral-200">
                <div className="flex items-center gap-1 text-amber-500 font-extrabold">
                  <Star className="w-4 h-4 fill-amber-400" />
                  <span className="text-black">{roadmap.rating}</span>
                  <span className="text-neutral-500">
                    ({roadmap.reviewsCount} reviews)
                  </span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Layers className="w-4 h-4 text-purple-600" />
                  <span>{roadmap.modulesCount} Master Modules</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Award className="w-4 h-4 text-blue-600" />
                  <span>Curated Practice Labs &amp; Tools</span>
                </div>
              </div>

              {/* Instructor snippet */}
              <div className="flex items-center gap-3 pt-6">
                <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-black shadow-brutal-sm">
                  <Image
                    src="/images/about-hacker.jpg"
                    alt="Raghav Arora"
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <p className="text-xs text-neutral-500 font-bold uppercase tracking-wider">
                    Curated By
                  </p>
                  <p className="font-display font-black text-base text-black">
                    Raghav Arora
                  </p>
                </div>
              </div>
            </div>

            {/* ══ 1. LEARNING OUTCOMES ════════════════════════ */}
            <div className="rounded-3xl border-[3.5px] border-black bg-white p-8 sm:p-10 shadow-brutal">
              <div className="flex items-center gap-2.5 mb-2">
                <Target className="w-6 h-6 text-blue-600 stroke-[2.5]" />
                <h2 className="text-2xl sm:text-3xl font-black text-black font-display">
                  Learning Outcomes
                </h2>
              </div>
              <p className="text-xs sm:text-sm font-medium text-neutral-600 mb-6">
                What you will be able to do independently after going through this complete web penetration testing blueprint.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {learningOutcomes.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3 p-3.5 rounded-2xl border border-neutral-200 bg-neutral-50">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5 stroke-[2.5]" />
                    <span className="text-xs sm:text-sm font-bold text-neutral-800 leading-snug">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* ══ 2. FREE YOUTUBE CHANNELS TO STUDY ═════════════ */}
            <div className="rounded-3xl border-[3.5px] border-black bg-white p-8 sm:p-10 shadow-brutal">
              <div className="flex items-center gap-2.5 mb-2">
                <YoutubeIcon className="w-6 h-6 text-red-600 fill-current" />
                <h2 className="text-2xl sm:text-3xl font-black text-black font-display">
                  Free YouTube Channels To Study
                </h2>
              </div>
              <p className="text-xs sm:text-sm font-medium text-neutral-600 mb-6">
                Curated high-signal YouTube educators and specific playlists recommended in the roadmap.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {youtubeChannels.map((yt, idx) => (
                  <div key={idx} className="p-3.5 rounded-2xl border-2 border-black bg-neutral-50 flex items-center gap-3 shadow-brutal-sm">
                    <div className="w-8 h-8 rounded-lg bg-red-50 border border-red-300 flex items-center justify-center shrink-0">
                      <YoutubeIcon className="w-4 h-4 text-red-600 fill-current" />
                    </div>
                    <h4 className="font-black text-sm text-black font-display">{yt.name}</h4>
                  </div>
                ))}
              </div>
            </div>

            {/* ══ 3. CTF (CAPTURE THE FLAG) ════════════════════ */}
            <div className="rounded-3xl border-[3.5px] border-black bg-white p-8 sm:p-10 shadow-brutal">
              <div className="flex items-center gap-2.5 mb-2">
                <Flag className="w-6 h-6 text-amber-600 stroke-[2.5]" />
                <h2 className="text-2xl sm:text-3xl font-black text-black font-display">
                  CTF (Capture The Flag)
                </h2>
              </div>
              <p className="text-xs sm:text-sm font-medium text-neutral-600 mb-6">
                How to leverage competitive web CTF challenges to build problem-solving skills and rapid exploit construction.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {ctfTopics.map((ctf, idx) => (
                  <div key={idx} className="p-4 rounded-2xl border-2 border-black bg-neutral-50 shadow-brutal-sm">
                    <h4 className="font-black text-sm text-black font-display mb-1">{ctf.title}</h4>
                    <p className="text-xs text-neutral-600 leading-relaxed">{ctf.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* ══ 4. LABS ══════════════════════════════════════ */}
            <div className="rounded-3xl border-[3.5px] border-black bg-white p-8 sm:p-10 shadow-brutal">
              <div className="flex items-center gap-2.5 mb-2">
                <Cpu className="w-6 h-6 text-emerald-600 stroke-[2.5]" />
                <h2 className="text-2xl sm:text-3xl font-black text-black font-display">
                  LABS (Practice Platforms)
                </h2>
              </div>
              <p className="text-xs sm:text-sm font-medium text-neutral-600 mb-6">
                Curated guided and self-paced vulnerability lab targets recommended inside the roadmap.
              </p>

              <div className="space-y-3.5">
                {labsCovered.map((lab, idx) => (
                  <div key={idx} className="p-4 rounded-2xl border-2 border-black bg-neutral-50 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-brutal-sm">
                    <div>
                      <span className="inline-block px-2 py-0.5 rounded text-[10px] font-black uppercase bg-emerald-100 text-emerald-800 border border-emerald-600 mb-1">
                        {lab.type}
                      </span>
                      <h4 className="font-black text-base text-black font-display">{lab.name}</h4>
                      <p className="text-xs text-neutral-600 mt-1">{lab.desc}</p>
                    </div>
                    <span className="shrink-0 text-xs font-mono font-bold text-neutral-500 bg-white px-3 py-1 rounded-lg border border-neutral-300 self-start sm:self-center">
                      Curated in Bundle
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* ══ 5. WEBSITES TO TEST ══════════════════════════ */}
            <div className="rounded-3xl border-[3.5px] border-black bg-white p-8 sm:p-10 shadow-brutal">
              <div className="flex items-center gap-2.5 mb-2">
                <Globe className="w-6 h-6 text-blue-600 stroke-[2.5]" />
                <h2 className="text-2xl sm:text-3xl font-black text-black font-display">
                  Websites To Test &amp; Legal Targets
                </h2>
              </div>
              <p className="text-xs sm:text-sm font-medium text-neutral-600 mb-6">
                Safe, authorized sandbox websites and enterprise VDPs where you can legally practice attacks.
              </p>

              <div className="space-y-3">
                {websitesToTest.map((site, idx) => (
                  <div key={idx} className="p-4 rounded-2xl border-2 border-black bg-neutral-50 flex items-start gap-3 shadow-brutal-sm">
                    <span className="w-2 h-2 rounded-full bg-blue-600 mt-2 shrink-0" />
                    <div>
                      <h4 className="font-black text-sm text-black font-display">{site.name}</h4>
                      <p className="text-xs text-neutral-600 mt-0.5">{site.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* ══ 6. BUGS (VULNERABILITY CLASSES) ══════════════ */}
            <div className="rounded-3xl border-[3.5px] border-black bg-white p-8 sm:p-10 shadow-brutal">
              <div className="flex items-center gap-2.5 mb-2">
                <Bug className="w-6 h-6 text-purple-600 stroke-[2.5]" />
                <h2 className="text-2xl sm:text-3xl font-black text-black font-display">
                  High-Impact Bugs Covered
                </h2>
              </div>
              <p className="text-xs sm:text-sm font-medium text-neutral-600 mb-6">
                Real-world bug bounty patterns that scanners miss, earning high payouts on HackerOne and Bugcrowd.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {bugClasses.map((bug, idx) => (
                  <div key={idx} className="p-3.5 rounded-xl border border-neutral-300 bg-neutral-50 flex items-center gap-2.5">
                    <span className="w-2 h-2 rounded-full bg-purple-600 shrink-0" />
                    <span className="text-xs sm:text-sm font-bold text-neutral-800">{bug}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* ══ 7. OWASP TOP 10 ══════════════════════════════ */}
            <div className="rounded-3xl border-[3.5px] border-black bg-white p-8 sm:p-10 shadow-brutal">
              <div className="flex items-center gap-2.5 mb-2">
                <ShieldAlert className="w-6 h-6 text-red-600 stroke-[2.5]" />
                <h2 className="text-2xl sm:text-3xl font-black text-black font-display">
                  OWASP Top 10 (OWASP 10)
                </h2>
              </div>
              <p className="text-xs sm:text-sm font-medium text-neutral-600 mb-6">
                Every critical web vulnerability class covered in-depth with attack anatomy, detection logic, and impact demonstration.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {owaspTop10.map((item, idx) => (
                  <div key={idx} className="p-3.5 rounded-2xl border-2 border-black bg-neutral-50 flex items-center gap-3 shadow-brutal-sm">
                    <span className="w-7 h-7 rounded-lg bg-red-100 text-red-800 border border-red-600 font-mono font-black text-xs flex items-center justify-center shrink-0">
                      {idx + 1}
                    </span>
                    <h4 className="font-black text-sm text-black font-display">{item.name}</h4>
                  </div>
                ))}
              </div>
            </div>

            {/* ══ 8. ROADMAP MODULES OVERVIEW (LOCKED) ═════════ */}
            <div className="rounded-3xl border-[3.5px] border-black bg-white p-8 sm:p-10 shadow-brutal">
              <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                <div>
                  <span className="text-xs font-black uppercase tracking-wider text-blue-600">
                    MODULE BREAKDOWN
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-black text-black font-display">
                    Roadmap Modules Included
                  </h2>
                </div>
                <span className="text-xs font-bold text-neutral-500 font-mono">
                  {roadmap.phases.length} Modules Included
                </span>
              </div>

              <div className="space-y-3.5">
                {roadmap.phases.map((phase) => (
                  <div
                    key={phase.phaseNumber}
                    className="p-4 sm:p-5 rounded-2xl border-2 border-black bg-neutral-50 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                  >
                    <div className="flex items-start sm:items-center gap-3">
                      <span className="w-8 h-8 rounded-lg border-2 border-black bg-yellow-300 text-black font-mono font-black text-xs flex items-center justify-center shrink-0 shadow-brutal-sm">
                        0{phase.phaseNumber}
                      </span>
                      <div>
                        <div className="flex items-center gap-2 mb-0.5">
                          <span className="px-2 py-0.5 rounded text-[9px] font-black uppercase bg-blue-100 text-blue-800 border border-blue-600">
                            {phase.badge}
                          </span>
                          <span className="text-[11px] font-bold text-neutral-500 font-mono">
                            {phase.duration}
                          </span>
                        </div>
                        <h4 className="font-display font-black text-base text-black">
                          {phase.title}
                        </h4>
                      </div>
                    </div>

                    <div className="shrink-0 flex items-center gap-1.5 text-xs font-mono font-bold text-neutral-500 bg-white px-3 py-1.5 rounded-lg border border-neutral-300 self-start sm:self-center">
                      <Lock className="w-3.5 h-3.5 text-blue-600" />
                      <span>Content protected in bundle</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* FAQs */}
            <div className="rounded-3xl border-[3.5px] border-black bg-white p-8 shadow-brutal">
              <h2 className="text-2xl font-black text-black font-display mb-6">
                Frequently Asked Questions
              </h2>
              <div className="space-y-3">
                {roadmap.faqs.map((faq, fIdx) => {
                  const isOpen = expandedFaq === fIdx;
                  return (
                    <div key={fIdx} className="rounded-2xl border-2 border-black overflow-hidden">
                      <button
                        onClick={() => setExpandedFaq(isOpen ? null : fIdx)}
                        className="w-full px-5 py-4 flex items-center justify-between text-left font-black text-sm text-black bg-neutral-50 hover:bg-neutral-100"
                      >
                        <span>{faq.question}</span>
                        {isOpen ? <ChevronUp className="w-4 h-4 shrink-0" /> : <ChevronDown className="w-4 h-4 shrink-0" />}
                      </button>
                      {isOpen && (
                        <div className="p-5 text-sm font-medium text-neutral-700 bg-white border-t border-black/20 leading-relaxed">
                          {faq.answer}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Column: Sticky Pricing & Action Card (4 cols) */}
          <div className="lg:col-span-4">
            <div className="sticky top-28 rounded-3xl border-[3.5px] border-black bg-white p-6 shadow-brutal-xl">
              {/* Preview image */}
              <div className="relative w-full aspect-video rounded-2xl overflow-hidden border-2 border-black mb-6 shadow-brutal-sm">
                <Image
                  src={roadmap.thumbnail}
                  alt={roadmap.title}
                  fill
                  className="object-cover"
                />
              </div>

              {/* Price Row */}
              <div className="flex items-baseline gap-3 mb-2">
                <span className="text-4xl font-black text-black font-display">
                  {roadmap.price}
                </span>
                <span className="text-lg text-neutral-400 line-through font-bold">
                  {roadmap.originalPrice}
                </span>
                <span className="px-2 py-0.5 rounded-md bg-emerald-200 text-emerald-900 border border-emerald-800 text-xs font-black">
                  80% OFF
                </span>
              </div>

              <p className="text-xs font-bold text-red-600 mb-6">
                🔥 Special promotional pricing active for this batch
              </p>

              {/* Action Button */}
              <button
                onClick={handleEnroll}
                className="btn-brutal btn-brutal-yellow w-full py-4 text-base tracking-wide uppercase font-black mb-4"
                id="roadmap-buy-now-btn"
              >
                Unlock Full Roadmap
              </button>

              {/* Perks List */}
              <div className="space-y-3 pt-4 border-t-2 border-neutral-200 text-xs font-bold text-neutral-700">
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-black stroke-[3]" />
                  <span>Full lifetime access to all future updates</span>
                </div>
                <div className="flex items-center gap-2">
                  <Award className="w-4 h-4 text-black" />
                  <span>Verified practice lab links &amp; tools cheatsheet</span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-black" />
                  <span>Access to private security discussion group</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Purchase Modal */}
      {isPurchaseModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div className="rounded-3xl border-[3.5px] border-black p-6 sm:p-8 max-w-lg w-full shadow-brutal-xl relative bg-white text-black animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between pb-4 border-b-2 border-neutral-200 mb-6">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-emerald-500 inline-block" />
                <h3 className="text-xl font-black font-display">
                  Unlock Roadmap Access
                </h3>
              </div>
              <button
                onClick={() => setIsPurchaseModalOpen(false)}
                className="w-8 h-8 rounded-lg border-2 border-black flex items-center justify-center font-black hover:bg-neutral-100"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4">
              <div className="p-4 rounded-2xl border-2 border-black bg-blue-50">
                <p className="text-xs font-bold uppercase tracking-wider text-blue-700">
                  Total Investment:
                </p>
                <div className="flex items-baseline gap-2 mt-1">
                  <span className="text-3xl font-black font-display text-blue-600">
                    {roadmap.price}
                  </span>
                  <span className="text-sm font-bold text-neutral-400 line-through">
                    {roadmap.originalPrice}
                  </span>
                  <span className="px-2 py-0.5 rounded bg-emerald-300 text-black text-[10px] font-black uppercase">
                    80% OFF
                  </span>
                </div>
              </div>

              <div className="space-y-2 text-xs font-bold text-neutral-600">
                <p className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-500 stroke-[3]" />
                  <span>Interactive Web Pentesting roadmap guide</span>
                </p>
                <p className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-500 stroke-[3]" />
                  <span>Curated list of 100% free YouTube courses &amp; lab targets</span>
                </p>
                <p className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-500 stroke-[3]" />
                  <span>Lifetime access to all future editions &amp; updates</span>
                </p>
              </div>

              <div className="pt-4 border-t border-neutral-200 space-y-3">
                <p className="text-xs font-extrabold uppercase tracking-wider text-neutral-500">
                  Select Payment Method:
                </p>
                <div className="grid grid-cols-2 gap-3">
                  <a
                    href="https://instagram.com/hackerraghavarora"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-brutal btn-brutal-primary py-3 text-xs uppercase font-black text-center"
                  >
                    UPI / Pay (99 RS)
                  </a>
                  <a
                    href="https://twitter.com/raghavarora"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-brutal btn-brutal-yellow py-3 text-xs uppercase font-black text-center"
                  >
                    PayPal / Card ($2)
                  </a>
                </div>
                <p className="text-[11px] text-center font-bold text-neutral-500 pt-1">
                  Contact Raghav on Instagram / Twitter to get instant verified access badge!
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
