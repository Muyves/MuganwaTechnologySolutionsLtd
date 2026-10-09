'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  ShieldCheck, 
  Camera, 
  Cpu, 
  Lock, 
  BellRing, 
  MonitorCheck, 
  Wrench, 
  ArrowRight, 
  CheckCircle2, 
  Star, 
  PhoneCall, 
  Sparkles,
  Award,
  Layers,
  FileCheck,
  Server,
  Zap,
  Wind,
  CheckCircle,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { initialProducts } from '@/data/products';
import { installationSteps, officialPartners, companyDivisions } from '@/data/services';
import ProductCard from '@/components/ProductCard';
import SecurityKitBuilder from '@/components/SecurityKitBuilder';
import { useLanguage } from '@/context/LanguageContext';

const heroSlides = [
  {
    id: 1,
    label: 'Security Systems',
    subtitle: '4K AI Surveillance, Biometrics & Remote Monitoring',
    image: 'https://images.unsplash.com/photo-1557597774-9d273605dfa9?auto=format&fit=crop&w=2000&q=85',
    alt: 'MTS 4K CCTV and Smart Security Cameras',
  },
  {
    id: 2,
    label: 'Structured Cabling',
    subtitle: 'Cat6A & Fiber Backbones with Certified Cable Management',
    image: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=2000&q=85',
    alt: 'High-Density Structured Cabling and Network Racks',
  },
  {
    id: 3,
    label: 'Data Center',
    subtitle: 'High-Density Computing, Server Racks & Network Infrastructure',
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=2000&q=85',
    alt: 'Enterprise Data Center Server Infrastructure',
  },
  {
    id: 4,
    label: 'Backup Power',
    subtitle: 'Industrial UPS, Inverters, ATS Generators & Clean Solar',
    image: 'https://images.unsplash.com/photo-1497440001374-f26997328c1b?auto=format&fit=crop&w=2000&q=85',
    alt: 'Mission-Critical Backup Power and Clean Solar Systems',
  },
  {
    id: 5,
    label: 'Precision Cooling',
    subtitle: 'Server Room Climate Control & VRF Thermal Management',
    image: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=2000&q=85',
    alt: 'HVAC Precision Cooling and Environmental Control',
  },
  {
    id: 6,
    label: 'Turnkey Installation',
    subtitle: 'Certified Engineers Deploying On-Site with Zero Compromise',
    image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=2000&q=85',
    alt: 'MTS Engineering Specialists Installing on Site',
  },
];

