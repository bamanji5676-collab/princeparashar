import React, { useState } from 'react';
import { 
  ResponsiveContainer, 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend 
} from 'recharts';
import { 
  TrendingUp, 
  DollarSign, 
  Radio, 
  Building2, 
  Percent, 
  Sparkles,
  ArrowUpRight,
  ShieldCheck
} from 'lucide-react';
import { useProfile } from '../context/ProfileContext';
import { playTechClick } from '../utils/audio';

interface PerformanceMetric {
  period: string;
  revenue: number; // in ₹ Lakhs / Crores
  cardsDeployed: number; // in thousands (K)
  enterpriseAccounts: number;
  grossMargin: number; // in %
}

const PERFORMANCE_DATA: PerformanceMetric[] = [
  { period: 'Q1 2025', revenue: 6.2, cardsDeployed: 48, enterpriseAccounts: 85, grossMargin: 68.4 },
  { period: 'Q2 2025', revenue: 9.8, cardsDeployed: 76, enterpriseAccounts: 132, grossMargin: 70.1 },
  { period: 'Q3 2025', revenue: 14.5, cardsDeployed: 118, enterpriseAccounts: 210, grossMargin: 71.8 },
  { period: 'Q4 2025', revenue: 21.0, cardsDeployed: 175, enterpriseAccounts: 320, grossMargin: 73.2 },
  { period: 'Q1 2026', revenue: 28.6, cardsDeployed: 242, enterpriseAccounts: 460, grossMargin: 74.5 },
  { period: 'Q2 2026', revenue: 37.4, cardsDeployed: 310, enterpriseAccounts: 615, grossMargin: 75.8 },
  { period: 'Q3 2026 (P)', revenue: 48.0, cardsDeployed: 395, enterpriseAccounts: 790, grossMargin: 77.0 },
  { period: 'Q4 2026 (P)', revenue: 61.5, cardsDeployed: 490, enterpriseAccounts: 980, grossMargin: 78.5 },
];

