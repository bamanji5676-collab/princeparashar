import React, { useState } from 'react';
import { 
  X, 
  Lock, 
  Unlock, 
  User, 
  Save, 
  RotateCcw, 
  Users, 
  Download, 
  Trash2, 
  BarChart3, 
  Key, 
  Check, 
  AlertCircle, 
  Camera, 
  Phone, 
  Mail, 
  Plus,
  TrendingUp
} from 'lucide-react';
import { useProfile } from '../context/ProfileContext';
import { CompanyPerformanceChart } from './CompanyPerformanceChart';
import { playTechClick, playSuccessChime } from '../utils/audio';

export const AdminPanelModal: React.FC = () => {
  const {
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
    resetAnalytics,
    isAdminOpen,
    setIsAdminOpen,
    isAdminAuthenticated,
    loginAdmin,
    logoutAdmin,
    adminPassword,
    updateAdminPassword,
  } = useProfile();

  // Authentication state
  const [passInput, setPassInput] = useState('');
  const [authError, setAuthError] = useState('');

  // Active tab
  const [activeTab, setActiveTab] = useState<'profile' | 'performance' | 'leads' | 'analytics' | 'security'>('profile');

  // Profile form state
  const [formData, setFormData] = useState({ ...profile });
  const [avatarUrlInput, setAvatarUrlInput] = useState(customAvatar || '');
  const [savedBanner, setSavedBanner] = useState(false);

  // New Lead form modal
  const [showAddLead, setShowAddLead] = useState(false);
  const [newLeadData, setNewLeadData] = useState({ name: '', company: '', email: '', phone: '', notes: '' });

  // Password update form
  const [newPassInput, setNewPassInput] = useState('');
  const [passUpdated, setPassUpdated] = useState(false);

  if (!isAdminOpen) return null;

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');
    const success = loginAdmin(passInput.trim());
    if (success) {
      playSuccessChime();
      setFormData({ ...profile });
    } else {
      playTechClick();
      setAuthError('Invalid passcode. Default passcode is veer5676.');
    }
  };

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    playSuccessChime();
    updateProfile(formData);
    if (avatarUrlInput.trim()) {
      setCustomAvatar(avatarUrlInput.trim());
    } else {
      setCustomAvatar(null);
    }
    setSavedBanner(true);
    setTimeout(() => setSavedBanner(false), 3000);
  };

  const handleAvatarFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        setAvatarUrlInput(reader.result);
        setCustomAvatar(reader.result);
        playSuccessChime();
      }
    };
    reader.readAsDataURL(file);
  };

  const handleExportCSV = () => {
    playSuccessChime();
    if (leads.length === 0) {
      alert('No leads to export yet.');
      return;
    }

    const headers = ['Name', 'Company', 'Email', 'Phone', 'Notes', 'Timestamp'];
    const rows = leads.map((l) => [
      `"${l.name.replace(/"/g, '""')}"`,
      `"${l.company.replace(/"/g, '""')}"`,
      `"${l.email.replace(/"/g, '""')}"`,
      `"${l.phone.replace(/"/g, '""')}"`,
      `"${(l.notes || '').replace(/"/g, '""')}"`,
      `"${l.timestamp}"`,
    ]);

    const csvContent = [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `TapMate_Prince_Parashar_Leads_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleAddManualLead = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newLeadData.name || !newLeadData.email) return;
    addLead(newLeadData);
    setNewLeadData({ name: '', company: '', email: '', phone: '', notes: '' });
    setShowAddLead(false);
    playSuccessChime();
  };

  const handleUpdatePassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassInput.trim().length < 4) return;
    const ok = updateAdminPassword(newPassInput.trim());
    if (ok) {
      playSuccessChime();
      setPassUpdated(true);
      setNewPassInput('');
      setTimeout(() => setPassUpdated(false), 3000);
    }
  };

  const handleExportBackup = () => {
    playSuccessChime();
    const backupData = {
      profile,
      leads,
      analytics,
      customAvatar,
      timestamp: new Date().toISOString(),
    };
    const blob = new Blob([JSON.stringify(backupData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `TapMate_Prince_Parashar_Backup_${new Date().toISOString().slice(0, 10)}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-950/60 dark:bg-slate-950/85 backdrop-blur-md animate-fade-in overflow-y-auto">
      <div 
        className="relative w-full max-w-3xl my-auto rounded-2xl bg-white dark:bg-slate-900 border border-slate-300 dark:border-cyan-500/30 shadow-2xl text-left overflow-hidden max-h-[92vh] flex flex-col text-slate-800 dark:text-white"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Gradient Banner */}
        <div className="h-1 bg-gradient-to-r from-sky-400 via-blue-500 to-indigo-500 shrink-0" />

        {/* Modal Header */}
        <div className="px-5 py-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50 dark:bg-slate-950/60 shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-sky-100 dark:bg-cyan-500/10 border border-sky-300 dark:border-cyan-500/30 flex items-center justify-center text-sky-600 dark:text-cyan-400">
              <Lock className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-slate-900 dark:text-white tracking-tight">Executive Admin Control Room</h3>
                <span className="font-mono-tech text-[10px] px-2 py-0.5 rounded bg-sky-100 dark:bg-cyan-950/80 border border-sky-300 dark:border-cyan-800 text-sky-700 dark:text-cyan-300 font-semibold">
                  TapMate.in
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-mono-tech">
                {isAdminAuthenticated ? 'AUTHENTICATED // MASTER ACCESS' : 'SECURITY GATEWAY // AUTHORIZATION REQUIRED'}
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              playTechClick();
              setIsAdminOpen(false);
            }}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Main Content Area */}
        {!isAdminAuthenticated ? (
          /* AUTHENTICATION GATE */
          <div className="p-6 sm:p-10 flex flex-col items-center justify-center text-center space-y-6">
            <div className="relative">
              <div className="w-20 h-20 rounded-2xl bg-sky-100 dark:bg-cyan-500/10 border border-sky-300 dark:border-cyan-500/30 flex items-center justify-center text-sky-600 dark:text-cyan-400 shadow-md">
                <Lock className="w-10 h-10 animate-pulse" />
              </div>
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-sky-500 dark:bg-cyan-400 rounded-full animate-ping" />
            </div>

            <div className="max-w-sm space-y-1">
              <h4 className="text-lg font-bold text-slate-900 dark:text-white tracking-tight">Master Authorization Required</h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                Enter your administrative passcode to configure Prince Parashar's executive profile, manage NFC leads, and review live card telemetry.
              </p>
            </div>

            <form onSubmit={handleLogin} className="w-full max-w-sm space-y-3">
              <div>
                <label className="block text-[11px] font-mono-tech text-slate-600 dark:text-slate-400 text-left mb-1 font-semibold">
                  ADMIN PASSCODE (pass: <span className="text-sky-600 dark:text-cyan-400 font-bold">veer5676</span>)
                </label>
                <div className="relative">
                  <Key className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
                  <input
                    type="password"
                    autoFocus
                    value={passInput}
                    onChange={(e) => setPassInput(e.target.value)}
                    placeholder="Enter passcode (veer5676)"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 focus:border-sky-500 dark:focus:border-cyan-400 text-slate-900 dark:text-white placeholder-slate-400 outline-none font-mono-tech text-sm tracking-wider transition-colors"
                  />
                </div>
              </div>

              {authError && (
                <div className="p-2.5 rounded-lg bg-red-100 dark:bg-red-950/40 border border-red-300 dark:border-red-800/60 text-xs text-red-700 dark:text-red-300 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-red-600 dark:text-red-400 shrink-0" />
                  <span>{authError}</span>
                </div>
              )}

              <button
                type="submit"
                className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-md cursor-pointer"
              >
                <Unlock className="w-4 h-4" />
                <span>Authorize & Enter Dashboard</span>
              </button>

              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => setPassInput('veer5676')}
                  className="text-[11px] font-mono-tech text-sky-600 dark:text-cyan-400/80 hover:underline cursor-pointer font-semibold"
                >
                  Quick autofill: veer5676
                </button>
              </div>
            </form>
          </div>
        ) : (
          /* AUTHENTICATED ADMIN DASHBOARD */
          <div className="flex-1 overflow-y-auto flex flex-col">
            {/* Tab Navigation */}
            <div className="flex items-center justify-between px-5 py-2.5 border-b border-slate-200 dark:border-slate-800 bg-slate-100/70 dark:bg-slate-950/40 shrink-0 overflow-x-auto gap-2">
              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => {
                    playTechClick();
                    setActiveTab('profile');
                  }}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
                    activeTab === 'profile'
                      ? 'bg-white dark:bg-cyan-500/20 text-sky-700 dark:text-cyan-300 border border-slate-300 dark:border-cyan-500/40 shadow-sm'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-slate-200/50 dark:hover:bg-slate-800/50'
                  }`}
                >
                  <User className="w-3.5 h-3.5" />
                  <span>Profile Editor</span>
                </button>

                <button
                  onClick={() => {
                    playTechClick();
                    setActiveTab('performance');
                  }}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
                    activeTab === 'performance'
                      ? 'bg-white dark:bg-cyan-500/20 text-sky-700 dark:text-cyan-300 border border-slate-300 dark:border-cyan-500/40 shadow-sm'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-slate-200/50 dark:hover:bg-slate-800/50'
                  }`}
                >
                  <TrendingUp className="w-3.5 h-3.5" />
                  <span>Company Performance</span>
                </button>

                <button
                  onClick={() => {
                    playTechClick();
                    setActiveTab('leads');
                  }}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
                    activeTab === 'leads'
                      ? 'bg-white dark:bg-cyan-500/20 text-sky-700 dark:text-cyan-300 border border-slate-300 dark:border-cyan-500/40 shadow-sm'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-slate-200/50 dark:hover:bg-slate-800/50'
                  }`}
                >
                  <Users className="w-3.5 h-3.5" />
                  <span>NFC Leads ({leads.length})</span>
                </button>

                <button
                  onClick={() => {
                    playTechClick();
                    setActiveTab('analytics');
                  }}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
                    activeTab === 'analytics'
                      ? 'bg-white dark:bg-cyan-500/20 text-sky-700 dark:text-cyan-300 border border-slate-300 dark:border-cyan-500/40 shadow-sm'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-slate-200/50 dark:hover:bg-slate-800/50'
                  }`}
                >
                  <BarChart3 className="w-3.5 h-3.5" />
                  <span>Telemetry</span>
                </button>

                <button
                  onClick={() => {
                    playTechClick();
                    setActiveTab('security');
                  }}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
                    activeTab === 'security'
                      ? 'bg-white dark:bg-cyan-500/20 text-sky-700 dark:text-cyan-300 border border-slate-300 dark:border-cyan-500/40 shadow-sm'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-slate-200/50 dark:hover:bg-slate-800/50'
                  }`}
                >
                  <Key className="w-3.5 h-3.5" />
                  <span>Security</span>
                </button>
              </div>

              <button
                onClick={() => {
                  playTechClick();
                  logoutAdmin();
                }}
                className="text-[11px] font-mono-tech text-red-600 dark:text-red-400 hover:underline px-2.5 py-1 rounded bg-red-100 dark:bg-red-950/30 border border-red-300 dark:border-red-900/40 transition-colors cursor-pointer shrink-0 font-semibold"
              >
                Logout
              </button>
            </div>

            {/* TAB CONTENT */}
            <div className="p-5 sm:p-6 space-y-6">
              {/* TAB 1: PROFILE EDITOR */}
              {activeTab === 'profile' && (
                <form onSubmit={handleSaveProfile} className="space-y-4">
                  {savedBanner && (
                    <div className="p-3 rounded-xl bg-emerald-100 dark:bg-emerald-950/40 border border-emerald-400 dark:border-emerald-500/50 text-emerald-800 dark:text-emerald-300 text-xs flex items-center gap-2 animate-fade-in font-medium">
                      <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                      <span>Profile changes saved successfully! Live profile and vCard updated.</span>
                    </div>
                  )}

                  {/* Avatar Upload / Change */}
                  <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800 space-y-3">
                    <div className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center justify-between">
                      <span className="flex items-center gap-1.5">
                        <Camera className="w-4 h-4 text-sky-600 dark:text-cyan-400" />
                        Executive Portrait Photo
                      </span>
                      {customAvatar && (
                        <button
                          type="button"
                          onClick={() => {
                            setCustomAvatar(null);
                            setAvatarUrlInput('');
                            playTechClick();
                          }}
                          className="text-[11px] text-red-600 dark:text-red-400 hover:underline font-semibold"
                        >
                          Reset to default portrait
                        </button>
                      )}
                    </div>

                    <div className="flex items-center gap-3">
                      <label className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-xs text-slate-800 dark:text-slate-200 cursor-pointer border border-slate-300 dark:border-slate-700 transition-colors shadow-sm font-medium">
                        <Camera className="w-3.5 h-3.5 text-sky-600 dark:text-cyan-400" />
                        <span>Upload Image File</span>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleAvatarFileUpload}
                          className="hidden"
                        />
                      </label>
                      <span className="text-slate-400 text-xs">or</span>
                      <input
                        type="url"
                        value={avatarUrlInput}
                        onChange={(e) => setAvatarUrlInput(e.target.value)}
                        placeholder="Paste image URL (https://...)"
                        className="flex-1 px-3 py-1.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-800 text-xs text-slate-900 dark:text-white placeholder-slate-400 outline-none focus:border-sky-500 dark:focus:border-cyan-400"
                      />
                    </div>
                  </div>

                  {/* Core Profile Fields */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-mono-tech text-slate-600 dark:text-slate-400 mb-1 font-semibold">Full Name</label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 text-xs text-slate-900 dark:text-white focus:border-sky-500 dark:focus:border-cyan-400 outline-none font-bold"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-mono-tech text-slate-600 dark:text-slate-400 mb-1 font-semibold">Executive Title</label>
                      <input
                        type="text"
                        required
                        value={formData.designation}
                        onChange={(e) => setFormData({ ...formData, designation: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 text-xs text-slate-900 dark:text-white focus:border-sky-500 dark:focus:border-cyan-400 outline-none font-medium"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-mono-tech text-slate-600 dark:text-slate-400 mb-1 font-semibold">Company / Brand</label>
                      <input
                        type="text"
                        required
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 text-xs text-slate-900 dark:text-white focus:border-sky-500 dark:focus:border-cyan-400 outline-none font-medium"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-mono-tech text-slate-600 dark:text-slate-400 mb-1 font-semibold">Headquarters / Location</label>
                      <input
                        type="text"
                        value={formData.location}
                        onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 text-xs text-slate-900 dark:text-white focus:border-sky-500 dark:focus:border-cyan-400 outline-none"
                      />
                    </div>
                  </div>

                  {/* Executive Creed */}
                  <div>
                    <label className="block text-[11px] font-mono-tech text-slate-600 dark:text-slate-400 mb-1 font-semibold">Executive Creed / Quote</label>
                    <input
                      type="text"
                      value={formData.tagline}
                      onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 text-xs text-slate-900 dark:text-white focus:border-sky-500 dark:focus:border-cyan-400 outline-none"
                    />
                  </div>

                  {/* Bio */}
                  <div>
                    <label className="block text-[11px] font-mono-tech text-slate-600 dark:text-slate-400 mb-1 font-semibold">Bio / Executive Mandate</label>
                    <textarea
                      rows={3}
                      value={formData.bio}
                      onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 text-xs text-slate-900 dark:text-white focus:border-sky-500 dark:focus:border-cyan-400 outline-none resize-none leading-relaxed"
                    />
                  </div>

                  {/* Contacts Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-mono-tech text-slate-600 dark:text-slate-400 mb-1 font-semibold">Verified Desk Email</label>
                      <input
                        type="email"
                        required
                        value={formData.verifiedEmail}
                        onChange={(e) => setFormData({ ...formData, verifiedEmail: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 text-xs text-slate-900 dark:text-white focus:border-sky-500 dark:focus:border-cyan-400 outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-mono-tech text-slate-600 dark:text-slate-400 mb-1 font-semibold">Secondary Office Email</label>
                      <input
                        type="email"
                        value={formData.secondaryEmail}
                        onChange={(e) => setFormData({ ...formData, secondaryEmail: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 text-xs text-slate-900 dark:text-white focus:border-sky-500 dark:focus:border-cyan-400 outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-mono-tech text-slate-600 dark:text-slate-400 mb-1 font-semibold">Direct Phone (E.164)</label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 text-xs text-slate-900 dark:text-white focus:border-sky-500 dark:focus:border-cyan-400 outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-mono-tech text-slate-600 dark:text-slate-400 mb-1 font-semibold">Display Phone</label>
                      <input
                        type="text"
                        value={formData.displayPhone}
                        onChange={(e) => setFormData({ ...formData, displayPhone: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 text-xs text-slate-900 dark:text-white focus:border-sky-500 dark:focus:border-cyan-400 outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-mono-tech text-slate-600 dark:text-slate-400 mb-1 font-semibold">LinkedIn Profile URL</label>
                      <input
                        type="url"
                        value={formData.linkedInUrl}
                        onChange={(e) => setFormData({ ...formData, linkedInUrl: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 text-xs text-slate-900 dark:text-white focus:border-sky-500 dark:focus:border-cyan-400 outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-mono-tech text-slate-600 dark:text-slate-400 mb-1 font-semibold">Official Website</label>
                      <input
                        type="url"
                        value={formData.website}
                        onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 text-xs text-slate-900 dark:text-white focus:border-sky-500 dark:focus:border-cyan-400 outline-none"
                      />
                    </div>
                  </div>

                  {/* Save Buttons Bar */}
                  <div className="flex items-center justify-between pt-3 border-t border-slate-200 dark:border-slate-800">
                    <button
                      type="button"
                      onClick={() => {
                        if (confirm('Reset all details to initial Prince Parashar CFO data?')) {
                          resetProfile();
                          setFormData({ ...profile });
                          playTechClick();
                        }
                      }}
                      className="px-3.5 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 text-xs flex items-center gap-1.5 transition-colors cursor-pointer border border-slate-300 dark:border-slate-700 font-medium"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>Reset Defaults</span>
                    </button>

                    <button
                      type="submit"
                      className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-white font-bold text-xs uppercase tracking-wider flex items-center gap-2 transition-all shadow-md cursor-pointer"
                    >
                      <Save className="w-4 h-4" />
                      <span>Save All Changes</span>
                    </button>
                  </div>
                </form>
              )}

              {/* TAB: COMPANY PERFORMANCE (RECHARTS) */}
              {activeTab === 'performance' && (
                <CompanyPerformanceChart />
              )}

              {/* TAB 2: NFC LEADS CRM */}
              {activeTab === 'leads' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                        <span>Captured Contact Inquiries & NFC Handshakes</span>
                        <span className="px-2 py-0.5 rounded-full bg-sky-100 dark:bg-cyan-950 border border-sky-300 dark:border-cyan-800 text-[10px] text-sky-800 dark:text-cyan-300 font-mono-tech font-semibold">
                          {leads.length} Total
                        </span>
                      </h4>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                        Contacts received via NFC Beam simulation and digital exchange cards.
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setShowAddLead(true)}
                        className="px-3 py-1.5 rounded-lg bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-sky-700 dark:text-cyan-300 text-xs font-semibold flex items-center gap-1.5 border border-slate-300 dark:border-slate-700 cursor-pointer shadow-sm"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>Add Lead</span>
                      </button>

                      <button
                        onClick={handleExportCSV}
                        className="px-3 py-1.5 rounded-lg bg-sky-100 dark:bg-cyan-600/20 hover:bg-sky-200 dark:hover:bg-cyan-600/30 text-sky-800 dark:text-cyan-300 text-xs font-semibold flex items-center gap-1.5 border border-sky-300 dark:border-cyan-500/40 cursor-pointer shadow-sm"
                      >
                        <Download className="w-3.5 h-3.5" />
                        <span>Export CSV</span>
                      </button>
                    </div>
                  </div>

                  {/* Manual Lead Form Modal */}
                  {showAddLead && (
                    <form onSubmit={handleAddManualLead} className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950 border border-sky-400/50 dark:border-cyan-500/40 space-y-3 animate-fade-in">
                      <div className="text-xs font-bold text-slate-900 dark:text-white flex items-center justify-between">
                        <span>Add New Executive Meeting Lead</span>
                        <button type="button" onClick={() => setShowAddLead(false)} className="text-slate-400 hover:text-slate-700 dark:hover:text-white">
                          <X className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="grid grid-cols-2 gap-2">
                        <input
                          type="text"
                          required
                          placeholder="Name *"
                          value={newLeadData.name}
                          onChange={(e) => setNewLeadData({ ...newLeadData, name: e.target.value })}
                          className="px-3 py-1.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-800 text-xs text-slate-900 dark:text-white outline-none focus:border-sky-500 dark:focus:border-cyan-400"
                        />
                        <input
                          type="text"
                          placeholder="Company"
                          value={newLeadData.company}
                          onChange={(e) => setNewLeadData({ ...newLeadData, company: e.target.value })}
                          className="px-3 py-1.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-800 text-xs text-slate-900 dark:text-white outline-none focus:border-sky-500 dark:focus:border-cyan-400"
                        />
                        <input
                          type="email"
                          required
                          placeholder="Email *"
                          value={newLeadData.email}
                          onChange={(e) => setNewLeadData({ ...newLeadData, email: e.target.value })}
                          className="px-3 py-1.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-800 text-xs text-slate-900 dark:text-white outline-none focus:border-sky-500 dark:focus:border-cyan-400"
                        />
                        <input
                          type="tel"
                          placeholder="Phone"
                          value={newLeadData.phone}
                          onChange={(e) => setNewLeadData({ ...newLeadData, phone: e.target.value })}
                          className="px-3 py-1.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-800 text-xs text-slate-900 dark:text-white outline-none focus:border-sky-500 dark:focus:border-cyan-400"
                        />
                      </div>

                      <input
                        type="text"
                        placeholder="Discussion Notes"
                        value={newLeadData.notes}
                        onChange={(e) => setNewLeadData({ ...newLeadData, notes: e.target.value })}
                        className="w-full px-3 py-1.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-800 text-xs text-slate-900 dark:text-white outline-none focus:border-sky-500 dark:focus:border-cyan-400"
                      />

                      <div className="flex justify-end gap-2">
                        <button
                          type="button"
                          onClick={() => setShowAddLead(false)}
                          className="px-3 py-1 rounded-lg text-xs text-slate-500 hover:text-slate-800"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className="px-4 py-1.5 rounded-lg bg-sky-600 text-white font-bold text-xs"
                        >
                          Save Lead
                        </button>
                      </div>
                    </form>
                  )}

                  {/* Leads List */}
                  {leads.length === 0 ? (
                    <div className="py-12 text-center text-slate-500 font-mono-tech text-xs bg-slate-50 dark:bg-slate-950/60 rounded-xl border border-slate-200 dark:border-slate-800">
                      No leads captured yet. Visitors who exchange contact via NFC Beam will appear here.
                    </div>
                  ) : (
                    <div className="space-y-2">
                      {leads.map((lead) => (
                        <div
                          key={lead.id}
                          className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800 hover:border-sky-400/40 dark:hover:border-cyan-500/30 transition-colors flex items-start justify-between gap-3 shadow-sm"
                        >
                          <div className="space-y-1">
                            <div className="flex items-center gap-2">
                              <span className="text-sm font-bold text-slate-900 dark:text-white">{lead.name}</span>
                              <span className="text-slate-300 dark:text-slate-600">·</span>
                              <span className="text-xs text-sky-600 dark:text-cyan-400 font-semibold">{lead.company}</span>
                              <span className="text-[10px] text-slate-500 font-mono-tech ml-2">{lead.timestamp}</span>
                            </div>

                            <div className="flex flex-wrap items-center gap-3 text-xs text-slate-600 dark:text-slate-300">
                              <a href={`mailto:${lead.email}`} className="flex items-center gap-1 hover:text-sky-600 dark:hover:text-cyan-300">
                                <Mail className="w-3 h-3 text-slate-400" />
                                <span>{lead.email}</span>
                              </a>
                              {lead.phone && lead.phone !== 'N/A' && (
                                <a href={`tel:${lead.phone}`} className="flex items-center gap-1 hover:text-sky-600 dark:hover:text-cyan-300">
                                  <Phone className="w-3 h-3 text-slate-400" />
                                  <span>{lead.phone}</span>
                                </a>
                              )}
                            </div>

                            {lead.notes && (
                              <p className="text-[11px] text-slate-500 dark:text-slate-400 italic pt-0.5">
                                "{lead.notes}"
                              </p>
                            )}
                          </div>

                          <button
                            onClick={() => {
                              deleteLead(lead.id);
                              playTechClick();
                            }}
                            className="p-1.5 text-slate-400 hover:text-red-500 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-900 transition-colors cursor-pointer"
                            title="Delete lead"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      ))}

                      <div className="pt-2 flex justify-between items-center text-xs text-slate-500">
                        <span>Showing {leads.length} recorded leads</span>
                        <button
                          onClick={() => {
                            if (confirm('Clear all stored leads?')) {
                              clearLeads();
                              playTechClick();
                            }
                          }}
                          className="text-red-600 dark:text-red-400 hover:underline text-[11px] font-semibold cursor-pointer"
                        >
                          Clear all leads
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* TAB 3: TELEMETRY & ANALYTICS */}
              {activeTab === 'analytics' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-bold text-slate-900 dark:text-white">Live Profile Telemetry</h4>
                      <p className="text-xs text-slate-500 dark:text-slate-400">
                        Engagement metrics for Prince Parashar's 2035 digital identity card.
                      </p>
                    </div>

                    <button
                      onClick={() => {
                        if (confirm('Reset all counters?')) {
                          resetAnalytics();
                          playTechClick();
                        }
                      }}
                      className="px-3 py-1 rounded bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 text-xs border border-slate-300 dark:border-slate-700 cursor-pointer font-medium"
                    >
                      Reset Counters
                    </button>
                  </div>

                  {/* Telemetry Stats Grid */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 shadow-sm">
                      <span className="text-[10px] text-slate-500 block uppercase font-mono-tech">Card Impressions</span>
                      <span className="text-xl font-bold text-sky-600 dark:text-cyan-400 mt-0.5 block">{analytics.impressions}</span>
                    </div>

                    <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 shadow-sm">
                      <span className="text-[10px] text-slate-500 block uppercase font-mono-tech">vCard Downloads</span>
                      <span className="text-xl font-bold text-emerald-600 dark:text-emerald-400 mt-0.5 block">{analytics.vcardDownloads}</span>
                    </div>

                    <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 shadow-sm">
                      <span className="text-[10px] text-slate-500 block uppercase font-mono-tech">QR Scans</span>
                      <span className="text-xl font-bold text-blue-600 dark:text-blue-400 mt-0.5 block">{analytics.qrScans}</span>
                    </div>

                    <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 shadow-sm">
                      <span className="text-[10px] text-slate-500 block uppercase font-mono-tech">NFC Beam Exchanges</span>
                      <span className="text-xl font-bold text-purple-600 dark:text-purple-400 mt-0.5 block">{analytics.nfcTaps}</span>
                    </div>

                    <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 shadow-sm">
                      <span className="text-[10px] text-slate-500 block uppercase font-mono-tech">Direct Calls</span>
                      <span className="text-xl font-bold text-slate-900 dark:text-white mt-0.5 block">{analytics.callsClicked}</span>
                    </div>

                    <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 shadow-sm">
                      <span className="text-[10px] text-slate-500 block uppercase font-mono-tech">Email Inquiries</span>
                      <span className="text-xl font-bold text-slate-900 dark:text-white mt-0.5 block">{analytics.emailsClicked}</span>
                    </div>

                    <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 shadow-sm">
                      <span className="text-[10px] text-slate-500 block uppercase font-mono-tech">LinkedIn Visits</span>
                      <span className="text-xl font-bold text-slate-900 dark:text-white mt-0.5 block">{analytics.linkedinClicks}</span>
                    </div>

                    <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 shadow-sm">
                      <span className="text-[10px] text-slate-500 block uppercase font-mono-tech">TapMate.in Clicks</span>
                      <span className="text-xl font-bold text-slate-900 dark:text-white mt-0.5 block">{analytics.websiteClicks}</span>
                    </div>
                  </div>

                  {/* Calculated KPI Highlights */}
                  <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800/80 font-mono-tech text-xs space-y-2">
                    <div className="text-sky-700 dark:text-cyan-400 font-bold text-[11px] uppercase tracking-wide">Executive Conversion Indices:</div>
                    <div className="flex justify-between text-slate-700 dark:text-slate-300">
                      <span>Contact Save Conversion Rate:</span>
                      <span className="text-emerald-600 dark:text-emerald-400 font-bold">
                        {((analytics.vcardDownloads / Math.max(analytics.impressions, 1)) * 100).toFixed(1)}%
                      </span>
                    </div>
                    <div className="flex justify-between text-slate-700 dark:text-slate-300">
                      <span>NFC & QR Handshake Ratio:</span>
                      <span className="text-sky-700 dark:text-cyan-300 font-bold">
                        {(((analytics.nfcTaps + analytics.qrScans) / Math.max(analytics.impressions, 1)) * 100).toFixed(1)}%
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 4: SECURITY & BACKUP */}
              {activeTab === 'security' && (
                <div className="space-y-4">
                  <div>
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white">Security & Master Access</h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      Manage administrator access passcode and system backups.
                    </p>
                  </div>

                  {/* Change Passcode */}
                  <form onSubmit={handleUpdatePassword} className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-3 shadow-sm">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                        <Key className="w-4 h-4 text-sky-600 dark:text-cyan-400" />
                        Admin Passcode Configuration
                      </span>
                      <span className="text-[10px] font-mono-tech text-slate-500">
                        Current: <strong className="text-sky-600 dark:text-cyan-400">{adminPassword}</strong>
                      </span>
                    </div>

                    <div className="flex gap-2">
                      <input
                        type="password"
                        value={newPassInput}
                        onChange={(e) => setNewPassInput(e.target.value)}
                        placeholder="Enter new master passcode"
                        className="flex-1 px-3 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-800 text-xs text-slate-900 dark:text-white outline-none focus:border-sky-500 dark:focus:border-cyan-400 font-mono-tech"
                      />
                      <button
                        type="submit"
                        className="px-4 py-2 rounded-xl bg-slate-800 dark:bg-slate-800 hover:bg-slate-700 text-white dark:text-cyan-300 text-xs font-semibold border border-slate-700 cursor-pointer shadow-sm"
                      >
                        Update Key
                      </button>
                    </div>

                    {passUpdated && (
                      <p className="text-xs text-emerald-600 dark:text-emerald-400 flex items-center gap-1 font-mono-tech font-medium">
                        <Check className="w-3.5 h-3.5" />
                        Master passcode updated successfully!
                      </p>
                    )}
                  </form>

                  {/* System Backup */}
                  <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 flex items-center justify-between shadow-sm">
                    <div>
                      <h5 className="text-xs font-bold text-slate-900 dark:text-white">Full JSON System Backup</h5>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400">Export all profile settings, leads, and analytics as a JSON snapshot.</p>
                    </div>

                    <button
                      onClick={handleExportBackup}
                      className="px-3.5 py-2 rounded-xl bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 text-xs flex items-center gap-1.5 cursor-pointer border border-slate-300 dark:border-slate-700 shadow-sm font-medium"
                    >
                      <Download className="w-3.5 h-3.5 text-sky-600 dark:text-cyan-400" />
                      <span>Download JSON</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
