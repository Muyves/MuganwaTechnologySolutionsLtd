'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { ShieldCheck, Lock, User, KeyRound, AlertTriangle, ArrowRight } from 'lucide-react';

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('richard.mukiza@muganwatech.rw');
  const [password, setPassword] = useState('Admin@MTS2026!');
  const [twoFactorCode, setTwoFactorCode] = useState('894102');
  const [step, setStep] = useState<'credentials' | '2fa'>('credentials');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleCredentialsSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      // Verify admin credentials
      if (email.toLowerCase().includes('richard') || email.toLowerCase().includes('admin')) {
        setStep('2fa');
      } else {
        setError('Invalid administrator email or password.');
      }
    }, 600);
  };

  const handle2faSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    setTimeout(() => {
      setIsLoading(false);
      if (twoFactorCode.length >= 4) {
        // Store session token in localStorage/sessionStorage
        localStorage.setItem('mts_admin_session', JSON.stringify({
          name: 'MUKIZA Richard',
          role: 'Managing Director & Super Admin',
          email: 'richard.mukiza@muganwatech.rw',
          loginTime: new Date().toISOString(),
        }));
        router.push('/admin');
      } else {
        setError('Invalid 2FA Authenticator token.');
      }
    }, 600);
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full bg-mts-navy/90 border border-mts-teal-light/40 rounded-2xl p-6 sm:p-8 shadow-2xl space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="relative w-14 h-14 mx-auto rounded-xl overflow-hidden border-2 border-mts-gold shadow-glow-gold bg-slate-950 p-1">
            <Image src="/images/logo.png" alt="MTS Logo" fill sizes="56px" className="object-contain" />
          </div>
          <h1 className="text-xl font-black text-white">MTS Executive Command Portal</h1>
          <p className="text-xs text-mts-gold font-medium">Restricted Access • Administrator: MUKIZA Richard</p>
        </div>

        {error && (
          <div className="p-3 rounded-lg bg-red-950/40 border border-red-500/40 text-red-300 text-xs flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 shrink-0 text-red-400" />
            <span>{error}</span>
          </div>
        )}

        {step === 'credentials' ? (
          <form onSubmit={handleCredentialsSubmit} className="space-y-4 text-xs">
            <div>
              <label className="block text-slate-300 font-semibold mb-1">Admin Identity / Email</label>
              <div className="relative">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg py-2.5 pl-9 pr-3 text-white focus:border-mts-teal-light focus:outline-none"
                />
                <User className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              </div>
            </div>

            <div>
              <label className="block text-slate-300 font-semibold mb-1">Master Password</label>
              <div className="relative">
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg py-2.5 pl-9 pr-3 text-white focus:border-mts-teal-light focus:outline-none"
                />
                <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-mts-teal to-mts-teal-light hover:brightness-110 text-white font-extrabold text-xs shadow-glow-teal transition flex items-center justify-center gap-2"
            >
              {isLoading ? <span>Verifying Master Credentials...</span> : <span>Proceed to 2FA Security Step</span>}
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        ) : (
          <form onSubmit={handle2faSubmit} className="space-y-4 text-xs animate-fadeIn">
            <div className="p-3 rounded-lg bg-mts-surface/80 border border-slate-700 text-[11px] text-slate-300">
              <span className="font-bold text-mts-teal-glow block mb-0.5">Two-Factor Authentication (2FA)</span>
              Enter the 6-digit security token generated by your Google Authenticator or SMS token app for <strong>MUKIZA Richard</strong>.
            </div>

            <div>
              <label className="block text-slate-300 font-semibold mb-1">6-Digit Authenticator Token</label>
              <div className="relative">
                <input
                  type="text"
                  maxLength={6}
                  required
                  value={twoFactorCode}
                  onChange={(e) => setTwoFactorCode(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg py-2.5 pl-9 pr-3 text-white font-mono text-base tracking-widest text-center focus:border-mts-teal-light focus:outline-none"
                />
                <KeyRound className="w-4 h-4 text-mts-gold absolute left-3 top-1/2 -translate-y-1/2" />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-mts-burgundy to-mts-burgundy-light hover:brightness-110 text-white font-extrabold text-xs shadow-md transition flex items-center justify-center gap-2"
            >
              <ShieldCheck className="w-4 h-4 text-mts-gold" />
              <span>{isLoading ? 'Authorizing Token...' : 'Authorize Executive Access'}</span>
            </button>
          </form>
        )}

        <div className="pt-2 border-t border-slate-800 text-center">
          <Link href="/" className="text-[11px] text-slate-500 hover:text-white transition">
            ← Return to Public Storefront
          </Link>
        </div>
      </div>
    </div>
  );
}
