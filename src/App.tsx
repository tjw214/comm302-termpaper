/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Home, FileText, Smartphone, Wifi, Battery, BatteryMedium, Sparkles } from 'lucide-react';
import { HomeTab } from './components/HomeTab';
import { BillsTab } from './components/BillsTab';
import { GreenUpTab } from './components/GreenUpTab';
import { EvChargingTab } from './components/EvChargingTab';
import { ProfileTab } from './components/ProfileTab';

export default function App() {
  const [activeTab, setActiveTab] = useState<'Home' | 'Bills' | 'GreenUP' | 'EV Charging' | 'Profile'>('Home');
  const [isPhoneFrame, setIsPhoneFrame] = useState<boolean>(true);

  return (
    <div className="bg-[#f0f2f5] min-h-screen flex flex-col items-center justify-start py-0 md:py-6 antialiased font-sans text-slate-800">
      {/* Desktop view controls */}
      <div className="hidden md:flex items-center gap-3 mb-3 bg-white px-3 py-1.5 rounded-full shadow-2xs border border-slate-200 text-xs">
        <span className="text-slate-500 font-medium">Preview Mode:</span>
        <button
          onClick={() => setIsPhoneFrame(true)}
          className={`px-3 py-1 rounded-full font-semibold transition-all ${
            isPhoneFrame ? 'bg-[#00afaa] text-white shadow-xs' : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          📱 Mobile Device (412px)
        </button>
        <button
          onClick={() => setIsPhoneFrame(false)}
          className={`px-3 py-1 rounded-full font-semibold transition-all ${
            !isPhoneFrame ? 'bg-[#00afaa] text-white shadow-xs' : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          🖥️ Expanded Responsive
        </button>
      </div>

      {/* Main App Container */}
      <div
        className={`w-full bg-[#f8fafc] flex flex-col min-h-screen relative shadow-2xl overflow-x-hidden pb-20 ${
          isPhoneFrame ? 'max-w-[412px] md:rounded-[36px] md:border-[7px] md:border-slate-800 md:min-h-[860px]' : 'max-w-2xl md:rounded-2xl border border-slate-200'
        }`}
      >
        {/* Mobile Device Status Bar */}
        <div className="px-5 pt-3 pb-1 flex justify-between items-center text-slate-700 text-[11px] font-semibold select-none">
          <span>9:41</span>
          {/* Subtle camera punch hole in mobile preview */}
          {isPhoneFrame && (
            <div className="hidden md:block w-3.5 h-3.5 bg-slate-900 rounded-full mx-auto -mt-1 opacity-75"></div>
          )}
          <div className="flex items-center gap-1.5 text-slate-600">
            <Wifi className="w-3.5 h-3.5" />
            <span className="text-[10px] font-bold">5G</span>
            <BatteryMedium className="w-4 h-4" />
          </div>
        </div>

        {/* Dynamic Screen Content */}
        <main className="flex-1 px-3 pt-1 space-y-2.5">
          {activeTab === 'Home' && <HomeTab onNavigateToTab={(tab: any) => setActiveTab(tab)} />}
          {activeTab === 'Bills' && <BillsTab />}
          {activeTab === 'GreenUP' && <GreenUpTab />}
          {activeTab === 'EV Charging' && <EvChargingTab />}
          {activeTab === 'Profile' && <ProfileTab />}
        </main>

        {/* BEGIN: BottomNavigation */}
        <nav
          className={`fixed md:absolute bottom-0 w-full bg-white border-t border-slate-200 py-1.5 px-2 z-40 shadow-lg ${
            isPhoneFrame ? 'max-w-[412px] md:rounded-b-[30px]' : 'max-w-2xl'
          }`}
        >
          <div className="flex justify-between items-center text-center">
            {/* 1. Home */}
            <button
              onClick={() => setActiveTab('Home')}
              className={`flex flex-col items-center flex-1 transition-all py-1 ${
                activeTab === 'Home' ? 'text-[#00afaa]' : 'text-slate-400 hover:text-slate-600'
              }`}
            >
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"></path>
              </svg>
              <span className={`text-[10px] mt-1 ${activeTab === 'Home' ? 'font-bold' : 'font-medium'}`}>
                Home
              </span>
            </button>

            {/* 2. Bills */}
            <button
              onClick={() => setActiveTab('Bills')}
              className={`flex flex-col items-center flex-1 transition-all py-1 ${
                activeTab === 'Bills' ? 'text-[#00afaa]' : 'text-slate-400 hover:text-slate-600'
              }`}
            >
              <svg className="w-5 h-5 stroke-current fill-none stroke-[2]" viewBox="0 0 24 24">
                <path
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>
              </svg>
              <span className={`text-[10px] mt-1 ${activeTab === 'Bills' ? 'font-bold' : 'font-medium'}`}>
                Bills
              </span>
            </button>

            {/* 3. GreenUP */}
            <button
              onClick={() => setActiveTab('GreenUP')}
              className={`flex flex-col items-center flex-1 transition-all py-1 ${
                activeTab === 'GreenUP' ? 'text-[#00afaa]' : 'text-slate-400 hover:text-slate-600'
              }`}
            >
              <div
                className={`w-5 h-5 border-2 rounded flex items-center justify-center font-bold text-[8.5px] leading-none ${
                  activeTab === 'GreenUP' ? 'border-[#00afaa] text-[#00afaa]' : 'border-current text-slate-400'
                }`}
              >
                <span className="transform -translate-y-[0.5px]">⇧</span>
              </div>
              <span className={`text-[10px] mt-1 ${activeTab === 'GreenUP' ? 'font-bold' : 'font-medium'}`}>
                GreenUP
              </span>
            </button>

            {/* 4. EV Charging */}
            <button
              onClick={() => setActiveTab('EV Charging')}
              className={`flex flex-col items-center flex-1 transition-all py-1 ${
                activeTab === 'EV Charging' ? 'text-[#00afaa]' : 'text-slate-400 hover:text-slate-600'
              }`}
            >
              <svg className="w-5 h-5 stroke-current fill-none stroke-[2]" viewBox="0 0 24 24">
                <rect height="8" rx="2" strokeLinecap="round" strokeLinejoin="round" width="18" x="3" y="10"></rect>
                <path d="M5 10l1.5-4.5h11L19 10" strokeLinecap="round" strokeLinejoin="round"></path>
                <circle cx="7.5" cy="14" fill="currentColor" r="1.5"></circle>
                <circle cx="16.5" cy="14" fill="currentColor" r="1.5"></circle>
              </svg>
              <span className={`text-[10px] mt-1 ${activeTab === 'EV Charging' ? 'font-bold' : 'font-medium'}`}>
                EV Charging
              </span>
            </button>

            {/* 5. Profile */}
            <button
              onClick={() => setActiveTab('Profile')}
              className={`flex flex-col items-center flex-1 transition-all py-1 ${
                activeTab === 'Profile' ? 'text-[#00afaa]' : 'text-slate-400 hover:text-slate-600'
              }`}
            >
              <svg className="w-5 h-5 stroke-current fill-none stroke-[2]" viewBox="0 0 24 24">
                <path d="M16 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" strokeLinecap="round" strokeLinejoin="round"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
              <span className={`text-[10px] mt-1 ${activeTab === 'Profile' ? 'font-bold' : 'font-medium'}`}>
                Profile
              </span>
            </button>
          </div>
        </nav>
        {/* END: BottomNavigation */}
      </div>
    </div>
  );
}
