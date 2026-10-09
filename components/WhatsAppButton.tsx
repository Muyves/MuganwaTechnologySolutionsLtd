'use client';

import React, { useState } from 'react';
import { MessageSquare, Phone, X, ShieldCheck } from 'lucide-react';

export default function WhatsAppButton() {
  const [isOpen, setIsOpen] = useState(false);

  const whatsappNumber = '250789420541';
  const prefilledMessage = encodeURIComponent(
    'Hello Muganwa Technology Solutions Ltd, I would like to inquire about your security systems, electricals, or telecommunication services.'
  );
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${prefilledMessage}`;

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end">
      {/* Quick Help Popover */}
      {isOpen && (
        <div className="mb-3 w-72 bg-mts-dark border border-mts-teal-light/50 rounded-2xl p-4 shadow-2xl animate-fadeIn text-slate-200">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
              <span className="text-xs font-bold text-white uppercase tracking-wider">MTS Security Desk</span>
            </div>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="text-slate-400 hover:text-white p-1"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="py-3 text-xs space-y-2">
            <p className="text-slate-300">
              Need immediate advice on camera sizing, emergency repairs, or site surveys?
            </p>
            <p className="text-[11px] text-mts-gold font-medium flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Direct line to Technical Supervisor</span>
            </p>
          </div>

          <div className="space-y-2 pt-2 border-t border-slate-800">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2 px-3 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center justify-center gap-2 shadow-md transition"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Chat on WhatsApp</span>
            </a>

            <a
              href="tel:+250789420541"
              className="w-full py-2 px-3 rounded-lg bg-mts-navy hover:bg-mts-surface border border-slate-700 text-slate-200 text-xs font-semibold flex items-center justify-center gap-2 transition"
            >
              <Phone className="w-3.5 h-3.5 text-mts-teal-glow" />
              <span>Call +250 789 420 541</span>
            </a>
          </div>
        </div>
      )}

      {/* Floating Action Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="relative group p-3.5 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white shadow-xl hover:shadow-glow-teal transition-all duration-300 transform hover:scale-105 flex items-center justify-center border-2 border-white/20"
        aria-label="Open WhatsApp live security assistance"
      >
        <MessageSquare className="w-6 h-6" />
        <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-mts-gold rounded-full border-2 border-slate-900 animate-ping"></span>
        <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-mts-gold rounded-full border-2 border-slate-900"></span>
      </button>
    </div>
  );
}
