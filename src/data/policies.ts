export type PolicyDoc = {
  slug: string;
  label: string;
  title: string;
  pageTitle: string;
  intro: string;
  sections: Array<{ heading?: string; body: string }>;
};

const sharedIntro =
  "Read our website policies on how we choose what to link to, privacy, terms of service, shipping, returns and refunds policy and more.";

export const policies: PolicyDoc[] = [
  {
    slug: "shipping-policy",
    label: "Shipping Policy",
    title: "Shipping Policy",
    pageTitle: "Shipping Policy - Foodstory",
    intro: sharedIntro,
    sections: [
      {
        heading: "Standard Delivery",
        body: "We offer Standard Delivery for customers who prefer the convenience of home delivery. This service is available at a nominal charge of ₹99, which covers convenience and handling fees.",
      },
      {
        body: "Our delivery model is slot-based, allowing you to choose a preferred delivery slot at checkout. Depending on slot availability and your selected time, delivery can be made as early as within 4 hours of placing the order, or scheduled for up to two days later (day after tomorrow).",
      },
      {
        body: "Once your order is placed, you will receive a confirmation via email or SMS, along with the expected delivery time based on the slot you selected.",
      },
      {
        body: "All orders are carefully packed and handled by our trained team to ensure your products arrive fresh and in perfect condition. We are committed to delivering your items safely and on time to the address provided.",
      },
    ],
  },
  {
    slug: "returns-refunds-policy",
    label: "Returns and Refunds Policies",
    title: "Return and Refund Policy",
    pageTitle: "Returns & Refunds | Foodstory",
    intro: sharedIntro,
    sections: [
      {
        body: "At Foodstory, we are committed to delivering all products to our customers in impeccable condition and taking every possible measure to safeguard the quality of the sold goods. If you have any concerns about your order, please don't hesitate to contact us immediately upon receiving it at care@foodstories.shop or call us at +91 9004171401, and we will take the necessary steps to assist you.",
      },
      {
        body: "Fresh and perishable items (such as bakery products, fruits, vegetables, fresh meat, eggs, and cheese) can be returned or exchanged within 24 hours of delivery or purchase, provided they are in their original condition. Non-perishable items can be returned or exchanged within 72 hours of delivery or purchase, provided they are unused and in their original condition.",
      },
      {
        body: "For in-store purchases, returns or exchanges must be made at the store itself. For online orders, reverse pickup will be arranged only in eligible cases i.e., where the product received is incorrect, damaged, or defective, and the concern is reported within the applicable timelines.",
      },
      {
        body: "Refunds are issued only for damaged, defective, incorrect, or missing items; in all other cases, a credit note valid for 90 days will be provided. Refunds for prepaid orders will be processed to the original mode of payment within 5-7 working days depending on the policy of the third-party aggregator. To be eligible for a return, we require the original receipt or proof of purchase. For more information, please refer to the FAQs section on our site.",
      },
      {
        heading: "Cancellation Policy",
        body: "You can cancel your online order within 5 minutes of confirmation by reaching out to our customer service on +91 9004171401. Please note that express delivery orders cannot be cancelled. After this time, any modifications to your order can be made by calling +91 9004171401 or contacting the store directly. We don't allow partial order cancellations, so you'll need to either cancel the entire order or make no changes. While we make every effort to ensure the products displayed are available when you place your order, in unforeseen situations, the company reserves the right to cancel an order based on stock availability, product damage, defects, or other reasons.",
      },
    ],
  },
  {
    slug: "privacy-policy",
    label: "Privacy Policy",
    title: "Privacy Policy",
    pageTitle: "Privacy Policy | Foodstory - Your Data, Our Responsibility",
    intro: sharedIntro,
    sections: [
      {
        body: "This Privacy Policy contains provisions regarding collection, usage, storage, handling and sharing of information that you share on the Site and/or the App. For the purpose of this Privacy Policy, the type of information collected and handled by us includes:",
      },
      {
        body: "“Personal Information” means the data or information relating to a natural person which, either directly or indirectly, in combination with other available or likely to be available information, can be used to identify such person and includes mandatory or voluntary disclosures that you make while and for using the Site and/or the App and/or the services offered by us, including but not limited to your name, address, telephone number, email address, images, etc.",
      },
      {
        body: "To avail certain services on the Site and/or the App, users are required to provide some personal and sensitive information for the registration process including your name, email address, phone number, and location information. We collect this information to improve the Site and/or the App and provide you with our services.",
      },
      {
        body: "If we use third party processors to administer and process your Personal Information for the purposes notified in this Privacy Policy, e.g. for hosting activities related to the use of the Site, those processors handle information on our instructions.",
      },
      {
        body: "We use cookies from third-party partners such as Google Analytics for marketing and analytical purposes. Google Analytics help us understand how our customers use the site. We may also get Cookies from our advertisers. We do not control these Cookies, and once you have clicked on the advertisement and left the Site, our Privacy Policy no longer applies.",
      },
      {
        body: "We reserve the right, in our sole discretion, to change, modify, add or delete portions of this Privacy Policy at any time without notice, and it is your responsibility to review this Privacy Policy for updates.",
      },
      {
        body: "Any disputes over collection, storage and handling of Personal Information will be governed by this Privacy Policy, Terms and Conditions and by the laws of India and courts of Mumbai shall have exclusive jurisdiction.",
      },
    ],
  },
  {
    slug: "cookie-policy",
    label: "Cookie Policy",
    title: "Cookie Policy",
    pageTitle: "Cookie Policy - Foodstory",
    intro: sharedIntro,
    sections: [
      {
        body: "We use cookies to optimise your visit. By continuing to browse our site you are accepting our cookie policy.",
      },
      {
        body: "We use cookies from third-party partners such as Google Analytics for marketing and analytical purposes. Google Analytics help us understand how our customers use the site.",
      },
    ],
  },
  {
    slug: "weekend-of-plenty-terms-and-conditions",
    label: "Weekend of Plenty T&C",
    title: "Weekend of Plenty T&C",
    pageTitle: "Weekend of Plenty T&C - Foodstory",
    intro: sharedIntro,
    sections: [
      {
        body: "Weekend of Plenty offers are subject to these terms. Availability, qualifying products, and city coverage can change without notice.",
      },
      {
        body: "Unless a campaign note says otherwise, standard shipping, return, and cancellation rules still apply. For questions write to care@foodstories.shop or call +91 9004171401.",
      },
    ],
  },
  {
    slug: "kitchen-studio-policy",
    label: "Kitchen Studio Policy",
    title: "Kitchen Studio Policy",
    pageTitle: "Kitchen Studio Policy - Foodstory",
    intro: sharedIntro,
    sections: [
      {
        body: "Kitchen Studio bookings are confirmed by the store team after you submit the enquiry on the Kitchen Studio page. Arrive at your booked slot with the confirmation details.",
      },
      {
        body: "Cancellations and changes should be sent to care@foodstories.shop or +91 9004171401. Equipment, chef assistance, and what you may bring are confirmed with your booking.",
      },
    ],
  },
  {
    slug: "terms-services",
    label: "Terms and Services",
    title: "Terms and Services",
    pageTitle: "Terms and Services - Foodstory",
    intro: sharedIntro,
    sections: [
      {
        body: "By using the Foodstory website or app you agree to shop, gift, and service terms published on this site, including shipping, returns, privacy, and Kitchen Studio policies.",
      },
      {
        body: "Disputes are governed by the laws of India. Courts in Mumbai have exclusive jurisdiction. Contact care@foodstories.shop or +91 9004171401.",
      },
    ],
  },
  {
    slug: "material-release",
    label: "Material Release",
    title: "Material Release",
    pageTitle: "Material Release - Foodstory",
    intro: sharedIntro,
    sections: [
      {
        body: "Photographs, recipes, and editorial material on this site are published by Foodstory. Reuse of images or copy for commercial purposes needs written permission.",
      },
      {
        body: "Write to care@foodstories.shop for material-release requests.",
      },
    ],
  },
];

export function getPolicy(slug: string): PolicyDoc | undefined {
  return policies.find((policy) => policy.slug === slug);
}

export function allPolicySlugs(): string[] {
  return policies.map((policy) => policy.slug);
}
