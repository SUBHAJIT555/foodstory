export type PickupStore = {
  name: string;
  address: string;
};

/** Store cards read from the live location overlay DOM. */
export const pickupStores: PickupStore[] = [
  {
    name: "Bandra, Mumbai",
    address: "Ground Floor, Globus Building, Hill Road, Bandra West, Mumbai",
  },
  {
    name: "Lokhandwala, Mumbai",
    address: "Lokhandwala, Mumbai",
  },
  {
    name: "Ambience Mall, Vasant Kunj, New Delhi",
    address: "Lower Ground Floor, Ambience Mall, Vasant Kunj, Delhi - 110070",
  },
  {
    name: "Banjara Hills, Hyderabad",
    address: "Ground Floor, Vamsiram, BSR One, Banjara Hills, Hyderabad - 500034",
  },
];
