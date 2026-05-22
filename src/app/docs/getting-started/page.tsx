import Link from "next/link";
import { orderedMetricDetails, MetricDetail } from "@/data/metric-details";

const useCases = [
  "RAG response quality checks in go test",
  "Deterministic output validation for JSON and artifacts",
  "Agent trajectory checks for tool-use workflows",
  "Prompt or model regression checks in CI pipelines",
  "Repeatability checks for flaky judge metrics",
];

const concepts = [
  { term: "Case", desc: "Input, output, expected value, context, artifacts, turns, expected tool calls, and metadata." },
  { term: "Metric", desc: "Stateless scorer with thresholded pass/fail behavior." },
  { term: "Judge", desc: "Concurrency-safe LLM-as-judge implementation returning scores and reasons." },
  { term: "Runner", desc: "Executes Cases with Metrics and handles GOEVAL gating, result sinks, and assertions." },
  { term: "Artifact", desc: "Named structured JSON output checked deterministically." },
  { term: "Trajectory", desc: "Typed turns and expected tool calls for agent path evaluation." },
];

const docsSections = [
  { id: "use-cases", title: "Use Cases" },
  { id: "concepts", title: "Concepts" },
  { id: "first-run", title: "First Test Run" },
  { id: "metrics-overview", title: "Metrics Overview" },
  { id: "deterministic", title: "Deterministic" },
  { id: "artifacts", title: "Artifacts" },
  { id: "trajectory", title: "Trajectory" },
  { id: "repeat", title: "Repeat" },
  { id: "results", title: "Results" },
  { id: "cli", title: "CLI" },
  { id: "ci-cd", title: "CI/CD" },
  { id: "troubleshooting", title: "Troubleshooting" },
];

const metricTypeLabels: Record<MetricDetail["type"], string> = {
  judge: "LLM-as-judge",
  deterministic: "Deterministic",
  trajectory: "Trajectory",
  wrapper: "Wrapper",
};

const metrics = orderedMetricDetails;

