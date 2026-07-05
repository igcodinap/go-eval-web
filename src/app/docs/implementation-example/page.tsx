import Link from "next/link";

const profileConfig = `{
  "profiles": {
    "pr": {
      "packages": [
        "-tags=integration",
        "./evals/travel/..."
      ],
      "tiers": ["critical"],
      "results_dir": ".goeval/pr",
      "missing_prerequisite": "skip",
      "prerequisites": [
        {"type": "env", "name": "GEMINI_API_KEY"}
      ]
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
}`;

const runnerHelper = `func goEvalOptions(t testing.TB, extra ...eval.Option) []eval.Option {
	t.Helper()

	opts := []eval.Option{
		eval.DefaultTierFilter(),
		eval.WithResultSink(eval.DefaultResultSink()),
		eval.WithRedactors(
			eval.UUIDRedactor(),
			eval.FieldRedactor("route_request_id"),
			eval.FieldRedactor("session_id"),
			eval.FieldRedactor("user_id"),
			eval.FieldRedactor("quote_id"),
		),
	}

	if filter := caseFilterFromEnv(t); filter != nil {
		opts = append(opts, filter)
	}

	return append(opts, extra...)
}`;

const artifactContract = `func routeArtifactNormalizer() eval.Normalizer {
	return eval.ChainNormalizers(
		eval.CaseFoldNormalizer(),
		eval.SpanishASCIIFoldNormalizer(),
	)
}

func routeStopContains(name string) eval.ArtifactArrayContains {
	return eval.ArtifactArrayContains{
		Key:        "route",
		Path:       "stops[*].name",
		Expected:   name,
		Normalizer: routeArtifactNormalizer(),
	}
}

func readyRouteContract(name string, minStops int, checks ...eval.Metric) eval.Contract {
	if minStops < 2 {
		minStops = 2
	}

	contractChecks := []eval.Metric{
		eval.ArtifactExists{Key: "route"},
		eval.ArtifactSubset{
			Key:      "route",
			Expected: json.RawMessage(\`{"success":true}\`),
		},
		eval.ArtifactArrayMinLen{Key: "route", Path: "stops", MinLen: minStops},
	}

	contractChecks = append(contractChecks, checks...)
	return eval.NewContract(name, contractChecks...)
}`;

const customMetric = `type RouteLegCountMatchesStopsMinusOne struct {
	Key string
}

func (m RouteLegCountMatchesStopsMinusOne) Name() string {
	return "RouteLegCountMatchesStopsMinusOne"
}

func (m RouteLegCountMatchesStopsMinusOne) Score(ctx context.Context, _ eval.Judge, c eval.Case) (eval.Result, error) {
	_ = ctx

	route, err := decodeRouteArtifact(c, m.Key)
	if err != nil {
		return eval.Result{Score: 0, Passed: false, Metric: m.Name(), Reason: err.Error()}, nil
	}

	expected := len(route.Stops) - 1
	if len(route.Legs) != expected {
		return eval.Result{
			Score:  0,
			Passed: false,
			Metric: m.Name(),
			Reason: fmt.Sprintf("got %d legs for %d stops, expected %d", len(route.Legs), len(route.Stops), expected),
		}, nil
	}

	return eval.Result{Score: 1, Passed: true, Metric: m.Name(), Reason: "route leg count matches stop count"}, nil
}`;

