import type { Metadata } from "next";
import { CheckoutView } from "@/components/checkout/CheckoutView";

export const metadata: Metadata = {
  title: "Pickup From Store",
};

export default function CheckoutCartPage() {
  return <CheckoutView />;
}
