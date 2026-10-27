import React, { useState } from 'react';
import { 
  X, 
  Smartphone, 
  Download, 
  ExternalLink, 
  CheckCircle2, 
  Copy, 
  Check, 
  ShieldCheck, 
  Sparkles, 
  HelpCircle,
  PlaySquare,
  Globe,
  Layers,
  ArrowRight
} from 'lucide-react';
import { usePWAInstall } from '../hooks/usePWAInstall';

interface ApkExportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ApkExportModal: React.FC<ApkExportModalProps> = ({ isOpen, onClose }) => {
  const { isInstallable, isInstalled, isIOS, install } = usePWAInstall();
  const [copiedUrl, setCopiedUrl] = useState(false);
  const [copiedTitle, setCopiedTitle] = useState(false);
  const [copiedDesc, setCopiedDesc] = useState(false);
  const [activeTab, setActiveTab] = useState<'instant' | 'pwabuilder' | 'playstore'>('instant');

  if (!isOpen) return null;

  const currentAppUrl = typeof window !== 'undefined' ? window.location.href : 'https://ais-pre-4qhchstpll7v3dckrkhska-234064594815.asia-southeast1.run.app';

  const copyToClipboard = (text: string, type: 'url' | 'title' | 'desc') => {
    navigator.clipboard.writeText(text);
    if (type === 'url') {
      setCopiedUrl(true);
      setTimeout(() => setCopiedUrl(false), 2500);
    } else if (type === 'title') {
      setCopiedTitle(true);
      setTimeout(() => setCopiedTitle(false), 2500);
    } else if (type === 'desc') {
      setCopiedDesc(true);
      setTimeout(() => setCopiedDesc(false), 2500);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col">
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-emerald-950/80 via-slate-900 to-indigo-950/80 p-4 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center shadow-lg shadow-emerald-900/50">
              <Smartphone className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-extrabold text-white">
                Android APK & Google Play Store
              </h2>
              <p className="text-xs text-emerald-400">
                100% No-Code Guide for Nepal Premier League App
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab selection */}
        <div className="flex border-b border-slate-800 bg-slate-950/60 p-1.5 gap-1.5">
          <button
            onClick={() => setActiveTab('instant')}
            className={`flex-1 py-2 px-3 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition ${
              activeTab === 'instant'
                ? 'bg-emerald-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span>1. Install on Phone</span>
          </button>
          <button
            onClick={() => setActiveTab('pwabuilder')}
            className={`flex-1 py-2 px-3 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition ${
              activeTab === 'pwabuilder'
                ? 'bg-blue-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <Download className="w-3.5 h-3.5" />
            <span>2. Download APK (.apk / .aab)</span>
          </button>
          <button
            onClick={() => setActiveTab('playstore')}
            className={`flex-1 py-2 px-3 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition ${
              activeTab === 'playstore'
                ? 'bg-amber-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <PlaySquare className="w-3.5 h-3.5" />
            <span>3. Play Store Publish</span>
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-5 text-xs text-slate-300">
          {/* TAB 1: INSTANT INSTALL ON ANDROID */}
          {activeTab === 'instant' && (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-white text-sm">
                    No Code or APK Compile Needed for your Android Phone!
                  </h4>
                  <p className="text-slate-300 text-xs mt-1 leading-relaxed">
                    This Nepal Premier League app is engineered with official <strong>Progressive Web App (PWA)</strong> architecture. You can install it directly onto any Android mobile phone right now from the browser. It will open without browser address bars just like a native app from the Play Store!
                  </p>
                </div>
              </div>

              {/* Install Trigger Button */}
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-center space-y-3">
                <div className="inline-flex p-3 rounded-2xl bg-gradient-to-br from-amber-500 to-red-600 text-slate-950 font-black text-xl shadow-lg">
                  🏏
                </div>
                <div>
                  <h5 className="font-bold text-white text-base">Nepal Premier League (NPL)</h5>
                  <p className="text-slate-400 text-xs">Live Scores & Points Table</p>
                </div>

                {isInstalled ? (
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-semibold text-xs">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    App is already installed on this device!
                  </div>
                ) : isInstallable ? (
                  <button
                    onClick={install}
                    className="w-full sm:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white font-bold text-sm shadow-xl shadow-emerald-900/50 flex items-center justify-center gap-2 mx-auto transition transform active:scale-95"
                  >
                    <Download className="w-4 h-4" />
                    Install NPL App to Android Home Screen
                  </button>
                ) : (
                  <div className="text-slate-400 text-xs space-y-2">
                    <p className="font-medium text-slate-300">
                      To install on your Android phone:
                    </p>
                    <ol className="list-decimal list-inside space-y-1 text-left max-w-sm mx-auto bg-slate-900 p-3 rounded-lg border border-slate-800">
                      <li>Open this URL in Google Chrome on your Android mobile.</li>
                      <li>Tap the <strong>3 dots (⋮)</strong> menu in top-right.</li>
                      <li>Tap <strong>"Add to Home screen"</strong> or <strong>"Install app"</strong>.</li>
                      <li>The NPL icon will appear on your phone home screen!</li>
                    </ol>
                  </div>
                )}
              </div>

              {/* Live Auto Updates Benefit */}
              <div className="p-3.5 rounded-xl bg-slate-800/40 border border-slate-700/60">
                <div className="flex items-center gap-2 font-semibold text-amber-300 text-xs mb-1">
                  <Sparkles className="w-4 h-4 text-amber-400" />
                  Why this gives you 100% Automatic Score Updates:
                </div>
                <p className="text-slate-300 text-[11px] leading-relaxed">
                  Traditional Android APKs require you to write Java/Kotlin code, maintain a backend server, and re-release new APK versions to Google Play every time a tournament rule changes. With this PWA/TWA architecture, live scores, points tables, and team standings update dynamically on all users' phones automatically!
                </p>
              </div>
            </div>
          )}

          {/* TAB 2: DOWNLOAD APK / AAB VIA PWABUILDER */}
          {activeTab === 'pwabuilder' && (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-blue-500/10 border border-blue-500/30 space-y-2">
                <h4 className="font-bold text-white text-sm flex items-center gap-2">
                  <Download className="w-4 h-4 text-blue-400" />
                  How to generate .APK and .AAB (Zero Coding Required)
                </h4>
                <p className="text-slate-300 text-xs leading-relaxed">
                  Google and Microsoft created <strong>PWABuilder (pwabuilder.com)</strong> specifically so anyone without Android coding knowledge can turn their web app into an official signed <strong>.apk</strong> (for testing on phone) and <strong>.aab</strong> (for Google Play Store upload).
                </p>
              </div>

              {/* Step-by-step box */}
              <div className="space-y-3">
                <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-white text-xs">Step 1: Copy your NPL App URL</span>
                    <button
                      onClick={() => copyToClipboard(currentAppUrl, 'url')}
                      className="flex items-center gap-1 px-2.5 py-1 rounded bg-blue-600 hover:bg-blue-500 text-white font-medium text-[11px] transition"
                    >
                      {copiedUrl ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                      <span>{copiedUrl ? 'Copied!' : 'Copy URL'}</span>
                    </button>
                  </div>
                  <div className="p-2 rounded bg-slate-900 border border-slate-800 font-mono text-[11px] text-blue-300 break-all select-all">
                    {currentAppUrl}
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                  <span className="font-bold text-white text-xs">Step 2: Paste into PWABuilder</span>
                  <p className="text-slate-400 text-xs">
                    Go to <strong>pwabuilder.com</strong>, paste the copied URL, and click <strong>"Start"</strong>. All manifest items are 100% pre-configured:
                  </p>
                  
                  <div className="grid grid-cols-2 gap-1.5 p-2 rounded bg-slate-900 border border-slate-800 text-[11px]">
                    <div className="flex items-center gap-1.5 text-emerald-400 font-medium">
                      <Check className="w-3.5 h-3.5" />
                      <span>Name &amp; Short Name</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-emerald-400 font-medium">
                      <Check className="w-3.5 h-3.5" />
                      <span>Manifest Description</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-emerald-400 font-medium">
                      <Check className="w-3.5 h-3.5" />
                      <span>192 &amp; 512px Icons</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-emerald-400 font-medium">
                      <Check className="w-3.5 h-3.5" />
                      <span>Mobile Screenshots</span>
                    </div>
                  </div>

                  <a
                    href="https://www.pwabuilder.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-400 hover:text-blue-300 underline pt-1"
                  >
                    <span>Open PWABuilder.com in new tab</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                  <span className="font-bold text-white text-xs">Step 3: Click "Package for Stores" &gt; "Android"</span>
                  <p className="text-slate-400 text-xs">
                    Click <strong>"Generate Package"</strong>. You will receive a zip file containing:
                  </p>
                  <ul className="list-disc list-inside space-y-1 text-slate-300 pl-1 text-[11px]">
                    <li><strong>app-release-signed.apk</strong>: Direct APK file you can send via WhatsApp/Telegram to install on any Android phone.</li>
                    <li><strong>app-release-bundle.aab</strong>: Google Play Store bundle ready for submission!</li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: PLAY STORE PUBLISHING CHECKLIST */}
          {activeTab === 'playstore' && (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 space-y-1">
                <h4 className="font-bold text-white text-sm flex items-center gap-2">
                  <PlaySquare className="w-4 h-4 text-amber-400" />
                  Google Play Store Publishing Steps (Non-Programmer Guide)
                </h4>
                <p className="text-slate-300 text-xs">
                  Follow these 5 simple steps to publish your NPL app on Google Play:
                </p>
              </div>

              {/* Checklist */}
              <div className="space-y-2.5">
                <div className="p-3 rounded-lg bg-slate-950 border border-slate-800">
                  <div className="font-bold text-white flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-slate-800 text-amber-400 font-bold flex items-center justify-center text-[10px]">1</span>
                    <span>Create a Google Play Developer Account</span>
                  </div>
                  <p className="text-slate-400 text-xs mt-1 pl-7">
                    Go to <strong>play.google.com/console</strong> and sign up with your Google account. Google charges a one-time registration fee of $25 USD.
                  </p>
                </div>

                <div className="p-3 rounded-lg bg-slate-950 border border-slate-800">
                  <div className="font-bold text-white flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-slate-800 text-amber-400 font-bold flex items-center justify-center text-[10px]">2</span>
                    <span>Create App in Console</span>
                  </div>
                  <p className="text-slate-400 text-xs mt-1 pl-7">
                    Click <strong>"Create App"</strong>. Set App Name to <em>"Nepal Premier League NPL Live"</em>, select Language: English or Nepali, Free app.
                  </p>
                </div>

                <div className="p-3 rounded-lg bg-slate-950 border border-slate-800">
                  <div className="font-bold text-white flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-slate-800 text-amber-400 font-bold flex items-center justify-center text-[10px]">3</span>
                    <span>Upload your .aab Bundle</span>
                  </div>
                  <p className="text-slate-400 text-xs mt-1 pl-7">
                    In the left menu, go to <strong>Release &gt; Production &gt; Create new release</strong> and upload the <strong>.aab</strong> file you downloaded from PWABuilder.
                  </p>
                </div>

                <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 space-y-2">
                  <div className="font-bold text-white flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-slate-800 text-amber-400 font-bold flex items-center justify-center text-[10px]">4</span>
                    <span>Copy Pre-written Store Listing</span>
                  </div>
                  <div className="pl-7 space-y-2">
                    <div className="flex items-center justify-between bg-slate-900 p-2 rounded border border-slate-800">
                      <div>
                        <span className="text-[10px] text-slate-500 uppercase font-bold block">App Title</span>
                        <span className="font-semibold text-white">Nepal Premier League (NPL) - Live Scores & Table</span>
                      </div>
                      <button
                        onClick={() => copyToClipboard('Nepal Premier League (NPL) - Live Scores & Table', 'title')}
                        className="px-2 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 text-[10px] flex items-center gap-1"
                      >
                        {copiedTitle ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                        <span>Copy</span>
                      </button>
                    </div>

                    <div className="flex items-center justify-between bg-slate-900 p-2 rounded border border-slate-800">
                      <div>
                        <span className="text-[10px] text-slate-500 uppercase font-bold block">Short Description</span>
                        <span className="text-slate-300">Live score updates, points table, and fixtures for Nepal Premier League cricket.</span>
                      </div>
                      <button
                        onClick={() => copyToClipboard('Live score updates, points table, and fixtures for Nepal Premier League cricket.', 'desc')}
                        className="px-2 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 text-[10px] flex items-center gap-1"
                      >
                        {copiedDesc ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                        <span>Copy</span>
                      </button>
                    </div>
                  </div>
                </div>

                <div className="p-3 rounded-lg bg-slate-950 border border-slate-800">
                  <div className="font-bold text-white flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-slate-800 text-amber-400 font-bold flex items-center justify-center text-[10px]">5</span>
                    <span>Submit for Review</span>
                  </div>
                  <p className="text-slate-400 text-xs mt-1 pl-7">
                    Click <strong>"Review and Rollout Release"</strong>. Google reviews apps within 24 to 72 hours, after which your NPL app will be live on Google Play Store worldwide!
                  </p>
                </div>
              </div>

              {/* Download Assets */}
              <div className="p-3.5 rounded-xl bg-slate-800/40 border border-slate-700 flex items-center justify-between">
                <div>
                  <h5 className="font-bold text-white text-xs">Ready-to-Use 512x512 Store Icon</h5>
                  <p className="text-slate-400 text-[11px]">Formatted with safe margins for Google Play Store</p>
                </div>
                <a
                  href="/pwa-512x512.png"
                  download="npl-playstore-icon-512.png"
                  className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs flex items-center gap-1.5 transition"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download Icon</span>
                </a>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-slate-950 border-t border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2 text-[11px] text-slate-400">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Ready for Google Play Store Submission</span>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold transition"
          >
            Close Guide
          </button>
        </div>
      </div>
    </div>
  );
};
