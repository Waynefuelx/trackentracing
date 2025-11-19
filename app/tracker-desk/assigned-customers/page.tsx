"use client";

import { useState, useRef } from "react";

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

type UbmvData = {
  fundName: string;
  dateOfBirth: string;
  memberNr: string;
  fullName: string;
  ubmvPdf: File | null;
};

type CustomerInfo = {
  personType: string;
  title: string;
  initials: string;
  firstName: string;
  adrsObtainedFirstName: string;
  surname: string;
  adrsObtainedSurname: string;
  alternativeSurname: string;
  dateOfBirth: string;
  idNumber: string;
  adrsObtainedIdNumber: string;
  pensionNumber: string;
  preferredLanguage: string;
  email: string;
  employer: string;
  employeeNumber: string;
};

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

const CURRENT_AGENT = "Thabo Dlamini";

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

export default function AssignedCustomersPage() {
  const [cases, setCases] = useState<AgentCase[]>(createInitialCases);
  const [selectedCustomer, setSelectedCustomer] = useState<AgentCase | null>(null);
  const [ubmvData, setUbmvData] = useState<UbmvData>({
    fundName: "",
    dateOfBirth: "",
    memberNr: "",
    fullName: "",
    ubmvPdf: null,
  });
  const [customerInfo, setCustomerInfo] = useState<CustomerInfo>({
    personType: "",
    title: "",
    initials: "",
    firstName: "",
    adrsObtainedFirstName: "",
    surname: "",
    adrsObtainedSurname: "",
    alternativeSurname: "",
    dateOfBirth: "",
    idNumber: "",
    adrsObtainedIdNumber: "",
    pensionNumber: "",
    preferredLanguage: "",
    email: "",
    employer: "",
    employeeNumber: "",
  });
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploadedDocuments, setUploadedDocuments] = useState<UploadedDocument[]>([]);
  const [selectedDocumentType, setSelectedDocumentType] = useState<string>("--");
  const [documentFile, setDocumentFile] = useState<File | null>(null);
  const documentFileInputRef = useRef<HTMLInputElement>(null);
  const [documentLink, setDocumentLink] = useState<string>("");
  const [linkSent, setLinkSent] = useState(false);

  // Filter out "in_progress" and "unsuccessful" cases - they should appear on their respective pages
  const assignedCases = cases.filter(
    (c) => c.status !== "in_progress" && c.status !== "unsuccessful",
  );

  const handleCustomerClick = (customer: AgentCase) => {
    setSelectedCustomer(customer);
    // Reset form when opening a new customer
    setUbmvData({
      fundName: "",
      dateOfBirth: "",
      memberNr: "",
      fullName: "",
      ubmvPdf: null,
    });
    // Initialize customer info with existing data
    setCustomerInfo({
      personType: "",
      title: "",
      initials: "",
      firstName: "",
      adrsObtainedFirstName: "",
      surname: customer.name.split(" ")[customer.name.split(" ").length - 1] || "",
      adrsObtainedSurname: "",
      alternativeSurname: "",
      dateOfBirth: "",
      idNumber: customer.idNumber,
      adrsObtainedIdNumber: "",
      pensionNumber: "",
      preferredLanguage: "",
      email: "",
      employer: customer.company,
      employeeNumber: "",
    });
    // Reset document uploads
    setUploadedDocuments([]);
    setSelectedDocumentType("--");
    setDocumentFile(null);
    setDocumentLink("");
    setLinkSent(false);
  };

  const handleCustomerInfoChange = (field: keyof CustomerInfo, value: string) => {
    setCustomerInfo((prev) => ({ ...prev, [field]: value }));
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    const files = Array.from(e.dataTransfer.files);
    const pdfFile = files.find((file) => file.type === "application/pdf");

    if (pdfFile) {
      setUbmvData((prev) => ({ ...prev, ubmvPdf: pdfFile }));
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      if (file.type === "application/pdf") {
        setUbmvData((prev) => ({ ...prev, ubmvPdf: file }));
      }
    }
  };

  const handleInputChange = (field: keyof UbmvData, value: string) => {
    setUbmvData((prev) => ({ ...prev, [field]: value }));
  };

  const handleRemovePdf = () => {
    setUbmvData((prev) => ({ ...prev, ubmvPdf: null }));
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleDocumentFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      setDocumentFile(files[0]);
    }
  };

  const handleUploadDocument = () => {
    if (!documentFile || selectedDocumentType === "--") {
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
    if (documentFileInputRef.current) {
      documentFileInputRef.current.value = "";
    }
  };

  const handleRemoveDocument = (documentId: string) => {
    setUploadedDocuments((prev) =>
      prev.filter((doc) => doc.id !== documentId),
    );
  };

  const generateDocumentLink = () => {
    if (!selectedCustomer) return;

    // Generate a unique link for this customer
    const uniqueId = `${selectedCustomer.caseId}-${Date.now()}`;
    // Use the current origin, but ensure localhost uses http
    const origin = window.location.origin;
    // Encode customer info as query parameters
    const customerName = encodeURIComponent(selectedCustomer.name);
    const customerId = encodeURIComponent(selectedCustomer.idNumber);
    const caseId = encodeURIComponent(selectedCustomer.caseId);
    const company = encodeURIComponent(selectedCustomer.company);
    
    const baseUrl = origin.includes("localhost")
      ? origin.replace("https://", "http://")
      : origin;
    
    const link = `${baseUrl}/customer-upload/${uniqueId}?name=${customerName}&id=${customerId}&caseId=${caseId}&company=${company}`;
    setDocumentLink(link);
    return link;
  };

  const handleSendDocumentLink = () => {
    const email = customerInfo.email;
    if (!email || !email.includes("@")) {
      alert("Please enter a valid email address");
      return;
    }

    const link = documentLink || generateDocumentLink();

    // Here you would typically send an email via your backend API
    console.log("Sending document link:", {
      to: email,
      link: link,
      customer: selectedCustomer,
    });

    // Simulate email sending
    setLinkSent(true);
    alert(`Document link sent to ${email}`);
  };

  const handleCopyLink = () => {
    if (documentLink) {
      navigator.clipboard.writeText(documentLink);
      alert("Link copied to clipboard!");
    }
  };

  const handleSave = () => {
    if (!selectedCustomer) return;

    // Save the UBMV data but don't change status - case stays on Assigned Customers page
    // Here you would typically save the data to your backend
    console.log("Saving UBMV data:", {
      customer: selectedCustomer,
      ubmvData,
    });

    // Optionally update dataType to "pdf" if a PDF was uploaded
    if (ubmvData.ubmvPdf) {
      setCases((prev) =>
        prev.map((c) =>
          c.caseId === selectedCustomer.caseId
            ? {
                ...c,
                dataType: "pdf" as const,
              }
            : c,
        ),
      );
    }

    // Close modal after saving
    setSelectedCustomer(null);
  };

  const handleNoTrace = () => {
    if (!selectedCustomer) return;

    // Move case to Unsuccessful Submissions
    setCases((prev) =>
      prev.map((c) =>
        c.caseId === selectedCustomer.caseId
          ? {
              ...c,
              status: "unsuccessful" as const,
              lastContactDate: new Date().toISOString().split("T")[0],
              contactAttempts: c.contactAttempts + 1,
              notes: "No trace available",
            }
          : c,
      ),
    );

    // Close modal
    setSelectedCustomer(null);
  };

  const handleInProgressTrace = () => {
    if (!selectedCustomer) return;

    // Move case to In Progress Trace page
    setCases((prev) =>
      prev.map((c) =>
        c.caseId === selectedCustomer.caseId
          ? {
              ...c,
              status: "in_progress" as const,
              lastContactDate: new Date().toISOString().split("T")[0],
              contactAttempts: c.contactAttempts + 1,
              dataType: "pdf" as const,
            }
          : c,
      ),
    );

    // Close modal
    setSelectedCustomer(null);
  };

  return (
    <section className="space-y-6">
      <header className="space-y-2">
        <h2 className="text-2xl font-semibold tracking-tight text-white">
          All Assigned Customers ({assignedCases.length})
        </h2>
        <p className="text-sm text-slate-300">
          Complete list of all customers assigned to you (excluding in-progress cases)
        </p>
      </header>

      <article className="overflow-hidden rounded-3xl border border-slate-800 bg-slate-900/60">
        <header className="border-b border-slate-800/60 bg-slate-900/80 px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-white">
                My Customers ({assignedCases.length})
              </h3>
              <p className="text-xs text-slate-400">
                All cases assigned to {CURRENT_AGENT} (ready for processing)
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
                  Assigned Date
                </th>
                <th scope="col" className="whitespace-nowrap px-6 py-3 text-left">
                  Status
                </th>
                <th scope="col" className="whitespace-nowrap px-6 py-3 text-left">
                  Contact Attempts
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 text-slate-200">
              {assignedCases.length === 0 ? (
                <tr>
                  <td
                    colSpan={6}
                    className="px-6 py-8 text-center text-slate-400"
                  >
                    No customers assigned
                  </td>
                </tr>
              ) : (
                assignedCases.map((caseItem) => (
                  <tr
                    key={caseItem.caseId}
                    onClick={() => handleCustomerClick(caseItem)}
                    className="cursor-pointer hover:bg-slate-900/50 transition"
                  >
                    <td className="whitespace-nowrap px-6 py-3 font-medium text-white">
                      {caseItem.caseId}
                    </td>
                    <td className="px-6 py-3">
                      <div className="font-semibold text-white">
                        {caseItem.name}
                      </div>
                      <div className="text-xs text-slate-400">
                        ID: {caseItem.idNumber}
                      </div>
                    </td>
                    <td className="whitespace-nowrap px-6 py-3 text-slate-300">
                      {caseItem.company}
                    </td>
                    <td className="whitespace-nowrap px-6 py-3 text-slate-300">
                      {caseItem.assignedDate}
                    </td>
                    <td className="whitespace-nowrap px-6 py-3">
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-semibold ${
                          caseItem.status === "assigned"
                            ? "bg-blue-500/20 text-blue-300"
                            : caseItem.status === "in_progress"
                              ? "bg-yellow-500/20 text-yellow-300"
                              : caseItem.status === "unsuccessful"
                                ? "bg-rose-500/20 text-rose-300"
                                : "bg-emerald-500/20 text-emerald-300"
                        }`}
                      >
                        {caseItem.status === "assigned"
                          ? "Assigned"
                          : caseItem.status === "in_progress"
                            ? "In Progress"
                            : caseItem.status === "unsuccessful"
                              ? "Unsuccessful"
                              : "Completed"}
                      </span>
                    </td>
                    <td className="whitespace-nowrap px-6 py-3">
                      <span className="rounded-full bg-slate-800 px-3 py-1 text-xs font-semibold text-slate-300">
                        {caseItem.contactAttempts}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </article>

      {/* Customer Detail Modal */}
      {selectedCustomer && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
          onClick={() => setSelectedCustomer(null)}
        >
          <div
            className="w-full max-w-4xl rounded-3xl border border-slate-800 bg-slate-900 p-6 shadow-2xl max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h3 className="text-2xl font-semibold text-white">
                  {selectedCustomer.name}
                </h3>
                <p className="mt-1 text-sm text-slate-400">
                  {selectedCustomer.caseId} • {selectedCustomer.company}
                </p>
              </div>
              <button
                onClick={() => setSelectedCustomer(null)}
                className="rounded-xl border border-slate-700 bg-slate-800 px-4 py-2 text-sm font-semibold text-white transition hover:border-slate-500"
              >
                Close
              </button>
            </div>

            <div className="space-y-6">
              {/* Customer Info */}
              <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4">
                <p className="mb-4 text-xs uppercase tracking-wide text-slate-400">
                  Customer Information
                </p>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 text-sm">
                  <div>
                    <label className="mb-1 block text-xs font-semibold text-slate-400">
                      Person Type
                    </label>
                    <input
                      type="text"
                      value={customerInfo.personType}
                      onChange={(e) =>
                        handleCustomerInfoChange("personType", e.target.value)
                      }
                      placeholder="e.g., Main Member"
                      className="w-full rounded-lg border border-slate-700 bg-slate-900/80 px-3 py-2 text-sm text-white placeholder-slate-500 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                    />
                  </div>
                  <div>
                    <label className="mb-1 block text-xs font-semibold text-slate-400">
                      Title
                    </label>
                    <input
                      type="text"
                      value={customerInfo.title}
                      onChange={(e) =>
                        handleCustomerInfoChange("title", e.target.value)
                      }
                      placeholder="e.g., MR, MRS"
                      className="w-full rounded-lg border border-slate-700 bg-slate-900/80 px-3 py-2 text-sm text-white placeholder-slate-500 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                    />
                  </div>
                  <div>
                    <label className="mb-1 block text-xs font-semibold text-slate-400">
                      Initials
                    </label>
                    <input
                      type="text"
                      value={customerInfo.initials}
                      onChange={(e) =>
                        handleCustomerInfoChange("initials", e.target.value)
                      }
                      placeholder="e.g., SA"
                      className="w-full rounded-lg border border-slate-700 bg-slate-900/80 px-3 py-2 text-sm text-white placeholder-slate-500 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                    />
                  </div>
                  <div>
                    <label className="mb-1 block text-xs font-semibold text-slate-400">
                      First Name
                    </label>
                    <input
                      type="text"
                      value={customerInfo.firstName}
                      onChange={(e) =>
                        handleCustomerInfoChange("firstName", e.target.value)
                      }
                      placeholder="Enter first name"
                      className="w-full rounded-lg border border-slate-700 bg-slate-900/80 px-3 py-2 text-sm text-white placeholder-slate-500 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                    />
                  </div>
                  <div>
                    <label className="mb-1 block text-xs font-semibold text-slate-400">
                      ADRS Obtained First Name
                    </label>
                    <input
                      type="text"
                      value={customerInfo.adrsObtainedFirstName}
                      onChange={(e) =>
                        handleCustomerInfoChange(
                          "adrsObtainedFirstName",
                          e.target.value,
                        )
                      }
                      placeholder="ADRS obtained first name"
                      className="w-full rounded-lg border border-slate-700 bg-slate-900/80 px-3 py-2 text-sm text-white placeholder-slate-500 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                    />
                  </div>
                  <div>
                    <label className="mb-1 block text-xs font-semibold text-slate-400">
                      Surname
                    </label>
                    <input
                      type="text"
                      value={customerInfo.surname}
                      onChange={(e) =>
                        handleCustomerInfoChange("surname", e.target.value)
                      }
                      placeholder="Enter surname"
                      className="w-full rounded-lg border border-slate-700 bg-slate-900/80 px-3 py-2 text-sm text-white placeholder-slate-500 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                    />
                  </div>
                  <div>
                    <label className="mb-1 block text-xs font-semibold text-slate-400">
                      ADRS Obtained Surname
                    </label>
                    <input
                      type="text"
                      value={customerInfo.adrsObtainedSurname}
                      onChange={(e) =>
                        handleCustomerInfoChange(
                          "adrsObtainedSurname",
                          e.target.value,
                        )
                      }
                      placeholder="ADRS obtained surname"
                      className="w-full rounded-lg border border-slate-700 bg-slate-900/80 px-3 py-2 text-sm text-white placeholder-slate-500 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                    />
                  </div>
                  <div>
                    <label className="mb-1 block text-xs font-semibold text-slate-400">
                      Alternative Surname
                    </label>
                    <input
                      type="text"
                      value={customerInfo.alternativeSurname}
                      onChange={(e) =>
                        handleCustomerInfoChange(
                          "alternativeSurname",
                          e.target.value,
                        )
                      }
                      placeholder="Alternative surname"
                      className="w-full rounded-lg border border-slate-700 bg-slate-900/80 px-3 py-2 text-sm text-white placeholder-slate-500 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                    />
                  </div>
                  <div>
                    <label className="mb-1 block text-xs font-semibold text-slate-400">
                      Date of Birth
                    </label>
                    <input
                      type="date"
                      value={customerInfo.dateOfBirth}
                      onChange={(e) =>
                        handleCustomerInfoChange("dateOfBirth", e.target.value)
                      }
                      className="w-full rounded-lg border border-slate-700 bg-slate-900/80 px-3 py-2 text-sm text-white focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                    />
                  </div>
                  <div>
                    <label className="mb-1 block text-xs font-semibold text-slate-400">
                      ID Number
                    </label>
                    <input
                      type="text"
                      value={customerInfo.idNumber}
                      onChange={(e) =>
                        handleCustomerInfoChange("idNumber", e.target.value)
                      }
                      placeholder="ID number"
                      className="w-full rounded-lg border border-slate-700 bg-slate-900/80 px-3 py-2 font-mono text-sm text-white placeholder-slate-500 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                    />
                  </div>
                  <div>
                    <label className="mb-1 block text-xs font-semibold text-slate-400">
                      ADRS Obtained ID#
                    </label>
                    <input
                      type="text"
                      value={customerInfo.adrsObtainedIdNumber}
                      onChange={(e) =>
                        handleCustomerInfoChange(
                          "adrsObtainedIdNumber",
                          e.target.value,
                        )
                      }
                      placeholder="ADRS obtained ID number"
                      className="w-full rounded-lg border border-slate-700 bg-slate-900/80 px-3 py-2 font-mono text-sm text-white placeholder-slate-500 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                    />
                  </div>
                  <div>
                    <label className="mb-1 block text-xs font-semibold text-slate-400">
                      Pension#
                    </label>
                    <input
                      type="text"
                      value={customerInfo.pensionNumber}
                      onChange={(e) =>
                        handleCustomerInfoChange("pensionNumber", e.target.value)
                      }
                      placeholder="Pension number"
                      className="w-full rounded-lg border border-slate-700 bg-slate-900/80 px-3 py-2 text-sm text-white placeholder-slate-500 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                    />
                  </div>
                  <div>
                    <label className="mb-1 block text-xs font-semibold text-slate-400">
                      Preferred Language
                    </label>
                    <select
                      value={customerInfo.preferredLanguage}
                      onChange={(e) =>
                        handleCustomerInfoChange(
                          "preferredLanguage",
                          e.target.value,
                        )
                      }
                      className="w-full rounded-lg border border-slate-700 bg-slate-900/80 px-3 py-2 text-sm text-white focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                    >
                      <option value="">Select language</option>
                      <option value="en">English</option>
                      <option value="af">Afrikaans</option>
                      <option value="zu">Zulu</option>
                      <option value="xh">Xhosa</option>
                      <option value="nso">Northern Sotho</option>
                      <option value="tn">Tswana</option>
                      <option value="ve">Venda</option>
                      <option value="ts">Tsonga</option>
                      <option value="ss">Swati</option>
                      <option value="nr">Ndebele</option>
                    </select>
                  </div>
                  <div>
                    <label className="mb-1 block text-xs font-semibold text-slate-400">
                      Email
                    </label>
                    <input
                      type="email"
                      value={customerInfo.email}
                      onChange={(e) =>
                        handleCustomerInfoChange("email", e.target.value)
                      }
                      placeholder="Email address"
                      className="w-full rounded-lg border border-slate-700 bg-slate-900/80 px-3 py-2 text-sm text-white placeholder-slate-500 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                    />
                  </div>
                  <div>
                    <label className="mb-1 block text-xs font-semibold text-slate-400">
                      Employer
                    </label>
                    <input
                      type="text"
                      value={customerInfo.employer}
                      onChange={(e) =>
                        handleCustomerInfoChange("employer", e.target.value)
                      }
                      placeholder="Employer name"
                      className="w-full rounded-lg border border-slate-700 bg-slate-900/80 px-3 py-2 text-sm text-white placeholder-slate-500 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                    />
                  </div>
                  <div>
                    <label className="mb-1 block text-xs font-semibold text-slate-400">
                      Employee#
                    </label>
                    <input
                      type="text"
                      value={customerInfo.employeeNumber}
                      onChange={(e) =>
                        handleCustomerInfoChange(
                          "employeeNumber",
                          e.target.value,
                        )
                      }
                      placeholder="Employee number"
                      className="w-full rounded-lg border border-slate-700 bg-slate-900/80 px-3 py-2 text-sm text-white placeholder-slate-500 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                    />
                  </div>
                </div>
                <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-slate-400">Document Batch</p>
                    <p className="text-white">
                      {selectedCustomer.documentBatch}
                    </p>
                  </div>
                  <div>
                    <p className="text-slate-400">Assigned Date</p>
                    <p className="text-white">
                      {selectedCustomer.assignedDate}
                    </p>
                  </div>
                </div>
              </div>

              {/* PDF Upload Section */}
              <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4">
                <p className="mb-3 text-xs uppercase tracking-wide text-slate-400">
                  UBMV PDF Upload
                </p>
                <div
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  className={`relative rounded-xl border-2 border-dashed p-8 text-center transition ${
                    isDragging
                      ? "border-blue-500 bg-blue-500/10"
                      : "border-slate-700 bg-slate-900/40"
                  }`}
                >
                  {ubmvData.ubmvPdf ? (
                    <div className="space-y-3">
                      <div className="flex items-center justify-center gap-2">
                        <svg
                          className="h-8 w-8 text-red-500"
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
                        <div className="text-left">
                          <p className="font-semibold text-white">
                            {ubmvData.ubmvPdf.name}
                          </p>
                          <p className="text-xs text-slate-400">
                            {(ubmvData.ubmvPdf.size / 1024).toFixed(2)} KB
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={handleRemovePdf}
                        className="rounded-lg bg-rose-500/20 px-4 py-2 text-xs font-semibold text-rose-300 transition hover:bg-rose-500/30"
                      >
                        Remove PDF
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      <svg
                        className="mx-auto h-12 w-12 text-slate-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                        />
                      </svg>
                      <div>
                        <p className="text-sm font-semibold text-white">
                          Drag and drop UBMV PDF here
                        </p>
                        <p className="text-xs text-slate-400">
                          or click to browse
                        </p>
                      </div>
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="application/pdf"
                        onChange={handleFileInput}
                        className="hidden"
                        id="ubmv-pdf-upload"
                      />
                      <label
                        htmlFor="ubmv-pdf-upload"
                        className="inline-block cursor-pointer rounded-lg bg-blue-500/20 px-4 py-2 text-xs font-semibold text-blue-300 transition hover:bg-blue-500/30"
                      >
                        Select PDF File
                      </label>
                    </div>
                  )}
                </div>
              </div>

              {/* Send Document Link Section */}
              <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4">
                <p className="mb-4 text-xs uppercase tracking-wide text-slate-400">
                  Send Document Upload Link to Customer
                </p>

                <div className="space-y-4">
                  {/* Email Input */}
                  <div>
                    <label className="mb-2 block text-xs font-semibold text-slate-400">
                      Customer Email
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="email"
                        value={customerInfo.email}
                        onChange={(e) =>
                          handleCustomerInfoChange("email", e.target.value)
                        }
                        placeholder="Enter customer email address"
                        className="flex-1 rounded-lg border border-slate-700 bg-slate-900/80 px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                      />
                      <button
                        onClick={handleSendDocumentLink}
                        disabled={!customerInfo.email || !customerInfo.email.includes("@")}
                        className="rounded-lg bg-emerald-500 px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-400 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
                      >
                        {linkSent ? "Link Sent ✓" : "Send Link"}
                      </button>
                    </div>
                  </div>

                  {/* Generate/Copy Link */}
                  <div>
                    <label className="mb-2 block text-xs font-semibold text-slate-400">
                      Document Upload Link
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={documentLink || "Click 'Generate Link' to create a unique upload link"}
                        readOnly
                        className="flex-1 rounded-lg border border-slate-700 bg-slate-900/80 px-4 py-2.5 text-sm text-slate-300 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                      />
                      {!documentLink ? (
                        <button
                          onClick={generateDocumentLink}
                          className="rounded-lg bg-blue-500 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                        >
                          Generate Link
                        </button>
                      ) : (
                        <button
                          onClick={handleCopyLink}
                          className="rounded-lg bg-slate-700 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-600 focus:outline-none focus:ring-2 focus:ring-slate-500/50"
                        >
                          Copy Link
                        </button>
                      )}
                    </div>
                    {documentLink && (
                      <p className="mt-2 text-xs text-slate-400">
                        Share this link with the customer to allow them to upload documents
                      </p>
                    )}
                  </div>

                  {/* Link Status */}
                  {linkSent && (
                    <div className="rounded-lg border border-emerald-500/30 bg-emerald-500/10 px-4 py-3">
                      <div className="flex items-center gap-2">
                        <svg
                          className="h-5 w-5 text-emerald-400"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                        <p className="text-sm font-semibold text-emerald-300">
                          Document upload link sent to {customerInfo.email}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Document Upload Section */}
              <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4">
                <p className="mb-4 text-xs uppercase tracking-wide text-slate-400">
                  Document Upload
                </p>

                {/* Document Type Selection and File Upload */}
                <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-xs font-semibold text-slate-400">
                      Document Type
                    </label>
                    <select
                      value={selectedDocumentType}
                      onChange={(e) => setSelectedDocumentType(e.target.value)}
                      className="w-full rounded-lg border border-slate-700 bg-slate-900/80 px-3 py-2.5 text-sm text-white focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                    >
                      {DOCUMENT_TYPES.map((type) => (
                        <option key={type} value={type}>
                          {type}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="mb-2 block text-xs font-semibold text-slate-400">
                      Select File
                    </label>
                    <input
                      ref={documentFileInputRef}
                      type="file"
                      onChange={handleDocumentFileInput}
                      className="w-full rounded-lg border border-slate-700 bg-slate-900/80 px-3 py-2.5 text-sm text-white file:mr-4 file:rounded-lg file:border-0 file:bg-blue-500 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white file:hover:bg-blue-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                    />
                  </div>
                </div>

                {/* Upload Button */}
                <div className="mb-4">
                  <button
                    onClick={handleUploadDocument}
                    disabled={!documentFile || selectedDocumentType === "--"}
                    className="rounded-lg bg-blue-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-400 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                  >
                    Upload Document
                  </button>
                </div>

                {/* Uploaded Documents List */}
                {uploadedDocuments.length > 0 && (
                  <div className="space-y-2">
                    <p className="text-xs font-semibold text-slate-400">
                      Uploaded Documents ({uploadedDocuments.length})
                    </p>
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
              </div>

              {/* Data Input Fields */}
              <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4">
                <p className="mb-4 text-xs uppercase tracking-wide text-slate-400">
                  UBMV Data Entry
                </p>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-xs font-semibold text-slate-400">
                      Fund Name
                    </label>
                    <input
                      type="text"
                      value={ubmvData.fundName}
                      onChange={(e) =>
                        handleInputChange("fundName", e.target.value)
                      }
                      placeholder="Enter fund name from PDF"
                      className="w-full rounded-lg border border-slate-700 bg-slate-900/80 px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                    />
                  </div>
                  <div>
                    <label className="mb-2 block text-xs font-semibold text-slate-400">
                      Date of Birth
                    </label>
                    <input
                      type="date"
                      value={ubmvData.dateOfBirth}
                      onChange={(e) =>
                        handleInputChange("dateOfBirth", e.target.value)
                      }
                      className="w-full rounded-lg border border-slate-700 bg-slate-900/80 px-4 py-2.5 text-sm text-white focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                    />
                  </div>
                  <div>
                    <label className="mb-2 block text-xs font-semibold text-slate-400">
                      Member Number
                    </label>
                    <input
                      type="text"
                      value={ubmvData.memberNr}
                      onChange={(e) =>
                        handleInputChange("memberNr", e.target.value)
                      }
                      placeholder="Enter member number from PDF"
                      className="w-full rounded-lg border border-slate-700 bg-slate-900/80 px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                    />
                  </div>
                  <div>
                    <label className="mb-2 block text-xs font-semibold text-slate-400">
                      Full Name
                    </label>
                    <input
                      type="text"
                      value={ubmvData.fullName}
                      onChange={(e) =>
                        handleInputChange("fullName", e.target.value)
                      }
                      placeholder="Enter full name from PDF"
                      className="w-full rounded-lg border border-slate-700 bg-slate-900/80 px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                    />
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end gap-3">
                <button
                  onClick={handleSave}
                  className="rounded-xl bg-blue-500 px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                >
                  Save UBMV Data
                </button>
                <button
                  onClick={() => setSelectedCustomer(null)}
                  className="rounded-xl border border-slate-700 bg-slate-800 px-6 py-2.5 text-sm font-semibold text-white transition hover:border-slate-500"
                >
                  Close
                </button>
                <button
                  onClick={handleNoTrace}
                  className="rounded-xl border border-rose-600/60 bg-rose-600/20 px-6 py-2.5 text-sm font-semibold text-rose-300 transition hover:bg-rose-600/30 focus:outline-none focus:ring-2 focus:ring-rose-400/50"
                >
                  No Trace
                </button>
                <button
                  onClick={handleInProgressTrace}
                  className="rounded-xl border border-yellow-600/60 bg-yellow-600/20 px-6 py-2.5 text-sm font-semibold text-yellow-300 transition hover:bg-yellow-600/30 focus:outline-none focus:ring-2 focus:ring-yellow-400/50"
                >
                  In Progress Trace
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

