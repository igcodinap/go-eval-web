export interface BenchmarkMetricDetail {
  label: string;
  description: string;
  details: string;
  example?: {
    code?: string;
    output?: string;
  };
}

export const benchmarkMetricDetails: Record<string, BenchmarkMetricDetail> = {
  "ns/op": {
    label: "ns/op",
    description: "Latency per judge call",
    details: `Go's built-in benchmark timing metric. Measures wall-clock time per evaluation operation in nanoseconds.

Lower is better. This is the baseline latency metric from Go's testing framework.

Use this to track:
- Judge API response time
- Network latency impact
- Prompt complexity effects`,
    example: {
      output: `BenchmarkFaithfulness-8    128    9452 ns/op`,
    },
  },
  "tokens/op": {
    label: "tokens/op",
    description: "Mean tokens consumed per call",
    details: `Average number of tokens (input + output) consumed per judge call. Reported via Go's \`ReportMetric\` API.

Use this to track:
- Cost per evaluation (tokens × model price)
- Prompt verbosity impact
- Context length effects

Cost calculation: \`tokens × price_per_token = cost_per_eval\``,
  },
  "score_mean": {
    label: "score_mean",
    description: "Average score across iterations",
    details: `Mean evaluation score across all benchmark iterations (0.0 to 1.0).

Use this to track:
- Response quality over time
- Model or prompt changes impact
- Consistency of outputs

Note: Score mean alone doesn't tell the whole story — pair with score_stddev for complete picture.`,
  },
  "score_stddev": {
    label: "score_stddev",
    description: "Score consistency across runs",
    details: `Population standard deviation of scores across benchmark iterations.

Lower = more consistent outputs. High stddev suggests unstable behavior.

Use this to track:
- Output quality consistency
- Edge cases that produce varying scores
- Flaky evaluation scenarios

Guide: <0.05 = consistent, 0.05-0.15 = moderate variance, >0.15 = high variance`,
  },
};

export interface ConceptDetail {
  term: string;
  description: string;
  details: string;
  example?: {
    code?: string;
    output?: string;
  };
}

