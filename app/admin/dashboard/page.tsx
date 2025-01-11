'use client'

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function DashboardPage() {
  const [experiences, setExperiences] = useState();
  const [projects, setProjects] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Get all the experiences
  useEffect(() => {
    async function fetchExperiences() {
      try {
        const response = await fetch("/api/experiences");
        if (!response.ok) throw new Error("Failed to fetch experiences");
        const result = await response.json();
        setExperiences(result.length);
        // console.log("Experiences:", result.length);
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
        setProjects(result.length);
        // console.log("Projects:", result.length);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchProjects();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
      <Card>
        <CardHeader>
          <CardTitle>Total Projects</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-3xl font-bold">{projects}</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Work Experience</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-3xl font-bold">{experiences}</p>
        </CardContent>
      </Card>
    </div>
  );
}
