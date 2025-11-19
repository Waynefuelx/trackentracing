"use client";

import { useState, useRef, useEffect, Suspense } from "react";
import { useParams, useSearchParams } from "next/navigation";

type UploadedDocument = {
  id: string;
  documentType: string;
  file: File;
  uploadedAt: string;
};

const DOCUMENT_TYPES = [
  "--",
  "Affidavit",
  "Alexander Forbes Documents",
  "Bank Statement",
  "Birth Certificate",
  "Claim Document",
  "Death Certificate",
  "GPAA Document Pack",
  "Guardianship Letter",
  "ID Document",
  "Letter of Authority",
  "Marriage Certificate",
  "Signature Specimen",
  "Tax Certificate",
  "Value Letter",
  "Z102",
  "Z300",
];

function CustomerUploadContent() {
  const params = useParams();
  const searchParams = useSearchParams();
  const uploadId = params.id as string;

  const [customerInfo, setCustomerInfo] = useState({
    name: "",
    idNumber: "",
    caseId: "",
    company: "",
  });

  const [uploadedDocuments, setUploadedDocuments] = useState<UploadedDocument[]>(
    [],
  );
  const [selectedDocumentType, setSelectedDocumentType] = useState<string>("--");
  const [documentFile, setDocumentFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Extract customer info from URL query parameters
    const name = searchParams.get("name") || "";
    const idNumber = searchParams.get("id") || "";
    const caseId = searchParams.get("caseId") || "";
    const company = searchParams.get("company") || "";

    setCustomerInfo({
      name: decodeURIComponent(name),
      idNumber: decodeURIComponent(idNumber),
      caseId: decodeURIComponent(caseId),
      company: decodeURIComponent(company),
    });
  }, [searchParams]);

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      setDocumentFile(files[0]);
    }
  };

  const handleUploadDocument = () => {
    if (!documentFile || selectedDocumentType === "--") {
      alert("Please select a document type and choose a file");
      return;
    }

    const newDocument: UploadedDocument = {
      id: Date.now().toString(),
      documentType: selectedDocumentType,
      file: documentFile,
      uploadedAt: new Date().toISOString(),
    };

    setUploadedDocuments((prev) => [...prev, newDocument]);
    setSelectedDocumentType("--");
    setDocumentFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleRemoveDocument = (documentId: string) => {
    setUploadedDocuments((prev) =>
      prev.filter((doc) => doc.id !== documentId),
    );
  };

  const handleSubmit = async () => {
    if (uploadedDocuments.length === 0) {
      alert("Please upload at least one document");
      return;
    }

    setIsSubmitting(true);

    // Here you would typically send the documents to your backend API
    console.log("Submitting documents:", {
      uploadId,
      documents: uploadedDocuments,
    });

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-900 p-4">
        <div className="w-full max-w-2xl rounded-3xl border border-slate-800 bg-slate-900/60 p-8 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/20">
            <svg
              className="h-8 w-8 text-emerald-400"
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
          <h1 className="mb-2 text-2xl font-semibold text-white">
            Documents Submitted Successfully
          </h1>
          <p className="mb-6 text-slate-400">
            Thank you for submitting your documents. We have received{" "}
            {uploadedDocuments.length} document
            {uploadedDocuments.length > 1 ? "s" : ""}.
          </p>
          <p className="text-sm text-slate-500">
            You can close this page now.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900 p-4">
      <div className="mx-auto max-w-4xl">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="mb-2 text-3xl font-semibold text-white">
            Document Upload Portal
          </h1>
          <p className="text-slate-400">
            Please upload the required documents using the form below
          </p>
        </div>

        {/* Customer Information */}
        {customerInfo.name && (
          <div className="mb-6 rounded-2xl border border-slate-800 bg-slate-900/60 p-6">
            <h2 className="mb-4 text-lg font-semibold text-white">
              Your Information
            </h2>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                  Full Name
                </p>
                <p className="mt-1 text-sm font-semibold text-white">
                  {customerInfo.name}
                </p>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                  ID Number
                </p>
                <p className="mt-1 font-mono text-sm text-white">
                  {customerInfo.idNumber}
                </p>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                  Case ID
                </p>
                <p className="mt-1 text-sm font-semibold text-white">
                  {customerInfo.caseId}
                </p>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                  Company
                </p>
                <p className="mt-1 text-sm text-white">
                  {customerInfo.company}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Upload Form */}
        <div className="rounded-3xl border border-slate-800 bg-slate-900/60 p-6">
          <div className="mb-6">
            <h2 className="mb-4 text-lg font-semibold text-white">
              Upload Documents
            </h2>

            {/* Document Type Selection and File Upload */}
            <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-300">
                  Document Type
                </label>
                <select
                  value={selectedDocumentType}
                  onChange={(e) => setSelectedDocumentType(e.target.value)}
                  className="w-full rounded-lg border border-slate-700 bg-slate-900/80 px-4 py-3 text-sm text-white focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                >
                  {DOCUMENT_TYPES.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-300">
                  Select File
                </label>
                <input
                  ref={fileInputRef}
                  type="file"
                  onChange={handleFileInput}
                  className="w-full rounded-lg border border-slate-700 bg-slate-900/80 px-4 py-3 text-sm text-white file:mr-4 file:rounded-lg file:border-0 file:bg-blue-500 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white file:hover:bg-blue-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                />
              </div>
            </div>

            {/* Upload Button */}
            <div className="mb-6">
              <button
                onClick={handleUploadDocument}
                disabled={!documentFile || selectedDocumentType === "--"}
                className="rounded-lg bg-blue-500 px-6 py-3 text-sm font-semibold text-white transition hover:bg-blue-400 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
              >
                Add Document
              </button>
            </div>
          </div>

          {/* Uploaded Documents List */}
          {uploadedDocuments.length > 0 && (
            <div className="mb-6 space-y-3">
              <h3 className="text-sm font-semibold text-slate-300">
                Uploaded Documents ({uploadedDocuments.length})
              </h3>
              <div className="space-y-2">
                {uploadedDocuments.map((doc) => (
                  <div
                    key={doc.id}
                    className="flex items-center justify-between rounded-lg border border-slate-700 bg-slate-900/80 px-4 py-3"
                  >
                    <div className="flex items-center gap-3">
                      <svg
                        className="h-5 w-5 text-slate-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                        />
                      </svg>
                      <div>
                        <p className="text-sm font-semibold text-white">
                          {doc.documentType}
                        </p>
                        <p className="text-xs text-slate-400">
                          {doc.file.name} •{" "}
                          {(doc.file.size / 1024).toFixed(2)} KB
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => handleRemoveDocument(doc.id)}
                      className="rounded-lg bg-rose-500/20 px-3 py-1.5 text-xs font-semibold text-rose-300 transition hover:bg-rose-500/30"
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Submit Button */}
          {uploadedDocuments.length > 0 && (
            <div className="border-t border-slate-800 pt-6">
              <button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="w-full rounded-lg bg-emerald-500 px-6 py-3 text-sm font-semibold text-white transition hover:bg-emerald-400 disabled:cursor-not-allowed disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
              >
                {isSubmitting ? "Submitting..." : "Submit Documents"}
              </button>
            </div>
          )}

          {uploadedDocuments.length === 0 && (
            <div className="rounded-lg border border-slate-800 bg-slate-900/40 p-4 text-center">
              <p className="text-sm text-slate-400">
                No documents uploaded yet. Please select a document type and
                upload a file above.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function CustomerUploadPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-slate-900">
          <div className="text-white">Loading...</div>
        </div>
      }
    >
      <CustomerUploadContent />
    </Suspense>
  );
}

