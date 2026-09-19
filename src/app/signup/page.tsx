"use client";

import React, { Suspense } from "react";
import AuthCard from "@/components/AuthCard";

export default function SignupPage() {
  return (
    <div className="min-h-screen bg-neutral-50 sm:bg-neutral-100/70 flex flex-col justify-center items-center px-4 py-8 sm:py-12">
      <Suspense fallback={<div className="w-full max-w-[410px] h-[580px] bg-white rounded-3xl animate-pulse" />}>
        <AuthCard initialMode="signup" />
      </Suspense>
    </div>
  );
}
