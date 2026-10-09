'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'en' | 'fr';

interface Translations {
  [key: string]: {
    en: string;
    fr: string;
  };
}

const translations: Translations = {
  // Navigation
  home: { en: 'Home', fr: 'Accueil' },
  products: { en: 'Products', fr: 'Produits' },
  solutions: { en: 'Solutions', fr: 'Solutions' },
  services: { en: 'Services', fr: 'Services' },
  kitBuilder: { en: 'Security Kit Builder', fr: 'Configurateur de Kit' },
  blog: { en: 'Knowledge Base', fr: 'Base de Connaissances' },
  about: { en: 'About', fr: 'À Propos' },
  contact: { en: 'Contact', fr: 'Contact' },
  adminPortal: { en: 'Admin Portal', fr: 'Portail Admin' },
  trackOrder: { en: 'Track Order', fr: 'Suivre Commande' },

  // Hero & CTAs
  heroBadge: { en: 'Certified Physical Security & Video Surveillance', fr: 'Sécurité Physique & Vidéosurveillance Certifiée' },
  heroTitle1: { en: 'Intelligent Security Systems', fr: 'Systèmes de Sécurité Intelligents' },
  heroTitle2: { en: 'Engineered for Total Peace of Mind', fr: 'Conçus pour une Sérénité Totale' },
  heroSubtitle: { 
    en: 'Muganwa Technology Solutions Ltd sells, designs, and installs high-grade CCTV surveillance, biometric access control, perimeter alarms, and turnkey enterprise security infrastructure.',
    fr: 'Muganwa Technology Solutions Ltd vend, conçoit et installe des systèmes de vidéosurveillance CCTV, contrôle d\'accès biométrique, alarmes périmétriques et infrastructures de sécurité clé en main.'
  },
  buildKitCTA: { en: 'Build Your Custom Kit', fr: 'Créer Votre Kit Sur Mesure' },
  requestSurveyCTA: { en: 'Book Free Site Survey', fr: 'Réserver un Audit Gratuit' },
  viewProducts: { en: 'Browse Products', fr: 'Explorer les Produits' },

  // Trust Badges
  warrantyTitle: { en: '2-3 Year Warranty', fr: 'Garantie 2 à 3 Ans' },
  warrantyDesc: { en: '100% Genuine Hikvision, Dahua & ZKTeco', fr: '100% Authentique Hikvision, Dahua & ZKTeco' },
  certifiedTitle: { en: 'Certified Engineers', fr: 'Ingénieurs Certifiés' },
  certifiedDesc: { en: 'Clean conduit cabling & proper setup', fr: 'Câblage soigné sous goulotte & configuration' },
  supportTitle: { en: '24/7 Technical SLA', fr: 'Support Technique 24/7' },
  supportDesc: { en: 'Rapid emergency response team', fr: 'Équipe d\'intervention d\'urgence rapide' },

  // Common UI
  addToCart: { en: 'Add to Cart', fr: 'Ajouter au Panier' },
  inStock: { en: 'In Stock', fr: 'En Stock' },
  outOfStock: { en: 'Out of Stock', fr: 'Rupture' },
  compare: { en: 'Compare', fr: 'Comparer' },
  quickView: { en: 'Quick View', fr: 'Aperçu Rapide' },
  price: { en: 'Price', fr: 'Prix' },
  specifications: { en: 'Specifications', fr: 'Spécifications' },
  cart: { en: 'Cart', fr: 'Panier' },
  checkout: { en: 'Proceed to Checkout', fr: 'Passer la Commande' },
  total: { en: 'Total', fr: 'Total' },
  searchPlaceholder: { en: 'Search cameras, recorders, access control...', fr: 'Rechercher caméras, enregistreurs, biométrie...' },
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');

  useEffect(() => {
    try {
      const saved = localStorage.getItem('mts_lang') as Language;
      if (saved && (saved === 'en' || saved === 'fr')) {
        setLanguage(saved);
      }
    } catch (e) {
      console.error(e);
    }
  }, []);

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang);
    try {
      localStorage.setItem('mts_lang', lang);
    } catch (e) {
      console.error(e);
    }
  };

  const t = (key: string): string => {
    if (translations[key] && translations[key][language]) {
      return translations[key][language];
    }
    return key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
