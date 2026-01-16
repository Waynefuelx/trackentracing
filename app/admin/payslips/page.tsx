"use client";

import { useMemo, useState } from "react";

type SuccessfulCase = {
  caseId: string;
  name: string;
  idNumber: string;
  company: string;
  documentBatch: string;
  callCentreAgent: string;
  dataType: "linked" | "pdf";
  submittedDate: string;
  status: "pending_review" | "job_done" | "rejected";
  completedDate?: string;
  reviewedBy?: string;
};

// Payment tier structure - per-case rates based on job count range
type PaymentTier = {
  min: number;
  max: number | null; // null means no upper limit (Infinity)
  ratePerCase: number; // Payment per case for this tier
};

const DEFAULT_PAYMENT_TIERS: PaymentTier[] = [
  { min: 1, max: 10, ratePerCase: 300 },
  { min: 11, max: 20, ratePerCase: 350 },
  { min: 21, max: 30, ratePerCase: 400 },
];

// Import the same data structure from successful-cases
// Using realistic data from admin pages with proper distribution across agents
const createInitialCases = (): SuccessfulCase[] => {
  const companies = [
    "Ridgeway Mining",
    "Ataraxis Risk",
    "Concord Logistics",
    "Rainshield Insurance",
    "Capital Sentinel",
    "Seaboard Maritime",
    "Skyline Freight",
    "Beacon Holdings",
  ];

  const customers = [
    { name: "Nomsa Khumalo", idNumber: "8001015809087" },
    { name: "Kabelo Moloi", idNumber: "8209075009081" },
    { name: "Zinhle Ndlovu", idNumber: "9003050582082" },
    { name: "Dumisani Sithole", idNumber: "7906215089080" },
    { name: "Anele Mthembu", idNumber: "9104050881086" },
    { name: "Luyanda Mokoena", idNumber: "8601035883085" },
    { name: "Mpho Radebe", idNumber: "8308245009084" },
    { name: "Robyn Niemand", idNumber: "8812205059088" },
    { name: "Sipho Mthembu", idNumber: "8507155083085" },
    { name: "Thandiwe Nkomo", idNumber: "8709255023087" },
    { name: "Bongani Dube", idNumber: "8406035082084" },
    { name: "Ntombi Mkhize", idNumber: "8904115024089" },
    { name: "Mandla Zulu", idNumber: "8201015809088" },
    { name: "Nomvula Dlamini", idNumber: "8302025009082" },
    { name: "Sibusiso Nkomo", idNumber: "8403030582083" },
    { name: "Lindiwe Mthembu", idNumber: "8504045089081" },
    { name: "Thabo Mokoena", idNumber: "8605050881087" },
    { name: "Nokuthula Khumalo", idNumber: "8706065883086" },
    { name: "Sipho Ndlovu", idNumber: "8807075009085" },
    { name: "Zanele Sithole", idNumber: "8908085059089" },
    { name: "Bheki Maseko", idNumber: "8009095809086" },
    { name: "Nomsa Jacobs", idNumber: "8110105009083" },
    { name: "Kabelo Adams", idNumber: "8211110582084" },
    { name: "Lerato Dlamini", idNumber: "8312125089082" },
    { name: "Naledi Nkosi", idNumber: "8413130881088" },
  ];

  const agents = [
    "Thabo Dlamini",
    "Lerato Nkosi",
    "Naledi Jacobs",
    "Sipho Maseko",
    "Reneé Adams",
  ];

  const batches = ["Batch 12", "Batch 13", "Batch 14", "Batch 15", "Batch 16"];

  const cases: SuccessfulCase[] = [];
  let caseCounter = 1;
  let customerIndex = 0;

  // Helper function to generate valid dates within January 2024
  const getDate = (day: number): string => {
    const validDay = Math.min(Math.max(day, 1), 31);
    return `2024-01-${String(validDay).padStart(2, "0")}`;
  };

  // Thabo Dlamini - 15 successful traces (10 @ R300, 5 @ R350 = R4,750)
  for (let i = 0; i < 15; i++) {
    const customer = customers[customerIndex % customers.length];
    const day = 5 + Math.floor(i * 1.5);
    cases.push({
      caseId: `SUCCESS-${String(caseCounter).padStart(3, "0")}`,
      name: customer.name,
      idNumber: customer.idNumber,
      company: companies[caseCounter % companies.length],
      documentBatch: batches[Math.floor(caseCounter / 5) % batches.length],
      callCentreAgent: "Thabo Dlamini",
      dataType: i % 2 === 0 ? "linked" : "pdf",
      submittedDate: getDate(day),
      status: "job_done",
      completedDate: getDate(day + 3),
      reviewedBy: "Admin User",
    });
    caseCounter++;
    customerIndex++;
  }

  // Lerato Nkosi - 25 successful traces (10 @ R300, 10 @ R350, 5 @ R400 = R9,000)
  for (let i = 0; i < 25; i++) {
    const customer = customers[customerIndex % customers.length];
    const day = 3 + Math.floor(i * 1.1);
    cases.push({
      caseId: `SUCCESS-${String(caseCounter).padStart(3, "0")}`,
      name: customer.name,
      idNumber: customer.idNumber,
      company: companies[caseCounter % companies.length],
      documentBatch: batches[Math.floor(caseCounter / 5) % batches.length],
      callCentreAgent: "Lerato Nkosi",
      dataType: i % 2 === 0 ? "linked" : "pdf",
      submittedDate: getDate(day),
      status: "job_done",
      completedDate: getDate(day + 2),
      reviewedBy: "Admin User",
    });
    caseCounter++;
    customerIndex++;
  }

  // Naledi Jacobs - 8 successful traces (8 @ R300 = R2,400)
  for (let i = 0; i < 8; i++) {
    const customer = customers[customerIndex % customers.length];
    const day = 7 + i * 2;
    cases.push({
      caseId: `SUCCESS-${String(caseCounter).padStart(3, "0")}`,
      name: customer.name,
      idNumber: customer.idNumber,
      company: companies[caseCounter % companies.length],
      documentBatch: batches[Math.floor(caseCounter / 5) % batches.length],
      callCentreAgent: "Naledi Jacobs",
      dataType: i % 2 === 0 ? "linked" : "pdf",
      submittedDate: getDate(day),
      status: "job_done",
      completedDate: getDate(day + 4),
      reviewedBy: "Admin User",
    });
    caseCounter++;
    customerIndex++;
  }

  // Sipho Maseko - 32 successful traces (10 @ R300, 10 @ R350, 10 @ R400, 2 @ R450 = R11,900)
  for (let i = 0; i < 32; i++) {
    const customer = customers[customerIndex % customers.length];
    const day = 2 + Math.floor(i * 0.9);
    cases.push({
      caseId: `SUCCESS-${String(caseCounter).padStart(3, "0")}`,
      name: customer.name,
      idNumber: customer.idNumber,
      company: companies[caseCounter % companies.length],
      documentBatch: batches[Math.floor(caseCounter / 5) % batches.length],
      callCentreAgent: "Sipho Maseko",
      dataType: i % 2 === 0 ? "linked" : "pdf",
      submittedDate: getDate(day),
      status: "job_done",
      completedDate: getDate(day + 3),
      reviewedBy: "Admin User",
    });
    caseCounter++;
    customerIndex++;
  }

  // Reneé Adams - 45 successful traces (10 @ R300, 10 @ R350, 10 @ R400, 10 @ R450, 5 @ R500 = R18,500)
  for (let i = 0; i < 45; i++) {
    const customer = customers[customerIndex % customers.length];
    const day = 1 + Math.floor(i * 0.65);
    cases.push({
      caseId: `SUCCESS-${String(caseCounter).padStart(3, "0")}`,
      name: customer.name,
      idNumber: customer.idNumber,
      company: companies[caseCounter % companies.length],
      documentBatch: batches[Math.floor(caseCounter / 5) % batches.length],
      callCentreAgent: "Reneé Adams",
      dataType: i % 2 === 0 ? "linked" : "pdf",
      submittedDate: getDate(day),
      status: "job_done",
      completedDate: getDate(day + 2),
      reviewedBy: "Admin User",
    });
    caseCounter++;
    customerIndex++;
  }

  return cases;
};

