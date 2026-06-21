export function Testimonial() {
  return (
    <section className="bg-stone-50 py-20 md:py-28">
      <div className="max-w-6xl mx-auto px-6">
        <div className="rounded-[2.5rem] bg-white border border-border overflow-hidden grid lg:grid-cols-2 gap-10 lg:gap-16 items-center p-8 lg:p-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold italic tracking-tight">
              "Scalelist is a must-have!"
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed mt-6">
              We've been using Scalelist for six months and are extremely satisfied. The tool is powerful and intuitive,
              and the founders provide outstanding support. What stands out is that user feedback is not just heard but
              actively implemented. Regular updates make it even better. If you want to scale efficiently, Scalelist is a must-have!
            </p>
            <div className="font-semibold mt-6">Manuel Drissner</div>
            <div className="text-sm text-muted-foreground">Head of Sales @ Consolidate Software</div>
            <img
              src="https://scalelist.com/wp-content/uploads/2025/09/Manuel-Drissner-company.webp"
              alt="Consolidate Software"
              className="h-6 grayscale mt-3"
              loading="lazy"
            />
          </div>
          <div className="bg-[#F5C842] rounded-[2rem] overflow-hidden aspect-square">
            <img
              src="https://scalelist.com/wp-content/uploads/2026/03/Manuel-Drissner.webp"
              alt="Manuel Drissner"
              className="object-cover w-full h-full object-top"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
