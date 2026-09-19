"use client";

import React, { useState } from "react";
import {
  Mail,
  MapPin,
  Clock,
  Send,
  CheckCircle2,
  Sparkles
} from "lucide-react";
import { siteProfile } from "@/data/siteData";
import { CrownDoodle, SquiggleDoodle } from "@/components/Doodles";
import {
  LinkedinIcon,
  InstagramIcon,
  GithubIcon,
  YoutubeIcon
} from "@/components/SocialIcons";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    service: "Cyber Security & VAPT",
    message: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name && formData.email && formData.message) {
      setSubmitted(true);
    }
  };

  return (
    <div className="py-12 sm:py-16 bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mb-12">
          <div className="inline-block px-3.5 py-1 rounded-full border-2 border-black bg-yellow-300 shadow-brutal-sm font-black text-xs uppercase tracking-wider text-black mb-4">
            GET IN TOUCH
          </div>
          <div className="flex items-center gap-3">
            <h1 className="text-4xl sm:text-6xl font-black text-black font-display tracking-tight">
              Let&apos;s Build Together
            </h1>
            <CrownDoodle className="w-10 h-10 hidden sm:block -rotate-12" />
          </div>
          <p className="text-base sm:text-lg text-neutral-700 font-medium mt-4 leading-relaxed">
            Have a project in mind, need a security vulnerability audit, or want to collaborate on educational content? Drop a message below.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left Column: Contact Details & Info Cards */}
          <div className="lg:col-span-5 space-y-6">
            <div className="rounded-3xl border-[3.5px] border-black bg-blue-100 p-8 shadow-brutal">
              <h2 className="text-2xl font-black text-black font-display mb-6">
                Direct Contact Information
              </h2>

              <div className="space-y-5">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-white border-2 border-black flex items-center justify-center shadow-brutal-sm shrink-0">
                    <Mail className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-neutral-600 uppercase">
                      Email Address
                    </p>
                    <a
                      href={`mailto:${siteProfile.socials.email}`}
                      className="font-display font-black text-base text-black hover:text-blue-700 underline"
                    >
                      {siteProfile.socials.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-white border-2 border-black flex items-center justify-center shadow-brutal-sm shrink-0">
                    <MapPin className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-neutral-600 uppercase">
                      Location
                    </p>
                    <p className="font-display font-black text-base text-black">
                      Jaipur, Rajasthan, India
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-white border-2 border-black flex items-center justify-center shadow-brutal-sm shrink-0">
                    <Clock className="w-5 h-5 text-emerald-600" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-neutral-600 uppercase">
                      Response Time
                    </p>
                    <p className="font-display font-black text-base text-black">
                      Under 24 Hours
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Grid Card */}
            <div className="rounded-3xl border-[3.5px] border-black bg-[#FEF08A] p-8 shadow-brutal">
              <h3 className="text-xl font-black text-black font-display mb-4">
                Connect on Socials
              </h3>
              <p className="text-xs font-bold text-neutral-700 mb-6">
                Follow @thatraghavarora across the web for daily cybersecurity insights:
              </p>

              <div className="grid grid-cols-2 gap-3">
                <a
                  href={siteProfile.socials.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-xl border-2 border-black bg-white shadow-brutal-sm font-black text-xs flex items-center gap-2 hover:-translate-y-0.5 transition-transform"
                >
                  <LinkedinIcon className="w-4 h-4 fill-current text-blue-700" />
                  <span>LinkedIn</span>
                </a>
                <a
                  href={siteProfile.socials.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-xl border-2 border-black bg-white shadow-brutal-sm font-black text-xs flex items-center gap-2 hover:-translate-y-0.5 transition-transform"
                >
                  <GithubIcon className="w-4 h-4 text-black" />
                  <span>GitHub</span>
                </a>
                <a
                  href={siteProfile.socials.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-xl border-2 border-black bg-white shadow-brutal-sm font-black text-xs flex items-center gap-2 hover:-translate-y-0.5 transition-transform"
                >
                  <InstagramIcon className="w-4 h-4 text-pink-600" />
                  <span>Instagram</span>
                </a>
                <a
                  href={siteProfile.socials.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-xl border-2 border-black bg-white shadow-brutal-sm font-black text-xs flex items-center gap-2 hover:-translate-y-0.5 transition-transform"
                >
                  <YoutubeIcon className="w-4 h-4 text-red-600" />
                  <span>YouTube</span>
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-7">
            <div className="rounded-3xl border-[3.5px] border-black bg-white p-8 sm:p-12 shadow-brutal-xl">
              {submitted ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 rounded-full bg-emerald-100 border-[3px] border-black flex items-center justify-center mx-auto mb-4 shadow-brutal">
                    <CheckCircle2 className="w-8 h-8 text-emerald-600" />
                  </div>
                  <h3 className="text-3xl font-black text-black font-display mb-2">
                    Message Received!
                  </h3>
                  <p className="text-base text-neutral-700 font-medium max-w-md mx-auto mb-6">
                    Thank you for reaching out, {formData.name}. Raghav will get back to you within 24 hours.
                  </p>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({ name: "", email: "", service: "Cyber Security & VAPT", message: "" });
                    }}
                    className="btn-brutal btn-brutal-primary px-6 py-2.5 text-xs uppercase tracking-wider"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block font-black text-xs uppercase tracking-wider text-black mb-2">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Aman Verma"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      className="w-full px-4 py-3 rounded-xl border-2 border-black bg-neutral-50 shadow-brutal-sm font-bold text-sm focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-blue-600"
                    />
                  </div>

                  <div>
                    <label className="block font-black text-xs uppercase tracking-wider text-black mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. aman@company.com"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      className="w-full px-4 py-3 rounded-xl border-2 border-black bg-neutral-50 shadow-brutal-sm font-bold text-sm focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-blue-600"
                    />
                  </div>

                  <div>
                    <label className="block font-black text-xs uppercase tracking-wider text-black mb-2">
                      Project or Inquiry Type
                    </label>
                    <select
                      value={formData.service}
                      onChange={(e) =>
                        setFormData({ ...formData, service: e.target.value })
                      }
                      className="w-full px-4 py-3 rounded-xl border-2 border-black bg-neutral-50 shadow-brutal-sm font-bold text-sm focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-blue-600"
                    >
                      <option>Cyber Security &amp; VAPT Audit</option>
                      <option>Full Stack Web App Development</option>
                      <option>Digital Marketing &amp; SEO Strategy</option>
                      <option>Online Course / Corporate Training</option>
                      <option>General Collaboration or Speaking</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-black text-xs uppercase tracking-wider text-black mb-2">
                      Message / Project Scope *
                    </label>
                    <textarea
                      required
                      rows={5}
                      placeholder="Tell me about your target application, timeline, goals..."
                      value={formData.message}
                      onChange={(e) =>
                        setFormData({ ...formData, message: e.target.value })
                      }
                      className="w-full px-4 py-3 rounded-xl border-2 border-black bg-neutral-50 shadow-brutal-sm font-bold text-sm focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-blue-600"
                    />
                  </div>

                  <button
                    type="submit"
                    className="btn-brutal btn-brutal-primary w-full py-4 text-base uppercase tracking-wider font-black"
                  >
                    <span>Send Message</span>
                    <Send className="w-4 h-4" />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
