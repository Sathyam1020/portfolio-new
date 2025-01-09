import { prisma } from "@/lib/prisma";
import { z } from "zod";
import { ZodError } from 'zod';
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  try {
    const experiences = await prisma.experience.findMany({
      orderBy: {
        startDate: "desc",
      },
    });
    return NextResponse.json(experiences);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch experiences" },
      { status: 500 }
    );
  }
}



// Define a schema for the experience data validation using Zod
const addExperienceSchema = z.object({
    company: z.string().min(1, 'Company is required'),
    role: z.string().min(1, 'Role is required'),
    startDate: z.string().min(1, 'Start date is required'),
    endDate: z.string().min(1, 'End date is required'),
    description: z.string().min(1, 'Description is required'),
  })

  export async function POST(req: NextRequest) {
    try {
      // Parse and validate the incoming request body using Zod schema
      const { company, role, startDate, endDate, description } = await addExperienceSchema.parse(await req.json())

      // Create the experience in the database using Prisma
      const newExperience = await prisma.experience.create({
        data: {
          company,
          role,
          startDate: new Date(startDate),
          endDate: new Date(endDate),
          description,
        },
      })

      // Return a successful response with the newly created experience
      return NextResponse.json(
        { message: 'Experience created successfully', data: newExperience },
        { status: 201 }
      )
    } catch (error: any) {
      // Handle validation errors from Zod
      if (error instanceof ZodError) {
        return NextResponse.json(
          { message: 'Validation Error', errors: error.errors },
          { status: 400 }
        )
      }

      // Handle any other errors (internal server error)
      return NextResponse.json(
        { message: 'Internal Server Error', error: error.message },
        { status: 500 }
      )
    }
  }
