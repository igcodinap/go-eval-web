"use client";

import Link from "next/link";
import { useState } from "react";

export default function AgentSkillsPage() {
  const [currentVersion, setCurrentVersion] = useState("v0.3");

  return (
    <article>
      <div className="mb-6 text-sm text-[var(--muted)]">
        <Link href="/" className="hover:text-[var(--foreground)]">Home</Link>
        <span className="mx-2">/</span>
        <span className="text-[var(--foreground)]">Agent Skills</span>
      </div>

      <div className="flex items-center justify-between mb-4">
        <h1 className="text-4xl font-bold">Agent Skills</h1>
        <select
          value={currentVersion}
          onChange={(e) => setCurrentVersion(e.target.value)}
          className="text-xs bg-[var(--surface)] border border-[var(--border)] rounded px-1.5 py-0.5 text-[var(--muted)] cursor-pointer"
        >
          <option value="v0.2">v0.2</option>
          <option value="v0.3">v0.3</option>
        </select>
      </div>

      {currentVersion === "v0.3" ? (
        <div className="space-y-8">
          <p className="text-lg text-[var(--secondary)] leading-relaxed">
            Guides for coding agents that need to author, run, or review go-eval suites.
          </p>

          <div className="grid gap-6 md:grid-cols-2">
            <div className="border border-[var(--border)] rounded-md overflow-hidden">
              <div className="px-4 py-3 bg-[var(--surface)] border-b border-[var(--border)]">
                <h2 className="font-semibold">Authoring go-eval Suites</h2>
              </div>
              <div className="p-4">
                <p className="text-sm text-[var(--secondary)] mb-4">
                  Design, implement, and maintain evaluation suites for go-eval. Covers metric selection, case design, and CI integration.
                </p>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2 text-[var(--muted)]">
                    <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent)]" />
                    <span>Metric selection strategy</span>
                  </div>
                  <div className="flex items-center gap-2 text-[var(--muted)]">
                    <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent)]" />
                    <span>Case design patterns</span>
                  </div>
                  <div className="flex items-center gap-2 text-[var(--muted)]">
                    <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent)]" />
                    <span>Precheck composition</span>
                  </div>
                  <div className="flex items-center gap-2 text-[var(--muted)]">
                    <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent)]" />
                    <span>CI pipeline integration</span>
                  </div>
                </div>
                <div className="mt-4 p-3 bg-[var(--code-bg)] rounded text-xs font-mono">
                  <p className="text-[var(--muted)]">Canonical source:</p>
                  <code className="text-[var(--accent)]">docs/agent-skills/authoring-go-eval-suites/</code>
                </div>
              </div>
            </div>

            <div className="border border-[var(--border)] rounded-md overflow-hidden">
              <div className="px-4 py-3 bg-[var(--surface)] border-b border-[var(--border)]">
                <h2 className="font-semibold">Claude Code /eval Command</h2>
              </div>
              <div className="p-4">
                <p className="text-sm text-[var(--secondary)] mb-4">
                  Thin adapter for Claude Code that infers design, run, or review mode from repo state and uses the canonical skill report template.
                </p>
                <div className="bg-[var(--code-bg)] rounded p-2 text-xs font-mono">
                  <code>.claude/commands/eval.md</code>
                </div>
                <p className="mt-3 text-xs text-[var(--muted)]">
                  Points to the canonical skill at <code className="bg-[var(--code-bg)] px-1 py-0.5 rounded">docs/agent-skills/authoring-go-eval-suites/</code>
                </p>
              </div>
            </div>
          </div>

          <section className="p-4 border border-[var(--border)] rounded-md bg-[var(--surface)]">
            <h2 className="text-sm font-semibold text-[var(--muted)] uppercase tracking-wide mb-3">Key Patterns</h2>
            <div className="grid gap-4 md:grid-cols-3">
              <div>
                <h3 className="font-mono text-sm text-[var(--accent)] mb-2">Case Metadata</h3>
                <p className="text-xs text-[var(--secondary)]">Use consistent metadata keys: <code className="bg-[var(--code-bg)] px-1 py-0.5 rounded">flow</code>, <code className="bg-[var(--code-bg)] px-1 py-0.5 rounded">tier</code>, <code className="bg-[var(--code-bg)] px-1 py-0.5 rounded">dataset</code></p>
              </div>
              <div>
                <h3 className="font-mono text-sm text-[var(--accent)] mb-2">Precheck First</h3>
                <p className="text-xs text-[var(--secondary)]">Always gate expensive LLM metrics with fast deterministic prechecks</p>
              </div>
              <div>
                <h3 className="font-mono text-sm text-[var(--accent)] mb-2">CI-safe by Default</h3>
                <p className="text-xs text-[var(--secondary)]">Evals skip without <code className="bg-[var(--code-bg)] px-1 py-0.5 rounded">GOEVAL=1</code></p>
              </div>
            </div>
          </section>
        </div>
      ) : (
        <div className="space-y-6">
          <p className="text-lg text-[var(--secondary)] leading-relaxed">
            Agent skills for go-eval are documented in the repository&apos;s AGENTS.md file.
          </p>
          <div className="p-4 border border-[var(--border)] rounded-md bg-[var(--surface)]">
            <h2 className="font-semibold mb-3">Available in v0.2</h2>
            <ul className="space-y-2 text-sm text-[var(--secondary)]">
              <li className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent)]" />
                <code className="bg-[var(--code-bg)] px-1 py-0.5 rounded text-[var(--accent)]">AGENTS.md</code> — Repo-specific agent instructions
              </li>
              <li className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent)]" />
                <code className="bg-[var(--code-bg)] px-1 py-0.5 rounded text-[var(--accent)]">GOEVAL=1</code> — Environment variable for enabling evals
              </li>
            </ul>
          </div>
          <div className="p-4 border border-yellow-500/20 rounded-md bg-yellow-500/5">
            <p className="text-sm text-yellow-600">
              <strong>Coming in v0.3:</strong> Full agent skill documentation with metric selection strategy, case design patterns, and CI integration guides.
            </p>
          </div>
        </div>
      )}
    </article>
  );
}