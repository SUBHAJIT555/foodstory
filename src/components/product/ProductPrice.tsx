import { formatPrice } from "@/data/products";

type ProductPriceProps = {
  price: number;
  compareAtPrice?: number;
};

export function ProductPrice({ price, compareAtPrice }: ProductPriceProps) {
  const formatted = formatPrice(price);
  const onSale = typeof compareAtPrice === "number" && compareAtPrice > price;

  if (!onSale) {
    return <span className="text-sm font-bold md:text-lg">{formatted}</span>;
  }

  const off = Math.round(((compareAtPrice - price) / compareAtPrice) * 100);

  return (
    <div className="flex flex-col gap-1 md:flex-row md:items-center md:gap-2.5">
      <div className="flex">
        <div
          className="flex items-center pr-4 pl-2"
          style={{
            backgroundColor: "rgb(232, 244, 238)",
            clipPath: "polygon(0px 0px, 100% 0px, calc(100% - 8px) 50%, 100% 100%, 0px 100%)",
          }}
        >
          <span className="text-sm font-bold text-[#245B43] md:text-lg">{formatted}</span>
        </div>
      </div>
      <div className="mt-0.5 flex items-center gap-1.5 md:mt-0">
        <span className="text-xs font-normal text-gray-400 line-through md:text-base">{formatPrice(compareAtPrice)}</span>
        <span className="text-xs text-gray-300 md:text-base">|</span>
        <span className="text-xs font-semibold whitespace-nowrap text-[#245B43] md:text-base">{off}% OFF</span>
      </div>
    </div>
  );
}
