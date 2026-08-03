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
  industry: string;
  size: string;
  city: string;
  country: string;
};

const ROWS: LeadRow[] = [
  { first: "Adeel", last: "Raza", title: "Co-Founder & CEO", company: "Unlayer", industry: "Software Development", size: "11", city: "San Francisco", country: "US" },
  { first: "Arvind", last: "Parthiban", title: "Co-Founder & CEO", company: "SuperOps", industry: "Software Development", size: "51", city: "San Francisco", country: "US" },
  { first: "David", last: "Sneider", title: "Co-Founder", company: "Lit Protocol", industry: "Technology, Information…", size: "11", city: "San Francisco", country: "US" },
  { first: "Geoffroy", last: "D'halluin", title: "CEO & co-founder", company: "Guideflow", industry: "Software Development", size: "11", city: "San Francisco", country: "US" },
  { first: "Guillaume", last: "Marquis", title: "Co-Founder", company: "Pancake", industry: "Software Development", size: "2", city: "San Francisco", country: "US" },
  { first: "Hoshang", last: "Mehta", title: "Co-Founder", company: "Pylar", industry: "Technology, Information…", size: "11", city: "Bengaluru", country: "IO" },
  { first: "Jamie", last: "Sutherland", title: "Co-Founder & CEO", company: "Sonix Inc", industry: "Technology, Information…", size: "11", city: "San Francisco", country: "US" },
  { first: "Roland", last: "Manyai", title: "CEO, Co-Founder", company: "Leopoly", industry: "Software Development", size: "11", city: "San Francisco", country: "US" },
];

const COLUMNS: { key: string; label: string; width: string }[] = [
  { key: "profile", label: "LinkedIn Profile URL", width: "w-[190px]" },
  { key: "first", label: "First Name", width: "w-[120px]" },
  { key: "last", label: "Last Name", width: "w-[120px]" },
  { key: "title", label: "Job Title", width: "w-[160px]" },
  { key: "company", label: "Company", width: "w-[150px]" },
  { key: "industry", label: "Industry", width: "w-[170px]" },
  { key: "size", label: "Company Size", width: "w-[120px]" },
  { key: "city", label: "City", width: "w-[130px]" },
  { key: "country", label: "Country", width: "w-[90px]" },
];

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
            <table className="w-full text-sm table-fixed min-w-[1150px]">
              <colgroup>
                {COLUMNS.map((c) => (
                  <col key={c.key} className={c.width} />
                ))}
              </colgroup>
              <thead className="bg-gray-50">
                <tr className="text-left">
                  {COLUMNS.map((c) => (
                    <th
                      key={c.key}
                      className="text-[11px] font-medium text-muted-foreground px-3 py-2.5 whitespace-nowrap border-r border-border last:border-r-0"
                    >
                      {c.label}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {ROWS.map((r, i) => (
                  <tr
                    key={r.first + r.last}
                    className="bg-white transition-opacity duration-300"
                    style={{ opacity: i < visibleRows ? 1 : 0 }}
                  >
                    <td className="px-3 py-3 border-t border-border truncate text-primary font-medium">
                      {r.first} {r.last}
                    </td>
                    <td className="px-3 py-3 border-t border-border truncate">{r.first}</td>
                    <td className="px-3 py-3 border-t border-border truncate">{r.last}</td>
                    <td className="px-3 py-3 border-t border-border truncate">{r.title}</td>
                    <td className="px-3 py-3 border-t border-border truncate text-primary font-medium">{r.company}</td>
                    <td className="px-3 py-3 border-t border-border truncate">{r.industry}</td>
                    <td className="px-3 py-3 border-t border-border truncate">{r.size}</td>
                    <td className="px-3 py-3 border-t border-border truncate">{r.city}</td>
                    <td className="px-3 py-3 border-t border-border truncate">{r.country}</td>
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
