import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Globe, 
  Smartphone, 
  Database, 
  Cloud, 
  Cpu, 
  Lock,
  ArrowRight,
  Sparkles,
  Zap,
  Target
} from "lucide-react";

const Services = () => {
  const services = [
    {
      icon: Globe,
      title: "Web Development",
      description: "Revolutionary web applications that push the boundaries of what's possible online.",
      features: ["Next.js & React", "TypeScript", "Modern UI/UX", "SEO Optimized"],
      accent: "emerald",
      gradient: "from-emerald/20 to-cyan/20"
    },
    {
      icon: Smartphone,
      title: "Mobile Solutions",
      description: "Cross-platform mobile experiences that users love and businesses depend on.",
      features: ["React Native", "iOS & Android", "Native Performance", "Push Notifications"],
      accent: "orange",
      gradient: "from-orange/20 to-yellow/20"
    },
    {
      icon: Database,
      title: "Backend Systems",
      description: "Bulletproof server architectures designed for infinite scale and reliability.",
      features: ["Node.js & Python", "Microservices", "API Design", "Database Optimization"],
      accent: "purple",
      gradient: "from-purple/20 to-pink/20"
    },
    {
      icon: Cloud,
      title: "Cloud Infrastructure",
      description: "Next-generation cloud solutions that adapt and scale with your business growth.",
      features: ["AWS & Azure", "DevOps", "Auto-scaling", "Monitoring"],
      accent: "cyan",
      gradient: "from-cyan/20 to-blue/20"
    },
    {
      icon: Cpu,
      title: "AI & Machine Learning",
      description: "Intelligent systems that learn, adapt, and transform your business operations.",
      features: ["ML Models", "Data Analysis", "Automation", "Predictive Analytics"],
      accent: "emerald",
      gradient: "from-emerald/20 to-teal/20"
    },
    {
      icon: Lock,
      title: "Cybersecurity",
      description: "Military-grade security fortress protecting your digital assets from every threat.",
      features: ["Security Audits", "Penetration Testing", "Compliance", "Risk Assessment"],
      accent: "orange",
      gradient: "from-orange/20 to-red/20"
    }
  ];

  return (
    <section id="services" className="py-32 px-6 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-emerald/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-orange/5 rounded-full blur-3xl"></div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 bg-glass px-6 py-3 rounded-full mb-8 border border-purple/20">
            <Sparkles className="h-4 w-4 text-purple" />
            <span className="text-sm font-medium text-text-secondary">Comprehensive Solutions</span>
          </div>
          
          <h2 className="text-5xl md:text-7xl font-bold mb-8">
            <span className="text-gradient-primary">Our Services</span>
          </h2>
          <p className="text-2xl text-text-secondary max-w-4xl mx-auto leading-relaxed">
            Cutting-edge technology solutions engineered to <span className="text-gradient-accent font-semibold">accelerate your success</span>
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {services.map((service, index) => (
            <Card key={index} className={`group relative p-10 bg-glass border-2 border-${service.accent}/20 hover:border-${service.accent}/40 transition-all duration-700 cursor-pointer overflow-hidden rounded-3xl hover:shadow-card-elevated`}>
              {/* Background Gradient */}
              <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-700`}></div>
              
              {/* Content */}
              <div className="relative z-10">
                <div className={`w-20 h-20 bg-${service.accent}/10 rounded-3xl flex items-center justify-center mb-8 group-hover:bg-${service.accent}/20 transition-all duration-500 group-hover:scale-110`}>
                  <service.icon className={`h-10 w-10 text-${service.accent}`} />
                </div>
                
                <h3 className="text-2xl font-bold mb-6 group-hover:text-gradient-primary transition-all duration-500">
                  {service.title}
                </h3>
                
                <p className="text-text-secondary mb-8 leading-relaxed text-lg">
                  {service.description}
                </p>
                
                <div className="space-y-3 mb-8">
                  {service.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center text-text-muted">
                      <div className={`w-2 h-2 bg-${service.accent} rounded-full mr-4 group-hover:scale-125 transition-transform`}></div>
                      <span className="font-medium">{feature}</span>
                    </div>
                  ))}
                </div>
                
                <div className={`flex items-center text-${service.accent} font-semibold text-lg group-hover:text-white transition-all duration-500`}>
                  <span>Explore Solution</span>
                  <ArrowRight className="ml-3 h-5 w-5 group-hover:translate-x-2 transition-transform duration-500" />
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <div className="bg-glass border-2 border-emerald/20 rounded-3xl p-12 max-w-4xl mx-auto">
            <div className="flex items-center justify-center gap-3 mb-6">
              <Target className="h-8 w-8 text-emerald" />
              <Zap className="h-8 w-8 text-orange" />
            </div>
            <h3 className="text-3xl font-bold mb-4 text-gradient-primary">Ready to Transform Your Business?</h3>
            <p className="text-xl text-text-secondary mb-8">Let's discuss how our innovative solutions can accelerate your digital transformation</p>
            <Button size="lg" className="bg-gradient-to-r from-emerald to-cyan hover:from-emerald/90 hover:to-cyan/90 text-white px-12 py-6 text-xl font-semibold rounded-2xl shadow-glow-primary">
              Get Started Today
              <ArrowRight className="ml-3 h-6 w-6" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;