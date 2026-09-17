import type { Metadata } from "next";
import { PolicyPage } from "@/components/utility/PolicyPage";
import { policies } from "@/data/policies";

export const metadata: Metadata = {
  title: "Policies - Foodstory",
};

export default function PoliciesIndexRoute() {
  return <PolicyPage policy={policies[0]} />;
}
