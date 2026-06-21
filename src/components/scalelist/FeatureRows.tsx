import { CheckCircle2, Mail, Phone } from "lucide-react";

const ROWS = [
  {
    badge: { text: "Email & Mobile Data", cls: "bg-blue-50 text-blue-700 border-blue-100" },
    h2: "Find up to 95% of your leads' emails and mobiles.",
    body: "Scalelist verifies every professional email and mobile number before it reaches you. Up to 95% coverage worldwide, under 5% bounce rate, weekly-refreshed data. You pay only when we find a match.",
    links: [
      { label: "Email Finder", href: "https://scalelist.com/free-email-finder/" },
      { label: "Mobile Number Finder", href: "https://scalelist.com/lead-mobile-finder/" },
    ],
    visual: <VisualLeadTable />,
  },
  {
    badge: { text: "Works Everywhere", cls: "bg-purple-50 text-purple-700 border-purple-100" },
    h2: "Enrich leads from LinkedIn, CSVs, CRMs, and any website.",
    body: "Use the Scalelist Chrome Extension on any company page or LinkedIn profile. Upload a CSV or connect your CRM. Find contacts by domain. Build lists right inside Claude or ChatGPT. Every workflow, covered.",
    links: [
      { label: "Chrome Extension", href: "https://scalelist.com/extension/" },
      { label: "Integrations", href: "https://scalelist.com/integrations/" },
    ],
    visual: <VisualExtension />,
  },
  {
    badge: { text: "Data Quality", cls: "bg-green-50 text-green-700 border-green-100" },
    h2: "Verified data that actually reaches the inbox.",
    body: "Every email is triple-checked: syntax, MX records, and SMTP validation. Every mobile is carrier-verified. GDPR compliant. Weekly refreshes mean your CRM stays clean without lifting a finger.",
    links: [
      { label: "Email Verifier", href: "https://scalelist.com/email-verifier/" },
      { label: "Monitoring", href: "https://scalelist.com/monitoring/" },
    ],
    visual: <VisualVerifier />,
  },
  {
    badge: { text: "Integrations", cls: "bg-orange-50 text-orange-700 border-orange-100" },
    h2: "Integrate with any system, AI tool, or workflow.",
    body: "Connect Scalelist to your CRM, sequencing tool, or AI agent in minutes. Salesforce, HubSpot, Instantly, lemlist, Clay, n8n, Zapier — and any tool via REST API. Push enriched contacts wherever they need to go.",
    links: [
      { label: "See all integrations", href: "https://scalelist.com/integrations/" },
      { label: "API docs", href: "https://app.scalelist.com/docs" },
    ],
    visual: <VisualIntegrations />,
  },
];

export function FeatureRows() {
  return (
    <section>
      {ROWS.map((row, i) => {
        const reverse = i % 2 === 1;
        return (
          <div key={i} className="py-20 md:py-28 border-b border-border last:border-b-0">
            <div className={`max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 lg:gap-16 items-center ${reverse ? "lg:[&>*:first-child]:order-2" : ""}`}>
              <div>
                <span className={`inline-block text-xs font-semibold uppercase tracking-widest border rounded-full px-3 py-1 ${row.badge.cls}`}>
                  {row.badge.text}
                </span>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight mt-4 leading-tight">{row.h2}</h2>
                <p className="text-lg text-muted-foreground leading-relaxed mt-5">{row.body}</p>
                <div className="flex gap-5 mt-6 flex-wrap">
                  {row.links.map((l) => (
                    <a key={l.label} href={l.href} className="text-sm font-semibold text-primary hover:underline inline-flex items-center gap-1">
                      {l.label} →
                    </a>
                  ))}
                </div>
              </div>
              <div>{row.visual}</div>
            </div>
          </div>
        );
      })}
    </section>
  );
}

