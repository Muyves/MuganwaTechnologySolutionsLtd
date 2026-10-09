import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import type { Metadata } from 'next';
import { ShieldCheck, ArrowRight, CheckCircle2, Award, Cpu, Lock, Factory, Home, Store, GraduationCap } from 'lucide-react';
import { solutionsData } from '@/data/solutions';

export const metadata: Metadata = {
  title: 'Tailored Security Solutions by Industry Vertical',
  description: 'Specialized electronic security architectures for homes, retail businesses, industrial warehouses, and education campuses across Rwanda and East Africa.',
};

export default function SolutionsIndexPage() {
  const iconMap: Record<string, any> = {
    'home-security': Home,
    'business-retail': Store,
    'industrial-warehouse': Factory,
    'schools-education': GraduationCap,
  };

  return (
    <div className="space-y-16 py-10">
      {/* Header Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-mts-navy via-mts-dark to-slate-950 rounded-2xl p-8 sm:p-12 border border-mts-teal-light/40 shadow-2xl">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-mts-teal-dark/50 text-mts-teal-glow text-xs font-semibold mb-3">
              <ShieldCheck className="w-3.5 h-3.5 text-mts-gold" />
              <span>Tailored Threat Engineering</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
              Security Solutions by Industry Sector
            </h1>
            <p className="text-sm sm:text-base text-slate-300 mt-3 leading-relaxed">
              No two environments are identical. A warehouse demands long-range license plate tracking, 
              while a luxury residence demands discreet wiring and active strobe deterrence. 
              Discover how <strong>Muganwa Technology Solutions Ltd</strong> designs bespoke defense architectures.
            </p>
          </div>
        </div>
      </div>

      {/* Solutions Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {solutionsData.map((sol, index) => {
          const Icon = iconMap[sol.slug] || ShieldCheck;
          const isReversed = index % 2 === 1;

          return (
            <div
              key={sol.id}
              className={`grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-mts-navy/60 border border-slate-800 rounded-2xl p-6 sm:p-10 shadow-xl`}
            >
              {/* Image */}
              <div className={`lg:col-span-5 ${isReversed ? 'lg:order-2' : ''}`}>
                <div className="relative aspect-[4/3] rounded-xl overflow-hidden border border-slate-700 shadow-2xl">
                  <Image src={sol.heroImage} alt={sol.title} fill sizes="500px" className="object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent"></div>
                  <div className="absolute bottom-4 left-4 right-4 bg-mts-dark/90 backdrop-blur-md p-3 rounded-lg border border-slate-700">
                    <span className="text-[10px] uppercase font-bold text-mts-gold block">Case Study Highlight</span>
                    <span className="text-xs font-semibold text-white block truncate">{sol.caseStudy.client}</span>
                    <span className="text-[11px] text-emerald-400 block mt-0.5">{sol.caseStudy.result}</span>
                  </div>
                </div>
              </div>

              {/* Text Information */}
              <div className={`lg:col-span-7 space-y-4 ${isReversed ? 'lg:order-1' : ''}`}>
                <div className="inline-flex items-center gap-2 text-xs font-bold text-mts-gold uppercase tracking-wider">
                  <Icon className="w-4 h-4" />
                  <span>Sector Architecture</span>
                </div>

                <h2 className="text-2xl sm:text-3xl font-extrabold text-white">{sol.title}</h2>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">{sol.subtitle}</p>

                {/* Challenge & Solution */}
                <div className="space-y-2 pt-2 text-xs">
                  <div className="p-3 rounded-lg bg-slate-900/80 border border-slate-800">
                    <span className="font-bold text-red-400 uppercase tracking-wider block mb-0.5">The Vulnerability:</span>
                    <p className="text-slate-300">{sol.challenge}</p>
                  </div>
                  <div className="p-3 rounded-lg bg-mts-surface/60 border border-slate-700">
                    <span className="font-bold text-mts-teal-glow uppercase tracking-wider block mb-0.5">The MTS Solution:</span>
                    <p className="text-slate-300">{sol.solutionOverview}</p>
                  </div>
                </div>

                {/* Key Benefits */}
                <div className="space-y-1.5 pt-2 text-xs text-slate-300">
                  <span className="font-bold text-white uppercase text-[11px] block">Key Operational Benefits:</span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {sol.keyBenefits.slice(0, 4).map((b, i) => (
                      <div key={i} className="flex items-start gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-mts-teal-light shrink-0 mt-0.5" />
                        <span>{b}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Link to dedicated page */}
                <div className="pt-3">
                  <Link
                    href={`/solutions/${sol.slug}`}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-mts-teal hover:bg-mts-teal-light text-white text-xs font-bold shadow-glow-teal transition"
                  >
                    <span>View Complete {sol.title} Spec Sheet</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
