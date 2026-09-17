import Image from "next/image";
import Link from "next/link";
import { wordmarkFooterSrc, wordmarkSizes, wordmarkSrc } from "@/data/assets";

type LogoProps = {
  inverted?: boolean;
};

export function Logo({ inverted = false }: LogoProps) {
  return (
    <Link href="/" aria-label="foodstory" className="block w-32 select-none md:w-44">
      <Image
        src={inverted ? wordmarkFooterSrc : wordmarkSrc}
        alt="foodstory"
        width={wordmarkSizes.headerDesktop.width}
        height={wordmarkSizes.headerDesktop.height}
        className="h-auto w-full object-contain"
        priority
      />
    </Link>
  );
}
