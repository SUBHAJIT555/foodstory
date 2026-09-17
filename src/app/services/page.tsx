import type { Metadata } from "next";
import { ServicesPage } from "@/components/editorial/ServicesPage";

export const metadata: Metadata = {
  title: "Services By Foodstory",
};

export default function ServicesRoutePage() {
  return <ServicesPage />;
}
