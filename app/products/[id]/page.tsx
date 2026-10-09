'use client';

import React, { useState } from 'react';
import { useParams, notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { 
  ShieldCheck, 
  ShoppingCart, 
  Layers, 
  Check, 
  Star, 
  FileText, 
  Wrench, 
  Truck, 
  Clock, 
  ArrowRight,
  Share2,
  ChevronRight
} from 'lucide-react';
import { initialProducts } from '@/data/products';
import { useCart } from '@/context/CartContext';
import { useCompare } from '@/context/CompareContext';
import { useCurrency } from '@/context/CurrencyContext';
import DatasheetModal from '@/components/DatasheetModal';
import ProductCard from '@/components/ProductCard';
import PriceTag from '@/components/PriceTag';

export default function ProductDetailPage() {
  const params = useParams();
  const id = params.id as string;
  const product = initialProducts.find((p) => p.id === id || p.slug === id);
  const { formatPrice } = useCurrency();

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-24 text-center">
        <h1 className="text-2xl font-bold text-white">Product Not Found</h1>
        <p className="text-slate-400 mt-2">The security hardware you requested is no longer available.</p>
        <Link href="/products" className="mt-6 inline-block px-5 py-2.5 rounded-lg bg-mts-teal text-white text-xs font-bold">
          Return to Catalog
        </Link>
      </div>
    );
  }

  const { addToCart } = useCart();
  const { addToCompare, isInCompare, removeFromCompare } = useCompare();

  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [includeInstallation, setIncludeInstallation] = useState(false);
  const [addedToast, setAddedToast] = useState(false);
  const [isDatasheetOpen, setIsDatasheetOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'specs' | 'features' | 'warranty'>('specs');

  const inCompare = isInCompare(product.id);

  // Compatible items
  const compatibleProducts = initialProducts.filter(
    (p) => product.compatibleWith?.includes(p.id) || (p.category !== product.category && p.brand === product.brand)
  ).slice(0, 3);

  // Related items
  const relatedProducts = initialProducts.filter(
    (p) => p.category === product.category && p.id !== product.id
  ).slice(0, 4);

  const handleAddToCart = () => {
    addToCart(product, quantity, includeInstallation);
    setAddedToast(true);
    setTimeout(() => setAddedToast(false), 2000);
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      alert('Product link copied to clipboard!');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Breadcrumb Navigation */}
      <nav className="flex items-center gap-2 text-xs text-slate-400">
        <Link href="/" className="hover:text-white">Home</Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <Link href="/products" className="hover:text-white">Products</Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <Link href={`/products?category=${product.category}`} className="capitalize hover:text-white">
          {product.category.replace('_', ' ')}
        </Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-mts-gold font-medium truncate max-w-xs">{product.name}</span>
      </nav>

      {/* Main Top Section: Gallery + Product Buy Box */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Left: Gallery (6 cols) */}
        <div className="lg:col-span-6 space-y-4">
          <div className="relative aspect-[4/3] w-full rounded-2xl overflow-hidden bg-slate-950 border border-slate-800 shadow-2xl">
            <Image
              src={product.images[selectedImage] || product.images[0]}
              alt={product.name}
              fill
              sizes="(max-width: 1024px) 100vw, 600px"
              className="object-cover"
              priority
            />
            {/* Badges */}
            <div className="absolute top-4 left-4 flex flex-col gap-2">
              {product.resolution && (
                <span className="bg-mts-dark/90 backdrop-blur-md text-mts-teal-glow text-xs font-bold px-3 py-1 rounded-full border border-mts-teal-light/40">
                  {product.resolution}
                </span>
              )}
              {product.bestSeller && (
                <span className="bg-mts-burgundy text-white text-[11px] font-extrabold uppercase px-2.5 py-0.5 rounded shadow-sm">
                  Best Seller
                </span>
              )}
            </div>
          </div>

          {/* Thumbnails */}
          {product.images.length > 1 && (
            <div className="flex gap-3 overflow-x-auto pb-2">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setSelectedImage(idx)}
                  className={`relative w-20 h-20 rounded-xl overflow-hidden border-2 transition ${
                    selectedImage === idx
                      ? 'border-mts-gold shadow-glow-gold'
                      : 'border-slate-800 opacity-60 hover:opacity-100'
                  }`}
                >
                  <Image src={img} alt="" fill sizes="80px" className="object-cover" />
                </button>
              ))}
            </div>
          )}

          {/* Trust Guarantees under photo */}
          <div className="grid grid-cols-3 gap-3 pt-2 text-center text-xs">
            <div className="bg-mts-navy/60 p-3 rounded-xl border border-slate-800">
              <ShieldCheck className="w-5 h-5 text-mts-gold mx-auto mb-1" />
              <span className="font-bold text-white block">{product.warrantyYears}-Year Warranty</span>
              <span className="text-[10px] text-slate-400">Direct replacement</span>
            </div>
            <div className="bg-mts-navy/60 p-3 rounded-xl border border-slate-800">
              <Truck className="w-5 h-5 text-mts-teal-glow mx-auto mb-1" />
              <span className="font-bold text-white block">Fast Dispatch</span>
              <span className="text-[10px] text-slate-400">Same-day in Kigali</span>
            </div>
            <div className="bg-mts-navy/60 p-3 rounded-xl border border-slate-800">
              <Clock className="w-5 h-5 text-amber-400 mx-auto mb-1" />
              <span className="font-bold text-white block">24/7 SLA</span>
              <span className="text-[10px] text-slate-400">Engineering support</span>
            </div>
          </div>
        </div>

        {/* Right: Buy Box & Options (6 cols) */}
        <div className="lg:col-span-6 space-y-6 bg-mts-navy/80 border border-slate-800 rounded-2xl p-6 sm:p-8 backdrop-blur-md">
          <div>
            <div className="flex items-center justify-between text-xs">
              <span className="font-extrabold uppercase text-mts-gold tracking-wider">
                {product.brand} • {product.subCategory}
              </span>
              <button
                type="button"
                onClick={handleShare}
                className="text-slate-400 hover:text-white flex items-center gap-1"
                title="Share link"
              >
                <Share2 className="w-3.5 h-3.5" />
                <span>Share</span>
              </button>
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold text-white mt-2 leading-tight">
              {product.name}
            </h1>
            <p className="text-xs font-mono text-slate-400 mt-1">SKU / Model: {product.modelNumber}</p>
          </div>

          {/* Rating */}
          <div className="flex items-center gap-3">
            <div className="flex items-center text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-current" />
              ))}
            </div>
            <span className="text-xs font-bold text-white">{product.rating.toFixed(1)}</span>
            <span className="text-xs text-slate-400">({product.reviewCount} customer installations)</span>
          </div>

          {/* Pricing */}
          <div className="py-4 border-y border-slate-800 flex flex-wrap items-baseline justify-between gap-4">
            <div>
              <PriceTag amount={product.price} compareAt={product.compareAtPrice} size="xl" showDual={true} />
              <span className="text-[11px] text-slate-400 block mt-1.5">
                Prices include all local taxes. Official VAT invoice supplied in USD or RWF.
              </span>
            </div>
            <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-xs px-3 py-1 rounded-full font-semibold">
              ● {product.stockCount} Units In Stock
            </span>
          </div>

          {/* Short Description */}
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            {product.description}
          </p>

          {/* Installation Add-On Toggle */}
          <label className="flex items-start gap-3 p-4 rounded-xl bg-mts-surface/80 border border-slate-700 cursor-pointer transition hover:border-mts-teal-light">
            <input
              type="checkbox"
              checked={includeInstallation}
              onChange={(e) => setIncludeInstallation(e.target.checked)}
              className="mt-1 w-4 h-4 rounded text-mts-teal-light border-slate-600 bg-slate-900"
            />
            <div className="flex-1 text-xs">
              <div className="flex items-center justify-between">
                <span className="font-bold text-white flex items-center gap-1.5">
                  <Wrench className="w-4 h-4 text-mts-gold" />
                  <span>Order with Certified Turnkey Installation</span>
                </span>
                <span className="font-extrabold text-mts-gold">+{formatPrice(40, true)}</span>
              </div>
              <p className="text-slate-400 mt-1 text-[11px] leading-relaxed">
                Includes outdoor weatherproof junction box, pure copper cabling, AcuSense AI calibration, 
                and smartphone app sync by MTS certified engineers.
              </p>
            </div>
          </label>

          {/* Quantity & Add to Cart */}
          <div className="space-y-3 pt-2">
            <div className="flex items-center gap-4">
              {/* Quantity */}
              <div className="flex items-center border border-slate-700 rounded-xl bg-slate-900">
                <button
                  type="button"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-4 py-3 text-slate-300 hover:text-white font-bold text-base"
                >
                  -
                </button>
                <span className="px-4 py-3 text-white font-bold text-base min-w-[3rem] text-center">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-4 py-3 text-slate-300 hover:text-white font-bold text-base"
                >
                  +
                </button>
              </div>

              {/* Add to Cart Button */}
              <button
                type="button"
                onClick={handleAddToCart}
                disabled={addedToast}
                className={`flex-1 py-3.5 px-6 rounded-xl font-black text-sm flex items-center justify-center gap-2 shadow-xl transition ${
                  addedToast
                    ? 'bg-emerald-600 text-white'
                    : 'bg-gradient-to-r from-mts-teal to-mts-teal-light hover:brightness-110 text-white shadow-glow-teal'
                }`}
              >
                {addedToast ? (
                  <>
                    <Check className="w-5 h-5" />
                    <span>Added to Cart!</span>
                  </>
                ) : (
                  <>
                    <ShoppingCart className="w-5 h-5 text-mts-gold" />
                    <span>Add to Cart • {formatPrice((product.price + (includeInstallation ? 40 : 0)) * quantity, true)}</span>
                  </>
                )}
              </button>
            </div>

            {/* Secondary Actions: Compare & Datasheet */}
            <div className="grid grid-cols-2 gap-3 pt-2">
              <button
                type="button"
                onClick={() => {
                  if (inCompare) removeFromCompare(product.id);
                  else addToCompare(product);
                }}
                className={`py-2.5 px-3 rounded-lg border text-xs font-semibold flex items-center justify-center gap-1.5 transition ${
                  inCompare
                    ? 'bg-mts-teal text-white border-mts-teal-glow'
                    : 'bg-slate-900 border-slate-700 text-slate-300 hover:text-white'
                }`}
              >
                <Layers className="w-4 h-4 text-mts-teal-light" />
                <span>{inCompare ? 'Remove Comparison' : 'Add to Compare'}</span>
              </button>

              <button
                type="button"
                onClick={() => setIsDatasheetOpen(true)}
                className="py-2.5 px-3 rounded-lg bg-slate-900 border border-slate-700 text-slate-300 hover:text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition"
              >
                <FileText className="w-4 h-4 text-mts-gold" />
                <span>View Datasheet PDF</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs Section: Specifications, Key Features, Warranty */}
      <div className="bg-mts-navy/60 border border-slate-800 rounded-2xl p-6 sm:p-8">
        <div className="flex border-b border-slate-800 space-x-6">
          <button
            type="button"
            onClick={() => setActiveTab('specs')}
            className={`pb-3 text-xs sm:text-sm font-bold uppercase tracking-wider transition border-b-2 ${
              activeTab === 'specs'
                ? 'border-mts-gold text-white'
                : 'border-transparent text-slate-400 hover:text-white'
            }`}
          >
            Technical Specifications
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('features')}
            className={`pb-3 text-xs sm:text-sm font-bold uppercase tracking-wider transition border-b-2 ${
              activeTab === 'features'
                ? 'border-mts-gold text-white'
                : 'border-transparent text-slate-400 hover:text-white'
            }`}
          >
            Detailed Features ({product.features.length})
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('warranty')}
            className={`pb-3 text-xs sm:text-sm font-bold uppercase tracking-wider transition border-b-2 ${
              activeTab === 'warranty'
                ? 'border-mts-gold text-white'
                : 'border-transparent text-slate-400 hover:text-white'
            }`}
          >
            Warranty & SLA Policy
          </button>
        </div>

        {/* Tab Contents */}
        <div className="pt-6">
          {activeTab === 'specs' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              {product.specs.map((spec, i) => (
                <div
                  key={i}
                  className="flex justify-between p-3 rounded-lg bg-slate-900/80 border border-slate-800"
                >
                  <span className="text-slate-400 font-semibold">{spec.label}</span>
                  <span className="text-white font-medium text-right">{spec.value}</span>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'features' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-300">
              {product.features.map((f, i) => (
                <div key={i} className="flex items-start gap-2 p-3 rounded-lg bg-slate-900/60 border border-slate-800">
                  <Check className="w-4 h-4 text-mts-teal-light shrink-0 mt-0.5" />
                  <span>{f}</span>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'warranty' && (
            <div className="space-y-4 text-xs text-slate-300 max-w-3xl leading-relaxed">
              <p>
                All security systems supplied by <strong>Muganwa Technology Solutions Ltd</strong> are covered by a 
                comprehensive <strong>{product.warrantyYears}-Year Manufacturer Warranty</strong>.
              </p>
              <ul className="list-disc pl-5 space-y-1.5 text-slate-400">
                <li>Immediate 1-to-1 hardware swap for manufacturing defects within the first 12 months.</li>
                <li>Firmware cyber-security updates applied free of charge during scheduled preventative maintenance.</li>
                <li>Lightning and electrical power surge coverage available when installed with MTS certified surge protectors.</li>
                <li>Supervised under the direction of <strong>MUKIZA Richard (Managing Director)</strong>.</li>
              </ul>
            </div>
          )}
        </div>
      </div>

      {/* Compatible Equipment Recommendations */}
      {compatibleProducts.length > 0 && (
        <section className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-xs font-bold text-mts-teal-glow uppercase tracking-wider">Perfect Pairings</span>
              <h2 className="text-xl font-bold text-white mt-1">Frequently Bundled with this Item</h2>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {compatibleProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="space-y-6 pt-6 border-t border-slate-800">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-xs font-bold text-mts-gold uppercase tracking-wider">Explore More</span>
              <h2 className="text-xl font-bold text-white mt-1">Related Security Systems</h2>
            </div>
            <Link href="/products" className="text-xs text-mts-teal-glow hover:underline font-semibold flex items-center gap-1">
              <span>View All</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}

      {/* Printable Datasheet Modal */}
      <DatasheetModal
        product={product}
        isOpen={isDatasheetOpen}
        onClose={() => setIsDatasheetOpen(false)}
      />
    </div>
  );
}
