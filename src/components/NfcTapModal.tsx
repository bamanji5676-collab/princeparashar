import React, { useState } from 'react';
import { X, Radio, Send, CheckCircle2, User, Building, Mail, Phone, Sparkles, Smartphone } from 'lucide-react';
import confetti from 'canvas-confetti';
import { useProfile } from '../context/ProfileContext';
import { playTechClick, playNfcBeam, playSuccessChime } from '../utils/audio';

interface NfcTapModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const NfcTapModal: React.FC<NfcTapModalProps> = ({ isOpen, onClose }) => {
  const { profile, addLead, trackEvent } = useProfile();
  const [name, setName] = useState('');
  const [company, setCompany] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [isSimulatingTap, setIsSimulatingTap] = useState(false);

  if (!isOpen) return null;

  const handleSimulateNfcTap = () => {
    setIsSimulatingTap(true);
    playNfcBeam();
    trackEvent('nfcTaps');
    setTimeout(() => {
      setIsSimulatingTap(false);
      playSuccessChime();
    }, 1800);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) return;

    playNfcBeam();
    trackEvent('nfcTaps');

    addLead({
      name,
      company: company || 'Independent Executive',
      email,
      phone: phone || 'N/A',
      notes: 'Captured via TapMate NFC Beam interactive card.',
    });

    try {
      confetti({
        particleCount: 50,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#0284c7', '#38bdf8', '#6366f1', '#a855f7'],
      });
    } catch {
      // ignore
    }

    setSubmitted(true);
  };

  const handleReset = () => {
    setName('');
    setCompany('');
    setEmail('');
    setPhone('');
    setSubmitted(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 dark:bg-slate-950/80 backdrop-blur-md animate-fade-in">
      <div 
        className="relative w-full max-w-md rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-cyan-500/30 p-6 shadow-2xl text-left overflow-hidden text-slate-800 dark:text-white"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Glow Header Accent */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-sky-400 via-blue-500 to-indigo-500" />

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

        {/* Modal Title */}
        <div className="flex items-center gap-2.5 mb-1.5">
          <div className="p-2 rounded-xl bg-sky-100 dark:bg-cyan-500/10 border border-sky-300 dark:border-cyan-500/30 text-sky-600 dark:text-cyan-400">
            <Radio className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white tracking-tight">TapMate NFC Beam</h3>
            <p className="text-xs text-sky-700 dark:text-cyan-400/80 font-mono-tech">13.56 MHz Contactless Protocol</p>
          </div>
        </div>

        {!submitted ? (
          <>
            {/* Interactive Tap Simulator */}
            <div 
              onClick={handleSimulateNfcTap}
              className="my-4 p-4 rounded-xl bg-slate-50 dark:bg-slate-950/70 border border-slate-200 dark:border-slate-800 hover:border-sky-500/40 dark:hover:border-cyan-500/40 cursor-pointer transition-all text-center relative overflow-hidden group shadow-inner"
            >
              <div className="flex items-center justify-center mb-2">
                <div className={`relative w-12 h-12 rounded-full flex items-center justify-center bg-sky-100 dark:bg-cyan-500/10 border border-sky-300 dark:border-cyan-500/30 ${isSimulatingTap ? 'scale-110 shadow-[0_0_30px_#0284c7]' : ''} transition-all`}>
                  <Smartphone className="w-6 h-6 text-sky-600 dark:text-cyan-400" />
                  {isSimulatingTap && (
                    <>
                      <span className="absolute inset-0 rounded-full border-2 border-sky-400 animate-ping" />
                      <span className="absolute -inset-2 rounded-full border border-blue-400 animate-ping opacity-60" />
                    </>
                  )}
                </div>
              </div>
              <p className="text-xs font-bold text-slate-800 dark:text-slate-200">
                {isSimulatingTap ? 'Transmitting High-Frequency Payload...' : 'Tap Screen to Simulate NFC Beam'}
              </p>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                On an NFC-enabled smartphone, hold near your TapMate card to trigger instant link.
              </p>
            </div>

            {/* Exchange Information Form */}
            <form onSubmit={handleSubmit} className="space-y-3">
              <div className="text-xs text-slate-700 dark:text-slate-300 font-semibold flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-sky-600 dark:text-cyan-400" />
                <span>Or beam your contact details directly to {profile.name}:</span>
              </div>

              <div>
                <label className="block text-[11px] text-slate-600 dark:text-slate-400 mb-1">Your Full Name *</label>
                <div className="relative">
                  <User className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Vikram Mehta"
                    className="w-full pl-9 pr-3 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 focus:border-sky-500 dark:focus:border-cyan-400 text-slate-900 dark:text-white placeholder-slate-400 outline-none transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-[11px] text-slate-600 dark:text-slate-400 mb-1">Company / Organization</label>
                  <div className="relative">
                    <Building className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
                    <input
                      type="text"
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                      placeholder="e.g. Apex Ventures"
                      className="w-full pl-9 pr-3 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 focus:border-sky-500 dark:focus:border-cyan-400 text-slate-900 dark:text-white placeholder-slate-400 outline-none transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] text-slate-600 dark:text-slate-400 mb-1">Phone Number</label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+91 9..."
                      className="w-full pl-9 pr-3 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 focus:border-sky-500 dark:focus:border-cyan-400 text-slate-900 dark:text-white placeholder-slate-400 outline-none transition-colors"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-[11px] text-slate-600 dark:text-slate-400 mb-1">Business Email *</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="vikram@apexventures.com"
                    className="w-full pl-9 pr-3 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 focus:border-sky-500 dark:focus:border-cyan-400 text-slate-900 dark:text-white placeholder-slate-400 outline-none transition-colors"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full mt-2 py-3 px-4 rounded-xl bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-[0_0_20px_rgba(2,132,199,0.3)] cursor-pointer"
              >
                <Send className="w-4 h-4 text-white" />
                <span>Transmit Contact Card</span>
              </button>
            </form>
          </>
        ) : (
          <div className="py-6 text-center space-y-4">
            <div className="w-16 h-16 mx-auto rounded-full bg-emerald-100 dark:bg-emerald-500/10 border border-emerald-300 dark:border-emerald-500/30 flex items-center justify-center text-emerald-600 dark:text-emerald-400 shadow-md">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div>
              <h4 className="text-base font-bold text-slate-900 dark:text-white">Digital Handshake Verified!</h4>
              <p className="text-xs text-slate-600 dark:text-slate-300 mt-1 max-w-xs mx-auto">
                Your contact details for <strong className="text-sky-600 dark:text-cyan-300">{name}</strong> have been beamed to {profile.name}'s executive desk at TapMate.
              </p>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-left font-mono-tech text-[11px] text-slate-600 dark:text-slate-400 space-y-1">
              <div className="text-sky-600 dark:text-cyan-400 font-semibold">Transmission Hash: 0xTM_NFC_{Math.random().toString(36).substring(2, 9).toUpperCase()}</div>
              <div>Recipient: {profile.verifiedEmail}</div>
              <div>Status: 200 OK • Added to Executive Admin CRM</div>
            </div>

            <button
              onClick={handleReset}
              className="py-2 px-4 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-xs text-slate-800 dark:text-slate-200 transition-colors cursor-pointer border border-slate-300 dark:border-slate-700 font-medium"
            >
              Exchange Another Card
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
