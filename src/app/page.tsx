import { ThemeToggle } from "@/components/theme-toggle";

function GitHubIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={className}
      fill="currentColor"
    >
      <path d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.68c-2.78.61-3.37-1.18-3.37-1.18-.45-1.15-1.11-1.45-1.11-1.45-.9-.62.07-.61.07-.61 1 .07 1.53 1.03 1.53 1.03.89 1.52 2.33 1.08 2.9.83.09-.65.35-1.08.63-1.32-2.22-.25-4.55-1.11-4.55-4.95 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.64 0 0 .84-.27 2.75 1.02a9.6 9.6 0 0 1 5 0c1.91-1.29 2.75-1.02 2.75-1.02.55 1.37.2 2.39.1 2.64.64.7 1.03 1.59 1.03 2.68 0 3.85-2.33 4.7-4.56 4.95.36.31.68.93.68 1.87v2.77c0 .27.18.58.69.48A10 10 0 0 0 12 2Z" />
    </svg>
  );
}

const stats = [
  { label: "LLM Calls Reduced", value: "5x", detail: "With compound scoring" },
  { label: "Core Dependencies", value: "0", detail: "Stdlib-first architecture" },
  { label: "Metric Latency", value: "~0ms", detail: "Deterministic checks" },
];

const features = [
  {
    title: "Compound Rubrics",
    description:
      "Score language match, helpfulness, compliance, and style in one judge call with structured results.",
  },
  {
    title: "Deterministic Metrics",
    description:
      "Use Contains, Regex, JSONPath, and FieldCount to catch broken responses before spending tokens.",
  },
  {
    title: "Vendor-Agnostic Core",
    description:
      "Keep your evaluation logic portable while plugging in judge adapters per provider.",
  },
  {
    title: "Precheck Pipeline",
    description:
      "Gate expensive LLM-based metrics behind fast deterministic assertions to keep runs lean.",
  },
];

const valueProps = [
  {
    title: "Cost Control By Design",
    summary:
      "Run deterministic prechecks first and reserve judge calls for the cases that truly need them.",
    proof: "Lower evaluation spend without lowering quality bars.",
  },
  {
    title: "CI-Ready Quality Gates",
    summary:
      "Evals run through familiar Go test workflows, so teams adopt them without adding a new platform.",
    proof: "Fits existing pipelines, release checks, and team habits.",
  },
  {
    title: "Portable Evaluation Layer",
    summary:
      "Keep metric logic vendor-agnostic and switch judge providers without rewriting your core suite.",
    proof: "Avoid lock-in while model strategy evolves.",
  },
  {
    title: "Open-Source Trust",
    summary:
      "Scoring behavior is transparent and inspectable, which makes quality discussions concrete and auditable.",
    proof: "No black-box evaluator surprises in production.",
  },
];

const steps = [
  {
    step: "01",
    title: "Define Cases",
    detail: "Describe prompts, expected behavior, and context for critical flows.",
  },
  {
    step: "02",
    title: "Compose Metrics",
    detail: "Mix deterministic checks and compound rubric scoring for full coverage.",
  },
  {
    step: "03",
    title: "Run & Improve",
    detail: "Track pass/fail, inspect reasons, and tighten prompts or retrieval strategy.",
  },
];

