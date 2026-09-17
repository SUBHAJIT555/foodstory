import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PolicyPage } from "@/components/utility/PolicyPage";
import { allPolicySlugs, getPolicy } from "@/data/policies";

type PolicyRouteProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return allPolicySlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PolicyRouteProps): Promise<Metadata> {
  const { slug } = await params;
  const policy = getPolicy(slug);
  if (!policy) return { title: "Policy | Foodstory" };
  return { title: policy.pageTitle, description: policy.intro };
}

export default async function PolicySlugRoute({ params }: PolicyRouteProps) {
  const { slug } = await params;
  const policy = getPolicy(slug);
  if (!policy) notFound();
  return <PolicyPage policy={policy} />;
}
