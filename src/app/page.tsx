import Image from "next/image";
import Link from "next/link";
import { ThemeToggle } from "@/components/theme-toggle";

function GitHubIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="currentColor">
      <path d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.68c-2.78.61-3.37-1.18-3.37-1.18-.45-1.15-1.11-1.45-1.11-1.45-.9-.62.07-.61.07-.61 1 .07 1.53 1.03 1.53 1.03.89 1.52 2.33 1.08 2.9.83.09-.65.35-1.08.63-1.32-2.22-.25-4.55-1.11-4.55-4.95 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.64 0 0 .84-.27 2.75 1.02a9.6 9.6 0 0 1 5 0c1.91-1.29 2.75-1.02 2.75-1.02.55 1.37.2 2.39.1 2.64.64.7 1.03 1.59 1.03 2.68 0 3.85-2.33 4.7-4.56 4.95.36.31.68.93.68 1.87v2.77c0 .27.18.58.69.48A10 10 0 0 0 12 2Z" />
    </svg>
  );
}

function SlackIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 960 960" aria-hidden="true" className={className} fill="currentColor">
      <path d="M640.301 367.929C672.66 323.584 742.473 360.638 739.577 410.875C739.077 473.197 692.536 477.392 642.298 474.696C614.733 476.493 627.617 381.112 640.301 367.929Z" />
      <path d="M635.708 617.116C601.351 617.715 565.896 620.711 532.537 610.624C453.636 582.859 500.377 472.297 574.984 486.679C617.731 487.078 660.977 485.58 703.124 493.87C750.964 501.76 758.754 567.578 724.597 595.343C700.328 617.415 666.17 614.919 635.708 617.116Z" />
      <path d="M430.763 355.844C376.73 341.063 316.805 344.858 262.173 354.546C213.334 361.837 192.66 448.329 248.391 466.905C282.548 476.394 318.503 474.796 353.559 476.893C373.634 471.999 402.298 479.789 424.471 472.099C473.409 455.02 485.095 374.621 430.763 355.844ZM337.779 518.441C340.675 489.078 326.992 483.485 300.725 486.381C201.349 472.199 202.947 628.703 300.825 610.826C340.376 598.541 336.88 552.099 337.779 518.441ZM506.368 77.9916C604.945 75.1951 727.791 52.0241 801.699 134.121C881 214.421 865.22 335.67 873.509 439.14C875.407 581.662 916.156 792.498 750.962 859.215C681.549 881.088 607.742 879.989 535.831 885.282C394.009 888.379 201.349 905.357 120.85 761.637C86.1934 680.838 86.5929 590.551 80.3008 505.158C87.8913 129.028 118.153 63.8093 506.368 77.9916ZM642.198 474.696C692.436 477.392 738.977 473.198 739.477 410.875C742.373 360.638 672.66 323.585 640.201 367.929C627.617 381.113 614.733 476.493 642.198 474.696ZM466.418 271.25C464.021 239.59 432.66 223.41 403.197 225.008C326.393 227.605 306.918 346.456 437.055 335.17C481.499 339.864 466.818 299.714 466.418 271.25ZM476.705 537.317C470.713 506.856 437.854 489.277 412.785 488.079C362.948 484.783 347.567 542.91 349.764 583.56C349.065 643.984 342.573 757.442 435.557 738.266C491.087 721.287 472.91 648.179 479.402 603.535C474.808 584.858 480.9 558.291 476.705 537.317ZM574.982 486.581C500.376 472.199 453.534 582.761 532.535 610.526C565.894 620.713 601.35 617.617 635.707 617.018C666.168 614.92 700.426 617.417 724.595 595.245C758.853 567.48 750.963 501.562 703.122 493.772C660.975 485.482 617.729 486.98 574.982 486.581ZM615.831 321.487C617.829 276.144 604.046 216.219 544.72 218.816C521.549 220.513 502.773 231.2 496.181 254.671C486.293 297.617 486.393 342.561 486.094 386.506C471.811 461.612 577.379 511.749 608.64 431.65C620.426 396.194 615.831 358.341 615.831 321.487ZM556.206 739.665C636.306 734.171 648.291 617.018 525.045 628.503C474.009 624.808 492.885 660.763 492.685 695.919C495.881 726.381 528.141 740.963 556.206 739.665" />
      <path d="M608.739 431.748C577.478 511.847 471.91 461.71 486.192 386.604C486.392 342.659 486.392 297.715 496.279 254.769C502.871 231.398 521.648 220.612 544.819 218.914C604.144 216.317 617.927 276.242 615.93 321.585C615.83 358.339 620.424 396.192 608.739 431.748Z" />
      <path d="M525.044 628.503C648.29 617.017 636.305 734.171 556.205 739.664C528.14 740.962 495.881 726.48 492.685 695.919C492.884 660.763 474.008 624.808 525.044 628.503Z" />
      <path d="M412.784 487.978C437.853 489.177 470.712 506.755 476.705 537.217C480.899 558.19 474.807 584.757 479.401 603.334C472.809 647.878 491.087 721.087 435.556 738.066C342.572 757.341 349.164 643.883 349.763 583.359C347.566 542.81 362.947 484.782 412.784 487.978Z" />
      <path d="M403.198 225.109C432.661 223.412 464.022 239.591 466.419 271.352C466.818 299.816 481.5 339.966 436.955 335.372C306.918 346.458 326.394 227.606 403.198 225.109Z" />
      <path d="M262.273 354.546C316.904 344.958 376.829 341.063 430.862 355.845C485.194 374.621 473.509 455.021 424.57 472.099C402.398 479.79 373.833 472 353.658 476.893C318.602 474.796 282.647 476.394 248.49 466.906C192.76 448.329 213.434 361.837 262.273 354.546Z" />
      <path d="M300.726 486.383C327.093 483.486 340.776 488.98 337.78 518.443C336.881 552.101 340.377 598.543 300.826 610.827C202.948 628.705 201.35 472.3 300.726 486.383Z" />
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
];

