"use client";

import { useEffect, useRef } from "react";

interface SlideOverProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

export function SlideOver({ isOpen, onClose, title, children }: SlideOverProps) {
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      document.addEventListener("keydown", handleKey);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <div
        className="absolute inset-0 bg-black/50"
        onClick={onClose}
        aria-hidden="true"
      />
      <div
        ref={panelRef}
        className="relative ml-auto h-full w-full max-w-2xl overflow-y-auto bg-[var(--surface)] border-l border-[var(--border)] shadow-xl animate-slide-in"
        role="dialog"
        aria-modal="true"
        aria-labelledby="slide-over-title"
      >
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-[var(--border)] bg-[var(--surface)] px-6 py-4">
          <h2 id="slide-over-title" className="font-mono text-lg font-semibold text-[var(--foreground)]">
            {title}
          </h2>
          <button
            onClick={onClose}
            className="rounded-md p-1.5 text-[var(--muted)] hover:bg-[var(--hover)] hover:text-[var(--foreground)]"
            aria-label="Close panel"
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M15 5L5 15M5 5l10 10" />
            </svg>
          </button>
        </div>
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
}
