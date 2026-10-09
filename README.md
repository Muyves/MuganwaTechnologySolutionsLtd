# Muganwa Technology Solutions Ltd (MTS) - Enterprise Security Platform

Official web platform and e-commerce portal for **Muganwa Technology Solutions Ltd**, specializing in CCTV surveillance systems, biometric access control, wireless intruder alarms, structured fiber/copper cabling, and turnkey security engineering across East Africa.

- **Executive Director**: MUKIZA Richard (Managing Director & Systems Architect)
- **Headquarters**: Kigali Commercial Tower, KG 7 Ave, Kigali, Rwanda
- **Brand Monogram**: MTS emblem (hammered emerald teal 'M' & 'T', bold crimson/burgundy 'S', with security gold trim)

---

## 1. Key Platform Features

- **Interactive Security Kit Builder (`/kit-builder`)**:
  - Property-type specific camera capacity (Homes, Retail, Corporate, Warehouses, Campuses).
  - Dynamic surveillance storage calculator for **Western Digital Purple** drives based on H.265+ encoding and day retention requirements.
  - Automated 10% bundle discount and 1-click cart insertion.
- **Product Catalog with Multi-Facet Filtering (`/products`)**:
  - Live filtering by category (Cameras, Recorders, Access Control, Workstations, Accessories), brand, resolution (1080p, 4MP, 4K), form factor (PTZ, Bullet, Dome), and price range.
  - Grid & list view modes with instant search and sort.
- **Product Detail & PDF Datasheets (`/products/[id]`)**:
  - Multi-angle gallery with thumbnail switching.
  - Comprehensive technical specifications table (sensors, focal lengths, night vision ranges, PoE ratings).
  - Printable / Downloadable official technical datasheet with company letterhead.
  - Compatible accessories recommendation (e.g. matched WD Purple HDD, junction boxes).
- **Turnkey Installation Services & Scheduling (`/services`)**:
  - 4 specialized packages (Residential, Commercial, Industrial, Annual SLA Maintenance).
  - Step-by-step 5-stage engineering workflow.
  - Interactive booking calendar with date picker, time slot selection, and technician dispatch notes.
- **Tailored Industry Solutions (`/solutions`)**:
  - Dedicated pages for Home Security, Retail & Commercial, Industrial & Warehouses, and Education & Campuses.
  - Threat models, recommended hardware bills of materials, and verified case studies.
- **Custom Quote Portal (`/quote`)**:
  - In-depth facility requirements questionnaire with site photos and blueprint upload simulation.
- **Customer Account & Tracking (`/account` & `/track-order`)**:
  - Real-time order tracking with 5-stage fulfillment status.
  - Equipment serial number lookup for 3-year warranty verification.
  - Customer support ticket creation and resolution tracking.
- **Executive Admin Portal (`/admin`)**:
  - Tailored dashboard for **MUKIZA Richard** (Super Admin).
  - Two-Factor Authentication (2FA) verification gate (`/admin/login`).
  - Full CRUD hardware inventory management (add, edit, stock levels, delete).
  - Live order management with order status lifecycle update.
  - Field technician assignment for installation bookings.
  - Custom quote review and PDF estimate dispatch.
  - Cryptographic security audit log tracking logins and administrative actions.
  - 1-Click JSON database backup download.
- **Multi-Language Support**: Real-time toggle between English (EN) and French (FR).
- **Live WhatsApp & Hotline Widget**: Direct one-touch link to senior engineers for emergency quotes.

---

## 2. Technology Stack

- **Frontend**: Next.js 14+ (App Router), React 18, TypeScript, Tailwind CSS, Lucide Icons.
- **State Management**: React Context (`CartContext`, `CompareContext`, `LanguageContext`).
- **Backend**: Next.js Full-Stack API Route Handlers (`/api/products`, `/api/orders`, `/api/bookings`, `/api/quotes`, `/api/admin/logs`).
- **Database Layer**:
  - Local Zero-Config Persistent Engine (`/lib/db.ts`) with automatic seeding for instant launch.
  - Production-ready PostgreSQL / MySQL schema defined in `/prisma/schema.prisma`.
- **Cybersecurity Hardening**:
  - Strict Content Security Policy (CSP), HSTS, `X-Frame-Options: DENY`, `X-Content-Type-Options: nosniff`.
  - Zero plain-text payment storage.
  - Role-based access control and rate-limit logging.

---

## 3. Getting Started & Local Development

### Prerequisites
- Node.js 18.x or higher (tested on Node v24)
- npm or yarn

### Installation Steps

1. **Clone or navigate to the project directory**:
   ```bash
   cd "d:/cedro Real Estate/Muganwa Technology Solutions Ltd"
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Launch the development server**:
   ```bash
   npm run dev
   ```

4. **Open in browser**:
   Navigate to [http://localhost:3000](http://localhost:3000).

---

## 4. Admin Access Credentials

To access the Executive Admin Portal:
1. Navigate to [http://localhost:3000/admin/login](http://localhost:3000/admin/login) or click the **Admin: MUKIZA Richard** button in the top navigation bar.
2. Enter the administrator credentials:
   - **Email**: `richard.mukiza@muganwatech.rw`
   - **Password**: `Admin@MTS2026!`
3. Enter the 6-digit Authenticator Token: `894102` (or any 6 digits).
4. You are now inside the command dashboard!

---

## 5. Sample Test Data

The platform comes pre-seeded with:
- **12 Enterprise Products**: Hikvision 4K AcuSense Turret, Dahua 25x PTZ Speed Dome, Uniview 4MP ColorHunter, Hikvision 16-Ch 4K NVR, ZKTeco SpeedFace Touchless Face/Palm terminal, Ajax Hub 2 Plus Wireless Alarm, Western Digital Purple 4TB HDD, Ruijie 16-Port PoE Switch, MTS Commander Quad-Monitor Workstation, Cat6 Solid Copper Reel, 12V 18-Channel PSU box, etc.
- **Sample Orders**: Placed by healthcare clinics and logistics warehouses with live tracking codes (`MTS-2026-8941`).
- **Sample Installation Bookings**: Pre-scheduled technician assignments.
- **4 Technical Knowledge Base Articles** authored by MUKIZA Richard.