const metrics = [
  {
    name: "Faithfulness",
    type: "judge",
    purpose: "Verify RAG outputs don't contradict the retrieved context",
    howItWorks: "Judge checks each output claim against the Context, scoring the fraction that's supported",
    threshold: "0.8",
  },
  {
    name: "Hallucination",
    type: "judge",
    purpose: "Catch outputs that invent facts not present in Context",
    howItWorks: "Judge identifies claims that don't appear in Context; score = non-invented / total",
    threshold: "0.9",
  },
  {
    name: "AnswerRelevancy",
    type: "judge",
    purpose: "Ensure outputs actually address the user's question",
    howItWorks: "Judge evaluates whether Output directly answers Input, penalizing tangentially related responses",
    threshold: "0.7",
  },
  {
    name: "ContextPrecision",
    type: "judge",
    purpose: "Check if retrieved documents actually help answer the Input",
    howItWorks: "Judge scores each retrieved doc on relevance to Input, reports mean precision",
    threshold: "0.7",
  },
  {
    name: "GEval",
    type: "judge",
    purpose: "Score custom criteria the built-in metrics don't cover",
    howItWorks: "You define Criteria (rubric description) and optional Steps; judge applies your rubric",
    threshold: "0.7",
  },
  {
    name: "Compound",
    type: "judge",
    purpose: "Evaluate multiple quality dimensions in one judge call (reduces cost)",
    howItWorks: "Multiple Dimensions with individual Rubrics evaluated together, returns per-dimension scores",
    threshold: "per-dimension",
  },
  {
    name: "Contains",
    type: "deterministic",
    purpose: "Fast gate for mandatory text or keywords before expensive LLM checks",
    howItWorks: "Simple substring search; pass if exact string found, fail otherwise",
    threshold: "binary",
  },
  {
    name: "Regex",
    type: "deterministic",
    purpose: "Validate output format compliance (emails, IDs, codes, etc.)",
    howItWorks: "Pattern match using regex; pass if matches, fail if doesn't match",
    threshold: "binary",
  },
  {
    name: "JSONPath",
    type: "deterministic",
    purpose: "Assert specific values in structured JSON outputs (API responses, extracted data)",
    howItWorks: "Extract value at your JSONPath, compare to expected value",
    threshold: "binary",
  },
  {
    name: "FieldCount",
    type: "deterministic",
    purpose: "Enforce minimum field count in JSON outputs (completeness check)",
    howItWorks: "Count non-null top-level keys; pass if >= configured minimum",
    threshold: "config",
  },
];

