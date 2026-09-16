import React from "react";
import Hero from "@/components/Hero";
import StatsStrip from "@/components/StatsStrip";
import TrustStrip from "@/components/TrustStrip";
import WhatIDo from "@/components/WhatIDo";
import AboutSection from "@/components/AboutSection";
import SkillsSection from "@/components/SkillsSection";
// import FeaturedGallery from "@/components/FeaturedGallery";
import CourseBanner from "@/components/CourseBanner";
import Testimonials from "@/components/Testimonials";
import BlogSection from "@/components/BlogSection";
import CTASection from "@/components/CTASection";

export default function HomePage() {
  return (
    <div className="w-full">
      <Hero />
      <StatsStrip />
      <TrustStrip />
      <WhatIDo />
      <AboutSection />
      <SkillsSection />
      {/* <FeaturedGallery /> */}
      <CourseBanner />
      <Testimonials />
      <BlogSection />
      <CTASection />
    </div>
  );
}
