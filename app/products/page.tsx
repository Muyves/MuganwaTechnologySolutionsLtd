'use client';

import React, { useState, useMemo, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { 
  Filter, 
  Search, 
  SlidersHorizontal, 
  X, 
  Grid3X3, 
  List, 
  ShieldCheck, 
  RotateCcw,
  Sparkles 
} from 'lucide-react';
import { initialProducts } from '@/data/products';
import { Product, ProductCategory } from '@/lib/types';
import { useCurrency } from '@/context/CurrencyContext';
import ProductCard from '@/components/ProductCard';

function ProductsContent() {
  const { formatPrice } = useCurrency();
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get('category') || 'all';
  const initialSearch = searchParams.get('search') || '';

  // Filter States
  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);
  const [selectedBrand, setSelectedBrand] = useState<string>('all');
  const [selectedResolution, setSelectedResolution] = useState<string>('all');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [maxPrice, setMaxPrice] = useState<number>(3500);
  const [inStockOnly, setInStockOnly] = useState<boolean>(false);
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'rating'>('featured');
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // Categories list
  const categoryOptions: { id: string; label: string }[] = [
    { id: 'all', label: 'All Security & Tech Equipment' },
    { id: 'cameras', label: 'CCTV Cameras (IP / PTZ / 4K)' },
    { id: 'recorders', label: 'Recorders (NVR & XVR / DVR)' },
    { id: 'access_control', label: 'Biometric Access Control' },
    { id: 'alarms', label: 'Intruder Alarm Systems' },
    { id: 'networking', label: 'Networking, Firewalls & Satellite (Starlink, Sophos, Ruijie)' },
    { id: 'workstations', label: 'Monitoring Workstations & Laptops' },
    { id: 'accessories', label: 'Server Racks, Storage & Cables' },
  ];

  // Extract unique brands
  const brands = useMemo(() => {
    const list = Array.from(new Set(initialProducts.map((p) => p.brand)));
    return ['all', ...list];
  }, []);

  // Filter logic
  const filteredProducts = useMemo(() => {
    return initialProducts.filter((product) => {
      // Search
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = product.name.toLowerCase().includes(q);
        const matchesBrand = product.brand.toLowerCase().includes(q);
        const matchesModel = product.modelNumber.toLowerCase().includes(q);
        const matchesDesc = product.description.toLowerCase().includes(q);
        if (!matchesName && !matchesBrand && !matchesModel && !matchesDesc) return false;
      }

      // Category
      if (selectedCategory !== 'all' && product.category !== selectedCategory) {
        return false;
      }

      // Brand
      if (selectedBrand !== 'all' && product.brand !== selectedBrand) {
        return false;
      }

      // Resolution
      if (selectedResolution !== 'all') {
        if (!product.resolution || !product.resolution.includes(selectedResolution)) {
          return false;
        }
      }

      // Camera Type
      if (selectedType !== 'all') {
        if (!product.cameraType || product.cameraType !== selectedType) {
          return false;
        }
      }

      // Price
      if (product.price > maxPrice) {
        return false;
      }

      // Stock
      if (inStockOnly && !product.inStock) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      // Default: featured first
      return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
    });
  }, [
    searchQuery,
    selectedCategory,
    selectedBrand,
    selectedResolution,
    selectedType,
    maxPrice,
    inStockOnly,
    sortBy,
  ]);

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('all');
    setSelectedBrand('all');
    setSelectedResolution('all');
    setSelectedType('all');
    setMaxPrice(1500);
    setInStockOnly(false);
    setSortBy('featured');
  };

  const hasActiveFilters =
    searchQuery !== '' ||
    selectedCategory !== 'all' ||
    selectedBrand !== 'all' ||
    selectedResolution !== 'all' ||
    selectedType !== 'all' ||
    maxPrice < 1500 ||
    inStockOnly;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-mts-navy via-mts-dark to-mts-surface rounded-2xl p-6 sm:p-8 border border-mts-teal-light/40 shadow-xl mb-8">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-mts-teal-dark/50 text-mts-teal-glow text-xs font-semibold mb-2">
            <ShieldCheck className="w-3.5 h-3.5 text-mts-gold" />
            <span>MTS Authorized Security Catalog</span>
          </div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight">
            CCTV, Access Control & Surveillance Hardware
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 mt-2">
            Browse certified Hikvision, Dahua, ZKTeco, and Uniview equipment. Every unit comes with up to 3 years 
            warranty and optional professional on-site installation by Muganwa Technology Solutions Ltd.
          </p>
        </div>
      </div>

      {/* Control Bar: Search, Sort, View Toggle, Mobile Filter Button */}
      <div className="bg-mts-surface/70 border border-slate-800 rounded-xl p-4 mb-8 flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Search */}
        <div className="relative w-full md:w-96">
          <input
            type="text"
            placeholder="Search by name, model number, brand..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-900 border border-slate-700 rounded-lg py-2 pl-9 pr-8 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-mts-teal-light"
          />
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Right Controls */}
        <div className="flex items-center justify-between w-full md:w-auto gap-3">
          {/* Mobile Filter Toggle */}
          <button
            type="button"
            onClick={() => setIsMobileFilterOpen(!isMobileFilterOpen)}
            className="lg:hidden px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-xs text-white flex items-center gap-1.5"
          >
            <Filter className="w-3.5 h-3.5 text-mts-gold" />
            <span>Filters {hasActiveFilters && '(Active)'}</span>
          </button>

          {/* Sort Dropdown */}
          <div className="flex items-center gap-2 text-xs">
            <span className="text-slate-400 hidden sm:inline">Sort:</span>
            <select
              value={sortBy}
              onChange={(e: any) => setSortBy(e.target.value)}
              className="bg-slate-900 border border-slate-700 text-white rounded-lg py-2 px-3 text-xs focus:outline-none focus:border-mts-teal-light"
            >
              <option value="featured">Featured / Best Sellers</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating">Highest Customer Rating</option>
            </select>
          </div>

          {/* Grid / List View Toggle */}
          <div className="hidden sm:flex items-center border border-slate-700 rounded-lg bg-slate-900 p-0.5">
            <button
              type="button"
              onClick={() => setViewMode('grid')}
              className={`p-1.5 rounded ${viewMode === 'grid' ? 'bg-mts-teal text-white' : 'text-slate-400 hover:text-white'}`}
              title="Grid View"
            >
              <Grid3X3 className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => setViewMode('list')}
              className={`p-1.5 rounded ${viewMode === 'list' ? 'bg-mts-teal text-white' : 'text-slate-400 hover:text-white'}`}
              title="List View"
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Content Layout (Sidebar + Products Grid) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* DESKTOP FILTER SIDEBAR (3 cols) */}
        <aside className={`lg:col-span-3 space-y-6 ${isMobileFilterOpen ? 'block' : 'hidden lg:block'}`}>
          <div className="bg-mts-navy/80 border border-slate-800 rounded-2xl p-5 space-y-6 sticky top-28 backdrop-blur-md">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <SlidersHorizontal className="w-4 h-4 text-mts-gold" />
                <h3 className="text-xs font-bold text-white uppercase tracking-wider">Filter Equipment</h3>
              </div>
              {hasActiveFilters && (
                <button
                  type="button"
                  onClick={resetFilters}
                  className="text-[11px] text-red-400 hover:text-red-300 flex items-center gap-1"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Reset</span>
                </button>
              )}
            </div>

            {/* Category Filter */}
            <div>
              <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">Category</h4>
              <div className="space-y-1">
                {categoryOptions.map((cat) => (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`w-full text-left px-3 py-1.5 rounded-lg text-xs transition flex items-center justify-between ${
                      selectedCategory === cat.id
                        ? 'bg-mts-teal text-white font-bold shadow-glow-teal'
                        : 'text-slate-400 hover:bg-slate-900 hover:text-white'
                    }`}
                  >
                    <span>{cat.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Brand Filter */}
            <div className="pt-4 border-t border-slate-800">
              <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">Brand / Manufacturer</h4>
              <div className="grid grid-cols-2 gap-1.5">
                {brands.map((b) => (
                  <button
                    key={b}
                    type="button"
                    onClick={() => setSelectedBrand(b)}
                    className={`px-2.5 py-1.5 rounded-lg text-xs capitalize transition text-center truncate ${
                      selectedBrand === b
                        ? 'bg-mts-gold text-slate-950 font-black'
                        : 'bg-slate-900 border border-slate-800 text-slate-300 hover:text-white'
                    }`}
                  >
                    {b === 'all' ? 'All Brands' : b}
                  </button>
                ))}
              </div>
            </div>

            {/* Resolution Filter (for cameras) */}
            <div className="pt-4 border-t border-slate-800">
              <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">Resolution</h4>
              <div className="space-y-1 text-xs text-slate-300">
                {['all', '4K', '4MP', '1080p'].map((res) => (
                  <label key={res} className="flex items-center gap-2 cursor-pointer py-1">
                    <input
                      type="radio"
                      name="res"
                      checked={selectedResolution === res}
                      onChange={() => setSelectedResolution(res)}
                      className="text-mts-teal-light focus:ring-0 bg-slate-900 border-slate-700"
                    />
                    <span className="capitalize">{res === 'all' ? 'Any Resolution' : res}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Price Filter Slider */}
            <div className="pt-4 border-t border-slate-800">
              <div className="flex justify-between text-xs text-slate-300 mb-1">
                <span className="font-bold uppercase tracking-wider">Max Price</span>
                <span className="text-mts-teal-glow font-mono font-bold text-right">{formatPrice(maxPrice, true)}</span>
              </div>
              <input
                type="range"
                min="50"
                max="3500"
                step="50"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full accent-mts-teal-light cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-500 mt-1">
                <span>$50</span>
                <span>$3,500+</span>
              </div>
            </div>

            {/* In-Stock Toggle */}
            <div className="pt-4 border-t border-slate-800">
              <label className="flex items-center justify-between cursor-pointer text-xs text-slate-300">
                <span>Show In-Stock Only</span>
                <input
                  type="checkbox"
                  checked={inStockOnly}
                  onChange={(e) => setInStockOnly(e.target.checked)}
                  className="rounded text-mts-teal-light focus:ring-0 bg-slate-900 border-slate-700 w-4 h-4"
                />
              </label>
            </div>
          </div>
        </aside>

        {/* PRODUCTS RESULTS AREA (9 cols) */}
        <main className="lg:col-span-9">
          {/* Active Filter Badges */}
          {hasActiveFilters && (
            <div className="flex flex-wrap items-center gap-2 mb-6">
              <span className="text-xs text-slate-400">Active Filters:</span>
              {selectedCategory !== 'all' && (
                <span className="bg-mts-teal-dark/60 text-mts-teal-glow border border-mts-teal-light/40 px-2.5 py-1 rounded-full text-xs flex items-center gap-1">
                  <span>Category: {selectedCategory}</span>
                  <button type="button" onClick={() => setSelectedCategory('all')}><X className="w-3 h-3" /></button>
                </span>
              )}
              {selectedBrand !== 'all' && (
                <span className="bg-mts-surface text-slate-200 border border-slate-700 px-2.5 py-1 rounded-full text-xs flex items-center gap-1">
                  <span>Brand: {selectedBrand}</span>
                  <button type="button" onClick={() => setSelectedBrand('all')}><X className="w-3 h-3" /></button>
                </span>
              )}
              {selectedResolution !== 'all' && (
                <span className="bg-mts-surface text-slate-200 border border-slate-700 px-2.5 py-1 rounded-full text-xs flex items-center gap-1">
                  <span>Res: {selectedResolution}</span>
                  <button type="button" onClick={() => setSelectedResolution('all')}><X className="w-3 h-3" /></button>
                </span>
              )}
              {searchQuery && (
                <span className="bg-mts-surface text-slate-200 border border-slate-700 px-2.5 py-1 rounded-full text-xs flex items-center gap-1">
                  <span>"{searchQuery}"</span>
                  <button type="button" onClick={() => setSearchQuery('')}><X className="w-3 h-3" /></button>
                </span>
              )}
              <button
                type="button"
                onClick={resetFilters}
                className="text-xs text-mts-gold hover:underline font-semibold ml-2"
              >
                Clear All
              </button>
            </div>
          )}

          {/* Results Count */}
          <div className="flex items-center justify-between text-xs text-slate-400 mb-4 pb-2 border-b border-slate-800">
            <span>Showing <strong>{filteredProducts.length}</strong> matching systems</span>
            <span className="text-emerald-400 font-medium">● Same-day Kigali dispatch available</span>
          </div>

          {/* Empty State */}
          {filteredProducts.length === 0 ? (
            <div className="bg-mts-navy/40 border border-slate-800 rounded-2xl p-12 text-center space-y-4">
              <div className="p-4 rounded-full bg-slate-900 border border-slate-800 w-16 h-16 mx-auto flex items-center justify-center text-slate-600">
                <Search className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-bold text-white">No products match your specific criteria</h3>
              <p className="text-xs text-slate-400 max-w-sm mx-auto">
                Try widening your price range, clearing brand filters, or search for broader keywords like "CCTV" or "4K".
              </p>
              <button
                type="button"
                onClick={resetFilters}
                className="px-4 py-2 rounded-lg bg-mts-teal hover:bg-mts-teal-light text-white text-xs font-bold transition"
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            <div className={
              viewMode === 'grid'
                ? 'grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6'
                : 'space-y-4'
            }>
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

export default function ProductsPage() {
  return (
    <Suspense fallback={<div className="p-12 text-center text-slate-400">Loading Security Catalog...</div>}>
      <ProductsContent />
    </Suspense>
  );
}
