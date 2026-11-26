/* Shared content for the landing page sections. */

export type Testimonial = {
  quote: string;
  name: string;
  initials: string;
  tone: "cream" | "lavender" | "mint" | "rose";
  avatar: string;
  wide: boolean;
};

export const testimonials: Testimonial[] = [
  {
    quote:
      "Praisetival was truly an unforgettable experience! The atmosphere was powerful, filled with joy, heartfelt worship, and the undeniable presence of God. One of the most beautiful moments was connecting with other believers and sharing in such a powerful encounter together. I don’t know if I’ll come next time with dancing shoes or barefoot, but one thing’s for sure, I’m already expectant for the next move of God and the overflow of testimonies to come.",
    name: "Jennifer",
    initials: "JA",
    tone: "cream",
    avatar: "#f59e0b",
    wide: true,
  },
  {
    quote:
      "My experience at Praisetival was different to the usual, it was amazing, exciting, thrilling, too much words to explain. It was so great to see the success of the hours of work planned and put into the event.",
    name: "Dami Olojo",
    initials: "DO",
    tone: "lavender",
    avatar: "#7c3aed",
    wide: false,
  },
  {
    quote:
      "Last year’s Praisetival was everything and more! The atmosphere was charged with joy, worship, and hearts open to receive the life of Christ. It was beautiful to witness so many people come expectant and leave transformed. The testimonies that followed were a powerful reminder of God’s presence among us. If that was just a glimpse, then this year promises an even greater encounter.",
    name: "Timilehin",
    initials: "TI",
    tone: "mint",
    avatar: "#0e9f6e",
    wide: false,
  },
  {
    quote:
      "Streaming Praisetival online was such a powerful experience. Even from a distance, I could feel the atmosphere of worship, joy, and the presence of God. It was more than just watching a program; it felt like being part of a divine encounter with believers from different places, united in one spirit. The worship, the testimonies, and the passion behind the entire event were truly inspiring, and I left encouraged, refreshed, and expectant for what He is yet to do.",
    name: "Lydia",
    initials: "LY",
    tone: "rose",
    avatar: "#b91c1c",
    wide: true,
  },
];

export type Faq = { q: string; a: string };

export const faqs: Faq[] = [
  {
    q: "Who is organizing this concert?",
    a: "Praisetival is convened by a community of worshippers, ministers, and kingdom partners united by one vision — to create a space where thousands can encounter God through worship.",
  },
  {
    q: "How else can I support if I can’t give financially?",
    a: "There are many ways to partner with us: volunteer your time and skills, join a team, spread the word, and most importantly, cover the movement in prayer.",
  },
  {
    q: "Is the event free or ticketed?",
    a: "Praisetival is free to attend, made possible by the generosity of our partners and sponsors. Reserving a ticket simply helps us plan for you.",
  },
  {
    q: "Where and when is the concert taking place?",
    a: "Details of the venue and date will be announced soon. Reserve a ticket to be the first to know as the countdown draws closer.",
  },
];

export const featureCards = [
  {
    icon: "music",
    title: "World-Class Worship",
    text: "Acclaimed artists and local talents unite on one stage.",
  },
  {
    icon: "globe",
    title: "All Nations Welcome",
    text: "A truly global gathering with attendees from 12+ countries.",
  },
  {
    icon: "calendar",
    title: "One Unforgettable Day",
    text: "",
  },
] as const;

/** Placeholder event date for the live countdown (swap for the real date).
 *  Set ~145 days out to echo the design's "145 DAYS" mock. */
export const EVENT_DATE = "2026-11-28T15:00:00+00:00";

export const heroHeadlines = [
  "We are a Movement",
  "More Than an Event. A Legacy of Worship",
];

export const shekinahEvent = {
  title: "Shekinah Glory",
  date: "Saturday, 28th Nov 2026",
  venue: [
    "RCCG, Open Heaven, Auditorium",
    "20/21 Lee Road, Glasnevin, Dublin 11",
  ],
  poster: "/images/events/shekinah-glory.jpg",
};

/** The two events shown in the hero stacked card (desktop hover-reveal / mobile
 *  carousel). Audience of One details are placeholders — swap for the real ones. */
export type HeroEvent = {
  title: string;
  date: string;
  venue: [string, string];
  poster: string;
  countdown?: string;
};

export const heroEvents: HeroEvent[] = [
  {
    title: "Shekinah Glory",
    date: "Saturday, 28th Nov 2026",
    venue: [
      "RCCG, Open Heaven, Auditorium",
      "20/21 Lee Road, Glasnevin, Dublin 11",
    ],
    poster: "/images/events/shekinah-glory.jpg",
    countdown: EVENT_DATE,
  },
  {
    title: "Audience of One",
    date: "Last Friday, Every Month",
    venue: ["Streaming live online", "YouTube · @praisetival"],
    poster: "/images/events/audience-of-one.jpg",
  },
];
