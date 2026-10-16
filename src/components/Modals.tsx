import React, { useState } from 'react';
import { X, AlertTriangle, CheckCircle2, ChevronRight, Zap, Droplets, Info, Sparkles, Sliders, ExternalLink, QrCode, CreditCard, ShieldCheck } from 'lucide-react';
import { MonthlyConsumption, UtilityType } from '../types';
import { MascotIcon } from './MascotIcon';

// 1. Maintenance Modal
export const MaintenanceModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-sm rounded-2xl p-5 shadow-2xl relative border border-slate-100">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 p-1"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center shrink-0">
            <AlertTriangle className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-slate-800 text-sm">Scheduled Maintenance</h3>
            <p className="text-xs text-amber-600 font-medium">Sunday, 19 Oct 2026</p>
          </div>
        </div>

        <div className="space-y-3 text-xs text-slate-600">
          <p className="bg-amber-50/70 p-2.5 rounded-lg border border-amber-200/60 leading-relaxed">
            Please be informed that our digital services will be undergoing routine systems maintenance to serve you better.
          </p>

          <div className="space-y-1.5 pt-1">
            <div className="font-semibold text-slate-700">Maintenance Window:</div>
            <div className="flex items-center gap-2 text-slate-600">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
              <span>19 Oct 2026, 01:00 AM – 06:00 AM SGT</span>
            </div>
          </div>

          <div className="space-y-1.5">
            <div className="font-semibold text-slate-700">Services Intermittently Affected:</div>
            <ul className="list-disc pl-4 space-y-1 text-slate-500">
              <li>Instant bill payment updates</li>
              <li>EV charging remote payment authorization</li>
              <li>GreenUP challenge progress syncing</li>
            </ul>
          </div>

          <div className="text-[11px] text-slate-400 pt-2 border-t border-slate-100">
            For emergencies (gas leak / power outage), call our 24/7 hotline at <strong className="text-slate-700">1800-778-8888</strong>.
          </div>
        </div>

        <button
          onClick={onClose}
          className="mt-4 w-full py-2.5 bg-slate-800 hover:bg-slate-900 text-white font-medium text-xs rounded-xl transition-colors shadow-sm"
        >
          Got it
        </button>
      </div>
    </div>
  );
};

// 2. U-Save Rebate Modal
export const USaveModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-sm rounded-2xl p-5 shadow-2xl relative max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 p-1"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-3">
          <div className="relative w-11 h-11 rounded-full bg-[#fde047] flex items-center justify-center shrink-0 shadow-sm">
            <div className="w-7 h-4.5 bg-[#8b181b] rounded-[2px] flex flex-col items-center justify-center">
              <span className="text-[5px] font-bold text-[#fde047] leading-none">GST</span>
              <span className="text-[4px] font-bold text-white leading-none mt-0.5">VOUCHER</span>
            </div>
          </div>
          <div>
            <h3 className="font-bold text-slate-800 text-sm">GST Voucher – U-Save Rebates</h3>
            <p className="text-[11px] text-[#00afaa] font-semibold">FY2026 Enhanced Support</p>
          </div>
        </div>

        <p className="text-xs text-slate-600 mb-3 leading-relaxed">
          Eligible Singaporean HDB households receive <strong>double the regular U-Save</strong> in total over 4 disbursement cycles (Apr 2026, Jul 2026, Oct 2026, and Jan 2027) to cushion utility costs.
        </p>

        <div className="border border-slate-200 rounded-xl overflow-hidden mb-3 text-xs">
          <div className="bg-slate-50 px-3 py-2 font-semibold text-slate-700 border-b border-slate-200 flex justify-between">
            <span>HDB Flat Type</span>
            <span>Total FY26 U-Save</span>
          </div>
          <div className="divide-y divide-slate-100">
            <div className="px-3 py-2 flex justify-between text-slate-600">
              <span>1- and 2-Room</span>
              <span className="font-bold text-[#00afaa]">$950</span>
            </div>
            <div className="px-3 py-2 flex justify-between text-slate-600">
              <span>3-Room</span>
              <span className="font-bold text-[#00afaa]">$850</span>
            </div>
            <div className="px-3 py-2 flex justify-between text-slate-800 bg-[#f0fdfa] font-medium">
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#00afaa]"></span>
                4-Room (Your Flat)
              </span>
              <span className="font-bold text-[#00afaa]">$750</span>
            </div>
            <div className="px-3 py-2 flex justify-between text-slate-600">
              <span>5-Room</span>
              <span className="font-bold text-[#00afaa]">$650</span>
            </div>
            <div className="px-3 py-2 flex justify-between text-slate-600">
              <span>Executive / Multi-Gen</span>
              <span className="font-bold text-[#00afaa]">$550</span>
            </div>
          </div>
        </div>

        <div className="bg-[#f0fdfa] border border-[#a7f3d0] rounded-xl p-3 text-xs text-slate-700 space-y-1 mb-3">
          <div className="font-semibold text-[#00837d] flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-[#00afaa]" />
            Automatic Bill Offset
          </div>
          <p className="text-[11px] text-slate-600 leading-snug">
            Rebates are credited directly to your SP Services utility account. Any unused U-Save automatically rolls over to subsequent months.
          </p>
        </div>

        <button
          onClick={onClose}
          className="w-full py-2.5 bg-[#00afaa] hover:bg-[#009b96] text-white font-medium text-xs rounded-xl transition-colors shadow-sm"
        >
          Close
        </button>
      </div>
    </div>
  );
};

