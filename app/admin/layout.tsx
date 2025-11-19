import type { ReactNode } from "react";
import Link from "next/link";

const adminNav = [
  { href: "/admin/dashboard", label: "Dashboard" },
  { href: "/admin/assign-cases", label: "Assign cases" },
  { href: "/admin/untrackable", label: "Untrackable" },
  { href: "/admin/dead-case-call-team", label: "Dead case from CallTeam" },
  {
    href: "/admin/review-successful-submissions",
    label: "Review successful submissions",
  },
  { href: "/admin/successful-cases", label: "Successful cases" },
  { href: "/admin/reports", label: "Reports" },
];

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-50">
      <div className="mx-auto w-full max-w-7xl space-y-8 px-6 py-12">
        <header className="rounded-3xl border border-slate-800 bg-slate-900/30 p-8 shadow-[0_25px_50px_-12px_rgba(15,23,42,0.35)]">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="space-y-2">
              <p className="text-xs font-semibold uppercase tracking-[0.35em] text-emerald-400">
                Admin Suite
              </p>
              <div>
                <h1 className="text-3xl font-semibold tracking-tight text-white">
                  <Link
                    href="/admin/dashboard"
                    className="inline-block rounded-xl px-1 py-0.5 transition hover:text-emerald-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-400/80"
                  >
                    Tracker & Tracing
                  </Link>
                </h1>
                <p className="text-sm text-slate-400">
                  Navigate the operational dashboards and manage escalations.
                </p>
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <nav className="flex flex-wrap gap-2">
                {adminNav.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="rounded-2xl border border-slate-800/60 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-slate-200 transition hover:border-emerald-400/60 hover:bg-slate-800/60 hover:text-emerald-300"
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>
              <Link
                href="/"
                className="rounded-2xl border border-rose-600/60 bg-rose-600/20 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-rose-300 transition hover:border-rose-500/60 hover:bg-rose-600/30 hover:text-rose-200"
              >
                Logout
              </Link>
            </div>
          </div>
        </header>

        <main className="space-y-8 rounded-3xl border border-slate-800 bg-slate-900/20 p-10 shadow-[0_35px_65px_-25px_rgba(15,23,42,0.55)]">
          {children}
        </main>
      </div>
    </div>
  );
}

