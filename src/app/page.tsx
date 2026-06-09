"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { ThemeToggle } from "@/components/theme-toggle";
import { SlideOver } from "@/components/slide-over";
import { metricDetails, orderedMetricDetails, MetricDetail } from "@/data/metric-details";
import { benchmarkMetricDetails, conceptDetails, BenchmarkMetricDetail, ConceptDetail } from "@/data/benchmark-concept-details";

function GitHubIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="currentColor">
      <path d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.68c-2.78.61-3.37-1.18-3.37-1.18-.45-1.15-1.11-1.45-1.11-1.45-.9-.62.07-.61.07-.61 1 .07 1.53 1.03 1.53 1.03.89 1.52 2.33 1.08 2.9.83.09-.65.35-1.08.63-1.32-2.22-.25-4.55-1.11-4.55-4.95 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.64 0 0 .84-.27 2.75 1.02a9.6 9.6 0 0 1 5 0c1.91-1.29 2.75-1.02 2.75-1.02.55 1.37.2 2.39.1 2.64.64.7 1.03 1.59 1.03 2.68 0 3.85-2.33 4.7-4.56 4.95.36.31.68.93.68 1.87v2.77c0 .27.18.58.69.48A10 10 0 0 0 12 2Z" />
    </svg>
  );
}

const navItems = [
  { label: "Overview", href: "#overview" },
  { label: "Install", href: "#install" },
  { label: "Quick Start", href: "#quickstart" },
  { label: "Implementation", href: "#implementation" },
  { label: "Metrics", href: "#metrics" },
  { label: "Scenarios", href: "#scenarios" },
  { label: "Contracts", href: "#contracts" },
  { label: "Artifacts", href: "#artifacts" },
  { label: "Trajectory", href: "#trajectory" },
  { label: "Benchmarks", href: "#benchmarks" },
  { label: "Eval Operations", href: "#eval-ops" },
  { label: "CI/CD", href: "#cicd" },
  { label: "CLI", href: "#cli" },
  { label: "Concepts", href: "#concepts" },
];

const metricTypeLabels: Record<MetricDetail["type"], string> = {
  judge: "LLM-as-Judge",
  deterministic: "Deterministic",
  trajectory: "Trajectory",
  wrapper: "Wrapper",
};

const metrics = orderedMetricDetails;

function MetricDetailPanel({ metric }: { metric: MetricDetail }) {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <span className={`metric-tag ${metric.type}`}>{metricTypeLabels[metric.type]}</span>
        <span className="font-mono text-sm text-[var(--muted)]">threshold: {metric.threshold}</span>
      </div>

      <div>
        <h3 className="text-sm font-semibold text-[var(--muted)] uppercase tracking-wide mb-2">Purpose</h3>
        <p className="text-[var(--foreground)]">{metric.purpose}</p>
      </div>

      <div>
        <h3 className="text-sm font-semibold text-[var(--muted)] uppercase tracking-wide mb-2">How It Works</h3>
        <p className="text-[var(--secondary)]">{metric.howItWorks}</p>
      </div>

      <div>
        <h3 className="text-sm font-semibold text-[var(--muted)] uppercase tracking-wide mb-3">Example</h3>
        <div className="space-y-4">
          <div>
            <p className="text-xs text-[var(--muted)] mb-2">Code</p>
            <pre className="bg-[var(--code-bg)] border border-[var(--border)] rounded-md px-4 py-3 font-mono text-sm overflow-x-auto">
              <code>{metric.example.code}</code>
            </pre>
          </div>
          <div>
            <p className="text-xs text-[var(--muted)] mb-2">Output</p>
            <pre className="bg-[var(--code-bg)] border border-[var(--border)] rounded-md px-4 py-3 font-mono text-sm text-[var(--secondary)] overflow-x-auto">
              <code>{metric.example.output}</code>
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}

function BenchmarkMetricPanel({ metric }: { metric: BenchmarkMetricDetail }) {
  return (
    <div className="space-y-6">
      <p className="text-sm text-[var(--secondary)]">{metric.description}</p>
      <div>
        <h3 className="text-sm font-semibold text-[var(--muted)] uppercase tracking-wide mb-3">Details</h3>
        <div className="text-sm text-[var(--foreground)] whitespace-pre-wrap">{metric.details}</div>
      </div>
      {metric.example?.output && (
        <div>
          <h3 className="text-sm font-semibold text-[var(--muted)] uppercase tracking-wide mb-3">Example Output</h3>
          <pre className="bg-[var(--code-bg)] border border-[var(--border)] rounded-md px-4 py-3 font-mono text-sm text-[var(--secondary)] overflow-x-auto">
            <code>{metric.example.output}</code>
          </pre>
        </div>
      )}
    </div>
  );
}

