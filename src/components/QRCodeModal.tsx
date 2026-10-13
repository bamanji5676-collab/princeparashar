import React, { useEffect, useState } from 'react';
import { X, Download, Copy, Check, QrCode, Smartphone } from 'lucide-react';
import QRCode from 'qrcode';
import { useProfile } from '../context/ProfileContext';
import { generateVCardString } from '../utils/vcard';
import { playTechClick, playSuccessChime } from '../utils/audio';

interface QRCodeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const QRCodeModal: React.FC<QRCodeModalProps> = ({ isOpen, onClose }) => {
  const { profile, trackEvent } = useProfile();
  const [qrMode, setQrMode] = useState<'url' | 'vcard'>('url');
  const [qrDataUrl, setQrDataUrl] = useState<string>('');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!isOpen) return;

    trackEvent('qrScans');
    const payload = qrMode === 'url' ? window.location.href : generateVCardString(profile);

    QRCode.toDataURL(payload, {
      width: 480,
      margin: 2,
      color: {
        dark: '#030712',
        light: '#ffffff',
      },
      errorCorrectionLevel: 'M',
    })
      .then((url) => setQrDataUrl(url))
      .catch((err) => console.error('QR generation failed', err));
  }, [isOpen, qrMode, profile]);

  if (!isOpen) return null;

  const handleDownloadQR = () => {
    playSuccessChime();
    const link = document.createElement('a');
    link.href = qrDataUrl;
    link.download = `${profile.name.replace(/\s+/g, '_')}_TapMate_QR_${qrMode}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleCopyLink = () => {
    playTechClick();
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 dark:bg-slate-950/80 backdrop-blur-md animate-fade-in">
      <div 
        className="relative w-full max-w-sm rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-cyan-500/30 p-6 shadow-2xl text-center overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top ambient glow line */}
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

        {/* Header */}
        <div className="flex items-center justify-center gap-2 mb-2">
          <QrCode className="w-5 h-5 text-sky-600 dark:text-cyan-400" />
          <h3 className="text-lg font-bold text-slate-900 dark:text-white tracking-tight">Instant Profile QR</h3>
        </div>
        <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">
          Scan to access {profile.name}'s executive profile & credentials
        </p>

        {/* Mode Switcher */}
        <div className="flex items-center justify-center p-1 bg-slate-100 dark:bg-slate-950 rounded-xl mb-4 border border-slate-200 dark:border-slate-800 text-xs">
          <button
            onClick={() => {
              playTechClick();
              setQrMode('url');
            }}
            className={`flex-1 py-1.5 px-3 rounded-lg font-medium transition-all cursor-pointer ${
              qrMode === 'url'
                ? 'bg-white dark:bg-cyan-500/20 text-sky-700 dark:text-cyan-300 border border-slate-300 dark:border-cyan-500/40 shadow-sm'
                : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Digital Profile URL
          </button>
          <button
            onClick={() => {
              playTechClick();
              setQrMode('vcard');
            }}
            className={`flex-1 py-1.5 px-3 rounded-lg font-medium transition-all cursor-pointer ${
              qrMode === 'vcard'
                ? 'bg-white dark:bg-cyan-500/20 text-sky-700 dark:text-cyan-300 border border-slate-300 dark:border-cyan-500/40 shadow-sm'
                : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Offline vCard Contact
          </button>
        </div>

        {/* QR Code Presentation Box */}
        <div className="relative inline-block p-3.5 bg-white rounded-2xl border border-slate-200 dark:border-slate-700 shadow-md mb-4 mx-auto">
          {/* Corner Markers */}
          <div className="absolute -top-1 -left-1 w-3 h-3 border-t-2 border-l-2 border-sky-500 dark:border-cyan-400" />
          <div className="absolute -top-1 -right-1 w-3 h-3 border-t-2 border-r-2 border-sky-500 dark:border-cyan-400" />
          <div className="absolute -bottom-1 -left-1 w-3 h-3 border-b-2 border-l-2 border-sky-500 dark:border-cyan-400" />
          <div className="absolute -bottom-1 -right-1 w-3 h-3 border-b-2 border-r-2 border-sky-500 dark:border-cyan-400" />

          {qrDataUrl ? (
            <img
              src={qrDataUrl}
              alt={`${profile.name} QR Code`}
              className="w-52 h-52 sm:w-56 sm:h-56 object-contain rounded-lg"
            />
          ) : (
            <div className="w-52 h-52 flex items-center justify-center text-slate-400">
              Generating holographic QR...
            </div>
          )}

          {/* TapMate center mini pill overlay */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="px-2 py-0.5 rounded-md bg-slate-950 border border-sky-400 dark:border-cyan-400 shadow-md">
              <span className="font-mono-tech text-[10px] font-bold text-sky-300 dark:text-cyan-300 tracking-tighter">
                {profile.company}
              </span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-2 mt-2">
          <button
            onClick={handleDownloadQR}
            className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 text-xs font-semibold border border-slate-300 dark:border-slate-700 transition-colors cursor-pointer"
          >
            <Download className="w-4 h-4 text-sky-600 dark:text-cyan-400" />
            <span>Download PNG</span>
          </button>

          <button
            onClick={handleCopyLink}
            className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-sky-100 dark:bg-cyan-600/20 hover:bg-sky-200 dark:hover:bg-cyan-600/30 text-sky-800 dark:text-cyan-300 text-xs font-semibold border border-sky-300 dark:border-cyan-500/40 transition-colors cursor-pointer"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <span>Copied Link</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4 text-sky-600 dark:text-cyan-400" />
                <span>Copy Link</span>
              </>
            )}
          </button>
        </div>

        {/* Scanning tip */}
        <div className="mt-4 flex items-center justify-center gap-2 text-[11px] text-slate-500">
          <Smartphone className="w-3.5 h-3.5 text-slate-500" />
          <span>Point iOS or Android camera to instant scan</span>
        </div>
      </div>
    </div>
  );
};
