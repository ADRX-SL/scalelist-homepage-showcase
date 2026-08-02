const INTEGRATIONS = [
  "HubSpot",
  "Salesforce",
  "Instantly",
  "lemlist",
  "Clay",
  "n8n",
  "Zapier",
  "Claude",
  "ChatGPT",
  "REST API",
];

export function Integrations() {
  return (
    <section className="bg-white py-20 md:py-28">
      <div className="max-w-5xl mx-auto px-6 text-center">
        <div className="text-xs font-bold uppercase tracking-[0.2em] text-primary">Integrations</div>
        <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight mt-3">
          Push enriched contacts wherever you sell.
        </h2>
        <p className="text-lg text-muted-foreground mt-4 max-w-2xl mx-auto">
          Send verified emails and direct mobile numbers straight into your CRM, sequencer, or automation stack.
        </p>

        <ul className="mt-12 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {INTEGRATIONS.map((name) => (
            <li
              key={name}
              className="rounded-2xl border border-border bg-white px-4 py-5 text-sm font-semibold text-foreground shadow-sm hover:shadow-md hover:border-primary/40 transition"
            >
              {name}
            </li>
          ))}
        </ul>

        <div className="mt-10 flex gap-6 justify-center flex-wrap text-sm font-semibold">
          <a href="https://scalelist.com/integrations/" className="text-primary hover:underline">
            See all integrations →
          </a>
          <a href="https://app.scalelist.com/docs" className="text-primary hover:underline">
            API docs →
          </a>
        </div>
      </div>
    </section>
  );
}
