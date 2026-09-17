import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { FormPage } from "@/components/utility/FormPage";
import { allFormSlugs, getEnquiryForm } from "@/data/forms";

type FormRouteProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return allFormSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: FormRouteProps): Promise<Metadata> {
  const { slug } = await params;
  const form = getEnquiryForm(slug);
  if (!form) return { title: "Form | Foodstory" };
  return { title: form.pageTitle };
}

export default async function FormSlugRoute({ params }: FormRouteProps) {
  const { slug } = await params;
  const form = getEnquiryForm(slug);
  if (!form) notFound();
  return <FormPage config={form} />;
}
