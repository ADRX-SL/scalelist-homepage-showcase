import { useEffect, useState } from "react";
import { ArrowRight, Zap, ChevronDown } from "lucide-react";

const LINKS = {
  logo: "https://scalelist.com",
  customers: "https://scalelist.com/customers/",
  pricing: "https://scalelist.com/pricing/",
  extension: "https://chromewebstore.google.com/detail/scalelist-email-phone-fin/anaccdhbkiogfkgiajemghahklnkofmc",
  login: "https://app.scalelist.com/auth/login?redirectUrl=%2Fapp%2Fdashboard",
  demo: "https://form.typeform.com/to/lvQHcXGx?typeform-source=scalelist.com",
  signup: "https://app.scalelist.com/auth/signup?redirectUrl=%2Fapp%2Fdashboard",
};

export function NavBar() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all ${
        scrolled ? "bg-white/90 backdrop-blur-md border-b border-border" : "bg-transparent"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <a href={LINKS.logo} className="flex items-center gap-2 font-extrabold text-lg tracking-tight">
          <span className="inline-flex items-center justify-center w-7 h-7 rounded-lg bg-primary text-primary-foreground">
            <Zap className="w-4 h-4" fill="currentColor" />
          </span>
          Scalelist
        </a>

        <ul className="hidden lg:flex items-center gap-7 text-sm font-medium text-foreground/80">
          <li className="flex items-center gap-1 cursor-pointer hover:text-foreground">Platform <ChevronDown className="w-3.5 h-3.5" /></li>
          <li className="flex items-center gap-1 cursor-pointer hover:text-foreground">Resources <ChevronDown className="w-3.5 h-3.5" /></li>
          <li><a href={LINKS.customers} className="hover:text-foreground">Customers</a></li>
          <li><a href={LINKS.pricing} className="hover:text-foreground">Pricing</a></li>
        </ul>

        <div className="flex items-center gap-2 md:gap-3">
          <a href={LINKS.extension} className="hidden md:inline text-sm font-medium text-foreground/80 hover:text-foreground">Chrome Extension</a>
          <a href={LINKS.login} className="hidden md:inline text-sm font-medium text-foreground/80 hover:text-foreground">Login</a>
          <a href={LINKS.demo} className="hidden sm:inline-flex items-center rounded-full border border-border px-4 py-2 text-sm font-semibold hover:bg-muted transition-colors">Get a demo</a>
          <a href={LINKS.signup} className="group inline-flex items-center gap-1.5 rounded-full bg-primary text-primary-foreground px-4 py-2 text-sm font-semibold shadow-sm hover:bg-primary/90 transition">
            Sign up for free <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </a>
        </div>
      </nav>
    </header>
  );
}
