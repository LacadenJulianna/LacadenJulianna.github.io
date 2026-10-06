/*
 * All site content lives here. Edit this file to change text, add projects,
 * or update the timeline — the pages rebuild themselves from it.
 *
 * Project fields:
 *   id          used in the URL: project.html?id=<id>
 *   architecture (optional) "You vs Team" ownership diagram.
 *                type: ui | logic | database | model | cloud | deployment |
 *                      auth | analytics | hardware | research
 *   gallery     (optional) screenshot paths; shows the carousel
 *   galleryLabel (optional) carousel heading; defaults to "Screenshots"
 *   cover       (optional) image for the homepage card; defaults to gallery[0]
 *   repoUrl     (optional) adds a "View on GitHub" link
 *   liveUrl     (optional) adds a "View live site" link
 */

const PROFILE = {
  name: 'Julianna Lacaden',
  initials: 'JL', // shown in the blob when there's no portrait
  portrait: 'assets/profile/portrait.webp', // background-removed cutout
  location: 'Baguio City, PH',
  email: 'lacaden.juliannaraine@gmail.com',
  github: 'https://github.com/LacadenJulianna',
  course: 'BS Computer Science',
  school: 'Saint Louis University',
  bio: 'BS Computer Science student at Saint Louis University. Building software across web, desktop, and agentic AI systems.',
};

const ABOUT = {
  photo: 'assets/profile/about.jpg', // optional; shown centered above the quote
  paragraphs: [
    "I'm a fourth-year BS Computer Science student at Saint Louis University in Baguio City. My work spans full-stack web systems, desktop applications, and increasingly, agentic AI tooling.",
    "Recently, I was the sole developer behind EcoSolergy, a zero-install WPF desktop app for solar proposal management, and an AI Engineering Intern building agentic SEO/AEO/GEO audit skills and NLP classifiers. I've also competed in the AMD Developer Hackathon and the Smart City Convergence 2025, where our team placed 1st Runner-Up.",
  ],
};

const SKILLS = [
  { group: 'Languages', items: ['C#', 'Java', 'Python', 'JavaScript', 'TypeScript', 'PHP', 'Rust', 'C++', 'SQL'] },
  { group: 'AI / Agentic', items: ['LangGraph', 'Google Genkit', 'FastMCP / MCP', 'Ollama', 'Gemini', 'Fireworks AI', 'scikit-learn'] },
  { group: 'Frameworks', items: ['FastAPI', 'WPF / .NET 8', 'Node.js', 'Docker'] },
  { group: 'Databases & Hardware', items: ['SQLite', 'MySQL', 'phpMyAdmin', 'Arduino', 'LoRa', 'GPS / IMU sensors'] },
  { group: 'Tools', items: ['Git', 'GitHub', 'pytest', 'ClosedXML'] },
  { group: 'Soft Skills', items: ['Problem Solving', 'Critical Thinking', 'Collaboration', 'Research'] },
];

/*
 * Beyond Class fields:
 *   id          used in the URL: activity.html?id=<id>
 *   description (optional) the "What" text; also shown in the hover preview
 *   banner      (optional) event banner shown at the top of the activity page
 *   images      (optional) your own photo paths, e.g. ['assets/activities/amd-1.jpg'];
 *               shown in a Pictures carousel. The hover preview uses the
 *               first photo, or the banner if there are no photos
 *   project     (optional) id of a PROJECTS entry; adds a "Project" link to it.
 *               Hidden until a project with that id exists
 */
