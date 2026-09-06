"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { terminalLines } from "@/data/resume";

type Phase = "command" | "output" | "hold" | "deleting";

const TYPE_COMMAND_MS = 45;
const TYPE_OUTPUT_MS = 12;
const ERASE_OUTPUT_MS = 5;
const ERASE_COMMAND_MS = 22;
const PAUSE_AFTER_COMMAND_MS = 320;
const HOLD_MS = 2800;

const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

function usePrefersReducedMotion() {
  return useSyncExternalStore(
    (onChange) => {
      const mq = window.matchMedia(REDUCED_MOTION_QUERY);
      mq.addEventListener("change", onChange);
      return () => mq.removeEventListener("change", onChange);
    },
    () => window.matchMedia(REDUCED_MOTION_QUERY).matches,
    () => false,
  );
}

export function Terminal() {
  const reducedMotion = usePrefersReducedMotion();
  const [index, setIndex] = useState(0);
  const [commandLen, setCommandLen] = useState(0);
  const [outputLen, setOutputLen] = useState(0);
  const [phase, setPhase] = useState<Phase>("command");

  const entry = terminalLines[index];

  useEffect(() => {
    if (reducedMotion) return;

    const schedule = (fn: () => void, ms: number) => {
      const id = setTimeout(fn, ms);
      return () => clearTimeout(id);
    };

    switch (phase) {
      case "command":
        if (commandLen < entry.command.length) {
          return schedule(() => setCommandLen((n) => n + 1), TYPE_COMMAND_MS);
        }
        return schedule(() => setPhase("output"), PAUSE_AFTER_COMMAND_MS);

      case "output":
        if (outputLen < entry.output.length) {
          return schedule(() => setOutputLen((n) => n + 1), TYPE_OUTPUT_MS);
        }
        return schedule(() => setPhase("hold"), 0);

      case "hold":
        return schedule(() => setPhase("deleting"), HOLD_MS);

      case "deleting":
        // Retract the output first, then the command, so the line empties the
        // same way it filled.
        if (outputLen > 0) {
          return schedule(() => setOutputLen((n) => n - 1), ERASE_OUTPUT_MS);
        }
        if (commandLen > 0) {
          return schedule(() => setCommandLen((n) => n - 1), ERASE_COMMAND_MS);
        }
        return schedule(() => {
          setIndex((i) => (i + 1) % terminalLines.length);
          setPhase("command");
        }, 260);
    }
  }, [phase, commandLen, outputLen, entry, reducedMotion]);

  const command = reducedMotion ? entry.command : entry.command.slice(0, commandLen);
  const output = reducedMotion ? entry.output : entry.output.slice(0, outputLen);
  const cursorOnCommand = phase === "command" || (phase === "deleting" && outputLen === 0);

  return (
    <div className="w-full overflow-hidden rounded-xl border border-black/10 bg-[#1d1d1f] text-left shadow-[0_8px_30px_rgba(0,0,0,0.12)]">
      {/* title bar */}
      <div className="flex items-center gap-2 border-b border-white/10 bg-[#2b2b2e] px-4 py-3">
        <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
        <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
        <span className="h-3 w-3 rounded-full bg-[#28c840]" />
        <span className="flex-1 text-center font-mono text-[11.5px] text-white/40">
          zaw@platform — zsh
        </span>
        {/* keeps the title optically centred against the traffic lights */}
        <span className="w-[54px]" aria-hidden />
      </div>

      {/* body */}
      <div className="min-h-[13rem] px-4 py-4 font-mono text-[12.5px] leading-relaxed sm:min-h-[11rem] sm:px-5 sm:text-[13px]">
        <div className="flex flex-wrap items-baseline gap-x-2">
          <span className="text-accent">➜</span>
          <span className="text-white/40">~</span>
          <span className="text-white/90">
            {command}
            {cursorOnCommand && !reducedMotion && (
              <span className="ml-0.5 inline-block h-[1em] w-[0.55em] translate-y-[0.15em] animate-terminal-cursor bg-white/80" />
            )}
          </span>
        </div>

        {(output.length > 0 || reducedMotion) && (
          <p className="mt-2 text-white/65">
            {output}
            {!cursorOnCommand && !reducedMotion && (
              <span className="ml-0.5 inline-block h-[1em] w-[0.55em] translate-y-[0.15em] animate-terminal-cursor bg-white/80" />
            )}
          </p>
        )}
      </div>
    </div>
  );
}
