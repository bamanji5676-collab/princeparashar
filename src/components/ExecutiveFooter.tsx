import React, { useState, useEffect } from 'react';
import { 
  Linkedin, 
  Twitter, 
  MessageCircle, 
  Globe, 
  Mail, 
  ArrowUp, 
  Clock, 
  Lock,
  Unlock,
} from 'lucide-react';
import { useProfile } from '../context/ProfileContext';
import { playTechClick } from '../utils/audio';

export const ExecutiveFooter: React.FC = () => {
  const { profile, setIsAdminOpen, isAdminAuthenticated } = useProfile();
  const [currentTime, setCurrentTime] = useState<string>('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(
        now.toLocaleTimeString('en-IN', {
          timeZone: 'Asia/Kolkata',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: false,
        })
      );
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const scrollToTop = () => {
    playTechClick();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="w-full max-w-xl mx-auto mt-12 pb-12 px-4 text-center space-y-6">
      {/* Social Links Row */}
      <div className="flex items-center justify-center gap-3">
        <a
          href={profile.linkedInUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => playTechClick()}
          title="Connect on LinkedIn"
          className="w-10 h-10 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-blue-500/50 hover:text-blue-600 dark:hover:text-blue-400 text-slate-700 dark:text-slate-400 flex items-center justify-center transition-all hover:scale-105 shadow-sm"
        >
          <Linkedin className="w-4 h-4" />
        </a>

        <a
          href={profile.twitterUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => playTechClick()}
          title="Follow on X / Twitter"
          className="w-10 h-10 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-sky-500/50 hover:text-sky-600 dark:hover:text-cyan-400 text-slate-700 dark:text-slate-400 flex items-center justify-center transition-all hover:scale-105 shadow-sm"
        >
          <Twitter className="w-4 h-4" />
        </a>

        <a
          href={profile.whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => playTechClick()}
          title="Chat on WhatsApp"
          className="w-10 h-10 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-emerald-500/50 hover:text-emerald-600 dark:hover:text-emerald-400 text-slate-700 dark:text-slate-400 flex items-center justify-center transition-all hover:scale-105 shadow-sm"
        >
          <MessageCircle className="w-4 h-4" />
        </a>

        <a
          href={`mailto:${profile.verifiedEmail}`}
          onClick={() => playTechClick()}
          title="Email Direct"
          className="w-10 h-10 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-sky-500/50 hover:text-sky-600 dark:hover:text-cyan-400 text-slate-700 dark:text-slate-400 flex items-center justify-center transition-all hover:scale-105 shadow-sm"
        >
          <Mail className="w-4 h-4" />
        </a>

        <a
          href={profile.website}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => playTechClick()}
          title={`Visit ${profile.company}`}
          className="w-10 h-10 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-sky-500/50 hover:text-sky-600 dark:hover:text-cyan-400 text-slate-700 dark:text-slate-400 flex items-center justify-center transition-all hover:scale-105 shadow-sm"
        >
          <Globe className="w-4 h-4" />
        </a>
      </div>

      {/* Security & Clock HUD Pill */}
      <div className="p-3 rounded-xl bg-slate-100 dark:bg-slate-950/70 border border-slate-200 dark:border-slate-800/80 font-mono-tech text-[11px] text-slate-600 dark:text-slate-400 space-y-1.5 shadow-sm">
        <div className="flex items-center justify-between px-1">
          <div className="flex items-center gap-1.5 text-sky-600 dark:text-cyan-400 font-semibold">
            <Clock className="w-3.5 h-3.5" />
            <span>IST {currentTime || '00:00:00'} (UTC+05:30)</span>
          </div>

          <button
            onClick={() => {
              playTechClick();
              setIsAdminOpen(true);
            }}
            className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 hover:text-sky-600 dark:hover:text-cyan-300 transition-colors cursor-pointer"
            title="Open Admin Gateway (pass: veer5676)"
          >
            {isAdminAuthenticated ? (
              <Unlock className="w-3 h-3 text-sky-600 dark:text-cyan-400" />
            ) : (
              <Lock className="w-3 h-3" />
            )}
            <span className="font-semibold">{isAdminAuthenticated ? 'Admin Console' : '256-Bit SSL Encrypted'}</span>
          </button>
        </div>

        <div className="pt-1.5 border-t border-slate-200 dark:border-slate-900 text-slate-500 text-[10px] flex items-center justify-between px-1">
          <span>IDENTITY PROTOCOL: {profile.executiveHash}</span>
          <button
            onClick={() => {
              playTechClick();
              setIsAdminOpen(true);
            }}
            className="text-sky-600 dark:text-cyan-400/80 hover:underline font-mono-tech cursor-pointer font-semibold"
          >
            {isAdminAuthenticated ? '⚙ Master Controls' : 'Admin Login'}
          </button>
        </div>
      </div>

      {/* Brand & Legal Details */}
      <div className="text-xs text-slate-500 space-y-1">
        <p>
          © {new Date().getFullYear()} {profile.company} Technologies Pvt. Ltd. All rights reserved.
        </p>
        <p className="text-[11px] text-slate-400 dark:text-slate-600">
          Executive Identity & Financial Management Portal · {profile.name}
        </p>
      </div>

      {/* Back to Top */}
      <div>
        <button
          onClick={scrollToTop}
          className="inline-flex items-center gap-1 text-[11px] font-mono-tech text-slate-500 hover:text-sky-600 dark:hover:text-cyan-400 transition-colors cursor-pointer"
        >
          <ArrowUp className="w-3.5 h-3.5" />
          <span>RETURN TO TOP</span>
        </button>
      </div>
    </footer>
  );
};
