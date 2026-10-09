import fs from 'fs';
import path from 'path';
import { initialProducts } from '@/data/products';
import { initialOrders, initialBookings, initialQuotes, initialAuditLogs } from '@/data/sampleOrders';
import { Product, Order, InstallationBooking, QuoteRequest, SecurityAuditLog } from './types';

// In-memory cache + file-persisted data store for instant launch
interface DatabaseSchema {
  products: Product[];
  orders: Order[];
  bookings: InstallationBooking[];
  quotes: QuoteRequest[];
  auditLogs: SecurityAuditLog[];
}

const DATA_DIR = path.join(process.cwd(), '.data');
const DB_FILE = path.join(DATA_DIR, 'db.json');

function ensureDataDirectory() {
  if (!fs.existsSync(DATA_DIR)) {
    try {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    } catch (e) {
      // Ignore if cannot create
    }
  }
}

let inMemoryStore: DatabaseSchema = {
  products: [...initialProducts],
  orders: [...initialOrders],
  bookings: [...initialBookings],
  quotes: [...initialQuotes],
  auditLogs: [...initialAuditLogs],
};

function loadDatabase(): DatabaseSchema {
  try {
    ensureDataDirectory();
    if (fs.existsSync(DB_FILE)) {
      const data = fs.readFileSync(DB_FILE, 'utf-8');
      const parsed = JSON.parse(data);

      const existingProducts: Product[] = parsed.products || [];
      const productMap = new Map<string, Product>();

      // Index initial products first
      for (const p of initialProducts) {
        productMap.set(p.id, p);
      }

      // Preserve any custom admin-added products or overrides
      for (const p of existingProducts) {
        if (!productMap.has(p.id)) {
          productMap.set(p.id, p);
        }
      }

      const mergedProducts = Array.from(productMap.values());

      inMemoryStore = {
        products: mergedProducts,
        orders: parsed.orders || initialOrders,
        bookings: parsed.bookings || initialBookings,
        quotes: parsed.quotes || initialQuotes,
        auditLogs: parsed.auditLogs || initialAuditLogs,
      };

      if (mergedProducts.length !== existingProducts.length) {
        saveDatabase();
      }
    } else {
      saveDatabase();
    }
  } catch (err) {
    console.error("Database load error, using in-memory store:", err);
  }
  return inMemoryStore;
}

function saveDatabase() {
  try {
    ensureDataDirectory();
    fs.writeFileSync(DB_FILE, JSON.stringify(inMemoryStore, null, 2), 'utf-8');
  } catch (err) {
    console.error("Database save error:", err);
  }
}

// Initial load
loadDatabase();

