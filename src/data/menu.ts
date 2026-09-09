export type MenuItem = {
  name: string;
  /** Display price, e.g. "21" or "5/10" for small/large */
  price: string;
  /** Numeric price used for cart totals (lowest listed price) */
  value: number;
  note?: string;
};

export type MenuCategory = {
  id: string;
  title: string;
  blurb: string;
  items: MenuItem[];
};

const p = (name: string, price: string, note?: string): MenuItem => ({
  name,
  price,
  value: Number(price.split("/")[0]),
  ...(note ? { note } : {}),
});

export const menu: MenuCategory[] = [
  {
    id: "chicken",
    title: "Chicken Items",
    blurb: "Slow-cooked curries and house karahis",
    items: [
      p("Butter Chicken", "21"),
      p("Chicken Karahe", "10"),
      p("Chicken do Payaza", "13"),
      p("Chicken Tikka Masala", "19"),
      p("Chicken Rada", "15"),
      p("Chicken Keema Masala", "13"),
      p("Chicken Railway Curry", "16.5"),
      p("Chicken Kum Hara Shania", "13"),
      p("Chicken Hyderabadi", "14"),
      p("Chicken Afghani", "19.5"),
      p("Al Warqa Spc. Chicken", "25"),
      p("Chicken Champaran", "16.5"),
    ],
  },
  {
    id: "mutton-beef",
    title: "Mutton & Beef",
    blurb: "Rich, hearty and full of spice",
    items: [
      p("Mutton Tikka Masala", "22.5"),
      p("Mutton Karahe", "16"),
      p("Mutton Rogan Josh (4 pcs)", "20"),
      p("Mutton Keema", "21.5"),
      p("Mutton Masala", "10.5/20", "Half / Full"),
      p("Beef Qorma", "10"),
      p("Haleem", "8/10", "Small / Large"),
      p("Palak Gosht", "10"),
      p("Aaloo Gosht", "10"),
    ],
  },
  {
    id: "rice",
    title: "Rice",
    blurb: "Biryani, pulao and fried rice",
    items: [
      p("Chicken Biryani", "12"),
      p("Hyderabadi Biryani", "20"),
      p("Mutton Biryani", "21"),
      p("Mutton Kabab with Rice", "28"),
      p("Chicken Fried Rice", "12"),
      p("Chicken Schezwan Rice", "15"),
      p("Chicken Pulao", "13"),
      p("White Rice", "6"),
      p("Zeera Rice", "7"),
    ],
  },
  {
    id: "sandwiches",
    title: "Sandwiches",
    blurb: "Freshly made to order",
    items: [
      p("Chicken Sandwich", "5"),
      p("Chicken Chilli Sandwich", "6"),
      p("Oman Chips Sandwich", "6"),
      p("Francisco Sandwich", "7"),
      p("Zinger Sandwich", "10"),
      p("Hotdog Sandwich", "5"),
      p("Honey Sandwich", "4"),
      p("Burger Sandwich", "8"),
      p("Nuggets Sandwich", "7"),
      p("Egg Omelette Sandwich", "3"),
      p("Nutella Paratha Sandwich", "5"),
      p("Honey with Cheese Paratha", "4"),
      p("Pub G Paratha", "8"),
    ],
  },
  {
    id: "avenger",
    title: "The Avenger Family",
    blurb: "Smash burgers, stacked high",
    items: [
      p("Iron Smash", "10"),
      p("Thunder Smash", "10"),
      p("Hulk Smash", "15"),
      p("Captain Crunch", "12"),
      p("Spider Bite", "6"),
      p("Avenger Prime", "7"),
      p("Beef Truffle Burger", "35"),
      p("Chicken Burger Sp", "30"),
    ],
  },
  {
    id: "addons",
    title: "Add Ons",
    blurb: "Make it your own",
    items: [
      p("Extra Patty", "5"),
      p("Extra Cheese", "2"),
      p("Extra Jalapeno", "3"),
      p("Meal", "5"),
      p("Coleslaw", "4"),
      p("Tomato & Onion", "2"),
    ],
  },
  {
    id: "club",
    title: "Club Sandwiches",
    blurb: "Triple-decker classics",
    items: [
      p("Chicken Club", "12"),
      p("Beef Club", "14"),
      p("Zinger Club", "14"),
      p("Vegetable Club", "10"),
      p("Hotdog Club", "10"),
      p("Family Club Sp", "45"),
      p("International Club", "52"),
    ],
  },
  {
    id: "evening",
    title: "Evening Special",
    blurb: "Snacks from the evening counter",
    items: [
      p("Samosa", "1/2"),
      p("Spring Rolls", "2/3"),
      p("Kachori Bhaji", "10"),
      p("Vegetable Cutlets", "8"),
      p("Vada Paau", "5"),
      p("Paau Bhaji", "8"),
      p("Chicken Pakora", "2/3/4"),
      p("Onion Pakora", "2/3/4"),
      p("Honey Chilli Paratha", "4"),
      p("Vegetable Noodles", "13"),
      p("Kathi Rolls", "10"),
      p("Singaporean Noodles Spicy", "14"),
      p("Hara Bhara Kabab (6 pcs)", "13"),
      p("Vegetable Manchurian", "15"),
      p("Kon Tiki (6 pcs)", "16"),
      p("Khatte Rolls", "10"),
      p("Chana Chaat", "8"),
      p("Dahee Bade", "8"),
    ],
  },
  {
    id: "soups",
    title: "Soups Delight",
    blurb: "Small / Large",
    items: [
      p("Chicken Mancho Soup", "5/10", "Small / Large"),
      p("Veg Manchao Soup", "5/10", "Small / Large"),
      p("Chicken Hot and Sour", "5/10", "Small / Large"),
      p("Sweet Corn Soup", "5/10", "Small / Large"),
      p("Tomato Soup", "10"),
      p("Chicken Corn Soup", "5/10", "Small / Large"),
    ],
  },
  {
    id: "snacks",
    title: "Snacky and Nibbly",
    blurb: "Fried, crispy, shareable",
    items: [
      p("Onion Rings", "7/10", "Small / Large"),
      p("French Fries", "4/8", "Small / Large"),
      p("Shrimp Tempura", "16"),
      p("Chicken Nuggets", "14"),
      p("Squid Rings", "18"),
      p("Broast Chicken Fries", "15"),
      p("Loaded Fries", "15"),
    ],
  },
  {
    id: "weekend",
    title: "Saturday / Sunday Special",
    blurb: "Weekend only",
    items: [
      p("Haleem", "10/12", "Small / Large"),
      p("Paya", "10"),
      p("Hulk Smash Burger", "15"),
      p("Beef Qorma", "10"),
      p("Palak Gosht", "10"),
    ],
  },
  {
    id: "drinks",
    title: "Mind Refreshers",
    blurb: "Tea and coffee, all day",
    items: [
      p("Kadak Tea", "1"),
      p("Sulemani Nana Tea", "1"),
      p("Green Tea", "2"),
      p("Milk Coffee", "3"),
    ],
  },
];

export const business = {
  name: "Al Warqa Cafeteria",
  nameAr: "كافتيريا الورقاء",
  address:
    "School Zone, Muwaileh Commercial, Industrial Area, Sharjah, United Arab Emirates",
  landline: "06 702 1401",
  landlineHref: "tel:+97167021401",
  whatsapp: "052 350 4511",
  whatsappNumber: "971523504511",
  email: "alwarqacafeteria@gmail.com",
  mapsUrl: "https://maps.app.goo.gl/43kXStc5t6hMnoy77",
};
