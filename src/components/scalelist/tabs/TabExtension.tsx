import { useEffect, useState } from "react";
import { CheckCircle2, Globe, Zap, Plus } from "lucide-react";

const CONTACTS = [
  { name: "Elizabeth Kelly", role: "Technical Director", email: "elizabeth@anthropic.com", status: "valid" },
  { name: "Ryan Libster", role: "Sales Director", email: "libster@anthropic.com", status: "valid" },
  { name: "Cat De Jong", role: "Dir. Applied AI", email: "cat@anthropic.com", status: "valid" },
  { name: "Mike Krieger", role: "Chief Product Officer", email: "mkrieger@anthropic.com", status: "valid" },
  { name: "Corry Wang", role: "Head of Computing", email: "corry@anthropic.com", status: "valid" },
  { name: "Sydney M.", role: "Growth", email: "sydney@anthropic.com", status: "valid" },
];

export function TabExtension() {
  const [step, setStep] = useState(0);
  useEffect(() => {
    const timings = [1000, 1500, 3500, 2500];
    const id = setTimeout(() => setStep((s) => (s + 1) % 4), timings[step]);
    return () => clearTimeout(id);
  }, [step]);

  return (
    <div className="h-full overflow-y-auto p-6">
      <div className="flex justify-center mb-4">
        <span className="inline-block text-[10px] font-semibold uppercase tracking-widest text-primary bg-primary/10 border border-primary/30 rounded-full px-3 py-1">
          Works Everywhere Online
        </span>
      </div>

      <div className="bg-gray-100 rounded-2xl p-4">
        {/* Browser bar */}
        <div className="bg-white rounded-xl p-2.5 mb-3 flex items-center gap-3 shadow-sm border border-border">
          <div className="flex gap-1.5">
            <span className="w-3 h-3 rounded-full bg-red-500" />
            <span className="w-3 h-3 rounded-full bg-yellow-500" />
            <span className="w-3 h-3 rounded-full bg-green-500" />
          </div>
          <div className="flex-1 bg-gray-100 rounded-full px-4 py-1.5 text-sm text-gray-400">anthropic.com</div>
          <div className="flex items-center gap-1.5">
            <span className="w-5 h-5 rounded bg-gray-200" />
            <span className="w-5 h-5 rounded bg-gray-200" />
            <span className="w-5 h-5 rounded bg-gray-200" />
            <span className="w-6 h-6 rounded bg-primary text-white flex items-center justify-center text-[10px] font-bold ring-2 ring-blue-400">S</span>
          </div>
        </div>

        {/* Viewport */}
        <div className="bg-white rounded-xl border border-border overflow-hidden min-h-[400px] relative">
          <div className="bg-white h-10 border-b border-gray-200 w-full" />
          <div className="bg-gradient-to-r from-gray-100 to-gray-50 h-32 mx-6 mt-4 rounded-xl" />
          <div className="mx-6 mt-3 h-3 rounded bg-gray-200/60 w-3/4" />
          <div className="mx-6 mt-2 h-3 rounded bg-gray-200/60 w-1/2" />
          <div className="mx-6 mt-2 h-3 rounded bg-gray-200/60 w-2/3" />

          {/* Popup */}
          <div className="absolute top-4 right-4 bg-white rounded-xl shadow-2xl border border-border w-72 p-4 z-10">
            {step === 0 && (
              <div className="fade-up">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded bg-black text-white text-xs flex items-center justify-center font-bold">A</span>
                  <span className="text-sm font-semibold">Anthropic</span>
                </div>
                <select className="mt-3 bg-gray-50 border border-border rounded-lg px-3 py-2 text-sm w-full">
                  <option>All Departments</option>
                </select>
                <p className="text-xs text-muted-foreground mt-2">Find up to 10 emails</p>
                <button className="mt-3 w-full rounded-full bg-primary text-primary-foreground px-4 py-2 text-sm font-semibold">Find Emails</button>
              </div>
            )}
            {step === 1 && (
              <div className="flex flex-col items-center py-6 fade-up">
                <span className="w-6 h-6 border-2 border-blue-200 border-t-primary rounded-full animate-spin" />
                <span className="text-sm text-muted-foreground mt-3">Searching for contacts...</span>
              </div>
            )}
            {step >= 2 && (
              <div className="fade-up">
                <div className="flex justify-between text-[10px] text-gray-400">
                  <span>Arnaud Renoux</span><span>Credits: 4,853</span>
                </div>
                <div className="text-sm font-semibold mt-1">Anthropic</div>
                <div className="text-xs text-muted-foreground">7 emails found — 7 credits</div>

                {step === 3 && (
                  <label className="flex items-center gap-2 mt-2 text-xs font-medium">
                    <span className="w-3.5 h-3.5 rounded bg-primary flex items-center justify-center">
                      <CheckCircle2 className="w-2.5 h-2.5 text-white" />
                    </span>
                    Select All
                  </label>
                )}

                <div className="mt-2 max-h-56 overflow-hidden">
                  {CONTACTS.map((c, i) => (
                    <div
                      key={c.email}
                      className="py-1.5 border-b border-gray-100 flex items-center gap-2 slide-in-right"
                      style={{ animationDelay: `${i * 150}ms` }}
                    >
                      <div className="flex-1 min-w-0">
                        <div className="text-[11px] font-semibold truncate">{c.name}</div>
                        <div className="text-[9px] text-gray-400 truncate">{c.role}</div>
                        <div className="text-[9px] text-gray-500 truncate">{c.email}</div>
                      </div>
                      <span className={`text-[9px] rounded-full px-1.5 py-0.5 font-medium ${c.status === "valid" ? "bg-green-50 text-green-700" : "bg-orange-50 text-orange-700"}`}>
                        {c.status === "valid" ? "Valid" : "Risky"}
                      </span>
                      <button className="w-5 h-5 rounded bg-gray-100 flex items-center justify-center"><Plus className="w-3 h-3" /></button>
                    </div>
                  ))}
                </div>

                {step === 3 && (
                  <button className="mt-3 w-full rounded-full bg-primary text-primary-foreground px-4 py-2 text-xs font-semibold animate-pulse">
                    Save 6 contacts to Scalelist
                  </button>
                )}
              </div>
            )}
          </div>

          {step === 3 && (
            <div className="absolute bottom-4 right-4 bg-green-600 text-white rounded-xl px-4 py-3 shadow-lg text-sm flex items-center gap-2 fade-up">
              <CheckCircle2 className="w-4 h-4" /> 6 contacts saved to Scalelist
            </div>
          )}
        </div>
      </div>

      <div className="flex gap-3 justify-center flex-wrap py-4 border-t border-border mt-6">
        <Chip icon={<Globe className="w-3.5 h-3.5 text-blue-500" />} text="Turn any website into a lead list" />
        <Chip icon={<CheckCircle2 className="w-3.5 h-3.5 text-green-500" />} text="Works on LinkedIn, company sites, anywhere" />
        <Chip icon={<Zap className="w-3.5 h-3.5 text-purple-500" />} text="Verified emails + mobiles in seconds" />
      </div>
    </div>
  );
}

function Chip({ icon, text }: { icon: React.ReactNode; text: string }) {
  return (
    <span className="bg-gray-50 border border-border rounded-full px-4 py-2 text-sm text-muted-foreground flex items-center gap-2">
      {icon}{text}
    </span>
  );
}
