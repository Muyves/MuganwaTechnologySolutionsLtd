export type ProductCategory = 
  | 'cameras'
  | 'recorders'
  | 'access_control'
  | 'alarms'
  | 'workstations'
  | 'networking'
  | 'accessories';

export interface ProductSpec {
  label: string;
  value: string;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  category: ProductCategory;
  subCategory: string;
  brand: string;
  modelNumber: string;
  price: number; // in USD (default) or converted
  compareAtPrice?: number;
  inStock: boolean;
  stockCount: number;
  rating: number;
  reviewCount: number;
  featured?: boolean;
  bestSeller?: boolean;
  newArrival?: boolean;
  resolution?: string; // e.g., '4K UHD (8MP)', '4MP (2K)', '1080p (2MP)'
  cameraType?: 'IP' | 'Analog' | 'PTZ' | 'Wireless' | 'Dome' | 'Bullet' | 'ColorVu';
  shortDescription: string;
  description: string;
  features: string[];
  specs: ProductSpec[];
  images: string[];
  datasheetUrl?: string;
  warrantyYears: number;
  compatibleWith?: string[]; // IDs or names of compatible items
}

export interface CartItem {
  product: Product;
  quantity: number;
  includeInstallation?: boolean;
}

export interface ServicePackage {
  id: string;
  title: string;
  slug: string;
  targetAudience: string;
  priceStartingAt: number;
  features: string[];
  recommendedFor: string;
  includes: string[];
  turnaroundTime: string;
}

export interface SolutionPageData {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  heroImage: string;
  challenge: string;
  solutionOverview: string;
  keyBenefits: string[];
  recommendedKit: {
    cameraCount: string;
    recorderType: string;
    storage: string;
    accessControl: string;
    additional: string;
  };
  caseStudy: {
    client: string;
    description: string;
    result: string;
  };
}

export interface InstallationBooking {
  id: string;
  customerName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  propertyType: 'residential' | 'retail' | 'office' | 'industrial' | 'school' | 'hospital';
  requestedDate: string;
  requestedTimeSlot: 'morning' | 'afternoon' | 'evening';
  numberOfCameras: number;
  hasExistingWiring: boolean;
  notes?: string;
  status: 'pending' | 'confirmed' | 'technician_dispatched' | 'completed' | 'cancelled';
  assignedTechnician?: string;
  createdAt: string;
}

export interface QuoteRequest {
  id: string;
  fullName: string;
  companyName?: string;
  email: string;
  phone: string;
  propertyType: string;
  cameraCount: number;
  indoorOutdoorSplit: string;
  recordingDays: number;
  requiresAccessControl: boolean;
  requiresAlarmIntercom: boolean;
  propertyAddress: string;
  estimatedBudget?: string;
  sitePhotoNames?: string[];
  projectDetails: string;
  status: 'new' | 'under_review' | 'quote_sent' | 'approved' | 'rejected';
  createdAt: string;
}

export interface OrderItem {
  productId: string;
  productName: string;
  price: number;
  quantity: number;
  includeInstallation: boolean;
  image: string;
}

export interface Order {
  id: string; // e.g. "MTS-2026-8941"
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  shippingAddress: {
    street: string;
    city: string;
    district?: string;
    postalCode?: string;
    country: string;
  };
  items: OrderItem[];
  subtotal: number;
  installationFee: number;
  tax: number;
  total: number;
  paymentMethod: 'momo' | 'card' | 'bank_transfer' | 'cod';
  paymentStatus: 'paid' | 'pending' | 'failed' | 'refunded';
  orderStatus: 'pending' | 'processing' | 'dispatched' | 'installed' | 'completed';
  createdAt: string;
  notes?: string;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  author: string;
  authorRole: string;
  authorAvatar?: string;
  publishedDate: string;
  readTime: string;
  coverImage: string;
  tags: string[];
}

export interface SecurityAuditLog {
  id: string;
  timestamp: string;
  actor: string; // e.g. "MUKIZA Richard"
  action: string;
  details: string;
  ipAddress: string;
  status: 'SUCCESS' | 'WARNING' | 'ALERT';
}
