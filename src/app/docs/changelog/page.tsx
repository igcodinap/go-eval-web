import Link from "next/link";

const changelog = [
  {
    version: "v0.3.0",
    date: "2026-04-29",
    status: "stable",
    changes: [
      { category: "Added", items: [
        "RunResult.Metadata in JSONL result sinks, copied from Case.Metadata by default",
        "Split token counts (PromptTokens, CompletionTokens) on judge responses, results, and JSONL sink rows",
        "WithCaseFilter runner option for skipping cases by metadata or custom predicates",
        "authoring-go-eval-suites agent skill and Claude /eval command for designing, running, and reviewing eval suites",
        "compare package for baseline-vs-current JSONL result regression diffs",
        "Minimal goeval CLI with test, compare, and version commands",
        "JSON dataset loader (LoadCases, LoadNamedCases, LoadDataset) for external golden cases",
        "Getting Started guide covering local judges, OpenAI, metrics, JSONL results, and benchmarks",
        "Ollama judge adapter (adapters/ollama) for local HTTP API scoring"
      ]},
    ],
  },
  {
    version: "v0.2.0",
    date: "2026-04-22",
    status: "stable",
    changes: [
      { category: "Added", items: ["Compound metric for multi-dimension evaluation", "Deterministic metrics: JSONPath and FieldCount", "OpenAI judge adapter (adapters/openai/)", "ResultSink for persisting evaluation results to JSONL", "Precheck metric wrapper for conditional evaluation", "json_text.go helpers: StripMarkdownCodeFence, ExtractJSONObjectCandidate", "CI workflow (.github/workflows/ci.yml) with go test -race and golangci-lint on PR/push", "Pre-push hook (.githooks/pre-push) enforcing tests + lint before every push", "AGENTS.md with repo-specific agent instructions"] },
    ],
  },
  {
    version: "v0.1.0",
    date: "2026-04-21",
    status: "stable",
    changes: [
      { category: "Added", items: ["Core metrics: Faithfulness, Hallucination, AnswerRelevancy, ContextPrecision, GEval", "Runner with GOEVAL environment gate", "Judge and Metric interfaces", "Case and Result types", "Bench helper for benchmarking evals", "JudgeMock for testing without an LLM"] },
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
        All notable changes to go-eval are documented here. The format follows{' '}
        <a href="https://keepachangelog.com/en/1.1.0/" className="text-[var(--accent)] hover:underline" target="_blank" rel="noopener noreferrer">Keep a Changelog</a>.
      </p>

      <div className="mt-8 space-y-8">
        {changelog.map((release) => (
          <div key={release.version} className="border border-[var(--border)] rounded-md overflow-hidden">
            <div className="flex items-center justify-between px-4 py-3 bg-[var(--surface)] border-b border-[var(--border)]">
              <div className="flex items-center gap-3">
                <h2 className="text-lg font-semibold">{release.version}</h2>
                <span className={`text-xs px-2 py-0.5 rounded ${
                  release.status === "stable" ? "bg-green-500/10 text-green-600" :
                  release.status === "unreleased" ? "bg-yellow-500/10 text-yellow-600" : ""
                }`}>
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