export default function Home() {
  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-50 border-b border-[var(--border)] bg-[var(--header-bg)]">
        <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4 md:px-8">
          <div className="flex items-center gap-6">
            <Link href="/" className="flex items-center gap-2">
              <Image src="/logo.png" alt="go-eval logo" width={28} height={28} className="rounded" />
              <span className="go-logo text-lg font-bold">go-eval</span>
              <span className="text-xs text-[var(--muted)]">v0.2</span>
            </Link>
            <nav className="hidden md:flex items-center gap-1 text-sm">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="px-3 py-2 text-[var(--secondary)] hover:text-[var(--foreground)] hover:no-underline"
                >
                  {item.label}
                </a>
              ))}
            </nav>
          </div>
          <div className="flex items-center gap-3">
            <a
              href="https://join.slack.com/t/goeval/shared_invite/zt-3vz9qlmpw-uBiyB_oZOFsjntlbP7l0EQ"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm text-[var(--secondary)] hover:text-[var(--foreground)]"
            >
              <SlackIcon className="h-5 w-5" />
              <span className="hidden sm:inline">Slack</span>
            </a>
            <a
              href="https://github.com/igcodinap/go-eval"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm text-[var(--secondary)] hover:text-[var(--foreground)]"
            >
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
                Two categories: <span className="metric-tag judge">LLM-as-Judge</span> for semantic evaluation, <span className="metric-tag deterministic">Deterministic</span> for fast prechecks.
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
                      <tr key={metric.name} className={`border-b border-[var(--table-border)] ${i % 2 === 0 ? 'bg-[var(--table-stripe)]' : ''}`}>
                        <td className="py-2.5 font-mono text-[var(--accent)]">{metric.name}</td>
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
                Compare evaluation runs across prompt or model changes using <code className="bg-[var(--code-bg)] px-1.5 py-0.5 rounded text-[var(--accent)]">go test -bench</code> and <code className="bg-[var(--code-bg)] px-1.5 py-0.5 rounded text-[var(--accent)]">benchstat</code>.
              </p>
              <pre className="bg-[var(--code-bg)] border border-[var(--border)] rounded-md px-4 py-3 font-mono text-sm overflow-x-auto">
                <code>{`func BenchmarkRAGLatency(b *testing.B) {
	r := eval.NewRunner(newMyJudge(b))
	c := eval.Case{Input: "...", Output: "...", Context: docs}

	eval.Bench(b, r, eval.Faithfulness{Threshold: 0.8}, c)
}`}</code>
              </pre>
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
            </section>

            <section id="concepts" className="mb-12 scroll-mt-20">
              <h2 className="mb-4 text-2xl font-semibold border-b border-[var(--border)] pb-2">Core Concepts</h2>
              <div className="grid gap-4 md:grid-cols-2">
                {[
                  { term: "Case", desc: "Input, expected output, context, and optional metadata for a single evaluation scenario." },
                  { term: "Metric", desc: "A scoring function (Faithfulness, Contains, etc.) with a threshold and optional configuration." },
                  { term: "Judge", desc: "Your implementation of LLM-as-judge. Receives prompts, returns scores with reasoning." },
                  { term: "Runner", desc: "Executes Cases with Metrics. Handles parallelism, subtests, and result aggregation." },
                ].map((item) => (
                  <div key={item.term} className="p-4 border border-[var(--border)] rounded-md bg-[var(--surface)]">
                    <dt className="font-mono font-semibold text-[var(--accent)]">{item.term}</dt>
                    <dd className="mt-1 text-sm text-[var(--secondary)]">{item.desc}</dd>
                  </div>
                ))}
              </div>
            </section>
          </main>

          <aside className="hidden w-48 shrink-0 xl:block">
            <div className="sticky top-20 text-sm">
              <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-[var(--muted)]">On This Page</p>
              <ul className="space-y-1 text-[var(--secondary)]">
                <li><a href="#overview" className="block py-1">Overview</a></li>
                <li><a href="#install" className="block py-1">Install</a></li>
                <li><a href="#quickstart" className="block py-1">Quick Start</a></li>
                <li><a href="#metrics" className="block py-1">Metrics</a></li>
                <li><a href="#benchmarks" className="block py-1">Benchmarks</a></li>
                <li><a href="#cicd" className="block py-1">CI/CD</a></li>
              </ul>
            </div>
          </aside>
        </div>
      </div>

      <footer className="border-t border-[var(--border)] bg-[var(--surface)]">
        <div className="mx-auto max-w-7xl px-4 py-6 md:px-8">
          <p className="text-sm text-[var(--muted)]">
            go-eval v0.2 — MIT License —{" "}
            <a href="https://github.com/igcodinap/go-eval" className="text-[var(--accent)]">
              github.com/igcodinap/go-eval
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
}