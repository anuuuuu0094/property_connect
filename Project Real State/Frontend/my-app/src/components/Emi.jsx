// emi.jsx
import React, { useMemo, useState, useEffect, useRef } from "react";

/**
 * EMI Calculator (Reducing Balance) — Tailwind CSS
 * - Monthly EMI, total interest, total payable
 * - Sliders + inputs (kept in sync)
 * - Currency & compounding frequency selector
 * - Amortization schedule (collapsible + sticky header)
 * - Copy summary / Export CSV
 * - Accessible + keyboard friendly
 */

const currencies = [
  { code: "INR", symbol: "₹" },
  { code: "USD", symbol: "$" },
  { code: "EUR", symbol: "€" },
  { code: "GBP", symbol: "£" },
  { code: "JPY", symbol: "¥" },
];

const freqOptions = [
  { key: "monthly", label: "Monthly", periodsPerYear: 12 },
  { key: "biweekly", label: "Biweekly (26/yr)", periodsPerYear: 26 },
  { key: "weekly", label: "Weekly (52/yr)", periodsPerYear: 52 },
];

function formatMoney(v, symbol) {
  if (Number.isNaN(v)) return `${symbol}0`;
  return `${symbol}${v.toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}

function download(filename, text) {
  const el = document.createElement("a");
  el.setAttribute("href", "data:text/plain;charset=utf-8," + encodeURIComponent(text));
  el.setAttribute("download", filename);
  el.style.display = "none";
  document.body.appendChild(el);
  el.click();
  document.body.removeChild(el);
}

/** Core EMI math (reducing balance).
 * Converts an annual nominal rate to period rate based on frequency (P/Y).
 * Handles zero-rate gracefully.
 */
function computeEMI({ principal, annualRatePct, years, periodsPerYear }) {
  const totalPeriods = Math.round(years * periodsPerYear);
  const r = annualRatePct / 100 / periodsPerYear; // rate per period

  if (totalPeriods <= 0 || principal <= 0) {
    return { emi: 0, totalInterest: 0, totalPayment: 0, schedule: [] };
  }

  // EMI formula for annuity: A = P * r * (1+r)^n / ((1+r)^n - 1)
  let emi = 0;
  if (r === 0) {
    emi = principal / totalPeriods;
  } else {
    const pow = Math.pow(1 + r, totalPeriods);
    emi = (principal * r * pow) / (pow - 1);
  }

  // Build amortization schedule
  let balance = principal;
  const schedule = [];
  let totalInterest = 0;

  for (let i = 1; i <= totalPeriods; i++) {
    const interest = r === 0 ? 0 : balance * r;
    let principalPaid = emi - interest;

    // Last payment correction to avoid tiny residuals due to FP error
    if (i === totalPeriods) {
      principalPaid = balance;
      emi = interest + principalPaid;
    }

    balance = Math.max(0, balance - principalPaid);
    totalInterest += interest;

    schedule.push({
      period: i,
      payment: emi,
      principal: principalPaid,
      interest,
      balance,
    });
  }

  const totalPayment = principal + totalInterest;
  return { emi, totalInterest, totalPayment, schedule };
}

export default function EMICalculator() {
  const [principal, setPrincipal] = useState(1000000); // default ₹10,00,000
  const [annualRate, setAnnualRate] = useState(9.0);
  const [tenureYears, setTenureYears] = useState(20);
  const [currency, setCurrency] = useState("INR");
  const [freq, setFreq] = useState("monthly");
  const [showSchedule, setShowSchedule] = useState(false);
  const [dark, setDark] = useState(false);
  const resultRef = useRef(null);

  // Persist dark mode choice
  useEffect(() => {
    const saved = localStorage.getItem("emi:dark");
    if (saved != null) setDark(saved === "1");
  }, []);
  useEffect(() => {
    localStorage.setItem("emi:dark", dark ? "1" : "0");
    // Apply to document for global Tailwind dark: class
    const root = document.documentElement;
    if (dark) root.classList.add("dark");
    else root.classList.remove("dark");
  }, [dark]);

  const symbol = useMemo(
    () => currencies.find((c) => c.code === currency)?.symbol ?? "₹",
    [currency]
  );
  const periodsPerYear = useMemo(
    () => freqOptions.find((f) => f.key === freq)?.periodsPerYear ?? 12,
    [freq]
  );

  // Validation clamps
  const p = Math.min(10000000000, Math.max(0, Number(principal) || 0));
  const r = Math.min(100, Math.max(0, Number(annualRate) || 0));
  const y = Math.min(50, Math.max(0.0833, Number(tenureYears) || 0.0833)); // min ~1 month

  const { emi, totalInterest, totalPayment, schedule } = useMemo(
    () =>
      computeEMI({
        principal: p,
        annualRatePct: r,
        years: y,
        periodsPerYear,
      }),
    [p, r, y, periodsPerYear]
  );

  const copySummary = async () => {
    const text =
      `EMI Summary\n` +
      `Currency: ${currency}\n` +
      `Principal: ${p}\n` +
      `Rate (APR): ${r}%\n` +
      `Tenure: ${y} years\n` +
      `Frequency: ${freq} (${periodsPerYear}/yr)\n` +
      `EMI: ${emi.toFixed(2)}\n` +
      `Total Interest: ${totalInterest.toFixed(2)}\n` +
      `Total Payment: ${totalPayment.toFixed(2)}\n`;
    try {
      await navigator.clipboard.writeText(text);
      alert("Summary copied to clipboard!");
    } catch {
      alert("Copy failed. Your browser may block clipboard access.");
    }
  };

  const exportCSV = () => {
    if (!schedule.length) return;
    const header = "Period,Payment,Principal,Interest,Balance\n";
    const rows = schedule
      .map(
        (row) =>
          `${row.period},${row.payment.toFixed(2)},${row.principal.toFixed(
            2
          )},${row.interest.toFixed(2)},${row.balance.toFixed(2)}`
      )
      .join("\n");
    download("emi_schedule.csv", header + rows);
  };

  // Small utility bars
  const progress = p > 0 ? ((p - schedule.at(-1)?.balance) / p) * 100 : 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 to-white dark:from-slate-900 dark:to-slate-950 text-slate-800 dark:text-slate-100 selection:bg-indigo-200/60 dark:selection:bg-indigo-400/30">
      {/* Header */}
      <header className="max-w-6xl mx-auto px-4 pt-8 pb-4 flex items-center justify-between">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 via-fuchsia-600 to-pink-600">
            EMI Calculator
          </span>
        </h1>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setDark((d) => !d)}
            className="group inline-flex items-center gap-2 rounded-lg border border-slate-300/60 dark:border-slate-700/70 backdrop-blur px-3 py-2 text-sm hover:bg-slate-50 dark:hover:bg-slate-800/70 transition"
            aria-label="Toggle dark mode"
            title="Toggle dark mode"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 3v1.5m0 15V21m9-9h-1.5M4.5 12H3m14.95-6.95-1.06 1.06M7.11 16.89l-1.06 1.06m0-11.78 1.06 1.06M16.89 16.89l1.06 1.06"
              />
            </svg>
            <span className="hidden sm:block">Theme</span>
          </button>
          <button
            type="button"
            onClick={copySummary}
            className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white px-3 py-2 text-sm shadow-sm"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
              <path d="M8 7a3 3 0 0 1 3-3h7a3 3 0 0 1 3 3v7a3 3 0 0 1-3 3h-1v-2h1a1 1 0 0 0 1-1V7a1 1 0 0 0-1-1h-7a1 1 0 0 0-1 1v1H8V7z"></path>
              <path d="M3 9a3 3 0 0 1 3-3h7a3 3 0 0 1 3 3v9a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3V9zm3-1a1 1 0 0 0-1 1v9a1 1 0 0 0 1 1h7a1 1 0 0 0 1-1V9a1 1 0 0 0-1-1H6z"></path>
            </svg>
            Copy
          </button>
          <button
            type="button"
            onClick={exportCSV}
            className="inline-flex items-center gap-2 rounded-lg border border-slate-300/60 dark:border-slate-700/70 px-3 py-2 text-sm hover:bg-slate-50 dark:hover:bg-slate-800/70"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 15l4-4h-3V3h-2v8H8l4 4z"></path>
              <path d="M5 19h14v2H5z"></path>
            </svg>
            CSV
          </button>
        </div>
      </header>

      {/* Card */}
      <main className="max-w-6xl mx-auto p-4 pb-14">
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Left: Inputs */}
          <section className="relative overflow-hidden rounded-2xl border border-slate-200/70 dark:border-slate-800/70 bg-white/70 dark:bg-slate-900/60 backdrop-blur shadow-sm">
            <div className="absolute -top-24 -right-24 w-64 h-64 rounded-full bg-fuchsia-500/10 blur-3xl pointer-events-none" />
            <div className="absolute -bottom-24 -left-24 w-64 h-64 rounded-full bg-indigo-500/10 blur-3xl pointer-events-none" />
            <div className="p-5 sm:p-8">
              <div className="grid sm:grid-cols-2 gap-5">
                {/* Currency */}
                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium mb-1">Currency</label>
                  <div className="flex gap-2">
                    <select
                      value={currency}
                      onChange={(e) => setCurrency(e.target.value)}
                      className="w-40 rounded-lg border border-slate-300/70 dark:border-slate-700/70 bg-white/90 dark:bg-slate-900/80 px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-500"
                    >
                      {currencies.map((c) => (
                        <option key={c.code} value={c.code}>
                          {c.symbol} {c.code}
                        </option>
                      ))}
                    </select>

                    <select
                      value={freq}
                      onChange={(e) => setFreq(e.target.value)}
                      className="rounded-lg border border-slate-300/70 dark:border-slate-700/70 bg-white/90 dark:bg-slate-900/80 px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-500"
                    >
                      {freqOptions.map((f) => (
                        <option key={f.key} value={f.key}>
                          {f.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Principal */}
                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium mb-1">
                    Loan Amount ({symbol})
                  </label>
                  <div className="flex gap-3 items-center">
                    <input
                      type="number"
                      inputMode="decimal"
                      min={0}
                      step="1000"
                      value={principal}
                      onChange={(e) => setPrincipal(e.target.value)}
                      className="w-full rounded-lg border border-slate-300/70 dark:border-slate-700/70 bg-white/90 dark:bg-slate-900/80 px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>
                  <input
                    type="range"
                    min={0}
                    max={100000000}
                    step={1000}
                    value={Math.min(100000000, p)}
                    onChange={(e) => setPrincipal(Number(e.target.value))}
                    className="w-full mt-2 accent-indigo-600"
                  />
                </div>

                {/* Rate */}
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Interest Rate (APR %)
                  </label>
                  <input
                    type="number"
                    inputMode="decimal"
                    min={0}
                    max={100}
                    step="0.05"
                    value={annualRate}
                    onChange={(e) => setAnnualRate(e.target.value)}
                    className="w-full rounded-lg border border-slate-300/70 dark:border-slate-700/70 bg-white/90 dark:bg-slate-900/80 px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                  <input
                    type="range"
                    min={0}
                    max={24}
                    step={0.05}
                    value={Math.min(24, r)}
                    onChange={(e) => setAnnualRate(Number(e.target.value))}
                    className="w-full mt-2 accent-indigo-600"
                  />
                </div>

                {/* Tenure */}
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Tenure (Years)
                  </label>
                  <input
                    type="number"
                    inputMode="decimal"
                    min={0.0833}
                    max={50}
                    step="0.0833"
                    value={tenureYears}
                    onChange={(e) => setTenureYears(e.target.value)}
                    className="w-full rounded-lg border border-slate-300/70 dark:border-slate-700/70 bg-white/90 dark:bg-slate-900/80 px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                  <input
                    type="range"
                    min={0.0833}
                    max={50}
                    step={0.0833}
                    value={Math.min(50, y)}
                    onChange={(e) => setTenureYears(Number(e.target.value))}
                    className="w-full mt-2 accent-indigo-600"
                  />
                </div>
              </div>

              {/* Inline guidance */}
              <p className="mt-4 text-xs text-slate-500 dark:text-slate-400">
                Tip: Switch to <strong>Biweekly</strong> or <strong>Weekly</strong> to
                see how more frequent payments reduce total interest.
              </p>
            </div>
          </section>

          {/* Right: Results */}
          <section
            ref={resultRef}
            className="rounded-2xl border border-slate-200/70 dark:border-slate-800/70 bg-white/80 dark:bg-slate-900/60 backdrop-blur shadow-sm"
          >
            <div className="p-5 sm:p-8 space-y-6">
              <div className="grid sm:grid-cols-3 gap-4">
                <Metric
                  title="EMI"
                  value={formatMoney(emi || 0, symbol)}
                  sub={`${freqOptions.find((f) => f.key === freq)?.label ?? "Monthly"}`}
                />
                <Metric
                  title="Total Interest"
                  value={formatMoney(totalInterest || 0, symbol)}
                  sub={`${(totalInterest / Math.max(1, p) * 100).toFixed(1)}% of principal`}
                />
                <Metric
                  title="Total Payment"
                  value={formatMoney(totalPayment || 0, symbol)}
                  sub={`${Math.round(y * periodsPerYear)} payments`}
                />
              </div>

              {/* Progress bar */}
              <div>
                <div className="flex justify-between text-xs mb-1 text-slate-500 dark:text-slate-400">
                  <span>Principal repaid</span>
                  <span>{isFinite(progress) ? `${progress.toFixed(1)}%` : "0%"}</span>
                </div>
                <div className="h-2 w-full rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-indigo-500 to-fuchsia-500"
                    style={{ width: `${Math.max(0, Math.min(100, progress))}%` }}
                  />
                </div>
              </div>

              {/* Key ratios */}
              <div className="grid sm:grid-cols-3 gap-3 text-sm">
                <Chip
                  label="Period Rate"
                  value={`${(annualRate / periodsPerYear).toFixed(3)}%`}
                />
                <Chip
                  label="Compounds/Year"
                  value={`${periodsPerYear}`}
                />
                <Chip
                  label="Periods"
                  value={`${Math.round(y * periodsPerYear)}`}
                />
              </div>

              {/* CTA buttons */}
              <div className="flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={() => setShowSchedule((s) => !s)}
                  className="inline-flex items-center gap-2 rounded-lg bg-slate-900 text-white dark:bg-white dark:text-slate-900 px-4 py-2 hover:opacity-90"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M3 6h18v2H3zM3 11h18v2H3zM3 16h18v2H3z"></path>
                  </svg>
                  {showSchedule ? "Hide" : "Show"} Amortization
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setPrincipal(1000000);
                    setAnnualRate(9);
                    setTenureYears(20);
                    setFreq("monthly");
                    setCurrency("INR");
                    setShowSchedule(false);
                    resultRef.current?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="inline-flex items-center gap-2 rounded-lg border border-slate-300/70 dark:border-slate-700/70 px-4 py-2 hover:bg-slate-50 dark:hover:bg-slate-800/70"
                >
                  Reset
                </button>
              </div>

              {/* Schedule */}
              {showSchedule && (
                <div className="mt-2 rounded-xl border border-slate-200/60 dark:border-slate-800/70 overflow-hidden">
                  <div className="max-h-[420px] overflow-auto">
                    <table className="min-w-full text-sm">
                      <thead className="sticky top-0 bg-slate-50/80 dark:bg-slate-900/80 backdrop-blur z-10">
                        <tr className="text-left">
                          <Th>#</Th>
                          <Th>Payment</Th>
                          <Th>Principal</Th>
                          <Th>Interest</Th>
                          <Th>Balance</Th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                        {schedule.map((row) => (
                          <tr key={row.period} className="hover:bg-slate-50/60 dark:hover:bg-slate-800/40">
                            <Td>{row.period}</Td>
                            <Td>{formatMoney(row.payment, symbol)}</Td>
                            <Td>{formatMoney(row.principal, symbol)}</Td>
                            <Td>{formatMoney(row.interest, symbol)}</Td>
                            <Td>{formatMoney(row.balance, symbol)}</Td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <div className="p-3 text-xs text-slate-500 dark:text-slate-400 bg-slate-50/60 dark:bg-slate-900/60">
                    Note: Final payment is adjusted to eliminate tiny rounding residuals.
                  </div>
                </div>
              )}
            </div>
          </section>
        </div>

        {/* Footer note */}
        <p className="mt-6 text-xs text-slate-500 dark:text-slate-400 text-center">
          This calculator uses the standard annuity formula on a reducing balance basis.
          Results are estimates and for informational purposes only.
        </p>
      </main>
    </div>
  );
}

/* ---------- small presentational components ---------- */

function Metric({ title, value, sub }) {
  return (
    <div className="rounded-xl border border-slate-200/70 dark:border-slate-800/70 p-4 bg-white/60 dark:bg-slate-900/50 shadow-sm">
      <div className="text-xs uppercase tracking-wide text-slate-500 dark:text-slate-400">{title}</div>
      <div className="mt-1 text-xl font-semibold">{value}</div>
      {sub && <div className="mt-1 text-xs text-slate-500 dark:text-slate-400">{sub}</div>}
    </div>
  );
}

function Chip({ label, value }) {
  return (
    <div className="flex items-center justify-between rounded-lg border border-slate-200/70 dark:border-slate-800/70 px-3 py-2 bg-white/50 dark:bg-slate-900/50">
      <span className="text-slate-500 dark:text-slate-400 text-xs">{label}</span>
      <span className="font-medium">{value}</span>
    </div>
  );
}

function Th({ children }) {
  return (
    <th className="px-3 py-2 text-xs font-semibold text-slate-600 dark:text-slate-300">
      {children}
    </th>
  );
}

function Td({ children }) {
  return <td className="px-3 py-2 whitespace-nowrap">{children}</td>;
}

