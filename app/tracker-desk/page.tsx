"use client";

import { useMemo, useState } from "react";

type AgentCase = {
  caseId: string;
  name: string;
  idNumber: string;
  company: string;
  documentBatch: string;
  assignedDate: string;
  status: "assigned" | "in_progress" | "unsuccessful" | "completed";
  lastContactDate?: string;
  contactAttempts: number;
  notes?: string;
  dataType?: "linked" | "pdf";
};

const createInitialCases = (): AgentCase[] => [
  {
    caseId: "CASE-001",
    name: "Nomsa Khumalo",
    idNumber: "8001015809087",
    company: "Ridgeway Mining",
    documentBatch: "Batch 12",
    assignedDate: "2024-01-10",
    status: "assigned",
    contactAttempts: 0,
    dataType: "linked",
  },
  {
    caseId: "CASE-002",
    name: "Kabelo Moloi",
    idNumber: "8209075009081",
    company: "Ataraxis Risk",
    documentBatch: "Batch 12",
    assignedDate: "2024-01-11",
    status: "in_progress",
    lastContactDate: "2024-01-15",
    contactAttempts: 2,
    notes: "Customer requested callback",
    dataType: "pdf",
  },
  {
    caseId: "CASE-003",
    name: "Zinhle Ndlovu",
    idNumber: "9003050582082",
    company: "Concord Logistics",
    documentBatch: "Batch 12",
    assignedDate: "2024-01-12",
    status: "in_progress",
    lastContactDate: "2024-01-16",
    contactAttempts: 1,
    dataType: "linked",
  },
  {
    caseId: "CASE-004",
    name: "Dumisani Sithole",
    idNumber: "7906215089080",
    company: "Rainshield Insurance",
    documentBatch: "Batch 13",
    assignedDate: "2024-01-08",
    status: "unsuccessful",
    lastContactDate: "2024-01-14",
    contactAttempts: 5,
    notes: "No response after multiple attempts",
    dataType: "linked",
  },
  {
    caseId: "CASE-005",
    name: "Anele Mthembu",
    idNumber: "9104050881086",
    company: "Capital Sentinel",
    documentBatch: "Batch 13",
    assignedDate: "2024-01-09",
    status: "unsuccessful",
    lastContactDate: "2024-01-13",
    contactAttempts: 3,
    notes: "Phone number disconnected",
    dataType: "pdf",
  },
  {
    caseId: "CASE-006",
    name: "Luyanda Mokoena",
    idNumber: "8601035883085",
    company: "Seaboard Maritime",
    documentBatch: "Batch 13",
    assignedDate: "2024-01-13",
    status: "assigned",
    contactAttempts: 0,
    dataType: "linked",
  },
  {
    caseId: "CASE-007",
    name: "Mpho Radebe",
    idNumber: "8308245009084",
    company: "Skyline Freight",
    documentBatch: "Batch 14",
    assignedDate: "2024-01-14",
    status: "in_progress",
    lastContactDate: "2024-01-17",
    contactAttempts: 1,
    dataType: "linked",
  },
  {
    caseId: "CASE-008",
    name: "Robyn Niemand",
    idNumber: "8812205059088",
    company: "Beacon Holdings",
    documentBatch: "Batch 14",
    assignedDate: "2024-01-15",
    status: "completed",
    lastContactDate: "2024-01-18",
    contactAttempts: 2,
    notes: "Successfully submitted",
    dataType: "pdf",
  },
  {
    caseId: "CASE-009",
    name: "Tshepo Modise",
    idNumber: "8507155083085",
    company: "Northgate Logistics",
    documentBatch: "Batch 15",
    assignedDate: "2024-01-16",
    status: "assigned",
    contactAttempts: 0,
    dataType: "linked",
  },
  {
    caseId: "CASE-010",
    name: "Naledi Phiri",
    idNumber: "8709255023087",
    company: "Coastal Shipping",
    documentBatch: "Batch 15",
    assignedDate: "2024-01-12",
    status: "in_progress",
    lastContactDate: "2024-01-17",
    contactAttempts: 3,
    dataType: "linked",
  },
];

