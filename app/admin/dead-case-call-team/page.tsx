"use client";

import { useMemo, useState } from "react";

type ContactAttempt = {
  agent: string;
  date: string;
  status: "no_contact" | "unreachable";
};

type CallTeamCase = {
  caseId: string;
  name: string;
  idNumber: string;
  company: string;
  documentBatch: string;
  currentAgent: string | null;
  reassignmentAttempts: number;
  contactHistory: ContactAttempt[];
  hasUbmvData: boolean;
  dataType: "linked" | "pdf";
};

const callCenterAgents = [
  "Thabo Dlamini",
  "Lerato Nkosi",
  "Naledi Jacobs",
  "Sipho Maseko",
  "Reneé Adams",
];

const createInitialCases = (): CallTeamCase[] => [
  {
    caseId: "CALL-001",
    name: "Nomsa Khumalo",
    idNumber: "8001015809087",
    company: "Ridgeway Mining",
    documentBatch: "Batch 12",
    currentAgent: "Thabo Dlamini",
    reassignmentAttempts: 1,
    contactHistory: [
      { agent: "Thabo Dlamini", date: "2024-01-15", status: "no_contact" },
    ],
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
    contactHistory: [
      { agent: "Lerato Nkosi", date: "2024-01-14", status: "unreachable" },
      { agent: "Naledi Jacobs", date: "2024-01-16", status: "no_contact" },
    ],
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
    contactHistory: [],
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
    contactHistory: [
      { agent: "Thabo Dlamini", date: "2024-01-10", status: "no_contact" },
      { agent: "Lerato Nkosi", date: "2024-01-12", status: "unreachable" },
      { agent: "Reneé Adams", date: "2024-01-14", status: "no_contact" },
    ],
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
    contactHistory: [
      { agent: "Naledi Jacobs", date: "2024-01-11", status: "unreachable" },
      { agent: "Sipho Maseko", date: "2024-01-13", status: "no_contact" },
      { agent: "Thabo Dlamini", date: "2024-01-15", status: "unreachable" },
    ],
    hasUbmvData: true,
    dataType: "pdf",
  },
];

