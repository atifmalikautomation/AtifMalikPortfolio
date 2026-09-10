"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

const sliders = [
  { key: "revenue", label: "Current monthly revenue", emoji: "💰", min: 0, max: 100000, step: 500, defaultVal: 5000, prefix: "$", suffix: " / month", group: "BUSINESS BASICS", helper: "Your average monthly revenue right now" },
  { key: "teamSize", label: "Number of employees or team members", emoji: "👥", min: 1, max: 50, step: 1, defaultVal: 3, group: "BUSINESS BASICS", helper: "Include yourself, freelancers, VAs" },
  { key: "hourlyCost", label: "Average hourly cost per person", emoji: "⏱️", min: 5, max: 200, step: 5, defaultVal: 15, prefix: "$", suffix: "/hr", group: "BUSINESS BASICS" },
  { key: "manualHours", label: "Hours/week on manual repetitive tasks", emoji: "🔄", min: 0, max: 80, step: 1, defaultVal: 20, suffix: " hrs/week", group: "TIME LEAK AUDIT", helper: "Data entry, copy-paste, follow-ups, scheduling" },
  { key: "leadChaseHours", label: "Hours/week chasing leads & following up", emoji: "📞", min: 0, max: 40, step: 1, defaultVal: 10, suffix: " hrs/week", group: "TIME LEAK AUDIT" },
  { key: "missedLeadHours", label: "Hours/week lost to slow responses", emoji: "😓", min: 0, max: 30, step: 1, defaultVal: 8, suffix: " hrs/week", group: "TIME LEAK AUDIT" },
  { key: "monthlyLeads", label: "Leads or inquiries per month", emoji: "📥", min: 0, max: 500, step: 5, defaultVal: 30, group: "LEAD & REVENUE LEAKS" },
  { key: "conversionRate", label: "What % of leads become paying clients?", emoji: "🎯", min: 1, max: 80, step: 1, defaultVal: 15, suffix: "%", group: "LEAD & REVENUE LEAKS" },
  { key: "avgClientValue", label: "Average value per client", emoji: "💵", min: 100, max: 10000, step: 100, defaultVal: 500, prefix: "$", group: "LEAD & REVENUE LEAKS" },
  { key: "responseRate", label: "% of leads you respond to within 1 hour", emoji: "⚡", min: 0, max: 100, step: 1, defaultVal: 20, suffix: "%", group: "LEAD & REVENUE LEAKS", helper: "78% of clients go with whoever responds FIRST" },
  { key: "toolSpend", label: "Monthly software & tools spend", emoji: "🛠️", min: 0, max: 5000, step: 50, defaultVal: 300, prefix: "$", group: "OPERATIONAL OVERHEAD" },
  { key: "adSpend", label: "Monthly marketing & ad budget", emoji: "📢", min: 0, max: 20000, step: 100, defaultVal: 500, prefix: "$", group: "OPERATIONAL OVERHEAD" },
  { key: "contentHours", label: "Hours/week creating content manually", emoji: "📱", min: 0, max: 30, step: 1, defaultVal: 8, suffix: " hrs/week", group: "OPERATIONAL OVERHEAD" },
];

interface SliderValues {
  [key: string]: number;
}

const defaultValues: SliderValues = {};
sliders.forEach((s) => (defaultValues[s.key] = s.defaultVal));

function calculate(v: SliderValues) {
  const weeklyManualCost = (v.manualHours + v.leadChaseHours) * v.teamSize * v.hourlyCost;
  const monthlyLeadLoss = v.monthlyLeads * (1 - v.responseRate / 100) * 0.3 * v.avgClientValue;
  const leadsLostPerMonth = Math.round(v.monthlyLeads * (1 - v.responseRate / 100) * 0.3);
  const hoursWastedPerYear = (v.manualHours + v.leadChaseHours + v.contentHours) * 52;
  const annualLoss = weeklyManualCost * 52 + monthlyLeadLoss * 12;

  const hoursSavedPerMonth = (v.manualHours + v.leadChaseHours + v.contentHours) * 4 * 0.85;
  const additionalMonthlyRevenue = v.monthlyLeads * 0.4 * (v.conversionRate / 100) * v.avgClientValue;
  const adEfficiencyGain = v.adSpend * 0.35;
  const teamProductivityHours = (v.manualHours + v.leadChaseHours) * v.teamSize * 0.8 * 4;
  const annualGain = (additionalMonthlyRevenue + adEfficiencyGain + hoursSavedPerMonth * v.hourlyCost) * 12;

  const investment = 2500;
  const roi = Math.round(((annualGain - investment) / investment) * 100);
  const breakEvenWeeks = annualGain > 0 ? parseFloat((investment / (annualGain / 52)).toFixed(1)) : 999;
  const fiveYearValue = Math.round(annualGain * 5 - investment);
  const lossPerSecond = annualLoss / 365 / 24 / 3600;

  return {
    weeklyManualCost: Math.round(weeklyManualCost),
    monthlyLeadLoss: Math.round(monthlyLeadLoss),
    leadsLostPerMonth,
    hoursWastedPerYear,
    annualLoss: Math.round(annualLoss),
    hoursSavedPerMonth: Math.round(hoursSavedPerMonth),
    additionalMonthlyRevenue: Math.round(additionalMonthlyRevenue),
    adEfficiencyGain: Math.round(adEfficiencyGain),
    teamProductivityHours: Math.round(teamProductivityHours),
    annualGain: Math.round(annualGain),
    roi,
    breakEvenWeeks,
    fiveYearValue,
    lossPerSecond,
  };
}

