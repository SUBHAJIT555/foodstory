import Link from "next/link";
import { FramedMedia } from "@/components/home/FramedMedia";
import { mediaFor } from "@/data/media";
import type { StoryCardItem } from "@/data/stories";

type StoryCardProps = {
  story: StoryCardItem;
  variant?: "rail" | "feature" | "overlay";
};

export function StoryCard({ story, variant = "rail" }: StoryCardProps) {
  if (variant === "feature") {
    return (
      <article className="relative">
        <div className="relative z-[-1] h-[70vh] overflow-hidden rounded-md">
          <FramedMedia alt={story.title} src={mediaFor(story.slug, story.title)} sizes="100vw" tone="charcoal" className="grayscale object-cover" />
        </div>
        <div className="z-2 mx-auto -mt-24 rounded-md bg-slate-50 px-3 py-6 text-center lg:w-4/6">
          <div className="space-y-3 lg:px-12">
            <p className="px-3 text-sm font-bold">{story.byline}</p>
            <h2 className="font-serif line-clamp-2 px-3 text-2xl font-bold text-black">{story.title}</h2>
            {story.excerpt ? <p className="px-3 text-base">{story.excerpt}</p> : null}
            <Link href={story.href} className="inline-block px-3 py-0 text-lg font-bold text-fig underline">
              Read Article
            </Link>
          </div>
        </div>
      </article>
    );
  }

  if (variant === "overlay") {
    return (
      <article className="relative min-w-0 w-full overflow-hidden rounded-md">
        <div className="relative aspect-4/5 w-full">
          <FramedMedia alt={story.title} src={mediaFor(story.slug, story.title)} sizes="40vw" tone="charcoal" className="object-cover" />
          <div className="absolute inset-0 flex flex-col justify-end bg-linear-to-t from-black/70 to-transparent p-4 text-left text-white">
            <h3 className="line-clamp-3 text-lg font-semibold">{story.title}</h3>
            <p className="px-0 text-base font-semibold text-white/50">{story.readTime}</p>
            <Link href={story.href} className="mt-2 text-lg font-bold underline">
              Read Article
            </Link>
          </div>
        </div>
      </article>
    );
  }

  return (
    <article className="w-full min-w-0 max-w-[280px] space-y-3 text-left">
      <div className="relative aspect-4/5 overflow-hidden rounded-md">
        <FramedMedia alt={story.title} src={mediaFor(story.slug, story.title)} sizes="40vw" tone="cream" className="object-cover" />
      </div>
      <h3 className="line-clamp-3 px-3 text-lg font-semibold">{story.title}</h3>
      <p className="px-3 text-base font-semibold text-black/50">{story.readTime}</p>
      <Link href={story.href} className="inline-block px-3 py-0 text-lg font-bold text-fig underline">
        Read Article
      </Link>
    </article>
  );
}
