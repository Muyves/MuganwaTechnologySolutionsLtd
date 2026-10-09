import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  ShieldCheck, 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Award, 
  Lock, 
  ExternalLink,
  CheckCircle2
} from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-mts-dark text-slate-400 border-t border-mts-teal-dark/30 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Trust Features Strip */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 pb-12 border-b border-slate-800">
          <div className="flex items-start gap-3 bg-mts-surface/40 p-4 rounded-xl border border-slate-800">
            <div className="p-2.5 rounded-lg bg-mts-teal-dark/50 text-mts-teal-glow">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-white font-semibold text-sm">Certified Security Hardware</h4>
              <p className="text-xs text-slate-400 mt-0.5">100% genuine equipment with up to 3 years warranty.</p>
            </div>
          </div>

          <div className="flex items-start gap-3 bg-mts-surface/40 p-4 rounded-xl border border-slate-800">
            <div className="p-2.5 rounded-lg bg-mts-burgundy/40 text-mts-gold">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-white font-semibold text-sm">Engineered Installation</h4>
              <p className="text-xs text-slate-400 mt-0.5">Professional conduit routing, neat termination & labeling.</p>
            </div>
          </div>

          <div className="flex items-start gap-3 bg-mts-surface/40 p-4 rounded-xl border border-slate-800">
            <div className="p-2.5 rounded-lg bg-mts-teal-dark/50 text-mts-teal-glow">
              <Clock className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-white font-semibold text-sm">24/7 Rapid SLA Support</h4>
              <p className="text-xs text-slate-400 mt-0.5">Emergency technician dispatch & cloud health monitoring.</p>
            </div>
          </div>

          <div className="flex items-start gap-3 bg-mts-surface/40 p-4 rounded-xl border border-slate-800">
            <div className="p-2.5 rounded-lg bg-mts-burgundy/40 text-mts-gold">
              <Lock className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-white font-semibold text-sm">Military-Grade Cybersecurity</h4>
              <p className="text-xs text-slate-400 mt-0.5">Firmware hardening, encrypted streams, zero backdoor risks.</p>
            </div>
          </div>
        </div>

        {/* Main Footer Links */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 py-12">
          {/* Brand & Leadership Bio */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-3">
              <div className="relative w-12 h-12 rounded-lg overflow-hidden border border-mts-gold/40 shadow-glow-gold bg-slate-950 p-0.5">
                <Image 
                  src="/images/logo.png" 
                  alt="Muganwa Technology Solutions Ltd Logo" 
                  fill 
                  sizes="48px"
                  className="object-contain p-0.5"
                />
              </div>
              <div>
                <span className="font-extrabold text-lg text-white block">
                  MUGANWA TECHNOLOGY SOLUTIONS LTD
                </span>
                <span className="text-xs text-mts-gold font-medium tracking-wide">
                  Telecommunication Systems • Electricals • Computer Network Materials & Hardware
                </span>
              </div>
            </Link>

            <p className="text-xs leading-relaxed text-slate-300">
              Founded in 2024 by <strong>Richard MUKIZA</strong> in Rwanda, Muganwa Technology Solutions Ltd (MTS) delivers top-tier 
              video-centric smart IoT solutions, IT & Telecommunications, Electrical Engineering, HVAC & Precision Cooling, and Low Voltage Systems across East Africa with a dedicated team of 10+ professionals.
            </p>

            <div className="bg-gradient-to-r from-mts-surface to-slate-900 p-3.5 rounded-lg border border-slate-800">
              <span className="text-[11px] text-slate-400 uppercase font-semibold tracking-wider block">
                Founder & Managing Director
              </span>
              <p className="text-xs text-white font-medium mt-0.5 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-mts-teal-glow"></span>
                <span><strong>Richard MUKIZA</strong> — Founder, Managing Director & Systems Architect</span>
              </p>
            </div>

            {/* Direct Contact List */}
            <div className="space-y-2 pt-2 text-xs">
              <div className="flex items-center gap-2 text-slate-300">
                <MapPin className="w-4 h-4 text-mts-gold shrink-0" />
                <span>Kigali, Rwanda • Operating across East Africa</span>
              </div>
              <div className="flex items-center gap-2 text-slate-300">
                <Phone className="w-4 h-4 text-mts-teal-glow shrink-0" />
                <span>Call / WhatsApp: +250 789 420 541 / +250 780 756 523</span>
              </div>
              <div className="flex items-center gap-2 text-slate-300">
                <Mail className="w-4 h-4 text-mts-gold shrink-0" />
                <span>muganwatechnologysolutions@gmail.com</span>
              </div>
            </div>
          </div>

          {/* Column: Core Divisions */}
          <div>
            <h4 className="text-white text-sm font-bold uppercase tracking-wider mb-4 border-l-2 border-mts-gold pl-2">
              Our Capabilities
            </h4>
            <ul className="space-y-2 text-xs">
              <li><Link href="/products?category=cameras" className="hover:text-mts-gold transition">CCTV & Surveillance</Link></li>
              <li><Link href="/products?category=access_control" className="hover:text-mts-gold transition">Access Control & Biometrics</Link></li>
              <li><Link href="/services" className="hover:text-mts-gold transition">Fire Alarms (Asenware)</Link></li>
              <li><Link href="/services" className="hover:text-mts-gold transition">Fiber Optics Infrastructure</Link></li>
              <li><Link href="/products?category=workstations" className="hover:text-mts-gold transition">Data Center & IT Hardware</Link></li>
              <li><Link href="/services" className="hover:text-mts-gold transition">Electrical: Generators & UPS</Link></li>
              <li><Link href="/services" className="hover:text-mts-gold transition">HVAC Precision Air Cooling</Link></li>
              <li><Link href="/services" className="hover:text-mts-gold transition">Consultancy & Migration</Link></li>
            </ul>
          </div>

          {/* Column: Solutions & Process */}
          <div>
            <h4 className="text-white text-sm font-bold uppercase tracking-wider mb-4 border-l-2 border-mts-teal-glow pl-2">
              Solutions & Process
            </h4>
            <ul className="space-y-2 text-xs">
              <li><Link href="/solutions/home-security" className="hover:text-mts-gold transition">Consumer & Residential</Link></li>
              <li><Link href="/solutions/business-retail" className="hover:text-mts-gold transition">Corporate Management</Link></li>
              <li><Link href="/solutions/industrial-warehouse" className="hover:text-mts-gold transition">City Operations & Plants</Link></li>
              <li><Link href="/solutions/schools-education" className="hover:text-mts-gold transition">Campus & Institutional</Link></li>
              <li><Link href="/services" className="hover:text-mts-gold transition">Phase 1: Planning Phase</Link></li>
              <li><Link href="/services" className="hover:text-mts-gold transition">Phase 2: Execution Phase</Link></li>
              <li><Link href="/services" className="hover:text-mts-gold transition">Phase 3: Closure & Review</Link></li>
              <li><Link href="/kit-builder" className="text-mts-gold font-semibold hover:underline flex items-center gap-1">
                <span>Security Kit Builder</span>
                <ExternalLink className="w-3 h-3" />
              </Link></li>
            </ul>
          </div>

          {/* Column: Company & Legal */}
          <div>
            <h4 className="text-white text-sm font-bold uppercase tracking-wider mb-4 border-l-2 border-mts-burgundy pl-2">
              Company & Help
            </h4>
            <ul className="space-y-2 text-xs">
              <li><Link href="/about" className="hover:text-white transition">About MTS & Vision</Link></li>
              <li><Link href="/contact" className="hover:text-white transition">Contact Us & Direct Line</Link></li>
              <li><Link href="/quote" className="hover:text-white transition">Request Custom Proposal</Link></li>
              <li><Link href="/track-order" className="hover:text-white transition">Track Your Project</Link></li>
              <li><Link href="/blog" className="hover:text-white transition">Knowledge Base & Guides</Link></li>
              <li><Link href="/faq" className="hover:text-white transition">Frequently Asked Questions</Link></li>
              <li><Link href="/privacy" className="hover:text-white transition">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-white transition">Terms & SLA Conditions</Link></li>
              <li><Link href="/admin" className="text-slate-400 hover:text-mts-gold transition flex items-center gap-1">
                <span>Admin: Richard MUKIZA</span>
              </Link></li>
            </ul>
          </div>
        </div>

        {/* Global Partner Manufacturers (from PDF page 8) */}
        <div className="py-6 border-t border-slate-800/80 space-y-3 text-xs">
          <div className="flex items-center gap-2">
            <span className="text-slate-400 font-bold uppercase text-[11px] tracking-wider">
              Our Technology Partners & Manufacturers:
            </span>
          </div>
          <div className="flex flex-wrap items-center gap-2 text-[11px]">
            {[
              'HIKVISION', 'LENOVO', 'HUAWEI', 'RUCKUS', 'TOSHIBA', 'FORTINET', 'NUTANIX', 
              'ASENWARE', 'CISCO', 'LEGRAND', 'HP / HPE', 'SIEMON', 'DELL TECHNOLOGIES', 
              'BOSCH', 'A10 NETWORKS', 'MICROSOFT', 'SAMSUNG', 'LG', 'KSTAR'
            ].map((partner, i) => (
              <span key={i} className="bg-slate-900/90 px-2.5 py-1 rounded border border-slate-800 text-slate-300 font-semibold hover:border-mts-teal-light transition">
                {partner}
              </span>
            ))}
          </div>
        </div>

        {/* Payment Badges */}
        <div className="py-4 border-t border-slate-800/60 flex flex-wrap items-center justify-between gap-4 text-xs">
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-slate-500 font-semibold uppercase text-[10px]">Authorized Technology:</span>
            <span className="bg-slate-900 px-2 py-1 rounded border border-slate-800 text-slate-300 font-semibold">HIKVISION</span>
            <span className="bg-slate-900 px-2 py-1 rounded border border-slate-800 text-slate-300 font-semibold">DAHUA</span>
            <span className="bg-slate-900 px-2 py-1 rounded border border-slate-800 text-slate-300 font-semibold">ZKTECO</span>
            <span className="bg-slate-900 px-2 py-1 rounded border border-slate-800 text-slate-300 font-semibold">AJAX</span>
            <span className="bg-slate-900 px-2 py-1 rounded border border-slate-800 text-slate-300 font-semibold">UNIVIEW</span>
            <span className="bg-slate-900 px-2 py-1 rounded border border-slate-800 text-slate-300 font-semibold">WESTERN DIGITAL PURPLE</span>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <span className="text-slate-500 font-semibold uppercase text-[10px]">Accepted Payments:</span>
            <span className="bg-slate-900 px-2 py-1 rounded border border-slate-800 text-yellow-400 font-bold text-[10px]">MTN MoMo</span>
            <span className="bg-slate-900 px-2 py-1 rounded border border-slate-800 text-red-400 font-bold text-[10px]">Airtel Money</span>
            <span className="bg-slate-900 px-2 py-1 rounded border border-slate-800 text-blue-400 font-bold text-[10px]">Visa / MC</span>
            <span className="bg-slate-900 px-2 py-1 rounded border border-slate-800 text-slate-300 font-bold text-[10px]">Bank Transfer</span>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="pt-6 border-t border-slate-800/60 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
          <p>
            © {new Date().getFullYear()} <strong>Muganwa Technology Solutions Ltd</strong>. All rights reserved.
          </p>
          <p className="flex items-center gap-1 text-[11px]">
            <span>Security Engineering supervised by</span>
            <span className="text-slate-400 font-medium">MUKIZA Richard</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
