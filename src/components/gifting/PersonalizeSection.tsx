import Image from "next/image";
import Link from "next/link";
import { FramedMedia } from "@/components/home/FramedMedia";
import { personalizePoints } from "@/data/gifting";
import { mediaFor } from "@/data/media";

export function PersonalizeSection() {
  return (
    <div className="w-full bg-[#E1AF88]/30 py-10">
      <div className="mx-auto px-3 lg:max-w-7xl lg:px-2">
        <section className="relative flex flex-col items-center justify-center gap-y-6 lg:flex-row lg:justify-between">
          <div className="flex flex-col items-center gap-y-6 lg:basis-[50%]">
            <div className="flex flex-col items-start justify-start gap-y-6 lg:gap-y-14">
              <Image src="/gifting/sparkle.svg" alt="" width={24} height={24} className="mx-auto size-4 md:size-6" />
              <h2 className="font-serif mb-0 text-center text-2xl font-bold uppercase lg:text-5xl lg:whitespace-nowrap">
                Personalize Your
                <br />
                Gift
              </h2>
            </div>
            <div className="space-y-12 py-2 max-lg:hidden">
              <ul className="flex flex-row items-stretch justify-center">
                {personalizePoints.map((point, index) => (
                  <li key={point} className="relative flex w-full">
                    <div className="flex flex-1 flex-col justify-between gap-y-6 text-center">
                      <Image src="/gifting/sparkle.svg" alt="" width={24} height={24} className="mx-auto size-4 md:size-6" />
                      <p className="px-3 text-base font-medium whitespace-pre-line text-[#39393B] lg:text-lg lg:leading-[140%]">{point}</p>
                    </div>
                    {index < personalizePoints.length - 1 ? <div className="absolute top-[65%] right-0 h-9 w-px bg-[#39393B33]" /> : null}
                  </li>
                ))}
              </ul>
            </div>
            <Link href="/gifting/build-your-own-box/select-box/" className="btn primary-btn px-8 py-3 text-sm font-medium">
              Create Your Own
            </Link>
          </div>
          <div className="relative aspect-[4/3] w-full max-w-md lg:basis-[45%]">
            <FramedMedia alt="Personalize your gift" src={mediaFor("Personalize your gift")} sizes="(max-width: 1024px) 90vw, 40vw" className="object-cover" />
          </div>
        </section>
      </div>
    </div>
  );
}
