import { useEffect, useState } from "react";
import { CheckCircle2 } from "lucide-react";

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

function useTypewriter(text: string, active: boolean, speed = 15) {
  const [out, setOut] = useState("");
  useEffect(() => {
    if (!active) { setOut(text); return; }
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
  // Steps: 0 user1, 1 thinking1, 2 ai1, 3 user2, 4 thinking2, 5 ai2
  useEffect(() => {
    const timings = [1000, 1200, 5800, 2000, 1200, 4800];
    const id = setTimeout(() => setStep((s) => (s + 1) % 6), timings[step]);
    return () => clearTimeout(id);
  }, [step]);

  const ai1Text = "I found 31,000 CEOs matching your criteria. Here's a preview of your list:";
  const ai2Text = "Done. I enriched 8,500 CEOs in California for you:";
  const ai1 = useTypewriter(ai1Text, step === 2);
  const ai2 = useTypewriter(ai2Text, step === 5);

  const enriched = step >= 5;
  const visibleRows = step >= 5 ? 8 : step >= 2 ? 8 : 0;

  return (
    <div className="min-h-[520px] grid lg:grid-cols-2 gap-0">
      {/* LEFT chat */}
      <div className="bg-[#0a0a0a] p-6 flex flex-col">
        <div className="flex items-center gap-2 pb-4 border-b border-white/10">
          <span className="text-gray-400 text-xs">Scalelist MCP + Claude</span>
          <span className="ml-2 w-2 h-2 rounded-full bg-green-400" />
          <span className="text-green-400 text-xs">Connected</span>
        </div>

        <div className="flex-1 flex flex-col gap-4 py-5 overflow-hidden">
          <Message role="user" avatar="A" avatarBg="bg-primary" show={step >= 0}>
            Find me the CEOs of technology companies in the United States with 11 to 200 employees.
          </Message>

          {step === 1 && <ThinkingDots />}

          {step >= 2 && (
            <Message role="ai" avatar="S" avatarBg="bg-white text-black" show>
              {step === 2 ? ai1 : ai1Text}
              {step >= 2 && (
                <div className="mt-3 rounded-lg overflow-hidden border border-white/10 text-[10px]">
                  <div className="grid grid-cols-3 bg-white/5 px-2 py-1 text-white/60 uppercase tracking-wider">
                    <span>Name</span><span>Company</span><span>Title</span>
                  </div>
                  {PHASE1_ROWS.slice(0, 3).map((r, i) => (
                    <div key={i} className="grid grid-cols-3 px-2 py-1 border-t border-white/5 text-white/80">
                      <span>{r[0]} {r[1]}</span><span>{r[2]}</span><span>{r[4]}</span>
                    </div>
                  ))}
                </div>
              )}
            </Message>
          )}

          {step >= 3 && (
            <Message role="user" avatar="A" avatarBg="bg-primary" show>
              Thanks. Now enrich only the CEOs in California with emails and mobile numbers.
            </Message>
          )}

          {step === 4 && <ThinkingDots />}

          {step >= 5 && (
            <Message role="ai" avatar="S" avatarBg="bg-white text-black" show>
              {step === 5 ? ai2 : ai2Text}
              <div className="mt-3 space-y-1.5 text-xs">
                <div className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-green-400" /> 7,820 emails found (92%)</div>
                <div className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-green-400" /> 7,395 mobile numbers found (87%)</div>
                <div className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-green-400" /> Your list is ready to export or push to your CRM.</div>
              </div>
            </Message>
          )}
        </div>

        <div className="mt-auto bg-white/5 rounded-xl border border-white/10 px-4 py-3 flex items-center text-sm text-gray-500">
          <span>Ask Claude to find your next leads...</span>
          <span className="ml-1 w-1.5 h-4 bg-white/70 cursor-blink" />
        </div>
      </div>

      {/* RIGHT table */}
      <div className="bg-white p-4 sm:p-6 border-l border-border">
        <div className="flex items-center justify-between gap-3 mb-3 flex-wrap">
          <h3 className="text-sm font-semibold">CEO List — USA Technology (11-200 employees)</h3>
          <span className="bg-green-50 text-green-700 border border-green-100 rounded-full px-3 py-1 text-xs font-medium">31,000 leads</span>
        </div>

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

        <div className="mt-4 flex gap-2 flex-wrap">
          <span className="bg-green-50 text-green-700 border border-green-100 rounded-full px-3 py-1 text-xs font-medium">92% email coverage</span>
          <span className="bg-blue-50 text-blue-700 border border-blue-100 rounded-full px-3 py-1 text-xs font-medium">87% mobile coverage</span>
        </div>
      </div>
    </div>
  );
}

function Message({ role, avatar, avatarBg, show, children }: { role: "user" | "ai"; avatar: string; avatarBg: string; show: boolean; children: React.ReactNode }) {
  if (!show) return null;
  return (
    <div className="flex items-start gap-3 fade-up">
      <div className={`flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${avatarBg} text-white`}>
        {avatar}
      </div>
      <div className={`max-w-[85%] rounded-2xl rounded-tl-sm p-3.5 text-sm text-white ${role === "user" ? "bg-gray-800" : "bg-blue-600"}`}>
        {children}
      </div>
    </div>
  );
}

function ThinkingDots() {
  return (
    <div className="flex items-center gap-1.5 pl-10">
      {[0, 150, 300].map((d) => (
        <span key={d} className="w-2 h-2 rounded-full bg-gray-500 animate-bounce" style={{ animationDelay: `${d}ms` }} />
      ))}
    </div>
  );
}