export default function TrackerDeskPage() {
  const [cases] = useState<AgentCase[]>(createInitialCases);

  // Calculate monthly totals
  const monthlyTotals = useMemo(() => {
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();

    const thisMonthCases = cases.filter((c) => {
      const caseDate = new Date(c.assignedDate);
      return (
        caseDate.getMonth() === currentMonth &&
        caseDate.getFullYear() === currentYear
      );
    });

    return {
      totalAssigned: thisMonthCases.length,
      inProgress: thisMonthCases.filter((c) => c.status === "in_progress").length,
      unsuccessful: thisMonthCases.filter((c) => c.status === "unsuccessful")
        .length,
      completed: thisMonthCases.filter((c) => c.status === "completed").length,
      totalContactAttempts: thisMonthCases.reduce(
        (sum, c) => sum + c.contactAttempts,
        0,
      ),
    };
  }, [cases]);

  return (
    <>
      {/* Welcome Section */}
      <section className="space-y-2">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-blue-400">
          Welcome back
        </p>
        <h2 className="text-3xl font-semibold tracking-tight text-white">
          Agent Dashboard
        </h2>
        <p className="text-sm text-slate-300">
          Review your assigned cases, track progress, and manage customer
          contact attempts.
        </p>
      </section>

      {/* Monthly Totals Dashboard */}
      <section className="space-y-6">
        <header className="space-y-2">
          <h2 className="text-2xl font-semibold tracking-tight text-white">
            Monthly Overview
          </h2>
          <p className="text-sm text-slate-300">
            Your performance metrics for this month
          </p>
        </header>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
          <div className="rounded-3xl border border-slate-800 bg-slate-900/60 p-6">
            <p className="text-xs uppercase tracking-[0.25em] text-slate-400">
              Total Assigned
            </p>
            <p className="mt-2 text-3xl font-semibold text-blue-300">
              {monthlyTotals.totalAssigned}
            </p>
            <p className="mt-1 text-xs text-slate-400">This month</p>
          </div>

          <div className="rounded-3xl border border-slate-800 bg-slate-900/60 p-6">
            <p className="text-xs uppercase tracking-[0.25em] text-slate-400">
              In Progress
            </p>
            <p className="mt-2 text-3xl font-semibold text-yellow-300">
              {monthlyTotals.inProgress}
            </p>
            <p className="mt-1 text-xs text-slate-400">Active traces</p>
          </div>

          <div className="rounded-3xl border border-slate-800 bg-slate-900/60 p-6">
            <p className="text-xs uppercase tracking-[0.25em] text-slate-400">
              Unsuccessful
            </p>
            <p className="mt-2 text-3xl font-semibold text-rose-300">
              {monthlyTotals.unsuccessful}
            </p>
            <p className="mt-1 text-xs text-slate-400">Failed attempts</p>
          </div>

          <div className="rounded-3xl border border-slate-800 bg-slate-900/60 p-6">
            <p className="text-xs uppercase tracking-[0.25em] text-slate-400">
              Completed
            </p>
            <p className="mt-2 text-3xl font-semibold text-emerald-300">
              {monthlyTotals.completed}
            </p>
            <p className="mt-1 text-xs text-slate-400">Successful</p>
          </div>

          <div className="rounded-3xl border border-slate-800 bg-slate-900/60 p-6">
            <p className="text-xs uppercase tracking-[0.25em] text-slate-400">
              Contact Attempts
            </p>
            <p className="mt-2 text-3xl font-semibold text-slate-200">
              {monthlyTotals.totalContactAttempts}
            </p>
            <p className="mt-1 text-xs text-slate-400">This month</p>
          </div>
        </div>
      </section>
    </>
  );
}
