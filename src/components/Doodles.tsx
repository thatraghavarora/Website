import React from "react";

export function CrownDoodle({ className = "w-8 h-8 text-black" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 64 48"
      fill="currentColor"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path
        d="M6 38 L14 14 L28 26 L32 10 L36 26 L50 14 L58 38 Z"
        fill="#FDE047"
        stroke="#000000"
        strokeWidth="3.5"
      />
      <circle cx="14" cy="13" r="3" fill="#000000" />
      <circle cx="32" cy="9" r="3" fill="#000000" />
      <circle cx="50" cy="13" r="3" fill="#000000" />
      <line x1="6" y1="38" x2="58" y2="38" stroke="#000000" strokeWidth="4" />
    </svg>
  );
}

export function SquiggleDoodle({ className = "w-20 h-4 text-blue-600" }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 20" fill="none" className={className}>
      <path
        d="M4 12 Q 24 3, 44 13 T 84 11 T 116 13"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinecap="round"
      />
      <path
        d="M20 16 Q 40 7, 60 17 T 100 15"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        opacity="0.6"
      />
    </svg>
  );
}

export function LightningDoodle({ className = "w-6 h-6 text-yellow-400" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" stroke="#000000" strokeWidth="1.5" className={className}>
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
    </svg>
  );
}

export function SparkleDoodle({ className = "w-5 h-5 text-black" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M12 0L14 9L23 12L14 15L12 24L10 15L1 12L10 9L12 0Z" />
    </svg>
  );
}

export function ArrowHandDrawn({ className = "w-12 h-12 text-black" }: { className?: string }) {
  return (
    <svg viewBox="0 0 60 60" fill="none" className={className}>
      <path
        d="M8 50 C 18 35, 30 20, 50 12 M 50 12 L 35 12 M 50 12 L 48 27"
        stroke="currentColor"
        strokeWidth="3.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function LightbulbDoodle({ className = "w-8 h-8 text-yellow-400" }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" fill="none" className={className}>
      <circle cx="16" cy="14" r="8" fill="#FEF08A" stroke="#000000" strokeWidth="2.5" />
      <path d="M12 22 H20 M13 25 H19 M14 28 H18" stroke="#000000" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M16 3 V1 M7 6 L5 4 M25 6 L27 4 M3 14 H1 M31 14 H29" stroke="#000000" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
}

export function SmileyDoodle({ className = "w-7 h-7 text-black" }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" fill="none" className={className}>
      <circle cx="16" cy="16" r="13" stroke="#000000" strokeWidth="2.5" fill="#FEF08A" />
      <circle cx="11" cy="13" r="2" fill="#000000" />
      <circle cx="21" cy="13" r="2" fill="#000000" />
      <path d="M10 20 C 12 24, 20 24, 22 20" stroke="#000000" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
}

export function ShieldDoodle({ className = "w-6 h-6 text-purple-600" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" stroke="#000000" strokeWidth="2" className={className}>
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  );
}