type TierBreakdown = {
  tier: string;
  count: number;
  rate: number;
  subtotal: number;
};

type AgentPayment = {
  agent: string;
  totalTraces: number;
  breakdown: TierBreakdown[];
  totalPayment: number;
};

/**
 * Calculates payment for a client based on number of completed jobs.
 * Payment is per case based on the tier the job count falls into.
 * 
 * @param completedJobs - Number of completed jobs (must be >= 0)
 * @param tiers - Array of payment tiers to use for calculation
 * @returns The total payout amount in rands (rate per case × number of jobs)
 * 
 * Example: If someone completes 25 jobs in the 21-30 tier (R400 per case),
 * they earn 25 × R400 = R10,000 total
 */
export function calculateClientPayment(
  completedJobs: number,
  tiers: PaymentTier[],
): number {
  // Handle edge cases
  if (completedJobs <= 0) {
    return 0;
  }

  // Find the appropriate tier
  for (const tier of tiers) {
    const maxValue = tier.max ?? Infinity;
    if (completedJobs >= tier.min && completedJobs <= maxValue) {
      return tier.ratePerCase * completedJobs;
    }
  }

  // If no tier matches, use the highest tier rate per case
  if (tiers.length > 0) {
    const highestTier = tiers[tiers.length - 1];
    return highestTier.ratePerCase * completedJobs;
  }

  return 0;
}

