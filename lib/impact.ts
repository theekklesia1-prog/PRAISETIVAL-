export const impactHero = {
  label: "Our Impact",
  title:
    "Praisetival has grown into one of Ireland’s most anticipated gospel music and worship gatherings",
};

export const impactIntro = {
  heading: "What began as a vision to bring people together in worship",
  body: "Since its inception, Praisetival has grown into one of Ireland’s most anticipated gospel music and worship gatherings. What began as a vision to bring people together in worship has evolved into a movement that continues to impact lives, strengthen faith, and foster Christian community across Ireland.",
  cta: "Read More",
};

export type Artist = {
  slug: string;
  name: string;
  role: string;
  image: string;
};

// Grid order matches the Figma (2 columns, row by row).
export const artists: Artist[] = [
  {
    slug: "gabriel-eziashi",
    name: "Pastor Gabriel Eziashi",
    role: "Music Artiste",
    image: "/images/impact/gabriel-eziashi.jpg",
  },
  {
    slug: "gwen-samuels",
    name: "Gwen Samuels",
    role: "Music Artiste",
    image: "/images/impact/gwen-samuels.jpg",
  },
  {
    slug: "adekunle-osilaja",
    name: "Pastor Adekunle Osilaja",
    role: "Pastor",
    image: "/images/impact/adekunle-osilaja.jpg",
  },
  {
    slug: "eben",
    name: "Eben",
    role: "Music Artiste",
    image: "/images/impact/eben.jpg",
  },
  {
    slug: "faith-brodrick",
    name: "Faith Brodrick",
    role: "Music Artiste",
    image: "/images/impact/faith-brodrick.jpg",
  },
  {
    slug: "surefunmi-eniade",
    name: "Surefunmi Eniade",
    role: "Music Artiste",
    image: "/images/impact/surefunmi-eniade.jpg",
  },
  {
    slug: "ojb",
    name: "OJB",
    role: "Music Artiste",
    image: "/images/impact/ojb.jpg",
  },
  {
    slug: "marv-amen",
    name: "Marv Amen",
    role: "Music Artiste",
    image: "/images/impact/marv-amen.jpg",
  },
  {
    slug: "pelumi-songz",
    name: "Pelumi Songz",
    role: "Music Artiste",
    image: "/images/impact/pelumi-songz.jpg",
  },
  {
    slug: "ccw-dublin",
    name: "CCW Dublin",
    role: "Music Artiste",
    image: "/images/impact/ccw-dublin.jpg",
  },
  {
    slug: "tommy-immanuel",
    name: "Tommy Immanuel",
    role: "Pastor",
    image: "/images/impact/tommy-immanuel.jpg",
  },
  {
    slug: "limit-breakers",
    name: "Limit Breakers",
    role: "Music Artiste",
    image: "/images/impact/limit-breakers.jpg",
  },
];

export const impactNumbers = [
  { value: "4", label: "Successful Editions" },
  { value: "478", label: "Average Attendees" },
  { value: "50k+", label: "Youtube Views" },
  { value: "275k+", label: "Online Presence" },
];

export const donations = {
  label: "Sponsorship",
  title: "Fuel the Praise",
  body: "Praisetival is fully funded by kingdom partners, sponsors, and voluntary donations from those who believe in our vision and mission.",
  cta: "Partner With Us",
};
