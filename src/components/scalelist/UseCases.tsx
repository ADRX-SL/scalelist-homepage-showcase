import { useState } from "react";

type TabId = "sales" | "agency" | "founder";

const CONTENT: Record<TabId, { label: string; quote: { text: string; author: string }; items: { n: string; t: string; d: string }[] }> = {
  sales: {
    label: "For Sales Teams",
    quote: { text: "We hit quota 3 months in a row after switching to Scalelist. The mobile coverage is game-changing.", author: "Lena T., AE @ Mid-market SaaS" },
    items: [
      { n: "01", t: "Reach decision-makers directly", d: "Find verified direct dials. Skip gatekeepers and call the person who signs the deal." },
      { n: "02", t: "Know before you call", d: "15 enrichment data points per contact so you can personalize every touchpoint." },
      { n: "03", t: "Keep your CRM clean", d: "Automatic monitoring alerts you when an email bounces or a contact changes jobs." },
    ],
  },
  agency: {
    label: "For Outbound Agencies",
    quote: { text: "We run enrichment for 12 clients. Scalelist's bulk API is the only tool that keeps up.", author: "Marcus O., Founder @ B2B Lead Agency" },
    items: [
      { n: "01", t: "Enrich 50,000 records per job", d: "Bulk API with job_id polling or webhook callbacks. Credits only on match." },
      { n: "02", t: "White-label ready", d: "Push results to any CRM or sequencing tool under your brand." },
      { n: "03", t: "Predictable cost per lead", d: "Pay per verified result, not per lookup. No wasted credits." },
    ],
  },
  founder: {
    label: "For Founders",
    quote: { text: "I built my first 500-lead list in 20 minutes using Claude + Scalelist. Booked 6 demos that week.", author: "Ravi K., Founder @ B2B SaaS" },
    items: [
      { n: "01", t: "Find leads without a data team", d: "Describe your ICP to Claude and get an enriched list in minutes." },
      { n: "02", t: "From zero to pipeline fast", d: "Email, phone, and 15 data points per contact. Export to CSV or push to your inbox tool." },
      { n: "03", t: "Scale when you're ready", d: "Start on the free tier, upgrade as outbound grows. No annual lock-in." },
    ],
  },
};

const TAB_IDS: TabId[] = ["sales", "agency", "founder"];

export function UseCases() {
  const [active, setActive] = useState<TabId>("sales");
  const c = CONTENT[active];
  return (
    <section className="py-20 md:py-28">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <span className="inline-block text-xs font-semibold uppercase tracking-widest text-primary bg-primary/10 border border-primary/30 rounded-full px-3 py-1">
          Use Cases
        </span>
        <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight mt-4">See how Scalelist helps your team</h2>

        <div className="mt-8 flex gap-2 justify-center flex-wrap">
          {TAB_IDS.map((id) => (
            <button
              key={id}
              onClick={() => setActive(id)}
              className={`rounded-full px-5 py-2 text-sm font-semibold transition ${
                active === id ? "bg-foreground text-background" : "bg-white border border-border text-foreground hover:bg-muted"
              }`}
            >
              {CONTENT[id].label}
            </button>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 mt-10 items-start text-left fade-up" key={active}>
          <div className="bg-stone-50 rounded-2xl p-8 italic text-lg leading-relaxed">
            "{c.quote.text}"
            <div className="mt-4 text-sm not-italic text-muted-foreground font-semibold">— {c.quote.author}</div>
          </div>
          <div className="grid gap-4">
            {c.items.map((it) => (
              <div key={it.n} className="bg-white border border-border shadow-sm rounded-2xl p-6">
                <div className="text-primary font-extrabold text-sm">{it.n}</div>
                <div className="font-bold text-lg mt-1">{it.t}</div>
                <div className="text-muted-foreground text-sm mt-1.5 leading-relaxed">{it.d}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
