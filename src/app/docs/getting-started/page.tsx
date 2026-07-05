import Link from "next/link";
import { orderedMetricDetails, MetricDetail } from "@/data/metric-details";

const useCases = [
  "RAG response quality checks in go test",
  "Deterministic output validation for JSON and artifacts",
  "Agent trajectory checks for tool-use workflows",
  "Structured agent traces with spans, tool calls, and state deltas",
  "Reliable RawJudge execution with parsing, retries, caching, and diagnostics",
  "Post-hoc evaluation over stored cases and traces",
  "Ordered agent scenario contracts with per-step tool policies",
  "Tiered CI slices for critical, standard, and extended cases",
  "Profile-driven eval runs for PR, nightly, provider, and release gates",
  "Run manifest sidecars for CI artifacts and audit trails",
  "Prompt or model regression checks in CI pipelines",
  "Static HTML, Markdown, and JSON reports for review and CI artifacts",
  "Judge calibration and A/B variant comparison",
  "Policy-aware summaries and repeatability checks for flaky judge metrics",
];

const concepts = [
  { term: "Case", desc: "Input, output, expected value, context, artifacts, turns, traces, expected tool calls, metadata, and timeout." },
  { term: "Scenario", desc: "Ordered multi-step flow with accumulated history, artifacts, state, and repeats." },
  { term: "Contract", desc: "Named group of checks that reports one business-level result." },
  { term: "Metric", desc: "Stateless scorer with thresholded pass/fail behavior." },
  { term: "Judge", desc: "Concurrency-safe LLM-as-judge implementation returning scores and reasons." },
  { term: "Runner", desc: "Executes Cases with Metrics and handles GOEVAL gating, result sinks, and assertions." },
  { term: "Artifact", desc: "Named structured JSON output checked deterministically." },
  { term: "Trajectory", desc: "Typed turns, required tools, forbidden tools, and expected tool calls." },
  { term: "Trace", desc: "Structured agent execution with spans, tool calls, artifact records, and state deltas." },
  { term: "Judge Executor", desc: "RawJudge wrapper with JSON parsing, retries, concurrency limits, cache, and diagnostics." },
  { term: "Post-Hoc Evaluator", desc: "Programmatic metric runner for stored cases or traces outside testing.TB." },
  { term: "Trace Selectors", desc: "Helpers for mapping stored trace fields into Case input, output, expected, and context." },
  { term: "Run Manifest", desc: "goeval-run.json sidecar with schema versions, command, profile, paths, and timing metadata." },
  { term: "Eval Profiles", desc: "goeval.json run profiles for packages, tiers, result directories, and prerequisites." },
  { term: "Compare Policies", desc: "Baseline policies for score tolerances, stable case identity, and regression gates." },
  { term: "Reports", desc: "Static HTML, Markdown, or JSON evaluation reports from JSONL result files." },
];

const docsSections = [
  { id: "use-cases", title: "Use Cases" },
  { id: "concepts", title: "Concepts" },
  { id: "first-run", title: "First Test Run" },
  { id: "metrics-overview", title: "Metrics Overview" },
  { id: "deterministic", title: "Deterministic" },
  { id: "scenarios", title: "Scenarios" },
  { id: "contracts", title: "Contracts" },
  { id: "artifacts", title: "Artifacts" },
  { id: "trajectory", title: "Trajectory" },
  { id: "traces", title: "Traces" },
  { id: "judge-execution", title: "Judge Execution" },
  { id: "posthoc", title: "Post-Hoc" },
  { id: "tier-filtering", title: "Tier Filtering" },
  { id: "repeat", title: "Repeat" },
  { id: "eval-ops", title: "Eval Operations" },
  { id: "results", title: "Results" },
  { id: "reports", title: "Reports" },
  { id: "adapters", title: "Adapters" },
  { id: "cli", title: "CLI" },
  { id: "ci-cd", title: "CI/CD" },
  { id: "troubleshooting", title: "Troubleshooting" },
];

const metricTypeLabels: Record<MetricDetail["type"], string> = {
  judge: "LLM-as-Judge",
  deterministic: "Deterministic",
  trajectory: "Trajectory",
  wrapper: "Wrapper",
};

const metrics = orderedMetricDetails;

