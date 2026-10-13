import React, { useState } from 'react';
import { Lock, Sun, Moon } from 'lucide-react';
import { ProfileProvider, useProfile } from './context/ProfileContext';
import { ParticlesBackground } from './components/ParticlesBackground';
import { HeroSection } from './components/HeroSection';
import { ContactActions } from './components/ContactActions';
import { StrategySection } from './components/StrategySection';
import { TapMateShowcase } from './components/TapMateShowcase';
import { ExecutiveFooter } from './components/ExecutiveFooter';
import { QRCodeModal } from './components/QRCodeModal';
import { NfcTapModal } from './components/NfcTapModal';
import { WalletPassModal } from './components/WalletPassModal';
import { AdminPanelModal } from './components/AdminPanelModal';
import { playTechClick } from './utils/audio';

function ProfileApp() {
  const { setIsAdminOpen, isAdminAuthenticated, theme, toggleTheme } = useProfile();
  const [isQrOpen, setIsQrOpen] = useState(false);
  const [isNfcOpen, setIsNfcOpen] = useState(false);
  const [isWalletOpen, setIsWalletOpen] = useState(false);
  const [soundActive, setSoundActive] = useState(true);

  const toggleSound = () => {
    setSoundActive((prev) => !prev);
  };

  const handleFloatingThemeToggle = () => {
    playTechClick();
    toggleTheme();
  };

  return (
    <div className="relative min-h-screen bg-[#f8fafc] text-slate-900 dark:bg-[#02050c] dark:text-slate-100 flex flex-col items-center justify-start overflow-x-hidden selection:bg-cyan-500/30 selection:text-cyan-900 dark:selection:text-cyan-200 transition-colors duration-300">
      {/* Background Ambience Layers */}
      <div className="fixed inset-0 tech-grid-pattern pointer-events-none opacity-50 dark:opacity-40 z-0" />
      <div className="fixed inset-0 radial-halo pointer-events-none z-0" />
      
      {/* Animated Light Trails and Constellation Canvas */}
      <ParticlesBackground />

      {/* Futuristic Floating Ambient Glow Orbs */}
      <div className="fixed top-[-10%] left-[20%] w-[500px] h-[500px] bg-sky-400/15 dark:bg-cyan-600/10 rounded-full blur-[140px] pointer-events-none z-0" />
      <div className="fixed bottom-[-10%] right-[15%] w-[600px] h-[600px] bg-indigo-400/10 dark:bg-indigo-600/10 rounded-full blur-[150px] pointer-events-none z-0" />

      {/* Floating Top-Right Theme Toggle Button */}
      <div className="fixed top-3.5 right-3.5 sm:top-5 sm:right-5 z-40">
        <button
          onClick={handleFloatingThemeToggle}
          className="group flex items-center gap-2 py-2 px-3 sm:px-3.5 rounded-full bg-white/90 dark:bg-slate-900/90 hover:bg-white dark:hover:bg-slate-800 border border-slate-300/90 dark:border-cyan-500/40 hover:border-sky-500 dark:hover:border-cyan-400 text-slate-800 dark:text-slate-200 hover:text-sky-600 dark:hover:text-cyan-300 shadow-lg backdrop-blur-md transition-all cursor-pointer hover:scale-105 active:scale-95"
          title={`Switch to ${theme === 'light' ? 'Dark' : 'Light'} Mode (saved to local storage)`}
          aria-label="Toggle light and dark theme"
        >
          <div className="relative flex items-center justify-center">
            {theme === 'light' ? (
              <Sun className="w-4 h-4 text-amber-500 transition-transform duration-300 group-hover:rotate-45" />
            ) : (
              <Moon className="w-4 h-4 text-cyan-400 transition-transform duration-300 group-hover:-rotate-12" />
            )}
          </div>
          <span className="font-mono-tech text-[11px] font-semibold tracking-wide">
            {theme === 'light' ? 'LIGHT' : 'DARK'}
          </span>
        </button>
      </div>

      {/* Main Container */}
      <main className="relative z-10 w-full max-w-2xl px-3 sm:px-6 py-6 md:py-10 flex flex-col items-center">
        {/* Hero Section */}
        <HeroSection
          soundEnabled={soundActive}
          onToggleSound={toggleSound}
        />

        {/* Contact Action Center */}
        <section className="w-full mt-4 px-2 sm:px-4">
          <ContactActions
            onOpenQR={() => setIsQrOpen(true)}
            onOpenNfc={() => setIsNfcOpen(true)}
            onOpenWallet={() => setIsWalletOpen(true)}
          />
        </section>

        {/* Financial Strategy & Executive Mandate */}
        <StrategySection />

        {/* TapMate.in Brand & Product Ecosystem */}
        <TapMateShowcase />

        {/* Executive Minimal Footer */}
        <ExecutiveFooter />
      </main>

      {/* Floating Bottom-Right Admin Launcher */}
      <div className="fixed bottom-4 right-4 z-40">
        <button
          onClick={() => {
            playTechClick();
            setIsAdminOpen(true);
          }}
          className="group flex items-center gap-2 py-2 px-3.5 rounded-full bg-white/95 dark:bg-slate-900/90 hover:bg-white dark:hover:bg-slate-800 border border-slate-300/90 dark:border-cyan-500/40 hover:border-sky-500 dark:hover:border-cyan-400 text-slate-800 dark:text-slate-300 hover:text-sky-600 dark:hover:text-cyan-300 shadow-lg backdrop-blur-md transition-all cursor-pointer hover:scale-105"
          title="Open Admin Panel (pass: veer5676)"
        >
          <div className="relative">
            <Lock className="w-3.5 h-3.5 text-sky-600 dark:text-cyan-400" />
            {isAdminAuthenticated && (
              <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
            )}
          </div>
          <span className="font-mono-tech text-[11px] font-semibold tracking-wide">
            {isAdminAuthenticated ? 'Admin Console' : 'Admin (veer5676)'}
          </span>
        </button>
      </div>

      {/* Interactive Modals */}
      <QRCodeModal
        isOpen={isQrOpen}
        onClose={() => setIsQrOpen(false)}
      />

      <NfcTapModal
        isOpen={isNfcOpen}
        onClose={() => setIsNfcOpen(false)}
      />

      <WalletPassModal
        isOpen={isWalletOpen}
        onClose={() => setIsWalletOpen(false)}
      />

      <AdminPanelModal />
    </div>
  );
}

export default function App() {
  return (
    <ProfileProvider>
      <ProfileApp />
    </ProfileProvider>
  );
}
