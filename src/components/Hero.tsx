"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { CrownDoodle, LightningDoodle } from "./Doodles";
import {
  LinkedinIcon,
  InstagramIcon,
  GithubIcon,
  YoutubeIcon,
  XTwitterIcon
} from "./SocialIcons";
import HeroCloudBlob from "./HeroCloudBlob";
import { siteProfile } from "@/data/siteData";

export default function Hero() {
  return (
    <section
      className="relative overflow-hidden pt-6 pb-12 lg:pt-10 lg:pb-16"
      style={{ backgroundColor: "var(--bg)" }}
    >
      {/* Purple cloud blob — desktop only */}
      <HeroCloudBlob className="absolute top-0 right-0 w-[58%] h-full hidden md:block" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/*
          MOBILE: flex-col-reverse so IMAGE comes FIRST, CONTENT below
          DESKTOP: side-by-side grid (lg:grid-cols-12)
        */}
        <div className="flex flex-col-reverse lg:grid lg:grid-cols-12 gap-8 lg:gap-4 items-center">

          {/* =====================================================
              LEFT COLUMN — Typography, Badge, Bio, Buttons, Socials
              On mobile this renders SECOND (bottom) due to flex-col-reverse
              ===================================================== */}
          <div className="lg:col-span-6 flex flex-col items-start z-10 w-full">

            {/* Hi, I'm RAGHAV ARORA — single-line on mobile */}
            <div className="relative mb-1">
              <p
                className="text-lg sm:text-3xl font-black tracking-tight font-display whitespace-nowrap"
                style={{ color: "var(--fg)" }}
              >
                HI, I&apos;M RAGHAV{" "}
                <span className="relative inline-block">
                  <span className="absolute inset-x-[-6px] inset-y-[-2px] bg-[#6D28D9] rounded-xl -rotate-1 shadow-brutal-sm -z-10" />
                  <span className="text-white px-1.5 drop-shadow-[2px_2px_0px_rgba(0,0,0,1)]">ARORA</span>
                </span>
              </p>
              <div className="absolute -top-6 right-0 sm:-top-6 sm:left-auto transform -rotate-12 pointer-events-none">
                <CrownDoodle className="w-8 h-7 sm:w-12 sm:h-9 text-yellow-400 animate-float-slow" />
              </div>
            </div>

            {/* Giant Heading — desktop only */}
            <h1
              className="hidden sm:block text-7xl lg:text-[5.4rem] font-black tracking-tight leading-[0.92] mb-5 select-none font-display"
              style={{ color: "var(--fg)" }}
            >
              RAGHAV
              <br />
              <span className="relative inline-block mt-2">
                {/* Purple highlight behind ARORA */}
                <span className="absolute inset-x-[-10px] inset-y-[-2px] bg-[#6D28D9] rounded-2xl -rotate-1 shadow-brutal-sm -z-10" />
                <span className="text-white px-2 drop-shadow-[2px_2px_0px_rgba(0,0,0,1)]">
                  ARORA
                </span>
                <span className="absolute -right-7 bottom-2 text-xs font-mono-code font-black text-purple-400 hidden sm:inline">
                  &lt;/&gt;
                </span>
              </span>
            </h1>
            {/* Spacer on mobile to keep layout consistent */}
            <div className="block sm:hidden mb-5" />

            {/* Role Badge */}
            <div
              className="w-full sm:w-auto border-[2.5px] border-black rounded-2xl px-4 py-3 sm:px-5 sm:py-3.5 shadow-brutal-sm mb-5 hover:shadow-brutal transition-all"
              style={{ backgroundColor: "var(--bg-card)" }}
            >
              <p
                className="text-xs sm:text-base font-extrabold leading-snug tracking-tight"
                style={{ color: "var(--fg)" }}
              >
                Cyber Security Enthusiast{" "}
                <span className="text-purple-500 font-black">|</span> Full Stack Developer
              </p>
              <p className="text-[11px] sm:text-sm font-bold leading-snug mt-0.5" style={{ color: "var(--fg-muted)" }}>
                Bug Bounty Hunter{" "}
                <span className="text-blue-500 font-black">|</span> Educator{" "}
                <span className="text-yellow-500 font-black">|</span> Entrepreneur
              </p>
            </div>

            {/* Description */}
            <p
              className="text-sm sm:text-base font-medium max-w-lg leading-relaxed mb-6"
              style={{ color: "var(--fg-muted)" }}
            >
              Building secure digital experiences and helping the next generation learn cyber security &amp; development.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-3.5 mb-6 w-full sm:w-auto">
              <a
                href="#"
                className="btn-brutal btn-brutal-primary px-7 py-3 text-sm font-black tracking-wide w-full sm:w-auto text-center justify-center"
                id="hero-hire-me-btn"
              >
                <span>Hire Me</span>
                <ArrowRight className="w-4 h-4 stroke-[2.5]" />
              </a>
              <Link
                href="/courses"
                className="btn-brutal btn-brutal-white px-7 py-3 text-sm font-black w-full sm:w-auto text-center justify-center"
                id="hero-explore-courses-btn"
              >
                Explore Courses
              </Link>
            </div>

            {/* Social Icons */}
            <div className="flex items-center gap-2 sm:gap-2.5 flex-wrap">
              {[
                { href: siteProfile.socials.linkedin, label: "LinkedIn", icon: <LinkedinIcon className="w-4 h-4 fill-current text-blue-700" />, hover: "hover:bg-blue-50" },
                { href: siteProfile.socials.instagram, label: "Instagram", icon: <InstagramIcon className="w-4 h-4" />, hover: "hover:bg-pink-50" },
                { href: siteProfile.socials.github, label: "GitHub", icon: <GithubIcon className="w-4 h-4" />, hover: "hover:bg-neutral-100" },
                { href: siteProfile.socials.x, label: "X (Twitter)", icon: <XTwitterIcon className="w-3.5 h-3.5" />, hover: "hover:bg-sky-50" },
                { href: siteProfile.socials.youtube, label: "YouTube", icon: <YoutubeIcon className="w-4 h-4 text-red-600" />, hover: "hover:bg-red-50" },
              ].map(({ href, label, icon, hover }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className={`w-9 h-9 sm:w-10 sm:h-10 rounded-xl border-2 border-black flex items-center justify-center shadow-brutal-sm hover:-translate-y-0.5 ${hover} transition-all`}
                  style={{ backgroundColor: "var(--bg-card)", color: "var(--fg)" }}
                >
                  {icon}
                </a>
              ))}
            </div>
          </div>

          {/* =====================================================
              RIGHT COLUMN — Character illustration
              On mobile this renders FIRST (top) due to flex-col-reverse
              ===================================================== */}
          <div className="lg:col-span-6 relative flex justify-center lg:justify-end items-center min-h-[260px] sm:min-h-[380px] lg:min-h-[560px] w-full">

            {/* Mobile radiant glow aura */}
            <div className="absolute inset-0 bg-gradient-to-tr from-purple-600/25 via-blue-600/15 to-transparent rounded-full blur-3xl -z-10 animate-pulse-glow md:hidden" />

            {/* Hand-written annotation */}
            <div className="absolute top-2 left-0 sm:left-4 z-20 pointer-events-none select-none">
              <p className="font-hand font-bold text-xs sm:text-sm text-black dark:text-white leading-tight -rotate-6">
                SECURE
                <br />• LEARN
                <br />• BUILD
                <br />GROW ➔
              </p>
            </div>

            {/* Doodle accents */}
            <div className="absolute top-8 sm:top-12 right-2 z-20 pointer-events-none animate-float-slow">
              <LightningDoodle className="w-7 h-7 sm:w-8 sm:h-8 text-yellow-300" />
            </div>
            <div className="absolute top-16 sm:top-24 -left-2 sm:-left-4 z-20 pointer-events-none animate-pulse-glow">
              <LightningDoodle className="w-6 h-6 sm:w-7 sm:h-7 text-black dark:text-purple-400 -rotate-12" />
            </div>

            {/* Hero character image */}
            <div className="relative w-full max-w-[340px] sm:max-w-[480px] lg:max-w-[620px] aspect-[1536/1024] z-10">
              <Image
                src="/images/hero-ui.png"
                alt="Raghav Arora - Illustrated Hacker Character"
                fill
                priority
                className="object-contain object-bottom drop-shadow-xl hover:scale-105 transition-transform duration-300"
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
