import React, { useState } from 'react';
import { Leaf, Award, CheckCircle, Sparkles, Gift, ChevronRight, Check, X, Copy } from 'lucide-react';
import { GREEN_CHALLENGES, GREEN_REWARDS } from '../data/mockData';
import { EcoChallenge, GreenReward } from '../types';

export const GreenUpTab: React.FC = () => {
  const [points, setPoints] = useState<number>(2450);
  const [challenges, setChallenges] = useState<EcoChallenge[]>(GREEN_CHALLENGES);
  const [redeemedReward, setRedeemedReward] = useState<{ reward: GreenReward; code: string } | null>(null);
  const [copied, setCopied] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const handleClaimChallenge = (id: string, challengePoints: number) => {
    setChallenges((prev) =>
      prev.map((c) => (c.id === id ? { ...c, completed: true } : c))
    );
    setPoints((prev) => prev + challengePoints);
    showToast(`+${challengePoints} Leaf Points added to your balance! 🎉`);
  };

  const handleRedeem = (reward: GreenReward) => {
    if (points < reward.pointsCost) {
      showToast(`Need ${reward.pointsCost - points} more Leaf Points to redeem this reward.`);
      return;
    }

    setPoints((prev) => prev - reward.pointsCost);
    const code = `GREEN-${Math.random().toString(36).substring(2, 7).toUpperCase()}-26`;
    setRedeemedReward({ reward, code });
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const copyCode = (code: string) => {
    navigator.clipboard?.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-3 pb-4">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-12 left-1/2 -translate-x-1/2 z-50 bg-slate-900 text-white text-xs px-4 py-2 rounded-full shadow-lg border border-teal-500/30 animate-in fade-in">
          {toastMessage}
        </div>
      )}

      {/* GreenUP Points Banner */}
      <div className="bg-gradient-to-r from-emerald-600 via-teal-600 to-[#00afaa] text-white rounded-2xl p-4 shadow-sm relative overflow-hidden">
        <div className="flex justify-between items-start">
          <div>
            <div className="flex items-center gap-1.5 text-emerald-100 text-xs font-semibold">
              <Leaf className="w-4 h-4 fill-current" />
              <span>SP GreenUP</span>
            </div>
            <div className="text-3xl font-black mt-1 tracking-tight">
              {points.toLocaleString()} <span className="text-sm font-semibold opacity-90">Leafs</span>
            </div>
          </div>
          <div className="bg-white/20 backdrop-blur-xs px-2.5 py-1 rounded-full text-[10px] font-bold text-white flex items-center gap-1">
            <Award className="w-3.5 h-3.5" />
            Eco Hero Tier 4
          </div>
        </div>

        {/* Progress Bar to Tier 5 */}
        <div className="mt-4">
          <div className="flex justify-between text-[10px] text-white/90 mb-1">
            <span>Next Tier: Climate Champion (3,000 Leafs)</span>
            <span className="font-semibold">{Math.round((points / 3000) * 100)}%</span>
          </div>
          <div className="w-full h-2 bg-black/20 rounded-full overflow-hidden">
            <div
              className="h-full bg-yellow-300 rounded-full transition-all duration-500"
              style={{ width: `${Math.min(100, (points / 3000) * 100)}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Daily Eco Challenges */}
      <section className="bg-white rounded-2xl p-4 shadow-2xs border border-slate-100">
        <div className="flex justify-between items-center mb-3">
          <div>
            <h3 className="font-bold text-slate-800 text-xs">Today's Eco Challenges</h3>
            <p className="text-[10px] text-slate-400">Complete sustainable habits to earn Leafs</p>
          </div>
          <span className="text-[10px] font-bold text-[#00afaa] bg-teal-50 px-2 py-0.5 rounded-full">
            Daily Reset 00:00
          </span>
        </div>

        <div className="space-y-2 text-xs">
          {challenges.map((c) => (
            <div
              key={c.id}
              className={`p-3 rounded-xl border transition-all flex items-center justify-between gap-2 ${
                c.completed
                  ? 'bg-emerald-50/50 border-emerald-100 opacity-80'
                  : 'bg-white border-slate-200 hover:border-teal-200 hover:shadow-2xs'
              }`}
            >
              <div className="flex-1">
                <div className="flex items-center gap-1.5">
                  <span className="font-bold text-slate-800 text-[11.5px]">{c.title}</span>
                  <span className="text-[9.5px] px-1.5 py-0.2 rounded bg-slate-100 text-slate-600 font-medium">
                    {c.category}
                  </span>
                </div>
                <div className="text-[10px] text-slate-500 mt-0.5 leading-snug">{c.description}</div>
              </div>

              {c.completed ? (
                <div className="flex items-center gap-1 text-[11px] font-bold text-emerald-600 bg-emerald-100/70 px-2.5 py-1.5 rounded-lg shrink-0">
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                  <span>Claimed</span>
                </div>
              ) : (
                <button
                  onClick={() => handleClaimChallenge(c.id, c.points)}
                  className="bg-[#00afaa] hover:bg-[#009b96] active:scale-95 text-white text-[10.5px] font-bold px-3 py-1.5 rounded-lg shrink-0 shadow-2xs transition-all flex items-center gap-1"
                >
                  <Sparkles className="w-3 h-3" />
                  +{c.points}
                </button>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Rewards Store */}
      <section className="bg-white rounded-2xl p-4 shadow-2xs border border-slate-100">
        <div className="flex justify-between items-center mb-3">
          <div>
            <h3 className="font-bold text-slate-800 text-xs">Green Rewards Catalogue</h3>
            <p className="text-[10px] text-slate-400">Redeem with your Leaf points</p>
          </div>
          <Gift className="w-4 h-4 text-[#00afaa]" />
        </div>

        <div className="space-y-2.5 text-xs">
          {GREEN_REWARDS.map((rew) => {
            const canAfford = points >= rew.pointsCost;
            return (
              <div
                key={rew.id}
                className="p-3 rounded-xl border border-slate-100 bg-slate-50/50 flex items-center justify-between gap-2.5 hover:bg-slate-50 transition-colors"
              >
                <div className="flex items-center gap-2.5">
                  <div
                    className={`w-10 h-10 rounded-xl bg-gradient-to-tr ${rew.imageColor} text-white flex items-center justify-center font-black text-xs shrink-0 shadow-2xs`}
                  >
                    {rew.category === 'Groceries' ? '🛒' : rew.category === 'Transport' ? '🚕' : rew.category === 'F&B' ? '🧋' : '🎁'}
                  </div>
                  <div>
                    <div className="font-bold text-slate-800 text-[11.5px]">{rew.title}</div>
                    <div className="text-[10px] text-slate-500">{rew.brand} • {rew.category}</div>
                    <div className="text-[10px] font-semibold text-emerald-700 mt-0.5">
                      {rew.pointsCost.toLocaleString()} Leafs
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => handleRedeem(rew)}
                  disabled={!canAfford}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all shrink-0 ${
                    canAfford
                      ? 'bg-slate-900 hover:bg-slate-800 text-white active:scale-95 shadow-2xs'
                      : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                  }`}
                >
                  Redeem
                </button>
              </div>
            );
          })}
        </div>
      </section>

      {/* Redemption Code Modal */}
      {redeemedReward && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white w-full max-w-sm rounded-2xl p-5 shadow-2xl relative text-center">
            <button
              onClick={() => setRedeemedReward(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 p-1"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-3">
              <Gift className="w-6 h-6" />
            </div>

            <h3 className="font-bold text-slate-800 text-sm">Reward Redeemed!</h3>
            <p className="text-xs text-slate-600 mt-1">{redeemedReward.reward.title}</p>

            <div className="my-4 bg-slate-50 border border-dashed border-teal-400 rounded-xl p-3">
              <span className="text-[10px] text-slate-400 block mb-1">Your Voucher Code</span>
              <div className="font-mono text-base font-extrabold text-[#00837d] tracking-wider select-all">
                {redeemedReward.code}
              </div>
              <button
                onClick={() => copyCode(redeemedReward.code)}
                className="mt-2 text-[10px] font-bold text-slate-600 hover:text-slate-900 inline-flex items-center gap-1 bg-white px-2.5 py-1 rounded border border-slate-200"
              >
                <Copy className="w-3 h-3" />
                {copied ? 'Copied!' : 'Copy Code'}
              </button>
            </div>

            <p className="text-[11px] text-slate-500 mb-4">
              Present this code at cashier or enter in the {redeemedReward.reward.brand} mobile app.
            </p>

            <button
              onClick={() => setRedeemedReward(null)}
              className="w-full py-2.5 bg-[#00afaa] text-white font-semibold text-xs rounded-xl shadow-xs"
            >
              Done
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