export default function HomePage() {
  const { t } = useLanguage();
  const [activeCategoryTab, setActiveCategoryTab] = useState('all');

  // Hero slideshow states
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  // Automatic slideshow changing every 5 seconds
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [isPaused]);

  const handleNextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  };

  const handlePrevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
  };

  // Touch swipe handlers for mobile
  const minSwipeDistance = 50;

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    if (distance > minSwipeDistance) {
      handleNextSlide();
    } else if (distance < -minSwipeDistance) {
      handlePrevSlide();
    }
  };

  const categories = [
    { id: 'cameras', name: 'CCTV Cameras', count: '6+ Models', icon: Camera, desc: 'IP, PTZ 360°, ColorVu, Dome & Bullet' },
    { id: 'recorders', name: '4K Recorders', count: '16 & 32 Ch', icon: Cpu, desc: 'NVR, Pentabrid XVR with PoE' },
    { id: 'networking', name: 'Networking & Satellite', count: 'Enterprise & Starlink', icon: Zap, desc: 'Starlink Kits, Sophos Firewalls, Ruijie Routers' },
    { id: 'access_control', name: 'Access & Fire Alarms', count: 'Touchless AI', icon: Lock, desc: 'Biometric Face ID, RFID & Asenware Alarms' },
    { id: 'workstations', name: 'IT & Data Centers', count: 'Enterprise', icon: Server, desc: 'Workstations, HP Laptops, Server Racks' },
    { id: 'accessories', name: 'Racks, Storage & HVAC', count: '4U Racks & Cooling', icon: Wind, desc: 'Hikvision 4U Racks, WD Purple, Precision Cooling' },
  ];

  const filteredProducts = initialProducts.filter((p) => {
    if (activeCategoryTab === 'all') return true;
    if (activeCategoryTab === 'featured') return p.featured;
    if (activeCategoryTab === 'bestseller') return p.bestSeller;
    if (activeCategoryTab === 'networking') return p.category === 'networking';
    if (activeCategoryTab === 'cameras') return p.category === 'cameras';
    if (activeCategoryTab === 'access') return p.category === 'access_control';
    return true;
  });

  return (
    <div className="space-y-16 sm:space-y-24">
      {/* 1. FULL-SCREEN HERO SLIDESHOW (100vw x 100vh presentation) */}
      <section 
        className="relative w-full h-[100dvh] min-h-[660px] md:min-h-[720px] max-h-[1080px] overflow-hidden flex flex-col justify-between -mt-[64px] md:-mt-[92px] pt-[84px] md:pt-[108px] border-b border-mts-teal-dark/40"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        {/* Full-Screen Slides Background with Ken Burns & Fade */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none select-none">
          {heroSlides.map((slide, index) => {
            const isActive = index === currentSlide;
            return (
              <div
                key={slide.id}
                className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                  isActive ? 'opacity-100 z-10' : 'opacity-0 z-0'
                }`}
              >
                <Image
                  src={slide.image}
                  alt={slide.alt}
                  fill
                  sizes="100vw"
                  priority={index === 0}
                  className={`object-cover object-center ${
                    isActive ? 'animate-kenburns' : ''
                  }`}
                />
              </div>
            );
          })}
        </div>

        {/* Dark Gradient Overlays (left side darker for crystal-clear readability) */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#08131E] via-[#08131E]/85 via-50% to-[#08131E]/35 z-20 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#08131E]/80 via-transparent via-40% to-[#08131E] z-20 pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(#149586_1px,transparent_1px)] [background-size:28px_28px] opacity-10 z-20 pointer-events-none" />

        {/* Main Content (Over Slideshow on Left Side) */}
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-30 flex-1 flex flex-col justify-center">
          <div className="max-w-3xl space-y-5 sm:space-y-6 text-left py-4 sm:py-6">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-mts-teal-dark/60 border border-mts-teal-light/40 text-mts-teal-glow text-xs font-semibold uppercase tracking-wider shadow-glow-teal backdrop-blur-md">
              <ShieldCheck className="w-4 h-4 text-mts-gold shrink-0" />
              <span>Telecommunications • Electricals • Computer Networks • Security</span>
            </div>

            {/* Headline */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.12]">
              Intelligent Security & Infrastructure. <br />
              <span className="bg-gradient-to-r from-mts-teal-glow via-white to-mts-gold bg-clip-text text-transparent">
                Engineered with Zero Compromise.
              </span>
            </h1>

            {/* Subtitle Paragraph */}
            <p className="text-sm sm:text-base lg:text-lg text-slate-200/95 max-w-2xl leading-relaxed drop-shadow-sm font-normal">
              <strong className="text-white font-bold">Muganwa Technology Solutions Ltd (MTS)</strong> delivers turnkey electronic security, data center computing, 
              electrical power systems, and HVAC precision cooling across Rwanda and East Africa — led by Managing Director <strong className="text-white font-bold">Richard MUKIZA</strong>.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3.5 sm:gap-4 pt-2">
              <Link
                href="/kit-builder"
                className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-mts-teal to-mts-teal-light hover:brightness-110 text-white font-extrabold text-sm flex items-center gap-2 shadow-glow-teal transition transform hover:-translate-y-0.5 shrink-0"
              >
                <Sparkles className="w-4 h-4 text-mts-gold" />
                <span>Build Your Custom Kit</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <Link
                href="/quote"
                className="px-6 py-3.5 rounded-xl bg-mts-surface/90 hover:bg-slate-800 border border-slate-700/80 hover:border-mts-gold/40 text-white font-semibold text-sm flex items-center gap-2 backdrop-blur-md transition transform hover:-translate-y-0.5 shrink-0"
              >
                <Wrench className="w-4 h-4 text-mts-gold" />
                <span>Book Free Site Survey</span>
              </Link>
            </div>

            {/* Key Trust Statistics */}
            <div className="pt-6 sm:pt-8 border-t border-slate-700/50 grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-2xl">
              <div>
                <div className="text-2xl sm:text-3xl font-black text-white">2024</div>
                <div className="text-xs text-slate-300 mt-0.5">Founded in Rwanda</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-black text-mts-teal-glow">10+</div>
                <div className="text-xs text-slate-300 mt-0.5">Dedicated Specialists</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-black text-mts-gold">19+</div>
                <div className="text-xs text-slate-300 mt-0.5">Global Tech Partners</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-black text-white">100%</div>
                <div className="text-xs text-slate-300 mt-0.5">Quality Guaranteed</div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Hero Controls & Badges Bar */}
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-30 pb-5 sm:pb-7 pt-2">
          <div className="flex flex-col lg:flex-row items-start lg:items-end justify-between gap-4">
            
            {/* Bottom-Left: Animated Slide Caption Label */}
            <div 
              key={currentSlide} 
              className="animate-slideInUp flex items-center gap-3 bg-slate-950/80 backdrop-blur-md border border-mts-teal-dark/60 rounded-xl px-4 py-2.5 shadow-xl max-w-md"
            >
              <div className="w-2.5 h-2.5 rounded-full bg-mts-teal-glow animate-pulse shrink-0" />
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono text-mts-gold uppercase tracking-wider font-bold">
                    Slide {String(currentSlide + 1).padStart(2, '0')} / {String(heroSlides.length).padStart(2, '0')}
                  </span>
                  <span className="text-slate-600">•</span>
                  <span className="text-xs font-bold text-white tracking-wide">
                    {heroSlides[currentSlide].label}
                  </span>
                </div>
                <p className="text-[11px] text-slate-300 truncate max-w-xs sm:max-w-sm mt-0.5">
                  {heroSlides[currentSlide].subtitle}
                </p>
              </div>
            </div>

            {/* Bottom-Center: Slide Indicators & Navigation Arrows */}
            <div className="flex items-center gap-3 bg-slate-950/80 backdrop-blur-md border border-slate-800 rounded-full px-3 py-1.5 shadow-xl">
              <button
                type="button"
                onClick={handlePrevSlide}
                className="p-1.5 rounded-full text-slate-300 hover:text-white hover:bg-slate-800/80 transition cursor-pointer"
                aria-label="Previous slide"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              <div className="flex items-center gap-1.5">
                {heroSlides.map((_, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setCurrentSlide(idx)}
                    className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                      idx === currentSlide
                        ? 'w-8 bg-gradient-to-r from-mts-teal to-mts-teal-glow shadow-glow-teal'
                        : 'w-2 bg-slate-600/70 hover:bg-slate-400'
                    }`}
                    aria-label={`Go to slide ${idx + 1}`}
                  />
                ))}
              </div>

              <button
                type="button"
                onClick={handleNextSlide}
                className="p-1.5 rounded-full text-slate-300 hover:text-white hover:bg-slate-800/80 transition cursor-pointer"
                aria-label="Next slide"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* Bottom-Right: Partner & Certification Badges */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
              <div className="bg-mts-burgundy/90 backdrop-blur-md px-3 py-1.5 rounded-lg text-[11px] font-bold text-white border border-mts-gold/40 shadow-lg flex items-center gap-1.5 shrink-0">
                <ShieldCheck className="w-3.5 h-3.5 text-mts-gold shrink-0" />
                <span>Hikvision & Cisco Certified</span>
              </div>

              <div className="bg-slate-900/90 backdrop-blur-md px-3 py-1.5 rounded-lg text-[11px] font-semibold text-slate-200 border border-slate-700/80 shadow-lg flex items-center gap-1.5 shrink-0">
                <Award className="w-3.5 h-3.5 text-mts-gold shrink-0" />
                <div>
                  <span className="font-bold text-white">Official Authorized Partner: </span>
                  <span className="text-slate-300">Asenware, Cisco, Huawei & Hikvision</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. FIVE CORE PILLARS SHOWCASE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-bold text-mts-teal-glow uppercase tracking-wider">Five Core Pillars</span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
            End-to-End Technology & Engineering Divisions
          </h2>
          <p className="text-sm text-slate-400 mt-2">
            Explore our comprehensive technology portfolio spanning physical security, enterprise computing, power infrastructure, and precision climate control.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {categories.map((cat) => {
            const Icon = cat.icon;
            return (
              <Link
                key={cat.id}
                href={`/products?category=${cat.id}`}
                className="group relative bg-mts-navy/70 hover:bg-mts-surface border border-slate-800 hover:border-mts-teal-light/60 rounded-xl p-6 transition-all duration-300 shadow-md hover:shadow-glow-teal flex flex-col justify-between overflow-hidden"
              >
                <div className="flex items-start justify-between">
                  <div className="p-3 rounded-xl bg-mts-teal-dark/50 text-mts-teal-glow group-hover:scale-110 group-hover:bg-mts-teal transition-all">
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="text-xs font-semibold text-mts-gold bg-slate-900/80 px-2.5 py-1 rounded-full border border-slate-700">
                    {cat.count}
                  </span>
                </div>

                <div className="mt-5">
                  <h3 className="text-base font-bold text-white group-hover:text-mts-teal-glow transition flex items-center gap-1">
                    <span>{cat.name}</span>
                    <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                  </h3>
                  <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">
                    {cat.desc}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* 3. FEATURED PRODUCTS CATALOG PREVIEW */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="text-xs font-bold text-mts-gold uppercase tracking-wider">
              Top Surveillance & Networking Equipment
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
              Featured Hardware Catalog
            </h2>
          </div>

          {/* Filter Tabs */}
          <div className="flex flex-wrap gap-1.5 bg-slate-900/80 p-1 rounded-xl border border-slate-800 text-xs font-semibold">
            {[
              { id: 'all', label: 'All Items' },
              { id: 'featured', label: 'Featured' },
              { id: 'networking', label: 'Networking & Satellite' },
              { id: 'bestseller', label: 'Best Sellers' },
              { id: 'cameras', label: 'CCTV Cameras' },
              { id: 'access', label: 'Access Control' },
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveCategoryTab(tab.id)}
                className={`px-3 py-1.5 rounded-lg transition ${
                  activeCategoryTab === tab.id
                    ? 'bg-mts-teal text-white shadow-glow-teal'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredProducts.slice(0, 8).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        <div className="text-center mt-10">
          <Link
            href="/products"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-mts-surface hover:bg-slate-800 border border-slate-700 text-white text-xs font-bold transition"
          >
            <span>View All Products in Catalog ({initialProducts.length} Items)</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* 4. INTERACTIVE SECURITY KIT BUILDER WIDGET */}
      <SecurityKitBuilder />

      {/* 5. OFFICIAL GLOBAL PARTNER SHOWCASE (19 Partners) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-8">
          <span className="text-xs font-bold text-mts-gold uppercase tracking-wider">
            Enterprise Alliances
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
            Global Technology Partners & Manufacturers
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-2">
            Authorized supply, implementation, and certified warranty support for leading global technology brands.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
          {officialPartners.map((p, idx) => (
            <div
              key={idx}
              className="bg-mts-navy/80 border border-slate-800 hover:border-mts-teal-light/50 rounded-xl p-4 text-center transition flex flex-col items-center justify-center shadow-sm hover:shadow-glow-teal"
            >
              <span className="font-extrabold text-white text-sm">
                {p.name}
              </span>
              <span className="text-[10px] text-slate-400 mt-1">
                {p.category}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* 6. THE 3-PHASE PROCESS (Direct from Company Profile PDF) */}
      <section className="bg-mts-navy/60 border-y border-slate-800 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold text-mts-teal-glow uppercase tracking-wider">
              Methodology
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
              Our 3-Phase Delivery Framework
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-2">
              Every project from Muganwa Technology Solutions Ltd follows a disciplined, structured 3-phase execution cycle.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {installationSteps.map((s, idx) => (
              <div
                key={idx}
                className="relative bg-mts-surface/90 border border-slate-800 hover:border-mts-gold/50 rounded-2xl p-6 flex flex-col justify-between shadow-lg transition"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-2xl font-black text-mts-teal-light font-mono block">
                      {s.step}
                    </span>
                    <span className="px-3 py-1 rounded-full bg-mts-gold/10 border border-mts-gold/30 text-mts-gold text-xs font-bold">
                      {s.phase}
                    </span>
                  </div>
                  <h4 className="text-base font-bold text-white mb-2">{s.title}</h4>
                  <p className="text-xs text-slate-300 leading-relaxed">{s.description}</p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-800 text-[11px] text-mts-teal-glow flex items-center gap-1.5 font-medium">
                  <CheckCircle className="w-3.5 h-3.5 text-mts-teal-light" />
                  <span>Quality Assurance Standard</span>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 text-center">
            <Link
              href="/services"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-mts-burgundy to-mts-burgundy-light text-white text-xs font-bold shadow-md hover:brightness-110 transition"
            >
              <Wrench className="w-4 h-4 text-mts-gold" />
              <span>Explore All Engineering Services & Book a Survey</span>
            </Link>
          </div>
        </div>
      </section>

      {/* 7. LEADERSHIP NOTE FROM RICHARD MUKIZA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-mts-navy via-mts-dark to-slate-950 rounded-2xl border border-mts-teal-light/40 p-8 sm:p-12 shadow-2xl relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-mts-gold/10 border border-mts-gold/30 text-mts-gold text-xs font-bold uppercase tracking-wider">
                <ShieldCheck className="w-4 h-4" />
                <span>Executive Commitment</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-black text-white">
                "We don't just sell technology. We build resilient engineering foundations."
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                "In our fast-evolving digital world, an organization's safety and operational efficiency depend entirely on 
                uncompromising engineering standards. At Muganwa Technology Solutions Ltd, we combine authorized global hardware 
                with rigorous structured cabling, clean conduits, surge-protected power, and cyber-hardened network configurations. 
                Whether securing a private residence or provisioning an enterprise data center, our 10+ dedicated specialists 
                ensure total reliability."
              </p>
              <div className="pt-2">
                <div className="text-base font-extrabold text-white">Richard MUKIZA</div>
                <div className="text-xs text-mts-gold font-medium">
                  Founder & Managing Director • Muganwa Technology Solutions Ltd (MTS)
                </div>
              </div>
            </div>

            <div className="lg:col-span-4 flex flex-col items-center justify-center p-6 rounded-xl bg-slate-900/80 border border-slate-800 text-center space-y-4">
              <div className="relative w-28 h-28 rounded-full overflow-hidden border-2 border-mts-gold shadow-glow-gold bg-slate-950 p-2">
                <Image src="/images/logo.png" alt="MTS Logo" fill sizes="112px" className="object-contain" />
              </div>
              <div>
                <span className="text-xs font-bold text-white uppercase tracking-wider block">
                  MTS Engineering Guarantee
                </span>
                <span className="text-[11px] text-slate-400 block mt-0.5">
                  Telecommunications • Electricals • Computer Networks • HVAC
                </span>
              </div>
              <Link
                href="/about"
                className="text-xs text-mts-teal-glow hover:underline font-semibold flex items-center gap-1"
              >
                <span>Read Full Company Profile</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 8. VERIFIED CUSTOMER TESTIMONIALS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="text-xs font-bold text-mts-gold uppercase tracking-wider">
            Verified Client Feedback
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
            Trusted by Enterprises, Institutions & Residences
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              name: 'Dr. Jean-Pierre Habimana',
              role: 'Medical Director, Polyclinique de Kigali',
              text: 'MTS installed a 16-channel 4K AcuSense system across our clinic and integrated biometric access control at our pharmacy. The night vision is crystal-clear and Richard MUKIZA personally ensured the project handover was immaculate.',
              rating: 5,
            },
            {
              name: 'Aline Uwase',
              role: 'Facility Manager, Commercial Tower',
              text: 'MTS deployed our server room precision cooling, Kstar UPS, and Cisco network switches. Their 3-phase delivery process kept our team informed at every stage. Flawless workmanship.',
              rating: 5,
            },
            {
              name: 'Emmanuel Ndayisaba',
              role: 'Logistics Operations Lead, Special Economic Zone',
              text: 'Their fiber optic CCTV backbone handles 32 warehouse cameras, gate barriers, and automated license plate recognition without any lag. Their preventative maintenance visits ensure our system never goes down.',
              rating: 5,
            },
          ].map((t, i) => (
            <div
              key={i}
              className="bg-mts-navy/80 border border-slate-800 rounded-xl p-6 flex flex-col justify-between"
            >
              <div>
                <div className="flex text-amber-400 gap-1 mb-3">
                  {[...Array(t.rating)].map((_, r) => (
                    <Star key={r} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <p className="text-xs text-slate-300 italic leading-relaxed">
                  "{t.text}"
                </p>
              </div>

              <div className="mt-5 pt-4 border-t border-slate-800">
                <span className="text-xs font-bold text-white block">{t.name}</span>
                <span className="text-[11px] text-slate-400 block">{t.role}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 9. FINAL EMERGENCY & CONSULTATION BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="bg-gradient-to-r from-mts-teal-dark via-mts-navy to-mts-burgundy-dark rounded-2xl p-8 sm:p-12 border border-mts-gold/40 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-left">
            <span className="text-xs font-extrabold uppercase text-mts-gold tracking-wider">
              Ready to Upgrade Your Infrastructure?
            </span>
            <h3 className="text-2xl sm:text-3xl font-black text-white">
              Schedule Your Free Engineering Consultation Today
            </h3>
            <p className="text-xs sm:text-sm text-slate-200 max-w-xl">
              Our engineering team will assess your facility, model optimal equipment specifications, and provide a 
              zero-obligation itemized blueprint within 24 hours.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 shrink-0">
            <Link
              href="/quote"
              className="px-6 py-3.5 rounded-xl bg-white text-slate-950 hover:bg-slate-100 font-extrabold text-xs shadow-lg transition text-center"
            >
              Request Free Site Survey
            </Link>
            <a
              href="tel:+250789420541"
              className="px-6 py-3.5 rounded-xl bg-slate-900/80 hover:bg-slate-900 border border-slate-700 text-white font-semibold text-xs flex items-center justify-center gap-2 transition"
            >
              <PhoneCall className="w-4 h-4 text-mts-teal-glow" />
              <span>+250 789 420 541</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
