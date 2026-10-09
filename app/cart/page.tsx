'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  ShoppingCart, 
  Trash2, 
  ArrowRight, 
  ArrowLeft, 
  ShieldCheck, 
  Wrench, 
  Tag, 
  Check 
} from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useCurrency } from '@/context/CurrencyContext';

export default function CartPage() {
  const { 
    cart, 
    removeFromCart, 
    updateQuantity, 
    toggleInstallation, 
    clearCart, 
    subtotal, 
    totalInstallationFee, 
    grandTotal 
  } = useCart();
  const { formatPrice } = useCurrency();

  const [couponInput, setCouponInput] = useState('');
  const [discountPercent, setDiscountPercent] = useState(0);
  const [couponError, setCouponError] = useState('');
  const [couponSuccess, setCouponSuccess] = useState('');

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    setCouponError('');
    setCouponSuccess('');

    if (couponInput.trim().toUpperCase() === 'MTS10') {
      setDiscountPercent(0.10);
      setCouponSuccess('10% MTS VIP Discount applied!');
    } else if (couponInput.trim().toUpperCase() === 'MUKIZA') {
      setDiscountPercent(0.15);
      setCouponSuccess('15% Executive Courtesy Discount applied!');
    } else {
      setCouponError('Invalid coupon code. Try MTS10 or MUKIZA');
    }
  };

  const discountAmount = subtotal * discountPercent;
  const finalTotal = Math.max(0, grandTotal - discountAmount);

  if (cart.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-24 text-center">
        <div className="p-5 rounded-full bg-slate-900 border border-slate-800 w-20 h-20 mx-auto mb-4 flex items-center justify-center text-slate-600">
          <ShoppingCart className="w-10 h-10" />
        </div>
        <h1 className="text-2xl font-bold text-white">Your Shopping Cart is Empty</h1>
        <p className="text-xs text-slate-400 mt-2 max-w-sm mx-auto">
          Explore our range of 4K surveillance cameras, NVRs, biometric terminals, or launch the Security Kit Builder.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3 mt-6">
          <Link
            href="/products"
            className="px-5 py-2.5 rounded-lg bg-mts-teal hover:bg-mts-teal-light text-white text-xs font-bold transition"
          >
            Browse Product Catalog
          </Link>
          <Link
            href="/kit-builder"
            className="px-5 py-2.5 rounded-lg bg-mts-navy hover:bg-slate-800 border border-slate-700 text-white text-xs font-bold transition"
          >
            Security Kit Builder
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-800">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">Shopping Cart</h1>
          <p className="text-xs text-slate-400 mt-1">Review your security equipment and installation preferences</p>
        </div>
        <button
          type="button"
          onClick={clearCart}
          className="text-xs text-slate-400 hover:text-red-400 transition"
        >
          Clear All Items
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Cart Items List (8 cols) */}
        <div className="lg:col-span-8 space-y-4">
          <div className="bg-mts-navy/80 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
            <div className="divide-y divide-slate-800">
              {cart.map((item) => (
                <div key={item.product.id} className="p-4 sm:p-6 flex flex-col sm:flex-row gap-4 sm:items-center">
                  {/* Image */}
                  <div className="relative w-20 h-20 rounded-xl overflow-hidden bg-slate-950 border border-slate-800 shrink-0">
                    <Image src={item.product.images[0]} alt={item.product.name} fill sizes="80px" className="object-cover" />
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <span className="text-[10px] uppercase font-bold text-mts-gold">
                      {item.product.brand} • {item.product.modelNumber}
                    </span>
                    <Link href={`/products/${item.product.id}`} className="text-sm font-bold text-white hover:text-mts-teal-glow block truncate">
                      {item.product.name}
                    </Link>

                    {/* Installation toggle */}
                    <label className="flex items-center gap-1.5 mt-2 cursor-pointer select-none text-xs text-slate-300">
                      <input
                        type="checkbox"
                        checked={item.includeInstallation || false}
                        onChange={() => toggleInstallation(item.product.id)}
                        className="rounded text-mts-teal-light w-3.5 h-3.5 bg-slate-900 border-slate-700"
                      />
                      <span className="flex items-center gap-1">
                        <Wrench className="w-3 h-3 text-mts-gold" />
                        <span>Include Turnkey Installation (+{formatPrice(40 * item.quantity, true)})</span>
                      </span>
                    </label>
                  </div>

                  {/* Quantity */}
                  <div className="flex items-center border border-slate-700 rounded-lg bg-slate-900 shrink-0">
                    <button
                      type="button"
                      onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                      className="px-3 py-1.5 text-xs text-slate-400 hover:text-white"
                    >
                      -
                    </button>
                    <span className="px-2 text-xs font-bold text-white min-w-[2rem] text-center">
                      {item.quantity}
                    </span>
                    <button
                      type="button"
                      onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                      className="px-3 py-1.5 text-xs text-slate-400 hover:text-white"
                    >
                      +
                    </button>
                  </div>

                  {/* Line Total */}
                  <div className="text-right shrink-0 min-w-[7rem]">
                    <span className="text-sm font-black text-white block">
                      {formatPrice(item.product.price * item.quantity, true)}
                    </span>
                    <button
                      type="button"
                      onClick={() => removeFromCart(item.product.id)}
                      className="text-slate-500 hover:text-red-400 text-xs mt-1"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-between pt-2">
            <Link href="/products" className="text-xs text-slate-400 hover:text-white flex items-center gap-1">
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Continue Shopping</span>
            </Link>
          </div>
        </div>

        {/* Order Summary & Coupon (4 cols) */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-mts-navy/90 border border-slate-800 rounded-2xl p-6 shadow-2xl space-y-4">
            <h3 className="text-base font-bold text-white pb-3 border-b border-slate-800">
              Order Summary
            </h3>

            {/* Coupon Code */}
            <form onSubmit={handleApplyCoupon} className="space-y-1.5">
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Coupon code (e.g. MTS10)"
                  value={couponInput}
                  onChange={(e) => setCouponInput(e.target.value)}
                  className="flex-1 bg-slate-900 border border-slate-700 rounded-lg py-2 px-3 text-xs text-white uppercase placeholder-slate-500 focus:outline-none focus:border-mts-teal-light"
                />
                <button
                  type="submit"
                  className="px-3 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-white transition"
                >
                  Apply
                </button>
              </div>
              {couponSuccess && <p className="text-[11px] text-emerald-400">{couponSuccess}</p>}
              {couponError && <p className="text-[11px] text-red-400">{couponError}</p>}
            </form>

            <div className="space-y-2 text-xs pt-2 border-t border-slate-800">
              <div className="flex justify-between text-slate-400">
                <span>Hardware Subtotal</span>
                <span className="text-white font-medium">{formatPrice(subtotal, true)}</span>
              </div>
              {totalInstallationFee > 0 && (
                <div className="flex justify-between text-slate-400">
                  <span className="flex items-center gap-1">
                    <Wrench className="w-3 h-3 text-mts-gold" />
                    <span>Turnkey Installation</span>
                  </span>
                  <span className="text-mts-gold font-medium">+{formatPrice(totalInstallationFee, true)}</span>
                </div>
              )}
              {discountPercent > 0 && (
                <div className="flex justify-between text-emerald-400 font-semibold">
                  <span>Coupon Discount ({discountPercent * 100}%)</span>
                  <span>-{formatPrice(discountAmount, true)}</span>
                </div>
              )}
              <div className="flex justify-between text-slate-400">
                <span>Estimated Taxes / VAT</span>
                <span className="text-white font-medium">Included</span>
              </div>
              <div className="flex justify-between text-base font-bold text-white pt-3 border-t border-slate-800">
                <span>Total Due</span>
                <span className="text-xl text-mts-teal-glow font-black">{formatPrice(finalTotal, true)}</span>
              </div>
            </div>

            <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 text-[11px] text-slate-400 space-y-1">
              <div className="flex items-center gap-1.5 text-slate-300 font-medium">
                <ShieldCheck className="w-3.5 h-3.5 text-mts-gold" />
                <span>3-Year Hardware Warranty Included</span>
              </div>
              <p>Accepted: MTN MoMo, Airtel Money, Visa/MC & Bank Transfer</p>
            </div>

            <Link
              href="/checkout"
              className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-mts-teal to-mts-teal-light hover:brightness-110 text-white font-extrabold text-sm flex items-center justify-center gap-2 shadow-glow-teal transition text-center"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
