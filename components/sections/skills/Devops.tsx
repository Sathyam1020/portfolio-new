import React from 'react'
import { SkillCard } from './skill-card';
import { FaDocker } from "react-icons/fa";
import { SiKubernetes } from "react-icons/si";
import { FaGithub } from "react-icons/fa";

const skills = [
    {
      name: "Docker",
      icon: <FaDocker className="h-8 w-8 text-orange-500" />,
      description: "A runtime environment for executing JavaScript on the server, enabling scalable, high-performance backend development"
    },
    {
      name: "Kubernetes",
      icon: <SiKubernetes className="h-8 w-8 text-blue-500" />,
      description: "A minimal and flexible Node.js framework for building fast, scalable, and robust APIs and web applications"
    },
    {
      name: "Github",
      icon: <FaGithub className="h-8 w-8 text-cyan-500" />,
      description: "A flexible and secure authentication library for Next.js, supporting OAuth, credentials, and custom login strategies"
    },
  ];

const Devops = () => {
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

export default Devops;
