import { Hero } from "@/components/sections/hero";
import { Projects } from "@/components/sections/projects";
import { Experience } from "@/components/sections/experience";
import { Contact } from "@/components/sections/contact";
import { prisma } from "@/lib/prisma";
import { Navbar } from "@/components/layout/navbar";
import { SkillsPage } from "@/components/sections/skills/skillspage";

export default async function Home() {
  const [projects, experiences] = await Promise.all([
    prisma.project.findMany({
      orderBy: {
        createdAt: "desc",
      },
    }),
    prisma.experience.findMany({
      orderBy: {
        startDate: "desc",
      },
    }),
  ]);
  console.log("Projects:", projects);
  console.log("Experience: ", experiences);

  return (
    <main>
      <Navbar/>
      <Hero />
      <Projects projects={projects} />
      <SkillsPage />
      <Experience experiences={experiences} />
      <Contact />
    </main>
  );
}
