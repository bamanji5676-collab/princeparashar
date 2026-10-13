import React from 'react';
import { Volume2, VolumeX, MapPin } from 'lucide-react';
import { useProfile } from '../context/ProfileContext';
import { DigitalFrame } from './DigitalFrame';
import { playTechClick } from '../utils/audio';

interface HeroSectionProps {
  soundEnabled: boolean;
  onToggleSound: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  soundEnabled,
  onToggleSound,
}) => {
  const { profile, setIsAdminOpen, isAdminAuthenticated, theme, toggleTheme } = useProfile();

  return (
    <section className="relative w-full pt-4 pb-2 text-center flex flex-col items-center">
      {/* Top utility row: Sound toggle, Theme toggle & Admin portal button */}
      <div className="w-full max-w-xl flex justify-between items-center px-4 mb-3 text-xs text-slate-500 dark:text-slate-400">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-sky-500 dark:bg-cyan-400 animate-pulse" />
          <span className="font-mono-tech text-[11px] tracking-wide text-sky-700 dark:text-cyan-300 font-semibold uppercase">
            2035 EXECUTIVE IDENTITY
          </span>
        </div>

        <div className="flex items-center gap-2 pr-12 sm:pr-0">

          {/* Admin Access Button */}
          <button
            onClick={() => {
              playTechClick();
              setIsAdminOpen(true);
            }}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-[11px] font-mono-tech transition-colors cursor-pointer shadow-sm ${
              isAdminAuthenticated
                ? 'bg-sky-500/10 dark:bg-cyan-500/15 border-sky-500/50 dark:border-cyan-500/50 text-sky-700 dark:text-cyan-300'
                : 'bg-white/80 dark:bg-slate-900/80 border-slate-300/80 dark:border-slate-800 hover:border-sky-500/50 dark:hover:border-cyan-500/40 text-slate-700 dark:text-slate-300'
            }`}
            title="Open Executive Admin Panel (Pass: veer5676)"
          >
            <span className={`w-1.5 h-1.5 rounded-full ${isAdminAuthenticated ? 'bg-sky-500 dark:bg-cyan-400 animate-pulse' : 'bg-slate-400 dark:bg-slate-500'}`} />
            <span>{isAdminAuthenticated ? 'ADMIN ACTIVE' : 'ADMIN'}</span>
          </button>

          {/* Sound FX Toggle */}
          <button
            onClick={() => {
              playTechClick();
              onToggleSound();
            }}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/80 dark:bg-slate-900/80 border border-slate-300/80 dark:border-slate-800 hover:border-sky-500/50 dark:hover:border-cyan-500/40 text-slate-700 dark:text-slate-300 transition-colors text-[11px] font-mono-tech shadow-sm cursor-pointer"
            title={soundEnabled ? 'Mute futuristic audio' : 'Enable futuristic audio'}
          >
            {soundEnabled ? (
              <>
                <Volume2 className="w-3.5 h-3.5 text-sky-600 dark:text-cyan-400" />
                <span className="hidden sm:inline">AUDIO ON</span>
              </>
            ) : (
              <>
                <VolumeX className="w-3.5 h-3.5 text-slate-400" />
                <span className="hidden sm:inline">MUTED</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Portrait in Illuminated Digital Frame */}
      <div className="my-2">
        <DigitalFrame />
      </div>

      {/* Name as Visual Centerpiece */}
      <div className="mt-5 space-y-2 max-w-xl px-4">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight uppercase font-display">
          <span className="text-gradient-cyan drop-shadow-sm">
            {profile.name}
          </span>
        </h1>

        {/* CFO Designation & TapMate.in beneath */}
        <div className="flex flex-wrap items-center justify-center gap-2 text-sm sm:text-base font-semibold tracking-wider uppercase font-mono-tech">
          <span className="text-sky-600 dark:text-cyan-400 font-bold">{profile.designation}</span>
          <span className="text-slate-400 dark:text-slate-600">/</span>
          <a
            href={profile.website}
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate-800 dark:text-slate-300 hover:text-sky-600 dark:hover:text-cyan-300 transition-colors flex items-center gap-1 underline-offset-4 hover:underline"
          >
            <span>{profile.company}</span>
          </a>
        </div>

        {/* Executive Location & Headquarters */}
        <div className="flex items-center justify-center gap-2 text-xs text-slate-500 dark:text-slate-400 font-mono-tech pt-0.5">
          <MapPin className="w-3.5 h-3.5 text-sky-600 dark:text-slate-500" />
          <span>{profile.location}</span>
          <span className="text-slate-300 dark:text-slate-700">·</span>
          <span>IST UTC+05:30</span>
        </div>

        {/* Executive Creed / Quote */}
        <div className="relative pt-4 pb-2 px-6">
          <div className="inline-block relative">
            <span className="absolute -top-3 -left-3 text-2xl text-sky-500/40 dark:text-cyan-500/40 font-serif select-none">“</span>
            <blockquote className="text-sm sm:text-base italic font-medium text-slate-800 dark:text-slate-200 tracking-wide leading-relaxed">
              {profile.tagline}
            </blockquote>
            <span className="absolute -bottom-3 -right-3 text-2xl text-sky-500/40 dark:text-cyan-500/40 font-serif select-none">”</span>
          </div>
        </div>
      </div>
    </section>
  );
};
