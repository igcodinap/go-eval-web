import { ThemeToggle } from "@/components/theme-toggle";

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
            className="hidden rounded-full border border-[var(--border)] bg-[var(--surface)] px-4 py-2 text-sm font-medium text-[var(--foreground)] transition hover:border-[var(--accent)] md:inline-flex"
          >
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
              className="inline-flex items-center rounded-full bg-[var(--accent)] px-6 py-3 text-sm font-semibold text-[var(--accent-foreground)] transition hover:opacity-90"
            >
              Explore Repository
            </a>
            <a
              href="https://github.com/igcodinap/go-eval/tree/main/docs"
              target="_blank"
              rel="noopener noreferrer"
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
