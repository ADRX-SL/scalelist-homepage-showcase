import React from "react";
import { ClaudeLogo } from "@/components/scalelist/ClaudeLogo";
import { OpenAiLogo } from "@/components/scalelist/OpenAiLogo";
import openaiLogo from "@/assets/logos/openai.png";
import stripeLogo from "@/assets/logos/stripe.png";
import salesforceLogo from "@/assets/logos/salesforce.png";
import hubspotLogo from "@/assets/logos/hubspot.png";
import slackLogo from "@/assets/logos/slack.png";
import figmaLogo from "@/assets/logos/figma.png";
import notionLogo from "@/assets/logos/notion.png";
import datadogLogo from "@/assets/logos/datadog.png";

const LOGOS: Record<string, string> = {
  "openai.com": openaiLogo,
  "stripe.com": stripeLogo,
  "salesforce.com": salesforceLogo,
  "hubspot.com": hubspotLogo,
  "slack.com": slackLogo,
  "figma.com": figmaLogo,
  "notion.so": notionLogo,
  "datadoghq.com": datadogLogo,
};

type Cta = { label: string; href: string };

const PILL: Record<string, string> = {
  blue: "bg-primary/10 text-primary",
  purple: "bg-purple-100 text-purple-700",
  amber: "bg-amber-100 text-amber-700",
  green: "bg-green-100 text-green-700",
  sky: "bg-blue-100 text-blue-700",
  indigo: "bg-indigo-50 text-indigo-600",
};

function CompanyLogo({ domain, name }: { domain: string; name: string }) {
  const [failed, setFailed] = React.useState(false);
  const src = LOGOS[domain];
  if (failed || !src) {
    return (
      <span className="w-5 h-5 rounded-sm bg-primary/10 text-primary text-[10px] font-bold flex items-center justify-center shrink-0">
        {name.charAt(0)}
      </span>
    );
  }
  return (
    <img
      src={src}
      alt={`${name} logo`}
      loading="lazy"
      onError={() => setFailed(true)}
      className="w-5 h-5 rounded-sm object-contain shrink-0"
    />
  );
}

function LinkedInIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="w-4 h-4 text-[#0A66C2]">
      <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.47-.9 1.63-1.85 3.36-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.55V9h3.57v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.22 0z" />
    </svg>
  );
}

