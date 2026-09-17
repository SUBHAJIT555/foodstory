export const footerNavColumns = [
  [
    { label: "Shop Online", href: "/shop/" },
    { label: "Gifting", href: "/gifting/" },
  ],
  [
    { label: "Stories", href: "/stories/" },
    { label: "Recipes", href: "/recipes/" },
    { label: "Services", href: "/services/" },
  ],
  [
    { label: "About Us", href: "/about-us/" },
    { label: "Contact Us", href: "/contact-us/" },
  ],
  [
    { label: "Shipping Policy", href: "/policies/shipping-policy/" },
    { label: "Return and Refund Policy", href: "/policies/returns-refunds-policy/" },
    { label: "FAQs", href: "/faqs/" },
    { label: "Weekend of Plenty T&C", href: "/policies/weekend-of-plenty-terms-and-conditions/" },
  ],
] as const;

export const footerContact = {
  phoneDisplay: "+91 9004171401",
  phoneHref: "tel:+919004171401",
  hours: "Mon-Sun: 10 am to 8 pm",
  whatsappHref: "https://wa.me/919004171401",
  appointmentHref: "/form/personal-shopper/",
  storeLocatorHref: "/store-locator/",
  appStoreHref: "https://apps.apple.com/in/app/foodstories/id6760836052",
  playStoreHref: "https://play.google.com/store/apps/details?id=shop.foodstories.app",
} as const;
