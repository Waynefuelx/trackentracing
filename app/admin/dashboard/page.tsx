"use client";

import { useMemo } from "react";
import Link from "next/link";

// Data types from other pages
type ClientRecord = {
  caseId: string;
  name: string;
  idNumber: string;
  company: string;
  documentBatch: string;
  assignedAgent: string | null;
};

type CallTeamCase = {
  caseId: string;
  name: string;
  idNumber: string;
  company: string;
  documentBatch: string;
  currentAgent: string | null;
  reassignmentAttempts: number;
  hasUbmvData: boolean;
  dataType: "linked" | "pdf";
};

type DeadCaseRecord = {
  caseId: string;
  name: string;
  idNumber: string;
  company: string;
  documentBatch: string;
  assignedFieldAgent: string;
  reason: "deceased (dead)" | "no info";
};

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
};

type SuccessfulSubmission = {
  caseId: string;
  name: string;
  idNumber: string;
  company: string;
  documentBatch: string;
  submittedBy: string;
  submittedAt: string;
  status: "pending_review" | "approved" | "rejected";
};

// Initial data functions (same as other pages)
const createInitialClients = (): ClientRecord[] => [
  {
    caseId: "CASE-001",
    name: "Nomsa Khumalo",
    idNumber: "8001015809087",
    company: "Ridgeway Mining",
    documentBatch: "Batch 12",
    assignedAgent: null,
  },
  {
    caseId: "CASE-002",
    name: "Kabelo Moloi",
    idNumber: "8209075009081",
    company: "Ataraxis Risk",
    documentBatch: "Batch 12",
    assignedAgent: null,
  },
  {
    caseId: "CASE-003",
    name: "Zinhle Ndlovu",
    idNumber: "9003050582082",
    company: "Concord Logistics",
    documentBatch: "Batch 12",
    assignedAgent: null,
  },
  {
    caseId: "CASE-004",
    name: "Dumisani Sithole",
    idNumber: "7906215089080",
    company: "Rainshield Insurance",
    documentBatch: "Batch 13",
    assignedAgent: null,
  },
  {
    caseId: "CASE-005",
    name: "Anele Mthembu",
    idNumber: "9104050881086",
    company: "Capital Sentinel",
    documentBatch: "Batch 13",
    assignedAgent: null,
  },
  {
    caseId: "CASE-006",
    name: "Luyanda Mokoena",
    idNumber: "8601035883085",
    company: "Seaboard Maritime",
    documentBatch: "Batch 13",
    assignedAgent: null,
  },
  {
    caseId: "CASE-007",
    name: "Mpho Radebe",
    idNumber: "8308245009084",
    company: "Skyline Freight",
    documentBatch: "Batch 14",
    assignedAgent: null,
  },
  {
    caseId: "CASE-008",
    name: "Robyn Niemand",
    idNumber: "8812205059088",
    company: "Beacon Holdings",
    documentBatch: "Batch 14",
    assignedAgent: null,
  },
];

const createInitialCallTeamCases = (): CallTeamCase[] => [
  {
    caseId: "CALL-001",
    name: "Nomsa Khumalo",
    idNumber: "8001015809087",
    company: "Ridgeway Mining",
    documentBatch: "Batch 12",
    currentAgent: "Thabo Dlamini",
    reassignmentAttempts: 1,
    hasUbmvData: true,
    dataType: "linked",
  },
  {
    caseId: "CALL-002",
    name: "Kabelo Moloi",
    idNumber: "8209075009081",
    company: "Ataraxis Risk",
    documentBatch: "Batch 12",
    currentAgent: "Lerato Nkosi",
    reassignmentAttempts: 2,
    hasUbmvData: true,
    dataType: "pdf",
  },
  {
    caseId: "CALL-003",
    name: "Zinhle Ndlovu",
    idNumber: "9003050582082",
    company: "Concord Logistics",
    documentBatch: "Batch 12",
    currentAgent: "Sipho Maseko",
    reassignmentAttempts: 0,
    hasUbmvData: true,
    dataType: "linked",
  },
  {
    caseId: "CALL-004",
    name: "Dumisani Sithole",
    idNumber: "7906215089080",
    company: "Rainshield Insurance",
    documentBatch: "Batch 13",
    currentAgent: null,
    reassignmentAttempts: 3,
    hasUbmvData: true,
    dataType: "linked",
  },
  {
    caseId: "CALL-005",
    name: "Anele Mthembu",
    idNumber: "9104050881086",
    company: "Capital Sentinel",
    documentBatch: "Batch 13",
    currentAgent: null,
    reassignmentAttempts: 3,
    hasUbmvData: true,
    dataType: "pdf",
  },
];

