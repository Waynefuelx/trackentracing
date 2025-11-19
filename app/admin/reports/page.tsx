"use client";

import { useMemo, useState } from "react";

type ContactRecord = {
  caseId: string;
  customerName: string;
  idNumber: string;
  company: string;
  agent: string;
  contactDate: string;
  status: "contacted" | "no_contact" | "unreachable";
};

type SubmissionRecord = {
  caseId: string;
  customerName: string;
  idNumber: string;
  company: string;
  agent: string;
  submittedDate: string;
  status: "pending_review" | "approved" | "rejected" | "job_done";
};

const callCenterAgents = [
  "Thabo Dlamini",
  "Lerato Nkosi",
  "Naledi Jacobs",
  "Sipho Maseko",
  "Reneé Adams",
];

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

// Generate realistic dummy data spanning multiple months
const generateContactData = (): ContactRecord[] => {
  const contacts: ContactRecord[] = [];
  const names = [
    "Nomsa Khumalo", "Kabelo Moloi", "Zinhle Ndlovu", "Dumisani Sithole",
    "Anele Mthembu", "Luyanda Mokoena", "Mpho Radebe", "Robyn Niemand",
    "Sipho Mthembu", "Thandiwe Nkomo", "Bongani Dube", "Ntombi Mkhize",
    "Mandla Zulu", "Nomvula Dlamini", "Sibusiso Nkomo", "Lindiwe Mthembu",
    "Thabo Mokoena", "Nokuthula Khumalo", "Sipho Ndlovu", "Zanele Sithole",
    "Bheki Maseko", "Nomsa Jacobs", "Kabelo Adams", "Lerato Dlamini",
    "Naledi Nkosi", "Sipho Maseko", "Reneé Adams", "Thabo Khumalo",
    "Lerato Moloi", "Naledi Ndlovu", "Sipho Sithole", "Reneé Mthembu",
    "Thabo Mokoena", "Lerato Radebe", "Naledi Niemand", "Sipho Mthembu",
    "Reneé Nkomo", "Thabo Dube", "Lerato Mkhize", "Naledi Zulu",
  ];

  let caseCounter = 1;
  const statuses: Array<"contacted" | "no_contact" | "unreachable"> = [
    "contacted",
    "contacted",
    "contacted",
    "no_contact",
    "unreachable",
  ];

  // Generate data for the last 3 months
  const now = new Date();
  for (let monthOffset = 2; monthOffset >= 0; monthOffset--) {
    const monthDate = new Date(now.getFullYear(), now.getMonth() - monthOffset, 1);
    const daysInMonth = new Date(
      monthDate.getFullYear(),
      monthDate.getMonth() + 1,
      0,
    ).getDate();

    // Generate 8-15 contacts per day
    for (let day = 1; day <= daysInMonth; day++) {
      const contactsPerDay = Math.floor(Math.random() * 8) + 8; // 8-15 contacts
      for (let i = 0; i < contactsPerDay; i++) {
        const contactDate = new Date(
          monthDate.getFullYear(),
          monthDate.getMonth(),
          day,
        );
        const dateStr = contactDate.toISOString().split("T")[0];
        const name = names[Math.floor(Math.random() * names.length)];
        const agent =
          callCenterAgents[Math.floor(Math.random() * callCenterAgents.length)];
        const company =
          companies[Math.floor(Math.random() * companies.length)];
        const status = statuses[Math.floor(Math.random() * statuses.length)];

        contacts.push({
          caseId: `CALL-${String(caseCounter).padStart(4, "0")}`,
          customerName: name,
          idNumber: `${Math.floor(Math.random() * 9000000000000) + 1000000000000}`,
          company,
          agent,
          contactDate: dateStr,
          status,
        });
        caseCounter++;
      }
    }
  }

  return contacts;
};

