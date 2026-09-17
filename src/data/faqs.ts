import type { PdpFaq } from "@/data/pdp";

export type FaqCategory = {
  slug: string;
  label: string;
  title: string;
  faqs: PdpFaq[];
};

export const faqIntro =
  "We answer the most common questions you may have here. If you still can't find the answer you're looking for, feel free to contact us!";

export const faqCategories: FaqCategory[] = [
  {
    slug: "shopping-at-foodstories",
    label: "Shopping at Foodstory",
    title: "Shopping At Foodstory",
    faqs: [
      {
        question: "When will I receive my order?",
        answer:
          "Delivery is slot-based. Depending on availability, orders can arrive as early as within 4 hours or be scheduled up to two days later. You will receive a confirmation with the expected time after checkout.",
      },
      {
        question: "Can I cancel or modify my order?",
        answer:
          "You can cancel an online order within 5 minutes of confirmation by calling +91 9004171401. Express delivery orders cannot be cancelled. After that window, call customer service or the store. Partial cancellations are not available.",
      },
      {
        question: "What do I do if I have a complaint about my order?",
        answer:
          "Write to care@foodstories.shop or call +91 9004171401 as soon as you receive the order. We will take the necessary steps to assist you.",
      },
      {
        question: "How do I see the invoice for my order?",
        answer:
          "An invoice is sent with your order confirmation email or SMS. If you cannot find it, contact care@foodstories.shop with your order details.",
      },
      {
        question: "What if I’m unable to find the product I want on your website?",
        answer:
          "Book a Personal Shopper or write to care@foodstories.shop. Our advisors can help source or suggest an alternative.",
      },
      {
        question: "How do I check the status of my order?",
        answer:
          "Use the confirmation email or SMS sent after checkout, or call +91 9004171401 with your order number.",
      },
      {
        question: "How can I order with Foodstory?",
        answer:
          "Shop online at foodstories.shop, visit a store, or book a Personal Shopper. Cash on delivery is available on eligible orders.",
      },
      {
        question: "Can I have my order delivered to multiple locations?",
        answer:
          "Each order is delivered to one address. Place separate orders for additional locations.",
      },
      {
        question: "How can I return or exchange my order?",
        answer:
          "Fresh and perishable items can be returned or exchanged within 24 hours; non-perishable items within 72 hours, in original condition. See the Returns and Refunds Policy.",
      },
      {
        question: "What are the store timings?",
        answer:
          "Most stores are open 10:00 AM to 10:00 PM. Lavelle Road, Bengaluru opens at 09:00 AM. Banjara Hills, Hyderabad is 10:30 AM to 10:30 PM.",
      },
      {
        question: "How do I contact/ find the store?",
        answer:
          "Use the Store Locator for addresses, timings, and directions, or call +91 9004171401.",
      },
      {
        question: "Can I have someone pick up my order?",
        answer:
          "Yes. Choose pickup in the location overlay and select a store. Someone else may collect the order with the confirmation details.",
      },
      {
        question: "Do you offer cash on delivery?",
        answer: "Yes. Cash on Delivery is available on eligible orders.",
      },
    ],
  },
  {
    slug: "gifting-with-foodstories",
    label: "Gifting with Foodstory",
    title: "Gifting with Foodstory",
    faqs: [
      {
        question: "Can I personalise a gift?",
        answer:
          "Yes. Many gifts can include a message card. Use Create Your Own on the gifting landing or write to our gifting team.",
      },
      {
        question: "Do you deliver gifts across cities?",
        answer:
          "Gifts can be delivered to serviceable areas in Delhi, Gurugram, Hyderabad, Bengaluru, and Mumbai, or collected in store.",
      },
      {
        question: "Can I add a gift message?",
        answer: "Yes. Gift products include a message field on the product page.",
      },
    ],
  },
  {
    slug: "bulk-gifting",
    label: "Bulk Gifting",
    title: "Bulk Gifting",
    faqs: [
      {
        question: "How do I enquire for bulk or corporate gifts?",
        answer:
          "Use the seven-step form on the Bulk Gifting page. We reply with tailor-made ideas within 24 hours.",
      },
      {
        question: "Is there a minimum quantity?",
        answer: "Tell us the quantity on the enquiry form. Our team will confirm what we can fulfil for your date.",
      },
    ],
  },
  {
    slug: "returns-refunds-and-exchanges",
    label: "Returns, Refunds & Exchanges",
    title: "Returns, Refunds & Exchanges",
    faqs: [
      {
        question: "How can I return or exchange my order?",
        answer:
          "Perishable items: 24 hours. Non-perishable: 72 hours, unused and in original condition. In-store purchases must be returned at the store. Reverse pickup is arranged only for incorrect, damaged, or defective online orders reported in time.",
      },
      {
        question: "When do I get a refund?",
        answer:
          "Refunds are issued only for damaged, defective, incorrect, or missing items. Other eligible returns receive a credit note valid for 90 days. Prepaid refunds go to the original payment mode in 5–7 working days.",
      },
    ],
  },
  {
    slug: "cancellations",
    label: "Cancellations",
    title: "Cancellations",
    faqs: [
      {
        question: "Can I cancel or modify my order?",
        answer:
          "Cancel within 5 minutes of confirmation on +91 9004171401. Express delivery cannot be cancelled. Partial cancellations are not allowed.",
      },
    ],
  },
  {
    slug: "kitchen-studio-and-events",
    label: "Kitchen Studio & Events",
    title: "Kitchen Studio & Events",
    faqs: [
      {
        question: "How do I book a slot at the Kitchen Studio?",
        answer: "Open the Kitchen Studio page, choose For Individuals or For Businesses, select a store, and submit.",
      },
      {
        question: "Can I cancel my Kitchen Studio booking?",
        answer: "Write to care@foodstories.shop or call +91 9004171401 with your booking details.",
      },
      {
        question: "What do you provide when I book the Kitchen Studio?",
        answer:
          "A chef-assisted, equipment-ready kitchen designed for professional shoots and recipe work. See the Kitchen Studio Policy for inclusions.",
      },
      {
        question: "Can I bring my own ingredients?",
        answer: "Yes. You may bring your own ingredients unless a booking note says otherwise.",
      },
      {
        question: "How do I start using the Kitchen Studio on the day of my booking?",
        answer: "Arrive at the selected store at your slot time. The team will check you in and show you the space.",
      },
      {
        question: "What do I do if I haven't received a confirmation for my booking after making the payment?",
        answer: "Email care@foodstories.shop or call +91 9004171401 with your payment reference.",
      },
    ],
  },
  {
    slug: "personal-shopper",
    label: "Personal Shopper",
    title: "Personal Shopper",
    faqs: [
      {
        question: "How do I book a personal shopper?",
        answer: "Use the Personal Shopper form: name, contact, email, store, date, and time slot.",
      },
      {
        question: "Is the personal shopper free?",
        answer: "Book the slot on the form. Our team will confirm any applicable charges when they write back.",
      },
    ],
  },
  {
    slug: "food-and-beverage",
    label: "Food & Beverage",
    title: "Food & Beverage",
    faqs: [
      {
        question: "Are products suitable for specific diets?",
        answer:
          "Look for Lifestyle & Diet on the shop, including gluten-free, vegan, keto, and organic filters. Product pages list ingredients where captured.",
      },
      {
        question: "Do you sell alcohol?",
        answer: "Foodstory is a gourmet grocery. Browse the shop and store teams for the range available in your city.",
      },
    ],
  },
];

export function getFaqCategory(slug?: string): FaqCategory | undefined {
  if (!slug) return faqCategories[0];
  return faqCategories.find((category) => category.slug === slug);
}

export function allFaqSlugs(): string[] {
  return faqCategories.map((category) => category.slug);
}