const createInitialDeadCases = (): DeadCaseRecord[] => [
  {
    caseId: "DEAD-001",
    name: "Mpho Radebe",
    idNumber: "8308245009084",
    company: "Skyline Freight",
    documentBatch: "Batch 14",
    assignedFieldAgent: "Andile Mthembu",
    reason: "deceased (dead)",
  },
  {
    caseId: "DEAD-002",
    name: "Robyn Niemand",
    idNumber: "8812205059088",
    company: "Beacon Holdings",
    documentBatch: "Batch 14",
    assignedFieldAgent: "Bongani Zulu",
    reason: "no info",
  },
  {
    caseId: "DEAD-003",
    name: "Tshepo Modise",
    idNumber: "8507155083085",
    company: "Northgate Logistics",
    documentBatch: "Batch 15",
    assignedFieldAgent: "Nomsa Dlamini",
    reason: "no info",
  },
  {
    caseId: "DEAD-004",
    name: "Naledi Phiri",
    idNumber: "8709255023087",
    company: "Coastal Shipping",
    documentBatch: "Batch 15",
    assignedFieldAgent: "Sipho Nkosi",
    reason: "deceased (dead)",
  },
  {
    caseId: "DEAD-005",
    name: "Kagiso Molefe",
    idNumber: "8406035082084",
    company: "Sunset Transport",
    documentBatch: "Batch 16",
    assignedFieldAgent: "Thandiwe Maseko",
    reason: "no info",
  },
  {
    caseId: "DEAD-006",
    name: "Zanele Buthelezi",
    idNumber: "8904115024089",
    company: "Mountain View Freight",
    documentBatch: "Batch 16",
    assignedFieldAgent: "Andile Mthembu",
    reason: "deceased (dead)",
  },
];

const createInitialSuccessfulCases = (): SuccessfulCase[] => [
  {
    caseId: "SUCCESS-001",
    name: "Nomsa Khumalo",
    idNumber: "8001015809087",
    company: "Ridgeway Mining",
    documentBatch: "Batch 12",
    callCentreAgent: "Thabo Dlamini",
    dataType: "linked",
    submittedDate: "2024-01-15",
    status: "pending_review",
  },
  {
    caseId: "SUCCESS-002",
    name: "Kabelo Moloi",
    idNumber: "8209075009081",
    company: "Ataraxis Risk",
    documentBatch: "Batch 12",
    callCentreAgent: "Lerato Nkosi",
    dataType: "pdf",
    submittedDate: "2024-01-16",
    status: "pending_review",
  },
  {
    caseId: "SUCCESS-003",
    name: "Zinhle Ndlovu",
    idNumber: "9003050582082",
    company: "Concord Logistics",
    documentBatch: "Batch 12",
    callCentreAgent: "Naledi Jacobs",
    dataType: "linked",
    submittedDate: "2024-01-17",
    status: "pending_review",
  },
  {
    caseId: "SUCCESS-004",
    name: "Dumisani Sithole",
    idNumber: "7906215089080",
    company: "Rainshield Insurance",
    documentBatch: "Batch 13",
    callCentreAgent: "Sipho Maseko",
    dataType: "linked",
    submittedDate: "2024-01-10",
    status: "job_done",
    completedDate: "2024-01-18",
  },
  {
    caseId: "SUCCESS-005",
    name: "Anele Mthembu",
    idNumber: "9104050881086",
    company: "Capital Sentinel",
    documentBatch: "Batch 13",
    callCentreAgent: "Reneé Adams",
    dataType: "pdf",
    submittedDate: "2024-01-11",
    status: "job_done",
    completedDate: "2024-01-19",
  },
];

