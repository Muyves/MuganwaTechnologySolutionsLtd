'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  ShieldCheck, 
  Home, 
  Store, 
  Building2, 
  Factory, 
  GraduationCap, 
  Camera, 
  HardDrive, 
  Cpu, 
  Check, 
  ShoppingCart, 
  Sparkles, 
  Wrench, 
  Layers,
  ArrowRight
} from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useCurrency } from '@/context/CurrencyContext';
import { initialProducts } from '@/data/products';
import { Product } from '@/lib/types';

interface PropertyTypeOption {
  id: string;
  name: string;
  description: string;
  icon: any;
  defaultCameras: number;
}

const propertyTypes: PropertyTypeOption[] = [
  { id: 'residential', name: 'Home & Villa', description: 'Gates, front yard, patio & main doors', icon: Home, defaultCameras: 4 },
  { id: 'retail', name: 'Retail Store & Pharmacy', description: 'Till counter, aisles, stockroom & entry', icon: Store, defaultCameras: 8 },
  { id: 'office', name: 'Corporate Office', description: 'Reception, server room, corridors & hallways', icon: Building2, defaultCameras: 8 },
  { id: 'industrial', name: 'Warehouse & Factory', description: 'Perimeter fence, loading bays & yard', icon: Factory, defaultCameras: 16 },
  { id: 'school', name: 'School & Campus', description: 'Gate access, hallways, playfields & labs', icon: GraduationCap, defaultCameras: 16 },
];

