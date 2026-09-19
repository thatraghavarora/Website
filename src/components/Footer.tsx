"use client";

import React from "react";
import Link from "next/link";
import { Heart } from "lucide-react";
import { siteProfile } from "@/data/siteData";
import {
  LinkedinIcon,
  InstagramIcon,
  GithubIcon,
  XTwitterIcon,
  YoutubeIcon
} from "./SocialIcons";

export default function Footer() {
  return (
    <footer
      className="border-t-[3.5px] border-black pt-12 pb-8"
      style={{ backgroundColor: "var(--bg-card)", color: "var(--fg)" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 pb-10 border-b-2"
          style={{ borderColor: "var(--border-soft)" }}
        >
          {/* Logo & Tagline */}
          <div>
            <Link
              href="/"
              className="flex items-center gap-2 text-2xl font-black group"
              style={{ color: "var(--fg)" }}
            >
              <span className="bg-black text-white px-2 py-0.5 rounded-md font-mono text-base font-black group-hover:bg-blue-600 transition-colors">
                &lt;/&gt;
              </span>
              <span>{siteProfile.brand}</span>
            </Link>
            <p className="font-hand font-bold text-base sm:text-lg mt-2" style={{ color: "var(--fg-muted)" }}>
              Same Curious Mind.{" "}
              <span className="text-blue-500">Bigger Impact.</span>
            </p>

            {/* Play Store Badge — Coming Soon */}
            <div className="mt-4 inline-flex items-center gap-3 px-4 py-2.5 rounded-2xl border-[2.5px] border-black shadow-brutal-sm relative cursor-not-allowed select-none"
              style={{ backgroundColor: "var(--bg-card)", borderColor: "var(--border)" }}
              title="Android app coming soon!"
            >
              {/* Google Play Icon (SVG) */}
              <svg viewBox="0 0 24 24" className="w-7 h-7 shrink-0" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3.18 23.76c.31.17.67.2 1.01.07l12.44-7.18-2.79-2.79L3.18 23.76Z" fill="#EA4335"/>
                <path d="M22.04 10.31 19.3 8.74l-3.09 3.09 3.09 3.09 2.76-1.59a1.56 1.56 0 0 0 0-3.02Z" fill="#FBBC04"/>
                <path d="M4.19.17A1.54 1.54 0 0 0 3 1.74v20.52c0 .65.38 1.22.96 1.5L13.85 13.9 4.19.17Z" fill="#4285F4"/>
                <path d="M4.19.17 13.85 9.83l2.36-2.36L4.77.08A1.54 1.54 0 0 0 4.19.17Z" fill="#34A853"/>
              </svg>

              <div className="text-left">
                <p className="text-[10px] font-bold uppercase tracking-widest" style={{ color: "var(--fg-subtle)" }}>
                  GET IT ON
                </p>
                <p className="text-sm font-black leading-tight" style={{ color: "var(--fg)" }}>
                  Google Play
                </p>
              </div>

              {/* Coming Soon tag */}
              <span className="absolute -top-2.5 -right-2.5 bg-yellow-300 text-black text-[9px] font-black px-2 py-0.5 rounded-full border-[1.5px] border-black uppercase tracking-wider">
                Soon
              </span>
            </div>
          </div>

          {/* Nav Links */}
          <nav className="flex flex-wrap items-center gap-6 font-bold text-sm" style={{ color: "var(--fg-muted)" }}>
            {[
              { href: "/", label: "Home" },
              { href: "/about", label: "About" },
              // { href: "/gallery", label: "Gallery" },
              { href: "/courses", label: "Courses" },
              { href: "/roadmap", label: "Roadmap" },
              { href: "/hire-me", label: "Hire Me" },
              { href: "/blog", label: "Blog" },
              { href: "/dashboard", label: "Dashboard" },
              { href: "/admin", label: "Admin" },
              { href: "/contact", label: "Contact" },
            ].map(({ href, label }) => (
              <Link key={href} href={href} className="hover:text-blue-500 transition-colors">
                {label}
              </Link>
            ))}
          </nav>

          {/* Social Icons */}
          <div className="flex items-center gap-2.5">
            {[
              { href: siteProfile.socials.linkedin, label: "LinkedIn",  el: <LinkedinIcon className="w-4 h-4 fill-current text-blue-600" /> },
              { href: siteProfile.socials.instagram, label: "Instagram", el: <InstagramIcon className="w-4 h-4" /> },
              { href: siteProfile.socials.github,    label: "GitHub",    el: <GithubIcon   className="w-4 h-4" /> },
              { href: siteProfile.socials.x,         label: "X",         el: <XTwitterIcon className="w-4 h-4" /> },
              { href: siteProfile.socials.youtube,   label: "YouTube",   el: <YoutubeIcon  className="w-4 h-4 text-red-500" /> },
            ].map(({ href, label, el }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="w-9 h-9 rounded-lg border-2 border-black flex items-center justify-center shadow-brutal-sm hover:-translate-y-0.5 transition-all"
                style={{ backgroundColor: "var(--bg-card)", color: "var(--fg)", borderColor: "var(--border)" }}
              >
                {el}
              </a>
            ))}
          </div>
        </div>

        {/* Copyright */}
        <div
          className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs font-bold gap-3"
          style={{ color: "var(--fg-subtle)" }}
        >
          <p className="flex items-center gap-1.5">
            <span>Made with</span>
            <Heart className="w-3.5 h-3.5 fill-red-500 text-red-500 inline" />
            <span>by Raghav Arora</span>
          </p>
          <p>© {new Date().getFullYear()} thatraghavarora. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
