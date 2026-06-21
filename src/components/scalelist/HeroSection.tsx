import { ArrowRight, Star } from "lucide-react";
import { ProductShowcase } from "./ProductShowcase";

const SIGNUP = "https://app.scalelist.com/auth/signup?redirectUrl=%2Fapp%2Fdashboard";
const DEMO = "https://form.typeform.com/to/lvQHcXGx";

function Stars() {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} className="w-3.5 h-3.5 fill-orange-400 text-orange-400" />
      ))}
    </div>
  );
}

export function HeroSection() {
  return (
    <section className="relative pt-16 pb-20 overflow-hidden">
      <div className="absolute inset-x-0 top-0 h-[600px] bg-gradient-to-b from-blue-50/60 via-white to-white pointer-events-none" />
      <div className="relative max-w-6xl mx-auto px-6 text-center">
        <div className="flex items-center justify-center gap-3 mb-8 flex-wrap">
          <div className="inline-flex items-center gap-2 rounded-full bg-white border border-border px-4 py-2 text-sm font-semibold shadow-sm">
            <Stars /> 4.8/5 on Google
          </div>
          <div className="inline-flex items-center gap-2 rounded-full bg-white border border-border px-4 py-2 text-sm font-semibold shadow-sm">
            <Stars /> 4.9/5 on Capterra
          </div>
        </div>

        <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold tracking-tight leading-[1.05] text-foreground max-w-4xl mx-auto">
          Find any lead's email &<br />
          phone,{" "}
          <span className="text-primary relative inline-block">
            anywhere
            <span className="absolute left-0 right-0 -bottom-1 h-1 bg-primary/30 rounded-full" />
          </span>
        </h1>

        <p className="mt-6 text-lg md:text-xl text-muted-foreground max-w-xl mx-auto leading-relaxed">
          Find 80%+ of your leads' verified emails and mobile numbers, anywhere, worldwide, in one click.
          Stop losing deals because you couldn't reach them.
        </p>

        <div className="mt-8 flex gap-3 justify-center flex-wrap">
          <a href={SIGNUP} className="group inline-flex items-center gap-2 rounded-full bg-primary text-primary-foreground px-8 py-4 text-base font-semibold shadow-lg shadow-primary/25 hover:bg-primary/90 transition w-full sm:w-auto justify-center">
            Sign up for free <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </a>
          <a href={DEMO} className="inline-flex items-center justify-center rounded-full bg-white border border-border px-8 py-4 text-base font-semibold text-foreground hover:bg-muted transition w-full sm:w-auto">
            Get a demo
          </a>
        </div>

        <div className="mt-16">
          <ProductShowcase />
        </div>
      </div>
    </section>
  );
}
