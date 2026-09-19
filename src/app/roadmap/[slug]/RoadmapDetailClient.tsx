"use client";

import React, { useState, useEffect } from "react";
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
  Target,
  Check,
  Layers,
  Zap,
  Sparkles,
  ShieldCheck,
  TrendingUp,
  Users,
  Unlock,
  ArrowRight,
} from "lucide-react";
import confetti from "canvas-confetti";
import { RoadmapItem } from "@/data/roadmapData";

const PHASE_BADGE_COLORS: Record<string, string> = {
  "Beginner": "bg-emerald-100 text-emerald-800 border-emerald-300",
  "Beginner to Intermediate": "bg-blue-100 text-blue-800 border-blue-300",
  "Beginner → Intermediate": "bg-blue-100 text-blue-800 border-blue-300",
  "Intermediate": "bg-purple-100 text-purple-800 border-purple-300",
  "Intermediate to Advanced": "bg-orange-100 text-orange-800 border-orange-300",
  "Intermediate → Advanced": "bg-orange-100 text-orange-800 border-orange-300",
  "Advanced": "bg-red-100 text-red-800 border-red-300",
  "Mastery & Career": "bg-yellow-100 text-yellow-800 border-yellow-300",
};

export default function RoadmapDetailClient({ roadmap }: { roadmap: RoadmapItem }) {
  const [isPurchaseModalOpen, setIsPurchaseModalOpen] = useState(false);
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  const [isPurchased, setIsPurchased] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [expandedPhase, setExpandedPhase] = useState<number | null>(null);

  useEffect(() => {
    setMounted(true);
    try {
      const stored = localStorage.getItem(`roadmap_purchased_${roadmap.slug}`);
      if (stored === "true") setIsPurchased(true);
    } catch {}

    fetch(`/api/purchases?slug=${roadmap.slug}`)
      .then((res) => res.json())
      .then((data) => { if (data.isUnlocked) setIsPurchased(true); })
      .catch(() => {});
  }, [roadmap.slug]);

  const handleEnroll = () => {
    setIsPurchaseModalOpen(true);
    confetti({ particleCount: 120, spread: 70, origin: { y: 0.6 } });
  };

  const handleUnlockSuccess = async () => {
    setIsPurchased(true);
    try { localStorage.setItem(`roadmap_purchased_${roadmap.slug}`, "true"); } catch {}
    setIsPurchaseModalOpen(false);
    confetti({ particleCount: 160, spread: 80, origin: { y: 0.6 } });
    try {
      await fetch("/api/purchases", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          itemType: "roadmap",
          itemSlug: roadmap.slug,
          itemTitle: roadmap.title,
          amount: roadmap.price,
          paymentMethod: "upi",
        }),
      });
    } catch {}
  };

  return (
    <div className="py-12 bg-neutral-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back */}
        <Link href="/roadmap" className="inline-flex items-center gap-2 font-bold text-sm text-neutral-700 hover:text-black mb-8 group">
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span>Back to All Roadmaps</span>
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* ─── LEFT COLUMN ─── */}
          <div className="lg:col-span-8 space-y-10">

            {/* ── HERO HEADER ── */}
            <div className="rounded-3xl border-[3.5px] border-black bg-white p-6 sm:p-8 shadow-brutal-xl">
              <div className="flex flex-wrap items-center gap-2 mb-3">
                <span className="px-3 py-0.5 rounded-full border-2 border-black bg-purple-200 text-purple-900 font-black text-xs uppercase tracking-wider">{roadmap.category}</span>
                <span className="px-3 py-0.5 rounded-full border-2 border-black bg-yellow-200 text-black font-black text-xs uppercase tracking-wider">{roadmap.level}</span>
                {roadmap.badge && (
                  <span className="px-3 py-0.5 rounded-full border-2 border-black bg-amber-300 text-black font-black text-xs uppercase tracking-wider shadow-brutal-sm">{roadmap.badge}</span>
                )}
              </div>

              <h1 className="text-2xl sm:text-4xl font-black text-black font-display tracking-tight leading-tight mb-3">{roadmap.title}</h1>
              <p className="text-base sm:text-lg font-bold text-neutral-700 mb-5 leading-relaxed">{roadmap.subtitle}</p>

              <div className="flex flex-wrap items-center gap-6 text-sm font-bold text-neutral-800 pb-6 border-b-2 border-neutral-200">
                <div className="flex items-center gap-1 text-amber-500 font-extrabold">
                  <Star className="w-4 h-4 fill-amber-400" />
                  <span className="text-black">{roadmap.rating}</span>
                  <span className="text-neutral-500">({roadmap.reviewsCount} reviews)</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Layers className="w-4 h-4 text-purple-600" />
                  <span>{roadmap.modulesCount} Master Phases</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Award className="w-4 h-4 text-blue-600" />
                  <span>10+ Curated Labs & Tools</span>
                </div>
              </div>

              <div className="flex items-center gap-3 pt-6">
                <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-black shadow-brutal-sm">
                  <Image src="/images/about-hacker.jpg" alt="Raghav Arora" fill className="object-cover" />
                </div>
                <div>
                  <p className="text-xs text-neutral-500 font-bold uppercase tracking-wider">Curated By</p>
                  <p className="font-display font-black text-base text-black">Raghav Arora</p>
                </div>
              </div>
            </div>

            {/* ══ 1. WHAT YOU CAN BECOME ══ */}
            <div className="rounded-3xl border-[3.5px] border-black bg-gradient-to-br from-neutral-900 to-neutral-800 p-8 sm:p-10 shadow-brutal-xl">
              <div className="flex items-center gap-2.5 mb-2">
                <Zap className="w-6 h-6 text-yellow-300" />
                <h2 className="text-2xl sm:text-3xl font-black text-white font-display">What You Can Become</h2>
              </div>
              <p className="text-sm font-medium text-neutral-400 mb-8">
                This is not just a roadmap — it is a career transformation. Here is exactly what you will be able to call yourself after completing all 6 phases:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {(roadmap.whatYouBecome ?? [
                  { icon: "🐛", title: "Bug Bounty Hunter", desc: "Find real vulnerabilities in live companies and earn cash rewards and Hall of Fame recognition." },
                  { icon: "🔐", title: "Web Penetration Tester", desc: "Get hired to legally hack company systems and write professional audit reports." },
                  { icon: "🛡️", title: "Security Analyst", desc: "Land SOC and Blue Team roles, monitor live threats, and protect digital infrastructure." },
                  { icon: "🎓", title: "Ethical Hacker (CEH / OSCP Ready)", desc: "Prepare fully for globally recognised certifications and crack interviews at top firms." },
                  { icon: "💼", title: "Cyber Security Freelancer", desc: "Offer VAPT services to startups and earn serious money per project." },
                  { icon: "🏆", title: "CTF Player & Security Researcher", desc: "Compete globally, build your portfolio, and get noticed by elite security teams." },
                ]).map((item, idx) => (
                  <div key={idx} className="flex items-start gap-4 p-4 rounded-2xl border border-white/10 bg-white/5">
                    <span className="text-2xl">{item.icon}</span>
                    <div>
                      <p className="font-display font-black text-sm text-white">{item.title}</p>
                      <p className="text-xs font-medium text-neutral-400 mt-1 leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* ══ 2. ROADMAP PHASES (Teaser — deep content locked) ══ */}
            <div className="rounded-3xl border-[3.5px] border-black bg-white p-8 sm:p-10 shadow-brutal">
              <div className="flex items-center gap-2.5 mb-2">
                <Flag className="w-6 h-6 text-purple-600 stroke-[2.5]" />
                <h2 className="text-2xl sm:text-3xl font-black text-black font-display">Your 6-Phase Roadmap</h2>
              </div>
              <p className="text-xs sm:text-sm font-medium text-neutral-600 mb-8">
                A clear, structured journey from day one to professional level. Each phase builds on the last — no confusion, no wasted time.
              </p>

              <div className="space-y-4">
                {roadmap.phases.map((phase, idx) => {
                  const badgeClass = PHASE_BADGE_COLORS[phase.badge] ?? "bg-neutral-100 text-neutral-700 border-neutral-300";
                  const isExpanded = expandedPhase === idx;
                  const hasDeepContent = (phase.topics?.length ?? 0) > 0 || (phase.handsOnGoals?.length ?? 0) > 0;

                  return (
                    <div
                      key={idx}
                      className="rounded-2xl border-2 border-black overflow-hidden shadow-brutal-xs"
                    >
                      {/* Phase Header — always visible */}
                      <button
                        onClick={() => setExpandedPhase(isExpanded ? null : idx)}
                        className="w-full flex items-start gap-4 p-5 bg-white hover:bg-neutral-50 transition-colors text-left"
                      >
                        <div className="w-10 h-10 rounded-xl border-2 border-black bg-black text-white flex items-center justify-center shrink-0 font-black text-sm">
                          {phase.phaseNumber}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex flex-wrap items-center gap-2 mb-1">
                            <span className={`px-2 py-0.5 rounded-full border text-[10px] font-black uppercase tracking-wider ${badgeClass}`}>
                              {phase.badge}
                            </span>
                            <span className="text-[11px] font-bold text-neutral-500">{phase.duration}</span>
                          </div>
                          <p className="font-display font-black text-sm sm:text-base text-black leading-snug">{phase.title}</p>
                          <p className="text-xs font-medium text-neutral-600 mt-1.5 leading-relaxed">{phase.description}</p>
                        </div>
                        <div className="shrink-0 mt-1">
                          {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                        </div>
                      </button>

                      {/* Expanded: Deep content — locked unless purchased */}
                      {isExpanded && hasDeepContent && (
                        <div className="border-t-2 border-black">
                          {!isPurchased ? (
                            /* LOCKED STATE */
                            <div className="p-6 bg-neutral-950 text-white">
                              <div className="flex items-center gap-3 mb-4">
                                <div className="w-10 h-10 rounded-xl bg-yellow-300 border-2 border-black flex items-center justify-center">
                                  <Lock className="w-5 h-5 text-black" />
                                </div>
                                <div>
                                  <p className="font-black text-sm">Full Phase {phase.phaseNumber} Content is Locked</p>
                                  <p className="text-xs text-neutral-400 font-medium">
                                    {phase.topics?.length ?? 0} topics + {phase.handsOnGoals?.length ?? 0} hands-on lab goals inside
                                  </p>
                                </div>
                              </div>

                              {/* Blurred topic previews */}
                              <div className="space-y-2 mb-5">
                                {(phase.topics ?? []).slice(0, 4).map((t, i) => (
                                  <div key={i} className="flex items-center gap-2 p-2.5 rounded-xl bg-white/5 border border-white/10">
                                    <Check className="w-3.5 h-3.5 text-yellow-300 shrink-0" />
                                    <span className="text-xs font-bold text-white/30 blur-[3px] select-none">{t}</span>
                                  </div>
                                ))}
                                {(phase.topics?.length ?? 0) > 4 && (
                                  <p className="text-xs text-neutral-500 text-center font-bold pt-1">
                                    + {(phase.topics?.length ?? 0) - 4} more topics hidden...
                                  </p>
                                )}
                              </div>

                              <button
                                onClick={handleEnroll}
                                className="w-full py-3 rounded-xl border-2 border-yellow-300 bg-yellow-300 text-black font-black text-sm uppercase tracking-wide hover:bg-yellow-400 transition-colors flex items-center justify-center gap-2"
                              >
                                <Unlock className="w-4 h-4" />
                                Unlock Full Roadmap — {roadmap.price}
                              </button>
                            </div>
                          ) : (
                            /* UNLOCKED STATE */
                            <div className="p-6 bg-neutral-50 space-y-6">
                              {(phase.topics?.length ?? 0) > 0 && (
                                <div>
                                  <p className="text-[11px] font-black uppercase tracking-wider text-neutral-500 mb-3 flex items-center gap-1.5">
                                    <BookOpen className="w-3.5 h-3.5" /> Topics Covered
                                  </p>
                                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                    {phase.topics!.map((t, i) => (
                                      <div key={i} className="flex items-start gap-2 p-2.5 rounded-xl border border-neutral-200 bg-white">
                                        <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5 stroke-[3]" />
                                        <span className="text-xs font-bold text-neutral-800 leading-snug">{t}</span>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              )}
                              {(phase.handsOnGoals?.length ?? 0) > 0 && (
                                <div>
                                  <p className="text-[11px] font-black uppercase tracking-wider text-neutral-500 mb-3 flex items-center gap-1.5">
                                    <Target className="w-3.5 h-3.5" /> Hands-On Goals
                                  </p>
                                  <div className="space-y-2">
                                    {phase.handsOnGoals!.map((g, i) => (
                                      <div key={i} className="flex items-start gap-2 p-3 rounded-xl border-2 border-black bg-yellow-50">
                                        <Zap className="w-3.5 h-3.5 text-yellow-600 shrink-0 mt-0.5" />
                                        <span className="text-xs font-bold text-black leading-snug">{g}</span>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* CTA below phases */}
              {mounted && !isPurchased && (
                <div className="mt-6 p-5 rounded-2xl border-2 border-black bg-neutral-950 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div>
                    <p className="font-black text-sm text-yellow-300">Unlock all 6 phases with full topics + hands-on goals</p>
                    <p className="text-xs font-bold text-neutral-400 mt-0.5">
                      80+ topics, lab goals, YouTube recommendations, bug bounty guide &amp; more
                    </p>
                  </div>
                  <button onClick={handleEnroll} className="btn-brutal btn-brutal-yellow shrink-0 px-5 py-2.5 text-sm font-black whitespace-nowrap">
                    Get Full Access — {roadmap.price}
                  </button>
                </div>
              )}
            </div>

            {/* ══ 3. WHAT'S INCLUDED ══ */}
            <div className="rounded-3xl border-[3.5px] border-black bg-white p-8 sm:p-10 shadow-brutal">
              <div className="flex items-center gap-2.5 mb-2">
                <ShieldCheck className="w-6 h-6 text-emerald-600 stroke-[2.5]" />
                <h2 className="text-2xl sm:text-3xl font-black text-black font-display">What Is Included</h2>
              </div>
              <p className="text-xs sm:text-sm font-medium text-neutral-600 mb-6">
                Everything you get the moment you unlock the roadmap.
              </p>
              <div className="space-y-3">
                {roadmap.whatIsIncluded.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3 p-3.5 rounded-2xl border border-neutral-200 bg-neutral-50">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5 stroke-[2.5]" />
                    <span className="text-sm font-bold text-neutral-800 leading-snug">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* ══ 4. FAQ ══ */}
            <div className="rounded-3xl border-[3.5px] border-black bg-white p-8 sm:p-10 shadow-brutal">
              <div className="flex items-center gap-2.5 mb-6">
                <Users className="w-6 h-6 text-blue-600 stroke-[2.5]" />
                <h2 className="text-2xl sm:text-3xl font-black text-black font-display">Common Questions</h2>
              </div>
              <div className="space-y-3">
                {roadmap.faqs.map((faq, idx) => (
                  <div key={idx} className="rounded-2xl border-2 border-black overflow-hidden">
                    <button
                      onClick={() => setExpandedFaq(expandedFaq === idx ? null : idx)}
                      className="w-full flex items-center justify-between gap-4 p-4 bg-neutral-50 hover:bg-neutral-100 transition-colors text-left"
                    >
                      <span className="font-black text-sm text-black">{faq.question}</span>
                      {expandedFaq === idx
                        ? <ChevronUp className="w-4 h-4 shrink-0" />
                        : <ChevronDown className="w-4 h-4 shrink-0" />}
                    </button>
                    {expandedFaq === idx && (
                      <div className="px-4 pb-4 pt-2 bg-white border-t border-neutral-200">
                        <p className="text-sm font-medium text-neutral-700 leading-relaxed">{faq.answer}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ─── RIGHT SIDEBAR ─── */}
          <div className="lg:col-span-4">
            <div className="sticky top-20 space-y-5">

              {/* Pricing Card */}
              <div className="rounded-3xl border-[3.5px] border-black bg-white p-6 shadow-brutal-xl">
                {/* Offer badge */}
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border-2 border-black bg-red-400 text-white text-xs font-black uppercase tracking-wider mb-4 shadow-brutal-xs">
                  <Sparkles className="w-3.5 h-3.5" />
                  {roadmap.offerBadge}
                </div>

                {/* Price */}
                <div className="flex items-baseline gap-3 mb-1">
                  <span className="text-3xl sm:text-4xl font-black text-black font-display">{roadmap.price}</span>
                  <span className="text-base font-bold text-neutral-400 line-through">{roadmap.originalPrice}</span>
                </div>
                <p className="text-xs font-bold text-emerald-700 mb-5">
                  One-time payment. Lifetime access. No subscriptions.
                </p>

                {mounted && isPurchased ? (
                  <div className="p-4 rounded-2xl border-2 border-emerald-500 bg-emerald-50 text-center">
                    <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto mb-2" />
                    <p className="font-black text-sm text-black">You own this roadmap!</p>
                    <p className="text-xs font-bold text-neutral-600 mt-1">Click any phase above to expand full content.</p>
                    <Link href="/dashboard" className="btn-brutal btn-brutal-primary w-full mt-3 py-2.5 text-xs font-black">
                      Go to Student Portal →
                    </Link>
                  </div>
                ) : (
                  <>
                    <button
                      onClick={handleEnroll}
                      className="btn-brutal btn-brutal-yellow w-full py-3.5 text-sm uppercase font-black tracking-wide mb-3 flex items-center justify-center gap-2"
                    >
                      <Zap className="w-4 h-4" />
                      Unlock Full Roadmap
                    </button>
                    <p className="text-[10px] text-center font-bold text-neutral-500">
                      Pay via UPI (₹99) or PayPal ($2). Instant access.
                    </p>
                  </>
                )}

                {/* Stats grid */}
                <div className="grid grid-cols-2 gap-3 mt-5 pt-5 border-t-2 border-neutral-200">
                  {roadmap.stats.map((s, i) => (
                    <div key={i} className="p-3 rounded-xl border border-neutral-200 bg-neutral-50 text-center">
                      <p className="font-display font-black text-base text-black">{s.value}</p>
                      <p className="text-[10px] font-bold text-neutral-500 uppercase">{s.label}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Locked preview teaser */}
              {mounted && !isPurchased && (
                <div className="rounded-3xl border-[3.5px] border-black bg-neutral-950 p-6 shadow-brutal text-white">
                  <div className="flex items-center gap-2 mb-4">
                    <Lock className="w-5 h-5 text-yellow-300" />
                    <p className="font-black text-sm">Locked Inside the Roadmap</p>
                  </div>
                  <div className="space-y-2">
                    {[
                      "80+ deep-dive topics across 6 phases",
                      "Hands-on lab goals per phase",
                      "Best YouTube channels (curated & ranked)",
                      "10+ practice lab platforms with tips",
                      "Bug bounty platform selection guide",
                      "Professional VAPT report templates",
                      "Private student community access",
                    ].map((item, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs font-bold text-neutral-300">
                        <span className="text-yellow-300 mt-0.5">→</span>
                        <span className="blur-[2px] select-none">{item}</span>
                      </div>
                    ))}
                  </div>
                  <button
                    onClick={handleEnroll}
                    className="w-full mt-5 py-3 rounded-xl border-2 border-yellow-300 bg-yellow-300 text-black font-black text-xs uppercase tracking-wide hover:bg-yellow-400 transition-colors flex items-center justify-center gap-2"
                  >
                    <Unlock className="w-3.5 h-3.5" />
                    Unlock for {roadmap.price}
                  </button>
                </div>
              )}

              {/* Social proof */}
              <div className="rounded-3xl border-[3.5px] border-black bg-white p-6 shadow-brutal">
                <div className="flex items-center gap-2 mb-4">
                  <TrendingUp className="w-5 h-5 text-purple-600" />
                  <p className="font-black text-sm text-black">Raghav&apos;s Track Record</p>
                </div>
                <div className="space-y-3">
                  {[
                    { val: "50+", label: "Organisations Secured" },
                    { val: "1,000+", label: "Students Mentored" },
                    { val: "NASA, Swiggy, Jio", label: "Hall of Fame Credits" },
                    { val: "5.0 ★", label: "Average Rating" },
                  ].map((s, i) => (
                    <div key={i} className="flex items-center justify-between p-3 rounded-xl border border-neutral-200 bg-neutral-50">
                      <span className="text-xs font-bold text-neutral-600">{s.label}</span>
                      <span className="font-display font-black text-sm text-black">{s.val}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ─── PURCHASE MODAL ─── */}
      {isPurchaseModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ backgroundColor: "rgba(0,0,0,0.75)" }}>
          <div className="w-full max-w-md rounded-3xl border-[3.5px] border-black bg-white p-7 shadow-brutal-xl relative">
            <button onClick={() => setIsPurchaseModalOpen(false)} className="absolute top-4 right-4 w-8 h-8 rounded-full border-2 border-black flex items-center justify-center hover:bg-neutral-100 font-black text-sm">✕</button>

            <div className="flex items-center gap-2.5 mb-1">
              <Zap className="w-6 h-6 text-yellow-500" />
              <h3 className="text-xl font-black font-display text-black">Unlock Full Roadmap</h3>
            </div>
            <p className="text-xs font-bold text-neutral-600 mb-6">{roadmap.title}</p>

            {/* Payment options */}
            <div className="space-y-4 mb-6">
              <div className="p-4 rounded-2xl border-2 border-black bg-neutral-50">
                <p className="font-black text-sm text-black mb-1">Option 1 — UPI (India)</p>
                <p className="text-2xl font-black text-black font-display mb-2">₹99 INR</p>
                <p className="text-xs font-bold text-neutral-600 mb-3">Pay to UPI ID: <span className="text-black font-black">connect@thatraghavarora.in</span></p>
                <p className="text-[11px] font-bold text-neutral-500">After payment, screenshot karo aur Instagram DM karo: <span className="text-purple-700">@thatraghavarora</span></p>
              </div>
              <div className="p-4 rounded-2xl border-2 border-black bg-blue-50">
                <p className="font-black text-sm text-black mb-1">Option 2 — PayPal (International)</p>
                <p className="text-2xl font-black text-black font-display mb-2">$2 USD</p>
                <a href="https://paypal.me/raghavarora" target="_blank" rel="noopener noreferrer" className="text-xs font-bold text-blue-700 underline">paypal.me/raghavarora</a>
                <p className="text-[11px] font-bold text-neutral-500 mt-2">After payment, DM on Instagram with screenshot: <span className="text-purple-700">@thatraghavarora</span></p>
              </div>
            </div>

            <div className="flex gap-3">
              <a
                href="https://instagram.com/thatraghavarora"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-brutal btn-brutal-primary flex-1 py-3 text-xs font-black text-center"
              >
                DM Payment Proof on Instagram
              </a>
            </div>

            <div className="mt-4 pt-4 border-t border-neutral-200">
              <p className="text-[10px] text-center font-bold text-neutral-500 mb-3">Already paid? Click below to mark as unlocked:</p>
              <button
                onClick={handleUnlockSuccess}
                className="w-full py-2.5 rounded-xl border-2 border-black bg-emerald-300 hover:bg-emerald-400 text-black font-black text-xs uppercase transition-colors"
              >
                ✓ I have paid — Unlock Now
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
