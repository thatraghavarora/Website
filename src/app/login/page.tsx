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
    <div className="min-h-screen bg-neutral-50 sm:bg-neutral-100/70 flex flex-col justify-center items-center px-4 py-8 sm:py-12">
      <Suspense fallback={<div className="w-full max-w-[410px] h-[580px] bg-white rounded-3xl animate-pulse" />}>
        <LoginContent />
      </Suspense>
    </div>
  );
}
