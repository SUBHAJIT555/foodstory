import Link from "next/link";
import { FramedMedia } from "@/components/home/FramedMedia";
import { editorialBanners } from "@/data/media";

export type BannerCrumb = {
  label: string;
  href?: string;
};

type EditorialBannerProps = {
  title: string;
  intro?: string;
  crumbs: BannerCrumb[];
  titleClassName?: string;
  bannerKey?: keyof typeof editorialBanners;
};

export function EditorialBanner({ title, intro, crumbs, titleClassName, bannerKey }: EditorialBannerProps) {
  const banner = bannerKey ? editorialBanners[bannerKey] : undefined;
  return (
    <div className="relative h-[27rem] w-full min-w-0 overflow-x-clip md:h-[65vh]">
      <div className="mx-auto px-3 lg:max-w-7xl lg:px-2">
        <nav className="absolute top-0 z-10 px-3 py-4 lg:px-0" aria-label="breadcrumbs">
          <ol className="flex gap-3">
            {crumbs.map((crumb, index) => (
              <li key={crumb.label}>
                {crumb.href && index < crumbs.length - 1 ? (
                  <Link href={crumb.href} className={index === 0 ? "text-white hover:underline" : "flex items-center gap-3 text-white hover:no-underline"}>
                    {index > 0 ? <span className="block h-1 w-1 rounded-full bg-white" /> : null}
                    <span>{crumb.label}</span>
                  </Link>
                ) : (
                  <span className={index === 0 ? "text-white" : "flex items-center gap-3 text-white"}>
                    {index > 0 ? <span className="block h-1 w-1 rounded-full bg-white" /> : null}
                    <span>{crumb.label}</span>
                  </span>
                )}
              </li>
            ))}
          </ol>
        </nav>
      </div>
      <FramedMedia
        alt="Banner"
        src={banner?.src}
        sizes="70vw"
        tone="charcoal"
        className="rounded-none object-cover max-md:hidden"
        priority
      />
      <FramedMedia
        alt="Banner"
        src={banner?.mobileSrc ?? banner?.src}
        sizes="100vw"
        tone="charcoal"
        className="rounded-none object-cover md:hidden"
        priority
      />
      <div className="absolute inset-0 h-full w-full select-none bg-[rgba(0,0,0,0.5)]">
        <div className="absolute top-1/2 left-1/2 w-full -translate-x-1/2 -translate-y-1/2 text-center text-white max-lg:translate-y-[10%] md:w-max md:max-w-200 lg:-translate-x-[-10%]">
          <div className="flex flex-col items-center justify-center">
            <h1 className={titleClassName ?? "font-serif mb-2 text-[2.5rem] font-semibold xl:text-6xl"}>{title}</h1>
            {intro ? <p className="w-[70%] text-base">{intro}</p> : null}
          </div>
        </div>
      </div>
    </div>
  );
}
