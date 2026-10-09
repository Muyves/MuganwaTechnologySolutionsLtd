import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import type { Metadata } from 'next';
import { 
  ShieldCheck, 
  Award, 
  Wrench, 
  Users, 
  CheckCircle2, 
  ArrowRight,
  Lock,
  Globe,
  Server,
  Zap,
  Wind,
  Target,
  Eye,
  CheckCircle
} from 'lucide-react';
import { officialPartners, companyDivisions } from '@/data/services';

export const metadata: Metadata = {
  title: 'About Muganwa Technology Solutions Ltd | Leadership, Vision & Mission',
  description: 'Learn about Muganwa Technology Solutions Ltd (MTS), founded in 2024 by Richard MUKIZA in Rwanda. Leading provider of Telecommunications, Electricals, Computer Networks, and Security Systems.',
};

export default function AboutPage() {
  return (
    <div className="space-y-16 py-10">
      {/* Header Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-mts-navy via-mts-dark to-slate-950 rounded-2xl p-8 sm:p-12 border border-mts-teal-light/40 shadow-2xl">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-mts-teal-dark/50 text-mts-teal-glow text-xs font-semibold mb-3">
              <ShieldCheck className="w-3.5 h-3.5 text-mts-gold" />
              <span>About Muganwa Technology Solutions Ltd (MTS)</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
              Pioneering Security, Telecommunications & IT Across East Africa
            </h1>
            <p className="text-sm sm:text-base text-slate-300 mt-3 leading-relaxed">
              Founded in 2024 by <strong>Richard MUKIZA</strong> in Kigali, Rwanda, <strong>MTS</strong> delivers mission-critical 
              telecommunication systems, electrical engineering, computer network hardware, and turnkey surveillance solutions 
              backed by 10+ dedicated technology specialists.
            </p>
          </div>
        </div>
      </div>

      {/* Vision & Mission Cards (Directly from Company Profile PDF) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Mission */}
          <div className="bg-gradient-to-br from-mts-navy via-slate-900 to-slate-950 border border-mts-teal-light/40 rounded-2xl p-8 shadow-xl relative overflow-hidden">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 rounded-xl bg-mts-teal-dark/60 text-mts-teal-glow border border-mts-teal-light/30">
                <Target className="w-6 h-6" />
              </div>
              <div>
                <span className="text-xs font-bold text-mts-gold uppercase tracking-wider block">Official Mission</span>
                <h3 className="text-xl font-black text-white">Our Mission</h3>
              </div>
            </div>
            <p className="text-sm text-slate-200 leading-relaxed italic">
              "To deliver top-quality security, IT, and telecommunications solutions that enhance the safety and efficiency 
              of our clients. We are committed to innovation, reliability, and exceptional customer service, empowering 
              organizations to succeed in the dynamic digital world."
            </p>
            <div className="mt-6 pt-4 border-t border-slate-800 text-xs text-mts-teal-glow font-medium flex items-center gap-1.5">
              <CheckCircle className="w-4 h-4 text-mts-teal-light" />
              <span>Grounded in Uncompromising Quality & Support</span>
            </div>
          </div>

          {/* Vision */}
          <div className="bg-gradient-to-br from-mts-burgundy/30 via-slate-900 to-slate-950 border border-mts-gold/40 rounded-2xl p-8 shadow-xl relative overflow-hidden">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 rounded-xl bg-mts-burgundy/60 text-mts-gold border border-mts-gold/30">
                <Eye className="w-6 h-6" />
              </div>
              <div>
                <span className="text-xs font-bold text-mts-gold uppercase tracking-wider block">Strategic Horizon</span>
                <h3 className="text-xl font-black text-white">Our Vision</h3>
              </div>
            </div>
            <p className="text-sm text-slate-200 leading-relaxed italic">
              "To be the leading provider of innovative and reliable security, IT, and telecommunications solutions across 
              Rwanda and East Africa, empowering organizations to thrive in an ever-evolving digital landscape."
            </p>
            <div className="mt-6 pt-4 border-t border-slate-800 text-xs text-mts-gold font-medium flex items-center gap-1.5">
              <CheckCircle className="w-4 h-4 text-mts-gold" />
              <span>Expanding Across Rwanda and the East African Community</span>
            </div>
          </div>
        </div>
      </section>

      {/* Company Overview & Brand Story */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-4 text-xs sm:text-sm text-slate-300 leading-relaxed">
            <span className="text-xs font-bold text-mts-gold uppercase tracking-wider block">
              About Muganwa Technology Solutions Ltd
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-white">
              Engineering Excellence Across 5 Specialized Divisions
            </h2>
            <p>
              Incorporated in Rwanda in <strong>2024</strong>, <strong>Muganwa Technology Solutions Ltd (MTS)</strong> was 
              established to bridge the gap between high-end international technology hardware and professional local engineering execution.
            </p>
            <p>
              With an active team of over <strong>10+ dedicated engineers, certified technicians, and IT specialists</strong>, 
              MTS delivers comprehensive turnkey projects encompassing surveillance systems, fiber optics, enterprise data centers, 
              heavy-duty power generation, and precision HVAC climate control.
            </p>
            <div className="pt-2 grid grid-cols-3 gap-3">
              <div className="bg-mts-navy/80 p-3.5 rounded-xl border border-slate-800 text-center">
                <span className="text-xl font-black text-mts-gold block">2024</span>
                <span className="text-[11px] text-slate-400">Year Founded</span>
              </div>
              <div className="bg-mts-navy/80 p-3.5 rounded-xl border border-slate-800 text-center">
                <span className="text-xl font-black text-mts-teal-glow block">10+</span>
                <span className="text-[11px] text-slate-400">Team Specialists</span>
              </div>
              <div className="bg-mts-navy/80 p-3.5 rounded-xl border border-slate-800 text-center">
                <span className="text-xl font-black text-white block">19+</span>
                <span className="text-[11px] text-slate-400">Global Partners</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="relative aspect-square max-w-md mx-auto rounded-2xl overflow-hidden border-2 border-mts-gold/40 shadow-2xl bg-slate-950 p-6 flex flex-col items-center justify-center text-center">
              <div className="relative w-44 h-44 rounded-xl overflow-hidden mb-6">
                <Image src="/images/logo.png" alt="MTS Monogram Logo" fill sizes="176px" className="object-contain" priority />
              </div>
              <h3 className="text-lg font-black text-white">MUGANWA TECHNOLOGY SOLUTIONS LTD</h3>
              <p className="text-xs text-mts-gold mt-1 font-semibold">
                Telecommunication Systems | Electricals | Computer Network Materials & Hardware
              </p>
              <div className="mt-3 text-xs text-slate-300 space-y-1">
                <p>Phones: +250 789 420 541 / +250 780 756 523</p>
                <p className="text-slate-400">Email: muganwatechnologysolutions@gmail.com</p>
                <p className="text-slate-400">Kigali, Rwanda</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Leadership Spotlight: Richard MUKIZA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-mts-navy via-mts-dark to-slate-950 border border-mts-teal-light/40 rounded-2xl p-8 sm:p-12 shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-4 flex flex-col items-center text-center space-y-3">
              <div className="w-32 h-32 rounded-full bg-slate-950 border-4 border-mts-gold flex items-center justify-center text-mts-gold font-bold text-4xl shadow-glow-gold">
                RM
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">Richard MUKIZA</h3>
                <p className="text-xs text-mts-gold font-semibold uppercase tracking-wider">
                  Founder & Managing Director
                </p>
                <p className="text-[11px] text-slate-400 mt-1">Supervising Engineering & Strategic Operations</p>
              </div>
            </div>

            <div className="lg:col-span-8 space-y-4 text-xs sm:text-sm text-slate-300 leading-relaxed border-t lg:border-t-0 lg:border-l border-slate-800 lg:pl-8">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-mts-burgundy/40 text-mts-gold text-xs font-bold uppercase tracking-wider">
                <Award className="w-3.5 h-3.5" />
                <span>Executive Leadership Profile</span>
              </div>
              <p>
                As Founder and Managing Director of <strong>Muganwa Technology Solutions Ltd</strong>, <strong>Richard MUKIZA</strong> steers 
                the company's vision of becoming the preeminent technology and security systems partner across Rwanda and the East African region.
              </p>
              <p>
                Under Richard's leadership, MTS maintains robust partnerships with global hardware giants—including Hikvision, Cisco, Huawei, 
                Dell Technologies, HP/HPE, Asenware, and Kstar—guaranteeing that every client receives authentic, high-performance equipment 
                installed to international standards.
              </p>
              <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 text-xs text-slate-300">
                <span className="font-bold text-white block mb-1">Direct Engineering Supervision:</span>
                Every project blueprint, site survey, and final commissioning is personally validated by Richard MUKIZA 
                to ensure strict compliance, flawless execution, and airtight cybersecurity.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Global Manufacturer Partners Showcase (19 from PDF) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-bold text-mts-gold uppercase tracking-wider">Authorized Alliances</span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
            Official Technology Partners
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-2">
            We procure, deploy, and integrate enterprise products directly from the world's foremost technology and security manufacturers.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
          {officialPartners.map((partner, idx) => (
            <div
              key={idx}
              className="bg-mts-navy/70 border border-slate-800 hover:border-mts-teal-light/50 rounded-xl p-4 text-center transition group flex flex-col justify-center items-center"
            >
              <span className="font-black text-white text-sm group-hover:text-mts-teal-glow transition">
                {partner.name}
              </span>
              <span className="text-[10px] text-slate-400 mt-1">
                {partner.category}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Core Values */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-mts-navy/80 p-6 rounded-2xl border border-slate-800 space-y-2">
            <Lock className="w-6 h-6 text-mts-teal-glow mb-2" />
            <h3 className="text-base font-bold text-white">Innovation & Reliability</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              We continually incorporate next-generation AI surveillance, fiber transmission, and enterprise IT hardware to deliver infallible performance.
            </p>
          </div>

          <div className="bg-mts-navy/80 p-6 rounded-2xl border border-slate-800 space-y-2">
            <Wrench className="w-6 h-6 text-mts-gold mb-2" />
            <h3 className="text-base font-bold text-white">Meticulous Craftsmanship</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              No exposed wiring or careless installations. All cabling, trunking, server cabinets, and switchgears are executed with clean aesthetics and safety.
            </p>
          </div>

          <div className="bg-mts-navy/80 p-6 rounded-2xl border border-slate-800 space-y-2">
            <Globe className="w-6 h-6 text-emerald-400 mb-2" />
            <h3 className="text-base font-bold text-white">Dedicated Client Care</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Our 10+ member team provides hands-on customer training, proactive preventative maintenance, and 24/7 SLA emergency dispatch.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
