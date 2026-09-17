import Link from "next/link";
import { FramedMedia } from "@/components/home/FramedMedia";
import { mediaFor } from "@/data/media";

export function SeasonStory() {
  return (
    <div className="w-full bg-[#F9F8F7] py-10 lg:py-18">
      <div className="mx-auto flex flex-col items-center gap-8 px-3 lg:max-w-7xl lg:flex-row-reverse lg:justify-between lg:px-2">
        <div className="relative aspect-[4/3] w-full max-w-lg">
          <FramedMedia alt="Gift a story of the season" src={mediaFor("Gift a story of the season")} sizes="(max-width: 1024px) 90vw, 40vw" className="object-cover" />
        </div>
        <div className="flex max-w-lg flex-col items-center gap-y-6 text-center lg:items-start lg:text-left">
          <h2 className="font-serif text-2xl font-bold uppercase lg:text-[40px] lg:leading-[130%]">
            Gift a story
            <br />
            of the season
          </h2>
          <div className="flex flex-col items-center gap-3 sm:flex-row">
            <a href="#" className="btn border border-fig bg-transparent px-8 py-3 text-sm font-medium text-fig">
              Download Catalogue
            </a>
            <Link href="https://wa.me/9004171401" className="btn primary-btn px-8 py-3 text-sm font-medium">
              Connect With Our Experts
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
