import { useEffect, useState } from "react";
import { CheckCircle2, Loader2 } from "lucide-react";

const LEADS = [
  { name: "Sarah Chen", company: "Northwind Labs", email: "sarah.chen@northwindlabs.io", phone: "+1 (415) 555-0192" },
  { name: "Marcus Patel", company: "Beacon Analytics", email: "m.patel@beaconanalytics.com", phone: "+1 (628) 555-0144" },
  { name: "Elena Vega", company: "Strata Cloud", email: "elena@stratacloud.io", phone: "+1 (415) 555-0178" },
  { name: "David Kim", company: "Pulse Metrics", email: "david.kim@pulsemetrics.com", phone: "+1 (650) 555-0102" },
  { name: "Priya Shah", company: "Cipher Works", email: "priya@cipherworks.com", phone: "+1 (415) 555-0166" },
  { name: "Tom Becker", company: "Orbit Sync", email: "tom.becker@orbitsync.com", phone: "+1 (510) 555-0119" },
  { name: "Maya Ortiz", company: "Lumen Data", email: "maya.ortiz@lumendata.co", phone: "+1 (415) 555-0188" },
  { name: "Jonah Reed", company: "Cadence HQ", email: "jonah@cadencehq.com", phone: "+1 (628) 555-0133" },
];

export function TabCsv() {
  const [done, setDone] = useState(0);

  useEffect(() => {
    if (done >= LEADS.length) {
      const reset = setTimeout(() => setDone(0), 4000);
      return () => clearTimeout(reset);
    }
    const id = setTimeout(() => setDone((d) => d + 1), 450);
    return () => clearTimeout(id);
  }, [done]);

  return (
    <div className="h-full flex flex-col p-5 sm:p-7 overflow-hidden">
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <h3 className="text-base sm:text-lg font-semibold">Your list is being enriched automatically</h3>
          <p className="text-sm text-muted-foreground mt-1">
            Verified work emails and direct mobiles, added to the 12,400 leads you just found.
          </p>
        </div>
        <div className="flex gap-2 flex-wrap">
          <span className="rounded-full bg-green-50 text-green-700 border border-green-100 px-3 py-1.5 text-xs font-semibold">
            92% email coverage
          </span>
          <span className="rounded-full bg-blue-50 text-blue-700 border border-blue-100 px-3 py-1.5 text-xs font-semibold">
            87% mobile coverage
          </span>
        </div>
      </div>

      <div className="flex-1 min-h-0 mt-4 overflow-y-auto">
        <div className="overflow-x-auto rounded-xl border border-border">
          <table className="w-full text-sm">
            <thead className="bg-gray-50">
              <tr className="text-left">
                {["Name", "Company", "Verified email", "Verified phone", "Status"].map((h) => (
                  <th
                    key={h}
                    className="text-[10px] font-semibold uppercase text-muted-foreground tracking-wider px-3 py-2.5 whitespace-nowrap"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {LEADS.map((l, i) => {
                const ready = i < done;
                return (
                  <tr key={l.email} className={i % 2 === 0 ? "bg-white" : "bg-gray-50/40"}>
                    <td className="px-3 py-3 border-t border-border whitespace-nowrap font-medium">{l.name}</td>
                    <td className="px-3 py-3 border-t border-border whitespace-nowrap text-muted-foreground">
                      {l.company}
                    </td>
                    <td className="px-3 py-3 border-t border-border whitespace-nowrap">
                      {ready ? (
                        <span className="fade-up inline-block">{l.email}</span>
                      ) : (
                        <span className="inline-block h-3 w-40 rounded bg-gray-100 animate-pulse" />
                      )}
                    </td>
                    <td className="px-3 py-3 border-t border-border whitespace-nowrap">
                      {ready ? (
                        <span className="fade-up inline-block">{l.phone}</span>
                      ) : (
                        <span className="inline-block h-3 w-28 rounded bg-gray-100 animate-pulse" />
                      )}
                    </td>
                    <td className="px-3 py-3 border-t border-border whitespace-nowrap">
                      {ready ? (
                        <span className="inline-flex items-center gap-1 rounded-full bg-green-50 text-green-700 border border-green-200 px-2.5 py-0.5 text-[11px] font-semibold">
                          <CheckCircle2 className="w-3 h-3" /> Verified
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-[11px] text-muted-foreground">
                          <Loader2 className="w-3 h-3 animate-spin" /> Enriching
                        </span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between gap-3 flex-wrap">
        <div className="flex gap-2 flex-wrap text-[11px]">
          <span className="rounded-full border border-border bg-white px-3 py-1.5 font-medium">
            Verified email · 1 credit
          </span>
          <span className="rounded-full border border-border bg-white px-3 py-1.5 font-medium">
            Direct mobile · 20 credits
          </span>
          <span className="rounded-full border border-border bg-white px-3 py-1.5 font-medium text-muted-foreground">
            No result · 0 credits
          </span>
        </div>
        <span className="text-xs text-muted-foreground">
          {Math.min(done, LEADS.length)} of {LEADS.length} shown · under 5% bounce rate
        </span>
      </div>
    </div>
  );
}
