import { createFileRoute } from "@tanstack/react-router";
import { NavBar } from "@/components/scalelist/NavBar";
import { HeroSectionDup } from "@/components/scalelist/HeroSectionDup";
import { LogoBar } from "@/components/scalelist/LogoBar";
import { Testimonial } from "@/components/scalelist/Testimonial";
import { FeatureRows } from "@/components/scalelist/FeatureRows";
import { AccuracyBand } from "@/components/scalelist/AccuracyBand";
import { DataRefresh } from "@/components/scalelist/DataRefresh";
import { UseCases } from "@/components/scalelist/UseCases";
import { Integrations } from "@/components/scalelist/Integrations";
import { Footer } from "@/components/scalelist/Footer";

export const Route = createFileRoute("/duplicate")({
  head: () => ({
    meta: [
      { title: "Scalelist — Find any lead's email & phone, anywhere" },
      { name: "description", content: "Find 80%+ of your leads' verified emails and mobile numbers, anywhere, worldwide, in one click. Stop losing deals because you couldn't reach them." },
      { property: "og:title", content: "Scalelist — Find any lead's email & phone, anywhere" },
      { property: "og:description", content: "Find 80%+ of your leads' verified emails and mobile numbers, anywhere, worldwide, in one click." },
    ],
  }),
  component: DuplicatePage,
});

function DuplicatePage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <NavBar />
      <main>
        <HeroSectionDup />
        <LogoBar />
        <FeatureRows />
        <AccuracyBand />
        <UseCases />
        <Integrations />
        <Testimonial />
        <DataRefresh />
      </main>
      <Footer />
    </div>
  );
}
