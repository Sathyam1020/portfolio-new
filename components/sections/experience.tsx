"use client";

import { motion } from "framer-motion";
import { format } from "date-fns";
import { Briefcase } from "lucide-react";
import type { Experience } from "@prisma/client";

interface ExperienceProps {
  experiences: Experience[];
}

export function Experience({ experiences }: ExperienceProps) {
  return (
    <section id="experience" className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-6xl font-bold text-center text-black dark:text-white mb-6">
            Work{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-500 to-pink-500">
              Experience
            </span>
          </h1>
          <p className="text-muted-foreground">
            My professional journey and the companies I've worked with.
          </p>
        </motion.div>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute hidden sm:block left-1/2 transform -translate-x-px h-full w-0.5 bg-border" />

          {/* Experience items */}
          <div className="space-y-12 sm:space-y-16">
            {experiences.map((experience, index) => (
              <motion.div
                key={experience.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className={`relative flex flex-col sm:flex-row items-start sm:items-center ${
                  index % 2 === 0
                    ? "sm:justify-start sm:items-start"
                    : "sm:justify-end sm:items-start"
                }`}
              >
                {/* Timeline dot */}
                <div className="absolute left-1/2 hidden sm:block transform -translate-x-1/2 w-4 h-4 rounded-full bg-primary border-4 border-background" />

                {/* Content card */}
                <div
                  className={`w-full sm:w-5/12 ${
                    index % 2 === 0
                      ? "sm:pr-8 sm:text-right"
                      : "sm:pl-8 sm:text-left"
                  }`}
                >
                  <div className="bg-card p-6 rounded-lg shadow-lg dark:border-slate-800 dark:border-2 dark:bg-gray-950">
                    <div className={`flex items-center gap-3 mb-2 ${
                        index % 2 === 0
                            ? "md:justify-end lg:justify-end justify-start"
                            : "justify-start"
                    }`}>
                      <Briefcase size={20} className="text-primary" />
                      <h3 className="text-xl font-semibold">{experience.role}</h3>
                    </div>
                    <p className="text-lg font-medium mb-2">{experience.company}</p>
                    <p className="text-sm text-muted-foreground mb-4">
                      {format(new Date(experience.startDate), "MMM yyyy")} -{" "}
                      {experience.endDate
                        ? format(new Date(experience.endDate), "MMM yyyy")
                        : "Present"}
                    </p>
                    <p className="text-muted-foreground">{experience.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
