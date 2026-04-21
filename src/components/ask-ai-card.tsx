"use client";

import { useMemo, useState } from "react";

type AskAICardProps = {
  pageTitle: string;
  pageSummary: string;
  pageUrlPath: string;
};

const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? "").replace(/\/+$/, "");

function buildPrompt({
  pageTitle,
  pageSummary,
  pageUrlPath,
}: AskAICardProps): string {
  const pageUrl = siteUrl ? `${siteUrl}${pageUrlPath}` : pageUrlPath;

  return [
    `I'm reading this go-eval documentation page: ${pageUrl}`,
    "",
    `Page title: ${pageTitle}`,
    `Context summary: ${pageSummary}`,
    "",
    "Help me with:",
    "1. A concise explanation for a teammate new to go-eval.",
    "2. A practical implementation checklist.",
    "3. One code example I can adapt immediately.",
    "4. Common pitfalls and how to avoid them.",
  ].join("\n");
}

async function copyToClipboard(text: string) {
  if (typeof navigator !== "undefined" && navigator.clipboard?.writeText) {
    await navigator.clipboard.writeText(text);
    return;
  }

  const fallbackTextArea = document.createElement("textarea");
  fallbackTextArea.value = text;
  fallbackTextArea.setAttribute("readonly", "");
  fallbackTextArea.style.position = "absolute";
  fallbackTextArea.style.left = "-9999px";
  document.body.appendChild(fallbackTextArea);
  fallbackTextArea.select();
  document.execCommand("copy");
  document.body.removeChild(fallbackTextArea);
}

export function AskAICard(props: AskAICardProps) {
  const [copied, setCopied] = useState(false);

  const prompt = useMemo(() => buildPrompt(props), [props]);

  async function handleCopy() {
    await copyToClipboard(prompt);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
  }

  return (
    <aside className="surface-card rounded-2xl p-5">
      <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[var(--muted)]">
        Ask AI About This Page
      </p>
      <p className="mt-3 text-sm leading-6 text-[var(--muted)]">
        Send a ready-made prompt to coding agents with this page context.
      </p>

      <div className="mt-4 grid gap-2">
        <button
          type="button"
          onClick={handleCopy}
          className="rounded-xl border border-[var(--border)] bg-[var(--surface-strong)] px-3 py-2 text-left text-sm font-medium text-[var(--foreground)] transition hover:border-[var(--accent)]"
        >
          {copied ? "Copied Prompt" : "Copy Prompt"}
        </button>
        <a
          href={`https://chatgpt.com/?q=${encodeURIComponent(prompt)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-xl border border-[var(--border)] bg-[var(--surface-strong)] px-3 py-2 text-sm font-medium text-[var(--foreground)] transition hover:border-[var(--accent)]"
        >
          Open in ChatGPT
        </a>
        <a
          href={`https://claude.ai/new?q=${encodeURIComponent(prompt)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-xl border border-[var(--border)] bg-[var(--surface-strong)] px-3 py-2 text-sm font-medium text-[var(--foreground)] transition hover:border-[var(--accent)]"
        >
          Open in Claude
        </a>
        <a
          href={`https://cursor.com/link/prompt?text=${encodeURIComponent(prompt)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-xl border border-[var(--border)] bg-[var(--surface-strong)] px-3 py-2 text-sm font-medium text-[var(--foreground)] transition hover:border-[var(--accent)]"
        >
          Open in Cursor
        </a>
        <button
          type="button"
          onClick={handleCopy}
          className="rounded-xl border border-[var(--border)] bg-[var(--surface-strong)] px-3 py-2 text-left text-sm font-medium text-[var(--foreground)] transition hover:border-[var(--accent)]"
        >
          Copy for Copilot / Windsurf
        </button>
      </div>
    </aside>
  );
}
