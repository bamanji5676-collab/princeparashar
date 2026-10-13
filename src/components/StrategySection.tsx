import React, { useState } from 'react';
import { 
  LineChart, 
  TrendingUp, 
  ShieldCheck, 
  Cpu, 
  ChevronRight,
  Layers
} from 'lucide-react';
import { STRATEGIC_PILLARS } from '../data/profileData';
import { useProfile } from '../context/ProfileContext';
import { playTechClick } from '../utils/audio';

const iconMap: Record<string, React.ReactNode> = {
  LineChart: <LineChart className="w-5 h-5 text-sky-600 dark:text-cyan-400" />,
  TrendingUp: <TrendingUp className="w-5 h-5 text-blue-600 dark:text-blue-400" />,
  ShieldCheck: <ShieldCheck className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />,
  Cpu: <Cpu className="w-5 h-5 text-violet-600 dark:text-violet-400" />,
};

export const StrategySection: React.FC = () => {
  const { profile } = useProfile();
  const [activePillarId, setActivePillarId] = useState<string>(STRATEGIC_PILLARS[0].id);

  return (
    <section className="w-full max-w-xl mx-auto mt-8 space-y-5 px-4 text-left">
      {/* Section Header */}
      <div className="flex items-center justify-between pb-2 border-b border-slate-200 dark:border-slate-800">
        <div>
          <h2 className="text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-white font-mono-tech flex items-center gap-2">
            <span className="w-1.5 h-3.5 bg-sky-500 dark:bg-cyan-400 rounded-sm" />
            Executive Financial Mandate
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Strategic governance & sustainable value creation at {profile.company}
          </p>
        </div>
        <div className="text-[11px] font-mono-tech text-sky-700 dark:text-cyan-400/80 bg-sky-100 dark:bg-cyan-950/40 px-2 py-0.5 rounded border border-sky-300 dark:border-cyan-800/40">
          FISCAL ARCHITECTURE
        </div>
      </div>

      {/* Executive Introduction Card */}
      <div className="p-4 sm:p-5 rounded-2xl bg-glass-card border border-sky-400/20 dark:border-cyan-500/20 relative overflow-hidden">
        {/* Soft cyan gradient corner */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-sky-400/10 dark:bg-cyan-500/5 rounded-full blur-xl pointer-events-none" />

        <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-normal">
          {profile.bio}
        </p>

        {/* Highlights Grid */}
        <div className="grid grid-cols-3 gap-2 mt-4 pt-3.5 border-t border-slate-200 dark:border-slate-800/80 text-center font-mono-tech text-[10px]">
          <div className="p-2 rounded-lg bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800/60">
            <span className="text-slate-500 block">GOVERNANCE</span>
            <span className="text-sky-600 dark:text-cyan-400 font-semibold block mt-0.5">Fiduciary Grade</span>
          </div>
          <div className="p-2 rounded-lg bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800/60">
            <span className="text-slate-500 block">EXPANSION</span>
            <span className="text-blue-600 dark:text-blue-400 font-semibold block mt-0.5">High Velocity</span>
          </div>
          <div className="p-2 rounded-lg bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800/60">
            <span className="text-slate-500 block">VALUE</span>
            <span className="text-purple-600 dark:text-purple-400 font-semibold block mt-0.5">Sustainable</span>
          </div>
        </div>
      </div>

      {/* Strategic Pillars Interactive Tabs */}
      <div className="space-y-3">
        <div className="text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider font-mono-tech flex items-center gap-1.5">
          <Layers className="w-3.5 h-3.5 text-sky-600 dark:text-cyan-400" />
          <span>Core Strategic Pillars</span>
        </div>

        {/* Pillar Cards */}
        <div className="space-y-2.5">
          {STRATEGIC_PILLARS.map((pillar) => {
            const isSelected = activePillarId === pillar.id;

            return (
              <div
                key={pillar.id}
                onClick={() => {
                  playTechClick();
                  setActivePillarId(isSelected ? '' : pillar.id);
                }}
                className={`p-3.5 rounded-xl border transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-white dark:bg-slate-900/90 border-sky-500/60 dark:border-cyan-500/50 shadow-md'
                    : 'bg-white/80 dark:bg-slate-900/40 border-slate-200/90 dark:border-slate-800/80 hover:border-slate-300 dark:hover:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-900/60 shadow-sm'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 mt-0.5">
                      {iconMap[pillar.iconName]}
                    </div>
                    <div>
                      <h4 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white tracking-tight">
                        {pillar.title}
                      </h4>
                      <p className="text-[11px] text-sky-600 dark:text-cyan-400/80 font-mono-tech mt-0.5">
                        {pillar.tagline}
                      </p>
                    </div>
                  </div>

                  <ChevronRight
                    className={`w-4 h-4 text-slate-400 dark:text-slate-500 transition-transform ${
                      isSelected ? 'rotate-90 text-sky-600 dark:text-cyan-400' : ''
                    }`}
                  />
                </div>

                {isSelected && (
                  <div className="mt-3 pt-3 border-t border-slate-200 dark:border-slate-800/80 space-y-3 animate-fade-in">
                    <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                      {pillar.description}
                    </p>

                    {/* Metric Indicators */}
                    <div className="grid grid-cols-3 gap-2 pt-1 font-mono-tech text-[10px]">
                      {pillar.metrics.map((metric, i) => (
                        <div key={i} className="p-2 rounded-lg bg-slate-50 dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800 text-center">
                          <span className="text-slate-500 block text-[9px]">{metric.label}</span>
                          <span className="text-sky-700 dark:text-cyan-300 font-bold block mt-0.5">{metric.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
