import { Check, CircleCheckBig } from 'lucide-react';
import Header from './components/Header';
import './styles/input.css';

function IconCandidate() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
      <path d="M11.7 2.805a.75.75 0 0 1 .6 0A60.65 60.65 0 0 1 22.83 8.72a.75.75 0 0 1-.231 1.337 49.948 49.948 0 0 0-9.902 3.912l-.003.002c-.114.06-.227.119-.34.18a.75.75 0 0 1-.707 0A50.88 50.88 0 0 0 7.5 12.173v-.224c0-.131.067-.248.172-.311a54.615 54.615 0 0 1 4.653-2.52.75.75 0 0 0-.65-1.352 56.123 56.123 0 0 0-4.78 2.589 1.858 1.858 0 0 0-.859 1.228 49.803 49.803 0 0 0-4.634-1.527.75.75 0 0 1-.231-1.337A60.653 60.653 0 0 1 11.7 2.805Z" />
      <path d="M13.06 15.473a48.45 48.45 0 0 1 7.666-3.282c.134 1.414.22 2.843.255 4.284a.75.75 0 0 1-.46.711 47.87 47.87 0 0 0-8.105 4.342.75.75 0 0 1-.832 0 47.87 47.87 0 0 0-8.104-4.342.75.75 0 0 1-.461-.71c.035-1.442.121-2.87.255-4.286.921.304 1.83.634 2.726.99v1.27a1.5 1.5 0 0 0-.14 2.508c-.09.38-.222.753-.397 1.11.452.213.901.434 1.346.66a6.727 6.727 0 0 0 .551-1.607 1.5 1.5 0 0 0 .14-2.67v-.645a48.549 48.549 0 0 1 3.44 1.667 2.25 2.25 0 0 0 2.12 0Z" />
      <path d="M4.462 19.462c.42-.419.753-.89 1-1.395.453.214.902.435 1.347.662a6.742 6.742 0 0 1-1.286 1.794.75.75 0 0 1-1.06-1.06Z" />
    </svg>
  );
}

function IconEmployer() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
      <path fillRule="evenodd" d="M7.5 5.25a3 3 0 0 1 3-3h3a3 3 0 0 1 3 3v.205c.933.085 1.857.197 2.774.334 1.454.218 2.476 1.483 2.476 2.917v3.033c0 1.211-.734 2.352-1.936 2.752A24.726 24.726 0 0 1 12 15.75c-2.73 0-5.357-.442-7.814-1.259-1.202-.4-1.936-1.541-1.936-2.752V8.706c0-1.434 1.022-2.7 2.476-2.917A48.814 48.814 0 0 1 7.5 5.455V5.25Zm7.5 0v.09a49.488 49.488 0 0 0-6 0v-.09a1.5 1.5 0 0 1 1.5-1.5h3a1.5 1.5 0 0 1 1.5 1.5Zm-3 8.25a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z" clipRule="evenodd" />
      <path d="M3 18.4v-2.796a4.3 4.3 0 0 0 .713.31A26.226 26.226 0 0 0 12 17.25c2.892 0 5.68-.468 8.287-1.335.252-.084.49-.189.713-.311V18.4c0 1.452-1.047 2.728-2.523 2.923-2.12.282-4.282.427-6.477.427a49.19 49.19 0 0 1-6.477-.427C4.047 21.128 3 19.852 3 18.4Z" />
    </svg>
  );
}

function IconLightning() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
      <path fillRule="evenodd" d="M14.615 1.595a.75.75 0 0 1 .359.852L12.982 9.75h7.268a.75.75 0 0 1 .548 1.262l-10.5 11.25a.75.75 0 0 1-1.272-.71l1.992-7.302H3.75a.75.75 0 0 1-.548-1.262l10.5-11.25a.75.75 0 0 1 .913-.143Z" clipRule="evenodd" />
    </svg>
  );
}

