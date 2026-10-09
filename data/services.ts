import { ServicePackage } from "@/lib/types";

export interface CompanyDivision {
  id: string;
  title: string;
  tagline: string;
  iconName: string;
  items: string[];
  description: string;
}

export const companyDivisions: CompanyDivision[] = [
  {
    id: "electronic-devices",
    title: "Electronic Devices & Security",
    tagline: "Intelligent Physical & Electronic Defense",
    iconName: "ShieldCheck",
    items: [
      "CCTV Cameras (IP, PTZ, Dome, Bullet, 4K ColorVu)",
      "Biometric Access Control (Face Recognition, Fingerprint, RFID)",
      "Fire Alarm & Suppression Systems (Asenware Authorized)",
      "Fiber Optics Backbone & Fusion Splicing"
    ],
    description: "Enterprise security architecture engineered for 24/7 reliability, real-time perimeter monitoring, and cyber-hardened remote surveillance."
  },
  {
    id: "information-technology",
    title: "Information Technology (IT)",
    tagline: "Enterprise Computing & Data Infrastructure",
    iconName: "Server",
    items: [
      "Data Center Infrastructure & Server Racks",
      "Commercial Laptops & Workstations (Lenovo, HP, Dell)",
      "Enterprise Managed Switches & PoE Backbones",
      "High-Density Routers & Wi-Fi 6 Access Points (Cisco, Ruckus, Huawei)"
    ],
    description: "Robust computing, routing, switching, and virtualization infrastructure to empower modern corporations, government facilities, and schools."
  },
  {
    id: "electrical-engineering",
    title: "Electrical Engineering",
    tagline: "Mission-Critical Power & Distribution",
    iconName: "Zap",
    items: [
      "Industrial Generators & Automatic Transfer Switches (ATS)",
      "Uninterruptible Power Supplies (UPS) & Inverters (Kstar)",
      "Step-Down Transformers & Low/Medium Voltage Switchgears",
      "DC Rectifiers, Industrial Batteries & Power Distribution Units"
    ],
    description: "Uninterrupted power systems and distribution solutions designed to prevent downtime, protect sensitive electronics, and withstand grid fluctuations."
  },
  {
    id: "hvac-climate",
    title: "HVAC & Environmental Cooling",
    tagline: "Precision Climate Control for Mission-Critical Facilities",
    iconName: "Wind",
    items: [
      "Precision Air Cooling for Server Rooms & Data Centers",
      "Variable Refrigerant Flow (VRF) Centralized Cooling",
      "Split Air Conditioners & Commercial Floor Standing Units",
      "Industrial Ventilation & Chiller Systems (LG, Samsung)"
    ],
    description: "Engineered thermal management systems that maintain precise temperature and humidity levels for data centers, medical hubs, and office complexes."
  },
  {
    id: "professional-services",
    title: "Professional Engineering Services",
    tagline: "Turnkey Implementation & Lifecycle Support",
    iconName: "Headphones",
    items: [
      "Infrastructure Deployment & Onboarding",
      "System Migration & Hardware Modernization",
      "Technical Consultancy & Feasibility Studies",
      "24/7 SLA Maintenance Contracts & Emergency Dispatch"
    ],
    description: "End-to-end technical consulting, rapid field deployment, preventative maintenance, and round-the-clock priority technical support."
  }
];

