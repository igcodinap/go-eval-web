import Link from "next/link";

const changelog = [
  {
    version: "v0.8.0",
    date: "2026-05-27",
    status: "stable",
    changes: [
      {
        category: "Added",
        items: [
          "Scenario ergonomics: ScenarioRepeat, scenario state passing, per-case/per-step timeouts, scenario summary JSONL rows, and GOEVAL_TIER filtering with WithTierFilter / DefaultTierFilter",
          "Grouped deterministic checks with Contract",
          "Tool pattern assertions on RequiredTools, ForbiddenTool, and scenario steps",
          "Artifact and output helpers: ArtifactNotExists, ArtifactArrayNotContains, ArtifactSubset, and OutputLengthBudget",
          "String normalizers for deterministic comparisons: CaseFoldNormalizer, SpanishASCIIFoldNormalizer, and ChainNormalizers",
        ],
      },
    ],
  },
  {
    version: "v0.7.0",
    date: "2026-05-27",
    status: "stable",
    changes: [
      {
        category: "Added",
        items: [
          "Agent Scenario Contracts: Scenario, Step, StepRequest, StepFunc, StepResult, ScenarioResult, and Runner.RunScenario",
          "Scenario-scoped ToolRegistry with NewToolRegistry validation",
          "RequiredTools trajectory metric and ArtifactArrayMinLen artifact metric",
          "Result sink redaction with WithRedactors, UUIDRedactor, and FieldRedactor",
          "Agent scenario example covering multi-step route planning contracts",
        ],
      },
    ],
  },
  {
    version: "v0.6.0",
    date: "2026-05-22",
    status: "stable",
    changes: [
      {
        category: "Added",
        items: [
          "v0.5 trajectory primitives: Turn, ToolCall, Case.Turns, and Case.ExpectedToolCalls",
          "JSON dataset support for optional turns and expected_tool_calls fields",
          "v0.6 trajectory match modes: MatchStrict, MatchUnordered, MatchSubset, and MatchSuperset",
          "Trajectory metrics: ToolCallAccuracy, ToolCallF1, ForbiddenTool, and StepBudget",
          "Repeat and RepeatN for repeated metric runs and pass-rate aggregation",
          "Single-run result summaries through compare.Summarize, compare.SummarizeFile, and goeval summarize",
        ],
      },
    ],
  },
  {
    version: "v0.4.0",
    date: "2026-05-22",
    status: "stable",
    changes: [
      {
        category: "Added",
        items: [
          "Case.Artifacts for named structured JSON outputs alongside text output",
          "Artifact metrics: ArtifactExists, ArtifactJSONPath, ArtifactFieldCount, ArtifactNumberLTE, and ArtifactArrayContains",
          "WithTokenBudget and WithLatencyBudget metric wrappers",
          "compare.CaseIDFromMetadata helper for stable case_id result comparisons",
          "Route planner example showing artifact-first agent workflow checks",
        ],
      },
      {
        category: "Changed",
        items: [
          "Case now includes a private blank field, so external callers must use keyed struct literals such as eval.Case{Input: \"...\"}",
        ],
      },
    ],
  },
  {
    version: "v0.3.0",
    date: "2026-04-29",
    status: "stable",
    changes: [
      {
        category: "Added",
        items: [
          "RunResult.Metadata in JSONL result sinks, copied from Case.Metadata by default",
          "Split token counts (PromptTokens, CompletionTokens) on judge responses, results, and JSONL sink rows",
          "WithCaseFilter runner option for skipping cases by metadata or custom predicates",
          "authoring-go-eval-suites agent skill and Claude /eval command for designing, running, and reviewing eval suites",
          "compare package for baseline-vs-current JSONL result regression diffs",
          "Minimal goeval CLI with test, compare, and version commands",
          "JSON dataset loader (LoadCases, LoadNamedCases, LoadDataset) for external golden cases",
          "Getting Started guide covering local judges, OpenAI, metrics, JSONL results, and benchmarks",
          "Ollama judge adapter (adapters/ollama) for local HTTP API scoring",
        ],
      },
    ],
  },
  {
    version: "v0.2.0",
    date: "2026-04-22",
    status: "stable",
    changes: [
      {
        category: "Added",
        items: [
          "Compound metric for multi-dimension evaluation",
          "Deterministic metrics: JSONPath and FieldCount",
          "OpenAI judge adapter (adapters/openai/)",
          "ResultSink for persisting evaluation results to JSONL",
          "Precheck metric wrapper for conditional evaluation",
          "json_text.go helpers: StripMarkdownCodeFence, ExtractJSONObjectCandidate",
          "CI workflow (.github/workflows/ci.yml) with go test -race and golangci-lint on PR/push",
          "Pre-push hook (.githooks/pre-push) enforcing tests + lint before every push",
          "AGENTS.md with repo-specific agent instructions",
        ],
      },
    ],
  },
  {
    version: "v0.1.0",
    date: "2026-04-21",
    status: "stable",
    changes: [
      {
        category: "Added",
        items: [
          "Core metrics: Faithfulness, Hallucination, AnswerRelevancy, ContextPrecision, GEval",
          "Runner with GOEVAL environment gate",
          "Judge and Metric interfaces",
          "Case and Result types",
          "Bench helper for benchmarking evals",
          "MockJudge for testing without an LLM",
        ],
      },
    ],
  },
];

export default function ChangelogPage() {
  return (
    <article>
      <div className="mb-6 text-sm text-[var(--muted)]">
        <Link href="/" className="hover:text-[var(--foreground)]">Home</Link>
        <span className="mx-2">/</span>
        <span className="text-[var(--foreground)]">Changelog</span>
      </div>

      <h1 className="mb-4 text-4xl font-bold">Changelog</h1>
      <p className="text-lg text-[var(--secondary)] leading-relaxed">
        All notable go-eval releases are documented here. The format follows{" "}
        <a href="https://keepachangelog.com/en/1.1.0/" className="text-[var(--accent)] hover:underline" target="_blank" rel="noopener noreferrer">Keep a Changelog</a>.
      </p>

      <div className="mt-8 space-y-8">
        {changelog.map((release) => (
          <div key={release.version} className="border border-[var(--border)] rounded-md overflow-hidden">
            <div className="flex items-center justify-between px-4 py-3 bg-[var(--surface)] border-b border-[var(--border)]">
              <div className="flex items-center gap-3">
                <h2 className="text-lg font-semibold">{release.version}</h2>
                <span className="text-xs px-2 py-0.5 rounded bg-green-500/10 text-green-600">
                  {release.status}
                </span>
              </div>
              <span className="text-sm text-[var(--muted)]">{release.date}</span>
            </div>
            <div className="p-4 space-y-4">
              {release.changes.map((change) => (
                <div key={change.category}>
                  <h3 className="text-sm font-semibold text-[var(--muted)] uppercase tracking-wide mb-2">{change.category}</h3>
                  <ul className="space-y-1">
                    {change.items.map((item) => (
                      <li key={item} className="flex items-start gap-2 text-sm text-[var(--secondary)]">
                        <span className="h-1.5 w-1.5 mt-2 rounded-full bg-[var(--accent)] shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </article>
  );
}
