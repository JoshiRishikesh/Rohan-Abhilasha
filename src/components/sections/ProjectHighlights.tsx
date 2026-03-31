import { ProjectConfig } from "@/config/project-data";

export default function ProjectHighlights({ data }: { data: ProjectConfig["projectHighlights"] }) {
  return (
    <section className="bg-background relative z-40 -mt-1 border-b border-border/50">
      <div className="w-full">
        {/* Changed to 2 cols on mobile, 4 on desktop for better fit */}
        <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-border/60">
          {data.map((highlight, i) => {
            const [number, ...labelParts] = highlight.split(' ');
            const label = labelParts.join(' ');

            return (
              <div 
                key={i} 
                className="group relative flex flex-col items-center justify-center py-20 px-8 
                           cursor-pointer hover:bg-secondary/40 transition-all duration-700 
                           overflow-hidden reveal-on-scroll reveal-active"
                style={{ transitionDelay: `${i * 150}ms` }}
              >
                {/* 1. Large Background Number (Watermark) */}
                <span className="absolute -bottom-6 -right-2 text-8xl font-serif italic text-primary/5 
                                 group-hover:text-primary/10 group-hover:-translate-y-4 
                                 transition-all duration-1000 select-none">
                  0{i + 1}
                </span>

                {/* 2. Main Stat Number */}
                <div className="relative mb-3">
                  <h4 className="text-5xl md:text-7xl font-serif text-foreground 
                                 group-hover:text-primary group-hover:scale-105 
                                 transition-all duration-500 ease-out">
                    {number}
                  </h4>
                  {/* Luxury Accent Dot */}
                  <div className="absolute -right-4 bottom-3 w-2 h-2 bg-primary rounded-full 
                                  scale-0 group-hover:scale-100 transition-transform duration-500 delay-100" />
                </div>

                {/* 3. Stat Label */}
                <p className="text-[0.6rem] md:text-[0.7rem] uppercase font-black tracking-[0.5em] 
                              text-muted-foreground group-hover:text-foreground 
                              transition-colors duration-500 text-center px-2">
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