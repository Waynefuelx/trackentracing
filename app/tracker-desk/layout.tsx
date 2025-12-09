import type { ReactNode } from "react";
import Link from "next/link";

export default function TrackerDeskLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-50">
      <div className="mx-auto w-full max-w-7xl space-y-8 px-6 py-12">
        <header className="rounded-3xl border border-slate-800 bg-slate-900/30 p-8 shadow-[0_25px_50px_-12px_rgba(15,23,42,0.35)]">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="space-y-2">
              <p className="text-xs font-semibold uppercase tracking-[0.35em] text-blue-400">
                Tracker Desk
              </p>
              <div>
                <h1 className="text-3xl font-semibold tracking-tight text-white">
                  <Link
                    href="/tracker-desk"
                    className="inline-block rounded-xl px-1 py-0.5 transition hover:text-blue-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-400/80"
                  >
                    Tracker & Tracing
                  </Link>
                </h1>
                <p className="text-sm text-slate-400">
                  Navigate your assigned cases and manage customer traces.
                </p>
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <nav className="flex flex-wrap gap-2">
                <Link
                  href="/tracker-desk/assigned-customers"
                  className="rounded-2xl border border-slate-800/60 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-slate-200 transition hover:border-blue-400/60 hover:bg-slate-800/60 hover:text-blue-300"
                >
                  Assigned Customers
                </Link>
                <Link
                  href="/tracker-desk/in-progress-trace"
                  className="rounded-2xl border border-slate-800/60 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-slate-200 transition hover:border-yellow-400/60 hover:bg-slate-800/60 hover:text-yellow-300"
                >
                  In Progress Trace
                </Link>
                <Link
                  href="/tracker-desk/unsuccessful-submissions"
                  className="rounded-2xl border border-slate-800/60 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-slate-200 transition hover:border-rose-400/60 hover:bg-slate-800/60 hover:text-rose-300"
                >
                  Unsuccessful Submissions
                </Link>
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



