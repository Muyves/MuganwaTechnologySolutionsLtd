import { Order, InstallationBooking, QuoteRequest, SecurityAuditLog } from "@/lib/types";

export const initialOrders: Order[] = [
  {
    id: "MTS-2026-8941",
    customerName: "Dr. Jean-Pierre Habimana",
    customerEmail: "jp.habimana@polyclinique.rw",
    customerPhone: "+250 788 345 678",
    shippingAddress: {
      street: "KG 14 Ave, Plot 22",
      city: "Kigali",
      district: "Gasabo, Kibagabaga",
      postalCode: "00250",
      country: "Rwanda"
    },
    items: [
      {
        productId: "mts-cam-001",
        productName: "Hikvision AcuSense 8MP (4K) Ultra HD IP Turret Camera",
        price: 189.0,
        quantity: 6,
        includeInstallation: true,
        image: "https://images.unsplash.com/photo-1557597774-9d273605dfa9?auto=format&fit=crop&w=400&q=80"
      },
      {
        productId: "mts-rec-001",
        productName: "Hikvision Pro 16-Channel 4K NVR with Built-in 16 PoE Ports",
        price: 385.0,
        quantity: 1,
        includeInstallation: true,
        image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=400&q=80"
      },
      {
        productId: "mts-acc-001",
        productName: "Western Digital Purple 4TB Surveillance 24/7 Internal Hard Drive",
        price: 110.0,
        quantity: 2,
        includeInstallation: false,
        image: "https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?auto=format&fit=crop&w=400&q=80"
      }
    ],
    subtotal: 1739.0,
    installationFee: 240.0,
    tax: 0.0,
    total: 1979.0,
    paymentMethod: "momo",
    paymentStatus: "paid",
    orderStatus: "processing",
    createdAt: "2026-09-18T14:30:00Z",
    notes: "Clinic perimeter and reception coverage. Client requested quiet installation after 4 PM."
  },
  {
    id: "MTS-2026-8940",
    customerName: "Aline Uwase",
    customerEmail: "aline.uwase@primeproperties.rw",
    customerPhone: "+250 782 123 456",
    shippingAddress: {
      street: "KN 5 Rd, Villa 7",
      city: "Kigali",
      district: "Nyarutarama",
      country: "Rwanda"
    },
    items: [
      {
        productId: "mts-acc-ctrl-001",
        productName: "ZKTeco SpeedFace-V5L Touchless Face & Palm Recognition Terminal",
        price: 430.0,
        quantity: 2,
        includeInstallation: true,
        image: "https://images.unsplash.com/photo-1563770660941-20978e870e26?auto=format&fit=crop&w=400&q=80"
      },
      {
        productId: "mts-acc-ctrl-002",
        productName: "Heavy-Duty 280kg (600lbs) Electromagnetic Magnetic Door Lock (Maglock)",
        price: 65.0,
        quantity: 2,
        includeInstallation: true,
        image: "https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&w=400&q=80"
      }
    ],
    subtotal: 990.0,
    installationFee: 150.0,
    tax: 0.0,
    total: 1140.0,
    paymentMethod: "bank_transfer",
    paymentStatus: "paid",
    orderStatus: "installed",
    createdAt: "2026-09-14T09:15:00Z",
    notes: "Corporate office entrance and executive board room access."
  },
  {
    id: "MTS-2026-8938",
    customerName: "Emmanuel Ndayisaba",
    customerEmail: "emmanuel@kigalilogistics.com",
    customerPhone: "+250 783 999 111",
    shippingAddress: {
      street: "Kigali Special Economic Zone, Block C",
      city: "Kigali",
      district: "Masoro",
      country: "Rwanda"
    },
    items: [
      {
        productId: "mts-cam-002",
        productName: "Dahua WizSense 4MP 25x Optical Zoom PTZ Speed Dome",
        price: 495.0,
        quantity: 2,
        includeInstallation: true,
        image: "https://images.unsplash.com/photo-1557597774-9d273605dfa9?auto=format&fit=crop&w=400&q=80"
      },
      {
        productId: "mts-work-001",
        productName: "MTS Commander 4K Quad-Monitor Security Workstation",
        price: 1250.0,
        quantity: 1,
        includeInstallation: true,
        image: "https://images.unsplash.com/photo-1591488320449-011701bb6704?auto=format&fit=crop&w=400&q=80"
      }
    ],
    subtotal: 2240.0,
    installationFee: 350.0,
    tax: 0.0,
    total: 2590.0,
    paymentMethod: "card",
    paymentStatus: "paid",
    orderStatus: "completed",
    createdAt: "2026-09-10T11:00:00Z",
    notes: "Warehouse perimeter tracking and central control desk."
  }
];

