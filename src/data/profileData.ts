import { ExecutiveProfile, StrategicPillar, TapMateProduct } from '../types/profile';

export const PROFILE_DATA: ExecutiveProfile = {
  name: 'PRINCE PARASHAR',
  designation: 'CHIEF FINANCIAL OFFICER',
  company: 'TapMate.in',
  tagline: 'Driving Financial Excellence. Enabling Digital Growth. Building the Future.',
  bio: 'Spearheading financial strategy, capital allocation, and fiscal innovation at TapMate.in. Committed to scaling enterprise value through robust unit economics, data-driven governance, proactive risk mitigation, and automated fintech infrastructure for the next generation of contactless connectivity.',
  location: 'Mumbai & Bengaluru, India',
  verifiedEmail: 'prince@tapmate.in',
  secondaryEmail: 'cfo@tapmate.in',
  phone: '+919820089012',
  displayPhone: '+91 98200 89012',
  website: 'https://tapmate.in',
  linkedInUrl: 'https://www.linkedin.com/in/princeparashar',
  twitterUrl: 'https://x.com/princeparashar',
  whatsappUrl: 'https://wa.me/919820089012',
  timeZone: 'Asia/Kolkata (IST • UTC+05:30)',
  executiveHash: '0xTM_7F9E2A8C_2035_CFO',
};

export const STRATEGIC_PILLARS: StrategicPillar[] = [
  {
    id: 'capital-strategy',
    title: 'Financial Strategy & Capital Allocation',
    tagline: 'Maximizing long-term shareholder & enterprise equity',
    description:
      'Architecting disciplined capital allocation strategies to fuel rapid national and international expansion while maintaining healthy balance-sheet liquidity and aggressive operating margins.',
    iconName: 'LineChart',
    metrics: [
      { label: 'Capital Efficiency', value: 'Optimized' },
      { label: 'Forecast Precision', value: '99.4%' },
      { label: 'Runway Governance', value: 'High' },
    ],
  },
  {
    id: 'business-growth',
    title: 'Digital Growth & Unit Economics',
    tagline: 'Sustainable scalability across hardware & SaaS verticals',
    description:
      'Pairing physical NFC smart card unit economics with high-margin enterprise recurring subscription models, unlocking compound revenue expansion across B2B and institutional clients.',
    iconName: 'TrendingUp',
    metrics: [
      { label: 'Gross Margin Focus', value: 'Expansion' },
      { label: 'CAC : LTV Ratio', value: 'Superior' },
      { label: 'Recurring ARR Vector', value: 'Growth-Led' },
    ],
  },
  {
    id: 'risk-management',
    title: 'Risk Governance & Compliance',
    tagline: 'Proactive regulatory foresight and fiduciary stewardship',
    description:
      'Implementing multi-layered fiduciary frameworks, automated audit trails, and strict statutory compliance protocols to safeguard institutional trust and mitigate cross-border exposure.',
    iconName: 'ShieldCheck',
    metrics: [
      { label: 'Audit Compliance', value: '100% Clean' },
      { label: 'Risk Mitigation', value: 'Automated' },
      { label: 'Fiduciary Integrity', value: 'Institutional' },
    ],
  },
  {
    id: 'operational-efficiency',
    title: 'Operational Efficiency & Automation',
    tagline: 'Next-generation algorithmic fintech infrastructure',
    description:
      'Leveraging real-time treasury analytics, ERP integration, and automated reconciliation pipelines to eliminate operational latency and empower rapid executive decision-making.',
    iconName: 'Cpu',
    metrics: [
      { label: 'Treasury Automation', value: 'Real-Time' },
      { label: 'Cycle Time Reduction', value: '-65%' },
      { label: 'Reconciliation', value: 'Zero-Touch' },
    ],
  },
];

export const TAPMATE_PRODUCTS: TapMateProduct[] = [
  {
    id: 'metal-nfc',
    title: 'TapMate Matte Metal & Obsidian Edition',
    subtitle: 'Next-Generation Executive Smart Card',
    description: 'Precision-etched aerospace titanium & matte polymer embedded with advanced NTAG microchips for instant contact transfer.',
    icon: 'CreditCard',
    features: ['Instant NFC Tap', 'Dynamic QR Fallback', 'No App Needed', 'Cloud Synchronized'],
  },
  {
    id: 'enterprise-suite',
    title: 'TapMate Enterprise Identity Platform',
    subtitle: 'Centralized Team & Workforce Management',
    description: 'Comprehensive digital identity control room for enterprises to manage employee cards, analytics, leads, and CRM workflows.',
    icon: 'Building2',
    features: ['Centralized Brand Control', 'Salesforce/HubSpot Sync', 'Real-Time Analytics', 'SOC-2 Compliant'],
  },
  {
    id: 'custom-hardware',
    title: 'Smart Badges & Contactless Devices',
    subtitle: 'Events, Expos & Seamless Lead Capture',
    description: 'Revolutionizing conference and executive networking with high-speed contactless exchanges and automated lead follow-ups.',
    icon: 'Radio',
    features: ['Interactive Tap', 'Paperless Footprint', 'Direct vCard Save', 'Lead Export'],
  },
];
