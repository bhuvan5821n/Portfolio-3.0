"use client";

import { ArrowCounterClockwiseIcon } from "@phosphor-icons/react";

export function ReplayIntroButton() {
  return (
    <button
      className="replay-intro"
      type="button"
      onClick={() => window.dispatchEvent(new Event("bhuvan:replay-intro"))}
    >
      <ArrowCounterClockwiseIcon size={18} weight="bold" aria-hidden="true" />
      Replay intro
    </button>
  );
}
