import Link from "next/link";
import { FramedMedia } from "@/components/home/FramedMedia";
import { PageContainer } from "@/components/layout/PageContainer";
import { homeModeColumns } from "@/data/home";
import { mediaFor } from "@/data/media";

function ModeTile({ label, href, tall }: { label: string; href: string; tall?: boolean }) {
  const src = mediaFor(href, label);
  return (
    <div className="relative overflow-hidden rounded-md">
      <Link href={href} className="block h-full w-full">
        <div className={`relative max-md:hidden ${tall ? "h-full min-h-[600px]" : "h-72"}`}>
          <FramedMedia alt={label} src={src} sizes="40vw" tone="charcoal" className="h-full object-cover" />
        </div>
        <div className={`relative md:hidden ${tall ? "h-48" : "h-48"}`}>
          <FramedMedia alt={label} src={src} sizes="50vw" tone="charcoal" className="h-full object-cover" />
        </div>
        <div className="absolute inset-x-0 bottom-0 z-1 mx-auto flex h-8 items-center justify-center bg-black/40 backdrop-blur-xs md:h-12">
          <h3 className="line-clamp-1 p-0 text-center text-[0.875rem] leading-4.5 font-[550] text-white md:text-base">
            {label}
          </h3>
        </div>
      </Link>
    </div>
  );
}

export function ShoppingModesSection() {
  const [left, center, right] = homeModeColumns;

  return (
    <section className="dark-section bg-footer py-12">
      <PageContainer>
        <h2 className="px-3 text-center text-2xl leading-8 font-bold text-white md:text-4xl md:leading-10">
          Many Ways to Eat, Your Way to Shop
        </h2>
        <div className="inner-dark-section mt-8 grid gap-3 px-3 md:grid-cols-3 md:gap-6">
          <div className="grid grid-cols-2 gap-3 md:grid-cols-1 md:gap-6">
            {left.map((tile) => (
              <ModeTile key={tile.href} label={tile.label} href={tile.href} />
            ))}
          </div>
          <ModeTile label={center[0].label} href={center[0].href} tall />
          <div className="grid grid-cols-2 gap-3 md:grid-cols-1 md:gap-6">
            {right.map((tile) => (
              <ModeTile key={tile.href} label={tile.label} href={tile.href} />
            ))}
          </div>
        </div>
      </PageContainer>
    </section>
  );
}
