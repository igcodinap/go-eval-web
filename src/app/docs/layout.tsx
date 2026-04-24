import Image from "next/image";
import Link from "next/link";
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
              href="https://github.com/igcodinap/go-eval"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-[var(--secondary)] hover:text-[var(--foreground)]"
            >
              GitHub
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