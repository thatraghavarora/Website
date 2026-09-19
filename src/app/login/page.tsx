"use client";

import React, { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import AuthCard from "@/components/AuthCard";

function LoginContent() {
  const searchParams = useSearchParams();
  const mode = searchParams.get("mode") === "signup" ? "signup" : "login";
  return <AuthCard initialMode={mode} />;
}

export default function LoginPage() {
  return (
    <div
      className="min-h-screen flex flex-col justify-center items-center px-4 py-12 relative overflow-hidden"
      style={{ backgroundColor: "#0a0a0a" }}
    >
      {/* Decorative grid background */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage: "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />
      {/* Purple glow top-right */}
      <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-purple-700 opacity-20 blur-3xl pointer-events-none" />
      {/* Yellow glow bottom-left */}
      <div className="absolute -bottom-32 -left-32 w-96 h-96 rounded-full bg-yellow-400 opacity-10 blur-3xl pointer-events-none" />

      <Suspense fallback={
        <div className="w-full max-w-[440px] h-[600px] bg-white rounded-3xl border-[3px] border-black shadow-brutal-xl animate-pulse" />
      }>
        <LoginContent />
      </Suspense>

      {/* Bottom brand text */}
      <p className="mt-8 text-[11px] font-bold text-neutral-600 text-center">
        © 2025 thatraghavarora.in · Built by Raghav Arora
      </p>
    </div>
  );
}
