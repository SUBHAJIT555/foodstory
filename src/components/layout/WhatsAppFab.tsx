import { IconWhatsApp } from "@/components/icons";
import { footerContact } from "@/data/footer";

export function WhatsAppFab() {
  return (
    <a
      href={footerContact.whatsappHref}
      target="_blank"
      rel="noreferrer"
      aria-label="WhatsApp us on: +919004171401"
      className="fixed right-5 bottom-20 z-20 flex size-[56px] items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_4px_12px_rgba(0,0,0,0.18)] md:right-10 md:bottom-10"
    >
      <IconWhatsApp className="size-7 fill-white stroke-white" />
    </a>
  );
}
