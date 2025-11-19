"use client";

import type { ChangeEvent, FormEvent } from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";

type Role = "tracker" | "admin";

type DemoAccount = {
  label: string;
  description: string;
  email: string;
  password: string;
  role: Role;
};

const demoAccounts: DemoAccount[] = [
  {
    label: "Tracker Desk",
    description: "Front-line caller handling daily outreach logs.",
    email: "tracker.desk@tracehq.local",
    password: "CallTeam#2024",
    role: "tracker",
  },
  {
    label: "Admin Suite",
    description: "Owner family dashboard with escalation controls.",
    email: "admin.suite@tracehq.local",
    password: "LeadAdmin#2024",
    role: "admin",
  },
];

export default function Home() {
  const router = useRouter();
  const [form, setForm] = useState({
    email: "",
    password: "",
    role: "tracker" as Role,
  });
  const [error, setError] = useState<string | null>(null);

  const handleDemoSelect = (account: DemoAccount) => {
    setForm({
      email: account.email,
      password: account.password,
      role: account.role,
    });
  };

  const handleChange =
    (field: "email" | "password") =>
    (event: ChangeEvent<HTMLInputElement>) => {
      setForm((prev) => ({ ...prev, [field]: event.target.value }));
    };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);

    const account = demoAccounts.find(
      (demo) => demo.email === form.email && demo.password === form.password,
    );

    if (!account) {
      setError("Invalid credentials. Double-check the demo email and password.");
      return;
    }

    if (account.role === "admin") {
      router.push("/admin");
      return;
    }

    if (account.role === "tracker") {
      router.push("/tracker-desk");
      return;
    }

    setError("Invalid role. Please try again.");
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-100 px-6 py-16 text-zinc-900">
      <main className="w-full max-w-xl rounded-3xl border border-zinc-200 bg-white px-10 py-12 shadow-2xl shadow-zinc-200/70">
        <header className="space-y-3">
          <p className="text-sm font-medium uppercase tracking-[0.3em] text-emerald-600">
            Tracker & Tracing
          </p>
          <h1 className="text-3xl font-semibold tracking-tight">
            Welcome back
          </h1>
          <p className="text-sm leading-relaxed text-zinc-600">
            Sign in to coordinate tracing calls, review case updates, and keep
            the community informed in real time.
          </p>
        </header>

        <section className="mt-8 space-y-3 rounded-2xl border border-emerald-100 bg-emerald-50/80 px-5 py-4">
          <h2 className="text-xs font-semibold uppercase tracking-[0.25em] text-emerald-700">
            Try the demo
          </h2>
          <p className="text-xs text-emerald-800">
            Pick a profile to auto-fill credentials and explore each workflow.
          </p>
          <div className="grid gap-3 sm:grid-cols-2">
            {demoAccounts.map((account) => {
              const isActive = form.email === account.email;
              return (
                <button
                  key={account.email}
                  type="button"
                  onClick={() => handleDemoSelect(account)}
                  className={`rounded-xl border px-4 py-3 text-left text-sm transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-500 ${
                    isActive
                      ? "border-emerald-500 bg-white text-emerald-700 shadow-sm"
                      : "border-emerald-200/60 bg-white/80 text-emerald-900 hover:border-emerald-400 hover:bg-white"
                  }`}
                >
                  <span className="block font-semibold">{account.label}</span>
                  <span className="mt-1 block text-xs text-emerald-800/80">
                    {account.description}
                  </span>
                  <span className="mt-3 block text-[11px] font-mono text-emerald-700/90">
                    {account.email}
                  </span>
                </button>
              );
            })}
          </div>
        </section>

        <form
          className="mt-10 space-y-8"
          method="post"
          action="#"
          noValidate
          onSubmit={handleSubmit}
        >
          <div className="space-y-2">
            <label
              htmlFor="email"
              className="text-sm font-medium text-zinc-700"
            >
              Work email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="alex@tracingteam.org"
              value={form.email}
              onChange={handleChange("email")}
              required
              className="block w-full rounded-xl border border-zinc-200 bg-white px-4 py-3 text-base text-zinc-900 outline-none transition focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100"
            />
          </div>

          <div className="space-y-2">
            <label
              htmlFor="password"
              className="text-sm font-medium text-zinc-700"
            >
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              placeholder="Enter your password"
              value={form.password}
              onChange={handleChange("password")}
              required
              className="block w-full rounded-xl border border-zinc-200 bg-white px-4 py-3 text-base text-zinc-900 outline-none transition focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100"
            />
          </div>

          <button
            type="submit"
            className="flex w-full items-center justify-center gap-2 rounded-2xl bg-emerald-600 px-6 py-3 text-sm font-semibold uppercase tracking-[0.2em] text-white transition hover:bg-emerald-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-500"
          >
            Sign in
          </button>

          {error ? (
            <p className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {error}
            </p>
          ) : null}
        </form>

        <footer className="mt-12 space-y-2">
          <p className="text-xs text-zinc-500">
            Need an account? Ask the admin team to invite you.
          </p>
          <p className="text-xs text-zinc-500">
            By signing in you agree to the community privacy policy and
            acknowledge all call notes remain confidential.
          </p>
        </footer>
      </main>
    </div>
  );
}