export const conceptDetails: Record<string, ConceptDetail> = {
  Case: {
    term: "Case",
    description: "Input, output, context, artifacts, trajectory data, metadata, and optional timeout for one evaluation case.",
    details: `The fundamental unit of evaluation. A Case represents one test scenario with:

- \`Input\` — the question or prompt to evaluate
- \`Output\` — your LLM's response (what you're testing)
- \`Context\` — optional RAG context documents
- \`Expected\` — optional expected value for deterministic checks
- \`Artifacts\` — named structured JSON outputs for deterministic workflow checks
- \`Turns\` — typed conversation or agent trajectory steps
- \`ExpectedToolCalls\` — expected tool calls used by trajectory metrics
- \`Metadata\` — custom key-value data for filtering and reports
- \`Timeout\` — per-case execution limit when this case needs a tighter or looser bound

As of v0.4, external callers should use keyed struct literals such as \`eval.Case{Input: "..."}\`.`,
    example: {
      code: `c := eval.Case{
	Input:   "What's the capital of France?",
	Output:  "Paris is the capital of France.",
	Context: []string{"Paris is the capital of France."},
	Metadata: map[string]any{
		"user_id": "abc123",
		"source":  "rag_pipeline",
	},
}`,
    },
  },
  Artifacts: {
    term: "Artifacts",
    description: "Named structured JSON outputs checked alongside text output.",
    details: `Artifacts let eval suites validate intermediate state, planner output, tool payloads, route data, budgets, and other structured workflow outputs before or alongside judge metrics.

Artifact values are \`json.RawMessage\`, so the core package stays stdlib-only and does not interpret artifact names. Common keys include \`trace\`, \`tools\`, \`route\`, \`state\`, and \`budget\`.

Use \`ArtifactExists\`, \`ArtifactNotExists\`, \`ArtifactJSONPath\`, \`ArtifactFieldCount\`, \`ArtifactNumberLTE\`, \`ArtifactArrayContains\`, \`ArtifactArrayNotContains\`, \`ArtifactArrayMinLen\`, and \`ArtifactSubset\` for deterministic checks. Artifact checks support wildcard paths such as \`stops[*].name\` and normalizers for string comparisons.`,
    example: {
      code: `c := eval.Case{
	Output: "Route is ready.",
	Artifacts: map[string]json.RawMessage{
		"route": json.RawMessage(\`{"status":"ready","total_minutes":98}\`),
	},
}

r.Run(t, eval.ArtifactJSONPath{
	Key: "route", Path: "status", Expected: "ready",
}, c)`,
    },
  },
  Trajectory: {
    term: "Trajectory",
    description: "Typed conversation turns and tool-call expectations for agent workflows.",
    details: `Trajectory checks use \`Case.Turns\` and \`Case.ExpectedToolCalls\` without leaving the normal Metric pipeline.

\`Turn\` stores role, content, optional speaker/tool labels, tool call IDs, tool calls, and metadata. \`ToolCall\` stores name, JSON arguments, result, error, IDs, and metadata.

\`ToolCallAccuracy\` supports \`MatchStrict\`, \`MatchUnordered\`, \`MatchSubset\`, and \`MatchSuperset\`. \`ToolCallF1\`, \`RequiredTools\`, \`ForbiddenTool\`, and \`StepBudget\` cover looser matching, required tool paths, policy gates, and tool-call budgets. Required and forbidden tool checks also support glob-style patterns.`,
    example: {
      code: `c := eval.Case{
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

r.Run(t, eval.ToolCallAccuracy{Mode: eval.MatchStrict, MatchArgs: true}, c)`,
    },
  },
  Scenario: {
    term: "Scenario",
    description: "Ordered multi-step agent evaluation with accumulated history, artifacts, and state.",
    details: `Use \`Runner.RunScenario\` when correctness depends on step order, tool policy, state passed between driver calls, or expected-failure steps.

A \`Scenario\` has a name, tier, optional metadata, initial state, optional tool registry, a driver function, ordered \`Step\` values, and optional \`ScenarioRepeat\`. Each step can define required tools, forbidden tools, pattern policies, a max tool-call budget, checks, timeout, metadata, and \`ExpectFail\`.

The driver receives \`StepRequest\` with accumulated history, artifacts, and state, then returns only the new output, turns, artifacts, metadata, and state for that step. Scenario runs can write a \`_scenario_summary\` JSONL row with step summaries, emitted artifact keys, failed metrics, and repeat pass rate.`,
    example: {
      code: `result := r.RunScenario(t, eval.Scenario{
	Name:   "planning_to_route_ready",
	Tier:   "critical",
	State:  map[string]any{"locale": "es-CL"},
	Repeat: eval.ScenarioRepeat{N: 3, PassRate: 2.0 / 3.0},
	Driver: runAgentStep,
	Steps: []eval.Step{
		{Name: "greeting", Input: "Hola", ForbiddenToolPatterns: []string{"plan_*"}},
		{
			Name: "ready_route",
			Input: "Propón la ruta",
			RequiredToolPatterns: []string{"plan_*"},
			Timeout: 3 * time.Second,
			Checks: []eval.Metric{
				eval.NewContract("ready_route",
					eval.ArtifactJSONPath{Key: "route", Path: "status", Expected: "ready"},
				),
			},
		},
	},
})`,
    },
  },
  Contract: {
    term: "Contract",
    description: "A named group of checks that reports one pass/fail result with per-check dimensions.",
    details: `\`Contract\` is useful when a step has several deterministic invariants that should read as one business-level requirement, such as "ready route" or "safe checkout".

It runs each check, records the score/pass/reason for every check as dimensions, and fails if any check fails. Set \`StopOnFailure\` when later checks are noisy or less useful after the first broken invariant.`,
    example: {
      code: `eval.Contract{
	ContractName: "ready_route",
	Checks: []eval.Metric{
		eval.ArtifactJSONPath{Key: "route", Path: "status", Expected: "ready"},
		eval.ArtifactArrayMinLen{Key: "route", Path: "stops", MinLen: 2},
		eval.OutputLengthBudget{MaxWords: 180},
	},
}`,
    },
  },
  CaseMetadata: {
    term: "Case Metadata",
    description: "Standard keys for categorizing and filtering evaluation cases.",
    details: `Case metadata is user-defined but follow these conventions for consistency:

| Key | Type | Purpose |
|-----|------|---------|
| \`flow\` | string | Logical agent flow exercised (e.g. \`rag.retrieval\`, \`tool_use.search\`) |
| \`tier\` | string | Case selection tier: \`critical\`, \`standard\`, or \`extended\` |
| \`dataset\` | string | Dataset name and version/provenance |

Metadata is copied into JSONL results by \`Runner\`. Use \`DefaultTierFilter\` to run selected tiers by \`GOEVAL_TIER\`, or \`WithCaseFilter\` for custom predicates.`,
    example: {
      code: `c := eval.Case{
	Input:   "What's the capital of France?",
	Output:  myRAG.Answer("What's the capital of France?"),
	Context: []string{"Paris is the capital of France."},
	Metadata: map[string]any{
		"flow":   "rag.retrieval",
		"tier":   "critical",
		"dataset": "french-geo-v1",
	},
}`,
    },
  },
  MockJudge: {
    term: "MockJudge",
    description: "Scripted judge implementation for testing without an LLM.",
    details: `Use \`MockJudge\` to test evaluation logic without calling a real LLM. It returns predefined scores and reasons, enabling deterministic test runs.

Perfect for:
- Unit testing eval suites
- CI pipelines without API costs
- Developing metric configurations`,
    example: {
      code: `judge := &eval.MockJudge{
	Response: eval.JudgeResponse{
		Score:  0.85,
		Reason: "Mock response for testing",
	},
}

r := eval.NewRunner(judge)
c := eval.Case{Input: "...", Output: "..."}
r.Run(t, eval.Faithfulness{Threshold: 0.8}, c)`,
    },
  },
  Precheck: {
    term: "Precheck",
    description: "Conditional wrapper that skips expensive LLM metrics if a pre-check fails.",
    details: `Precheck runs a deterministic metric first (like \`Contains\` or \`Regex\`). If the pre-check fails, the main LLM metric is skipped entirely—saving cost and latency.

This pattern is ideal for:
- Gating expensive evaluations behind fast format checks
- Early-exit on obvious failures
- Reducing LLM API calls in CI`,
    example: {
      code: `r.Run(t, eval.Precheck{
	Pre:  eval.Contains{},
	Main: eval.Compound{
		Dimensions: []eval.Dimension{
			{Name: "helpfulness", Rubric: "...", Threshold: 0.7},
		},
	},
}, eval.Case{
	Output:   "You can cancel from Billing.",
	Expected: "cancel",
})`,
    },
  },
  Metric: {
    term: "Metric",
    description: "A scoring function (Faithfulness, Contains, etc.) with a threshold and optional configuration.",
    details: `The evaluation function. Metrics implement the \`Metric\` interface and return a \`Result\` with score, pass/fail, and reasoning.

Available metrics:
- **LLM-as-Judge**: Faithfulness, Hallucination, AnswerRelevancy, ContextPrecision, GEval, Compound
- **Deterministic**: Contains, Regex, JSONPath, FieldCount, artifact metrics, OutputLengthBudget
- **Trajectory**: ToolCallAccuracy, ToolCallF1, RequiredTools, ForbiddenTool, StepBudget
- **Wrappers / groups**: Precheck, Repeat, Contract, WithTokenBudget, WithLatencyBudget

Each metric has configurable parameters and a \`Threshold\` that determines pass/fail.`,
    example: {
      code: `// LLM-as-Judge metric
r.Run(t, eval.Faithfulness{Threshold: 0.8}, c)

// Deterministic metric
r.Run(t, eval.Contains{}, eval.Case{
	Output:   "hello world",
	Expected: "hello",
})`,
    },
  },
  Judge: {
    term: "Judge",
    description: "Your implementation of LLM-as-judge. Receives prompts, returns scores with reasoning.",
    details: `The Judge is your abstraction over the LLM. You implement the \`Judge\` interface and go-eval handles the rest.

Required method:
\`Evaluate(ctx context.Context, prompt string) (JudgeResponse, error)\`

The prompt is constructed by go-eval based on the metric and case. Your judge returns a score (0.0-1.0) and optional reasoning.

go-eval provides helper judges like \`MockJudge\` for testing, or you can wrap any LLM provider (OpenAI, Anthropic, local, etc.).

\`RawJudge\` is an optional extension for metrics that need raw model text. \`Compound\` requires a judge that implements \`RawJudge\`; the OpenAI adapter implements both interfaces.`,
    example: {
      code: `type MyJudge struct {
	client *openai.Client
}

func (j *MyJudge) Evaluate(ctx context.Context, prompt string) (eval.JudgeResponse, error) {
	resp, err := j.client.Chat.Completions.Create(ctx, openai.ChatCompletionInput{
		Model: "gpt-4",
		Messages: []openai.Message{{Role: "user", Content: prompt}},
	})
	if err != nil {
		return eval.JudgeResponse{}, err
	}
	// Parse response into score + reasoning
	return parseResponse(resp)
}`,
    },
  },
  Runner: {
    term: "Runner",
    description: "Executes Cases with Metrics. Handles parallelism, subtests, and result aggregation.",
    details: `The Runner orchestrates evaluation. It takes a Judge, executes Cases with Metrics, and collects results.

Features:
- Concurrent execution of cases
- Subtest isolation (each \`r.Run\` is a separate subtest)
- Result aggregation and reporting
- Benchmark support via \`eval.Bench\`
- Optional ResultSink for JSONL persistence
- Per-runner default timeout, per-case timeout, and per-step timeout
- Optional \`DefaultTierFilter\` for \`GOEVAL_TIER\`-driven CI slices

The Runner is safe to share across parallel tests via \`t.Parallel()\`.`,
    example: {
      code: `r := eval.NewRunner(judge)

func TestRAG(t *testing.T) {
	c := eval.Case{Input: "...", Output: "...", Context: docs}

	r.Run(t, eval.Faithfulness{Threshold: 0.8}, c)
	r.Run(t, eval.Hallucination{Threshold: 0.9}, c)
}`,
    },
  },
  Repeat: {
    term: "Repeat",
    description: "Run metrics more than once and aggregate pass-rate and score variance.",
    details: `Repeat is useful when a judge metric is nondeterministic enough that one sample is not representative.

\`Repeat\` returns the mean score, aggregate token and latency counts, plus dimensions for pass rate, mean score, standard deviation, minimum score, and maximum score. \`RepeatN\` is the helper that requires every repeated run to pass.`,
    example: {
      code: `r.Run(t, eval.Repeat{
	Metric:   eval.Faithfulness{Threshold: 0.8},
	N:        3,
	PassRate: 2.0 / 3.0,
}, c)`,
    },
  },
  TierFilter: {
    term: "Tier Filter",
    description: "Opt-in runner filter that uses GOEVAL_TIER to run critical, standard, or extended case slices.",
    details: `\`DefaultTierFilter()\` reads \`GOEVAL_TIER\` only when installed on the runner.

This keeps normal behavior explicit: a runner without \`DefaultTierFilter()\` ignores \`GOEVAL_TIER\`. Multiple tiers are comma-separated, such as \`critical,standard\`. Use this for fast CI on critical cases and scheduled runs over the full suite.`,
    example: {
      code: `r := eval.NewRunner(judge, eval.DefaultTierFilter())

// shell:
// GOEVAL=1 GOEVAL_TIER=critical go test ./...`,
    },
  },
  "Eval Profiles": {
    term: "Eval Profiles",
    description: "A goeval.json run shape for packages, tiers, result directories, and prerequisites.",
    details: `v0.9 adds profile-aware eval operations through \`goeval.json\`. A profile can name packages, tiers, a result directory, and prerequisites for a specific run shape.

Use profiles for PR smoke checks, nightly broader suites, provider-specific evals, and release gates. \`goeval test --profile\` sets \`GOEVAL=1\`, applies profile tier and result settings, checks prerequisites, then delegates to \`go test\`.`,
    example: {
      code: `{
  "profiles": {
    "pr": {
      "packages": ["./..."],
      "tiers": ["critical"],
      "results_dir": ".goeval/pr"
    }
  }
}

// shell:
// goeval test --profile pr`,
    },
  },
  "Prerequisite Checks": {
    term: "Prerequisite Checks",
    description: "A required env var, file, TCP endpoint, or custom check before an eval profile runs.",
    details: `Prerequisites keep expensive or provider-specific eval suites honest about what they need. Profiles can declare manifest prerequisites, and tests can call \`eval.Require\` directly.

Missing manifest prerequisites skip the profile by default. Set \`"missing_prerequisite": "fail"\` for release-style gates where missing credentials or services should fail the run.`,
    example: {
      code: `eval.Require(t,
	eval.Env("GEMINI_API_KEY"),
	eval.File("testdata/routes.json"),
	eval.TCP("local routing db", "127.0.0.1:5432"),
)`,
    },
  },
  "Compare Policies": {
    term: "Compare Policies",
    description: "Policy for score tolerances, stable identity, JSON output, and regression behavior.",
    details: `Compare policies can live in \`goeval.json\` or a standalone policy file. They define case identity, score tolerances, and whether missing rows or regressions fail the command.

Use per-metric or per-tier tolerances when different parts of a suite have different noise budgets. Use JSON output when CI or dashboards need machine-readable regression details.`,
    example: {
      code: `goeval compare --policy goeval.json --format json old/results.jsonl new/results.jsonl
goeval compare --case-id-key case_id --score-tolerance 0.02 old.jsonl new.jsonl
goeval compare --fail-on-regression=false old.jsonl new.jsonl`,
    },
  },
  "Reliability Summaries": {
    term: "Reliability Summaries",
    description: "Pass rates, p95 latency/tokens, metadata groups, scenario totals, and flaky identities.",
    details: `v0.9 summaries go beyond metric means. Summary APIs and \`goeval summarize\` can report pass rates, p95 latency and token usage, tier/flow/dataset/case groupings, scenario run totals, and repeated-case identities that look flaky.

Use summary policies when the same identity and flaky-score thresholds should apply across compare and summarize workflows.`,
    example: {
      code: `goeval summarize --policy goeval.json .goeval/pr/results.jsonl`,
    },
  },
  "Stable Case IDs": {
    term: "Stable Case IDs",
    description: "Case metadata identity that survives test renames across result comparisons.",
    details: `Default comparisons match rows by test name and metric. v0.9 adds \`compare.StableCaseIDFromMetadata\` for suites that store stable IDs in metadata and need results to keep matching after test names move or change.

The conventional key is \`Case.Metadata["case_id"]\`, but policies can choose a different \`case_id_key\`. Rows without the metadata key fall back to test name and metric.`,
    example: {
      code: `report := compare.CompareWithOptions(
	baseline,
	current,
	compare.Options{Identity: compare.StableCaseIDFromMetadata("")},
)`,
    },
  },
  Normalizer: {
    term: "Normalizer",
    description: "String comparison hook for deterministic checks where case or accents should not matter.",
    details: `Normalizers rewrite text before deterministic string comparison. Built-in normalizers include \`CaseFoldNormalizer\`, \`SpanishASCIIFoldNormalizer\`, and \`ChainNormalizers\`.

Use them for artifact comparisons where the product behavior is correct even if casing or Spanish accents vary.`,
    example: {
      code: `fold := eval.ChainNormalizers(
	eval.CaseFoldNormalizer(),
	eval.SpanishASCIIFoldNormalizer(),
)

r.Run(t, eval.ArtifactArrayContains{
	Key: "route", Path: "stops[*].name", Expected: "pajaritos", Normalizer: fold,
}, c)`,
    },
  },
};
