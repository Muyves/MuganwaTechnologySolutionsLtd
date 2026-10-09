'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { 
  X, 
  ShoppingCart, 
  ShieldCheck, 
  Check, 
  Star, 
  Wrench, 
  Download,
  ExternalLink 
} from 'lucide-react';
import { Product } from '@/lib/types';
import { useCart } from '@/context/CartContext';
import PriceTag from './PriceTag';

interface QuickViewModalProps {
  product: Product;
  isOpen: boolean;
  onClose: () => void;
}

export default function QuickViewModal({ product, isOpen, onClose }: QuickViewModalProps) {
  const { addToCart } = useCart();
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [includeInstallation, setIncludeInstallation] = useState(false);
  const [added, setAdded] = useState(false);

  if (!isOpen) return null;

  const handleAdd = () => {
    addToCart(product, quantity, includeInstallation);
    setAdded(true);
    setTimeout(() => {
      setAdded(false);
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-4xl bg-mts-dark border border-mts-teal-light/40 rounded-2xl overflow-hidden shadow-2xl max-h-[90vh] flex flex-col md:flex-row">
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-slate-900/80 hover:bg-slate-800 text-slate-400 hover:text-white border border-slate-700 transition"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Left: Image Gallery */}
        <div className="w-full md:w-1/2 p-6 flex flex-col justify-between bg-slate-950/60 border-b md:border-b-0 md:border-r border-slate-800">
          <div className="relative aspect-[4/3] w-full rounded-xl overflow-hidden border border-slate-800">
            <Image
              src={product.images[selectedImage] || product.images[0]}
              alt={product.name}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
            />
          </div>

          {/* Thumbnails */}
          {product.images.length > 1 && (
            <div className="flex gap-3 mt-4 overflow-x-auto pb-1">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setSelectedImage(idx)}
                  className={`relative w-16 h-16 rounded-lg overflow-hidden border-2 transition ${
                    selectedImage === idx ? 'border-mts-gold shadow-glow-gold' : 'border-slate-800 opacity-60 hover:opacity-100'
                  }`}
                >
                  <Image src={img} alt="" fill sizes="64px" className="object-cover" />
                </button>
              ))}
            </div>
          )}

          <div className="mt-4 p-3 rounded-lg bg-mts-surface/40 border border-slate-800 flex items-center justify-between text-xs text-slate-300">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-mts-gold" />
              <span>{product.warrantyYears}-Year Manufacturer Warranty</span>
            </span>
            <span className="text-emerald-400 font-semibold">● Verified Stock</span>
          </div>
        </div>

        {/* Right: Details & Specs */}
        <div className="w-full md:w-1/2 p-6 overflow-y-auto flex flex-col justify-between">
          <div className="space-y-4">
            <div>
              <div className="flex items-center gap-2 text-xs">
                <span className="font-extrabold uppercase text-mts-gold">{product.brand}</span>
                <span className="text-slate-500">•</span>
                <span className="text-slate-400">{product.subCategory}</span>
              </div>
              <h2 className="text-xl font-bold text-white mt-1 leading-snug">{product.name}</h2>
              <span className="text-xs font-mono text-slate-400">SKU: {product.modelNumber}</span>
            </div>

            {/* Rating */}
            <div className="flex items-center gap-2">
              <div className="flex items-center text-amber-400">
                <Star className="w-4 h-4 fill-current" />
                <span className="text-sm font-bold ml-1 text-white">{product.rating.toFixed(1)}</span>
              </div>
              <span className="text-xs text-slate-400">({product.reviewCount} customer reviews)</span>
            </div>

            {/* Price */}
            <div>
              <PriceTag amount={product.price} compareAt={product.compareAtPrice} size="xl" showDual={true} />
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">{product.shortDescription}</p>

            {/* Key Features */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Key Highlights</h4>
              <ul className="grid grid-cols-1 gap-1 text-xs text-slate-300">
                {product.features.slice(0, 4).map((f, i) => (
                  <li key={i} className="flex items-start gap-1.5">
                    <Check className="w-3.5 h-3.5 text-mts-teal-light shrink-0 mt-0.5" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Technical Specs Table */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Core Specifications</h4>
              <div className="bg-slate-900/90 rounded-lg p-2.5 border border-slate-800 text-xs space-y-1">
                {product.specs.slice(0, 4).map((spec, i) => (
                  <div key={i} className="flex justify-between py-0.5 border-b border-slate-800/60 last:border-0">
                    <span className="text-slate-400">{spec.label}</span>
                    <span className="text-white font-medium text-right">{spec.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Installation add-on toggle */}
            <label className="flex items-center gap-2 p-3 rounded-lg bg-mts-surface/60 border border-slate-700 cursor-pointer text-xs text-slate-200">
              <input
                type="checkbox"
                checked={includeInstallation}
                onChange={(e) => setIncludeInstallation(e.target.checked)}
                className="w-4 h-4 rounded text-mts-teal-light border-slate-600 bg-slate-900"
              />
              <div className="flex-1">
                <span className="font-semibold text-white flex items-center gap-1">
                  <Wrench className="w-3.5 h-3.5 text-mts-gold" />
                  <span>Include Turnkey Installation & Setup</span>
                </span>
                <span className="text-[11px] text-slate-400 block mt-0.5">
                  Certified conduit cabling, commissioning, and mobile app sync (+$40.00)
                </span>
              </div>
            </label>
          </div>

          {/* Action Row */}
          <div className="pt-6 border-t border-slate-800 mt-4 flex items-center gap-3">
            {/* Quantity */}
            <div className="flex items-center border border-slate-700 rounded-lg bg-slate-900">
              <button
                type="button"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="px-3 py-2 text-slate-300 hover:text-white font-bold text-sm"
              >
                -
              </button>
              <span className="px-3 py-2 text-white font-semibold text-sm">{quantity}</span>
              <button
                type="button"
                onClick={() => setQuantity(quantity + 1)}
                className="px-3 py-2 text-slate-300 hover:text-white font-bold text-sm"
              >
                +
              </button>
            </div>

            {/* Add to Cart */}
            <button
              type="button"
              onClick={handleAdd}
              disabled={added}
              className={`flex-1 py-3 px-4 rounded-lg font-bold text-sm flex items-center justify-center gap-2 shadow-lg transition ${
                added
                  ? 'bg-emerald-600 text-white'
                  : 'bg-gradient-to-r from-mts-teal to-mts-teal-light hover:brightness-110 text-white shadow-glow-teal'
              }`}
            >
              {added ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>Added to System</span>
                </>
              ) : (
                <>
                  <ShoppingCart className="w-4 h-4 text-mts-gold" />
                  <span>Add to Cart • ${( (product.price + (includeInstallation ? 40 : 0)) * quantity ).toFixed(2)}</span>
                </>
              )}
            </button>

            {/* Full Product Link */}
            <Link
              href={`/products/${product.id}`}
              onClick={onClose}
              className="p-3 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-300 hover:text-white"
              title="View complete product page"
            >
              <ExternalLink className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
