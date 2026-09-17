import Image from "next/image";
import type { PdpReason } from "@/data/pdp";

type PdpReasonsProps = {
  reasons: PdpReason[];
};

export function PdpReasons({ reasons }: PdpReasonsProps) {
  if (!reasons.length) return null;

  return (
    <div aria-label="reason-to-crunch" className="w-full">
      <ul className="flex w-full snap-x snap-mandatory items-start gap-y-3 overflow-x-scroll [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {reasons.map((reason) => (
          <li key={reason.label} className="flex snap-start flex-col items-center justify-center gap-y-2 px-2 text-center">
            <div className="animate-bounce-x relative h-24 w-24 lg:h-28 lg:w-28">
              <Image src="/pdp/reason.svg" alt={reason.label} fill sizes="20vw" className="object-contain" />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
