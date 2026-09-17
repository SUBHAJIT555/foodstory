import Link from "next/link";
import { Breadcrumbs } from "@/components/shop/Breadcrumbs";
import { primaryNav, shopMegaCategories } from "@/data/navigation";
import { footerNavColumns } from "@/data/footer";
import { faqCategories } from "@/data/faqs";
import { policies } from "@/data/policies";
import { enquiryForms } from "@/data/forms";

const extras = [
  { label: "Stories", href: "/stories/" },
  { label: "Recipes", href: "/recipes/" },
  { label: "Contact Us", href: "/contact-us/" },
  { label: "Kitchen Studio", href: "/kitchen-studio/" },
  { label: "Store Locator", href: "/store-locator/" },
  { label: "FAQs", href: "/faqs/" },
  { label: "Sitemap", href: "/sitemap/" },
];

export function SitemapPage() {
  const footerLinks = footerNavColumns.flat();

  return (
    <div className="mx-auto max-w-7xl px-3 pb-16 lg:px-2">
      <Breadcrumbs crumbs={[{ label: "Home", href: "/" }, { label: "Sitemap" }]} />
      <h1 className="mb-10 text-3xl font-bold">Sitemap</h1>
      <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
        <SitemapGroup title="Explore" links={primaryNav.map((item) => ({ label: item.label, href: item.href }))} />
        <SitemapGroup title="Shop By Category" links={shopMegaCategories.map((item) => ({ label: item.label, href: item.href }))} />
        <SitemapGroup title="Company" links={[...footerLinks, ...extras]} />
        <SitemapGroup
          title="FAQs"
          links={faqCategories.map((item) => ({ label: item.label, href: `/faqs/${item.slug}/` }))}
        />
        <SitemapGroup
          title="Policies"
          links={policies.map((item) => ({ label: item.label, href: `/policies/${item.slug}/` }))}
        />
        <SitemapGroup
          title="Forms"
          links={enquiryForms.map((item) => ({ label: item.crumb, href: `/form/${item.slug}/` }))}
        />
      </div>
    </div>
  );
}

function SitemapGroup({ title, links }: { title: string; links: Array<{ label: string; href: string }> }) {
  const seen = new Set<string>();
  const unique = links.filter((link) => {
    if (seen.has(link.href)) return false;
    seen.add(link.href);
    return true;
  });

  return (
    <section>
      <h2 className="mb-4 text-xl font-bold">{title}</h2>
      <ul className="space-y-2">
        {unique.map((link) => (
          <li key={link.href}>
            <Link href={link.href} className="text-sm hover:underline">
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
