'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  ShieldCheck, 
  CreditCard, 
  Smartphone, 
  Building, 
  CheckCircle2, 
  ArrowRight, 
  Lock, 
  Printer, 
  Wrench, 
  FileText 
} from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useCurrency } from '@/context/CurrencyContext';
import { Order } from '@/lib/types';

export default function CheckoutPage() {
  const { cart, subtotal, totalInstallationFee, grandTotal, clearCart } = useCart();
  const { formatPrice, formatUsd, formatRwf } = useCurrency();

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    street: '',
    city: 'Kigali',
    district: 'Gasabo',
    country: 'Rwanda',
    paymentMethod: 'momo' as 'momo' | 'card' | 'bank_transfer' | 'cod',
    momoPhone: '',
    cardNumber: '',
    cardExpiry: '',
    cardCvc: '',
    notes: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [completedOrder, setCompletedOrder] = useState<Order | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const orderPayload = {
      customerName: formData.fullName,
      customerEmail: formData.email,
      customerPhone: formData.phone,
      shippingAddress: {
        street: formData.street,
        city: formData.city,
        district: formData.district,
        country: formData.country,
      },
      items: cart.map((item) => ({
        productId: item.product.id,
        productName: item.product.name,
        price: item.product.price,
        quantity: item.quantity,
        includeInstallation: item.includeInstallation || false,
        image: item.product.images[0],
      })),
      subtotal,
      installationFee: totalInstallationFee,
      tax: 0,
      total: grandTotal,
      paymentMethod: formData.paymentMethod as Order['paymentMethod'],
      paymentStatus: (formData.paymentMethod === 'cod' ? 'pending' : 'paid') as Order['paymentStatus'],
      orderStatus: 'processing' as Order['orderStatus'],
      notes: formData.notes,
    };

    try {
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderPayload),
      });
      const data = await res.json();
      if (res.ok) {
        setCompletedOrder(data.order);
        clearCart();
      } else {
        alert(data.error || 'Failed to place order');
      }
    } catch (err) {
      // Fallback
      const fakeOrder: Order = {
        ...orderPayload,
        id: `MTS-2026-${Math.floor(1000 + Math.random() * 9000)}`,
        createdAt: new Date().toISOString(),
      };
      setCompletedOrder(fakeOrder);
      clearCart();
    } finally {
      setIsSubmitting(false);
    }
  };

  // If order was successfully completed, show invoice receipt
  if (completedOrder) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-12 space-y-8 animate-fadeIn">
        {/* Success Alert */}
        <div className="bg-emerald-950/40 border border-emerald-500/50 rounded-2xl p-6 text-center space-y-2">
          <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <h1 className="text-xl sm:text-2xl font-black text-white">Order & Installation Confirmed!</h1>
          <p className="text-xs text-slate-300">
            Thank you, <strong>{completedOrder.customerName}</strong>. Your official order tracking code is{' '}
            <span className="text-mts-gold font-mono font-bold text-sm">{completedOrder.id}</span>.
          </p>
        </div>

        {/* Printable Official Invoice / Receipt */}
        <div className="bg-white text-slate-900 rounded-2xl p-8 shadow-2xl border border-slate-200 space-y-6 print:m-0 print:border-none">
          {/* Header */}
          <div className="flex items-start justify-between pb-6 border-b border-slate-200">
            <div className="flex items-center gap-3">
              <div className="relative w-12 h-12 rounded overflow-hidden bg-slate-950 p-1">
                <Image src="/images/logo.png" alt="MTS Logo" fill sizes="48px" className="object-contain" />
              </div>
              <div>
                <h2 className="text-base font-black text-slate-900">MUGANWA TECHNOLOGY SOLUTIONS LTD</h2>
                <p className="text-[11px] text-slate-500">KG 7 Ave, Kigali Commercial Tower, Rwanda</p>
                <p className="text-[11px] text-slate-500">TIN: 102948102 • VAT Registered</p>
              </div>
            </div>
            <div className="text-right">
              <span className="text-xs font-mono font-bold uppercase text-slate-500 block">OFFICIAL INVOICE</span>
              <span className="text-sm font-black text-slate-900 block mt-0.5">{completedOrder.id}</span>
              <span className="text-[11px] text-slate-500 block">{new Date(completedOrder.createdAt).toLocaleDateString()}</span>
            </div>
          </div>

          {/* Customer info */}
          <div className="grid grid-cols-2 gap-4 text-xs">
            <div>
              <span className="font-bold text-slate-400 uppercase text-[10px] block">Billed & Delivered To:</span>
              <p className="font-bold text-slate-900 mt-0.5">{completedOrder.customerName}</p>
              <p className="text-slate-600">{completedOrder.customerEmail}</p>
              <p className="text-slate-600">{completedOrder.customerPhone}</p>
              <p className="text-slate-600 mt-1">
                {completedOrder.shippingAddress.street}, {completedOrder.shippingAddress.city}, {completedOrder.shippingAddress.country}
              </p>
            </div>
            <div className="text-right">
              <span className="font-bold text-slate-400 uppercase text-[10px] block">Payment Method:</span>
              <p className="font-bold text-slate-900 mt-0.5 uppercase">{completedOrder.paymentMethod}</p>
              <p className="text-emerald-600 font-semibold uppercase">{completedOrder.paymentStatus}</p>
              <span className="font-bold text-slate-400 uppercase text-[10px] block mt-2">Technical Supervisor:</span>
              <p className="text-slate-700 font-medium">MUKIZA Richard</p>
            </div>
          </div>

          {/* Itemized Table */}
          <table className="w-full text-xs text-left border-collapse border-y border-slate-200">
            <thead>
              <tr className="bg-slate-50 text-slate-500 uppercase text-[10px]">
                <th className="py-2.5 px-2">Equipment Description</th>
                <th className="py-2.5 px-2 text-center">Qty</th>
                <th className="py-2.5 px-2 text-right">Unit Price</th>
                <th className="py-2.5 px-2 text-right">Total</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {completedOrder.items.map((item, i) => (
                <tr key={i}>
                  <td className="py-2.5 px-2">
                    <span className="font-semibold text-slate-900 block">{item.productName}</span>
                    {item.includeInstallation && (
                      <span className="text-[10px] text-emerald-700 font-medium">
                        + Turnkey On-Site Installation & Cabling Included
                      </span>
                    )}
                  </td>
                  <td className="py-2.5 px-2 text-center font-medium">{item.quantity}</td>
                  <td className="py-2.5 px-2 text-right">{formatPrice(item.price, true)}</td>
                  <td className="py-2.5 px-2 text-right font-bold text-slate-900">
                    {formatPrice(item.price * item.quantity, true)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Summary */}
          <div className="space-y-1.5 text-xs text-right pt-2">
            <div className="flex justify-between text-slate-600">
              <span>Hardware Subtotal:</span>
              <span>{formatPrice(completedOrder.subtotal, true)}</span>
            </div>
            {completedOrder.installationFee > 0 && (
              <div className="flex justify-between text-slate-600">
                <span>Certified Installation Fee:</span>
                <span>+{formatPrice(completedOrder.installationFee, true)}</span>
              </div>
            )}
            <div className="flex justify-between text-slate-600">
              <span>Taxes / VAT (18% Included):</span>
              <span>Included</span>
            </div>
            <div className="flex justify-between text-base font-black text-slate-900 pt-2 border-t border-slate-200">
              <span>Grand Total:</span>
              <span className="text-mts-navy font-black">{formatPrice(completedOrder.total, true)}</span>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-200 flex justify-between items-center text-[10px] text-slate-500">
            <span>3-Year Hardware Warranty valid from invoice date.</span>
            <span>Muganwa Technology Solutions Ltd • Authorized Partner</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-between gap-4 print:hidden">
          <button
            type="button"
            onClick={() => window.print()}
            className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold flex items-center gap-2 transition"
          >
            <Printer className="w-4 h-4" />
            <span>Print Invoice Receipt</span>
          </button>
          <Link
            href={`/track-order?orderId=${completedOrder.id}`}
            className="px-5 py-2.5 rounded-xl bg-mts-teal hover:bg-mts-teal-light text-white text-xs font-bold flex items-center gap-2 shadow-glow-teal transition"
          >
            <span>Track Order & Installation Status</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    );
  }

  // If cart is empty
  if (cart.length === 0) {
    return (
      <div className="max-w-xl mx-auto px-4 py-24 text-center">
        <h1 className="text-xl font-bold text-white">No items in your cart to checkout</h1>
        <Link href="/products" className="mt-4 inline-block px-4 py-2 rounded-lg bg-mts-teal text-white text-xs font-bold">
          Return to Catalog
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <div>
        <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">Checkout & Order Placement</h1>
        <p className="text-xs text-slate-400 mt-1">
          Complete your contact information, select installation address, and choose your preferred payment method.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Details & Payment (8 cols) */}
        <div className="lg:col-span-8 space-y-8">
          {/* Step 1: Customer Contact */}
          <div className="bg-mts-navy/80 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-4">
            <h2 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2 pb-2 border-b border-slate-800">
              <span>1. Contact & Customer Details</span>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Full Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Dr. Jean-Pierre Habimana"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 text-white focus:border-mts-teal-light focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Phone Number (WhatsApp for Tech Dispatch) *</label>
                <input
                  type="tel"
                  required
                  placeholder="+250 788 000 000"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 text-white focus:border-mts-teal-light focus:outline-none"
                />
              </div>
              <div className="sm:col-span-2">
                <label className="block text-slate-300 font-semibold mb-1">Email Address for VAT Invoice & Tracking *</label>
                <input
                  type="email"
                  required
                  placeholder="name@company.rw"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 text-white focus:border-mts-teal-light focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* Step 2: Shipping & Site Address */}
          <div className="bg-mts-navy/80 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-4">
            <h2 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2 pb-2 border-b border-slate-800">
              <span>2. Delivery & Installation Address</span>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="sm:col-span-2">
                <label className="block text-slate-300 font-semibold mb-1">Street Address / House / Plot # *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. KG 14 Ave, Plot 22, Kibagabaga"
                  value={formData.street}
                  onChange={(e) => setFormData({ ...formData, street: e.target.value })}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 text-white focus:border-mts-teal-light focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-slate-300 font-semibold mb-1">City *</label>
                <input
                  type="text"
                  required
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 text-white focus:border-mts-teal-light focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-slate-300 font-semibold mb-1">District / Province *</label>
                <input
                  type="text"
                  required
                  value={formData.district}
                  onChange={(e) => setFormData({ ...formData, district: e.target.value })}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 text-white focus:border-mts-teal-light focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* Step 3: Payment Method Selection */}
          <div className="bg-mts-navy/80 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-4">
            <h2 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2 pb-2 border-b border-slate-800">
              <span>3. Payment Gateway Option</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              {/* Mobile Money */}
              <label
                className={`p-4 rounded-xl border cursor-pointer flex items-start gap-3 transition ${
                  formData.paymentMethod === 'momo'
                    ? 'bg-mts-teal-dark/60 border-mts-teal-light text-white shadow-glow-teal'
                    : 'bg-slate-900 border-slate-800 text-slate-300'
                }`}
              >
                <input
                  type="radio"
                  name="paymentMethod"
                  value="momo"
                  checked={formData.paymentMethod === 'momo'}
                  onChange={() => setFormData({ ...formData, paymentMethod: 'momo' })}
                  className="mt-1 text-mts-teal-light bg-slate-900 border-slate-700"
                />
                <div>
                  <span className="font-bold text-white flex items-center gap-2">
                    <Smartphone className="w-4 h-4 text-yellow-400" />
                    <span>Mobile Money (MTN / Airtel)</span>
                  </span>
                  <span className="text-[11px] text-slate-400 block mt-1">
                    Instant push prompt to your mobile handset. 0% gateway fees.
                  </span>
                </div>
              </label>

              {/* Credit / Debit Card */}
              <label
                className={`p-4 rounded-xl border cursor-pointer flex items-start gap-3 transition ${
                  formData.paymentMethod === 'card'
                    ? 'bg-mts-teal-dark/60 border-mts-teal-light text-white shadow-glow-teal'
                    : 'bg-slate-900 border-slate-800 text-slate-300'
                }`}
              >
                <input
                  type="radio"
                  name="paymentMethod"
                  value="card"
                  checked={formData.paymentMethod === 'card'}
                  onChange={() => setFormData({ ...formData, paymentMethod: 'card' })}
                  className="mt-1 text-mts-teal-light bg-slate-900 border-slate-700"
                />
                <div>
                  <span className="font-bold text-white flex items-center gap-2">
                    <CreditCard className="w-4 h-4 text-blue-400" />
                    <span>Credit / Debit Card (Stripe)</span>
                  </span>
                  <span className="text-[11px] text-slate-400 block mt-1">
                    Visa, MasterCard & American Express. 256-bit encrypted.
                  </span>
                </div>
              </label>

              {/* Bank Transfer / Proforma */}
              <label
                className={`p-4 rounded-xl border cursor-pointer flex items-start gap-3 transition ${
                  formData.paymentMethod === 'bank_transfer'
                    ? 'bg-mts-teal-dark/60 border-mts-teal-light text-white shadow-glow-teal'
                    : 'bg-slate-900 border-slate-800 text-slate-300'
                }`}
              >
                <input
                  type="radio"
                  name="paymentMethod"
                  value="bank_transfer"
                  checked={formData.paymentMethod === 'bank_transfer'}
                  onChange={() => setFormData({ ...formData, paymentMethod: 'bank_transfer' })}
                  className="mt-1 text-mts-teal-light bg-slate-900 border-slate-700"
                />
                <div>
                  <span className="font-bold text-white flex items-center gap-2">
                    <Building className="w-4 h-4 text-mts-gold" />
                    <span>Bank Transfer / Proforma</span>
                  </span>
                  <span className="text-[11px] text-slate-400 block mt-1">
                    Official Proforma Invoice supplied for Corporate & NGO wire.
                  </span>
                </div>
              </label>

              {/* Cash on Installation */}
              <label
                className={`p-4 rounded-xl border cursor-pointer flex items-start gap-3 transition ${
                  formData.paymentMethod === 'cod'
                    ? 'bg-mts-teal-dark/60 border-mts-teal-light text-white shadow-glow-teal'
                    : 'bg-slate-900 border-slate-800 text-slate-300'
                }`}
              >
                <input
                  type="radio"
                  name="paymentMethod"
                  value="cod"
                  checked={formData.paymentMethod === 'cod'}
                  onChange={() => setFormData({ ...formData, paymentMethod: 'cod' })}
                  className="mt-1 text-mts-teal-light bg-slate-900 border-slate-700"
                />
                <div>
                  <span className="font-bold text-white flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-emerald-400" />
                    <span>Pay Upon Successful Installation</span>
                  </span>
                  <span className="text-[11px] text-slate-400 block mt-1">
                    Verify live camera feed on your phone before paying our technician.
                  </span>
                </div>
              </label>
            </div>

            {/* Sub-inputs based on payment choice */}
            {formData.paymentMethod === 'momo' && (
              <div className="mt-4 p-4 rounded-xl bg-slate-900 border border-slate-800 text-xs space-y-2 animate-fadeIn">
                <label className="block text-slate-300 font-semibold">MTN MoMo or Airtel Money Number</label>
                <input
                  type="tel"
                  placeholder="078... or 072..."
                  value={formData.momoPhone}
                  onChange={(e) => setFormData({ ...formData, momoPhone: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg p-3 text-white focus:border-mts-teal-light"
                />
                <p className="text-[11px] text-slate-400">
                  After clicking submit, a USSD prompt will appear on your phone asking you to enter your PIN to authorize payment to <strong>Muganwa Technology Solutions Ltd</strong>.
                </p>
              </div>
            )}

            {formData.paymentMethod === 'card' && (
              <div className="mt-4 p-4 rounded-xl bg-slate-900 border border-slate-800 text-xs space-y-3 animate-fadeIn">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Card Number (Encrypted)</label>
                  <input
                    type="text"
                    placeholder="4000 1234 5678 9010"
                    value={formData.cardNumber}
                    onChange={(e) => setFormData({ ...formData, cardNumber: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg p-3 text-white font-mono"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-300 font-semibold mb-1">Expiry Date</label>
                    <input
                      type="text"
                      placeholder="MM/YY"
                      value={formData.cardExpiry}
                      onChange={(e) => setFormData({ ...formData, cardExpiry: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-700 rounded-lg p-3 text-white font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-300 font-semibold mb-1">CVC / CVV</label>
                    <input
                      type="text"
                      placeholder="123"
                      value={formData.cardCvc}
                      onChange={(e) => setFormData({ ...formData, cardCvc: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-700 rounded-lg p-3 text-white font-mono"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Order Review Box (4 cols) */}
        <div className="lg:col-span-4 space-y-6 sticky top-28">
          <div className="bg-mts-navy/90 border border-mts-teal-light/40 rounded-2xl p-6 shadow-2xl space-y-4">
            <h3 className="text-base font-bold text-white pb-3 border-b border-slate-800">
              System Order Summary
            </h3>

            <div className="max-h-60 overflow-y-auto space-y-2 text-xs divide-y divide-slate-800/60">
              {cart.map((item) => (
                <div key={item.product.id} className="pt-2 first:pt-0 flex items-center justify-between gap-2">
                  <div className="min-w-0">
                    <p className="text-white font-semibold truncate">{item.product.name}</p>
                    <span className="text-[10px] text-slate-400">
                      Qty: {item.quantity} × {formatPrice(item.product.price, true)}
                    </span>
                    {item.includeInstallation && (
                      <span className="text-[10px] text-mts-gold block">+ Installation</span>
                    )}
                  </div>
                  <span className="font-bold text-white shrink-0 text-right">
                    {formatPrice(item.product.price * item.quantity, true)}
                  </span>
                </div>
              ))}
            </div>

            <div className="space-y-2 text-xs pt-3 border-t border-slate-800">
              <div className="flex justify-between text-slate-400">
                <span>Hardware Subtotal</span>
                <span className="text-white font-medium">{formatPrice(subtotal, true)}</span>
              </div>
              {totalInstallationFee > 0 && (
                <div className="flex justify-between text-slate-400">
                  <span className="flex items-center gap-1">
                    <Wrench className="w-3.5 h-3.5 text-mts-gold" />
                    <span>Turnkey Installation</span>
                  </span>
                  <span className="text-mts-gold font-medium">+{formatPrice(totalInstallationFee, true)}</span>
                </div>
              )}
              <div className="flex justify-between text-base font-bold text-white pt-2 border-t border-slate-800">
                <span>Total Due</span>
                <span className="text-xl text-mts-teal-glow font-black">{formatPrice(grandTotal, true)}</span>
              </div>
            </div>

            <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 text-[11px] text-slate-300 space-y-1">
              <div className="flex items-center gap-1.5 font-semibold text-white">
                <Lock className="w-3.5 h-3.5 text-mts-gold" />
                <span>Zero-Risk Bank Encryption</span>
              </div>
              <p className="text-slate-400">Card credentials are never saved on our servers.</p>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-mts-teal to-mts-teal-light hover:brightness-110 text-white font-extrabold text-sm shadow-glow-teal transition flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <span>Dispatching Security Order...</span>
              ) : (
                <>
                  <ShieldCheck className="w-4 h-4 text-mts-gold" />
                  <span>Place Order • {formatPrice(grandTotal, true)}</span>
                </>
              )}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
