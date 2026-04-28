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
    description: "Input, expected output, context, and optional metadata for a single evaluation scenario.",
    details: `The fundamental unit of evaluation. A Case represents one test scenario with:

- \`Input\` — the question or prompt to evaluate
- \`Output\` — your LLM's response (what you're testing)
- \`Context\` — optional RAG context documents
- \`Expected\` — optional expected value for deterministic checks
- \`Metadata\` — custom key-value data for additional context`,
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
  CaseMetadata: {
    term: "Case Metadata",
    description: "Standard keys for categorizing and filtering evaluation cases.",
    details: `Case metadata is user-defined but follow these conventions for consistency:

| Key | Type | Purpose |
|-----|------|---------|
| \`flow\` | string | Logical agent flow exercised (e.g. \`rag.retrieval\`, \`tool_use.search\`) |
| \`tier\` | string | Case selection tier: \`critical\`, \`standard\`, or \`extended\` |
| \`dataset\` | string | Dataset name and version/provenance |

Metadata is copied into JSONL results by \`Runner\`. Use \`WithCaseFilter\` to run only certain tiers.`,
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
  JudgeMock: {
    term: "JudgeMock",
    description: "Scripted judge implementation for testing without an LLM.",
    details: `Use \`JudgeMock\` to test evaluation logic without calling a real LLM. It returns predefined scores and reasons, enabling deterministic test runs.

Perfect for:
- Unit testing eval suites
- CI pipelines without API costs
- Developing metric configurations`,
    example: {
      code: `judge := eval.JudgeMock{
	Score: 0.85,
	Reason: "Mock response for testing",
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
	Pre:  eval.Contains{Substring: "cancel"},
	Main: eval.Compound{
		Dimensions: []eval.Dimension{
			{Name: "helpfulness", Rubric: "...", Threshold: 0.7},
		},
	},
}, c)`,
    },
  },
  Metric: {
    term: "Metric",
    description: "A scoring function (Faithfulness, Contains, etc.) with a threshold and optional configuration.",
    details: `The evaluation function. Metrics implement the \`Metric\` interface and return a \`Result\` with score, pass/fail, and reasoning.

Available metrics:
- **LLM-as-Judge**: Faithfulness, Hallucination, AnswerRelevancy, ContextPrecision, GEval, Compound
- **Deterministic**: Contains, Regex, JSONPath, FieldCount

Each metric has configurable parameters and a \`Threshold\` that determines pass/fail.`,
    example: {
      code: `// LLM-as-Judge metric
r.Run(t, eval.Faithfulness{Threshold: 0.8}, c)

// Deterministic metric
r.Run(t, eval.Contains{Substring: "hello world"}, c)`,
    },
  },
  Judge: {
    term: "Judge",
    description: "Your implementation of LLM-as-judge. Receives prompts, returns scores with reasoning.",
    details: `The Judge is your abstraction over the LLM. You implement the \`Judge\` interface and go-eval handles the rest.

Required method:
\`JudgeResponse Judge(ctx context.Context, prompt string) error\`

The prompt is constructed by go-eval based on the metric and case. Your judge returns a score (0.0-1.0) and optional reasoning.

go-eval provides helper judges like \`ScriptedJudge\` for testing, or you can wrap any LLM provider (OpenAI, Anthropic, local, etc.).`,
    example: {
      code: `type MyJudge struct {
	client *openai.Client
}

func (j *MyJudge) Judge(ctx context.Context, prompt string) (eval.JudgeResponse, error) {
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
};
