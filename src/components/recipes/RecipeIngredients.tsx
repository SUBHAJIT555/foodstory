"use client";

import { useState } from "react";
import type { IngredientGroup } from "@/data/recipes";

type RecipeIngredientsProps = {
  serves?: string;
  groups: IngredientGroup[];
  shopEnabled?: boolean;
};

export function RecipeIngredients({ serves, groups, shopEnabled }: RecipeIngredientsProps) {
  const [checked, setChecked] = useState<Record<string, boolean>>({});

  return (
    <section className="rounded-lg bg-[#edeae980] p-8">
      <h2 className="text-2xl font-semibold text-[#38383A]">Ingredients</h2>
      {serves ? <p className="mt-4 text-base font-semibold">Serves {serves}</p> : null}
      <div className="mt-4 space-y-5">
        {groups.map((group) => (
          <div key={group.heading}>
            <p className="mb-2 text-base font-semibold">{group.heading}</p>
            <ul className="space-y-2">
              {group.items.map((item) => {
                const id = `${group.heading}-${item.label}`;
                return (
                  <li key={id}>
                    <label className={`flex cursor-pointer items-start gap-x-2 text-left text-base ${item.disabled ? "opacity-60" : ""}`}>
                      <input
                        type="checkbox"
                        className="accent-fig mt-1 h-4 w-4 rounded-lg border-2 border-black"
                        disabled={item.disabled}
                        checked={Boolean(checked[id])}
                        onChange={() => setChecked((current) => ({ ...current, [id]: !current[id] }))}
                      />
                      <span>{item.label}</span>
                    </label>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>
      <button type="button" disabled={!shopEnabled} className="btn primary-btn relative mt-4 flex w-[90%] items-center justify-center gap-2 border border-fig bg-fig px-3 py-4 text-sm font-semibold text-white disabled:opacity-70 md:px-8 md:py-4">
        Shop the Ingredients
      </button>
    </section>
  );
}
