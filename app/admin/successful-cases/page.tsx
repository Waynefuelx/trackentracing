"use client";

import { useEffect, useMemo, useState } from "react";

type CaseDocument = {
  type: "certified_id" | "proof_of_address" | "death_certificate" | "declaration" | "other";
  fileName: string;
  uploadedAt: string;
  fileUrl: string;
};

type CaseData = {
  caseId: string;
  name: string;
  idNumber: string;
  company: string;
  documentBatch: string;
  callCentreAgent: string;
  dataType: "linked" | "pdf";
  submittedDate: string;
  documents?: CaseDocument[];
  data: {
    address?: string;
    phone?: string;
    email?: string;
    employment?: string;
    notes?: string;
  };
};

type SuccessfulCase = CaseData & {
  status: "pending_review" | "job_done" | "rejected";
  rejectedReason?: string;
  completedDate?: string;
  reviewedBy?: string;
};

const callCentreAgents = [
  "Thabo Dlamini",
  "Lerato Nkosi",
  "Naledi Jacobs",
  "Sipho Maseko",
  "Reneé Adams",
];

const createInitialCases = (): SuccessfulCase[] => [
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
    documents: [
      {
        type: "certified_id",
        fileName: "id_8001015809087.pdf",
        uploadedAt: "2024-01-15",
        fileUrl: "#",
      },
      {
        type: "proof_of_address",
        fileName: "address_proof_8001015809087.pdf",
        uploadedAt: "2024-01-15",
        fileUrl: "#",
      },
      {
        type: "declaration",
        fileName: "declaration_8001015809087.pdf",
        uploadedAt: "2024-01-15",
        fileUrl: "#",
      },
    ],
    data: {
      address: "123 Main Street, Johannesburg",
      phone: "+27 11 123 4567",
      email: "nomsa.khumalo@example.com",
      employment: "Ridgeway Mining - Manager",
      notes: "All data verified and linked successfully",
    },
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
    documents: [
      {
        type: "certified_id",
        fileName: "id_8209075009081.pdf",
        uploadedAt: "2024-01-16",
        fileUrl: "#",
      },
      {
        type: "proof_of_address",
        fileName: "address_proof_8209075009081.pdf",
        uploadedAt: "2024-01-16",
        fileUrl: "#",
      },
      {
        type: "declaration",
        fileName: "declaration_8209075009081.pdf",
        uploadedAt: "2024-01-16",
        fileUrl: "#",
      },
    ],
    data: {
      address: "456 Oak Avenue, Cape Town",
      phone: "+27 21 987 6543",
      email: "kabelo.moloi@example.com",
      employment: "Ataraxis Risk - Analyst",
      notes: "PDF document uploaded with complete information",
    },
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
    documents: [
      {
        type: "certified_id",
        fileName: "id_9003050582082.pdf",
        uploadedAt: "2024-01-17",
        fileUrl: "#",
      },
      {
        type: "proof_of_address",
        fileName: "address_proof_9003050582082.pdf",
        uploadedAt: "2024-01-17",
        fileUrl: "#",
      },
    ],
    data: {
      address: "789 Pine Road, Durban",
      phone: "+27 31 555 7890",
      email: "zinhle.ndlovu@example.com",
      employment: "Concord Logistics - Coordinator",
      notes: "Data linked from UBMV system",
    },
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
    reviewedBy: "Admin User",
    data: {
      address: "321 Elm Street, Pretoria",
      phone: "+27 12 444 3210",
      email: "dumisani.sithole@example.com",
      employment: "Rainshield Insurance - Advisor",
      notes: "All information verified and approved",
    },
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
    reviewedBy: "Admin User",
    data: {
      address: "654 Maple Drive, Port Elizabeth",
      phone: "+27 41 777 8888",
      email: "anele.mthembu@example.com",
      employment: "Capital Sentinel - Executive",
      notes: "Documentation complete and verified",
    },
  },
];

