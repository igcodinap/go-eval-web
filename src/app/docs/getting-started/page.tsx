import Link from "next/link";

const useCases = [
  "RAG response quality checks in go test",
  "Deterministic output validation for extraction workflows",
  "Prompt or model regression checks in CI pipelines",
  "Agent workflows with precheck gating before expensive scoring",
];

const concepts = [
  { term: "Case", desc: "Input, output, context, and optional metadata for a single eval scenario." },
  { term: "Metric", desc: "Scoring function (Contains, Faithfulness, etc.) with threshold and config." },
  { term: "Judge", desc: "Your LLM-as-judge implementation. Returns scores with reasoning." },
  { term: "Runner", desc: "Executes Cases with Metrics. Handles parallelism, subtests, and result aggregation." },
];

const docsSections = [
  { id: "use-cases", title: "Use Cases" },
  { id: "concepts", title: "Concepts" },
  { id: "first-run", title: "First Test Run" },
  { id: "metrics-overview", title: "Metrics Overview" },
  { id: "deterministic", title: "Deterministic" },
  { id: "precheck", title: "Precheck" },
  { id: "compound", title: "Compound" },
  { id: "ci-cd", title: "CI/CD" },
  { id: "troubleshooting", title: "Troubleshooting" },
];

const metrics = [
  {
    name: "Contains",
    type: "Deterministic",
    purpose: "Fast gate for mandatory text or keywords before expensive LLM checks",
    howItWorks: "Simple substring search; pass if exact string found, fail otherwise",
    threshold: "binary",
  },
  {
    name: "Regex",
    type: "Deterministic",
    purpose: "Validate output format compliance (emails, IDs, codes, etc.)",
    howItWorks: "Pattern match using regex; pass if matches, fail if doesn't match",
    threshold: "binary",
  },
  {
    name: "JSONPath",
    type: "Deterministic",
    purpose: "Assert specific values in structured JSON outputs (API responses, extracted data)",
    howItWorks: "Extract value at your JSONPath, compare to expected value",
    threshold: "binary",
  },
  {
    name: "FieldCount",
    type: "Deterministic",
    purpose: "Enforce minimum field count in JSON outputs (completeness check)",
    howItWorks: "Count non-null top-level keys; pass if >= configured minimum",
    threshold: "config",
  },
  {
    name: "Faithfulness",
    type: "LLM-as-judge",
    purpose: "Verify RAG outputs don't contradict the retrieved context",
    howItWorks: "Judge checks each output claim against the Context, scoring the fraction supported",
    threshold: "0.8",
  },
  {
    name: "Hallucination",
    type: "LLM-as-judge",
    purpose: "Catch outputs that invent facts not present in Context",
    howItWorks: "Judge identifies claims that don't appear in Context; score = non-invented / total",
    threshold: "0.9",
  },
  {
    name: "AnswerRelevancy",
    type: "LLM-as-judge",
    purpose: "Ensure outputs actually address the user's question",
    howItWorks: "Judge evaluates whether Output directly answers Input, penalizing tangentially related responses",
    threshold: "0.7",
  },
  {
    name: "ContextPrecision",
    type: "LLM-as-judge",
    purpose: "Check if retrieved documents actually help answer the Input",
    howItWorks: "Judge scores each retrieved doc on relevance to Input, reports mean precision",
    threshold: "0.7",
  },
  {
    name: "GEval",
    type: "LLM-as-judge",
    purpose: "Score custom criteria the built-in metrics don't cover",
    howItWorks: "You define Criteria (rubric description) and optional Steps; judge applies your rubric",
    threshold: "0.7",
  },
  {
    name: "Compound",
    type: "LLM-as-judge",
    purpose: "Evaluate multiple quality dimensions in one judge call (reduces cost)",
    howItWorks: "Multiple Dimensions with individual Rubrics evaluated together, returns per-dimension scores",
    threshold: "per-dimension",
  },
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
        go-eval is an open-source evaluation toolkit for Go teams building LLM products. It is designed to feel native to <code>go test</code>, so you can ship evals as part of normal engineering workflows instead of a separate platform.
      </p>

      <nav className="mt-6 flex flex-wrap gap-2 text-sm">
        {docsSections.map((section) => (
          <a
            key={section.id}
            href={`#${section.id}`}
            className="text-[var(--accent)] hover:underline"
          >
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
          Start with a deterministic precheck and a compound rubric metric. This keeps eval costs low while catching obvious failures early.
        </p>
        <pre className="mt-4 bg-[var(--code-bg)] border border-[var(--border)] rounded-md px-4 py-3 font-mono text-sm overflow-x-auto">
          <code>{`package yourpkg_test

import (
	"testing"

	eval "github.com/igcodinap/go-eval"
)

func TestSupportReply(t *testing.T) {
	runner := eval.NewRunner(openAIJudge)

	c := eval.Case{
		Input:   "How do I cancel my plan?",
		Output:  "You can cancel from Billing > Subscription.",
		Expected: "cancel",
	}

	result := runner.Run(t, eval.Precheck{
		Pre:  eval.Contains{},
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
                <th className="py-2 text-left font-semibold text-[var(--foreground)]">How It Works</th>
                <th className="py-2 text-left font-semibold text-[var(--foreground)]">Threshold</th>
              </tr>
            </thead>
            <tbody>
              {metrics.map((m, i) => (
                <tr key={m.name} className={`border-b border-[var(--table-border)] ${i % 2 === 0 ? 'bg-[var(--table-stripe)]' : ''}`}>
                  <td className="py-2.5 font-mono text-[var(--accent)]">{m.name}</td>
                  <td className="py-2.5">
                    <span className={`metric-tag ${m.type === 'Deterministic' ? 'deterministic' : 'judge'}`}>
                      {m.type}
                    </span>
                  </td>
                  <td className="py-2.5 text-[var(--secondary)]">{m.purpose}</td>
                  <td className="py-2.5 text-[var(--muted)] text-xs">{m.howItWorks}</td>
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
          Deterministic metrics do not call an LLM judge. They are fast, cheap, and reproducible—ideal for prechecks and extraction validation.
        </p>
        <div className="mt-4 grid gap-3 md:grid-cols-2">
          {["Contains", "Regex", "JSONPath", "FieldCount"].map((name) => (
            <div key={name} className="p-3 border border-[var(--border)] rounded-md bg-[var(--surface)]">
              <span className="font-mono text-[var(--accent)]">{name}</span>
              <p className="mt-1 text-xs text-[var(--muted)]">Binary pass/fail based on exact criteria</p>
            </div>
          ))}
        </div>
      </section>

      <section id="precheck" className="mt-12 scroll-mt-20">
        <h2 className="mb-4 text-2xl font-semibold border-b border-[var(--border)] pb-2">Precheck</h2>
        <p className="text-[var(--secondary)]">
          Conditional wrapper that skips expensive LLM metrics if a pre-check fails. Run a fast deterministic check first; if it fails, skip the main metric entirely to save cost and latency.
        </p>
        <div className="mt-4 rounded-md bg-[var(--surface)] p-4 border border-[var(--border)] text-sm">
          <p className="font-semibold text-[var(--foreground)]">Example: Gate expensive evaluation behind format check</p>
          <pre className="mt-2 bg-[var(--code-bg)] p-3 rounded font-mono text-xs overflow-x-auto">
            <code>{`r.Run(t, eval.Precheck{
	Pre:  eval.Contains{Substring: "cancel"},
	Main: eval.Compound{
		Dimensions: []eval.Dimension{
			{Name: "helpfulness", Rubric: "...", Threshold: 0.7},
		},
	},
}, c)`}</code>
          </pre>
          <p className="mt-2 text-xs text-[var(--muted)]">If &quot;cancel&quot; isn&apos;t found in output, the Compound metric is skipped entirely.</p>
        </div>
      </section>

      <section id="compound" className="mt-12 scroll-mt-20">
        <h2 className="mb-4 text-2xl font-semibold border-b border-[var(--border)] pb-2">Compound Metrics</h2>
        <p className="text-[var(--secondary)]">
          Compound scoring evaluates multiple rubric dimensions in one judge call, reducing latency and token cost while preserving structured per-dimension results.
        </p>
        <div className="mt-4 rounded-md bg-[var(--surface)] p-4 border border-[var(--border)] text-sm">
          <p className="font-semibold text-[var(--foreground)]">Example: Multi-dimension rubric</p>
          <pre className="mt-2 bg-[var(--code-bg)] p-3 rounded font-mono text-xs overflow-x-auto">
            <code>{`eval.Compound{
  Dimensions: []eval.Dimension{
    {Name: "helpfulness", Rubric: "...", Threshold: 0.7},
    {Name: "safety", Rubric: "...", Threshold: 0.9},
    {Name: "accuracy", Rubric: "...", Threshold: 0.8},
  },
}`}</code>
          </pre>
        </div>
      </section>

      <section id="ci-cd" className="mt-12 scroll-mt-20">
        <h2 className="mb-4 text-2xl font-semibold border-b border-[var(--border)] pb-2">CI/CD</h2>
        <p className="text-[var(--secondary)]">
          Enable evaluations explicitly with the <code className="bg-[var(--code-bg)] px-1.5 py-0.5 rounded text-[var(--accent)]">GOEVAL=1</code> environment variable. Without it, all evals skip silently—keeping local development and CI safe by default.
        </p>
        <pre className="mt-4 bg-[var(--code-bg)] border border-[var(--border)] rounded-md px-4 py-3 font-mono text-sm">
          <code>{`# Enable evals
GOEVAL=1 go test ./...

# With result logging
GOEVAL_RESULTS_DIR=./results GOEVAL=1 go test ./...

# Benchmark comparison
GOEVAL=1 go test -bench=. -count=5 > old.txt
GOEVAL=1 go test -bench=. -count=5 > new.txt
benchstat old.txt new.txt`}</code>
        </pre>
      </section>

      <section id="troubleshooting" className="mt-12 scroll-mt-20">
        <h2 className="mb-4 text-2xl font-semibold border-b border-[var(--border)] pb-2">Troubleshooting</h2>
        <div className="mt-4 space-y-2">
          {[
            { q: "Evals are skipped unexpectedly", a: "Confirm GOEVAL=1 is set in your environment before running tests." },
            { q: "Judge calls fail intermittently", a: "Verify provider credentials, rate limits, and model availability. Use deterministic prechecks to reduce judge call volume." },
            { q: "Getting detailed API reference", a: "Use package docs: go doc github.com/igcodinap/go-eval" },
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