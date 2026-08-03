import { ClaudeLogo } from "@/components/scalelist/ClaudeLogo";
import { OpenAiLogo } from "@/components/scalelist/OpenAiLogo";

type Cta = { label: string; href: string; primary?: boolean };

const CARDS: {
  eyebrow: string;
  h2: string;
  body: string;
  ctas: Cta[];
  visual: JSX.Element;
}[] = [
  {
    eyebrow: "FIND ANY LEADS",
    h2: "Describe your leads, get a ready-to-use list.",
    body: "Tell Scalelist who you want to reach in plain English: role, industry, location, and company size. Get a verified, contact-ready lead list built directly in Scalelist, complete with work emails and mobile numbers. Free to explore, 1 credit per email, 20 per mobile, 0 for a miss.",
    ctas: [{ label: "Learn more", href: "https://scalelist.com/leads-finder/", primary: true }],
    visual: <VisualLeadFinder />,
  },
  {
    eyebrow: "ENRICH EXISTING LISTS",
    h2: "Enrich leads from LinkedIn, CSVs, CRMs, and any website.",
    body: "Use the Scalelist Chrome Extension on any company page or LinkedIn profile. Upload a CSV, connect your CRM, or find contacts by domain. Every workflow is covered, with verified emails and mobile numbers added in a single pass.",
    ctas: [{ label: "Learn more", href: "https://scalelist.com/extension/", primary: true }],
    visual: <VisualExtension />,
  },
  {
    eyebrow: "VERIFY & CLEAN",
    h2: "Verified data that actually reaches the inbox.",
    body: "Every email is triple-checked for syntax, MX records, and SMTP. Every mobile is carrier-verified. Around 99% email verification accuracy on weekly-refreshed data keeps your CRM clean and your bounce rate under 5%.",
    ctas: [{ label: "Learn more", href: "https://scalelist.com/email-verifier/", primary: true }],
    visual: <VisualVerifier />,
  },
  {
    eyebrow: "INTEGRATIONS | API | EXPORT | MCP",
    h2: "Connect Scalelist to every tool, AI agent, and workflow.",
    body: "Connect Scalelist to Claude or ChatGPT through our MCP server. Integrate with HubSpot, Salesforce, or any other tool using our API, Zapier, or Make, or export your data to CSV or Excel.",
    ctas: [
      { label: "Learn more", href: "https://scalelist.com/integrations/" },
      { label: "Get an API key", href: "https://app.scalelist.com/docs" },
      { label: "Use Scalelist MCP in Claude", href: "https://scalelist.com/mcp-server/", primary: true },
    ],
    visual: <VisualIntegrationsOrbit />,
  },
];

export function FeatureRows() {
  return (
    <section>
      {CARDS.map((card, i) => {
        const reverse = i % 2 === 1;
        return (
          <div key={i} className="py-20 md:py-28 border-b border-border last:border-b-0">
            <div className={`max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 lg:gap-16 items-center ${reverse ? "lg:[&>*:first-child]:order-2" : ""}`}>
              <div>
                <div className="text-xs font-bold uppercase tracking-[0.2em] text-primary">{card.eyebrow}</div>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight mt-4 leading-tight">{card.h2}</h2>
                <p className="text-lg text-muted-foreground leading-relaxed mt-5">{card.body}</p>
                <div className="flex gap-3 mt-7 flex-wrap">
                  {card.ctas.map((c) => (
                    <a
                      key={c.label}
                      href={c.href}
                      className={
                        c.primary
                          ? "inline-flex items-center rounded-full bg-primary text-primary-foreground px-5 py-2.5 text-sm font-semibold hover:opacity-90 transition"
                          : "inline-flex items-center rounded-full border border-border bg-background px-5 py-2.5 text-sm font-semibold text-foreground hover:border-primary/40 hover:text-primary transition"
                      }
                    >
                      {c.label}
                    </a>
                  ))}
                </div>
              </div>
              <div>{card.visual}</div>
            </div>
          </div>
        );
      })}
    </section>
  );
}

