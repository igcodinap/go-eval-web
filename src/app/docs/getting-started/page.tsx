import Link from "next/link";

const useCases = [
  "RAG response quality checks in go test",
  "Deterministic output validation for extraction workflows",
  "Prompt or model regression checks in CI pipelines",
  "Agent workflows with precheck gating before expensive scoring",
];

const principles = [
  "Keep evals inside your existing Go testing workflow.",
  "Use deterministic metrics first; call LLM judges only when necessary.",
  "Treat metric output as an engineering signal, not just a dashboard number.",
  "Keep adapters optional so core eval logic stays vendor-agnostic.",
];

const docsSections = [
  { id: "use-cases", title: "Use Cases" },
  { id: "concepts", title: "Concepts" },
  { id: "first-run", title: "Create Your First Test Run" },
  { id: "e2e-evals", title: "End-to-End Evals" },
  { id: "metrics-overview", title: "Metrics Overview" },
  { id: "deterministic", title: "Deterministic Metrics" },
  { id: "compound", title: "Compound Metrics" },
  { id: "ci-cd", title: "Unit Testing in CI/CD" },
  { id: "troubleshooting", title: "Troubleshooting" },
];

export default function GettingStartedPage() {
  return (
    <article className="surface-card rounded-3xl p-6 md:p-10">
      <div className="mb-6 flex flex-wrap items-center gap-2 text-sm text-[var(--muted)]">
        <Link href="/" className="transition hover:text-[var(--foreground)]">
          Home
        </Link>
        <span>/</span>
        <span className="text-[var(--foreground)]">Getting Started</span>
      </div>

      <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--muted)]">
        Getting Started
      </p>
      <h1 className="mt-2 text-4xl font-semibold tracking-tight text-[var(--foreground)] md:text-5xl">
        Quick Introduction
      </h1>
      <p className="mt-5 max-w-3xl text-base leading-8 text-[var(--muted)] md:text-lg">
        go-eval is an open-source evaluation toolkit for Go teams building LLM
        products. It is designed to feel native to `go test`, so you can ship
        evals as part of normal engineering workflows instead of a separate
        platform.
      </p>

      <div className="mt-8 rounded-2xl border border-[var(--border)] bg-[var(--surface-strong)] p-5">
        <p className="text-sm font-semibold text-[var(--foreground)]">On this page</p>
        <div className="mt-3 flex flex-wrap gap-2">
          {docsSections.map((section) => (
            <a
              key={section.id}
              href={`#${section.id}`}
              className="rounded-full border border-[var(--border)] px-3 py-1.5 text-xs font-medium text-[var(--foreground)] transition hover:border-[var(--accent)]"
            >
              {section.title}
            </a>
          ))}
        </div>
      </div>

      <section id="use-cases" className="mt-12 scroll-mt-24">
        <h2 className="text-2xl font-semibold text-[var(--foreground)] md:text-3xl">
          Use Cases
        </h2>
        <ul className="mt-4 space-y-2 text-[var(--muted)]">
          {useCases.map((useCase) => (
            <li key={useCase} className="rounded-xl border border-[var(--border)] bg-[var(--surface-strong)] px-4 py-3">
              {useCase}
            </li>
          ))}
        </ul>
      </section>

      <section id="concepts" className="mt-12 scroll-mt-24">
        <h2 className="text-2xl font-semibold text-[var(--foreground)] md:text-3xl">
          Core Concepts
        </h2>
        <p className="mt-4 leading-7 text-[var(--muted)]">
          In go-eval, a <code>Case</code> represents an input/output interaction,
          a <code>Metric</code> acts as the scoring rule, a <code>Judge</code>
          provides model-based scoring when needed, and a <code>Runner</code>
          executes everything inside your tests.
        </p>
        <ul className="mt-4 space-y-2 text-[var(--muted)]">
          {principles.map((principle) => (
            <li key={principle} className="rounded-xl border border-[var(--border)] bg-[var(--surface-strong)] px-4 py-3">
              {principle}
            </li>
          ))}
        </ul>
      </section>

      <section id="first-run" className="mt-12 scroll-mt-24">
        <h2 className="text-2xl font-semibold text-[var(--foreground)] md:text-3xl">
          Create Your First Test Run
        </h2>
        <p className="mt-4 leading-7 text-[var(--muted)]">
          Start with a deterministic precheck and a rubric-based judge metric.
          This keeps eval costs low while catching obvious failures early.
        </p>
        <pre className="mt-5 overflow-x-auto rounded-2xl bg-[var(--code-bg)] p-5 font-mono text-sm text-[var(--code-fg)]">
          <code>{`package yourpkg_test

import (
  "testing"

  eval "github.com/igcodinap/go-eval"
)

func TestSupportReply(t *testing.T) {
  runner := eval.NewRunner(openAIJudge)

  c := eval.Case{
    Input:    "How do I cancel my plan?",
    Output:   "You can cancel from Billing > Subscription.",
    Expected: "cancel",
  }

  result := runner.Run(t, eval.Precheck{
    Pre: eval.Contains{},
    Main: eval.Compound{
      Dimensions: []eval.Dimension{
        {Name: "helpfulness", Rubric: "Actionable next step", Threshold: 0.7},
        {Name: "policy_alignment", Rubric: "No unsafe guidance", Threshold: 0.9},
      },
    },
  }, c)

  if !result.Passed {
    t.Fatalf("eval failed: %s", result.Reason)
  }
}`}</code>
        </pre>
      </section>

      <section id="e2e-evals" className="mt-12 scroll-mt-24">
        <h2 className="text-2xl font-semibold text-[var(--foreground)] md:text-3xl">
          End-to-End Evals
        </h2>
        <p className="mt-4 leading-7 text-[var(--muted)]">
          Use your real app output in tests and evaluate complete behavior.
          This is the fastest way to catch quality regressions before release.
        </p>
      </section>

      <section id="metrics-overview" className="mt-12 scroll-mt-24">
        <h2 className="text-2xl font-semibold text-[var(--foreground)] md:text-3xl">
          Metrics Overview
        </h2>
        <div className="mt-4 overflow-hidden rounded-2xl border border-[var(--border)]">
          <table className="w-full text-left text-sm">
            <thead className="bg-[var(--surface-strong)] text-[var(--foreground)]">
              <tr>
                <th className="px-4 py-3">Metric</th>
                <th className="px-4 py-3">Type</th>
                <th className="px-4 py-3">Best for</th>
              </tr>
            </thead>
            <tbody className="text-[var(--muted)]">
              <tr className="border-t border-[var(--border)]">
                <td className="px-4 py-3">Contains</td>
                <td className="px-4 py-3">Deterministic</td>
                <td className="px-4 py-3">Keyword/substring gates</td>
              </tr>
              <tr className="border-t border-[var(--border)]">
                <td className="px-4 py-3">Regex</td>
                <td className="px-4 py-3">Deterministic</td>
                <td className="px-4 py-3">Format compliance</td>
              </tr>
              <tr className="border-t border-[var(--border)]">
                <td className="px-4 py-3">JSONPath</td>
                <td className="px-4 py-3">Deterministic</td>
                <td className="px-4 py-3">Field-level extraction validation</td>
              </tr>
              <tr className="border-t border-[var(--border)]">
                <td className="px-4 py-3">FieldCount</td>
                <td className="px-4 py-3">Deterministic</td>
                <td className="px-4 py-3">Output completeness checks</td>
              </tr>
              <tr className="border-t border-[var(--border)]">
                <td className="px-4 py-3">Compound</td>
                <td className="px-4 py-3">LLM-as-judge</td>
                <td className="px-4 py-3">Multi-criteria rubric scoring</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section id="deterministic" className="mt-12 scroll-mt-24">
        <h2 className="text-2xl font-semibold text-[var(--foreground)] md:text-3xl">
          Deterministic Metrics
        </h2>
        <p className="mt-4 leading-7 text-[var(--muted)]">
          Deterministic metrics do not call an LLM judge. They are fast, cheap,
          reproducible, and ideal for prechecks and extraction validation.
        </p>
      </section>

      <section id="compound" className="mt-12 scroll-mt-24">
        <h2 className="text-2xl font-semibold text-[var(--foreground)] md:text-3xl">
          Compound Metrics
        </h2>
        <p className="mt-4 leading-7 text-[var(--muted)]">
          Compound scoring evaluates multiple rubric dimensions in one judge
          call, reducing latency and token cost while preserving a structured
          per-dimension breakdown.
        </p>
      </section>

      <section id="ci-cd" className="mt-12 scroll-mt-24">
        <h2 className="text-2xl font-semibold text-[var(--foreground)] md:text-3xl">
          Unit Testing in CI/CD
        </h2>
        <p className="mt-4 leading-7 text-[var(--muted)]">
          Keep evals explicitly enabled in CI using environment flags:
        </p>
        <pre className="mt-4 overflow-x-auto rounded-2xl bg-[var(--code-bg)] p-5 font-mono text-sm text-[var(--code-fg)]">
          <code>{`# Local or CI
GOEVAL=1 go test ./...

# Optional: write result artifacts when configured
GOEVAL_RESULTS_DIR=./eval-results GOEVAL=1 go test ./...`}</code>
        </pre>
      </section>

      <section id="troubleshooting" className="mt-12 scroll-mt-24">
        <h2 className="text-2xl font-semibold text-[var(--foreground)] md:text-3xl">
          Troubleshooting
        </h2>
        <div className="mt-4 space-y-3">
          <details className="rounded-xl border border-[var(--border)] bg-[var(--surface-strong)] px-4 py-3 text-[var(--foreground)]">
            <summary className="cursor-pointer font-medium">
              Evals are skipped unexpectedly
            </summary>
            <p className="mt-2 text-sm leading-6 text-[var(--muted)]">
              Confirm <code>GOEVAL=1</code> is set in your environment before
              running tests.
            </p>
          </details>
          <details className="rounded-xl border border-[var(--border)] bg-[var(--surface-strong)] px-4 py-3 text-[var(--foreground)]">
            <summary className="cursor-pointer font-medium">
              Judge calls fail intermittently
            </summary>
            <p className="mt-2 text-sm leading-6 text-[var(--muted)]">
              Verify provider credentials, rate limits, and model availability.
              Use deterministic prechecks to reduce judge call volume.
            </p>
          </details>
          <details className="rounded-xl border border-[var(--border)] bg-[var(--surface-strong)] px-4 py-3 text-[var(--foreground)]">
            <summary className="cursor-pointer font-medium">
              Want full API details?
            </summary>
            <p className="mt-2 text-sm leading-6 text-[var(--muted)]">
              Use package docs and inline Go doc comments for detailed type and
              method reference.
            </p>
          </details>
        </div>
      </section>
    </article>
  );
}
