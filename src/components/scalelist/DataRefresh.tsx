import { ArrowRight, ShieldCheck, Star } from "lucide-react";

const SIGNUP = "https://app.scalelist.com/auth/signup?redirectUrl=%2Fapp%2Fdashboard";
const DEMO = "https://form.typeform.com/to/lvQHcXGx";

export function DataRefresh() {
  return (
    <section className="bg-stone-50 py-20 md:py-28">
      <div className="max-w-3xl mx-auto px-6 text-center">
        <div className="flex gap-3 justify-center mb-8 flex-wrap">
          <span className="bg-white border border-border rounded-full px-5 py-2 text-sm font-semibold shadow-sm inline-flex items-center gap-2">
            <span className="flex">{Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className="w-3.5 h-3.5 fill-orange-400 text-orange-400" />
            ))}</span>
            4.8/5 Google Rating
          </span>
          <span className="bg-white border border-border rounded-full px-5 py-2 text-sm font-semibold shadow-sm inline-flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-primary" /> GDPR Compliant
          </span>
        </div>
        <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight">Unlock B2B emails & mobile numbers for free</h2>
        <p className="text-lg md:text-xl text-muted-foreground mt-4">Start finding and enriching leads today. No credit card required.</p>
        <div className="mt-8 flex gap-3 justify-center flex-wrap">
          <a href={SIGNUP} className="group inline-flex items-center justify-center gap-2 rounded-full bg-primary text-primary-foreground px-8 py-4 text-base font-semibold shadow-lg shadow-primary/25 hover:bg-primary/90 transition w-full sm:w-auto">
            Sign up for free <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </a>
          <a href={DEMO} className="inline-flex items-center justify-center rounded-full bg-white border border-border px-8 py-4 text-base font-semibold hover:bg-muted transition w-full sm:w-auto">
            Talk to sales
          </a>
        </div>
      </div>
    </section>
  );
}
