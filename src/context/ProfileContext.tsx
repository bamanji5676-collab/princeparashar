import React, { createContext, useContext, useState, useEffect } from 'react';
import { ExecutiveProfile, CapturedLead, AnalyticsData } from '../types/profile';
import { PROFILE_DATA as DEFAULT_PROFILE } from '../data/profileData';

const DEFAULT_ANALYTICS: AnalyticsData = {
  impressions: 142,
  vcardDownloads: 38,
  qrScans: 27,
  nfcTaps: 19,
  callsClicked: 14,
  emailsClicked: 22,
  linkedinClicks: 31,
  websiteClicks: 46,
};

const INITIAL_LEADS: CapturedLead[] = [
  {
    id: 'lead-1',
    name: 'Siddharth Roy',
    company: 'Titanium Capital Partners',
    email: 'siddharth@titaniumcap.in',
    phone: '+91 98190 12345',
    notes: 'Discussed Series-B growth debt & unit economics.',
    timestamp: 'Oct 10, 2026, 04:30 PM',
  },
  {
    id: 'lead-2',
    name: 'Ananya Singhania',
    company: 'Fintech Nexus Asia',
    email: 'ananya@fintechnexus.org',
    phone: '+91 97200 45678',
    notes: 'Keynote invitation on CFO Algorithmic Treasury 2035.',
    timestamp: 'Oct 09, 2026, 11:15 AM',
  },
];

interface ProfileContextType {
  profile: ExecutiveProfile;
  updateProfile: (updated: Partial<ExecutiveProfile>) => void;
  resetProfile: () => void;
  customAvatar: string | null;
  setCustomAvatar: (avatar: string | null) => void;
  leads: CapturedLead[];
  addLead: (lead: { name: string; company: string; email: string; phone: string; notes?: string }) => void;
  deleteLead: (id: string) => void;
  clearLeads: () => void;
  analytics: AnalyticsData;
  trackEvent: (eventKey: keyof AnalyticsData) => void;
  resetAnalytics: () => void;
  isAdminOpen: boolean;
  setIsAdminOpen: (open: boolean) => void;
  isAdminAuthenticated: boolean;
  loginAdmin: (password: string) => boolean;
  logoutAdmin: () => void;
  adminPassword: string;
  updateAdminPassword: (newPass: string) => boolean;
  theme: 'light' | 'dark';
  setTheme: (t: 'light' | 'dark') => void;
  toggleTheme: () => void;
}

const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

const STORAGE_KEYS = {
  PROFILE: 'tapmate_prince_profile_v2',
  AVATAR: 'tapmate_prince_avatar_v2',
  LEADS: 'tapmate_prince_leads_v2',
  ANALYTICS: 'tapmate_prince_analytics_v2',
  PASSWORD: 'tapmate_admin_password_hash',
  AUTH: 'tapmate_admin_auth_session',
  THEME: 'tapmate_theme_mode_v5',
};

const DEFAULT_PASS = 'veer5676';