const createInitialSubmissions = (): SuccessfulSubmission[] => [
  {
    caseId: "SUBM-001",
    name: "Nomsa Khumalo",
    idNumber: "8001015809087",
    company: "Ridgeway Mining",
    documentBatch: "Batch 12",
    submittedBy: "Thabo Dlamini",
    submittedAt: "2024-01-15",
    status: "pending_review",
  },
  {
    caseId: "SUBM-002",
    name: "Kabelo Moloi",
    idNumber: "8209075009081",
    company: "Ataraxis Risk",
    documentBatch: "Batch 12",
    submittedBy: "Lerato Nkosi",
    submittedAt: "2024-01-16",
    status: "pending_review",
  },
  {
    caseId: "SUBM-003",
    name: "Zinhle Ndlovu",
    idNumber: "9003050582082",
    company: "Concord Logistics",
    documentBatch: "Batch 12",
    submittedBy: "Naledi Jacobs",
    submittedAt: "2024-01-17",
    status: "pending_review",
  },
  {
    caseId: "SUBM-004",
    name: "Dumisani Sithole",
    idNumber: "7906215089080",
    company: "Rainshield Insurance",
    documentBatch: "Batch 13",
    submittedBy: "Sipho Maseko",
    submittedAt: "2024-01-18",
    status: "approved",
  },
  {
    caseId: "SUBM-005",
    name: "Anele Mthembu",
    idNumber: "9104050881086",
    company: "Capital Sentinel",
    documentBatch: "Batch 13",
    submittedBy: "Reneé Adams",
    submittedAt: "2024-01-19",
    status: "pending_review",
  },
];