// 3. Info / Asterisk / Chart Explanation Modal
export const ConsumptionInfoModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  utilityType: UtilityType;
}> = ({ isOpen, onClose, utilityType }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-sm rounded-2xl p-5 shadow-2xl relative max-h-[88vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 p-1"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2.5 mb-3">
          <div className="w-8 h-8 rounded-full bg-[#d7f7f3] text-[#00afaa] flex items-center justify-center shrink-0">
            <Info className="w-4 h-4" />
          </div>
          <h3 className="font-bold text-slate-800 text-sm">Understanding Your Chart</h3>
        </div>

        <div className="space-y-3.5 text-xs text-slate-600">
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 space-y-1">
            <div className="font-semibold text-slate-800 flex items-center gap-1.5">
              <span className="text-[#00afaa] font-bold text-sm">*</span>
              <span>What does the Asterisk (*) mean?</span>
            </div>
            <p className="text-[11.5px] leading-relaxed text-slate-600">
              In Singapore, SP Group performs <strong>physical/remote meter readings on alternate months</strong>. Months with an asterisk (e.g. <strong>J*</strong>, <strong>M*</strong>, <strong>S*</strong>) indicate <strong>Estimated Consumption</strong> based on your past billing history. Any difference is automatically credited or reconciled on the next actual reading month.
            </p>
          </div>

          <div className="space-y-2">
            <div className="font-semibold text-slate-800 text-xs">Chart Benchmarks:</div>

            <div className="flex items-start gap-2.5 p-2 rounded-lg hover:bg-slate-50">
              <span className="w-3 h-3 rounded-full bg-[#a2ece2] mt-0.5 shrink-0 border border-teal-300"></span>
              <div>
                <span className="font-medium text-slate-800 block">Your Consumption ({utilityType === 'electricity' ? 'kWh' : 'Cu M'})</span>
                <span className="text-[11px] text-slate-500">Your household's recorded consumption for the billing period.</span>
              </div>
            </div>

            <div className="flex items-start gap-2.5 p-2 rounded-lg hover:bg-slate-50">
              <span className="w-4 border-t-2 border-dashed border-slate-700 mt-2 shrink-0"></span>
              <div>
                <span className="font-medium text-slate-800 block">Neighbour Average (Dashed line)</span>
                <span className="text-[11px] text-slate-500">The average consumption of similar households in your block and immediate estate.</span>
              </div>
            </div>

            <div className="flex items-start gap-2.5 p-2 rounded-lg hover:bg-slate-50">
              <span className="w-4 border-t-2 border-solid border-slate-700 mt-2 shrink-0"></span>
              <div>
                <span className="font-medium text-slate-800 block">Efficiency Average (Solid line)</span>
                <span className="text-[11px] text-slate-500">The top 20% most energy-efficient households of the same housing type nationwide.</span>
              </div>
            </div>
          </div>
        </div>

        <button
          onClick={onClose}
          className="mt-4 w-full py-2.5 bg-[#00afaa] hover:bg-[#009b96] text-white font-medium text-xs rounded-xl transition-colors shadow-sm"
        >
          Got it
        </button>
      </div>
    </div>
  );
};

