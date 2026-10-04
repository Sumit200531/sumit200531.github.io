// Everything personal lives in this file. Edit it, push, and the site updates.
window.SITE = {
  name: "Sumit Goswami",
  github: "Sumit200531",
  linkedin: "https://www.linkedin.com/in/sumit-goswami-b92361325/",
  email: "goswamisumit9001@gmail.com", // put your real email here, e.g. "sumit@example.com". Leave empty to hide it.
  resume: "", // optional link to a PDF, e.g. "assets/resume.pdf"
  // repos listed here are hidden from the "Also on GitHub" list
  hideRepos: ["Sumit200531", "2305110100057", "JAva_test_clone"]
};

window.PROJECTS = [
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
