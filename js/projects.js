// Everything personal lives in this file. Edit it, push, and the site updates.
window.SITE = {
  name: "Sumit Goswami",
  github: "Sumit200531",
  linkedin: "https://www.linkedin.com/in/sumit-goswami-b92361325/",
  email: "goswamisumit9001@gmail.com",
  resume: "",
  hideRepos: ["Sumit200531", "2305110100057", "JAva_test_clone"]
};

window.PROJECTS = [
  {
    id: "neondrift",
    repo: "neon-drift",
    title: "NEON DRIFT",
    line: "A cyberpunk hovercar racer in the browser. Drift, boost, and don't touch the walls.",
    problem: "I wanted to see how far real-time 3D in the browser could go without a game engine or a single downloaded asset, and to build something people would actually want to play rather than another demo.",
    built: "An endless neon highway through a procedural city. Steer a hovercar at 400+ km/h, drift to charge boost energy, boost for double score, and dodge walls, pylon slaloms, laser gates and sweeping drones. Every model, texture, shader, sound effect and the synthwave soundtrack is generated in code.",
    hard: "Keeping it fair at speed. Obstacles were first spaced by distance, so at top speed some patterns became impossible to dodge. Spacing them by time instead fixed it, and a bot that steers between lanes survived two minutes at maximum difficulty. The city uses instanced meshes and pooled objects, shaders compile at startup, and the game drops itself to a lighter graphics mode on slow laptops.",
    stack: ["three.js", "GLSL", "Vite", "Web Audio API", "JavaScript"],
    art: "car",
    demo: "https://sumit200531.github.io/neon-drift/"
  },
  {
    id: "abyssal",
    repo: "abyssal",
    title: "ABYSSAL",
    line: "A deep-sea arena shooter. Hold the light, level up, and outlast the Leviathan.",
    problem: "After a racing game I wanted to build a completely different genre: one with enemy AI, a boss fight and progression, which forces you to think about game balance instead of just visuals.",
    built: "Pilot a small submarine on a dark ocean floor. Aim with the mouse, fire bolts of light, dash through danger and send out a sonar pulse that stuns everything nearby. Five creature types arrive in waves, with a segmented sea-serpent boss every fifth wave, and each level-up offers three upgrades so every run builds differently.",
    hard: "Making the sea floor feel alive cheaply: one shader draws animated caustics, the sub's headlight cone, and colored light pools from up to 14 glowing creatures in a single pass. Balancing came from a test bot that plays at full speed; it exposed a crash on the upgrade screen and an XP curve that was far too slow, both fixed before release.",
    stack: ["three.js", "GLSL", "Vite", "Web Audio API", "JavaScript"],
    art: "sub",
    demo: "https://sumit200531.github.io/abyssal/"
  },
  {
    id: "wayfarer",
    repo: "wayfarer",
    title: "Wayfarer",
    line: "A pocket galaxy in the browser. Every bright star has its own planets.",
    problem: "A side project to learn real-time graphics properly, with real astronomy underneath instead of random sparkles.",
    built: "About 95,000 stars generated from one seed. Click a star and the camera flies into its solar system. Star colour comes from temperature, the habitable zone from brightness, and planet years from Kepler's third law. You can draw constellations and watch them fall apart from any other angle.",
    hard: "Custom GLSL shaders that keep stars dense from far away and crisp up close, a camera that tracks a star inside a rotating galaxy, and every planet texture painted on a canvas at runtime.",
    stack: ["three.js", "WebGL", "GLSL", "JavaScript"],
    art: "spiral",
    demo: "https://sumit200531.github.io/wayfarer/"
  },
  {
    id: "queuesense",
    repo: "queuesense",
    title: "QueueSense",
    line: "Live, crowdsourced wait times for hospital OPDs, government offices and banks.",
    problem: "Maps apps show popular times for malls and cafés, not the wait at a public hospital counter or a transport office, where a wrong guess costs a working person half a day's wages.",
    built: "People check in when they join a line and check out at the counter. QueueSense turns that into a live wait estimate pushed to everyone viewing the place, and learns each place's weekly rhythm to suggest the quietest hour to go.",
    hard: "Crowd data lies, so the estimator defends itself: check-ins are geofenced to 500 m, outliers are caught with Median Absolute Deviation, users gain trust when they agree with the crowd, and recent reports count more on a 30-minute half-life. The estimator is a pure, unit-tested module.",
    stack: ["React", "Node", "Express", "MongoDB", "Socket.io", "JWT"],
    art: "queue",
    demo: ""
  },
  {
    id: "sds",
    repo: "system-design-simulator",
    title: "System Design Simulator",
    line: "Design a distributed system, then break it and watch the failure spread.",
    problem: "System design interviews and real architecture decisions both need the same thing: an intuition for how load, crashes and cascading failures actually behave. Descriptions and diagrams don't build that intuition the way watching numbers change does.",
    built: "Drag components onto a canvas (load balancer, Redis, Postgres, Kafka, workers, CDN) and connect them. Press Start and requests animate through the architecture as live metrics update: throughput, P95 latency, error rate, queue depth, cache hit rate. Chaos experiments inject failures with one click: crash a server, kill the database, spike traffic 5×, fail the cache, add network latency, overload the queue. Save two designs and compare them under the same scripted incident.",
    hard: "A deterministic fluid queueing simulation with no randomness: M/M/c queueing delays, a latency mixture model that tracks P95 correctly, overload that sheds timed-out requests rather than backing up forever, database replicas that scale reads but not writes, caches that fail open and come back cold causing a thundering herd, and retry amplification that makes overload worse. The same engine runs the live view, the headless A/B comparison, and 22 tests that pin each behaviour to an exact or analytically expected value.",
    stack: ["React", "TypeScript", "React Flow", "Node", "deterministic simulation", "queueing theory"],
    art: "gate",
    demo: "https://sumit200531.github.io/demos/system-design-simulator/"
  },
  {
    id: "ctm",
    repo: "codebase-time-machine",
    title: "Codebase Time Machine",
    line: "See how software becomes software: replay a Git repository's entire history.",
    problem: "Git log is chronological but not contextual. It tells you what happened in what order, but not how a codebase took shape: which files were born and died, how dependencies formed, when the architecture changed, who built what and when.",
    built: "A pipeline that streams git log once and reconstructs the full temporal model: every file's birth, renames, edits and death (BORN / CHANGED / MOVED / DIED), dependency intervals that survive renames, per-step statistics, and keyframed snapshots so any point in history loads in milliseconds. The explorer shows a seismograph timeline, an engineering map where files never jump around as you scrub, a galaxy view of the same layout, architecture evolution, contributor activity, a split/unified diff viewer, and history search.",
    hard: "A NUL-token streaming parser that handles filenames with tabs, newlines and multibyte characters split across chunks. Blob measurement to recover line counts across binary transitions (a real bug found in Express where a 2010 commit put NUL bytes into an HTML file and silently froze its line count for the rest of history). Verified against git ls-tree and real blob contents at every step of scripted and randomized histories, and on real repositories: expressjs/express (6,430 commits, 2009–2026) and pallets/flask both match Git exactly.",
    stack: ["TypeScript", "React", "Git internals", "streaming parser", "queueing math", "d3-hierarchy"],
    art: "tree",
    demo: "https://sumit200531.github.io/demos/codebase-time-machine/"
  },
  {
    id: "clauselens",
    repo: "ClauseLens",
    title: "ClauseLens",
    line: "Ask your insurance policy anything. Every answer cites the exact clause.",
    problem: "Health insurance claims get rejected over clauses nobody read: a 24-month waiting period, a room-rent cap that quietly shrinks the whole bill, a 24-hour deadline to inform the insurer. People find these rules after the claim is refused.",
    built: "Upload the policy PDF and ask in your own words. You get a verdict (covered, not covered, covered with conditions, or unclear), a plain explanation, and every sentence links to the clause it came from.",
    hard: "Clause-aware chunking that splits at numbered headings, so one chunk never mixes two rules. Hybrid retrieval that merges embedding search and BM25 with Reciprocal Rank Fusion. Answers stream over Server-Sent Events, with a parser that pulls the verdict out of the token stream mid-flight. It also runs fully offline without an API key.",
    stack: ["React", "Three.js", "Node", "Express", "MongoDB", "RAG", "SSE"],
    art: "lens",
    demo: ""
  },
  {
    id: "gateway",
    repo: "API-Gateway-Rate-Limiter-",
    title: "API Gateway",
    line: "One front door for a set of services: auth, rate limits and caching in one place.",
    problem: "When every service handles its own login checks and traffic limits, they drift apart and one noisy client can take everything down.",
    built: "A gateway in front of a user service and a product service. JWT login with refresh-token rotation, Redis-backed sliding-window rate limiting and caching, MySQL for users, and a small dashboard to watch it work.",
    hard: "Sliding-window limiting in Redis instead of a fixed window, so a client can't double its quota by bursting at the edge of a minute. The whole stack comes up with one docker compose command.",
    stack: ["PHP", "Redis", "MySQL", "JWT", "Docker"],
    art: "gate",
    demo: ""
  },
  {
    id: "unfold",
    repo: "UnFold",
    title: "Unfold",
    line: "Read a scary official letter with someone beside you.",
    problem: "Disconnection notices, insurance rejections and fake KYC messages are written to be skimmed and feared, not understood.",
    built: "Paste a letter or add a photo. Unfold highlights the lines that matter with notes in the margin, pulls out deadlines and amounts, flags signs of a scam, and drafts a reply. It explains in six languages.",
    hard: "Matching the model's quotes back to the exact text so highlights land on the right words, and laying out margin notes so they stay level with their lines.",
    stack: ["JavaScript", "LLM", "CSS 3D"],
    art: "letter",
    demo: ""
  },
  {
    id: "backup",
    repo: "MultiThread-File-Backup-System",
    title: "Threaded Backup",
    line: "A C++17 backup and restore tool that only copies what changed.",
    problem: "Backing up a big folder one file at a time is slow, and copying everything every time wastes both time and disk.",
    built: "A menu-driven tool that walks a directory tree, copies files on several threads, keeps the folder structure, skips files that haven't changed since the last run, and can restore everything back.",
    hard: "Keeping it correct under concurrency: thread-safe logging with mutexes, atomic counters for the backup stats, and timestamped audit logs.",
    stack: ["C++17", "std::thread", "std::filesystem"],
    art: "tree",
    demo: ""
  }
];
