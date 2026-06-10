export type MetricType = "judge" | "deterministic" | "trajectory" | "wrapper";

export interface MetricDetail {
  name: string;
  type: MetricType;
  purpose: string;
  howItWorks: string;
  threshold: string;
  example: {
    code: string;
    output: string;
  };
}

const pass = (metric: string, reason: string) => `=== RUN   TestEval/${metric}
    eval_test.go:24: ${metric}: PASS (${reason})
--- PASS: TestEval/${metric} (0.15ms)`;

const fail = (metric: string, reason: string) => `=== RUN   TestEval/${metric}
    eval_test.go:24: ${metric}: FAIL (${reason})
--- FAIL: TestEval/${metric} (0.15ms)`;

export const metricDetails: Record<string, MetricDetail> = {
  Faithfulness: {
    name: "Faithfulness",
    type: "judge",
    purpose: "Verify RAG outputs do not contradict retrieved context",
    howItWorks: "The judge checks output claims against Case.Context and scores how much is supported.",
    threshold: "0.8",
    example: {
      code: `r.Run(t, eval.Faithfulness{Threshold: 0.8}, eval.Case{
	Input:   "What's the capital of France?",
	Output:  "Paris is the capital of France.",
	Context: []string{"Paris is the capital of France."},
})`,
      output: pass("Faithfulness", "claims supported by context"),
    },
  },
  Hallucination: {
    name: "Hallucination",
    type: "judge",
    purpose: "Catch outputs that invent facts outside the supplied context",
    howItWorks: "The judge estimates whether factual claims are grounded instead of invented.",
    threshold: "0.9",
    example: {
      code: `r.Run(t, eval.Hallucination{Threshold: 0.9}, eval.Case{
	Output:  "Paris is the capital of France and has 30 million residents.",
	Context: []string{"Paris is the capital of France."},
})`,
      output: fail("Hallucination", "unsupported claim detected"),
    },
  },
  AnswerRelevancy: {
    name: "AnswerRelevancy",
    type: "judge",
    purpose: "Ensure the output directly addresses the user input",
    howItWorks: "The judge compares Case.Input and Case.Output and penalizes off-topic or indirect answers.",
    threshold: "0.7",
    example: {
      code: `r.Run(t, eval.AnswerRelevancy{Threshold: 0.7}, eval.Case{
	Input:  "How do I cancel my plan?",
	Output: "Open Billing, then choose Cancel subscription.",
})`,
      output: pass("AnswerRelevancy", "answer directly addresses input"),
    },
  },
  ContextPrecision: {
    name: "ContextPrecision",
    type: "judge",
    purpose: "Check whether retrieved context documents are relevant to the input",
    howItWorks: "The judge scores each context item for relevance to Case.Input and reports mean precision.",
    threshold: "0.7",
    example: {
      code: `r.Run(t, eval.ContextPrecision{Threshold: 0.7}, eval.Case{
	Input: "What's the capital of France?",
	Context: []string{
		"Paris is the capital of France.",
		"Berlin is the capital of Germany.",
	},
})`,
      output: pass("ContextPrecision", "retrieved context is mostly relevant"),
    },
  },
  ContextRecall: {
    name: "ContextRecall",
    type: "judge",
    purpose: "Check whether retrieved context contains the expected answer or facts",
    howItWorks: "The judge compares Case.Expected against Case.Context and scores how well the retrieved documents cover the expected facts.",
    threshold: "0.7",
    example: {
      code: `r.Run(t, eval.ContextRecall{Threshold: 0.7}, eval.Case{
	Input:    "What's the capital of France?",
	Expected: "Paris",
	Context: []string{
		"Paris is the capital of France.",
		"Berlin is the capital of Germany.",
	},
})`,
      output: pass("ContextRecall", "retrieved context covers expected answer"),
    },
  },
  AnswerCorrectness: {
    name: "AnswerCorrectness",
    type: "judge",
    purpose: "Verify the output matches the expected answer semantically",
    howItWorks: "The judge compares Case.Output and Case.Expected for semantic equivalence, scoring factual overlap and accuracy.",
    threshold: "0.7",
    example: {
      code: `r.Run(t, eval.AnswerCorrectness{Threshold: 0.7}, eval.Case{
	Output:   "Paris is the capital and largest city of France.",
	Expected: "The capital of France is Paris.",
})`,
      output: pass("AnswerCorrectness", "output semantically matches expected"),
    },
  },
  NoiseSensitivity: {
    name: "NoiseSensitivity",
    type: "judge",
    purpose: "Ensure the output ignores irrelevant or distracting retrieved context",
    howItWorks: "The judge checks whether the output is affected by noisy or irrelevant documents in Case.Context, scoring resistance to distraction.",
    threshold: "0.7",
    example: {
      code: `r.Run(t, eval.NoiseSensitivity{Threshold: 0.7}, eval.Case{
	Input:  "What's the capital of France?",
	Output: "Paris is the capital of France.",
	Context: []string{
		"Paris is the capital of France.",
		"Tokyo is the capital of Japan.",
		"Berlin has a population of 3.6 million.",
	},
})`,
      output: pass("NoiseSensitivity", "output ignores distracting context"),
    },
  },
  TaskCompletion: {
    name: "TaskCompletion",
    type: "judge",
    purpose: "Verify the agent completed the user task end-to-end",
    howItWorks: "The judge evaluates Case.Output, Case.Turns, and Case.Trace to determine whether the agent fulfilled the user request.",
    threshold: "0.8",
    example: {
      code: `r.Run(t, eval.TaskCompletion{Threshold: 0.8}, eval.Case{
	Input:  "Book a flight from Santiago to Lima for March 15.",
	Output: "Your flight has been booked. Confirmation: ABC123.",
	Turns: []eval.Turn{
		{Role: eval.RoleUser, Content: "Book a flight from Santiago to Lima for March 15."},
		{Role: eval.RoleAssistant, ToolCalls: []eval.ToolCall{
			{Name: "flights.book", Arguments: json.RawMessage(\`{"from":"SCL","to":"LIM","date":"2026-03-15"}\`), Result: "confirmed:ABC123"},
		}},
	},
})`,
      output: pass("TaskCompletion", "agent completed the user task"),
    },
  },
  PlanAdherence: {
    name: "PlanAdherence",
    type: "judge",
    purpose: "Check whether the agent followed the expected plan or workflow",
    howItWorks: "The judge reviews Case.Turns and Case.Trace spans to verify the agent executed steps in the expected order and used the right tools.",
    threshold: "0.7",
    example: {
      code: `r.Run(t, eval.PlanAdherence{Threshold: 0.7}, eval.Case{
	Input: "Find and book the cheapest flight.",
	Turns: []eval.Turn{
		{Role: eval.RoleUser, Content: "Find and book the cheapest flight."},
		{Role: eval.RoleAssistant, ToolCalls: []eval.ToolCall{
			{Name: "flights.search", Arguments: json.RawMessage(\`{"sort":"price"}\`)},
			{Name: "flights.book", Arguments: json.RawMessage(\`{"id":"cheapest"}\`)},
		}},
	},
})`,
      output: pass("PlanAdherence", "agent followed the expected plan"),
    },
  },
  GEval: {
    name: "GEval",
    type: "judge",
    purpose: "Score custom criteria that built-in metrics do not cover",
    howItWorks: "You provide rubric Criteria and optional Steps; the judge applies that rubric to the case.",
    threshold: "0.7",
    example: {
      code: `r.Run(t, eval.GEval{
	Criteria:  "Response should be concise, professional, and actionable.",
	Threshold: 0.7,
}, c)`,
      output: pass("GEval", "rubric score met threshold"),
    },
  },
  Compound: {
    name: "Compound",
    type: "judge",
    purpose: "Evaluate several related rubric dimensions in one judge call",
    howItWorks: "Requires a judge that implements RawJudge so it can score several rubric dimensions from one raw model response. The metric fails when any thresholded dimension fails.",
    threshold: "per-dimension",
    example: {
      code: `r.Run(t, eval.Compound{
	Dimensions: []eval.Dimension{
		{Name: "grounding", Rubric: "Claims are supported.", Threshold: 0.8},
		{Name: "directness", Rubric: "Answer is direct.", Threshold: 0.7},
	},
}, c)`,
      output: pass("Compound", "all dimensions passed"),
    },
  },
  Precheck: {
    name: "Precheck",
    type: "wrapper",
    purpose: "Skip expensive LLM metrics when a cheap guard fails",
    howItWorks: "Runs Pre first; Main only runs when the precheck passes.",
    threshold: "wrapped metric",
    example: {
      code: `r.Run(t, eval.Precheck{
	Pre:  eval.Regex{Pattern: "^\\\\s*\\\\{"},
	Main: eval.GEval{Criteria: "JSON answer is grounded.", Threshold: 0.8},
}, c)`,
      output: pass("Precheck", "precheck passed, main metric ran"),
    },
  },
  Contains: {
    name: "Contains",
    type: "deterministic",
    purpose: "Check that output contains a required substring",
    howItWorks: "Performs a simple substring match against Case.Output.",
    threshold: "binary",
    example: {
      code: `r.Run(t, eval.Contains{}, eval.Case{
	Output:   "Paris is the capital of France.",
	Expected: "Paris",
})`,
      output: pass("Contains", "substring found"),
    },
  },
  Regex: {
    name: "Regex",
    type: "deterministic",
    purpose: "Validate output against a regular expression",
    howItWorks: "Runs the configured regexp against Case.Output.",
    threshold: "binary",
    example: {
      code: `r.Run(t, eval.Regex{Pattern: \`(?i)\\bparis\\b\`}, eval.Case{
	Output: "Paris is the capital of France.",
})`,
      output: pass("Regex", "pattern matched"),
    },
  },
  JSONPath: {
    name: "JSONPath",
    type: "deterministic",
    purpose: "Assert a value inside JSON output",
    howItWorks: "Extracts a JSON path from Case.Output and compares it to Case.Expected.",
    threshold: "binary",
    example: {
      code: `r.Run(t, eval.MustJSONPath("answer.city"), eval.Case{
	Output:   \`{"answer":{"city":"Paris"}}\`,
	Expected: "Paris",
})`,
      output: pass("JSONPath", "path matched expected value"),
    },
  },
  FieldCount: {
    name: "FieldCount",
    type: "deterministic",
    purpose: "Enforce a minimum number of non-null JSON fields",
    howItWorks: "Counts non-null top-level fields in JSON output and compares the count to MinFields.",
    threshold: "config",
    example: {
      code: `r.Run(t, eval.FieldCount{MinFields: 2}, eval.Case{
	Output: \`{"answer":"Paris","confidence":0.98}\`,
})`,
      output: pass("FieldCount", "2 fields >= minimum 2"),
    },
  },
  ArtifactExists: {
    name: "ArtifactExists",
    type: "deterministic",
    purpose: "Check that a named structured artifact exists on the case",
    howItWorks: "Looks up Case.Artifacts by key before any JSON parsing.",
    threshold: "binary",
    example: {
      code: `r.Run(t, eval.ArtifactExists{Key: "route"}, eval.Case{
	Artifacts: map[string]json.RawMessage{
		"route": json.RawMessage(\`{"status":"ready"}\`),
	},
})`,
      output: pass("ArtifactExists", "artifact \"route\" exists"),
    },
  },
  ArtifactNotExists: {
    name: "ArtifactNotExists",
    type: "deterministic",
    purpose: "Assert that an unwanted structured artifact was not emitted",
    howItWorks: "Looks up Case.Artifacts by key and passes only when the key is absent.",
    threshold: "binary",
    example: {
      code: `r.Run(t, eval.ArtifactNotExists{Key: "unsafe_action"}, c)`,
      output: pass("ArtifactNotExists", "artifact \"unsafe_action\" does not exist"),
    },
  },
  ArtifactJSONPath: {
    name: "ArtifactJSONPath",
    type: "deterministic",
    purpose: "Assert a JSON value inside a named artifact",
    howItWorks: "Parses Case.Artifacts[Key], extracts Path, normalizes when configured, and compares the stringified JSON value to Expected.",
    threshold: "binary",
    example: {
      code: `r.Run(t, eval.ArtifactJSONPath{
	Key: "route", Path: "status", Expected: "ready",
}, c)`,
      output: pass("ArtifactJSONPath", "artifact path matched expected value"),
    },
  },
  ArtifactFieldCount: {
    name: "ArtifactFieldCount",
    type: "deterministic",
    purpose: "Require enough non-null fields inside an artifact object",
    howItWorks: "Counts non-null fields at the artifact root or configured path.",
    threshold: "config",
    example: {
      code: `r.Run(t, eval.ArtifactFieldCount{
	Key: "state", Path: "payment", MinFields: 2,
}, c)`,
      output: pass("ArtifactFieldCount", "field count met minimum"),
    },
  },
  ArtifactNumberLTE: {
    name: "ArtifactNumberLTE",
    type: "deterministic",
    purpose: "Check that a numeric artifact value stays under a maximum",
    howItWorks: "Extracts a JSON number from an artifact and passes when it is less than or equal to Max.",
    threshold: "binary",
    example: {
      code: `r.Run(t, eval.ArtifactNumberLTE{
	Key: "route", Path: "total_minutes", Max: 120,
}, c)`,
      output: pass("ArtifactNumberLTE", "numeric value within budget"),
    },
  },
  ArtifactArrayContains: {
    name: "ArtifactArrayContains",
    type: "deterministic",
    purpose: "Check that an artifact array contains an expected value",
    howItWorks: "Extracts an array from a named artifact and compares stringified JSON values, including wildcard paths such as stops[*].name.",
    threshold: "binary",
    example: {
      code: `r.Run(t, eval.ArtifactArrayContains{
	Key: "route", Path: "stops", Expected: "Pajaritos",
}, c)`,
      output: pass("ArtifactArrayContains", "array contained expected value"),
    },
  },
  ArtifactArrayNotContains: {
    name: "ArtifactArrayNotContains",
    type: "deterministic",
    purpose: "Check that an artifact array excludes an unwanted value",
    howItWorks: "Extracts an array or wildcard path from a named artifact and fails if the excluded value appears.",
    threshold: "binary",
    example: {
      code: `r.Run(t, eval.ArtifactArrayNotContains{
	Key: "route", Path: "stops[*].name", Expected: "Aeropuerto",
}, c)`,
      output: pass("ArtifactArrayNotContains", "array excluded unwanted value"),
    },
  },
  ArtifactArrayMinLen: {
    name: "ArtifactArrayMinLen",
    type: "deterministic",
    purpose: "Require an artifact array to have at least a minimum length",
    howItWorks: "Extracts an array from a named artifact path and compares its length to MinLen.",
    threshold: "binary",
    example: {
      code: `r.Run(t, eval.ArtifactArrayMinLen{
	Key: "route", Path: "stops", MinLen: 2,
}, c)`,
      output: pass("ArtifactArrayMinLen", "array length met minimum"),
    },
  },
  ArtifactSubset: {
    name: "ArtifactSubset",
    type: "deterministic",
    purpose: "Assert that an artifact contains a partial expected JSON structure",
    howItWorks: "Parses Expected JSON and verifies it is an order-insensitive subset of the artifact value at Key/Path.",
    threshold: "binary",
    example: {
      code: `r.Run(t, eval.ArtifactSubset{
	Key:      "route",
	Expected: json.RawMessage(\`{"status":"ready"}\`),
}, c)`,
      output: pass("ArtifactSubset", "artifact contained expected subset"),
    },
  },
  Contract: {
    name: "Contract",
    type: "wrapper",
    purpose: "Group several deterministic or judge checks into one named result",
    howItWorks: "Runs each check, records per-check dimensions, and fails the contract when any check fails. StopOnFailure can short-circuit the group.",
    threshold: "all checks",
    example: {
      code: `r.Run(t, eval.Contract{
	ContractName: "ready_route",
	Checks: []eval.Metric{
		eval.ArtifactJSONPath{Key: "route", Path: "status", Expected: "ready"},
		eval.ArtifactArrayMinLen{Key: "route", Path: "stops", MinLen: 2},
	},
}, c)`,
      output: pass("Contract(ready_route)", "all checks passed"),
    },
  },
  ToolCallAccuracy: {
    name: "ToolCallAccuracy",
    type: "trajectory",
    purpose: "Compare actual tool calls with expected calls under a match mode",
    howItWorks: "Flattens Case.Turns tool calls and matches them against Case.ExpectedToolCalls using strict, unordered, subset, or superset matching.",
    threshold: "1.0",
    example: {
      code: `r.Run(t, eval.ToolCallAccuracy{
	Mode: eval.MatchStrict, MatchArgs: true,
}, c)`,
      output: pass("ToolCallAccuracy", "expected tool calls matched"),
    },
  },
  ToolCallF1: {
    name: "ToolCallF1",
    type: "trajectory",
    purpose: "Report precision, recall, and F1 for tool-call matches",
    howItWorks: "Counts matched tool calls and emits precision, recall, and f1 dimensions.",
    threshold: "0.8",
    example: {
      code: `r.Run(t, eval.ToolCallF1{
	MatchArgs: true,
	Threshold: 0.8,
}, c)`,
      output: pass("ToolCallF1", "precision and recall met threshold"),
    },
  },
  RequiredTools: {
    name: "RequiredTools",
    type: "trajectory",
    purpose: "Fail when required tool names or name patterns are absent",
    howItWorks: "Scans flattened tool calls from Case.Turns and checks exact Names plus glob-style Patterns.",
    threshold: "binary",
    example: {
      code: `r.Run(t, eval.RequiredTools{
	Patterns: []string{"orders.*"},
}, c)`,
      output: pass("RequiredTools", "all required tools used"),
    },
  },
  ForbiddenTool: {
    name: "ForbiddenTool",
    type: "trajectory",
    purpose: "Fail when disallowed tool names or patterns appear in the trajectory",
    howItWorks: "Scans flattened tool calls from Case.Turns for exact Names or glob-style Patterns; Except exempts specific matches from pattern failures.",
    threshold: "binary",
    example: {
      code: `r.Run(t, eval.ForbiddenTool{
	Patterns: []string{"orders.*"},
	Except:   []string{"orders.lookup"},
}, c)`,
      output: pass("ForbiddenTool", "no forbidden tools used"),
    },
  },
  StepBudget: {
    name: "StepBudget",
    type: "trajectory",
    purpose: "Keep tool-call count within a configured budget",
    howItWorks: "Counts flattened tool calls across Case.Turns and fails when the count exceeds MaxSteps.",
    threshold: "binary",
    example: {
      code: `r.Run(t, eval.StepBudget{MaxSteps: 2}, c)`,
      output: pass("StepBudget", "step budget satisfied"),
    },
  },
  ToolArgumentAccuracy: {
    name: "ToolArgumentAccuracy",
    type: "deterministic",
    purpose: "Verify tool names and JSON arguments match expectations",
    howItWorks: "Compares actual tool calls from Case.Trace spans or Case.Turns against Case.ExpectedToolCalls, scoring both tool name and argument correctness without calling a Judge.",
    threshold: "1.0",
    example: {
      code: `r.Run(t, eval.ToolArgumentAccuracy{Threshold: 1.0}, eval.Case{
	Turns: []eval.Turn{
		{Role: eval.RoleAssistant, ToolCalls: []eval.ToolCall{
			{Name: "search", Arguments: json.RawMessage(\`{"query":"capital of France"}\`)},
		}},
	},
	ExpectedToolCalls: []eval.ToolCall{
		{Name: "search", Arguments: json.RawMessage(\`{"query":"capital of France"}\`)},
	},
})`,
      output: pass("ToolArgumentAccuracy", "tool names and arguments match"),
    },
  },
  StepEfficiency: {
    name: "StepEfficiency",
    type: "deterministic",
    purpose: "Verify the trace stays within step and tool-call budgets",
    howItWorks: "Reads Case.Trace spans or Case.Turns tool calls and checks that the total count and per-tool counts stay within configured limits without calling a Judge.",
    threshold: "1.0",
    example: {
      code: `r.Run(t, eval.StepEfficiency{Threshold: 1.0}, eval.Case{
	Turns: []eval.Turn{
		{Role: eval.RoleAssistant, ToolCalls: []eval.ToolCall{
			{Name: "search", Arguments: json.RawMessage(\`{"query":"capital"}\`)},
		}},
	},
})`,
      output: pass("StepEfficiency", "trace within step and tool-call budgets"),
    },
  },
  Repeat: {
    name: "Repeat",
    type: "wrapper",
    purpose: "Run a metric multiple times and aggregate pass rate plus score stats",
    howItWorks: "Repeat reruns a wrapped metric N times; RepeatN is the helper form that requires every run to pass.",
    threshold: "configurable pass rate",
    example: {
      code: `r.Run(t, eval.Repeat{
	Metric:   eval.Faithfulness{Threshold: 0.8},
	N:        3,
	PassRate: 2.0 / 3.0,
}, c)`,
      output: pass("Repeat", "2/3 runs passed, mean score 0.86"),
    },
  },
  WithTokenBudget: {
    name: "WithTokenBudget",
    type: "wrapper",
    purpose: "Fail a wrapped metric when token usage exceeds a maximum",
    howItWorks: "Preserves the inner score and token counts, then sets Passed false when Tokens exceeds MaxTokens.",
    threshold: "token max",
    example: {
      code: `r.Run(t, eval.WithTokenBudget(
	1200,
	eval.Faithfulness{Threshold: 0.8},
), c)`,
      output: pass("WithTokenBudget", "inner metric passed within token budget"),
    },
  },
  WithLatencyBudget: {
    name: "WithLatencyBudget",
    type: "wrapper",
    purpose: "Fail a wrapped metric when latency exceeds a maximum",
    howItWorks: "Measures or preserves latency for the inner metric and fails when it exceeds MaxLatency.",
    threshold: "duration max",
    example: {
      code: `r.Run(t, eval.WithLatencyBudget(
	2*time.Second,
	eval.AnswerRelevancy{Threshold: 0.7},
), c)`,
      output: pass("WithLatencyBudget", "inner metric passed within latency budget"),
    },
  },
  OutputLengthBudget: {
    name: "OutputLengthBudget",
    type: "deterministic",
    purpose: "Keep final output within rune or word limits",
    howItWorks: "Counts Case.Output runes and words deterministically, then fails when either configured limit is exceeded.",
    threshold: "config",
    example: {
      code: `r.Run(t, eval.OutputLengthBudget{
	MaxRunes: 1200,
	MaxWords: 180,
}, c)`,
      output: pass("OutputLengthBudget", "output length within budget"),
    },
  },
};

const metricTypeOrder: Record<MetricType, number> = {
  judge: 0,
  deterministic: 1,
  trajectory: 2,
  wrapper: 3,
};

export const orderedMetricDetails = Object.values(metricDetails).sort(
  (a, b) => metricTypeOrder[a.type] - metricTypeOrder[b.type],
);
