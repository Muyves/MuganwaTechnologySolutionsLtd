import { SolutionPageData } from "@/lib/types";

export const solutionsData: SolutionPageData[] = [
  {
    id: "sol-home",
    slug: "home-security",
    title: "Smart Home & Residential Security Solutions",
    subtitle: "Safeguard your family, compound, and assets with 24/7 crystal-clear perimeter defense and instant smartphone alerts.",
    heroImage: "https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&w=1200&q=80",
    challenge: "Modern homes face unauthorized gate intrusions, blind spots around perimeter walls, delivery theft, and unreliable power or internet disruptions that render basic consumer cameras useless.",
    solutionOverview: "Muganwa Technology Solutions Ltd designs integrated residential ecosystems combining ultra-clear 4K AcuSense cameras that ignore rustling trees and animals, active deterrence strobe sirens, video intercoms for remote gate unlocking, and battery backup systems that keep recording during municipal blackouts.",
    keyBenefits: [
      "Zero false alarms: AI distinguishes humans and cars from pets and wind",
      "ColorVu 24/7 night vision: See vivid colors in total darkness without grainy IR",
      "Two-way audio: Speak directly through your smartphone to visitors or trespassers",
      "Smart video doorbell: Answer your front gate from anywhere in the world",
      "Encrypted local NVR storage: No compulsory monthly cloud subscription fees"
    ],
    recommendedKit: {
      cameraCount: "4 to 8 × 4K Ultra HD AcuSense Turret Cameras",
      recorderType: "8-Channel PoE 4K NVR with Hik-Connect P2P Cloud",
      storage: "4TB Western Digital Purple Surveillance HDD (30 days recording)",
      accessControl: "Video Intercom Villa Door Station + Electric Gate Lock Release",
      additional: "Online UPS 1kVA power backup for 4+ hours blackout resilience"
    },
    caseStudy: {
      client: "Luxury Villa Compound (Kigali, Nyarutarama)",
      description: "Deployed an 8-camera 4K ColorVu perimeter system with automated red/blue strobe warning lights triggered when someone approaches the compound wall after 11 PM.",
      result: "Zero trespassing incidents in 18 months, with homeowners having 100% remote visibility while traveling abroad."
    }
  },
  {
    id: "sol-business",
    slug: "business-retail",
    title: "Retail Stores & Corporate Business Security",
    subtitle: "Eliminate shrinkage, safeguard revenue, streamline staff attendance, and resolve disputes with forensic HD video.",
    heroImage: "https://images.unsplash.com/photo-1520697830682-bbb6e85e2b0b?auto=format&fit=crop&w=1200&q=80",
    challenge: "Retailers and busy corporate offices battle cash register discrepancies, inventory shrinkage, customer slip-and-fall claims, unauthorized access to server rooms, and inaccurate manual employee timesheets.",
    solutionOverview: "We install synchronized point-of-sale (POS) CCTV monitoring, touchless facial recognition biometric access control, and heat-mapping analytics that simultaneously boost business intelligence while providing ironclad security.",
    keyBenefits: [
      "POS cash register transaction overlay on camera playback",
      "Touchless facial recognition terminal preventing 'buddy punching'",
      "Automated attendance reports integrated with payroll software",
      "Wide-angle dome cameras providing 360° coverage of aisles and stockrooms",
      "Customer foot traffic heatmaps to optimize product shelf layouts"
    ],
    recommendedKit: {
      cameraCount: "8 to 16 × 4MP Wide-Angle Audio Dome Cameras",
      recorderType: "16-Channel 4K AcuSense NVR with Dual HDMI Displays",
      storage: "2 × 4TB WD Purple Hard Drives (configured for 45-day continuous loop)",
      accessControl: "ZKTeco SpeedFace Face/Palm terminal on main doors & server room",
      additional: "Cashier pinhole cameras + 16-Port Gigabit PoE Managed Switch"
    },
    caseStudy: {
      client: "Premier Multi-Branch Supermarket Chain",
      description: "Equipped 3 branch stores with 16 cameras each, integrated cash counter zoom cameras, and central manager remote video walls.",
      result: "Achieved a 43% reduction in store shrinkage and resolved 100% of customer till disputes instantly using timestamped HD video evidence."
    }
  },
  {
    id: "sol-industrial",
    slug: "industrial-warehouse",
    title: "Industrial Plants, Logistics Hubs & Warehouses",
    subtitle: "Heavy-duty perimeter defense, long-range optical zoom, license plate recognition, and ruggedized environmental durability.",
    heroImage: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80",
    challenge: "Industrial sites face extreme operational conditions: dust, moisture, lightning surges, massive perimeters spanning hundreds of meters, and frequent truck loading operations requiring forensic vehicle tracking.",
    solutionOverview: "Muganwa Technology Solutions Ltd engineers industrial-grade security backbones utilizing fiber-optic cabling, 25x/32x optical zoom PTZ tracking domes, ANPR cameras for automated vehicle weighbridge logging, and centralized guard room monitoring desks.",
    keyBenefits: [
      "Automatic Number Plate Recognition (ANPR) logs every truck license plate",
      "Laser IR and PTZ cameras monitoring compound boundaries up to 200m away",
      "Vandal-proof IK10 and weatherproof IP67 enclosures resistant to chemicals and dirt",
      "Surge-protected industrial network switches with optical fiber uplinks",
      "Thermal early-fire and overheating machinery detection alerts"
    ],
    recommendedKit: {
      cameraCount: "16 to 32 × 4K Bullets + 2 × 25x Speed Dome PTZs + 2 × ANPR Cameras",
      recorderType: "32-Channel Enterprise 4K NVR with RAID 5 redundancy",
      storage: "4 × 8TB Enterprise Surveillance Drives (60-day retention)",
      accessControl: "Full-height security turnstiles with biometric RFID card readers",
      additional: "MTS Commander Quad-Display Workstation for 24/7 security guard post"
    },
    caseStudy: {
      client: "Special Economic Zone Logistics Center",
      description: "Deployed 32 cameras across a 15,000 m² warehouse complex, integrating ANPR barrier gates and automated forklift speed alerts.",
      result: "Zero lost cargo claims and automated truck turnaround time reduced by 30% through automated license plate barrier access."
    }
  },
  {
    id: "sol-education",
    slug: "schools-education",
    title: "Schools, Universities & Campus Security",
    subtitle: "Protect students, educators, and campus infrastructure with intelligent lockdown alerts and comprehensive perimeter visibility.",
    heroImage: "https://images.unsplash.com/photo-1563770660941-20978e870e26?auto=format&fit=crop&w=1200&q=80",
    challenge: "Educational campuses host hundreds or thousands of students across multiple buildings, making manual visitor tracking difficult while requiring strict student privacy safeguards and rapid emergency response.",
    solutionOverview: "We provide comprehensive campus safety networks: high-definition hallway and gate cameras, automated visitor badge printers, staff RFID access control for laboratories and administrative archives, and emergency panic button systems.",
    keyBenefits: [
      "High-visibility gate cameras tracking school buses and parent pickups",
      "Anti-bullying and hallway corridor surveillance with synchronized audio",
      "Keycard access control restricting student access to chemical labs and server rooms",
      "Instant one-touch campus panic lockdown alarm buttons",
      "Multi-user permission levels allowing principals and security chiefs custom views"
    ],
    recommendedKit: {
      cameraCount: "16 to 24 × 4MP Vandal-Proof Audio Dome Cameras",
      recorderType: "32-Channel 4K NVR with Multi-VLAN separation",
      storage: "2 × 8TB Hard Drives (30-day continuous archive)",
      accessControl: "ZKTeco RFID Card Controllers on computer labs & admin offices",
      additional: "Outdoor weather-sealed PA horn speakers for emergency announcements"
    },
    caseStudy: {
      client: "International Secondary & High School Campus",
      description: "Equipped main entrance, sports fields, dormitory gates, and science wings with 24 cameras and centralized campus security office.",
      result: "Substantially enhanced student safety assurance for parents and eliminated unauthorized campus access."
    }
  }
];
