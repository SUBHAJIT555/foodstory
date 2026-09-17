import { homeStores } from "@/data/home";
import { pickupStores } from "@/data/location";

function mapHrefFor(name: string): string {
  return homeStores.find((store) => store.name === name)?.mapHref ?? "/store-locator/";
}

export type LocatorStore = {
  name: string;
  city: string;
  address: string;
  timings: string;
  openLabel: string;
  director: string;
  quote: string;
  phone: string;
  mapHref: string;
};

export const locatorStores: LocatorStore[] = [
  {
    name: "Bandra, Mumbai",
    city: "Mumbai",
    address: "Ground Floor, Globus Building, Hill Road Bandra West, Mumbai",
    timings: "10:00 AM - 10:00 PM",
    openLabel: "Store is Open",
    director: "Vishnu Dhara Store Director",
    quote: "It is a matter of immense pride to launch Foodstory in Mumbai and we're excited to have the opportunity to serve you.",
    phone: "9004171401",
    mapHref: mapHrefFor("Bandra, Mumbai"),
  },
  {
    name: "Lokhandwala, Mumbai",
    city: "Mumbai",
    address: "Bharat AltaVista, 10A, Lokhandwala Circle, Lokhandwala Complex Andheri West, Mumbai - 400053",
    timings: "10:00 AM - 10:00 PM",
    openLabel: "Store is Open",
    director: "Amrit Raj Store Director",
    quote: "It is a matter of immense pride to launch Foodstory in Mumbai and we're excited to have the opportunity to serve you.",
    phone: "9004171401",
    mapHref: mapHrefFor("Lokhandwala, Mumbai"),
  },
  {
    name: "Lavelle Road, Bengaluru",
    city: "Bengaluru",
    address: "Ground Floor, Prestige Sterling Square Lavelle Road",
    timings: "09:00 AM - 10:00 PM",
    openLabel: "Store is Open",
    director: "Sofi Musavir Store Director",
    quote: "Namaskara! Namma Foodstory Bengaluru is now open-bringing you the finest luxury ingredients and gourmet delights. Visit us and Taste the Extraordinary!",
    phone: "9004171401",
    mapHref: mapHrefFor("Lavelle Road, Bengaluru"),
  },
  {
    name: "Ambience Mall, Vasant Kunj, New Delhi",
    city: "New Delhi",
    address: "Lower Ground Floor, Ambience Mall, Vasant Kunj Delhi - 110070",
    timings: "10:00 AM - 10:00 PM",
    openLabel: "Store is Open",
    director: "Anoshk Singh Store Director",
    quote: "We are excited to welcome you and help you write your next food story.",
    phone: "9004171401",
    mapHref: mapHrefFor("Ambience Mall, Vasant Kunj, New Delhi"),
  },
  {
    name: "Banjara Hills, Hyderabad",
    city: "Hyderabad",
    address: "Ground Floor, Vamsiram, BSR One, Banjara Hills Hyderabad - 500034",
    timings: "10:30 AM - 10:30 PM",
    openLabel: "Store is Open",
    director: "Pankaj Kumar Bidaliya Store Director",
    quote: "Namaskaram, Hyderabad! We are excited to welcome you and help you write your next food story.",
    phone: "9004171401",
    mapHref: mapHrefFor("Banjara Hills, Hyderabad"),
  },
];

export const formStores = [
  ...pickupStores.map((store) => store.name),
  "Lavelle Road, Bengaluru",
];

export const serviceableAreas: Array<{ city: string; areas: string }> = [
  {
    city: "Delhi",
    areas:
      "Vasant Kunj | Vasant Vihar | Chhatarpur | Mehrauli | Saket | Malviya Nagar | Hauz Khas | Green Park | Safdarjung Enclave | Gulmohar Park | Panchsheel Enclave | Greater Kailash 1 | Greater Kailash 2 | Greater Kailash 3 | Defence Colony | Lajpat Nagar | Nehru Place | East of Kailash | South Extension I | South Extension II | Sainik Farms | Shanti Niketan | Anand Niketan | R K Puram | Munirka | IIT Delhi | SDA Market | Chanakyapuri | Lodhi Road | Lodhi Colony | Golf Links | Jor Bagh | Nizamuddin | Jangpura | Rajouri Garden | Punjabi Bagh | Naraina Vihar",
  },
  {
    city: "Gurugram",
    areas:
      "Sector 14 | Sector 15 | Civil Lines | Sadar Bazar | New Colony | Arjun Nagar | South City 2 | Nirvana Country | Malibu Town | Rosewood City | Vatika City | Badshahpur | Basai | Sushant Lok | Golf Course Road | Ambience Island | Cyber City | Udyog Vihar | DLF Phase 1 | DLF Phase 2 | DLF Phase 3 | DLF Phase 4 | MG Road | Sikanderpur | Nathupur",
  },
  {
    city: "Hyderabad",
    areas:
      "Jubilee Hills | Madhapur | Hi-Tech City | Gachibowli | Film Nagar | Road No. 36 | Somajiguda | Punjagutta | Ameerpet | Begumpet | Srinagar Colony | Yousufguda | Rahmath Nagar | Sanath Nagar | Erragadda | SR Nagar | Balkampet | Mehdipatnam | Tolichowki | Humayun Nagar | Attapur | Masab Tank | Lakdikapul | Khairatabad",
  },
  {
    city: "Bangalore",
    areas:
      "MG Road | Brigade Road | Residency Road | Richmond Town | Shanthinagar | Ashoknagar | Wilson Garden | Langford Town | Koramangala | HSR Layout | Adugodi | Austin Town | Ejipura | Indiranagar | Domlur | HAL 2nd Stage | Murugeshpalya | Jeevan Bhima Nagar | Ulsoor | Cox Town | Fraser Town | Benson Town | Shivaji Nagar | Vasanth Nagar | Palace Road | Cunningham Road | Sadashivanagar | Malleshwaram | Rajajinagar | Basavanagudi | Jayanagar | JP Nagar | BTM Layout | Banashankari | Basaveshwaranagar | Vijayanagar | Mahalakshmipuram | Nandini Layout | Mathikere | Hebbal | RT Nagar | Sanjaynagar | Sahakaranagar | Nagawara | Kalyan Nagar | Horamavu | Hennur | CV Raman Nagar | KR Puram | Bellandur | Kadubeesanahalli | Marathahalli | Yemalur | HAL Airport Road | Banaswadi | Nagarbhavi | Nayandahalli | Peenya",
  },
  {
    city: "Mumbai",
    areas:
      "Nehru Nagar | Boriwali East | Boriwali | Boriwali west | Kandivali East | Kandivali West | Malad East | Malad West | Goregaon East | Goregaon West | Goregaon | Madh Area | Andheri East | Andheri west | Andheri Railway Station | Jogeshwari East | Jogeshwari west | Juhu | Ville Parle East | Ville Parle West | Shivaji park | Wagle Industrial estate | Mulund west | Wadala | Govandi | Bhandup west | Bhandup East | Vikhroli East | Chakala | Vikhroli (East/west) | Powai | Pant Nagar | Rajawadi SO | Marol | Sakinaka | Ghatkopar west | Barve nagar | Marol, Andheri East | South Mumbai | Kalbadevi | Chembur | Chembur West | Lower Parel | Kurla west | Worli | Parel | Antop hill | Santacruz East | Dadar East/West | Bandra East | Santacruz west | Khar | Bandra West",
  },
];
