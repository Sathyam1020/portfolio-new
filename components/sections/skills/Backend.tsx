import React from 'react'
import {
    Code2,
    Palette,
    Wind,
    Atom,
    Boxes,
    Database,
    Table,
  } from "lucide-react";
import { SkillCard } from './skill-card';
import { FaNodeJs } from "react-icons/fa";
import { SiExpress } from "react-icons/si";

const skills = [
    {
      name: "NodeJs",
      icon: <FaNodeJs className="h-8 w-8 text-orange-500" />,
      description: "A runtime environment for executing JavaScript on the server, enabling scalable, high-performance backend development"
    },
    {
      name: "ExpressJs",
      icon: <SiExpress className="h-8 w-8 text-blue-500" />,
      description: "A minimal and flexible Node.js framework for building fast, scalable, and robust APIs and web applications"
    },
    {
      name: "NextAuth",
      icon: <Wind className="h-8 w-8 text-cyan-500" />,
      description: "A flexible and secure authentication library for Next.js, supporting OAuth, credentials, and custom login strategies"
    },
  ];

const Backend = () => {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {skills.map((skill) => (
        <SkillCard
          key={skill.name}
          name={skill.name}
          icon={skill.icon}
          description={skill.description}
        />
      ))}
    </div>
  )
}

export default Backend;