const scenarioExample = `func TestScenario_IncrementalCompletionToReady(t *testing.T) {
	requireGOEval(t)

	ctx := context.Background()
	agent := newRoutePlanningAgent(t, ctx)
	requestID := uuid.NewString()
	runner := eval.NewRunner(nil, goEvalOptions(t)...)

	driver := newRouteScenarioDriver(t, agent, requestID)
	state := map[string]any{
		"partial_route_idea": "Pending: cities, dates, travelers, vehicle type\\nStatus: planning",
		"complete_details":  "Confirmed: Santiago to Puerto Montt, Jan 10-Jan 20, 2 adults, campervan\\nStatus: ready",
	}

	runner.RunScenario(t, eval.Scenario{
		Name:     "incremental_completion_ready",
		Tier:     "critical",
		Tools:    travelToolRegistry(),
		Driver:   driver,
		State:    state,
		Metadata: map[string]any{
			"flow":    "travel.route",
			"tier":    "critical",
			"case_id": "route-incremental-completion",
		},
		Repeat:   eval.ScenarioRepeat{N: 3, PassRate: 2.0 / 3.0},
		Steps: []eval.Step{
			{
				Name:                  "partial_route_idea",
				Input:                 "I want a scenic campervan road trip, but I have not picked cities, dates, travelers, or vehicle yet.",
				ForbiddenTools:        []string{"plan_route"},
				ForbiddenToolPatterns: []string{"maps_*", "routes_*"},
				Timeout:               45 * time.Second,
				Checks: []eval.Metric{
					eval.ArtifactNotExists{Key: "route"},
				},
			},
			{
				Name:          "complete_details",
				Input:         "Make it Santiago to Puerto Montt from January 10 to January 20 for 2 adults in a campervan. Propose the route with stops.",
				RequiredTools: []string{"plan_route"},
				MaxToolCalls:  6,
				Timeout:       90 * time.Second,
				Checks: []eval.Metric{
					readyRouteContract(
						"ready_route",
						2,
						routeStopContains("Santiago"),
						routeStopContains("Puerto Montt"),
						RouteLegCountMatchesStopsMinusOne{Key: "route"},
					),
				},
			},
		},
	})
}`;

const runCommands = `go install github.com/igcodinap/go-eval/cmd/goeval@v1.1.0

# Run critical travel-planning evals, writing .goeval/pr/results.jsonl.
goeval test --profile pr

# Inspect one run.
goeval summarize --policy goeval.json .goeval/pr/results.jsonl

# Gate a prompt/model change against a baseline.
goeval compare --policy goeval.json baseline.jsonl .goeval/pr/results.jsonl`;

const sections = [
  { id: "shape", title: "Project Shape" },
  { id: "profile", title: "Profile" },
  { id: "runner", title: "Runner" },
  { id: "contract", title: "Contract" },
  { id: "scenario", title: "Scenario" },
  { id: "run", title: "Run" },
];

