import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { z } from "zod";
import { ZodError } from 'zod';
export const dynamic = "force-dynamic";

// GET request to fetch all projects
export async function GET() {
  try {
    const projects = await prisma.project.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
    return NextResponse.json(projects); // Return the projects as JSON
  } catch (error) {
    console.error("Error fetching projects:", error);
    return NextResponse.json(
      { error: "Failed to fetch projects" },
      { status: 500 }
    );
  }
}

const addProjectSchema = z.object({
    title: z.string(),
    description: z.string(),
    image:z.string(),
    githubUrl:z.string(),
    liveUrl:z.string(),
});


export async function POST(req: NextRequest) {
    try {
        const { title, description, image, githubUrl, liveUrl } = await addProjectSchema.parse(await req.json());

        // Create the project in the database
        const newProject = await prisma.project.create({
            data: { title, description, image, githubUrl, liveUrl },
        });

        return NextResponse.json({ message: "Project created successfully", data: newProject }, { status: 201 });
    } catch (error: any) {
        if (error instanceof ZodError) {
            return NextResponse.json({ message: "Validation Error", errors: error.errors }, { status: 400 });
        }
        return NextResponse.json({ message: "Internal Server Error", error: error.message }, { status: 500 });
    }
}
