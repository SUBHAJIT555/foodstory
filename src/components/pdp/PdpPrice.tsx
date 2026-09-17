import { formatPrice } from "@/data/products";
import { discountPercent } from "@/data/pdp";

type PdpPriceProps = {
  price: number;
  compareAtPrice?: number;
};

export function PdpPrice({ price, compareAtPrice }: PdpPriceProps) {
  const off = discountPercent(price, compareAtPrice);

  return (
    <div className="flex w-full items-start justify-between">
      <div className="flex flex-col gap-y-2">
        <h2 className="flex flex-wrap items-center gap-x-3 px-0 text-3xl leading-[31.59px] font-semibold">
          {off && compareAtPrice ? (
            <>
              <span
                className="flex items-center pr-4 pl-2"
                style={{
                  backgroundColor: "rgb(232, 244, 238)",
                  clipPath: "polygon(0px 0px, 100% 0px, calc(100% - 8px) 50%, 100% 100%, 0px 100%)",
                }}
              >
                <span id="price" className="text-[1.625rem] font-bold text-[#245B43]">
                  {formatPrice(price)}
                </span>
              </span>
              <span className="text-base font-normal text-gray-400 line-through">{formatPrice(compareAtPrice)}</span>
              <span className="text-base text-gray-300">|</span>
              <span className="text-base font-semibold whitespace-nowrap text-[#245B43]">{off}% OFF</span>
            </>
          ) : (
            <span id="price" className="text-[1.625rem] font-bold">
              {formatPrice(price)}
            </span>
          )}
        </h2>
        <p className="mb-2 px-0 text-sm font-normal opacity-60">
          <span>MRP (Inclusive of all taxes)</span>
        </p>
      </div>
    </div>
  );
}