// 4. Energy Insights & Optimization Modal (From Mascot Callout)
export const EnergyInsightsModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
}> = ({ isOpen, onClose }) => {
  const [acTemp, setAcTemp] = useState<number>(25);
  const [acHours, setAcHours] = useState<number>(8);

  // Approximate savings calculation: Every 1°C raised saves ~10% aircon cost (~$0.035/hr)
  const baseCostPerNight = (acHours * 1.2 * 0.299);
  const tempSavingsFactor = Math.max(0, (acTemp - 22) * 0.08);
  const estimatedMonthlySavings = Math.round(baseCostPerNight * 30 * tempSavingsFactor);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-sm rounded-2xl p-5 shadow-2xl relative max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 p-1"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-3">
          <MascotIcon size="sm" />
          <div>
            <h3 className="font-bold text-slate-800 text-sm">Energy Insights & Tips</h3>
            <p className="text-[11px] text-[#00afaa] font-semibold">Personalized for 4-Room HDB</p>
          </div>
        </div>

        {/* Appliance Breakdown */}
        <div className="mb-4">
          <div className="flex justify-between items-center mb-1.5">
            <span className="text-xs font-bold text-slate-700">Where Does Your Power Go?</span>
            <span className="text-[10px] text-slate-400">Based on SP Smart Meter</span>
          </div>

          <div className="space-y-2 text-xs">
            <div>
              <div className="flex justify-between text-[11px] mb-1">
                <span className="text-slate-600">Air Conditioning (3 units)</span>
                <span className="font-bold text-slate-800">48% (~585 kWh)</span>
              </div>
              <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-teal-500 rounded-full" style={{ width: '48%' }}></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between text-[11px] mb-1">
                <span className="text-slate-600">Refrigeration (24/7)</span>
                <span className="font-bold text-slate-800">21% (~256 kWh)</span>
              </div>
              <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-sky-400 rounded-full" style={{ width: '21%' }}></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between text-[11px] mb-1">
                <span className="text-slate-600">Water Storage Heater</span>
                <span className="font-bold text-slate-800">16% (~195 kWh)</span>
              </div>
              <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-amber-400 rounded-full" style={{ width: '16%' }}></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between text-[11px] mb-1">
                <span className="text-slate-600">Standby Power & Electronics</span>
                <span className="font-bold text-slate-800">8% (~98 kWh)</span>
              </div>
              <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-indigo-400 rounded-full" style={{ width: '8%' }}></div>
              </div>
            </div>
          </div>
        </div>

        {/* Interactive Savings Simulator */}
        <div className="bg-[#f0fdfa] border border-[#a7f3d0] rounded-xl p-3 mb-4">
          <div className="flex items-center gap-1.5 text-xs font-bold text-[#00837d] mb-2">
            <Sliders className="w-3.5 h-3.5" />
            Aircon Eco Simulator
          </div>

          <div className="space-y-2 text-xs">
            <div className="flex justify-between items-center">
              <span className="text-slate-600 text-[11px]">Set Temperature:</span>
              <span className="font-bold text-teal-800 bg-white px-2 py-0.5 rounded border border-teal-200">
                {acTemp}°C
              </span>
            </div>
            <input
              type="range"
              min="20"
              max="27"
              value={acTemp}
              onChange={(e) => setAcTemp(Number(e.target.value))}
              className="w-full accent-[#00afaa] cursor-pointer h-1.5 bg-teal-100 rounded-lg"
            />

            <div className="flex justify-between items-center pt-1">
              <span className="text-slate-600 text-[11px]">Nightly Runtime:</span>
              <span className="font-bold text-teal-800 bg-white px-2 py-0.5 rounded border border-teal-200">
                {acHours} hours
              </span>
            </div>
            <input
              type="range"
              min="4"
              max="12"
              value={acHours}
              onChange={(e) => setAcHours(Number(e.target.value))}
              className="w-full accent-[#00afaa] cursor-pointer h-1.5 bg-teal-100 rounded-lg"
            />

            <div className="mt-2.5 pt-2 border-t border-teal-200/60 flex items-center justify-between">
              <div>
                <div className="text-[10px] text-slate-500">Est. Monthly Savings:</div>
                <div className="text-base font-extrabold text-[#00837d]">
                  +${estimatedMonthlySavings} / mo
                </div>
              </div>
              <span className="text-[10px] bg-white text-emerald-700 font-semibold px-2 py-1 rounded-md border border-emerald-200">
                {Math.round(estimatedMonthlySavings * 3.3)} kg CO₂ avoided
              </span>
            </div>
          </div>
        </div>

        {/* Quick Tips */}
        <div className="space-y-2 mb-4">
          <div className="text-xs font-bold text-slate-700">Recommended Quick Wins:</div>
          <div className="text-[11px] text-slate-600 space-y-1.5">
            <div className="flex items-start gap-1.5">
              <span className="text-[#00afaa] font-bold">✓</span>
              <span>Use a circulating fan with 25°C aircon to feel as cool as 22°C.</span>
            </div>
            <div className="flex items-start gap-1.5">
              <span className="text-[#00afaa] font-bold">✓</span>
              <span>Switch storage water heater off when not in use.</span>
            </div>
            <div className="flex items-start gap-1.5">
              <span className="text-[#00afaa] font-bold">✓</span>
              <span>Earn GreenUP points when you beat your neighbour benchmark!</span>
            </div>
          </div>
        </div>

        <button
          onClick={onClose}
          className="w-full py-2.5 bg-[#00afaa] hover:bg-[#009b96] text-white font-medium text-xs rounded-xl transition-colors shadow-sm"
        >
          Done
        </button>
      </div>
    </div>
  );
};

