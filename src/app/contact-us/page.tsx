import type { Metadata } from "next";
import { ContactPage } from "@/components/utility/ContactPage";

export const metadata: Metadata = {
  title: "Contact Us - Foodstory",
  description: "We'll delighted to assist you with your orders, gift ideas, and more.",
};

export default function ContactUsRoute() {
  return <ContactPage />;
}
