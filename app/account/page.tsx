'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  User, 
  Package, 
  Calendar, 
  LifeBuoy, 
  ShieldCheck, 
  Clock, 
  ExternalLink, 
  AlertCircle,
  PlusCircle
} from 'lucide-react';
import { initialOrders, initialBookings } from '@/data/sampleOrders';

export default function CustomerAccountPage() {
  const [activeTab, setActiveTab] = useState<'orders' | 'bookings' | 'tickets' | 'warranty'>('orders');
  const [tickets, setTickets] = useState([
    {
      id: 'TCK-401',
      subject: 'Mobile app camera sharing with second smartphone',
      status: 'RESOLVED',
      date: '2026-09-12',
      technician: 'Fabrice Gakwaya',
    },
    {
      id: 'TCK-402',
      subject: 'Scheduled quarterly preventative lens cleaning',
      status: 'OPEN',
      date: '2026-09-18',
      technician: 'MUKIZA Richard (Reviewing)',
    },
  ]);

  const [newTicketSubject, setNewTicketSubject] = useState('');
  const [showNewTicketModal, setShowNewTicketModal] = useState(false);

  const handleCreateTicket = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTicketSubject.trim()) return;

    setTickets([
      {
        id: `TCK-${Math.floor(400 + Math.random() * 100)}`,
        subject: newTicketSubject,
        status: 'OPEN',
        date: new Date().toISOString().split('T')[0],
        technician: 'Dispatching...',
      },
      ...tickets,
    ]);
    setNewTicketSubject('');
    setShowNewTicketModal(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Account Profile Header */}
      <div className="bg-mts-navy/90 border border-slate-800 rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 shadow-2xl">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-mts-teal-dark border border-mts-teal-light flex items-center justify-center text-white text-xl font-black">
            JH
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold text-white">Dr. Jean-Pierre Habimana</h1>
              <span className="bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase">
                Verified Client
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">jp.habimana@polyclinique.rw • +250 788 345 678</p>
            <p className="text-[11px] text-mts-gold mt-1">Property: Polyclinique de Kigali, KG 14 Ave</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/services#booking-section"
            className="px-4 py-2 rounded-lg bg-mts-teal hover:bg-mts-teal-light text-white text-xs font-bold transition"
          >
            Request Technician Visit
          </Link>
          <Link
            href="/admin"
            className="px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-slate-400 hover:text-white text-xs transition"
          >
            Admin Switch
          </Link>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-slate-800 gap-6 text-xs sm:text-sm font-semibold">
        <button
          type="button"
          onClick={() => setActiveTab('orders')}
          className={`pb-3 border-b-2 flex items-center gap-2 transition ${
            activeTab === 'orders' ? 'border-mts-teal-light text-white' : 'border-transparent text-slate-400 hover:text-white'
          }`}
        >
          <Package className="w-4 h-4 text-mts-gold" />
          <span>My Orders ({initialOrders.length})</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('bookings')}
          className={`pb-3 border-b-2 flex items-center gap-2 transition ${
            activeTab === 'bookings' ? 'border-mts-teal-light text-white' : 'border-transparent text-slate-400 hover:text-white'
          }`}
        >
          <Calendar className="w-4 h-4 text-mts-teal-glow" />
          <span>Installation Visits ({initialBookings.length})</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('tickets')}
          className={`pb-3 border-b-2 flex items-center gap-2 transition ${
            activeTab === 'tickets' ? 'border-mts-teal-light text-white' : 'border-transparent text-slate-400 hover:text-white'
          }`}
        >
          <LifeBuoy className="w-4 h-4 text-amber-400" />
          <span>Support Tickets ({tickets.length})</span>
        </button>
      </div>

      {/* Tab: Orders */}
      {activeTab === 'orders' && (
        <div className="space-y-4">
          {initialOrders.map((order) => (
            <div key={order.id} className="bg-mts-navy/70 border border-slate-800 rounded-2xl p-6 space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-800 text-xs">
                <div>
                  <span className="text-slate-400 text-[10px] uppercase font-bold">Order Reference:</span>
                  <span className="text-white font-mono font-bold block text-sm">{order.id}</span>
                </div>
                <div>
                  <span className="text-slate-400 text-[10px] uppercase font-bold">Date Placed:</span>
                  <span className="text-white block">{new Date(order.createdAt).toLocaleDateString()}</span>
                </div>
                <div>
                  <span className="text-slate-400 text-[10px] uppercase font-bold">Payment Method:</span>
                  <span className="text-white block uppercase">{order.paymentMethod}</span>
                </div>
                <div className="text-right">
                  <span className="text-slate-400 text-[10px] uppercase font-bold">Status:</span>
                  <span className="inline-block bg-mts-teal-dark text-mts-teal-glow px-2.5 py-0.5 rounded-full text-xs font-bold uppercase block mt-0.5">
                    ● {order.orderStatus}
                  </span>
                </div>
              </div>

              {/* Items */}
              <div className="divide-y divide-slate-800/80 text-xs">
                {order.items.map((item, i) => (
                  <div key={i} className="py-2.5 flex items-center justify-between">
                    <div>
                      <span className="text-white font-semibold block">{item.productName}</span>
                      <span className="text-slate-400 text-[11px]">
                        Quantity: {item.quantity} {item.includeInstallation && '• With On-Site Installation'}
                      </span>
                    </div>
                    <span className="font-bold text-white">${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>

              <div className="pt-3 border-t border-slate-800 flex justify-between items-center text-xs">
                <Link
                  href={`/track-order?orderId=${order.id}`}
                  className="text-mts-teal-glow hover:underline font-semibold flex items-center gap-1"
                >
                  <span>Track Real-Time Technician Manifest</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </Link>
                <div className="text-right">
                  <span className="text-slate-400 mr-2">Total Paid:</span>
                  <span className="text-white font-black text-sm">${order.total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Tab: Bookings */}
      {activeTab === 'bookings' && (
        <div className="space-y-4 text-xs">
          {initialBookings.map((b) => (
            <div key={b.id} className="bg-mts-navy/70 border border-slate-800 rounded-2xl p-6 space-y-3">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <span className="font-mono text-mts-gold font-bold">{b.id}</span>
                <span className="bg-mts-teal-dark text-mts-teal-glow px-2.5 py-0.5 rounded-full font-bold uppercase text-[10px]">
                  ● {b.status}
                </span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-slate-300">
                <div>
                  <span className="text-slate-500 block uppercase text-[10px]">Scheduled Date</span>
                  <span className="text-white font-bold">{b.requestedDate} ({b.requestedTimeSlot})</span>
                </div>
                <div>
                  <span className="text-slate-500 block uppercase text-[10px]">Assigned Engineer</span>
                  <span className="text-white font-bold">{b.assignedTechnician || 'MUKIZA Richard (Supervising)'}</span>
                </div>
                <div>
                  <span className="text-slate-500 block uppercase text-[10px]">Site Address</span>
                  <span className="text-white">{b.address}, {b.city}</span>
                </div>
              </div>
              <p className="text-slate-400 italic pt-1">{b.notes}</p>
            </div>
          ))}
        </div>
      )}

      {/* Tab: Tickets */}
      {activeTab === 'tickets' && (
        <div className="space-y-4 text-xs">
          <div className="flex justify-between items-center pb-2">
            <span className="text-slate-400">Manage technical questions, SLA maintenance tickets, and camera adjustments.</span>
            <button
              type="button"
              onClick={() => setShowNewTicketModal(true)}
              className="px-3 py-1.5 rounded-lg bg-mts-teal hover:bg-mts-teal-light text-white font-bold flex items-center gap-1"
            >
              <PlusCircle className="w-3.5 h-3.5" />
              <span>Open New Ticket</span>
            </button>
          </div>

          <div className="divide-y divide-slate-800 bg-mts-navy/70 border border-slate-800 rounded-2xl overflow-hidden">
            {tickets.map((t) => (
              <div key={t.id} className="p-4 flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-mts-gold font-bold">{t.id}</span>
                    <span className="text-white font-semibold">{t.subject}</span>
                  </div>
                  <span className="text-slate-400 text-[11px] block mt-0.5">
                    Assigned: {t.technician} • Logged on {t.date}
                  </span>
                </div>
                <span className={`px-2.5 py-0.5 rounded-full font-bold uppercase text-[10px] ${
                  t.status === 'RESOLVED' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-amber-500/20 text-amber-400'
                }`}>
                  ● {t.status}
                </span>
              </div>
            ))}
          </div>

          {showNewTicketModal && (
            <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
              <div className="bg-mts-dark border border-slate-700 rounded-2xl p-6 max-w-md w-full space-y-4">
                <h3 className="text-base font-bold text-white">Create Technical Support Ticket</h3>
                <input
                  type="text"
                  placeholder="Describe issue (e.g., Camera 3 needs angle readjustment)"
                  value={newTicketSubject}
                  onChange={(e) => setNewTicketSubject(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 text-white text-xs"
                />
                <div className="flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setShowNewTicketModal(false)}
                    className="px-4 py-2 rounded-lg bg-slate-800 text-slate-300 text-xs"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={handleCreateTicket}
                    className="px-4 py-2 rounded-lg bg-mts-teal text-white text-xs font-bold"
                  >
                    Submit Ticket
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
