"use client";

import { useState } from "react";

type SubmissionDocument = {
  type: "certified_id" | "proof_of_address" | "death_certificate" | "declaration";
  fileName: string;
  uploadedAt: string;
  fileUrl: string; // In real app, this would be a URL to the document
};

type SuccessfulSubmission = {
  caseId: string;
  name: string;
  idNumber: string;
  company: string;
  documentBatch: string;
  submittedBy: string;
  submittedAt: string;
  isDeceased: boolean;
  documents: SubmissionDocument[];
  status: "pending_review" | "approved" | "rejected";
  rejectionReason?: string;
};

const callCenterAgents = [
  "Thabo Dlamini",
  "Lerato Nkosi",
  "Naledi Jacobs",
  "Sipho Maseko",
  "Reneé Adams",
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
    isDeceased: false,
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
  },
  {
    caseId: "SUBM-002",
    name: "Kabelo Moloi",
    idNumber: "8209075009081",
    company: "Ataraxis Risk",
    documentBatch: "Batch 12",
    submittedBy: "Lerato Nkosi",
    submittedAt: "2024-01-16",
    isDeceased: true,
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
        type: "death_certificate",
        fileName: "death_cert_8209075009081.pdf",
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
  },
  {
    caseId: "SUBM-003",
    name: "Zinhle Ndlovu",
    idNumber: "9003050582082",
    company: "Concord Logistics",
    documentBatch: "Batch 12",
    submittedBy: "Naledi Jacobs",
    submittedAt: "2024-01-17",
    isDeceased: false,
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
      {
        type: "declaration",
        fileName: "declaration_9003050582082.pdf",
        uploadedAt: "2024-01-17",
        fileUrl: "#",
      },
    ],
  },
  {
    caseId: "SUBM-004",
    name: "Dumisani Sithole",
    idNumber: "7906215089080",
    company: "Rainshield Insurance",
    documentBatch: "Batch 13",
    submittedBy: "Sipho Maseko",
    submittedAt: "2024-01-18",
    isDeceased: false,
    status: "approved",
    documents: [
      {
        type: "certified_id",
        fileName: "id_7906215089080.pdf",
        uploadedAt: "2024-01-18",
        fileUrl: "#",
      },
      {
        type: "proof_of_address",
        fileName: "address_proof_7906215089080.pdf",
        uploadedAt: "2024-01-18",
        fileUrl: "#",
      },
      {
        type: "declaration",
        fileName: "declaration_7906215089080.pdf",
        uploadedAt: "2024-01-18",
        fileUrl: "#",
      },
    ],
  },
  {
    caseId: "SUBM-005",
    name: "Anele Mthembu",
    idNumber: "9104050881086",
    company: "Capital Sentinel",
    documentBatch: "Batch 13",
    submittedBy: "Reneé Adams",
    submittedAt: "2024-01-19",
    isDeceased: true,
    status: "pending_review",
    documents: [
      {
        type: "certified_id",
        fileName: "id_9104050881086.pdf",
        uploadedAt: "2024-01-19",
        fileUrl: "#",
      },
      {
        type: "proof_of_address",
        fileName: "address_proof_9104050881086.pdf",
        uploadedAt: "2024-01-19",
        fileUrl: "#",
      },
      {
        type: "death_certificate",
        fileName: "death_cert_9104050881086.pdf",
        uploadedAt: "2024-01-19",
        fileUrl: "#",
      },
      {
        type: "declaration",
        fileName: "declaration_9104050881086.pdf",
        uploadedAt: "2024-01-19",
        fileUrl: "#",
      },
    ],
  },
];

const getDocumentTypeLabel = (type: SubmissionDocument["type"]): string => {
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
      return type;
  }
};

