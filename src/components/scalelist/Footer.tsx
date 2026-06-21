import { Zap, Linkedin, Youtube } from "lucide-react";

const COLS: { title: string; links: { label: string; href: string }[] }[] = [
  {
    title: "Get Started",
    links: [
      { label: "Pricing", href: "https://scalelist.com/pricing/" },
      { label: "Log In", href: "https://app.scalelist.com/auth/login?redirectUrl=%2Fapp%2Fdashboard" },
      { label: "Sign up for free", href: "https://app.scalelist.com/auth/signup?redirectUrl=%2Fapp%2Fdashboard" },
      { label: "Get a demo", href: "https://calendly.com/arnaud-scalelist/30min" },
    ],
  },
  {
    title: "Product",
    links: [
      { label: "Email Finder", href: "https://scalelist.com/free-email-finder/" },
      { label: "Email Verifier", href: "https://scalelist.com/email-verifier/" },
      { label: "Chrome Extension", href: "https://scalelist.com/extension/" },
      { label: "Lead Mobile Finder", href: "https://scalelist.com/lead-mobile-finder/" },
      { label: "Monitoring", href: "https://scalelist.com/monitoring/" },
      { label: "Integrations", href: "https://scalelist.com/integrations/" },
      { label: "API", href: "https://app.scalelist.com/docs" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Blog", href: "https://scalelist.com/blog/" },
      { label: "Youtube", href: "https://www.youtube.com/@Scalelist" },
      { label: "Help Center", href: "https://intercom.help/scalelist/en/collections/12728118-general" },
      { label: "Scalelist Academy", href: "https://scalelist.com/academy/" },
    ],
  },
  {
    title: "Free Tools",
    links: [
      { label: "Free Email Verifier", href: "https://scalelist.com/free-email-verifier/" },
      { label: "Free Email Finder", href: "https://scalelist.com/free-email-finder/" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "Partner with Scalelist", href: "https://affiliates.scalelist.com/signup" },
      { label: "Top Lead Generation Companies", href: "https://scalelist.com/top-lead-generation-companies/" },
      { label: "Public Listed Company USA", href: "https://scalelist.com/public-companies-usa/" },
      { label: "Terms of Use", href: "https://scalelist.com/terms-of-use/" },
      { label: "Privacy Policy", href: "https://scalelist.com/privacy/" },
      { label: "Contact Us", href: "https://form.typeform.com/to/lvQHcXGx?typeform-source=scalelist.com" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="bg-white border-t border-border py-16">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-8">
          {COLS.map((col) => (
            <div key={col.title}>
              <h3 className="text-sm font-bold uppercase tracking-wider text-foreground mb-4">{col.title}</h3>
              <ul className="space-y-2">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <a href={l.href} className="text-sm text-muted-foreground hover:text-foreground transition">{l.label}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-border mt-12 pt-6 flex items-center justify-between flex-wrap gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center justify-center w-6 h-6 rounded-md bg-primary text-primary-foreground">
              <Zap className="w-3.5 h-3.5" fill="currentColor" />
            </span>
            © 2026 Scalelist · hello@scalelist.com
          </div>
          <div className="flex items-center gap-3">
            <a href="https://www.linkedin.com/company/scalelist" aria-label="LinkedIn" className="hover:text-foreground">
              <Linkedin className="w-5 h-5" />
            </a>
            <a href="https://www.youtube.com/@Scalelist" aria-label="YouTube" className="hover:text-foreground">
              <Youtube className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
