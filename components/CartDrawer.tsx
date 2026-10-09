'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  X, 
  Trash2, 
  ShoppingCart, 
  ArrowRight, 
  ShieldCheck, 
  Wrench 
} from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useCurrency } from '@/context/CurrencyContext';

export default function CartDrawer() {
  const { 
    cart, 
    isCartOpen, 
    setIsCartOpen, 
    removeFromCart, 
    updateQuantity, 
    toggleInstallation, 
    subtotal, 
    totalInstallationFee, 
    grandTotal 
  } = useCart();
  const { formatPrice } = useCurrency();

  if (!isCartOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden animate-fadeIn">
      <div 
        className="absolute inset-0 bg-black/70 backdrop-blur-sm transition-opacity"
        onClick={() => setIsCartOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-mts-dark border-l border-mts-teal-dark/50 shadow-2xl flex flex-col">
          {/* Header */}
          <div className="p-5 border-b border-slate-800 flex items-center justify-between bg-mts-navy">
            <div className="flex items-center gap-2">
              <ShoppingCart className="w-5 h-5 text-mts-gold" />
              <h2 className="text-base font-bold text-white">Your Security System Cart</h2>
              <span className="text-xs bg-mts-teal-dark text-mts-teal-glow px-2 py-0.5 rounded-full font-mono">
                {cart.length} items
              </span>
            </div>
            <button
              type="button"
              onClick={() => setIsCartOpen(false)}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 text-slate-400">
                <div className="p-4 rounded-full bg-slate-900 border border-slate-800 mb-3">
                  <ShoppingCart className="w-8 h-8 text-slate-600" />
                </div>
                <p className="text-sm font-semibold text-white">Your cart is empty</p>
                <p className="text-xs text-slate-500 mt-1 max-w-xs">
                  Add cameras, recorders, access control terminals, or use our Security Kit Builder.
                </p>
                <Link
                  href="/products"
                  onClick={() => setIsCartOpen(false)}
                  className="mt-5 px-4 py-2 rounded-lg bg-mts-teal hover:bg-mts-teal-light text-white text-xs font-semibold transition"
                >
                  Browse Security Products
                </Link>
              </div>
            ) : (
              cart.map((item) => (
                <div 
                  key={item.product.id}
                  className="bg-mts-surface/70 border border-slate-800 rounded-xl p-3.5 flex gap-3 relative group"
                >
                  {/* Thumbnail */}
                  <div className="relative w-16 h-16 rounded-lg overflow-hidden bg-slate-950 border border-slate-700 shrink-0">
                    <Image
                      src={item.product.images[0]}
                      alt={item.product.name}
                      fill
                      sizes="64px"
                      className="object-cover"
                    />
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <Link 
                        href={`/products/${item.product.id}`}
                        onClick={() => setIsCartOpen(false)}
                        className="text-xs font-bold text-white hover:text-mts-teal-glow truncate block"
                      >
                        {item.product.name}
                      </Link>
                      <button
                        type="button"
                        onClick={() => removeFromCart(item.product.id)}
                        className="text-slate-500 hover:text-red-400 p-1"
                        title="Remove item"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <span className="text-[10px] text-mts-gold font-semibold uppercase block mt-0.5">
                      {item.product.brand} • {item.product.modelNumber}
                    </span>

                    {/* Quantity + Price */}
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center border border-slate-700 rounded bg-slate-900">
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                          className="px-2 py-0.5 text-xs text-slate-400 hover:text-white"
                        >
                          -
                        </button>
                        <span className="px-2 text-xs text-white font-medium">{item.quantity}</span>
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                          className="px-2 py-0.5 text-xs text-slate-400 hover:text-white"
                        >
                          +
                        </button>
                      </div>

                      <span className="text-xs font-bold text-white text-right">
                        {formatPrice(item.product.price * item.quantity, true)}
                      </span>
                    </div>

                    {/* Installation checkbox */}
                    <label className="flex items-center gap-1.5 mt-2 pt-2 border-t border-slate-800/80 cursor-pointer select-none text-[10px] text-slate-300">
                      <input
                        type="checkbox"
                        checked={item.includeInstallation || false}
                        onChange={() => toggleInstallation(item.product.id)}
                        className="rounded border-slate-700 text-mts-teal-light w-3 h-3 bg-slate-900"
                      />
                      <span className="flex items-center gap-1">
                        <Wrench className="w-3 h-3 text-mts-gold" />
                        <span>Include Certified Installation (+{formatPrice(40 * item.quantity, true)})</span>
                      </span>
                    </label>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer Summary & Checkout Button */}
          {cart.length > 0 && (
            <div className="p-5 border-t border-slate-800 bg-mts-navy space-y-3">
              <div className="space-y-1.5 text-xs">
                <div className="flex justify-between text-slate-400">
                  <span>Hardware Subtotal</span>
                  <span className="text-white font-medium">{formatPrice(subtotal, true)}</span>
                </div>
                {totalInstallationFee > 0 && (
                  <div className="flex justify-between text-slate-400">
                    <span className="flex items-center gap-1">
                      <Wrench className="w-3 h-3 text-mts-gold" />
                      <span>Professional Installation</span>
                    </span>
                    <span className="text-mts-gold font-medium">+{formatPrice(totalInstallationFee, true)}</span>
                  </div>
                )}
                <div className="flex justify-between text-sm font-bold pt-2 border-t border-slate-800 text-white">
                  <span>Estimated Total</span>
                  <span className="text-mts-teal-glow text-sm sm:text-base font-black text-right">{formatPrice(grandTotal, true)}</span>
                </div>
              </div>

              <div className="flex items-center gap-1 text-[11px] text-slate-400 justify-center">
                <ShieldCheck className="w-3.5 h-3.5 text-mts-gold" />
                <span>Zero-risk warranty + Certified technician guarantee</span>
              </div>

              <div className="grid grid-cols-2 gap-2 pt-1">
                <Link
                  href="/cart"
                  onClick={() => setIsCartOpen(false)}
                  className="py-2.5 px-3 rounded-lg border border-slate-700 bg-slate-900 hover:bg-slate-800 text-slate-200 text-xs font-semibold text-center transition"
                >
                  View Full Cart
                </Link>
                <Link
                  href="/checkout"
                  onClick={() => setIsCartOpen(false)}
                  className="py-2.5 px-3 rounded-lg bg-gradient-to-r from-mts-teal to-mts-teal-light hover:brightness-110 text-white text-xs font-bold text-center flex items-center justify-center gap-1.5 shadow-glow-teal transition"
                >
                  <span>Checkout</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
