'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Layers, X, ArrowRight, Trash2 } from 'lucide-react';
import { useCompare } from '@/context/CompareContext';
import { useCurrency } from '@/context/CurrencyContext';

export default function CompareDrawer() {
  const { compareList, isCompareOpen, setIsCompareOpen, removeFromCompare, clearCompare } = useCompare();
  const { formatPrice } = useCurrency();

  if (!isCompareOpen || compareList.length === 0) return null;

  return (
    <aside aria-label="Product Comparison Bar" className="fixed bottom-0 inset-x-0 z-40 bg-mts-dark/95 backdrop-blur-md border-t-2 border-mts-teal-light shadow-2xl transition-all">
      <div className="max-w-7xl mx-auto px-4 py-3 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          {/* Header */}
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-mts-teal-dark text-mts-teal-glow">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                Compare Security Systems ({compareList.length}/4)
              </h4>
              <p className="text-[11px] text-slate-400">Side-by-side technical specification breakdown</p>
            </div>
          </div>

          {/* Product Previews */}
          <div className="flex items-center gap-3 overflow-x-auto py-1">
            {compareList.map((product) => (
              <div
                key={product.id}
                className="flex items-center gap-2 bg-mts-surface border border-slate-700 rounded-lg p-1.5 pr-2.5 max-w-[200px]"
              >
                <div className="relative w-9 h-9 rounded overflow-hidden bg-slate-950 shrink-0">
                  <Image src={product.images[0]} alt="" fill sizes="36px" className="object-cover" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-[11px] font-semibold text-white truncate">{product.name}</p>
                  <p className="text-[10px] text-mts-gold font-bold">{formatPrice(product.price, true)}</p>
                </div>
                <button
                  type="button"
                  onClick={() => removeFromCompare(product.id)}
                  className="text-slate-400 hover:text-red-400 p-0.5"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={clearCompare}
              className="text-xs text-slate-400 hover:text-white px-2.5 py-1.5 rounded border border-slate-800 hover:bg-slate-800 transition"
            >
              Clear All
            </button>
            <Link
              href="/compare"
              onClick={() => setIsCompareOpen(false)}
              className="px-4 py-2 rounded-lg bg-mts-teal hover:bg-mts-teal-light text-white text-xs font-bold flex items-center gap-1.5 shadow-glow-teal transition"
            >
              <span>Compare Now</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
            <button
              type="button"
              onClick={() => setIsCompareOpen(false)}
              className="p-1.5 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
}
