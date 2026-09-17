import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { BulkGiftingForm } from "@/components/gifting/BulkGiftingForm";
import { FramedMedia } from "@/components/home/FramedMedia";
import { ProductFaq } from "@/components/pdp/ProductFaq";
import { bulkBenefits, bulkFaqs, bulkOccasions, bulkPacks, bulkSteps } from "@/data/gifting";
import { mediaFor } from "@/data/media";

export const metadata: Metadata = {
  title: "Bulk Corporate Gifting by Foodstory",
};

export default function BulkGiftingPage() {
  return (
    <div className="bg-page">
      <section className="bg-[#F9F8F7] md:min-h-screen">
        <div className="mx-auto flex max-w-7xl flex-col items-center gap-10 px-4 py-10 lg:flex-row lg:items-start lg:justify-between lg:px-2 lg:py-16">
          <div className="flex max-w-xl flex-col items-center text-center lg:items-start lg:text-left">
            <Image src="/gifting/sparkle.svg" alt="" width={24} height={24} className="mb-4 size-6" />
            <h1 className="font-serif text-2xl font-bold uppercase md:text-4xl">Let&apos;s Bring Your Gifting Vision to Life</h1>
          </div>
          <BulkGiftingForm />
        </div>
      </section>

      <section className="bg-[#39393B] py-12 text-white">
        <div className="mx-auto max-w-7xl px-4 text-center">
          <h2 className="text-sm font-semibold tracking-[0.2em] uppercase">Trusted by</h2>
          <p className="font-serif mt-3 text-2xl font-bold md:text-4xl">Chosen by 500+ tastemakers worldwide</p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-6 opacity-70">
            {Array.from({ length: 6 }, (_, index) => (
              <span key={index} className="h-10 w-24 rounded bg-white/15" aria-hidden />
            ))}
          </div>
        </div>
      </section>

      <section className="py-14">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-4 sm:grid-cols-2 lg:grid-cols-3">
          {bulkBenefits.map((item) => (
            <article key={item.title} className="text-center">
              <div className="mx-auto mb-4 size-16 rounded-full bg-[#E1AF88]/40" aria-hidden />
              <h3 className="text-lg font-semibold">{item.title}</h3>
              <p className="mt-2 text-sm font-medium text-[#39393B]/80">{item.copy}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-[#F9F8F7] py-14">
        <div className="mx-auto max-w-7xl px-4">
          <h2 className="font-serif mb-8 text-center text-2xl font-bold uppercase md:text-4xl">Celebrations, Curated Generously</h2>
          <ul className="grid grid-cols-2 gap-4 md:grid-cols-3">
            {bulkOccasions.map((item) => (
              <li key={item.label}>
                <Link href={item.href} className="flex flex-col items-center gap-3 text-center">
                  <span className="relative aspect-square w-full max-w-40 overflow-hidden rounded-full">
                    <FramedMedia alt={item.label} src={mediaFor(item.href, item.label)} sizes="160px" className="rounded-full object-cover" />
                  </span>
                  <span className="text-sm font-semibold underline">{item.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="py-14">
        <div className="mx-auto max-w-7xl px-4">
          <h2 className="font-serif mb-10 text-center text-2xl font-bold uppercase md:text-4xl">Bulk Gifting, Simplified</h2>
          <ol className="grid grid-cols-1 gap-8 md:grid-cols-4">
            {bulkSteps.map((item, index) => (
              <li key={item.title} className="text-center">
                <p className="mb-3 text-sm font-bold text-fig">{String(index + 1).padStart(2, "0")}</p>
                <h3 className="text-lg font-semibold">{item.title}</h3>
                <p className="mt-2 text-sm font-medium text-[#39393B]/80">{item.copy}</p>
              </li>
            ))}
          </ol>
          <p className="mt-10 text-center text-sm italic">
            *Refunds are guaranteed for undelivered items. So sit back, relax and enjoy a worry-free gifting experience.
          </p>
        </div>
      </section>

      <section className="bg-[#F9F8F7] py-14">
        <div className="mx-auto max-w-7xl px-4">
          <h3 className="font-serif mb-2 text-center text-2xl font-bold uppercase md:text-4xl">Packed With Love</h3>
          <p className="mb-8 text-center text-sm font-medium">Designed with care to make your gift unforgettable</p>
          <ul className="grid grid-cols-2 gap-6 md:grid-cols-3">
            {bulkPacks.map((pack) => (
              <li key={pack} className="text-center">
                <div className="relative mx-auto mb-3 aspect-square max-w-48 overflow-hidden rounded-md">
                  <FramedMedia alt={pack} src={mediaFor(pack)} sizes="192px" className="object-cover" />
                </div>
                <h4 className="text-sm font-semibold">{pack}</h4>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <div className="px-6 py-12 md:px-24">
        <h2 className="font-serif mb-8 text-center text-2xl font-bold uppercase md:text-5xl">You Ask. We&apos;ve Gifted That.</h2>
        <ProductFaq faqs={bulkFaqs} heading="FREQUENTLY ASKED QUESTIONS" className="mx-auto max-w-7xl px-0" />
      </div>
    </div>
  );
}
