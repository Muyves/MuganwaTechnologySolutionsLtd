'use client';

import React from 'react';
import { useParams, notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { 
  ShieldCheck, 
  ArrowRight, 
  CheckCircle2, 
  Wrench, 
  Cpu, 
  HardDrive, 
  Lock, 
  Layers, 
  PhoneCall,
  ArrowLeft 
} from 'lucide-react';
import { solutionsData } from '@/data/solutions';

export default function SingleSolutionPage() {
  const params = useParams();
  const slug = params.slug as string;
  const solution = solutionsData.find((s) => s.slug === slug);

  if (!solution) {
    return notFound();
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs text-slate-400">
        <Link href="/" className="hover:text-white">Home</Link>
        <span>/</span>
        <Link href="/solutions" className="hover:text-white">Solutions</Link>
        <span>/</span>
        <span className="text-mts-gold font-medium">{solution.title}</span>
      </nav>

      {/* Hero Section */}
      <div className="relative rounded-2xl overflow-hidden border border-mts-teal-light/40 shadow-2xl bg-slate-950">
        <div className="relative aspect-[21/9] min-h-[300px] w-full">
          <Image src={solution.heroImage} alt={solution.title} fill sizes="100vw" className="object-cover" priority />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/70 to-slate-950/30"></div>

          <div className="absolute inset-0 p-6 sm:p-12 flex flex-col justify-end max-w-3xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-mts-teal-dark/70 text-mts-teal-glow text-xs font-semibold uppercase tracking-wider mb-3 w-fit border border-mts-teal-light/40">
              <ShieldCheck className="w-3.5 h-3.5 text-mts-gold" />
              <span>Specialized Architecture Blueprint</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-black text-white leading-tight">
              {solution.title}
            </h1>
            <p className="text-xs sm:text-sm text-slate-200 mt-2 leading-relaxed">
              {solution.subtitle}
            </p>
          </div>
        </div>
      </div>

      {/* Vulnerability vs Strategy */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-mts-navy/80 border border-red-500/30 rounded-2xl p-6 space-y-3">
          <h3 className="text-sm font-bold text-red-400 uppercase tracking-wider flex items-center gap-2">
            <span>Primary Physical Threats & Vulnerabilities</span>
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            {solution.challenge}
          </p>
        </div>

        <div className="bg-mts-navy/80 border border-mts-teal-light/40 rounded-2xl p-6 space-y-3">
          <h3 className="text-sm font-bold text-mts-teal-glow uppercase tracking-wider flex items-center gap-2">
            <span>MTS Defensive Engineering Solution</span>
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            {solution.solutionOverview}
          </p>
        </div>
      </div>

      {/* Recommended Equipment Specification Blueprint */}
      <div className="bg-mts-surface/80 border border-mts-gold/40 rounded-2xl p-6 sm:p-8 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-mts-gold uppercase tracking-wider">Bill of Materials</span>
            <h2 className="text-xl font-bold text-white mt-1">Recommended Equipment Architecture</h2>
          </div>
          <span className="text-xs bg-slate-900 border border-slate-700 text-slate-300 px-3 py-1 rounded-lg">
            Turnkey Package
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
          <div className="bg-slate-900/80 p-4 rounded-xl border border-slate-800 space-y-1">
            <span className="text-slate-400 font-bold uppercase block text-[10px]">Cameras</span>
            <p className="text-white font-semibold">{solution.recommendedKit.cameraCount}</p>
          </div>

          <div className="bg-slate-900/80 p-4 rounded-xl border border-slate-800 space-y-1">
            <span className="text-slate-400 font-bold uppercase block text-[10px]">Recorder Architecture</span>
            <p className="text-white font-semibold">{solution.recommendedKit.recorderType}</p>
          </div>

          <div className="bg-slate-900/80 p-4 rounded-xl border border-slate-800 space-y-1">
            <span className="text-slate-400 font-bold uppercase block text-[10px]">Surveillance Storage</span>
            <p className="text-white font-semibold">{solution.recommendedKit.storage}</p>
          </div>

          <div className="bg-slate-900/80 p-4 rounded-xl border border-slate-800 space-y-1">
            <span className="text-slate-400 font-bold uppercase block text-[10px]">Access Control & Locks</span>
            <p className="text-white font-semibold">{solution.recommendedKit.accessControl}</p>
          </div>

          <div className="bg-slate-900/80 p-4 rounded-xl border border-slate-800 space-y-1 sm:col-span-2">
            <span className="text-slate-400 font-bold uppercase block text-[10px]">Power & Networking Backbone</span>
            <p className="text-white font-semibold">{solution.recommendedKit.additional}</p>
          </div>
        </div>

        <div className="pt-2 flex flex-wrap gap-3">
          <Link
            href="/kit-builder"
            className="px-5 py-2.5 rounded-lg bg-mts-teal hover:bg-mts-teal-light text-white text-xs font-bold flex items-center gap-1.5 shadow-glow-teal transition"
          >
            <Layers className="w-3.5 h-3.5 text-mts-gold" />
            <span>Customize in Security Kit Builder</span>
          </Link>
          <Link
            href={`/quote?property=${solution.slug}`}
            className="px-5 py-2.5 rounded-lg bg-mts-navy hover:bg-slate-800 border border-slate-700 text-white text-xs font-bold transition"
          >
            <span>Request Site Survey for this Setup</span>
          </Link>
        </div>
      </div>

      {/* Case Study Feature */}
      <div className="bg-gradient-to-r from-mts-navy via-slate-900 to-slate-950 border border-slate-800 rounded-2xl p-6 sm:p-8">
        <span className="text-xs font-bold text-mts-gold uppercase tracking-wider block mb-1">
          Field Deployment Case Study
        </span>
        <h3 className="text-lg font-bold text-white mb-2">{solution.caseStudy.client}</h3>
        <p className="text-xs text-slate-300 leading-relaxed mb-4">{solution.caseStudy.description}</p>
        <div className="p-3 rounded-lg bg-emerald-950/40 border border-emerald-500/30 text-xs text-emerald-300 font-medium">
          <strong>Outcome:</strong> {solution.caseStudy.result}
        </div>
      </div>
    </div>
  );
}
