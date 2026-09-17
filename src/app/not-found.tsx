import type { Metadata } from "next";
import { NotFoundView } from "@/components/utility/NotFoundView";

export const metadata: Metadata = {
  title: "Page not found | Foodstory",
};

export default function NotFound() {
  return (
    <>
      <title>Page not found | Foodstory</title>
      <NotFoundView />
    </>
  );
}