// 5. Month Detail Modal
export const MonthDetailModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  data: MonthlyConsumption | null;
  utilityType: UtilityType;
}> = ({ isOpen, onClose, data, utilityType }) => {
  if (!isOpen || !data) return null;

  const unit = utilityType === 'electricity' ? 'kWh' : 'Cu M';
  const unitRate = utilityType === 'electricity' ? 0.299 : 2.74; // SGD per unit approx
  const estimatedCost = (data.consumption * unitRate).toFixed(2);
  const diffNeighbour = data.consumption - data.neighbourAvg;
  const isLowerThanNeighbour = diffNeighbour <= 0;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-sm rounded-2xl p-5 shadow-2xl relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 p-1"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2 mb-3">
          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-slate-100 text-slate-700">
            {data.monthName}
          </span>
          {data.isEstimated ? (
            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-50 text-amber-700 border border-amber-200">
              Estimated Reading (*)
            </span>
          ) : (
            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
              Actual Reading
            </span>
          )}
        </div>

        <div className="bg-gradient-to-br from-teal-50 to-emerald-50 rounded-xl p-4 border border-teal-100 mb-3 text-center">
          <div className="text-[11px] text-teal-800 font-semibold mb-1">
            Recorded {utilityType === 'electricity' ? 'Electricity' : 'Water'} Consumption
          </div>
          <div className="text-3xl font-black text-slate-900 tracking-tight">
            {data.consumption.toLocaleString()} <span className="text-sm font-semibold text-slate-500">{unit}</span>
          </div>
          <div className="text-xs font-semibold text-teal-700 mt-1">
            Approx. ${estimatedCost} SGD
          </div>
        </div>

        <div className="space-y-2 text-xs mb-4">
          <div className="flex justify-between py-1.5 border-b border-slate-100">
            <span className="text-slate-500">Neighbour Average</span>
            <span className="font-semibold text-slate-800">
              {data.neighbourAvg} {unit}
            </span>
          </div>
          <div className="flex justify-between py-1.5 border-b border-slate-100">
            <span className="text-slate-500">Top 20% Efficient Avg</span>
            <span className="font-semibold text-slate-800">
              {data.efficiencyAvg} {unit}
            </span>
          </div>
          <div className="flex justify-between py-1.5 border-b border-slate-100">
            <span className="text-slate-500">Performance vs Block</span>
            <span
              className={`font-bold ${
                isLowerThanNeighbour ? 'text-emerald-600' : 'text-amber-600'
              }`}
            >
              {isLowerThanNeighbour
                ? `${Math.abs(Math.round((diffNeighbour / data.neighbourAvg) * 100))}% lower (Great!)`
                : `+${Math.abs(Math.round((diffNeighbour / data.neighbourAvg) * 100))}% higher`}
            </span>
          </div>
          <div className="flex justify-between py-1.5">
            <span className="text-slate-500">Est. Carbon Footprint</span>
            <span className="font-semibold text-slate-800">
              {Math.round(data.consumption * 0.408)} kg CO₂e
            </span>
          </div>
        </div>

        <button
          onClick={onClose}
          className="w-full py-2.5 bg-[#00afaa] hover:bg-[#009b96] text-white font-medium text-xs rounded-xl transition-colors shadow-sm"
        >
          Close
        </button>
      </div>
    </div>
  );
};

