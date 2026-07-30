export type Minister = {
  slug: string;
  name: string;
  role: string;
  image: string;
  bio: string[];
};

/**
 * Line-up order matches the Figma masonry (3 columns).
 * `image` points to portraits exported from Figma into /public/images/ministers.
 * Bios are the real copy from the Figma bio cards (node 1255:1033); Peter and
 * Solomon keep on-brand placeholders (no bio supplied in the design yet).
 */
export const ministers: Minister[] = [
  {
    slug: "paul-tomisin",
    name: "Paul Tomisin",
    role: "Music Minister",
    image: "/images/ministers/paul-tomisin.jpg",
    bio: [
      "Paul Tomisin is a worship minister and revival voice known for carrying sounds that stir hunger, prayer, and deeper encounters with God.",
      "He is a Nigerian gospel minister, songwriter, and worship leader whose ministry is marked by passionate worship and a deep hunger for God’s presence.",
      "Through songs like Iyin Ye and Reckless Lover, he continues to inspire lives and lead people into heartfelt worship and deeper intimacy with God.",
    ],
  },
  {
    slug: "gwen-samuel",
    name: "Gwen Samuel",
    role: "Music Minister",
    image: "/images/ministers/gwen-samuel.jpg",
    bio: [
      "Gwendoline Samuel is a singer/songwriter based in Ireland. She started singing at the age of 6 when she joined her church choir.",
      "She believes she is created for worship and to lead people to the Throne of God.",
      "She’s the composer of Oshindara and many more worship tunes.",
    ],
  },
  {
    slug: "tomi-favored",
    name: "Tomi Favored",
    role: "Music Minister",
    image: "/images/ministers/tomi-favored.jpg",
    bio: [
      "Tomi Favored is a singer, a BMI songwriter, musician, and growing producer with 8 released albums, including “I am Tomi Favored”, “YHWH”, “Jesus Christ in Everything”, “More of Jesus”, “Jesus in my Words”, “Trusting Jesus”, and “Accompaniment”.",
      "Credited with 100+ personally copyrighted and registered songs, collaborations with various artists, international commercial and voice-over work, and background vocals on secular projects, music is an integral part of her work.",
    ],
  },
  {
    slug: "abayomi-eniade",
    name: "Abayomi Eniade",
    role: "Music Minister",
    image: "/images/ministers/abayomi-eniade.jpg",
    bio: [
      "Abayomi Eniade is a worship leader and music minister passionate about leading people into genuine encounters with God through worship and sound.",
      "He is the convener of Praisetival, a worship gathering that continues to grow as a space for revival, heartfelt worship, and spiritual renewal through music.",
      "His ministry reflects a deep burden for God’s presence and a consistent drive to see lives impacted through music and worship encounters.",
    ],
  },
  {
    slug: "surefunmi-eniade",
    name: "Surefunmi Eniade",
    role: "Music Minister",
    image: "/images/ministers/surefunmi-eniade.jpg",
    bio: [
      "Surefunmi Eniade is a gospel music minister, vocal director, and worship leader with over a decade of experience shaping voices and leading worship expressions.",
      "In the last 4 editions of Praisetival till date, she has played a key role in guiding the vocal excellence of the platform, helping ministers and teams carry clarity and depth in worship.",
      "Beyond her work behind the scenes, she also expresses her own heart through music, with her recent single You Reign reflecting deep reverence for God’s presence and majesty.",
    ],
  },
  {
    slug: "tommy-emmanuel",
    name: "Tommy Emmanuel",
    role: "Pastor",
    image: "/images/ministers/tommy-emmanuel.jpg",
    bio: [
      "Tommy Emmanuel is a pastor, mentor, and communicator passionate about teaching the Word of God and helping believers grow in faith and clarity.",
      "He is the host of the podcast We Believe We Speak, where he explores faith, doctrine, and practical Christian living, helping listeners engage truth in a grounded and relatable way.",
      "His ministry focuses on equipping people to live out their faith with conviction and understanding.",
    ],
  },
  {
    slug: "damilola-salami",
    name: "Dami Salami",
    role: "Minister",
    image: "/images/ministers/damilola-salami.jpg",
    bio: [
      "Minister Dami Salami Shokunbi (popularly known online as Dami Shoks) is an ordained Christian minister, preacher, and digital content creator.",
      "She is primarily recognized for teaching the gospel, sharing Christocentric messages, and her active ministry across international Christian communities.",
      "Minister Dami was officially ordained at The LOGIC Church under the spiritual leadership and mentorship of Apostle Flourish Peters.",
    ],
  },
  {
    slug: "peter-akomere",
    name: "Peter Akomere",
    role: "Music Minister",
    image: "/images/ministers/peter-akomere.jpg",
    bio: [
      "Peter Akomere is a passionate gospel musician and worship leader with a heart for drawing people closer to God through music. He currently serves as the Music Director of Christ Church Worldwide (CCW) Ireland, where he leads with excellence and spiritual depth.",
      "His journey in music ministry began at Covenant University, where he served as Assistant Music Director and later Music Director of the university choir from 2015 to 2017. Peter is known for his powerful worship moments, authentic sound, and unwavering passion for the gospel. His music reflects a deep love for God and a desire to see lives transformed through the power of worship.",
    ],
  },
  {
    slug: "onos-ariyo",
    name: "Onos Ariyo",
    role: "Music Minister",
    image: "/images/ministers/onos-ariyo.jpg",
    bio: [
      "Onos Ariyo’s powerful voice and passionate worship inspire deep encounters with God.",
      "She is a worship minister known for her bold, heartfelt, and deeply moving sound. With powerful vocals and a strong passion for God’s presence, she leads believers into authentic worship experiences.",
      "Songs like Alagbara and Glorify Emmanuel have become expressions of faith and surrender, carrying her signature blend of strength and tenderness.",
    ],
  },
  {
    slug: "solomon-emmanuel",
    name: "Solomon Emmanuel",
    role: "Music Minister",
    image: "/images/ministers/solomon-emmanuel.jpg",
    bio: [
      "Solomon Emmanuel is a music minister carrying a fresh sound for a hungry generation.",
      "He leads with passion, drawing hearts to the beauty and presence of God.",
    ],
  },
];
