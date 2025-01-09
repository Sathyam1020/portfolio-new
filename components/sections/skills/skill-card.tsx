import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface SkillCardProps {
  name: string;
  icon: React.ReactNode;
  description: string;
  className?: string;
}

export function SkillCard({
  name,
  icon,
  description,
  className,
}: SkillCardProps) {
  return (
    <Card
      className={cn(
        "group relative overflow-hidden border-gray-300 dark:border-white/[0.2] bg-white/90 dark:bg-black/50 p-6 transition-all hover:shadow-xl hover:shadow-gray-300 dark:hover:shadow-white/[0.1] rounded-3xl cursor-pointer",
        className
      )}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-100/[0.05] dark:via-white/[0.05] to-transparent group-hover:animate-shimmer" />
      <div className="relative z-10">
        <div className="mb-4 flex items-center justify-center">{icon}</div>
        <h3 className="mb-2 text-center text-lg font-semibold text-black dark:text-white">
          {name}
        </h3>
        <p className="text-center text-sm text-gray-600 dark:text-gray-400">
          {description}
        </p>
      </div>
    </Card>
  );
}