function VisualLeadFinder() {
  const rows = [
    { name: "Sarah Chen", company: "Stripe", title: "VP Sales", email: "sarah.chen@stripe.com" },
    { name: "Marcus Patel", company: "Notion", title: "Head of Growth", email: "m.patel@notion.so" },
    { name: "Elena Vega", company: "Linear", title: "CMO", email: "elena@linear.app" },
    { name: "David Kim", company: "Vercel", title: "RevOps Lead", email: "david.kim@vercel.com" },
  ];
  return (
    <div className="rounded-2xl border border-border bg-stone-50 shadow-sm p-4 overflow-hidden">
      <div className="bg-white rounded-xl border border-border shadow-sm px-4 py-3 flex items-center gap-2">
        <span className="text-primary text-lg leading-none">&#10022;</span>
        <span className="text-sm text-muted-foreground">Heads of Growth at US SaaS companies, 50 to 200 employees</span>
      </div>
      <div className="bg-white rounded-xl border border-border overflow-hidden mt-3">
        <div className="px-4 py-3 border-b border-border flex items-center justify-between">
          <span className="text-sm font-semibold">Your list</span>
          <span className="bg-green-50 text-green-700 border border-green-100 rounded-full px-2 py-0.5 text-[10px] font-semibold">1,240 matches</span>
        </div>
        <table className="w-full text-xs">
          <thead className="bg-gray-50">
            <tr className="text-left text-[10px] uppercase tracking-wider text-muted-foreground">
              <th className="px-3 py-2">Name</th><th className="px-3 py-2">Company</th>
              <th className="px-3 py-2">Title</th><th className="px-3 py-2">Email</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r, i) => (
              <tr key={i} className="border-t border-border">
                <td className="px-3 py-2 font-medium">{r.name}</td>
                <td className="px-3 py-2 text-muted-foreground">{r.company}</td>
                <td className="px-3 py-2 text-muted-foreground">{r.title}</td>
                <td className="px-3 py-2 text-muted-foreground">{r.email}</td>
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

function VisualIntegrationsOrbit() {
  // Official Claude and OpenAI marks are rendered as real logos.
  // Other tools are labelled nodes. Positions are placed around a ring.
  const nodes: { label: string; top: string; left: string; content: JSX.Element }[] = [
    { label: "Claude", top: "8%", left: "50%", content: <ClaudeLogo className="w-6 h-6" /> },
    { label: "Salesforce", top: "22%", left: "84%", content: <span className="text-[10px] font-semibold text-muted-foreground">Salesforce</span> },
    { label: "OpenAI", top: "50%", left: "92%", content: <OpenAiLogo className="w-6 h-6 text-foreground" /> },
    { label: "Zapier", top: "78%", left: "84%", content: <span className="text-[11px] font-semibold text-muted-foreground">Zapier</span> },
    { label: "HubSpot", top: "92%", left: "50%", content: <span className="text-[11px] font-semibold text-muted-foreground">HubSpot</span> },
    { label: "Make", top: "78%", left: "16%", content: <span className="text-[11px] font-semibold text-muted-foreground">Make</span> },
    { label: "CSV", top: "50%", left: "8%", content: <span className="text-[11px] font-semibold text-muted-foreground">CSV</span> },
    { label: "Clay", top: "22%", left: "16%", content: <span className="text-[11px] font-semibold text-muted-foreground">Clay</span> },
  ];
  return (
    <div className="rounded-2xl border border-border bg-stone-50 shadow-sm p-4">
      <div className="relative mx-auto aspect-square w-full max-w-[420px]">
        <div className="absolute inset-[10%] rounded-full border border-dashed border-border" />
        <div className="absolute inset-[26%] rounded-full border border-dashed border-border" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-full bg-primary text-primary-foreground flex items-center justify-center shadow-md">
          <span className="text-2xl font-extrabold">S</span>
        </div>
        {nodes.map((n) => (
          <div
            key={n.label}
            aria-label={n.label}
            className="absolute -translate-x-1/2 -translate-y-1/2 w-14 h-14 rounded-full bg-white border border-border shadow-sm flex items-center justify-center"
            style={{ top: n.top, left: n.left }}
          >
            {n.content}
          </div>
        ))}
      </div>
      <p className="mt-2 text-center text-xs text-muted-foreground">Claude, ChatGPT, HubSpot, Salesforce, Zapier, Make, Clay, CSV and more</p>
    </div>
  );
}
