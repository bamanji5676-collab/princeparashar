import React, { useState } from 'react';
import { 
  UserPlus, 
  PhoneCall, 
  Mail, 
  Linkedin, 
  ExternalLink, 
  QrCode, 
  Radio, 
  Wallet, 
  Check, 
  Copy, 
  Share2, 
  Sparkles,
  ArrowUpRight
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useProfile } from '../context/ProfileContext';
import { downloadVCard } from '../utils/vcard';
import { playTechClick, playSuccessChime, playNfcBeam } from '../utils/audio';

interface ContactActionsProps {
  onOpenQR: () => void;
  onOpenNfc: () => void;
  onOpenWallet: () => void;
}

export const ContactActions: React.FC<ContactActionsProps> = ({
  onOpenQR,
  onOpenNfc,
  onOpenWallet,
}) => {
  const { profile, trackEvent } = useProfile();
  const [copiedType, setCopiedType] = useState<string | null>(null);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSaveContact = () => {
    playSuccessChime();
    trackEvent('vcardDownloads');
    downloadVCard(profile);
    setSavedSuccess(true);

    try {
      confetti({
        particleCount: 45,
        spread: 60,
        origin: { y: 0.75 },
        colors: ['#0284c7', '#38bdf8', '#6366f1', '#a855f7'],
        disableForReducedMotion: true,
      });
    } catch {
      // fallback
    }

    setTimeout(() => {
      setSavedSuccess(false);
    }, 3500);
  };

  const handleCopy = (text: string, type: string) => {
    playTechClick();
    navigator.clipboard.writeText(text);
    setCopiedType(type);
    setTimeout(() => setCopiedType(null), 2000);
  };

  const handleNativeShare = async () => {
    playTechClick();
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${profile.name} | ${profile.designation} TapMate.in`,
          text: `${profile.name} - ${profile.designation} at ${profile.company}. ${profile.tagline}`,
          url: window.location.href,
        });
      } catch {
        // User cancelled or not supported
      }
    } else {
      handleCopy(window.location.href, 'profile-link');
    }
  };

  return (
    <div className="w-full max-w-xl mx-auto space-y-3.5">
      {/* Primary Hero Action: Save Contact */}
      <div className="relative group">
        <div className="absolute -inset-0.5 bg-gradient-to-r from-sky-400 via-blue-500 to-indigo-500 rounded-2xl blur-md opacity-60 group-hover:opacity-100 transition duration-300" />
        <button
          onClick={handleSaveContact}
          className="relative w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-sky-500 via-blue-600 to-cyan-500 hover:from-sky-400 hover:via-blue-500 hover:to-cyan-400 text-white font-bold text-base md:text-lg flex items-center justify-center gap-3 transition-all duration-200 active:scale-[0.99] shadow-[0_4px_24px_rgba(2,132,199,0.35)] cursor-pointer"
        >
          {savedSuccess ? (
            <>
              <Check className="w-5 h-5 text-white stroke-[3]" />
              <span className="font-semibold tracking-wide">Contact Saved to Device (.vcf)</span>
            </>
          ) : (
            <>
              <UserPlus className="w-5 h-5 text-white stroke-[2.5]" />
              <span className="font-semibold tracking-wide">Save Contact to Address Book</span>
              <Sparkles className="w-4 h-4 text-white/80" />
            </>
          )}
        </button>
      </div>

      {/* Direct Call & Email Dual Action Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
        {/* Call Button */}
        <div className="flex rounded-xl bg-white/90 dark:bg-slate-900/80 border border-slate-300/80 dark:border-slate-800 hover:border-sky-500/50 dark:hover:border-cyan-500/40 transition-colors p-1 backdrop-blur-md shadow-sm">
          <a
            href={`tel:${profile.phone}`}
            onClick={() => {
              playTechClick();
              trackEvent('callsClicked');
            }}
            className="flex-1 flex items-center justify-center gap-2.5 py-3 px-3.5 text-sm font-semibold text-slate-800 dark:text-slate-200 hover:text-sky-600 dark:hover:text-cyan-300 transition-colors"
          >
            <PhoneCall className="w-4 h-4 text-sky-600 dark:text-cyan-400" />
            <span>Call Direct</span>
          </a>
          <button
            onClick={() => handleCopy(profile.displayPhone, 'phone')}
            title="Copy Direct Phone Number"
            className="px-3 border-l border-slate-200 dark:border-slate-800 hover:text-sky-600 dark:hover:text-cyan-300 text-slate-500 dark:text-slate-400 transition-colors flex items-center cursor-pointer"
          >
            {copiedType === 'phone' ? (
              <Check className="w-4 h-4 text-emerald-600 dark:text-cyan-400" />
            ) : (
              <Copy className="w-4 h-4" />
            )}
          </button>
        </div>

        {/* Email Button */}
        <div className="flex rounded-xl bg-white/90 dark:bg-slate-900/80 border border-slate-300/80 dark:border-slate-800 hover:border-sky-500/50 dark:hover:border-cyan-500/40 transition-colors p-1 backdrop-blur-md shadow-sm">
          <a
            href={`mailto:${profile.verifiedEmail}?subject=Strategic%20Inquiry%20%7C%20TapMate.in`}
            onClick={() => {
              playTechClick();
              trackEvent('emailsClicked');
            }}
            className="flex-1 flex items-center justify-center gap-2.5 py-3 px-3.5 text-sm font-semibold text-slate-800 dark:text-slate-200 hover:text-sky-600 dark:hover:text-cyan-300 transition-colors"
          >
            <Mail className="w-4 h-4 text-sky-600 dark:text-cyan-400" />
            <span>Email Office</span>
          </a>
          <button
            onClick={() => handleCopy(profile.verifiedEmail, 'email')}
            title="Copy Verified Email"
            className="px-3 border-l border-slate-200 dark:border-slate-800 hover:text-sky-600 dark:hover:text-cyan-300 text-slate-500 dark:text-slate-400 transition-colors flex items-center cursor-pointer"
          >
            {copiedType === 'email' ? (
              <Check className="w-4 h-4 text-emerald-600 dark:text-cyan-400" />
            ) : (
              <Copy className="w-4 h-4" />
            )}
          </button>
        </div>
      </div>

      {/* Secondary Row: LinkedIn & TapMate Portal */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
        {/* LinkedIn Connection */}
        <a
          href={profile.linkedInUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => {
            playTechClick();
            trackEvent('linkedinClicks');
          }}
          className="group flex items-center justify-between py-3 px-4 rounded-xl bg-white/80 dark:bg-slate-900/60 border border-slate-300/80 dark:border-slate-800 hover:border-blue-500/50 hover:bg-slate-50 dark:hover:bg-slate-900 transition-all text-sm font-medium text-slate-800 dark:text-slate-200 shadow-sm"
        >
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-blue-100 dark:bg-blue-600/20 border border-blue-300 dark:border-blue-500/30 flex items-center justify-center text-blue-600 dark:text-blue-400">
              <Linkedin className="w-4 h-4" />
            </div>
            <span>Connect on LinkedIn</span>
          </div>
          <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-blue-500 transition-colors" />
        </a>

        {/* Visit TapMate.in */}
        <a
          href={profile.website}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => {
            playTechClick();
            trackEvent('websiteClicks');
          }}
          className="group flex items-center justify-between py-3 px-4 rounded-xl bg-white/80 dark:bg-slate-900/60 border border-slate-300/80 dark:border-slate-800 hover:border-sky-500/50 hover:bg-slate-50 dark:hover:bg-slate-900 transition-all text-sm font-medium text-slate-800 dark:text-slate-200 shadow-sm"
        >
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-sky-100 dark:bg-cyan-600/20 border border-sky-300 dark:border-cyan-500/30 flex items-center justify-center text-sky-600 dark:text-cyan-400">
              <span className="font-bold text-xs tracking-tighter">TM</span>
            </div>
            <span>Visit TapMate.in</span>
          </div>
          <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-sky-600 dark:group-hover:text-cyan-400 transition-colors" />
        </a>
      </div>

      {/* Feature Tray: QR Code | One-Tap NFC Beam | Mobile Wallet */}
      <div className="pt-1 grid grid-cols-3 gap-2">
        {/* QR Code Action */}
        <button
          onClick={() => {
            playTechClick();
            onOpenQR();
          }}
          className="flex flex-col items-center justify-center py-3 px-2 rounded-xl bg-white/80 dark:bg-slate-900/50 border border-slate-300/80 dark:border-slate-800/90 hover:border-sky-500/50 dark:hover:border-cyan-500/40 hover:bg-slate-50 dark:hover:bg-slate-800/40 text-slate-700 dark:text-slate-300 hover:text-sky-600 dark:hover:text-cyan-300 transition-all cursor-pointer group shadow-sm"
        >
          <QrCode className="w-5 h-5 text-sky-600 dark:text-cyan-400 group-hover:scale-110 transition-transform mb-1.5" />
          <span className="text-[11px] font-semibold tracking-tight">QR Profile</span>
          <span className="text-[9px] font-mono-tech text-slate-500">Scan & Share</span>
        </button>

        {/* NFC Tap To Exchange */}
        <button
          onClick={() => {
            playNfcBeam();
            onOpenNfc();
          }}
          className="flex flex-col items-center justify-center py-3 px-2 rounded-xl bg-white/80 dark:bg-slate-900/50 border border-slate-300/80 dark:border-slate-800/90 hover:border-sky-500/50 dark:hover:border-cyan-500/40 hover:bg-slate-50 dark:hover:bg-slate-800/40 text-slate-700 dark:text-slate-300 hover:text-sky-600 dark:hover:text-cyan-300 transition-all cursor-pointer group relative overflow-hidden shadow-sm"
        >
          <div className="absolute top-1 right-1.5 w-1.5 h-1.5 rounded-full bg-sky-500 dark:bg-cyan-400 animate-ping" />
          <Radio className="w-5 h-5 text-sky-600 dark:text-cyan-400 group-hover:scale-110 transition-transform mb-1.5" />
          <span className="text-[11px] font-semibold tracking-tight">NFC Beam</span>
          <span className="text-[9px] font-mono-tech text-sky-600 dark:text-cyan-400/80">Tap to Exchange</span>
        </button>

        {/* Mobile Wallet Pass */}
        <button
          onClick={() => {
            playTechClick();
            onOpenWallet();
          }}
          className="flex flex-col items-center justify-center py-3 px-2 rounded-xl bg-white/80 dark:bg-slate-900/50 border border-slate-300/80 dark:border-slate-800/90 hover:border-sky-500/50 dark:hover:border-cyan-500/40 hover:bg-slate-50 dark:hover:bg-slate-800/40 text-slate-700 dark:text-slate-300 hover:text-sky-600 dark:hover:text-cyan-300 transition-all cursor-pointer group shadow-sm"
        >
          <Wallet className="w-5 h-5 text-sky-600 dark:text-cyan-400 group-hover:scale-110 transition-transform mb-1.5" />
          <span className="text-[11px] font-semibold tracking-tight">Mobile Wallet</span>
          <span className="text-[9px] font-mono-tech text-slate-500">Apple & Google</span>
        </button>
      </div>

      {/* Copy / Share Quick Link Bar */}
      <div className="flex items-center justify-between px-3 py-2 rounded-lg bg-slate-100/90 dark:bg-slate-950/60 border border-slate-300/70 dark:border-slate-800/60 text-xs text-slate-600 dark:text-slate-400 shadow-sm">
        <div className="flex items-center gap-2 truncate">
          <span className="w-2 h-2 rounded-full bg-emerald-500" />
          <span className="truncate font-mono-tech text-[11px] text-slate-700 dark:text-slate-400">
            tapmate.in/cfo/prince-parashar
          </span>
        </div>
        <div className="flex items-center gap-1 shrink-0">
          <button
            onClick={() => handleCopy(window.location.href, 'url')}
            className="p-1.5 rounded hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-sky-600 dark:hover:text-cyan-300 transition-colors cursor-pointer"
            title="Copy direct profile link"
          >
            {copiedType === 'url' ? (
              <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-cyan-400" />
            ) : (
              <Copy className="w-3.5 h-3.5" />
            )}
          </button>
          <button
            onClick={handleNativeShare}
            className="p-1.5 rounded hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-sky-600 dark:hover:text-cyan-300 transition-colors cursor-pointer"
            title="Share via device menu"
          >
            <Share2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
