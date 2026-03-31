import { ProjectConfig } from "@/config/project-data";

export default function ProjectHighlights({ data }: { data: ProjectConfig["projectHighlights"] }) {
  return (
    <section className="bg-background relative z-40 -mt-1 border-b border-border/50 overflow-hidden">
      <div className="w-full">
        {/* Added border-t on mobile to complete the grid look when stacked */}
        <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-y md:divide-y-0 divide-border/60 border-t md:border-t-0 border-border/60">
          {data.map((highlight, i) => {
            const [number, ...labelParts] = highlight.split(' ');
            const label = labelParts.join(' ');

            return (
              <div 
                key={i} 
                className="group relative flex flex-col items-center justify-center py-12 md:py-20 px-4 md:px-8 
                           cursor-pointer hover:bg-secondary/40 transition-all duration-700 
                           overflow-hidden reveal-on-scroll reveal-active"
                style={{ transitionDelay: `${i * 150}ms` }}
              >
                {/* 1. Large Background Number (Watermark) - Scaled down for mobile */}
                <span className="absolute -bottom-4 -right-1 text-6xl md:text-8xl font-serif italic text-primary/5 
                                 group-hover:text-primary/10 group-hover:-translate-y-2 md:group-hover:-translate-y-4 
                                 transition-all duration-1000 select-none">
                  0{i + 1}
                </span>

                {/* 2. Main Stat Number - Scaled down for mobile */}
                <div className="relative mb-1 md:mb-3">
                  <h4 className="text-4xl md:text-7xl font-serif text-foreground 
                                 group-hover:text-primary group-hover:scale-105 
                                 transition-all duration-500 ease-out">
                    {number}
                  </h4>
                  {/* Luxury Accent Dot - Hidden on smallest mobile to prevent clutter */}
                  <div className="absolute -right-3 md:-right-4 bottom-2 md:bottom-3 w-1.5 md:h-2 md:w-2 h-1.5 bg-primary rounded-full 
                                  scale-0 group-hover:scale-100 transition-transform duration-500 delay-100" />
                </div>

                {/* 3. Stat Label - Tighter tracking and smaller size for mobile */}
                <p className="text-[0.55rem] md:text-[0.7rem] uppercase font-black tracking-[0.2em] md:tracking-[0.5em] 
                              text-muted-foreground group-hover:text-foreground 
                              transition-colors duration-500 text-center px-1">
                  {label}
                </p>

                {/* 4. Top Architectural Reveal Line */}
                <div className="absolute top-0 left-0 w-full h-0.75 bg-primary 
                                scale-x-0 group-hover:scale-x-100 transition-transform 
                                duration-700 origin-left" />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}