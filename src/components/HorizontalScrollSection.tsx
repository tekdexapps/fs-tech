import { useEffect, useRef } from 'react';
import { Laptop, Code2, Palette, Rocket, Users, Award } from 'lucide-react';

const technologies = [
  { name: "React", description: "Modern UI Development", icon: Code2, color: "golden" },
  { name: "TypeScript", description: "Type-Safe Programming", icon: Laptop, color: "orange-red" },
  { name: "Design Systems", description: "Consistent UI/UX", icon: Palette, color: "warm-amber" },
  { name: "Performance", description: "Lightning Fast Apps", icon: Rocket, color: "warm-gray" },
  { name: "Team Collaboration", description: "Agile Development", icon: Users, color: "golden" },
  { name: "Quality Assurance", description: "Tested & Reliable", icon: Award, color: "orange-red" },
];

const HorizontalScrollSection = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scrollElement = scrollRef.current;
    if (!scrollElement) return;

    const handleScroll = () => {
      const rect = scrollElement.getBoundingClientRect();
      const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
      
      if (isVisible) {
        const scrollProgress = Math.max(0, Math.min(1, (window.innerHeight - rect.top) / (window.innerHeight + rect.height)));
        
        const items = scrollElement.querySelectorAll('.scroll-item');
        items.forEach((item, index) => {
          const element = item as HTMLElement;
          const delay = index * 0.1;
          const opacity = Math.max(0.3, Math.min(1, scrollProgress + delay));
          const translateY = (1 - scrollProgress) * 30;
          const scale = Math.max(0.95, Math.min(1, scrollProgress + delay));
          
          element.style.transform = `translateY(${translateY}px) scale(${scale})`;
          element.style.opacity = opacity.toString();
        });
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial call

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section className="py-32 overflow-hidden" ref={scrollRef}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-20">
          <h2 className="text-5xl md:text-6xl font-bold mb-6">
            Our <span className="text-gradient-primary">Technology</span> Stack
          </h2>
          <p className="text-xl text-text-secondary max-w-3xl mx-auto">
            Cutting-edge technologies for <span className="text-gradient-accent font-semibold">exceptional results</span>
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {technologies.map((tech, index) => {
            const IconComponent = tech.icon;
            return (
              <div
                key={index}
                className={`scroll-item group p-8 rounded-3xl bg-glass border border-${tech.color}/20 hover:border-${tech.color}/40 transition-all duration-700 hover:shadow-card-elevated hover:scale-105`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className={`w-16 h-16 bg-${tech.color}/10 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-${tech.color}/20 transition-all duration-500 group-hover:rotate-12 group-hover:scale-110`}>
                  <IconComponent className={`h-8 w-8 text-${tech.color}`} />
                </div>
                
                <h3 className={`text-2xl font-bold mb-3 group-hover:text-${tech.color} transition-colors duration-300`}>
                  {tech.name}
                </h3>
                
                <p className="text-text-muted group-hover:text-text-secondary transition-colors duration-300">
                  {tech.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default HorizontalScrollSection;