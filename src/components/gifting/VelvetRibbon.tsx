import Image from "next/image";
import { velvetFeatures } from "@/data/gifting";

export function VelvetRibbon() {
  return (
    <div className="w-full bg-[#F9F8F7] py-10">
      <div className="mx-auto px-3 lg:max-w-7xl lg:px-2">
        <div className="flex flex-col items-center gap-y-8">
          <div className="flex flex-col items-center text-center">
            <Image src="/gifting/sparkle.svg" alt="" width={24} height={24} className="my-2 size-4 md:size-6" />
            <h2 className="font-serif text-2xl font-bold uppercase lg:text-[40px] lg:leading-[130%]">
              Stories, wrapped
              <br />
              in a velvet ribbon
            </h2>
          </div>
          <ul className="grid w-full grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {velvetFeatures.map((feature) => (
              <li key={feature.title} className="flex flex-col items-center gap-y-3 text-center">
                <Image src="/gifting/sparkle.svg" alt="" width={24} height={24} className="size-6" />
                <h3 className="text-base font-semibold text-[#39393B]">{feature.title}</h3>
                <p className="text-sm font-medium text-[#39393B]/80">{feature.copy}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