export const installationServices: ServicePackage[] = [
  {
    id: "srv-residential",
    title: "Residential Smart Security & CCTV Package",
    slug: "residential-security-installation",
    targetAudience: "Homes, Apartments, Private Compounds, and Villas",
    priceStartingAt: 150.0,
    turnaroundTime: "1 - 2 Business Days",
    recommendedFor: "Homeowners wanting crystal-clear perimeter security, smartphone notifications, and discreet conduit wiring.",
    features: [
      "Full perimeter security risk & vulnerability survey",
      "Up to 8 indoor/outdoor camera mounting with weatherproof junction boxes",
      "Concealed UV-resistant conduit or interior trunking for clean, invisible wiring",
      "Mobile smartphone live viewing setup for unlimited family members",
      "Motion detection perimeter alarm tuning & AcuSense human/vehicle calibration",
      "Complimentary 1-year on-site preventative maintenance check"
    ],
    includes: [
      "Certified installation technician & assistant",
      "All mounting hardware, brackets, weatherproof junction boxes",
      "Cable termination with high-grade RJ45 connectors & boots",
      "DVR/NVR configuration, password hardening, cloud P2P linking",
      "Client orientation & mobile app training"
    ]
  },
  {
    id: "srv-commercial",
    title: "Commercial Retail, Office & Access Suite",
    slug: "commercial-retail-office-security",
    targetAudience: "Shops, Supermarkets, Pharmacies, Corporate Offices, and Banks",
    priceStartingAt: 350.0,
    turnaroundTime: "2 - 4 Business Days",
    recommendedFor: "Businesses requiring comprehensive point-of-sale coverage, staff biometric access control, and loss prevention.",
    features: [
      "Point-of-Sale (POS) cash register high-definition camera alignment",
      "Biometric fingerprint / RFID access control integration on entry doors",
      "Multi-channel NVR setup with isolated VLAN security networking",
      "Centralized monitoring workstation or manager PC client configuration",
      "Motion & heat-map customer analytics setup",
      "Compliance documentation for insurance and local business regulatory bodies"
    ],
    includes: [
      "Lead security systems engineer + certified cabling technicians",
      "Full server rack / cabinet termination and patch panel labeling",
      "Fail-safe magnetic lock (maglock) and emergency exit push-button installation",
      "Dual backup power (UPS) wiring integration",
      "Detailed system schematic and port map documentation"
    ]
  },
  {
    id: "srv-industrial",
    title: "Data Center, Electrical & Industrial Infrastructure",
    slug: "industrial-warehouse-datacenter-infrastructure",
    targetAudience: "Data Centers, Factories, Logistics Hubs, Hospitals, and Campuses",
    priceStartingAt: 850.0,
    turnaroundTime: "5 - 10 Business Days",
    recommendedFor: "Large-acreage premises demanding long-range PTZ cameras, fiber optic backhaul, precision HVAC cooling, and backup generators.",
    features: [
      "Multi-kilometer fiber optic backbone and industrial PoE distribution",
      "Automatic Number Plate Recognition (ANPR) cameras at entry/exit gates",
      "Data center precision air cooling & server rack structured cabling",
      "Heavy-duty generator ATS, UPS and transformer power distribution",
      "Central Command Room / Guard Post multi-screen video wall setup",
      "24/7 Service Level Agreement (SLA) with 4-hour emergency technician dispatch"
    ],
    includes: [
      "Senior project engineer (supervised by Richard MUKIZA)",
      "Fiber splicing, OTDR testing, and Fluke network certification report",
      "Lightning arrestors and heavy-duty grounding installation",
      "High-reach boom lift / scissor lift certified technicians",
      "Comprehensive staff training for security control room operators"
    ]
  },
  {
    id: "srv-maintenance",
    title: "Annual Preventative Maintenance & SLA Contract",
    slug: "annual-preventative-maintenance-sla",
    targetAudience: "Existing CCTV, IT, Electrical & Access Control installations",
    priceStartingAt: 120.0,
    turnaroundTime: "Quarterly Scheduled Visits",
    recommendedFor: "Organizations that cannot afford system downtime and require quarterly lens cleaning, storage health audits, and firmware updates.",
    features: [
      "Quarterly physical camera cleaning, lens refocusing, and housing sealing check",
      "Hard drive SMART health diagnostics to prevent catastrophic data loss",
      "Firmware security patching to safeguard against cyber attacks and malware",
      "Battery backup (UPS) load testing and power supply calibration",
      "Priority 24/7 hotline with guaranteed 4-hour on-site response time",
      "15% discount on all replacement parts and hardware upgrades"
    ],
    includes: [
      "Quarterly written audit report with camera health scores",
      "Emergency technician callouts with zero labor fees",
      "Free loaner NVR/camera equipment in case of warranty repairs"
    ]
  }
];

export const installationSteps = [
  {
    step: "01",
    phase: "Planning Phase",
    title: "Scope, Budget & Risk Assessment",
    description: "We define precise scope and objectives, formulate a detailed implementation plan, identify resources, set clear budgets, establish milestones, and execute thorough risk assessments with proactive mitigation strategies."
  },
  {
    step: "02",
    phase: "Execution Phase",
    title: "Implementation, Structured Cabling & Coordination",
    description: "We execute the engineering blueprint, coordinate certified technicians and resources, deploy neat 100% copper/fiber infrastructure, conduct real-time progress monitoring, and maintain transparent stakeholder communication."
  },
  {
    step: "03",
    phase: "Closure Phase",
    title: "Commissioning, Testing, Handover & SLA Signoff",
    description: "We complete all deliverables, perform rigorous quality tests, finalize documentation, conduct comprehensive client training, close contracts formally, and activate ongoing 24/7 SLA maintenance and support."
  }
];

export const officialPartners = [
  { name: "Hikvision", category: "CCTV & Security" },
  { name: "Huawei", category: "Networking & Telecom" },
  { name: "Cisco", category: "Enterprise Networks" },
  { name: "Dell Technologies", category: "Servers & IT" },
  { name: "HP / HPE", category: "Workstations & Infrastructure" },
  { name: "Lenovo", category: "Computing & Laptops" },
  { name: "Fortinet", category: "Cybersecurity & Firewalls" },
  { name: "Asenware", category: "Fire Alarm Systems" },
  { name: "Bosch", category: "Security & Sound" },
  { name: "Ruckus (CommScope)", category: "Wi-Fi & Wireless" },
  { name: "Legrand", category: "Electrical & Data Infrastructure" },
  { name: "Siemon", category: "Structured Cabling" },
  { name: "Nutanix", category: "Hyperconverged Infrastructure" },
  { name: "A10 Networks", category: "Application Security" },
  { name: "Microsoft", category: "Enterprise Software" },
  { name: "Samsung", category: "Commercial Displays & HVAC" },
  { name: "LG", category: "Commercial HVAC & Displays" },
  { name: "Toshiba", category: "Storage & Hardware" },
  { name: "Kstar", category: "UPS & Power Solutions" }
];
