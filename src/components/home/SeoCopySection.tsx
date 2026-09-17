import { PageContainer } from "@/components/layout/PageContainer";
import { homeSeo } from "@/data/home";

export function SeoCopySection() {
  return (
    <section className="bg-page">
      <PageContainer className="html-content py-8">
        <h1 className="mb-2 text-2xl leading-8 font-bold">{homeSeo.title}</h1>
        <div className="md:line-clamp-4 max-md:line-clamp-5">
          {homeSeo.paragraphs.map((paragraph) => (
            <p key={paragraph.slice(0, 24)} className="mb-2">
              {paragraph}
            </p>
          ))}
        </div>
      </PageContainer>
    </section>
  );
}
