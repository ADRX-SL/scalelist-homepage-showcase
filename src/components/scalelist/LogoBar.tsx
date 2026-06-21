const LOGOS = [
  { name: "Cloudera", src: "https://scalelist.com/wp-content/uploads/2026/03/cloudera-grayscale.webp" },
  { name: "HLTH", src: "https://scalelist.com/wp-content/uploads/2026/04/hlth-logo.png", caseStudy: "https://scalelist.com/hlth/" },
  { name: "Eleven Labs", src: "https://scalelist.com/wp-content/uploads/2026/03/elevenlab-grayscale.webp" },
  { name: "Lemlist", src: "https://scalelist.com/wp-content/uploads/2026/04/lemlist-logo.jpg" },
  { name: "BD Becton Dickinson", src: "https://scalelist.com/wp-content/uploads/2026/03/bd-grayscale.webp", caseStudy: "https://scalelist.com/becton-dickinson/" },
  { name: "Deloitte", src: "https://scalelist.com/wp-content/uploads/2026/04/deloitte-logo.png" },
  { name: "MongoDB", src: "https://scalelist.com/wp-content/uploads/2026/04/mongodb-logo.png" },
  { name: "Cyngn", src: "https://scalelist.com/wp-content/uploads/2026/04/cyngn-logo.png" },
  { name: "Oracle NetSuite", src: "https://scalelist.com/wp-content/uploads/2026/03/nesuite-grayscale.webp" },
  { name: "Tangentia", src: "https://scalelist.com/wp-content/uploads/2026/04/tangentia-logo.png" },
  { name: "Barbri", src: "https://scalelist.com/wp-content/uploads/2026/04/barbari-logo.png" },
  { name: "Fluentbe", src: "https://scalelist.com/wp-content/uploads/2026/04/fluentbe-logo.png" },
  { name: "Qlerify", src: "https://scalelist.com/wp-content/uploads/2026/04/qlerify-logo.png" },
  { name: "Growth Labz", src: "https://scalelist.com/wp-content/uploads/2026/04/growth-labz-logo.jpg", caseStudy: "https://scalelist.com/growth-labz/" },
  { name: "Lumin.ai", src: "https://scalelist.com/wp-content/uploads/2026/04/luminai-logo.png" },
  { name: "WeatherShield", src: "https://scalelist.com/wp-content/uploads/2026/04/weathershield-logo.png" },
];

export function LogoBar() {
  return (
    <section className="border-y border-border py-12 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <p className="text-sm text-muted-foreground text-center mb-8">
          Trusted by Ops/Sales teams at leading B2B companies
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-x-8 gap-y-8 items-center">
          {LOGOS.map((l) => (
            <div key={l.name} className="relative flex items-center justify-center h-10">
              <img
                src={l.src}
                alt={l.name}
                loading="lazy"
                className="max-h-8 max-w-[120px] object-contain grayscale opacity-60 hover:opacity-100 transition"
              />
              {l.caseStudy && (
                <a
                  href={l.caseStudy}
                  className="absolute -top-3 -right-1 text-[9px] font-semibold uppercase tracking-wider bg-primary text-primary-foreground rounded-full px-2 py-0.5 shadow-sm"
                >
                  Case Study
                </a>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