export default function AdminDashboard() {
  // Load all data
  const clients = useMemo(() => createInitialClients(), []);
  const callTeamCases = useMemo(() => createInitialCallTeamCases(), []);
  const deadCases = useMemo(() => createInitialDeadCases(), []);
  const successfulCases = useMemo(() => createInitialSuccessfulCases(), []);
  const submissions = useMemo(() => createInitialSubmissions(), []);

  // Calculate metrics
  const metrics = useMemo(() => {
    const unassignedCases = clients.filter((c) => !c.assignedAgent).length;
    const assignedCases = clients.filter((c) => c.assignedAgent).length;
    
    const activeCallTeamCases = callTeamCases.filter(
      (c) => c.reassignmentAttempts < 3,
    ).length;
    const deadCallTeamCases = callTeamCases.filter(
      (c) => c.reassignmentAttempts >= 3,
    ).length;
    
    const totalDeadCases = deadCallTeamCases + deadCases.length;
    
    const pendingReviewCases = successfulCases.filter(
      (c) => c.status === "pending_review",
    ).length;
    const completedCases = successfulCases.filter(
      (c) => c.status === "job_done",
    ).length;
    
    const pendingSubmissions = submissions.filter(
      (s) => s.status === "pending_review",
    ).length;
    const approvedSubmissions = submissions.filter(
      (s) => s.status === "approved",
    ).length;

    // Today's date for filtering
    const today = new Date().toISOString().split("T")[0];
    const todaysWins = successfulCases.filter(
      (c) => c.completedDate === today || c.status === "job_done",
    ).length;

    return {
      unassignedCases,
      assignedCases,
      activeCallTeamCases,
      deadCallTeamCases,
      totalDeadCases,
      pendingReviewCases,
      completedCases,
      pendingSubmissions,
      approvedSubmissions,
      todaysWins,
    };
  }, [clients, callTeamCases, deadCases, successfulCases, submissions]);

  return (
    <section className="space-y-8">
      <header className="space-y-2">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-emerald-400">
          Welcome back
        </p>
        <h2 className="text-3xl font-semibold tracking-tight text-white">
          Operations command center
        </h2>
        <p className="text-sm text-slate-300">
          Review escalations, coordinate the call teams, and keep successful
          recoveries flowing through the pipeline.
        </p>
      </header>

      {/* Key Metrics Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-3xl border border-slate-800 bg-slate-900/60 p-6">
          <p className="text-xs uppercase tracking-[0.25em] text-slate-400">
            Unassigned Cases
          </p>
          <p className="mt-2 text-3xl font-semibold text-yellow-300">
            {metrics.unassignedCases}
          </p>
          <p className="mt-1 text-xs text-slate-400">
            <Link
              href="/admin/assign-cases"
              className="text-emerald-400 hover:text-emerald-300"
            >
              View all →
            </Link>
          </p>
        </div>

        <div className="rounded-3xl border border-slate-800 bg-slate-900/60 p-6">
          <p className="text-xs uppercase tracking-[0.25em] text-slate-400">
            Active Escalations
          </p>
          <p className="mt-2 text-3xl font-semibold text-rose-300">
            {metrics.activeCallTeamCases}
          </p>
          <p className="mt-1 text-xs text-slate-400">
            <Link
              href="/admin/dead-case-call-team"
              className="text-emerald-400 hover:text-emerald-300"
            >
              Review →
            </Link>
          </p>
        </div>

        <div className="rounded-3xl border border-slate-800 bg-slate-900/60 p-6">
          <p className="text-xs uppercase tracking-[0.25em] text-slate-400">
            Pending Reviews
          </p>
          <p className="mt-2 text-3xl font-semibold text-blue-300">
            {metrics.pendingReviewCases + metrics.pendingSubmissions}
          </p>
          <p className="mt-1 text-xs text-slate-400">
            Cases: {metrics.pendingReviewCases} • Submissions: {metrics.pendingSubmissions}
          </p>
        </div>

        <div className="rounded-3xl border border-slate-800 bg-slate-900/60 p-6">
          <p className="text-xs uppercase tracking-[0.25em] text-slate-400">
            Today&apos;s Wins
          </p>
          <p className="mt-2 text-3xl font-semibold text-emerald-300">
            {metrics.todaysWins}
          </p>
          <p className="mt-1 text-xs text-slate-400">
            Completed cases today
          </p>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Quick Actions */}
        <article className="rounded-3xl border border-slate-800 bg-slate-900/60 p-6">
          <h3 className="text-lg font-semibold text-white">Quick Actions</h3>
          <ul className="mt-4 space-y-3">
            <li>
              <Link
                href="/admin/assign-cases"
                className="flex items-center justify-between rounded-xl border border-slate-800 bg-slate-900/80 px-4 py-3 text-sm text-slate-200 transition hover:border-emerald-400/60 hover:bg-slate-800"
              >
                <span>
                  Assign new cases ({metrics.unassignedCases} unassigned)
                </span>
                <span className="text-emerald-400">→</span>
              </Link>
            </li>
            <li>
              <Link
                href="/admin/dead-case-call-team"
                className="flex items-center justify-between rounded-xl border border-slate-800 bg-slate-900/80 px-4 py-3 text-sm text-slate-200 transition hover:border-rose-400/60 hover:bg-slate-800"
              >
                <span>
                  Review escalations ({metrics.activeCallTeamCases} active)
                </span>
                <span className="text-rose-400">→</span>
              </Link>
            </li>
            <li>
              <Link
                href="/admin/successful-cases"
                className="flex items-center justify-between rounded-xl border border-slate-800 bg-slate-900/80 px-4 py-3 text-sm text-slate-200 transition hover:border-blue-400/60 hover:bg-slate-800"
              >
                <span>
                  Review successful cases ({metrics.pendingReviewCases} pending)
                </span>
                <span className="text-blue-400">→</span>
              </Link>
            </li>
            <li>
              <Link
                href="/admin/review-successful-submissions"
                className="flex items-center justify-between rounded-xl border border-slate-800 bg-slate-900/80 px-4 py-3 text-sm text-slate-200 transition hover:border-emerald-400/60 hover:bg-slate-800"
              >
                <span>
                  Review submissions ({metrics.pendingSubmissions} pending)
                </span>
                <span className="text-emerald-400">→</span>
              </Link>
            </li>
          </ul>
        </article>

        {/* Overview Stats */}
        <article className="rounded-3xl border border-slate-800 bg-slate-900/60 p-6">
          <h3 className="text-lg font-semibold text-white">Overview Stats</h3>
          <dl className="mt-4 grid grid-cols-2 gap-4 text-sm">
            <div className="rounded-xl border border-slate-800/80 bg-slate-900/80 p-4">
              <dt className="text-xs uppercase tracking-[0.25em] text-slate-400">
                Live Assignments
              </dt>
              <dd className="mt-1 text-2xl font-semibold text-emerald-400">
                {metrics.assignedCases}
              </dd>
            </div>
            <div className="rounded-xl border border-slate-800/80 bg-slate-900/80 p-4">
              <dt className="text-xs uppercase tracking-[0.25em] text-slate-400">
                Dead Cases
              </dt>
              <dd className="mt-1 text-2xl font-semibold text-rose-300">
                {metrics.totalDeadCases}
              </dd>
            </div>
            <div className="rounded-xl border border-slate-800/80 bg-slate-900/80 p-4">
              <dt className="text-xs uppercase tracking-[0.25em] text-slate-400">
                Completed
              </dt>
              <dd className="mt-1 text-2xl font-semibold text-emerald-300">
                {metrics.completedCases}
              </dd>
            </div>
            <div className="rounded-xl border border-slate-800/80 bg-slate-900/80 p-4">
              <dt className="text-xs uppercase tracking-[0.25em] text-slate-400">
                Approved
              </dt>
              <dd className="mt-1 text-2xl font-semibold text-blue-300">
                {metrics.approvedSubmissions}
              </dd>
            </div>
          </dl>
        </article>
      </div>

      {/* Recent Activity */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Dead Cases Summary */}
        <article className="rounded-3xl border border-slate-800 bg-slate-900/60 p-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-white">Dead Cases</h3>
            <Link
              href="/admin/dead-case-call-team"
              className="text-xs text-emerald-400 hover:text-emerald-300"
            >
              View all →
            </Link>
          </div>
          <div className="mt-4 space-y-2">
            <div className="flex items-center justify-between rounded-xl border border-slate-800/80 bg-slate-900/80 px-4 py-2">
              <span className="text-sm text-slate-300">Call Team</span>
              <span className="text-lg font-semibold text-rose-300">
                {metrics.deadCallTeamCases}
              </span>
            </div>
            <div className="flex items-center justify-between rounded-xl border border-slate-800/80 bg-slate-900/80 px-4 py-2">
              <span className="text-sm text-slate-300">No Data Cases</span>
              <span className="text-lg font-semibold text-rose-300">
                {deadCases.length}
              </span>
            </div>
          </div>
        </article>

        {/* Pending Reviews */}
        <article className="rounded-3xl border border-slate-800 bg-slate-900/60 p-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-white">Pending Reviews</h3>
            <Link
              href="/admin/successful-cases"
              className="text-xs text-emerald-400 hover:text-emerald-300"
            >
              View all →
            </Link>
          </div>
          <div className="mt-4 space-y-2">
            <div className="flex items-center justify-between rounded-xl border border-slate-800/80 bg-slate-900/80 px-4 py-2">
              <span className="text-sm text-slate-300">Cases</span>
              <span className="text-lg font-semibold text-yellow-300">
                {metrics.pendingReviewCases}
              </span>
            </div>
            <div className="flex items-center justify-between rounded-xl border border-slate-800/80 bg-slate-900/80 px-4 py-2">
              <span className="text-sm text-slate-300">Submissions</span>
              <span className="text-lg font-semibold text-yellow-300">
                {metrics.pendingSubmissions}
              </span>
            </div>
          </div>
        </article>

        {/* Field Team Cases */}
        <article className="rounded-3xl border border-slate-800 bg-slate-900/60 p-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-white">Field Team</h3>
            <Link
              href="/admin/no-data-cases"
              className="text-xs text-emerald-400 hover:text-emerald-300"
            >
              View all →
            </Link>
          </div>
          <div className="mt-4 space-y-2">
            <div className="flex items-center justify-between rounded-xl border border-slate-800/80 bg-slate-900/80 px-4 py-2">
              <span className="text-sm text-slate-300">Assigned Cases</span>
              <span className="text-lg font-semibold text-emerald-300">
                {deadCases.length}
              </span>
            </div>
            <div className="flex items-center justify-between rounded-xl border border-slate-800/80 bg-slate-900/80 px-4 py-2">
              <span className="text-sm text-slate-300">Deceased</span>
              <span className="text-lg font-semibold text-rose-300">
                {deadCases.filter((c) => c.reason === "deceased (dead)").length}
              </span>
            </div>
          </div>
        </article>
      </div>
    </section>
  );
}

