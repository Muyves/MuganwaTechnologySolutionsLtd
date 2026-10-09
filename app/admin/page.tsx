'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  ShieldCheck, 
  Package, 
  ShoppingCart, 
  Calendar, 
  FileText, 
  Lock, 
  UserCheck, 
  Plus, 
  Trash2, 
  Edit3, 
  Download, 
  Eye, 
  Search, 
  CheckCircle2, 
  AlertTriangle,
  RefreshCw,
  LogOut
} from 'lucide-react';
import { initialProducts } from '@/data/products';
import { initialOrders, initialBookings, initialQuotes, initialAuditLogs } from '@/data/sampleOrders';
import { Product, Order, InstallationBooking, QuoteRequest, SecurityAuditLog } from '@/lib/types';
import ImageUploader from '@/components/ImageUploader';

export default function AdminDashboardPage() {
  const [activeTab, setActiveTab] = useState<'overview' | 'products' | 'orders' | 'bookings' | 'quotes' | 'audit'>('overview');

  // Live state for administrative operations
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [orders, setOrders] = useState<Order[]>(initialOrders);
  const [bookings, setBookings] = useState<InstallationBooking[]>(initialBookings);
  const [quotes, setQuotes] = useState<QuoteRequest[]>(initialQuotes);
  const [auditLogs, setAuditLogs] = useState<SecurityAuditLog[]>(initialAuditLogs);

  // New Product Modal State
  const [showProductModal, setShowProductModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [productForm, setProductForm] = useState({
    name: '',
    brand: 'Hikvision',
    category: 'cameras' as any,
    subCategory: 'IP Cameras',
    modelNumber: '',
    price: 150,
    stockCount: 20,
    resolution: '4K UHD (8MP)',
    shortDescription: '',
    image: 'https://images.unsplash.com/photo-1557597774-9d273605dfa9?auto=format&fit=crop&w=800&q=80',
  });

  // Fetch live state from API on load
  useEffect(() => {
    fetch('/api/products')
      .then((res) => res.json())
      .then((data) => { if (data.products) setProducts(data.products); })
      .catch(() => {});

    fetch('/api/orders')
      .then((res) => res.json())
      .then((data) => { if (data.orders) setOrders(data.orders); })
      .catch(() => {});

    fetch('/api/bookings')
      .then((res) => res.json())
      .then((data) => { if (data.bookings) setBookings(data.bookings); })
      .catch(() => {});

    fetch('/api/quotes')
      .then((res) => res.json())
      .then((data) => { if (data.quotes) setQuotes(data.quotes); })
      .catch(() => {});

    fetch('/api/admin/logs')
      .then((res) => res.json())
      .then((data) => { if (data.logs) setAuditLogs(data.logs); })
      .catch(() => {});
  }, []);

  // Stats Calculations
  const totalRevenue = orders.reduce((sum, o) => sum + o.total, 0);
  const pendingOrders = orders.filter((o) => o.orderStatus === 'pending' || o.orderStatus === 'processing').length;
  const pendingBookings = bookings.filter((b) => b.status === 'pending').length;
  const lowStockCount = products.filter((p) => p.stockCount <= 15).length;
  const newQuotesCount = quotes.filter((q) => q.status === 'new').length;

  // Handlers
  const handleUpdateOrderStatus = async (orderId: string, newStatus: Order['orderStatus']) => {
    try {
      await fetch('/api/orders', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ orderId, status: newStatus }),
      });
      setOrders((prev) =>
        prev.map((o) => (o.id === orderId ? { ...o, orderStatus: newStatus } : o))
      );
      addAuditLog('ORDER_STATUS_UPDATE', `Order ${orderId} updated to ${newStatus}`);
    } catch (e) {
      alert('Failed to update order');
    }
  };

  const handleUpdateBookingStatus = async (bookingId: string, status: any, technician?: string) => {
    try {
      await fetch('/api/bookings', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ bookingId, status, assignedTechnician: technician }),
      });
      setBookings((prev) =>
        prev.map((b) => (b.id === bookingId ? { ...b, status, assignedTechnician: technician || b.assignedTechnician } : b))
      );
      addAuditLog('BOOKING_UPDATE', `Installation ${bookingId} updated to ${status}`);
    } catch (e) {
      alert('Failed to update booking');
    }
  };

  const handleUpdateQuoteStatus = async (quoteId: string, status: any) => {
    try {
      await fetch('/api/quotes', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ quoteId, status }),
      });
      setQuotes((prev) =>
        prev.map((q) => (q.id === quoteId ? { ...q, status } : q))
      );
      addAuditLog('QUOTE_UPDATE', `Quote ${quoteId} status set to ${status}`);
    } catch (e) {
      alert('Failed to update quote');
    }
  };

  const handleDeleteProduct = async (id: string) => {
    if (!confirm('Are you sure you want to delete this hardware SKU?')) return;
    try {
      await fetch(`/api/products?id=${id}`, { method: 'DELETE' });
      setProducts((prev) => prev.filter((p) => p.id !== id));
      addAuditLog('PRODUCT_DELETE', `Deleted product ${id}`);
    } catch (e) {
      alert('Failed to delete product');
    }
  };

  const handleSaveProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    const newProd: Product = {
      id: editingProduct ? editingProduct.id : `mts-gen-${Math.floor(100 + Math.random() * 900)}`,
      name: productForm.name,
      slug: productForm.name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      brand: productForm.brand,
      category: productForm.category,
      subCategory: productForm.subCategory,
      modelNumber: productForm.modelNumber,
      price: Number(productForm.price),
      stockCount: Number(productForm.stockCount),
      inStock: Number(productForm.stockCount) > 0,
      rating: 5.0,
      reviewCount: 1,
      resolution: productForm.resolution,
      shortDescription: productForm.shortDescription,
      description: productForm.shortDescription,
      features: ['Official MTS Engineering Warranty', 'Plug & Play compatible'],
      specs: [{ label: 'Resolution', value: productForm.resolution }],
      images: [productForm.image],
      warrantyYears: 3,
    };

    try {
      await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newProd),
      });

      if (editingProduct) {
        setProducts((prev) => prev.map((p) => (p.id === newProd.id ? newProd : p)));
      } else {
        setProducts((prev) => [newProd, ...prev]);
      }

      setShowProductModal(false);
      setEditingProduct(null);
      addAuditLog('PRODUCT_SAVE', `Product ${newProd.name} saved`);
    } catch (e) {
      alert('Failed to save product');
    }
  };

  const addAuditLog = (action: string, details: string) => {
    const logItem: SecurityAuditLog = {
      id: `LOG-${Math.floor(1000 + Math.random() * 9000)}`,
      timestamp: new Date().toISOString(),
      actor: 'MUKIZA Richard (Admin)',
      action,
      details,
      ipAddress: '197.243.12.88',
      status: 'SUCCESS',
    };
    setAuditLogs((prev) => [logItem, ...prev]);
  };

  const handleExportBackup = () => {
    const backupData = {
      timestamp: new Date().toISOString(),
      exportBy: 'MUKIZA Richard',
      products,
      orders,
      bookings,
      quotes,
      auditLogs,
    };
    const blob = new Blob([JSON.stringify(backupData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `MTS-Database-Backup-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    addAuditLog('DATABASE_BACKUP', 'Full database snapshot downloaded');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Top Admin Identity & Executive Welcome */}
      <div className="bg-gradient-to-r from-mts-navy via-mts-dark to-mts-surface border border-mts-teal-light/40 rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-2xl">
        <div className="flex items-center gap-4">
          <div className="relative w-16 h-16 rounded-2xl overflow-hidden border-2 border-mts-gold shadow-glow-gold bg-slate-950 p-1 shrink-0">
            <Image src="/images/logo.png" alt="MTS Logo" fill sizes="64px" className="object-contain" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xl sm:text-2xl font-black text-white">MUKIZA Richard</span>
              <span className="bg-mts-burgundy text-white text-[10px] font-black uppercase px-2 py-0.5 rounded border border-mts-gold/30">
                Super Admin
              </span>
            </div>
            <p className="text-xs text-mts-gold font-medium mt-0.5">
              Managing Director & Lead Security Systems Engineer • Muganwa Technology Solutions Ltd
            </p>
            <p className="text-[11px] text-slate-400">Security Node: Kigali HQ (IP 197.243.12.88) • 2FA Enforced</p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={handleExportBackup}
            className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-xs font-bold text-white flex items-center gap-1.5 transition shadow-sm"
            title="Download JSON database snapshot"
          >
            <Download className="w-4 h-4 text-mts-teal-glow" />
            <span>Export DB Backup</span>
          </button>
          <Link
            href="/"
            className="px-4 py-2 rounded-xl bg-mts-teal hover:bg-mts-teal-light text-xs font-bold text-white flex items-center gap-1.5 transition shadow-glow-teal"
          >
            <Eye className="w-4 h-4" />
            <span>Storefront View</span>
          </Link>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex flex-wrap border-b border-slate-800 gap-2 sm:gap-6 text-xs sm:text-sm font-bold">
        {[
          { id: 'overview', label: 'Executive Metrics', icon: ShieldCheck },
          { id: 'products', label: `Inventory (${products.length})`, icon: Package },
          { id: 'orders', label: `Orders (${orders.length})`, icon: ShoppingCart },
          { id: 'bookings', label: `Installations (${bookings.length})`, icon: Calendar },
          { id: 'quotes', label: `Quotes (${quotes.length})`, icon: FileText },
          { id: 'audit', label: `Security Logs (${auditLogs.length})`, icon: Lock },
        ].map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id as any)}
              className={`pb-3 px-2 border-b-2 flex items-center gap-1.5 transition ${
                activeTab === tab.id
                  ? 'border-mts-teal-light text-white'
                  : 'border-transparent text-slate-400 hover:text-white'
              }`}
            >
              <Icon className="w-4 h-4 text-mts-gold" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* 1. OVERVIEW TAB */}
      {activeTab === 'overview' && (
        <div className="space-y-8 animate-fadeIn">
          {/* Metrics cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            <div className="bg-mts-navy/80 border border-slate-800 rounded-2xl p-5 shadow-md">
              <span className="text-slate-400 text-xs font-bold uppercase tracking-wider block">Total Sales Revenue</span>
              <div className="text-2xl sm:text-3xl font-black text-white mt-1">
                ${totalRevenue.toFixed(2)} <span className="text-xs font-semibold text-mts-teal-glow block font-mono">({Math.round(totalRevenue * 1350).toLocaleString()} Rwf)</span>
              </div>
              <span className="text-[11px] text-emerald-400 font-semibold block mt-1">● From {orders.length} completed transactions</span>
            </div>

            <div className="bg-mts-navy/80 border border-slate-800 rounded-2xl p-5 shadow-md">
              <span className="text-slate-400 text-xs font-bold uppercase tracking-wider block">Pending Installations</span>
              <div className="text-2xl sm:text-3xl font-black text-mts-gold mt-1">{pendingBookings} Sites</div>
              <span className="text-[11px] text-slate-300 block mt-1">Lead Tech: Fabrice Gakwaya</span>
            </div>

            <div className="bg-mts-navy/80 border border-slate-800 rounded-2xl p-5 shadow-md">
              <span className="text-slate-400 text-xs font-bold uppercase tracking-wider block">Unreviewed Quotes</span>
              <div className="text-2xl sm:text-3xl font-black text-mts-teal-glow mt-1">{newQuotesCount} Requests</div>
              <span className="text-[11px] text-slate-300 block mt-1">Blueprints & site photos ready</span>
            </div>

            <div className="bg-mts-navy/80 border border-slate-800 rounded-2xl p-5 shadow-md">
              <span className="text-slate-400 text-xs font-bold uppercase tracking-wider block">Inventory Health</span>
              <div className="text-2xl sm:text-3xl font-black text-white mt-1">{lowStockCount} Items Low</div>
              <span className="text-[11px] text-amber-400 block mt-1">Reorder WD Purple drives</span>
            </div>
          </div>

          {/* Recent Operations Summary */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Recent Orders */}
            <div className="bg-mts-navy/70 border border-slate-800 rounded-2xl p-6 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <h3 className="text-sm font-bold text-white">Recent Hardware Orders</h3>
                <button type="button" onClick={() => setActiveTab('orders')} className="text-xs text-mts-teal-glow hover:underline">
                  View All
                </button>
              </div>
              <div className="divide-y divide-slate-800 text-xs">
                {orders.slice(0, 3).map((o) => (
                  <div key={o.id} className="py-2.5 flex items-center justify-between">
                    <div>
                      <span className="font-mono text-mts-gold font-bold block">{o.id}</span>
                      <span className="text-white font-medium">{o.customerName}</span>
                    </div>
                    <div className="text-right">
                      <span className="font-bold text-white block">${o.total.toFixed(2)}</span>
                      <span className="text-[10px] text-slate-400 block font-mono">({Math.round(o.total * 1350).toLocaleString()} Rwf)</span>
                      <span className="text-[10px] text-emerald-400 uppercase font-semibold">● {o.orderStatus}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Upcoming Site Visits */}
            <div className="bg-mts-navy/70 border border-slate-800 rounded-2xl p-6 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <h3 className="text-sm font-bold text-white">Technician Dispatch Schedule</h3>
                <button type="button" onClick={() => setActiveTab('bookings')} className="text-xs text-mts-teal-glow hover:underline">
                  View All
                </button>
              </div>
              <div className="divide-y divide-slate-800 text-xs">
                {bookings.slice(0, 3).map((b) => (
                  <div key={b.id} className="py-2.5 flex items-center justify-between">
                    <div>
                      <span className="text-white font-bold block">{b.customerName}</span>
                      <span className="text-slate-400 text-[11px]">{b.propertyType} • {b.address}</span>
                    </div>
                    <div className="text-right">
                      <span className="text-mts-gold font-semibold block">{b.requestedDate}</span>
                      <span className="text-[10px] text-slate-300 block">{b.requestedTimeSlot}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 2. PRODUCTS MANAGEMENT TAB */}
      {activeTab === 'products' && (
        <div className="space-y-6 animate-fadeIn">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-lg font-bold text-white">Hardware Inventory & Sizing Catalog</h2>
              <p className="text-xs text-slate-400">Add, edit pricing, update stock counts, or remove product lines.</p>
            </div>
            <button
              type="button"
              onClick={() => {
                setEditingProduct(null);
                setProductForm({
                  name: '',
                  brand: 'Hikvision',
                  category: 'cameras',
                  subCategory: 'IP Cameras',
                  modelNumber: '',
                  price: 180,
                  stockCount: 25,
                  resolution: '4K UHD (8MP)',
                  shortDescription: '',
                  image: 'https://images.unsplash.com/photo-1557597774-9d273605dfa9?auto=format&fit=crop&w=800&q=80',
                });
                setShowProductModal(true);
              }}
              className="px-4 py-2.5 rounded-xl bg-mts-teal hover:bg-mts-teal-light text-white text-xs font-bold flex items-center gap-1.5 shadow-glow-teal transition"
            >
              <Plus className="w-4 h-4" />
              <span>Add New Product</span>
            </button>
          </div>

          {/* Table */}
          <div className="bg-mts-navy/80 border border-slate-800 rounded-2xl overflow-x-auto shadow-xl">
            <table className="w-full text-xs text-left border-collapse">
              <thead>
                <tr className="bg-slate-900 text-slate-400 uppercase text-[10px] border-b border-slate-800">
                  <th className="p-3.5">Product / Model</th>
                  <th className="p-3.5">Category</th>
                  <th className="p-3.5">Brand</th>
                  <th className="p-3.5">Price</th>
                  <th className="p-3.5">Stock Level</th>
                  <th className="p-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {products.map((p) => (
                  <tr key={p.id} className="hover:bg-mts-surface/50 transition">
                    <td className="p-3.5 flex items-center gap-3">
                      <div className="relative w-10 h-10 rounded-lg overflow-hidden bg-slate-950 border border-slate-800 shrink-0">
                        <Image src={p.images[0]} alt="" fill sizes="40px" className="object-cover" />
                      </div>
                      <div>
                        <span className="font-bold text-white block">{p.name}</span>
                        <span className="text-[11px] font-mono text-slate-400">{p.modelNumber}</span>
                      </div>
                    </td>
                    <td className="p-3.5 capitalize text-slate-300">{p.category.replace('_', ' ')}</td>
                    <td className="p-3.5 font-bold text-white">
                      <span>${p.price.toFixed(2)}</span>
                      <span className="text-[10px] text-slate-400 block font-normal font-mono">({Math.round(p.price * 1350).toLocaleString()} Rwf)</span>
                    </td>
                    <td className="p-3.5">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                        p.stockCount <= 15 ? 'bg-amber-500/20 text-amber-400' : 'bg-emerald-500/20 text-emerald-400'
                      }`}>
                        {p.stockCount} units
                      </span>
                    </td>
                    <td className="p-3.5 text-right space-x-2">
                      <button
                        type="button"
                        onClick={() => {
                          setEditingProduct(p);
                          setProductForm({
                            name: p.name,
                            brand: p.brand,
                            category: p.category,
                            subCategory: p.subCategory,
                            modelNumber: p.modelNumber,
                            price: p.price,
                            stockCount: p.stockCount,
                            resolution: p.resolution || '',
                            shortDescription: p.shortDescription,
                            image: p.images[0],
                          });
                          setShowProductModal(true);
                        }}
                        className="p-1.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white"
                        title="Edit Product"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDeleteProduct(p.id)}
                        className="p-1.5 rounded bg-slate-800 hover:bg-red-950 text-slate-400 hover:text-red-400"
                        title="Delete Product"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* 3. ORDERS MANAGEMENT TAB */}
      {activeTab === 'orders' && (
        <div className="space-y-6 animate-fadeIn">
          <div>
            <h2 className="text-lg font-bold text-white">Client Orders & Manifests</h2>
            <p className="text-xs text-slate-400">Review payment receipts and change dispatch states.</p>
          </div>

          <div className="bg-mts-navy/80 border border-slate-800 rounded-2xl overflow-x-auto shadow-xl">
            <table className="w-full text-xs text-left border-collapse">
              <thead>
                <tr className="bg-slate-900 text-slate-400 uppercase text-[10px] border-b border-slate-800">
                  <th className="p-3.5">Order ID</th>
                  <th className="p-3.5">Customer & Phone</th>
                  <th className="p-3.5">Total & Payment</th>
                  <th className="p-3.5">Destination</th>
                  <th className="p-3.5">Status</th>
                  <th className="p-3.5 text-right">Update Lifecycle</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {orders.map((o) => (
                  <tr key={o.id} className="hover:bg-mts-surface/50 transition">
                    <td className="p-3.5 font-mono text-mts-gold font-bold">{o.id}</td>
                    <td className="p-3.5">
                      <span className="font-bold text-white block">{o.customerName}</span>
                      <span className="text-slate-400 text-[11px]">{o.customerPhone}</span>
                    </td>
                    <td className="p-3.5">
                      <span className="font-bold text-white block">${o.total.toFixed(2)}</span>
                      <span className="text-[10px] text-slate-400 uppercase">{o.paymentMethod} • {o.paymentStatus}</span>
                    </td>
                    <td className="p-3.5 text-slate-300">
                      <span>{o.shippingAddress.street}, {o.shippingAddress.city}</span>
                    </td>
                    <td className="p-3.5">
                      <span className="bg-mts-teal-dark text-mts-teal-glow px-2.5 py-0.5 rounded-full font-bold uppercase text-[10px]">
                        ● {o.orderStatus}
                      </span>
                    </td>
                    <td className="p-3.5 text-right">
                      <select
                        value={o.orderStatus}
                        onChange={(e) => handleUpdateOrderStatus(o.id, e.target.value as any)}
                        className="bg-slate-900 border border-slate-700 text-white rounded-lg p-1.5 text-xs focus:outline-none focus:border-mts-teal-light"
                      >
                        <option value="pending">Pending</option>
                        <option value="processing">Processing</option>
                        <option value="dispatched">Dispatched</option>
                        <option value="installed">Installed</option>
                        <option value="completed">Completed</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* 4. INSTALLATION BOOKINGS TAB */}
      {activeTab === 'bookings' && (
        <div className="space-y-6 animate-fadeIn">
          <div>
            <h2 className="text-lg font-bold text-white">Technician Field Deployments & Surveys</h2>
            <p className="text-xs text-slate-400">Assign lead engineers and confirm scheduled appointments.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {bookings.map((b) => (
              <div key={b.id} className="bg-mts-navy/80 border border-slate-800 rounded-2xl p-6 space-y-4 shadow-xl">
                <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                  <span className="font-mono text-mts-gold font-bold text-xs">{b.id}</span>
                  <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                    b.status === 'confirmed' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-amber-500/20 text-amber-400'
                  }`}>
                    ● {b.status}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase">Client Name</span>
                    <span className="text-white font-bold">{b.customerName}</span>
                    <span className="text-slate-400 text-[11px] block">{b.phone}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase">Date & Window</span>
                    <span className="text-white font-bold">{b.requestedDate}</span>
                    <span className="text-mts-gold text-[11px] block capitalize">{b.requestedTimeSlot} slot</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase">Property Type</span>
                    <span className="text-white capitalize">{b.propertyType}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase">Cameras</span>
                    <span className="text-white">{b.numberOfCameras} Cameras</span>
                  </div>
                </div>

                <div className="pt-2 text-xs">
                  <span className="text-slate-400 block text-[10px] uppercase mb-1">Assigned Lead Technician:</span>
                  <select
                    value={b.assignedTechnician || 'MUKIZA Richard'}
                    onChange={(e) => handleUpdateBookingStatus(b.id, b.status, e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-white"
                  >
                    <option value="Fabrice Gakwaya (Lead Field Tech)">Fabrice Gakwaya (Lead Field Tech)</option>
                    <option value="Eric Nshimiyimana (Senior Cabling Tech)">Eric Nshimiyimana (Senior Cabling Tech)</option>
                    <option value="MUKIZA Richard (Managing Director & Systems Architect)">MUKIZA Richard (Managing Director)</option>
                  </select>
                </div>

                <div className="pt-2 flex gap-2">
                  <button
                    type="button"
                    onClick={() => handleUpdateBookingStatus(b.id, 'confirmed')}
                    className="flex-1 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs transition"
                  >
                    Approve / Confirm
                  </button>
                  <button
                    type="button"
                    onClick={() => handleUpdateBookingStatus(b.id, 'completed')}
                    className="flex-1 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs transition"
                  >
                    Mark Finished
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 5. QUOTES TAB */}
      {activeTab === 'quotes' && (
        <div className="space-y-6 animate-fadeIn">
          <div>
            <h2 className="text-lg font-bold text-white">Custom Blueprints & Quotations</h2>
            <p className="text-xs text-slate-400">Review client photos, room counts, and deliver official estimates.</p>
          </div>

          <div className="space-y-4 text-xs">
            {quotes.map((q) => (
              <div key={q.id} className="bg-mts-navy/80 border border-slate-800 rounded-2xl p-6 space-y-4 shadow-xl">
                <div className="flex flex-wrap items-center justify-between gap-4 pb-3 border-b border-slate-800">
                  <div>
                    <span className="font-mono text-mts-gold font-bold text-xs">{q.id}</span>
                    <h3 className="text-base font-bold text-white mt-0.5">{q.fullName} {q.companyName && `(${q.companyName})`}</h3>
                    <p className="text-slate-400 text-[11px]">{q.email} • {q.phone}</p>
                  </div>
                  <div className="text-right">
                    <span className="text-slate-400 block text-[10px] uppercase">Budget:</span>
                    <span className="text-white font-bold">{q.estimatedBudget || 'Not specified'}</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-slate-300">
                  <div className="p-3 rounded-lg bg-slate-900 border border-slate-800">
                    <span className="text-slate-500 uppercase text-[10px] block font-bold">Property & Location</span>
                    <span className="text-white font-semibold">{q.propertyType}</span>
                    <span className="text-slate-400 block mt-0.5">{q.propertyAddress}</span>
                  </div>
                  <div className="p-3 rounded-lg bg-slate-900 border border-slate-800">
                    <span className="text-slate-500 uppercase text-[10px] block font-bold">Camera Scope</span>
                    <span className="text-white font-semibold">{q.cameraCount} Total Cameras</span>
                    <span className="text-slate-400 block mt-0.5">{q.indoorOutdoorSplit}</span>
                  </div>
                  <div className="p-3 rounded-lg bg-slate-900 border border-slate-800">
                    <span className="text-slate-500 uppercase text-[10px] block font-bold">Additional Peripherals</span>
                    <span className="text-mts-teal-glow block font-semibold">
                      {q.requiresAccessControl ? '✓ Biometric Access' : '—'}
                    </span>
                    <span className="text-mts-gold block font-semibold">
                      {q.requiresAlarmIntercom ? '✓ Intruder Alarm / Intercom' : '—'}
                    </span>
                  </div>
                </div>

                <div className="p-3 rounded-lg bg-slate-900 border border-slate-800">
                  <span className="text-slate-500 uppercase text-[10px] block font-bold mb-1">Project Details:</span>
                  <p className="text-slate-300 italic">{q.projectDetails}</p>
                </div>

                {q.sitePhotoNames && q.sitePhotoNames.length > 0 && (
                  <div className="flex items-center gap-2">
                    <span className="text-slate-400 font-semibold text-[11px]">Site Blueprint Files:</span>
                    {q.sitePhotoNames.map((name, i) => (
                      <span key={i} className="bg-mts-surface border border-slate-700 text-white px-2 py-0.5 rounded text-[11px]">
                        📁 {name}
                      </span>
                    ))}
                  </div>
                )}

                <div className="pt-2 flex items-center justify-between">
                  <span className="text-slate-400">Current Status: <strong className="text-white uppercase">{q.status}</strong></span>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => handleUpdateQuoteStatus(q.id, 'quote_sent')}
                      className="px-4 py-2 rounded-lg bg-mts-teal hover:bg-mts-teal-light text-white font-bold"
                    >
                      Send Official Estimate
                    </button>
                    <button
                      type="button"
                      onClick={() => handleUpdateQuoteStatus(q.id, 'approved')}
                      className="px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold"
                    >
                      Mark Approved
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 6. SECURITY AUDIT LOGS TAB */}
      {activeTab === 'audit' && (
        <div className="space-y-6 animate-fadeIn">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-white">Cryptographic Security Audit Log</h2>
              <p className="text-xs text-slate-400">Immutable record of administrative logins, inventory changes, and network firewall events.</p>
            </div>
            <span className="bg-emerald-500/20 text-emerald-400 px-3 py-1 rounded-full text-xs font-bold uppercase border border-emerald-500/30">
              ● Firewall Active
            </span>
          </div>

          <div className="bg-mts-navy/80 border border-slate-800 rounded-2xl overflow-x-auto shadow-xl">
            <table className="w-full text-xs text-left border-collapse">
              <thead>
                <tr className="bg-slate-900 text-slate-400 uppercase text-[10px] border-b border-slate-800">
                  <th className="p-3.5">Timestamp</th>
                  <th className="p-3.5">Actor</th>
                  <th className="p-3.5">Action Code</th>
                  <th className="p-3.5">Telemetry & Details</th>
                  <th className="p-3.5">IP Address</th>
                  <th className="p-3.5 text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 font-mono text-[11px]">
                {auditLogs.map((log) => (
                  <tr key={log.id} className="hover:bg-mts-surface/50 transition">
                    <td className="p-3.5 text-slate-400">{new Date(log.timestamp).toLocaleTimeString()}</td>
                    <td className="p-3.5 text-white font-sans font-semibold">{log.actor}</td>
                    <td className="p-3.5 text-mts-gold">{log.action}</td>
                    <td className="p-3.5 text-slate-300 font-sans">{log.details}</td>
                    <td className="p-3.5 text-slate-400">{log.ipAddress}</td>
                    <td className="p-3.5 text-right">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        log.status === 'ALERT' ? 'bg-red-500/20 text-red-400' : 'bg-emerald-500/20 text-emerald-400'
                      }`}>
                        {log.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Add / Edit Product Modal */}
      {showProductModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
          <div className="bg-mts-dark border border-slate-700 rounded-2xl max-w-xl w-full p-6 space-y-4 shadow-2xl max-h-[90vh] overflow-y-auto text-xs">
            <h3 className="text-base font-bold text-white pb-2 border-b border-slate-800">
              {editingProduct ? 'Edit Security Hardware' : 'Add New Hardware SKU'}
            </h3>

            <form onSubmit={handleSaveProduct} className="space-y-4">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Product Name *</label>
                <input
                  type="text"
                  required
                  value={productForm.name}
                  onChange={(e) => setProductForm({ ...productForm, name: e.target.value })}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Category *</label>
                  <select
                    value={productForm.category}
                    onChange={(e) => setProductForm({ ...productForm, category: e.target.value as any })}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-white"
                  >
                    <option value="cameras">CCTV Cameras (IP, PTZ, Dome, Bullet)</option>
                    <option value="recorders">Recorders (NVR & XVR / DVR)</option>
                    <option value="networking">Networking, Firewalls & Satellite</option>
                    <option value="access_control">Biometric Access Control</option>
                    <option value="alarms">Intruder & Fire Alarms</option>
                    <option value="workstations">Monitoring Workstations & Laptops</option>
                    <option value="accessories">Server Racks & Storage Accessories</option>
                  </select>
                </div>
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Sub-Category</label>
                  <input
                    type="text"
                    placeholder="e.g. Enterprise Firewalls / Wi-Fi 6"
                    value={productForm.subCategory}
                    onChange={(e) => setProductForm({ ...productForm, subCategory: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Brand *</label>
                  <select
                    value={productForm.brand}
                    onChange={(e) => setProductForm({ ...productForm, brand: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-white"
                  >
                    <option value="Hikvision">Hikvision</option>
                    <option value="Sophos">Sophos</option>
                    <option value="Starlink">Starlink (SpaceX)</option>
                    <option value="Ruijie">Ruijie / Reyee</option>
                    <option value="Grandstream">Grandstream</option>
                    <option value="HP">HP / HPE</option>
                    <option value="Cisco">Cisco</option>
                    <option value="Huawei">Huawei</option>
                    <option value="Dahua">Dahua</option>
                    <option value="ZKTeco">ZKTeco</option>
                    <option value="Uniview">Uniview</option>
                    <option value="Western Digital">Western Digital</option>
                    <option value="Asenware">Asenware</option>
                    <option value="Kstar">Kstar</option>
                    <option value="Dell">Dell Technologies</option>
                    <option value="Lenovo">Lenovo</option>
                    <option value="Bosch">Bosch</option>
                    <option value="Ajax">Ajax</option>
                    <option value="Other">Other Partner</option>
                  </select>
                </div>
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Model / SKU *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. XGS 116 / Starlink Gen 2"
                    value={productForm.modelNumber}
                    onChange={(e) => setProductForm({ ...productForm, modelNumber: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Price ($)</label>
                  <input
                    type="number"
                    min="1"
                    required
                    value={productForm.price}
                    onChange={(e) => setProductForm({ ...productForm, price: Number(e.target.value) })}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-white"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Stock Quantity</label>
                  <input
                    type="number"
                    min="0"
                    required
                    value={productForm.stockCount}
                    onChange={(e) => setProductForm({ ...productForm, stockCount: Number(e.target.value) })}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-white"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Resolution</label>
                  <input
                    type="text"
                    placeholder="4K UHD (8MP)"
                    value={productForm.resolution}
                    onChange={(e) => setProductForm({ ...productForm, resolution: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-white"
                  />
                </div>
              </div>

              <ImageUploader
                value={productForm.image}
                onChange={(newUrl) => setProductForm({ ...productForm, image: newUrl })}
                label="Product / Hardware Photo"
                helperText="Upload camera, NVR, server rack, or device photo from your phone or PC (JPEG, PNG, WEBP)"
              />

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Short Description</label>
                <textarea
                  rows={3}
                  value={productForm.shortDescription}
                  onChange={(e) => setProductForm({ ...productForm, shortDescription: e.target.value })}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-white"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowProductModal(false)}
                  className="px-4 py-2 rounded-lg bg-slate-800 text-slate-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-lg bg-mts-teal hover:bg-mts-teal-light text-white font-bold"
                >
                  Save Hardware Item
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
