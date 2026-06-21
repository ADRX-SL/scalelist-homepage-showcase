import { useEffect, useRef, useState } from "react";
import { CheckCircle2, Plus, Mic, AudioLines } from "lucide-react";
import { ClaudeLogo } from "../ClaudeLogo";

const PHASE1_ROWS = [
  ["Sarah", "Chen", "Acme Cloud", "acmecloud.com", "CEO", "Software", "120"],
  ["Marcus", "Patel", "Northwind Labs", "northwindlabs.io", "CEO", "Software", "85"],
  ["Elena", "Vega", "Beacon AI", "beacon-ai.com", "CEO", "Software", "44"],
  ["David", "Kim", "Lumen Data", "lumendata.co", "CEO", "Software", "180"],
  ["Priya", "Shah", "Cipher Works", "cipherworks.com", "CEO", "Software", "67"],
  ["Tom", "Becker", "Strata Cloud", "stratacloud.io", "CEO", "Software", "150"],
  ["Maya", "Ortiz", "Pulse Metrics", "pulsemetrics.com", "CEO", "Software", "32"],
  ["Jonah", "Reed", "Orbit Sync", "orbitsync.com", "CEO", "Software", "95"],
];

const ENRICHED = [
  { email: "sarah.chen@acmecloud.com", phone: "+1 (415) 555-0192" },
  { email: "m.patel@northwindlabs.io", phone: "+1 (415) 555-0144" },
  { email: "elena@beacon-ai.com", phone: "+1 (628) 555-0178" },
  { email: "david.kim@lumendata.co", phone: "+1 (650) 555-0102" },
  { email: "priya@cipherworks.com", phone: "+1 (415) 555-0166" },
  { email: "tom.becker@stratacloud.io", phone: "+1 (510) 555-0119" },
  { email: "maya.ortiz@pulsemetrics.com", phone: "+1 (415) 555-0188" },
  { email: "jonah@orbitsync.com", phone: "+1 (628) 555-0133" },
];

