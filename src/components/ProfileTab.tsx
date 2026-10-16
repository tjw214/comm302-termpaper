import React, { useState } from 'react';
import { User, Home, Bell, CreditCard, Shield, FileText, Phone, ChevronRight, CheckCircle2, Lock, Smartphone, Moon, Sun } from 'lucide-react';
import { PREMISES } from '../data/mockData';

export const ProfileTab: React.FC = () => {
  const [highUsageAlert, setHighUsageAlert] = useState<boolean>(true);
  const [eBillNotification, setEBillNotification] = useState<boolean>(true);
  const [paperless, setPaperless] = useState<boolean>(true);

  return (
    <div className="space-y-3 pb-6">
      {/* User Header Profile Card */}
      <section className="bg-white rounded-2xl p-4 shadow-2xs border border-slate-100 flex items-center gap-3.5">
        <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-[#00afaa] to-[#20c4b2] text-white flex items-center justify-center font-bold text-base shadow-sm shrink-0">
          AK
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <h3 className="font-bold text-slate-800 text-sm truncate">Tan Ah Kow</h3>
            <span className="text-[9.5px] font-bold px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200">
              Verified
            </span>
          </div>
          <p className="text-xs text-slate-500 truncate">tzejunw@gmail.com</p>
          <div className="text-[11px] text-slate-400 font-mono mt-0.5">SP Acct: 8821-4920-1923</div>
        </div>
      </section>

      {/* Premises Management */}
      <section className="bg-white rounded-2xl p-4 shadow-2xs border border-slate-100">
        <div className="flex justify-between items-center mb-3">
          <h4 className="font-bold text-slate-800 text-xs">Registered Premises ({PREMISES.length})</h4>
          <span className="text-[10px] font-bold text-[#00afaa] cursor-pointer hover:underline">
            + Add Premise
          </span>
        </div>

        <div className="space-y-2 text-xs">
          {PREMISES.map((premise, idx) => (
            <div
              key={premise.id}
              className="p-2.5 rounded-xl border border-slate-100 bg-slate-50/60 flex items-center justify-between"
            >
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-teal-50 text-[#00afaa] flex items-center justify-center shrink-0">
                  <Home className="w-3.5 h-3.5" />
                </div>
                <div>
                  <div className="font-bold text-slate-800 text-[11.5px]">{premise.label}</div>
                  <div className="text-[10px] text-slate-500">{premise.address}</div>
                </div>
              </div>
              {idx === 0 && (
                <span className="text-[9px] font-bold bg-[#d7f7f3] text-[#00837d] px-2 py-0.5 rounded-full">
                  Primary
                </span>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Bill & Payment Preferences */}
      <section className="bg-white rounded-2xl p-4 shadow-2xs border border-slate-100">
        <h4 className="font-bold text-slate-800 text-xs mb-3">Preferences & Alerts</h4>
        <div className="space-y-3 text-xs">
          {/* Paperless e-Bill */}
          <div className="flex items-center justify-between">
            <div>
              <div className="font-medium text-slate-800">100% Paperless e-Bill</div>
              <div className="text-[10px] text-slate-400">Receive statements via email and app</div>
            </div>
            <button
              onClick={() => setPaperless(!paperless)}
              className={`w-10 h-5 flex items-center rounded-full p-0.5 transition-colors ${
                paperless ? 'bg-[#00afaa]' : 'bg-slate-300'
              }`}
            >
              <div
                className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${
                  paperless ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          {/* High Consumption Alert */}
          <div className="flex items-center justify-between pt-2 border-t border-slate-100">
            <div>
              <div className="font-medium text-slate-800">High Usage Alert</div>
              <div className="text-[10px] text-slate-400">Notify if usage exceeds 1,200 kWh benchmark</div>
            </div>
            <button
              onClick={() => setHighUsageAlert(!highUsageAlert)}
              className={`w-10 h-5 flex items-center rounded-full p-0.5 transition-colors ${
                highUsageAlert ? 'bg-[#00afaa]' : 'bg-slate-300'
              }`}
            >
              <div
                className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${
                  highUsageAlert ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          {/* Monthly Bill Ready */}
          <div className="flex items-center justify-between pt-2 border-t border-slate-100">
            <div>
              <div className="font-medium text-slate-800">Bill Ready Push Notification</div>
              <div className="text-[10px] text-slate-400">Instant alert when monthly bill is published</div>
            </div>
            <button
              onClick={() => setEBillNotification(!eBillNotification)}
              className={`w-10 h-5 flex items-center rounded-full p-0.5 transition-colors ${
                eBillNotification ? 'bg-[#00afaa]' : 'bg-slate-300'
              }`}
            >
              <div
                className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${
                  eBillNotification ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>
        </div>
      </section>

      {/* Emergency Hotlines */}
      <section className="bg-white rounded-2xl p-4 shadow-2xs border border-slate-100">
        <h4 className="font-bold text-slate-800 text-xs mb-2.5">24/7 Emergency Hotlines</h4>
        <div className="space-y-2 text-xs">
          <div className="flex justify-between items-center p-2 rounded-xl bg-amber-50/50 border border-amber-100">
            <div>
              <span className="font-semibold text-slate-800 text-[11px] block">Electricity & Gas Emergency</span>
              <span className="text-[10px] text-slate-500">Power outage, sparkling, or suspected gas leak</span>
            </div>
            <a
              href="tel:18007788888"
              className="text-xs font-bold text-amber-700 bg-white px-2 py-1 rounded-lg border border-amber-200 shrink-0"
            >
              1800-778-8888
            </a>
          </div>

          <div className="flex justify-between items-center p-2 rounded-xl bg-sky-50/50 border border-sky-100">
            <div>
              <span className="font-semibold text-slate-800 text-[11px] block">Water Supply Helpline (PUB)</span>
              <span className="text-[10px] text-slate-500">Water contamination, low pressure, or burst pipe</span>
            </div>
            <a
              href="tel:18002255782"
              className="text-xs font-bold text-sky-700 bg-white px-2 py-1 rounded-lg border border-sky-200 shrink-0"
            >
              1800-225-5782
            </a>
          </div>
        </div>
      </section>

      {/* App info */}
      <div className="text-center text-[10px] text-slate-400 py-1">
        SP Utilities App v4.18.2 (Build 20261015) • Singapore Power Group
      </div>
    </div>
  );
};
