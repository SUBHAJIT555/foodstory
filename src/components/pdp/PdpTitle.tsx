"use client";

import { WishlistButton } from "@/components/commerce/WishlistButton";
import { IconSpeaker } from "@/components/icons";
import type { CatalogInput } from "@/lib/commerce";

type PdpTitleProps = {
  name: string;
  speakText: string;
  product: CatalogInput;
};

export function PdpTitle({ name, speakText, product }: PdpTitleProps) {
  function speak() {
    if (typeof window === "undefined" || !window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(`${name}. ${speakText}`);
    window.speechSynthesis.speak(utterance);
  }

  return (
    <div className="mb-2 flex items-start justify-around gap-x-3">
      <h1 className="font-serif max-[403px]:text-[1.65rem] flex-1 px-0 text-4xl leading-10 font-semibold uppercase">{name}</h1>
      <div aria-label="icons">
        <button type="button" className="flex items-center justify-center rounded-full bg-[#FFFFFF99] p-2.5" onClick={speak} aria-label="Listen to product description">
          <IconSpeaker className="h-5 w-5 stroke-fig stroke-[1.7]" />
        </button>
      </div>
      <WishlistButton
        product={product}
        className="flex items-center justify-center rounded-full bg-[#FFFFFF99] p-2.5"
        iconClassName="h-5 w-5 stroke-fig stroke-1"
      />
    </div>
  );
}
