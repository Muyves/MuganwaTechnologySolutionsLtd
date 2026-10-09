'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  ShoppingCart, 
  Layers, 
  Check, 
  Eye, 
  Star, 
  ShieldCheck, 
  Wrench 
} from 'lucide-react';
import { Product } from '@/lib/types';
import { useCart } from '@/context/CartContext';
import { useCompare } from '@/context/CompareContext';
import QuickViewModal from './QuickViewModal';
import PriceTag from './PriceTag';

interface ProductCardProps {
  product: Product;
  onOpenQuickView?: (product: Product) => void;
}

export default function ProductCard({ product, onOpenQuickView }: ProductCardProps) {
  const { addToCart } = useCart();
  const { addToCompare, isInCompare, removeFromCompare } = useCompare();
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);
  const [withInstallation, setWithInstallation] = useState(false);
  const [addedToast, setAddedToast] = useState(false);

  const inCompare = isInCompare(product.id);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1, withInstallation);
    setAddedToast(true);
    setTimeout(() => setAddedToast(false), 2000);
  };

  const handleToggleCompare = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (inCompare) {
      removeFromCompare(product.id);
    } else {
      addToCompare(product);
    }
  };

  const openModal = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (onOpenQuickView) {
      onOpenQuickView(product);
    } else {
      setIsQuickViewOpen(true);
    }
  };

  return (
    <>
      <div className="group relative flex flex-col bg-mts-navy/90 hover:bg-mts-surface rounded-xl border border-slate-800 hover:border-mts-teal-light/50 transition-all duration-300 shadow-md hover:shadow-glow-teal overflow-hidden">
        {/* Product Badges */}
        <div className="absolute top-3 left-3 z-10 flex flex-col gap-1.5 pointer-events-none">
          {product.bestSeller && (
            <span className="bg-mts-burgundy text-white text-[10px] font-extrabold uppercase px-2 py-0.5 rounded shadow-sm">
              Best Seller
            </span>
          )}
          {product.featured && (
            <span className="bg-mts-gold text-slate-950 text-[10px] font-black uppercase px-2 py-0.5 rounded shadow-sm">
              Featured
            </span>
          )}
          {product.resolution && (
            <span className="bg-mts-dark/80 backdrop-blur-sm text-mts-accent text-[10px] font-bold px-2 py-0.5 rounded border border-mts-teal-light/30">
              {product.resolution}
            </span>
          )}
        </div>

        {/* Action icons top right */}
        <div className="absolute top-3 right-3 z-10 flex flex-col gap-1.5 opacity-90 group-hover:opacity-100 transition">
          <button
            type="button"
            onClick={handleToggleCompare}
            title={inCompare ? "Remove from comparison" : "Add to comparison"}
            className={`p-1.5 rounded-lg border backdrop-blur-md transition ${
              inCompare
                ? 'bg-mts-teal-light text-white border-mts-teal-glow'
                : 'bg-slate-900/80 hover:bg-slate-800 text-slate-300 border-slate-700'
            }`}
          >
            <Layers className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={openModal}
            title="Quick view specifications"
            className="p-1.5 rounded-lg bg-slate-900/80 hover:bg-slate-800 text-slate-300 border border-slate-700 backdrop-blur-md transition"
          >
            <Eye className="w-4 h-4" />
          </button>
        </div>

        {/* Product Image */}
        <Link href={`/products/${product.id}`} className="relative block aspect-[4/3] w-full overflow-hidden bg-slate-950">
          <Image
            src={product.images[0] || 'https://images.unsplash.com/photo-1557597774-9d273605dfa9?auto=format&fit=crop&w=800&q=80'}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-mts-navy/80 via-transparent to-transparent opacity-60"></div>
        </Link>

        {/* Content */}
        <div className="flex flex-1 flex-col p-4">
          {/* Brand & Stock status */}
          <div className="flex items-center justify-between text-xs mb-1.5">
            <span className="font-semibold text-mts-gold tracking-wide uppercase text-[11px]">
              {product.brand}
            </span>
            <span className="flex items-center gap-1 text-[11px] text-emerald-400 font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
              <span>In Stock</span>
            </span>
          </div>

          {/* Product Name */}
          <Link href={`/products/${product.id}`} className="block">
            <h3 className="text-sm font-bold text-white group-hover:text-mts-teal-glow transition line-clamp-2 min-h-[2.5rem]">
              {product.name}
            </h3>
          </Link>

          {/* Model Number */}
          <span className="text-[11px] text-slate-400 font-mono mt-0.5">
            Model: {product.modelNumber}
          </span>

          {/* Rating */}
          <div className="flex items-center gap-1.5 mt-2">
            <div className="flex items-center text-amber-400">
              <Star className="w-3.5 h-3.5 fill-current" />
              <span className="text-xs font-bold ml-1 text-white">{product.rating.toFixed(1)}</span>
            </div>
            <span className="text-[11px] text-slate-500">({product.reviewCount} verified installs)</span>
          </div>

          {/* Short description */}
          <p className="text-xs text-slate-300 mt-2 line-clamp-2 leading-relaxed">
            {product.shortDescription}
          </p>

          {/* Price & Guarantee */}
          <div className="mt-4 pt-3 border-t border-slate-800 flex items-baseline justify-between">
            <div className="flex-1 min-w-0 pr-2">
              <PriceTag amount={product.price} compareAt={product.compareAtPrice} size="lg" showDual={true} />
              <span className="text-[10px] text-slate-400 flex items-center gap-1 mt-1">
                <ShieldCheck className="w-3 h-3 text-mts-gold shrink-0" />
                <span className="truncate">{product.warrantyYears}-Year MTS Warranty</span>
              </span>
            </div>

            {/* Quick Add Button */}
            <button
              type="button"
              onClick={handleAddToCart}
              className={`p-2.5 rounded-lg font-semibold text-xs flex items-center justify-center gap-1.5 shadow-md transition ${
                addedToast
                  ? 'bg-emerald-600 text-white'
                  : 'bg-mts-teal hover:bg-mts-teal-light text-white shadow-glow-teal'
              }`}
              title="Add to shopping cart"
            >
              {addedToast ? (
                <>
                  <Check className="w-4 h-4" />
                  <span className="hidden sm:inline">Added</span>
                </>
              ) : (
                <>
                  <ShoppingCart className="w-4 h-4" />
                  <span className="hidden sm:inline">Add</span>
                </>
              )}
            </button>
          </div>

          {/* Optional Installation Toggle */}
          <div className="mt-3 pt-2 border-t border-slate-800/60 flex items-center justify-between text-[11px] text-slate-400">
            <label className="flex items-center gap-1.5 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={withInstallation}
                onChange={(e) => setWithInstallation(e.target.checked)}
                className="rounded border-slate-700 text-mts-teal-light focus:ring-0 w-3.5 h-3.5 bg-slate-900"
              />
              <span className="flex items-center gap-1">
                <Wrench className="w-3 h-3 text-mts-gold" />
                <span>Include Installation (+$40)</span>
              </span>
            </label>
          </div>
        </div>
      </div>

      {/* Quick View Modal */}
      {isQuickViewOpen && (
        <QuickViewModal
          product={product}
          isOpen={isQuickViewOpen}
          onClose={() => setIsQuickViewOpen(false)}
        />
      )}
    </>
  );
}
