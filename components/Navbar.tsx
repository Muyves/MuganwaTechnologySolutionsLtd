'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { 
  ShieldCheck, 
  ShoppingCart, 
  Layers, 
  Phone, 
  Search, 
  Menu, 
  X, 
  Wrench, 
  User,
  UserCheck, 
  FileText, 
  Globe,
  ChevronDown,
  Sparkles,
  ArrowRight,
  Camera,
  Cpu,
  Lock,
  Server,
  Zap,
  Wind,
  LogOut,
  MessageSquare,
  CheckCircle2,
  MoreHorizontal,
  Building2,
  Factory,
  GraduationCap,
  Home
} from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useCompare } from '@/context/CompareContext';
import { useLanguage } from '@/context/LanguageContext';
import { useCurrency } from '@/context/CurrencyContext';

export default function Navbar() {
  const pathname = usePathname();
  const isHome = pathname === '/';
  const router = useRouter();
  const { totalItems, setIsCartOpen } = useCart();
  const { compareList, setIsCompareOpen } = useCompare();
  const { language, setLanguage, t } = useLanguage();
  const { currency, setCurrency } = useCurrency();

  // Navigation and UI states
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Dropdown states
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [phoneDropdownOpen, setPhoneDropdownOpen] = useState(false);
  const [accountDropdownOpen, setAccountDropdownOpen] = useState(false);

  // Mobile accordion states
  const [mobileProductsOpen, setMobileProductsOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [mobileSolutionsOpen, setMobileSolutionsOpen] = useState(false);

  // Admin session state
  const [adminUser, setAdminUser] = useState<{ name: string; role: string; email: string } | null>(null);

  const searchInputRef = useRef<HTMLInputElement>(null);
  const navContainerRef = useRef<HTMLDivElement>(null);

  // Detect scroll to shrink navbar slightly
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Check if admin is logged in from localStorage
  useEffect(() => {
    try {
      const session = localStorage.getItem('mts_admin_session');
      if (session) {
        setAdminUser(JSON.parse(session));
      } else {
        setAdminUser(null);
      }
    } catch (e) {
      setAdminUser(null);
    }
  }, [pathname]);

  // Close menus on outside click or Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setActiveDropdown(null);
        setPhoneDropdownOpen(false);
        setAccountDropdownOpen(false);
        setSearchOpen(false);
        setMobileMenuOpen(false);
      }
    };

    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;
      if (!target.closest('[data-dropdown-container]')) {
        setActiveDropdown(null);
      }
      if (!target.closest('[data-phone-dropdown]')) {
        setPhoneDropdownOpen(false);
      }
      if (!target.closest('[data-account-dropdown]')) {
        setAccountDropdownOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Focus search input when search is opened
  useEffect(() => {
    if (searchOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [searchOpen]);

  // Lock body scroll when mobile menu is active
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [mobileMenuOpen]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchOpen(false);
      setMobileMenuOpen(false);
    }
  };

  const handleLogout = () => {
    try {
      localStorage.removeItem('mts_admin_session');
      setAdminUser(null);
      setAccountDropdownOpen(false);
      router.push('/');
    } catch (e) {
      console.error(e);
    }
  };

  // Categories for Products Mega Menu
  const productCategories = [
    { name: 'CCTV Cameras', desc: 'IP, PTZ 360Â°, 4K ColorVu, Dome & Bullet', href: '/products?category=cameras', icon: Camera, tag: '4K AI' },
    { name: '4K Recorders', desc: 'PoE NVRs, Pentabrid XVRs (16 & 32 Channel)', href: '/products?category=recorders', icon: Cpu, tag: 'H.265+' },
    { name: 'Access Control', desc: 'Biometric Face ID, RFID & Smart Locks', href: '/products?category=access_control', icon: Lock, tag: 'Touchless' },
    { name: 'IT & Data Centers', desc: 'Enterprise Server Racks, Workstations & Laptops', href: '/products?category=workstations', icon: Server, tag: 'Enterprise' },
    { name: 'Networking & Satellite', desc: 'Starlink Kits, Sophos Firewalls, Ruijie Wi-Fi 6', href: '/products?category=networking', icon: Zap, tag: 'Gigabit' },
    { name: 'Electrical & Power', desc: 'Industrial Generators, Kstar UPS, Solar Systems', href: '/services', icon: Zap, tag: '24/7 Power' },
    { name: 'Racks, Storage & Cat6', desc: 'Hikvision 4U Cabinets, WD Purple HDDs, Cat6A', href: '/products?category=accessories', icon: Wind, tag: 'Storage' },
  ];

  // Services Menu Options
  const serviceOptions = [
    { 
      title: 'Turnkey Installation Services', 
      desc: 'Structured Cat6/Fiber cabling, clean conduit routing, camera mounting & Fluke certification.', 
      href: '/services#booking-section',
      icon: Wrench,
      tag: 'Certified Fluke',
    },
    { 
      title: 'Annual Preventative Maintenance (SLA)', 
      desc: 'Quarterly camera optical audits, storage drive health inspection & firmware security hardening.', 
      href: '/services',
      icon: ShieldCheck,
      tag: 'Quarterly SLA',
    },
    { 
      title: 'Site Survey & Security Audit', 
      desc: 'Free on-site risk analysis, camera blind spot mapping & transparent itemized bill of materials (BoM).', 
      href: '/quote',
      icon: FileText,
      tag: '100% Free',
    },
    { 
      title: '24/7 Technical Support & Dispatch', 
      desc: 'Guaranteed 4-hour emergency technician dispatch across Rwanda and remote cloud diagnostics.', 
      href: '/contact',
      icon: Phone,
      tag: '4hr Dispatch',
    },
  ];

  // Solutions Options
  const solutionOptions = [
    { 
      title: 'Homes & Private Villas', 
      desc: 'Perimeter tripwire strobe deterrence, smart video intercoms & real-time mobile push alerts.', 
      href: '/solutions/home-security',
      icon: Home,
      tag: 'Smart Living',
    },
    { 
      title: 'Retail Stores & Corporate Offices', 
      desc: 'POS cash register video sync, customer counting analytics & biometric touchless door locks.', 
      href: '/solutions/business-retail',
      icon: Building2,
      tag: 'POS Overlay',
    },
    { 
      title: 'Industrial Plants & Warehouses', 
      desc: 'ANPR vehicle license tracking, perimeter radar detection & single-mode optical fiber backbone.', 
      href: '/solutions/industrial-warehouse',
      icon: Factory,
      tag: 'ANPR Radar',
    },
    { 
      title: 'Schools & University Campuses', 
      desc: 'Corridor surveillance, emergency lockdown systems, visitor badging & campus-wide Wi-Fi 6.', 
      href: '/solutions/schools-education',
      icon: GraduationCap,
      tag: 'Lockdown Ready',
    },
  ];

  return (
    <header
      className={`sticky top-0 z-[100] w-full transition-all duration-300 ${
        isScrolled ? 'shadow-[0_4px_24px_rgba(0,0,0,0.7)]' : ''
      }`}
      ref={navContainerRef}
    >
      {/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
          ROW 1 â€” UTILITY BAR
      â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */}
      <div className={`hidden md:flex w-full bg-[#040e17] border-b border-white/5 transition-all duration-300 overflow-hidden ${
        isScrolled ? 'max-h-0 border-0' : 'max-h-10'
      }`}>
        <div className="max-w-[1400px] mx-auto w-full px-6 flex items-center justify-between text-[11px] text-slate-400 h-9">
          {/* Left: Certification badge */}
          <div className="flex items-center gap-2.5 text-mts-gold font-medium">
            <ShieldCheck className="w-3.5 h-3.5 shrink-0" />
            <span>Certified Security Systems Installer &amp; Distributor</span>
            <span className="text-slate-700">|</span>
            <span className="text-slate-400 font-normal">Kigali, Rwanda</span>
          </div>

          {/* Right: Phone, Track, Language, Currency */}
          <div className="flex items-center gap-5">
            {/* Phone with dropdown */}
            <div className="relative" data-phone-dropdown>
              <div className="flex items-center gap-1.5 cursor-default">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse shrink-0" />
                <Phone className="w-3 h-3 text-mts-teal-glow shrink-0" />
                <a href="tel:+250789420541" className="hover:text-white text-slate-200 font-medium transition">+250 789 420 541</a>
                <button type="button" onClick={() => setPhoneDropdownOpen(!phoneDropdownOpen)} className="text-slate-500 hover:text-white transition" aria-label="More numbers">
                  <ChevronDown className={`w-3 h-3 transition-transform ${phoneDropdownOpen ? 'rotate-180 text-mts-gold' : ''}`} />
                </button>
              </div>
              {phoneDropdownOpen && (
                <div className="absolute left-0 top-full pt-2 z-[110]" data-phone-dropdown>
                  <div className="w-80 bg-[#07131e] border border-slate-700/70 rounded-xl p-4 shadow-[0_20px_50px_rgba(0,0,0,0.9)] text-xs space-y-3 relative overflow-hidden">
                    <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-mts-teal via-mts-teal-light to-mts-gold" />
                    <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                      <span className="font-bold text-white uppercase tracking-wider text-[10px]">Engineering Hotlines</span>
                      <span className="text-emerald-400 text-[10px] bg-emerald-950/80 px-2 py-0.5 rounded-full border border-emerald-700/50 font-bold">24/7 Live</span>
                    </div>
                    <a href="tel:+250789420541" className="flex items-center gap-3 p-2.5 rounded-lg bg-slate-900/60 hover:bg-slate-800/90 border border-slate-800 hover:border-mts-teal/40 transition group">
                      <div className="p-1.5 rounded-lg bg-mts-teal/15 text-mts-teal-glow group-hover:bg-mts-teal group-hover:text-white transition"><Phone className="w-3.5 h-3.5" /></div>
                      <div><span className="text-[10px] text-slate-400 block">Primary &amp; WhatsApp</span><span className="text-white font-bold text-sm">+250 789 420 541</span></div>
                    </a>
                    <a href="tel:+250780756523" className="flex items-center gap-3 p-2.5 rounded-lg bg-slate-900/60 hover:bg-slate-800/90 border border-slate-800 hover:border-mts-teal/40 transition group">
                      <div className="p-1.5 rounded-lg bg-mts-teal/15 text-mts-teal-glow group-hover:bg-mts-teal group-hover:text-white transition"><Phone className="w-3.5 h-3.5" /></div>
                      <div><span className="text-[10px] text-slate-400 block">Secondary Emergency</span><span className="text-white font-bold text-sm">+250 780 756 523</span></div>
                    </a>
                    <div className="pt-2 border-t border-slate-800 flex items-center gap-2">
                      <span className="text-slate-500">Email:</span>
                      <a href="mailto:muganwatechnologysolutions@gmail.com" className="text-slate-300 hover:text-mts-gold transition truncate font-mono text-[10px]">muganwatechnologysolutions@gmail.com</a>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <Link href="/track-order" className="hover:text-white transition flex items-center gap-1"><FileText className="w-3 h-3" /><span>{t('trackOrder')}</span></Link>

            {/* Language */}
            <div className="flex items-center gap-1">
              <Globe className="w-3 h-3" />
              <button type="button" onClick={() => setLanguage('en')} className={`font-bold px-1 transition ${language === 'en' ? 'text-mts-gold' : 'hover:text-white'}`}>EN</button>
              <span className="text-slate-700">|</span>
              <button type="button" onClick={() => setLanguage('fr')} className={`font-bold px-1 transition ${language === 'fr' ? 'text-mts-gold' : 'hover:text-white'}`}>FR</button>
            </div>

            {/* Currency */}
            <div className="flex items-center gap-1">
              <button type="button" onClick={() => setCurrency('USD')} className={`font-bold px-1 transition ${currency === 'USD' ? 'text-mts-gold' : 'hover:text-white'}`}>$ USD</button>
              <span className="text-slate-700">|</span>
              <button type="button" onClick={() => setCurrency('RWF')} className={`font-bold px-1 transition ${currency === 'RWF' ? 'text-mts-gold' : 'hover:text-white'}`}>Rwf</button>
            </div>
          </div>
        </div>
      </div>

      {/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
          ROW 2 â€” MAIN NAVIGATION BAR
      â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */}
      <div className={`w-full transition-all duration-300 ${
        isScrolled
          ? 'bg-[#05111a]/98 backdrop-blur-2xl border-b border-mts-teal/20'
          : isHome
          ? 'bg-[#07131e]/90 backdrop-blur-xl border-b border-white/8'
          : 'bg-[#07131e]/98 backdrop-blur-xl border-b border-white/8'
      }`}>
        <div className="max-w-[1400px] mx-auto w-full px-4 sm:px-6">
          <div className="flex items-center gap-6 h-16">

            {/* â”€â”€ LOGO â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
            <Link href="/" className="flex items-center gap-3 group shrink-0 select-none" aria-label="Muganwa Technology Solutions Home">
              <div className="relative w-10 h-10 rounded-lg overflow-hidden border border-mts-gold/40 bg-[#050e17] p-0.5 shrink-0 transition-all duration-300 group-hover:border-mts-gold group-hover:shadow-[0_0_14px_rgba(212,175,55,0.35)]">
                <Image src="/images/logo.png" alt="MTS Logo" fill sizes="40px" className="object-contain p-0.5" priority />
              </div>
              <div className="hidden sm:flex flex-col leading-tight">
                <span className="font-black text-white text-sm tracking-wide group-hover:text-mts-teal-glow transition-colors duration-200">MUGANWA</span>
                <span className="text-[10px] text-mts-gold font-semibold tracking-widest uppercase">Technology Solutions</span>
              </div>
            </Link>

            {/* â”€â”€ DESKTOP NAV LINKS â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
            <nav className="hidden lg:flex items-center flex-1 justify-center gap-0.5 text-sm font-medium whitespace-nowrap">
              {/* Home */}
              <Link href="/" className={`relative px-3.5 py-2 text-sm font-medium transition-colors duration-150 ${pathname === '/' ? 'text-mts-teal-glow' : 'text-slate-300 hover:text-white'}`}>
                {t('home')}
                {pathname === '/' && <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-gradient-to-r from-mts-teal to-mts-gold rounded-full" />}
              </Link>

              {/* Products â€” with FLYOUT */}
              <div data-dropdown-container="products" className="relative" onMouseEnter={() => setActiveDropdown('products')} onMouseLeave={() => setActiveDropdown(null)}>
                <button type="button" onClick={() => setActiveDropdown(activeDropdown === 'products' ? null : 'products')} className={`relative flex items-center gap-1 px-3.5 py-2 text-sm font-medium transition-colors duration-150 ${pathname.startsWith('/products') || activeDropdown === 'products' ? 'text-mts-teal-glow' : 'text-slate-300 hover:text-white'}`} aria-expanded={activeDropdown === 'products'} aria-haspopup="true">
                  {t('products')}
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${activeDropdown === 'products' ? 'rotate-180 text-mts-gold' : 'text-slate-500'}`} />
                  {(pathname.startsWith('/products') || activeDropdown === 'products') && <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-gradient-to-r from-mts-teal to-mts-gold rounded-full" />}
                </button>

                {/* PRODUCTS FLYOUT PANEL */}
                {activeDropdown === 'products' && (
                  <div className="absolute left-0 top-full z-[110]">
                    <div className="absolute -top-1 inset-x-0 h-2 bg-transparent" />
                    <div className="mt-0.5 w-[700px] max-w-[94vw] bg-[#06121d] border border-slate-700/60 rounded-xl shadow-[0_24px_60px_rgba(0,0,0,0.9),0_0_30px_rgba(20,149,134,0.12)] overflow-hidden animate-dropdown">
                      {/* Header strip */}
                      <div className="bg-[#040e17] border-b border-slate-800 px-5 py-3 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-mts-gold uppercase tracking-widest">Hardware &amp; Equipment Catalog</span>
                          <span className="text-[10px] text-emerald-400 bg-emerald-950/80 border border-emerald-700/40 px-2 py-0.5 rounded-full font-bold">21+ In Stock</span>
                        </div>
                        <Link href="/products" onClick={() => setActiveDropdown(null)} className="flex items-center gap-1 text-xs text-mts-teal-glow hover:text-white font-semibold transition group/browse">
                          Browse All <ArrowRight className="w-3 h-3 group-hover/browse:translate-x-0.5 transition-transform text-mts-gold" />
                        </Link>
                      </div>
                      {/* Grid */}
                      <div className="p-4 grid grid-cols-2 gap-2">
                        {productCategories.map((cat, idx) => {
                          const Icon = cat.icon;
                          return (
                            <Link key={idx} href={cat.href} onClick={() => setActiveDropdown(null)} className="flex items-start gap-3 p-3 rounded-lg bg-slate-900/40 hover:bg-slate-800/80 border border-slate-800/60 hover:border-mts-teal/30 transition-all duration-150 group">
                              <div className="p-2 rounded-lg bg-mts-teal/10 text-mts-teal-glow group-hover:bg-mts-teal group-hover:text-white transition shrink-0 mt-0.5"><Icon className="w-4 h-4" /></div>
                              <div className="min-w-0">
                                <div className="flex items-center gap-2 flex-wrap">
                                  <span className="text-sm font-semibold text-white group-hover:text-mts-teal-glow transition-colors">{cat.name}</span>
                                  {cat.tag && <span className="text-[9px] text-slate-400 bg-slate-800 border border-slate-700/50 px-1.5 py-0.5 rounded font-medium">{cat.tag}</span>}
                                </div>
                                <p className="text-xs text-slate-400 leading-snug mt-0.5 group-hover:text-slate-300">{cat.desc}</p>
                              </div>
                            </Link>
                          );
                        })}
                      </div>
                      {/* Footer CTA */}
                      <div className="border-t border-slate-800 bg-[#040e17] px-4 py-3 flex items-center justify-between gap-3">
                        <div className="flex items-center gap-1.5 text-xs text-mts-gold font-medium"><Sparkles className="w-3.5 h-3.5" /><span>Security Kit Builder â€” size your system with live storage &amp; power calc</span></div>
                        <Link href="/kit-builder" onClick={() => setActiveDropdown(null)} className="shrink-0 flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-mts-teal text-white text-xs font-bold hover:bg-mts-teal-light transition whitespace-nowrap">Launch Configurator <ArrowRight className="w-3 h-3" /></Link>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Solutions â€” with FLYOUT */}
              <div data-dropdown-container="solutions" className="relative" onMouseEnter={() => setActiveDropdown('solutions')} onMouseLeave={() => setActiveDropdown(null)}>
                <button type="button" onClick={() => setActiveDropdown(activeDropdown === 'solutions' ? null : 'solutions')} className={`relative flex items-center gap-1 px-3.5 py-2 text-sm font-medium transition-colors duration-150 ${pathname.startsWith('/solutions') || activeDropdown === 'solutions' ? 'text-mts-teal-glow' : 'text-slate-300 hover:text-white'}`} aria-expanded={activeDropdown === 'solutions'} aria-haspopup="true">
                  {t('solutions')}
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${activeDropdown === 'solutions' ? 'rotate-180 text-mts-gold' : 'text-slate-500'}`} />
                  {(pathname.startsWith('/solutions') || activeDropdown === 'solutions') && <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-gradient-to-r from-mts-teal to-mts-gold rounded-full" />}
                </button>
                {activeDropdown === 'solutions' && (
                  <div className="absolute left-0 top-full z-[110]">
                    <div className="absolute -top-1 inset-x-0 h-2 bg-transparent" />
                    <div className="mt-0.5 w-[460px] max-w-[94vw] bg-[#06121d] border border-slate-700/60 rounded-xl shadow-[0_24px_60px_rgba(0,0,0,0.9)] overflow-hidden animate-dropdown">
                      <div className="bg-[#040e17] border-b border-slate-800 px-5 py-3 flex items-center justify-between">
                        <div className="flex items-center gap-2"><Building2 className="w-3.5 h-3.5 text-mts-teal-glow" /><span className="text-xs font-bold text-mts-gold uppercase tracking-widest">Sector Architectures</span></div>
                        <span className="text-[10px] text-teal-300 bg-teal-950/80 border border-teal-800/40 px-2 py-0.5 rounded-full font-bold">Turnkey</span>
                      </div>
                      <div className="p-3 space-y-1">
                        {solutionOptions.map((sol, idx) => {
                          const Icon = sol.icon;
                          return (
                            <Link key={idx} href={sol.href} onClick={() => setActiveDropdown(null)} className="flex items-start gap-3 px-3 py-3 rounded-lg hover:bg-slate-800/80 border border-transparent hover:border-mts-teal/25 transition-all duration-150 group">
                              <div className="p-2 rounded-lg bg-mts-teal/10 text-mts-teal-glow group-hover:bg-mts-teal group-hover:text-white transition shrink-0 mt-0.5"><Icon className="w-4 h-4" /></div>
                              <div className="min-w-0 flex-1">
                                <div className="flex items-center gap-2 justify-between">
                                  <span className="text-sm font-semibold text-white group-hover:text-mts-teal-glow transition-colors">{sol.title}</span>
                                  {sol.tag && <span className="text-[9px] text-slate-400 bg-slate-800 border border-slate-700/50 px-1.5 py-0.5 rounded font-medium shrink-0">{sol.tag}</span>}
                                </div>
                                <p className="text-xs text-slate-400 leading-snug mt-0.5 group-hover:text-slate-300">{sol.desc}</p>
                              </div>
                            </Link>
                          );
                        })}
                      </div>
                      <div className="border-t border-slate-800 bg-[#040e17] px-4 py-2.5">
                        <Link href="/solutions" onClick={() => setActiveDropdown(null)} className="flex items-center justify-between text-xs text-mts-teal-glow hover:text-white font-semibold transition group/link">
                          <span>Explore All Industry Solutions</span><ArrowRight className="w-3.5 h-3.5 text-mts-gold group-hover/link:translate-x-0.5 transition-transform" />
                        </Link>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Services â€” with FLYOUT */}
              <div data-dropdown-container="services" className="relative" onMouseEnter={() => setActiveDropdown('services')} onMouseLeave={() => setActiveDropdown(null)}>
                <button type="button" onClick={() => setActiveDropdown(activeDropdown === 'services' ? null : 'services')} className={`relative flex items-center gap-1 px-3.5 py-2 text-sm font-medium transition-colors duration-150 ${pathname.startsWith('/services') || activeDropdown === 'services' ? 'text-mts-teal-glow' : 'text-slate-300 hover:text-white'}`} aria-expanded={activeDropdown === 'services'} aria-haspopup="true">
                  {t('services')}
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${activeDropdown === 'services' ? 'rotate-180 text-mts-gold' : 'text-slate-500'}`} />
                  {(pathname.startsWith('/services') || activeDropdown === 'services') && <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-gradient-to-r from-mts-teal to-mts-gold rounded-full" />}
                </button>
                {activeDropdown === 'services' && (
                  <div className="absolute left-0 top-full z-[110]">
                    <div className="absolute -top-1 inset-x-0 h-2 bg-transparent" />
                    <div className="mt-0.5 w-[480px] max-w-[94vw] bg-[#06121d] border border-slate-700/60 rounded-xl shadow-[0_24px_60px_rgba(0,0,0,0.9)] overflow-hidden animate-dropdown">
                      <div className="bg-[#040e17] border-b border-slate-800 px-5 py-3 flex items-center justify-between">
                        <div className="flex items-center gap-2"><Wrench className="w-3.5 h-3.5 text-mts-teal-glow" /><span className="text-xs font-bold text-mts-gold uppercase tracking-widest">Engineering Services</span></div>
                        <span className="text-[10px] text-emerald-400 bg-emerald-950/80 border border-emerald-700/40 px-2 py-0.5 rounded-full font-bold">24/7 SLA</span>
                      </div>
                      <div className="p-3 space-y-1">
                        {serviceOptions.map((srv, idx) => {
                          const Icon = srv.icon;
                          return (
                            <Link key={idx} href={srv.href} onClick={() => setActiveDropdown(null)} className="flex items-start gap-3 px-3 py-3 rounded-lg hover:bg-slate-800/80 border border-transparent hover:border-mts-teal/25 transition-all duration-150 group">
                              <div className="p-2 rounded-lg bg-mts-teal/10 text-mts-teal-glow group-hover:bg-mts-teal group-hover:text-white transition shrink-0 mt-0.5"><Icon className="w-4 h-4" /></div>
                              <div className="min-w-0 flex-1">
                                <div className="flex items-center gap-2 justify-between">
                                  <span className="text-sm font-semibold text-white group-hover:text-mts-teal-glow transition-colors">{srv.title}</span>
                                  {srv.tag && <span className="text-[9px] text-slate-400 bg-slate-800 border border-slate-700/50 px-1.5 py-0.5 rounded font-medium shrink-0">{srv.tag}</span>}
                                </div>
                                <p className="text-xs text-slate-400 leading-snug mt-0.5 group-hover:text-slate-300">{srv.desc}</p>
                              </div>
                            </Link>
                          );
                        })}
                      </div>
                      <div className="border-t border-slate-800 bg-[#040e17] px-4 py-2.5 flex items-center gap-2">
                        <Link href="/services" onClick={() => setActiveDropdown(null)} className="flex-1 flex items-center justify-between text-xs text-mts-teal-glow hover:text-white font-semibold transition group/link">
                          <span>All Engineering Services</span><ArrowRight className="w-3.5 h-3.5 text-mts-gold group-hover/link:translate-x-0.5 transition-transform" />
                        </Link>
                        <Link href="/quote" onClick={() => setActiveDropdown(null)} className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-mts-teal/20 hover:bg-mts-teal border border-mts-teal/40 text-xs text-white font-bold transition shrink-0">Request BoM</Link>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Knowledge Base */}
              <Link href="/blog" className={`relative px-3.5 py-2 text-sm font-medium transition-colors duration-150 ${pathname.startsWith('/blog') ? 'text-mts-teal-glow' : 'text-slate-300 hover:text-white'}`}>
                Knowledge Base
                {pathname.startsWith('/blog') && <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-gradient-to-r from-mts-teal to-mts-gold rounded-full" />}
              </Link>

              {/* About */}
              <Link href="/about" className={`relative px-3.5 py-2 text-sm font-medium transition-colors duration-150 ${pathname === '/about' ? 'text-mts-teal-glow' : 'text-slate-300 hover:text-white'}`}>
                {t('about')}
                {pathname === '/about' && <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-gradient-to-r from-mts-teal to-mts-gold rounded-full" />}
              </Link>

              {/* Contact */}
              <Link href="/contact" className={`relative px-3.5 py-2 text-sm font-medium transition-colors duration-150 ${pathname === '/contact' ? 'text-mts-teal-glow' : 'text-slate-300 hover:text-white'}`}>
                {t('contact')}
                {pathname === '/contact' && <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-gradient-to-r from-mts-teal to-mts-gold rounded-full" />}
              </Link>
            </nav>

            {/* â”€â”€ RIGHT ACTIONS â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
            <div className="flex items-center gap-2 ml-auto shrink-0">
              {/* Search */}
              <div className="relative">
                {searchOpen ? (
                  <form onSubmit={handleSearchSubmit} className="flex items-center bg-[#050e17] border border-mts-teal/60 rounded-lg pl-3 pr-1.5 py-1.5 w-52 shadow-[0_0_14px_rgba(20,149,134,0.2)] transition-all">
                    <input ref={searchInputRef} type="text" placeholder="Search..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full bg-transparent text-sm text-white placeholder-slate-500 focus:outline-none" />
                    <button type="button" onClick={() => setSearchOpen(false)} className="p-1 text-slate-500 hover:text-white transition" aria-label="Close"><X className="w-3.5 h-3.5" /></button>
                    <button type="submit" className="ml-1 p-1.5 rounded-md bg-mts-teal text-white hover:bg-mts-teal-light transition" aria-label="Search"><Search className="w-3.5 h-3.5" /></button>
                  </form>
                ) : (
                  <button type="button" onClick={() => setSearchOpen(true)} className="p-2 rounded-lg bg-slate-800/60 hover:bg-slate-700/80 border border-slate-700/60 text-slate-400 hover:text-white transition" aria-label="Search"><Search className="w-4 h-4" /></button>
                )}
              </div>

              {/* Account */}
              <div className="relative" data-account-dropdown>
                <button type="button" onClick={() => setAccountDropdownOpen(!accountDropdownOpen)} className={`p-2 rounded-lg border transition ${adminUser ? 'bg-mts-burgundy/30 border-mts-gold/50 text-mts-gold' : 'bg-slate-800/60 hover:bg-slate-700/80 border-slate-700/60 text-slate-400 hover:text-white'}`} aria-label="Account">
                  {adminUser ? <UserCheck className="w-4 h-4" /> : <User className="w-4 h-4" />}
                </button>
                {accountDropdownOpen && (
                  <div className="absolute right-0 top-full pt-2 z-[110]" data-account-dropdown>
                    <div className="w-72 bg-[#06121d] border border-slate-700/60 rounded-xl p-4 shadow-[0_20px_50px_rgba(0,0,0,0.9)] text-xs space-y-2.5 relative overflow-hidden">
                      <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-mts-teal via-mts-teal-light to-mts-gold" />
                      {adminUser ? (
                        <>
                          <div className="p-3 rounded-lg bg-gradient-to-br from-slate-900 to-mts-burgundy/20 border border-mts-gold/30">
                            <div className="flex items-center justify-between"><span className="font-bold text-white">{adminUser.name}</span><span className="text-[9px] bg-mts-burgundy text-white px-2 py-0.5 rounded-full font-black uppercase tracking-wider">Admin</span></div>
                            <span className="text-[10px] text-slate-400 block mt-1 truncate">{adminUser.email}</span>
                          </div>
                          <Link href="/admin" onClick={() => setAccountDropdownOpen(false)} className="flex items-center justify-between px-3 py-2 rounded-lg hover:bg-slate-800/80 text-slate-200 hover:text-white transition group"><div className="flex items-center gap-2"><ShieldCheck className="w-3.5 h-3.5 text-mts-gold" /><span>Dashboard</span></div><ArrowRight className="w-3 h-3 text-slate-600 group-hover:text-mts-gold group-hover:translate-x-0.5 transition" /></Link>
                          <Link href="/account" onClick={() => setAccountDropdownOpen(false)} className="flex items-center justify-between px-3 py-2 rounded-lg hover:bg-slate-800/80 text-slate-200 hover:text-white transition group"><div className="flex items-center gap-2"><User className="w-3.5 h-3.5 text-mts-teal-light" /><span>Client Portal</span></div><ArrowRight className="w-3 h-3 text-slate-600 group-hover:text-mts-teal-light group-hover:translate-x-0.5 transition" /></Link>
                          <Link href="/track-order" onClick={() => setAccountDropdownOpen(false)} className="flex items-center justify-between px-3 py-2 rounded-lg hover:bg-slate-800/80 text-slate-200 hover:text-white transition group"><div className="flex items-center gap-2"><FileText className="w-3.5 h-3.5 text-blue-400" /><span>Track Orders</span></div><ArrowRight className="w-3 h-3 text-slate-600 group-hover:text-blue-400 group-hover:translate-x-0.5 transition" /></Link>
                          <div className="pt-2 border-t border-slate-800"><button onClick={handleLogout} className="w-full px-3 py-2 rounded-lg bg-red-950/40 hover:bg-red-900/60 border border-red-800/40 text-red-300 hover:text-white text-xs font-semibold flex items-center justify-center gap-2 transition"><LogOut className="w-3.5 h-3.5" /><span>Sign Out</span></button></div>
                        </>
                      ) : (
                        <>
                          <div className="px-1 pb-2 border-b border-slate-800 flex items-center justify-between"><span className="text-[10px] font-bold text-mts-gold uppercase tracking-wider">Client Access</span><ShieldCheck className="w-3 h-3 text-mts-teal-glow" /></div>
                          <Link href="/account" onClick={() => setAccountDropdownOpen(false)} className="flex items-center justify-between px-3 py-2.5 rounded-lg bg-slate-900/50 hover:bg-slate-800/80 border border-slate-800 hover:border-mts-teal/30 text-slate-200 hover:text-white transition group"><div className="flex items-center gap-2"><User className="w-3.5 h-3.5 text-mts-teal-light" /><span>Client Portal</span></div><ArrowRight className="w-3 h-3 text-slate-600 group-hover:translate-x-0.5 transition" /></Link>
                          <Link href="/track-order" onClick={() => setAccountDropdownOpen(false)} className="flex items-center justify-between px-3 py-2.5 rounded-lg bg-slate-900/50 hover:bg-slate-800/80 border border-slate-800 hover:border-mts-teal/30 text-slate-200 hover:text-white transition group"><div className="flex items-center gap-2"><FileText className="w-3.5 h-3.5 text-blue-400" /><span>Track My Order</span></div><ArrowRight className="w-3 h-3 text-slate-600 group-hover:translate-x-0.5 transition" /></Link>
                          <Link href="/admin/login" onClick={() => setAccountDropdownOpen(false)} className="flex items-center justify-between px-3 py-2.5 rounded-lg bg-slate-900/50 hover:bg-slate-800/80 border border-slate-800 hover:border-mts-gold/30 text-slate-400 hover:text-mts-gold transition group"><div className="flex items-center gap-2"><ShieldCheck className="w-3.5 h-3.5" /><span>Admin Login</span></div><ArrowRight className="w-3 h-3 text-slate-700 group-hover:translate-x-0.5 transition" /></Link>
                        </>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* Compare */}
              <button type="button" onClick={() => setIsCompareOpen(true)} className="relative p-2 rounded-lg bg-slate-800/60 hover:bg-slate-700/80 border border-slate-700/60 text-slate-400 hover:text-mts-teal-light transition" aria-label="Compare">
                <Layers className="w-4 h-4" />
                {compareList.length > 0 && <span className="absolute -top-1 -right-1 bg-mts-burgundy text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center border border-[#07131e]">{compareList.length}</span>}
              </button>

              {/* Cart */}
              <button type="button" onClick={() => setIsCartOpen(true)} className="relative p-2 rounded-lg bg-slate-800/60 hover:bg-slate-700/80 border border-slate-700/60 text-slate-400 hover:text-mts-gold transition" aria-label="Cart">
                <ShoppingCart className="w-4 h-4" />
                {totalItems > 0 && <span className="absolute -top-1 -right-1 bg-mts-teal text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center border border-[#07131e]">{totalItems}</span>}
              </button>

              {/* Primary CTA */}
              <Link href="/quote" className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-gradient-to-r from-mts-burgundy to-mts-burgundy-light hover:brightness-110 text-white text-sm font-bold border border-mts-gold/35 shadow-[0_4px_16px_rgba(139,0,0,0.35)] transition whitespace-nowrap">
                <Wrench className="w-3.5 h-3.5 text-mts-gold shrink-0" />Get a Quote
              </Link>

              {/* Hamburger (mobile) */}
              <button type="button" onClick={() => setMobileMenuOpen(true)} className="lg:hidden p-2 rounded-lg bg-slate-800/60 hover:bg-slate-700/80 border border-slate-700/60 text-slate-400 hover:text-white transition" aria-label="Open menu"><Menu className="w-5 h-5" /></button>
            </div>
          </div>
        </div>
      </div>

      {/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
          MOBILE DRAWER (< 1024px)
      â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm" onClick={() => setMobileMenuOpen(false)} />
          <div className="fixed inset-y-0 right-0 w-full max-w-sm bg-[#07131e] border-l border-slate-800 shadow-2xl p-5 flex flex-col justify-between overflow-y-auto text-sm animate-slideLeft">
            <div className="space-y-5">
              {/* Header */}
              <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                <div className="flex items-center gap-3">
                  <div className="relative w-10 h-10 rounded-lg overflow-hidden border border-mts-gold/40 bg-slate-950 p-0.5"><Image src="/images/logo.png" alt="MTS Logo" fill sizes="40px" className="object-contain" /></div>
                  <div className="flex flex-col leading-tight"><span className="font-black text-white text-sm tracking-wide">MUGANWA</span><span className="text-[10px] text-mts-gold font-semibold uppercase tracking-widest">Technology Solutions</span></div>
                </div>
                <button type="button" onClick={() => setMobileMenuOpen(false)} className="p-2 rounded-lg bg-slate-900 border border-slate-700 text-slate-400 hover:text-white transition" aria-label="Close menu"><X className="w-5 h-5" /></button>
              </div>

              {/* Search */}
              <form onSubmit={handleSearchSubmit} className="relative">
                <input type="text" placeholder="Search cameras, recorders..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full bg-slate-900 border border-slate-700 rounded-lg py-2.5 pl-3 pr-10 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-mts-teal" />
                <button type="submit" className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"><Search className="w-4 h-4" /></button>
              </form>

              {/* Nav */}
              <div className="space-y-1">
                <Link href="/" onClick={() => setMobileMenuOpen(false)} className={`block px-3 py-2.5 rounded-lg font-semibold transition ${pathname === '/' ? 'bg-mts-teal/20 text-mts-teal-glow border border-mts-teal/30' : 'text-slate-300 hover:bg-slate-800'}`}>{t('home')}</Link>

                {/* Products Accordion */}
                <div className="rounded-lg border border-slate-800 overflow-hidden">
                  <button type="button" onClick={() => setMobileProductsOpen(!mobileProductsOpen)} className="w-full px-3 py-2.5 flex items-center justify-between text-slate-200 font-semibold hover:bg-slate-800/50 transition"><span>{t('products')}</span><ChevronDown className={`w-4 h-4 transition-transform ${mobileProductsOpen ? 'rotate-180 text-mts-gold' : 'text-slate-500'}`} /></button>
                  {mobileProductsOpen && (
                    <div className="p-2 space-y-1 bg-slate-900/60 border-t border-slate-800">
                      {productCategories.map((cat, idx) => (<Link key={idx} href={cat.href} onClick={() => setMobileMenuOpen(false)} className="px-3 py-2 rounded-lg block text-slate-300 hover:text-white hover:bg-slate-800 transition"><span className="font-medium text-white block">{cat.name}</span><span className="text-[10px] text-slate-400 block">{cat.desc}</span></Link>))}
                      <Link href="/kit-builder" onClick={() => setMobileMenuOpen(false)} className="px-3 py-2 rounded-lg bg-mts-gold/10 border border-mts-gold/30 text-mts-gold font-bold flex items-center justify-between"><span>Security Kit Builder</span><Sparkles className="w-3.5 h-3.5" /></Link>
                    </div>
                  )}
                </div>

                {/* Solutions Accordion */}
                <div className="rounded-lg border border-slate-800 overflow-hidden">
                  <button type="button" onClick={() => setMobileSolutionsOpen(!mobileSolutionsOpen)} className="w-full px-3 py-2.5 flex items-center justify-between text-slate-200 font-semibold hover:bg-slate-800/50 transition"><span>{t('solutions')}</span><ChevronDown className={`w-4 h-4 transition-transform ${mobileSolutionsOpen ? 'rotate-180 text-mts-gold' : 'text-slate-500'}`} /></button>
                  {mobileSolutionsOpen && (
                    <div className="p-2 space-y-1 bg-slate-900/60 border-t border-slate-800">{solutionOptions.map((sol, idx) => (<Link key={idx} href={sol.href} onClick={() => setMobileMenuOpen(false)} className="px-3 py-2 rounded-lg block text-slate-300 hover:text-white hover:bg-slate-800 transition">{sol.title}</Link>))}</div>
                  )}
                </div>

                {/* Services Accordion */}
                <div className="rounded-lg border border-slate-800 overflow-hidden">
                  <button type="button" onClick={() => setMobileServicesOpen(!mobileServicesOpen)} className="w-full px-3 py-2.5 flex items-center justify-between text-slate-200 font-semibold hover:bg-slate-800/50 transition"><span>{t('services')}</span><ChevronDown className={`w-4 h-4 transition-transform ${mobileServicesOpen ? 'rotate-180 text-mts-gold' : 'text-slate-500'}`} /></button>
                  {mobileServicesOpen && (
                    <div className="p-2 space-y-1 bg-slate-900/60 border-t border-slate-800">{serviceOptions.map((srv, idx) => (<Link key={idx} href={srv.href} onClick={() => setMobileMenuOpen(false)} className="px-3 py-2 rounded-lg block text-slate-300 hover:text-white hover:bg-slate-800 transition">{srv.title}</Link>))}</div>
                  )}
                </div>

                <Link href="/blog" onClick={() => setMobileMenuOpen(false)} className={`block px-3 py-2.5 rounded-lg font-semibold transition ${pathname.startsWith('/blog') ? 'bg-mts-teal/20 text-mts-teal-glow border border-mts-teal/30' : 'text-slate-300 hover:bg-slate-800'}`}>Knowledge Base</Link>
                <Link href="/about" onClick={() => setMobileMenuOpen(false)} className={`block px-3 py-2.5 rounded-lg font-semibold transition ${pathname === '/about' ? 'bg-mts-teal/20 text-mts-teal-glow border border-mts-teal/30' : 'text-slate-300 hover:bg-slate-800'}`}>{t('about')}</Link>
                <Link href="/contact" onClick={() => setMobileMenuOpen(false)} className={`block px-3 py-2.5 rounded-lg font-semibold transition ${pathname === '/contact' ? 'bg-mts-teal/20 text-mts-teal-glow border border-mts-teal/30' : 'text-slate-300 hover:bg-slate-800'}`}>{t('contact')}</Link>
              </div>

              {/* Utility */}
              <div className="pt-4 border-t border-slate-800 space-y-2">
                <Link href="/track-order" onClick={() => setMobileMenuOpen(false)} className="flex items-center justify-between px-3 py-2.5 rounded-lg bg-slate-900/60 border border-slate-800 text-slate-300 hover:text-white transition"><span className="flex items-center gap-2"><FileText className="w-3.5 h-3.5 text-mts-gold" />{t('trackOrder')}</span><ArrowRight className="w-3.5 h-3.5 text-slate-600" /></Link>
                {adminUser ? (
                  <Link href="/admin" onClick={() => setMobileMenuOpen(false)} className="flex items-center justify-between px-3 py-2.5 rounded-lg bg-mts-burgundy/30 border border-mts-gold/35 text-white font-bold transition"><span className="flex items-center gap-2"><UserCheck className="w-3.5 h-3.5 text-mts-gold" />Admin Dashboard</span><ArrowRight className="w-3.5 h-3.5 text-mts-gold" /></Link>
                ) : (
                  <Link href="/admin/login" onClick={() => setMobileMenuOpen(false)} className="flex items-center justify-between px-3 py-2.5 rounded-lg bg-slate-900/60 border border-slate-800 text-slate-400 transition"><span className="flex items-center gap-2"><User className="w-3.5 h-3.5" />Admin Login</span><ArrowRight className="w-3.5 h-3.5 text-slate-600" /></Link>
                )}
                <div className="flex items-center justify-between px-3 py-2.5 rounded-lg bg-slate-900/60 border border-slate-800"><span className="flex items-center gap-1.5 text-slate-400"><Globe className="w-3.5 h-3.5" />Language</span><div className="flex gap-1.5"><button type="button" onClick={() => setLanguage('en')} className={`px-2.5 py-1 rounded-md text-xs font-bold ${language === 'en' ? 'bg-mts-teal text-white' : 'text-slate-400'}`}>EN</button><button type="button" onClick={() => setLanguage('fr')} className={`px-2.5 py-1 rounded-md text-xs font-bold ${language === 'fr' ? 'bg-mts-teal text-white' : 'text-slate-400'}`}>FR</button></div></div>
                <div className="flex items-center justify-between px-3 py-2.5 rounded-lg bg-slate-900/60 border border-slate-800"><span className="text-slate-400">Currency</span><div className="flex gap-1.5"><button type="button" onClick={() => setCurrency('USD')} className={`px-2.5 py-1 rounded-md text-xs font-bold ${currency === 'USD' ? 'bg-mts-teal text-white' : 'text-slate-400 bg-slate-800'}`}>$ USD</button><button type="button" onClick={() => setCurrency('RWF')} className={`px-2.5 py-1 rounded-md text-xs font-bold ${currency === 'RWF' ? 'bg-mts-teal text-white' : 'text-slate-400 bg-slate-800'}`}>Rwf</button></div></div>
              </div>
            </div>

            {/* Bottom CTAs */}
            <div className="pt-4 border-t border-slate-800 space-y-2 mt-4">
              <Link href="/quote" onClick={() => setMobileMenuOpen(false)} className="w-full py-3 rounded-xl bg-gradient-to-r from-mts-burgundy to-mts-burgundy-light border border-mts-gold/35 text-white font-extrabold text-sm flex items-center justify-center gap-2 shadow-lg"><Wrench className="w-4 h-4 text-mts-gold" /><span>Get a Quote</span></Link>
              <div className="grid grid-cols-2 gap-2">
                <a href="tel:+250789420541" className="py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white font-semibold flex items-center justify-center gap-1.5"><Phone className="w-3.5 h-3.5 text-mts-teal-glow" /><span>Call Us</span></a>
                <a href="https://wa.me/250789420541" target="_blank" rel="noopener noreferrer" className="py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-600 text-white font-semibold flex items-center justify-center gap-1.5"><MessageSquare className="w-3.5 h-3.5" /><span>WhatsApp</span></a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MOBILE STICKY BOTTOM BAR (< 768px) */}
      <div className="md:hidden fixed bottom-0 inset-x-0 bg-[#07131e]/97 backdrop-blur-md border-t border-slate-800 z-40 p-2 shadow-2xl flex items-center justify-around gap-2 text-xs">
        <a href="tel:+250789420541" className="flex-1 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white font-bold flex items-center justify-center gap-1.5"><Phone className="w-3.5 h-3.5 text-mts-teal-glow" /><span>Call</span></a>
        <a href="https://wa.me/250789420541" target="_blank" rel="noopener noreferrer" className="flex-1 py-2.5 rounded-xl bg-emerald-600 text-white font-bold flex items-center justify-center gap-1.5"><MessageSquare className="w-3.5 h-3.5" /><span>WhatsApp</span></a>
        <Link href="/quote" className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-mts-burgundy to-mts-burgundy-light border border-mts-gold/35 text-white font-bold flex items-center justify-center gap-1"><Wrench className="w-3.5 h-3.5 text-mts-gold" /><span>Quote</span></Link>
      </div>
    </header>
  );
}
