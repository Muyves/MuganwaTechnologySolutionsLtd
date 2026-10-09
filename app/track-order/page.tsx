'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { 
  Search, 
  ShieldCheck, 
  Package, 
  Clock, 
  Truck, 
  Wrench, 
  CheckCircle2, 
  AlertCircle 
} from 'lucide-react';
import { Order } from '@/lib/types';
import { initialOrders } from '@/data/sampleOrders';
import { useCurrency } from '@/context/CurrencyContext';

function TrackOrderContent() {
  const { formatPrice } = useCurrency();
  const searchParams = useSearchParams();
  const queryId = searchParams.get('orderId') || '';

  const [orderIdInput, setOrderIdInput] = useState(queryId);
  const [foundOrder, setFoundOrder] = useState<Order | null>(null);
  const [searchAttempted, setSearchAttempted] = useState(false);
  const [activeTab, setActiveTab] = useState<'order' | 'warranty'>('order');
  const [serialInput, setSerialInput] = useState('');
  const [warrantyResult, setWarrantyResult] = useState<any | null>(null);

  useEffect(() => {
    if (queryId) {
      handleSearch(queryId);
    }
  }, [queryId]);

  const handleSearch = (idToSearch?: string) => {
    const target = (idToSearch || orderIdInput).trim().toUpperCase();
    if (!target) return;

    setSearchAttempted(true);
    const order = initialOrders.find((o) => o.id.toUpperCase() === target);
    setFoundOrder(order || null);
  };

  const handleWarrantyLookup = (e: React.FormEvent) => {
    e.preventDefault();
    if (!serialInput.trim()) return;

    // Simulated serial check
    setWarrantyResult({
      serial: serialInput.trim().toUpperCase(),
      product: 'Hikvision AcuSense 8MP 4K IP Turret Camera',
      status: 'ACTIVE_VALID',
      purchaseDate: '2025-11-10',
      expiryDate: '2028-11-10',
      warrantyPeriod: '3 Years Official MTS Warranty',
      technician: 'Fabrice Gakwaya (Lead Field Tech)',
    });
  };

  const getStatusStepIndex = (status: Order['orderStatus']) => {
    switch (status) {
      case 'pending': return 0;
      case 'processing': return 1;
      case 'dispatched': return 2;
      case 'installed': return 3;
      case 'completed': return 4;
      default: return 1;
    }
  };

  const steps = [
    { title: 'Order Received', desc: 'Hardware pulled from secure inventory' },
    { title: 'Testing & Pre-Config', desc: 'Firmware updated & IP configured' },
    { title: 'Technician Dispatched', desc: 'Van en-route to client site' },
    { title: 'Physical Installation', desc: 'Conduit cabling & AI calibration' },
    { title: 'System Handover', desc: 'Client mobile app verified' },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-mts-teal-dark/50 text-mts-teal-glow text-xs font-semibold mb-2">
          <ShieldCheck className="w-3.5 h-3.5 text-mts-gold" />
          <span>Real-Time Logistics & Assurance</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
          Track Order & Verify Warranty
        </h1>
        <p className="text-xs sm:text-sm text-slate-300 mt-2">
          Enter your Order ID (e.g. MTS-2026-8941) or equipment serial number to review technician dispatch and warranty lifecycle.
        </p>

        {/* Tab switch */}
        <div className="flex justify-center mt-6">
          <div className="bg-slate-900 border border-slate-800 p-1 rounded-xl flex gap-1 text-xs">
            <button
              type="button"
              onClick={() => setActiveTab('order')}
              className={`px-4 py-2 rounded-lg font-bold transition ${
                activeTab === 'order' ? 'bg-mts-teal text-white shadow-glow-teal' : 'text-slate-400 hover:text-white'
              }`}
            >
              Track Order Status
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('warranty')}
              className={`px-4 py-2 rounded-lg font-bold transition ${
                activeTab === 'warranty' ? 'bg-mts-teal text-white shadow-glow-teal' : 'text-slate-400 hover:text-white'
              }`}
            >
              Verify Hardware Warranty
            </button>
          </div>
        </div>
      </div>

      {activeTab === 'order' ? (
        <div className="space-y-6">
          {/* Search Box */}
          <div className="bg-mts-navy/80 border border-slate-800 rounded-2xl p-6 shadow-xl">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSearch();
              }}
              className="flex flex-col sm:flex-row gap-3"
            >
              <div className="relative flex-1">
                <input
                  type="text"
                  placeholder="Enter Order ID (e.g. MTS-2026-8941)"
                  value={orderIdInput}
                  onChange={(e) => setOrderIdInput(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl py-3 pl-10 pr-4 text-xs sm:text-sm text-white uppercase font-mono placeholder-slate-500 focus:outline-none focus:border-mts-teal-light"
                />
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              </div>
              <button
                type="submit"
                className="py-3 px-6 rounded-xl bg-mts-teal hover:bg-mts-teal-light text-white text-xs font-bold transition shadow-glow-teal shrink-0"
              >
                Track Status
              </button>
            </form>
          </div>

          {/* Result */}
          {searchAttempted && !foundOrder && (
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-8 text-center text-slate-400 text-xs">
              <AlertCircle className="w-8 h-8 text-amber-400 mx-auto mb-2" />
              <p className="text-white font-bold text-sm">No order found with code "{orderIdInput.toUpperCase()}"</p>
              <p className="mt-1">Try sample code: <code className="text-mts-gold">MTS-2026-8941</code> or <code className="text-mts-gold">MTS-2026-8940</code></p>
            </div>
          )}

          {foundOrder && (
            <div className="bg-mts-navy/80 border border-mts-teal-light/40 rounded-2xl p-6 sm:p-8 space-y-8 shadow-2xl animate-fadeIn">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-slate-800 gap-4">
                <div>
                  <span className="text-[10px] text-mts-gold uppercase font-bold tracking-wider">Live Tracking Feed</span>
                  <h2 className="text-xl font-bold text-white mt-0.5">{foundOrder.id}</h2>
                  <p className="text-xs text-slate-400">Placed on {new Date(foundOrder.createdAt).toLocaleDateString()}</p>
                </div>
                <div className="text-right">
                  <span className="text-xs text-slate-400 block">Current Status:</span>
                  <span className="inline-block bg-mts-teal-dark text-mts-teal-glow px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mt-1 border border-mts-teal-light/30">
                    ● {foundOrder.orderStatus}
                  </span>
                </div>
              </div>

              {/* Step Tracker Visual */}
              <div>
                <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-6">Fulfillment Progress</h3>
                <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                  {steps.map((step, idx) => {
                    const currentIndex = getStatusStepIndex(foundOrder.orderStatus);
                    const isPassed = idx <= currentIndex;
                    const isCurrent = idx === currentIndex;

                    return (
                      <div
                        key={idx}
                        className={`p-3.5 rounded-xl border text-xs relative ${
                          isCurrent
                            ? 'bg-mts-teal-dark/60 border-mts-teal-glow shadow-glow-teal text-white'
                            : isPassed
                            ? 'bg-slate-900 border-slate-700 text-slate-200'
                            : 'bg-slate-950/40 border-slate-800 text-slate-500'
                        }`}
                      >
                        <div className="flex items-center gap-1.5 mb-1.5">
                          <span className={`w-2 h-2 rounded-full ${isPassed ? 'bg-emerald-400' : 'bg-slate-700'}`}></span>
                          <span className="font-bold uppercase text-[10px]">Step {idx + 1}</span>
                        </div>
                        <h4 className="font-bold text-white text-xs">{step.title}</h4>
                        <p className="text-[11px] text-slate-400 mt-1">{step.desc}</p>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Order Items Table */}
              <div>
                <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-3">Equipment on this Manifest</h3>
                <div className="divide-y divide-slate-800 text-xs">
                  {foundOrder.items.map((item, i) => (
                    <div key={i} className="py-3 flex items-center justify-between">
                      <div>
                        <span className="font-semibold text-white block">{item.productName}</span>
                        <span className="text-slate-400 text-[11px]">
                          Qty: {item.quantity} {item.includeInstallation && '• With On-Site Installation'}
                        </span>
                      </div>
                      <span className="font-bold text-white shrink-0 text-right">{formatPrice(item.price * item.quantity, true)}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      ) : (
        /* Warranty Verification Tab */
        <div className="bg-mts-navy/80 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl">
          <div>
            <h2 className="text-base font-bold text-white">Equipment Serial Number Lookup</h2>
            <p className="text-xs text-slate-400 mt-1">Check warranty validity for devices bought from Muganwa Technology Solutions Ltd.</p>
          </div>

          <form onSubmit={handleWarrantyLookup} className="flex flex-col sm:flex-row gap-3">
            <input
              type="text"
              placeholder="e.g. HK-2025-SN-9824"
              value={serialInput}
              onChange={(e) => setSerialInput(e.target.value)}
              className="flex-1 bg-slate-900 border border-slate-700 rounded-xl p-3 text-xs text-white font-mono uppercase focus:border-mts-teal-light"
            />
            <button
              type="submit"
              className="py-3 px-6 rounded-xl bg-mts-teal hover:bg-mts-teal-light text-white text-xs font-bold transition"
            >
              Verify Warranty
            </button>
          </form>

          {warrantyResult && (
            <div className="bg-slate-900 border border-emerald-500/40 rounded-xl p-5 text-xs space-y-3 animate-fadeIn">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <span className="font-mono text-mts-gold font-bold">Serial: {warrantyResult.serial}</span>
                <span className="bg-emerald-500/20 text-emerald-400 px-2.5 py-0.5 rounded-full font-bold uppercase text-[10px]">
                  ● Active Official Warranty
                </span>
              </div>
              <div className="grid grid-cols-2 gap-3 text-slate-300">
                <div>
                  <span className="text-slate-500 block text-[10px] uppercase">Product Name</span>
                  <span className="text-white font-semibold">{warrantyResult.product}</span>
                </div>
                <div>
                  <span className="text-slate-500 block text-[10px] uppercase">Warranty Expiration</span>
                  <span className="text-white font-semibold">{warrantyResult.expiryDate} (Active)</span>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default function TrackOrderPage() {
  return (
    <Suspense fallback={<div className="p-12 text-center text-slate-400">Loading Order Tracking...</div>}>
      <TrackOrderContent />
    </Suspense>
  );
}