function ConceptPanel({ concept }: { concept: ConceptDetail }) {
  return (
    <div className="space-y-6">
      <p className="text-sm text-[var(--secondary)]">{concept.description}</p>
      <div>
        <h3 className="text-sm font-semibold text-[var(--muted)] uppercase tracking-wide mb-3">Details</h3>
        <div className="text-sm text-[var(--foreground)] whitespace-pre-wrap">{concept.details}</div>
      </div>
      {concept.example?.code && (
        <div>
          <h3 className="text-sm font-semibold text-[var(--muted)] uppercase tracking-wide mb-3">Example</h3>
          <pre className="bg-[var(--code-bg)] border border-[var(--border)] rounded-md px-4 py-3 font-mono text-sm overflow-x-auto">
            <code>{concept.example.code}</code>
          </pre>
        </div>
      )}
    </div>
  );
}

export default function Home() {
  const [selectedMetric, setSelectedMetric] = useState<string | null>(null);
  const [selectedBenchMetric, setSelectedBenchMetric] = useState<string | null>(null);
  const [selectedConcept, setSelectedConcept] = useState<string | null>(null);

  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-50 border-b border-[var(--border)] bg-[var(--header-bg)]">
        <div className="mx-auto flex h-14 max-w-screen-2xl items-center justify-between px-4 md:px-8">
          <div className="flex min-w-0 items-center gap-6">
            <Link href="/" className="flex items-center gap-2">
              <Image src="/logo.png" alt="go-eval logo" width={28} height={28} className="rounded" />
              <span className="go-logo whitespace-nowrap text-lg font-bold">go-eval</span>
              <span className="text-xs text-[var(--muted)]">v0.9</span>
            </Link>
            <nav className="hidden shrink-0 items-center gap-1 text-sm 2xl:flex">
              {navItems.map((item) => (
                <a key={item.label} href={item.href} className="whitespace-nowrap px-3 py-2 text-[var(--secondary)] hover:text-[var(--foreground)] hover:no-underline">
                  {item.label}
                </a>
              ))}
            </nav>
          </div>
          <div className="flex shrink-0 items-center gap-2 sm:gap-3">
            <Link href="/docs/changelog" className="hidden whitespace-nowrap text-xs text-[var(--muted)] hover:text-[var(--foreground)] sm:inline">
              Changelog
            </Link>
            <a href="https://join.slack.com/t/goeval/shared_invite/zt-3vz9qlmpw-uBiyB_oZOFsjntlbP7l0EQ" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-[var(--secondary)] hover:text-[var(--foreground)]">
              <Image src="/slack.svg" alt="Slack" width={20} height={20} className="h-5 w-5" />
              <span className="hidden sm:inline">Slack</span>
            </a>
            <a href="https://github.com/igcodinap/go-eval" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-[var(--secondary)] hover:text-[var(--foreground)]">
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
              <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-[var(--muted)]">Contents</p>
              <ul className="space-y-1">
                {navItems.map((item) => (
                  <li key={item.label}>
                    <a href={item.href} className="block py-1 text-[var(--secondary)] hover:text-[var(--foreground)]">
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </aside>

          <main className="min-w-0 flex-1 max-w-3xl">
            <section id="overview" className="mb-12 scroll-mt-20">
              <h1 className="mb-4 text-4xl font-bold">go-eval</h1>
              <p className="text-xl text-[var(--secondary)]">LLM evaluation for Go, inside standard <code>go test</code>.</p>
              <p className="mt-4 text-[var(--secondary)]">
                go-eval v0.9 combines LLM-as-judge metrics, deterministic JSON and artifact checks, typed tool trajectories, multi-step agent scenarios, grouped contracts, tiered CI slices, repeatability helpers, policy-aware summaries, baseline comparison, and profile-driven eval operations while keeping the core stdlib-only.
              </p>
              <div className="mt-6 grid gap-3 md:grid-cols-3">
                {[
                  { label: "Go-native", desc: "Runs through testing.T, benchmarks, subtests, -parallel, and CI." },
                  { label: "Agent-aware", desc: "Checks turns, tools, artifacts, scenario state, and step contracts." },
                  { label: "Ops-ready", desc: "Profiles, prerequisites, compare policies, summaries, and JSONL output." },
                ].map((item) => (
                  <div key={item.label} className="border border-[var(--border)] rounded-md bg-[var(--surface)] p-4">
                    <h2 className="font-mono text-sm font-semibold text-[var(--accent)]">{item.label}</h2>
                    <p className="mt-2 text-sm text-[var(--secondary)]">{item.desc}</p>
                  </div>
                ))}
              </div>
            </section>

            <section id="install" className="mb-12 scroll-mt-20">
              <h2 className="mb-4 text-2xl font-semibold border-b border-[var(--border)] pb-2">Install</h2>
              <pre className="bg-[var(--code-bg)] border border-[var(--border)] rounded-md px-4 py-3 font-mono text-sm overflow-x-auto">
                <code>{`go get github.com/igcodinap/go-eval
go install github.com/igcodinap/go-eval/cmd/goeval@latest`}</code>
              </pre>
            </section>

            <section id="quickstart" className="mb-12 scroll-mt-20">
              <h2 className="mb-4 text-2xl font-semibold border-b border-[var(--border)] pb-2">Quick Start</h2>
              <p className="mb-4 text-[var(--secondary)]">
                Write evaluation cases using standard Go tests. Case literals should use keyed fields, which is required by v0.4 and later.
              </p>
              <pre className="bg-[var(--code-bg)] border border-[var(--border)] rounded-md px-4 py-3 font-mono text-sm overflow-x-auto">
                <code>{`package evaltest

import (
	"testing"

	eval "github.com/igcodinap/go-eval"
)

func TestRAGAnswer(t *testing.T) {
	judge := newMyJudge(t)
	r := eval.NewRunner(judge, eval.WithResultSink(eval.DefaultResultSink()))

	c := eval.Case{
		Input:   "What's the capital of France?",
		Output:  myRAG.Answer("What's the capital of France?"),
		Context: []string{"Paris is the capital of France."},
		Metadata: map[string]any{
			"flow": "rag.answer", "tier": "critical", "dataset": "capitals/v1",
		},
	}

	r.Run(t, eval.Faithfulness{Threshold: 0.8}, c)
	r.Run(t, eval.Hallucination{Threshold: 0.9}, c)
}`}</code>
              </pre>
              <p className="mt-4 text-sm text-[var(--muted)]">
                Run with: <code className="bg-[var(--code-bg)] px-1.5 py-0.5 rounded text-[var(--accent)]">GOEVAL=1 go test ./...</code>
              </p>
              <div className="mt-4 rounded-md bg-[var(--surface)] p-4 text-sm border border-[var(--border)]">
                <p className="font-semibold text-[var(--foreground)]">CI-safe by default</p>
                <p className="mt-1 text-[var(--secondary)]">
                  Without <code className="bg-[var(--code-bg)] px-1 py-0.5 rounded text-[var(--accent)]">GOEVAL=1</code>, eval runs skip. Use <code className="bg-[var(--code-bg)] px-1 py-0.5 rounded text-[var(--accent)]">GOEVAL_TRACE=1</code> only when you need prompt and response logs.
                </p>
              </div>
            </section>

            <section id="implementation" className="mb-12 scroll-mt-20">
              <h2 className="mb-4 text-2xl font-semibold border-b border-[var(--border)] pb-2">Implementation Example</h2>
              <p className="mb-4 text-[var(--secondary)]">
                See how a Go API can wire go-eval into an agent workflow. The travel-planning example covers a <code>goeval.json</code> profile, shared runner options, redacted JSONL results, route artifact contracts, custom metrics, scenario state, tool policies, and compare gates.
              </p>
              <div className="grid gap-3 md:grid-cols-3">
                {[
                  { label: "Profile", desc: "Run critical integration evals with prerequisites and policy settings." },
                  { label: "Contract", desc: "Validate route artifacts before judging final assistant prose." },
                  { label: "Scenario", desc: "Exercise a multi-step trip-planning agent with required and forbidden tools." },
                ].map((item) => (
                  <div key={item.label} className="border border-[var(--border)] rounded-md bg-[var(--surface)] p-4">
                    <h3 className="font-mono text-sm font-semibold text-[var(--accent)]">{item.label}</h3>
                    <p className="mt-2 text-sm text-[var(--secondary)]">{item.desc}</p>
                  </div>
                ))}
              </div>
              <Link href="/docs/implementation-example" className="mt-4 inline-block text-sm font-medium text-[var(--accent)] hover:underline">
                Open the full implementation example
              </Link>
            </section>

            <section id="metrics" className="mb-12 scroll-mt-20">
              <h2 className="mb-4 text-2xl font-semibold border-b border-[var(--border)] pb-2">Metrics</h2>
              <p className="mb-4 text-[var(--secondary)]">
                go-eval includes <span className="metric-tag judge">LLM-as-Judge</span>, <span className="metric-tag deterministic">Deterministic</span>, <span className="metric-tag trajectory">Trajectory</span>, and <span className="metric-tag wrapper">Wrapper</span> metrics. Click any metric for a focused example.
              </p>
              <div className="overflow-x-auto">
                <table className="w-full text-sm border-collapse">
                  <thead>
                    <tr className="border-b border-[var(--table-border)]">
                      <th className="py-2 text-left font-semibold text-[var(--foreground)]">Metric</th>
                      <th className="py-2 text-left font-semibold text-[var(--foreground)]">Type</th>
                      <th className="py-2 text-left font-semibold text-[var(--foreground)]">Purpose</th>
                      <th className="py-2 text-left font-semibold text-[var(--foreground)]">Threshold</th>
                    </tr>
                  </thead>
                  <tbody>
                    {metrics.map((metric, i) => (
                      <tr
                        key={metric.name}
                        onClick={() => setSelectedMetric(metric.name)}
                        className={`border-b border-[var(--table-border)] cursor-pointer hover:bg-[var(--hover,var(--surface))] ${i % 2 === 0 ? "bg-[var(--table-stripe)]" : ""}`}
                      >
                        <td className="py-2.5 font-mono text-[var(--accent)]">{metric.name}</td>
                        <td className="py-2.5"><span className={`metric-tag ${metric.type}`}>{metricTypeLabels[metric.type]}</span></td>
                        <td className="py-2.5 text-[var(--secondary)]">{metric.purpose}</td>
                        <td className="py-2.5 font-mono text-[var(--muted)]">{metric.threshold}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            <section id="scenarios" className="mb-12 scroll-mt-20">
              <h2 className="mb-4 text-2xl font-semibold border-b border-[var(--border)] pb-2">Agent Scenarios</h2>
              <p className="mb-4 text-[var(--secondary)]">
                Use <code>RunScenario</code> for ordered multi-turn flows where each step can have its own input, tool policy, artifact contract, timeout, state, and repeat pass-rate requirement.
              </p>
              <pre className="bg-[var(--code-bg)] border border-[var(--border)] rounded-md px-4 py-3 font-mono text-sm overflow-x-auto">
                <code>{`result := r.RunScenario(t, eval.Scenario{
	Name:  "planning_to_route_ready",
	Tier:  "critical",
	State: map[string]any{"locale": "es-CL"},
	Tools: eval.NewToolRegistry("plan_route", "select_map_items"),
	Repeat: eval.ScenarioRepeat{N: 3, PassRate: 2.0 / 3.0},
	Driver: func(ctx context.Context, req eval.StepRequest) (eval.StepResult, error) {
		return runAgentStep(ctx, req.Step.Input, req.History, req.Artifacts, req.State)
	},
	Steps: []eval.Step{
		{
			Name: "greeting", Input: "Hola",
			ForbiddenToolPatterns: []string{"plan_*", "select_*"},
			Timeout: 500 * time.Millisecond,
		},
		{
			Name: "ready_route_request", Input: "Propón la ruta",
			RequiredToolPatterns: []string{"plan_*"},
			Timeout: 3 * time.Second,
			Checks: []eval.Metric{
				eval.NewContract("ready_route",
					eval.ArtifactJSONPath{Key: "route", Path: "status", Expected: "ready"},
					eval.ArtifactArrayMinLen{Key: "route", Path: "stops", MinLen: 2},
				),
			},
		},
	},
})

if !result.Passed {
	t.Fatalf("scenario failed")
}`}</code>
              </pre>
              <p className="mt-3 text-sm text-[var(--muted)]">
                Scenario runs write normal metric rows plus a <code>_scenario_summary</code> JSONL row when a result sink is configured.
              </p>
            </section>

            <section id="contracts" className="mb-12 scroll-mt-20">
              <h2 className="mb-4 text-2xl font-semibold border-b border-[var(--border)] pb-2">Grouped Contracts</h2>
              <p className="mb-4 text-[var(--secondary)]">
                <code>Contract</code> turns several low-level checks into one named product requirement with per-check dimensions. It is especially useful inside scenario steps.
              </p>
              <pre className="bg-[var(--code-bg)] border border-[var(--border)] rounded-md px-4 py-3 font-mono text-sm overflow-x-auto">
                <code>{`readyRoute := eval.Contract{
	ContractName: "ready_route",
	Checks: []eval.Metric{
		eval.ArtifactJSONPath{Key: "route", Path: "status", Expected: "ready"},
		eval.ArtifactSubset{
			Key:      "route",
			Expected: json.RawMessage(\`{"success":true}\`),
		},
		eval.OutputLengthBudget{MaxWords: 180},
	},
}

r.Run(t, readyRoute, c)`}</code>
              </pre>
            </section>

            <section id="artifacts" className="mb-12 scroll-mt-20">
              <h2 className="mb-4 text-2xl font-semibold border-b border-[var(--border)] pb-2">Artifact Checks</h2>
              <p className="mb-4 text-[var(--secondary)]">
                <code>Case.Artifacts</code> stores named structured JSON outputs alongside text output, with absence checks, array exclusion, JSON subset checks, wildcard paths, output length budgets, and normalizers.
              </p>
              <pre className="bg-[var(--code-bg)] border border-[var(--border)] rounded-md px-4 py-3 font-mono text-sm overflow-x-auto">
                <code>{`c := eval.Case{
	Output: "Route is ready.",
	Artifacts: map[string]json.RawMessage{
		"route": json.RawMessage(\`{
			"status":"ready",
			"total_minutes":98,
			"stops":[{"name":"Pajaritos"},{"name":"Valparaíso"}]
		}\`),
	},
}

fold := eval.ChainNormalizers(
	eval.CaseFoldNormalizer(),
	eval.SpanishASCIIFoldNormalizer(),
)

r.Run(t, eval.ArtifactJSONPath{
	Key: "route", Path: "status", Expected: "ready",
}, c)
r.Run(t, eval.ArtifactArrayContains{
	Key: "route", Path: "stops[*].name", Expected: "pajaritos", Normalizer: fold,
}, c)
r.Run(t, eval.ArtifactArrayNotContains{
	Key: "route", Path: "stops[*].name", Expected: "Aeropuerto",
}, c)
r.Run(t, eval.ArtifactSubset{
	Key: "route", Expected: json.RawMessage(\`{"status":"ready"}\`),
}, c)`}</code>
              </pre>
            </section>

            <section id="trajectory" className="mb-12 scroll-mt-20">
              <h2 className="mb-4 text-2xl font-semibold border-b border-[var(--border)] pb-2">Trajectory Checks</h2>
              <p className="mb-4 text-[var(--secondary)]">
                Use <code>Turn</code>, <code>ToolCall</code>, <code>Case.Turns</code>, and <code>Case.ExpectedToolCalls</code> to evaluate agent tool-use paths without leaving the normal metric pipeline.
              </p>
              <pre className="bg-[var(--code-bg)] border border-[var(--border)] rounded-md px-4 py-3 font-mono text-sm overflow-x-auto">
                <code>{`c := eval.Case{
	Turns: []eval.Turn{
		{Role: eval.RoleUser, Content: "Where is order 42?"},
		{Role: eval.RoleAssistant, ToolCalls: []eval.ToolCall{
			{Name: "orders.lookup", Arguments: json.RawMessage(\`{"order_id":"42"}\`)},
		}},
	},
	ExpectedToolCalls: []eval.ToolCall{
		{Name: "orders.lookup", Arguments: json.RawMessage(\`{"order_id":"42"}\`)},
	},
}

r.Run(t, eval.ToolCallAccuracy{Mode: eval.MatchStrict, MatchArgs: true}, c)
r.Run(t, eval.ToolCallF1{MatchArgs: true, Threshold: 0.8}, c)
r.Run(t, eval.RequiredTools{Patterns: []string{"orders.*"}}, c)
r.Run(t, eval.ForbiddenTool{Patterns: []string{"orders.refund*"}}, c)
r.Run(t, eval.StepBudget{MaxSteps: 1}, c)`}</code>
              </pre>
              <p className="mt-3 text-sm text-[var(--muted)]">
                Match modes are <code>MatchStrict</code>, <code>MatchUnordered</code>, <code>MatchSubset</code>, and <code>MatchSuperset</code>. JSON datasets can include optional <code>turns</code> and <code>expected_tool_calls</code> fields.
              </p>
            </section>

            <section id="benchmarks" className="mb-12 scroll-mt-20">
              <h2 className="mb-4 text-2xl font-semibold border-b border-[var(--border)] pb-2">Benchmarks</h2>
              <p className="mb-4 text-[var(--secondary)]">
                Track latency, token usage, and score quality across prompt or model changes using standard Go benchmarks and <code className="bg-[var(--code-bg)] px-1.5 py-0.5 rounded text-[var(--accent)]">benchstat</code>.
              </p>
              <pre className="bg-[var(--code-bg)] border border-[var(--border)] rounded-md px-4 py-3 font-mono text-sm overflow-x-auto">
                <code>{`func BenchmarkRAGLatency(b *testing.B) {
	r := eval.NewRunner(newMyJudge(b))
	c := eval.Case{Input: "...", Output: "...", Context: docs}

	eval.Bench(b, r, eval.Faithfulness{Threshold: 0.8}, c)
}`}</code>
              </pre>

              <div className="mt-6 grid gap-3 md:grid-cols-2">
                {[
                  { label: "ns/op", desc: "Latency per judge call" },
                  { label: "tokens/op", desc: "Mean tokens consumed per call" },
                  { label: "score_mean", desc: "Average score across iterations" },
                  { label: "score_stddev", desc: "Score consistency across runs" },
                ].map((m) => (
                  <div
                    key={m.label}
                    onClick={() => setSelectedBenchMetric(m.label)}
                    className="flex items-center gap-3 p-3 border border-[var(--border)] rounded-md bg-[var(--surface)] cursor-pointer hover:border-[var(--accent)] transition-colors"
                  >
                    <code className="text-xs bg-[var(--code-bg)] px-2 py-1 rounded text-[var(--accent)]">{m.label}</code>
                    <span className="text-sm text-[var(--secondary)]">{m.desc}</span>
                  </div>
                ))}
              </div>
            </section>

            <section id="eval-ops" className="mb-12 scroll-mt-20">
              <h2 className="mb-4 text-2xl font-semibold border-b border-[var(--border)] pb-2">Eval Operations</h2>
              <p className="mb-4 text-[var(--secondary)]">
                v0.9 adds an operations layer for repeatable eval runs: define <code>goeval.json</code> profiles, preflight prerequisites, run profile-aware tests, and apply the same policy to compare and summarize commands.
              </p>
              <div className="mb-4 grid gap-3 md:grid-cols-2">
                {[
                  { label: "Profiles", desc: "Name PR, nightly, provider, or release-gate run shapes once." },
                  { label: "Prerequisites", desc: "Require env vars, files, TCP endpoints, or custom checks before a run." },
                  { label: "Compare policies", desc: "Set score tolerances, case IDs, and regression behavior in config." },
                  { label: "Reliability", desc: "Summarize pass rates, p95 latency/tokens, scenario totals, and flaky identities." },
                ].map((item) => (
                  <div key={item.label} className="border border-[var(--border)] rounded-md bg-[var(--surface)] p-4">
                    <h3 className="font-mono text-sm font-semibold text-[var(--accent)]">{item.label}</h3>
                    <p className="mt-2 text-sm text-[var(--secondary)]">{item.desc}</p>
                  </div>
                ))}
              </div>
              <pre className="bg-[var(--code-bg)] border border-[var(--border)] rounded-md px-4 py-3 font-mono text-sm overflow-x-auto">
                <code>{`{
  "profiles": {
    "pr": {
      "packages": ["./..."],
      "tiers": ["critical"],
      "results_dir": ".goeval/pr"
    },
    "google": {
      "packages": ["./..."],
      "tiers": ["critical", "standard"],
      "results_dir": ".goeval/google",
      "prerequisites": [
        {"type": "env", "name": "GEMINI_API_KEY"},
        {"type": "env", "name": "GOOGLE_ROUTES_API_KEY"}
      ],
      "missing_prerequisite": "skip"
    }
  },
  "compare": {
    "case_id_key": "case_id",
    "default": {
      "score_tolerance": 0.02,
      "fail_on_missing": true,
      "fail_on_regression": true
    }
  }
}`}</code>
              </pre>
              <pre className="mt-4 bg-[var(--code-bg)] border border-[var(--border)] rounded-md px-4 py-3 font-mono text-sm overflow-x-auto">
                <code>{`goeval test --profile pr
goeval test --profile google --config goeval.json -run Route
goeval compare --policy goeval.json --format json old/results.jsonl new/results.jsonl
goeval compare --fail-on-regression=false old/results.jsonl new/results.jsonl
goeval summarize --policy goeval.json new/results.jsonl`}</code>
              </pre>
            </section>

            <section id="cicd" className="mb-12 scroll-mt-20">
              <h2 className="mb-4 text-2xl font-semibold border-b border-[var(--border)] pb-2">CI/CD</h2>
              <p className="mb-4 text-[var(--secondary)]">
                Persist JSONL results, run named profiles, compare baselines with policy tolerances, summarize reliability, redact sensitive metadata, and filter case tiers while keeping normal CI fast by default.
              </p>
              <p className="mb-4 text-sm text-[var(--muted)]">
                Install <code>DefaultTierFilter</code> on the runner to use <code>GOEVAL_TIER</code>, declare run prerequisites in <code>goeval.json</code> or with <code>eval.Require</code>, and add <code>WithRedactors</code> before writing shared result logs.
              </p>
              <pre className="bg-[var(--code-bg)] border border-[var(--border)] rounded-md px-4 py-3 font-mono text-sm overflow-x-auto">
                <code>{`goeval test --profile pr
goeval compare --policy goeval.json old/results.jsonl new/results.jsonl
goeval summarize --policy goeval.json .goeval/pr/results.jsonl`}</code>
              </pre>
              <div className="mt-4 rounded-md bg-[var(--surface)] p-4 text-sm border border-[var(--border)]">
                <p className="font-semibold text-[var(--foreground)]">Environment Variables</p>
                <ul className="mt-2 space-y-1 text-[var(--secondary)]">
                  <li><code className="bg-[var(--code-bg)] px-1 py-0.5 rounded text-[var(--accent)]">GOEVAL=1</code> - Enable evaluations</li>
                  <li><code className="bg-[var(--code-bg)] px-1 py-0.5 rounded text-[var(--accent)]">GOEVAL_TRACE=1</code> - Log judge prompts and responses via <code>t.Log</code></li>
                  <li><code className="bg-[var(--code-bg)] px-1 py-0.5 rounded text-[var(--accent)]">GOEVAL_TIER</code> - Filter tiers when <code>DefaultTierFilter</code> is installed</li>
                  <li><code className="bg-[var(--code-bg)] px-1 py-0.5 rounded text-[var(--accent)]">GOEVAL_RESULTS_DIR</code> - Write <code>results.jsonl</code> in this directory</li>
                </ul>
              </div>
            </section>

            <section id="cli" className="mb-12 scroll-mt-20">
              <h2 className="mb-4 text-2xl font-semibold border-b border-[var(--border)] pb-2">CLI</h2>
              <p className="mb-4 text-[var(--secondary)]">
                The optional <code className="bg-[var(--code-bg)] px-1.5 py-0.5 rounded text-[var(--accent)]">goeval</code> CLI wraps common test, profile, compare, and summary workflows.
              </p>
              <div className="space-y-4">
                {[
                  { cmd: "goeval test --profile pr", desc: "Run a named goeval.json profile with GOEVAL=1, tier filters, result directories, and prerequisites applied." },
                  { cmd: "goeval compare --policy goeval.json old/results.jsonl new/results.jsonl", desc: "Compare baseline and current JSONL results with policy tolerances, case IDs, and regression rules." },
                  { cmd: "goeval summarize --policy goeval.json current/results.jsonl", desc: "Summarize pass rates, p95 latency/tokens, metadata groups, scenario totals, and flaky identities." },
                  { cmd: "goeval version", desc: "Print CLI version information." },
                ].map((item) => (
                  <div key={item.cmd} className="border border-[var(--border)] rounded-md p-4 bg-[var(--surface)]">
                    <h3 className="font-semibold text-[var(--foreground)] mb-2"><code className="text-[var(--accent)]">{item.cmd.split(" ")[0]} {item.cmd.split(" ")[1] || ""}</code></h3>
                    <p className="text-sm text-[var(--secondary)] mb-2">{item.desc}</p>
                    <pre className="bg-[var(--code-bg)] p-2 rounded text-xs font-mono overflow-x-auto">
                      <code>{item.cmd}</code>
                    </pre>
                  </div>
                ))}
              </div>
            </section>

            <section id="concepts" className="mb-12 scroll-mt-20">
              <h2 className="mb-4 text-2xl font-semibold border-b border-[var(--border)] pb-2">Core Concepts</h2>
              <div className="grid gap-4 md:grid-cols-2">
                {[
                  { term: "Case", desc: "Input, output, expected value, context, artifacts, turns, expected tool calls, metadata, and timeout." },
                  { term: "Scenario", desc: "Ordered multi-step agent flow with history, artifacts, state, tools, and repeats." },
                  { term: "Contract", desc: "A named group of checks reported as one business-level pass/fail result." },
                  { term: "Artifacts", desc: "Named structured JSON outputs for deterministic workflow checks." },
                  { term: "Trajectory", desc: "Typed turns and tool calls for agent path evaluation." },
                  { term: "Metric", desc: "A stateless scoring function with thresholded pass/fail behavior." },
                  { term: "Precheck", desc: "Conditional wrapper that gates expensive metrics behind cheap checks." },
                  { term: "Repeat", desc: "Wrapper for repeated runs, pass-rate aggregation, and score variance." },
                  { term: "Eval Profiles", desc: "Named goeval.json run shapes for packages, tiers, results, and prerequisites." },
                  { term: "Prerequisite Checks", desc: "Env, file, TCP, or custom checks that can skip or fail a profile before go test runs." },
                  { term: "Compare Policies", desc: "Policies for score tolerance, stable identity, and regression behavior." },
                  { term: "Reliability Summaries", desc: "Pass rates, p95 latency/tokens, scenario totals, metadata groups, and flaky identities." },
                  { term: "Stable Case IDs", desc: "Case metadata identities that survive test renames across result comparisons." },
                  { term: "TierFilter", desc: "GOEVAL_TIER-driven case slicing when DefaultTierFilter is installed." },
                  { term: "Normalizer", desc: "String comparison hook for deterministic checks where case or accents vary." },
                  { term: "Judge", desc: "Concurrency-safe LLM-as-judge implementation returning scores and reasons." },
                  { term: "Runner", desc: "Executes cases with metrics, handles GOEVAL gating, assertions, and result sinks." },
                  { term: "CaseMetadata", desc: "Standard keys such as flow, tier, and dataset for filtering and reports." },
                  { term: "MockJudge", desc: "Scripted judge for tests that should not call an LLM." },
                ].map((item) => (
                  <div
                    key={item.term}
                    onClick={() => setSelectedConcept(item.term)}
                    className="p-4 border border-[var(--border)] rounded-md bg-[var(--surface)] cursor-pointer hover:border-[var(--accent)] transition-colors"
                  >
                    <dt className="font-mono font-semibold text-[var(--accent)]">{item.term}</dt>
                    <dd className="mt-1 text-sm text-[var(--secondary)]">{item.desc}</dd>
                  </div>
                ))}
              </div>
            </section>
          </main>
        </div>
      </div>

      <footer className="border-t border-[var(--border)] bg-[var(--surface)]">
        <div className="mx-auto max-w-7xl px-4 py-6 md:px-8">
          <p className="text-sm text-[var(--muted)]">
            go-eval v0.9 - MIT License -{" "}
            <a href="https://github.com/igcodinap/go-eval" className="text-[var(--accent)]">github.com/igcodinap/go-eval</a>
          </p>
        </div>
      </footer>

      <SlideOver
        isOpen={selectedMetric !== null}
        onClose={() => setSelectedMetric(null)}
        title={selectedMetric || ""}
      >
        {selectedMetric && metricDetails[selectedMetric] && (
          <MetricDetailPanel metric={metricDetails[selectedMetric]} />
        )}
      </SlideOver>

      <SlideOver
        isOpen={selectedBenchMetric !== null}
        onClose={() => setSelectedBenchMetric(null)}
        title={selectedBenchMetric || ""}
      >
        {selectedBenchMetric && benchmarkMetricDetails[selectedBenchMetric] && (
          <BenchmarkMetricPanel metric={benchmarkMetricDetails[selectedBenchMetric]} />
        )}
      </SlideOver>

      <SlideOver
        isOpen={selectedConcept !== null}
        onClose={() => setSelectedConcept(null)}
        title={selectedConcept || ""}
      >
        {selectedConcept && conceptDetails[selectedConcept] && (
          <ConceptPanel concept={conceptDetails[selectedConcept]} />
        )}
      </SlideOver>
    </div>
  );
}
