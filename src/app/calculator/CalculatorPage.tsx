"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { siteConfig } from "@/lib/site-config";

export function CalculatorPage() {
  // Business basics
  const [revenue, setRevenue] = useState(5000);
  const [employees, setEmployees] = useState(3);
  const [hourlyRate, setHourlyRate] = useState(15);

  // Time leak audit
  const [manualHours, setManualHours] = useState(20);
  const [chasingLeadsHours, setChasingLeadsHours] = useState(10);
  const [slowResponseHours, setSlowResponseHours] = useState(8);

  // Lead & revenue leaks
  const [monthlyLeads, setMonthlyLeads] = useState(30);
  const [conversionRate, setConversionRate] = useState(15);
  const [clientValue, setClientValue] = useState(500);
  const [fastResponsePercent, setFastResponsePercent] = useState(20);

  // Operational overhead
  const [softwareSpend, setSoftwareSpend] = useState(300);
  const [marketingBudget, setMarketingBudget] = useState(500);
  const [contentHours, setContentHours] = useState(8);

  // Calculations — What you're losing
  const totalWeeklyHours = manualHours + chasingLeadsHours + slowResponseHours + contentHours;
  const weeklyManualCost = manualHours * hourlyRate;
  const monthlySlowResponseLoss = slowResponseHours * hourlyRate * 4 * 2.5;
  const qualifiedLeadsLost = Math.round(monthlyLeads * (1 - fastResponsePercent / 100) * 0.3);
  const annualHoursWasted = totalWeeklyHours * 52;
  const totalAnnualLoss = Math.round(
    weeklyManualCost * 52 +
    monthlySlowResponseLoss * 12 +
    qualifiedLeadsLost * clientValue * 12
  );

  // With AI systems
  const hoursSavedMonthly = Math.round(totalWeeklyHours * 0.7 * 4.33);
  const instantResponseRevenue = Math.round(
    monthlyLeads * 0.25 * clientValue * (fastResponsePercent / 100) * 0.6
  );
  const betterAdROI = Math.round(marketingBudget * 0.35);
  const teamHoursFreed = Math.round(employees * manualHours * 0.7 * 4.33);
  const projectedAnnualRevenue = Math.round(
    (instantResponseRevenue + betterAdROI) * 12 +
    hoursSavedMonthly * hourlyRate * 12 * 0.4
  );

  // ROI metrics
  const investmentEstimate = 2500;
  const breakEvenWeeks = Math.max(1, Math.round((investmentEstimate / (projectedAnnualRevenue / 52)) * 10) / 10);
  const year1ROI = Math.round(((projectedAnnualRevenue - investmentEstimate) / investmentEstimate) * 100);
  const fiveYearValue = Math.round(projectedAnnualRevenue * 4.8);

  // Live loss counter
  const [liveLoss, setLiveLoss] = useState(0);
  const startTimeRef = useRef(Date.now());
  useEffect(() => {
    const perSecond = totalAnnualLoss / (365 * 24 * 3600);
    const interval = setInterval(() => {
      const elapsed = (Date.now() - startTimeRef.current) / 1000;
      setLiveLoss(elapsed * perSecond);
    }, 100);
    return () => clearInterval(interval);
  }, [totalAnnualLoss]);

  return (
    <div className="pt-24 pb-16">
      <section className="section-padding">
        <div className="container-narrow mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <div className="font-mono text-[11px] tracking-[0.15em] uppercase text-pink mb-4">
              Free ROI Calculator
            </div>
            <h1 className="font-display text-[clamp(28px,4.5vw,52px)] font-extrabold text-wh leading-[1.1] tracking-[-0.02em]">
              Find out exactly how much your business is losing without AI.
            </h1>
            <p className="mt-4 text-base text-gr max-w-2xl mx-auto">
              Drop in your real numbers. Watch your ROI calculate in real time. No fluff, just data.
            </p>
          </motion.div>

          <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* ═══ LEFT — INPUTS ═══ */}
            <div className="space-y-6">
              <div className="rounded-2xl border border-bd bg-card p-6 md:p-8">
                <h3 className="text-xs font-mono uppercase tracking-widest text-gr mb-1">
                  &#x1F4CA; Your current business reality
                </h3>
                <p className="text-[11px] text-dm mb-6">Drag the sliders to match your situation</p>

                {/* Business Basics */}
                <div className="mb-8">
                  <div className="text-[10px] font-mono uppercase tracking-widest text-pink mb-4">Business Basics</div>
                  <div className="space-y-6">
                    <CalcSlider emoji="\uD83D\uDCB0" label="Current monthly revenue" value={revenue} onChange={setRevenue} min={0} max={100000} step={500} format={(v) => `$${v.toLocaleString()} / month`} hint="Your average monthly revenue right now" />
                    <CalcSlider emoji="\uD83D\uDC65" label="Number of employees or team members" value={employees} onChange={setEmployees} min={1} max={50} format={(v) => `${v}`} hint="Include yourself, freelancers, VAs" />
                    <CalcSlider emoji="\u23F1\uFE0F" label="Average hourly cost per person" value={hourlyRate} onChange={setHourlyRate} min={5} max={200} step={5} format={(v) => `$${v}/hr`} hint="Include salary, tools, benefits" />
                  </div>
                </div>

                {/* Time Leak Audit */}
                <div className="mb-8">
                  <div className="text-[10px] font-mono uppercase tracking-widest text-pink mb-4">Time Leak Audit</div>
                  <div className="space-y-6">
                    <CalcSlider emoji="\uD83D\uDD04" label="Hours/week on manual repetitive tasks" value={manualHours} onChange={setManualHours} min={0} max={60} format={(v) => `${v} hrs/week`} hint="Data entry, copy-paste, follow-ups, scheduling, reporting" />
                    <CalcSlider emoji="\uD83D\uDCDE" label="Hours/week chasing leads & following up" value={chasingLeadsHours} onChange={setChasingLeadsHours} min={0} max={40} format={(v) => `${v} hrs/week`} />
                    <CalcSlider emoji="\uD83D\uDE13" label="Hours/week lost to slow responses & missed leads" value={slowResponseHours} onChange={setSlowResponseHours} min={0} max={40} format={(v) => `${v} hrs/week`} />
                  </div>
                </div>

                {/* Lead & Revenue Leaks */}
                <div className="mb-8">
                  <div className="text-[10px] font-mono uppercase tracking-widest text-pink mb-4">Lead &amp; Revenue Leaks</div>
                  <div className="space-y-6">
                    <CalcSlider emoji="\uD83D\uDCE5" label="Leads or inquiries you receive per month" value={monthlyLeads} onChange={setMonthlyLeads} min={0} max={500} step={5} format={(v) => `${v}`} />
                    <CalcSlider emoji="\uD83C\uDFAF" label="What % of leads become paying clients?" value={conversionRate} onChange={setConversionRate} min={1} max={80} format={(v) => `${v}%`} />
                    <CalcSlider emoji="\uD83D\uDCB5" label="Average value per client" value={clientValue} onChange={setClientValue} min={50} max={50000} step={50} format={(v) => `$${v.toLocaleString()}`} />
                    <CalcSlider emoji="\u26A1" label="% of leads you respond to within 1 hour" value={fastResponsePercent} onChange={setFastResponsePercent} min={0} max={100} step={5} format={(v) => `${v}%`} hint="78% of clients go with whoever responds FIRST" />
                  </div>
                </div>

                {/* Operational Overhead */}
                <div>
                  <div className="text-[10px] font-mono uppercase tracking-widest text-pink mb-4">Operational Overhead</div>
                  <div className="space-y-6">
                    <CalcSlider emoji="\uD83D\uDEE0\uFE0F" label="Monthly software & tools spend" value={softwareSpend} onChange={setSoftwareSpend} min={0} max={5000} step={50} format={(v) => `$${v.toLocaleString()}`} />
                    <CalcSlider emoji="\uD83D\uDCE2" label="Monthly marketing & ad budget" value={marketingBudget} onChange={setMarketingBudget} min={0} max={20000} step={100} format={(v) => `$${v.toLocaleString()}`} />
                    <CalcSlider emoji="\uD83D\uDCF1" label="Hours/week creating content manually" value={contentHours} onChange={setContentHours} min={0} max={40} format={(v) => `${v} hrs/week`} />
                  </div>
                </div>
              </div>
            </div>

            {/* ═══ RIGHT — RESULTS ═══ */}
            <div className="space-y-6">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="rounded-2xl border border-pink/20 bg-card p-6 md:p-8"
              >
                <h3 className="text-xs font-mono uppercase tracking-widest text-pink mb-1">
                  &#x26A1; Your AI-powered results
                </h3>
                <p className="text-[11px] text-dm mb-6">Updates in real time as you adjust.</p>

                {/* What you're losing */}
                <div className="mb-8">
                  <div className="text-[10px] font-mono uppercase tracking-widest text-red-400 mb-4">
                    &#x274C; What you&apos;re losing right now
                  </div>
                  <div className="space-y-3">
                    <ResultRow emoji="\uD83D\uDCB8" label="Revenue lost to manual work weekly" value={`$${weeklyManualCost.toLocaleString()}/wk`} />
                    <ResultRow emoji="\uD83D\uDCC9" label="Revenue lost from slow response" value={`$${Math.round(monthlySlowResponseLoss).toLocaleString()}/mo`} />
                    <ResultRow emoji="\uD83D\uDEAB" label="Qualified leads lost monthly" value={`${qualifiedLeadsLost} leads`} />
                    <ResultRow emoji="\u231B" label="Hours wasted per year" value={`${annualHoursWasted.toLocaleString()} hrs`} />
                    <div className="mt-4 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-center">
                      <div className="text-xs text-red-400 mb-1">&#x1F525; Total annual revenue loss</div>
                      <div className="font-display text-3xl md:text-4xl font-extrabold text-red-400">
                        ${totalAnnualLoss.toLocaleString()}/yr
                      </div>
                    </div>
                  </div>
                </div>

                {/* With AI */}
                <div className="mb-8">
                  <div className="text-[10px] font-mono uppercase tracking-widest text-[#22C55E] mb-4">
                    &#x2705; With Atif&apos;s AI systems
                  </div>
                  <div className="space-y-3">
                    <ResultRow emoji="\u23F1\uFE0F" label="Hours saved per month" value={`${hoursSavedMonthly} hrs`} accent />
                    <ResultRow emoji="\uD83D\uDCC8" label="Revenue from instant AI response" value={`$${instantResponseRevenue.toLocaleString()}/mo`} accent />
                    <ResultRow emoji="\uD83C\uDFAF" label="Better ROI from ad spend" value={`$${betterAdROI.toLocaleString()}/mo`} accent />
                    <ResultRow emoji="\uD83D\uDC65" label="Team hours freed monthly" value={`${teamHoursFreed} hrs`} accent />
                    <div className="mt-4 p-4 rounded-xl bg-[#22C55E]/10 border border-[#22C55E]/20 text-center">
                      <div className="text-xs text-[#22C55E] mb-1">&#x1F680; Projected additional annual revenue</div>
                      <div className="font-display text-3xl md:text-4xl font-extrabold text-[#22C55E]">
                        ${projectedAnnualRevenue.toLocaleString()}/yr
                      </div>
                    </div>
                  </div>
                </div>

                {/* ROI summary */}
                <div className="mb-8">
                  <div className="text-[10px] font-mono uppercase tracking-widest text-gr mb-4">
                    &#x1F4CA; Your AI automation ROI
                  </div>
                  <div className="grid grid-cols-3 gap-3">
                    <div className="text-center p-3 rounded-xl bg-bg2 border border-bd">
                      <div className="text-[10px] text-dm mb-1">Break-even</div>
                      <div className="font-display text-xl font-extrabold text-wh">{breakEvenWeeks} wks</div>
                    </div>
                    <div className="text-center p-3 rounded-xl bg-bg2 border border-bd">
                      <div className="text-[10px] text-dm mb-1">Year-1 ROI</div>
                      <div className="font-display text-xl font-extrabold text-pink">{year1ROI}%</div>
                    </div>
                    <div className="text-center p-3 rounded-xl bg-bg2 border border-bd">
                      <div className="text-[10px] text-dm mb-1">5-Year Value</div>
                      <div className="font-display text-xl font-extrabold text-wh">${fiveYearValue.toLocaleString()}</div>
                    </div>
                  </div>
                </div>

                {/* Live loss counter */}
                <div className="p-4 rounded-xl bg-red-500/5 border border-red-500/10 text-center mb-6">
                  <div className="text-[10px] text-red-400/80 mb-1">
                    &#x26A0;&#xFE0F; While you read this, your business has lost:
                  </div>
                  <div className="font-display text-2xl font-extrabold text-red-400">
                    ${liveLoss.toFixed(2)}
                  </div>
                  <div className="text-[10px] text-dm mt-1">Based on your numbers above</div>
                </div>

                {/* Verdict */}
                <div className="p-4 rounded-xl bg-pink06 border border-pink/20 text-center mb-6">
                  <p className="text-sm text-gr">
                    You&apos;re leaving <strong className="text-pink">${totalAnnualLoss.toLocaleString()}</strong> on the table every year. Let&apos;s fix that.
                  </p>
                </div>

                {/* CTAs */}
                <div className="space-y-3">
                  <Link
                    href="/book"
                    className="flex items-center justify-center gap-2 w-full px-6 py-3.5 rounded-xl bg-pink text-white font-display font-bold text-sm hover:brightness-[1.15] transition-all"
                  >
                    &#x1F525; Book my free audit
                  </Link>
                  <div className="flex gap-3">
                    <button
                      onClick={() => {
                        const text = `My AI ROI Report:\n- Losing $${totalAnnualLoss.toLocaleString()}/yr\n- Could gain $${projectedAnnualRevenue.toLocaleString()}/yr\n- Year-1 ROI: ${year1ROI}%\n\nCalculated at atifmalik.me/calculator`;
                        navigator.clipboard?.writeText(text);
                      }}
                      className="flex-1 px-4 py-2.5 rounded-xl bg-bg2 border border-bd text-sm text-gr hover:text-wh transition-colors text-center"
                    >
                      Share my results
                    </button>
                  </div>
                </div>

                <p className="text-[10px] text-dm text-center mt-4">
                  &#x2713; No commitment &nbsp; &#x2713; 30 minutes &nbsp; &#x2713; 100% free
                </p>
              </motion.div>

              {/* Back to home */}
              <div className="text-center">
                <Link href="/" className="text-sm text-dm hover:text-pink transition-colors">
                  &larr; Back to home
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function CalcSlider({
  emoji,
  label,
  value,
  onChange,
  min,
  max,
  step = 1,
  format,
  hint,
}: {
  emoji: string;
  label: string;
  value: number;
  onChange: (v: number) => void;
  min: number;
  max: number;
  step?: number;
  format: (v: number) => string;
  hint?: string;
}) {
  return (
    <div>
      <div className="flex items-center justify-between mb-1.5">
        <label className="text-sm text-gr flex items-center gap-1.5">
          <span>{emoji}</span>{label}
        </label>
        <span className="text-sm font-mono font-bold text-pink">{format(value)}</span>
      </div>
      {hint && <p className="text-[10px] text-dm mb-2">{hint}</p>}
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full h-1.5 bg-bg2 rounded-full appearance-none cursor-pointer accent-[var(--pink)]"
      />
    </div>
  );
}

function ResultRow({
  emoji,
  label,
  value,
  accent,
}: {
  emoji: string;
  label: string;
  value: string;
  accent?: boolean;
}) {
  return (
    <div className="flex items-center justify-between py-2 border-b border-bd/50">
      <span className="text-sm text-gr flex items-center gap-1.5">
        <span>{emoji}</span>{label}
      </span>
      <span className={`font-mono font-bold text-sm ${accent ? "text-[#22C55E]" : "text-wh"}`}>
        {value}
      </span>
    </div>
  );
}
