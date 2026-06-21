import { useEffect, useState } from "react";
import { Zap, Database, Upload, ArrowRight, Mail, Phone, Layers, Clock } from "lucide-react";

type Endpoint = "email" | "phone" | "bulk" | "jobs";

const ENDPOINTS: {
  id: Endpoint;
  method: string;
  path: string;
  label: string;
  icon: typeof Mail;
  plain: { send: string; get: string; cost: string };
}[] = [
  {
    id: "email",
    method: "POST",
    path: "/v2/enrich/email",
    label: "Find a work email",
    icon: Mail,
    plain: {
      send: "A person's name + their company (domain or LinkedIn)",
      get: "Their verified work email, ready to send to",
      cost: "1 credit · only charged when we find a match",
    },
  },
  {
    id: "phone",
    method: "POST",
    path: "/v2/enrich/phone",
    label: "Find a mobile number",
    icon: Phone,
    plain: {
      send: "A LinkedIn URL, email, or name + company",
      get: "Their direct mobile number (not the office switchboard)",
      cost: "20 credits · only charged when we find a match",
    },
  },
  {
    id: "bulk",
    method: "POST",
    path: "/v2/enrich/bulk",
    label: "Enrich a list (up to 50,000 rows)",
    icon: Layers,
    plain: {
      send: "An array of leads (CSV-style rows) + an optional webhook URL",
      get: "A job_id immediately — we process in the background",
      cost: "Same per-match pricing as single calls",
    },
  },
  {
    id: "jobs",
    method: "GET",
    path: "/v2/jobs/{job_id}",
    label: "Check on a bulk job",
    icon: Clock,
    plain: {
      send: "The job_id from your bulk request",
      get: "Status, progress, and a download URL when ready",
      cost: "Free — status checks never cost credits",
    },
  },
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

function escapeHtml(s: string) {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

// Tokenise into safe HTML — no nested replacements, so no leaked style strings.
function highlightJson(src: string) {
  const out: string[] = [];
  const re = /("(?:\\.|[^"\\])*")|\b(true|false|null)\b|\b(\d+\.\d+|\d+)\b/g;
  let last = 0;
  let m: RegExpExecArray | null;
  while ((m = re.exec(src)) !== null) {
    out.push(escapeHtml(src.slice(last, m.index)));
    if (m[1]) out.push(`<span style="color:#86efac">${escapeHtml(m[1])}</span>`);
    else if (m[2]) out.push(`<span style="color:#c4b5fd">${m[2]}</span>`);
    else if (m[3]) out.push(`<span style="color:#fdba74">${m[3]}</span>`);
    last = re.lastIndex;
  }
  out.push(escapeHtml(src.slice(last)));
  return out.join("");
}

function highlightCurl(src: string) {
  const out: string[] = [];
  const re = /("(?:\\.|[^"\\])*")|(\bcurl\b|-X|-H|-d)|(POST|GET)/g;
  let last = 0;
  let m: RegExpExecArray | null;
  while ((m = re.exec(src)) !== null) {
    out.push(escapeHtml(src.slice(last, m.index)));
    if (m[1]) out.push(`<span style="color:#86efac">${escapeHtml(m[1])}</span>`);
    else if (m[2]) out.push(`<span style="color:#fbbf24">${m[2]}</span>`);
    else if (m[3]) out.push(`<span style="color:#60a5fa">${m[3]}</span>`);
    last = re.lastIndex;
  }
  out.push(escapeHtml(src.slice(last)));
  return out.join("");
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

  const current = ENDPOINTS.find((e) => e.id === endpoint)!;
  const Icon = current.icon;

  return (
    <div className="h-full flex flex-col overflow-hidden">
      <div className="flex-1 grid lg:grid-cols-[300px_1fr] gap-0 overflow-hidden">
        {/* LEFT — endpoint picker with plain-English labels */}
        <div className="bg-gray-950 p-6 text-white">
          <div className="flex items-center gap-2 text-xs">
            <span className="font-mono text-gray-400">Scalelist REST API · v2</span>
            <span className="w-1.5 h-1.5 rounded-full bg-green-400 ml-auto" />
            <span className="text-green-400">Live</span>
          </div>

          <div className="flex flex-col gap-2 mt-4">
            {ENDPOINTS.map((e) => {
              const EIcon = e.icon;
              const active = endpoint === e.id;
              return (
                <button
                  key={e.id}
                  onClick={() => setEndpoint(e.id)}
                  className={`text-left rounded-xl px-3 py-2.5 transition ${
                    active ? "bg-blue-600 text-white" : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                  }`}
                >
                  <div className="flex items-center gap-2 text-sm font-semibold">
                    <EIcon className="w-4 h-4" />
                    {e.label}
                  </div>
                  <div className="text-[10px] font-mono opacity-70 mt-1">
                    {e.method} {e.path}
                  </div>
                </button>
              );
            })}
          </div>

          <div className="grid grid-cols-2 gap-2 mt-6">
            {[
              { icon: Zap, label: "Credits only on match" },
              { icon: Database, label: "REST architecture" },
              { icon: Upload, label: "Bulk job queues" },
              { icon: ArrowRight, label: "Webhook callbacks" },
            ].map(({ icon: I, label }) => (
              <div key={label} className="bg-gray-800 rounded-xl p-3 text-xs text-gray-300 flex flex-col gap-1.5">
                <I className="w-3.5 h-3.5 text-blue-400" />
                {label}
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT */}
        <div className="bg-gray-900 font-mono text-xs flex flex-col">
          {/* Plain-English explainer */}
          <div className="bg-gradient-to-br from-blue-950/60 to-gray-900 border-b border-gray-800 p-5 font-sans">
            <div className="flex items-center gap-2 mb-3">
              <Icon className="w-4 h-4 text-blue-400" />
              <span className="text-white text-sm font-semibold">{current.label}</span>
            </div>
            <div className="grid sm:grid-cols-3 gap-3 text-xs">
              <PlainCard label="You send" value={current.plain.send} accent="text-blue-300" />
              <PlainCard label="You get back" value={current.plain.get} accent="text-green-300" />
              <PlainCard label="Cost" value={current.plain.cost} accent="text-amber-300" />
            </div>
          </div>

          <div className="border-b border-gray-800 p-5">
            <div className="flex items-center justify-between mb-3">
              <span className="text-gray-400 text-[11px] uppercase tracking-wider">Request</span>
              <div className="flex items-center gap-2 text-[11px] text-gray-500">
                <span className="text-white">cURL</span>
                <span>Python</span>
                <span>Node</span>
              </div>
            </div>
            <pre
              className="overflow-x-auto leading-relaxed text-gray-300"
              dangerouslySetInnerHTML={{ __html: highlightCurl(REQUESTS[endpoint]) }}
            />
          </div>

          <div className="p-5 flex-1 relative">
            <div className="flex items-center justify-between mb-3">
              <span className="text-gray-400 text-[11px] uppercase tracking-wider">Response</span>
              <span className="bg-green-900 text-green-400 text-[11px] rounded px-2 py-0.5">200 OK</span>
            </div>
            <pre
              className="overflow-x-auto leading-relaxed text-gray-300 whitespace-pre-wrap"
              dangerouslySetInnerHTML={{ __html: highlightJson(typed) + '<span class="cursor-blink">▍</span>' }}
            />
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

function PlainCard({ label, value, accent }: { label: string; value: string; accent: string }) {
  return (
    <div className="bg-gray-900/60 border border-gray-800 rounded-lg p-3">
      <div className={`text-[10px] uppercase tracking-wider font-semibold ${accent}`}>{label}</div>
      <div className="text-gray-200 mt-1 leading-snug">{value}</div>
    </div>
  );
}
