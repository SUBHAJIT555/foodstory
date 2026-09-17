import { giftingWay } from "@/data/gifting";

export function GiftingWay() {
  return (
    <div className="w-full bg-[#F9F8F7] py-10 lg:py-16">
      <div className="mx-auto px-3 lg:max-w-7xl lg:px-2">
        <h2 className="font-serif mb-10 text-center text-2xl font-bold uppercase lg:text-[40px]">
          Gifting, the Foodstory way
        </h2>
        <ul className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {giftingWay.map((item) => (
            <li key={item.title} className="flex flex-col items-center gap-y-3 text-center">
              <div className="size-16 rounded-full bg-[#E1AF88]/40" aria-hidden />
              <h3 className="text-base font-semibold text-[#39393B]">{item.title}</h3>
              <p className="max-w-xs text-sm font-medium text-[#39393B]/80">{item.copy}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
