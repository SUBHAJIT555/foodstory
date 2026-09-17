import Link from "next/link";
import { ComeWriteYours } from "@/components/editorial/ComeWriteYours";
import { SubscribeSection } from "@/components/home/SubscribeSection";
import { StoryCard } from "@/components/stories/StoryCard";
import type { Story } from "@/data/stories";

type StoryArticleProps = {
  story: Story;
};

const summarize = [
  { label: "ChatGPT", href: "https://chatgpt.com/" },
  { label: "Perplexity", href: "https://www.perplexity.ai/" },
  { label: "Claude", href: "https://claude.ai/" },
  { label: "Grok", href: "https://grok.x.ai/" },
];

export function StoryArticle({ story }: StoryArticleProps) {
  return (
    <article className="bg-page">
      <div className="mx-auto px-3 pt-6 lg:max-w-7xl lg:px-2">
        <nav className="px-3 py-4 lg:px-0" aria-label="breadcrumbs">
          <ol className="flex gap-3">
            <li>
              <Link href="/" className="text-black hover:underline">
                Home
              </Link>
            </li>
            <li className="flex items-center gap-3">
              <span className="block h-1 w-1 rounded-full bg-black" />
              <Link href="/stories/" className="hover:underline">
                Stories
              </Link>
            </li>
          </ol>
        </nav>
        <header className="space-y-2 text-center">
          <h1 className="font-serif px-3 text-4xl font-semibold lg:text-6xl">{story.title}</h1>
          <p className="px-3 text-base">{story.deck}</p>
          <div className="flex items-center justify-center gap-6 pt-4">
            <p className="px-0 text-base">{story.byline}</p>
            <p className="px-0 text-base">{story.readTime}</p>
          </div>
        </header>
        <div className="mx-auto px-3 py-4 lg:max-w-7xl lg:px-2">
          <p className="mb-4 text-start text-2xl font-bold">Summarize this blog post with:</p>
          <div className="flex flex-wrap gap-2.5">
            {summarize.map((item) => (
              <a key={item.label} href={item.href} className="rounded-full border border-black/15 px-4 py-2 text-sm font-semibold" rel="noreferrer">
                {item.label}
              </a>
            ))}
          </div>
        </div>
        <div className="mx-auto max-w-[46rem] px-3 py-8 text-base leading-7">
          {story.blocks.map((block, index) => {
            if (block.kind === "heading") {
              return (
                <h2 key={`${block.text}-${index}`} className="mt-10 mb-4 text-2xl font-semibold">
                  {block.text}
                </h2>
              );
            }
            if (block.kind === "question") {
              return (
                <p key={`${block.text}-${index}`} className="mt-8 mb-3 font-semibold">
                  {block.text}
                </p>
              );
            }
            return (
              <p key={`${block.text.slice(0, 24)}-${index}`} className="mb-4">
                {block.text}
              </p>
            );
          })}
        </div>
        {story.related?.length ? (
          <section className="mx-auto max-w-7xl px-3 pb-12">
            <h2 className="mb-6 text-center text-2xl font-semibold">Related Articles</h2>
            <div className="flex min-w-0 flex-wrap justify-center gap-8">
              {story.related.map((related) => (
                <StoryCard key={related.href} story={related} />
              ))}
            </div>
          </section>
        ) : null}
      </div>
      <ComeWriteYours />
      <SubscribeSection />
    </article>
  );
}