const EXTRACURRICULAR = [
  {
    id: 'next-gen-2026',
    year: '2026',
    date: 'September 18–20, 2026',
    tag: 'Hackathon',
    title: 'The Next Gen 2026 — Coding the Future of Philippine Collegiate Esports',
    org: 'CCEPlay · Philippine Collegiate Championship',
    result: '1st Runner-Up',
    description:
      'Backend Developer for Team "AI\'m Ready," a team of four in a 3-day onsite hackathon, building a digital solution for the Philippine collegiate esports ecosystem. We placed 1st Runner-Up.',
    project: 'aim-ready',
    banner: 'assets/activities/banners/next-gen-2026.webp',
    images: [
      'assets/activities/next-gen-award.jpg',
      'assets/activities/next-gen-name-card.jpg',
      'assets/activities/next-gen-working.jpg',
      'assets/activities/next-gen-prize.jpg',
    ],
  },
  {
    id: 'auditor-slu-ic',
    year: '2026',
    date: '2026 – 2027',
    tag: 'Leadership',
    title: 'Auditor, SLU Integrated Confederacy',
    org: 'Saint Louis University',
    result: 'Auditor',
    description:
      "Conduct periodic, independent audits of ICON's financial records and the Treasurer's statements, submit timely audit reports, and recommend corrective measures to keep the organization's finances accurate, transparent, and accountable.",
  },
  {
    id: 'secretary-slu-sicap',
    year: '2026',
    date: '2026 – 2027',
    tag: 'Leadership',
    title: 'Secretary for Operations, SLU Society of Integrated Commercians for Academic Progress',
    org: 'Saint Louis University',
    result: 'Secretary',
    description:
      "Serve as backup to the Secretary-General, manage the organization's calendar and backup files, lead documentation and officer scheduling for the operations department, and assist the Secretary-General and Vice President for Operations.",
  },
  {
    id: 'amd-hackathon',
    year: '2026',
    date: 'July 2026',
    tag: 'Hackathon',
    title: 'AMD Developer Hackathon (Act II) — Track 1',
    org: 'AMD',
    result: '36/36 Tests Passing',
    description:
      'Owned local/cloud model integration for a cost-aware LLM router on Team "Token Gate," judged on an accuracy gate then ranked by cloud token efficiency.',
    banner: 'assets/activities/banners/amd-hackathon.avif',
  },
  {
    id: 'business-manager-slu-ic',
    year: '2025',
    date: '2025 – 2026',
    tag: 'Leadership',
    title: 'Business Manager, SLU Integrated Confederacy',
    org: 'Saint Louis University',
    result: 'Business Manager',
    description:
      'Oversee organizational budgeting and resource allocation, maintain financial documentation, and support event planning and member engagement initiatives.',
  },
  {
    id: 'civil-service',
    year: '2025',
    date: 'August 2025',
    tag: 'License',
    title: 'Civil Service Eligibility',
    org: 'CSC Regional Office CAR',
    result: 'Professional',
    description: 'Career Service Examination — Pen and Paper Test, Professional level.',
  },
  {
    id: 'rainwatt-smart-city',
    year: '2025',
    date: 'November 2025',
    tag: 'Competition',
    title: 'Smart City Convergence 2025',
    org: 'Smart City Convergence 2025 · Baguio City',
    result: '1st Runner-Up',
    description:
      'Designed RainWatt, a rain-powered micro-hydropower system, as Sustainability Researcher & Engineer, contributing renewable microgeneration research. Our team placed 1st Runner-Up in the Environmental Innovation category.',
    project: 'rainwatt',
    banner: 'assets/activities/banners/baguio-smart-city.png',
    images: [
      'assets/activities/smart-city-awarding.jpg',
      'assets/activities/smart-city-during.jpg',
      'assets/activities/smart-city-certificates.jpg',
      'assets/activities/smart-city-after.jpg',
    ],
  },
];