export default function ImplementationExamplePage() {
  return (
    <article>
      <div className="mb-6 text-sm text-[var(--muted)]">
        <Link href="/" className="hover:text-[var(--foreground)]">Home</Link>
        <span className="mx-2">/</span>
        <Link href="/docs/getting-started" className="hover:text-[var(--foreground)]">Docs</Link>
        <span className="mx-2">/</span>
        <span className="text-[var(--foreground)]">Implementation Example</span>
      </div>

      <h1 className="mb-4 text-4xl font-bold">Implementation Example</h1>
      <p className="text-lg text-[var(--secondary)] leading-relaxed">
        This end-to-end example shows how a Go travel-planning API can evaluate a real agent flow with a profile, shared runner options, deterministic route artifact contracts, custom metrics, scenario state, tool policies, and JSONL reporting.
      </p>

      <nav className="mt-6 flex flex-wrap gap-2 text-sm">
        {sections.map((section) => (
          <a key={section.id} href={`#${section.id}`} className="text-[var(--accent)] hover:underline">
            {section.title}
          </a>
        ))}
      </nav>

      <section id="shape" className="mt-12 scroll-mt-20">
        <h2 className="mb-4 text-2xl font-semibold border-b border-[var(--border)] pb-2">Project Shape</h2>
        <p className="text-[var(--secondary)]">
          The eval package sits beside the application code it tests. App-owned helpers build the agent, collect trajectory data, redact sensitive IDs, and translate agent outputs into <code>eval.Case</code> artifacts.
        </p>
        <pre className="mt-4 bg-[var(--code-bg)] border border-[var(--border)] rounded-md px-4 py-3 font-mono text-sm overflow-x-auto">
          <code>{`app/
├── go.mod
├── goeval.json
└── evals/travel/
    ├── runner_test.go
    ├── route_artifact_metrics_test.go
    ├── trajectory_scenarios_test.go
    └── testdata/conversation_smoke.json`}</code>
        </pre>
      </section>

      <section id="profile" className="mt-12 scroll-mt-20">
        <h2 className="mb-4 text-2xl font-semibold border-b border-[var(--border)] pb-2">1. Define The Eval Profile</h2>
        <p className="text-[var(--secondary)]">
          The profile names the integration package, limits PR runs to the critical tier, writes JSONL results, and skips when the provider key is not present.
        </p>
        <pre className="mt-4 bg-[var(--code-bg)] border border-[var(--border)] rounded-md px-4 py-3 font-mono text-sm overflow-x-auto">
          <code>{profileConfig}</code>
        </pre>
      </section>

      <section id="runner" className="mt-12 scroll-mt-20">
        <h2 className="mb-4 text-2xl font-semibold border-b border-[var(--border)] pb-2">2. Share Runner Options</h2>
        <p className="text-[var(--secondary)]">
          A small helper keeps every eval on the same tier filter, JSONL sink, redaction rules, and optional case filter.
        </p>
        <pre className="mt-4 bg-[var(--code-bg)] border border-[var(--border)] rounded-md px-4 py-3 font-mono text-sm overflow-x-auto">
          <code>{runnerHelper}</code>
        </pre>
      </section>

      <section id="contract" className="mt-12 scroll-mt-20">
        <h2 className="mb-4 text-2xl font-semibold border-b border-[var(--border)] pb-2">3. Contract The Structured Output</h2>
        <p className="text-[var(--secondary)]">
          The suite checks the route artifact before judging prose. The contract verifies that the route exists, succeeded, has enough stops, and includes expected cities with accent/case-tolerant matching.
        </p>
        <pre className="mt-4 bg-[var(--code-bg)] border border-[var(--border)] rounded-md px-4 py-3 font-mono text-sm overflow-x-auto">
          <code>{artifactContract}</code>
        </pre>
        <p className="mt-4 text-[var(--secondary)]">
          Product-specific invariants can be ordinary metrics. This one ensures a route has exactly one fewer leg than stops.
        </p>
        <pre className="mt-4 bg-[var(--code-bg)] border border-[var(--border)] rounded-md px-4 py-3 font-mono text-sm overflow-x-auto">
          <code>{customMetric}</code>
        </pre>
      </section>

      <section id="scenario" className="mt-12 scroll-mt-20">
        <h2 className="mb-4 text-2xl font-semibold border-b border-[var(--border)] pb-2">4. Run A Multi-Step Agent Scenario</h2>
        <p className="text-[var(--secondary)]">
          The scenario first proves the agent does not plan a route too early, then provides complete trip details and requires the planning tool plus the ready-route contract.
        </p>
        <pre className="mt-4 bg-[var(--code-bg)] border border-[var(--border)] rounded-md px-4 py-3 font-mono text-sm overflow-x-auto">
          <code>{scenarioExample}</code>
        </pre>
      </section>

      <section id="run" className="mt-12 scroll-mt-20">
        <h2 className="mb-4 text-2xl font-semibold border-b border-[var(--border)] pb-2">5. Run, Summarize, Compare</h2>
        <p className="text-[var(--secondary)]">
          The same profile powers local runs and CI gates. Normal <code>go test</code> remains fast unless the eval profile enables <code>GOEVAL=1</code>. With a profile <code>results_dir</code>, <code>goeval test</code> writes <code>goeval-run.json</code> next to the JSONL results for audit and artifact tracking.
        </p>
        <pre className="mt-4 bg-[var(--code-bg)] border border-[var(--border)] rounded-md px-4 py-3 font-mono text-sm overflow-x-auto">
          <code>{runCommands}</code>
        </pre>
      </section>
    </article>
  );
}
