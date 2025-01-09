import { TabsDemo } from "../skills";
import { HeroSection } from "./animated-text";
import { SkillsGrid } from "./skills-section";

export function SkillsPage() {
  return (
    <section id="skills">
        <div className="min-h-screen w-full bg-white dark:bg-black/[0.96] antialiased bg-grid-black/[0.02] dark:bg-grid-white/[0.02] relative">
        {/* Background overlay */}
        <div className="absolute pointer-events-none inset-0 flex items-center justify-center bg-white dark:bg-black [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />

        {/* Content */}
        <div className="relative z-10 container mx-auto px-4 py-20">
            <HeroSection />
            <TabsDemo />
        </div>
        </div>
    </section>
  );
}