// Generate realistic submission data
const generateSubmissionData = (): SubmissionRecord[] => {
  const submissions: SubmissionRecord[] = [];
  const names = [
    "Nomsa Khumalo", "Kabelo Moloi", "Zinhle Ndlovu", "Dumisani Sithole",
    "Anele Mthembu", "Luyanda Mokoena", "Mpho Radebe", "Robyn Niemand",
    "Sipho Mthembu", "Thandiwe Nkomo", "Bongani Dube", "Ntombi Mkhize",
    "Mandla Zulu", "Nomvula Dlamini", "Sibusiso Nkomo", "Lindiwe Mthembu",
    "Thabo Mokoena", "Nokuthula Khumalo", "Sipho Ndlovu", "Zanele Sithole",
    "Bheki Maseko", "Nomsa Jacobs", "Kabelo Adams", "Lerato Dlamini",
    "Naledi Nkosi", "Sipho Maseko", "Reneé Adams", "Thabo Khumalo",
  ];

  const statuses: Array<
    "pending_review" | "approved" | "rejected" | "job_done"
  > = ["approved", "approved", "job_done", "pending_review", "rejected"];

  // Generate data for the last 3 months
  const now = new Date();
  let subCounter = 1;

  for (let monthOffset = 2; monthOffset >= 0; monthOffset--) {
    const monthDate = new Date(now.getFullYear(), now.getMonth() - monthOffset, 1);
    const daysInMonth = new Date(
      monthDate.getFullYear(),
      monthDate.getMonth() + 1,
      0,
    ).getDate();

    // Generate 3-8 submissions per day
    for (let day = 1; day <= daysInMonth; day++) {
      const submissionsPerDay = Math.floor(Math.random() * 6) + 3; // 3-8 submissions
      for (let i = 0; i < submissionsPerDay; i++) {
        const submittedDate = new Date(
          monthDate.getFullYear(),
          monthDate.getMonth(),
          day,
        );
        const dateStr = submittedDate.toISOString().split("T")[0];
        const name = names[Math.floor(Math.random() * names.length)];
        const agent =
          callCenterAgents[Math.floor(Math.random() * callCenterAgents.length)];
        const company =
          companies[Math.floor(Math.random() * companies.length)];
        const status = statuses[Math.floor(Math.random() * statuses.length)];

        submissions.push({
          caseId: `SUBM-${String(subCounter).padStart(4, "0")}`,
          customerName: name,
          idNumber: `${Math.floor(Math.random() * 9000000000000) + 1000000000000}`,
          company,
          agent,
          submittedDate: dateStr,
          status,
        });
        subCounter++;
      }
    }
  }

  return submissions;
};

const createContactData = generateContactData;
const createSubmissionData = generateSubmissionData;

type DateFilterType = "daily" | "monthly";

