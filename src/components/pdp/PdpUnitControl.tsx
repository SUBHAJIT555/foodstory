"use client";

import { useState } from "react";
import { PdpUnit } from "@/components/pdp/PdpUnit";

type PdpUnitControlProps = {
  unit?: string;
  units?: string[];
};

export function PdpUnitControl({ unit, units }: PdpUnitControlProps) {
  const choices = units?.length ? units : unit ? [unit] : [];
  const [value, setValue] = useState(choices[0] ?? "");
  if (!value) return null;
  return <PdpUnit units={choices} value={value} onChange={setValue} />;
}