export default function DeadCaseFromCallTeamPage() {
  const [cases, setCases] = useState<CallTeamCase[]>(createInitialCases);
  const [selectedDeadCase, setSelectedDeadCase] = useState<CallTeamCase | null>(
    null,
  );

  const activeCases = useMemo(
    () => cases.filter((c) => c.reassignmentAttempts < 3),
    [cases],
  );

  const deadCases = useMemo(
    () => cases.filter((c) => c.reassignmentAttempts >= 3),
    [cases],
  );

  const handleReassign = (caseId: string, newAgent: string) => {
    setCases((prevCases) =>
      prevCases.map((c) => {
        if (c.caseId === caseId) {
          const previousAgent = c.currentAgent;
          const newAttempts = c.reassignmentAttempts + 1;

          // If this is the 3rd attempt, move to dead cases
          if (newAttempts >= 3) {
            const newAttempt: ContactAttempt = {
              agent: previousAgent || "Unknown",
              date: new Date().toISOString().split("T")[0],
              status: "no_contact",
            };
            return {
              ...c,
              currentAgent: null,
              reassignmentAttempts: newAttempts,
              contactHistory: [...c.contactHistory, newAttempt],
            };
          }

          // Add previous agent to history if exists
          const updatedHistory = previousAgent
            ? [
                ...c.contactHistory,
                {
                  agent: previousAgent,
                  date: new Date().toISOString().split("T")[0],
                  status: "no_contact" as const,
                },
              ]
            : c.contactHistory;

          return {
            ...c,
            currentAgent: newAgent,
            reassignmentAttempts: newAttempts,
            contactHistory: updatedHistory,
          };
        }
        return c;
      }),
    );
  };

  const handleAutoReassign = (caseId: string) => {
    const caseItem = cases.find((c) => c.caseId === caseId);
    if (!caseItem) return;

    const availableAgents = getAvailableAgents(caseItem);
    if (availableAgents.length === 0) return;

    // Automatically select the first available agent
    const selectedAgent = availableAgents[0];
    handleReassign(caseId, selectedAgent);
  };

  const getAvailableAgents = (currentCase: CallTeamCase) => {
    const attemptedAgents = new Set(
      currentCase.contactHistory.map((h) => h.agent),
    );
    if (currentCase.currentAgent) {
      attemptedAgents.add(currentCase.currentAgent);
    }
    return callCenterAgents.filter((agent) => !attemptedAgents.has(agent));
  };

  return (
    <section className="space-y-8 text-slate-200">
      <header className="space-y-2">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-rose-400">
          Escalations
        </p>
        <h2 className="text-3xl font-semibold tracking-tight text-white">
          Dead case from CallTeam
        </h2>
        <p className="text-sm text-slate-300">
          Review cases where call team has linked UBMV data. Reassign to team
          members if contact cannot be made. Cases with 3+ failed attempts move
          to dead cases.
        </p>
      </header>

      <div className="grid gap-6 lg:grid-cols-[2fr,1fr]">
        {/* Active Cases */}
        <article className="overflow-hidden rounded-3xl border border-slate-800 bg-slate-900/60">
          <header className="border-b border-slate-800/60 bg-slate-900/80 px-6 py-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-white">
                  Active cases ({activeCases.length})
                </h3>
                <p className="text-xs text-slate-400">
                  Cases with UBMV data ready for reassignment
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
                    Current Agent
                  </th>
                  <th scope="col" className="whitespace-nowrap px-6 py-3 text-left">
                    Attempts
                  </th>
                  <th scope="col" className="whitespace-nowrap px-6 py-3 text-left">
                    Data Type
                  </th>
                  <th scope="col" className="whitespace-nowrap px-6 py-3 text-left">
                    Reassign
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 text-slate-200">
                {activeCases.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-8 text-center text-slate-400">
                      No active cases available
                    </td>
                  </tr>
                ) : (
                  activeCases.map((caseItem) => {
                    const availableAgents = getAvailableAgents(caseItem);
                    const canReassign = availableAgents.length > 0;

                    return (
                      <tr key={caseItem.caseId} className="hover:bg-slate-900/50">
                        <td className="whitespace-nowrap px-6 py-3 font-medium text-white">
                          {caseItem.caseId}
                        </td>
                        <td className="px-6 py-3">
                          <div className="font-semibold text-white">
                            {caseItem.name}
                          </div>
                          <div className="text-xs text-slate-400">
                            {caseItem.company} • {caseItem.documentBatch}
                          </div>
                        </td>
                        <td className="whitespace-nowrap px-6 py-3">
                          {caseItem.currentAgent ? (
                            <span className="rounded-full bg-emerald-500/20 px-3 py-1 text-xs font-semibold text-emerald-300">
                              {caseItem.currentAgent}
                            </span>
                          ) : (
                            <span className="rounded-full border border-dashed border-slate-600 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-slate-400">
                              Unassigned
                            </span>
                          )}
                        </td>
                        <td className="whitespace-nowrap px-6 py-3">
                          <span
                            className={`rounded-full px-3 py-1 text-xs font-semibold ${
                              caseItem.reassignmentAttempts === 0
                                ? "bg-slate-800 text-slate-300"
                                : caseItem.reassignmentAttempts === 1
                                  ? "bg-yellow-500/20 text-yellow-300"
                                  : "bg-orange-500/20 text-orange-300"
                            }`}
                          >
                            {caseItem.reassignmentAttempts} / 3
                          </span>
                        </td>
                        <td className="whitespace-nowrap px-6 py-3">
                          <span
                            className={`rounded-full px-3 py-1 text-xs font-semibold ${
                              caseItem.dataType === "linked"
                                ? "bg-blue-500/20 text-blue-300"
                                : "bg-purple-500/20 text-purple-300"
                            }`}
                          >
                            {caseItem.dataType === "linked" ? "Linked" : "PDF"}
                          </span>
                        </td>
                        <td className="whitespace-nowrap px-6 py-3">
                          {canReassign ? (
                            <div className="flex items-center gap-2">
                              <select
                                value=""
                                onChange={(e) => {
                                  if (e.target.value) {
                                    handleReassign(caseItem.caseId, e.target.value);
                                    e.target.value = "";
                                  }
                                }}
                                className="flex-1 rounded-xl border border-slate-700 bg-slate-900/80 px-3 py-1.5 text-xs font-semibold text-white transition hover:border-slate-500 focus:outline-none focus:ring-2 focus:ring-rose-400/50"
                              >
                                <option value="">Select agent...</option>
                                {availableAgents.map((agent) => (
                                  <option key={agent} value={agent}>
                                    {agent}
                                  </option>
                                ))}
                              </select>
                              <button
                                type="button"
                                onClick={() => handleAutoReassign(caseItem.caseId)}
                                className="rounded-xl bg-rose-500 px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-rose-400 focus:outline-none focus:ring-2 focus:ring-rose-400/50"
                                title="Auto assign next available agent"
                              >
                                Auto
                              </button>
                            </div>
                          ) : (
                            <span className="text-xs text-slate-500">
                              All agents tried
                            </span>
                          )}
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </article>

        {/* Stats Sidebar */}
        <aside className="rounded-3xl border border-slate-800 bg-slate-900/60 p-4">
          <h3 className="mb-3 text-sm font-semibold text-white">Case Status</h3>
          <div className="grid grid-cols-1 gap-2">
            <div className="flex items-center justify-between rounded-xl border border-slate-800/80 bg-slate-900/80 px-3 py-2">
              <span className="text-xs text-slate-400">Active</span>
              <span className="text-lg font-semibold text-emerald-300">
                {activeCases.length}
              </span>
            </div>
            <div className="flex items-center justify-between rounded-xl border border-slate-800/80 bg-slate-900/80 px-3 py-2">
              <span className="text-xs text-slate-400">Dead</span>
              <span className="text-lg font-semibold text-rose-300">
                {deadCases.length}
              </span>
            </div>
            <div className="flex items-center justify-between rounded-xl border border-slate-800/80 bg-slate-900/80 px-3 py-2">
              <span className="text-xs text-slate-400">Attempts</span>
              <span className="text-lg font-semibold text-slate-200">
                {cases.reduce((sum, c) => sum + c.reassignmentAttempts, 0)}
              </span>
            </div>
          </div>
        </aside>
      </div>

      {/* Dead Cases Section */}
      {deadCases.length > 0 && (
        <article className="overflow-hidden rounded-3xl border border-slate-800 bg-slate-900/60">
          <header className="border-b border-slate-800/60 bg-slate-900/80 px-6 py-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-white">
                  Dead Cases ({deadCases.length})
                </h3>
                <p className="text-xs text-slate-400">
                  Cases with 3+ failed contact attempts. Click on customer name
                  to view contact history.
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
                    ID Number
                  </th>
                  <th scope="col" className="whitespace-nowrap px-6 py-3 text-left">
                    Company
                  </th>
                  <th scope="col" className="whitespace-nowrap px-6 py-3 text-left">
                    Attempts
                  </th>
                  <th scope="col" className="whitespace-nowrap px-6 py-3 text-left">
                    Data Type
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 text-slate-200">
                {deadCases.map((caseItem) => (
                  <tr
                    key={caseItem.caseId}
                    className="cursor-pointer hover:bg-slate-900/50"
                    onClick={() => setSelectedDeadCase(caseItem)}
                  >
                    <td className="whitespace-nowrap px-6 py-3 font-medium text-white">
                      {caseItem.caseId}
                    </td>
                    <td className="px-6 py-3">
                      <div className="font-semibold text-white">
                        {caseItem.name}
                      </div>
                      <div className="text-xs text-slate-400">
                        Click to view contact history
                      </div>
                    </td>
                    <td className="whitespace-nowrap px-6 py-3 font-mono text-xs text-slate-300">
                      {caseItem.idNumber}
                    </td>
                    <td className="whitespace-nowrap px-6 py-3 text-slate-300">
                      {caseItem.company}
                    </td>
                    <td className="whitespace-nowrap px-6 py-3">
                      <span className="rounded-full bg-rose-500/20 px-3 py-1 text-xs font-semibold text-rose-300">
                        {caseItem.reassignmentAttempts}
                      </span>
                    </td>
                    <td className="whitespace-nowrap px-6 py-3">
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-semibold ${
                          caseItem.dataType === "linked"
                            ? "bg-blue-500/20 text-blue-300"
                            : "bg-purple-500/20 text-purple-300"
                        }`}
                      >
                        {caseItem.dataType === "linked" ? "Linked" : "PDF"}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </article>
      )}

      {/* Contact History Modal */}
      {selectedDeadCase && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
          onClick={() => setSelectedDeadCase(null)}
        >
          <div
            className="w-full max-w-2xl rounded-3xl border border-slate-800 bg-slate-900 p-6 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h3 className="text-xl font-semibold text-white">
                  Contact History
                </h3>
                <p className="mt-1 text-sm text-slate-400">
                  {selectedDeadCase.name} • {selectedDeadCase.caseId}
                </p>
              </div>
              <button
                onClick={() => setSelectedDeadCase(null)}
                className="rounded-xl border border-slate-700 bg-slate-800 px-4 py-2 text-sm font-semibold text-white transition hover:border-slate-500"
              >
                Close
              </button>
            </div>

            <div className="space-y-4">
              <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4">
                <p className="text-xs uppercase tracking-wide text-slate-400">
                  Case Details
                </p>
                <div className="mt-2 grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-slate-400">ID Number</p>
                    <p className="font-mono text-white">
                      {selectedDeadCase.idNumber}
                    </p>
                  </div>
                  <div>
                    <p className="text-slate-400">Company</p>
                    <p className="text-white">{selectedDeadCase.company}</p>
                  </div>
                  <div>
                    <p className="text-slate-400">Document Batch</p>
                    <p className="text-white">
                      {selectedDeadCase.documentBatch}
                    </p>
                  </div>
                  <div>
                    <p className="text-slate-400">Data Type</p>
                    <p className="text-white">
                      {selectedDeadCase.dataType === "linked"
                        ? "Linked Data"
                        : "PDF Upload"}
                    </p>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4">
                <p className="mb-4 text-xs uppercase tracking-wide text-slate-400">
                  Contact Attempts ({selectedDeadCase.contactHistory.length})
                </p>
                {selectedDeadCase.contactHistory.length === 0 ? (
                  <p className="text-sm text-slate-400">No contact attempts recorded</p>
                ) : (
                  <div className="space-y-3">
                    {selectedDeadCase.contactHistory.map((attempt, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between rounded-xl border border-slate-800/60 bg-slate-900/80 px-4 py-3"
                      >
                        <div>
                          <p className="font-semibold text-white">
                            {attempt.agent}
                          </p>
                          <p className="text-xs text-slate-400">
                            Attempt #{index + 1} • {attempt.date}
                          </p>
                        </div>
                        <span
                          className={`rounded-full px-3 py-1 text-xs font-semibold ${
                            attempt.status === "no_contact"
                              ? "bg-yellow-500/20 text-yellow-300"
                              : "bg-orange-500/20 text-orange-300"
                          }`}
                        >
                          {attempt.status === "no_contact"
                            ? "No Contact"
                            : "Unreachable"}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