export const db = {
  // Products
  getProducts(): Product[] {
    return loadDatabase().products;
  },
  getProductById(id: string): Product | undefined {
    return this.getProducts().find((p) => p.id === id || p.slug === id);
  },
  saveProduct(product: Product): Product {
    const store = loadDatabase();
    const index = store.products.findIndex((p) => p.id === product.id);
    if (index >= 0) {
      store.products[index] = product;
    } else {
      store.products.unshift(product);
    }
    saveDatabase();
    this.addAuditLog('MUKIZA Richard (Admin)', 'PRODUCT_SAVED', `Product ${product.name} (SKU: ${product.modelNumber}) saved`, 'SUCCESS');
    return product;
  },
  deleteProduct(id: string): boolean {
    const store = loadDatabase();
    const lenBefore = store.products.length;
    store.products = store.products.filter((p) => p.id !== id);
    saveDatabase();
    const deleted = store.products.length < lenBefore;
    if (deleted) {
      this.addAuditLog('MUKIZA Richard (Admin)', 'PRODUCT_DELETED', `Product ID ${id} deleted`, 'WARNING');
    }
    return deleted;
  },

  // Orders
  getOrders(): Order[] {
    return loadDatabase().orders;
  },
  getOrderById(id: string): Order | undefined {
    return this.getOrders().find((o) => o.id.toLowerCase() === id.toLowerCase());
  },
  createOrder(orderData: Omit<Order, 'id' | 'createdAt'>): Order {
    const store = loadDatabase();
    const newOrder: Order = {
      ...orderData,
      id: `MTS-2026-${Math.floor(1000 + Math.random() * 9000)}`,
      createdAt: new Date().toISOString(),
    };
    store.orders.unshift(newOrder);
    saveDatabase();
    this.addAuditLog('SYSTEM_CHECKOUT', 'ORDER_CREATED', `Order ${newOrder.id} placed by ${newOrder.customerName} ($${newOrder.total})`, 'SUCCESS');
    return newOrder;
  },
  updateOrderStatus(orderId: string, status: Order['orderStatus']): Order | undefined {
    const store = loadDatabase();
    const order = store.orders.find((o) => o.id === orderId);
    if (order) {
      order.orderStatus = status;
      saveDatabase();
      this.addAuditLog('MUKIZA Richard (Admin)', 'ORDER_STATUS_UPDATE', `Order ${orderId} updated to ${status}`, 'SUCCESS');
    }
    return order;
  },

  // Bookings
  getBookings(): InstallationBooking[] {
    return loadDatabase().bookings;
  },
  createBooking(bookingData: Omit<InstallationBooking, 'id' | 'createdAt' | 'status'>): InstallationBooking {
    const store = loadDatabase();
    const newBooking: InstallationBooking = {
      ...bookingData,
      id: `BKG-2026-${Math.floor(100 + Math.random() * 900)}`,
      status: 'pending',
      createdAt: new Date().toISOString(),
    };
    store.bookings.unshift(newBooking);
    saveDatabase();
    this.addAuditLog('CLIENT_WEB_PORTAL', 'BOOKING_REQUESTED', `Installation requested by ${newBooking.customerName} for ${newBooking.requestedDate}`, 'SUCCESS');
    return newBooking;
  },
  updateBooking(id: string, updates: Partial<InstallationBooking>): InstallationBooking | undefined {
    const store = loadDatabase();
    const bkg = store.bookings.find((b) => b.id === id);
    if (bkg) {
      Object.assign(bkg, updates);
      saveDatabase();
      this.addAuditLog('MUKIZA Richard (Admin)', 'BOOKING_UPDATED', `Booking ${id} updated status to ${bkg.status}`, 'SUCCESS');
    }
    return bkg;
  },

  // Quotes
  getQuotes(): QuoteRequest[] {
    return loadDatabase().quotes;
  },
  createQuote(quoteData: Omit<QuoteRequest, 'id' | 'createdAt' | 'status'>): QuoteRequest {
    const store = loadDatabase();
    const newQuote: QuoteRequest = {
      ...quoteData,
      id: `QUO-2026-${Math.floor(100 + Math.random() * 900)}`,
      status: 'new',
      createdAt: new Date().toISOString(),
    };
    store.quotes.unshift(newQuote);
    saveDatabase();
    this.addAuditLog('CLIENT_WEB_PORTAL', 'QUOTE_SUBMITTED', `Quote request ${newQuote.id} from ${newQuote.fullName} (${newQuote.cameraCount} cameras)`, 'SUCCESS');
    return newQuote;
  },
  updateQuoteStatus(id: string, status: QuoteRequest['status']): QuoteRequest | undefined {
    const store = loadDatabase();
    const q = store.quotes.find((item) => item.id === id);
    if (q) {
      q.status = status;
      saveDatabase();
      this.addAuditLog('MUKIZA Richard (Admin)', 'QUOTE_STATUS_UPDATE', `Quote ${id} status set to ${status}`, 'SUCCESS');
    }
    return q;
  },

  // Security Audit Logs
  getAuditLogs(): SecurityAuditLog[] {
    return loadDatabase().auditLogs;
  },
  addAuditLog(actor: string, action: string, details: string, status: 'SUCCESS' | 'WARNING' | 'ALERT' = 'SUCCESS'): SecurityAuditLog {
    const store = loadDatabase();
    const newLog: SecurityAuditLog = {
      id: `LOG-${Math.floor(1000 + Math.random() * 9000)}`,
      timestamp: new Date().toISOString(),
      actor,
      action,
      details,
      ipAddress: '197.243.12.88', // Simulated local IP
      status,
    };
    store.auditLogs.unshift(newLog);
    if (store.auditLogs.length > 200) {
      store.auditLogs.pop();
    }
    saveDatabase();
    return newLog;
  },
};
