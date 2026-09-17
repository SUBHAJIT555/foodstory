import type { Metadata } from "next";
import Link from "next/link";
import { personalizePoints } from "@/data/gifting";

export const metadata: Metadata = {
  title: "Create Your Own | Foodstory",
};

export default function BuildYourOwnBoxPage() {
  return (
    <div className="bg-[#E1AF88]/30 py-16">
      <div className="mx-auto max-w-3xl px-4 text-center">
        <h1 className="font-serif text-2xl font-bold uppercase lg:text-5xl">
          Personalize Your
          <br />
          Gift
        </h1>
        <ul className="mx-auto mt-10 max-w-lg space-y-4 text-base font-medium">
          {personalizePoints.map((point) => (
            <li key={point}>{point}</li>
          ))}
        </ul>
        <p className="mt-8 text-sm text-[#39393B]/80">Select a box to begin. The live builder interior was not fully captured in this phase.</p>
        <Link href="/gifting/all-gifts/" className="btn primary-btn mt-8 px-8 py-3 text-sm font-medium">
          Discover All
        </Link>
      </div>
    </div>
  );
}
