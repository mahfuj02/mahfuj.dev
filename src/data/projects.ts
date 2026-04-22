export type Project = {
  id: string;
  slug: string;
  title: string;
  category: string;
  bannerImage: string;
  bannerAlt: string;
  year: string;
  role: string;
  summary: string;
  details: string[];
  stack: string[];
  challenge: string;
  solution: string;
  impact: string;
  liveUrl?: string;
  githubUrl?: string;
};

export const projects: Project[] = [
  {
    id: "role-ready",
    slug: "role-ready",
    title: "RoleReady",
    category: "AI Web Application",
    bannerImage: "/projects/roleready_portfolio.jpg",
    bannerAlt: "RoleReady AI interview coaching web app banner",
    year: "2026",
    role: "Full Stack Developer",
    summary:
      "RoleReady is a live AI interview coaching web app where users upload resume and job description, practice tailored questions by text or voice, and receive structured scoring feedback.",
    details: [
      "Built and deployed a live Next.js web app with Supabase authentication and Groq AI services for interview preparation workflows.",
      "Implemented resume and job description intake flow (upload, paste, or URL) followed by AI-driven gap analysis and personalized prep recommendations.",
      "Generated an interview question bank with 18 tailored questions (behavioral, technical, and situational) aligned to each user's target role.",
      "Designed practice sessions with typed or spoken answers, integrating Groq Whisper for speech-to-text and Llama 3.3 70B for analysis and feedback.",
      "Delivered structured feedback scoring with overall score plus category-level evaluation across Relevance, STAR structure, Depth, and Communication.",
      "Shipped full session completion reporting with score summary, STAR breakdown, improvement insights, skipped question tracking, and actionable next steps.",
      "Created a polished product UI using a navy, teal, amber, green, and red state system with Syne and DM Sans to support clear learning progress.",
      "Live site: role-ready-snowy.vercel.app",
    ],
    stack: ["Next.js", "TypeScript", "Supabase Auth", "Groq API", "Llama 3.3 70B", "Whisper", "Vercel"],
    liveUrl: "https://role-ready-snowy.vercel.app",
    challenge:
      "Job seekers need realistic interview preparation that adapts to resume gaps and job requirements while giving actionable feedback beyond generic question lists.",
    solution:
      "Built an end-to-end AI interview coach that analyzes resume-to-role gaps, generates tailored questions, supports voice and text answers, and provides structured scoring with clear improvement guidance.",
    impact:
      "Created a practical, live MVP that helps developers, PMs, and engineers practice role-specific interviews with measurable feedback and repeatable preparation loops.",
  },
  {
    id: "connexions-spectrum",
    slug: "connexions-spectrum",
    title: "Connexions Spectrum",
    category: "Mobile App Development",
    bannerImage: "/projects/connexions.jpg",
    bannerAlt: "Connexions Spectrum mobile app banner",
    year: "2025",
    role: "Mobile App Developer",
    summary:
      "Connexions Spectrum is an Android and iOS communication support app for autistic users, combining anonymous peer matching, guided conversation practice, and emergency guardian assistance.",
    details: [
      "Built a cross-platform Android and iOS app with React Native, with shared logic and responsive mobile-first flows.",
      "Implemented point-based matching so users can connect with suitable peers and communicate in an anonymous and safer space.",
      "Integrated an OpenAI-powered chat assistant to help users practice conversation and gradually improve communication confidence.",
      "Added a panic button workflow that can alert guardians quickly when users feel unsafe or need immediate support.",
      "Designed and delivered production-ready UI/UX from Figma concepts with Supabase-backed data and real-time app interactions.",
    ],
    stack: ["React Native", "TanStack Query", "OpenAI API", "Supabase", "Figma"],
    challenge:
      "Users needed a communication-focused app that feels safe, inclusive, and supportive, while balancing privacy, emotional safety, and real-time assistance.",
    solution:
      "Developed an AI-assisted communication experience with anonymous matching, conversational guidance, and a guardian escalation path through a panic button system.",
    impact:
      "Created a practical support platform that helps autistic users build communication habits and access timely help when needed.",
  },
  {
    id: "safe-drive-ai",
    slug: "safe-drive-ai",
    title: "SafeDrive AI",
    category: "Mobile App Development",
    bannerImage: "/projects/safe-drive-screen.jpg",
    bannerAlt: "SafeDrive AI speed monitoring app banner",
    year: "2025",
    role: "Mobile App Developer",
    summary:
      "A real-time AI-powered speed monitoring app for iOS and Android that detects your current speed, fetches live speed limits from OpenStreetMap, and alerts drivers through voice, haptics, and visual cues when speeding.",
    details: [
      "Built a cross-platform React Native app with Expo and TypeScript that tracks GPS speed at 1-second intervals using expo-location, with a dual-calculation fallback combining sensor data and derived velocity.",
      "Integrated the OpenStreetMap Overpass API to fetch live road speed limits within a 300m radius, parsing road class defaults, directional limits, school zone conditional tags, and time-based rules (e.g. school hours only).",
      "Implemented custom haversine and bearing algorithms from scratch for road proximity detection and upcoming speed limit prediction with a 220m pre-warn distance — no external geo library used.",
      "Designed a multi-modal alert system combining expo-speech voice TTS ('Reduce speed now'), expo-haptics, and visual state indicators (Safe / Warning / Alert) with configurable +5/+10/+15 km/h thresholds.",
      "Built alert fatigue prevention logic requiring 4 seconds of sustained overspeed before triggering, plus a 25-second cooldown between alerts to avoid driver distraction.",
      "Optimized performance using useRef-based tracking for non-render state, debounced API calls with 7-second and 70-metre movement thresholds, and a 35-second staleness cache for speed limit data.",
      "Shipped cross-platform builds via EAS Build for iOS App Store and Android Play Store, with a demo mode that simulates drives without GPS for testing and development.",
    ],
    stack: ["React Native", "Expo", "TypeScript", "EAS Build", "Overpass API", "expo-location", "expo-speech", "expo-haptics"],
    challenge:
      "Speed limit data from OpenStreetMap contains complex conditional tags (time-of-day, day-of-week, school zones) with no standard library for parsing them — and querying the API on every GPS tick would hammer the endpoint.",
    solution:
      "Built a custom conditional tag parser for OpenStreetMap maxspeed:conditional rules and implemented bearing-based speed limit prediction, with debounced API calls and a 35-second cache to keep the app performant and offline-resilient.",
    impact:
      "Delivered a fully on-device, privacy-first speed monitoring app with zero backend dependency — all geospatial logic, alert logic, and data parsing runs locally on the device across both iOS and Android.",
  },
  {
    id: "game-hub",
    slug: "game-hub",
    title: "Game Hub",
    category: "Frontend Web Development",
    bannerImage: "/projects/game-hub.jpg",
    bannerAlt: "Game Hub project banner",
    year: "2023",
    role: "Frontend Developer",
    summary:
      "A game discovery web app built with Vue 3 and TypeScript, where users can browse, filter, and explore games powered by the RAWG API with infinite scroll, cached queries, and a typed composable architecture.",
    details: [
      "Built a Vue 3 application using the Composition API with TypeScript throughout, structuring logic into reusable composables (useGames, useGenres, usePlatforms) for clean separation of concerns.",
      "Integrated the RAWG Video Games API via a generic typed APIClient<T> class wrapping Axios, enabling consistent and type-safe REST data fetching across the app.",
      "Implemented TanStack Vue Query for server-state management, providing automatic caching, background refetching, and infinite scroll pagination for the game grid.",
      "Added Apollo Client with GraphQL and @vue/apollo-composable as a secondary data source, demonstrating multi-protocol API integration within a single frontend project.",
      "Managed global UI state — including active genre, platform, and sort filters — using Pinia stores, keeping filter state consistent across route changes.",
      "Built component-based UI with GameCard, GameGrid, GenreList, and NavBar components, all wired to Vue Router v5 for client-side navigation.",
      "Configured Vite v8 as the build tool and vue-tsc for TypeScript checking, keeping dev server startup fast and type errors caught at build time.",
    ],
    stack: ["Vue 3", "TypeScript", "Pinia", "TanStack Vue Query", "Axios", "Apollo Client", "GraphQL", "Vue Router", "Vite"],
    challenge:
      "Building a scalable game browser required coordinating multiple data sources (REST and GraphQL), persistent filter state across routes, and smooth pagination — all while keeping the codebase typed and maintainable.",
    solution:
      "Designed a composable-first architecture with a typed API client, Pinia for global filter state, TanStack Query for cached REST pagination, and Apollo Client for GraphQL — each layer cleanly separated and reusable.",
    impact:
      "Delivered a production-quality Vue 3 application demonstrating advanced frontend patterns including multi-protocol API integration, composable data-fetching, and type-safe state management across a real dataset.",
  },
];

export function getProjectBySlug(slug: string) {
  return projects.find((project) => project.slug === slug);
}