const deterministicHighlights = [
  { name: "Contains", desc: "Substring presence check." },
  { name: "Regex", desc: "Regular-expression output validation." },
  { name: "JSONPath", desc: "Exact value check at a JSON path." },
  { name: "FieldCount", desc: "Configurable minimum non-null JSON fields." },
  { name: "OutputLengthBudget", desc: "Configurable rune and word limits." },
  { name: "ArtifactSubset", desc: "Partial JSON structure validation." },
];

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
        go-eval v1.1 is an open-source evaluation toolkit for Go teams building LLM products. It runs inside <code>go test</code>, stays opt-in through <code>GOEVAL=1</code>, and covers judge metrics, deterministic checks, structured artifacts, tool trajectories, structured agent traces, reliable judge execution, post-hoc evaluation, run manifests, multi-step agent scenarios, profile-driven eval operations, result comparison, static reports, judge calibration, and policy-aware reliability summaries.
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
            <li key={useCase} className="flex items-start gap-3 py-2 text-[var(--secondary)]">
              <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--accent)]" />
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
          Deterministic metrics do not call an LLM judge. They are fast, cheap, and reproducible, making them useful for prechecks, output length budgets, tool policy checks, and structured output validation.
        </p>
        <div className="mt-4 grid gap-3 md:grid-cols-2">
          {deterministicHighlights.map((metric) => (
            <div key={metric.name} className="p-3 border border-[var(--border)] rounded-md bg-[var(--surface)]">
              <span className="font-mono text-[var(--accent)]">{metric.name}</span>
              <p className="mt-1 text-xs text-[var(--muted)]">{metric.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="scenarios" className="mt-12 scroll-mt-20">
        <h2 className="mb-4 text-2xl font-semibold border-b border-[var(--border)] pb-2">Agent Scenarios</h2>
        <p className="text-[var(--secondary)]">
          Use <code>Runner.RunScenario</code> for ordered multi-step agent flows where correctness depends on accumulated history, artifacts, state, tool policy, and per-step contracts.
        </p>
        <pre className="mt-4 bg-[var(--code-bg)] border border-[var(--border)] rounded-md px-4 py-3 font-mono text-sm overflow-x-auto">
          <code>{`r := eval.NewRunner(
	judge,
	eval.WithResultSink(eval.DefaultResultSink()),
	eval.DefaultTierFilter(),
)

result := r.RunScenario(t, eval.Scenario{
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
			Name: "greeting",
			Input: "Hola",
			ForbiddenToolPatterns: []string{"plan_*", "select_*"},
			Timeout: 500 * time.Millisecond,
		},
		{
			Name: "ready_route_request",
			Input: "Propón la ruta",
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
          Scenario result sinks include normal metric rows plus a <code>_scenario_summary</code> row with step names, tool calls, emitted artifact keys, failed metrics, repeat counts, and redacted metadata. Set <code>Step.ExpectFail</code> for negative cases that should fail their checks.
        </p>
      </section>

      <section id="contracts" className="mt-12 scroll-mt-20">
        <h2 className="mb-4 text-2xl font-semibold border-b border-[var(--border)] pb-2">Grouped Contracts</h2>
        <p className="text-[var(--secondary)]">
          Use <code>Contract</code> to group several checks into one named requirement. It keeps the report readable while preserving per-check dimensions for debugging.
        </p>
        <pre className="mt-4 bg-[var(--code-bg)] border border-[var(--border)] rounded-md px-4 py-3 font-mono text-sm overflow-x-auto">
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
	StopOnFailure: true,
}

r.Run(t, readyRoute, c)`}</code>
        </pre>
      </section>

      <section id="artifacts" className="mt-12 scroll-mt-20">
        <h2 className="mb-4 text-2xl font-semibold border-b border-[var(--border)] pb-2">Artifact Checks</h2>
        <p className="text-[var(--secondary)]">
          Use <code>Case.Artifacts</code> for named JSON payloads that should be validated separately from final prose: route state, planner output, budget data, tool traces, or workflow state. Artifact checks include absence checks, array exclusion, JSON subsets, wildcard paths, output length budgets, and normalizers.
        </p>
        <pre className="mt-4 bg-[var(--code-bg)] border border-[var(--border)] rounded-md px-4 py-3 font-mono text-sm overflow-x-auto">
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

fold := eval.ChainNormalizers(eval.CaseFoldNormalizer(), eval.SpanishASCIIFoldNormalizer())

r.Run(t, eval.ArtifactExists{Key: "route"}, c)
r.Run(t, eval.ArtifactJSONPath{Key: "route", Path: "status", Expected: "ready"}, c)
r.Run(t, eval.ArtifactNumberLTE{Key: "route", Path: "total_minutes", Max: 120}, c)
r.Run(t, eval.ArtifactArrayContains{
	Key: "route", Path: "stops[*].name", Expected: "pajaritos", Normalizer: fold,
}, c)
r.Run(t, eval.ArtifactArrayNotContains{Key: "route", Path: "stops[*].name", Expected: "Aeropuerto"}, c)
r.Run(t, eval.ArtifactSubset{Key: "route", Expected: json.RawMessage(\`{"status":"ready"}\`)}, c)`}</code>
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
r.Run(t, eval.RequiredTools{Patterns: []string{"orders.*"}}, c)
r.Run(t, eval.ForbiddenTool{Patterns: []string{"orders.refund*"}}, c)
r.Run(t, eval.StepBudget{MaxSteps: 1}, c)`}</code>
        </pre>
        <p className="mt-3 text-sm text-[var(--muted)]">
          <code>ToolCallAccuracy</code> supports <code>MatchStrict</code>, <code>MatchUnordered</code>, <code>MatchSubset</code>, and <code>MatchSuperset</code>. Arguments compare as normalized JSON when <code>MatchArgs</code> is enabled. Required and forbidden tool checks support exact names and glob-style patterns.
        </p>
      </section>

      <section id="traces" className="mt-12 scroll-mt-20">
        <h2 className="mb-4 text-2xl font-semibold border-b border-[var(--border)] pb-2">Structured Traces</h2>
        <p className="text-[var(--secondary)]">
          Use <code>Case.Trace</code> when your agent can emit structured spans, tool calls, artifact records, or state deltas. <code>Case.TraceID</code> and <code>Result.TraceID</code> link metric rows, scenario summaries, and trace records in downstream reports.
        </p>
        <pre className="mt-4 bg-[var(--code-bg)] border border-[var(--border)] rounded-md px-4 py-3 font-mono text-sm overflow-x-auto">
          <code>{`r := eval.NewRunner(
	judge,
	eval.WithResultSink(eval.DefaultResultSink()),
	eval.WithTraceSink(eval.DefaultTraceSink()),
)

c := eval.Case{
	Input:   "Find a route and charge the card",
	Output:  answer,
	TraceID: "route-42",
	Trace: &eval.Trace{
		ID:   "route-42",
		Name: "checkout_route",
		Spans: []eval.Span{{
			Name: "charge",
			Kind: "tool_call",
			ToolCall: &eval.ToolCall{
				Name:      "payments.charge",
				Arguments: json.RawMessage(\`{"amount":42}\`),
			},
		}},
	},
}`}</code>
        </pre>
        <p className="mt-3 text-sm text-[var(--muted)]">
          When <code>GOEVAL_RESULTS_DIR</code> is set, <code>DefaultTraceSink</code> writes <code>traces.jsonl</code> alongside <code>results.jsonl</code>. Trace writes use the same <code>WithRedactors</code> hooks as result JSONL. Tool-call metrics and scenario tool contracts read trace tool-call spans when present, falling back to <code>Case.Turns</code> for legacy evals.
        </p>
      </section>

      <section id="judge-execution" className="mt-12 scroll-mt-20">
        <h2 className="mb-4 text-2xl font-semibold border-b border-[var(--border)] pb-2">Reliable Judge Execution</h2>
        <p className="text-[var(--secondary)]">
          Wrap a <code>RawJudge</code> with <code>NewJudgeExecutor</code> when the provider returns raw model text. The executor adds strict JSON parsing, retries, concurrency limits, parsed-response caching, and optional JSONL attempt diagnostics.
        </p>
        <pre className="mt-4 bg-[var(--code-bg)] border border-[var(--border)] rounded-md px-4 py-3 font-mono text-sm overflow-x-auto">
          <code>{`raw := newMyRawJudge(t)
judge := eval.NewJudgeExecutor(
	raw,
	eval.WithJudgeExecutorAttempts(2),
	eval.WithJudgeExecutorConcurrency(4),
	eval.WithJudgeCache(eval.NewInMemoryJudgeCache()),
	eval.WithJudgeEventSink(eval.DefaultJudgeEventSink()),
)

r := eval.NewRunner(judge)`}</code>
        </pre>
        <p className="mt-3 text-sm text-[var(--muted)]">
          Cache entries are isolated per executor by default. Use <code>WithJudgeCacheNamespace</code> only when executors intentionally share the same judge, parser, and retry configuration.
        </p>
      </section>

      <section id="posthoc" className="mt-12 scroll-mt-20">
        <h2 className="mb-4 text-2xl font-semibold border-b border-[var(--border)] pb-2">Post-Hoc Evaluation</h2>
        <p className="text-[var(--secondary)]">
          Use <code>Evaluator</code> when you want the same metric contract outside <code>testing.TB</code>, such as replaying saved cases or turning stored traces into evaluation cases.
        </p>
        <pre className="mt-4 bg-[var(--code-bg)] border border-[var(--border)] rounded-md px-4 py-3 font-mono text-sm overflow-x-auto">
          <code>{`e := eval.NewEvaluator(
	judge,
	eval.WithEvaluatorResultSink(eval.NewJSONLResultSink("posthoc.jsonl")),
)

result, err := e.EvaluateNamed(ctx, "case/france", eval.Rubric{
	ID:        "answer-quality",
	Version:   "v1",
	Criteria:  "Answer directly and accurately.",
	Threshold: 0.8,
}, c)`}</code>
        </pre>
        <pre className="mt-4 bg-[var(--code-bg)] border border-[var(--border)] rounded-md px-4 py-3 font-mono text-sm overflow-x-auto">
          <code>{`selector := eval.TraceCaseSelector{
	Input:    eval.SpanInput("request"),
	Output:   eval.SpanOutput("answer"),
	Expected: eval.TraceMetadata("expected"),
}

traces, err := eval.ReadTraceJSONLFile("traces.jsonl")
if err != nil {
	return err
}
c, err := selector.CaseFromTrace(traces[0])`}</code>
        </pre>
        <pre className="mt-4 bg-[var(--code-bg)] border border-[var(--border)] rounded-md px-4 py-3 font-mono text-sm overflow-x-auto">
          <code>{`goeval eval --metric contains --dataset testdata/cases.json --out posthoc.jsonl
goeval summarize posthoc.jsonl`}</code>
        </pre>
        <p className="mt-3 text-sm text-[var(--muted)]">
          The <code>goeval eval</code> command supports deterministic <code>contains</code>, <code>regex</code>, <code>jsonpath</code>, and <code>field-count</code> checks over JSON datasets.
        </p>
      </section>

      <section id="tier-filtering" className="mt-12 scroll-mt-20">
        <h2 className="mb-4 text-2xl font-semibold border-b border-[var(--border)] pb-2">Tier Filtering</h2>
        <p className="text-[var(--secondary)]">
          Use <code>DefaultTierFilter</code> when you want <code>GOEVAL_TIER</code> to select only critical, standard, or extended cases. The filter is opt-in so ordinary runners ignore the environment variable.
        </p>
        <pre className="mt-4 bg-[var(--code-bg)] border border-[var(--border)] rounded-md px-4 py-3 font-mono text-sm overflow-x-auto">
          <code>{`r := eval.NewRunner(judge, eval.DefaultTierFilter())`}</code>
        </pre>
        <pre className="mt-4 bg-[var(--code-bg)] border border-[var(--border)] rounded-md px-4 py-3 font-mono text-sm overflow-x-auto">
          <code>{`# fast CI slice
GOEVAL=1 GOEVAL_TIER=critical go test ./...

# broader pre-merge slice
GOEVAL=1 GOEVAL_TIER=critical,standard go test ./...`}</code>
        </pre>
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
r.Run(t, eval.WithLatencyBudget(2*time.Second, eval.AnswerRelevancy{Threshold: 0.7}), c)`}</code>
        </pre>
      </section>

      <section id="eval-ops" className="mt-12 scroll-mt-20">
        <h2 className="mb-4 text-2xl font-semibold border-b border-[var(--border)] pb-2">Eval Operations</h2>
        <p className="text-[var(--secondary)]">
          Use <code>goeval.json</code> when a repo has different eval run shapes for PRs, nightly runs, provider-specific checks, or release gates. Profiles set <code>GOEVAL=1</code>, optional tiers, result directories, and prerequisites before delegating to <code>go test</code>.
        </p>
        <pre className="mt-4 bg-[var(--code-bg)] border border-[var(--border)] rounded-md px-4 py-3 font-mono text-sm overflow-x-auto">
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
goeval test --profile google --config goeval.json -run Route`}</code>
        </pre>
        <p className="mt-3 text-sm text-[var(--muted)]">
          Test code can also declare direct prerequisites with <code>eval.Require</code>, <code>eval.Env</code>, <code>eval.File</code>, <code>eval.TCP</code>, and <code>eval.Func</code>.
        </p>
      </section>

      <section id="results" className="mt-12 scroll-mt-20">
        <h2 className="mb-4 text-2xl font-semibold border-b border-[var(--border)] pb-2">Save And Compare Results</h2>
        <p className="text-[var(--secondary)]">
          Add a result sink to persist JSONL rows. go-eval can compare two result files with policy tolerances, summarize reliability from one result file, match stable case IDs across test renames, and write scenario summary rows for multi-step runs. Use <code>WithRedactors</code> when reasons or metadata may contain sensitive IDs.
        </p>
        <pre className="mt-4 bg-[var(--code-bg)] border border-[var(--border)] rounded-md px-4 py-3 font-mono text-sm overflow-x-auto">
          <code>{`r := eval.NewRunner(judge, eval.WithResultSink(eval.DefaultResultSink()))`}</code>
        </pre>
        <pre className="mt-4 bg-[var(--code-bg)] border border-[var(--border)] rounded-md px-4 py-3 font-mono text-sm overflow-x-auto">
          <code>{`GOEVAL=1 GOEVAL_RESULTS_DIR=.eval-results go test ./...
goeval compare --policy goeval.json --format json old/results.jsonl new/results.jsonl
goeval compare --case-id-key case_id --score-tolerance 0.02 old.jsonl new.jsonl
goeval compare --fail-on-regression=false old.jsonl new.jsonl
goeval summarize --policy goeval.json .eval-results/results.jsonl`}</code>
        </pre>
        <p className="mt-3 text-sm text-[var(--muted)]">
          Use <code>compare.StableCaseIDFromMetadata</code>, or a compare policy <code>case_id_key</code>, when the conventional <code>Case.Metadata[&quot;case_id&quot;]</code> key should identify rows across test renames. When <code>goeval test</code> writes into a results directory, it also writes <code>goeval-run.json</code> with schema versions, command, profile, paths, package list, and timing metadata.
        </p>
      </section>

      <section id="reports" className="mt-12 scroll-mt-20">
        <h2 className="mb-4 text-2xl font-semibold border-b border-[var(--border)] pb-2">Reports And Calibration</h2>
        <p className="text-[var(--secondary)]">
          Render static HTML, Markdown, or JSON reports from JSONL result files. Use calibration to analyze judge disagreement and compare A/B variants across repeated runs.
        </p>
        <pre className="mt-4 bg-[var(--code-bg)] border border-[var(--border)] rounded-md px-4 py-3 font-mono text-sm overflow-x-auto">
          <code>{`goeval report current/results.jsonl --out report.html
goeval report --baseline old/results.jsonl --current new/results.jsonl --format markdown
goeval calibrate --case-id-key case_id --judge-key judge current/results.jsonl
goeval calibrate --pairwise-key variant results.jsonl`}</code>
        </pre>
        <p className="mt-3 text-sm text-[var(--muted)]">
          When <code>--format</code> is omitted, <code>--out</code> must use <code>.html</code>, <code>.htm</code>, <code>.md</code>, <code>.markdown</code>, or <code>.json</code>. Calibration aggregates duplicate judge or variant rows by mean score.
        </p>
      </section>

      <section id="adapters" className="mt-12 scroll-mt-20">
        <h2 className="mb-4 text-2xl font-semibold border-b border-[var(--border)] pb-2">Judge Adapters</h2>
        <p className="text-[var(--secondary)]">
          Optional judge adapters live in separate modules so the core package stays stdlib-only. Use the Ollama adapter for local LLM-as-judge scoring, or the OpenAI adapter for cloud-based evaluation.
        </p>
        <pre className="mt-4 bg-[var(--code-bg)] border border-[var(--border)] rounded-md px-4 py-3 font-mono text-sm overflow-x-auto">
          <code>{`go get github.com/igcodinap/go-eval/adapters/ollama
go get github.com/igcodinap/go-eval/adapters/openai github.com/sashabaranov/go-openai`}</code>
        </pre>
        <pre className="mt-4 bg-[var(--code-bg)] border border-[var(--border)] rounded-md px-4 py-3 font-mono text-sm overflow-x-auto">
          <code>{`import ollamaeval "github.com/igcodinap/go-eval/adapters/ollama"

judge := ollamaeval.NewJudge("llama3.2")
r := eval.NewRunner(judge)

r.Run(t, eval.Faithfulness{Threshold: 0.8}, eval.Case{
	Input:   "What is the capital of France?",
	Output:  "Paris is the capital of France.",
	Context: []string{"Paris is the capital of France."},
})`}</code>
        </pre>
        <p className="mt-3 text-sm text-[var(--muted)]">
          For non-default servers, configure the local endpoint with <code>ollamaeval.WithBaseURL</code>. The OpenAI adapter implements both <code>Judge</code> and <code>RawJudge</code>, enabling <code>Compound</code> metrics.
        </p>
        <p className="mt-4 text-[var(--secondary)]">
          You can also implement your own <code>Judge</code> by wrapping any LLM provider. The interface requires a single method and must be safe for concurrent use:
        </p>
        <pre className="mt-4 bg-[var(--code-bg)] border border-[var(--border)] rounded-md px-4 py-3 font-mono text-sm overflow-x-auto">
          <code>{`type MyJudge struct{}

func (j *MyJudge) Evaluate(ctx context.Context, prompt string) (eval.JudgeResponse, error) {
	// 1. Send prompt to an LLM.
	// 2. Parse its JSON {"score": float, "reason": string} response.
	// 3. Return eval.JudgeResponse{Score, Reason, Tokens}.
	// Must be safe for concurrent use.
	return eval.JudgeResponse{}, nil
}`}</code>
        </pre>
      </section>

      <section id="cli" className="mt-12 scroll-mt-20">
        <h2 className="mb-4 text-2xl font-semibold border-b border-[var(--border)] pb-2">CLI</h2>
        <p className="text-[var(--secondary)]">
          Install the optional CLI for common workflows:
        </p>
        <pre className="mt-4 bg-[var(--code-bg)] border border-[var(--border)] rounded-md px-4 py-3 font-mono text-sm overflow-x-auto">
          <code>{`go install github.com/igcodinap/go-eval/cmd/goeval@latest

goeval test ./...
goeval test --profile pr
goeval compare --policy goeval.json old/results.jsonl new/results.jsonl
goeval summarize --policy goeval.json current/results.jsonl
goeval report current/results.jsonl --out report.html
goeval calibrate --judge-key judge current/results.jsonl
goeval eval --metric contains --dataset testdata/cases.json --out posthoc.jsonl
goeval version`}</code>
        </pre>
      </section>

      <section id="ci-cd" className="mt-12 scroll-mt-20">
        <h2 className="mb-4 text-2xl font-semibold border-b border-[var(--border)] pb-2">CI/CD</h2>
        <p className="text-[var(--secondary)]">
          Enable evaluations explicitly with <code className="bg-[var(--code-bg)] px-1.5 py-0.5 rounded text-[var(--accent)]">GOEVAL=1</code>. Without it, evals skip and normal test runs stay fast.
        </p>
        <p className="mt-3 text-[var(--secondary)]">
          Install <code>DefaultTierFilter</code> on the runner when CI should select tiers with <code>GOEVAL_TIER</code>, or let a <code>goeval.json</code> profile set the tier and result directory for each pipeline shape.
        </p>
        <pre className="mt-4 bg-[var(--code-bg)] border border-[var(--border)] rounded-md px-4 py-3 font-mono text-sm overflow-x-auto">
          <code>{`# Enable evals
GOEVAL=1 go test ./...

# Save result rows
GOEVAL=1 GOEVAL_RESULTS_DIR=.eval-results go test ./...

# Trace judge prompts and responses when debugging
GOEVAL=1 GOEVAL_TRACE=1 go test -v ./...

# Critical tier only
GOEVAL=1 GOEVAL_TIER=critical go test ./...

# Named PR profile
goeval test --profile pr`}</code>
        </pre>
      </section>

      <section id="troubleshooting" className="mt-12 scroll-mt-20">
        <h2 className="mb-4 text-2xl font-semibold border-b border-[var(--border)] pb-2">Troubleshooting</h2>
        <div className="mt-4 space-y-2">
          {[
            { q: "Evals are skipped unexpectedly", a: "Confirm GOEVAL=1 is set before running tests." },
            { q: "Trace output is missing", a: "Use both GOEVAL=1 and GOEVAL_TRACE=1, and run tests with -v so t.Log output is visible." },
            { q: "A profile skips instead of running", a: "Check goeval.json prerequisites. Missing prerequisites skip by default unless the profile sets missing_prerequisite to fail." },
            { q: "Comparisons drift after test renames", a: "Set a stable metadata case_id and compare with --case-id-key case_id or compare.StableCaseIDFromMetadata." },
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