export default function ReviewSuccessfulSubmissionsPage() {
  const [submissions, setSubmissions] = useState<SuccessfulSubmission[]>(
    createInitialSubmissions,
  );
  const [selectedSubmission, setSelectedSubmission] =
    useState<SuccessfulSubmission | null>(null);
  const [rejectionReason, setRejectionReason] = useState("");
  const [showRejectModal, setShowRejectModal] = useState(false);

  const pendingSubmissions = submissions.filter(
    (s) => s.status === "pending_review",
  );
  const approvedSubmissions = submissions.filter(
    (s) => s.status === "approved",
  );
  const rejectedSubmissions = submissions.filter(
    (s) => s.status === "rejected",
  );

  const handleApprove = (caseId: string) => {
    setSubmissions((prev) =>
      prev.map((s) =>
        s.caseId === caseId ? { ...s, status: "approved" as const } : s,
      ),
    );
    setSelectedSubmission(null);
  };

  const handleReject = (caseId: string) => {
    if (!rejectionReason.trim()) {
      return;
    }
    setSubmissions((prev) =>
      prev.map((s) =>
        s.caseId === caseId
          ? {
              ...s,
              status: "rejected" as const,
              rejectionReason: rejectionReason,
            }
          : s,
      ),
    );
    setRejectionReason("");
    setShowRejectModal(false);
    setSelectedSubmission(null);
  };

  const openRejectModal = () => {
    setShowRejectModal(true);
    setRejectionReason("");
  };

  const closeRejectModal = () => {
    setShowRejectModal(false);
    setRejectionReason("");
  };

  return (
    <section className="space-y-8 text-slate-200">
      <header className="space-y-2">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-emerald-400">
          Quality review
        </p>
        <h2 className="text-3xl font-semibold tracking-tight text-white">
          Review successful submissions
        </h2>
        <p className="text-sm text-slate-300">
          Review submissions from call center agents. Verify all documents are
          correct and complete before approval.
        </p>
      </header>

      <div className="grid gap-6 lg:grid-cols-[2fr,1fr]">
        {/* Submissions Table */}
        <article className="overflow-hidden rounded-3xl border border-slate-800 bg-slate-900/60">
          <header className="border-b border-slate-800/60 bg-slate-900/80 px-6 py-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-white">
                  Pending Review ({pendingSubmissions.length})
                </h3>
                <p className="text-xs text-slate-400">
                  Click on customer name to review documents
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
                    Submitted By
                  </th>
                  <th scope="col" className="whitespace-nowrap px-6 py-3 text-left">
                    Company
                  </th>
                  <th scope="col" className="whitespace-nowrap px-6 py-3 text-left">
                    Documents
                  </th>
                  <th scope="col" className="whitespace-nowrap px-6 py-3 text-left">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 text-slate-200">
                {pendingSubmissions.length === 0 ? (
                  <tr>
                    <td
                      colSpan={6}
                      className="px-6 py-8 text-center text-slate-400"
                    >
                      No pending submissions
                    </td>
                  </tr>
                ) : (
                  pendingSubmissions.map((submission) => (
                    <tr
                      key={submission.caseId}
                      className="cursor-pointer hover:bg-slate-900/50"
                      onClick={() => setSelectedSubmission(submission)}
                    >
                      <td className="whitespace-nowrap px-6 py-3 font-medium text-white">
                        {submission.caseId}
                      </td>
                      <td className="px-6 py-3">
                        <div className="font-semibold text-white">
                          {submission.name}
                        </div>
                        <div className="text-xs text-slate-400">
                          {submission.idNumber} • {submission.documentBatch}
                        </div>
                      </td>
                      <td className="whitespace-nowrap px-6 py-3">
                        <span className="rounded-full bg-blue-500/20 px-3 py-1 text-xs font-semibold text-blue-300">
                          {submission.submittedBy}
                        </span>
                      </td>
                      <td className="whitespace-nowrap px-6 py-3 text-slate-300">
                        {submission.company}
                      </td>
                      <td className="whitespace-nowrap px-6 py-3">
                        <span className="rounded-full bg-slate-800 px-3 py-1 text-xs font-semibold text-slate-300">
                          {submission.documents.length} doc
                          {submission.documents.length > 1 ? "s" : ""}
                        </span>
                      </td>
                      <td className="whitespace-nowrap px-6 py-3">
                        <span
                          className={`rounded-full px-3 py-1 text-xs font-semibold ${
                            submission.status === "pending_review"
                              ? "bg-yellow-500/20 text-yellow-300"
                              : submission.status === "approved"
                                ? "bg-emerald-500/20 text-emerald-300"
                                : "bg-rose-500/20 text-rose-300"
                          }`}
                        >
                          {submission.status === "pending_review"
                            ? "Pending"
                            : submission.status === "approved"
                              ? "Approved"
                              : "Rejected"}
                        </span>
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
            <h3 className="text-lg font-semibold text-white">Submission Status</h3>
            <p className="text-xs text-slate-400">
              Overview of submission reviews
            </p>
          </header>

          <div className="space-y-4">
            <div className="rounded-2xl border border-slate-800/80 bg-slate-900/80 p-4">
              <p className="text-xs uppercase tracking-wide text-slate-400">
                Pending Review
              </p>
              <p className="mt-1 text-2xl font-semibold text-yellow-300">
                {pendingSubmissions.length}
              </p>
            </div>

            <div className="rounded-2xl border border-slate-800/80 bg-slate-900/80 p-4">
              <p className="text-xs uppercase tracking-wide text-slate-400">
                Approved
              </p>
              <p className="mt-1 text-2xl font-semibold text-emerald-300">
                {approvedSubmissions.length}
              </p>
            </div>

            <div className="rounded-2xl border border-slate-800/80 bg-slate-900/80 p-4">
              <p className="text-xs uppercase tracking-wide text-slate-400">
                Rejected
              </p>
              <p className="mt-1 text-2xl font-semibold text-rose-300">
                {rejectedSubmissions.length}
              </p>
            </div>

            <div className="rounded-2xl border border-slate-800/80 bg-slate-900/80 p-4">
              <p className="text-xs uppercase tracking-wide text-slate-400">
                Total Submissions
              </p>
              <p className="mt-1 text-2xl font-semibold text-slate-200">
                {submissions.length}
              </p>
            </div>
          </div>
        </aside>
      </div>

      {/* Approved/Rejected Submissions Section */}
      {(approvedSubmissions.length > 0 || rejectedSubmissions.length > 0) && (
        <article className="overflow-hidden rounded-3xl border border-slate-800 bg-slate-900/60">
          <header className="border-b border-slate-800/60 bg-slate-900/80 px-6 py-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-white">
                  Reviewed Submissions
                </h3>
                <p className="text-xs text-slate-400">
                  Previously approved or rejected submissions
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
                    Submitted By
                  </th>
                  <th scope="col" className="whitespace-nowrap px-6 py-3 text-left">
                    Company
                  </th>
                  <th scope="col" className="whitespace-nowrap px-6 py-3 text-left">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 text-slate-200">
                {[...approvedSubmissions, ...rejectedSubmissions].map(
                  (submission) => (
                    <tr
                      key={submission.caseId}
                      className="cursor-pointer hover:bg-slate-900/50"
                      onClick={() => setSelectedSubmission(submission)}
                    >
                      <td className="whitespace-nowrap px-6 py-3 font-medium text-white">
                        {submission.caseId}
                      </td>
                      <td className="px-6 py-3">
                        <div className="font-semibold text-white">
                          {submission.name}
                        </div>
                        <div className="text-xs text-slate-400">
                          {submission.idNumber} • {submission.documentBatch}
                        </div>
                      </td>
                      <td className="whitespace-nowrap px-6 py-3">
                        <span className="rounded-full bg-blue-500/20 px-3 py-1 text-xs font-semibold text-blue-300">
                          {submission.submittedBy}
                        </span>
                      </td>
                      <td className="whitespace-nowrap px-6 py-3 text-slate-300">
                        {submission.company}
                      </td>
                      <td className="whitespace-nowrap px-6 py-3">
                        <span
                          className={`rounded-full px-3 py-1 text-xs font-semibold ${
                            submission.status === "approved"
                              ? "bg-emerald-500/20 text-emerald-300"
                              : "bg-rose-500/20 text-rose-300"
                          }`}
                        >
                          {submission.status === "approved"
                            ? "Approved"
                            : "Rejected"}
                        </span>
                      </td>
                    </tr>
                  ),
                )}
              </tbody>
            </table>
          </div>
        </article>
      )}

      {/* Submission Detail Modal */}
      {selectedSubmission && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
          onClick={() => {
            setSelectedSubmission(null);
            closeRejectModal();
          }}
        >
          <div
            className="w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-3xl border border-slate-800 bg-slate-900 p-6 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h3 className="text-xl font-semibold text-white">
                  Submission Details
                </h3>
                <p className="mt-1 text-sm text-slate-400">
                  {selectedSubmission.name} • {selectedSubmission.caseId}
                </p>
              </div>
              <button
                onClick={() => {
                  setSelectedSubmission(null);
                  closeRejectModal();
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
                      {selectedSubmission.idNumber}
                    </p>
                  </div>
                  <div>
                    <p className="text-slate-400">Company</p>
                    <p className="text-white">{selectedSubmission.company}</p>
                  </div>
                  <div>
                    <p className="text-slate-400">Document Batch</p>
                    <p className="text-white">
                      {selectedSubmission.documentBatch}
                    </p>
                  </div>
                  <div>
                    <p className="text-slate-400">Submitted By</p>
                    <p className="text-white">
                      {selectedSubmission.submittedBy}
                    </p>
                  </div>
                  <div>
                    <p className="text-slate-400">Submitted At</p>
                    <p className="text-white">
                      {selectedSubmission.submittedAt}
                    </p>
                  </div>
                  <div>
                    <p className="text-slate-400">Status</p>
                    <span
                      className={`inline-block rounded-full px-3 py-1 text-xs font-semibold ${
                        selectedSubmission.status === "pending_review"
                          ? "bg-yellow-500/20 text-yellow-300"
                          : selectedSubmission.status === "approved"
                            ? "bg-emerald-500/20 text-emerald-300"
                            : "bg-rose-500/20 text-rose-300"
                      }`}
                    >
                      {selectedSubmission.status === "pending_review"
                        ? "Pending Review"
                        : selectedSubmission.status === "approved"
                          ? "Approved"
                          : "Rejected"}
                    </span>
                  </div>
                  {selectedSubmission.isDeceased && (
                    <div>
                      <p className="text-slate-400">Deceased</p>
                      <p className="text-white">Yes</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Documents */}
              <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4">
                <p className="mb-4 text-xs uppercase tracking-wide text-slate-400">
                  Submitted Documents ({selectedSubmission.documents.length})
                </p>
                <div className="space-y-3">
                  {selectedSubmission.documents.map((doc, index) => (
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
                          onClick={() => {
                            // In a real app, this would open the document
                            alert(`Opening ${doc.fileName}`);
                          }}
                        >
                          View
                        </button>
                        <button
                          type="button"
                          className="rounded-xl border border-slate-700 bg-slate-800 px-3 py-1.5 text-xs font-semibold text-white transition hover:border-slate-500"
                          onClick={() => {
                            // In a real app, this would upload/replace the document
                            alert(`Upload new ${getDocumentTypeLabel(doc.type)}`);
                          }}
                        >
                          Upload
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
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Rejection Reason (if rejected) */}
              {selectedSubmission.status === "rejected" &&
                selectedSubmission.rejectionReason && (
                  <div className="rounded-2xl border border-rose-800/60 bg-rose-900/20 p-4">
                    <p className="mb-2 text-xs uppercase tracking-wide text-rose-400">
                      Rejection Reason
                    </p>
                    <p className="text-sm text-rose-200">
                      {selectedSubmission.rejectionReason}
                    </p>
                  </div>
                )}

              {/* Action Buttons (only for pending reviews) */}
              {selectedSubmission.status === "pending_review" && (
                <div className="flex gap-3 border-t border-slate-800 pt-4">
                  <button
                    type="button"
                    onClick={() => handleApprove(selectedSubmission.caseId)}
                    className="flex-1 rounded-xl bg-emerald-500 px-4 py-3 text-sm font-semibold text-white transition hover:bg-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-400/50"
                  >
                    Approve Submission
                  </button>
                  <button
                    type="button"
                    onClick={openRejectModal}
                    className="flex-1 rounded-xl bg-rose-500 px-4 py-3 text-sm font-semibold text-white transition hover:bg-rose-400 focus:outline-none focus:ring-2 focus:ring-rose-400/50"
                  >
                    Reject & Reassign
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Rejection Reason Modal */}
      {showRejectModal && selectedSubmission && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/70 p-4"
          onClick={closeRejectModal}
        >
          <div
            className="w-full max-w-md rounded-3xl border border-slate-800 bg-slate-900 p-6 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="mb-4 text-lg font-semibold text-white">
              Reject Submission
            </h3>
            <p className="mb-4 text-sm text-slate-300">
              Please provide a reason for rejecting this submission. The case
              will be reassigned back to{" "}
              <span className="font-semibold text-white">
                {selectedSubmission.submittedBy}
              </span>
              .
            </p>
            <textarea
              value={rejectionReason}
              onChange={(e) => setRejectionReason(e.target.value)}
              placeholder="Enter reason for rejection..."
              className="mb-4 w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-sm text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-rose-400/50"
              rows={4}
            />
            <div className="flex gap-3">
              <button
                type="button"
                onClick={closeRejectModal}
                className="flex-1 rounded-xl border border-slate-700 bg-slate-800 px-4 py-2 text-sm font-semibold text-white transition hover:border-slate-500"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => handleReject(selectedSubmission.caseId)}
                disabled={!rejectionReason.trim()}
                className="flex-1 rounded-xl bg-rose-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-rose-400 focus:outline-none focus:ring-2 focus:ring-rose-400/50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Confirm Rejection
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