// Calculate payment for an agent based on number of successful traces
// This is used for the payslip display
function calculatePayment(
  traceCount: number,
  tiers: PaymentTier[],
): {
  breakdown: TierBreakdown[];
  totalPayment: number;
} {
  const totalPayment = calculateClientPayment(traceCount, tiers);
  
  // Determine which tier the count falls into for display
  let tierInfo: { tier: string; count: number; rate: number } | null = null;
  
  if (traceCount <= 0) {
    tierInfo = { tier: "0", count: 0, rate: 0 };
  } else {
    for (const tier of tiers) {
      const maxValue = tier.max ?? Infinity;
      if (traceCount >= tier.min && traceCount <= maxValue) {
        tierInfo = {
          tier: tier.max === null ? `${tier.min}+` : `${tier.min}-${tier.max}`,
          count: traceCount,
          rate: tier.ratePerCase,
        };
        break;
      }
    }
    
    // If no tier matches, use highest tier
    if (!tierInfo && tiers.length > 0) {
      const highestTier = tiers[tiers.length - 1];
      tierInfo = {
        tier: highestTier.max === null ? `${highestTier.min}+` : `${highestTier.min}+`,
        count: traceCount,
        rate: highestTier.ratePerCase,
      };
    }
  }

  const breakdown: TierBreakdown[] = tierInfo
    ? [
        {
          tier: tierInfo.tier,
          count: tierInfo.count,
          rate: tierInfo.rate,
          subtotal: totalPayment,
        },
      ]
    : [];

  return { breakdown, totalPayment };
}

