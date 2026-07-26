export const stats = [
  { value: "900+", label: "Hiring Partners" },
  { value: "52", label: "Sectors" },
  { value: "10K+", label: "Active Candidates" },
  { value: "92%", label: "Match Satisfaction" },
] as const;

export const marqueeRows = [
  {
    name: "Universities",
    sub: "Higher-education network across Malaysia & Asia",
    reverse: false,
    items: [
      "UM",
      "UKM",
      "USM",
      "UPM",
      "UTM",
      "UiTM",
      "IIUM",
      "UUM",
      "Taylor's University",
      "Sunway University",
      "Monash University Malaysia",
      "MMU",
      "UCSI",
      "APU",
      "HELP",
      "INTI",
    ],
  },
  {
    name: "Employers",
    sub: "Enterprise, tech, and professional services partners",
    reverse: true,
    items: [
      "Maybank",
      "CIMB",
      "OCBC",
      "HSBC",
      "EY",
      "Deloitte",
      "PwC",
      "Microsoft",
      "IBM",
      "Intel",
      "Accenture",
      "Shell",
      "Petronas",
      "Nestlé",
      "Unilever",
      "Maxis",
      "AirAsia",
      "Grab",
      "Sime Darby",
    ],
  },
  {
    name: "Programmes",
    sub: "Career fairs, awards, and employability initiatives",
    reverse: false,
    slow: true,
    items: [
      "Graduates' Choice Award",
      "Graduate Employability Award",
      "Tech Career Fair",
      "Talentbank Career Fair",
      "National Career Fair",
      "Graduate Finishing School",
      "Engineering Career Fair",
      "Penang Tech Career Fair",
    ],
  },
] as const;

export const quoteLines = [
  "Most career platforms launch with zero relationships.",
  "We're not most platforms.",
  "Career OS inherits fifteen years of institutional trust.",
] as const;

export const contents = [
  { href: "#vision", num: "01", name: "Vision", desc: "Four jobs the product does" },
  { href: "#journey", num: "02", name: "Journey", desc: "From first proof to hire" },
  { href: "#candidates", num: "03", name: "Candidates", desc: "Capability profile → match" },
  { href: "#employers", num: "04", name: "Employers", desc: "Demand tickets → pipeline" },
  { href: "#matching", num: "05", name: "Matching", desc: "Smart matching by audience" },
] as const;

export const pillars = [
  {
    num: "01",
    title: "Discovery",
    desc: "Surface the right match from real work signals — portfolios, challenges, and demonstrated skill — not keyword soup.",
  },
  {
    num: "02",
    title: "Growth",
    desc: "Show skill gaps and proof paths so candidates know what to build next, and employers see readiness clearly.",
  },
  {
    num: "03",
    title: "Progression",
    desc: "Map informed next moves: roles, trials, and conversations that follow evidence rather than gut feel.",
  },
  {
    num: "04",
    title: "Feedback",
    desc: "Close the loop from application to outcome so matching improves with every swipe, hire, and decline.",
  },
] as const;

export const journey = [
  { title: "Build proof", desc: "Upload portfolio artifacts — code, designs, reports, case studies." },
  { title: "Get evaluated", desc: "AI tags demonstrable skills from real work, not self-reported claims." },
  { title: "Match on evidence", desc: "Explainable fit against live challenges and demand tickets." },
  { title: "Mutual interest", desc: "Both sides swipe right before a conversation starts." },
  { title: "Conversation", desc: "Chat, trial, or interview with shared context already on the table." },
  { title: "Outcome", desc: "Hire, feedback, and continuous learning for the next match." },
] as const;

export const candidateCards = [
  {
    icon: "candidate" as const,
    title: "Build Your Capability Profile",
    desc: "Upload portfolio artifacts — code, designs, reports. AI evaluates and tags your skills automatically.",
  },
  {
    icon: "lightning" as const,
    title: "Get Matched on Evidence",
    desc: "No more keyword-stuffed resumes. Get matched to opportunities where your actual work fits.",
  },
  {
    icon: "check" as const,
    title: "Mutual Interest First",
    desc: "See match reasons before you swipe. Conversation starts only when both sides are interested.",
  },
] as const;

export const employerCards = [
  {
    icon: "employer" as const,
    title: "Demand Tickets",
    desc: "Post real challenges instead of generic job descriptions. See exactly who can deliver.",
  },
  {
    icon: "lightning" as const,
    title: "Evidence-Backed Matches",
    desc: "Every candidate match comes with a clear explanation — this is why their work fits your need.",
  },
  {
    icon: "check" as const,
    title: "Swipe When Ready",
    desc: "Review matched candidates on your timeline. Mutual swipe before chat, interview, or trial.",
  },
] as const;

export type AudienceKey = "candidates" | "employers" | "universities";

export const audienceModules: Record<
  AudienceKey,
  { label: string; rows: { title: string; desc: string }[] }
> = {
  candidates: {
    label: "Candidates",
    rows: [
      {
        title: "Capability profile",
        desc: "Portfolio-first identity with AI-extracted skill tags from real artifacts.",
      },
      {
        title: "Evidence matches",
        desc: "Ranked opportunities with clear reasons tied to your demonstrated work.",
      },
      {
        title: "Mutual swipe",
        desc: "You only talk when interest is shared — less noise, higher signal.",
      },
      {
        title: "Live status",
        desc: "Instant alerts when matches appear or application stages change.",
      },
    ],
  },
  employers: {
    label: "Employers",
    rows: [
      {
        title: "Demand tickets",
        desc: "Describe the real challenge. Skip generic JD theatre.",
      },
      {
        title: "Explainable shortlists",
        desc: "Every candidate arrives with artifacts and fit rationale attached.",
      },
      {
        title: "Pipeline view",
        desc: "Track match → chat → interview → offer in one live board.",
      },
      {
        title: "Instant alerts",
        desc: "Know when strong proof lands or a candidate swipes back.",
      },
    ],
  },
  universities: {
    label: "Universities",
    rows: [
      {
        title: "Outcome loops",
        desc: "See how graduates convert proof-of-work into real opportunities.",
      },
      {
        title: "Partner programmes",
        desc: "Plug career fairs and employability tracks into marketplace demand.",
      },
      {
        title: "Graduate readiness",
        desc: "Surface skill gaps early with evidence, not survey scores alone.",
      },
      {
        title: "Marketplace access",
        desc: "Connect cohorts to hiring partners across sectors without cold outreach.",
      },
    ],
  },
};

export const footerLinks = {
  talent: [
    { label: "Browse Matches", href: "/candidates" },
    { label: "Capability Profile", href: "/candidates" },
    { label: "How It Works", href: "#candidates" },
  ],
  employers: [
    { label: "Post a Ticket", href: "#employers" },
    { label: "Find Candidates", href: "#employers" },
    { label: "How Matching Works", href: "#matching" },
  ],
  company: [
    { label: "Vision", href: "#vision" },
    { label: "Journey", href: "#journey" },
    { label: "Get Started", href: "/candidates" },
  ],
} as const;
