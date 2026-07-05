import Link from "next/link";

const patterns = [
  {
    title: "Case Metadata",
    body: "Use flow, tier, and dataset consistently so case filters, reports, and JSONL comparisons stay stable.",
  },
  {
    title: "Artifacts First",
    body: "Validate structured state with artifact metrics before paying for judge-backed prose evaluation.",
  },
  {
    title: "Trajectory Checks",
    body: "Use Turns, ToolCalls, ExpectedToolCalls, match modes, required tools, and forbidden tool patterns for agent paths.",
  },
  {
    title: "Scenario Contracts",
    body: "Use RunScenario when step order, state, accumulated artifacts, expected failures, or per-step tool policy matters.",
  },
  {
    title: "Reliable Judges",
    body: "Use NewJudgeExecutor for RawJudge parsing, retries, concurrency limits, caching, and best-effort diagnostics.",
  },
  {
    title: "Post-Hoc Review",
    body: "Use Evaluator, trace selectors, and goeval eval when reviewing stored cases or traces outside testing.TB.",
  },
  {
    title: "Repeatability",
    body: "Use Repeat, RepeatN, or ScenarioRepeat when nondeterminism needs a pass-rate guard instead of one sample.",
  },
  {
    title: "Eval Profiles",
    body: "Use goeval.json profiles, prerequisites, run manifests, compare policies, and summary policies when suites need repeatable PR, nightly, provider, or release-gate runs.",
  },
  {
    title: "Budgets & Tiers",
    body: "Use token, latency, output length, per-step timeouts, and DefaultTierFilter for practical CI slices.",
  },
  {
    title: "CI-safe by Default",
    body: "Preserve GOEVAL opt-in behavior and only enable GOEVAL_TRACE when prompt and response logs are safe to inspect.",
  },
];

export default function AgentSkillsPage() {
  return (
    <article>
      <div className="mb-6 text-sm text-[var(--muted)]">
        <Link href="/" className="hover:text-[var(--foreground)]">Home</Link>
        <span className="mx-2">/</span>
        <span className="text-[var(--foreground)]">Agent Skills</span>
      </div>

      <h1 className="mb-4 text-4xl font-bold">Agent Skills</h1>
      <p className="text-lg text-[var(--secondary)] leading-relaxed">
        Guides for coding agents that need to author, run, or review go-eval v1.1 suites.
      </p>

      <div className="mt-8 grid gap-6 md:grid-cols-2">
        <div className="border border-[var(--border)] rounded-md overflow-hidden">
          <div className="px-4 py-3 bg-[var(--surface)] border-b border-[var(--border)]">
            <h2 className="font-semibold">Authoring go-eval Suites</h2>
          </div>
          <div className="p-4">
            <p className="text-sm text-[var(--secondary)] mb-4">
              The canonical, agent-agnostic skill covers case design, metric selection, judge wiring, JSONL result review, and recommendations for failed evals.
            </p>
            <div className="p-3 bg-[var(--code-bg)] rounded text-xs font-mono">
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
              The Claude command remains a thin adapter that points to the canonical skill instead of duplicating its workflow.
            </p>
            <div className="bg-[var(--code-bg)] rounded p-2 text-xs font-mono">
              <code>.claude/commands/eval.md</code>
            </div>
            <p className="mt-3 text-xs text-[var(--muted)]">
              It infers design, run, or review mode from repo state and uses the skill report template.
            </p>
          </div>
        </div>
      </div>

      <section className="mt-8 p-4 border border-[var(--border)] rounded-md bg-[var(--surface)]">
        <h2 className="text-sm font-semibold text-[var(--muted)] uppercase tracking-wide mb-3">Key v1.1 Patterns</h2>
        <div className="grid gap-4 md:grid-cols-3">
          {patterns.map((pattern) => (
            <div key={pattern.title}>
              <h3 className="font-mono text-sm text-[var(--accent)] mb-2">{pattern.title}</h3>
              <p className="text-xs text-[var(--secondary)]">{pattern.body}</p>
            </div>
          ))}
        </div>
      </section>
    </article>
  );
}
