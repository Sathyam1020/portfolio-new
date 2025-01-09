
import {
  Code2,
  Palette,
  Wind,
  Atom,
  Boxes,
  Database,
  Table,
} from "lucide-react";
import { SkillCard } from "./skill-card";

const skills = [
  {
    name: "HTML",
    icon: <Code2 className="h-8 w-8 text-orange-500" />,
    description: "Semantic markup and modern HTML5 features"
  },
  {
    name: "CSS",
    icon: <Palette className="h-8 w-8 text-blue-500" />,
    description: "Modern layouts with Flexbox and Grid"
  },
  {
    name: "Tailwind CSS",
    icon: <Wind className="h-8 w-8 text-cyan-500" />,
    description: "Utility-first CSS framework expertise"
  },
  {
    name: "React",
    icon: <Atom className="h-8 w-8 text-blue-400" />,
    description: "Component-based UI development"
  },
  {
    name: "Next.js",
    icon: <Boxes className="h-8 w-8 text-white" />,
    description: "Full-stack React applications"
  },
  {
    name: "MongoDB",
    icon: <Database className="h-8 w-8 text-green-500" />,
    description: "NoSQL database management"
  },
  {
    name: "MySQL",
    icon: <Table className="h-8 w-8 text-blue-600" />,
    description: "Relational database design"
  }
];

export function SkillsGrid() {
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
  );
}
