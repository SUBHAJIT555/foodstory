import Link from "next/link";

export function NotFoundView() {
  return (
    <div className="mx-auto max-w-3xl px-3 py-24 text-center lg:px-2">
      <p className="mb-3 text-sm font-medium text-muted">404</p>
      <h1 className="font-serif text-[2.5rem] font-semibold">We couldn&apos;t find that page</h1>
      <p className="mt-4 text-base">
        This address is not part of the shop, or the story has moved. Continue from home or the shop.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-4">
        <Link href="/" className="btn primary-btn px-8 py-3 text-sm font-semibold">
          Home
        </Link>
        <Link href="/shop/" className="btn border border-fig px-8 py-3 text-sm font-semibold text-fig">
          Shop
        </Link>
      </div>
    </div>
  );
}