function IconBell() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
      <path fillRule="evenodd" d="M5.25 9a6.75 6.75 0 0 1 13.5 0v.75c0 2.123.8 4.057 2.118 5.52a.75.75 0 0 1-.297 1.206c-1.544.57-3.16.99-4.831 1.243a3.75 3.75 0 1 1-7.48 0 24.585 24.585 0 0 1-4.831-1.244.75.75 0 0 1-.298-1.205A8.217 8.217 0 0 0 5.25 9.75V9Zm4.502 8.9a2.25 2.25 0 1 0 4.496 0 25.057 25.057 0 0 1-4.496 0Z" clipRule="evenodd" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-5 shrink-0 text-near-black">
      <path fillRule="evenodd" d="M19.916 4.626a.75.75 0 0 1 .208 1.04l-9 13.5a.75.75 0 0 1-1.154.114l-6-6a.75.75 0 0 1 1.06-1.06l5.353 5.353 8.493-12.74a.75.75 0 0 1 1.04-.207Z" clipRule="evenodd" />
    </svg>
  );
}

function StatsSection() {
  const stats = [
    { value: "900+", label: "Hiring Partners" },
    { value: "52", label: "Sectors" },
    { value: "10K+", label: "Active Candidates" },
    { value: "92%", label: "Match Satisfaction" },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-3xl mx-auto">
      {stats.map((s) => (
        <div key={s.label} className="text-center">
          <div className="text-3xl md:text-4xl font-bold text-near-black font-headings">{s.value}</div>
          <div className="text-sm text-muted mt-1">{s.label}</div>
        </div>
      ))}
    </div>
  );
}

function NumberedSection({ num, title, subtitle, children }: { num: string; title: string; subtitle: string; children: React.ReactNode }) {
  return (
    <section className="py-20 md:py-32" id={num === "01" ? "candidates" : num === "02" ? "employers" : undefined}>
      <div className="mx-auto max-w-6xl px-6">
        <span className="text-8xl md:text-9xl font-headings font-bold text-near-black/5 block leading-none select-none">
          {num}
        </span>
        <div className="-mt-10 md:-mt-14">
          <h2 className="text-3xl md:text-5xl font-headings font-bold text-near-black mb-6">{title}</h2>
          <p className="text-lg text-muted max-w-2xl mb-12">{subtitle}</p>
          {children}
        </div>
      </div>
    </section>
  );
}

