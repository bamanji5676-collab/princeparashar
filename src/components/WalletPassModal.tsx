import React, { useState } from 'react';
import { X, Wallet, Check, Smartphone } from 'lucide-react';
import { useProfile } from '../context/ProfileContext';
import { downloadVCard } from '../utils/vcard';
import { playTechClick, playSuccessChime } from '../utils/audio';

interface WalletPassModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const WalletPassModal: React.FC<WalletPassModalProps> = ({ isOpen, onClose }) => {
  const { profile, trackEvent } = useProfile();
  const [downloaded, setDownloaded] = useState(false);

  if (!isOpen) return null;

  const handleDownloadWallet = () => {
    playSuccessChime();
    trackEvent('vcardDownloads');
    downloadVCard(profile);
    setDownloaded(true);
    setTimeout(() => setDownloaded(false), 3000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 dark:bg-slate-950/80 backdrop-blur-md animate-fade-in">
      <div 
        className="relative w-full max-w-sm rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-cyan-500/30 p-6 shadow-2xl text-left overflow-hidden text-slate-800 dark:text-white"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Glow Header Accent */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-sky-400 to-indigo-500" />

        {/* Close Button */}
        <button
          onClick={() => {
            playTechClick();
            onClose();
          }}
          className="absolute top-4 right-4 p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-2 mb-1">
          <Wallet className="w-5 h-5 text-sky-600 dark:text-cyan-400" />
          <h3 className="text-base font-bold text-slate-900 dark:text-white tracking-tight">Mobile Wallet Card</h3>
        </div>
        <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">
          Apple Wallet & Google Wallet executive pass preview
        </p>

        {/* Interactive Wallet Card Mockup */}
        <div className="relative w-full rounded-2xl bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 border border-sky-500/40 dark:border-cyan-500/40 p-5 shadow-[0_12px_36px_rgba(0,0,0,0.6)] overflow-hidden text-white">
          {/* Holographic light streak across card */}
          <div className="absolute -top-12 -left-12 w-40 h-40 bg-sky-400/10 rounded-full blur-2xl pointer-events-none" />

          {/* Top Brand Bar */}
          <div className="flex items-center justify-between pb-3 border-b border-slate-800/80">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-md bg-cyan-500/20 border border-cyan-400/40 flex items-center justify-center text-cyan-300 font-bold text-[10px]">
                TM
              </div>
              <span className="font-mono-tech text-xs font-bold text-white tracking-widest uppercase">
                {profile.company}
              </span>
            </div>
            <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-cyan-500/10 border border-cyan-400/30 text-[10px] text-cyan-300 font-mono-tech">
              EXECUTIVE PASS
            </div>
          </div>

          {/* Card Body */}
          <div className="py-4">
            <div className="text-[10px] uppercase tracking-wider text-slate-400 font-mono-tech">
              {profile.designation}
            </div>
            <div className="text-lg font-bold text-white tracking-tight text-gradient-cyan mt-0.5">
              {profile.name}
            </div>
            <div className="text-xs text-slate-300 mt-1 flex items-center gap-1.5">
              <span>{profile.company} · {profile.location}</span>
            </div>

            {/* Quick Details Grid */}
            <div className="grid grid-cols-2 gap-3 mt-4 pt-3 border-t border-slate-800/60 font-mono-tech text-[10px]">
              <div>
                <span className="text-slate-500 block uppercase">SECURE DESK</span>
                <span className="text-slate-200 truncate block">{profile.verifiedEmail}</span>
              </div>
              <div>
                <span className="text-slate-500 block uppercase">NFC CHIP ID</span>
                <span className="text-cyan-400 block">{profile.executiveHash.substring(0, 11)}</span>
              </div>
            </div>
          </div>

          {/* Card Footer Barcode & Contactless Icon */}
          <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between">
            <div className="flex items-center gap-1.5 text-[11px] text-slate-400">
              <div className="flex gap-0.5 h-4 items-center">
                <span className="w-0.5 h-full bg-slate-300" />
                <span className="w-1 h-full bg-slate-400" />
                <span className="w-0.5 h-full bg-slate-300" />
                <span className="w-1.5 h-full bg-slate-400" />
                <span className="w-0.5 h-full bg-slate-300" />
                <span className="w-1.5 h-full bg-slate-400" />
                <span className="w-0.5 h-full bg-slate-300" />
              </div>
              <span className="font-mono-tech text-[9px] text-slate-500">2035 AUTH PKPASS</span>
            </div>

            <div className="flex items-center gap-1 text-[10px] text-cyan-400 font-mono-tech">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
              <span>NFC READY</span>
            </div>
          </div>
        </div>

        {/* Add to Wallet CTA */}
        <div className="mt-5 space-y-2.5">
          <button
            onClick={handleDownloadWallet}
            className="w-full py-3 px-4 rounded-xl bg-slate-900 dark:bg-slate-100 hover:bg-slate-800 dark:hover:bg-white text-white dark:text-slate-950 font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-md cursor-pointer"
          >
            {downloaded ? (
              <>
                <Check className="w-4 h-4 text-emerald-400 stroke-[3]" />
                <span>Pass Downloaded (.vcf / wallet format)</span>
              </>
            ) : (
              <>
                <Smartphone className="w-4 h-4 text-white dark:text-slate-950" />
                <span>Add to Apple / Google Wallet</span>
              </>
            )}
          </button>

          <p className="text-[11px] text-center text-slate-500 dark:text-slate-400 leading-relaxed">
            Downloads the executive digital card pass configured for iOS Apple Wallet and Android Contacts integration.
          </p>
        </div>
      </div>
    </div>
  );
};
