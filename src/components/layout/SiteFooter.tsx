import Link from "next/link";
import Image from "next/image";
import { wordmarkFooterSrc, wordmarkSizes } from "@/data/assets";
import { footerNavColumns } from "@/data/footer";

export function SiteFooter() {
  return (
    <footer className="w-full bg-footer text-white">
      <div className="mb-14 ml-18 mr-[9.13rem] flex flex-col items-center max-lg:mr-0 max-lg:ml-0 lg:mb-16">
        <div className="mt-8 flex w-full items-start justify-between max-lg:justify-center lg:mt-16">
          <div className="w-72 select-none max-lg:mt-8">
            <Link href="/" aria-label="foodstory">
              <Image
                src={wordmarkFooterSrc}
                alt="foodstory"
                width={wordmarkSizes.footer.width}
                height={wordmarkSizes.footer.height}
                className="h-auto w-full object-contain"
              />
            </Link>
          </div>
          {footerNavColumns.map((column) => (
            <ul key={column[0].href} className="flex flex-col gap-y-2.5 max-lg:hidden">
              {column.map((item) => (
                <li key={item.href} className="cursor-pointer text-base font-medium hover:underline">
                  <Link href={item.href}>{item.label}</Link>
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>

      <div className="h-[0.05rem] w-full bg-white" />

      <div className="flex items-center justify-between pt-6 pb-4 max-lg:flex-col max-lg:items-center">
        <div className="ml-18 flex items-center gap-x-3 max-lg:ml-0">
          <p className="cursor-pointer text-sm font-bold hover:underline">
            <Link href="/policies/privacy-policy/">Privacy Policy</Link>
          </p>
          <p className="cursor-pointer text-sm font-bold hover:underline">
            <Link href="/sitemap/">Sitemap</Link>
          </p>
        </div>
      </div>

      <div className="pb-4 text-center text-xs lg:text-sm">
        <p>© 2026 Foodstory Pvt. Ltd. All rights reserved.</p>
      </div>

      <div className="flex h-max w-full items-center justify-center bg-dew py-3">
        <div className="w-full text-center">
          <p className="px-3 text-[10px] font-normal text-[#640C10] md:text-xs md:font-bold">
            We use cookies to optimise your visit. By continuing to browse our site you are
            accepting our{" "}
            <Link href="/policies/cookie-policy/" className="underline">
              cookie policy.
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
