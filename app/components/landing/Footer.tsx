import Link from "next/link";
import { footerLinks } from "./content";

function FooterLink({ href, label }: { href: string; label: string }) {
  if (href.startsWith("#")) {
    return (
      <a href={href} className="transition hover:text-accent">
        {label}
      </a>
    );
  }
  return (
    <Link href={href} className="transition hover:text-accent">
      {label}
    </Link>
  );
}

export default function Footer() {
  return (
    <footer className="border-t border-light-border/50 bg-primary py-12">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-10 grid gap-8 md:grid-cols-4">
          <div>
            <div className="mb-3 text-xl font-bold text-accent">
              Career<span className="text-brand">OS</span>
            </div>
            <p className="text-sm text-muted">
              A Talentbank product · built for Asia, in Malaysia.
            </p>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-bold uppercase tracking-wider text-accent">
              For Talent
            </h4>
            <ul className="space-y-2 text-sm text-muted">
              {footerLinks.talent.map((l) => (
                <li key={l.label}>
                  <FooterLink href={l.href} label={l.label} />
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-bold uppercase tracking-wider text-accent">
              For Employers
            </h4>
            <ul className="space-y-2 text-sm text-muted">
              {footerLinks.employers.map((l) => (
                <li key={l.label}>
                  <FooterLink href={l.href} label={l.label} />
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-bold uppercase tracking-wider text-accent">
              Company
            </h4>
            <ul className="space-y-2 text-sm text-muted">
              {footerLinks.company.map((l) => (
                <li key={l.label}>
                  <FooterLink href={l.href} label={l.label} />
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-light-border/50 pt-8 text-center text-sm text-muted">
          © 2026 Career OS. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
