"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Moon, Sun, User, Menu, X, Terminal, LogOut, LayoutDashboard } from "lucide-react";
import { logoutUser } from "@/lib/authClient";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const pathname = usePathname();

  const navLinks = [
    { href: "/",        label: "Home"     },
    { href: "/about",   label: "About"    },
    // { href: "/gallery", label: "Gallery"  },
    { href: "/courses", label: "Courses"  },
    { href: "/roadmap", label: "Roadmap"  },
    { href: "/hire-me", label: "Hire Me"  },
    { href: "/blog",    label: "Blog"     },
    { href: "/contact", label: "Contact"  },
  ];

  // Check auth state for dynamically showing Dashboard / Logout
  useEffect(() => {
    fetch("/api/auth")
      .then((res) => res.json())
      .then((data) => {
        if (data.user) {
          setCurrentUser(data.user);
        } else {
          setCurrentUser(null);
        }
      })
      .catch(() => {
        setCurrentUser(null);
      });
  }, [pathname]);

  // Check if a link is active — exact match for "/" else startsWith
  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  // Persist dark mode preference
  useEffect(() => {
    const saved = localStorage.getItem("darkMode");
    if (saved === "true") {
      setDarkMode(true);
      document.documentElement.classList.add("dark");
    }
  }, []);

  const toggleDarkMode = () => {
    const next = !darkMode;
    setDarkMode(next);
    if (next) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("darkMode", "true");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("darkMode", "false");
    }
  };

  return (
    <header className="sticky top-0 z-50 backdrop-blur-sm border-b-[3px] border-black transition-colors"
      style={{ backgroundColor: "var(--nav-bg)" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 sm:h-16 flex items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 group text-lg sm:text-xl font-black tracking-tight"
          style={{ color: "var(--fg)" }}
          id="nav-logo"
        >
          <span className="bg-black text-white px-2 py-0.5 rounded-md font-mono text-sm sm:text-base font-black group-hover:bg-blue-600 transition-colors">
            &lt;/&gt;
          </span>
          <span className="group-hover:text-blue-600 transition-colors">
            thatraghavarora
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-5 lg:gap-6 text-sm font-bold" style={{ color: "var(--fg-muted)" }}>
          {navLinks.map(({ href, label }) => {
            const active = isActive(href);
            return (
              <Link
                key={href}
                href={href}
                className={`relative py-1 transition-colors hover:-translate-y-0.5 ${
                  active ? "text-blue-600" : "hover:text-blue-600"
                }`}
              >
                {label}
                {/* Active underline */}
                <span
                  className={`absolute bottom-0 left-0 w-full h-[2.5px] rounded-full transition-all duration-200 ${
                    active ? "bg-blue-600 scale-x-100" : "bg-transparent scale-x-0"
                  }`}
                />
              </Link>
            );
          })}
        </nav>

        {/* Right CTA & Dark Mode Toggle */}
        <div className="hidden md:flex items-center gap-3">
          <button
            onClick={toggleDarkMode}
            aria-label="Toggle dark mode"
            className="w-9 h-9 rounded-full border-2 border-black flex items-center justify-center shadow-brutal-xs hover:-translate-y-0.5 hover:shadow-brutal-sm transition-all"
            style={{ backgroundColor: "var(--bg-card)", color: "var(--fg)" }}
            id="theme-toggle-btn"
          >
            {darkMode
              ? <Sun className="w-4 h-4 text-amber-400" />
              : <Moon className="w-4 h-4" style={{ color: "var(--fg)" }} />}
          </button>



          {currentUser ? (
            <div className="flex items-center gap-2">
              <Link
                href="/dashboard"
                className="btn-brutal btn-brutal-primary px-3 py-1.5 text-xs sm:text-sm font-black flex items-center gap-1.5"
                id="nav-dashboard-btn"
              >
                <LayoutDashboard className="w-3.5 h-3.5" />
                <span>Dashboard</span>
              </Link>
              <button
                onClick={() => logoutUser()}
                className="px-3 py-1.5 rounded-xl border-2 border-black bg-rose-100 hover:bg-rose-200 text-rose-800 text-xs font-black uppercase tracking-wider flex items-center gap-1.5 transition-all shadow-brutal-xs hover:shadow-brutal-sm cursor-pointer"
                title="Log Out"
                id="nav-logout-btn"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Log Out</span>
              </button>
            </div>
          ) : (
            <Link
              href="/login"
              className="btn-brutal btn-brutal-primary px-3.5 py-1.5 text-xs sm:text-sm font-black"
              id="nav-auth-btn"
            >
              <User className="w-3.5 h-3.5" /> Login / Sign Up
            </Link>
          )}
        </div>

        {/* Mobile: theme + hamburger */}
        <div className="flex md:hidden items-center gap-2">

          <button
            onClick={toggleDarkMode}
            aria-label="Toggle theme"
            className="w-8 h-8 rounded-full border-2 border-black flex items-center justify-center shadow-brutal-xs"
            style={{ backgroundColor: "var(--bg-card)" }}
          >
            {darkMode
              ? <Sun className="w-4 h-4 text-amber-400" />
              : <Moon className="w-4 h-4" style={{ color: "var(--fg)" }} />}
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-1.5 border-2 border-black rounded-lg bg-yellow-300 shadow-brutal-xs text-black"
            aria-label="Toggle mobile menu"
            id="mobile-menu-toggle"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile dropdown drawer */}
      {mobileMenuOpen && (
        <div
          className="md:hidden border-t-[3px] border-black px-6 py-6 space-y-4 animate-in slide-in-from-top duration-200"
          style={{ backgroundColor: "var(--bg-secondary)" }}
        >
          <div className="flex flex-col space-y-3 font-extrabold text-lg">
            {[
              { href: "/",         label: "Home",         icon: <Terminal className="w-4 h-4 text-blue-600" /> },
              { href: "/about",    label: "About Raghav"  },
              // { href: "/gallery",  label: "Gallery"       },
              { href: "/courses",  label: "Courses"       },
              { href: "/roadmap",  label: "Roadmap"       },
              { href: "/hire-me",  label: "Hire Me / 1:1" },
              { href: "/blog",     label: "Blog"          },
            ].map(({ href, label, icon }) => {
              const active = isActive(href);
              return (
                <Link
                  key={href}
                  href={href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`px-4 py-2 border-2 rounded-xl shadow-brutal-sm flex items-center justify-between transition-colors ${
                    active ? "border-blue-600 border-l-4" : "border-black"
                  }`}
                  style={{
                    backgroundColor: "var(--bg-card)",
                    color: active ? "#2563EB" : "var(--fg)",
                  }}
                >
                  <span>{label}</span>
                  {icon}
                </Link>
              );
            })}

            {currentUser ? (
              <div className="pt-2 space-y-2">
                <Link
                  href="/dashboard"
                  onClick={() => setMobileMenuOpen(false)}
                  className="btn-brutal btn-brutal-primary w-full py-3 text-center flex items-center justify-center gap-2"
                >
                  <LayoutDashboard className="w-4 h-4" /> Go to Dashboard
                </Link>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    logoutUser();
                  }}
                  className="w-full py-3 rounded-xl border-2 border-black bg-rose-500 text-white font-black text-sm uppercase tracking-wider shadow-brutal flex items-center justify-center gap-2 cursor-pointer"
                >
                  <LogOut className="w-4 h-4" /> Log Out
                </button>
              </div>
            ) : (
              <Link
                href="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="btn-brutal btn-brutal-primary w-full py-3 mt-2 text-center flex items-center justify-center gap-2"
              >
                <User className="w-4 h-4" /> Login / Sign Up
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
