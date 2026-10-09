'use client';

import React from 'react';
import Image from 'next/image';
import { X, Printer, Download, ShieldCheck, Check } from 'lucide-react';
import { Product } from '@/lib/types';

interface DatasheetModalProps {
  product: Product;
  isOpen: boolean;
  onClose: () => void;
}

export default function DatasheetModal({ product, isOpen, onClose }: DatasheetModalProps) {
  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-3xl bg-white text-slate-900 rounded-xl overflow-hidden shadow-2xl max-h-[90vh] flex flex-col">
        {/* Top Action Bar (hidden in print) */}
        <div className="bg-slate-900 text-white p-4 flex items-center justify-between print:hidden">
          <div className="flex items-center gap-2 text-xs font-semibold">
            <ShieldCheck className="w-4 h-4 text-mts-gold" />
            <span>Official Technical Datasheet • {product.modelNumber}</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handlePrint}
              className="flex items-center gap-1 text-xs bg-mts-teal hover:bg-mts-teal-light text-white px-3 py-1.5 rounded-lg transition"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / Save PDF</span>
            </button>
            <button
              type="button"
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Datasheet Document */}
        <div className="p-8 overflow-y-auto flex-1 space-y-6 print:p-0">
          {/* Header */}
          <div className="flex items-start justify-between pb-6 border-b-2 border-slate-900">
            <div className="flex items-center gap-3">
              <div className="relative w-14 h-14 rounded overflow-hidden bg-slate-950 p-1">
                <Image src="/images/logo.png" alt="MTS Logo" fill sizes="56px" className="object-contain" />
              </div>
              <div>
                <h1 className="text-xl font-black tracking-tight text-slate-900">
                  MUGANWA TECHNOLOGY SOLUTIONS LTD
                </h1>
                <p className="text-xs text-slate-600 font-medium">
                  Electronic Security Systems & Telecommunications Infrastructure
                </p>
                <p className="text-[11px] text-slate-500">
                  Kigali Commercial Tower, KG 7 Ave, Kigali, Rwanda • +250 788 345 678
                </p>
              </div>
            </div>
            <div className="text-right">
              <span className="text-xs uppercase tracking-wider font-extrabold bg-slate-100 text-slate-800 px-3 py-1 rounded border border-slate-300 block">
                PRODUCT SPECIFICATION
              </span>
              <span className="text-[11px] text-slate-500 block mt-1">
                Ref: {product.modelNumber}
              </span>
            </div>
          </div>

          {/* Product Banner */}
          <div className="flex flex-col sm:flex-row gap-6 items-start">
            <div className="relative w-48 h-40 rounded-lg overflow-hidden border border-slate-200 shrink-0 bg-slate-50">
              <Image src={product.images[0]} alt={product.name} fill sizes="192px" className="object-cover" />
            </div>
            <div className="flex-1">
              <span className="text-xs font-bold text-mts-burgundy uppercase tracking-wider">
                {product.brand} • {product.category.toUpperCase()}
              </span>
              <h2 className="text-lg font-bold text-slate-900 mt-1">{product.name}</h2>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">{product.description}</p>
            </div>
          </div>

          {/* Key Features */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-2 border-b pb-1">
              Key Architectural Features
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-700">
              {product.features.map((f, i) => (
                <div key={i} className="flex items-start gap-1.5">
                  <Check className="w-3.5 h-3.5 text-mts-teal-dark shrink-0 mt-0.5" />
                  <span>{f}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Technical Specifications Table */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-2 border-b pb-1">
              Comprehensive Technical Specifications
            </h3>
            <table className="w-full text-xs border border-slate-200">
              <tbody>
                {product.specs.map((spec, i) => (
                  <tr key={i} className={i % 2 === 0 ? 'bg-slate-50' : 'bg-white'}>
                    <td className="py-2 px-3 font-semibold text-slate-800 border-b border-slate-200 w-1/3">
                      {spec.label}
                    </td>
                    <td className="py-2 px-3 text-slate-600 border-b border-slate-200">
                      {spec.value}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Compliance & Warranty Footer */}
          <div className="pt-4 border-t border-slate-200 flex flex-wrap items-center justify-between text-[11px] text-slate-500">
            <div>
              <p className="font-semibold text-slate-800">
                Authorized Engineering Distributor: Muganwa Technology Solutions Ltd
              </p>
              <p>Technical Director: MUKIZA Richard | System Certification: CE, FCC, RoHS, IP67</p>
            </div>
            <div className="text-right">
              <span className="font-bold text-slate-800">{product.warrantyYears}-Year Manufacturer Warranty</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
