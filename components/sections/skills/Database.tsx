import React from 'react'
import { SkillCard } from './skill-card';
import { DiMongodb } from "react-icons/di";
import { SiPostgresql } from "react-icons/si";
import { GrMysql } from "react-icons/gr";
import { DiRedis } from "react-icons/di";


const skills = [
    {
      name: "MongoDb",
      icon: <DiMongodb className="h-8 w-8 text-orange-500" />,
      description: " A NoSQL database that stores data in flexible, JSON-like documents, ideal for unstructured data"
    },
    {
      name: "Postgresql",
      icon: <SiPostgresql className="h-8 w-8 text-blue-500" />,
      description: "A powerful, open-source relational database known for reliability and advanced features"
    },
    {
      name: "MySQL",
      icon: <GrMysql className="h-8 w-8 text-cyan-500" />,
      description: "A popular relational database for structured data, offering speed and ease of use"
    },
    {
        name: "Redis",
        icon: <DiRedis className="h-8 w-8 text-cyan-500" />,
        description: "An in-memory key-value store for caching, real-time data, and fast performance"
      },
  ];

const Database = () => {
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

export default Database;