const SECTIONS: {
  eyebrow: string;
  color: keyof typeof PILL;
  h2: string;
  body: string;
  ctas: Cta[];
  extra?: React.ReactNode;
  visualLeft?: boolean;
  visual: React.ReactNode;
}[] = [
  {
    eyebrow: "FIND ANY LEADS",
    color: "blue",
    h2: "Describe your ideal clients, get a ready-to-use lead list",
    body: "Describe your perfect leads, and our AI Leads Finder will find them anywhere in the world, in one click.",
    ctas: [{ label: "Learn more about our AI Leads Finder", href: "https://scalelist.com/leads-finder/" }],
    visual: <VisualLeadList />,
  },
  {
    eyebrow: "ENRICH EXISTING LISTS",
    color: "purple",
    h2: "Find up to 95% B2B emails and mobile numbers worldwide",
    body: "Upload your own CSV or sync via API. We enrich your lists with mobile numbers and verified B2B emails.",
    ctas: [
      { label: "Learn more about our email finder", href: "https://scalelist.com/email-finder/" },
      { label: "Learn more about our mobile number finder", href: "https://scalelist.com/mobile-number-finder/" },
    ],
    visualLeft: true,
    visual: <VisualEnrich />,
  },
  {
    eyebrow: "INTEGRATIONS | API | EXPORT | MCP",
    color: "amber",
    h2: "Integrate with any system",
    body: "Connect Scalelist to Claude and ChatGPT through our MCP server. Integrate it with HubSpot, Salesforce, or any other tool using our API, Zapier, or Make, or simply export your data to CSV or Excel.",
    ctas: [
      { label: "Learn more", href: "https://scalelist.com/integrations/" },
      { label: "Get an API key", href: "https://app.scalelist.com/docs" },
      { label: "Get access to Scalelist MCP Server", href: "https://scalelist.com/mcp-server/" },
    ],
    visual: <VisualOrbit />,
  },
  {
    eyebrow: "EMAIL VERIFIER",
    color: "green",
    h2: "Verify Emails with 99% Accuracy",
    body: "Recover 20 to 30% more usable contacts in milliseconds. Verify risky addresses and find valid inboxes hidden behind catch all domains and SEGs. Kill bounce rates and reach real inboxes.",
    ctas: [{ label: "Learn more", href: "https://scalelist.com/email-verifier/" }],
    visualLeft: true,
    visual: <VisualVerifier />,
  },
  {
    eyebrow: "CHROME EXTENSION",
    color: "sky",
    h2: "Create lead lists from your preferred platform",
    body: "Find verified business emails and mobile numbers right from anywhere.",
    ctas: [{ label: "Learn more", href: "https://scalelist.com/extension/" }],
    extra: (
      <a
        href="https://scalelist.com/extension/"
        className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-4 py-2 text-sm font-semibold text-foreground hover:border-primary/40 hover:text-primary transition"
      >
        <span className="w-4 h-4 rounded-full border-2 border-primary/60 inline-block" aria-hidden="true" />
        Discover extension
      </a>
    ),
    visual: <VisualExtension />,
  },
  {
    eyebrow: "DATA",
    color: "indigo",
    h2: "The most relevant 15 data points for sales people, in one place",
    body: "Understand your total market. Then act on it.",
    ctas: [],
    visualLeft: true,
    visual: <VisualData />,
  },
];

export function FeatureRows() {
  return (
    <section>
      {SECTIONS.map((s) => (
        <div key={s.eyebrow} className="py-20 md:py-28 border-b border-border last:border-b-0">
          <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className={s.visualLeft ? "lg:order-2" : ""}>
              <span className={`inline-flex rounded-full px-3 py-1 text-xs font-bold uppercase tracking-[0.15em] ${PILL[s.color]}`}>
                {s.eyebrow}
              </span>
              <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight mt-4 leading-tight">{s.h2}</h2>
              <p className="text-base md:text-lg text-muted-foreground leading-relaxed mt-5">{s.body}</p>
              {(s.ctas.length > 0 || s.extra) && (
                <div className="mt-6 flex flex-col items-start gap-3">
                  {s.ctas.map((c) => (
                    <a key={c.label} href={c.href} className="text-primary font-medium hover:underline">
                      {c.label} →
                    </a>
                  ))}
                  {s.extra}
                </div>
              )}
            </div>
            <div className={s.visualLeft ? "lg:order-1" : ""}>{s.visual}</div>
          </div>
        </div>
      ))}
    </section>
  );
}

function Card({ children }: { children: React.ReactNode }) {
  return <div className="rounded-2xl bg-stone-50/70 border border-border shadow-sm p-4">{children}</div>;
}