function VisualLeadTable() {
  const rows = [
    { name: "Sarah Chen", company: "Stripe", email: "sarah.chen@stripe.com", phone: "+1 (415) 555-0192", status: "Valid" },
    { name: "Marcus Patel", company: "Notion", email: "m.patel@notion.so", phone: "+1 (415) 555-0144", status: "Valid" },
    { name: "Elena Vega", company: "Linear", email: "elena@linear.app", phone: "+1 (628) 555-0178", status: "Risky" },
    { name: "David Kim", company: "Vercel", email: "david.kim@vercel.com", phone: "+1 (650) 555-0102", status: "Valid" },
    { name: "Priya Shah", company: "Figma", email: "priya@figma.com", phone: "+1 (415) 555-0166", status: "Valid" },
  ];
  return (
    <div className="rounded-2xl border border-border bg-stone-50 shadow-sm p-4 overflow-hidden">
      <div className="bg-white rounded-xl border border-border overflow-hidden">
        <div className="px-4 py-3 border-b border-border flex items-center justify-between">
          <span className="text-sm font-semibold">Enriched leads</span>
          <span className="bg-green-50 text-green-700 border border-green-100 rounded-full px-2 py-0.5 text-[10px] font-semibold">92% verified</span>
        </div>
        <table className="w-full text-xs">
          <thead className="bg-gray-50">
            <tr className="text-left text-[10px] uppercase tracking-wider text-muted-foreground">
              <th className="px-3 py-2">Name</th><th className="px-3 py-2">Company</th>
              <th className="px-3 py-2">Email</th><th className="px-3 py-2">Phone</th><th className="px-3 py-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r, i) => (
              <tr key={i} className="border-t border-border">
                <td className="px-3 py-2 font-medium">{r.name}</td>
                <td className="px-3 py-2 text-muted-foreground">{r.company}</td>
                <td className="px-3 py-2 text-muted-foreground">{r.email}</td>
                <td className="px-3 py-2 text-muted-foreground">{r.phone}</td>
                <td className="px-3 py-2">
                  <span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[9px] font-medium ${r.status === "Valid" ? "bg-green-50 text-green-700 border border-green-100" : "bg-orange-50 text-orange-700 border border-orange-100"}`}>
                    {r.status === "Valid" && <CheckCircle2 className="w-2.5 h-2.5" />} {r.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function VisualExtension() {
  return (
    <div className="rounded-2xl border border-border bg-stone-50 shadow-sm p-6 relative overflow-hidden min-h-[320px]">
      <div className="absolute inset-4 rounded-xl bg-gradient-to-br from-gray-100 to-gray-50 blur-sm" />
      <div className="relative bg-white rounded-xl shadow-lg border border-border p-5 max-w-[280px] ml-auto">
        <div className="flex items-center gap-2">
          <span className="w-6 h-6 rounded bg-primary text-white text-xs flex items-center justify-center font-bold">in</span>
          <span className="text-sm font-semibold">Stripe</span>
        </div>
        <div className="mt-3 space-y-2">
          {["Sarah Chen", "Marcus Patel", "Elena Vega"].map((n) => (
            <div key={n} className="flex items-center justify-between text-xs border-b border-gray-100 pb-2">
              <div>
                <div className="font-medium">{n}</div>
                <div className="text-[10px] text-muted-foreground">VP, Sales</div>
              </div>
              <span className="text-[9px] bg-green-50 text-green-700 rounded-full px-2 py-0.5 font-medium">Valid</span>
            </div>
          ))}
        </div>
        <button className="mt-3 w-full rounded-full bg-primary text-primary-foreground px-3 py-1.5 text-xs font-semibold">Save to Scalelist</button>
      </div>
    </div>
  );
}

function VisualVerifier() {
  const data = [
    { email: "ceo@acme.com", status: "Valid", color: "green" },
    { email: "info@brand.io", status: "Risky", color: "orange" },
    { email: "old@deadco.com", status: "Invalid", color: "red" },
    { email: "anna@stripe.com", status: "Valid", color: "green" },
    { email: "team@notion.so", status: "Valid", color: "green" },
  ];
  const colorMap: Record<string, string> = {
    green: "bg-green-50 text-green-700 border-green-100",
    orange: "bg-orange-50 text-orange-700 border-orange-100",
    red: "bg-red-50 text-red-700 border-red-100",
  };
  return (
    <div className="rounded-2xl border border-border bg-stone-50 shadow-sm p-4">
      <div className="bg-white rounded-xl border border-border overflow-hidden">
        <div className="px-4 py-3 border-b border-border flex items-center justify-between">
          <span className="text-sm font-semibold">Email verifier</span>
          <span className="bg-green-50 text-green-700 border border-green-100 rounded-full px-2 py-0.5 text-[10px] font-semibold">94.2% deliverable</span>
        </div>
        <ul>
          {data.map((d) => (
            <li key={d.email} className="px-4 py-2.5 border-t border-border first:border-t-0 flex items-center justify-between text-xs">
              <span className="text-muted-foreground">{d.email}</span>
              <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-[9px] font-semibold border ${colorMap[d.color]}`}>{d.status}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function VisualIntegrations() {
  const tools = ["HubSpot", "Salesforce", "lemlist", "Instantly", "Clay", "n8n", "Zapier", "Claude", "ChatGPT"];
  return (
    <div className="rounded-2xl border border-border bg-stone-50 p-4">
      <div className="grid grid-cols-3 gap-3">
        {tools.map((t) => (
          <div key={t} className="bg-white rounded-xl border border-border h-20 flex items-center justify-center text-sm font-semibold text-muted-foreground grayscale">
            {t}
          </div>
        ))}
      </div>
    </div>
  );
}
