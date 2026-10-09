import React from 'react';
import type { Metadata } from 'next';
import { ShieldCheck } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Privacy Policy & Data Security Commitment',
  description: 'Privacy policy, surveillance video data confidentiality, and GDPR compliance of Muganwa Technology Solutions Ltd.',
};

export default function PrivacyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 text-slate-300 text-xs sm:text-sm leading-relaxed">
      <div className="pb-6 border-b border-slate-800">
        <h1 className="text-2xl sm:text-3xl font-black text-white">Privacy & Video Surveillance Data Policy</h1>
        <p className="text-xs text-slate-400 mt-1">Last Updated: September 2026 • Muganwa Technology Solutions Ltd</p>
      </div>

      <div className="space-y-4">
        <h2 className="text-base font-bold text-white">1. Client Data Sovereignty & Video Confidentiality</h2>
        <p>
          At <strong>Muganwa Technology Solutions Ltd</strong>, we hold security and privacy to the highest professional standards. 
          We firmly believe that your surveillance video footage, access control biometric credentials, and security logs belong exclusively to you.
        </p>
        <p>
          Unlike consumer cloud camera providers who store user streams on remote servers, MTS configures your NVR and camera recordings 
          to be stored <strong>locally on your own encrypted hard drives</strong>. Our technicians do not possess backdoors, 
          master credentials, or recurring access to your live or recorded camera feeds once installation handover is completed.
        </p>
      </div>

      <div className="space-y-4">
        <h2 className="text-base font-bold text-white">2. Cyber-Hardening Standards</h2>
        <p>
          During system commissioning, all default factory passwords (e.g. admin/12345) are immediately wiped and replaced with unique, 
          high-entropy cryptographic passwords. Camera management ports are isolated from public internet exposure using secure P2P encryption, 
          and all remote connections from your smartphones are encrypted via TLS 1.3 / AES-256 protocols.
        </p>
      </div>

      <div className="space-y-4">
        <h2 className="text-base font-bold text-white">3. Information Collected via this Website</h2>
        <p>
          When you place an order, book an installation, or request a quotation, we collect your name, phone number, email address, 
          and installation address purely to coordinate dispatch, fulfill hardware delivery, and maintain warranty records. We never sell, 
          rent, or monetize your contact or facility information to third parties.
        </p>
      </div>

      <div className="space-y-4">
        <h2 className="text-base font-bold text-white">4. Contacting Our Data Protection Officer</h2>
        <p>
          For questions regarding surveillance compliance, data rights, or certificate verification, contact 
          Managing Director <strong>Richard MUKIZA</strong> at <strong className="text-white font-mono">muganwatechnologysolutions@gmail.com</strong>.
        </p>
      </div>
    </div>
  );
}
