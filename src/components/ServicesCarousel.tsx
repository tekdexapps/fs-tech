import useEmblaCarousel from 'embla-carousel-react';
import { useCallback, useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight, Monitor, Smartphone, Cloud, Database, Shield, Zap } from 'lucide-react';
import { Button } from "@/components/ui/button";
import Autoplay from 'embla-carousel-autoplay';

const services = [
  {
    icon: Monitor,
    title: "Web Development",
    description: "Custom web applications built with modern frameworks and cutting-edge technologies.",
    color: "golden",
    features: ["React & Next.js", "TypeScript", "Modern UI/UX", "Performance Optimized"]
  },
  {
    icon: Smartphone,
    title: "Mobile Development",
    description: "Native and cross-platform mobile apps that deliver exceptional user experiences.",
    color: "orange-red",
    features: ["iOS & Android", "React Native", "Flutter", "App Store Ready"]
  },
  {
    icon: Cloud,
    title: "Cloud Solutions",
    description: "Scalable cloud infrastructure and deployment solutions for your applications.",
    color: "warm-amber",
    features: ["AWS & Azure", "DevOps", "Auto Scaling", "Monitoring"]
  },
  {
    icon: Database,
    title: "Database Design",
    description: "Robust database architecture and optimization for maximum performance.",
    color: "warm-gray",
    features: ["SQL & NoSQL", "Data Modeling", "Performance Tuning", "Backup & Recovery"]
  },
  {
    icon: Shield,
    title: "Security Solutions",
    description: "Comprehensive security implementation to protect your digital assets.",
    color: "golden",
    features: ["Encryption", "Authentication", "Vulnerability Testing", "Compliance"]
  },
  {
    icon: Zap,
    title: "Performance Optimization",
    description: "Speed up your applications with advanced optimization techniques.",
    color: "orange-red",
    features: ["Code Splitting", "Caching", "CDN Integration", "Bundle Optimization"]
  }
];

const ServicesCarousel = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ 
    loop: true,
    align: 'start',
    skipSnaps: false,
    dragFree: true,
    duration: 30
  }, [Autoplay({ delay: 3000, stopOnInteraction: false })]);
  
  const [prevBtnDisabled, setPrevBtnDisabled] = useState(true);
  const [nextBtnDisabled, setNextBtnDisabled] = useState(true);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const scrollTo = useCallback((index: number) => {
    if (emblaApi) emblaApi.scrollTo(index);
  }, [emblaApi]);

  const onInit = useCallback((emblaApi: any) => {
    setScrollSnaps(emblaApi.scrollSnapList());
  }, []);

  const onSelect = useCallback((emblaApi: any) => {
    setSelectedIndex(emblaApi.selectedScrollSnap());
    setPrevBtnDisabled(!emblaApi.canScrollPrev());
    setNextBtnDisabled(!emblaApi.canScrollNext());
  }, []);

  useEffect(() => {
    if (!emblaApi) return;

    onInit(emblaApi);
    onSelect(emblaApi);
    emblaApi.on('reInit', onInit);
    emblaApi.on('reInit', onSelect);
    emblaApi.on('select', onSelect);
  }, [emblaApi, onInit, onSelect]);

  return (
    <section className="py-24 px-6 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-grid opacity-50"></div>
      <div className="absolute top-20 left-20 w-32 h-32 bg-golden/10 rounded-full blur-3xl animate-float"></div>
      <div className="absolute bottom-20 right-20 w-48 h-48 bg-orange-red/10 rounded-full blur-3xl animate-float" style={{animationDelay: '2s'}}></div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16 animate-slide-up">
          <h2 className="text-5xl md:text-6xl font-bold mb-6">
            Our <span className="text-gradient-primary">Services</span>
          </h2>
          <p className="text-xl text-text-secondary max-w-3xl mx-auto leading-relaxed">
            Comprehensive technology solutions designed to <span className="text-gradient-accent font-semibold">elevate your business</span> to new heights
          </p>
        </div>

        {/* Carousel */}
        <div className="relative">
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex transition-transform duration-300 ease-out">
              {services.map((service, index) => {
                const IconComponent = service.icon;
                return (
                  <div key={index} className="flex-[0_0_350px] min-w-0 pl-6 animate-fade-in hover:scale-105 transition-all duration-500" style={{animationDelay: `${index * 0.1}s`}}>
                    <div className={`group h-full p-8 rounded-3xl bg-glass border border-${service.color}/20 hover:border-${service.color}/40 transition-all duration-500 hover:shadow-card-elevated transform hover:-translate-y-2`}>
                      <div className={`w-16 h-16 bg-${service.color}/10 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-${service.color}/20 transition-colors group-hover:animate-pulse group-hover:scale-110 duration-300`}>
                        <IconComponent className={`h-8 w-8 text-${service.color} transition-transform group-hover:rotate-12`} />
                      </div>
                      
                      <h3 className="text-2xl font-bold mb-4 group-hover:text-gradient-primary transition-all">
                        {service.title}
                      </h3>
                      
                      <p className="text-text-muted leading-relaxed mb-6">
                        {service.description}
                      </p>
                      
                      <div className="space-y-2">
                        {service.features.map((feature, featureIndex) => (
                          <div key={featureIndex} className="flex items-center gap-2 transform hover:translate-x-2 transition-transform duration-200" style={{transitionDelay: `${featureIndex * 50}ms`}}>
                            <div className={`w-2 h-2 bg-${service.color} rounded-full animate-pulse`}></div>
                            <span className="text-sm text-text-secondary">{feature}</span>
                          </div>
                        ))}
                      </div>
                      
                      <Button className={`mt-6 w-full bg-${service.color} hover:bg-${service.color}-bright text-white transition-all duration-300 group-hover:shadow-glow-accent hover:scale-105`}>
                        Learn More
                      </Button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-center gap-4 mt-12">
            <Button
              variant="outline"
              size="icon"
              className="w-12 h-12 border-2 border-golden hover:bg-golden/10 hover:border-golden text-golden disabled:opacity-50 transition-all duration-300 hover:scale-110"
              onClick={scrollPrev}
              disabled={prevBtnDisabled}
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="w-12 h-12 border-2 border-golden hover:bg-golden/10 hover:border-golden text-golden disabled:opacity-50 transition-all duration-300 hover:scale-110"
              onClick={scrollNext}
              disabled={nextBtnDisabled}
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center gap-2 mt-6">
            {scrollSnaps.map((_, index) => (
              <button
                key={index}
                className={`w-3 h-3 rounded-full transition-all duration-300 hover:scale-125 ${
                  index === selectedIndex
                    ? 'bg-golden shadow-glow-primary'
                    : 'bg-golden/30 hover:bg-golden/50'
                }`}
                onClick={() => scrollTo(index)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesCarousel;