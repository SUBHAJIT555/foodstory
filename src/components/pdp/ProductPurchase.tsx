type ProductPurchaseProps = {
  available?: boolean;
  label?: string;
};

export function ProductPurchase({ available = true, label = "Add to Cart" }: ProductPurchaseProps) {
  return (
    <div className="max-md:-ml-4">
      <div className="flex h-max gap-3 max-md:fixed max-md:right-0 max-md:bottom-0 max-md:left-0 max-md:z-20 max-md:mb-0 max-md:w-full max-md:items-end max-md:justify-center max-md:bg-white max-md:px-3 max-md:py-4 max-md:pb-[max(1rem,env(safe-area-inset-bottom))]">
        <button type="button" disabled={!available} className="btn primary-btn w-full bg-fig py-[0.9rem] disabled:opacity-70">
          {available ? label : "Sold Out"}
        </button>
      </div>
    </div>
  );
}
