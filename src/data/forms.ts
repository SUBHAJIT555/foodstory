export type EnquiryField =
  | {
      kind: "text" | "email" | "tel" | "number" | "date";
      name: string;
      placeholder: string;
      required?: boolean;
      prefix?: string;
    }
  | {
      kind: "store";
      name: string;
      placeholder: string;
      required?: boolean;
    }
  | {
      kind: "select";
      name: string;
      placeholder: string;
      options: string[];
      required?: boolean;
    };

export type EnquiryFormConfig = {
  slug: string;
  pageTitle: string;
  crumb: string;
  title: string;
  dek?: string;
  line?: string;
  sectionTitle?: string;
  submitLabel: string;
  fields: EnquiryField[];
};

export const timeSlots = ["10:00 AM", "11:30 AM", "1:00 PM", "3:00 PM", "5:00 PM", "6:30 PM"];

export const enquiryForms: EnquiryFormConfig[] = [
  {
    slug: "personal-shopper",
    pageTitle: "Form - Personal Shopper",
    crumb: "Personal Shopper",
    title: "Let's Shop Together!",
    dek: "Book our personal shopper for your next culinary exploration",
    line: "Craft your own food stories with a little help from us!",
    sectionTitle: "Tell Us About You",
    submitLabel: "Submit",
    fields: [
      { kind: "text", name: "name", placeholder: "Name*", required: true },
      { kind: "tel", name: "contactNumber", placeholder: "Contact Number*", required: true },
      { kind: "email", name: "email", placeholder: "Email Address*", required: true },
      { kind: "store", name: "store", placeholder: "Select Store*", required: true },
      { kind: "date", name: "dateOfBooking", placeholder: "Date of Booking*", required: true },
      { kind: "select", name: "timeSlot", placeholder: "Select Time Slot*", options: timeSlots, required: true },
    ],
  },
  {
    slug: "bespoke-orders",
    pageTitle: "Form - Bespoke Orders",
    crumb: "Bespoke Orders",
    title: "Bespoke Orders",
    dek: "Let’s Talk!",
    submitLabel: "Let's Go!",
    fields: [
      { kind: "text", name: "name", placeholder: "Name*", required: true },
      { kind: "tel", name: "phone", placeholder: "Enter Your Phone Number", required: true, prefix: "+ 91" },
      { kind: "email", name: "email", placeholder: "Email Address*", required: true },
      { kind: "number", name: "pincode", placeholder: "Delivery Pincode*", required: true },
      { kind: "number", name: "budget", placeholder: "Price Budget per Hamper*", required: true },
      { kind: "number", name: "hampers", placeholder: "Number of Hampers Needed*", required: true },
    ],
  },
];

export const bespokeHighlights = [
  {
    title: "Wrapped with Love",
    body: "The best-dressed gifts for all occasions. Need another option? Our shopping bags do double duty as gift bags.",
  },
  {
    title: "Curated by Experts",
    body: "Dont know what to gift? Our gift experts help you put together the perfect gift, every single time.",
  },
  {
    title: "The Personal Touch",
    body: "From charming embroidered initials to sentimental engravings, design your most memorable gifts with us.",
  },
  {
    title: "Gifting Concierge",
    body: "Take the stress out of gifting! Have our team put the finishing touches on your gift and get it ready to deliver joy.",
  },
];

export function getEnquiryForm(slug: string): EnquiryFormConfig | undefined {
  return enquiryForms.find((form) => form.slug === slug);
}

export function allFormSlugs(): string[] {
  return enquiryForms.map((form) => form.slug);
}
