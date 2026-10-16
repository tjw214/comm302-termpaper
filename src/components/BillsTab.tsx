import React, { useState } from 'react';
import { FileText, Download, CheckCircle2, AlertCircle, ChevronRight, CreditCard, ShieldCheck, ArrowUpRight, Zap, Droplets, Flame, Trash2 } from 'lucide-react';
import { PAST_BILLS } from '../data/mockData';
import { BillItem } from '../types';
import { PaymentModal } from './Modals';

export const BillsTab: React.FC = () => {
  const [bills, setBills] = useState<BillItem[]>(PAST_BILLS);
  const [selectedBill, setSelectedBill] = useState<BillItem>(PAST_BILLS[0]);
  const [isPaymentOpen, setIsPaymentOpen] = useState<boolean>(false);
  const [downloadSuccess, setDownloadSuccess] = useState<string | null>(null);

  const currentBill = bills[0];

  const handlePaymentSuccess = () => {
    setBills((prev) =>
      prev.map((b, idx) => (idx === 0 ? { ...b, status: 'Paid', paidDate: 'Today' } : b))
    );
  };

  const handleDownload = (month: string) => {
    setDownloadSuccess(`Statement_${month.replace(' ', '_')}.pdf downloaded`);
    setTimeout(() => setDownloadSuccess(null), 3000);
  };

  return (
    <div className="space-y-3 pb-4">
      {/* Current Outstanding Bill Hero Card */}
      <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-teal-950 text-white rounded-2xl p-4 shadow-sm relative overflow-hidden">
        <div className="flex justify-between items-start">
          <div>
            <span className="text-[11px] text-teal-300 font-medium">Account: 8821-4920-1923</span>
            <h2 className="text-sm font-semibold text-white/90 mt-0.5">Bill for {currentBill.month}</h2>
          </div>
          <span
            className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
              currentBill.status === 'Paid'
                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-400/30'
                : 'bg-amber-500/20 text-amber-300 border border-amber-400/30'
            }`}
          >
            {currentBill.status === 'Paid' ? 'Paid in Full' : 'Payment Due'}
          </span>
        </div>

        <div className="mt-3 flex items-baseline gap-2">
          <span className="text-3xl font-extrabold tracking-tight">
            ${currentBill.amount.toFixed(2)}
          </span>
          <span className="text-xs text-slate-300">SGD</span>
        </div>

        <div className="mt-1 text-[11px] text-slate-300">
          {currentBill.status === 'Paid' ? (
            <span className="flex items-center gap-1 text-emerald-400 font-medium">
              <CheckCircle2 className="w-3.5 h-3.5" /> Paid on {currentBill.paidDate}
            </span>
          ) : (
            <span>Due by {currentBill.dueDate} (Includes 9% GST)</span>
          )}
        </div>

        {/* Action Button */}
        <div className="mt-4 flex gap-2">
          {currentBill.status !== 'Paid' ? (
            <button
              onClick={() => setIsPaymentOpen(true)}
              className="flex-1 py-2.5 bg-[#00afaa] hover:bg-[#009b96] active:scale-[0.99] text-white text-xs font-bold rounded-xl transition-all shadow-md flex items-center justify-center gap-1.5"
            >
              <CreditCard className="w-3.5 h-3.5" />
              Pay Bill Now
            </button>
          ) : (
            <div className="flex-1 py-2 bg-white/10 text-emerald-300 text-xs font-medium rounded-xl flex items-center justify-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" /> No outstanding balance
            </div>
          )}

          <button
            onClick={() => handleDownload(currentBill.month)}
            className="px-3.5 py-2.5 bg-white/10 hover:bg-white/20 active:scale-95 text-white text-xs font-medium rounded-xl transition-all flex items-center gap-1.5"
            title="Download PDF statement"
          >
            <Download className="w-3.5 h-3.5" />
            PDF
          </button>
        </div>

        {downloadSuccess && (
          <div className="mt-2 text-[10px] text-emerald-300 bg-emerald-950/60 p-1.5 rounded-lg text-center animate-in fade-in">
            ✓ {downloadSuccess}
          </div>
        )}
      </div>

      {/* Breakdown for Selected Bill */}
      <section className="bg-white rounded-2xl p-4 shadow-2xs border border-slate-100">
        <div className="flex justify-between items-center mb-3">
          <h3 className="font-bold text-slate-800 text-xs">Utilities Breakdown ({currentBill.month})</h3>
          <span className="text-[10px] text-slate-400">Official SP Tariff</span>
        </div>

        <div className="space-y-2.5 text-xs">
          {/* Electricity */}
          <div className="flex items-center justify-between p-2 rounded-xl bg-slate-50 border border-slate-100">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-teal-100 text-[#00afaa] flex items-center justify-center">
                <Zap className="w-3.5 h-3.5 fill-current" />
              </div>
              <div>
                <div className="font-semibold text-slate-800">Electricity</div>
                <div className="text-[10px] text-slate-500">SP PowerAssets & Grid</div>
              </div>
            </div>
            <span className="font-bold text-slate-800">
              ${currentBill.breakdown.electricity.toFixed(2)}
            </span>
          </div>

          {/* Water */}
          <div className="flex items-center justify-between p-2 rounded-xl bg-slate-50 border border-slate-100">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-sky-100 text-sky-600 flex items-center justify-center">
                <Droplets className="w-3.5 h-3.5" />
              </div>
              <div>
                <div className="font-semibold text-slate-800">Water (PUB)</div>
                <div className="text-[10px] text-slate-500">Potable & Sanitary Appliance</div>
              </div>
            </div>
            <span className="font-bold text-slate-800">
              ${currentBill.breakdown.water.toFixed(2)}
            </span>
          </div>

          {/* Town Gas */}
          <div className="flex items-center justify-between p-2 rounded-xl bg-slate-50 border border-slate-100">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-amber-100 text-amber-600 flex items-center justify-center">
                <Flame className="w-3.5 h-3.5" />
              </div>
              <div>
                <div className="font-semibold text-slate-800">City Energy (Gas)</div>
                <div className="text-[10px] text-slate-500">Piped Town Gas</div>
              </div>
            </div>
            <span className="font-bold text-slate-800">
              ${currentBill.breakdown.gas.toFixed(2)}
            </span>
          </div>

          {/* Refuse */}
          <div className="flex items-center justify-between p-2 rounded-xl bg-slate-50 border border-slate-100">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-slate-200 text-slate-600 flex items-center justify-center">
                <Trash2 className="w-3.5 h-3.5" />
              </div>
              <div>
                <div className="font-semibold text-slate-800">Refuse Removal</div>
                <div className="text-[10px] text-slate-500">Public Waste Collector (NEA)</div>
              </div>
            </div>
            <span className="font-bold text-slate-800">
              ${currentBill.breakdown.refuse.toFixed(2)}
            </span>
          </div>

          {/* GST */}
          <div className="flex items-center justify-between px-2 pt-1 text-[11px] text-slate-500">
            <span>Goods & Services Tax (GST 9%)</span>
            <span className="font-semibold text-slate-700">${currentBill.breakdown.gst.toFixed(2)}</span>
          </div>
        </div>
      </section>

      {/* Billing History */}
      <section className="bg-white rounded-2xl p-4 shadow-2xs border border-slate-100">
        <h3 className="font-bold text-slate-800 text-xs mb-3">Past Billing Statements</h3>
        <div className="divide-y divide-slate-100 text-xs">
          {bills.map((bill) => (
            <div
              key={bill.id}
              className="py-2.5 flex items-center justify-between hover:bg-slate-50 px-1 rounded-lg transition-colors cursor-pointer"
              onClick={() => handleDownload(bill.month)}
            >
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-teal-50 text-[#00afaa] flex items-center justify-center">
                  <FileText className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-semibold text-slate-800">{bill.month}</div>
                  <div className="text-[10px] text-slate-400">
                    {bill.status === 'Paid' ? `Paid ${bill.paidDate}` : `Due ${bill.dueDate}`}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="font-bold text-slate-800">${bill.amount.toFixed(2)}</span>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Payment Modal */}
      <PaymentModal
        isOpen={isPaymentOpen}
        onClose={() => setIsPaymentOpen(false)}
        billAmount={currentBill.amount}
        onPaymentSuccess={handlePaymentSuccess}
      />
    </div>
  );
};