export default function GettingStartedPage() {
  return (
    <article>
      <div className="mb-6 text-sm text-[var(--muted)]">
        <Link href="/" className="hover:text-[var(--foreground)]">Home</Link>
        <span className="mx-2">/</span>
        <span className="text-[var(--foreground)]">Docs</span>
        <span className="mx-2">/</span>
        <span className="text-[var(--foreground)]">Getting Started</span>
      </div>

      <h1 className="mb-4 text-4xl font-bold">Getting Started</h1>
      <p className="text-lg text-[var(--secondary)] leading-relaxed">
        go-eval v0.6 is an open-source evaluation toolkit for Go teams building LLM products. It runs inside <code>go test</code>, stays opt-in through <code>GOEVAL=1</code>, and covers judge metrics, deterministic checks, structured artifacts, tool trajectories, result comparison, and summaries.
      </p>

      <nav className="mt-6 flex flex-wrap gap-2 text-sm">
        {docsSections.map((section) => (
          <a key={section.id} href={`#${section.id}`} className="text-[var(--accent)] hover:underline">
            {section.title}
          </a>
        ))}
      </nav>

      <section id="use-cases" className="mt-12 scroll-mt-20">
        <h2 className="mb-4 text-2xl font-semibold border-b border-[var(--border)] pb-2">Use Cases</h2>
        <ul className="mt-4 space-y-2">
          {useCases.map((useCase) => (
            <li key={useCase} className="flex items-center gap-3 py-2 text-[var(--secondary)]">
              <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent)]" />
              {useCase}
            </li>
          ))}
        </ul>
      </section>

      <section id="concepts" className="mt-12 scroll-mt-20">
        <h2 className="mb-4 text-2xl font-semibold border-b border-[var(--border)] pb-2">Core Concepts</h2>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          {concepts.map((item) => (
            <div key={item.term} className="p-4 border border-[var(--border)] rounded-md bg-[var(--surface)]">
              <dt className="font-mono font-semibold text-[var(--accent)]">{item.term}</dt>
              <dd className="mt-1 text-sm text-[var(--secondary)]">{item.desc}</dd>
            </div>
          ))}
        </div>
      </section>

      <section id="first-run" className="mt-12 scroll-mt-20">
        <h2 className="mb-4 text-2xl font-semibold border-b border-[var(--border)] pb-2">Create Your First Test Run</h2>
        <p className="text-[var(--secondary)]">
          Start with keyed <code>eval.Case</code> literals, a cheap deterministic check, and one judge metric. Keyed case literals are required by v0.4 and later because <code>Case</code> has a private blank field.
        </p>
        <pre className="mt-4 bg-[var(--code-bg)] border border-[var(--border)] rounded-md px-4 py-3 font-mono text-sm overflow-x-auto">
          <code>{`package yourpkg_test

import (
	"testing"

	eval "github.com/igcodinap/go-eval"
)

func TestSupportReply(t *testing.T) {
	runner := eval.NewRunner(openAIJudge, eval.WithResultSink(eval.DefaultResultSink()))

	c := eval.Case{
		Input:    "How do I cancel my plan?",
		Output:   "You can cancel from Billing > Subscription.",
		Expected: "cancel",
		Metadata: map[string]any{
			"flow": "support.reply", "tier": "critical", "dataset": "support/v1",
		},
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

      <section id="metrics-overview" className="mt-12 scroll-mt-20">
        <h2 className="mb-4 text-2xl font-semibold border-b border-[var(--border)] pb-2">Metrics Overview</h2>
        <div className="mt-4 overflow-x-auto">
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
              {metrics.map((m, i) => (
                <tr key={m.name} className={`border-b border-[var(--table-border)] ${i % 2 === 0 ? "bg-[var(--table-stripe)]" : ""}`}>
                  <td className="py-2.5 font-mono text-[var(--accent)]">{m.name}</td>
                  <td className="py-2.5"><span className={`metric-tag ${m.type}`}>{metricTypeLabels[m.type]}</span></td>
                  <td className="py-2.5 text-[var(--secondary)]">{m.purpose}</td>
                  <td className="py-2.5 font-mono text-[var(--muted)]">{m.threshold}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section id="deterministic" className="mt-12 scroll-mt-20">
        <h2 className="mb-4 text-2xl font-semibold border-b border-[var(--border)] pb-2">Deterministic Metrics</h2>
        <p className="text-[var(--secondary)]">
          Deterministic metrics do not call an LLM judge. They are fast, cheap, and reproducible, making them useful for prechecks and structured output validation.
        </p>
        <div className="mt-4 grid gap-3 md:grid-cols-2">
          {["Contains", "Regex", "JSONPath", "FieldCount"].map((name) => (
            <div key={name} className="p-3 border border-[var(--border)] rounded-md bg-[var(--surface)]">
              <span className="font-mono text-[var(--accent)]">{name}</span>
              <p className="mt-1 text-xs text-[var(--muted)]">Binary pass/fail based on exact criteria.</p>
            </div>
          ))}
        </div>
      </section>

      <section id="artifacts" className="mt-12 scroll-mt-20">
        <h2 className="mb-4 text-2xl font-semibold border-b border-[var(--border)] pb-2">Artifact Checks</h2>
        <p className="text-[var(--secondary)]">
          Use <code>Case.Artifacts</code> for named JSON payloads that should be validated separately from final prose: route state, planner output, budget data, tool traces, or workflow state.
        </p>
        <pre className="mt-4 bg-[var(--code-bg)] border border-[var(--border)] rounded-md px-4 py-3 font-mono text-sm overflow-x-auto">
          <code>{`c := eval.Case{
	Output: "Route is ready.",
	Artifacts: map[string]json.RawMessage{
		"route": json.RawMessage(\`{"status":"ready","total_minutes":98,"stops":["Pajaritos"]}\`),
	},
}

r.Run(t, eval.ArtifactExists{Key: "route"}, c)
r.Run(t, eval.ArtifactJSONPath{Key: "route", Path: "status", Expected: "ready"}, c)
r.Run(t, eval.ArtifactNumberLTE{Key: "route", Path: "total_minutes", Max: 120}, c)
r.Run(t, eval.ArtifactArrayContains{Key: "route", Path: "stops", Expected: "Pajaritos"}, c)`}</code>
        </pre>
      </section>

      <section id="trajectory" className="mt-12 scroll-mt-20">
        <h2 className="mb-4 text-2xl font-semibold border-b border-[var(--border)] pb-2">Trajectory Checks</h2>
        <p className="text-[var(--secondary)]">
          Use <code>Case.Turns</code> and <code>Case.ExpectedToolCalls</code> for conversation and tool-use workflows. JSON datasets can include optional <code>turns</code> and <code>expected_tool_calls</code> fields.
        </p>
        <pre className="mt-4 bg-[var(--code-bg)] border border-[var(--border)] rounded-md px-4 py-3 font-mono text-sm overflow-x-auto">
          <code>{`c := eval.Case{
	Input:  "Where is order 42?",
	Output: "Order 42 arrives tomorrow.",
	Turns: []eval.Turn{
		{Role: eval.RoleUser, Content: "Where is order 42?"},
		{Role: eval.RoleAssistant, ToolCalls: []eval.ToolCall{
			{
				Name:      "orders.lookup",
				Arguments: json.RawMessage(\`{"order_id":"42"}\`),
				Result:    "delivery_date=tomorrow",
			},
		}},
	},
	ExpectedToolCalls: []eval.ToolCall{
		{Name: "orders.lookup", Arguments: json.RawMessage(\`{"order_id":"42"}\`)},
	},
}

r.Run(t, eval.ToolCallAccuracy{Mode: eval.MatchStrict, MatchArgs: true}, c)
r.Run(t, eval.ToolCallF1{MatchArgs: true, Threshold: 0.8}, c)
r.Run(t, eval.ForbiddenTool{Names: []string{"orders.refund"}}, c)
r.Run(t, eval.StepBudget{MaxSteps: 1}, c)`}</code>
        </pre>
        <p className="mt-3 text-sm text-[var(--muted)]">
          <code>ToolCallAccuracy</code> supports <code>MatchStrict</code>, <code>MatchUnordered</code>, <code>MatchSubset</code>, and <code>MatchSuperset</code>. Arguments compare as normalized JSON when <code>MatchArgs</code> is enabled.
        </p>
      </section>

      <section id="repeat" className="mt-12 scroll-mt-20">
        <h2 className="mb-4 text-2xl font-semibold border-b border-[var(--border)] pb-2">Repeat And Budgets</h2>
        <p className="text-[var(--secondary)]">
          Wrap noisy judge metrics with <code>Repeat</code> when pass rate matters, or add token and latency budgets when resource usage is part of correctness.
        </p>
        <pre className="mt-4 bg-[var(--code-bg)] border border-[var(--border)] rounded-md px-4 py-3 font-mono text-sm overflow-x-auto">
          <code>{`r.Run(t, eval.Repeat{
	Metric:   eval.Faithfulness{Threshold: 0.8},
	N:        3,
	PassRate: 2.0 / 3.0,
}, c)

r.Run(t, eval.WithTokenBudget(1200, eval.Faithfulness{Threshold: 0.8}), c)
r.Run(t, eval.WithLatencyBudget(2*time.Second, eval.AnswerRelevancy{}), c)`}</code>
        </pre>
      </section>

      <section id="results" className="mt-12 scroll-mt-20">
        <h2 className="mb-4 text-2xl font-semibold border-b border-[var(--border)] pb-2">Save And Compare Results</h2>
        <p className="text-[var(--secondary)]">
          Add a result sink to persist JSONL rows. v0.6 can compare two result files or summarize one result file.
        </p>
        <pre className="mt-4 bg-[var(--code-bg)] border border-[var(--border)] rounded-md px-4 py-3 font-mono text-sm overflow-x-auto">
          <code>{`r := eval.NewRunner(judge, eval.WithResultSink(eval.DefaultResultSink()))

GOEVAL=1 GOEVAL_RESULTS_DIR=.eval-results go test ./...
goeval compare old/results.jsonl new/results.jsonl
goeval summarize .eval-results/results.jsonl`}</code>
        </pre>
        <p className="mt-3 text-sm text-[var(--muted)]">
          Use <code>compare.CaseIDFromMetadata</code> when the conventional <code>Case.Metadata[&quot;case_id&quot;]</code> key should identify rows across runs.
        </p>
      </section>

      <section id="cli" className="mt-12 scroll-mt-20">
        <h2 className="mb-4 text-2xl font-semibold border-b border-[var(--border)] pb-2">CLI</h2>
        <p className="text-[var(--secondary)]">
          Install the optional CLI for common workflows:
        </p>
        <pre className="mt-4 bg-[var(--code-bg)] border border-[var(--border)] rounded-md px-4 py-3 font-mono text-sm overflow-x-auto">
          <code>{`go install github.com/igcodinap/go-eval/cmd/goeval@latest

goeval test ./...
goeval compare old/results.jsonl new/results.jsonl
goeval summarize current/results.jsonl
goeval version`}</code>
        </pre>
      </section>

      <section id="ci-cd" className="mt-12 scroll-mt-20">
        <h2 className="mb-4 text-2xl font-semibold border-b border-[var(--border)] pb-2">CI/CD</h2>
        <p className="text-[var(--secondary)]">
          Enable evaluations explicitly with <code className="bg-[var(--code-bg)] px-1.5 py-0.5 rounded text-[var(--accent)]">GOEVAL=1</code>. Without it, evals skip and normal test runs stay fast.
        </p>
        <pre className="mt-4 bg-[var(--code-bg)] border border-[var(--border)] rounded-md px-4 py-3 font-mono text-sm overflow-x-auto">
          <code>{`# Enable evals
GOEVAL=1 go test ./...

# Save result rows
GOEVAL=1 GOEVAL_RESULTS_DIR=.eval-results go test ./...

# Trace judge prompts and responses when debugging
GOEVAL=1 GOEVAL_TRACE=1 go test -v ./...

# Critical tier only
r := eval.NewRunner(judge, eval.WithCaseFilter(func(c eval.Case) bool {
	return c.Metadata["tier"] == "critical"
}))`}</code>
        </pre>
      </section>

      <section id="troubleshooting" className="mt-12 scroll-mt-20">
        <h2 className="mb-4 text-2xl font-semibold border-b border-[var(--border)] pb-2">Troubleshooting</h2>
        <div className="mt-4 space-y-2">
          {[
            { q: "Evals are skipped unexpectedly", a: "Confirm GOEVAL=1 is set before running tests." },
            { q: "Trace output is missing", a: "Use both GOEVAL=1 and GOEVAL_TRACE=1, and run tests with -v so t.Log output is visible." },
            { q: "Judge calls fail intermittently", a: "Verify credentials, rate limits, and model availability. Use deterministic prechecks to reduce judge call volume." },
            { q: "Need detailed API reference", a: "Use package docs: go doc github.com/igcodinap/go-eval" },
          ].map((item) => (
            <details key={item.q} className="group p-4 border border-[var(--border)] rounded-md bg-[var(--surface)]">
              <summary className="cursor-pointer font-medium text-[var(--foreground)]">{item.q}</summary>
              <p className="mt-2 text-sm text-[var(--secondary)]">{item.a}</p>
            </details>
          ))}
        </div>
      </section>
    </article>
  );
}
