import scoreAudio from "@/content/score-audio.json";

export const site = {
  name: "Jackson Kubo",
  title: "Jackson Kubo | Composer, Sound Designer, and Project Director",
  description:
    "Jackson Kubo is a composer and sound designer, and Project Director and Audio, Gameplay Design & Production Lead on B.L.U.E. at BlueHeaven Games.",
  url: "https://www.jacksonkubo.com",
  email: "jacksonkubokawa@gmail.com",
} as const;

export const socials = [
  {
    label: "YouTube",
    href: "https://www.youtube.com/channel/UCIJbs-k8Jwhw5lyjGnIAI2Q",
  },
  { label: "Instagram", href: "https://www.instagram.com/jackson_kubo/" },
  { label: "TikTok", href: "https://www.tiktok.com/@jacksonkubomusic" },
  {
    label: "Spotify",
    href: "https://open.spotify.com/artist/2mcuiPJAkFQMTwQ5JTIypA",
  },
  {
    label: "Apple Music",
    href: "https://music.apple.com/us/artist/jackson-kubo/1664612247",
  },
] as const;

export const nav = [
  { href: "/", label: "Home" },
  { href: "/composition", label: "Composition" },
  { href: "/sounddesign", label: "Sound Design" },
  { href: "/music", label: "Music" },
  { href: "/contactme", label: "Contact Me" },
] as const;

export type Cue = {
  id: string;
  project: string;
  title: string;
  duration: number;
  url: string;
};

export const cues = scoreAudio as Cue[];

export function cuesFor(project: string) {
  return cues
    .filter((cue) => cue.project === project)
    .map((cue) => ({ ...cue, url: `/audio/${cue.id}.mp3` }));
}

export function formatDuration(seconds: number) {
  const minutes = Math.floor(seconds / 60);
  const remainder = Math.round(seconds % 60);
  return `${minutes}:${remainder.toString().padStart(2, "0")}`;
}

export type Release = {
  slug: string;
  title: string;
  kind: string;
  year: string;
  description: string;
  artwork: string;
  artworkAlt: string;
  spotifyId: string;
  appleUrl: string;
  tracks: string[];
};

export const releases: Release[] = [
  {
    slug: "personalmusic-goldenage",
    title: "Golden Age (Jackson Kubo Remix)",
    kind: "Remix",
    year: "2026",
    description: "A remix of Gabe Holmes’ Golden Age.",
    artwork: "/media/golden.jpg",
    artworkAlt: "A hand reaching through bright blue water, cover art for Golden Age",
    spotifyId: "15dz5h24rackcuSH6hWrSR",
    appleUrl: "https://music.apple.com/us/album/golden-age-jackson-kubo-remix-single/1872125918",
    tracks: ["Gabe Holmes - Golden Age (Jackson Kubo Remix)"],
  },
  {
    slug: "digitallandscape",
    title: "Digital Landscape",
    kind: "Album",
    year: "2025",
    description: "An electronic album about the ever-changing digital world.",
    artwork: "/media/digital.jpg",
    artworkAlt:
      "Cover art for Digital Landscape: a wireframe face over mountains, with neon beams across a lake",
    spotifyId: "6FiBq12zSvIx1YgliMJoVD",
    appleUrl: "https://music.apple.com/us/album/digital-landscape/1824597267",
    tracks: [
      "Labyrinth",
      "LCD",
      "Where the Wind Blows",
      "Before You Feel Alive",
      "Reflection",
      "Holding On",
      "The Valley",
      "You and Me",
      "Hyperspace",
      "Pupil",
    ],
  },
  {
    slug: "crystalsea",
    title: "Crystal Sea",
    kind: "EP",
    year: "2025",
    description: "An ambient synth EP.",
    artwork: "/media/crystal.jpg",
    artworkAlt: "Cover art for Crystal Sea: a burst of pink, blue, and white light",
    spotifyId: "1YrCj9MC5RvvgWyMlbVqP8",
    appleUrl: "https://music.apple.com/us/album/crystal-sea-ep/1791766901",
    tracks: [
      "Natural Wonder",
      "Lost in the Stars",
      "Neptune",
      "Somewhere Else",
      "Crystal Sea",
    ],
  },
  {
    slug: "savetheworld",
    title: "Save the World!!!",
    kind: "Single",
    year: "2024",
    description: "A standalone single.",
    artwork: "/media/save.jpg",
    artworkAlt:
      "Cover art for Save the World!!!: a pastel astronaut floating among mushrooms, eyes, and a moon",
    spotifyId: "6170P9hOOFkJepYk8MqUmi",
    appleUrl: "https://music.apple.com/us/album/save-the-world-single/1740082376",
    tracks: ["Save The World!!!"],
  },
  {
    slug: "alayh",
    title: "As Long as You're Happy",
    kind: "Single",
    year: "2024",
    description: "A two-song single.",
    artwork: "/media/happy.jpg",
    artworkAlt:
      "Cover art for As Long as You're Happy: a black-and-white photo of an adult and a child holding hands",
    spotifyId: "4Qv7SrMfyC6PYRQEgiuC7Q",
    appleUrl:
      "https://music.apple.com/us/album/as-long-as-youre-happy-single/1726794273",
    tracks: ["As Long As You're Happy", "Half Alive"],
  },
  {
    slug: "theprocessoflife",
    title: "The Process of Life",
    kind: "EP",
    year: "2023",
    description: "An electronic EP on existential experience.",
    artwork: "/media/process.jpg",
    artworkAlt:
      "Cover art for The Process of Life: an eye filled with water, flowers, and fish against a star field",
    spotifyId: "4PqKBi1tEGmwjjVafdVQzV",
    appleUrl: "https://music.apple.com/us/album/the-process-of-life-ep/1726514788",
    tracks: [
      "All We Are",
      "Trip Report",
      "The Process of Life",
      "I Don't Want To Waste My Life",
      "Wondrous Creatures",
      "Moving On",
    ],
  },
  {
    slug: "dreamingofyou",
    title: "Dreaming of You",
    kind: "Album",
    year: "2023",
    description: "An indie pop love letter, and his first album.",
    artwork: "/media/dreaming.jpg",
    artworkAlt:
      "Cover art for Dreaming of You: Jackson Kubo under a tree, holding a pink telephone",
    spotifyId: "0I7NWLvDkEoS1ZWjJAy2yz",
    appleUrl: "https://music.apple.com/us/album/dreaming-of-you/1726214826",
    tracks: [
      "Where Were You?",
      "Closer Than That",
      "Something",
      "Psychic",
      "let me know, Tonight!",
      "Pathways",
      "When You Come Around",
      "All My Life",
      "Stargazing",
      "Dream of You Again",
    ],
  },
];

