import { useEffect, useState } from "react";
import { CheckCircle2, Code2, Loader2 } from "lucide-react";
import instantlyLogo from "@/assets/logos/instantly.png";
import lemlistLogo from "@/assets/logos/lemlist.png";
import aircallLogo from "@/assets/logos/aircall.png";
import hubspotLogo from "@/assets/logos/hubspot.png";

const DESTINATIONS = [
  { name: "Instantly", kind: "Email sequencer", detail: "12,400 leads pushed to “US SaaS · Series A–B” campaign", logo: instantlyLogo },
  { name: "lemlist", kind: "Email sequencer", detail: "3 sequences ready, 1 verified email per lead", logo: lemlistLogo },
  { name: "Aircall", kind: "Cold-calling dialer", detail: "10,800 direct mobiles queued for the SDR dial list", logo: aircallLogo },
  { name: "HubSpot", kind: "CRM", detail: "Contacts and companies deduped, 0 duplicates created", logo: hubspotLogo },
];

export function TabApi() {
  const [done, setDone] = useState(0);
  useEffect(() => {
    if (done >= DESTINATIONS.length) {
      const reset = setTimeout(() => setDone(0), 4500);
      return () => clearTimeout(reset);
    }
    const id = setTimeout(() => setDone((d) => d + 1), 900);
    return () => clearTimeout(id);
  }, [done]);

  return (
    <div className="h-full flex flex-col justify-center p-5 sm:p-7 overflow-y-auto">
      <div className="text-center max-w-2xl mx-auto">
        <h3 className="text-lg sm:text-2xl font-extrabold tracking-tight">
          Send your enriched leads straight into your outreach tools.
        </h3>
        <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
          Scalelist hands the list off in one click. You keep sequencing, calling, and reporting where you already work.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 gap-3 sm:gap-4 mt-6 max-w-4xl mx-auto w-full">
        {DESTINATIONS.map((d, i) => {
          const synced = i < done;
          return (
            <div
              key={d.name}
              className="flex items-start gap-3 rounded-2xl border border-border bg-white p-4 shadow-sm"
            >
              <span className="shrink-0 w-10 h-10 rounded-xl border border-border bg-white flex items-center justify-center overflow-hidden">
                <img src={d.logo} alt={`${d.name} logo`} className="w-full h-full object-contain p-1" />
              </span>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-semibold text-sm">{d.name}</span>
                  <span className="text-[11px] text-muted-foreground">{d.kind}</span>
                  <span
                    className={`ml-auto inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[11px] font-semibold border ${
                      synced
                        ? "bg-green-50 text-green-700 border-green-200"
                        : "bg-gray-50 text-muted-foreground border-border"
                    }`}
                  >
                    {synced ? <CheckCircle2 className="w-3 h-3" /> : <Loader2 className="w-3 h-3 animate-spin" />}
                    {synced ? "Synced" : "Queued"}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground mt-1.5 leading-relaxed">{d.detail}</p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-6 max-w-4xl mx-auto w-full">
        <div className="rounded-2xl border border-border bg-gray-50 p-4 flex items-center gap-3 flex-wrap">
          <Code2 className="w-4 h-4 text-muted-foreground shrink-0" />
          <span className="text-sm text-muted-foreground">Or push programmatically via API or MCP.</span>
          <code className="text-[11px] font-mono bg-white border border-border rounded-lg px-2.5 py-1 text-foreground">
            POST /v1/lists/12400/push
          </code>
        </div>
      </div>
    </div>
  );
}