export default function SecurityKitBuilder() {
  const { addToCart } = useCart();
  const { formatPrice } = useCurrency();

  // Wizard state
  const [selectedProperty, setSelectedProperty] = useState<string>('residential');
  const [cameraCount, setCameraCount] = useState<number>(4);
  const [outdoorRatio, setOutdoorRatio] = useState<number>(50); // % outdoor
  const [resolutionTier, setResolutionTier] = useState<'1080p' | '4mp' | '4k'>('4k');
  const [retentionDays, setRetentionDays] = useState<number>(30);
  const [includeInstallation, setIncludeInstallation] = useState<boolean>(true);
  const [bundleAdded, setBundleAdded] = useState<boolean>(false);

  // Storage calculations based on camera count and days
  // 1080p ~ 25GB/day per cam, 4MP ~ 40GB/day per cam, 4K H.265+ ~ 60GB/day per cam
  const gbPerDayPerCam = resolutionTier === '1080p' ? 25 : resolutionTier === '4mp' ? 40 : 60;
  const totalGbNeeded = cameraCount * gbPerDayPerCam * retentionDays;
  const hddSizeTb = totalGbNeeded <= 1000 ? 1 : totalGbNeeded <= 2000 ? 2 : totalGbNeeded <= 4000 ? 4 : totalGbNeeded <= 8000 ? 8 : 16;

  // Selected camera product
  const cameraProduct: Product = initialProducts.find(
    (p) => resolutionTier === '4k' ? p.id === 'mts-cam-001' : p.id === 'mts-cam-003'
  ) || initialProducts[0];

  // Selected NVR
  const nvrProduct: Product = initialProducts.find((p) => p.id === 'mts-rec-001') || initialProducts[3];

  // Selected HDD
  const hddProduct: Product = initialProducts.find((p) => p.id === 'mts-acc-001') || initialProducts[6];

  // Selected Switch / Cabling
  const cableProduct: Product = initialProducts.find((p) => p.id === 'mts-acc-003') || initialProducts[8];
  const switchProduct: Product = initialProducts.find((p) => p.id === 'mts-acc-002') || initialProducts[7];

  // Pricing calculations
  const camerasPrice = cameraProduct.price * cameraCount;
  const nvrPrice = nvrProduct.price;
  const hddPrice = hddProduct.price * (hddSizeTb > 4 ? 2 : 1);
  const cableCount = Math.max(1, Math.ceil(cameraCount / 8));
  const cablesPrice = cableProduct.price * cableCount;
  const switchPrice = cameraCount > 8 ? switchProduct.price : 0; // 8-16 ports handled by NVR's 16 PoE ports

  const hardwareRawTotal = camerasPrice + nvrPrice + hddPrice + cablesPrice + switchPrice;
  const discountAmount = hardwareRawTotal * 0.10; // 10% Bundle Discount
  const hardwareDiscounted = hardwareRawTotal - discountAmount;
  const installationCost = includeInstallation ? cameraCount * 40 : 0;
  const finalKitPrice = hardwareDiscounted + installationCost;

  const handleAddBundleToCart = () => {
    // Add cameras
    addToCart(cameraProduct, cameraCount, includeInstallation);
    // Add NVR
    addToCart(nvrProduct, 1, false);
    // Add HDD
    addToCart(hddProduct, hddSizeTb > 4 ? 2 : 1, false);
    // Add Cable
    addToCart(cableProduct, cableCount, false);

    setBundleAdded(true);
    setTimeout(() => setBundleAdded(false), 2500);
  };

  return (
    <section className="bg-mts-dark py-12 px-4 sm:px-6 lg:px-8 border-y border-mts-teal-dark/30">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-mts-gold/10 border border-mts-gold/30 text-mts-gold text-xs font-semibold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Interactive Security Kit Builder</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight">
            Design Your Tailored CCTV Security System
          </h2>
          <p className="text-sm sm:text-base text-slate-300 mt-3">
            Select your property dimensions and surveillance needs. Our system automatically matches compatible 
            cameras, 4K NVRs, Western Digital Purple hard drives, and network power with an instant 10% bundle discount.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Interactive Wizard (7 cols) */}
          <div className="lg:col-span-7 space-y-8 bg-mts-navy/80 border border-slate-800 rounded-2xl p-6 sm:p-8 backdrop-blur-md">
            {/* Step 1: Property Type */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold text-mts-teal-glow uppercase tracking-wider">
                  Step 1 of 5
                </span>
                <span className="text-xs text-slate-400">Select Property Classification</span>
              </div>
              <h3 className="text-base font-bold text-white mb-3">Where will the system be installed?</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                {propertyTypes.map((type) => {
                  const Icon = type.icon;
                  const isSelected = selectedProperty === type.id;
                  return (
                    <button
                      key={type.id}
                      type="button"
                      onClick={() => {
                        setSelectedProperty(type.id);
                        setCameraCount(type.defaultCameras);
                      }}
                      className={`p-3 rounded-xl border text-left transition flex flex-col justify-between ${
                        isSelected
                          ? 'bg-mts-teal-dark/60 border-mts-teal-light text-white shadow-glow-teal'
                          : 'bg-mts-surface/60 border-slate-700/80 text-slate-300 hover:border-slate-500'
                      }`}
                    >
                      <Icon className={`w-5 h-5 mb-2 ${isSelected ? 'text-mts-gold' : 'text-slate-400'}`} />
                      <div>
                        <div className="text-xs font-bold text-white">{type.name}</div>
                        <div className="text-[10px] text-slate-400 mt-0.5 line-clamp-1">{type.description}</div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 2: Camera Count & Indoor/Outdoor */}
            <div className="pt-6 border-t border-slate-800">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold text-mts-teal-glow uppercase tracking-wider">
                  Step 2 of 5
                </span>
                <span className="text-xs text-slate-400">Capacity & Coverage</span>
              </div>
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-white">How many cameras do you need?</h3>
                <span className="text-lg font-black text-mts-gold bg-slate-900 px-3 py-1 rounded-lg border border-slate-700">
                  {cameraCount} Cameras
                </span>
              </div>

              {/* Quick Select Pill Buttons */}
              <div className="grid grid-cols-4 gap-2 mt-3">
                {[4, 8, 12, 16].map((count) => (
                  <button
                    key={count}
                    type="button"
                    onClick={() => setCameraCount(count)}
                    className={`py-2 text-xs font-bold rounded-lg border transition ${
                      cameraCount === count
                        ? 'bg-mts-teal text-white border-mts-teal-glow shadow-glow-teal'
                        : 'bg-slate-900 border-slate-700 text-slate-300 hover:text-white'
                    }`}
                  >
                    {count} Cams
                  </button>
                ))}
              </div>

              {/* Indoor vs Outdoor Ratio Slider */}
              <div className="mt-4 bg-slate-900/60 p-3 rounded-xl border border-slate-800">
                <div className="flex justify-between text-xs text-slate-300 mb-1">
                  <span>Indoor: {Math.round(cameraCount * ((100 - outdoorRatio) / 100))}</span>
                  <span className="text-mts-teal-glow font-medium">Indoor / Outdoor Balance</span>
                  <span>Outdoor (Weatherproof): {Math.round(cameraCount * (outdoorRatio / 100))}</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  step="25"
                  value={outdoorRatio}
                  onChange={(e) => setOutdoorRatio(Number(e.target.value))}
                  className="w-full accent-mts-teal-light cursor-pointer"
                />
              </div>
            </div>

            {/* Step 3: Resolution & AI Detection */}
            <div className="pt-6 border-t border-slate-800">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold text-mts-teal-glow uppercase tracking-wider">
                  Step 3 of 5
                </span>
                <span className="text-xs text-slate-400">Video Clarity Tier</span>
              </div>
              <h3 className="text-base font-bold text-white mb-3">Select Camera Resolution & AI Intelligence</h3>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <button
                  type="button"
                  onClick={() => setResolutionTier('1080p')}
                  className={`p-3 rounded-xl border text-left transition ${
                    resolutionTier === '1080p'
                      ? 'bg-mts-teal-dark/60 border-mts-teal-light text-white'
                      : 'bg-slate-900/80 border-slate-700 text-slate-300'
                  }`}
                >
                  <div className="text-xs font-bold text-white">Full HD 1080p</div>
                  <div className="text-[10px] text-slate-400 mt-1">Standard 2MP sharpness. Budget-friendly daily monitoring.</div>
                </button>

                <button
                  type="button"
                  onClick={() => setResolutionTier('4mp')}
                  className={`p-3 rounded-xl border text-left transition ${
                    resolutionTier === '4mp'
                      ? 'bg-mts-teal-dark/60 border-mts-teal-light text-white shadow-glow-teal'
                      : 'bg-slate-900/80 border-slate-700 text-slate-300'
                  }`}
                >
                  <div className="text-xs font-bold text-white flex items-center justify-between">
                    <span>4MP (2K) ColorVu</span>
                    <span className="text-[9px] bg-mts-teal-dark px-1.5 py-0.5 rounded text-mts-teal-glow">Popular</span>
                  </div>
                  <div className="text-[10px] text-slate-400 mt-1">24/7 Color in zero light. High-clarity face & license details.</div>
                </button>

                <button
                  type="button"
                  onClick={() => setResolutionTier('4k')}
                  className={`p-3 rounded-xl border text-left transition ${
                    resolutionTier === '4k'
                      ? 'bg-mts-teal-dark/60 border-mts-teal-light text-white shadow-glow-teal'
                      : 'bg-slate-900/80 border-slate-700 text-slate-300'
                  }`}
                >
                  <div className="text-xs font-bold text-white flex items-center justify-between">
                    <span>4K Ultra HD AI</span>
                    <span className="text-[9px] bg-mts-burgundy px-1.5 py-0.5 rounded text-white font-bold">Pro Grade</span>
                  </div>
                  <div className="text-[10px] text-slate-400 mt-1">8MP AcuSense. Active strobe deterrence & vehicle recognition.</div>
                </button>
              </div>
            </div>

            {/* Step 4: Storage History Days */}
            <div className="pt-6 border-t border-slate-800">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold text-mts-teal-glow uppercase tracking-wider">
                  Step 4 of 5
                </span>
                <span className="text-xs text-slate-400">Storage Architecture</span>
              </div>
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-white">How many days of video history do you require?</h3>
                <span className="text-xs text-mts-teal-glow font-mono font-bold">
                  Recommended: {hddSizeTb}TB WD Purple
                </span>
              </div>

              <div className="grid grid-cols-4 gap-2 mt-3">
                {[7, 15, 30, 60].map((days) => (
                  <button
                    key={days}
                    type="button"
                    onClick={() => setRetentionDays(days)}
                    className={`py-2 text-xs font-bold rounded-lg border transition ${
                      retentionDays === days
                        ? 'bg-mts-teal text-white border-mts-teal-glow shadow-glow-teal'
                        : 'bg-slate-900 border-slate-700 text-slate-300 hover:text-white'
                    }`}
                  >
                    {days} Days
                  </button>
                ))}
              </div>
            </div>

            {/* Step 5: Professional Installation Option */}
            <div className="pt-6 border-t border-slate-800">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold text-mts-teal-glow uppercase tracking-wider">
                  Step 5 of 5
                </span>
                <span className="text-xs text-slate-400">Engineering Handover</span>
              </div>
              <label className="flex items-start gap-3 p-4 rounded-xl bg-mts-surface/70 border border-slate-700 cursor-pointer">
                <input
                  type="checkbox"
                  checked={includeInstallation}
                  onChange={(e) => setIncludeInstallation(e.target.checked)}
                  className="mt-1 w-4 h-4 rounded text-mts-teal-light border-slate-600 bg-slate-900"
                />
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-bold text-white flex items-center gap-1.5">
                      <Wrench className="w-4 h-4 text-mts-gold" />
                      <span>Include MTS Certified Turnkey Installation</span>
                    </span>
                    <span className="text-xs font-bold text-mts-gold">
                      +${cameraCount * 40}.00
                    </span>
                  </div>
                  <p className="text-xs text-slate-300 mt-1">
                    Includes structured conduit piping, cable termination, camera angle tuning, AcuSense AI zone configuration, 
                    smartphone app setup, and 1-year complimentary on-site maintenance.
                  </p>
                </div>
              </label>
            </div>
          </div>

          {/* Right Column: Dynamic Bill of Materials (BOM) & Cart Action (5 cols) */}
          <div className="lg:col-span-5 sticky top-28 bg-gradient-to-b from-mts-navy via-mts-dark to-slate-950 border border-mts-gold/40 rounded-2xl p-6 sm:p-7 shadow-2xl">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <Layers className="w-5 h-5 text-mts-gold" />
                <h3 className="text-base font-bold text-white">Configured Security Bill of Materials</h3>
              </div>
              <span className="text-[10px] bg-mts-burgundy text-white px-2 py-0.5 rounded font-extrabold uppercase tracking-wider">
                10% Off Kit
              </span>
            </div>

            {/* Bill of Materials List */}
            <div className="py-4 space-y-3 text-xs">
              {/* Cameras */}
              <div className="flex items-start justify-between gap-2 p-2.5 rounded-lg bg-mts-surface/40 border border-slate-800">
                <div className="flex items-start gap-2">
                  <Camera className="w-4 h-4 text-mts-teal-glow shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-white block">
                      {cameraCount} × {cameraProduct.name}
                    </span>
                    <span className="text-[11px] text-slate-400">
                      {outdoorRatio}% Outdoor IP67 / {100 - outdoorRatio}% Indoor
                    </span>
                  </div>
                </div>
                <span className="font-bold text-white shrink-0 text-right">{formatPrice(camerasPrice, true)}</span>
              </div>

              {/* NVR */}
              <div className="flex items-start justify-between gap-2 p-2.5 rounded-lg bg-mts-surface/40 border border-slate-800">
                <div className="flex items-start gap-2">
                  <Cpu className="w-4 h-4 text-mts-gold shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-white block">
                      1 × {nvrProduct.name}
                    </span>
                    <span className="text-[11px] text-slate-400">16-Port Integrated PoE Plug & Play</span>
                  </div>
                </div>
                <span className="font-bold text-white shrink-0 text-right">{formatPrice(nvrPrice, true)}</span>
              </div>

              {/* Storage */}
              <div className="flex items-start justify-between gap-2 p-2.5 rounded-lg bg-mts-surface/40 border border-slate-800">
                <div className="flex items-start gap-2">
                  <HardDrive className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-white block">
                      {hddSizeTb > 4 ? '2 × ' : '1 × '}WD Purple {hddSizeTb}TB 24/7 Surveillance HDD
                    </span>
                    <span className="text-[11px] text-slate-400">Calibrated for {retentionDays} days continuous archive</span>
                  </div>
                </div>
                <span className="font-bold text-white shrink-0 text-right">{formatPrice(hddPrice, true)}</span>
              </div>

              {/* Cabling & Accessories */}
              <div className="flex items-start justify-between gap-2 p-2.5 rounded-lg bg-mts-surface/40 border border-slate-800">
                <div className="flex items-start gap-2">
                  <Layers className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-white block">
                      {cableCount} × Cat6 Solid Bare Copper Reel (305m)
                    </span>
                    <span className="text-[11px] text-slate-400">Includes RJ45 crimps, boots & waterproof junction boxes</span>
                  </div>
                </div>
                <span className="font-bold text-white shrink-0 text-right">{formatPrice(cablesPrice, true)}</span>
              </div>

              {/* Professional Installation Fee */}
              {includeInstallation && (
                <div className="flex items-start justify-between gap-2 p-2.5 rounded-lg bg-mts-gold/10 border border-mts-gold/30">
                  <div className="flex items-start gap-2">
                    <Wrench className="w-4 h-4 text-mts-gold shrink-0 mt-0.5" />
                    <div>
                      <span className="font-semibold text-white block">
                        Turnkey On-Site Installation ({cameraCount} Cameras)
                      </span>
                      <span className="text-[11px] text-mts-gold">Certified Field Engineering by MTS</span>
                    </div>
                  </div>
                  <span className="font-bold text-mts-gold shrink-0 text-right">{formatPrice(installationCost, true)}</span>
                </div>
              )}
            </div>

            {/* Price Calculations */}
            <div className="pt-4 border-t border-slate-800 space-y-1.5 text-xs">
              <div className="flex justify-between text-slate-400">
                <span>Hardware Regular Total</span>
                <span className="line-through">{formatPrice(hardwareRawTotal, true)}</span>
              </div>
              <div className="flex justify-between text-emerald-400 font-semibold">
                <span>Bundle Discount (10% OFF)</span>
                <span>-{formatPrice(discountAmount, true)}</span>
              </div>
              {includeInstallation && (
                <div className="flex justify-between text-slate-300">
                  <span>Installation & Commissioning</span>
                  <span>{formatPrice(installationCost, true)}</span>
                </div>
              )}
              <div className="flex justify-between text-base font-black text-white pt-2 border-t border-slate-800">
                <span>Complete System Price</span>
                <span className="text-xl text-mts-teal-glow font-black">{formatPrice(finalKitPrice, true)}</span>
              </div>
            </div>

            {/* Guarantees */}
            <div className="mt-5 p-3 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-between text-[11px] text-slate-300">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-mts-gold" />
                <span>3-Year Hardware Warranty</span>
              </span>
              <span className="text-emerald-400 font-semibold">Ready for Dispatch</span>
            </div>

            {/* Actions */}
            <div className="mt-5 space-y-2.5">
              <button
                type="button"
                onClick={handleAddBundleToCart}
                disabled={bundleAdded}
                className={`w-full py-3.5 px-4 rounded-xl font-extrabold text-sm flex items-center justify-center gap-2 shadow-xl transition ${
                  bundleAdded
                    ? 'bg-emerald-600 text-white'
                    : 'bg-gradient-to-r from-mts-teal to-mts-teal-light hover:brightness-110 text-white shadow-glow-teal'
                }`}
              >
                {bundleAdded ? (
                  <>
                    <Check className="w-5 h-5" />
                    <span>Complete Kit Added to Cart!</span>
                  </>
                ) : (
                  <>
                    <ShoppingCart className="w-5 h-5 text-mts-gold" />
                    <span>Add Full Kit to Cart • {formatPrice(finalKitPrice, true)}</span>
                  </>
                )}
              </button>

              <Link
                href={`/quote?cameras=${cameraCount}&property=${selectedProperty}&res=${resolutionTier}&retention=${retentionDays}`}
                className="w-full py-2.5 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-300 hover:text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition text-center"
              >
                <span>Have an Engineer Review This Setup</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