function VisualLeadList() {
  const rows = [
    { first: "Sarah", last: "Chen", title: "VP Sales", company: "OpenAI", domain: "openai.com", city: "San Francisco" },
    { first: "Marcus", last: "Bell", title: "Head of Growth", company: "Stripe", domain: "stripe.com", city: "New York" },
    { first: "Elena", last: "Vega", title: "CRO", company: "Salesforce", domain: "salesforce.com", city: "Austin" },
    { first: "David", last: "Kim", title: "RevOps Lead", company: "HubSpot", domain: "hubspot.com", city: "Boston" },
    { first: "Priya", last: "Raman", title: "Director of Demand Gen", company: "Slack", domain: "slack.com", city: "Seattle" },
    { first: "Jordan", last: "Ellis", title: "Head of Partnerships", company: "Figma", domain: "figma.com", city: "San Francisco" },
    { first: "Natalie", last: "Brooks", title: "VP Marketing", company: "Notion", domain: "notion.so", city: "New York" },
    { first: "Tom", last: "Whitfield", title: "Chief Revenue Officer", company: "Datadog", domain: "datadoghq.com", city: "Boston" },
  ];
  return (
    <Card>
      <div className="bg-white rounded-xl border border-border overflow-hidden">
        <div className="px-4 py-3 border-b border-border flex items-center justify-between">
          <span className="text-sm font-semibold">Your lead list</span>
          <span className="bg-green-50 text-green-700 border border-green-100 rounded-full px-2 py-0.5 text-[10px] font-semibold">
            1,240 matches
          </span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-xs min-w-[640px]">
            <thead className="bg-gray-50">
              <tr className="text-left text-[10px] uppercase tracking-wider text-muted-foreground">
                <th className="px-3 py-2">in</th>
                <th className="px-3 py-2">First name</th>
                <th className="px-3 py-2">Last name</th>
                <th className="px-3 py-2">Job title</th>
                <th className="px-3 py-2">Company</th>
                <th className="px-3 py-2">City</th>
                <th className="px-3 py-2">Country</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.first + r.last} className="border-t border-border">
                  <td className="px-3 py-2"><LinkedInIcon /></td>
                  <td className="px-3 py-2 font-medium">{r.first}</td>
                  <td className="px-3 py-2 font-medium">{r.last}</td>
                  <td className="px-3 py-2 text-muted-foreground whitespace-nowrap">{r.title}</td>
                  <td className="px-3 py-2">
                    <span className="flex items-center gap-2 whitespace-nowrap">
                      <CompanyLogo domain={r.domain} name={r.company} />
                      <span className="text-muted-foreground">{r.company}</span>
                    </span>
                  </td>
                  <td className="px-3 py-2 text-muted-foreground whitespace-nowrap">{r.city}</td>
                  <td className="px-3 py-2 text-muted-foreground">United States</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Card>
  );
}

