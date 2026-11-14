import scoreAudio from "@/content/score-audio.json";

export const site = {
  name: "Jackson Kubo",
  title: "Jackson Kubo | Music Composer and Sound Designer",
  description: "Jackson Kubo creates music for an infinite universe.",
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
  return cues.filter((cue) => cue.project === project);
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
    description: "My remix of Gabe Holme's Golden Age.",
    artwork: "/media/golden.jpg",
    artworkAlt: "A hand reaching through bright blue water, artwork for Golden Age",
    spotifyId: "15dz5h24rackcuSH6hWrSR",
    appleUrl: "https://music.apple.com/us/artist/jackson-kubo/1664612247",
    tracks: ["Gabe Holmes - Golden Age (Jackson Kubo Remix)"],
  },
  {
    slug: "digitallandscape",
    title: "Digital Landscape",
    kind: "Album",
    year: "2025",
    description:
      "Digital Landscape is an electronic album about the ever-changing digital world we live in.",
    artwork: "/media/digital.jpg",
    artworkAlt: "Album artwork for Digital Landscape",
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
    description: "Crystal Sea is an ambient synth EP.",
    artwork: "/media/crystal.jpg",
    artworkAlt: "Album artwork for Crystal Sea",
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
    description: "Save the World!!! is a single.",
    artwork: "/media/save.jpg",
    artworkAlt: "Album artwork for Save the World!!!",
    spotifyId: "6170P9hOOFkJepYk8MqUmi",
    appleUrl: "https://music.apple.com/us/album/save-the-world-single/1740082376",
    tracks: ["Save The World!!!"],
  },
  {
    slug: "alayh",
    title: "As Long as You're Happy",
    kind: "Single",
    year: "2024",
    description: "As Long as You're Happy is a two-song single.",
    artwork: "/media/happy.jpg",
    artworkAlt: "Album artwork for As Long as You're Happy",
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
    description:
      "The Process of Life is an electronic EP that explores the depths of existential experience.",
    artwork: "/media/process.jpg",
    artworkAlt: "Album artwork for The Process of Life",
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
    description:
      "Dreaming of You is an indie pop love letter and my first album release.",
    artwork: "/media/dreaming.jpg",
    artworkAlt: "Album artwork for Dreaming of You",
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
    kicker: "Build. Launch. Upgrade. Evolve.",
    description:
      "B.L.U.E. (Build, Launch, Upgrade, Evolve) is a multiplayer PVP space sandbox engineering simulator. As a BlueHeaven Aerospace Engineer, you design spaceships that follow real world physics, load it with maximum fire power, and test it against your best friends. Note: mind the heat!",
    image: "/media/blue-screen.jpg",
    imageAlt: "A spacecraft climbing away from a planet toward a bright ring in space",
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
    kicker: "Original score",
    description:
      "BLEED RUNNER is a 2.5D cyberpunk beat-em-up in which a lone knight fights an encroaching plague! Suddenly stricken with the disease, seek the cure on the mysterious spaceship and survive by grabbing, throwing, and pummeling enemies for blood.",
    image: "/media/bleed-art.png",
    imageAlt: "Pixel-art cover for the BLEED RUNNER soundtrack",
    videoFile: {
      webm: "/media/bleed.webm",
      mp4: "/media/bleed.mp4",
      poster: "/media/bleed-poster.jpg",
    },
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
    kicker: "Puzzle adventure",
    description:
      "Inspired by quantum mechanics, OOSIA is a puzzle adventure game about making abstract mental connections.",
    image: "/media/oosia-art.png",
    imageAlt: "A small voxel house with the letters of Oosia floating above the garden",
    links: [{ label: "Visit Oosia", href: "https://joeycents.com/oosia" }],
  },
  {
    id: "crescendo",
    title: "Crescendo",
    kicker: "Interactive music",
    description:
      "Crescendo is a small Unity project I made to demo interactive music techniques in Wwise.",
    image: "/media/crescendo.jpg",
    imageAlt: "A voxel concert hall facing a pipe organ and a red curtain",
    links: [],
    video: {
      id: "G7QjpHo0Vdc",
      title: "Crescendo Wwise/Unity Demo",
    },
  },
  {
    id: "demos",
    title: "Various Demo Tracks",
    kicker: "Sketches",
    description: "Cues from other game and interactive experiments.",
    image: "/media/demo-bg.jpg",
    imageAlt: "",
    links: [],
  },
] as const;
