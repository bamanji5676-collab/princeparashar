export interface ExecutiveProfile {
  name: string;
  designation: string;
  company: string;
  tagline: string;
  bio: string;
  location: string;
  verifiedEmail: string;
  secondaryEmail: string;
  phone: string;
  displayPhone: string;
  website: string;
  linkedInUrl: string;
  twitterUrl: string;
  whatsappUrl: string;
  timeZone: string;
  executiveHash: string;
  customAvatar?: string;
}

export interface StrategicPillar {
  id: string;
  title: string;
  tagline: string;
  description: string;
  iconName: string;
  metrics: { label: string; value: string }[];
}

export interface TapMateProduct {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  icon: string;
  features: string[];
}

export interface CapturedLead {
  id: string;
  name: string;
  company: string;
  email: string;
  phone: string;
  notes?: string;
  timestamp: string;
}

export interface AnalyticsData {
  impressions: number;
  vcardDownloads: number;
  qrScans: number;
  nfcTaps: number;
  callsClicked: number;
  emailsClicked: number;
  linkedinClicks: number;
  websiteClicks: number;
}
