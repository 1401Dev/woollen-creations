// Product data for the whole site.
// Add, edit or remove items here — every page reads from this one file.
//
// To add real photos for a product:
//   1. Drop 1–N image files into `images/<slug>/` (e.g. images/bottle-band/1.jpg)
//   2. Add an `images: [...]` array listing their paths (first one is the cover)
// If `images` is omitted, the site falls back to a generated SVG placeholder.

export const products = [
  {
    slug: "bottle-band",
    name: "Bottle Band",
    category: "accessories",
    summary:
      "A crocheted granny-square cuff that slips around your tumbler.",
    description:
      "Three little granny squares joined in a row and finished with a soft band of single-crochet so it hugs a tumbler snugly. Pastel oranges and mint greens are worked around a cream ground, with a tiny magenta heart at the centre square. Fits the standard 30 oz tumblers; stretches to grip without sliding. Hand-wash and air-dry.",
    materials: [
      "Pima-cotton yarn",
      "Cotton thread for joining",
      "Elastic band inside the cuff",
    ],
    madeTime: "About 5 hours",
    colors: ["#f0a98a", "#a8dcd0", "#f4ead6", "#b63463"],
    images: ["images/bottle-band/1.jpg", "images/bottle-band/2.jpg", "images/bottle-band/3.jpg"],
    featured: true,
  },
  {
    slug: "crochet-phone-pouch",
    name: "Crochet Phone Pouch",
    category: "accessories",
    summary: "A handy crocheted pouch for your phone.",
    description:
      "Hand-crocheted from soft merino-blend yarn, this pouch is perfect for holding your phone secure and close at hand. The design features a cute little pocket for your keys and a handy drawstring closure.",
    materials: ["Merino wool blend", "Polyfill", "Cotton embroidery thread"],
    madeTime: "About 14 hours",
    colors: ["#c48a5a", "#f1d6a5", "#3a2a1f"],
    images: ["images/crochet-phone-pouch/1.jpg", "images/crochet-phone-pouch/2.jpg", "images/crochet-phone-pouch/3.jpg"],
    featured: true,
  },
  {
    slug: "oatmeal-cable-scarf",
    name: "Oatmeal Cable Scarf",
    category: "wearables",
    summary: "A classic cable-knit scarf in undyed wool.",
    description:
      "Knit on size 6 needles with a traditional four-stitch cable running the full length. The oatmeal colour comes from the natural fleece — no dye — so the subtle variation in tone is part of the character. Blocked by hand for a soft drape.",
    materials: ["Undyed Shetland wool"],
    madeTime: "About 22 hours",
    colors: ["#e4d8c3", "#c7b89d"],
    featured: true,
  },
  {
    slug: "woodland-mushroom-coasters",
    name: "Woodland Mushroom Coasters",
    category: "home",
    summary: "A set of four felted mushroom-cap coasters.",
    description:
      "Wet-felted from carded wool batts, each cap is about 10 cm across and just thick enough to catch a warm mug. The underside is left raw-felted for grip. Comes as a set of four in forest reds, moss greens and cream speckles.",
    materials: ["Carded New Zealand wool", "Natural soap"],
    madeTime: "About 6 hours per set",
    colors: ["#9e3b2a", "#6a7a3f", "#f4ece0"],
  },
  {
    slug: "fisherman-beanie",
    name: "Fisherman Beanie",
    category: "wearables",
    summary: "A deep-cuffed watch cap in salt-and-pepper wool.",
    description:
      "Knit in the round with a doubled brim so it sits warm on the ears. The salt-and-pepper tweed comes from two strands of natural fleece plied together. Sized for adults; stretches comfortably.",
    materials: ["Natural tweed wool", "Elastic band"],
    madeTime: "About 10 hours",
    colors: ["#4a4238", "#bfb6a6"],
  },
  {
    slug: "spring-garland",
    name: "Spring Garland",
    category: "home",
    summary: "A 1.5-metre garland of pom-poms and tiny crocheted leaves.",
    description:
      "Alternating wool pom-poms in mossy greens, pale pinks and buttermilk, with little crocheted leaves between them. Strung on sturdy cotton twine. Hang it along a mantel, over a crib, or across a kitchen window.",
    materials: ["Wool pom-poms", "Cotton yarn", "Cotton twine"],
    madeTime: "About 8 hours",
    colors: ["#aab97a", "#eac7c0", "#f6ebcf"],
  },
  {
    slug: "tabby-cat-amigurumi",
    name: "Ginger the Tabby",
    category: "amigurumi",
    summary: "A loaf-shaped tabby cat, forever mid-nap.",
    description:
      "Worked in two shades of russet to get the classic tabby stripe. Weighted slightly in the base so he sits properly on a shelf. Tail is wired inside so you can curl it around his paws.",
    materials: ["Acrylic–wool blend", "Glass beads for weight", "Floral wire"],
    madeTime: "About 12 hours",
    colors: ["#b9623a", "#efd1b1", "#2d1f17"],
    featured: true,
  },
  {
    slug: "braided-headband",
    name: "Braided Headband",
    category: "accessories",
    summary: "A chunky three-strand braided headband with a button closure.",
    description:
      "A quick, satisfying make: three fat cables, plaited together and finished with a wooden button so you can adjust the fit. Warm enough for a brisk morning walk without the full hat.",
    materials: ["Chunky merino", "Wooden button"],
    madeTime: "About 4 hours",
    colors: ["#8a6a4a", "#d2b48c"],
  },
  {
    slug: "cloud-cushion",
    name: "Cloud Cushion",
    category: "home",
    summary: "A plush, puffy cushion with a crocheted-cloud cover.",
    description:
      "The outer shell is crocheted in soft bouclé for texture, then stuffed with a down-alternative insert. Zip closure on the back for washing the cover. About 40 × 30 cm.",
    materials: ["Bouclé wool", "Down-alternative insert", "Nylon zip"],
    madeTime: "About 9 hours",
    colors: ["#f5f2ec", "#dcd4c6"],
  },
];

export const categoryLabels = {
  amigurumi: "Amigurumi",
  wearables: "Wearables",
  home: "For the home",
  accessories: "Accessories",
};

export function getProduct(slug) {
  return products.find((p) => p.slug === slug);
}

export function getFeatured() {
  return products.filter((p) => p.featured);
}
