"use client";

import { useState } from "react";
import { IconShare } from "@/components/icons";

export function ShareButton() {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch {
      setCopied(false);
    }
  }

  return (
    <div className="absolute top-4 right-4 z-3">
      <button type="button" className="rounded-full bg-white p-2" aria-haspopup="dialog" aria-expanded={copied} onClick={copy} aria-label="Share product">
        <IconShare className="h-4 w-4 stroke-2 stroke-fig" />
      </button>
      {copied ? <p className="absolute top-10 right-0 rounded-md bg-white px-3 py-2 text-xs font-medium shadow-sm">Link copied</p> : null}
    </div>
  );
}
