'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { HelpCircle, ChevronDown, ChevronUp, ShieldCheck, PhoneCall } from 'lucide-react';

export default function FAQPage() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const faqs = [
    {
      q: 'Do your cameras require a monthly subscription fee to view video on smartphones?',
      a: 'No! Unlike basic consumer cameras that lock you into costly monthly cloud subscriptions, all Hikvision, Dahua, and Uniview systems installed by Muganwa Technology Solutions Ltd record locally to your on-premise NVR/DVR hard drives. You enjoy free, perpetual smartphone viewing (Hik-Connect / DMSS) with zero subscription fees for life.'
    },
    {
      q: 'Can the cameras continue recording during power outages or municipal blackouts?',
      a: 'Yes. For all residential and commercial installations, we provide optional Online Double-Conversion UPS battery backup units. These keep the cameras, PoE switches, and NVRs powered for 4 to 8+ hours during municipal power outages, ensuring your perimeter remains guarded 24/7.'
    },
    {
      q: 'What is the difference between ColorVu / Full-Color and traditional Infrared (IR) night vision?',
      a: 'Traditional cameras switch to black-and-white infrared mode at night, which can produce blurry faces and make it impossible to identify clothing or car colors. ColorVu cameras feature ultra-large F1.0 apertures and warm supplemental lighting, capturing vivid, full-color 4K video 24 hours a day in total darkness.'
    },
    {
      q: 'How long does a typical installation take?',
      a: 'A standard residential setup (4 to 8 cameras) is typically completed within 1 to 2 business days. Commercial offices take 2 to 4 days, while complex industrial plants or school campuses take 1 to 2 weeks depending on trenching and fiber-optic splicing requirements.'
    },
    {
      q: 'What warranty is provided on equipment and workmanship?',
      a: 'All hardware carries an official 2 to 3-year manufacturer warranty with immediate 1-to-1 replacement for factory defects. Furthermore, all physical cabling, conduit mounting, and termination workmanship carried out by MTS technicians is backed by our 1-year guarantee.'
    },
    {
      q: 'How does touchless facial recognition compare with fingerprint access control?',
      a: 'Visible light facial recognition terminals (such as ZKTeco SpeedFace) recognize authorized employees within 0.3 seconds at distances of up to 3 meters. They eliminate queues, operate completely hygienically without physical contact, and cannot be spoofed with photos or phone screens.'
    }
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      <div className="text-center max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-mts-teal-dark/50 text-mts-teal-glow text-xs font-semibold mb-3">
          <HelpCircle className="w-3.5 h-3.5 text-mts-gold" />
          <span>Knowledge & Guidance</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
          Frequently Asked Questions
        </h1>
        <p className="text-xs sm:text-sm text-slate-300 mt-2">
          Clear answers to common questions regarding CCTV installation, mobile access, warranties, and storage sizing.
        </p>
      </div>

      <div className="space-y-3">
        {faqs.map((faq, i) => (
          <div
            key={i}
            className="bg-mts-navy/80 border border-slate-800 rounded-xl overflow-hidden transition"
          >
            <button
              type="button"
              onClick={() => setOpenIdx(openIdx === i ? null : i)}
              className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4"
            >
              <span className="text-xs sm:text-sm font-bold text-white">{faq.q}</span>
              {openIdx === i ? (
                <ChevronUp className="w-4 h-4 text-mts-gold shrink-0" />
              ) : (
                <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />
              )}
            </button>
            {openIdx === i && (
              <div className="px-4 pb-5 sm:px-5 text-xs text-slate-300 leading-relaxed border-t border-slate-800/60 pt-3">
                {faq.a}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Still Have Questions CTA */}
      <div className="bg-mts-surface/60 border border-slate-800 rounded-2xl p-6 text-center space-y-3">
        <h3 className="text-sm font-bold text-white">Still have questions regarding your facility?</h3>
        <p className="text-xs text-slate-400 max-w-md mx-auto">
          Our engineering team is ready to assist with custom blueprints or threat assessments.
        </p>
        <div className="flex justify-center gap-3 pt-1">
          <Link
            href="/contact"
            className="px-4 py-2 rounded-lg bg-mts-teal hover:bg-mts-teal-light text-white text-xs font-bold transition"
          >
            Contact Engineering Team
          </Link>
          <a
            href="tel:+250789420541"
            className="px-4 py-2 rounded-lg bg-slate-900 border border-slate-700 text-white text-xs font-bold transition"
          >
            Call +250 789 420 541
          </a>
        </div>
      </div>
    </div>
  );
}