export default function PayslipsPage() {
  const [cases] = useState<SuccessfulCase[]>(createInitialCases);
  const [selectedMonth, setSelectedMonth] = useState<string>(() => {
    // Default to January 2024 where the dummy data is located
    return "2024-01";
  });
  const [paymentTiers, setPaymentTiers] = useState<PaymentTier[]>(
    DEFAULT_PAYMENT_TIERS,
  );
  const [showTierEditor, setShowTierEditor] = useState(false);
  const [selectedAgent, setSelectedAgent] = useState<string | null>(null);

  // Filter cases by month and status
  const filteredCases = useMemo(() => {
    const [year, month] = selectedMonth.split("-").map(Number);
    return cases.filter((c) => {
      if (c.status !== "job_done") return false;
      if (!c.completedDate) return false;

      const completedDate = new Date(c.completedDate);
      return (
        completedDate.getFullYear() === year &&
        completedDate.getMonth() + 1 === month
      );
    });
  }, [cases, selectedMonth]);

  // Group by agent and calculate payments
  const agentPayments = useMemo((): AgentPayment[] => {
    const agentMap = new Map<string, SuccessfulCase[]>();

    // Group cases by agent
    filteredCases.forEach((c) => {
      const agent = c.callCentreAgent;
      if (!agentMap.has(agent)) {
        agentMap.set(agent, []);
      }
      agentMap.get(agent)!.push(c);
    });

    // Calculate payments for each agent
    const payments: AgentPayment[] = [];
    agentMap.forEach((agentCases, agent) => {
      const traceCount = agentCases.length;
      const { breakdown, totalPayment } = calculatePayment(
        traceCount,
        paymentTiers,
      );

      payments.push({
        agent,
        totalTraces: traceCount,
        breakdown,
        totalPayment,
      });
    });

    // Sort by agent name
    return payments.sort((a, b) => a.agent.localeCompare(b.agent));
  }, [filteredCases, paymentTiers]);

  // Calculate totals
  const totals = useMemo(() => {
    return agentPayments.reduce(
      (acc, payment) => ({
        totalAgents: acc.totalAgents + 1,
        totalTraces: acc.totalTraces + payment.totalTraces,
        totalPayment: acc.totalPayment + payment.totalPayment,
      }),
      { totalAgents: 0, totalTraces: 0, totalPayment: 0 },
    );
  }, [agentPayments]);

  // Get cases for selected agent
  const selectedAgentCases = useMemo(() => {
    if (!selectedAgent) return [];
    return filteredCases
      .filter((c) => c.callCentreAgent === selectedAgent)
      .sort((a, b) => {
        const dateA = a.completedDate ? new Date(a.completedDate).getTime() : 0;
        const dateB = b.completedDate ? new Date(b.completedDate).getTime() : 0;
        return dateB - dateA; // Sort by date descending (newest first)
      });
  }, [selectedAgent, filteredCases]);

  const formatCurrency = (amount: number): string => {
    return `R ${amount.toLocaleString("en-ZA", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  const getCurrentMonthLabel = (): string => {
    const [year, month] = selectedMonth.split("-").map(Number);
    const date = new Date(year, month - 1, 1);
    return date.toLocaleString("default", { month: "long", year: "numeric" });
  };

  // Tier editor functions
  const handleTierChange = (
    index: number,
    field: keyof PaymentTier,
    value: number | null,
  ) => {
    const updatedTiers = [...paymentTiers];
    updatedTiers[index] = {
      ...updatedTiers[index],
      [field]: value,
    };
    setPaymentTiers(updatedTiers);
  };

  const handleAddTier = () => {
    const lastTier = paymentTiers[paymentTiers.length - 1];
    let newMin = 1;
    if (lastTier) {
      // If last tier has unlimited max, we can't add after it
      // So we'll set the new tier to start after a reasonable number
      if (lastTier.max === null) {
        newMin = lastTier.min + 10;
      } else {
        newMin = lastTier.max + 1;
      }
    }
    setPaymentTiers([
      ...paymentTiers,
      { min: newMin, max: newMin + 9, ratePerCase: 400 },
    ]);
  };

  const handleRemoveTier = (index: number) => {
    if (paymentTiers.length > 1) {
      setPaymentTiers(paymentTiers.filter((_, i) => i !== index));
    }
  };

  const handleResetTiers = () => {
    setPaymentTiers(DEFAULT_PAYMENT_TIERS);
  };

  return (
    <section className="space-y-8 text-slate-200">
      <header className="space-y-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-sky-400">
            Payment Management
          </p>
          <h2 className="text-3xl font-semibold tracking-tight text-white">
            Payslips
          </h2>
          <p className="text-sm text-slate-300">
            View payment calculations for each call centre agent based on their
            successful traces. Only cases marked as "job done" are counted.
          </p>
        </div>
      </header>

      {/* Month Selector */}
      <div className="rounded-3xl border border-slate-800 bg-slate-900/60 p-6">
        <div className="flex items-center justify-between">
          <div>
            <label
              htmlFor="month-selector"
              className="block text-sm font-semibold text-white"
            >
              Select Month
            </label>
            <p className="mt-1 text-xs text-slate-400">
              View payslips for a specific month
            </p>
          </div>
          <div className="flex items-center gap-4">
            <input
              id="month-selector"
              type="month"
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
              className="rounded-xl border border-slate-700 bg-slate-800 px-4 py-2 text-sm font-semibold text-white focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-500/50"
            />
            <div className="text-right">
              <p className="text-sm font-semibold text-white">
                {getCurrentMonthLabel()}
              </p>
              <p className="text-xs text-slate-400">
                {filteredCases.length} successful trace
                {filteredCases.length !== 1 ? "s" : ""}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[2fr,1fr]">
        {/* Payslip Table */}
        <article className="overflow-hidden rounded-3xl border border-slate-800 bg-slate-900/60">
          <header className="border-b border-slate-800/60 bg-slate-900/80 px-6 py-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-white">
                  Agent Payslips ({agentPayments.length})
                </h3>
                <p className="text-xs text-slate-400">
                  Payment breakdown by agent and tier
                </p>
              </div>
            </div>
          </header>

          <div className="overflow-x-auto">
            {agentPayments.length === 0 ? (
              <div className="px-6 py-12 text-center">
                <p className="text-slate-400">
                  No successful traces found for {getCurrentMonthLabel()}
                </p>
              </div>
            ) : (
              <table className="min-w-full divide-y divide-slate-800 text-sm">
                <thead className="bg-slate-900/80 text-xs uppercase tracking-wide text-slate-400">
                  <tr>
                    <th scope="col" className="whitespace-nowrap px-6 py-3 text-left">
                      Agent
                    </th>
                    <th scope="col" className="whitespace-nowrap px-6 py-3 text-left">
                      Traces
                    </th>
                    <th scope="col" className="whitespace-nowrap px-6 py-3 text-left">
                      Payment Breakdown
                    </th>
                    <th scope="col" className="whitespace-nowrap px-6 py-3 text-right">
                      Total Payment
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800 text-slate-200">
                  {agentPayments.map((payment) => (
                    <tr
                      key={payment.agent}
                      className="hover:bg-slate-900/50"
                    >
                      <td className="whitespace-nowrap px-6 py-4">
                        <button
                          onClick={() => setSelectedAgent(payment.agent)}
                          className="rounded-full bg-blue-500/20 px-3 py-1 text-xs font-semibold text-blue-300 transition hover:bg-blue-500/30 hover:text-blue-200 cursor-pointer"
                        >
                          {payment.agent}
                        </button>
                      </td>
                      <td className="whitespace-nowrap px-6 py-4">
                        <span className="font-semibold text-white">
                          {payment.totalTraces}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex flex-wrap gap-2">
                          {payment.breakdown.map((tier, index) => (
                            <span
                              key={index}
                              className="inline-flex items-center gap-1 rounded-full bg-slate-800 px-3 py-1 text-xs font-semibold text-slate-300"
                            >
                              <span>
                                {tier.count} jobs × R{tier.rate} = {formatCurrency(tier.subtotal)}
                              </span>
                            </span>
                          ))}
                        </div>
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 text-right">
                        <span className="text-lg font-bold text-emerald-300">
                          {formatCurrency(payment.totalPayment)}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </article>

        {/* Summary Sidebar */}
        <aside className="space-y-4 rounded-3xl border border-slate-800 bg-slate-900/60 p-6">
          <header>
            <h3 className="text-lg font-semibold text-white">Summary</h3>
            <p className="text-xs text-slate-400">
              {getCurrentMonthLabel()} totals
            </p>
          </header>

          <div className="space-y-4">
            <div className="rounded-2xl border border-slate-800/80 bg-slate-900/80 p-4">
              <p className="text-xs uppercase tracking-wide text-slate-400">
                Total Agents
              </p>
              <p className="mt-1 text-2xl font-semibold text-blue-300">
                {totals.totalAgents}
              </p>
            </div>

            <div className="rounded-2xl border border-slate-800/80 bg-slate-900/80 p-4">
              <p className="text-xs uppercase tracking-wide text-slate-400">
                Total Successful Traces
              </p>
              <p className="mt-1 text-2xl font-semibold text-slate-200">
                {totals.totalTraces}
              </p>
            </div>

            <div className="rounded-2xl border border-slate-800/80 bg-slate-900/80 p-4">
              <p className="text-xs uppercase tracking-wide text-slate-400">
                Total Payment
              </p>
              <p className="mt-1 text-2xl font-semibold text-emerald-300">
                {formatCurrency(totals.totalPayment)}
              </p>
            </div>
          </div>

          {/* Payment Tier Info */}
          <div className="rounded-2xl border border-slate-800/80 bg-slate-900/80 p-4">
            <div className="mb-3 flex items-center justify-between">
              <p className="text-xs uppercase tracking-wide text-slate-400">
                Payment Tiers (Flat Rate)
              </p>
              <button
                onClick={() => setShowTierEditor(!showTierEditor)}
                className="rounded-lg border border-slate-700 bg-slate-800 px-2 py-1 text-xs font-semibold text-slate-300 transition hover:border-sky-500 hover:bg-slate-700"
              >
                {showTierEditor ? "Done" : "Edit"}
              </button>
            </div>
            <div className="space-y-2 text-xs">
              {paymentTiers.map((tier, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between gap-2 rounded-lg border border-slate-800/60 bg-slate-900/60 p-2"
                >
                  {showTierEditor ? (
                    <div className="flex flex-1 items-center gap-2">
                      <input
                        type="number"
                        min="1"
                        value={tier.min}
                        onChange={(e) =>
                          handleTierChange(
                            index,
                            "min",
                            parseInt(e.target.value) || 1,
                          )
                        }
                        className="w-16 rounded border border-slate-700 bg-slate-800 px-2 py-1 text-xs text-white"
                      />
                      <span className="text-slate-400">-</span>
                      <input
                        type="number"
                        min={tier.min}
                        value={tier.max ?? ""}
                        onChange={(e) => {
                          const value = e.target.value;
                          handleTierChange(
                            index,
                            "max",
                            value === "" ? null : parseInt(value) || null,
                          );
                        }}
                        placeholder="∞"
                        title="Leave empty for unlimited"
                        className="w-16 rounded border border-slate-700 bg-slate-800 px-2 py-1 text-xs text-white placeholder:text-slate-500"
                      />
                      <span className="text-slate-400">:</span>
                      <span className="text-slate-400">R</span>
                      <input
                        type="number"
                        min="0"
                        step="50"
                        value={tier.ratePerCase}
                        onChange={(e) =>
                          handleTierChange(
                            index,
                            "ratePerCase",
                            parseInt(e.target.value) || 0,
                          )
                        }
                        className="w-20 rounded border border-slate-700 bg-slate-800 px-2 py-1 text-xs text-white"
                      />
                      <span className="text-xs text-slate-400">per case</span>
                      {paymentTiers.length > 1 && (
                        <button
                          onClick={() => handleRemoveTier(index)}
                          className="rounded border border-rose-600/60 bg-rose-600/20 px-2 py-1 text-xs text-rose-300 transition hover:bg-rose-600/30"
                        >
                          ×
                        </button>
                      )}
                    </div>
                  ) : (
                    <>
                      <span className="text-slate-300">
                        {tier.min}-
                        {tier.max === null ? "∞" : tier.max} jobs:
                      </span>
                      <span className="font-semibold text-emerald-300">
                        R{tier.ratePerCase} per case
                      </span>
                    </>
                  )}
                </div>
              ))}
              {showTierEditor && (
                <div className="flex gap-2 pt-2">
                  <button
                    onClick={handleAddTier}
                    className="flex-1 rounded-lg border border-emerald-600/60 bg-emerald-600/20 px-2 py-1.5 text-xs font-semibold text-emerald-300 transition hover:bg-emerald-600/30"
                  >
                    + Add Tier
                  </button>
                  <button
                    onClick={handleResetTiers}
                    className="rounded-lg border border-slate-700 bg-slate-800 px-2 py-1.5 text-xs font-semibold text-slate-300 transition hover:bg-slate-700"
                  >
                    Reset
                  </button>
                </div>
              )}
              <div className="mt-2 pt-2 border-t border-slate-700 text-slate-400">
                <p className="text-xs">
                  Note: Payment is per case based on job count range. Leave max empty for unlimited.
                </p>
              </div>
            </div>
          </div>
        </aside>
      </div>

      {/* Agent Cases Modal */}
      {selectedAgent && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 overflow-y-auto"
          onClick={() => setSelectedAgent(null)}
        >
          <div
            className="w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-3xl border border-slate-800 bg-slate-900 p-6 shadow-2xl my-8"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h3 className="text-xl font-semibold text-white">
                  Cases for {selectedAgent}
                </h3>
                <p className="mt-1 text-sm text-slate-400">
                  {selectedAgentCases.length} completed case
                  {selectedAgentCases.length !== 1 ? "s" : ""} in{" "}
                  {getCurrentMonthLabel()}
                </p>
              </div>
              <button
                onClick={() => setSelectedAgent(null)}
                className="rounded-xl border border-slate-700 bg-slate-800 px-4 py-2 text-sm font-semibold text-white transition hover:border-slate-500"
              >
                Close
              </button>
            </div>

            {selectedAgentCases.length === 0 ? (
              <div className="py-12 text-center">
                <p className="text-slate-400">No cases found for this agent</p>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-slate-800 text-sm">
                    <thead className="bg-slate-900/80 text-xs uppercase tracking-wide text-slate-400">
                      <tr>
                        <th
                          scope="col"
                          className="whitespace-nowrap px-6 py-3 text-left"
                        >
                          Case ID
                        </th>
                        <th
                          scope="col"
                          className="whitespace-nowrap px-6 py-3 text-left"
                        >
                          Customer
                        </th>
                        <th
                          scope="col"
                          className="whitespace-nowrap px-6 py-3 text-left"
                        >
                          Company
                        </th>
                        <th
                          scope="col"
                          className="whitespace-nowrap px-6 py-3 text-left"
                        >
                          Batch
                        </th>
                        <th
                          scope="col"
                          className="whitespace-nowrap px-6 py-3 text-left"
                        >
                          Data Type
                        </th>
                        <th
                          scope="col"
                          className="whitespace-nowrap px-6 py-3 text-left"
                        >
                          Completed Date
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800 text-slate-200">
                      {selectedAgentCases.map((caseItem) => (
                        <tr
                          key={caseItem.caseId}
                          className="hover:bg-slate-900/50"
                        >
                          <td className="whitespace-nowrap px-6 py-3 font-medium text-white">
                            {caseItem.caseId}
                          </td>
                          <td className="px-6 py-3">
                            <div className="font-semibold text-white">
                              {caseItem.name}
                            </div>
                            <div className="text-xs text-slate-400">
                              {caseItem.idNumber}
                            </div>
                          </td>
                          <td className="whitespace-nowrap px-6 py-3 text-slate-300">
                            {caseItem.company}
                          </td>
                          <td className="whitespace-nowrap px-6 py-3 text-slate-300">
                            {caseItem.documentBatch}
                          </td>
                          <td className="whitespace-nowrap px-6 py-3">
                            <span
                              className={`rounded-full px-3 py-1 text-xs font-semibold ${
                                caseItem.dataType === "linked"
                                  ? "bg-emerald-500/20 text-emerald-300"
                                  : "bg-purple-500/20 text-purple-300"
                              }`}
                            >
                              {caseItem.dataType === "linked" ? "Linked" : "PDF"}
                            </span>
                          </td>
                          <td className="whitespace-nowrap px-6 py-3 text-slate-300">
                            {caseItem.completedDate || "N/A"}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Summary */}
                <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4">
                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div>
                      <p className="text-xs text-slate-400">Total Cases</p>
                      <p className="mt-1 text-lg font-semibold text-white">
                        {selectedAgentCases.length}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-400">Payment Tier</p>
                      <p className="mt-1 text-lg font-semibold text-emerald-300">
                        {agentPayments
                          .find((p) => p.agent === selectedAgent)
                          ?.breakdown[0]?.tier || "N/A"}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-400">Total Payment</p>
                      <p className="mt-1 text-lg font-semibold text-emerald-300">
                        {formatCurrency(
                          agentPayments.find((p) => p.agent === selectedAgent)
                            ?.totalPayment || 0,
                        )}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
