import React, { useState, useEffect } from 'react';
import { Zap, MapPin, Search, Navigation, BatteryCharging, CheckCircle2, Play, Square, SlidersHorizontal, Info } from 'lucide-react';
import { EV_STATIONS } from '../data/mockData';
import { EvStation } from '../types';

export const EvChargingTab: React.FC = () => {
  const [stations, setStations] = useState<EvStation[]>(EV_STATIONS);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [filterType, setFilterType] = useState<'All' | 'DC Fast' | 'AC'>('All');
  const [selectedStation, setSelectedStation] = useState<EvStation | null>(null);

  // Active charging session simulation
  const [isCharging, setIsCharging] = useState<boolean>(false);
  const [chargeProgress, setChargeProgress] = useState<number>(38); // Battery %
  const [deliveredKwh, setDeliveredKwh] = useState<number>(0);
  const [elapsedSeconds, setElapsedSeconds] = useState<number>(0);
  const [chargingCompleted, setChargingCompleted] = useState<boolean>(false);

  // Simulation timer
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isCharging) {
      interval = setInterval(() => {
        setElapsedSeconds((prev) => prev + 1);
        setDeliveredKwh((prev) => +(prev + 0.12).toFixed(2));
        setChargeProgress((prev) => {
          if (prev >= 85) {
            setIsCharging(false);
            setChargingCompleted(true);
            return 85;
          }
          return +(prev + 0.3).toFixed(1);
        });
      }, 800);
    }
    return () => clearInterval(interval);
  }, [isCharging]);

  const startSession = (station: EvStation) => {
    setSelectedStation(station);
    setIsCharging(true);
    setChargeProgress(38);
    setDeliveredKwh(0);
    setElapsedSeconds(0);
    setChargingCompleted(false);
  };

  const stopSession = () => {
    setIsCharging(false);
    setChargingCompleted(true);
  };

  const filteredStations = stations.filter((s) => {
    const matchesSearch =
      s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.location.toLowerCase().includes(searchQuery.toLowerCase());
    if (!matchesSearch) return false;
    if (filterType === 'DC Fast') return s.types.some((t) => t.includes('DC'));
    if (filterType === 'AC') return s.types.some((t) => t.includes('AC'));
    return true;
  });

  const sessionCost = selectedStation ? (deliveredKwh * selectedStation.pricePerKwh).toFixed(2) : '0.00';

  return (
    <div className="space-y-3 pb-4">
      {/* Active Charging Simulation Drawer if charging or completed */}
      {(isCharging || chargingCompleted) && selectedStation && (
        <div className="bg-gradient-to-br from-slate-900 via-teal-950 to-slate-900 text-white rounded-2xl p-4 shadow-lg border border-teal-500/40 animate-in fade-in">
          <div className="flex justify-between items-start">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-teal-500/20 text-teal-400 flex items-center justify-center animate-pulse">
                <BatteryCharging className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] text-teal-400 font-bold uppercase tracking-wider">
                  {chargingCompleted ? 'Session Complete' : 'Charging In Progress'}
                </span>
                <h4 className="text-xs font-bold text-white truncate max-w-[200px]">
                  {selectedStation.name}
                </h4>
              </div>
            </div>
            <span className="text-xs font-mono font-bold text-teal-300">
              {Math.floor(elapsedSeconds / 60)}m {elapsedSeconds % 60}s
            </span>
          </div>

          {/* Battery Level Visual */}
          <div className="mt-4 bg-white/5 border border-white/10 rounded-xl p-3">
            <div className="flex justify-between items-baseline mb-1">
              <span className="text-xs text-slate-300 font-medium">Battery State</span>
              <span className="text-2xl font-black text-teal-300 font-mono">
                {chargeProgress.toFixed(0)}%
              </span>
            </div>
            <div className="w-full h-3 bg-white/10 rounded-full overflow-hidden p-0.5 border border-white/20">
              <div
                className="h-full bg-gradient-to-r from-teal-400 to-emerald-400 rounded-full transition-all duration-300"
                style={{ width: `${chargeProgress}%` }}
              ></div>
            </div>

            <div className="grid grid-cols-3 gap-2 mt-3 pt-3 border-t border-white/10 text-center">
              <div>
                <span className="text-[10px] text-slate-400 block">Energy</span>
                <span className="text-xs font-bold text-white font-mono">{deliveredKwh} kWh</span>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 block">Rate</span>
                <span className="text-xs font-bold text-white font-mono">60 kW DC</span>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 block">Current Bill</span>
                <span className="text-xs font-bold text-teal-300 font-mono">${sessionCost}</span>
              </div>
            </div>
          </div>

          <div className="mt-3 flex gap-2">
            {isCharging ? (
              <button
                onClick={stopSession}
                className="w-full py-2.5 bg-rose-600 hover:bg-rose-700 active:scale-95 text-white text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-1.5 shadow-md"
              >
                <Square className="w-3.5 h-3.5 fill-current" />
                Stop & Disconnect
              </button>
            ) : (
              <button
                onClick={() => {
                  setSelectedStation(null);
                  setChargingCompleted(false);
                }}
                className="w-full py-2.5 bg-[#00afaa] hover:bg-[#009b96] text-white text-xs font-bold rounded-xl transition-all shadow-md"
              >
                Close Receipt (${sessionCost} Paid)
              </button>
            )}
          </div>
        </div>
      )}

      {/* Search & Filter Bar */}
      <section className="bg-white rounded-2xl p-3 shadow-2xs border border-slate-100 space-y-2">
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search carparks, malls or towns..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-[#00afaa]"
          />
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-1.5 pt-0.5">
          {(['All', 'DC Fast', 'AC'] as const).map((t) => (
            <button
              key={t}
              onClick={() => setFilterType(t)}
              className={`px-3 py-1 rounded-full text-[11px] font-semibold transition-all ${
                filterType === t
                  ? 'bg-[#00afaa] text-white shadow-2xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {t}
            </button>
          ))}
          <span className="ml-auto text-[10px] text-slate-400 font-medium">
            {filteredStations.length} stations
          </span>
        </div>
      </section>

      {/* Stations List */}
      <section className="space-y-2">
        {filteredStations.map((station) => (
          <div
            key={station.id}
            className="bg-white rounded-2xl p-3.5 shadow-2xs border border-slate-100 hover:border-slate-200 transition-all text-xs"
          >
            <div className="flex justify-between items-start gap-2">
              <div className="flex-1">
                <div className="flex items-center gap-1.5">
                  <h4 className="font-bold text-slate-800 text-[12px]">{station.name}</h4>
                  <span className="text-[10px] text-slate-400 font-medium flex items-center gap-0.5">
                    <Navigation className="w-2.5 h-2.5" /> {station.distance}
                  </span>
                </div>
                <div className="text-[10.5px] text-slate-500 mt-0.5 truncate">{station.location}</div>
              </div>

              <span
                className={`text-[10px] font-bold px-2 py-0.5 rounded-full shrink-0 ${
                  station.status === 'Available'
                    ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                    : 'bg-amber-50 text-amber-700 border border-amber-200'
                }`}
              >
                {station.availableChargers}/{station.totalChargers} Available
              </span>
            </div>

            <div className="flex items-center justify-between mt-3 pt-2.5 border-t border-slate-100">
              <div className="flex items-center gap-1.5 flex-wrap">
                {station.types.map((type, i) => (
                  <span
                    key={i}
                    className="text-[9.5px] font-bold px-2 py-0.5 rounded-md bg-teal-50 text-[#00837d] border border-teal-100"
                  >
                    ⚡ {type}
                  </span>
                ))}
                <span className="text-[10.5px] font-semibold text-slate-600">
                  ${station.pricePerKwh.toFixed(2)} / kWh
                </span>
              </div>

              <button
                onClick={() => startSession(station)}
                disabled={isCharging}
                className="px-3 py-1.5 bg-[#00afaa] hover:bg-[#009b96] active:scale-95 disabled:opacity-50 text-white font-bold rounded-lg text-xs shadow-2xs flex items-center gap-1"
              >
                <Zap className="w-3 h-3 fill-current" />
                Plug & Charge
              </button>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
};
