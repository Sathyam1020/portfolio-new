import React from 'react'
import { SkillCard } from './skill-card';
import { TbApi } from "react-icons/tb";
import { Unplug } from 'lucide-react';
import { GrGraphQl } from "react-icons/gr";


const skills = [
    {
      name: "Rest API",
      icon: <TbApi className="h-8 w-8 text-orange-500" />,
      description: "A standard architecture for building APIs using stateless HTTP methods like GET, POST, and DELETE"
    },
    {
      name: "Sockets",
      icon: <Unplug className="h-8 w-8 text-blue-500" />,
      description: "A full-duplex communication protocol enabling real-time, bidirectional data exchange between clients and servers"
    },
    {
      name: "MySQL",
      icon: <GrGraphQl className="h-8 w-8 text-cyan-500" />,
      description: "A popular relational database for structured data, offering speed and ease of use"
    },
  ];

const Others = () => {
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

export default Others;
