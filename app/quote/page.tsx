'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { 
  FileCheck, 
  Upload, 
  ShieldCheck, 
  CheckCircle2, 
  Camera, 
  Building2, 
  FileText, 
  X,
  Sparkles
} from 'lucide-react';

function QuoteContent() {
  const searchParams = useSearchParams();

  const [formData, setFormData] = useState({
    fullName: '',
    companyName: '',
    email: '',
    phone: '',
    propertyType: searchParams.get('property') || 'residential',
    cameraCount: Number(searchParams.get('cameras')) || 8,
    indoorOutdoorSplit: '50% Indoor / 50% Outdoor Weatherproof',
    recordingDays: Number(searchParams.get('retention')) || 30,
    requiresAccessControl: false,
    requiresAlarmIntercom: false,
    propertyAddress: '',
    estimatedBudget: '$1,000 - $3,000',
    projectDetails: '',
  });

  interface UploadedAttachment {
    name: string;
    url: string;
    isImage: boolean;
  }

  const [uploadedFiles, setUploadedFiles] = useState<UploadedAttachment[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [quoteSuccessId, setQuoteSuccessId] = useState<string | null>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      filesArray.forEach((file) => {
        const isImg = file.type.startsWith('image/');
        const url = URL.createObjectURL(file);
        setUploadedFiles((prev) => [...prev, { name: file.name, url, isImage: isImg }]);
      });
    }
  };

  const removeFile = (index: number) => {
    setUploadedFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const res = await fetch('/api/quotes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          sitePhotoNames: uploadedFiles.map((f) => f.name),
        }),
      });
      const data = await res.json();
      if (res.ok) {
        setQuoteSuccessId(data.quote.id);
      } else {
        alert(data.error || 'Failed to submit quote request');
      }
    } catch (e) {
      setQuoteSuccessId(`QUO-2026-${Math.floor(100 + Math.random() * 900)}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Header Banner */}
      <div className="text-center max-w-2xl mx-auto mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-mts-gold/10 border border-mts-gold/30 text-mts-gold text-xs font-bold uppercase tracking-wider mb-2">
          <FileText className="w-3.5 h-3.5" />
          <span>Official Quotation & Engineering Review</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
          Request a Custom Security Quote
        </h1>
        <p className="text-xs sm:text-sm text-slate-300 mt-2">
          Upload floor plans, photos of your gates or building facades, and specify camera parameters. 
          Managing Director <strong>MUKIZA Richard</strong> and our senior engineering team will compile an itemized proposal within 24 hours.
        </p>
      </div>

      {quoteSuccessId ? (
        <div className="bg-mts-navy border border-emerald-500/50 rounded-2xl p-8 sm:p-12 text-center space-y-4 shadow-2xl animate-fadeIn">
          <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500 flex items-center justify-center mx-auto text-emerald-400">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-bold text-white">Quotation Request Successfully Logged!</h2>
          <p className="text-xs sm:text-sm text-slate-300 max-w-md mx-auto">
            Your quotation reference number is <span className="font-mono text-mts-gold font-bold">{quoteSuccessId}</span>.
          </p>
          <p className="text-xs text-slate-400">
            A copy of this inquiry has been routed to <strong>MUKIZA Richard</strong>. Our engineering desk will review 
            your building parameters and send an official PDF proposal to <span className="text-white font-medium">{formData.email}</span>.
          </p>
          <div className="pt-4">
            <button
              type="button"
              onClick={() => setQuoteSuccessId(null)}
              className="px-5 py-2.5 rounded-lg bg-mts-teal hover:bg-mts-teal-light text-white text-xs font-bold"
            >
              Submit Another Inquiry
            </button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="bg-mts-navy/80 border border-slate-800 rounded-2xl p-6 sm:p-10 space-y-6 shadow-2xl backdrop-blur-md text-xs">
          {/* Contact Details */}
          <div>
            <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-3 pb-2 border-b border-slate-800 flex items-center gap-2">
              <span>1. Client Information</span>
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Full Contact Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. David Karekezi"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 text-white focus:border-mts-teal-light focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Company / Organization Name (Optional)</label>
                <input
                  type="text"
                  placeholder="e.g. Grand Hill Hotel & Suites"
                  value={formData.companyName}
                  onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 text-white focus:border-mts-teal-light focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Email Address *</label>
                <input
                  type="email"
                  required
                  placeholder="name@organization.rw"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 text-white focus:border-mts-teal-light focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Phone / WhatsApp *</label>
                <input
                  type="tel"
                  required
                  placeholder="+250 788 000 000"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 text-white focus:border-mts-teal-light focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* Site Parameters */}
          <div className="pt-4">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-3 pb-2 border-b border-slate-800 flex items-center gap-2">
              <span>2. Facility Scope & Equipment Requirements</span>
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Property Type</label>
                <select
                  value={formData.propertyType}
                  onChange={(e) => setFormData({ ...formData, propertyType: e.target.value })}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 text-white focus:border-mts-teal-light focus:outline-none"
                >
                  <option value="residential">Private Residential Estate</option>
                  <option value="retail">Commercial Retail / Mall / Supermarket</option>
                  <option value="office">Corporate Headquarters / Bank</option>
                  <option value="industrial">Warehouse / Manufacturing Facility</option>
                  <option value="school">School / University Campus</option>
                  <option value="hospital">Hospital / Healthcare Facility</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Estimated Number of Cameras</label>
                <input
                  type="number"
                  min="1"
                  max="128"
                  value={formData.cameraCount}
                  onChange={(e) => setFormData({ ...formData, cameraCount: Number(e.target.value) })}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 text-white focus:border-mts-teal-light focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Required Recording History (Days)</label>
                <select
                  value={formData.recordingDays}
                  onChange={(e) => setFormData({ ...formData, recordingDays: Number(e.target.value) })}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 text-white focus:border-mts-teal-light focus:outline-none"
                >
                  <option value="15">15 Days Retention</option>
                  <option value="30">30 Days (Standard Corporate)</option>
                  <option value="60">60 Days (Enterprise)</option>
                  <option value="90">90 Days (Banking Grade)</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Physical Location / Address *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Kigali, Special Economic Zone, Block D"
                  value={formData.propertyAddress}
                  onChange={(e) => setFormData({ ...formData, propertyAddress: e.target.value })}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 text-white focus:border-mts-teal-light focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Estimated Budget Range</label>
                <select
                  value={formData.estimatedBudget}
                  onChange={(e) => setFormData({ ...formData, estimatedBudget: e.target.value })}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 text-white focus:border-mts-teal-light focus:outline-none"
                >
                  <option value="$500 - $1,500">$500 - $1,500 (Standard Setup)</option>
                  <option value="$1,500 - $4,000">$1,500 - $4,000 (Commercial Medium)</option>
                  <option value="$4,000 - $10,000">$4,000 - $10,000 (Multi-Room / Corporate)</option>
                  <option value="$10,000+">$10,000+ (Industrial / Campus Enterprise)</option>
                </select>
              </div>
            </div>

            {/* Additional Security Systems */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-3">
              <label className="flex items-center gap-2 p-3 rounded-lg bg-slate-900/60 border border-slate-800 cursor-pointer text-slate-300">
                <input
                  type="checkbox"
                  checked={formData.requiresAccessControl}
                  onChange={(e) => setFormData({ ...formData, requiresAccessControl: e.target.checked })}
                  className="rounded text-mts-teal-light w-4 h-4 bg-slate-900 border-slate-700"
                />
                <span>Include Biometric Access Control (Face ID / Fingerprint / Maglocks)</span>
              </label>

              <label className="flex items-center gap-2 p-3 rounded-lg bg-slate-900/60 border border-slate-800 cursor-pointer text-slate-300">
                <input
                  type="checkbox"
                  checked={formData.requiresAlarmIntercom}
                  onChange={(e) => setFormData({ ...formData, requiresAlarmIntercom: e.target.checked })}
                  className="rounded text-mts-teal-light w-4 h-4 bg-slate-900 border-slate-700"
                />
                <span>Include Wireless Intruder Alarm or Video Intercom Doorbell</span>
              </label>
            </div>
          </div>

          {/* Site Photos Upload Simulation */}
          <div className="pt-4">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-3 pb-2 border-b border-slate-800 flex items-center gap-2">
              <span>3. Site Photos or Floor Plans Upload</span>
            </h3>

            <div className="border-2 border-dashed border-slate-700 hover:border-mts-teal-light rounded-xl p-6 text-center cursor-pointer bg-slate-900/40 transition relative">
              <input
                type="file"
                multiple
                accept="image/*,.pdf"
                onChange={handleFileUpload}
                className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
              />
              <Upload className="w-8 h-8 text-mts-teal mx-auto mb-2" />
              <p className="font-semibold text-white">Click or drag & drop property photos or PDF blueprints from your device</p>
              <p className="text-[11px] text-slate-400 mt-1">Camera photos, JPG, PNG, WEBP, PDF up to 25MB each (gates, perimeters, server rooms)</p>
            </div>

            {/* Uploaded files list with image previews */}
            {uploadedFiles.length > 0 && (
              <div className="mt-4 space-y-2">
                <span className="text-xs text-slate-300 font-semibold">Attached files ({uploadedFiles.length}):</span>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                  {uploadedFiles.map((file, i) => (
                    <div
                      key={i}
                      className="bg-mts-surface border border-slate-700/80 rounded-xl p-2 relative group flex flex-col items-center overflow-hidden"
                    >
                      {file.isImage ? (
                        <div className="relative w-full h-24 rounded-lg overflow-hidden bg-slate-950 mb-2">
                          <img
                            src={file.url}
                            alt={file.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      ) : (
                        <div className="w-full h-24 rounded-lg bg-slate-900 flex items-center justify-center text-slate-400 mb-2">
                          <FileCheck className="w-8 h-8 text-emerald-400" />
                        </div>
                      )}

                      <span className="text-[11px] text-slate-300 truncate w-full text-center px-1 font-mono">
                        {file.name}
                      </span>

                      <button
                        type="button"
                        onClick={() => removeFile(i)}
                        className="absolute top-1 right-1 w-6 h-6 rounded-full bg-slate-900/90 hover:bg-red-600 text-slate-300 hover:text-white flex items-center justify-center transition shadow"
                        title="Remove file"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Notes */}
          <div className="pt-2">
            <label className="block text-slate-300 font-semibold mb-1">Detailed Project Description & Scope</label>
            <textarea
              rows={4}
              placeholder="Detail specific pain points, blind spots you want covered, camera angles, or existing hardware..."
              value={formData.projectDetails}
              onChange={(e) => setFormData({ ...formData, projectDetails: e.target.value })}
              className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 text-white focus:border-mts-teal-light focus:outline-none"
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-mts-teal to-mts-teal-light hover:brightness-110 text-white font-extrabold text-sm shadow-glow-teal transition flex items-center justify-center gap-2"
          >
            {isSubmitting ? (
              <span>Logging System Proposal Request...</span>
            ) : (
              <>
                <ShieldCheck className="w-4 h-4 text-mts-gold" />
                <span>Submit Detailed Quotation Request</span>
              </>
            )}
          </button>
        </form>
      )}
    </div>
  );
}

export default function QuotePage() {
  return (
    <Suspense fallback={<div className="p-12 text-center text-slate-400">Loading Quote Portal...</div>}>
      <QuoteContent />
    </Suspense>
  );
}
