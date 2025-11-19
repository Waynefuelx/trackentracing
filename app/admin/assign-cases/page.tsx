"use client";

import { useMemo, useState } from "react";

type ClientRecord = {
  caseId: string;
  name: string;
  idNumber: string;
  company: string;
  documentBatch: string;
  assignedAgent: string | null;
};

const callCenterAgents = [
  "Thabo Dlamini",
  "Lerato Nkosi",
  "Naledi Jacobs",
  "Sipho Maseko",
  "Reneé Adams",
];

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

export default function AssignCasesPage() {
  const [clients, setClients] = useState<ClientRecord[]>(createInitialClients);
  const [selectedAgents, setSelectedAgents] = useState<Record<string, string>>({});

  const handleManualAssign = (caseId: string, agent: string) => {
    if (!agent) return;
    setClients((prev) =>
      prev.map((client) =>
        client.caseId === caseId ? { ...client, assignedAgent: agent } : client,
      ),
    );
    setSelectedAgents((prev) => ({ ...prev, [caseId]: "" }));
  };

  const autoAssign = () => {
    const loadByAgent = new Map<string, number>(
      callCenterAgents.map((agent) => [agent, 0]),
    );

    // Tally current load so existing assignments stay in place.
    clients.forEach((client) => {
      if (client.assignedAgent) {
        loadByAgent.set(
          client.assignedAgent,
          (loadByAgent.get(client.assignedAgent) ?? 0) + 1,
        );
      }
    });

    const updated = clients.map((client) => {
      if (client.assignedAgent) {
        return client;
      }

      const [nextAgent] = [...loadByAgent.entries()]
        .sort(
          (a, b) =>
            a[1] - b[1] || a[0].localeCompare(b[0], "en", { sensitivity: "base" }),
        )
        .at(0)!;

      loadByAgent.set(nextAgent, (loadByAgent.get(nextAgent) ?? 0) + 1);

      return {
        ...client,
        assignedAgent: nextAgent,
      };
    });

    setClients(updated);
  };

  const resetAssignments = () => {
    setClients(createInitialClients());
    setSelectedAgents({});
  };

  const assignmentStats = useMemo(() => {
    const assignments = callCenterAgents.map((agent) => ({
      agent,
      total: clients.filter((client) => client.assignedAgent === agent).length,
    }));

    const unassigned = clients.filter((client) => !client.assignedAgent).length;

    return { assignments, unassigned };
  }, [clients]);

  return (
    <section className="space-y-8 text-slate-200">
      <header className="space-y-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-emerald-400">
            Workroom
          </p>
          <h2 className="text-3xl font-semibold tracking-tight text-white">
            Assign cases
          </h2>
          <p className="text-sm text-slate-300">
            Upload a batch, review the list, and let the system distribute cases
            evenly across the call centre team.
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            onClick={autoAssign}
            className="rounded-2xl bg-emerald-500 px-4 py-2 text-sm font-semibold text-emerald-950 transition hover:bg-emerald-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-300"
          >
            Auto assign
          </button>
          <button
            type="button"
            onClick={resetAssignments}
            className="rounded-2xl border border-slate-700 bg-slate-900/60 px-4 py-2 text-sm font-semibold text-white transition hover:border-slate-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-100/60"
          >
            Reset assignments
          </button>
        </div>
      </header>

      <div className="grid gap-6 lg:grid-cols-[2fr,1fr]">
        <article className="overflow-hidden rounded-3xl border border-slate-800 bg-slate-900/60">
          <header className="border-b border-slate-800/60 bg-slate-900/80 px-6 py-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-white">Current batch</h3>
                <p className="text-xs text-slate-400">
                  {clients.length} customers • {assignmentStats.unassigned} awaiting
                  assignment
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
                    Assigned agent
                  </th>
                  <th scope="col" className="whitespace-nowrap px-6 py-3 text-left">
                    REASSIGN
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 text-slate-200">
                {clients.map((client) => (
                  <tr key={client.caseId} className="hover:bg-slate-900/50">
                    <td className="whitespace-nowrap px-6 py-3 font-medium text-white">
                      {client.caseId}
                    </td>
                    <td className="px-6 py-3">
                      <div className="font-semibold text-white">{client.name}</div>
                      <div className="text-xs text-slate-400">
                        Received via {client.documentBatch}
                      </div>
                    </td>
                    <td className="whitespace-nowrap px-6 py-3 font-mono text-xs text-slate-300">
                      {client.idNumber}
                    </td>
                    <td className="whitespace-nowrap px-6 py-3 text-slate-300">
                      {client.company}
                    </td>
                    <td className="whitespace-nowrap px-6 py-3 text-slate-300">
                      {client.documentBatch}
                    </td>
                    <td className="whitespace-nowrap px-6 py-3">
                      {client.assignedAgent ? (
                        <span className="rounded-full bg-emerald-500/20 px-3 py-1 text-xs font-semibold text-emerald-300">
                          {client.assignedAgent}
                        </span>
                      ) : (
                        <span className="rounded-full border border-dashed border-slate-600 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-slate-400">
                          Awaiting assignment
                        </span>
                      )}
                    </td>
                    <td className="whitespace-nowrap px-6 py-3">
                      <select
                        value={selectedAgents[client.caseId] || ""}
                        onChange={(e) => {
                          setSelectedAgents((prev) => ({
                            ...prev,
                            [client.caseId]: e.target.value,
                          }));
                          if (e.target.value) {
                            handleManualAssign(client.caseId, e.target.value);
                          }
                        }}
                        className="rounded-lg border border-slate-700 bg-slate-900/80 px-3 py-2 text-sm text-white focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                      >
                        <option value="">Select agent...</option>
                        {callCenterAgents.map((agent) => (
                          <option key={agent} value={agent}>
                            {agent}
                          </option>
                        ))}
                      </select>
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
              Track how many customers each agent has from this batch.
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

