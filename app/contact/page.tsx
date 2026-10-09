'use client';

import React, { useState } from 'react';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  MessageSquare, 
  ShieldCheck, 
  CheckCircle2, 
  Send 
} from 'lucide-react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'General Security & Technology Inquiry',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 1000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Header */}
      <div className="bg-gradient-to-r from-mts-navy via-mts-dark to-slate-950 rounded-2xl p-8 sm:p-12 border border-mts-teal-light/40 shadow-2xl">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-mts-teal-dark/50 text-mts-teal-glow text-xs font-semibold mb-3">
            <ShieldCheck className="w-3.5 h-3.5 text-mts-gold" />
            <span>Engineering Dispatch & Client Relations</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
            Contact Muganwa Technology Solutions Ltd
          </h1>
          <p className="text-sm sm:text-base text-slate-300 mt-3 leading-relaxed">
            Need an on-site security survey, data center infrastructure quotation, generator/UPS assessment, or urgent technical support? 
            Contact our engineering desk in Kigali directly.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left: Contact Details & Office Hours (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-mts-navy/80 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6">
            <h2 className="text-base font-bold text-white uppercase tracking-wider pb-3 border-b border-slate-800">
              Official Company Coordinates
            </h2>

            <div className="space-y-4 text-xs">
              <div className="flex items-start gap-3">
                <div className="p-2.5 rounded-lg bg-mts-teal-dark/50 text-mts-teal-glow shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <span className="font-bold text-white block">Physical Location</span>
                  <span className="text-slate-300 mt-0.5 block">
                    Kigali, Rwanda
                  </span>
                  <span className="text-slate-400 block">Operating across Rwanda & East Africa</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2.5 rounded-lg bg-mts-burgundy/50 text-mts-gold shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <span className="font-bold text-white block">Official Phone Numbers</span>
                  <span className="text-slate-300 mt-0.5 block">+250 789 420 541 (Primary / WhatsApp)</span>
                  <span className="text-slate-300 block">+250 780 756 523 (Secondary Hotline)</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2.5 rounded-lg bg-mts-teal-dark/50 text-mts-teal-glow shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <span className="font-bold text-white block">Official Email Address</span>
                  <span className="text-slate-300 mt-0.5 block font-mono">muganwatechnologysolutions@gmail.com</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2.5 rounded-lg bg-slate-900 text-amber-400 shrink-0 border border-slate-800">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <span className="font-bold text-white block">Operational Hours</span>
                  <span className="text-slate-300 mt-0.5 block">Monday - Friday: 08:00 AM - 06:00 PM</span>
                  <span className="text-slate-300 block">Saturday: 08:30 AM - 04:00 PM</span>
                  <span className="text-mts-gold block font-semibold">24/7 Priority Dispatch for SLA Contract Clients</span>
                </div>
              </div>
            </div>

            {/* Direct WhatsApp CTA */}
            <div className="pt-4 border-t border-slate-800">
              <a
                href="https://wa.me/250789420541?text=Hello%20Muganwa%20Technology%20Solutions%2C%20I%20would%20like%20to%20inquire%20about%20your%20services"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md transition"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Chat Instantly on WhatsApp (+250 789 420 541)</span>
              </a>
            </div>
          </div>
        </div>

        {/* Right: Contact Form & Map Embed (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Form */}
          <div className="bg-mts-navy/80 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-xl">
            <h2 className="text-base font-bold text-white uppercase tracking-wider pb-3 border-b border-slate-800 mb-6">
              Send an Engineering Inquiry
            </h2>

            {submitted ? (
              <div className="p-8 text-center bg-slate-900 rounded-xl border border-emerald-500/40 space-y-3 animate-fadeIn">
                <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto" />
                <h3 className="text-lg font-bold text-white">Message Transmitted to Engineering Desk</h3>
                <p className="text-xs text-slate-300 max-w-sm mx-auto">
                  Thank you, <strong>{formData.name}</strong>. Managing Director <strong>Richard MUKIZA</strong> or an on-duty engineer will reply to {formData.email} within 2 hours.
                </p>
                <button
                  type="button"
                  onClick={() => setSubmitted(false)}
                  className="mt-2 px-4 py-2 rounded-lg bg-mts-teal text-white text-xs font-bold"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-slate-300 font-semibold mb-1">Your Full Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Richard MUKIZA"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 text-white focus:border-mts-teal-light focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-300 font-semibold mb-1">Phone Number *</label>
                    <input
                      type="tel"
                      required
                      placeholder="+250 789 420 541"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 text-white focus:border-mts-teal-light focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-slate-300 font-semibold mb-1">Email Address *</label>
                    <input
                      type="email"
                      required
                      placeholder="name@organization.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 text-white focus:border-mts-teal-light focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-300 font-semibold mb-1">Inquiry Subject</label>
                    <select
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 text-white focus:border-mts-teal-light focus:outline-none"
                    >
                      <option value="Electronic Devices & Security">Electronic Devices (CCTV, Access Control, Fire Alarms)</option>
                      <option value="Information Technology">Information Technology (Data Center, Laptops, Switches)</option>
                      <option value="Electrical Engineering">Electrical Engineering (Generators, UPS, Transformers)</option>
                      <option value="HVAC Systems">HVAC Systems (Precision Cooling, VRF, Air Conditioners)</option>
                      <option value="Preventative Maintenance SLA">Preventative Maintenance & SLA Contract</option>
                      <option value="Consultancy & Planning">Technical Consultancy & Planning Phase</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Message Details *</label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Describe your site location, technical requirements, or facility specifications..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 text-white focus:border-mts-teal-light focus:outline-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-mts-teal to-mts-teal-light hover:brightness-110 text-white font-extrabold text-xs shadow-glow-teal transition flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  <span>{isSubmitting ? 'Transmitting...' : 'Send Message to Engineering Desk'}</span>
                </button>
              </form>
            )}
          </div>

          {/* Interactive Operational Coordinates Card */}
          <div className="bg-mts-navy/80 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
            <div className="p-4 border-b border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-bold text-white">
                <MapPin className="w-4 h-4 text-mts-gold" />
                <span>Kigali Operational Hub Location</span>
              </div>
              <span className="text-[11px] font-mono text-slate-400">Coordinates: Kigali, Rwanda</span>
            </div>
            <div className="relative h-60 w-full bg-slate-950 flex items-center justify-center text-center p-6">
              {/* Stylized Security Map Grid Simulation */}
              <div className="absolute inset-0 bg-[radial-gradient(#0D6E63_1px,transparent_1px)] [background-size:20px_20px] opacity-25"></div>
              <div className="relative z-10 space-y-2 max-w-sm">
                <div className="w-12 h-12 rounded-full bg-mts-teal-dark border-2 border-mts-gold shadow-glow-gold flex items-center justify-center mx-auto text-white animate-bounce">
                  <ShieldCheck className="w-6 h-6 text-mts-gold" />
                </div>
                <h4 className="text-sm font-bold text-white">Muganwa Technology Solutions Ltd</h4>
                <p className="text-xs text-slate-300">Telecommunications | Electricals | Computer Network Materials & Hardware</p>
                <p className="text-xs text-mts-teal-glow font-mono">+250 789 420 541 / +250 780 756 523</p>
                <a
                  href="https://maps.google.com/?q=Kigali,Rwanda"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block mt-2 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-mts-teal-glow text-xs font-semibold border border-slate-700 transition"
                >
                  Open in Google Maps / Navigation
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
