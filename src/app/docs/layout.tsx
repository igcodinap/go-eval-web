import Link from "next/link";
import { AskAICard } from "@/components/ask-ai-card";
import { ThemeToggle } from "@/components/theme-toggle";

const navGroups = [
  {
    title: "Getting Started",
    items: [
      { label: "Quick Introduction", href: "/docs/getting-started" },
      { label: "Use Cases", href: "/docs/getting-started#use-cases" },
    ],
  },
  {
    title: "LLM Evals",
    items: [
      { label: "Concepts", href: "/docs/getting-started#concepts" },
      { label: "End-to-End Evals", href: "/docs/getting-started#e2e-evals" },
      { label: "Unit Testing in CI/CD", href: "/docs/getting-started#ci-cd" },
    ],
  },
  {
    title: "Eval Metrics",
    items: [
      { label: "Introduction", href: "/docs/getting-started#metrics-overview" },
      { label: "Deterministic", href: "/docs/getting-started#deterministic" },
      { label: "Compound", href: "/docs/getting-started#compound" },
    ],
  },
];

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="pb-16">
      <header className="mx-auto mt-4 flex w-full max-w-7xl items-center justify-between px-4 md:mt-6 md:px-8">
        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--surface)] px-3 py-2 text-sm font-medium text-[var(--foreground)] transition hover:border-[var(--accent)]"
        >
          <span className="inline-flex h-6 w-6 items-center justify-center rounded-md bg-[var(--accent)]/15 font-mono text-[10px] font-bold text-[var(--accent)]">
            ge
          </span>
          go-eval Docs
        </Link>
        <ThemeToggle />
      </header>

      <div className="mx-auto flex w-full max-w-7xl gap-6 px-4 pt-6 md:px-8 md:pt-8">
        <aside className="hidden w-72 shrink-0 lg:block">
          <div className="surface-card sticky top-6 rounded-2xl p-5">
            <div className="mb-5 flex items-center gap-2">
              <div className="inline-flex h-7 w-7 items-center justify-center rounded-lg bg-[var(--accent)]/15 font-mono text-xs font-bold text-[var(--accent)]">
                ge
              </div>
              <p className="text-sm font-semibold text-[var(--foreground)]">
                go-eval Docs
              </p>
            </div>

            <nav className="space-y-5">
              {navGroups.map((group) => (
                <div key={group.title}>
                  <p className="mb-2 text-xs font-semibold uppercase tracking-[0.12em] text-[var(--muted)]">
                    {group.title}
                  </p>
                  <ul className="space-y-1.5">
                    {group.items.map((item) => (
                      <li key={item.href}>
                        <Link
                          href={item.href}
                          className="block rounded-lg px-2 py-1.5 text-sm text-[var(--foreground)] transition hover:bg-[var(--surface-strong)]"
                        >
                          {item.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </nav>
          </div>
        </aside>

        <main className="min-w-0 flex-1">{children}</main>

        <div className="hidden w-72 shrink-0 xl:block">
          <div className="sticky top-6">
            <AskAICard
              pageTitle="go-eval Quick Introduction"
              pageSummary="Setup, first test run, metrics overview, CI usage, and practical evaluation workflow for Go teams."
              pageUrlPath="/docs/getting-started"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