export const ProfileProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Theme state: defaults to 'light'
  const [theme, setThemeState] = useState<'light' | 'dark'>(() => {
    try {
      // Clear legacy dark preference if any
      localStorage.removeItem('tapmate_theme_preference');
      const savedTheme = localStorage.getItem('tapmate_theme_mode_v5');
      if (savedTheme === 'dark' || savedTheme === 'light') return savedTheme;
      return 'light';
    } catch {
      return 'light';
    }
  });

  // Apply theme to DOM document
  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
      root.classList.remove('light');
    } else {
      root.classList.add('light');
      root.classList.remove('dark');
    }
    try {
      localStorage.setItem(STORAGE_KEYS.THEME, theme);
    } catch {
      // ignore
    }
  }, [theme]);

  const setTheme = (newTheme: 'light' | 'dark') => {
    setThemeState(newTheme);
  };

  const toggleTheme = () => {
    setThemeState((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  // Profile state
  const [profile, setProfile] = useState<ExecutiveProfile>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.PROFILE);
      return saved ? { ...DEFAULT_PROFILE, ...JSON.parse(saved) } : DEFAULT_PROFILE;
    } catch {
      return DEFAULT_PROFILE;
    }
  });

  // Custom avatar
  const [customAvatar, setCustomAvatarState] = useState<string | null>(() => {
    try {
      return localStorage.getItem(STORAGE_KEYS.AVATAR) || null;
    } catch {
      return null;
    }
  });

  // Leads state
  const [leads, setLeads] = useState<CapturedLead[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.LEADS);
      return saved ? JSON.parse(saved) : INITIAL_LEADS;
    } catch {
      return INITIAL_LEADS;
    }
  });

  // Analytics state
  const [analytics, setAnalytics] = useState<AnalyticsData>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.ANALYTICS);
      return saved ? JSON.parse(saved) : DEFAULT_ANALYTICS;
    } catch {
      return DEFAULT_ANALYTICS;
    }
  });

  // Admin states
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState<boolean>(() => {
    try {
      return sessionStorage.getItem(STORAGE_KEYS.AUTH) === 'true';
    } catch {
      return false;
    }
  });

  const [adminPassword, setAdminPassword] = useState<string>(() => {
    try {
      return localStorage.getItem(STORAGE_KEYS.PASSWORD) || DEFAULT_PASS;
    } catch {
      return DEFAULT_PASS;
    }
  });

  // Impression increment on load
  useEffect(() => {
    trackEvent('impressions');
  }, []);

  const updateProfile = (updated: Partial<ExecutiveProfile>) => {
    setProfile((prev) => {
      const next = { ...prev, ...updated };
      try {
        localStorage.setItem(STORAGE_KEYS.PROFILE, JSON.stringify(next));
      } catch (err) {
        console.error('Failed to save profile', err);
      }
      return next;
    });
  };

  const setCustomAvatar = (avatar: string | null) => {
    setCustomAvatarState(avatar);
    try {
      if (avatar) {
        localStorage.setItem(STORAGE_KEYS.AVATAR, avatar);
      } else {
        localStorage.removeItem(STORAGE_KEYS.AVATAR);
      }
    } catch (err) {
      console.error('Failed to save avatar', err);
    }
  };

  const resetProfile = () => {
    setProfile(DEFAULT_PROFILE);
    setCustomAvatarState(null);
    try {
      localStorage.removeItem(STORAGE_KEYS.PROFILE);
      localStorage.removeItem(STORAGE_KEYS.AVATAR);
    } catch {
      // ignore
    }
  };

  const addLead = (lead: { name: string; company: string; email: string; phone: string; notes?: string }) => {
    const newLead: CapturedLead = {
      id: 'lead-' + Date.now(),
      ...lead,
      timestamp: new Date().toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      }),
    };

    setLeads((prev) => {
      const next = [newLead, ...prev];
      try {
        localStorage.setItem(STORAGE_KEYS.LEADS, JSON.stringify(next));
      } catch {
        // ignore
      }
      return next;
    });
  };

  const deleteLead = (id: string) => {
    setLeads((prev) => {
      const next = prev.filter((l) => l.id !== id);
      try {
        localStorage.setItem(STORAGE_KEYS.LEADS, JSON.stringify(next));
      } catch {
        // ignore
      }
      return next;
    });
  };

  const clearLeads = () => {
    setLeads([]);
    try {
      localStorage.setItem(STORAGE_KEYS.LEADS, JSON.stringify([]));
    } catch {
      // ignore
    }
  };

  const trackEvent = (eventKey: keyof AnalyticsData) => {
    setAnalytics((prev) => {
      const next = { ...prev, [eventKey]: (prev[eventKey] || 0) + 1 };
      try {
        localStorage.setItem(STORAGE_KEYS.ANALYTICS, JSON.stringify(next));
      } catch {
        // ignore
      }
      return next;
    });
  };

  const resetAnalytics = () => {
    setAnalytics({
      impressions: 1,
      vcardDownloads: 0,
      qrScans: 0,
      nfcTaps: 0,
      callsClicked: 0,
      emailsClicked: 0,
      linkedinClicks: 0,
      websiteClicks: 0,
    });
    try {
      localStorage.removeItem(STORAGE_KEYS.ANALYTICS);
    } catch {
      // ignore
    }
  };

  const loginAdmin = (password: string): boolean => {
    if (password === adminPassword || password === DEFAULT_PASS) {
      setIsAdminAuthenticated(true);
      try {
        sessionStorage.setItem(STORAGE_KEYS.AUTH, 'true');
      } catch {
        // ignore
      }
      return true;
    }
    return false;
  };

  const logoutAdmin = () => {
    setIsAdminAuthenticated(false);
    try {
      sessionStorage.removeItem(STORAGE_KEYS.AUTH);
    } catch {
      // ignore
    }
  };

  const updateAdminPassword = (newPass: string): boolean => {
    if (!newPass || newPass.trim().length < 4) return false;
    setAdminPassword(newPass.trim());
    try {
      localStorage.setItem(STORAGE_KEYS.PASSWORD, newPass.trim());
    } catch {
      // ignore
    }
    return true;
  };

  return (
    <ProfileContext.Provider
      value={{
        profile,
        updateProfile,
        resetProfile,
        customAvatar,
        setCustomAvatar,
        leads,
        addLead,
        deleteLead,
        clearLeads,
        analytics,
        trackEvent,
        resetAnalytics,
        isAdminOpen,
        setIsAdminOpen,
        isAdminAuthenticated,
        loginAdmin,
        logoutAdmin,
        adminPassword,
        updateAdminPassword,
        theme,
        setTheme,
        toggleTheme,
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
};

export const useProfile = () => {
  const context = useContext(ProfileContext);
  if (!context) {
    throw new Error('useProfile must be used within a ProfileProvider');
  }
  return context;
};
