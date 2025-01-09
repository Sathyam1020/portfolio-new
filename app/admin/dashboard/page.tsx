import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { prisma } from "@/lib/prisma";

export default async function DashboardPage() {
  const [projectCount, experienceCount] = await Promise.all([
    prisma.project.count(),
    prisma.experience.count(),
  ]);

  return (
    <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
      <Card>
        <CardHeader>
          <CardTitle>Total Projects</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-3xl font-bold">{projectCount}</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Work Experience</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-3xl font-bold">{experienceCount}</p>
        </CardContent>
      </Card>
    </div>
  );
}