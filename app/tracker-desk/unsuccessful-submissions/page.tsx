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

export default function UnsuccessfulSubmissionsPage() {
  const [cases, setCases] = useState<AgentCase[]>(createInitialCases);

  const unsuccessfulCases = useMemo(
    () => cases.filter((c) => c.status === "unsuccessful"),
    [cases],
  );

  const handleStatusChange = (caseId: string, newStatus: AgentCase["status"]) => {
    setCases((prev) =>
      prev.map((c) =>
        c.caseId === caseId
          ? {
              ...c,
              status: newStatus,
              lastContactDate:
                newStatus === "in_progress" || newStatus === "unsuccessful"
                  ? new Date().toISOString().split("T")[0]
                  : c.lastContactDate,
              contactAttempts:
                newStatus === "in_progress" || newStatus === "unsuccessful"
                  ? c.contactAttempts + 1
                  : c.contactAttempts,
            }
          : c,
      ),
    );
  };

  return (
    <section className="space-y-6">
      <header className="space-y-2">
        <h2 className="text-2xl font-semibold tracking-tight text-white">
          Unsuccessful Submissions ({unsuccessfulCases.length})
        </h2>
        <p className="text-sm text-slate-300">
          Cases that could not be completed after multiple attempts
        </p>
      </header>

      <article className="overflow-hidden rounded-3xl border border-slate-800 bg-slate-900/60">
        <header className="border-b border-slate-800/60 bg-slate-900/80 px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-white">
                Failed Cases ({unsuccessfulCases.length})
              </h3>
              <p className="text-xs text-slate-400">
                Cases requiring escalation or review
              </p>
            </div>
          </div>
        </header>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-800 text-sm">
            <thead className="bg-slate-900/80 text-xs uppercase tracking-wide text-slate-400">
              <tr>
                <th scope="col" className="whitespace-nowrap px-6 py-3 text-left">
                  Case ID
                </th>
                <th scope="col" className="whitespace-nowrap px-6 py-3 text-left">
                  Customer
                </th>
                <th scope="col" className="whitespace-nowrap px-6 py-3 text-left">
                  Company
                </th>
                <th scope="col" className="whitespace-nowrap px-6 py-3 text-left">
                  Last Contact
                </th>
                <th scope="col" className="whitespace-nowrap px-6 py-3 text-left">
                  Attempts
                </th>
                <th scope="col" className="whitespace-nowrap px-6 py-3 text-left">
                  Reason
                </th>
                <th scope="col" className="whitespace-nowrap px-6 py-3 text-left">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 text-slate-200">
              {unsuccessfulCases.length === 0 ? (
                <tr>
                  <td
                    colSpan={7}
                    className="px-6 py-8 text-center text-slate-400"
                  >
                    No unsuccessful cases
                  </td>
                </tr>
              ) : (
                unsuccessfulCases.map((caseItem) => (
                  <tr key={caseItem.caseId} className="hover:bg-slate-900/50">
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
                      {caseItem.lastContactDate || "N/A"}
                    </td>
                    <td className="whitespace-nowrap px-6 py-3">
                      <span className="rounded-full bg-rose-500/20 px-3 py-1 text-xs font-semibold text-rose-300">
                        {caseItem.contactAttempts}
                      </span>
                    </td>
                    <td className="px-6 py-3 text-sm text-slate-300">
                      {caseItem.notes || (
                        <span className="text-slate-500">No reason provided</span>
                      )}
                    </td>
                    <td className="whitespace-nowrap px-6 py-3">
                      <button
                        type="button"
                        onClick={() =>
                          handleStatusChange(caseItem.caseId, "in_progress")
                        }
                        className="rounded-xl border border-yellow-600/60 bg-yellow-600/20 px-3 py-1.5 text-xs font-semibold text-yellow-300 transition hover:bg-yellow-600/30 focus:outline-none focus:ring-2 focus:ring-yellow-400/50"
                      >
                        Retry
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </article>
    </section>
  );
}




