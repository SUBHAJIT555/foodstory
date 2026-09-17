import Link from "next/link";
import { Breadcrumbs } from "@/components/shop/Breadcrumbs";
import { policies, type PolicyDoc } from "@/data/policies";

type PolicyPageProps = {
  policy: PolicyDoc;
};

export function PolicyPage({ policy }: PolicyPageProps) {
  return (
    <div className="mx-auto max-w-7xl px-3 pb-16 lg:px-2">
      <Breadcrumbs
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Policies", href: "/policies/" },
          { label: policy.title },
        ]}
      />
      <div className="grid gap-10 md:grid-cols-[14rem_1fr] md:gap-12">
        <nav aria-label="Policies" className="text-left">
          <ul className="space-y-3">
            {policies.map((item) => {
              const active = item.slug === policy.slug;
              return (
                <li key={item.slug}>
                  <Link
                    href={`/policies/${item.slug}/`}
                    className={`text-sm font-medium hover:underline ${active ? "text-fig" : "text-ink"}`}
                    aria-current={active ? "page" : undefined}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
        <article>
          <h1 className="mb-4 text-3xl font-bold lg:text-4xl">{policy.title}</h1>
          <p className="mb-8 text-base text-muted">{policy.intro}</p>
          <div className="space-y-5 text-base leading-relaxed">
            {policy.sections.map((section) => (
              <div key={`${section.heading ?? ""}-${section.body.slice(0, 24)}`}>
                {section.heading ? <h2 className="mb-2 text-xl font-semibold">{section.heading}</h2> : null}
                <p>{section.body}</p>
              </div>
            ))}
          </div>
        </article>
      </div>
    </div>
  );
}