export const CompanyPerformanceChart: React.FC = () => {
  const { theme, profile } = useProfile();
  const [selectedMetric, setSelectedMetric] = useState<'revenue' | 'cards' | 'accounts' | 'all'>('revenue');

  const isLight = theme === 'light';

  // Custom Futuristic Tooltip
  const CustomTooltip = ({ active, payload, label }: { active?: boolean; payload?: Array<{ value: number; name: string; color: string }>; label?: string }) => {
    if (active && payload && payload.length) {
      return (
        <div className="p-3 rounded-xl bg-white/95 dark:bg-slate-950/95 border border-sky-400/40 dark:border-cyan-500/40 shadow-xl backdrop-blur-md text-xs font-mono-tech space-y-1.5">
          <div className="text-slate-900 dark:text-white font-bold pb-1 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between gap-4">
            <span>{label}</span>
            <span className="text-[10px] text-sky-600 dark:text-cyan-400">TAPMATE AUDITED</span>
          </div>
          {payload.map((entry, index) => (
            <div key={`item-${index}`} className="flex items-center justify-between gap-4">
              <span className="text-slate-600 dark:text-slate-400 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: entry.color }} />
                {entry.name}:
              </span>
              <span className="font-bold text-slate-900 dark:text-white">
                {entry.name.includes('Revenue') ? `₹${entry.value} Cr` : 
                 entry.name.includes('Deployed') ? `${entry.value}K cards` :
                 entry.name.includes('Margin') ? `${entry.value}%` :
                 `${entry.value} accounts`}
              </span>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-5">
      {/* Header with CFO Certification */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-200 dark:border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <h4 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-sky-600 dark:text-cyan-400" />
              <span>Company Performance & Fiscal Trajectory</span>
            </h4>
            <span className="px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950/60 border border-emerald-300 dark:border-emerald-800 text-[10px] text-emerald-800 dark:text-emerald-400 font-mono-tech font-semibold flex items-center gap-1">
              <ShieldCheck className="w-3 h-3" />
              CFO Certified
            </span>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Internal executive telemetry tracking annualized recurring run-rate & unit economics.
          </p>
        </div>

        {/* Metric Switcher Controls */}
        <div className="flex items-center p-1 bg-slate-100 dark:bg-slate-950 rounded-xl border border-slate-200 dark:border-slate-800 text-xs">
          <button
            type="button"
            onClick={() => {
              playTechClick();
              setSelectedMetric('revenue');
            }}
            className={`px-2.5 py-1 rounded-lg font-medium transition-all cursor-pointer ${
              selectedMetric === 'revenue'
                ? 'bg-white dark:bg-cyan-500/20 text-sky-700 dark:text-cyan-300 border border-slate-300 dark:border-cyan-500/40 shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Revenue (ARR)
          </button>
          <button
            type="button"
            onClick={() => {
              playTechClick();
              setSelectedMetric('cards');
            }}
            className={`px-2.5 py-1 rounded-lg font-medium transition-all cursor-pointer ${
              selectedMetric === 'cards'
                ? 'bg-white dark:bg-cyan-500/20 text-sky-700 dark:text-cyan-300 border border-slate-300 dark:border-cyan-500/40 shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Hardware Units
          </button>
          <button
            type="button"
            onClick={() => {
              playTechClick();
              setSelectedMetric('all');
            }}
            className={`px-2.5 py-1 rounded-lg font-medium transition-all cursor-pointer ${
              selectedMetric === 'all'
                ? 'bg-white dark:bg-cyan-500/20 text-sky-700 dark:text-cyan-300 border border-slate-300 dark:border-cyan-500/40 shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Multi-Vector
          </button>
        </div>
      </div>

      {/* KPI Highlight Strip */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
        <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-[10px] text-slate-500 font-mono-tech uppercase">Current ARR Run-Rate</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-emerald-500" />
          </div>
          <div className="text-lg font-bold text-sky-600 dark:text-cyan-400 mt-0.5">₹37.4 Cr</div>
          <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-medium">+30.7% QoQ Expansion</span>
        </div>

        <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-[10px] text-slate-500 font-mono-tech uppercase">NFC Cards Deployed</span>
            <Radio className="w-3.5 h-3.5 text-blue-500" />
          </div>
          <div className="text-lg font-bold text-blue-600 dark:text-blue-400 mt-0.5">310,000+</div>
          <span className="text-[10px] text-slate-500">Active NFC Endpoints</span>
        </div>

        <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-[10px] text-slate-500 font-mono-tech uppercase">Blended Gross Margin</span>
            <Percent className="w-3.5 h-3.5 text-purple-500" />
          </div>
          <div className="text-lg font-bold text-purple-600 dark:text-purple-400 mt-0.5">75.8%</div>
          <span className="text-[10px] text-purple-600 dark:text-purple-400 font-medium">Hardware + SaaS Blended</span>
        </div>

        <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-[10px] text-slate-500 font-mono-tech uppercase">Enterprise Fleets</span>
            <Building2 className="w-3.5 h-3.5 text-amber-500" />
          </div>
          <div className="text-lg font-bold text-slate-900 dark:text-white mt-0.5">615 Co.</div>
          <span className="text-[10px] text-slate-500">Corporate Deployments</span>
        </div>
      </div>

      {/* Main Recharts Line Chart Presentation */}
      <div className="p-4 sm:p-5 rounded-2xl bg-slate-50/80 dark:bg-slate-950/90 border border-slate-200 dark:border-slate-800/90 relative overflow-hidden shadow-sm">
        {/* Glow ambient accent */}
        <div className="absolute top-0 right-0 w-48 h-48 bg-sky-400/5 dark:bg-cyan-500/5 rounded-full blur-2xl pointer-events-none" />

        <div className="flex items-center justify-between mb-3 text-xs">
          <div className="font-mono-tech text-[11px] text-slate-500 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-sky-500 dark:bg-cyan-400 animate-pulse" />
            <span>FINANCIAL TRAJECTORY (FY 2025 - 2026 PROJECTION)</span>
          </div>
          <span className="text-[10px] font-mono-tech text-slate-400">Values in ₹ Crores (INR) & K units</span>
        </div>

        {/* The Recharts Container */}
        <div className="w-full h-72 sm:h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={PERFORMANCE_DATA}
              margin={{ top: 10, right: 15, left: -10, bottom: 0 }}
            >
              <defs>
                <linearGradient id="cyanLineGradient" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#0284c7" />
                  <stop offset="100%" stopColor="#06b6d4" />
                </linearGradient>
                <linearGradient id="blueLineGradient" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#2563eb" />
                  <stop offset="100%" stopColor="#818cf8" />
                </linearGradient>
                <linearGradient id="purpleLineGradient" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#9333ea" />
                  <stop offset="100%" stopColor="#c084fc" />
                </linearGradient>
              </defs>

              <CartesianGrid
                strokeDasharray="3 3"
                stroke={isLight ? '#e2e8f0' : '#1e293b'}
                vertical={false}
              />

              <XAxis
                dataKey="period"
                stroke={isLight ? '#64748b' : '#64748b'}
                fontSize={11}
                tickLine={false}
                axisLine={{ stroke: isLight ? '#cbd5e1' : '#334155' }}
              />

              <YAxis
                stroke={isLight ? '#64748b' : '#64748b'}
                fontSize={11}
                tickLine={false}
                axisLine={{ stroke: isLight ? '#cbd5e1' : '#334155' }}
              />

              <Tooltip content={<CustomTooltip />} />
              
              <Legend
                wrapperStyle={{
                  paddingTop: '16px',
                  fontSize: '11px',
                  fontFamily: 'JetBrains Mono, monospace',
                }}
              />

              {(selectedMetric === 'revenue' || selectedMetric === 'all') && (
                <Line
                  type="monotone"
                  dataKey="revenue"
                  name="Revenue ARR (₹ Cr)"
                  stroke={isLight ? '#0284c7' : '#22d3ee'}
                  strokeWidth={3}
                  dot={{ r: 4, fill: isLight ? '#0284c7' : '#22d3ee', strokeWidth: 2, stroke: isLight ? '#ffffff' : '#0f172a' }}
                  activeDot={{ r: 7, fill: isLight ? '#0369a1' : '#38bdf8' }}
                />
              )}

              {(selectedMetric === 'cards' || selectedMetric === 'all') && (
                <Line
                  type="monotone"
                  dataKey="cardsDeployed"
                  name="Cards Deployed (K units)"
                  stroke={isLight ? '#2563eb' : '#60a5fa'}
                  strokeWidth={2.5}
                  strokeDasharray={selectedMetric === 'all' ? '4 4' : undefined}
                  dot={{ r: 4, fill: isLight ? '#2563eb' : '#60a5fa', strokeWidth: 2, stroke: isLight ? '#ffffff' : '#0f172a' }}
                  activeDot={{ r: 7, fill: isLight ? '#1d4ed8' : '#93c5fd' }}
                />
              )}

              {selectedMetric === 'all' && (
                <Line
                  type="monotone"
                  dataKey="grossMargin"
                  name="Gross Margin (%)"
                  stroke={isLight ? '#7c3aed' : '#c084fc'}
                  strokeWidth={2}
                  dot={{ r: 3, fill: isLight ? '#7c3aed' : '#c084fc' }}
                />
              )}
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* CFO Strategic Commentary Note */}
        <div className="mt-4 pt-3 border-t border-slate-200 dark:border-slate-800 flex items-start gap-2.5 text-xs text-slate-600 dark:text-slate-400">
          <Sparkles className="w-4 h-4 text-sky-600 dark:text-cyan-400 shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            <strong className="text-slate-900 dark:text-white font-semibold">{profile.name} (CFO Note):</strong> “Our strategic capital allocation is yielding strong unit margin expansion. The inflection point in Q4 2025 demonstrates how our enterprise SaaS renewals compound the initial hardware smart card sales, sustaining exceptional cash flow visibility.”
          </p>
        </div>
      </div>
    </div>
  );
};