const PROJECTS = [
  {
    id: 'ecosolergy',
    title: 'EcoSolergy Proposal & Inventory System',
    category: 'Desktop System',
    year: 2026,
    techStack: ['C#', 'WPF', '.NET 8', 'SQLite', 'ClosedXML'],
    summary:
      'Secure, zero-install WPF desktop application for solar proposal and inventory management, built solo end-to-end for a real client.',
    role: 'Sole Software Developer',
    duration: 'April 2026 – June 2026',
    overviewBody:
      'Functioned as the autonomous developer overseeing the end-to-end lifecycle of EcoSolergy, from requirements gathering to deployment, for EcoSolergy Solar Power Engineering Services. Designed and architected a "Zero-Install" USB-portable architecture using SQLite to eliminate client deployment friction and enable seamless on-site operations.',
    keyFeatures: [
      'Zero-install, USB-portable architecture built on SQLite',
      'Transactional inventory asset workflow with real-time stock deductions and multi-state automated restorations',
      'SQLite WAL journal mode framework to guarantee database integrity',
      'High-performance reporting engine using ClosedXML to generate complex multi-sheet corporate Excel proposals matching strict client templates',
      "Automated daily database backup engine using SQLite's native VACUUM INTO command with multi-threaded failure logging",
    ],
    keyChallenge:
      'As the sole developer, I had to guarantee database integrity for a portable, USB-based system where the drive could be removed at any time. I engineered the transactional stock-deduction workflow under an SQLite WAL journal mode framework and paired it with an automated daily backup engine to eliminate silent backup dropouts.',
    outcome:
      'Delivered a production-ready desktop application covering the full lifecycle — requirements, architecture, development, and deployment — with zero client-side installation friction.',
    galleryLabel: 'UI Design',
    mediaNote: "There's no screen recording of this project: it's a client commission, so I can't record or share the working app. These are the UI designs instead.",
    cover: 'assets/ecosolergy/02-draft-proposal.png',
    gallery: ['01-home', '02-draft-proposal', '03-database'].map((f) => `assets/ecosolergy/${f}.png`),
  },
  {
    id: 'seo-audit-skill',
    title: 'Agentic SEO/AEO/GEO Audit Skill',
    category: 'AI / Agentic System',
    year: 2026,
    techStack: ['Python', 'LangGraph', 'FastMCP', 'Playwright', 'Google Genkit', 'scikit-learn'],
    summary:
      'Two-stage agentic audit skill combining deterministic web extraction with rule-based scoring, packaged as a portable agent skill and validated on live production sites.',
    role: 'AI Engineering Intern',
    duration: 'June 2026 – July 2026',
    overviewBody:
      'At Makerspace Innovhub OPC, I designed and built a two-stage agentic SEO/AEO/GEO audit skill — deterministic Playwright/BeautifulSoup extraction feeding a rule-based 0–100 scoring engine — packaged as a portable agent skill for Claude Code, OpenCode, and Kilo Code. Alongside this, I built an end-to-end NLP content-rating classifier and a multi-provider LangGraph research agent.',
    keyFeatures: [
      'Deterministic Playwright/BeautifulSoup extraction paired with rule-based 0–100 SEO/AEO/GEO scoring',
      'Packaged as a portable agent skill for Claude Code, OpenCode, and Kilo Code',
      'Every score point validated back to a specific extracted field across live sites (toyota.com.ph: 71.5/100, merriam-webster.com: 89.1/100)',
      'End-to-end NLP content-rating classifier (TF-IDF + scikit-learn) reaching 0.527 macro F1, extended with spam/harm and sentiment classifiers on a Streamlit dashboard',
      'Multi-provider (cloud + local) tool-calling research agent in LangGraph/TypeScript with credibility-scored, conditional loop-back retrieval',
    ],
    keyChallenge:
      'Diagnosed and fixed a state-reducer bug in the LangGraph research agent that caused duplicate re-scoring of sources on loop-back retrieval, and documented a local-LLM schema-validation failure — typed parameters being emitted as strings — along with three proposed remediation paths.',
    outcome:
      'Shipped a validated, cross-platform agent skill with every score traceable to a specific extracted field, plus an NLP classifier achieving a 13.2x improvement over the majority-class baseline.',
  },
  {
    id: 'token-gate',
    title: 'Token Gate — AMD Developer Hackathon',
    category: 'Hackathon Project',
    year: 2026,
    techStack: ['Python', 'Ollama', 'Fireworks AI', 'Docker', 'pytest'],
    summary:
      "Cost-aware LLM router that escalates from a free local model to paid cloud inference only on low-confidence responses, built for AMD's Developer Hackathon Act II.",
    role: 'LLM Integration Engineer',
    duration: 'July 6–11, 2026',
    overviewBody:
      'Owned local/cloud model integration for a router judged on an accuracy gate then ranked by cloud token efficiency. Implemented task-based query classification, a self-consistency confidence check, and a token-budget guard to keep cloud spend within grading constraints, while the team hardened the Docker deployment for strict resource limits.',
    keyFeatures: [
      'Local/cloud model integration that escalates to paid inference only on low-confidence responses',
      'Task-based query classification with a self-consistency confidence check',
      'Token-budget guard to keep cloud spend within grading constraints',
      'Docker deployment hardened by the team for 4GB RAM / 2 vCPU / 60s cold-start grading limits',
      'Full 36/36 test suite passing; top committer on the team (23 of 58 commits)',
    ],
    keyChallenge:
      'Found and fixed an incorrect model-ID bug that was causing 100% of cloud API calls to silently fail. After the fix, verified local-eval accuracy rose from 75% to 100%.',
    outcome:
      'Diagnosed and fixed a model-ID bug that had been silently failing every cloud API call, raising local-eval accuracy from 75% to 100% while keeping the full 36/36 test suite green.',
    architecture: [
      { label: 'Chat UI', owner: 'team', type: 'ui' },
      {
        label: 'Router / Task Classifier',
        owner: 'team',
        type: 'logic',
        note: 'Jasper implemented 3 feature requests (dynamic prompt loop, task-based routing, token-budget fallback)',
      },
      { label: 'Fireworks Remote Integration', owner: 'you', type: 'cloud' },
      { label: 'Local Model (Ollama)', owner: 'team', type: 'model' },
      { label: 'Docker Deployment', owner: 'team', type: 'deployment' },
    ],
  },
  {
    id: 'aim-ready',
    title: "ARCHIVe — Team AI'm Ready, The Next Gen 2026",
    category: 'Hackathon Project',
    year: 2026,
    techStack: ['HTML', 'CSS', 'JavaScript', 'Firebase', 'Netlify'],
    summary:
      'Gaming-community platform for Philippine collegiate esports that connects players with mentors, parties, and AI career guidance, built at The Next Gen 2026 hackathon.',
    role: 'Backend Developer',
    duration: 'September 2026',
    overviewBody:
      "Built with Team AI'm Ready at The Next Gen 2026, a 3-day onsite hackathon by CCEPlay and the Philippine Collegiate Championship. ARCHIVe links players' Steam and Riot accounts to show their game stats, then connects them with mentors, parties, and career paths in esports. On a team of four (one frontend, two full-stack, and me as backend), I owned parties and party chat, the AI-assisted career matching, mentor stats and ratings, game trailers, and polishing the buttons across the app.",
    keyFeatures: [
      'Parties and party chat, with party creation secured by Firestore security rules',
      'Career recommendations that blend rule-based scores with an AI model, plus saved answers that cost no tokens on repeat visits',
      'Mentor stats computed from real data: average rating, success rate, active and finished sessions, and rank among mentors',
      'Post-session mentor ratings, with mentors ranked by rating on the Gamers page',
      'Game trailers on each game page, with hover previews on game cards',
    ],
    keyChallenge:
      "Creating a party failed with a permissions error even though the rules looked right. Firestore's get() only sees data from before a batch write, so the rule couldn't see the party being created in the same batch. I rewrote the check with getAfter() and tested it against the Firestore emulator before publishing.",
    outcome:
      'Placed 1st Runner-Up (2nd Place, score 92.00) and won PHP 20,000. The platform is deployed live on Netlify.',
    liveUrl: 'https://archive-aimready.netlify.app/frontend/html/home',
    architecture: [
      { label: 'Frontend UI & Page Layouts', owner: 'team', type: 'ui', note: 'Frontend developer' },
      { label: 'Button Polish Across the App', owner: 'you', type: 'ui' },
      { label: 'Parties & Party Chat (Firestore + security rules)', owner: 'you', type: 'database' },
      { label: 'Career Matching with Luna AI', owner: 'you', type: 'model' },
      { label: 'Mentor Stats & Post-Session Ratings', owner: 'you', type: 'analytics' },
      { label: 'Game Trailers & Hover Previews', owner: 'you', type: 'ui' },
      {
        label: 'Steam & Riot Stats Sync & Tournaments',
        owner: 'team',
        type: 'logic',
        note: 'Full-stack developers',
      },
      { label: 'Firebase Auth & Netlify Deployment', owner: 'team', type: 'deployment', note: 'Full-stack developers' },
    ],
    cover: 'assets/archive/01-home.jpg',
    video: 'assets/archive/demo.mp4',
  },
  {
    id: 'paybach',
    title: 'Paybach: Bidding & Swapping Marketplace',
    category: 'Marketplace Platform',
    year: 2025,
    techStack: ['PHP', 'Node.js', 'Ubuntu Server'],
    summary:
      'Distributed bidding and item-swapping web marketplace optimized for a campus environment, built on a hybrid PHP and Node.js backend.',
    role: 'Full-Stack Developer',
    duration: 'November 2025 – December 2025',
    overviewBody:
      'Team project formulating custom stateful bidding logic, secure product listing pipelines, and data-driven analytical dashboards for user tracking, then deploying and hardening the full-stack system on a secure Ubuntu Server instance.',
    keyFeatures: [
      'Custom stateful bidding logic for real-time auctions',
      'Secure product listing pipelines',
      'Data-driven analytical dashboards for user tracking',
      'Hybrid PHP and Node.js backend architecture',
    ],
    keyChallenge:
      'Formulating stateful bidding logic for a distributed, campus-scale marketplace, then deploying and hardening the full system on a production Ubuntu Server instance while managing database integrity and network traffic optimization.',
    outcome: 'Deployed as a hardened, full-stack system on a secure Ubuntu Server instance for real campus use.',
    galleryLabel: 'UI Design',
    mediaNote: "There's no screen recording of this project: the live site holds real user data, and I didn't have the authority to record it. These are the UI designs instead.",
    cover: 'assets/paybach/02-homepage.png',
    gallery: [
      '01-login', '02-homepage', '03-categories', '04-ongoing-bids', '05-ongoing-bids-category',
      '06-bid-item', '07-bid-top-up', '08-bid-after-top-up', '09-trade-items', '10-trade-item',
      '11-report-item', '12-report-reasons', '13-help', '14-edit-profile',
    ].map((f) => `assets/paybach/${f}.png`),
    architecture: [
      { label: 'Client UI (Login, Homepage, Bidding, Listings, Notifications)', owner: 'you', type: 'ui' },
      { label: 'Buy Flow & Bid-Closing Logic', owner: 'team', type: 'logic', note: 'vanjustinne' },
      { label: 'Trade System & Database', owner: 'team', type: 'database', note: 'Ravone Ebeng' },
      { label: 'Admin Panel', owner: 'team', type: 'ui', note: 'Vincent Fajardo & Fiona' },
      { label: 'Backend Infra / Deployment', owner: 'team', type: 'deployment', note: 'Hiptree' },
    ],
  },
  {
    id: 'lab-reservation',
    title: 'Laboratory Reservation System',
    category: 'Academic System',
    year: 2025,
    techStack: ['HTML', 'CSS', 'JavaScript', 'PHP', 'phpMyAdmin'],
    summary:
      'Automated reservation platform streamlining resource scheduling across university computer laboratories, with role-based access control.',
    role: 'Full-Stack Developer',
    duration: 'November 2025 – December 2025',
    overviewBody:
      'Developed a robust automated reservation platform to streamline resource scheduling across university computer laboratories, implementing role-based access control to manage multi-tier account privileges alongside real-time schedule synchronization and administrative override controls.',
    keyFeatures: [
      'Role-based access control (RBAC) for multi-tier account privileges',
      'Real-time schedule synchronization',
      'Comprehensive administrative override controls',
      'Responsive UI focused on accessibility compliance and low-latency rendering',
    ],
    keyChallenge:
      'Implementing role-based access control across multiple account tiers while keeping schedule state synchronized in real time, without compromising accessibility or rendering performance.',
    outcome: 'Delivered an academic project automating lab resource scheduling across university computer laboratories.',
    galleryLabel: 'UI Design',
    mediaNote: "There's no screen recording of this project: the live system holds real reservation data, and I didn't have the authority to record it. These are the UI designs instead.",
    gallery: [
      '01-login', '02-request-access', '03-view-labs', '04-select-date', '05-select-time',
      '06-student-input-details', '07-student-confirm', '08-view-schedules',
      '09-admin-request-queue', '10-admin-summary-reports', '11-admin-room-schedule',
    ].map((f) => `assets/lab-reservation/${f}.png`),
    architecture: [
      { label: 'Login Page (front-end)', owner: 'you', type: 'ui' },
      { label: 'Registration & Auth Backend', owner: 'team', type: 'auth', note: 'Ravone Ebeng' },
      { label: 'Scheduling & Booking Flow', owner: 'team', type: 'logic', note: 'Filine Dela Cruz' },
      { label: 'Cancellation & Exception Handling', owner: 'team', type: 'logic', note: 'Hiptree' },
      { label: 'Admin Reporting & Analytics', owner: 'you', type: 'analytics' },
      { label: 'Navigation & Admin Calendar', owner: 'team', type: 'ui', note: 'Vincent Fajardo' },
    ],
  },
  {
    id: 'rainwatt',
    title: 'RainWatt: Rain-Powered Micro-Hydropower',
    category: 'Sustainability Project',
    year: 2025,
    techStack: ['Turbine Systems', 'LiFePO4 Battery', 'Sediment Filtration'],
    summary:
      'Rain-powered micro-hydropower system converting water flow into stored electricity, built for the Smart City Convergence 2025.',
    role: 'Sustainability Researcher & Engineer',
    duration: '2025',
    overviewBody:
      'Designed a rain-powered micro-hydropower system engineered with turbine-based generation using three 80V water turbines routed through sediment filtration, and documented the full system flow from gutter collection and filtration through turbines, LiFePO4 battery storage, and household power integration.',
    keyFeatures: [
      'Turbine-based generation using three 80V water turbines',
      'Sediment filtration routing to protect turbine components',
      'LiFePO4 battery storage with household power integration',
      'Documented end-to-end system flow from collection to integration',
    ],
    keyChallenge:
      'Engineering a reliable pipeline from rainwater collection through sediment filtration to turbine generation, ensuring consistent output while contributing to broader sustainability research on renewable microgeneration and water recycling.',
    outcome:
      'Our team placed 1st Runner-Up in the Environmental Innovation category at the Smart City Convergence 2025, contributing sustainability research on renewable microgeneration and water recycling.',
    architecture: [
      {
        label: 'Prototype Engineering (turbine assembly, filtration, battery/wiring integration)',
        owner: 'you',
        type: 'hardware',
      },
      {
        label: 'Research, Documentation & Presentation',
        owner: 'team',
        type: 'research',
        note: 'Filine Dela Cruz, John Michael Garcia, Fiona Quela',
      },
    ],
  },
  {
    id: 'babel',
    title: 'Babel: An Arcane History — Book Companion Site',
    category: 'Web Design Project',
    year: 2026,
    techStack: ['HTML', 'CSS'],
    summary:
      'Immersive fan companion site for R.F. Kuang\'s "Babel," hand-built in pure HTML/CSS with a cross-section building diagram, an animated quote gallery, and a full story timeline.',
    role: 'Solo Developer & Designer',
    duration: 'January 2026',
    overviewBody:
      'A single-page companion site for the dark academia novel "Babel: Or the Necessity of Violence," covering the book\'s premise, its magic system (silver-working), its four central characters, and the story\'s 1828-1836 chronology — built entirely with hand-written HTML and CSS, no JavaScript or frameworks.',
    keyFeatures: [
      'Auto-scrolling, infinite-loop quote gallery built with pure CSS keyframes (pauses on hover, no JS)',
      "Annotated cross-section diagram of the Babel tower's 8 floors",
      "5-stage silver-bar lifecycle timeline explaining the book's magic system",
      '6-beat story chronology (1828-1836) with tagged themes per event',
      'Fully responsive layout (768px/480px breakpoints) with zero CSS frameworks',
    ],
    keyChallenge:
      'Orchestrating rich, editorial-style motion — a seamless infinite marquee, hover states, multi-section responsive grids — using only hand-written CSS, with no JavaScript or framework to fall back on.',
    outcome:
      "A polished single-page reference that turns the novel's world-building, magic system, and character web into something browsable and visually rich.",
    repoUrl: 'https://github.com/LacadenJulianna/Babel-Novel-Website',
    gallery: Array.from({ length: 16 }, (_, i) => `assets/babel/Babel-${i + 1}.png`),
  },
];
