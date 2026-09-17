import { giftTicker } from "@/data/gifting";

export function GiftingTicker() {
  const loop = [...giftTicker, ...giftTicker];

  return (
    <div className="-mt-2 overflow-hidden bg-[#FFF6EA] py-4">
      <div className="flex w-max animate-[ticker_28s_linear_infinite] gap-x-6">
        {loop.map((item, index) => (
          <span key={`${item}-${index}`} className="flex items-center gap-x-6 text-sm font-semibold text-[#39393B]">
            {item}
            <span aria-hidden>•</span>
          </span>
        ))}
      </div>
    </div>
  );
}
