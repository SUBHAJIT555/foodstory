"use client";

import { useState } from "react";

export function GiftMessage() {
  const [checked, setChecked] = useState(false);

  return (
    <div className="rounded-xl border border-[#39393B]/15 p-4">
      <label className="flex cursor-pointer items-start gap-x-3">
        <input
          type="checkbox"
          className="accent-fig mt-1 h-4 w-4 cursor-pointer rounded-lg border-2 border-black"
          checked={checked}
          onChange={(event) => setChecked(event.target.checked)}
        />
        <span className="text-sm font-semibold text-[#39393B]">Add your personal message here</span>
      </label>
      {checked ? (
        <label className="mt-3 block">
          <span className="sr-only">Personal message</span>
          <textarea
            name="gift-message"
            rows={3}
            className="w-full rounded-md border border-[#39393B]/15 p-3 text-sm"
            placeholder="Write a short note"
          />
        </label>
      ) : null}
    </div>
  );
}