// 6. Bill Payment Modal
export const PaymentModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  billAmount: number;
  onPaymentSuccess: () => void;
}> = ({ isOpen, onClose, billAmount, onPaymentSuccess }) => {
  const [method, setMethod] = useState<'paynow' | 'card'>('paynow');
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  if (!isOpen) return null;

  const handlePay = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);
      setTimeout(() => {
        onPaymentSuccess();
        setIsSuccess(false);
        onClose();
      }, 1500);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-sm rounded-2xl p-5 shadow-2xl relative">
        <button
          onClick={onClose}
          disabled={isProcessing}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 p-1"
        >
          <X className="w-5 h-5" />
        </button>

        {isSuccess ? (
          <div className="py-8 flex flex-col items-center text-center">
            <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mb-3 animate-bounce">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="font-bold text-slate-800 text-base">Payment Successful!</h3>
            <p className="text-xs text-slate-500 mt-1">
              ${billAmount.toFixed(2)} paid to SP Services Ltd.
            </p>
            <div className="mt-4 text-[11px] text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-full font-medium">
              Transaction ref: SP-20261015-8821
            </div>
          </div>
        ) : (
          <div>
            <div className="flex items-center gap-2 mb-3">
              <ShieldCheck className="w-5 h-5 text-[#00afaa]" />
              <h3 className="font-bold text-slate-800 text-sm">Pay Utilities Bill</h3>
            </div>

            <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 mb-3 flex justify-between items-center">
              <div>
                <span className="text-[11px] text-slate-500 block">Total Due</span>
                <span className="text-xl font-bold text-slate-800">${billAmount.toFixed(2)}</span>
              </div>
              <span className="text-[10px] text-amber-700 bg-amber-100 px-2 py-0.5 rounded font-semibold">
                Due 28 Oct 2026
              </span>
            </div>

            {/* Payment Options */}
            <div className="space-y-2 mb-4">
              <button
                type="button"
                onClick={() => setMethod('paynow')}
                className={`w-full flex items-center justify-between p-3 rounded-xl border text-left transition-all ${
                  method === 'paynow'
                    ? 'border-[#00afaa] bg-[#f0fdfa] ring-1 ring-[#00afaa]'
                    : 'border-slate-200 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-purple-700 text-white flex items-center justify-center font-bold text-[10px]">
                    PayNow
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-slate-800">PayNow QR</div>
                    <div className="text-[10px] text-slate-500">Scan & Pay via DBS / OCBC / UOB</div>
                  </div>
                </div>
                <div
                  className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                    method === 'paynow' ? 'border-[#00afaa] bg-[#00afaa]' : 'border-slate-300'
                  }`}
                >
                  {method === 'paynow' && <div className="w-1.5 h-1.5 rounded-full bg-white"></div>}
                </div>
              </button>

              <button
                type="button"
                onClick={() => setMethod('card')}
                className={`w-full flex items-center justify-between p-3 rounded-xl border text-left transition-all ${
                  method === 'card'
                    ? 'border-[#00afaa] bg-[#f0fdfa] ring-1 ring-[#00afaa]'
                    : 'border-slate-200 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center">
                    <CreditCard className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-slate-800">POSB Everyday / OCBC 365</div>
                    <div className="text-[10px] text-slate-500">•••• 8821 (Earn 4.33% Cashback)</div>
                  </div>
                </div>
                <div
                  className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                    method === 'card' ? 'border-[#00afaa] bg-[#00afaa]' : 'border-slate-300'
                  }`}
                >
                  {method === 'card' && <div className="w-1.5 h-1.5 rounded-full bg-white"></div>}
                </div>
              </button>
            </div>

            {method === 'paynow' && (
              <div className="flex flex-col items-center justify-center p-3 bg-purple-50/50 rounded-xl border border-purple-100 mb-4">
                <div className="w-28 h-28 bg-white border border-purple-200 rounded-lg p-2 shadow-xs flex items-center justify-center mb-1.5">
                  <QrCode className="w-24 h-24 text-purple-900" />
                </div>
                <span className="text-[10px] text-purple-900 font-medium">UEN: 199505660M (SP Services Ltd)</span>
              </div>
            )}

            <button
              onClick={handlePay}
              disabled={isProcessing}
              className="w-full py-3 bg-[#00afaa] hover:bg-[#009b96] text-white font-semibold text-xs rounded-xl transition-all shadow-md flex items-center justify-center gap-2 disabled:opacity-75"
            >
              {isProcessing ? (
                <>
                  <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Processing Payment...</span>
                </>
              ) : (
                <span>Confirm Payment of ${billAmount.toFixed(2)}</span>
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
