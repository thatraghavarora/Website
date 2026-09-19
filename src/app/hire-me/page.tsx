"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ShieldCheck,
  Code2,
  Palette,
  TrendingUp,
  Video,
  Clock,
  Sparkles,
  CheckCircle2,
  Calendar,
  Send,
  MessageSquare,
  DollarSign,
  ArrowRight,
  ShieldAlert,
  Zap,
  Star,
  Check,
  Loader2,
  Lock,
  ChevronRight,
  User,
  Mail,
  Phone,
  HelpCircle
} from "lucide-react";
import confetti from "canvas-confetti";
import { siteProfile } from "@/data/siteData";
import { CrownDoodle, SquiggleDoodle } from "@/components/Doodles";
import {
  InstagramIcon,
  LinkedinIcon,
  XTwitterIcon
} from "@/components/SocialIcons";

export default function HireMePage() {
  const [inquiryType, setInquiryType] = useState<"mentorship" | "freelance">("mentorship");
  const [selectedService, setSelectedService] = useState("cyber-guidance");
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    contactHandle: "",
    serviceType: "1:1 Cyber Security Guidance ($10 / ₹1,000 INR)",
    details: "",
    preferredTimeline: "Immediate / Within 2-3 days"
  });

  const guidanceSessions = [
    {
      id: "cyber-guidance",
      serviceName: "1:1 Cyber Security Guidance ($10 / ₹1,000 INR)",
      title: "Cyber Security Guidance & Roadmap",
      subtitle: "1:1 Live Strategy & Mentorship Session",
      priceUSD: "$10",
      priceINR: "₹1,000 INR",
      duration: "45–60 Mins Live Call",
      icon: <ShieldCheck className="w-6 h-6 text-purple-700" />,
      accentBg: "bg-purple-100",
      badge: "Bestseller",
      badgeColor: "bg-purple-300",
      description:
        "Direct 1:1 live video call to build your personal roadmap from scratch, navigate bug bounty hunting, master labs, and prepare for infosec roles.",
      features: [
        "Personalized career & skills roadmap (Zero to Pentester)",
        "Bug bounty methodology, tool setup & recon workflow guidance",
        "PortSwigger, TryHackMe & HackTheBox lab attack strategy",
        "Resume / CV & LinkedIn portfolio audit for cybersecurity",
        "Live Q&A, session recording & actionable resource links"
      ]
    },
    {
      id: "webdev-guidance",
      serviceName: "1:1 Web Development Guidance ($5 / ₹500 INR)",
      title: "Web Development Guidance",
      subtitle: "1:1 Live Coding & Architecture Mentorship",
      priceUSD: "$5",
      priceINR: "₹500 INR",
      duration: "30–45 Mins Live Call",
      icon: <Code2 className="w-6 h-6 text-blue-700" />,
      accentBg: "bg-blue-100",
      badge: "Practical Tech",
      badgeColor: "bg-blue-300",
      description:
        "Get live technical advice on your Next.js, React, Node, or frontend architecture, unblock tricky bugs, and build portfolio projects.",
      features: [
        "Full stack roadmap (React, Next.js, TypeScript, Tailwind)",
        "Architecture review of your active web apps or SaaS ideas",
        "Live debugging assistance and code structure best practices",
        "How to build high-converting client sites and bid for gigs",
        "Q&A on freelance workflows and developer portfolios"
      ]
    },
    {
      id: "marketing-guidance",
      serviceName: "1:1 Digital Marketing Guidance ($5 / ₹500 INR)",
      title: "Digital Marketing Guidance",
      subtitle: "1:1 Live Growth & Personal Brand Strategy",
      priceUSD: "$5",
      priceINR: "₹500 INR",
      duration: "30–45 Mins Live Call",
      icon: <TrendingUp className="w-6 h-6 text-emerald-700" />,
      accentBg: "bg-emerald-100",
      badge: "High Impact",
      badgeColor: "bg-emerald-300",
      description:
        "Learn proven organic strategies to build your personal brand, scale your YouTube/LinkedIn reach, and turn content into paying clients.",
      features: [
        "Organic social media growth strategy for tech creators",
        "Technical SEO, on-page optimization & content strategy",
        "Personal branding tactics for LinkedIn, X (Twitter) & YouTube",
        "Client acquisition funnels for digital products & freelance work",
        "Actionable blueprint to scale reach and engagement"
      ]
    }
  ];

  const freelanceRoles = [
    {
      id: "hire-webdev",
      serviceName: "Hire Me As Web Developer (Custom Scope)",
      title: "Hire Me As Web Developer",
      role: "Full Stack Engineer & UI Architect",
      icon: <Code2 className="w-6 h-6 text-blue-600" />,
      badge: "Full Stack / SaaS",
      pricingNote: "Custom Quote — Depends upon work fees will charge",
      description:
        "High-performance modern web apps, SaaS MVPs, and neo-brutalist landing pages built with Next.js, React, TypeScript, and Tailwind.",
      deliverables: [
        "Custom responsive web application with clean architecture",
        "High-converting landing pages & interactive UI components",
        "API integrations, authentication & database setup",
        "SEO-friendly, lighthouse performance 95+ score",
        "Post-deployment support and complete source code"
      ]
    },
    {
      id: "hire-pentester",
      serviceName: "Hire Me As Pentester (Security Audit)",
      title: "Hire Me As Pentester",
      role: "Security Researcher & VAPT Auditor",
      icon: <ShieldAlert className="w-6 h-6 text-purple-600" />,
      badge: "Vulnerability Assessment",
      pricingNote: "Custom Quote — Depends upon work fees will charge",
      description:
        "Comprehensive web application penetration testing, vulnerability assessment, and OWASP Top 10 remediation auditing.",
      deliverables: [
        "Manual & automated vulnerability assessment (VAPT)",
        "OWASP Top 10 & business logic flaw identification",
        "API security & authorization bypass testing",
        "Executive summary + step-by-step developer remediation report",
        "Re-testing verification after patches are applied"
      ]
    },
    {
      id: "hire-designer",
      serviceName: "Hire Me As Graphic Designer (Custom Scope)",
      title: "Hire Me As Graphic Designer",
      role: "Visual Creator & Brand Stylist",
      icon: <Palette className="w-6 h-6 text-amber-600" />,
      badge: "Visual Identity",
      pricingNote: "Custom Quote — Depends upon work fees will charge",
      description:
        "Click-worthy YouTube thumbnails, distinctive brand identities, social media marketing creatives, and custom UI illustrations.",
      deliverables: [
        "High CTR YouTube video thumbnails that grab attention",
        "Brand identity kits: logos, banners, typography & color palettes",
        "Social media graphics for LinkedIn, Instagram & Twitter",
        "Marketing banners, posters & digital advertising assets",
        "Delivered in all standard formats (Figma, PNG, SVG)"
      ]
    },
    {
      id: "hire-marketer",
      serviceName: "Hire Me As Digital Marketer (Custom Scope)",
      title: "Hire Me As Digital Marketer",
      role: "Growth Marketer & SEO Specialist",
      icon: <TrendingUp className="w-6 h-6 text-emerald-600" />,
      badge: "Organic Growth",
      pricingNote: "Custom Quote — Depends upon work fees will charge",
      description:
        "End-to-end digital growth campaigns, technical SEO rankings, content marketing calendars, and social reach amplification.",
      deliverables: [
        "On-page, off-page & technical SEO for high Google rankings",
        "Social media growth management (X, LinkedIn, Instagram)",
        "Tech content marketing & lead generation strategy",
        "Product launch campaigns and funnel optimization",
        "Transparent weekly metrics & performance reporting"
      ]
    }
  ];

  const handleSelectService = (id: string, serviceFullName: string, type: "mentorship" | "freelance") => {
    setSelectedService(id);
    setInquiryType(type);
    setFormData((prev) => ({
      ...prev,
      serviceType: serviceFullName
    }));
    // Smooth scroll to lead form at the top
    window.scrollTo({ top: 120, behavior: "smooth" });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.details) return;

    setSubmitting(true);
    try {
      await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          contactHandle: formData.contactHandle,
          serviceType: formData.serviceType,
          details: formData.details,
          preferredTimeline: formData.preferredTimeline,
        }),
      });

      setSubmitted(true);
      confetti({
        particleCount: 160,
        spread: 80,
        origin: { y: 0.55 }
      });
    } catch {
      setSubmitted(true);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="py-8 sm:py-12 bg-neutral-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ══════════════════════════════════════════════════════════
            HERO SECTION: 2-COLUMN SPLIT
            LEFT: Lead Capture Form
            RIGHT: Hero Content & Value Proposition
        ══════════════════════════════════════════════════════════ */}
        <section className="mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
            
            {/* ── LEFT COLUMN: HERO CONTENT & VALUE PROPOSITION (7 cols) ── */}
            <div className="lg:col-span-7 space-y-6 order-1 lg:order-1">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border-2 border-black bg-yellow-300 shadow-brutal-sm font-black text-xs uppercase tracking-wider text-black">
                <Sparkles className="w-4 h-4" />
                <span>DIRECT COLLABORATION &amp; 1:1 LIVE MENTORSHIP</span>
              </div>

              {/* Display Headline */}
              <div>
                <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-black font-display tracking-tight leading-tight">
                  Work With Raghav Arora.
                </h1>
                <p className="text-base sm:text-xl font-bold text-neutral-700 mt-3 leading-relaxed">
                  Fast-track your tech career with personalized 1:1 live strategy calls, or hire me to build world-class web apps, audit your cybersecurity posture, craft high-CTR designs, and drive organic digital growth.
                </p>
              </div>

              {/* Pricing Notice Callout Card */}
              <div className="rounded-2xl border-[3px] border-black bg-amber-100/90 p-5 shadow-brutal-sm">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-black text-amber-300 flex items-center justify-center shrink-0 shadow-brutal-xs">
                    <DollarSign className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-display font-black text-sm text-black uppercase tracking-wider">
                      Transparent Pricing Philosophy:
                    </h4>
                    <p className="text-xs sm:text-sm font-bold text-neutral-800 mt-1 leading-snug">
                      • <strong>1:1 Live Guidance Calls:</strong> Fixed transparent fees (<span className="text-purple-900 font-extrabold">$10 / ₹1,000 INR</span> for Cyber Security, <span className="text-blue-900 font-extrabold">$5 / ₹500 INR</span> for Web Dev &amp; Marketing).<br />
                      • <strong>Freelance &amp; Contract Work:</strong> Depend upon work fees will charge — tailored to your exact project scope and technical complexity.
                    </p>
                  </div>
                </div>
              </div>

              {/* Overview Pills (Quick Selection Grid) */}
              <div className="space-y-3">
                <p className="text-xs font-black uppercase tracking-wider text-neutral-500">
                  What I Can Help You With (Click to Select in Form):
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {/* Item 1 */}
                  <div
                    onClick={() => handleSelectService("cyber-guidance", "1:1 Cyber Security Guidance ($10 / ₹1,000 INR)", "mentorship")}
                    className="p-3.5 rounded-2xl border-2 border-black bg-white hover:bg-purple-50 transition-all cursor-pointer shadow-brutal-xs flex items-center justify-between group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-purple-100 border border-black flex items-center justify-center shrink-0">
                        <ShieldCheck className="w-4 h-4 text-purple-700" />
                      </div>
                      <div>
                        <p className="font-display font-black text-xs text-black">Cyber Security 1:1 Call</p>
                        <p className="text-[11px] font-extrabold text-purple-700">$10 USD / ₹1,000 INR</p>
                      </div>
                    </div>
                    <span className="text-xs font-black text-neutral-400 group-hover:text-black transition-colors">Select →</span>
                  </div>

                  {/* Item 2 */}
                  <div
                    onClick={() => handleSelectService("webdev-guidance", "1:1 Web Development Guidance ($5 / ₹500 INR)", "mentorship")}
                    className="p-3.5 rounded-2xl border-2 border-black bg-white hover:bg-blue-50 transition-all cursor-pointer shadow-brutal-xs flex items-center justify-between group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-blue-100 border border-black flex items-center justify-center shrink-0">
                        <Code2 className="w-4 h-4 text-blue-700" />
                      </div>
                      <div>
                        <p className="font-display font-black text-xs text-black">Web Dev 1:1 Call</p>
                        <p className="text-[11px] font-extrabold text-blue-700">$5 USD / ₹500 INR</p>
                      </div>
                    </div>
                    <span className="text-xs font-black text-neutral-400 group-hover:text-black transition-colors">Select →</span>
                  </div>

                  {/* Item 3 */}
                  <div
                    onClick={() => handleSelectService("marketing-guidance", "1:1 Digital Marketing Guidance ($5 / ₹500 INR)", "mentorship")}
                    className="p-3.5 rounded-2xl border-2 border-black bg-white hover:bg-emerald-50 transition-all cursor-pointer shadow-brutal-xs flex items-center justify-between group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-emerald-100 border border-black flex items-center justify-center shrink-0">
                        <TrendingUp className="w-4 h-4 text-emerald-700" />
                      </div>
                      <div>
                        <p className="font-display font-black text-xs text-black">Digital Marketing 1:1</p>
                        <p className="text-[11px] font-extrabold text-emerald-700">$5 USD / ₹500 INR</p>
                      </div>
                    </div>
                    <span className="text-xs font-black text-neutral-400 group-hover:text-black transition-colors">Select →</span>
                  </div>

                  {/* Item 4 */}
                  <div
                    onClick={() => handleSelectService("hire-webdev", "Hire Me As Web Developer (Custom Scope)", "freelance")}
                    className="p-3.5 rounded-2xl border-2 border-black bg-white hover:bg-yellow-50 transition-all cursor-pointer shadow-brutal-xs flex items-center justify-between group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-yellow-100 border border-black flex items-center justify-center shrink-0">
                        <Code2 className="w-4 h-4 text-black" />
                      </div>
                      <div>
                        <p className="font-display font-black text-xs text-black">Hire Web Developer</p>
                        <p className="text-[11px] font-extrabold text-neutral-600">Custom Scope Quote</p>
                      </div>
                    </div>
                    <span className="text-xs font-black text-neutral-400 group-hover:text-black transition-colors">Select →</span>
                  </div>

                  {/* Item 5 */}
                  <div
                    onClick={() => handleSelectService("hire-pentester", "Hire Me As Pentester (Security Audit)", "freelance")}
                    className="p-3.5 rounded-2xl border-2 border-black bg-white hover:bg-purple-50 transition-all cursor-pointer shadow-brutal-xs flex items-center justify-between group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-purple-100 border border-black flex items-center justify-center shrink-0">
                        <ShieldAlert className="w-4 h-4 text-purple-700" />
                      </div>
                      <div>
                        <p className="font-display font-black text-xs text-black">Hire Pentester (VAPT)</p>
                        <p className="text-[11px] font-extrabold text-neutral-600">Custom Scope Quote</p>
                      </div>
                    </div>
                    <span className="text-xs font-black text-neutral-400 group-hover:text-black transition-colors">Select →</span>
                  </div>

                  {/* Item 6 */}
                  <div
                    onClick={() => handleSelectService("hire-designer", "Hire Me As Graphic Designer (Custom Scope)", "freelance")}
                    className="p-3.5 rounded-2xl border-2 border-black bg-white hover:bg-amber-50 transition-all cursor-pointer shadow-brutal-xs flex items-center justify-between group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-amber-100 border border-black flex items-center justify-center shrink-0">
                        <Palette className="w-4 h-4 text-amber-700" />
                      </div>
                      <div>
                        <p className="font-display font-black text-xs text-black">Hire Graphic Designer</p>
                        <p className="text-[11px] font-extrabold text-neutral-600">Custom Scope Quote</p>
                      </div>
                    </div>
                    <span className="text-xs font-black text-neutral-400 group-hover:text-black transition-colors">Select →</span>
                  </div>
                </div>
              </div>

              {/* Quick Trust Highlights */}
              <div className="grid grid-cols-3 gap-3 pt-2">
                <div className="p-3 rounded-2xl border-2 border-black bg-white text-center shadow-brutal-xs">
                  <p className="font-display font-black text-xl text-black">50+</p>
                  <p className="text-[10px] font-bold text-neutral-600 uppercase">Orgs Secured</p>
                </div>
                <div className="p-3 rounded-2xl border-2 border-black bg-white text-center shadow-brutal-xs">
                  <p className="font-display font-black text-xl text-black">1000+</p>
                  <p className="text-[10px] font-bold text-neutral-600 uppercase">Students Taught</p>
                </div>
                <div className="p-3 rounded-2xl border-2 border-black bg-white text-center shadow-brutal-xs">
                  <p className="font-display font-black text-xl text-black">100%</p>
                  <p className="text-[10px] font-bold text-neutral-600 uppercase">Live Screen Share</p>
                </div>
              </div>
            </div>

            {/* ── RIGHT COLUMN: LEAD CAPTURE FORM (5 cols) ── */}
            <div className="lg:col-span-5 order-2 lg:order-2">
              <div
                id="lead-capture-form"
                className="rounded-3xl border-[3.5px] border-black bg-white p-6 sm:p-8 shadow-brutal-xl relative overflow-hidden"
              >
                {/* Form header pill */}
                <div className="flex items-center justify-between gap-2 pb-4 mb-5 border-b-2 border-neutral-200">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse inline-block" />
                    <span className="font-display font-black text-sm uppercase tracking-wider text-black">
                      Direct Booking &amp; Quote Form
                    </span>
                  </div>
                  <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded bg-yellow-300 text-black border border-black shadow-brutal-xs">
                    ⚡ Fast Response
                  </span>
                </div>

                {submitted ? (
                  <div className="py-8 px-4 rounded-2xl border-2 border-black bg-emerald-50 text-center space-y-4 animate-in zoom-in-95 duration-200">
                    <div className="w-14 h-14 rounded-2xl bg-emerald-400 border-2 border-black flex items-center justify-center mx-auto shadow-brutal-sm">
                      <Check className="w-7 h-7 text-black stroke-[3]" />
                    </div>
                    <h3 className="text-xl font-black text-black font-display">
                      Lead Captured Successfully!
                    </h3>
                    <p className="text-xs font-bold text-neutral-700 leading-relaxed">
                      Thank you <span className="text-black underline">{formData.name}</span>! Raghav has received your request for <span className="font-black text-black">&ldquo;{formData.serviceType}&rdquo;</span> and will email you at <span className="text-blue-600 underline">{formData.email}</span> within 12 hours.
                    </p>
                    <div className="pt-2 flex flex-col gap-2">
                      <a
                        href="https://instagram.com/thatraghavarora"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-brutal btn-brutal-primary py-2.5 text-xs font-black uppercase"
                      >
                        Message Raghav on Instagram ↗
                      </a>
                      <button
                        type="button"
                        onClick={() => setSubmitted(false)}
                        className="text-xs font-bold text-neutral-500 hover:text-black underline py-1"
                      >
                        Submit another inquiry
                      </button>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Inquiry Type Tabs: 1:1 Live or Freelance */}
                    <div>
                      <label className="block text-[11px] font-black uppercase tracking-wider text-neutral-600 mb-2">
                        Choose What You Need:
                      </label>
                      <div className="grid grid-cols-2 gap-2 p-1 rounded-2xl border-2 border-black bg-neutral-100">
                        <button
                          type="button"
                          onClick={() => {
                            setInquiryType("mentorship");
                            setFormData((prev) => ({
                              ...prev,
                              serviceType: "1:1 Cyber Security Guidance ($10 / ₹1,000 INR)"
                            }));
                          }}
                          className={`py-2 px-3 rounded-xl text-xs font-black transition-all flex items-center justify-center gap-1.5 ${
                            inquiryType === "mentorship"
                              ? "bg-purple-300 text-black border-2 border-black shadow-brutal-xs"
                              : "text-neutral-600 hover:text-black"
                          }`}
                        >
                          <Video className="w-3.5 h-3.5 shrink-0" />
                          <span>1:1 Mentorship</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => {
                            setInquiryType("freelance");
                            setFormData((prev) => ({
                              ...prev,
                              serviceType: "Hire Me As Web Developer (Custom Scope)"
                            }));
                          }}
                          className={`py-2 px-3 rounded-xl text-xs font-black transition-all flex items-center justify-center gap-1.5 ${
                            inquiryType === "freelance"
                              ? "bg-yellow-300 text-black border-2 border-black shadow-brutal-xs"
                              : "text-neutral-600 hover:text-black"
                          }`}
                        >
                          <Code2 className="w-3.5 h-3.5 shrink-0" />
                          <span>Hire For Project</span>
                        </button>
                      </div>
                    </div>

                    {/* Specific Service Dropdown */}
                    <div>
                      <label className="block text-[11px] font-black uppercase tracking-wider text-neutral-600 mb-1.5">
                        Selected Service &amp; Rate:
                      </label>
                      <select
                        value={formData.serviceType}
                        onChange={(e) =>
                          setFormData({ ...formData, serviceType: e.target.value })
                        }
                        className="w-full px-3.5 py-3 rounded-xl border-2 border-black bg-neutral-50 shadow-brutal-xs font-bold text-xs sm:text-sm text-black focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-blue-600"
                      >
                        {inquiryType === "mentorship" ? (
                          <>
                            <option value="1:1 Cyber Security Guidance ($10 / ₹1,000 INR)">
                              🛡️ Cyber Security Guidance — $10 / ₹1,000 INR (45–60m)
                            </option>
                            <option value="1:1 Web Development Guidance ($5 / ₹500 INR)">
                              💻 Web Development Guidance — $5 / ₹500 INR (30–45m)
                            </option>
                            <option value="1:1 Digital Marketing Guidance ($5 / ₹500 INR)">
                              📈 Digital Marketing Guidance — $5 / ₹500 INR (30–45m)
                            </option>
                          </>
                        ) : (
                          <>
                            <option value="Hire Me As Web Developer (Custom Scope)">
                              🚀 Hire Me As Web Developer (Custom Quote)
                            </option>
                            <option value="Hire Me As Pentester (Security Audit)">
                              🔒 Hire Me As Pentester / VAPT (Custom Quote)
                            </option>
                            <option value="Hire Me As Graphic Designer (Custom Scope)">
                              🎨 Hire Me As Graphic Designer (Custom Quote)
                            </option>
                            <option value="Hire Me As Digital Marketer (Custom Scope)">
                              📣 Hire Me As Digital Marketer (Custom Quote)
                            </option>
                          </>
                        )}
                      </select>
                      <p className="text-[10px] font-bold text-neutral-500 mt-1">
                        {inquiryType === "mentorship"
                          ? "✓ Fixed transparent pricing. Guaranteed 1:1 call with Raghav."
                          : "✓ Depend upon work fees will charge — customized quote provided."}
                      </p>
                    </div>

                    {/* Name */}
                    <div>
                      <label className="block text-[11px] font-black uppercase tracking-wider text-neutral-600 mb-1">
                        Your Full Name *
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-neutral-400">
                          <User className="w-4 h-4" />
                        </div>
                        <input
                          type="text"
                          required
                          placeholder="Aman Sharma"
                          value={formData.name}
                          onChange={(e) =>
                            setFormData({ ...formData, name: e.target.value })
                          }
                          className="w-full pl-9 pr-3.5 py-2.5 rounded-xl border-2 border-black bg-neutral-50 shadow-brutal-xs font-bold text-xs sm:text-sm text-black placeholder:text-neutral-400 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-blue-600"
                        />
                      </div>
                    </div>

                    {/* Email */}
                    <div>
                      <label className="block text-[11px] font-black uppercase tracking-wider text-neutral-600 mb-1">
                        Email Address *
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-neutral-400">
                          <Mail className="w-4 h-4" />
                        </div>
                        <input
                          type="email"
                          required
                          placeholder="aman@example.com"
                          value={formData.email}
                          onChange={(e) =>
                            setFormData({ ...formData, email: e.target.value })
                          }
                          className="w-full pl-9 pr-3.5 py-2.5 rounded-xl border-2 border-black bg-neutral-50 shadow-brutal-xs font-bold text-xs sm:text-sm text-black placeholder:text-neutral-400 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-blue-600"
                        />
                      </div>
                    </div>

                    {/* Contact Handle */}
                    <div>
                      <label className="block text-[11px] font-black uppercase tracking-wider text-neutral-600 mb-1">
                        WhatsApp Number / Telegram / Discord
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-neutral-400">
                          <Phone className="w-4 h-4" />
                        </div>
                        <input
                          type="text"
                          placeholder="+91 9876543210 or @telegram_handle"
                          value={formData.contactHandle}
                          onChange={(e) =>
                            setFormData({ ...formData, contactHandle: e.target.value })
                          }
                          className="w-full pl-9 pr-3.5 py-2.5 rounded-xl border-2 border-black bg-neutral-50 shadow-brutal-xs font-bold text-xs sm:text-sm text-black placeholder:text-neutral-400 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-blue-600"
                        />
                      </div>
                    </div>

                    {/* Project Details or Mentorship Goal */}
                    <div>
                      <label className="block text-[11px] font-black uppercase tracking-wider text-neutral-600 mb-1">
                        {inquiryType === "mentorship"
                          ? "What Would You Like To Cover In The Call? *"
                          : "Project Scope & Requirements *"}
                      </label>
                      <textarea
                        required
                        rows={3}
                        placeholder={
                          inquiryType === "mentorship"
                            ? "e.g., 'Need advice breaking into web pentesting and preparing my resume'..."
                            : "e.g., 'Looking for a Next.js full-stack site with authentication & payment gateway'..."
                        }
                        value={formData.details}
                        onChange={(e) =>
                          setFormData({ ...formData, details: e.target.value })
                        }
                        className="w-full px-3.5 py-2.5 rounded-xl border-2 border-black bg-neutral-50 shadow-brutal-xs font-bold text-xs sm:text-sm text-black placeholder:text-neutral-400 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-blue-600"
                      />
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={submitting}
                      className="btn-brutal btn-brutal-yellow w-full py-3.5 text-sm uppercase font-black tracking-wider flex items-center justify-center gap-2 shadow-brutal disabled:opacity-75"
                    >
                      {submitting ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        <Send className="w-4 h-4" />
                      )}
                      <span>
                        {submitting
                          ? "Submitting Inquiry..."
                          : inquiryType === "mentorship"
                          ? "Book 1:1 Live Slot →"
                          : "Request Project Quote →"}
                      </span>
                    </button>

                    <p className="text-[10px] text-center font-bold text-neutral-500 pt-1">
                      🔒 100% confidential. Raghav Arora directly reads and replies to every lead.
                    </p>
                  </form>
                )}

                {/* Instant DM alternative */}
                <div className="mt-5 pt-4 border-t border-neutral-200 flex items-center justify-between gap-2">
                  <span className="text-[11px] font-black text-neutral-600">
                    Need instant answer?
                  </span>
                  <div className="flex items-center gap-1.5">
                    <a
                      href="https://instagram.com/thatraghavarora"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-2.5 py-1 rounded-lg border border-black bg-pink-100 hover:bg-pink-200 text-black text-[11px] font-black flex items-center gap-1"
                    >
                      <InstagramIcon className="w-3 h-3 text-pink-600" />
                      <span>Instagram</span>
                    </a>
                    <a
                      href="https://twitter.com/thatraghavarora"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-2.5 py-1 rounded-lg border border-black bg-neutral-100 hover:bg-neutral-200 text-black text-[11px] font-black flex items-center gap-1"
                    >
                      <XTwitterIcon className="w-3 h-3" />
                      <span>X</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>


        {/* ══════════════════════════════════════════════════════════
            SECTION 2: 1:1 LIVE GUIDANCE SESSIONS DEEP DIVE
        ══════════════════════════════════════════════════════════ */}
        <section className="mb-20 pt-8 border-t-2 border-neutral-200">
          <div className="text-center max-w-3xl mx-auto mb-10">
            <div className="inline-block px-3 py-1 rounded-full border-2 border-black bg-purple-200 text-black font-black text-xs uppercase tracking-wider mb-3 shadow-brutal-xs">
              TRANSPARENT 1:1 MENTORSHIP CALLS
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-black font-display tracking-tight">
              Book a 1:1 Live Guidance Session
            </h2>
            <p className="text-xs sm:text-sm text-neutral-600 font-bold mt-2">
              Fixed fees. 100% private video call via Google Meet or Zoom. Get instant clarity, customized study roadmaps, and portfolio feedback.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {guidanceSessions.map((session) => {
              const isSelected = selectedService === session.id;
              return (
                <div
                  key={session.id}
                  className={`rounded-3xl border-[3.5px] border-black bg-white p-6 sm:p-7 shadow-brutal flex flex-col justify-between transition-all hover-lift ${
                    isSelected ? "ring-4 ring-blue-500 -translate-y-1" : ""
                  }`}
                >
                  <div>
                    <div className="flex items-start justify-between gap-3 mb-4">
                      <div
                        className={`w-12 h-12 rounded-2xl border-2 border-black ${session.accentBg} flex items-center justify-center shadow-brutal-xs`}
                      >
                        {session.icon}
                      </div>
                      <span
                        className={`px-3 py-1 rounded-full border-2 border-black ${session.badgeColor} text-black font-black text-[10px] uppercase tracking-wider shadow-brutal-xs`}
                      >
                        {session.badge}
                      </span>
                    </div>

                    <h3 className="text-xl sm:text-2xl font-black text-black font-display tracking-tight mb-1">
                      {session.title}
                    </h3>
                    <p className="text-xs font-bold text-purple-700 mb-4">
                      {session.subtitle}
                    </p>

                    {/* Price Block */}
                    <div className="p-4 rounded-2xl border-2 border-black bg-neutral-50 mb-5 shadow-brutal-xs">
                      <p className="text-[10px] font-black uppercase text-neutral-500 tracking-wider">
                        Fixed Session Fee:
                      </p>
                      <div className="flex items-baseline gap-2 mt-1">
                        <span className="text-3xl font-black text-black font-display">
                          {session.priceUSD}
                        </span>
                        <span className="text-lg font-black text-blue-600">
                          | {session.priceINR}
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5 text-xs font-bold text-neutral-600 mt-2">
                        <Clock className="w-3.5 h-3.5 text-neutral-500" />
                        <span>{session.duration}</span>
                      </div>
                    </div>

                    <p className="text-xs text-neutral-700 leading-relaxed font-medium mb-5">
                      {session.description}
                    </p>

                    {/* Features checklist */}
                    <div className="space-y-2.5 pt-4 border-t-2 border-neutral-200 mb-6">
                      <p className="text-[11px] font-black uppercase tracking-wider text-neutral-500">
                        Session Highlights:
                      </p>
                      {session.features.map((feat, idx) => (
                        <div key={idx} className="flex items-start gap-2 text-xs font-bold text-neutral-800">
                          <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5 stroke-[3]" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleSelectService(session.id, session.serviceName, "mentorship")}
                    className="btn-brutal btn-brutal-yellow w-full py-3.5 text-xs sm:text-sm uppercase font-black tracking-wide"
                  >
                    <span>Book Session ({session.priceUSD} / {session.priceINR}) ↑</span>
                  </button>
                </div>
              );
            })}
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════
            SECTION 3: HIRE ME AS (CUSTOM FREELANCE WORK)
        ══════════════════════════════════════════════════════════ */}
        <section className="mb-20 pt-8 border-t-2 border-neutral-200">
          <div className="text-center max-w-3xl mx-auto mb-10">
            <div className="inline-block px-3 py-1 rounded-full border-2 border-black bg-yellow-300 text-black font-black text-xs uppercase tracking-wider mb-3 shadow-brutal-xs">
              FREELANCE &amp; CONTRACT ROLES
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-black font-display tracking-tight">
              Hire Me For Your Projects
            </h2>
            <p className="text-xs sm:text-sm text-neutral-600 font-bold mt-2">
              Depend upon work fees will charge. Custom quotes tailored to your scope, technical requirements, and delivery milestones.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {freelanceRoles.map((role) => {
              const isSelected = selectedService === role.id;
              return (
                <div
                  key={role.id}
                  className={`rounded-3xl border-[3.5px] border-black bg-white p-7 shadow-brutal flex flex-col justify-between transition-all hover-lift ${
                    isSelected ? "ring-4 ring-blue-500 -translate-y-1" : ""
                  }`}
                >
                  <div>
                    <div className="flex items-start justify-between gap-3 mb-4">
                      <div className="w-12 h-12 rounded-2xl border-2 border-black bg-neutral-100 flex items-center justify-center shadow-brutal-xs">
                        {role.icon}
                      </div>
                      <span className="px-3 py-1 rounded-full border-2 border-black bg-yellow-200 text-black font-black text-[10px] uppercase tracking-wider shadow-brutal-xs">
                        {role.badge}
                      </span>
                    </div>

                    <h3 className="text-2xl font-black text-black font-display tracking-tight mb-1">
                      {role.title}
                    </h3>
                    <p className="text-xs font-bold text-blue-700 mb-3">
                      {role.role}
                    </p>

                    <div className="p-3.5 rounded-2xl border-2 border-black bg-amber-50 mb-5 flex items-center gap-2.5">
                      <DollarSign className="w-4 h-4 text-amber-700 shrink-0 stroke-[2.5]" />
                      <p className="text-xs font-bold text-amber-900">
                        {role.pricingNote}
                      </p>
                    </div>

                    <p className="text-xs text-neutral-700 leading-relaxed font-medium mb-5">
                      {role.description}
                    </p>

                    <div className="space-y-2 pt-4 border-t-2 border-neutral-200 mb-6">
                      <p className="text-[11px] font-black uppercase tracking-wider text-neutral-500">
                        Core Deliverables:
                      </p>
                      {role.deliverables.map((item, idx) => (
                        <div key={idx} className="flex items-start gap-2 text-xs font-bold text-neutral-800">
                          <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5 stroke-[2.5]" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleSelectService(role.id, role.serviceName, "freelance")}
                    className="btn-brutal btn-brutal-primary w-full py-3.5 text-xs sm:text-sm uppercase font-black tracking-wide"
                  >
                    <span>Hire For This Role / Get Quote ↑</span>
                  </button>
                </div>
              );
            })}
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════
            SECTION 4: TRUST & PROOF OF WORK
        ══════════════════════════════════════════════════════════ */}
        <div className="rounded-3xl border-[3.5px] border-black bg-neutral-900 text-white p-8 sm:p-10 shadow-brutal mb-16">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <h3 className="text-2xl sm:text-3xl font-black font-display tracking-tight text-yellow-300">
              Why Work &amp; Learn with Raghav?
            </h3>
            <p className="text-xs sm:text-sm text-neutral-400 font-bold mt-1">
              Battle-tested cybersecurity researcher, mentor, and developer.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-center">
            <div className="p-4 rounded-2xl border-2 border-white/20 bg-neutral-800/80">
              <p className="text-3xl sm:text-4xl font-black text-yellow-300 font-display">
                50+
              </p>
              <p className="text-xs font-bold text-neutral-300 mt-1">
                Organizations Secured (NASA, Swiggy, Jio, Zepto)
              </p>
            </div>
            <div className="p-4 rounded-2xl border-2 border-white/20 bg-neutral-800/80">
              <p className="text-3xl sm:text-4xl font-black text-emerald-400 font-display">
                1,000+
              </p>
              <p className="text-xs font-bold text-neutral-300 mt-1">
                Students &amp; Developers Mentored in Tech
              </p>
            </div>
            <div className="p-4 rounded-2xl border-2 border-white/20 bg-neutral-800/80">
              <p className="text-3xl sm:text-4xl font-black text-blue-400 font-display">
                100%
              </p>
              <p className="text-xs font-bold text-neutral-300 mt-1">
                Live Screen Sharing &amp; Recorded Sessions
              </p>
            </div>
            <div className="p-4 rounded-2xl border-2 border-white/20 bg-neutral-800/80">
              <p className="text-3xl sm:text-4xl font-black text-purple-400 font-display">
                12h
              </p>
              <p className="text-xs font-bold text-neutral-300 mt-1">
                Fast Turnaround on Inquiries &amp; Quotes
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
