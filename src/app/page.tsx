"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { ThemeToggle } from "@/components/theme-toggle";
import { SlideOver } from "@/components/slide-over";
import { metricDetails, MetricDetail } from "@/data/metric-details";
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
  { label: "Metrics", href: "#metrics" },
  { label: "Benchmarks", href: "#benchmarks" },
  { label: "CI/CD", href: "#cicd" },
  { label: "Concepts", href: "#concepts" },
];

const versions = [
  { label: "v0.3 (current)", value: "v0.3", badge: "stable" },
  { label: "v0.2", value: "v0.2", badge: "legacy" },
];

const metricsV02: Array<{name: string; type: string; purpose: string; howItWorks: string; threshold: string; badge?: string}> = [
  { name: "Faithfulness", type: "judge", purpose: "Verify RAG outputs don't contradict the retrieved context", howItWorks: "Judge checks each output claim against the Context, scoring the fraction that's supported", threshold: "0.8" },
  { name: "Hallucination", type: "judge", purpose: "Catch outputs that invent facts not present in Context", howItWorks: "Judge identifies claims that don't appear in Context; score = non-invented / total", threshold: "0.9" },
  { name: "AnswerRelevancy", type: "judge", purpose: "Ensure outputs actually address the user's question", howItWorks: "Judge evaluates whether Output directly answers Input, penalizing tangentially related responses", threshold: "0.7" },
  { name: "ContextPrecision", type: "judge", purpose: "Check if retrieved documents actually help answer the Input", howItWorks: "Judge scores each retrieved doc on relevance to Input, reports mean precision", threshold: "0.7" },
  { name: "GEval", type: "judge", purpose: "Score custom criteria the built-in metrics don't cover", howItWorks: "You define Criteria (rubric description) and optional Steps; judge applies your rubric", threshold: "0.7" },
  { name: "Compound", type: "judge", purpose: "Evaluate multiple quality dimensions in one judge call (reduces cost)", howItWorks: "Multiple Dimensions with individual Rubrics evaluated together, returns per-dimension scores", threshold: "per-dimension" },
  { name: "Precheck", type: "deterministic", purpose: "Conditional evaluation gate - skip expensive LLM checks if pre metric fails", howItWorks: "Runs a deterministic metric first; if it fails, skips the main LLM metric entirely", threshold: "binary" },
  { name: "Contains", type: "deterministic", purpose: "Fast gate for mandatory text or keywords before expensive LLM checks", howItWorks: "Simple substring search; pass if exact string found, fail otherwise", threshold: "binary" },
  { name: "Regex", type: "deterministic", purpose: "Validate output format compliance (emails, IDs, codes, etc.)", howItWorks: "Pattern match using regex; pass if matches, fail if doesn't match", threshold: "binary" },
  { name: "JSONPath", type: "deterministic", purpose: "Assert specific values in structured JSON outputs (API responses, extracted data)", howItWorks: "Extract value at your JSONPath, compare to expected value", threshold: "binary" },
  { name: "FieldCount", type: "deterministic", purpose: "Enforce minimum field count in JSON outputs (completeness check)", howItWorks: "Count non-null top-level keys; pass if >= configured minimum", threshold: "config" },
];

const metricsV03 = [
  ...metricsV02,
  { name: "ConversationMetric", type: "judge", purpose: "Evaluate multi-turn agent conversations", howItWorks: "Tracks context across multiple turns, evaluates coherence and task completion", threshold: "0.7", badge: "v0.3" },
];