export default function SuccessfulCasesPage() {
  const [cases, setCases] = useState<SuccessfulCase[]>(createInitialCases);
  const [selectedCase, setSelectedCase] = useState<SuccessfulCase | null>(null);
  const [rejectReason, setRejectReason] = useState("");
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [uploadStatus, setUploadStatus] = useState<"idle" | "uploading" | "success" | "error">("idle");

  const pendingCases = useMemo(
    () => cases.filter((c) => c.status === "pending_review"),
    [cases],
  );

  const completedCases = useMemo(
    () => cases.filter((c) => c.status === "job_done"),
    [cases],
  );

  const handleApprove = (caseId: string) => {
    setCases((prevCases) =>
      prevCases.map((c) => {
        if (c.caseId === caseId) {
          return {
            ...c,
            status: "job_done" as const,
            completedDate: new Date().toISOString().split("T")[0],
            reviewedBy: "Admin User", // In real app, get from auth context
          };
        }
        return c;
      }),
    );
    setSelectedCase(null);
  };

  const handleReject = (caseId: string) => {
    if (!rejectReason.trim()) {
      alert("Please provide a reason for rejection");
      return;
    }

    setCases((prevCases) =>
      prevCases.map((c) => {
        if (c.caseId === caseId) {
          return {
            ...c,
            status: "rejected" as const,
            rejectedReason: rejectReason,
          };
        }
        return c;
      }),
    );
    setRejectReason("");
    setShowRejectModal(false);
    setSelectedCase(null);
  };

  const handleBulkUpload = async () => {
    const casesToUpload = completedCases;
    
    if (casesToUpload.length === 0) {
      alert("No completed cases to upload");
      return;
    }

    setUploadStatus("uploading");

    // Simulate upload process
    try {
      // In a real app, this would make an API call to upload files
      await new Promise((resolve) => setTimeout(resolve, 2000));
      
      // Here you would typically:
      // 1. Format the data
      // 2. Create files/archives
      // 3. Upload to customer server via API
      // 4. Handle response
      
      console.log("Uploading cases:", casesToUpload);
      setUploadStatus("success");
      
      setTimeout(() => {
        setUploadStatus("idle");
        setShowUploadModal(false);
      }, 2000);
    } catch (error) {
      setUploadStatus("error");
      console.error("Upload failed:", error);
    }
  };

  const getCurrentMonth = () => {
    const now = new Date();
    return now.toLocaleString("default", { month: "long", year: "numeric" });
  };

  const getDocumentTypeLabel = (type: CaseDocument["type"]): string => {
    switch (type) {
      case "certified_id":
        return "Certified ID";
      case "proof_of_address":
        return "Proof of Address";
      case "death_certificate":
        return "Death Certificate";
      case "declaration":
        return "Declaration";
      default:
        return "Other Document";
    }
  };

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (selectedCase || showUploadModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [selectedCase, showUploadModal]);

  return (
    <section className="space-y-8 text-slate-200">
      <header className="space-y-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-sky-400">
            Final Review
          </p>
          <h2 className="text-3xl font-semibold tracking-tight text-white">
            Successful cases
          </h2>
          <p className="text-sm text-slate-300">
            Review completed cases from call centre agents. Approve cases that
            meet quality standards or reject them back to agents with feedback.
          </p>
        </div>
      </header>

      <div className="grid gap-6 lg:grid-cols-[2fr,1fr]">
        {/* Pending Review Cases */}
        <article className="overflow-hidden rounded-3xl border border-slate-800 bg-slate-900/60">
          <header className="border-b border-slate-800/60 bg-slate-900/80 px-6 py-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-white">
                  Pending review ({pendingCases.length})
                </h3>
                <p className="text-xs text-slate-400">
                  Cases awaiting final admin approval
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
                    Agent
                  </th>
                  <th scope="col" className="whitespace-nowrap px-6 py-3 text-left">
                    Data Type
                  </th>
                  <th scope="col" className="whitespace-nowrap px-6 py-3 text-left">
                    Submitted
                  </th>
                  <th scope="col" className="whitespace-nowrap px-6 py-3 text-left">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 text-slate-200">
                {pendingCases.length === 0 ? (
                  <tr>
                    <td
                      colSpan={6}
                      className="px-6 py-8 text-center text-slate-400"
                    >
                      No cases pending review
                    </td>
                  </tr>
                ) : (
                  pendingCases.map((caseItem) => (
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
                          {caseItem.company} • {caseItem.documentBatch}
                        </div>
                      </td>
                      <td className="whitespace-nowrap px-6 py-3">
                        <span className="rounded-full bg-blue-500/20 px-3 py-1 text-xs font-semibold text-blue-300">
                          {caseItem.callCentreAgent}
                        </span>
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
                        {caseItem.submittedDate}
                      </td>
                      <td className="whitespace-nowrap px-6 py-3">
                        <button
                          type="button"
                          onClick={() => setSelectedCase(caseItem)}
                          className="rounded-xl bg-sky-500 px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-sky-400 focus:outline-none focus:ring-2 focus:ring-sky-400/50"
                        >
                          Review
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </article>

        {/* Stats Sidebar */}
        <aside className="space-y-4 rounded-3xl border border-slate-800 bg-slate-900/60 p-6">
          <header>
            <h3 className="text-lg font-semibold text-white">Case Status</h3>
            <p className="text-xs text-slate-400">
              Overview of review pipeline
            </p>
          </header>

          <div className="space-y-4">
            <div className="rounded-2xl border border-slate-800/80 bg-slate-900/80 p-4">
              <p className="text-xs uppercase tracking-wide text-slate-400">
                Pending Review
              </p>
              <p className="mt-1 text-2xl font-semibold text-yellow-300">
                {pendingCases.length}
              </p>
            </div>

            <div className="rounded-2xl border border-slate-800/80 bg-slate-900/80 p-4">
              <p className="text-xs uppercase tracking-wide text-slate-400">
                Job Done
              </p>
              <p className="mt-1 text-2xl font-semibold text-emerald-300">
                {completedCases.length}
              </p>
            </div>

            <div className="rounded-2xl border border-slate-800/80 bg-slate-900/80 p-4">
              <p className="text-xs uppercase tracking-wide text-slate-400">
                Total Cases
              </p>
              <p className="mt-1 text-2xl font-semibold text-slate-200">
                {cases.length}
              </p>
            </div>
          </div>
        </aside>
      </div>

      {/* Completed Cases Section */}
      {completedCases.length > 0 && (
        <article className="overflow-hidden rounded-3xl border border-slate-800 bg-slate-900/60">
          <header className="border-b border-slate-800/60 bg-slate-900/80 px-6 py-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-white">
                  Completed cases ({completedCases.length})
                </h3>
                <p className="text-xs text-slate-400">
                  Cases marked as job done and ready for upload
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
                    Agent
                  </th>
                  <th scope="col" className="whitespace-nowrap px-6 py-3 text-left">
                    Completed Date
                  </th>
                  <th scope="col" className="whitespace-nowrap px-6 py-3 text-left">
                    Reviewed By
                  </th>
                  <th scope="col" className="whitespace-nowrap px-6 py-3 text-left">
                    Upload
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 text-slate-200">
                {completedCases.map((caseItem) => (
                  <tr key={caseItem.caseId} className="hover:bg-slate-900/50">
                    <td className="whitespace-nowrap px-6 py-3 font-medium text-white">
                      {caseItem.caseId}
                    </td>
                    <td className="px-6 py-3">
                      <div className="font-semibold text-white">
                        {caseItem.name}
                      </div>
                      <div className="text-xs text-slate-400">
                        {caseItem.company}
                      </div>
                    </td>
                    <td className="whitespace-nowrap px-6 py-3">
                      <span className="rounded-full bg-blue-500/20 px-3 py-1 text-xs font-semibold text-blue-300">
                        {caseItem.callCentreAgent}
                      </span>
                    </td>
                    <td className="whitespace-nowrap px-6 py-3 text-slate-300">
                      {caseItem.completedDate}
                    </td>
                    <td className="whitespace-nowrap px-6 py-3 text-slate-300">
                      {caseItem.reviewedBy}
                    </td>
                    <td className="whitespace-nowrap px-6 py-3">
                      <button
                        type="button"
                        onClick={() => setShowUploadModal(true)}
                        className="rounded-xl bg-sky-500 px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-sky-400 focus:outline-none focus:ring-2 focus:ring-sky-400/50"
                      >
                        Upload
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </article>
      )}

      {/* Review Case Modal */}
      {selectedCase && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 overflow-y-auto"
          onClick={() => {
            setSelectedCase(null);
            setShowRejectModal(false);
          }}
        >
          <div
            className="w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-3xl border border-slate-800 bg-slate-900 p-6 shadow-2xl my-8"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h3 className="text-xl font-semibold text-white">
                  Review Case
                </h3>
                <p className="mt-1 text-sm text-slate-400">
                  {selectedCase.name} • {selectedCase.caseId}
                </p>
              </div>
              <button
                onClick={() => {
                  setSelectedCase(null);
                  setShowRejectModal(false);
                }}
                className="rounded-xl border border-slate-700 bg-slate-800 px-4 py-2 text-sm font-semibold text-white transition hover:border-slate-500"
              >
                Close
              </button>
            </div>

            <div className="space-y-6">
              {/* Case Details */}
              <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4">
                <p className="mb-4 text-xs uppercase tracking-wide text-slate-400">
                  Case Details
                </p>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-slate-400">ID Number</p>
                    <p className="font-mono text-white">
                      {selectedCase.idNumber}
                    </p>
                  </div>
                  <div>
                    <p className="text-slate-400">Company</p>
                    <p className="text-white">{selectedCase.company}</p>
                  </div>
                  <div>
                    <p className="text-slate-400">Document Batch</p>
                    <p className="text-white">{selectedCase.documentBatch}</p>
                  </div>
                  <div>
                    <p className="text-slate-400">Call Centre Agent</p>
                    <p className="text-white">
                      {selectedCase.callCentreAgent}
                    </p>
                  </div>
                  <div>
                    <p className="text-slate-400">Data Type</p>
                    <p className="text-white">
                      {selectedCase.dataType === "linked"
                        ? "Linked Data"
                        : "PDF Upload"}
                    </p>
                  </div>
                  <div>
                    <p className="text-slate-400">Submitted Date</p>
                    <p className="text-white">{selectedCase.submittedDate}</p>
                  </div>
                </div>
              </div>

              {/* Customer Data */}
              <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4">
                <p className="mb-4 text-xs uppercase tracking-wide text-slate-400">
                  Customer Data
                </p>
                <div className="space-y-3 text-sm">
                  {selectedCase.data.address && (
                    <div>
                      <p className="text-slate-400">Address</p>
                      <p className="text-white">{selectedCase.data.address}</p>
                    </div>
                  )}
                  {selectedCase.data.phone && (
                    <div>
                      <p className="text-slate-400">Phone</p>
                      <p className="text-white">{selectedCase.data.phone}</p>
                    </div>
                  )}
                  {selectedCase.data.email && (
                    <div>
                      <p className="text-slate-400">Email</p>
                      <p className="text-white">{selectedCase.data.email}</p>
                    </div>
                  )}
                  {selectedCase.data.employment && (
                    <div>
                      <p className="text-slate-400">Employment</p>
                      <p className="text-white">
                        {selectedCase.data.employment}
                      </p>
                    </div>
                  )}
                  {selectedCase.data.notes && (
                    <div>
                      <p className="text-slate-400">Notes</p>
                      <p className="text-white">{selectedCase.data.notes}</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Paperwork Section */}
              <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4">
                <p className="mb-4 text-xs uppercase tracking-wide text-slate-400">
                  Submitted Documents ({selectedCase.documents?.length || 0})
                </p>
                {selectedCase.documents && selectedCase.documents.length > 0 ? (
                  <div className="space-y-3">
                    {selectedCase.documents.map((doc, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between rounded-xl border border-slate-800/60 bg-slate-900/80 px-4 py-3"
                      >
                        <div className="flex-1">
                          <p className="font-semibold text-white">
                            {getDocumentTypeLabel(doc.type)}
                          </p>
                          <p className="text-xs text-slate-400">
                            {doc.fileName} • Uploaded: {doc.uploadedAt}
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            className="rounded-xl border border-slate-700 bg-slate-800 px-3 py-1.5 text-xs font-semibold text-white transition hover:border-slate-500"
                            onClick={(e) => {
                              e.stopPropagation();
                              // In a real app, this would open the document
                              alert(`Opening ${doc.fileName}`);
                            }}
                          >
                            View
                          </button>
                          <a
                            href={doc.fileUrl}
                            download
                            className="rounded-xl border border-slate-700 bg-slate-800 px-3 py-1.5 text-xs font-semibold text-white transition hover:border-slate-500"
                            onClick={(e) => {
                              e.stopPropagation();
                              // In a real app, this would download the document
                            }}
                          >
                            Download
                          </a>
                          <button
                            type="button"
                            className="rounded-xl bg-sky-500 px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-sky-400 focus:outline-none focus:ring-2 focus:ring-sky-400/50"
                            onClick={(e) => {
                              e.stopPropagation();
                              // In a real app, this would upload the document
                              alert(`Uploading ${doc.fileName} to customer server`);
                            }}
                          >
                            Upload
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-slate-400">No documents submitted</p>
                )}
              </div>

              {/* Actions */}
              {!showRejectModal ? (
                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => handleApprove(selectedCase.caseId)}
                    className="flex-1 rounded-xl bg-emerald-500 px-4 py-3 text-sm font-semibold text-white transition hover:bg-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-400/50"
                  >
                    ✓ Mark as Job Done
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowRejectModal(true)}
                    className="flex-1 rounded-xl bg-rose-500 px-4 py-3 text-sm font-semibold text-white transition hover:bg-rose-400 focus:outline-none focus:ring-2 focus:ring-rose-400/50"
                  >
                    ✗ Reject to Agent
                  </button>
                </div>
              ) : (
                <div className="space-y-4 rounded-2xl border border-rose-500/30 bg-rose-500/10 p-4">
                  <div>
                    <label
                      htmlFor="reject-reason"
                      className="mb-2 block text-sm font-semibold text-white"
                    >
                      Rejection Reason
                    </label>
                    <textarea
                      id="reject-reason"
                      value={rejectReason}
                      onChange={(e) => setRejectReason(e.target.value)}
                      placeholder="Please provide a reason for rejecting this case back to the call centre agent..."
                      className="w-full rounded-xl border border-slate-700 bg-slate-900/80 px-4 py-3 text-sm text-white placeholder-slate-500 focus:border-rose-500 focus:outline-none focus:ring-2 focus:ring-rose-500/50"
                      rows={4}
                      onClick={(e) => e.stopPropagation()}
                    />
                  </div>
                  <div className="flex gap-3">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setShowRejectModal(false);
                        setRejectReason("");
                      }}
                      className="flex-1 rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-sm font-semibold text-white transition hover:border-slate-500"
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleReject(selectedCase.caseId);
                      }}
                      className="flex-1 rounded-xl bg-rose-500 px-4 py-3 text-sm font-semibold text-white transition hover:bg-rose-400 focus:outline-none focus:ring-2 focus:ring-rose-400/50"
                    >
                      Confirm Rejection
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Bulk Upload Modal */}
      {showUploadModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
          onClick={() => {
            if (uploadStatus === "idle") {
              setShowUploadModal(false);
            }
          }}
        >
          <div
            className="w-full max-w-2xl rounded-3xl border border-slate-800 bg-slate-900 p-6 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h3 className="text-xl font-semibold text-white">
                  Upload Completed Cases
                </h3>
                <p className="mt-1 text-sm text-slate-400">
                  {getCurrentMonth()} • {completedCases.length} cases ready
                </p>
              </div>
              {uploadStatus === "idle" && (
                <button
                  onClick={() => setShowUploadModal(false)}
                  className="rounded-xl border border-slate-700 bg-slate-800 px-4 py-2 text-sm font-semibold text-white transition hover:border-slate-500"
                >
                  Close
                </button>
              )}
            </div>

            <div className="space-y-6">
              <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4">
                <p className="mb-4 text-xs uppercase tracking-wide text-slate-400">
                  Upload Summary
                </p>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Total Cases:</span>
                    <span className="font-semibold text-white">
                      {completedCases.length}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Month:</span>
                    <span className="font-semibold text-white">
                      {getCurrentMonth()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Destination:</span>
                    <span className="font-semibold text-white">
                      Customer Server
                    </span>
                  </div>
                </div>
              </div>

              {uploadStatus === "idle" && (
                <div className="space-y-3">
                  <p className="text-sm text-slate-300">
                    This will upload all {completedCases.length} completed cases
                    to the customer server. The files will be formatted and
                    packaged for delivery.
                  </p>
                  <button
                    type="button"
                    onClick={handleBulkUpload}
                    className="w-full rounded-xl bg-sky-500 px-4 py-3 text-sm font-semibold text-white transition hover:bg-sky-400 focus:outline-none focus:ring-2 focus:ring-sky-400/50"
                  >
                    Upload to Customer Server
                  </button>
                </div>
              )}

              {uploadStatus === "uploading" && (
                <div className="space-y-3">
                  <div className="flex items-center justify-center py-8">
                    <div className="flex flex-col items-center gap-3">
                      <div className="h-12 w-12 animate-spin rounded-full border-4 border-slate-700 border-t-sky-500"></div>
                      <p className="text-sm text-slate-300">
                        Uploading {completedCases.length} cases...
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {uploadStatus === "success" && (
                <div className="space-y-3">
                  <div className="flex items-center justify-center py-8">
                    <div className="flex flex-col items-center gap-3">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500/20">
                        <svg
                          className="h-6 w-6 text-emerald-300"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      </div>
                      <p className="text-sm font-semibold text-emerald-300">
                        Upload successful!
                      </p>
                      <p className="text-xs text-slate-400">
                        {completedCases.length} cases uploaded to customer
                        server
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {uploadStatus === "error" && (
                <div className="space-y-3">
                  <div className="flex items-center justify-center py-8">
                    <div className="flex flex-col items-center gap-3">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-rose-500/20">
                        <svg
                          className="h-6 w-6 text-rose-300"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      </div>
                      <p className="text-sm font-semibold text-rose-300">
                        Upload failed
                      </p>
                      <p className="text-xs text-slate-400">
                        Please try again or contact support
                      </p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setUploadStatus("idle")}
                    className="w-full rounded-xl bg-slate-700 px-4 py-3 text-sm font-semibold text-white transition hover:bg-slate-600"
                  >
                    Try Again
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
