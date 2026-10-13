import React from 'react';
import { CreditCard, Building2, Radio, ExternalLink, Leaf, Shield, Zap } from 'lucide-react';
import { TAPMATE_PRODUCTS } from '../data/profileData';
import { useProfile } from '../context/ProfileContext';
import { playTechClick } from '../utils/audio';

export const TapMateShowcase: React.FC = () => {
  const { profile } = useProfile();

  return (
    <section className="w-full max-w-xl mx-auto mt-8 space-y-4 px-4 text-left">
      {/* Brand Header */}
      <div className="flex items-center justify-between pb-2 border-b border-slate-200 dark:border-slate-800">
        <div>
          <h2 className="text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-white font-mono-tech flex items-center gap-2">
            <span className="w-1.5 h-3.5 bg-sky-500 dark:bg-cyan-400 rounded-sm" />
            {profile.company} Ecosystem
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Next-generation contactless smart networking & enterprise identity
          </p>
        </div>
        <a
          href={profile.website}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => playTechClick()}
          className="text-[11px] font-mono-tech text-sky-600 dark:text-cyan-400 hover:text-sky-700 dark:hover:text-cyan-300 flex items-center gap-1 group font-semibold"
        >
          <span>EXPLORE</span>
          <ExternalLink className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
        </a>
      </div>

      {/* Brand Hero Showcase Card */}
      <div className="relative p-5 rounded-2xl bg-gradient-to-br from-white via-slate-50 to-white dark:from-slate-900 dark:via-slate-900/90 dark:to-slate-950 border border-slate-200 dark:border-slate-800 hover:border-sky-500/40 dark:hover:border-cyan-500/40 transition-all overflow-hidden group shadow-sm">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded bg-sky-100 dark:bg-cyan-500/10 border border-sky-300 dark:border-cyan-500/30 font-mono-tech text-[10px] text-sky-700 dark:text-cyan-300 font-bold uppercase">
                HARDWARE + SAAS
              </span>
              <span className="text-slate-400 dark:text-slate-500 text-xs">·</span>
              <span className="text-emerald-600 dark:text-emerald-400 font-mono-tech text-[10px] flex items-center gap-1 font-semibold">
                <Leaf className="w-3 h-3" />
                100% Paperless
              </span>
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white tracking-tight pt-1">
              One Tap to Exchange Everything
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed max-w-md">
              TapMate replaces paper business cards with dynamic, cloud-synchronized smart NFC hardware. Share your complete professional persona in a fraction of a second without requiring the recipient to install any app.
            </p>
          </div>
        </div>

        {/* Feature Badges */}
        <div className="grid grid-cols-3 gap-2 mt-4 pt-3 border-t border-slate-200 dark:border-slate-800/80 font-mono-tech text-[10px]">
          <div className="flex items-center gap-1.5 text-slate-700 dark:text-slate-300">
            <Zap className="w-3.5 h-3.5 text-sky-600 dark:text-cyan-400" />
            <span>Instant Tap & Beam</span>
          </div>
          <div className="flex items-center gap-1.5 text-slate-700 dark:text-slate-300">
            <Shield className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
            <span>Bank-Grade Auth</span>
          </div>
          <div className="flex items-center gap-1.5 text-slate-700 dark:text-slate-300">
            <Building2 className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400" />
            <span>Enterprise Fleet</span>
          </div>
        </div>

        {/* Action Link to Official Portal */}
        <div className="mt-4 pt-3 border-t border-slate-200 dark:border-slate-800/80 flex items-center justify-between">
          <span className="text-[11px] text-slate-500 dark:text-slate-400 font-mono-tech">
            Empowering 50,000+ executives & global teams
          </span>
          <a
            href={profile.website}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => playTechClick()}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-sky-600 dark:text-cyan-400 hover:text-sky-700 dark:hover:text-cyan-300 transition-colors"
          >
            <span>Visit {profile.company}</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </section>
  );
};
