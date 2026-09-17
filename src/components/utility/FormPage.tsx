import Link from "next/link";
import { EditorialBanner } from "@/components/editorial/EditorialBanner";
import { SubscribeSection } from "@/components/home/SubscribeSection";
import { EnquiryForm } from "@/components/utility/EnquiryForm";
import { bespokeHighlights, type EnquiryFormConfig } from "@/data/forms";

type FormPageProps = {
  config: EnquiryFormConfig;
};

export function FormPage({ config }: FormPageProps) {
  const bespoke = config.slug === "bespoke-orders";

  return (
    <>
    <div className="mb-16 space-y-12 lg:mb-24">
      <EditorialBanner
        title={config.title}
        intro={config.dek}
        crumbs={[
          { label: "Home", href: "/" },
          { label: config.crumb },
        ]}
      />
      {config.line ? <p className="px-4 text-center text-base">{config.line}</p> : null}
      {bespoke ? (
        <div className="grid gap-8 px-4 md:grid-cols-2 lg:grid-cols-4">
          {bespokeHighlights.map((item) => (
            <article key={item.title} className="text-center">
              <h2 className="mb-2 text-lg font-bold">{item.title}</h2>
              <p className="text-sm">{item.body}</p>
            </article>
          ))}
        </div>
      ) : null}
      <EnquiryForm config={config} idPrefix={config.slug} />
      {bespoke ? (
        <p className="px-4 text-center text-base">
          Serving all your gifting needs.{" "}
          <Link href="/contact-us/" className="underline">
            Contact us
          </Link>{" "}
          for a hassle-free gifting experience.
        </p>
      ) : null}
    </div>
    <SubscribeSection />
    </>
  );
}
