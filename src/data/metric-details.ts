export interface MetricDetail {
  name: string;
  type: "judge" | "deterministic";
  purpose: string;
  howItWorks: string;
  threshold: string;
  example: {
    code: string;
    output: string;
  };
}

export const metricDetails: Record<string, MetricDetail> = {
  Faithfulness: {
    name: "Faithfulness",
    type: "judge",
    purpose: "Verify RAG outputs don't contradict the retrieved context",
    howItWorks: "Judge checks each output claim against the Context, scoring the fraction that's supported",
    threshold: "0.8",
    example: {
      code: `package evaltest

import (
	"testing"
	eval "github.com/igcodinap/go-eval"
)

func TestRAGFaithfulness(t *testing.T) {
	judge := newMyJudge(t)
	r := eval.NewRunner(judge)

	c := eval.Case{
		Input:   "What's the capital of France?",
		Output:  "The capital of France is Paris.",
		Context: []string{"Paris is the capital of France and its largest city."},
	}

	r.Run(t, eval.Faithfulness{Threshold: 0.8}, c)
}`,
      output: `=== RUN   TestRAGFaithfulness
    faithfulness_test.go:18: Faithfulness: 0.95 (supported 19/20 claims)
--- PASS: TestRAGFaithfulness (45.23ms)`,
    },
  },
  Hallucination: {
    name: "Hallucination",
    type: "judge",
    purpose: "Catch outputs that invent facts not present in Context",
    howItWorks: "Judge identifies claims that don't appear in Context; score = non-invented / total",
    threshold: "0.9",
    example: {
      code: `package evaltest

import (
	"testing"
	eval "github.com/igcodinap/go-eval"
)

func TestRAGHallucination(t *testing.T) {
	judge := newMyJudge(t)
	r := eval.NewRunner(judge)

	c := eval.Case{
		Input:   "What's the capital of France?",
		Output:  "The capital of France is Paris, where the Eiffel Tower is located.",
		Context: []string{"Paris is the capital of France."},
	}

	r.Run(t, eval.Hallucination{Threshold: 0.9}, c)
}`,
      output: `=== RUN   TestRAGHallucination
    hallucination_test.go:18: Hallucination: 0.67 (invented 1/3 claims)
--- FAIL: TestRAGHallucination (52.18ms)`,
    },
  },
  AnswerRelevancy: {
    name: "AnswerRelevancy",
    type: "judge",
    purpose: "Ensure outputs actually address the user's question",
    howItWorks: "Judge evaluates whether Output directly answers Input, penalizing tangentially related responses",
    threshold: "0.7",
    example: {
      code: `package evaltest

import (
	"testing"
	eval "github.com/igcodinap/go-eval"
)

func TestAnswerRelevancy(t *testing.T) {
	judge := newMyJudge(t)
	r := eval.NewRunner(judge)

	c := eval.Case{
		Input:   "What's the capital of France?",
		Output:  "France is a country in Western Europe known for wine and cheese.",
		Context: []string{"Paris is the capital of France."},
	}

	r.Run(t, eval.AnswerRelevancy{Threshold: 0.7}, c)
}`,
      output: `=== RUN   TestAnswerRelevancy
    relevancy_test.go:18: AnswerRelevancy: 0.45 (indirectly relevant)
--- FAIL: TestAnswerRelevancy (48.92ms)`,
    },
  },
  ContextPrecision: {
    name: "ContextPrecision",
    type: "judge",
    purpose: "Check if retrieved documents actually help answer the Input",
    howItWorks: "Judge scores each retrieved doc on relevance to Input, reports mean precision",
    threshold: "0.7",
    example: {
      code: `package evaltest

import (
	"testing"
	eval "github.com/igcodinap/go-eval"
)

func TestContextPrecision(t *testing.T) {
	judge := newMyJudge(t)
	r := eval.NewRunner(judge)

	c := eval.Case{
		Input:   "What's the capital of France?",
		Output:  "Paris is the capital of France.",
		Context: []string{
			"Paris is the capital of France.",
			"The Eiffel Tower is in Paris.",
			"France is a member of the EU.",
		},
	}

	r.Run(t, eval.ContextPrecision{Threshold: 0.7}, c)
}`,
      output: `=== RUN   TestContextPrecision
    context_test.go:18: ContextPrecision: 0.89 (doc1: 1.0, doc2: 0.9, doc3: 0.0)
--- PASS: TestContextPrecision (61.34ms)`,
    },
  },
  GEval: {
    name: "GEval",
    type: "judge",
    purpose: "Score custom criteria the built-in metrics don't cover",
    howItWorks: "You define Criteria (rubric description) and optional Steps; judge applies your rubric",
    threshold: "0.7",
    example: {
      code: `package evaltest

import (
	"testing"
	eval "github.com/igcodinap/go-eval"
)

func TestToneCheck(t *testing.T) {
	judge := newMyJudge(t)
	r := eval.NewRunner(judge)

	c := eval.Case{
		Input:   "Explain why Go is good for servers.",
		Output:  "Go is the absolute bestest thing ever for servers!!!",
		Context: []string{},
	}

	r.Run(t, eval.GEval{
		Threshold: 0.7,
		Criteria: "Response should be professional and factual, not hyperbolic.",
	}, c)
}`,
      output: `=== RUN   TestToneCheck
    geval_test.go:18: GEval: 0.30 (uses hyperbolic language "bestest", "ever!!!")
--- FAIL: TestToneCheck (67.12ms)`,
    },
  },
  Compound: {
    name: "Compound",
    type: "judge",
    purpose: "Evaluate multiple quality dimensions in one judge call (reduces cost)",
    howItWorks: "Multiple Dimensions with individual Rubrics evaluated together, returns per-dimension scores",
    threshold: "per-dimension",
    example: {
      code: `package evaltest

import (
	"testing"
	eval "github.com/igcodinap/go-eval"
)

func TestResponseQuality(t *testing.T) {
	judge := newMyJudge(t)
	r := eval.NewRunner(judge)

	c := eval.Case{
		Input:   "What's the capital of France?",
		Output:  "Paris, and also it's where the Louvre is.",
		Context: []string{"Paris is the capital of France."},
	}

	r.Run(t, eval.Compound{
		Dimensions: []eval.Dimension{
			{Name: "faithfulness", Threshold: 0.8, Rubric: "Output claims must be supported by context."},
			{Name: "relevance", Threshold: 0.7, Rubric: "Output must directly answer the question."},
		},
	}, c)
}`,
      output: `=== RUN   TestResponseQuality
    compound_test.go:18: Compound:
      faithfulness: 0.80 (1.0/1 supported claims) ✓
      relevance: 0.92 (directly answers) ✓
--- PASS: TestResponseQuality (78.45ms)`,
    },
  },
  Contains: {
    name: "Contains",
    type: "deterministic",
    purpose: "Fast gate for mandatory text or keywords before expensive LLM checks",
    howItWorks: "Simple substring search; pass if exact string found, fail otherwise",
    threshold: "binary",
    example: {
      code: `package evaltest

import (
	"testing"
	eval "github.com/igcodinap/go-eval"
)

func TestContainsEmail(t *testing.T) {
	r := eval.NewRunner(nil) // no judge needed

	c := eval.Case{
		Input:   "Send verification code",
		Output:  "Your code is ABC123. Sent to user@example.com",
	}

	r.Run(t, eval.Contains{Substring: "user@example.com"}, c)
}`,
      output: `=== RUN   TestContainsEmail
    contains_test.go:14: Contains: PASS (substring found)
--- PASS: TestContainsEmail (0.12ms)`,
    },
  },
  Regex: {
    name: "Regex",
    type: "deterministic",
    purpose: "Validate output format compliance (emails, IDs, codes, etc.)",
    howItWorks: "Pattern match using regex; pass if matches, fail if doesn't match",
    threshold: "binary",
    example: {
      code: `package evaltest

import (
	"testing"
	eval "github.com/igcodinap/go-eval"
)

func TestEmailFormat(t *testing.T) {
	r := eval.NewRunner(nil)

	c := eval.Case{
		Input:   "Generate user email",
		Output:  "user123@example.com",
	}

	r.Run(t, eval.Regex{
		Pattern: \`^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$\`,
	}, c)
}`,
      output: `=== RUN   TestEmailFormat
    regex_test.go:14: Regex: PASS (matched pattern)
--- PASS: TestEmailFormat (0.08ms)`,
    },
  },
  JSONPath: {
    name: "JSONPath",
    type: "deterministic",
    purpose: "Assert specific values in structured JSON outputs (API responses, extracted data)",
    howItWorks: "Extract value at your JSONPath, compare to expected value",
    threshold: "binary",
    example: {
      code: `package evaltest

import (
	"testing"
	eval "github.com/igcodinap/go-eval"
)

func TestAPIResponse(t *testing.T) {
	r := eval.NewRunner(nil)

	c := eval.Case{
		Input:   "Get user profile",
		Output:  \`{"id": 12345, "name": "Alice", "verified": true}\`,
	}

	r.Run(t, eval.JSONPath{
		Path:     "$.id",
		Expected: 12345,
	}, c)
}`,
      output: `=== RUN   TestAPIResponse
    jsonpath_test.go:14: JSONPath: PASS ($.id == 12345)
--- PASS: TestAPIResponse (0.15ms)`,
    },
  },
  FieldCount: {
    name: "FieldCount",
    type: "deterministic",
    purpose: "Enforce minimum field count in JSON outputs (completeness check)",
    howItWorks: "Count non-null top-level keys; pass if >= configured minimum",
    threshold: "config",
    example: {
      code: `package evaltest

import (
	"testing"
	eval "github.com/igcodinap/go-eval"
)

func TestUserProfileCompleteness(t *testing.T) {
	r := eval.NewRunner(nil)

	c := eval.Case{
		Input:   "Create user profile",
		Output:  \`{"id": 1, "name": "Bob", "email": "bob@test.com"}\`,
	}

	r.Run(t, eval.FieldCount{
		MinFields: 3,
	}, c)
}`,
      output: `=== RUN   TestUserProfileCompleteness
    fieldcount_test.go:14: FieldCount: PASS (3 fields >= min 3)
--- PASS: TestUserProfileCompleteness (0.09ms)`,
    },
  },
};
