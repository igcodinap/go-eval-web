"use client";

type Theme = "light" | "dark";

const STORAGE_KEY = "goeval-theme";

function resolveTheme(): Theme {
  const stored = window.localStorage.getItem(STORAGE_KEY);
  if (stored === "light" || stored === "dark") {
    return stored;
  }
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

function applyTheme(theme: Theme) {
  document.documentElement.setAttribute("data-theme", theme);
}

export function ThemeToggle() {
  function toggleTheme() {
    const current = resolveTheme();
    const nextTheme: Theme = current === "dark" ? "light" : "dark";
    applyTheme(nextTheme);
    window.localStorage.setItem(STORAGE_KEY, nextTheme);
  }

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="inline-flex h-10 items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--surface-strong)] px-4 text-sm font-medium text-[var(--foreground)] transition hover:border-[var(--accent)]"
      aria-label="Toggle theme"
    >
      <span className="inline-block h-2 w-2 rounded-full bg-[var(--accent)]" />
      Toggle theme
    </button>
  );
}
