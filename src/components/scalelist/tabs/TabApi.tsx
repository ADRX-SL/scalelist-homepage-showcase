import { useEffect, useState } from "react";
import { Zap, Database, Upload, ArrowRight } from "lucide-react";

type Endpoint = "email" | "phone" | "bulk" | "jobs";

const ENDPOINTS: { id: Endpoint; method: string; path: string }[] = [
  { id: "email", method: "POST", path: "/v2/enrich/email" },
  { id: "phone", method: "POST", path: "/v2/enrich/phone" },
  { id: "bulk", method: "POST", path: "/v2/enrich/bulk" },
  { id: "jobs", method: "GET", path: "/v2/jobs/{job_id}" },
];

const REQUESTS: Record<Endpoint, string> = {
  email: `curl -X POST https://api.scalelist.com/v2/enrich/email \\
  -H "x-api-key: sk_live_••••••••••••••••" \\
  -H "Content-Type: application/json" \\
  -d '{
    "first_name": "Sarah",
    "last_name": "Chen",
    "company_domain": "stripe.com",
    "linkedin_url": "linkedin.com/in/sarahchen"
  }'`,
  phone: `curl -X POST https://api.scalelist.com/v2/enrich/phone \\
  -H "x-api-key: sk_live_••••••••••••••••" \\
  -d '{
    "linkedin_url": "linkedin.com/in/sarahchen",
    "email": "sarah.chen@stripe.com"
  }'`,
  bulk: `curl -X POST https://api.scalelist.com/v2/enrich/bulk \\
  -H "x-api-key: sk_live_••••••••••••••••" \\
  -d '{
    "rows": [...],
    "callback_url": "https://yourapp.com/webhook"
  }'`,
  jobs: `curl https://api.scalelist.com/v2/jobs/job_8f3a921c \\
  -H "x-api-key: sk_live_••••••••••••••••"`,
};

const RESPONSES: Record<Endpoint, string> = {
  email: `{
  "status": "found",
  "email": "sarah.chen@stripe.com",
  "confidence": 0.97,
  "validation": {
    "is_valid": true,
    "is_deliverable": true,
    "catch_all": false,
    "bounce_risk": "very_low"
  },
  "credits_used": 1,
  "data_refreshed": "2026-06-18"
}`,
  phone: `{
  "status": "found",
  "phone": "+1 (415) 555-0847",
  "type": "mobile",
  "carrier": "Verizon Wireless",
  "country": "US",
  "credits_used": 20,
  "data_refreshed": "2026-06-12"
}`,
  bulk: `{
  "status": "queued",
  "job_id": "job_8f3a921c",
  "rows_submitted": 12450,
  "estimated_completion": "2026-06-21T14:30:00Z"
}`,
  jobs: `{
  "job_id": "job_8f3a921c",
  "status": "completed",
  "rows_processed": 12450,
  "emails_found": 10832,
  "phones_found": 9264,
  "credits_used": 196112,
  "download_url": "https://api.scalelist.com/v2/jobs/job_8f3a921c/download"
}`,
};

function highlight(line: string) {
  // very lightweight token coloring
  return line
    .replace(/("[^"]*")/g, '<span style="color:#22c55e">$1</span>')
    .replace(/\b(true|false|null)\b/g, '<span style="color:#a855f7">$1</span>')
    .replace(/\b(\d+\.\d+|\d+)\b/g, '<span style="color:#fb923c">$1</span>');
}

function highlightCurl(line: string) {
  return line
    .replace(/(curl|-X|-H|-d)/g, '<span style="color:#eab308">$1</span>')
    .replace(/("[^"]*")/g, '<span style="color:#22c55e">$1</span>');
}

export function TabApi() {
  const [endpoint, setEndpoint] = useState<Endpoint>("email");
  const [typed, setTyped] = useState("");

  useEffect(() => {
    const text = RESPONSES[endpoint];
    setTyped("");
    let i = 0;
    const id = setInterval(() => {
      i += 3;
      setTyped(text.slice(0, i));
      if (i >= text.length) clearInterval(id);
    }, 20);
    return () => clearInterval(id);
  }, [endpoint]);

  return (
    <div>
      <div className="min-h-[520px] grid lg:grid-cols-[280px_1fr] gap-0">
        {/* LEFT */}
        <div className="bg-gray-950 p-6 text-white">
          <div className="flex items-center gap-2 text-xs">
            <span className="font-mono text-gray-400">Scalelist REST API · v2</span>
            <span className="w-1.5 h-1.5 rounded-full bg-green-400 ml-auto" />
            <span className="text-green-400">Live</span>
          </div>

          <div className="flex flex-col gap-2 mt-4">
            {ENDPOINTS.map((e) => (
              <button
                key={e.id}
                onClick={() => setEndpoint(e.id)}
                className={`text-left rounded-xl px-3 py-2.5 text-xs font-mono transition ${
                  endpoint === e.id ? "bg-blue-600 text-white" : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                }`}
              >
                <span className="opacity-70">{e.method}</span> {e.path}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-2 gap-2 mt-6">
            {[
              { icon: Zap, label: "Credits only on match" },
              { icon: Database, label: "REST architecture" },
              { icon: Upload, label: "Bulk job queues" },
              { icon: ArrowRight, label: "Webhook callbacks" },
            ].map(({ icon: Icon, label }) => (
              <div key={label} className="bg-gray-800 rounded-xl p-3 text-xs text-gray-300 flex flex-col gap-1.5">
                <Icon className="w-3.5 h-3.5 text-blue-400" />
                {label}
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT */}
        <div className="bg-gray-900 font-mono text-xs flex flex-col">
          <div className="border-b border-gray-700 p-5">
            <div className="flex items-center justify-between mb-3">
              <span className="text-gray-400 text-[11px] uppercase tracking-wider">Request</span>
              <div className="flex items-center gap-2 text-[11px] text-gray-500">
                <span className="text-white">cURL</span><span>Python</span><span>Node</span>
              </div>
            </div>
            <pre className="overflow-x-auto leading-relaxed text-gray-300" dangerouslySetInnerHTML={{
              __html: REQUESTS[endpoint].split("\n").map(highlightCurl).join("\n"),
            }} />
          </div>

          <div className="p-5 flex-1 relative">
            <div className="flex items-center justify-between mb-3">
              <span className="text-gray-400 text-[11px] uppercase tracking-wider">Response</span>
              <span className="bg-green-900 text-green-400 text-[11px] rounded px-2 py-0.5">200 OK</span>
            </div>
            <pre className="overflow-x-auto leading-relaxed text-gray-300 whitespace-pre-wrap" dangerouslySetInnerHTML={{
              __html: highlight(typed) + '<span class="cursor-blink">▍</span>',
            }} />
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-4 p-6 bg-gray-50 border-t border-border">
        {[
          { t: "Find emails", d: "Full name + company domain or name → verified work email. 1 credit per match." },
          { t: "Find mobile numbers", d: "LinkedIn URL, name, email, or company → direct mobile. 20 credits per match." },
          { t: "Bulk enrichment", d: "Submit up to 50,000 rows. Poll via job_id or receive via webhook. Credits only on match." },
        ].map((c) => (
          <div key={c.t} className="bg-white rounded-xl p-4 shadow-sm border border-border text-sm">
            <div className="font-semibold text-foreground mb-1">{c.t}</div>
            <div className="text-muted-foreground text-xs leading-relaxed">{c.d}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
