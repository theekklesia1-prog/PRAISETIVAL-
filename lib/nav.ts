export type NavLink = {
  label: string;
  href: string;
  dropdown?: { label: string; href: string }[];
};

export const navLinks: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Our Impact", href: "/impact" },
  {
    label: "Contact Us",
    href: "/partner",
    dropdown: [
      { label: "Partner with Us", href: "/partner" },
      { label: "Become a Volunteer", href: "https://forms.gle/VDbMGPwcqsLFSzQE8" },
      {
        label: "Buy a Merch",
        href: "https://docs.google.com/forms/u/1/d/1JSXy9i3-_nsw5wZd90h1mTWoNnil1QnxBitSq3pzqsA/edit?usp=drivesdk",
      },
    ],
  },
];

export const footerColumns: {
  title: string;
  links: { label: string; href: string }[];
}[] = [
  {
    title: "Contact Us",
    links: [
      { label: "About Praisetival", href: "/about" },
      { label: "Partner with Us", href: "/partner" },
      { label: "Become a Volunteer", href: "/contact#volunteer" },
    ],
  },
  {
    title: "Events",
    links: [
      {
        label: "Audience of One",
        href: "https://youtu.be/jMqLLrYh4b8?si=xmBF6NRhI6AC-ZdJ",
      },
      {
        label: "Praisetival",
        href: "https://youtube.com/@praisetival_ireland?si=oQBcGp-tA_sH9B6d",
      },
    ],
  },
  {
    title: "Our Impacts",
    links: [{ label: "Our Ministers", href: "/#lineup" }],
  },
];
