import Image from "next/image";
import Link from "next/link";
import { ThemeToggle } from "@/components/theme-toggle";

function GitHubIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="currentColor">
      <path d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.68c-2.78.61-3.37-1.18-3.37-1.18-.45-1.15-1.11-1.45-1.11-1.45-.9-.62.07-.61.07-.61 1 .07 1.53 1.03 1.53 1.03.89 1.52 2.33 1.08 2.9.83.09-.65.35-1.08.63-1.32-2.22-.25-4.55-1.11-4.55-4.95 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.64 0 0 .84-.27 2.75 1.02a9.6 9.6 0 0 1 5 0c1.91-1.29 2.75-1.02 2.75-1.02.55 1.37.2 2.39.1 2.64.64.7 1.03 1.59 1.03 2.68 0 3.85-2.33 4.7-4.56 4.95.36.31.68.93.68 1.87v2.77c0 .27.18.58.69.48A10 10 0 0 0 12 2Z" />
    </svg>
  );
}

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
    <div className="min-h-screen">
      <header className="sticky top-0 z-50 border-b border-[var(--border)] bg-[var(--header-bg)]">
        <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4 md:px-8">
          <div className="flex items-center gap-6">
            <Link href="/" className="flex items-center gap-2">
              <Image src="/logo.png" alt="go-eval logo" width={28} height={28} className="rounded" />
              <span className="go-logo text-lg font-bold">go-eval</span>
              <span className="text-xs text-[var(--muted)]">Docs</span>
            </Link>
            <nav className="hidden md:flex items-center gap-1 text-sm">
              <Link href="/" className="px-3 py-2 text-[var(--secondary)] hover:text-[var(--foreground)]">
                Home
              </Link>
              <Link href="/docs/getting-started" className="px-3 py-2 text-[var(--foreground)] font-medium">
                Docs
              </Link>
            </nav>
          </div>
          <div className="flex items-center gap-3">
            <a
              href="https://join.slack.com/t/goeval/shared_invite/zt-3vz9qlmpw-uBiyB_oZOFsjntlbP7l0EQ"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm text-[var(--secondary)] hover:text-[var(--foreground)]"
            >
              <Image src="/slack.svg" alt="Slack" width={20} height={20} className="h-5 w-5" />
              <span className="hidden sm:inline">Slack</span>
            </a>
            <a
              href="https://github.com/igcodinap/go-eval"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm text-[var(--secondary)] hover:text-[var(--foreground)]"
            >
              <GitHubIcon className="h-5 w-5" />
              <span className="hidden sm:inline">GitHub</span>
            </a>
            <ThemeToggle />
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <div className="flex gap-8 py-8">
          <aside className="hidden w-48 shrink-0 lg:block">
            <nav className="sticky top-20 text-sm">
              {navGroups.map((group) => (
                <div key={group.title} className="mb-6">
                  <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-[var(--muted)]">
                    {group.title}
                  </p>
                  <ul className="space-y-1">
                    {group.items.map((item) => (
                      <li key={item.href}>
                        <Link
                          href={item.href}
                          className="block py-1 text-[var(--secondary)] hover:text-[var(--foreground)]"
                        >
                          {item.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </nav>
          </aside>

          <main className="min-w-0 flex-1 max-w-3xl">
            {children}
          </main>
        </div>
      </div>

      <footer className="border-t border-[var(--border)] bg-[var(--surface)]">
        <div className="mx-auto max-w-7xl px-4 py-6 md:px-8">
          <p className="text-sm text-[var(--muted)]">
            go-eval v0.2 — MIT License —{" "}
            <a href="https://github.com/igcodinap/go-eval" className="text-[var(--accent)]">
              github.com/igcodinap/go-eval
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
}