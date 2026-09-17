import Link from "next/link";
import { EditorialBanner } from "@/components/editorial/EditorialBanner";
import { FramedMedia } from "@/components/home/FramedMedia";
import { SubscribeSection } from "@/components/home/SubscribeSection";
import { mediaFor } from "@/data/media";
import { serviceItems, servicesHero } from "@/data/services";

export function ServicesPage() {
  return (
    <>
    <div className="mb-16 space-y-10 text-center lg:mb-24">
      <EditorialBanner
        title={servicesHero.title}
        intro={servicesHero.intro}
        bannerKey="services"
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Services" },
        ]}
      />
      <p className="px-6 text-base font-medium">{servicesHero.dek}</p>
      <div className="flex w-full flex-col gap-y-16 px-6 lg:px-[10.6rem]">
        {serviceItems.map((service) => (
          <div key={service.title} className="flex w-full flex-col gap-y-6 lg:flex-row lg:items-center lg:justify-between lg:gap-x-16 lg:gap-y-12">
            <div className={`relative aspect-76/51 w-full rounded-lg lg:flex-1 ${service.imageFirst ? "order-first" : "lg:order-last"}`}>
              <FramedMedia alt={service.title} src={mediaFor(service.title)} sizes="50vw" tone="cream" className="rounded-lg object-cover" />
            </div>
            <div className="flex w-full flex-col items-center justify-stretch gap-y-4 lg:max-w-[50%] lg:flex-1 lg:items-start lg:gap-y-6 lg:text-left">
              <p className="px-3 text-2xl font-bold lg:text-4xl">{service.title}</p>
              <p className="px-3 text-base font-medium">{service.body}</p>
              <Link href={service.href}>
                <span className="btn primary-btn w-max px-6 py-3">
                  <span className="flex items-center justify-center gap-2">{service.cta}</span>
                </span>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
    <SubscribeSection />
    </>
  );
}
