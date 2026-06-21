import { useState } from "react";
import { Code2, Upload, Globe } from "lucide-react";
import { TabClaude } from "./tabs/TabClaude";
import { TabApi } from "./tabs/TabApi";
import { TabCsv } from "./tabs/TabCsv";
import { TabExtension } from "./tabs/TabExtension";
import { ClaudeLogo } from "./ClaudeLogo";

const TABS = [
  { id: "claude", label: "Find with Claude", icon: ClaudeLogo },
  { id: "api", label: "Enrich via API", icon: Code2 },
  { id: "csv", label: "CSV & CRM Upload", icon: Upload },
  { id: "ext", label: "Chrome Extension", icon: Globe },
] as const;

type TabId = (typeof TABS)[number]["id"];

export function ProductShowcase() {
  const [active, setActive] = useState<TabId>("claude");

  return (
    <div className="max-w-6xl mx-auto rounded-[2rem] border border-border bg-white shadow-xl overflow-hidden text-left">
      <div className="bg-gray-50 border-b border-border px-4 sm:px-6 pt-4">
        <div className="flex justify-center gap-1 sm:gap-2 overflow-x-auto pb-0 no-scrollbar">
          {TABS.map((t) => {
            const Icon = t.icon;
            const isActive = active === t.id;
            return (
              <button
                key={t.id}
                onClick={() => setActive(t.id)}
                className={
                  isActive
                    ? "flex items-center gap-2 whitespace-nowrap bg-white shadow-sm border border-border border-b-white rounded-t-xl px-4 sm:px-5 py-2.5 text-sm font-semibold text-foreground -mb-px z-10 relative"
                    : "flex items-center gap-2 whitespace-nowrap rounded-full px-4 sm:px-5 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                }
              >
                <Icon className="w-4 h-4" />
                {t.label}
              </button>
            );
          })}
        </div>
      </div>

      <div key={active} className="fade-up h-[580px] overflow-hidden">
        {active === "claude" && <TabClaude />}
        {active === "api" && <TabApi />}
        {active === "csv" && <TabCsv />}
        {active === "ext" && <TabExtension />}
      </div>
    </div>
  );
}
