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
              We use Scalelist everyday. It's a really good product that helps us find our prospects' emails and phone
              numbers.
            </p>
            <div className="font-semibold mt-6">Baptiste Graffin</div>
            <div className="text-sm text-muted-foreground">VP of Sales APAC @ Happydemics</div>
          </div>
          <div className="flex items-center justify-center">
            <div
              aria-label="Baptiste Graffin"
              className="w-40 h-40 md:w-56 md:h-56 rounded-full bg-primary/10 text-primary flex items-center justify-center text-4xl md:text-6xl font-extrabold tracking-tight"
            >
              BG
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
