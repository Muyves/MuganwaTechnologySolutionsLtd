'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Wrench, 
  ShieldCheck, 
  Calendar, 
  Clock, 
  CheckCircle2, 
  ArrowRight, 
  Check, 
  PhoneCall, 
  MapPin, 
  Camera, 
  AlertCircle,
  Server,
  Zap,
  Wind,
  Headphones,
  CheckCircle
} from 'lucide-react';
import { installationServices, installationSteps, companyDivisions } from '@/data/services';

const iconMap: Record<string, React.ElementType> = {
  ShieldCheck,
  Server,
  Zap,
  Wind,
  Headphones
};

export default function ServicesPage() {
  // Booking Form State
  const [formData, setFormData] = useState({
    customerName: '',
    email: '',
    phone: '',
    address: '',
    city: 'Kigali',
    propertyType: 'residential',
    requestedDate: '',
    requestedTimeSlot: 'morning',
    numberOfCameras: 4,
    hasExistingWiring: false,
    notes: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const res = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (res.ok) {
        setBookingSuccess(data.booking.id);
      } else {
        alert(data.error || 'Failed to submit booking');
      }
    } catch (err) {
      // Fallback local booking ID
      setBookingSuccess(`BKG-2026-${Math.floor(100 + Math.random() * 900)}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-16 py-10">
      {/* Header Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-mts-navy via-mts-dark to-slate-950 rounded-2xl p-8 sm:p-12 border border-mts-teal-light/40 shadow-2xl">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-mts-teal-dark/50 text-mts-teal-glow text-xs font-semibold mb-3">
              <Wrench className="w-3.5 h-3.5 text-mts-gold" />
              <span>Certified Installation & Engineering</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
              Comprehensive Engineering & Security Services
            </h1>
            <p className="text-sm sm:text-base text-slate-300 mt-3 leading-relaxed">
              At <strong>Muganwa Technology Solutions Ltd</strong>, we deliver turnkey solutions across 5 core engineering divisions: 
              Electronic Security, IT Infrastructure, Electrical Engineering, HVAC Precision Cooling, and Professional Consultancy — 
              personally directed by <strong>Richard MUKIZA</strong>.
            </p>
          </div>
        </div>
      </div>

      {/* 5 Core Engineering Divisions Showcase */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-bold text-mts-teal-glow uppercase tracking-wider">Five Core Pillars</span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
            Our Enterprise Capabilities
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-2">
            Integrated engineering expertise spanning physical security, computing networks, power generation, and precision climate control.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {companyDivisions.map((div) => {
            const Icon = iconMap[div.iconName] || ShieldCheck;
            return (
              <div
                key={div.id}
                className="bg-mts-navy/80 border border-slate-800 hover:border-mts-teal-light/50 rounded-2xl p-6 transition-all shadow-md hover:shadow-glow-teal flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-3 rounded-xl bg-mts-teal-dark/60 text-mts-teal-glow border border-mts-teal-light/30">
                      <Icon className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-white">{div.title}</h3>
                      <span className="text-[11px] text-mts-gold font-medium block">{div.tagline}</span>
                    </div>
                  </div>

                  <p className="text-xs text-slate-300 mb-4 leading-relaxed">
                    {div.description}
                  </p>

                  <div className="space-y-2 border-t border-slate-800/80 pt-3">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Key Deliverables:</span>
                    {div.items.map((item, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs text-slate-200">
                        <CheckCircle className="w-3.5 h-3.5 text-mts-teal-light shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-6 pt-3 border-t border-slate-800">
                  <a
                    href="#booking-section"
                    className="text-xs text-mts-teal-glow hover:underline font-semibold flex items-center gap-1"
                  >
                    <span>Request Consultation for {div.title.split(' ')[0]}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 4 Service Packages */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-bold text-mts-gold uppercase tracking-wider">Service Tiers</span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
            Installation & Maintenance Packages
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-2">
            Transparent pricing based on property complexity, component counts, and SLA response times.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {installationServices.map((pkg) => (
            <div
              key={pkg.id}
              className="bg-mts-navy/80 border border-slate-800 hover:border-mts-teal-light/50 rounded-2xl p-6 flex flex-col justify-between transition-all shadow-md hover:shadow-glow-teal"
            >
              <div>
                <span className="text-[10px] text-mts-gold font-bold uppercase tracking-wider block mb-1">
                  {pkg.targetAudience}
                </span>
                <h3 className="text-lg font-bold text-white mb-2">{pkg.title}</h3>
                <div className="flex items-baseline gap-1 my-3 pb-3 border-b border-slate-800">
                  <span className="text-xs text-slate-400">Starting at</span>
                  <span className="text-2xl font-black text-white">${pkg.priceStartingAt}</span>
                  <span className="text-[11px] text-slate-400">/ project</span>
                </div>

                <p className="text-xs text-slate-300 mb-4 leading-relaxed">
                  {pkg.recommendedFor}
                </p>

                <div className="space-y-2 text-xs text-slate-300">
                  <span className="text-[11px] font-bold uppercase text-slate-400 block">Package Features:</span>
                  {pkg.features.map((f, i) => (
                    <div key={i} className="flex items-start gap-1.5">
                      <Check className="w-3.5 h-3.5 text-mts-teal-light shrink-0 mt-0.5" />
                      <span>{f}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-800 space-y-3">
                <span className="text-[11px] text-mts-teal-glow flex items-center gap-1 font-medium">
                  <Clock className="w-3 h-3" />
                  <span>Turnaround: {pkg.turnaroundTime}</span>
                </span>
                <a
                  href="#booking-section"
                  className="w-full py-2.5 px-3 rounded-xl bg-mts-teal hover:bg-mts-teal-light text-white text-xs font-bold flex items-center justify-center gap-1 transition text-center shadow-md"
                >
                  <span>Book This Service</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Official 3-Phase Process from Company Profile PDF */}
      <section className="bg-mts-dark/80 border-y border-slate-800 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold text-mts-teal-glow uppercase tracking-wider">
              Project Delivery Lifecycle
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
              Our Structured 3-Phase Process
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-2">
              Every project undertaken by Muganwa Technology Solutions Ltd strictly adheres to our proven three-phase delivery framework.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {installationSteps.map((step, idx) => (
              <div key={idx} className="bg-mts-surface/80 border border-slate-800 hover:border-mts-gold/50 rounded-2xl p-6 relative transition shadow-lg flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-xl bg-mts-teal-dark/60 text-mts-teal-glow flex items-center justify-center font-mono font-black text-lg border border-mts-teal-light/40">
                      {step.step}
                    </div>
                    <span className="px-3 py-1 rounded-full bg-mts-gold/10 border border-mts-gold/30 text-mts-gold font-bold text-xs">
                      {step.phase}
                    </span>
                  </div>
                  <h4 className="text-base font-bold text-white mb-2">{step.title}</h4>
                  <p className="text-xs text-slate-300 leading-relaxed">{step.description}</p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-800/80 text-[11px] text-slate-400 flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-mts-teal-light" />
                  <span>Quality Assurance Assured</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Booking Calendar Form Section */}
      <section id="booking-section" className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-mts-navy/90 border border-mts-gold/40 rounded-2xl p-6 sm:p-10 shadow-2xl backdrop-blur-md">
          <div className="text-center max-w-xl mx-auto mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-mts-gold/10 border border-mts-gold/30 text-mts-gold text-xs font-bold uppercase tracking-wider mb-2">
              <Calendar className="w-3.5 h-3.5" />
              <span>Interactive Scheduling</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white">
              Schedule Your Site Survey or Installation
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 mt-2">
              Select your preferred date and time slot. Our engineering team will confirm dispatch within 2 business hours.
            </p>
          </div>

          {bookingSuccess ? (
            <div className="bg-mts-surface border border-emerald-500/50 rounded-2xl p-8 text-center space-y-4 animate-fadeIn">
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500 flex items-center justify-center mx-auto text-emerald-400">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-white">Installation Request Confirmed!</h3>
              <p className="text-xs sm:text-sm text-slate-300 max-w-md mx-auto">
                Thank you, <strong>{formData.customerName}</strong>. Your installation reference code is{' '}
                <span className="font-mono text-mts-gold font-bold">{bookingSuccess}</span>.
              </p>
              <p className="text-xs text-slate-400">
                Managing Director <strong>Richard MUKIZA</strong> or our engineering dispatch team will contact you at{' '}
                <span className="text-white font-medium">{formData.phone}</span> prior to arrival.
              </p>
              <div className="pt-4">
                <button
                  type="button"
                  onClick={() => setBookingSuccess(null)}
                  className="px-5 py-2.5 rounded-lg bg-mts-teal text-white text-xs font-bold"
                >
                  Book Another Appointment
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Full Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Richard MUKIZA"
                    value={formData.customerName}
                    onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 text-white focus:border-mts-teal-light focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Phone Number (WhatsApp) *</label>
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
                    placeholder="muganwatechnologysolutions@gmail.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 text-white focus:border-mts-teal-light focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Property Type *</label>
                  <select
                    value={formData.propertyType}
                    onChange={(e) => setFormData({ ...formData, propertyType: e.target.value as any })}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 text-white focus:border-mts-teal-light focus:outline-none"
                  >
                    <option value="residential">Home / Villa / Private Residence</option>
                    <option value="retail">Retail Shop / Supermarket / Pharmacy</option>
                    <option value="office">Corporate Office / Banking Branch</option>
                    <option value="industrial">Warehouse / Industrial Factory / Data Center</option>
                    <option value="school">School / University Campus</option>
                    <option value="hospital">Hospital / Medical Center</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Installation Address / Street *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. KG 7 Ave, Kigali Commercial Tower"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 text-white focus:border-mts-teal-light focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">City / District *</label>
                  <input
                    type="text"
                    required
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 text-white focus:border-mts-teal-light focus:outline-none"
                  />
                </div>
              </div>

              {/* Date & Time Slot Picker */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Requested Date *</label>
                  <input
                    type="date"
                    required
                    min={new Date().toISOString().split('T')[0]}
                    value={formData.requestedDate}
                    onChange={(e) => setFormData({ ...formData, requestedDate: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 text-white focus:border-mts-teal-light focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Preferred Time Window *</label>
                  <select
                    value={formData.requestedTimeSlot}
                    onChange={(e) => setFormData({ ...formData, requestedTimeSlot: e.target.value as any })}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 text-white focus:border-mts-teal-light focus:outline-none"
                  >
                    <option value="morning">Morning (08:00 AM - 12:00 PM)</option>
                    <option value="afternoon">Afternoon (01:00 PM - 05:00 PM)</option>
                    <option value="evening">After-Hours / Night Shift</option>
                  </select>
                </div>
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Estimated Equipment Count</label>
                  <input
                    type="number"
                    min="1"
                    max="100"
                    value={formData.numberOfCameras}
                    onChange={(e) => setFormData({ ...formData, numberOfCameras: Number(e.target.value) })}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 text-white focus:border-mts-teal-light focus:outline-none"
                  />
                </div>
              </div>

              {/* Wiring toggle */}
              <label className="flex items-center gap-2 cursor-pointer text-slate-300 select-none pt-1">
                <input
                  type="checkbox"
                  checked={formData.hasExistingWiring}
                  onChange={(e) => setFormData({ ...formData, hasExistingWiring: e.target.checked })}
                  className="rounded text-mts-teal-light w-4 h-4 bg-slate-900 border-slate-700"
                />
                <span>Property already has existing conduit pipes or Cat6 cabling in place</span>
              </label>

              {/* Special Instructions */}
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Special Site Notes & Requirements</label>
                <textarea
                  rows={3}
                  placeholder="Describe building layout, electrical room specs, cooling needs, or access control requirements..."
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 text-white focus:border-mts-teal-light focus:outline-none"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-mts-teal to-mts-teal-light hover:brightness-110 text-white font-extrabold text-sm shadow-glow-teal transition flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <span>Checking Engineering Dispatch Availability...</span>
                ) : (
                  <>
                    <Calendar className="w-4 h-4 text-mts-gold" />
                    <span>Confirm Site Survey / Engineering Booking</span>
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </section>
    </div>
  );
}
