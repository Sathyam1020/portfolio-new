import { PrismaClient } from '@prisma/client';
import { hash } from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  // Create admin user
  const adminPassword = await hash('admin123', 12);
  await prisma.admin.create({
    data: {
      email: 'admin@example.com',
      password: adminPassword,
    },
  });

  // Create sample projects
  await prisma.project.createMany({
    data: [
      {
        title: 'E-commerce Platform',
        description: 'A full-stack e-commerce platform built with Next.js and Stripe integration.',
        image: 'https://images.unsplash.com/photo-1557821552-17105176677c?w=800&h=450&fit=crop',
        githubUrl: 'https://github.com',
        liveUrl: 'https://example.com',
      },
      {
        title: 'Task Management App',
        description: 'A collaborative task management application with real-time updates.',
        image: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800&h=450&fit=crop',
        githubUrl: 'https://github.com',
        liveUrl: 'https://example.com',
      },
      {
        title: 'Social Media Dashboard',
        description: 'Analytics dashboard for social media management and monitoring.',
        image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=450&fit=crop',
        githubUrl: 'https://github.com',
        liveUrl: 'https://example.com',
      },
    ],
  });

  // Create sample experiences
  await prisma.experience.createMany({
    data: [
      {
        company: 'Tech Innovators Inc.',
        role: 'Senior Full Stack Developer',
        description: 'Led development of enterprise applications using Next.js and Node.js. Implemented CI/CD pipelines and mentored junior developers.',
        startDate: new Date('2022-01-01'),
        endDate: null,
      },
      {
        company: 'Digital Solutions Ltd.',
        role: 'Full Stack Developer',
        description: 'Developed and maintained multiple client projects. Worked with React, TypeScript, and PostgreSQL.',
        startDate: new Date('2020-03-01'),
        endDate: new Date('2021-12-31'),
      },
      {
        company: 'StartUp Hub',
        role: 'Frontend Developer',
        description: 'Built responsive web applications using React and Redux. Collaborated with UX designers to implement pixel-perfect designs.',
        startDate: new Date('2018-06-01'),
        endDate: new Date('2020-02-28'),
      },
    ],
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });