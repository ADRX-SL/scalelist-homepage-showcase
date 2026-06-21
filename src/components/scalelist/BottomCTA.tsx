import { ArrowRight } from "lucide-react";

export function BottomCTA() {
  return (
    <section className="py-20 md:py-28 bg-white">
      <div className="max-w-2xl mx-auto px-6 text-center">
        <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight">Unlock B2B emails & mobile numbers for free</h2>
        <div className="mt-8 flex gap-3 justify-center flex-wrap">
          <a href="https://app.scalelist.com/auth/login?redirectUrl=%2Fapp%2Fdashboard" className="group inline-flex items-center justify-center gap-2 rounded-full bg-primary text-primary-foreground px-8 py-4 text-base font-semibold shadow-lg shadow-primary/25 hover:bg-primary/90 transition w-full sm:w-auto">
            Get started for free <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </a>
          <a href="https://form.typeform.com/to/lvQHcXGx?typeform-source=scalelist.com" className="inline-flex items-center justify-center rounded-full bg-white border border-border px-8 py-4 text-base font-semibold hover:bg-muted transition w-full sm:w-auto">
            Talk to sales
          </a>
        </div>
      </div>
    </section>
  );
}
