import { useEffect, useState } from "react";
import { ArrowRight, CheckCircle2, Mail, Phone, Upload } from "lucide-react";

type Sub = "single" | "bulk";

export function TabCsv() {
  const [sub, setSub] = useState<Sub>("single");
  return (
    <div className="h-full overflow-y-auto p-6 sm:p-10">
      <div className="flex justify-center mb-2">
        <span className="inline-block text-[10px] font-semibold uppercase tracking-widest text-primary bg-primary/10 border border-primary/30 rounded-full px-3 py-1">
          No-Code Enrichment
        </span>
      </div>

      <div className="flex justify-center mt-4 mb-8">
        <div className="bg-gray-100 rounded-full p-1 flex">
          {(["single", "bulk"] as Sub[]).map((s) => (
            <button
              key={s}
              onClick={() => setSub(s)}
              className={`rounded-full px-5 py-2 text-sm font-semibold transition ${
                sub === s ? "bg-white shadow-sm text-foreground" : "text-muted-foreground"
              }`}
            >
              {s === "single" ? "Single Lead" : "Bulk Upload"}
            </button>
          ))}
        </div>
      </div>

      {sub === "single" ? <SingleLead /> : <BulkUpload />}
    </div>
  );
}

function SingleLead() {
  const [phase, setPhase] = useState<"form" | "loading" | "result">("form");
  useEffect(() => {
    const t1 = setTimeout(() => setPhase("loading"), 1500);
    const t2 = setTimeout(() => setPhase("result"), 3000);
    const t3 = setTimeout(() => setPhase("form"), 7000);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, [phase === "form"]);

  return (
    <div className="max-w-lg mx-auto bg-white border border-border rounded-2xl shadow-sm p-8">
      <div className="flex gap-4 mb-4">
        <label className="flex items-center gap-2 text-sm font-medium">
          <span className="w-4 h-4 rounded bg-primary flex items-center justify-center">
            <CheckCircle2 className="w-3 h-3 text-white" />
          </span>
          Find Emails (1 credit)
        </label>
        <label className="flex items-center gap-2 text-sm text-muted-foreground">
          <span className="w-4 h-4 rounded border border-border" />
          Find Mobile Numbers (20 credits)
        </label>
      </div>
      <p className="text-xs text-muted-foreground mb-5">Full Name + Company or Domain required. LinkedIn URL optional.</p>

      <div className="flex flex-col gap-3">
        <input className="rounded-xl border border-border px-4 py-3 text-sm" placeholder="e.g. Sarah Chen" />
        <input className="rounded-xl border border-border px-4 py-3 text-sm" placeholder="e.g. stripe.com" />
        <input className="rounded-xl border border-border px-4 py-3 text-sm" placeholder="Optional — improves mobile match accuracy" />
      </div>

      <button className="mt-5 w-full rounded-full bg-primary text-primary-foreground px-6 py-3 text-sm font-semibold inline-flex items-center justify-center gap-2 hover:bg-primary/90 transition">
        {phase === "loading" ? (
          <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
        ) : (
          <>Find Contact <ArrowRight className="w-4 h-4" /></>
        )}
      </button>

      {phase === "result" && (
        <div className="bg-green-50 border border-green-200 rounded-2xl p-5 mt-4 fade-up">
          <div className="font-semibold text-sm">Sarah Chen — Chief Revenue Officer @ Stripe</div>
          <div className="mt-3 flex items-center gap-2 text-sm">
            <Mail className="w-4 h-4 text-muted-foreground" /> sarah.chen@stripe.com
            <span className="inline-flex items-center gap-1 bg-white text-green-700 border border-green-200 rounded-full px-2 py-0.5 text-[10px] font-medium ml-auto">
              <CheckCircle2 className="w-3 h-3" /> Verified
            </span>
          </div>
          <div className="mt-2 flex items-center gap-2 text-sm">
            <Phone className="w-4 h-4 text-muted-foreground" /> +1 (415) 555-0847
            <span className="inline-flex items-center gap-1 bg-white text-green-700 border border-green-200 rounded-full px-2 py-0.5 text-[10px] font-medium ml-auto">
              <CheckCircle2 className="w-3 h-3" /> Verified
            </span>
          </div>
          <div className="text-xs text-muted-foreground mt-2">Last verified Jun 2026</div>
          <div className="flex gap-2 mt-3">
            <button className="rounded-full border border-border bg-white px-3 py-1.5 text-xs font-semibold">Export CSV</button>
            <button className="rounded-full bg-primary text-primary-foreground px-3 py-1.5 text-xs font-semibold">Push to CRM</button>
          </div>
        </div>
      )}
    </div>
  );
}

function BulkUpload() {
  const [phase, setPhase] = useState<"progress" | "result">("progress");
  useEffect(() => {
    const t1 = setTimeout(() => setPhase("result"), 3000);
    const t2 = setTimeout(() => setPhase("progress"), 8000);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, [phase]);

  return (
    <div className="grid lg:grid-cols-2 gap-8">
      <div>
        <div className="border-2 border-dashed border-blue-200 rounded-2xl p-10 text-center bg-blue-50/30">
          <Upload className="w-10 h-10 text-blue-400 mx-auto mb-3" />
          <div className="font-semibold">Drag & drop your file here</div>
          <div className="text-muted-foreground text-sm">or click to browse</div>
          <div className="flex justify-center gap-2 mt-3">
            <span className="bg-white border border-border rounded-full px-3 py-1 text-xs">CSV</span>
            <span className="bg-white border border-border rounded-full px-3 py-1 text-xs">XLSX</span>
          </div>
        </div>
        <input className="mt-4 w-full rounded-xl border border-border px-4 py-3 text-sm" placeholder="e.g. Q3 Outbound — SaaS Founders" />
        <p className="text-xs text-muted-foreground mt-2">Required: First Name, Last Name, Company Domain or Name. Max 50,000 rows.</p>
        <button className="mt-3 w-full rounded-full bg-primary text-primary-foreground px-6 py-3 text-sm font-semibold inline-flex items-center justify-center gap-2">
          Enrich leads <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      <div>
        {phase === "progress" ? (
          <div className="bg-white border border-border rounded-2xl p-6 shadow-sm fade-up">
            <div className="font-semibold">Enriching 1,247 leads...</div>
            <div className="w-full bg-gray-100 rounded-full h-2 mt-4 overflow-hidden">
              <div className="bg-primary h-full rounded-full transition-all" style={{ width: "78%", transitionDuration: "3000ms" }} />
            </div>
            <div className="text-muted-foreground text-sm mt-3">Finding emails and mobile numbers...</div>
          </div>
        ) : (
          <div className="bg-white border border-border rounded-2xl p-6 shadow-sm fade-up">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-7 h-7 text-green-500" />
              <span className="font-semibold">Enrichment complete!</span>
            </div>
            <div className="grid grid-cols-2 gap-3 mt-4">
              <Stat n="1,247" label="Records processed" />
              <Stat n="1,089" label="Emails found — 87%" color="green" />
              <Stat n="1,061" label="Mobiles found — 85%" color="blue" />
              <Stat n="2m 14s" label="Processing time" />
            </div>
            <div className="flex gap-2 mt-4">
              <button className="rounded-full border border-border bg-white px-3 py-1.5 text-xs font-semibold">Download CSV</button>
              <button className="rounded-full bg-primary text-primary-foreground px-3 py-1.5 text-xs font-semibold">Push to CRM</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function Stat({ n, label, color }: { n: string; label: string; color?: "green" | "blue" }) {
  const bg = color === "green" ? "bg-green-50" : color === "blue" ? "bg-blue-50" : "bg-gray-50";
  const tone = color === "green" ? "text-green-700" : color === "blue" ? "text-blue-700" : "text-foreground";
  return (
    <div className={`${bg} rounded-xl p-3 text-center`}>
      <div className={`text-2xl font-extrabold ${tone}`}>{n}</div>
      <div className="text-[11px] text-muted-foreground mt-0.5">{label}</div>
    </div>
  );
}
