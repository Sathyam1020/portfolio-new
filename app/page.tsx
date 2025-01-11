'use client'

import { Hero } from "@/components/sections/hero";
import { Projects } from "@/components/sections/projects";
import { Experience } from "@/components/sections/experience";
import { Contact } from "@/components/sections/contact";
import { prisma } from "@/lib/prisma";
import { Navbar } from "@/components/layout/navbar";
import { SkillsPage } from "@/components/sections/skills/skillspage";
import { useEffect, useState } from "react";

export default function Home() {

    const [experiences, setExperiences] = useState([]);
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

// Get all the experiences
  useEffect(() => {
    async function fetchExperiences() {
      try {
        const response = await fetch("/api/experiences");
        if (!response.ok) throw new Error("Failed to fetch experiences");
        const result = await response.json();
        // console.log(result)
        setExperiences(result);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchExperiences();
  }, []);

  // Get all the projects
  useEffect(() => {
    async function fetchProjects() {
      try {
        const response = await fetch("/api/projects");
        if (!response.ok) throw new Error("Failed to fetch projects");
        const result = await response.json();
        // console.log(result);
        setProjects(result);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchProjects();
  }, []);

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
