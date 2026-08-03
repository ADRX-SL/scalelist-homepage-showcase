import { useEffect, useRef, useState } from "react";
import { ArrowUp, Paperclip, Sparkles } from "lucide-react";

const CHIPS = [
  "Industry: B2B SaaS",
  "Geography: United States",
  "Funding: Series A–B, last 6 months",
  "Signal: hiring SDR/AE",
];

type LeadRow = {
  first: string;
  last: string;
  title: string;
  company: string;
  domain: string;
  city: string;
};

const ROWS: LeadRow[] = [
  { first: "Sarah", last: "Chen", title: "VP Sales", company: "OpenAI", domain: "openai.com", city: "San Francisco" },
  { first: "Marcus", last: "Bell", title: "Head of Growth", company: "Stripe", domain: "stripe.com", city: "New York" },
  { first: "Elena", last: "Vega", title: "CRO", company: "Salesforce", domain: "salesforce.com", city: "Austin" },
  { first: "David", last: "Kim", title: "RevOps Lead", company: "HubSpot", domain: "hubspot.com", city: "Boston" },
  { first: "Priya", last: "Raman", title: "Director of Demand Gen", company: "Slack", domain: "slack.com", city: "Seattle" },
  { first: "Jordan", last: "Ellis", title: "Head of Partnerships", company: "Figma", domain: "figma.com", city: "San Francisco" },
  { first: "Natalie", last: "Brooks", title: "VP Marketing", company: "Notion", domain: "notion.so", city: "New York" },
  { first: "Tom", last: "Whitfield", title: "Chief Revenue Officer", company: "Datadog", domain: "datadoghq.com", city: "Boston" },
];

function CompanyLogo({ domain, name }: { domain: string; name: string }) {
  const [failed, setFailed] = useState(false);
  if (failed) {
    return (
      <span className="w-5 h-5 rounded-sm bg-primary/10 text-primary text-[10px] font-bold flex items-center justify-center shrink-0">
        {name.charAt(0)}
      </span>
    );
  }
  return (
    <img
      src={`https://logo.clearbit.com/${domain}`}
      alt={`${name} logo`}
      loading="lazy"
      onError={() => setFailed(true)}
      className="w-5 h-5 rounded-sm object-contain shrink-0"
    />
  );
}

function LinkedInIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="w-4 h-4 text-[#0A66C2]">
      <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.47-.9 1.63-1.85 3.36-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.55V9h3.57v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.22 0z" />
    </svg>
  );
}


const QUERY =
  "Find B2B SaaS companies in the US that raised Series A or B in the last 6 months and are hiring SDRs or AEs.";

function useTypewriter(text: string, active: boolean, speed = 14) {
  const [out, setOut] = useState("");
  useEffect(() => {
    if (!active) {
      setOut(text);
      return;
    }
    setOut("");
    let i = 0;
    const id = setInterval(() => {
      i++;
      setOut(text.slice(0, i));
      if (i >= text.length) clearInterval(id);
    }, speed);
    return () => clearInterval(id);
  }, [text, active, speed]);
  return out;
}