export function getRelease(slug: string) {
  const release = releases.find((item) => item.slug === slug);
  if (!release) {
    throw new Error(`Unknown release: ${slug}`);
  }
  return release;
}

export const projects = [
  {
    id: "blue",
    title: "B.L.U.E.",
    description:
      "B.L.U.E. (Build. Launch. Upgrade. Evolve.) is a space combat game of modular ship building and combat. Its game modes include Convergence, a co-op PvE roguelike against waves of enemy ships, and Divergence, a competitive PvP match. Part Evolutions transmute ship Parts into new combat capabilities as the fight goes on.",
    image: "/media/blue-screen.jpg",
    imageAlt: "",
    backgroundAlt:
      "A triangular spacecraft flies above a pale planet toward a glowing ring in a dark nebula, a still from B.L.U.E.",
    links: [
      {
        label: "Play on Steam",
        href: "https://store.steampowered.com/app/4681380/BLUE/",
      },
    ],
    video: {
      id: "5IDhlikc4F4",
      title: "B.L.U.E. — Official Trailer, USC Games Expo 2026",
    },
  },
  {
    id: "bleed",
    title: "BLEED RUNNER",
    description:
      "BLEED RUNNER is a 2.5D cyberpunk beat-em-up. A lone knight, stricken with a plague, searches a mysterious spaceship for the cure and survives by grabbing, throwing, and pummeling enemies for blood.",
    image: "/media/bleed-art.png",
    imageAlt:
      "Cover art for the BLEED RUNNER soundtrack: a pixel-art armored figure with a large pink weapon, labeled BLEED RUNNER and SOUNDTRACK",
    links: [
      {
        label: "Play on Steam",
        href: "https://store.steampowered.com/app/2670280/BLEED_RUNNER/",
      },
      {
        label: "Soundtrack on Spotify",
        href: "https://open.spotify.com/album/4vt3yEhOANxnikfCUDJsLO",
      },
      {
        label: "Soundtrack on Apple Music",
        href: "https://music.apple.com/us/album/bleed-runner-original-game-soundtrack/1816394192",
      },
    ],
  },
  {
    id: "oosia",
    title: "Oosia",
    description:
      "Inspired by quantum mechanics, Oosia is a puzzle adventure about making abstract mental connections.",
    image: "/media/oosia-art.png",
    background: "/media/crescendo.jpg",
    backgroundAlt:
      "A voxel concert hall with a red curtain, organ pipes, and empty seats, the setting for Oosia",
    imageAlt: "A small voxel house with the letters of Oosia floating above the garden",
    links: [],
  },
  {
    id: "crescendo",
    title: "Crescendo",
    description:
      "Crescendo is a Unity project that demonstrates interactive music techniques in Wwise.",
    image: "/media/crescendo-still.jpg",
    imageAlt: "",
    backgroundAlt:
      "A low-poly blue and green sphere hovers over a patterned floor in front of a neon city, a still from the Crescendo demo",
    links: [],
    video: {
      id: "G7QjpHo0Vdc",
      title: "Crescendo Wwise/Unity Demo",
    },
  },
  {
    id: "demos",
    title: "Various Demo Tracks",
    description: "Cues from other games and interactive experiments.",
    image: "/media/demo-bg.jpg",
    imageAlt: "",
    links: [],
  },
] as const;
