import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Service & Equipment Warranty Terms',
  description: 'Terms and conditions for hardware sales, engineering installation, and warranty claims at Muganwa Technology Solutions Ltd.',
};

export default function TermsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 text-slate-300 text-xs sm:text-sm leading-relaxed">
      <div className="pb-6 border-b border-slate-800">
        <h1 className="text-2xl sm:text-3xl font-black text-white">Terms of Service & Warranty Conditions</h1>
        <p className="text-xs text-slate-400 mt-1">Muganwa Technology Solutions Ltd • Effective September 2026</p>
      </div>

      <div className="space-y-4">
        <h2 className="text-base font-bold text-white">1. Scope of Equipment Sales & Supply</h2>
        <p>
          All electronic equipment sold by Muganwa Technology Solutions Ltd (cameras, NVRs, DVRs, access control terminals, power distribution boxes, and hard drives) is guaranteed to be 100% genuine, new, and sourced through official manufacturer authorized distribution channels.
        </p>
      </div>

      <div className="space-y-4">
        <h2 className="text-base font-bold text-white">2. Warranty Claims & Replacement Policy</h2>
        <p>
          Hardware carries an official 2 to 3-year warranty (as indicated on each item datasheet). In the event of a manufacturing fault or component failure:
        </p>
        <ul className="list-disc pl-5 space-y-1.5 text-slate-400">
          <li>Defective units will be inspected by our certified technician within 24 hours of notification.</li>
          <li>Within the first 12 months, verified defective hardware will be replaced with a brand new 1-to-1 swap.</li>
          <li>Warranty does not cover physical vandalism, liquid submersion of non-weatherproof indoor models, or electrical burns resulting from ungrounded lightning strikes where the client rejected recommended surge arrestors.</li>
        </ul>
      </div>

      <div className="space-y-4">
        <h2 className="text-base font-bold text-white">3. Installation Services & Site Access</h2>
        <p>
          When professional installation is booked, the client agrees to provide safe access to power distribution boards, ceilings, and building pathways. MTS certified technicians will install all wiring inside neat conduits and test every camera focal angle with the client before signing the handover certificate.
        </p>
      </div>

      <div className="space-y-4">
        <h2 className="text-base font-bold text-white">4. Governing Law</h2>
        <p>
          These terms are governed by and construed in accordance with the laws of the Republic of Rwanda. Disputes shall be subject to the exclusive jurisdiction of the courts of Kigali.
        </p>
      </div>
    </div>
  );
}
