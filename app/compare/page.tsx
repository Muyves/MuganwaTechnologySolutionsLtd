'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  Layers, 
  Trash2, 
  ShoppingCart, 
  X, 
  ShieldCheck, 
  ArrowLeft,
  Check
} from 'lucide-react';
import { useCompare } from '@/context/CompareContext';
import { useCart } from '@/context/CartContext';
import PriceTag from '@/components/PriceTag';

export default function ComparePage() {
  const { compareList, removeFromCompare, clearCompare } = useCompare();
  const { addToCart } = useCart();

  if (compareList.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-24 text-center">
        <div className="p-4 rounded-full bg-slate-900 border border-slate-800 w-16 h-16 mx-auto mb-4 flex items-center justify-center text-slate-600">
          <Layers className="w-8 h-8" />
        </div>
        <h1 className="text-2xl font-bold text-white">No Products in Comparison Matrix</h1>
        <p className="text-xs text-slate-400 mt-2 max-w-sm mx-auto">
          Visit our product catalog and click the comparison icon on any cameras, recorders, or access control terminals.
        </p>
        <Link
          href="/products"
          className="mt-6 inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-mts-teal hover:bg-mts-teal-light text-white text-xs font-bold transition"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Browse Security Equipment</span>
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-mts-teal-glow uppercase tracking-wider">
            <Layers className="w-4 h-4" />
            <span>Specification Matrix</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
            Compare Security Systems ({compareList.length} Items)
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={clearCompare}
            className="px-4 py-2 rounded-lg border border-slate-700 bg-slate-900 hover:bg-slate-800 text-xs text-slate-300 transition"
          >
            Clear Comparison
          </button>
          <Link
            href="/products"
            className="px-4 py-2 rounded-lg bg-mts-teal hover:bg-mts-teal-light text-white text-xs font-bold transition"
          >
            Add More Items
          </Link>
        </div>
      </div>

      {/* Comparison Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-xs text-left border-collapse border border-slate-800">
          <thead>
            <tr className="bg-mts-navy">
              <th className="p-4 border border-slate-800 w-48 text-slate-400 uppercase font-bold">
                Hardware Overview
              </th>
              {compareList.map((product) => (
                <th key={product.id} className="p-4 border border-slate-800 min-w-[240px] align-top">
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-[10px] uppercase font-bold text-mts-gold">
                      {product.brand}
                    </span>
                    <button
                      type="button"
                      onClick={() => removeFromCompare(product.id)}
                      className="text-slate-500 hover:text-red-400 p-1"
                      title="Remove"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="relative aspect-[4/3] w-full rounded-lg overflow-hidden bg-slate-950 mb-3 border border-slate-800">
                    <Image src={product.images[0]} alt={product.name} fill sizes="240px" className="object-cover" />
                  </div>

                  <h3 className="font-bold text-white text-sm line-clamp-2">{product.name}</h3>
                  <p className="text-[11px] font-mono text-slate-400 mt-1">{product.modelNumber}</p>

                  <div className="mt-3">
                    <PriceTag amount={product.price} compareAt={product.compareAtPrice} size="sm" showDual={true} />
                  </div>

                  <button
                    type="button"
                    onClick={() => addToCart(product, 1, false)}
                    className="mt-3 w-full py-2 px-3 rounded-lg bg-mts-teal hover:bg-mts-teal-light text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-md transition"
                  >
                    <ShoppingCart className="w-3.5 h-3.5" />
                    <span>Add to Cart</span>
                  </button>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800 bg-mts-surface/40">
            {/* Category */}
            <tr>
              <td className="p-3.5 border border-slate-800 font-semibold text-slate-400 bg-mts-navy/50">Category</td>
              {compareList.map((p) => (
                <td key={p.id} className="p-3.5 border border-slate-800 text-white font-medium capitalize">
                  {p.category.replace('_', ' ')}
                </td>
              ))}
            </tr>

            {/* Resolution */}
            <tr>
              <td className="p-3.5 border border-slate-800 font-semibold text-slate-400 bg-mts-navy/50">Resolution</td>
              {compareList.map((p) => (
                <td key={p.id} className="p-3.5 border border-slate-800 text-mts-teal-glow font-bold">
                  {p.resolution || 'N/A'}
                </td>
              ))}
            </tr>

            {/* Stock Count */}
            <tr>
              <td className="p-3.5 border border-slate-800 font-semibold text-slate-400 bg-mts-navy/50">Availability</td>
              {compareList.map((p) => (
                <td key={p.id} className="p-3.5 border border-slate-800 text-emerald-400 font-semibold">
                  {p.inStock ? `● In Stock (${p.stockCount} units)` : 'Pre-order'}
                </td>
              ))}
            </tr>

            {/* Warranty */}
            <tr>
              <td className="p-3.5 border border-slate-800 font-semibold text-slate-400 bg-mts-navy/50">Warranty</td>
              {compareList.map((p) => (
                <td key={p.id} className="p-3.5 border border-slate-800 text-white">
                  <span className="flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-mts-gold" />
                    <span>{p.warrantyYears} Years Official MTS Warranty</span>
                  </span>
                </td>
              ))}
            </tr>

            {/* Features list */}
            <tr>
              <td className="p-3.5 border border-slate-800 font-semibold text-slate-400 bg-mts-navy/50">Key Capabilities</td>
              {compareList.map((p) => (
                <td key={p.id} className="p-3.5 border border-slate-800 text-slate-300 align-top">
                  <ul className="space-y-1">
                    {p.features.slice(0, 4).map((f, i) => (
                      <li key={i} className="flex items-start gap-1">
                        <Check className="w-3 h-3 text-mts-teal-light shrink-0 mt-0.5" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
