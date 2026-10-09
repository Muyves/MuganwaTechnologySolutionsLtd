import React from 'react';
import type { Metadata } from 'next';
import SecurityKitBuilder from '@/components/SecurityKitBuilder';
import { ShieldCheck, CheckCircle2, Wrench, HardDrive } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Security Kit Builder & CCTV Sizing Calculator',
  description: 'Custom configure your full CCTV surveillance kit: select camera count, resolution, and recording days to calculate required hard drives and switches.',
};

export default function KitBuilderPage() {
  return (
    <div className="space-y-12 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-mts-navy via-mts-dark to-slate-950 rounded-2xl p-8 border border-mts-teal-light/40 shadow-2xl">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-mts-gold/10 border border-mts-gold/30 text-mts-gold text-xs font-bold uppercase tracking-wider mb-3">
              <ShieldCheck className="w-4 h-4" />
              <span>Smart Sizing Algorithm</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
              Interactive Security Kit Builder
            </h1>
            <p className="text-sm text-slate-300 mt-2 leading-relaxed">
              Eliminate guesswork when sizing your surveillance setup. Our engineering calculator matches the 
              optimal combination of cameras, 4K NVRs, Western Digital Purple hard drives, and Cat6 network cabling 
              with an automatic 10% bundle discount.
            </p>
          </div>
        </div>
      </div>

      <SecurityKitBuilder />

      {/* Engineering Principles Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-mts-navy/80 p-6 rounded-xl border border-slate-800">
            <HardDrive className="w-6 h-6 text-mts-teal-glow mb-3" />
            <h3 className="text-sm font-bold text-white mb-1">Scientific Storage Sizing</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              We calculate storage based on H.265+ smart video encoding, factoring in frame rates and ambient 
              motion profiles to guarantee your required retention window without unexpected overwrites.
            </p>
          </div>

          <div className="bg-mts-navy/80 p-6 rounded-xl border border-slate-800">
            <Wrench className="w-6 h-6 text-mts-gold mb-3" />
            <h3 className="text-sm font-bold text-white mb-1">Guaranteed Hardware Compatibility</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              All components in your bundle are pre-screened to ensure full PoE power wattage compliance, 
              network switch backplane throughput, and video codec compatibility.
            </p>
          </div>

          <div className="bg-mts-navy/80 p-6 rounded-xl border border-slate-800">
            <CheckCircle2 className="w-6 h-6 text-emerald-400 mb-3" />
            <h3 className="text-sm font-bold text-white mb-1">MTS Engineer Review</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Every configured kit can be reviewed by our lead engineer, <strong>MUKIZA Richard</strong>, 
              prior to dispatch to verify your property blueprints.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
