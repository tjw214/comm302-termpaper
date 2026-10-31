import React, { useState } from 'react';
import { ChevronDown, ChevronLeft, ChevronRight, X, CheckCircle, Info, Sliders, Target, TrendingDown, Sparkles } from 'lucide-react';
import { UtilityType, Premise, MonthlyConsumption } from '../types';
import { PREMISES, ELECTRICITY_DATA_2026, WATER_DATA_2026 } from '../data/mockData';
import {
  MaintenanceModal,
  USaveModal,
  ConsumptionInfoModal,
  MonthDetailModal,
} from './Modals';

interface TargetsTabProps {
  onNavigateToTab?: (tab: string) => void;
}

export const TargetsTab: React.FC<TargetsTabProps> = ({ onNavigateToTab }) => {
  const [utilityType, setUtilityType] = useState<UtilityType>('electricity');
  const [activePremise, setActivePremise] = useState<Premise>(PREMISES[0]);
  const [showAddressDropdown, setShowAddressDropdown] = useState<boolean>(false);
  const [isUSaveDismissed, setIsUSaveDismissed] = useState<boolean>(false);
  const [yearPeriod, setYearPeriod] = useState<string>('THIS YEAR');
  const [showYearDropdown, setShowYearDropdown] = useState<boolean>(false);

  // Target values state (default 1,405 kWh as in design)
  const [targetKwh, setTargetKwh] = useState<number>(1405);
  const [usedKwh, setUsedKwh] = useState<number>(650);
  const [daysRemaining, setDaysRemaining] = useState<number>(12);
  const remainingKwh = Math.max(0, targetKwh - usedKwh);
  const dailyAllowance = Math.round(remainingKwh / daysRemaining);

  // Modals state
  const [isMaintenanceOpen, setIsMaintenanceOpen] = useState<boolean>(false);
  const [isUSaveOpen, setIsUSaveOpen] = useState<boolean>(false);
  const [isInfoOpen, setIsInfoOpen] = useState<boolean>(false);
  const [isTargetModalOpen, setIsTargetModalOpen] = useState<boolean>(false);
  const [selectedMonth, setSelectedMonth] = useState<MonthlyConsumption | null>(null);

  // Calculation of target & in-progress bar heights (based on 2,440 kWh max)
  const maxAxis = 2440;
  const usedPercent = Math.min(100, Math.round((usedKwh / maxAxis) * 100)); // ~26%
  const remainingPercent = Math.min(100, Math.round((remainingKwh / maxAxis) * 100)); // ~22%
  const targetPercent = Math.min(100, Math.round((targetKwh / maxAxis) * 100)); // ~48%
  // SVG Y coordinate: 0 is top (2440), 140 is bottom (0)
  const targetLineY = Math.round(140 - (targetKwh / maxAxis) * 140); // ~73

  return (
    <div className="space-y-2.5 pb-2">
      {/* Top Banner indicating New Screen */}
      <div className="flex items-center justify-between bg-teal-50 border border-teal-200/80 rounded-xl px-3 py-1.5 text-xs text-[#00837d] font-semibold">
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-[#00afaa] animate-ping"></span>
          <span>Version 2: Monthly Targets & In-Progress Nudge</span>
        </div>
        <span className="text-[10px] bg-[#00afaa] text-white px-2 py-0.5 rounded-full font-bold">
          NEW SCREEN
        </span>
      </div>

      {/* BEGIN: TopNotificationBanner */}
      <header className="px-0">
        <button
          onClick={() => setIsMaintenanceOpen(true)}
          className="w-full flex items-center justify-between bg-[#fff8eb] border border-[#fbd38d] rounded-md px-3 py-2 text-[#d97706] text-[11.5px] font-medium leading-tight shadow-2xs hover:bg-[#fff4dc] transition-colors text-left"
        >
          <div className="flex items-center gap-2 truncate">
            <svg
              className="w-4 h-4 shrink-0 text-[#d97706]"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <circle cx="12" cy="12" r="9" strokeWidth="2"></circle>
              <line strokeWidth="2" x1="12" x2="12" y1="8"></line>
              <line strokeLinecap="round" strokeWidth="2.5" x1="12" x2="12.01" y1="16"></line>
            </svg>
            <span className="truncate">19 Oct - Scheduled Maintenance. Read more he...</span>
          </div>
          <span className="text-[10px] underline font-semibold shrink-0 ml-1">Details</span>
        </button>
      </header>
      {/* END: TopNotificationBanner */}

      {/* BEGIN: PromoBanner */}
      {!isUSaveDismissed && (
        <section className="relative bg-gradient-to-r from-[#20c4b2] via-[#00b5a8] to-[#009b96] rounded-xl p-3 text-white overflow-hidden shadow-xs">
          {/* Close button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsUSaveDismissed(true);
            }}
            aria-label="Dismiss banner"
            className="absolute top-2.5 right-2.5 text-white/80 hover:text-white p-0.5 rounded-full hover:bg-black/10 transition-colors"
          >
            <svg className="w-3.5 h-3.5 stroke-[2.5]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <line x1="18" x2="6" y1="6" y2="18"></line>
              <line x1="6" x2="18" y1="6" y2="18"></line>
            </svg>
          </button>
          <div
            onClick={() => setIsUSaveOpen(true)}
            className="flex items-center gap-3 pr-4 cursor-pointer group"
          >
            {/* GST Voucher Circle Badge */}
            <div className="relative w-12 h-12 rounded-full bg-[#fde047] flex items-center justify-center shrink-0 shadow-inner group-hover:scale-105 transition-transform">
              <div className="w-8 h-5 bg-[#8b181b] rounded-[2px] flex flex-col items-center justify-center shadow-xs">
                <span className="text-[5.5px] font-bold tracking-tight text-[#fde047] leading-none">GST</span>
                <span className="text-[5px] font-bold tracking-tighter text-[#fff] leading-none mt-0.5">VOUCHER</span>
              </div>
            </div>
            {/* Banner Text */}
            <div className="text-[12.5px] font-semibold leading-snug">
              Receive double the regular U-Save in total from Apr 26 to Jan 27
            </div>
          </div>
        </section>
      )}
      {/* END: PromoBanner */}

      {/* BEGIN: ChartContainerCard */}
      <section className="bg-white rounded-2xl p-4 shadow-xs border border-slate-100 flex flex-col relative">
        {/* Address & Utility Selector Row */}
        <div className="flex items-center justify-between pb-2 border-b border-slate-50">
          {/* Address Dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowAddressDropdown(!showAddressDropdown)}
              className="flex items-center gap-1.5 text-left group py-1"
            >
              <span className="font-bold text-slate-800 text-[12.5px]">
                {activePremise.address.includes('128 Toa Payoh') ? '128 Toa Payoh' : activePremise.address}
              </span>
              <svg
                className={`w-3.5 h-3.5 text-slate-500 group-hover:text-slate-800 transition-transform ${
                  showAddressDropdown ? 'rotate-180' : ''
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M19 9l-7 7-7-7" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5"></path>
              </svg>
            </button>

            {/* Address Switcher Dropdown */}
            {showAddressDropdown && (
              <div className="absolute left-0 top-full mt-1.5 w-64 bg-white rounded-xl shadow-xl border border-slate-200 p-1.5 z-30">
                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-2 py-1">
                  Switch Premise
                </div>
                {PREMISES.map((premise) => (
                  <button
                    key={premise.id}
                    onClick={() => {
                      setActivePremise(premise);
                      setShowAddressDropdown(false);
                    }}
                    className={`w-full text-left p-2 rounded-lg text-xs transition-colors flex items-start justify-between ${
                      activePremise.id === premise.id
                        ? 'bg-[#f0fdfa] text-[#00837d] font-semibold'
                        : 'hover:bg-slate-50 text-slate-700'
                    }`}
                  >
                    <div>
                      <div className="font-medium text-xs">{premise.label}</div>
                      <div className="text-[11px] text-slate-500 truncate">{premise.address}</div>
                    </div>
                    {activePremise.id === premise.id && (
                      <CheckCircle className="w-4 h-4 text-[#00afaa] shrink-0 mt-0.5" />
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Toggle Tabs: Electricity & Water */}
          <div className="flex items-center gap-2">
            {/* Electricity Tab (Active) */}
            <button
              onClick={() => setUtilityType('electricity')}
              aria-label="Electricity consumption"
              className={`w-8 h-8 rounded-full flex items-center justify-center transition-all active:scale-95 shadow-2xs ${
                utilityType === 'electricity'
                  ? 'bg-[#d7f7f3] text-[#00a89d] ring-2 ring-[#00a89d]/20'
                  : 'bg-slate-50 text-slate-400 border border-slate-200 hover:bg-slate-100'
              }`}
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M13 2L4.5 13.5H11L9.5 22L19.5 10.5H13L15 2H13Z"></path>
              </svg>
            </button>
            {/* Water Tab (Inactive) */}
            <button
              onClick={() => setUtilityType('water')}
              aria-label="Water consumption"
              className={`w-8 h-8 rounded-full flex items-center justify-center transition-all active:scale-95 shadow-2xs ${
                utilityType === 'water'
                  ? 'bg-[#d7f7f3] text-[#00a89d] ring-2 ring-[#00a89d]/20'
                  : 'bg-slate-50 text-slate-400 border border-slate-200 hover:bg-slate-100'
              }`}
            >
              <svg className="w-4 h-4 stroke-current fill-none stroke-[2]" viewBox="0 0 24 24">
                <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" strokeLinecap="round" strokeLinejoin="round"></path>
              </svg>
            </button>
          </div>
        </div>

        {/* Unit Label & Target Row */}
        <div className="flex items-center justify-between text-slate-600 text-xs mt-1 mb-2 font-medium">
          <span className="font-semibold text-slate-700">kWh</span>
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setIsTargetModalOpen(true)}
              className="bg-[#00837d] hover:bg-[#006e69] text-white text-[9.5px] font-bold px-2 py-0.5 rounded-full shadow-xs whitespace-nowrap transition-transform active:scale-95 flex items-center gap-1"
              title="Click to view or adjust target"
            >
              <span>Target: {targetKwh.toLocaleString()} kWh</span>
            </button>
            <button
              onClick={() => setIsInfoOpen(true)}
              className="text-slate-400 hover:text-slate-600 flex items-center p-0.5 rounded-full hover:bg-slate-100 transition-colors"
              title="Understanding chart benchmarks and targets"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="9" strokeWidth="1.8"></circle>
                <line strokeWidth="1.8" x1="12" x2="12" y1="10" y2="16"></line>
                <circle cx="12" cy="7" fill="currentColor" r="0.75"></circle>
              </svg>
            </button>
          </div>
        </div>

        {/* BEGIN: ConsumptionChart with In-Progress October Target */}
        <div className="relative w-full h-44 mt-1">
          {/* Horizontal Grid Lines and Y-Axis Labels */}
          <div className="absolute inset-0 flex flex-col justify-between pointer-events-none text-[9.5px] text-slate-400 font-medium">
            <div className="flex items-center gap-1.5 w-full">
              <span className="w-7 text-right">2,440</span>
              <div className="flex-1 h-[1px] bg-slate-200"></div>
            </div>
            <div className="flex items-center gap-1.5 w-full">
              <span className="w-7 text-right">1,220</span>
              <div className="flex-1 h-[1px] bg-slate-200"></div>
            </div>
            <div className="flex items-center gap-1.5 w-full">
              <span className="w-7 text-right">0</span>
              <div className="flex-1 h-[1px] bg-slate-300"></div>
            </div>
          </div>

          {/* Chart Area: Bars and SVG Trend Lines */}
          <div className="absolute left-9 right-0 top-2 bottom-3 flex items-end">
            <div className="w-full h-full flex justify-between items-end px-1 relative">
              {/* Month 1: J* */}
              <div
                onClick={() => setSelectedMonth(ELECTRICITY_DATA_2026[0])}
                className="flex flex-col items-center h-full justify-end w-4 z-0 cursor-pointer group"
              >
                <div className="w-3.5 bg-[#a2ece2] group-hover:bg-[#5eead4] rounded-t-sm transition-all" style={{ height: '48%' }}></div>
              </div>
              {/* Month 2: F */}
              <div
                onClick={() => setSelectedMonth(ELECTRICITY_DATA_2026[1])}
                className="flex flex-col items-center h-full justify-end w-4 z-0 cursor-pointer group"
              >
                <div className="w-3.5 bg-[#a2ece2] group-hover:bg-[#5eead4] rounded-t-sm transition-all" style={{ height: '44%' }}></div>
              </div>
              {/* Month 3: M* */}
              <div
                onClick={() => setSelectedMonth(ELECTRICITY_DATA_2026[2])}
                className="flex flex-col items-center h-full justify-end w-4 z-0 cursor-pointer group"
              >
                <div className="w-3.5 bg-[#a2ece2] group-hover:bg-[#5eead4] rounded-t-sm transition-all" style={{ height: '44%' }}></div>
              </div>
              {/* Month 4: A */}
              <div
                onClick={() => setSelectedMonth(ELECTRICITY_DATA_2026[3])}
                className="flex flex-col items-center h-full justify-end w-4 z-0 cursor-pointer group"
              >
                <div className="w-3.5 bg-[#a2ece2] group-hover:bg-[#5eead4] rounded-t-sm transition-all" style={{ height: '49%' }}></div>
              </div>
              {/* Month 5: M* */}
              <div
                onClick={() => setSelectedMonth(ELECTRICITY_DATA_2026[4])}
                className="flex flex-col items-center h-full justify-end w-4 z-0 cursor-pointer group"
              >
                <div className="w-3.5 bg-[#a2ece2] group-hover:bg-[#5eead4] rounded-t-sm transition-all" style={{ height: '44%' }}></div>
              </div>
              {/* Month 6: J */}
              <div
                onClick={() => setSelectedMonth(ELECTRICITY_DATA_2026[5])}
                className="flex flex-col items-center h-full justify-end w-4 z-0 cursor-pointer group"
              >
                <div className="w-3.5 bg-[#a2ece2] group-hover:bg-[#5eead4] rounded-t-sm transition-all" style={{ height: '58%' }}></div>
              </div>
              {/* Month 7: J* */}
              <div
                onClick={() => setSelectedMonth(ELECTRICITY_DATA_2026[6])}
                className="flex flex-col items-center h-full justify-end w-4 z-0 cursor-pointer group"
              >
                <div className="w-3.5 bg-[#a2ece2] group-hover:bg-[#5eead4] rounded-t-sm transition-all" style={{ height: '52%' }}></div>
              </div>
              {/* Month 8: A */}
              <div
                onClick={() => setSelectedMonth(ELECTRICITY_DATA_2026[7])}
                className="flex flex-col items-center h-full justify-end w-4 z-0 cursor-pointer group"
              >
                <div className="w-3.5 bg-[#a2ece2] group-hover:bg-[#5eead4] rounded-t-sm transition-all" style={{ height: '48%' }}></div>
              </div>
              {/* Month 9: S* */}
              <div
                onClick={() => setSelectedMonth(ELECTRICITY_DATA_2026[8])}
                className="flex flex-col items-center h-full justify-end w-4 z-0 cursor-pointer group"
              >
                <div className="w-3.5 bg-[#a2ece2] group-hover:bg-[#5eead4] rounded-t-sm transition-all" style={{ height: '50%' }}></div>
              </div>

              {/* Month 10: O (Active in-progress stacked target bar) */}
              <div
                onClick={() => setIsTargetModalOpen(true)}
                className="flex flex-col items-center h-full justify-end w-4 z-10 relative group cursor-pointer"
              >
                {/* Tooltip on Hover */}
                <div className="absolute -top-10 opacity-0 group-hover:opacity-100 transition-opacity bg-slate-900 text-white text-[9px] px-2 py-1 rounded shadow-lg pointer-events-none whitespace-nowrap z-30">
                  <div className="font-bold text-teal-300">{usedKwh} kWh used</div>
                  <div className="text-slate-300">{remainingKwh} kWh left to target</div>
                </div>

                {/* Remaining dashed segment to target */}
                <div
                  className="w-3.5 border-2 border-dashed border-[#00afaa] rounded-t-sm bg-[#00afaa]/10 transition-all duration-300"
                  style={{ height: `${remainingPercent}%`, borderBottom: '0px' }}
                ></div>
                {/* Used solid segment */}
                <div
                  className="w-3.5 bg-[#00afaa] rounded-b-sm transition-all duration-300"
                  style={{ height: `${usedPercent}%` }}
                ></div>
              </div>

              {/* Month 11: N (No bar) */}
              <div className="flex flex-col items-center h-full justify-end w-4 z-0">
                <div className="w-3.5 bg-transparent h-0"></div>
              </div>
              {/* Month 12: D (No bar) */}
              <div className="flex flex-col items-center h-full justify-end w-4 z-0">
                <div className="w-3.5 bg-transparent h-0"></div>
              </div>

              {/* SVG Overlay for Trend Lines and Target Indicator */}
              <svg
                className="absolute inset-0 w-full h-full pointer-events-none z-10"
                preserveAspectRatio="none"
                viewBox="0 0 300 140"
              >
                {/* Target Dashed Line & Circle over Month O */}
                <line
                  stroke="#00837d"
                  strokeDasharray="3,2"
                  strokeWidth="1.5"
                  x1="229"
                  x2="253"
                  y1={targetLineY}
                  y2={targetLineY}
                ></line>
                <circle cx="241" cy={targetLineY} fill="#00837d" r="2.5"></circle>

                {/* Neighbour Avg: Dotted Straight Segments */}
                <path
                  d="M 12,85 L 37,84 L 63,78 L 88,74 L 114,70 L 139,83 L 165,72 L 190,69 L 216,67"
                  fill="none"
                  stroke="#4b5563"
                  strokeDasharray="2,2"
                  strokeWidth="1.3"
                ></path>

                {/* Efficiency Avg: Solid Straight Segments */}
                <path
                  d="M 12,108 L 37,108 L 63,107 L 88,105 L 114,102 L 139,107 L 165,103 L 190,102 L 216,100"
                  fill="none"
                  stroke="#4b5563"
                  strokeWidth="1.3"
                ></path>
              </svg>
            </div>
          </div>
        </div>

        {/* Month Labels Row */}
        <div className="flex justify-between pl-9 pr-1 text-[9.5px] font-medium text-slate-500 mt-1">
          <span className="w-4 text-center">J*</span>
          <span className="w-4 text-center">F</span>
          <span className="w-4 text-center">M*</span>
          <span className="w-4 text-center">A</span>
          <span className="w-4 text-center">M*</span>
          <span className="w-4 text-center">J</span>
          <span className="w-4 text-center">J*</span>
          <span className="w-4 text-center">A</span>
          <span className="w-4 text-center">S*</span>
          {/* Highlighted October Month Label */}
          <div className="flex flex-col items-center w-5 -mx-0.5">
            <span className="w-4 text-center font-bold text-[#00837d]">O</span>
          </div>
          <span className="w-4 text-center text-slate-400">N</span>
          <span className="w-4 text-center text-slate-400">D</span>
        </div>
        {/* END: ConsumptionChart */}

        {/* Legend */}
        <div className="flex items-center justify-center gap-3 mt-4 text-[10px] text-slate-600 font-medium">
          <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1.5">
            <div className="flex items-center gap-1">
              <span className="w-2.5 h-2.5 rounded-xs bg-[#00afaa]"></span>
              <span>Used so far</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="w-3 border-t-2 border-dashed border-[#00837d]"></span>
              <span>Target</span>
            </div>
            <div className="flex items-center gap-1">
              <svg className="w-3.5 h-[2px]" viewBox="0 0 14 2" fill="none">
                <line x1="0" y1="1" x2="14" y2="1" stroke="#334155" strokeWidth="2" strokeDasharray="2 2" strokeLinecap="round"></line>
              </svg>
              <span>Neighbour Avg.</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="w-3 border-t-2 border-solid border-slate-700"></span>
              <span>Efficiency Avg.</span>
            </div>
          </div>
        </div>

        {/* Billing Month Label & Year Filter Controls */}
        <div className="mt-4 flex flex-col items-center">
          <span className="text-[11px] text-slate-500 font-medium mb-1.5">Billing Month</span>
          <div className="flex items-center border border-slate-200 rounded-full bg-white shadow-2xs overflow-hidden text-xs">
            {/* Prev Button */}
            <button
              onClick={() => setYearPeriod('LAST YEAR (2025)')}
              aria-label="Previous Period"
              className="px-4 py-1.5 text-slate-500 hover:text-slate-800 transition-colors border-r border-slate-200"
            >
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path d="M15 19l-7-7 7-7" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5"></path>
              </svg>
            </button>
            {/* Dropdown selector */}
            <button
              onClick={() => setShowYearDropdown(!showYearDropdown)}
              className="flex items-center gap-1 px-5 py-1.5 font-bold text-slate-700 text-[11px] tracking-wide"
            >
              <span>{yearPeriod}</span>
              <svg className="w-3.5 h-3.5 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path d="M19 9l-7 7-7-7" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5"></path>
              </svg>
            </button>
            {/* Next Button (Disabled) */}
            <button
              onClick={() => setYearPeriod('THIS YEAR')}
              disabled={yearPeriod === 'THIS YEAR'}
              aria-label="Next Period"
              className="px-4 py-1.5 text-slate-300 cursor-not-allowed border-l border-slate-200"
            >
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path d="M9 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5"></path>
              </svg>
            </button>
          </div>
        </div>

        {/* Target Progress & Daily Burn Rate Section */}
        <div className="mt-4 pt-3 border-t border-slate-100">
          <div
            onClick={() => setIsTargetModalOpen(true)}
            className="flex items-center justify-between bg-[#f8fafc] border border-slate-200 rounded-xl p-2.5 cursor-pointer hover:bg-slate-100/70 transition-colors"
          >
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full bg-[#d7f7f3] text-[#00afaa] flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-[16px]">speed</span>
              </div>
              <div>
                <div className="text-[11px] font-bold text-slate-800 tracking-tight">
                  {usedKwh} kWh used · <span className="text-[#00afaa]">{remainingKwh} kWh to go</span>
                </div>
                <div className="text-[9.5px] text-slate-500 font-medium">
                  {daysRemaining} days left in billing cycle
                </div>
              </div>
            </div>
            <div className="text-right shrink-0">
              <span className="text-[10px] text-slate-400 font-medium">Adjust ❯</span>
            </div>
          </div>

          <div className="mt-2 flex items-start gap-1.5 px-1">
            <span className="material-symbols-outlined text-amber-500 text-[14px] shrink-0 mt-0.5">info</span>
            <p className="text-[10px] text-slate-600 leading-none flex items-center gap-1 text-left translate-y-[0.5px]">
              <strong className="text-slate-800 font-semibold">Keep under {dailyAllowance} kWh/day</strong>
              <span>to stay within target.</span>
            </p>
          </div>
        </div>
      </section>
      {/* END: ChartContainerCard */}

      {/* BEGIN: InsightsCalloutCard / Target Statement */}
      <div className="space-y-2.5 mt-4">
        <div
          onClick={() => setIsTargetModalOpen(true)}
          className="flex items-center justify-between bg-white border border-slate-100 rounded-xl px-3.5 py-2.5 shadow-2xs text-[11px] text-slate-600 font-medium cursor-pointer hover:border-teal-200 transition-colors"
        >
          <span className="truncate">
            <strong className="text-slate-800 font-semibold">October target: {targetKwh.toLocaleString()} kWh</strong> · Set on 1 Oct (5% below September)
          </span>
          <span className="text-teal-600 font-bold ml-1 text-xs shrink-0">✎</span>
        </div>
      </div>
      {/* END: InsightsCalloutCard */}

      {/* BEGIN: PromoCarouselTeaser */}
      <section className="pt-1 overflow-hidden">
        <div className="flex gap-3 overflow-x-auto no-scrollbar pb-1">
          {/* Card 1: Cashback */}
          <div
            onClick={() => onNavigateToTab?.('Bills')}
            className="min-w-[270px] bg-white rounded-xl border border-slate-100 shadow-2xs flex items-center p-2.5 gap-2.5 cursor-pointer hover:border-slate-200 transition-all hover:shadow-xs"
          >
            <div className="w-20 h-12 bg-gradient-to-tr from-blue-700 via-indigo-600 to-sky-400 rounded-md flex items-center justify-center p-1 relative shadow-inner shrink-0">
              <div className="w-12 h-7 border border-white/40 rounded bg-white/20 backdrop-blur-xs flex items-end p-1">
                <span className="text-[5px] text-white font-mono font-semibold">•••• 8821</span>
              </div>
            </div>
            <div>
              <div className="text-[11px] font-bold text-slate-800">Up to 4.33%</div>
              <div className="text-[9px] text-slate-500">cashback on utility bills</div>
            </div>
          </div>

          {/* Card 2: Green Rewards */}
          <div
            onClick={() => onNavigateToTab?.('GreenUP')}
            className="min-w-[270px] bg-white rounded-xl border border-slate-100 shadow-2xs flex items-center p-2.5 gap-2.5 cursor-pointer hover:border-slate-200 transition-all hover:shadow-xs"
          >
            <div className="w-20 h-12 bg-gradient-to-r from-sky-500 to-blue-600 rounded-md flex items-center justify-center relative overflow-hidden shrink-0">
              <svg className="w-7 h-7 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="9" strokeWidth="1.5"></circle>
                <path d="M12 3v18M3 12h18"></path>
              </svg>
            </div>
            <div>
              <div className="text-[11px] font-bold text-slate-800">Green Rewards</div>
              <div className="text-[9px] text-slate-500">Redeem lifestyle deals</div>
            </div>
          </div>
        </div>
      </section>
      {/* END: PromoCarouselTeaser */}

      {/* Target Setting & Adjustment Interactive Modal */}
      {isTargetModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white w-full max-w-sm rounded-2xl p-5 shadow-2xl relative">
            <button
              onClick={() => setIsTargetModalOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 p-1"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2.5 mb-3">
              <div className="w-8 h-8 rounded-full bg-teal-100 text-[#00837d] flex items-center justify-center shrink-0">
                <Target className="w-4 h-4" />
              </div>
              <div>
                <h3 className="font-bold text-slate-800 text-sm">October Consumption Target</h3>
                <p className="text-[10px] text-slate-500">Behavioral goal-setting intervention</p>
              </div>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed mb-3">
              Goal commitment nudges encourage households to reduce energy usage before the billing cycle ends.
            </p>

            <div className="bg-[#f0fdfa] border border-[#a7f3d0] rounded-xl p-3 mb-3 text-xs space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-slate-600">Current Target:</span>
                <span className="font-extrabold text-[#00837d] text-sm">{targetKwh.toLocaleString()} kWh</span>
              </div>
              <div className="flex justify-between items-center text-[11px]">
                <span className="text-slate-500">Benchmark comparison:</span>
                <span className="text-emerald-700 font-semibold">5% below September (1,480 kWh)</span>
              </div>
              <div className="flex justify-between items-center text-[11px]">
                <span className="text-slate-500">Est. Bill Impact:</span>
                <span className="text-slate-700 font-semibold">Save approx. $22.40 SGD</span>
              </div>
            </div>

            {/* Target Adjuster Preset Buttons */}
            <div className="space-y-1.5 mb-4">
              <div className="text-[11px] font-semibold text-slate-700">Quick Target Options:</div>
              <div className="grid grid-cols-3 gap-2 text-xs">
                {[
                  { label: '-5% Goal', val: 1405 },
                  { label: '-10% Goal', val: 1330 },
                  { label: '-15% Goal', val: 1258 },
                ].map((opt) => (
                  <button
                    key={opt.val}
                    onClick={() => setTargetKwh(opt.val)}
                    className={`py-2 px-1 rounded-xl text-center font-bold text-[11px] border transition-all ${
                      targetKwh === opt.val
                        ? 'bg-[#00afaa] text-white border-[#00afaa] shadow-xs'
                        : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    <div>{opt.label}</div>
                    <div className="text-[9.5px] font-normal opacity-90">{opt.val} kWh</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Slider to fine-tune */}
            <div className="space-y-1.5 mb-4">
              <div className="flex justify-between text-[11px]">
                <span className="text-slate-600">Custom Target:</span>
                <span className="font-bold text-slate-800">{targetKwh} kWh</span>
              </div>
              <input
                type="range"
                min="1150"
                max="1600"
                step="5"
                value={targetKwh}
                onChange={(e) => setTargetKwh(Number(e.target.value))}
                className="w-full accent-[#00afaa] cursor-pointer h-1.5 bg-slate-100 rounded-lg"
              />
              <div className="flex justify-between text-[9px] text-slate-400">
                <span>1,150 kWh (Ambitious)</span>
                <span>1,600 kWh (Standard)</span>
              </div>
            </div>

            <button
              onClick={() => setIsTargetModalOpen(false)}
              className="w-full py-2.5 bg-[#00afaa] hover:bg-[#009b96] text-white font-semibold text-xs rounded-xl shadow-xs transition-colors"
            >
              Save Target & Keep Tracking
            </button>
          </div>
        </div>
      )}

      {/* Other Modals */}
      <MaintenanceModal
        isOpen={isMaintenanceOpen}
        onClose={() => setIsMaintenanceOpen(false)}
      />
      <USaveModal
        isOpen={isUSaveOpen}
        onClose={() => setIsUSaveOpen(false)}
      />
      <ConsumptionInfoModal
        isOpen={isInfoOpen}
        onClose={() => setIsInfoOpen(false)}
        utilityType={utilityType}
      />
      <MonthDetailModal
        isOpen={!!selectedMonth}
        onClose={() => setSelectedMonth(null)}
        data={selectedMonth}
        utilityType={utilityType}
      />
    </div>
  );
};