function CheckIcon({ className = "w-3.5 h-3.5 text-green-600" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className={className} aria-hidden="true">
      <path d="M20 6 9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function WarnIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-3.5 h-3.5 text-amber-600" aria-hidden="true">
      <path d="M12 9v4m0 4h.01M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0Z" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function VisualEnrich() {
  const rows = [
    { first: "Caleb", last: "Drayton", email: "caleb.drayton@rampfin.com", phone: "+1 415 208 7742" },
    { first: "Sam", last: "Cruz", email: "sam.cruz@northloop.io", phone: "+1 212 553 1180" },
    { first: "Elias", last: "Granger", email: "elias@granger-labs.com", phone: "+1 512 664 9021" },
    { first: "Daniel", last: "Ferreira", email: "d.ferreira@parallelhq.com", phone: "+1 617 330 5567" },
  ];
  return (
    <Card>
      <div className="bg-white rounded-xl border border-border overflow-hidden">
        <div className="px-4 py-3 border-b border-border text-sm font-semibold">Enriched contacts</div>
        <div className="overflow-x-auto">
          <table className="w-full text-xs min-w-[560px]">
            <thead className="bg-gray-50">
              <tr className="text-left text-[10px] uppercase tracking-wider text-muted-foreground">
                <th className="px-3 py-2">First name</th>
                <th className="px-3 py-2">Last name</th>
                <th className="px-3 py-2">Email</th>
                <th className="px-3 py-2">Confidence</th>
                <th className="px-3 py-2">Phone number</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.email} className="border-t border-border">
                  <td className="px-3 py-2 font-medium">{r.first}</td>
                  <td className="px-3 py-2 font-medium">{r.last}</td>
                  <td className="px-3 py-2 text-muted-foreground whitespace-nowrap">{r.email}</td>
                  <td className="px-3 py-2">
                    <span className="inline-flex items-center gap-1">
                      <span className="rounded-full bg-green-50 text-green-700 border border-green-100 px-2 py-0.5 text-[9px] font-semibold">100%</span>
                      <CheckIcon />
                    </span>
                  </td>
                  <td className="px-3 py-2 text-muted-foreground whitespace-nowrap">{r.phone}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Card>
  );
}

function VisualOrbit() {
  const nodes: { label: string; top: string; left: string; content: React.ReactNode }[] = [
    { label: "Claude", top: "8%", left: "50%", content: <ClaudeLogo className="w-6 h-6" /> },
    { label: "Salesforce", top: "22%", left: "84%", content: <CompanyLogo domain="salesforce.com" name="Salesforce" /> },
    { label: "OpenAI", top: "50%", left: "92%", content: <OpenAiLogo className="w-6 h-6 text-foreground" /> },
    { label: "Zapier", top: "78%", left: "84%", content: <CompanyLogo domain="zapier.com" name="Zapier" /> },
    { label: "HubSpot", top: "92%", left: "50%", content: <CompanyLogo domain="hubspot.com" name="HubSpot" /> },
    { label: "Clay", top: "78%", left: "16%", content: <CompanyLogo domain="clay.com" name="Clay" /> },
    {
      label: "CSV",
      top: "50%",
      left: "8%",
      content: <span className="rounded bg-green-50 text-green-700 border border-green-100 px-1.5 py-0.5 text-[9px] font-bold">CSV</span>,
    },
  ];
  return (
    <Card>
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
      <p className="mt-2 text-center text-xs text-muted-foreground">
        Claude, ChatGPT, HubSpot, Salesforce, Zapier, Clay, CSV and more
      </p>
    </Card>
  );
}

function VisualVerifier() {
  const rows = [
    { name: "Alice Moreau", email: "alice@perplexity.ai", status: "Valid", phone: "+1 415 771 2280" },
    { name: "Ben Carter", email: "ben.carter@stripe.com", status: "Valid", phone: "+1 646 220 4471" },
    { name: "Chloe Adams", email: "chloe@harvey.ai", status: "Valid", phone: "+1 917 552 6633" },
    { name: "Diego Alvarez", email: "info@brandworks.com", status: "Risky", phone: "+1 512 908 1174" },
    { name: "Emma Lawson", email: "emma.lawson@notion.so", status: "Valid", phone: "+1 206 441 3390" },
    { name: "Frank Miller", email: "f.miller@datadoghq.com", status: "Valid", phone: "+1 617 224 8890" },
    { name: "Grace Okafor", email: "grace@cursor.com", status: "Valid", phone: "+1 415 330 7712" },
  ];
  return (
    <Card>
      <div className="bg-white rounded-xl border border-border overflow-hidden">
        <div className="px-4 py-3 border-b border-border flex items-center justify-between">
          <span className="text-sm font-semibold">Email verifier</span>
          <span className="bg-green-50 text-green-700 border border-green-100 rounded-full px-2 py-0.5 text-[10px] font-semibold">
            99% accuracy
          </span>
        </div>
        <ul>
          {rows.map((r) => (
            <li key={r.email} className="px-4 py-2.5 border-t border-border first:border-t-0 flex items-center justify-between gap-3 text-xs">
              <div className="min-w-0">
                <div className="font-medium truncate">{r.name}</div>
                <div className="text-muted-foreground truncate">{r.email}</div>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <span
                  className={`inline-flex items-center rounded-full px-2 py-0.5 text-[9px] font-semibold border ${
                    r.status === "Valid"
                      ? "bg-green-50 text-green-700 border-green-100"
                      : "bg-amber-50 text-amber-700 border-amber-100"
                  }`}
                >
                  {r.status}
                </span>
                {r.status === "Valid" ? <CheckIcon /> : <WarnIcon />}
                <span className="text-muted-foreground hidden sm:inline whitespace-nowrap">{r.phone}</span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </Card>
  );
}

function VisualExtension() {
  return (
    <Card>
      <div className="relative bg-white rounded-xl border border-border p-5 min-h-[320px]">
        <div className="h-20 rounded-lg bg-gradient-to-r from-primary/20 to-primary/5" />
        <div className="-mt-8 ml-2 w-16 h-16 rounded-full bg-stone-200 border-4 border-white flex items-center justify-center text-lg font-bold text-muted-foreground">
          AR
        </div>
        <div className="mt-3">
          <div className="text-base font-bold">Andrea Riley</div>
          <div className="text-sm text-muted-foreground">Sales Director at n8N</div>
          <div className="text-xs text-muted-foreground mt-1">San Francisco Bay Area · 500+ connections</div>
        </div>

        <div className="absolute right-4 bottom-4 w-[240px] rounded-xl border border-border bg-white shadow-lg p-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold">Scalelist</span>
            <span className="rounded-full bg-green-50 text-green-700 border border-green-100 px-2 py-0.5 text-[9px] font-bold">FREE</span>
          </div>
          <div className="mt-3 space-y-1 text-[11px]">
            <div className="flex items-center gap-1.5 text-muted-foreground">
              <CheckIcon />
              andrea.riley@n8n.io
            </div>
            <div className="flex items-center gap-1.5 text-muted-foreground">
              <CheckIcon />
              +1 415 662 0187
            </div>
          </div>
          <button className="mt-3 w-full rounded-full bg-primary text-primary-foreground px-3 py-1.5 text-xs font-semibold">
            Add to list
          </button>
          <button className="mt-2 w-full rounded-full border border-border px-3 py-1.5 text-xs font-semibold text-foreground">
            Push to HubSpot
          </button>
        </div>
      </div>
    </Card>
  );
}

function VisualData() {
  const fields: [string, string][] = [
    ["First Name", "Beatrice"],
    ["Last Name", "Wong"],
    ["Job Title", "VP of Growth"],
    ["Company Name", "Synthwave AI"],
    ["Industry", "Software"],
    ["Company Size", "51-200"],
    ["City", "San Francisco"],
    ["Country", "United States"],
    ["Company Website", "synthwave.ai"],
    ["Email", "beatrice@synthwave.ai"],
    ["Phone", "+1 415 220 8841"],
  ];
  const toggles: [string, boolean][] = [
    ["Professional URL", true],
    ["Sales Nav Profile", true],
    ["First Name", true],
    ["Last Name", true],
    ["Job Title", true],
    ["Company Name", true],
    ["Industry", true],
    ["Company Size", false],
    ["City", true],
    ["Country", true],
    ["Is LinkedIn Premium", false],
    ["Company Website", true],
    ["Company LinkedIn", true],
    ["Email", true],
    ["Phone", true],
    ["CRM Integration", false],
  ];
  return (
    <Card>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div className="bg-white rounded-xl border border-border p-4">
          <div className="text-sm font-semibold">Beatrice Wong</div>
          <div className="text-xs text-muted-foreground">VP of Growth · Synthwave AI</div>
          <dl className="mt-3 space-y-1.5">
            {fields.map(([k, v]) => (
              <div key={k} className="flex items-center justify-between gap-2 text-[11px]">
                <dt className="text-muted-foreground">{k}</dt>
                <dd className="font-medium truncate max-w-[55%] text-right">{v}</dd>
              </div>
            ))}
          </dl>
        </div>
        <div className="bg-white rounded-xl border border-border p-4">
          <div className="text-sm font-semibold">Export Fields</div>
          <ul className="mt-3 space-y-1.5">
            {toggles.map(([label, on]) => (
              <li key={label} className="flex items-center justify-between gap-2 text-[11px]">
                <span className="text-muted-foreground">{label}</span>
                <span
                  className={`relative inline-block w-7 h-4 rounded-full transition ${on ? "bg-primary" : "bg-stone-300"}`}
                  aria-hidden="true"
                >
                  <span className={`absolute top-0.5 w-3 h-3 rounded-full bg-white transition ${on ? "left-3.5" : "left-0.5"}`} />
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Card>
  );
}
