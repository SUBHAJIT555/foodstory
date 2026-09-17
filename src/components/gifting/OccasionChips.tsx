import Link from "next/link";
import { FramedMedia } from "@/components/home/FramedMedia";
import { giftOccasions } from "@/data/gifting";
import { mediaFor } from "@/data/media";

export function OccasionChips() {
  return (
    <div className="w-full bg-page">
      <ul className="no-scrollbar flex w-full items-center gap-x-4 overflow-x-auto px-3 py-4 lg:mx-auto lg:max-w-7xl lg:justify-center lg:px-2">
        {giftOccasions.map((item) => (
          <li key={item.href} className="w-auto shrink-0 lg:w-42">
            <Link href={item.href} className="flex w-full items-center justify-start gap-x-2">
              <span className="relative h-12 w-12 overflow-hidden rounded-full">
                <FramedMedia alt={item.label} src={mediaFor(item.href, item.label)} sizes="48px" className="rounded-full object-cover" />
              </span>
              <h4 className="line-clamp-2 text-xs font-medium text-ellipsis underline lg:text-sm">{item.label}</h4>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
