import * as React from "react";
import { cn } from "@/lib/utils";

export const AnimatedTooltip = ({
  items,
}: {
  items: {
    id: number;
    name: string;
    icon: React.ReactNode;
    level: number;
  }[];
}) => {
  return (
    <div className="flex flex-wrap justify-center gap-4 md:gap-8">
      {items.map((item) => (
        <div
          key={item.id}
          className="group relative flex items-center justify-center"
        >
          <div className="flex h-24 w-24 items-center justify-center rounded-xl bg-white/[0.1] p-4 group-hover:bg-white/[0.15] transition-all duration-300">
            <div className="relative h-16 w-16 group-hover:scale-110 transition-all duration-300">
              {item.icon}
            </div>
          </div>
          <div className="absolute -bottom-20 left-1/2 -translate-x-1/2 transform opacity-0 group-hover:opacity-100 transition-all duration-300">
            <div className="flex flex-col items-center">
              <div className="rounded-md bg-black px-4 py-2 text-white">
                <p className="text-sm font-bold">{item.name}</p>
                <div className="mt-1 h-1.5 w-full rounded-full bg-gray-700">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-pink-500 to-violet-500 transition-all duration-300"
                    style={{ width: `${item.level}%` }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
