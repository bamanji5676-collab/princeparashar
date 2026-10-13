import React, { useState } from 'react';
import { ShieldCheck } from 'lucide-react';
import { princePortrait } from '../assets/images';
import { useProfile } from '../context/ProfileContext';

export const DigitalFrame: React.FC = () => {
  const { profile, customAvatar } = useProfile();
  const [isScanning, setIsScanning] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 16;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -16;
    setMousePos({ x, y });
  };

  const handleMouseLeave = () => {
    setMousePos({ x: 0, y: 0 });
  };

  const triggerScanEffect = () => {
    setIsScanning(true);
    setTimeout(() => setIsScanning(false), 2400);
  };

  const displayImage = customAvatar || princePortrait;

  return (
    <div className="relative flex flex-col items-center justify-center select-none">
      {/* Ambient background glow halo */}
      <div 
        className="absolute -inset-4 bg-gradient-to-r from-sky-400/20 via-blue-500/15 to-violet-500/20 dark:from-cyan-500/20 dark:via-blue-600/15 dark:to-violet-600/20 rounded-full blur-2xl opacity-80 animate-pulse"
        style={{ animationDuration: '6s' }}
      />

      {/* Main 3D tilt container */}
      <div
        className="relative group cursor-pointer transition-transform duration-200 ease-out"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onClick={triggerScanEffect}
        title="Tap to trigger holographic biometric scan"
        style={{
          transform: `perspective(1000px) rotateX(${mousePos.y}deg) rotateY(${mousePos.x}deg)`,
        }}
      >
        {/* Outer Rotating Cyber Ring */}
        <div 
          className="absolute -inset-3.5 rounded-full border border-dashed border-sky-500/40 dark:border-cyan-500/30 animate-spin-slow pointer-events-none"
          style={{ animationDuration: '32s' }}
        />

        {/* Counter-rotating subtle orbital ring */}
        <div 
          className="absolute -inset-2 rounded-full border border-dotted border-blue-500/35 dark:border-blue-400/25 pointer-events-none"
          style={{ animation: 'spin-slow 22s linear infinite reverse' }}
        />

        {/* Neon Glow Border Ring */}
        <div className="relative p-1 rounded-full bg-gradient-to-tr from-sky-500 via-blue-600 to-cyan-400 shadow-[0_0_35px_rgba(14,165,233,0.35)] dark:shadow-[0_0_35px_rgba(6,182,212,0.35)]">
          
          {/* Inner Frame */}
          <div className="relative w-40 h-40 sm:w-48 sm:h-48 md:w-56 md:h-56 rounded-full overflow-hidden bg-white dark:bg-slate-950 border-2 border-white dark:border-slate-900/80 shadow-inner">
            {/* The Executive Portrait */}
            <img
              src={displayImage}
              alt={`${profile.name} - ${profile.designation} at ${profile.company}`}
              className="w-full h-full object-cover object-top filter brightness-[1.02] contrast-[1.03] transition-transform duration-700 group-hover:scale-105"
              loading="eager"
            />

            {/* Subtle holographic cyan vignette & light sheen */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 dark:from-slate-950/80 via-transparent to-sky-400/10 pointer-events-none" />

            {/* Scanline Effect when triggered */}
            {isScanning && (
              <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <div className="w-full h-1 bg-gradient-to-r from-transparent via-sky-400 to-transparent shadow-[0_0_12px_#38bdf8] animate-scan" />
                <div className="absolute inset-0 bg-sky-500/15 backdrop-brightness-110" />
              </div>
            )}

            {/* Micro Tech HUD overlay marks */}
            <div className="absolute inset-0 pointer-events-none border border-sky-400/20 dark:border-cyan-500/20 rounded-full" />
          </div>

          {/* Holographic Status Pill */}
          <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-white/95 dark:bg-slate-900/90 border border-sky-400/60 dark:border-cyan-500/40 backdrop-blur-md flex items-center gap-1.5 shadow-[0_4px_16px_rgba(0,0,0,0.15)] dark:shadow-[0_4px_16px_rgba(0,0,0,0.6)]">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-sky-500" />
            </span>
            <span className="font-mono-tech text-[10px] tracking-wider text-sky-700 dark:text-cyan-300 font-semibold whitespace-nowrap">
              NFC ENCRYPTED
            </span>
          </div>
        </div>

        {/* HUD Brackets at corners */}
        <div className="absolute -top-1 -left-1 w-3 h-3 border-t-2 border-l-2 border-sky-500 dark:border-cyan-400/80 pointer-events-none" />
        <div className="absolute -top-1 -right-1 w-3 h-3 border-t-2 border-r-2 border-sky-500 dark:border-cyan-400/80 pointer-events-none" />
        <div className="absolute -bottom-1 -left-1 w-3 h-3 border-b-2 border-l-2 border-blue-500 dark:border-blue-400/80 pointer-events-none" />
        <div className="absolute -bottom-1 -right-1 w-3 h-3 border-b-2 border-r-2 border-blue-500 dark:border-blue-400/80 pointer-events-none" />
      </div>

      {/* Verified Executive Credential Badge */}
      <div className="mt-6 flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/80 dark:bg-slate-900/60 border border-slate-300/80 dark:border-slate-800 text-xs text-slate-700 dark:text-slate-300 shadow-sm">
        <ShieldCheck className="w-3.5 h-3.5 text-sky-600 dark:text-cyan-400" />
        <span className="font-mono-tech text-[11px] tracking-wide">
          TapMate Executive ID <span className="text-sky-600 dark:text-cyan-400 font-bold">#CFO-2035</span>
        </span>
        <span className="w-1 h-1 rounded-full bg-slate-400 dark:bg-slate-600" />
        <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-medium flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          Verified
        </span>
      </div>
    </div>
  );
};