export function CalculatorPage() {
  const [values, setValues] = useState<SliderValues>({ ...defaultValues });
  const [liveLoss, setLiveLoss] = useState(0);
  const [copied, setCopied] = useState(false);
  const startRef = useRef(Date.now());
  const results = calculate(values);

  const update = (key: string, val: number) => {
    setValues((prev) => ({ ...prev, [key]: val }));
    setLiveLoss(0);
    startRef.current = Date.now();
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setLiveLoss(((Date.now() - startRef.current) / 1000) * results.lossPerSecond);
    }, 100);
    return () => clearInterval(interval);
  }, [results.lossPerSecond]);

  const groups = [...new Set(sliders.map((s) => s.group))];

  return (
    <div className="pt-0 pb-16">
      <section className="section-padding">
        <div className="max-w-5xl mx-auto px-4">
          {/* Header — Yasir style */}
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-8 -mt-6">
            <span className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-card border border-bd text-xs font-display font-bold uppercase tracking-widest text-gr">
              🧮 Free ROI Calculator
            </span>
            <h1 className="font-display font-extrabold text-3xl md:text-4xl lg:text-5xl text-wh leading-[1.05] tracking-tight mt-4">
              Find out exactly how much your business is{" "}
              <span className="text-pink" style={{ fontFamily: "'Playfair Display', Georgia, serif", fontStyle: "italic", fontWeight: 500 }}>
                losing without AI.
              </span>
            </h1>
            <p className="mt-4 text-base text-gr max-w-2xl mx-auto">
              Drop in your real numbers. Watch your ROI calculate in real time. No fluff, just data.
            </p>
          </motion.div>

          {/* 2-column: sliders left, results right */}
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_20rem] gap-6 items-start">
            {/* LEFT — Sliders */}
            <div className="rounded-2xl border border-bd bg-card p-5 md:p-6">
              <h3 className="font-display font-extrabold text-lg md:text-xl text-wh mb-1 flex items-center gap-2">
                📊 Your current business reality
              </h3>
              <p className="text-sm text-gr mb-6">Drag the sliders to match your situation</p>

              {groups.map((group) => (
                <div key={group} className="mb-6 last:mb-0">
                  <div className="text-[10px] font-display font-bold uppercase tracking-widest text-pink mb-3">{group}</div>
                  <div className="space-y-4">
                    {sliders
                      .filter((s) => s.group === group)
                      .map((s) => {
                        const val = values[s.key];
                        const pct = ((val - s.min) / (s.max - s.min)) * 100;
                        const display = `${s.prefix || ""}${val.toLocaleString()}${s.suffix || ""}`;
                        return (
                          <div key={s.key}>
                            <div className="flex items-center justify-between mb-1">
                              <label className="text-[13px] text-gr flex items-center gap-1.5">
                                <span>{s.emoji}</span>
                                {s.label}
                              </label>
                              <span className="text-[13px] font-display font-bold text-pink">{display}</span>
                            </div>
                            {s.helper && <p className="text-[10px] text-dm mb-1.5">{s.helper}</p>}
                            <input
                              type="range"
                              min={s.min}
                              max={s.max}
                              step={s.step}
                              value={val}
                              onChange={(e) => update(s.key, Number(e.target.value))}
                              className="calc-slider w-full"
                              style={{ background: `linear-gradient(to right, var(--pink) ${pct}%, var(--bg3) ${pct}%)` }}
                            />
                          </div>
                        );
                      })}
                  </div>
                </div>
              ))}
            </div>

            {/* RIGHT — Results (sticky) */}
            <div className="lg:sticky lg:top-24 space-y-4">
              {/* Results header */}
              <div className="rounded-xl border border-pink/25 bg-pink/[0.04] p-4">
                <h3 className="font-display font-extrabold text-base text-wh flex items-center gap-2">
                  ⚡ Your AI-powered results
                </h3>
                <p className="text-[11px] text-dm mt-0.5">Updates in real time as you adjust.</p>
              </div>

              {/* Losing */}
              <div className="rounded-xl border border-red-500/25 bg-red-500/[0.06] p-4">
                <h3 className="text-sm font-display font-bold text-red-400 mb-3">❌ What you&apos;re losing</h3>
                <ResultRow label="💸 Revenue lost weekly" value={`$${results.weeklyManualCost.toLocaleString()}/wk`} color="text-wh" />
                <ResultRow label="📉 Lead revenue lost" value={`$${results.monthlyLeadLoss.toLocaleString()}/mo`} color="text-wh" />
                <ResultRow label="🚫 Leads lost monthly" value={`${results.leadsLostPerMonth} leads`} color="text-wh" />
                <ResultRow label="⌛ Hours wasted per year" value={`${results.hoursWastedPerYear.toLocaleString()} hrs`} color="text-wh" />
                <div className="mt-3 pt-3 border-t border-red-500/20 text-center">
                  <p className="text-xs text-gr mb-1">🔥 Total annual loss</p>
                  <p className="font-display font-extrabold text-2xl text-red-400 animate-pulse">
                    ${results.annualLoss.toLocaleString()}/yr
                  </p>
                </div>
              </div>

              {/* With AI */}
              <div className="rounded-xl border border-[#22C55E]/25 bg-[#22C55E]/[0.06] p-4">
                <h3 className="text-sm font-display font-bold text-[#22C55E] mb-3">✅ With Atif&apos;s AI systems</h3>
                <ResultRow label="⏱️ Hours saved/month" value={`${results.hoursSavedPerMonth} hrs`} color="text-[#22C55E]" />
                <ResultRow label="📈 AI response revenue" value={`$${results.additionalMonthlyRevenue.toLocaleString()}/mo`} color="text-[#22C55E]" />
                <ResultRow label="🎯 Better ad ROI" value={`$${results.adEfficiencyGain.toLocaleString()}/mo`} color="text-[#22C55E]" />
                <ResultRow label="👥 Team hours freed" value={`${results.teamProductivityHours} hrs`} color="text-[#22C55E]" />
                <div className="mt-3 pt-3 border-t border-[#22C55E]/20 text-center">
                  <p className="text-xs text-gr mb-1">🚀 Projected annual gain</p>
                  <p className="font-display font-extrabold text-2xl text-[#22C55E]">
                    ${results.annualGain.toLocaleString()}/yr
                  </p>
                </div>
              </div>

              {/* ROI */}
              <div className="rounded-xl border border-pink/25 bg-pink/[0.06] p-4">
                <h3 className="text-sm font-display font-bold text-pink mb-3">📊 Your AI automation ROI</h3>
                <div className="grid grid-cols-3 gap-2 text-center">
                  <div>
                    <p className="text-[10px] text-dm">Break-even</p>
                    <p className="font-display font-bold text-wh">{results.breakEvenWeeks} wks</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-dm">Year-1 ROI</p>
                    <p className="font-display font-bold text-pink">{results.roi}%</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-dm">5-Year Value</p>
                    <p className="font-display font-bold text-wh">${results.fiveYearValue.toLocaleString()}</p>
                  </div>
                </div>
              </div>

              {/* Live loss */}
              <div className="rounded-xl border border-red-500/20 bg-red-500/[0.04] p-3 text-center">
                <p className="text-[10px] text-red-400/80 mb-0.5">⚠️ While you read this, you lost:</p>
                <p className="font-display font-extrabold text-xl text-red-400">${liveLoss.toFixed(2)}</p>
              </div>

              {/* CTA */}
              <Link href="/book" className="hero-cta-btn w-full !block">
                <span className="hero-cta-inner-btn w-full justify-center">
                  🔥 Book my free audit →
                </span>
              </Link>

              {/* Share my Results */}
              <button
                onClick={() => {
                  const text = `My AI ROI Results:\n💸 Annual Loss Without AI: $${results.annualLoss.toLocaleString()}\n🚀 Projected Annual Gain: $${results.annualGain.toLocaleString()}\n📈 First-Year ROI: ${results.roi}%\n⏱️ Break-even: ${results.breakEvenWeeks} weeks\n\nCalculate yours → atifmalik.me/calculator`;
                  navigator.clipboard?.writeText(text);
                  setCopied(true);
                  setTimeout(() => setCopied(false), 2000);
                }}
                className="w-full px-4 py-2.5 rounded-xl bg-card border border-bd text-sm text-gr hover:text-wh hover:border-pink/30 transition-all text-center font-display font-bold cursor-pointer"
              >
                {copied ? "✅ Copied!" : "📋 Share my Results"}
              </button>

              <p className="text-[10px] text-dm text-center">
                ✓ No commitment · ✓ 30 minutes · ✓ 100% free
              </p>

              <div className="text-center">
                <Link href="/" className="text-sm text-dm hover:text-pink transition-colors">
                  ← Back to home
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function ResultRow({ label, value, color }: { label: string; value: string; color: string }) {
  return (
    <div className="flex items-center justify-between py-1.5 border-b border-bd/30">
      <span className="text-[12px] text-gr">{label}</span>
      <span className={`font-display font-bold text-sm ${color}`}>{value}</span>
    </div>
  );
}