export default function Home() {
  return (
    <div className="relative isolate flex-1 overflow-hidden">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_15%_20%,var(--hero-glow-1),transparent_40%),radial-gradient(circle_at_80%_10%,var(--hero-glow-2),transparent_42%),linear-gradient(180deg,var(--background),color-mix(in_oklab,var(--background),black_5%))]" />
      <div className="pointer-events-none absolute inset-0 -z-10 opacity-40 [background:linear-gradient(to_right,var(--grid)_1px,transparent_1px),linear-gradient(to_bottom,var(--grid)_1px,transparent_1px)] [background-size:40px_40px]" />

      <header className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-6 md:px-10">
        <div className="flex items-center gap-3">
          <div className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-[var(--accent)]/20 font-mono text-sm font-bold text-[var(--accent)]">
            ge
          </div>
          <div>
            <p className="text-sm font-semibold tracking-[0.15em] text-[var(--muted)]">
              GO-EVAL
            </p>
            <p className="text-xs text-[var(--muted)]">LLM evaluation toolkit</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <a
            href="https://github.com/igcodinap/go-eval"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--surface)] px-4 py-2 text-sm font-medium text-[var(--foreground)] transition hover:border-[var(--accent)] md:inline-flex"
          >
            <GitHubIcon className="h-4 w-4" />
            GitHub
          </a>
          <ThemeToggle />
        </div>
      </header>

      <main className="mx-auto flex w-full max-w-6xl flex-col gap-20 px-6 pb-20 md:px-10">
        <section className="surface-card animate-fade-up rounded-3xl px-7 py-10 md:px-12 md:py-14">
          <p className="mb-4 inline-flex rounded-full border border-[var(--border)] bg-[var(--surface-strong)] px-4 py-1 text-xs font-semibold tracking-[0.16em] text-[var(--muted)]">
            OPEN SOURCE • TEST WHAT SHIPS
          </p>
          <h1 className="max-w-3xl text-4xl font-semibold tracking-tight text-[var(--foreground)] md:text-6xl">
            Evaluate AI outputs with
            <span className="block bg-[linear-gradient(120deg,var(--accent),color-mix(in_oklab,var(--accent),white_35%))] bg-clip-text text-transparent">
              speed, structure, and confidence.
            </span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-[var(--muted)]">
            go-eval helps teams gate quality before release with deterministic
            checks, strict compound rubric scoring, and provider adapters built
            for real production loops.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="https://github.com/igcodinap/go-eval"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-[var(--accent)] px-6 py-3 text-sm font-semibold text-[var(--accent-foreground)] transition hover:opacity-90"
            >
              <GitHubIcon className="h-4 w-4" />
              Explore Repository
            </a>
            <a
              href="/docs/getting-started"
              className="inline-flex items-center rounded-full border border-[var(--border)] bg-[var(--surface-strong)] px-6 py-3 text-sm font-semibold text-[var(--foreground)] transition hover:border-[var(--accent)]"
            >
              Read Documentation
            </a>
          </div>
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {stats.map((item) => (
              <article
                key={item.label}
                className="rounded-2xl border border-[var(--border)] bg-[var(--surface-strong)] px-5 py-5"
              >
                <p className="text-xs font-semibold uppercase tracking-[0.1em] text-[var(--muted)]">
                  {item.label}
                </p>
                <p className="mt-2 text-3xl font-semibold tracking-tight text-[var(--foreground)]">
                  {item.value}
                </p>
                <p className="mt-1 text-sm text-[var(--muted)]">{item.detail}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="animate-fade-up" style={{ animationDelay: "120ms" }}>
          <h2 className="text-3xl font-semibold tracking-tight text-[var(--foreground)] md:text-4xl">
            Built for evaluation workflows that move fast.
          </h2>
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {features.map((feature) => (
              <article
                key={feature.title}
                className="surface-card rounded-2xl px-6 py-6"
              >
                <h3 className="text-xl font-semibold text-[var(--foreground)]">
                  {feature.title}
                </h3>
                <p className="mt-3 leading-7 text-[var(--muted)]">
                  {feature.description}
                </p>
              </article>
            ))}
          </div>
        </section>

        <section
          className="animate-fade-up"
          style={{ animationDelay: "180ms" }}
        >
          <article className="surface-card rounded-2xl p-6 md:p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.11em] text-[var(--muted)]">
              Why Teams Choose It
            </p>
            <h2 className="mt-3 text-2xl font-semibold tracking-tight text-[var(--foreground)] md:text-3xl">
              Practical framework benefits you can sell today.
            </h2>
            <div className="mt-6 grid gap-4">
              {valueProps.map((item) => (
                <div
                  key={item.title}
                  className="rounded-xl border border-[var(--border)] bg-[var(--surface-strong)] px-4 py-4"
                >
                  <h3 className="text-lg font-semibold text-[var(--foreground)]">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-[var(--muted)]">
                    {item.summary}
                  </p>
                  <p className="mt-2 font-mono text-xs text-[var(--accent)]">
                    {item.proof}
                  </p>
                </div>
              ))}
            </div>
          </article>
        </section>

        <section
          className="grid gap-6 animate-fade-up md:grid-cols-[1.1fr_0.9fr]"
          style={{ animationDelay: "220ms" }}
        >
          <article className="surface-card rounded-2xl p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.11em] text-[var(--muted)]">
              Quick Start
            </p>
            <pre className="mt-4 overflow-x-auto rounded-xl bg-[var(--code-bg)] p-5 font-mono text-sm text-[var(--code-fg)]">
              <code>{`package evaltest

import (
  "testing"

  eval "github.com/igcodinap/go-eval"
)

func TestPolicyResponse(t *testing.T) {
  runner := eval.NewRunner(openAIJudge)

  result := runner.Run(t, eval.Precheck{
    Pre: eval.Contains{},
    Main: eval.Compound{
      Dimensions: []eval.Dimension{
        {Name: "helpfulness", Rubric: "Actionable and specific", Threshold: 0.75},
        {Name: "policy_alignment", Rubric: "No unsafe instructions", Threshold: 0.90},
      },
    },
  }, eval.Case{
    Input: "...",
    Output: "...",
    Expected: "refund policy",
  })

  if !result.Passed {
    t.Fatalf("quality regression: %s", result.Reason)
  }
}`}</code>
            </pre>
          </article>
          <article className="surface-card rounded-2xl p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.11em] text-[var(--muted)]">
              Workflow
            </p>
            <div className="mt-4 space-y-4">
              {steps.map((step) => (
                <div
                  key={step.step}
                  className="rounded-xl border border-[var(--border)] bg-[var(--surface-strong)] px-4 py-4"
                >
                  <p className="font-mono text-xs font-bold tracking-[0.1em] text-[var(--accent)]">
                    {step.step}
                  </p>
                  <h3 className="mt-1 text-lg font-semibold text-[var(--foreground)]">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-[var(--muted)]">
                    {step.detail}
                  </p>
                </div>
              ))}
            </div>
          </article>
        </section>

        <section
          className="surface-card animate-fade-up rounded-3xl px-7 py-10 text-center md:px-12"
          style={{ animationDelay: "300ms" }}
        >
          <p className="text-xs font-semibold uppercase tracking-[0.11em] text-[var(--muted)]">
            Ready To Evaluate Better
          </p>
          <h2 className="mx-auto mt-3 max-w-3xl text-3xl font-semibold tracking-tight text-[var(--foreground)] md:text-4xl">
            Launch quality gates that scale with your LLM product.
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-[var(--muted)]">
            Start with deterministic assertions, layer compound scoring, and
            keep shipping with confidence.
          </p>
        </section>
      </main>

      <footer className="mx-auto mt-auto w-full max-w-6xl px-6 pb-8 text-sm text-[var(--muted)] md:px-10">
        <p>
          Built for go-eval. Open-source and focused on practical LLM quality
          engineering.
        </p>
      </footer>
    </div>
  );
}