function MetricDetailPanel({ metric }: { metric: MetricDetail }) {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <span className={`metric-tag ${metric.type}`}>{metric.type}</span>
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
            <pre className="bg-[var(--code-bg)] border border-[var(--border)] rounded-md px-4 py-3 font-mono text-sm text-[var(--secondary)]">
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
      <div>
        <p className="text-sm text-[var(--secondary)] mb-4">{metric.description}</p>
      </div>

      <div>
        <h3 className="text-sm font-semibold text-[var(--muted)] uppercase tracking-wide mb-3">Details</h3>
        <div className="text-sm text-[var(--foreground)] whitespace-pre-wrap">
          {metric.details}
        </div>
      </div>

      {metric.example?.output && (
        <div>
          <h3 className="text-sm font-semibold text-[var(--muted)] uppercase tracking-wide mb-3">Example Output</h3>
          <pre className="bg-[var(--code-bg)] border border-[var(--border)] rounded-md px-4 py-3 font-mono text-sm text-[var(--secondary)]">
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
      <div>
        <p className="text-sm text-[var(--secondary)] mb-4">{concept.description}</p>
      </div>

      <div>
        <h3 className="text-sm font-semibold text-[var(--muted)] uppercase tracking-wide mb-3">Details</h3>
        <div className="text-sm text-[var(--foreground)] whitespace-pre-wrap">
          {concept.details}
        </div>
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
  const [currentVersion, setCurrentVersion] = useState("v0.2");
  

  const metrics = currentVersion === "v0.3" ? metricsV03 : metricsV02;

  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-50 border-b border-[var(--border)] bg-[var(--header-bg)]">
        <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4 md:px-8">
          <div className="flex items-center gap-6">
            <Link href="/" className="flex items-center gap-2">
              <Image src="/logo.png" alt="go-eval logo" width={28} height={28} className="rounded" />
              <span className="go-logo text-lg font-bold">go-eval</span>
              <select
                value={currentVersion}
                onChange={(e) => setCurrentVersion(e.target.value)}
                className="text-xs bg-[var(--surface)] border border-[var(--border)] rounded px-1.5 py-0.5 text-[var(--muted)] cursor-pointer"
              >
                {versions.map((v) => (
                  <option key={v.value} value={v.value}>
                    {v.label}
                  </option>
                ))}
              </select>
            </Link>
            <nav className="hidden md:flex items-center gap-1 text-sm">
              {navItems.map((item) => (
                <a key={item.label} href={item.href} className="px-3 py-2 text-[var(--secondary)] hover:text-[var(--foreground)] hover:no-underline">
                  {item.label}
                </a>
              ))}
            </nav>
          </div>
          <div className="flex items-center gap-3">
            <a href="https://github.com/igcodinap/go-eval/releases" target="_blank" rel="noopener noreferrer" className="text-xs text-[var(--muted)] hover:text-[var(--foreground)]">
              Changelog
            </a>
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
              <p className="text-xl text-[var(--secondary)]">LLM evaluation for Go — go test native.</p>
            </section>

            <section id="install" className="mb-12 scroll-mt-20">
              <h2 className="mb-4 text-2xl font-semibold border-b border-[var(--border)] pb-2">Install</h2>
              <pre className="bg-[var(--code-bg)] border border-[var(--border)] rounded-md px-4 py-3 font-mono text-sm">
                <code>go get github.com/igcodinap/go-eval</code>
              </pre>
            </section>

            <section id="quickstart" className="mb-12 scroll-mt-20">
              <h2 className="mb-4 text-2xl font-semibold border-b border-[var(--border)] pb-2">Quick Start</h2>
              <p className="mb-4 text-[var(--secondary)]">
                Write evaluation cases using standard Go tests. Import the package, define a Judge, create Cases, and run Metrics.
              </p>
              <pre className="bg-[var(--code-bg)] border border-[var(--border)] rounded-md px-4 py-3 font-mono text-sm overflow-x-auto">
                <code>{`package evaltest

import (
	"testing"

	eval "github.com/igcodinap/go-eval"
)

func TestRAGAnswer(t *testing.T) {
	judge := newMyJudge(t)
	r := eval.NewRunner(judge)

	c := eval.Case{
		Input:   "What's the capital of France?",
		Output:  myRAG.Answer("What's the capital of France?"),
		Context: []string{"Paris is the capital of France..."},
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
                  Without <code className="bg-[var(--code-bg)] px-1 py-0.5 rounded text-[var(--accent)]">GOEVAL=1</code>, all evaluations skip silently. This keeps local development and CI pipelines safe until you explicitly enable them.
                </p>
              </div>
            </section>

            <section id="metrics" className="mb-12 scroll-mt-20">
              <h2 className="mb-4 text-2xl font-semibold border-b border-[var(--border)] pb-2">Metrics</h2>
              <p className="mb-4 text-[var(--secondary)]">
                Two categories: <span className="metric-tag judge">LLM-as-Judge</span> for semantic evaluation, <span className="metric-tag deterministic">Deterministic</span> for fast prechecks. Click any metric for code example and output.
              </p>
              <div className="overflow-x-auto">
                <table className="w-full text-sm border-collapse">
                  <thead>
                    <tr className="border-b border-[var(--table-border)]">
                      <th className="py-2 text-left font-semibold text-[var(--foreground)]">Metric</th>
                      <th className="py-2 text-left font-semibold text-[var(--foreground)]">Purpose</th>
                      <th className="py-2 text-left font-semibold text-[var(--foreground)]">How It Works</th>
                      <th className="py-2 text-left font-semibold text-[var(--foreground)]">Threshold</th>
                    </tr>
                  </thead>
                  <tbody>
                    {metrics.map((metric, i) => (
                      <tr
                        key={metric.name}
                        onClick={() => setSelectedMetric(metric.name)}
                        className={`border-b border-[var(--table-border)] cursor-pointer hover:bg-[var(--hover,var(--surface))] ${i % 2 === 0 ? 'bg-[var(--table-stripe)]' : ''}`}
                      >
                        <td className="py-2.5">
                          <span className={`font-mono ${metric.type === 'judge' ? 'text-[var(--accent)]' : 'text-[#28a745]'}`}>{metric.name}</span>
                          {metric.badge && (
                            <span className={`ml-2 text-xs px-1.5 py-0.5 rounded ${
                              metric.badge === 'v0.2' ? 'bg-[var(--accent)]/10 text-[var(--accent)]' :
                              metric.badge === 'unreleased' ? 'bg-yellow-500/10 text-yellow-600' : ''
                            }`}>{metric.badge}</span>
                          )}
                        </td>
                        <td className="py-2.5 text-[var(--secondary)]">{metric.purpose}</td>
                        <td className="py-2.5 text-[var(--muted)] text-xs">{metric.howItWorks}</td>
                        <td className="py-2.5 font-mono text-[var(--muted)]">{metric.threshold}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
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

              <div className="mt-6 space-y-4">
                <h3 className="text-sm font-semibold text-[var(--foreground)]">Metrics Tracked</h3>
                <div className="grid gap-3 md:grid-cols-2">
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
              </div>

              <div className="mt-6">
                <h3 className="text-sm font-semibold text-[var(--foreground)] mb-3">Compare Runs</h3>
                <pre className="bg-[var(--code-bg)] border border-[var(--border)] rounded-md px-4 py-3 font-mono text-sm overflow-x-auto">
                  <code>{`# Baseline
GOEVAL=1 go test -bench=. -count=5 > old.txt

# After changes
GOEVAL=1 go test -bench=. -count=5 > new.txt

# Statistical comparison
benchstat old.txt new.txt`}</code>
                </pre>
              </div>

              <div className="mt-6">
                <h3 className="text-sm font-semibold text-[var(--foreground)] mb-3">Persist Results</h3>
                <p className="mb-3 text-sm text-[var(--secondary)]">
                  Configure a <code className="bg-[var(--code-bg)] px-1 py-0.5 rounded text-[var(--accent)]">ResultSink</code> to write detailed JSONL logs for every run:
                </p>
                <pre className="bg-[var(--code-bg)] border border-[var(--border)] rounded-md px-4 py-3 font-mono text-sm overflow-x-auto">
                  <code>{`r := eval.NewRunner(judge,
	eval.WithResultSink(eval.DefaultResultSink()),
)`}</code>
                </pre>
                <p className="mt-2 text-sm text-[var(--muted)]">
                  Set <code className="bg-[var(--code-bg)] px-1 py-0.5 rounded text-[var(--accent)]">GOEVAL_RESULTS_DIR=/path/to/dir</code> to write <code className="bg-[var(--code-bg)] px-1 py-0.5 rounded text-[var(--accent)]">results.jsonl</code>.
                </p>
              </div>

              <div className="mt-6">
                <h3 className="text-sm font-semibold text-[var(--foreground)] mb-3">JSONL Result Structure</h3>
                <p className="mb-3 text-sm text-[var(--secondary)]">
                  Each line in results.jsonl contains one evaluation run:
                </p>
                <pre className="bg-[var(--code-bg)] border border-[var(--border)] rounded-md px-4 py-3 font-mono text-xs overflow-x-auto">
                  <code>{`{
  "timestamp": "2026-04-29T10:30:00Z",
  "test_name": "TestRAGAnswer/Faithfulness",
  "metric": "Faithfulness",
  "score": 0.95,
  "passed": true,
  "reason": "19/20 claims supported by context",
  "tokens": 1250,
  "prompt_tokens": 820,
  "completion_tokens": 430,
  "latency_ns": 9452000,
  "metadata": {"flow": "rag.retrieval", "tier": "critical"}
}`}</code>
                </pre>
              </div>
            </section>

            <section id="cicd" className="mb-12 scroll-mt-20">
              <h2 className="mb-4 text-2xl font-semibold border-b border-[var(--border)] pb-2">CI/CD</h2>
              <p className="mb-4 text-[var(--secondary)]">
                Integrate into any CI pipeline with a single environment variable. Evals run inside standard <code className="bg-[var(--code-bg)] px-1.5 py-0.5 rounded text-[var(--accent)]">go test</code>, so existing Go CI infrastructure works out of the box.
              </p>
              <pre className="bg-[var(--code-bg)] border border-[var(--border)] rounded-md px-4 py-3 font-mono text-sm overflow-x-auto">
                <code>{`# Run evaluations
GOEVAL=1 go test ./...

# Run benchmarks for comparison
GOEVAL=1 go test -bench=. -count=5 > old.txt
GOEVAL=1 go test -bench=. -count=5 > new.txt
benchstat old.txt new.txt`}</code>
              </pre>
              <div className="mt-4 rounded-md bg-[var(--surface)] p-4 text-sm border border-[var(--border)]">
                <p className="font-semibold text-[var(--foreground)]">Environment Variables</p>
                <ul className="mt-2 space-y-1 text-[var(--secondary)]">
                  <li><code className="bg-[var(--code-bg)] px-1 py-0.5 rounded text-[var(--accent)]">GOEVAL=1</code> — Enable evaluations (required)</li>
                  <li><code className="bg-[var(--code-bg)] px-1 py-0.5 rounded text-[var(--accent)]">GOEVAL_TRACE=1</code> — Debug judge I/O via t.Log</li>
                  <li><code className="bg-[var(--code-bg)] px-1 py-0.5 rounded text-[var(--accent)]">GOEVAL_RESULTS_DIR</code> — Write results.jsonl here</li>
                </ul>
              </div>
            </section>

            {currentVersion === "v0.2" ? null : (
              <section id="cli" className="mb-12 scroll-mt-20">
                <h2 className="mb-4 text-2xl font-semibold border-b border-[var(--border)] pb-2">CLI</h2>
                <p className="mb-4 text-[var(--secondary)]">
                  Install the optional <code className="bg-[var(--code-bg)] px-1.5 py-0.5 rounded text-[var(--accent)]">goeval</code> CLI for a thin wrapper around common commands:
                </p>
                <pre className="bg-[var(--code-bg)] border border-[var(--border)] rounded-md px-4 py-3 font-mono text-sm mb-4">
                  <code>go install github.com/igcodinap/go-eval/cmd/goeval@latest</code>
                </pre>
                <div className="space-y-4">
                  <div className="border border-[var(--border)] rounded-md p-4 bg-[var(--surface)]">
                    <h3 className="font-semibold text-[var(--foreground)] mb-2"><code className="text-[var(--accent)]">goeval test</code></h3>
                    <p className="text-sm text-[var(--secondary)] mb-2">Run evaluations with go-eval enabled</p>
                    <pre className="bg-[var(--code-bg)] p-2 rounded text-xs font-mono">
                      <code>goeval test ./...</code>
                    </pre>
                  </div>
                  <div className="border border-[var(--border)] rounded-md p-4 bg-[var(--surface)]">
                    <h3 className="font-semibold text-[var(--foreground)] mb-2"><code className="text-[var(--accent)]">goeval compare</code></h3>
                    <p className="text-sm text-[var(--secondary)] mb-2">Compare baseline vs current result files for regressions</p>
                    <pre className="bg-[var(--code-bg)] p-2 rounded text-xs font-mono">
                      <code>goeval compare old/results.jsonl new/results.jsonl</code>
                    </pre>
                    <p className="mt-2 text-xs text-[var(--muted)]">Exits nonzero when rows regress or disappear</p>
                  </div>
                  <div className="border border-[var(--border)] rounded-md p-4 bg-[var(--surface)]">
                    <h3 className="font-semibold text-[var(--foreground)] mb-2"><code className="text-[var(--accent)]">goeval version</code></h3>
                    <p className="text-sm text-[var(--secondary)]">Print version info</p>
                  </div>
                </div>
              </section>
            )}

            <section id="concepts" className="mb-12 scroll-mt-20">
              <h2 className="mb-4 text-2xl font-semibold border-b border-[var(--border)] pb-2">Core Concepts</h2>
              <div className="grid gap-4 md:grid-cols-2">
                {[
                  { term: "Case", desc: "Input, expected output, context, and optional metadata for a single evaluation scenario." },
                  { term: "CaseMetadata", desc: "Standard keys (flow, tier, dataset) for categorizing and filtering cases." },
                  { term: "Metric", desc: "A scoring function (Faithfulness, Contains, etc.) with a threshold and optional configuration." },
                  { term: "Precheck", desc: "Conditional wrapper that skips expensive LLM metrics if a pre-check fails." },
                  { term: "Judge", desc: "Your implementation of LLM-as-judge. Receives prompts, returns scores with reasoning." },
                  { term: "JudgeMock", desc: "Scripted judge for testing without an LLM." },
                  { term: "Runner", desc: "Executes Cases with Metrics. Handles parallelism, subtests, and result aggregation." },
                  ...(currentVersion === "v0.3" ? [{ term: "ConversationMetric", desc: "Evaluate multi-turn agent conversations with context tracking across turns." }] : []),
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
            go-eval v0.3 — MIT License —{" "}
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
