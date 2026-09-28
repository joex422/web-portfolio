"use client";

import { Moon, Sun } from "lucide-react";
import { useSyncExternalStore } from "react";

const storageKey = "zawwana-theme";
const themeEvent = "zawwana-theme-change";

function subscribe(onChange: () => void) {
  const query = window.matchMedia("(prefers-color-scheme: dark)");
  const sync = () => {
    let saved: string | null = null;
    try {
      saved = localStorage.getItem(storageKey);
    } catch {
      /* Private browsing can disable storage. */
    }
    document.documentElement.dataset.theme =
      saved === "dark" || (saved !== "light" && query.matches)
        ? "dark"
        : "light";
    onChange();
  };
  window.addEventListener(themeEvent, onChange);
  window.addEventListener("storage", sync);
  query.addEventListener("change", sync);
  return () => {
    window.removeEventListener(themeEvent, onChange);
    window.removeEventListener("storage", sync);
    query.removeEventListener("change", sync);
  };
}

export function ThemeToggle() {
  const dark = useSyncExternalStore(
    subscribe,
    () => document.documentElement.dataset.theme === "dark",
    () => false,
  );
  const toggle = () => {
    const theme = dark ? "light" : "dark";
    document.documentElement.dataset.theme = theme;
    try {
      localStorage.setItem(storageKey, theme);
    } catch {
      /* The toggle still works without persistence. */
    }
    window.dispatchEvent(new Event(themeEvent));
  };
  return (
    <button
      type="button"
      role="switch"
      aria-label="Night mode"
      aria-checked={dark}
      onClick={toggle}
      className="theme-toggle neo-button"
      title={dark ? "Turn night mode off" : "Turn night mode on"}
    >
      {dark ? (
        <Moon size={17} aria-hidden="true" />
      ) : (
        <Sun size={17} aria-hidden="true" />
      )}
      <span className="theme-label">Night mode</span>
      <span className="theme-track" aria-hidden="true">
        <span className="theme-thumb" />
      </span>
    </button>
  );
}
