import Link from "next/link";
import { FramedMedia } from "@/components/home/FramedMedia";
import { mediaFor } from "@/data/media";

export function ComeWriteYours() {
  return (
    <div className="relative my-16 md:my-24">
      <div className="relative mx-auto h-56 w-full overflow-hidden lg:max-w-7xl">
        <FramedMedia alt="A Place Where Stories Come to Life" src={mediaFor("A Place Where Stories Come to Life")} sizes="100vw" tone="charcoal" className="object-cover max-md:hidden" />
        <FramedMedia alt="A Place Where Stories Come to Life" src={mediaFor("A Place Where Stories Come to Life")} sizes="100vw" tone="fig" className="object-cover md:hidden" />
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-black/40 px-6 text-center text-white">
          <h2 className="font-serif text-3xl font-semibold md:text-5xl">A Place Where Stories Come to Life</h2>
          <p className="max-w-xl text-base font-medium">Come share your favourite food stories with us. We&apos;re eager to hear what you have to say</p>
          <Link href="/stories/" className="inline-block rounded-full bg-white px-6 py-4 text-sm font-semibold text-black lg:text-base">
            Come write yours
          </Link>
        </div>
      </div>
    </div>
  );
}