export const initialBookings: InstallationBooking[] = [
  {
    id: "BKG-2026-104",
    customerName: "Clarisse Mukamana",
    email: "clarisse.m@apexdesign.rw",
    phone: "+250 788 882 341",
    address: "KG 549 St, House 12",
    city: "Kigali",
    propertyType: "residential",
    requestedDate: "2026-09-22",
    requestedTimeSlot: "morning",
    numberOfCameras: 6,
    hasExistingWiring: false,
    notes: "New residential construction. Conduit pipes already installed inside ceiling.",
    status: "confirmed",
    assignedTechnician: "Fabrice Gakwaya (Lead Field Tech)",
    createdAt: "2026-09-17T16:20:00Z"
  },
  {
    id: "BKG-2026-105",
    customerName: "Pascal Rugamba",
    email: "p.rugamba@horizonpharmacy.com",
    phone: "+250 785 432 109",
    address: "KN 4 Ave, Downtown Branch",
    city: "Kigali",
    propertyType: "retail",
    requestedDate: "2026-09-24",
    requestedTimeSlot: "afternoon",
    numberOfCameras: 12,
    hasExistingWiring: true,
    notes: "Upgrading old 720p analog cameras to 4K ColorVu IP cameras.",
    status: "pending",
    createdAt: "2026-09-18T10:10:00Z"
  }
];

export const initialQuotes: QuoteRequest[] = [
  {
    id: "QUO-2026-301",
    fullName: "David Karekezi",
    companyName: "Grand Hill Hotel & Suites",
    email: "d.karekezi@grandhill.rw",
    phone: "+250 788 654 321",
    propertyType: "Hospitality / Hotel Resort",
    cameraCount: 36,
    indoorOutdoorSplit: "20 Indoor (Hallways, Lobby, Kitchen) / 16 Outdoor (Pool, Parking, Gates)",
    recordingDays: 60,
    requiresAccessControl: true,
    requiresAlarmIntercom: true,
    propertyAddress: "Kigali - Kiyovu Heights",
    estimatedBudget: "$8,000 - $12,000",
    sitePhotoNames: ["hotel-facade.jpg", "parking-layout.pdf", "corridor-blueprint.png"],
    projectDetails: "Complete surveillance overhaul across 4 floors. Require integration of staff RFID time attendance and visitor vehicle license plate logging.",
    status: "new",
    createdAt: "2026-09-18T08:45:00Z"
  }
];

export const initialAuditLogs: SecurityAuditLog[] = [
  {
    id: "LOG-9004",
    timestamp: "2026-09-19T10:30:15Z",
    actor: "MUKIZA Richard (Admin)",
    action: "ADMIN_LOGIN_SUCCESS",
    details: "Authenticated via 2FA token from IP 197.243.12.88 (Kigali, Fiber ISP)",
    ipAddress: "197.243.12.88",
    status: "SUCCESS"
  },
  {
    id: "LOG-9003",
    timestamp: "2026-09-19T09:12:00Z",
    actor: "MUKIZA Richard (Admin)",
    action: "INVENTORY_UPDATE",
    details: "Restocked 40 units of 'Western Digital Purple 4TB Surveillance HDD' (SKU: WD43PURZ)",
    ipAddress: "197.243.12.88",
    status: "SUCCESS"
  },
  {
    id: "LOG-9002",
    timestamp: "2026-09-18T23:44:11Z",
    actor: "SYSTEM_FIREWALL",
    action: "RATE_LIMIT_TRIGGERED",
    details: "Blocked 14 consecutive quote submissions within 60 seconds from IP 185.220.101.5",
    ipAddress: "185.220.101.5",
    status: "ALERT"
  },
  {
    id: "LOG-9001",
    timestamp: "2026-09-18T14:31:02Z",
    actor: "SYSTEM_GATEWAY",
    action: "ORDER_PLACED",
    details: "New order MTS-2026-8941 placed by Dr. Jean-Pierre Habimana ($1,979.00 via MTN MoMo)",
    ipAddress: "197.243.28.14",
    status: "SUCCESS"
  }
];
