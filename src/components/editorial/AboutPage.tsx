import Link from "next/link";
import { EditorialBanner } from "@/components/editorial/EditorialBanner";
import { FramedMedia } from "@/components/home/FramedMedia";
import { SubscribeSection } from "@/components/home/SubscribeSection";
import { aboutChapters, aboutFeatures, aboutHero, aboutValues } from "@/data/about";
import { mediaFor } from "@/data/media";

export function AboutPage() {
  return (
    <>
    <div className="mb-16 space-y-10 text-center lg:mb-24">
      <EditorialBanner
        title={aboutHero.title}
        intro={aboutHero.intro}
        bannerKey="about"
        crumbs={[
          { label: "Home", href: "/" },
          { label: "About Us" },
        ]}
      />
      {aboutChapters.map((chapter) => (
        <section key={chapter.heading} className="my-14 flex w-auto flex-col items-center justify-center gap-y-6 px-3 text-center lg:my-20">
          <h2 className="font-serif text-[2.5rem] font-semibold xl:text-5xl">{chapter.heading}</h2>
          <p className="max-w-3xl text-base font-normal">{chapter.body}</p>
        </section>
      ))}
      <section className="mx-auto flex flex-col items-center gap-y-8 px-6">
        <h2 className="text-2xl font-semibold">Our Stories</h2>
        <div className="grid gap-8 md:grid-cols-4">
          {aboutValues.map((value) => (
            <div key={value.accent} className="flex flex-col items-center justify-center gap-y-0 text-center">
              <p className="text-base">{value.lead}</p>
              <p className="px-0 text-lg font-semibold text-fig">{value.accent}</p>
            </div>
          ))}
        </div>
      </section>
      {aboutFeatures.map((feature, index) => (
        <section key={feature.cta} className="mx-auto flex w-full flex-col items-center gap-y-6 px-6 lg:flex-row lg:items-center lg:justify-between lg:gap-x-16 lg:px-[10.6rem]">
          <div className={`relative aspect-76/51 w-full rounded-lg lg:flex-1 ${index % 2 ? "lg:order-last" : "order-first"}`}>
            <FramedMedia alt={feature.heading} src={mediaFor(feature.heading)} sizes="50vw" tone={index % 2 ? "fig" : "cream"} className="rounded-lg object-cover" />
          </div>
          <div className="flex w-full flex-col items-center justify-stretch gap-y-4 lg:max-w-[50%] lg:flex-1 lg:items-start lg:gap-y-6 lg:text-left">
            <p className="px-3 text-lg font-semibold">{feature.heading}</p>
            <p className="px-3 text-base font-medium">{feature.body}</p>
            <Link href={feature.href} className="cursor-pointer justify-self-end text-lg font-bold text-fig underline">
              {feature.cta}
            </Link>
          </div>
        </section>
      ))}
      <section className="px-6">
        <h2 className="px-0 text-2xl font-semibold">Indulge Your Tastebuds</h2>
        <Link href="/shop/" className="mt-4 inline-block font-bold text-fig underline">
          Explore More Categories
        </Link>
      </section>
    </div>
    <SubscribeSection />
    </>
  );
}