export default function ReportsPage() {
  const [contacts] = useState<ContactRecord[]>(() => createContactData());
  const [submissions] = useState<SubmissionRecord[]>(() => createSubmissionData());
  const [selectedAgent, setSelectedAgent] = useState<string | null>(null);
  const [filterType, setFilterType] = useState<DateFilterType>("monthly");
  const [selectedDate, setSelectedDate] = useState<string>(
    new Date().toISOString().split("T")[0],
  );
  const [selectedMonth, setSelectedMonth] = useState<string>(
    `${new Date().getFullYear()}-${String(new Date().getMonth() + 1).padStart(2, "0")}`,
  );

  // Filter contacts based on date filter
  const filteredContacts = useMemo(() => {
    if (filterType === "daily") {
      return contacts.filter((contact) => {
        const contactDate = new Date(contact.contactDate);
        const filterDate = new Date(selectedDate);
        return (
          contactDate.getFullYear() === filterDate.getFullYear() &&
          contactDate.getMonth() === filterDate.getMonth() &&
          contactDate.getDate() === filterDate.getDate() &&
          contact.status === "contacted"
        );
      });
    } else {
      // Monthly filter
      const [year, month] = selectedMonth.split("-").map(Number);
      return contacts.filter((contact) => {
        const contactDate = new Date(contact.contactDate);
        return (
          contactDate.getFullYear() === year &&
          contactDate.getMonth() === month - 1 &&
          contact.status === "contacted"
        );
      });
    }
  }, [contacts, filterType, selectedDate, selectedMonth]);

  // Get display period text
  const displayPeriod = useMemo(() => {
    if (filterType === "daily") {
      const date = new Date(selectedDate);
      return date.toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    } else {
      const [year, month] = selectedMonth.split("-").map(Number);
      const date = new Date(year, month - 1, 1);
      return date.toLocaleDateString("en-US", { month: "long", year: "numeric" });
    }
  }, [filterType, selectedDate, selectedMonth]);

  // Filter submissions based on date filter
  const filteredSubmissions = useMemo(() => {
    if (filterType === "daily") {
      return submissions.filter((submission) => {
        const submissionDate = new Date(submission.submittedDate);
        const filterDate = new Date(selectedDate);
        return (
          submissionDate.getFullYear() === filterDate.getFullYear() &&
          submissionDate.getMonth() === filterDate.getMonth() &&
          submissionDate.getDate() === filterDate.getDate()
        );
      });
    } else {
      // Monthly filter
      const [year, month] = selectedMonth.split("-").map(Number);
      return submissions.filter((submission) => {
        const submissionDate = new Date(submission.submittedDate);
        return (
          submissionDate.getFullYear() === year &&
          submissionDate.getMonth() === month - 1
        );
      });
    }
  }, [submissions, filterType, selectedDate, selectedMonth]);

  // Calculate contacts by agent
  const contactsByAgent = useMemo(() => {
    const agentMap = new Map<string, number>();
    callCenterAgents.forEach((agent) => agentMap.set(agent, 0));

    filteredContacts.forEach((contact) => {
      const current = agentMap.get(contact.agent) || 0;
      agentMap.set(contact.agent, current + 1);
    });

    return Array.from(agentMap.entries())
      .map(([agent, count]) => ({ agent, count }))
      .sort((a, b) => b.count - a.count);
  }, [filteredContacts]);

  // Calculate successful submissions by agent
  const successfulSubmissionsByAgent = useMemo(() => {
    const agentMap = new Map<string, number>();
    callCenterAgents.forEach((agent) => agentMap.set(agent, 0));

    filteredSubmissions.forEach((submission) => {
      if (
        submission.status === "approved" ||
        submission.status === "job_done"
      ) {
        const current = agentMap.get(submission.agent) || 0;
        agentMap.set(submission.agent, current + 1);
      }
    });

    return Array.from(agentMap.entries())
      .map(([agent, count]) => ({ agent, count }))
      .sort((a, b) => b.count - a.count);
  }, [filteredSubmissions]);

  // Calculate total submissions by agent
  const submissionsByAgent = useMemo(() => {
    const agentMap = new Map<string, number>();
    callCenterAgents.forEach((agent) => agentMap.set(agent, 0));

    filteredSubmissions.forEach((submission) => {
      const current = agentMap.get(submission.agent) || 0;
      agentMap.set(submission.agent, current + 1);
    });

    return Array.from(agentMap.entries())
      .map(([agent, count]) => ({ agent, count }))
      .sort((a, b) => b.count - a.count);
  }, [filteredSubmissions]);

  // Get customers for selected agent (filtered by date)
  const agentCustomers = useMemo(() => {
    if (!selectedAgent) return [];
    return filteredContacts.filter((contact) => contact.agent === selectedAgent);
  }, [selectedAgent, filteredContacts]);

  // Get top contact agent
  const topContactAgent = contactsByAgent[0];

  // Get top successful submissions agent
  const topSuccessfulAgent = successfulSubmissionsByAgent[0];

  return (
    <section className="space-y-8 text-slate-200">
      <header className="space-y-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-indigo-400">
            Intelligence
          </p>
          <h2 className="text-3xl font-semibold tracking-tight text-white">
            Reports
          </h2>
          <p className="text-sm text-slate-300">
            Comprehensive business metrics and performance analytics for your
            operations.
          </p>
        </div>

        {/* Date Filter Controls */}
        <div className="flex flex-wrap items-center gap-4 rounded-2xl border border-slate-800 bg-slate-900/60 p-4">
          <div className="flex items-center gap-3">
            <label className="text-sm font-semibold text-white">Filter by:</label>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setFilterType("daily")}
                className={`rounded-xl px-4 py-2 text-xs font-semibold transition ${
                  filterType === "daily"
                    ? "bg-indigo-500 text-white"
                    : "border border-slate-700 bg-slate-800 text-slate-300 hover:border-slate-500"
                }`}
              >
                Daily
              </button>
              <button
                type="button"
                onClick={() => setFilterType("monthly")}
                className={`rounded-xl px-4 py-2 text-xs font-semibold transition ${
                  filterType === "monthly"
                    ? "bg-indigo-500 text-white"
                    : "border border-slate-700 bg-slate-800 text-slate-300 hover:border-slate-500"
                }`}
              >
                Monthly
              </button>
            </div>
          </div>

          {filterType === "daily" ? (
            <div className="flex items-center gap-3">
              <label className="text-sm font-semibold text-white">Date:</label>
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="rounded-xl border border-slate-700 bg-slate-800 px-4 py-2 text-sm text-white focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
              />
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <label className="text-sm font-semibold text-white">Month:</label>
              <input
                type="month"
                value={selectedMonth}
                onChange={(e) => setSelectedMonth(e.target.value)}
                className="rounded-xl border border-slate-700 bg-slate-800 px-4 py-2 text-sm text-white focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
              />
            </div>
          )}

          <div className="ml-auto text-sm text-slate-400">
            Showing data for: <span className="font-semibold text-white">{displayPeriod}</span>
          </div>
        </div>
      </header>

      {/* Key Metrics Cards */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-3xl border border-slate-800 bg-slate-900/60 p-6">
          <p className="text-xs uppercase tracking-wide text-slate-400">
            Customers Contacted
          </p>
          <p className="mt-2 text-3xl font-semibold text-emerald-300">
            {filteredContacts.length}
          </p>
          <p className="mt-1 text-xs text-slate-400">{displayPeriod}</p>
        </div>

        <div className="rounded-3xl border border-slate-800 bg-slate-900/60 p-6">
          <p className="text-xs uppercase tracking-wide text-slate-400">
            Top Contact Agent
          </p>
          <p className="mt-2 text-lg font-semibold text-white">
            {topContactAgent?.agent || "N/A"}
          </p>
          <p className="mt-1 text-xs text-slate-400">
            {topContactAgent?.count || 0} contacts
          </p>
        </div>

        <div className="rounded-3xl border border-slate-800 bg-slate-900/60 p-6">
          <p className="text-xs uppercase tracking-wide text-slate-400">
            Top Success Agent
          </p>
          <p className="mt-2 text-lg font-semibold text-white">
            {topSuccessfulAgent?.agent || "N/A"}
          </p>
          <p className="mt-1 text-xs text-slate-400">
            {topSuccessfulAgent?.count || 0} successful submissions
          </p>
        </div>

        <div className="rounded-3xl border border-slate-800 bg-slate-900/60 p-6">
          <p className="text-xs uppercase tracking-wide text-slate-400">
            Total Submissions
          </p>
          <p className="mt-2 text-3xl font-semibold text-blue-300">
            {filteredSubmissions.length}
          </p>
          <p className="mt-1 text-xs text-slate-400">{displayPeriod}</p>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Contacts by Agent */}
        <article className="overflow-hidden rounded-3xl border border-slate-800 bg-slate-900/60">
          <header className="border-b border-slate-800/60 bg-slate-900/80 px-6 py-4">
            <div>
              <h3 className="text-lg font-semibold text-white">
                Contacts by Agent
              </h3>
              <p className="text-xs text-slate-400">
                Who contacted the most customers in {displayPeriod}
              </p>
            </div>
          </header>

          <div className="p-6">
            <div className="space-y-3">
              {contactsByAgent.map(({ agent, count }) => (
                <div
                  key={agent}
                  className="flex items-center justify-between rounded-2xl border border-slate-800/80 bg-slate-900/80 px-4 py-3"
                >
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-white">{agent}</p>
                    <p className="text-xs text-slate-400">
                      {count} customer{count !== 1 ? "s" : ""} contacted
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="rounded-full bg-emerald-500/20 px-3 py-1 text-xs font-semibold text-emerald-300">
                      {count}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </article>

        {/* Successful Submissions by Agent */}
        <article className="overflow-hidden rounded-3xl border border-slate-800 bg-slate-900/60">
          <header className="border-b border-slate-800/60 bg-slate-900/80 px-6 py-4">
            <div>
              <h3 className="text-lg font-semibold text-white">
                Successful Submissions
              </h3>
              <p className="text-xs text-slate-400">
                Agents with the most approved/job done submissions
              </p>
            </div>
          </header>

          <div className="p-6">
            <div className="space-y-3">
              {successfulSubmissionsByAgent.map(({ agent, count }) => (
                <div
                  key={agent}
                  className="flex items-center justify-between rounded-2xl border border-slate-800/80 bg-slate-900/80 px-4 py-3"
                >
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-white">{agent}</p>
                    <p className="text-xs text-slate-400">
                      {count} successful submission{count !== 1 ? "s" : ""}
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="rounded-full bg-emerald-500/20 px-3 py-1 text-xs font-semibold text-emerald-300">
                      {count}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </article>
      </div>

      {/* Submissions by Agent - Clickable */}
      <article className="overflow-hidden rounded-3xl border border-slate-800 bg-slate-900/60">
        <header className="border-b border-slate-800/60 bg-slate-900/80 px-6 py-4">
          <div>
            <h3 className="text-lg font-semibold text-white">
              Submissions by Agent
            </h3>
            <p className="text-xs text-slate-400">
              Click on an agent name to view all their customers
            </p>
          </div>
        </header>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-800 text-sm">
            <thead className="bg-slate-900/80 text-xs uppercase tracking-wide text-slate-400">
              <tr>
                <th scope="col" className="whitespace-nowrap px-6 py-3 text-left">
                  Agent
                </th>
                <th scope="col" className="whitespace-nowrap px-6 py-3 text-left">
                  Total Submissions
                </th>
                <th scope="col" className="whitespace-nowrap px-6 py-3 text-left">
                  Successful
                </th>
                <th scope="col" className="whitespace-nowrap px-6 py-3 text-left">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 text-slate-200">
              {submissionsByAgent.map(({ agent, count }) => {
                const successfulCount =
                  successfulSubmissionsByAgent.find((a) => a.agent === agent)
                    ?.count || 0;
                return (
                  <tr key={agent} className="hover:bg-slate-900/50">
                    <td className="whitespace-nowrap px-6 py-3 font-medium text-white">
                      {agent}
                    </td>
                    <td className="whitespace-nowrap px-6 py-3">
                      <span className="rounded-full bg-blue-500/20 px-3 py-1 text-xs font-semibold text-blue-300">
                        {count}
                      </span>
                    </td>
                    <td className="whitespace-nowrap px-6 py-3">
                      <span className="rounded-full bg-emerald-500/20 px-3 py-1 text-xs font-semibold text-emerald-300">
                        {successfulCount}
                      </span>
                    </td>
                    <td className="whitespace-nowrap px-6 py-3">
                      <button
                        type="button"
                        onClick={() => setSelectedAgent(agent)}
                        className="rounded-xl bg-indigo-500 px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-400/50"
                      >
                        View Customers
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </article>

      {/* Agent Customers Modal */}
      {selectedAgent && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
          onClick={() => setSelectedAgent(null)}
        >
          <div
            className="w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-3xl border border-slate-800 bg-slate-900 p-6 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h3 className="text-xl font-semibold text-white">
                  Customers for {selectedAgent}
                </h3>
                <p className="mt-1 text-sm text-slate-400">
                  {agentCustomers.length} customer
                  {agentCustomers.length !== 1 ? "s" : ""} total
                </p>
              </div>
              <button
                onClick={() => setSelectedAgent(null)}
                className="rounded-xl border border-slate-700 bg-slate-800 px-4 py-2 text-sm font-semibold text-white transition hover:border-slate-500"
              >
                Close
              </button>
            </div>

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
                      Customer Name
                    </th>
                    <th
                      scope="col"
                      className="whitespace-nowrap px-6 py-3 text-left"
                    >
                      ID Number
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
                      Contact Date
                    </th>
                    <th
                      scope="col"
                      className="whitespace-nowrap px-6 py-3 text-left"
                    >
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800 text-slate-200">
                  {agentCustomers.length === 0 ? (
                    <tr>
                      <td
                        colSpan={6}
                        className="px-6 py-8 text-center text-slate-400"
                      >
                        No customers found for this agent
                      </td>
                    </tr>
                  ) : (
                    agentCustomers.map((customer) => (
                      <tr
                        key={customer.caseId}
                        className="hover:bg-slate-900/50"
                      >
                        <td className="whitespace-nowrap px-6 py-3 font-medium text-white">
                          {customer.caseId}
                        </td>
                        <td className="whitespace-nowrap px-6 py-3 text-white">
                          {customer.customerName}
                        </td>
                        <td className="whitespace-nowrap px-6 py-3 font-mono text-xs text-slate-300">
                          {customer.idNumber}
                        </td>
                        <td className="whitespace-nowrap px-6 py-3 text-slate-300">
                          {customer.company}
                        </td>
                        <td className="whitespace-nowrap px-6 py-3 text-slate-300">
                          {customer.contactDate}
                        </td>
                        <td className="whitespace-nowrap px-6 py-3">
                          <span
                            className={`rounded-full px-3 py-1 text-xs font-semibold ${
                              customer.status === "contacted"
                                ? "bg-emerald-500/20 text-emerald-300"
                                : customer.status === "no_contact"
                                  ? "bg-yellow-500/20 text-yellow-300"
                                  : "bg-orange-500/20 text-orange-300"
                            }`}
                          >
                            {customer.status === "contacted"
                              ? "Contacted"
                              : customer.status === "no_contact"
                                ? "No Contact"
                                : "Unreachable"}
                          </span>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
