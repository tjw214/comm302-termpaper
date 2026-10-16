import React, { useState } from 'react';
import { Eye, EyeOff, Info, ChevronDown, ChevronLeft, ChevronRight, ArrowRight, X, ShieldAlert, Sparkles, CreditCard, Gift, Sun, CheckCircle } from 'lucide-react';
import { MonthlyConsumption, UtilityType, Premise } from '../types';
import { ELECTRICITY_DATA_2026, WATER_DATA_2026, PREMISES } from '../data/mockData';
import { MascotIcon } from './MascotIcon';
import {
  MaintenanceModal,
  USaveModal,
  ConsumptionInfoModal,
  EnergyInsightsModal,
  MonthDetailModal,
} from './Modals';

interface HomeTabProps {
  onNavigateToTab?: (tab: string) => void;
}

export const HomeTab: React.FC<HomeTabProps> = ({ onNavigateToTab }) => {
  const [utilityType, setUtilityType] = useState<UtilityType>('electricity');
  const [activePremise, setActivePremise] = useState<Premise>(PREMISES[0]);
  const [isAddressBlurred, setIsAddressBlurred] = useState<boolean>(true);
  const [showAddressDropdown, setShowAddressDropdown] = useState<boolean>(false);
  const [isUSaveDismissed, setIsUSaveDismissed] = useState<boolean>(false);
  const [yearPeriod, setYearPeriod] = useState<string>('THIS YEAR');
  const [showYearDropdown, setShowYearDropdown] = useState<boolean>(false);

  // Modals state
  const [isMaintenanceOpen, setIsMaintenanceOpen] = useState<boolean>(false);
  const [isUSaveOpen, setIsUSaveOpen] = useState<boolean>(false);
  const [isInfoOpen, setIsInfoOpen] = useState<boolean>(false);
  const [isInsightsOpen, setIsInsightsOpen] = useState<boolean>(false);
  const [selectedMonth, setSelectedMonth] = useState<MonthlyConsumption | null>(null);

  // Chart data calculation
  const data = utilityType === 'electricity' ? ELECTRICITY_DATA_2026 : WATER_DATA_2026;
  const maxAxis = utilityType === 'electricity' ? 2440 : 40;
  const midAxis = utilityType === 'electricity' ? 1220 : 20;
  const unitLabel = utilityType === 'electricity' ? 'kWh' : 'Cu M';

  // SVG Trend line points generation for months 0 to 8 (Jan to Sep)
  // Column centers in an SVG viewbox width 300, height 140
  // 12 columns across 300px: step is ~25px, first center ~12.5px
  const getCurvePath = (key: 'neighbourAvg' | 'efficiencyAvg') => {
    const points = data.slice(0, 9).map((m, idx) => {
      const x = 12.5 + idx * 25;
      const val = m[key];
      // SVG Y: 0 is top (maxAxis), 140 is bottom (0)
      const y = Math.max(8, Math.min(135, 140 - (val / maxAxis) * 140));
      return { x, y };
    });

    if (points.length === 0) return '';
    // Build smooth cubic bezier or line string
    return points.reduce((acc, curr, index) => {
      if (index === 0) return `M ${curr.x},${curr.y}`;
      const prev = points[index - 1];
      const cx = (prev.x + curr.x) / 2;
      return `${acc} Q ${cx},${prev.y} ${curr.x},${curr.y}`;
    }, '');
  };

  return (
    <div className="space-y-2.5 pb-2">
      {/* 1. Maintenance Alert Banner */}
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

      {/* 2. Promo Banner: Turquoise U-Save Banner */}
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
            className="flex items-center gap-3 pr-5 cursor-pointer group"
          >
            {/* GST Voucher Circle Badge */}
            <div className="relative w-12 h-12 rounded-full bg-[#fde047] flex items-center justify-center shrink-0 shadow-inner group-hover:scale-105 transition-transform">
              <div className="w-8 h-5 bg-[#8b181b] rounded-[2px] flex flex-col items-center justify-center shadow-xs">
                <span className="text-[5.5px] font-bold tracking-tight text-[#fde047] leading-none">
                  GST
                </span>
                <span className="text-[5px] font-bold tracking-tighter text-[#fff] leading-none mt-0.5">
                  VOUCHER
                </span>
              </div>
            </div>

            {/* Banner Text */}
            <div className="text-[12.5px] font-semibold leading-snug">
              Receive double the regular U-Save in total from Apr 26 to Jan 27
            </div>
          </div>
        </section>
      )}

      {/* 3. Chart Container Card */}
      <section className="bg-white rounded-2xl p-4 shadow-xs border border-slate-100 flex flex-col relative">
        {/* Address & Utility Selector Row */}
        <div className="flex items-center justify-between pb-2 border-b border-slate-50">
          {/* Address Dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowAddressDropdown(!showAddressDropdown)}
              className="flex items-center gap-1.5 text-left group py-1"
            >
              {isAddressBlurred ? (
                <div className="w-32 h-3.5 bg-slate-200/90 rounded filter blur-[1.5px] transition-all group-hover:bg-slate-300"></div>
              ) : (
                <span className="text-xs font-semibold text-slate-800 max-w-[170px] truncate">
                  {activePremise.address}
                </span>
              )}
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

            {/* Privacy toggle icon next to address */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsAddressBlurred(!isAddressBlurred);
              }}
              title={isAddressBlurred ? 'Reveal address' : 'Hide address'}
              className="ml-1 inline-flex text-slate-400 hover:text-slate-600 transition-colors align-middle"
            >
              {isAddressBlurred ? <Eye className="w-3 h-3 inline" /> : <EyeOff className="w-3 h-3 inline" />}
            </button>

            {/* Address Switcher Dropdown Menu */}
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
            {/* Electricity Tab */}
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

            {/* Water Tab */}
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

        {/* Unit Label & Info Icon */}
        <div className="flex items-center justify-between text-slate-600 text-xs mt-2 mb-2 font-medium">
          <span className="font-semibold text-slate-700">{unitLabel}</span>
          <button
            onClick={() => setIsInfoOpen(true)}
            className="text-slate-400 hover:text-slate-600 transition-colors p-0.5 rounded-full hover:bg-slate-100"
            title="What do these numbers and asterisks mean?"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="9" strokeWidth="1.8"></circle>
              <line strokeWidth="1.8" x1="12" x2="12" y1="10" y2="16"></line>
              <circle cx="12" cy="7" fill="currentColor" r="0.75"></circle>
            </svg>
          </button>
        </div>

        {/* Consumption Chart Component */}
        <div className="relative w-full h-44 mt-1">
          {/* Horizontal Grid Lines and Y-Axis Labels */}
          <div className="absolute inset-0 flex flex-col justify-between pointer-events-none text-[9.5px] text-slate-400 font-medium">
            <div className="flex items-center gap-1.5 w-full">
              <span className="w-7 text-right">{maxAxis.toLocaleString()}</span>
              <div className="flex-1 h-[1px] bg-slate-200"></div>
            </div>
            <div className="flex items-center gap-1.5 w-full">
              <span className="w-7 text-right">{midAxis.toLocaleString()}</span>
              <div className="flex-1 h-[1px] bg-slate-200"></div>
            </div>
            <div className="flex items-center gap-1.5 w-full">
              <span className="w-7 text-right">0</span>
              <div className="flex-1 h-[1px] bg-slate-300"></div>
            </div>
          </div>

          {/* Chart Area: Bars and SVG Trend Lines */}
          <div className="absolute left-9 right-0 top-2 bottom-3 flex items-end">
            {/* 12 Months Columns */}
            <div className="w-full h-full flex justify-between items-end px-1 relative">
              {data.map((m, idx) => {
                const heightPercent = m.consumption > 0 ? (m.consumption / maxAxis) * 100 : 0;
                return (
                  <div
                    key={idx}
                    onClick={() => m.consumption > 0 && setSelectedMonth(m)}
                    className="flex flex-col items-center h-full justify-end w-4 z-20 group cursor-pointer relative"
                  >
                    {/* Tooltip on Hover */}
                    {m.consumption > 0 && (
                      <div className="absolute -top-7 opacity-0 group-hover:opacity-100 transition-opacity bg-slate-800 text-white text-[9px] px-1.5 py-0.5 rounded shadow pointer-events-none whitespace-nowrap z-30">
                        {m.consumption} {unitLabel}
                      </div>
                    )}

                    {m.consumption > 0 ? (
                      <div
                        className="w-3.5 bg-[#a2ece2] group-hover:bg-[#5eead4] rounded-t-xs transition-all duration-300"
                        style={{ height: `${heightPercent}%` }}
                      ></div>
                    ) : (
                      <div className="w-3.5 bg-transparent h-0"></div>
                    )}
                  </div>
                );
              })}

              {/* SVG Overlay for Trend Lines */}
              <svg
                className="absolute inset-0 w-full h-full pointer-events-none z-10"
                preserveAspectRatio="none"
                viewBox="0 0 300 140"
              >
                {/* Neighbour Avg: Dotted Line */}
                <path
                  d={getCurvePath('neighbourAvg')}
                  fill="none"
                  stroke="#4b5563"
                  strokeDasharray="2,2"
                  strokeWidth="1.3"
                ></path>

                {/* Efficiency Avg: Solid Line */}
                <path
                  d={getCurvePath('efficiencyAvg')}
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
          {data.map((m, idx) => (
            <span
              key={idx}
              onClick={() => m.consumption > 0 && setSelectedMonth(m)}
              className={`w-4 text-center cursor-pointer transition-colors ${
                m.consumption > 0 ? 'hover:text-[#00afaa] font-semibold' : 'text-slate-400'
              }`}
            >
              {m.monthKey}
            </span>
          ))}
        </div>

        {/* Legend */}
        <div className="flex items-center justify-center gap-3 mt-4 text-[10px] text-slate-600 font-medium">
          {/* Consumption Dot */}
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#a2ece2]"></span>
            <span>Consumption</span>
          </div>

          {/* Neighbour Line */}
          <div className="flex items-center gap-1.5">
            <span className="w-3 border-t-2 border-dashed border-slate-700"></span>
            <span>Neighbour Avg.</span>
          </div>

          {/* Efficiency Line */}
          <div className="flex items-center gap-1.5">
            <span className="w-3 border-t-2 border-solid border-slate-700"></span>
            <span>Efficiency Avg.</span>
          </div>
        </div>

        {/* Billing Month Label & Year Filter Controls */}
        <div className="mt-4 flex flex-col items-center">
          <span className="text-[11px] text-slate-500 font-medium mb-1.5">Billing Month</span>
          <div className="relative">
            <div className="flex items-center border border-slate-200 rounded-full bg-white shadow-2xs overflow-hidden text-xs">
              {/* Prev Button */}
              <button
                onClick={() => setYearPeriod('LAST YEAR (2025)')}
                aria-label="Previous Period"
                className="px-4 py-1.5 text-slate-500 hover:text-slate-800 transition-colors border-r border-slate-200 active:bg-slate-50"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
              </button>

              {/* Dropdown selector */}
              <button
                onClick={() => setShowYearDropdown(!showYearDropdown)}
                className="flex items-center gap-1 px-5 py-1.5 font-bold text-slate-700 text-[11px] tracking-wide hover:bg-slate-50 transition-colors"
              >
                <span>{yearPeriod}</span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-500" />
              </button>

              {/* Next Button */}
              <button
                onClick={() => setYearPeriod('THIS YEAR')}
                disabled={yearPeriod === 'THIS YEAR'}
                aria-label="Next Period"
                className={`px-4 py-1.5 border-l border-slate-200 transition-colors ${
                  yearPeriod === 'THIS YEAR'
                    ? 'text-slate-300 cursor-not-allowed'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Year Dropdown Menu */}
            {showYearDropdown && (
              <div className="absolute top-full mt-1.5 left-1/2 -translate-x-1/2 w-44 bg-white rounded-xl shadow-xl border border-slate-200 p-1 z-30 text-xs">
                {['THIS YEAR', 'LAST YEAR (2025)', '2024'].map((yr) => (
                  <button
                    key={yr}
                    onClick={() => {
                      setYearPeriod(yr);
                      setShowYearDropdown(false);
                    }}
                    className={`w-full text-center py-2 rounded-lg transition-colors ${
                      yearPeriod === yr
                        ? 'bg-[#f0fdfa] text-[#00afaa] font-bold'
                        : 'text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    {yr}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 4. Mascot Energy Insights Callout Card */}
      <section
        onClick={() => setIsInsightsOpen(true)}
        className="relative bg-gradient-to-r from-[#00b5a8] to-[#009289] rounded-xl p-3 text-white flex items-center justify-between shadow-2xs overflow-visible mt-4 cursor-pointer hover:brightness-105 active:scale-[0.99] transition-all"
      >
        {/* Mascot Illustration hovering on top left */}
        <div className="absolute -top-4 left-2 shrink-0">
          <MascotIcon size="md" />
        </div>

        {/* Banner Text Content */}
        <div className="pl-12 pr-2">
          <p className="text-[12px] font-semibold leading-snug">
            Learn more about energy insights to start optimising!
          </p>
        </div>

        {/* Action Arrow */}
        <button
          aria-label="Go to insights"
          className="shrink-0 p-1 text-white hover:translate-x-0.5 transition-transform"
        >
          <svg className="w-5 h-5 stroke-[2.5]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <line x1="5" x2="19" y1="12" y2="12"></line>
            <polyline points="12 5 19 12 12 19"></polyline>
          </svg>
        </button>
      </section>

      {/* 5. Promo Carousel Teaser */}
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
              <svg className="w-7 h-7 text-white/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="9" strokeWidth="1.5"></circle>
                <path d="M12 3v18M3 12h18"></path>
              </svg>
            </div>
            <div>
              <div className="text-[11px] font-bold text-slate-800">Green Rewards</div>
              <div className="text-[9px] text-slate-500">Redeem lifestyle deals</div>
            </div>
          </div>

          {/* Card 3: EV Fast Charging */}
          <div
            onClick={() => onNavigateToTab?.('EV Charging')}
            className="min-w-[270px] bg-white rounded-xl border border-slate-100 shadow-2xs flex items-center p-2.5 gap-2.5 cursor-pointer hover:border-slate-200 transition-all hover:shadow-xs"
          >
            <div className="w-20 h-12 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-md flex items-center justify-center relative overflow-hidden shrink-0 text-white">
              <span className="font-bold text-sm tracking-tighter">⚡ EV</span>
            </div>
            <div>
              <div className="text-[11px] font-bold text-slate-800">SP EV Charging</div>
              <div className="text-[9px] text-slate-500">Over 1,000 charge points islandwide</div>
            </div>
          </div>
        </div>
      </section>

      {/* Modals */}
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
      <EnergyInsightsModal
        isOpen={isInsightsOpen}
        onClose={() => setIsInsightsOpen(false)}
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
