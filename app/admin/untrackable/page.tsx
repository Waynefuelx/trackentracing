"use client";

import { useMemo } from "react";

type DeadCaseRecord = {
  caseId: string;
  name: string;
  idNumber: string;
  company: string;
  documentBatch: string;
  assignedFieldAgent: string;
  reason: "deceased (dead)" | "no info";
};

const fieldTeamAgents = [
  "Andile Mthembu",
  "Bongani Zulu",
  "Nomsa Dlamini",
  "Sipho Nkosi",
  "Thandiwe Maseko",
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

export default function UntrackablePage() {
  const deadCases = createInitialDeadCases();

  const assignmentStats = useMemo(() => {
    const assignments = fieldTeamAgents.map((agent) => ({
      agent,
      total: deadCases.filter((deadCase) => deadCase.assignedFieldAgent === agent)
        .length,
    }));

    return { assignments };
  }, [deadCases]);

  return (
    <section className="space-y-8 text-slate-200">
      <header className="space-y-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-emerald-400">
            Field Team
          </p>
          <h2 className="text-3xl font-semibold tracking-tight text-white">
            Untrackable
          </h2>
          <p className="text-sm text-slate-300">
            Cases where the call team could not find any data on UBMV. These
            cases have been assigned to the field team for on-foot investigation.
          </p>
        </div>
      </header>

      <div className="grid gap-6 lg:grid-cols-[2fr,1fr]">
        <article className="overflow-hidden rounded-3xl border border-slate-800 bg-slate-900/60">
          <header className="border-b border-slate-800/60 bg-slate-900/80 px-6 py-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-white">Dead cases</h3>
                <p className="text-xs text-slate-400">
                  {deadCases.length} cases assigned to field team
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
                    ID number
                  </th>
                  <th scope="col" className="whitespace-nowrap px-6 py-3 text-left">
                    Company
                  </th>
                  <th scope="col" className="whitespace-nowrap px-6 py-3 text-left">
                    Batch
                  </th>
                  <th scope="col" className="whitespace-nowrap px-6 py-3 text-left">
                    Assigned field agent
                  </th>
                  <th scope="col" className="whitespace-nowrap px-6 py-3 text-left">
                    Reason for dead case
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 text-slate-200">
                {deadCases.map((deadCase) => (
                  <tr key={deadCase.caseId} className="hover:bg-slate-900/50">
                    <td className="whitespace-nowrap px-6 py-3 font-medium text-white">
                      {deadCase.caseId}
                    </td>
                    <td className="px-6 py-3">
                      <div className="font-semibold text-white">{deadCase.name}</div>
                      <div className="text-xs text-slate-400">
                        Received via {deadCase.documentBatch}
                      </div>
                    </td>
                    <td className="whitespace-nowrap px-6 py-3 font-mono text-xs text-slate-300">
                      {deadCase.idNumber}
                    </td>
                    <td className="whitespace-nowrap px-6 py-3 text-slate-300">
                      {deadCase.company}
                    </td>
                    <td className="whitespace-nowrap px-6 py-3 text-slate-300">
                      {deadCase.documentBatch}
                    </td>
                    <td className="whitespace-nowrap px-6 py-3">
                      <span className="rounded-full bg-emerald-500/20 px-3 py-1 text-xs font-semibold text-emerald-300">
                        {deadCase.assignedFieldAgent}
                      </span>
                    </td>
                    <td className="whitespace-nowrap px-6 py-3">
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-semibold ${
                          deadCase.reason === "deceased (dead)"
                            ? "bg-rose-500/20 text-rose-300"
                            : "bg-amber-500/20 text-amber-300"
                        }`}
                      >
                        {deadCase.reason}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </article>

        <aside className="space-y-4 rounded-3xl border border-slate-800 bg-slate-900/60 p-6">
          <header>
            <h3 className="text-lg font-semibold text-white">Team load</h3>
            <p className="text-xs text-slate-400">
              Track how many cases each field agent has from this batch.
            </p>
          </header>

          <ul className="space-y-3">
            {assignmentStats.assignments.map(({ agent, total }) => (
              <li
                key={agent}
                className="flex items-center justify-between rounded-2xl border border-slate-800/80 bg-slate-900/80 px-4 py-3"
              >
                <div>
                  <p className="text-sm font-semibold text-white">{agent}</p>
                  <p className="text-xs text-slate-400">
                    {total === 0 ? "No cases assigned" : `${total} case${total > 1 ? "s" : ""}`}
                  </p>
                </div>
                <span className="rounded-full bg-slate-800 px-3 py-1 text-xs font-semibold text-slate-300">
                  {total}
                </span>
              </li>
            ))}
          </ul>
        </aside>
      </div>
    </section>
  );
}

