import Link from "next/link";
import { EditorialBanner } from "@/components/editorial/EditorialBanner";
import { EnquiryForm } from "@/components/utility/EnquiryForm";
import type { EnquiryFormConfig } from "@/data/forms";

const contactForm: EnquiryFormConfig = {
  slug: "contact",
  pageTitle: "Contact Us - Foodstory",
  crumb: "Contact Us",
  title: "Contact Us",
  submitLabel: "Submit",
  fields: [{ kind: "store", name: "store", placeholder: "Select Store*", required: true }],
};

export function ContactPage() {
  return (
    <div className="mb-16 space-y-12 lg:mb-24">
      <EditorialBanner
        title="Contact Us"
        intro="We'll delighted to assist you with your orders, gift ideas, and more. Choose your preferred method of contact below"
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Contact Us" },
        ]}
      />
      <section className="mx-auto max-w-3xl px-4 text-center">
        <h2 className="mb-4 text-2xl font-bold lg:text-4xl">We&apos;re at Your Service</h2>
        <p className="mb-8 text-base">
          There&apos;s no question too small or request too big for our customer advisors. We&apos;re always happy to
          help.
        </p>
        <EnquiryForm config={contactForm} idPrefix="contact" />
      </section>
      <section className="mx-auto max-w-3xl px-4 text-center">
        <h2 className="mb-4 text-2xl font-bold">Get in Touch With Us</h2>
        <p className="mb-6 text-base">
          Need some help? You might be able to find an answer to your question on our{" "}
          <Link href="/faqs/" className="underline">
            FAQ page
          </Link>
          .
        </p>
        <p className="text-sm font-semibold">Email us at</p>
        <p className="mb-4">
          <a href="mailto:care@foodstories.shop" className="underline">
            care@foodstories.shop
          </a>
        </p>
        <p className="text-sm font-semibold">Call us at</p>
        <p className="mb-4">
          <a href="tel:+919004171401">9004171401</a>, <a href="tel:+917718055496">7718055496</a>
        </p>
        <p className="text-sm font-semibold">WhatsApp</p>
        <p>
          <a href="https://wa.me/919004171401">9004171401</a>
        </p>
      </section>
    </div>
  );
}