function Card({ icon, title, desc }: { icon: React.ReactNode; title: string; desc: string }) {
  return (
    <div className="bg-card rounded-xl p-6 border border-light-border/50">
      <div className="w-10 h-10 bg-near-black rounded-lg flex items-center justify-center !text-white mb-4">
        {icon}
      </div>
      <h3 className="text-lg font-bold text-near-black mb-2">{title}</h3>
      <p className="text-sm text-muted leading-relaxed">{desc}</p>
    </div>
  );
}

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-cream">
      <Header />

      {/* Hero */}
      <section className="min-h-[80vh] flex flex-col justify-center items-center text-center px-6">
        <span className="bg-near-black !text-white text-xs tracking-wider uppercase rounded-full px-4 py-1.5 mb-6">
          Proof-of-Work Marketplace
        </span>
        <h1 className="text-4xl md:text-6xl font-headings font-bold text-near-black leading-tight max-w-4xl mb-6">
          Hiring based on real evidence, <span className="italic">not resumes.</span>
        </h1>
        <p className="text-base md:text-lg text-muted max-w-2xl mb-10">
          Career OS matches candidates and hiring teams on portfolio artifacts and real business challenges.
          Both sides swipe right before the conversation begins.
        </p>
        <div className="flex flex-col sm:flex-row items-center gap-4 mb-16">
          <a href="/candidates" className="bg-near-black !text-white rounded-full px-8 py-3 text-sm font-semibold hover:opacity-90 transition">
            I&apos;m a Candidate
          </a>
          <a href="#employers" className="border border-near-black text-near-black rounded-full px-8 py-3 text-sm font-semibold hover:bg-near-black hover:!text-white transition">
            I&apos;m an Employer
          </a>
        </div>
        <StatsSection />
      </section>

      {/* Trust Bar */}
      <section className="bg-card py-20 border-y border-light-border/50">
        <div className="mx-auto max-w-6xl px-6">
          <p className="text-center text-sm text-muted uppercase tracking-wider mb-10">Trusted by leading institutions</p>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-cream rounded-xl p-8 text-center">
              <h3 className="text-lg font-bold text-near-black font-headings mb-2">Universities</h3>
              <p className="text-sm text-muted">15+ partner institutions across Asia</p>
            </div>
            <div className="bg-cream rounded-xl p-8 text-center">
              <h3 className="text-lg font-bold text-near-black font-headings mb-2">Employers</h3>
              <p className="text-sm text-muted">900+ hiring partners across 52 sectors</p>
            </div>
            <div className="bg-cream rounded-xl p-8 text-center">
              <h3 className="text-lg font-bold text-near-black font-headings mb-2">Programmes</h3>
              <p className="text-sm text-muted">Government & corporate upskilling initiatives</p>
            </div>
          </div>
        </div>
      </section>

      {/* /01 — For Candidates */}
      <NumberedSection
        num="01"
        title="For Candidates — Your work speaks first."
        subtitle="Upload your projects, get AI-evaluated skill tags, and surface in matches for real challenges in your target roles."
      >
        <div className="grid md:grid-cols-3 gap-6 mb-10">
          <Card
            icon={<IconCandidate />}
            title="Build Your Capability Profile"
            desc="Upload portfolio artifacts — code, designs, reports. AI evaluates and tags your skills automatically."
          />
          <Card
            icon={<IconLightning />}
            title="Get Matched on Evidence"
            desc="No more keyword-stuffed resumes. Get matched to opportunities where your actual work fits."
          />
          <Card
            icon={<Check strokeWidth={3} />}
            title="Mutual Interest First"
            desc="See match reasons before you swipe. Conversation starts only when both sides are interested."
          />
        </div>
        <a href="/candidates" className="inline-flex bg-near-black !text-white rounded-full px-8 py-3 text-sm font-semibold hover:opacity-90 transition">
          Continue as Candidate
        </a>
      </NumberedSection>

      {/* /02 — For Employers */}
      <NumberedSection
        num="02"
        title="For Employers — Hire from proof, not promises."
        subtitle="Describe the real challenge you need solved. We match you with candidates whose proof-of-work fits."
      >
        <div className="grid md:grid-cols-3 gap-6 mb-10">
          <Card
            icon={<IconEmployer />}
            title="Demand Tickets"
            desc="Post real challenges instead of generic job descriptions. See exactly who can deliver."
          />
          <Card
            icon={<IconLightning />}
            title="Evidence-Backed Matches"
            desc="Every candidate match comes with a clear explanation — this is why their work fits your need."
          />
          <Card
            icon={<Check strokeWidth={3} />}
            title="Swipe When Ready"
            desc="Review matched candidates on your timeline. Mutual swipe before chat, interview, or trial."
          />
        </div>
        <a href="#employers" className="inline-flex bg-near-black !text-white rounded-full px-8 py-3 text-sm font-semibold hover:opacity-90 transition">
          Continue as Employer
        </a>
      </NumberedSection>

      {/* /03 — Smart Matching */}
      <NumberedSection
        num="03"
        title="Meet your smartest recruiter."
        subtitle="AI-powered matching that understands skills, context, and potential — not keywords."
      >
        <div className="grid md:grid-cols-2 gap-6 mb-10">
          <div className="bg-card rounded-xl p-8 border border-light-border/50">
            <div className="flex items-start gap-4">
              <CheckIcon />
              <div>
                <h3 className="text-lg font-bold text-near-black mb-1">Skill Extraction</h3>
                <p className="text-sm text-muted">AI reads your portfolio and extracts demonstrable skills — no self-reporting required.</p>
              </div>
            </div>
          </div>
          <div className="bg-card rounded-xl p-8 border border-light-border/50">
            <div className="flex items-start gap-4">
              <CheckIcon />
              <div>
                <h3 className="text-lg font-bold text-near-black mb-1">Context-Aware Ranking</h3>
                <p className="text-sm text-muted">Matches are ranked by how well your work aligns with the actual challenge, not just title keywords.</p>
              </div>
            </div>
          </div>
          <div className="bg-card rounded-xl p-8 border border-light-border/50">
            <div className="flex items-start gap-4">
              <CheckIcon />
              <div>
                <h3 className="text-lg font-bold text-near-black mb-1">Explainable Matches</h3>
                <p className="text-sm text-muted">Every match shows why — specific artifacts, skills, and experiences that triggered the connection.</p>
              </div>
            </div>
          </div>
          <div className="bg-card rounded-xl p-8 border border-light-border/50">
            <div className="flex items-start gap-4">
              <CheckIcon />
              <div>
                <h3 className="text-lg font-bold text-near-black mb-1">Continuous Learning</h3>
                <p className="text-sm text-muted">Matching improves with every swipe, every application, and every hire.</p>
              </div>
            </div>
          </div>
        </div>
      </NumberedSection>

      {/* /04 — Real-time Updates */}
      <NumberedSection
        num="04"
        title="Real-time updates, real confidence."
        subtitle="Live notifications for new matches, application status changes, and hiring pipeline activity."
      >
        <div className="grid md:grid-cols-3 gap-6 mb-10">
          <Card
            icon={<IconBell />}
            title="Instant Notifications"
            desc="Get alerted the moment a match is found or an application status changes. Never miss an opportunity."
          />
          <Card
            icon={<IconLightning />}
            title="Live Pipeline View"
            desc="Track every stage of your hiring journey — from match to chat to interview to offer — in real time."
          />
          <Card
            icon={<Check strokeWidth={3} />}
            title="Responsive Everywhere"
            desc="Full-featured on desktop and mobile. Manage your career or hiring pipeline from any device."
          />
        </div>
      </NumberedSection>

      {/* Closing CTA */}
      <section className="px-6 pb-20">
        <div className="mx-auto max-w-6xl">
          <div className="bg-near-black !text-white rounded-2xl p-12 md:p-20 text-center">
            <h2 className="text-3xl md:text-5xl font-headings font-bold leading-tight mb-4">
              Ready to hire — or be hired — <span className="italic">on real evidence?</span>
            </h2>
            <p className="!text-white/70 max-w-xl mx-auto mb-10">
              Join Career OS and start matching based on what you can actually do.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a href="/candidates" className="bg-white text-near-black rounded-full px-8 py-3 text-sm font-semibold hover:opacity-90 transition">
                Get Started Free
              </a>
              <a href="#employers" className="border border-white !text-white rounded-full px-8 py-3 text-sm font-semibold hover:bg-white hover:text-near-black transition">
                Learn More
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-cream border-t border-light-border/50 py-12">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid md:grid-cols-4 gap-8 mb-10">
            <div className="col-span-1">
              <div className="text-xl font-bold text-near-black mb-3">
                Career<span className="text-amber-600">OS</span>
              </div>
              <p className="text-sm text-muted">A Talentbank product · built for Asia, in Malaysia.</p>
            </div>
            <div>
              <h4 className="text-sm font-bold text-near-black mb-4 uppercase tracking-wider">For Talent</h4>
              <ul className="space-y-2 text-sm text-muted">
                <li><a href="/candidates" className="hover:text-near-black transition">Browse Matches</a></li>
                <li><a href="/candidates" className="hover:text-near-black transition">Capability Profile</a></li>
                <li><a href="#candidates" className="hover:text-near-black transition">How It Works</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-bold text-near-black mb-4 uppercase tracking-wider">For Employers</h4>
              <ul className="space-y-2 text-sm text-muted">
                <li><a href="#employers" className="hover:text-near-black transition">Post a Ticket</a></li>
                <li><a href="#employers" className="hover:text-near-black transition">Find Candidates</a></li>
                <li><a href="#employers" className="hover:text-near-black transition">Pricing</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-bold text-near-black mb-4 uppercase tracking-wider">Company</h4>
              <ul className="space-y-2 text-sm text-muted">
                <li><a href="#" className="hover:text-near-black transition">About</a></li>
                <li><a href="#" className="hover:text-near-black transition">Blog</a></li>
                <li><a href="#" className="hover:text-near-black transition">Contact</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-light-border/50 pt-8 text-center text-sm text-muted">
            Reference Build · Vol.01 · © 2026 Career OS. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