function useTypewriter(text: string, active: boolean, speed = 12) {
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
    const timings = [1200, 1200, 5800, 2200, 1200, 5200];
    const id = setTimeout(() => setStep((s) => (s + 1) % 6), timings[step]);
    return () => clearTimeout(id);
  }, [step]);

  const ai1Text =
    "Found 31,000 CEOs at US technology companies with 11–200 employees. Here's a preview — would you like me to enrich them with verified emails and mobile numbers?";
  const ai2Text =
    "Done. I enriched the 8,500 CEOs based in California. All emails are verified deliverable, mobiles are direct dials.";
  const ai1 = useTypewriter(ai1Text, step === 2);
  const ai2 = useTypewriter(ai2Text, step === 5);

  const enriched = step >= 5;
  const visibleRows = step >= 2 ? 8 : 0;
  const chatRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [step]);

  return (
    <div className="h-full grid lg:grid-cols-2 gap-0 overflow-hidden">
      {/* LEFT — Claude.ai light chat */}
      <div className="bg-[#faf9f5] p-6 flex flex-col h-full overflow-hidden">
        <div className="flex items-center gap-2 pb-4 border-b border-[#e8e4d8]">
          <ClaudeLogo className="w-5 h-5" />
          <span className="text-[#1f1f1d] text-sm font-semibold">Claude</span>
          <span className="text-[#8a857a] text-xs">· Scalelist MCP</span>
          <span className="ml-auto inline-flex items-center gap-1.5 text-[11px] text-green-700">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500" /> Connected
          </span>
        </div>

        <div ref={chatRef} className="flex-1 flex flex-col gap-5 py-5 overflow-y-auto overflow-x-hidden min-h-0">
          {step >= 0 && (
            <div className="flex justify-end fade-up">
              <span className="bg-[#efe9d9] text-[#1f1f1d] text-sm rounded-2xl px-4 py-2 max-w-[85%]">
                <span className="text-[#c2410c] font-medium">/scalelist</span>{" "}
                find CEOs of US technology companies with 11–200 employees
              </span>
            </div>
          )}

          {step === 1 && <ThinkingDots />}

          {step >= 2 && (
            <div className="fade-up">
              <div className="text-[11px] text-[#8a857a] mb-1.5 flex items-center gap-1.5">
                <span className="inline-block w-1 h-1 rounded-full bg-[#c2410c]" />
                Searched Scalelist database
              </div>
              <p className="text-[#1f1f1d] text-[15px] leading-relaxed">
                {step === 2 ? ai1 : ai1Text}
              </p>
              {step >= 2 && (
                <div className="mt-3 rounded-xl overflow-hidden border border-[#e8e4d8] text-xs bg-white">
                  <div className="grid grid-cols-3 bg-[#f5f1e6] px-3 py-1.5 text-[10px] uppercase tracking-wider text-[#8a857a] font-medium">
                    <span>Name</span>
                    <span>Company</span>
                    <span>Title</span>
                  </div>
                  {PHASE1_ROWS.slice(0, 3).map((r, i) => (
                    <div key={i} className="grid grid-cols-3 px-3 py-1.5 border-t border-[#f0ecdf] text-[#1f1f1d]">
                      <span>{r[0]} {r[1]}</span>
                      <span>{r[2]}</span>
                      <span>{r[4]}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {step >= 3 && (
            <div className="flex justify-end fade-up">
              <span className="bg-[#efe9d9] text-[#1f1f1d] text-sm rounded-2xl px-4 py-2 max-w-[85%]">
                Yes — enrich the CEOs in California with emails and mobile numbers
              </span>
            </div>
          )}

          {step === 4 && <ThinkingDots />}

          {step >= 5 && (
            <div className="fade-up">
              <div className="text-[11px] text-[#8a857a] mb-1.5 flex items-center gap-1.5">
                <span className="inline-block w-1 h-1 rounded-full bg-[#c2410c]" />
                Enriched 8,500 contacts
              </div>
              <p className="text-[#1f1f1d] text-[15px] leading-relaxed">
                {step === 5 ? ai2 : ai2Text}
              </p>
              <div className="mt-3 space-y-1.5 text-sm text-[#1f1f1d]">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-600" /> 7,820 emails found <span className="text-[#8a857a]">(92%)</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-600" /> 7,395 mobile numbers found <span className="text-[#8a857a]">(87%)</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-600" /> Ready to export or push to your CRM
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="mt-auto bg-white rounded-2xl border border-[#e8e4d8] px-4 py-3 shadow-sm">
          <div className="flex items-center text-sm text-[#8a857a]">
            <span>Write a message…</span>
            <span className="ml-1 w-1.5 h-4 bg-[#1f1f1d]/40 cursor-blink" />
          </div>
          <div className="flex items-center justify-between mt-2 text-[11px] text-[#8a857a]">
            <Plus className="w-3.5 h-3.5" />
            <div className="flex items-center gap-3">
              <span>Sonnet 4.5 <span className="opacity-60">▾</span></span>
              <Mic className="w-3.5 h-3.5" />
              <AudioLines className="w-3.5 h-3.5" />
            </div>
          </div>
        </div>
      </div>

      {/* RIGHT table */}
      <div className="bg-white p-4 sm:p-6 border-l border-border h-full flex flex-col overflow-hidden">
        <div className="flex items-center justify-between gap-3 mb-3 flex-wrap">
          <h3 className="text-sm font-semibold">CEO List — USA Technology (11–200 employees)</h3>
          <span className="bg-green-50 text-green-700 border border-green-100 rounded-full px-3 py-1 text-xs font-medium">31,000 leads</span>
        </div>

        <div className="flex-1 overflow-y-auto min-h-0">
          <div className="overflow-x-auto rounded-xl border border-border">
            <table className="w-full text-sm">
              <thead className="bg-gray-50">
                <tr className="text-left">
                  {(enriched
                    ? ["First", "Last", "Company", "Email", "Phone", "Status"]
                    : ["First", "Last", "Company", "URL", "Title", "Industry", "Size"]
                  ).map((h) => (
                    <th key={h} className="text-[10px] font-semibold uppercase text-muted-foreground tracking-wider px-3 py-2 whitespace-nowrap">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {PHASE1_ROWS.slice(0, visibleRows).map((r, i) => (
                  <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-gray-50/40"}>
                    <td className="px-3 py-2.5 border-b border-border whitespace-nowrap">{r[0]}</td>
                    <td className="px-3 py-2.5 border-b border-border whitespace-nowrap">{r[1]}</td>
                    <td className="px-3 py-2.5 border-b border-border whitespace-nowrap">{r[2]}</td>
                    {enriched ? (
                      <>
                        <td className="px-3 py-2.5 border-b border-border whitespace-nowrap text-foreground/80">
                          <span className="inline-block animate-in fade-in" style={{ animationDelay: `${i * 80}ms` }}>{ENRICHED[i].email}</span>
                        </td>
                        <td className="px-3 py-2.5 border-b border-border whitespace-nowrap text-foreground/80">
                          <span className="inline-block animate-in fade-in" style={{ animationDelay: `${i * 80 + 40}ms` }}>{ENRICHED[i].phone}</span>
                        </td>
                        <td className="px-3 py-2.5 border-b border-border whitespace-nowrap">
                          <span className="inline-flex items-center gap-1 bg-green-50 text-green-700 border border-green-100 rounded-full px-2 py-0.5 text-[10px] font-medium">
                            <CheckCircle2 className="w-3 h-3" /> Verified
                          </span>
                        </td>
                      </>
                    ) : (
                      <>
                        <td className="px-3 py-2.5 border-b border-border whitespace-nowrap text-muted-foreground text-xs">{r[3]}</td>
                        <td className="px-3 py-2.5 border-b border-border whitespace-nowrap">{r[4]}</td>
                        <td className="px-3 py-2.5 border-b border-border whitespace-nowrap text-muted-foreground text-xs">{r[5]}</td>
                        <td className="px-3 py-2.5 border-b border-border whitespace-nowrap text-muted-foreground text-xs">{r[6]}</td>
                      </>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="mt-4 flex gap-2 flex-wrap shrink-0">
          <span className="bg-green-50 text-green-700 border border-green-100 rounded-full px-3 py-1 text-xs font-medium">92% email coverage</span>
          <span className="bg-blue-50 text-blue-700 border border-blue-100 rounded-full px-3 py-1 text-xs font-medium">87% mobile coverage</span>
        </div>
      </div>
    </div>
  );
}

function ThinkingDots() {
  return (
    <div className="flex items-center gap-1.5">
      {[0, 150, 300].map((d) => (
        <span key={d} className="w-1.5 h-1.5 rounded-full bg-[#c2410c]/60 animate-bounce" style={{ animationDelay: `${d}ms` }} />
      ))}
    </div>
  );
}
