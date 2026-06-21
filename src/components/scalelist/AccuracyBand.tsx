import { useEffect, useRef, useState } from "react";

const BARS = [
  { name: "Scalelist", pct: 95, color: "bg-primary" },
  { name: "Competitor A", pct: 72, color: "bg-gray-600" },
  { name: "Competitor B", pct: 68, color: "bg-gray-600" },
  { name: "Competitor C", pct: 61, color: "bg-gray-600" },
];

export function AccuracyBand() {
  const ref = useRef<HTMLDivElement>(null);
  const [animate, setAnimate] = useState(false);
  useEffect(() => {
    if (!ref.current) return;
    const io = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setAnimate(true); io.disconnect(); } },
      { threshold: 0.3 }
    );
    io.observe(ref.current);
    return () => io.disconnect();
  }, []);

  return (
    <section className="bg-[#1a1a1a] text-white py-20 md:py-28" ref={ref}>
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center">
          <span className="inline-block bg-white/10 text-white/60 rounded-full px-4 py-1 text-xs tracking-widest uppercase font-semibold">
            Statistics
          </span>
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight mt-4">The most accurate B2B data.</h2>
          <p className="text-lg md:text-xl text-white/60 mt-4 max-w-2xl mx-auto leading-relaxed">
            Up to 95% email and mobile coverage worldwide. Under 5% bounce rate. Verified weekly.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 mt-16 items-center">
          <div>
            <div className="text-7xl md:text-8xl font-extrabold text-primary leading-none">95%</div>
            <div className="text-xl mt-2 text-white/90">email & mobile coverage</div>

            <div className="mt-8 flex flex-col gap-4">
              {BARS.map((b) => (
                <div key={b.name} className="flex items-center gap-3">
                  <span className="text-white/70 text-sm w-28 flex-shrink-0">{b.name}</span>
                  <div className="flex-1 bg-gray-700 rounded-full h-2.5 overflow-hidden">
                    <div
                      className={`${b.color} h-full rounded-full transition-all duration-1000 ease-out`}
                      style={{ width: animate ? `${b.pct}%` : "0%" }}
                    />
                  </div>
                  <span className="text-white/60 text-sm w-10 text-right">{b.pct}%</span>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <div className="bg-white/10 rounded-2xl p-6 border border-white/10">
              <p className="text-white text-lg leading-relaxed">
                "We went from 40% email coverage to 87% overnight. Scalelist changed our entire outbound operation."
              </p>
              <p className="text-white/60 text-sm mt-3">— Jake R., VP Sales @ growth-stage SaaS</p>
            </div>
            <div className="bg-white/10 rounded-2xl p-6 border border-white/10">
              <p className="text-white text-lg leading-relaxed">
                "Mobile numbers that actually work. We're reaching decision-makers directly, not gatekeepers."
              </p>
              <p className="text-white/60 text-sm mt-3">— Sofia M., Head of Outbound @ B2B Agency</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