export function TabClaude() {
  const [step, setStep] = useState(0);
  useEffect(() => {
    const timings = [1400, 1200, 6000];
    const id = setTimeout(() => setStep((s) => (s + 1) % 3), timings[step]);
    return () => clearTimeout(id);
  }, [step]);

  const answer =
    "Got it. I searched for recently funded US SaaS teams that are actively growing their sales org — here's what I understood:";
  const typed = useTypewriter(answer, step === 2);

  const chatRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (chatRef.current) chatRef.current.scrollTop = chatRef.current.scrollHeight;
  }, [step]);

  const visibleRows = step >= 2 ? ROWS.length : 0;

  return (
    <div className="h-full grid lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] overflow-hidden">
      {/* LEFT — Scalelist AI Leads Finder */}
      <div className="bg-blue-50/40 p-5 sm:p-7 flex flex-col h-full overflow-hidden border-b lg:border-b-0 lg:border-r border-border">
        <div className="flex items-center gap-2 pb-4 border-b border-border">
          <span className="text-base font-extrabold tracking-tight text-foreground">Scalelist</span>
          <span className="inline-flex items-center gap-1 text-xs text-primary font-semibold">
            <Sparkles className="w-3.5 h-3.5" /> AI Leads Finder
          </span>
          <span className="ml-auto inline-flex items-center gap-1.5 text-[11px] text-green-700">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500" /> Live
          </span>
        </div>

        <div ref={chatRef} className="flex-1 flex flex-col gap-5 py-5 overflow-y-auto min-h-0">
          <div className="flex justify-end fade-up">
            <span className="bg-primary text-primary-foreground text-sm rounded-2xl rounded-br-md px-4 py-3 max-w-[90%] leading-relaxed">
              {QUERY}
            </span>
          </div>

          {step === 1 && (
            <div className="flex gap-1.5 items-center">
              {[0, 1, 2].map((i) => (
                <span
                  key={i}
                  className="w-1.5 h-1.5 rounded-full bg-primary/50 animate-bounce"
                  style={{ animationDelay: `${i * 120}ms` }}
                />
              ))}
            </div>
          )}

          {step >= 2 && (
            <div className="fade-up">
              <p className="text-foreground text-[15px] leading-relaxed">{step === 2 ? typed : answer}</p>
              <div className="flex flex-wrap gap-2 mt-4">
                {CHIPS.map((c) => (
                  <span
                    key={c}
                    className="rounded-full bg-white border border-primary/20 text-foreground px-3 py-1.5 text-xs font-medium shadow-sm"
                  >
                    {c}
                  </span>
                ))}
              </div>
              <p className="text-sm text-muted-foreground mt-4 leading-relaxed">
                12,400 matching companies. Ask in plain English to widen, narrow, or add a signal.
              </p>
            </div>
          )}
        </div>

        <div className="mt-auto bg-white rounded-2xl border border-border px-4 py-3 shadow-sm">
          <div className="flex items-center text-sm text-muted-foreground">
            <span className="truncate">Ask a follow-up, e.g. “only companies with 50+ employees”</span>
            <span className="ml-1 w-1.5 h-4 bg-foreground/30 cursor-blink shrink-0" />
          </div>
          <div className="flex items-center justify-between mt-2.5">
            <Paperclip className="w-4 h-4 text-muted-foreground" />
            <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-primary text-primary-foreground">
              <ArrowUp className="w-4 h-4" />
            </span>
          </div>
        </div>

        <p className="text-[11px] text-muted-foreground mt-3">Also available in Claude via MCP.</p>
      </div>

      {/* RIGHT — results */}
      <div className="bg-white p-4 sm:p-6 h-full flex flex-col overflow-hidden">
        <div className="flex items-start justify-between gap-3 mb-3 flex-wrap">
          <h3 className="text-sm font-semibold max-w-md leading-snug">
            US B2B SaaS · Series A–B in last 6 months · hiring SDR/AE
          </h3>
          <span className="bg-green-50 text-green-700 border border-green-100 rounded-full px-3 py-1 text-xs font-medium whitespace-nowrap">
            12,400 leads
          </span>
        </div>

        <div className="flex-1 overflow-y-auto min-h-0">
          <div className="overflow-x-auto rounded-xl border border-border">
            <table className="w-full text-xs min-w-[640px]">
              <thead className="bg-gray-50">
                <tr className="text-left text-[10px] uppercase tracking-wider text-muted-foreground">
                  <th className="px-3 py-2">in</th>
                  <th className="px-3 py-2">First name</th>
                  <th className="px-3 py-2">Last name</th>
                  <th className="px-3 py-2">Job title</th>
                  <th className="px-3 py-2">Company</th>
                  <th className="px-3 py-2">City</th>
                  <th className="px-3 py-2">Country</th>
                </tr>
              </thead>
              <tbody>
                {ROWS.map((r, i) => (
                  <tr
                    key={r.first + r.last}
                    className="border-t border-border bg-white transition-opacity duration-300"
                    style={{ opacity: i < visibleRows ? 1 : 0 }}
                  >
                    <td className="px-3 py-2"><LinkedInIcon /></td>
                    <td className="px-3 py-2 font-medium">{r.first}</td>
                    <td className="px-3 py-2 font-medium">{r.last}</td>
                    <td className="px-3 py-2 text-muted-foreground whitespace-nowrap">{r.title}</td>
                    <td className="px-3 py-2">
                      <span className="flex items-center gap-2 whitespace-nowrap">
                        <CompanyLogo domain={r.domain} name={r.company} />
                        <span className="text-muted-foreground">{r.company}</span>
                      </span>
                    </td>
                    <td className="px-3 py-2 text-muted-foreground whitespace-nowrap">{r.city}</td>
                    <td className="px-3 py-2 text-muted-foreground">United States</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

        </div>

      </div>
    </div>
  );
}
