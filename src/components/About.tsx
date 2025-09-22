import { Button } from "@/components/ui/button";
import { Users, Award, Target, Lightbulb, Rocket, Star, Trophy, Heart } from "lucide-react";

const About = () => {
  const stats = [
    { number: "500+", label: "Projects Completed", icon: Rocket, color: "emerald" },
    { number: "50+", label: "Happy Clients", icon: Heart, color: "orange" },
    { number: "5+", label: "Years Experience", icon: Trophy, color: "purple" },
    { number: "24/7", label: "Support Available", icon: Star, color: "cyan" }
  ];

  const values = [
    {
      icon: Users,
      title: "Expert Team",
      description: "World-class engineers and designers passionate about creating exceptional digital experiences",
      color: "emerald",
      gradient: "from-emerald/10 to-cyan/10"
    },
    {
      icon: Award,
      title: "Quality First",
      description: "Uncompromising quality standards with rigorous testing and continuous optimization",
      color: "orange", 
      gradient: "from-orange/10 to-yellow/10"
    },
    {
      icon: Target,
      title: "Results Driven",
      description: "Data-driven approach focused on measurable outcomes and sustainable business growth",
      color: "purple",
      gradient: "from-purple/10 to-pink/10"
    },
    {
      icon: Lightbulb,
      title: "Innovation",
      description: "Pioneering next-generation technologies that shape the future of digital transformation",
      color: "cyan",
      gradient: "from-cyan/10 to-blue/10"
    }
  ];

  return (
    <section id="about" className="py-32 px-6 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-purple/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 right-10 w-72 h-72 bg-cyan/5 rounded-full blur-3xl"></div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center mb-24">
          <div>
            <div className="inline-flex items-center gap-2 bg-glass px-6 py-3 rounded-full mb-8 border border-emerald/20">
              <Users className="h-4 w-4 text-emerald" />
              <span className="text-sm font-medium text-text-secondary">About Our Company</span>
            </div>
            
            <h2 className="text-5xl md:text-7xl font-bold mb-8 leading-tight">
              About <span className="text-gradient-primary">FS Technology</span>
            </h2>
            <p className="text-2xl text-text-secondary mb-10 leading-relaxed">
              We are <span className="text-gradient-accent font-semibold">visionary technologists</span> dedicated to 
              revolutionizing how businesses operate in the digital age.
            </p>
            <p className="text-lg text-text-muted mb-10 leading-relaxed">
              From ambitious startups to Fortune 500 enterprises, we've empowered organizations 
              worldwide to transform breakthrough ideas into powerful, scalable digital solutions. 
              Our agile methodology ensures rapid innovation without sacrificing excellence.
            </p>
            <Button size="lg" className="bg-gradient-to-r from-orange to-purple hover:from-orange/90 hover:to-purple/90 text-white px-12 py-6 text-xl font-semibold rounded-2xl shadow-glow-accent">
              Discover Our Story
            </Button>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-6">
            {stats.map((stat, index) => (
              <div key={index} className={`group text-center p-8 rounded-3xl bg-glass border-2 border-${stat.color}/20 hover:border-${stat.color}/40 transition-all duration-500 hover:shadow-card-elevated`}>
                <div className={`w-16 h-16 bg-${stat.color}/10 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-${stat.color}/20 transition-all group-hover:scale-110`}>
                  <stat.icon className={`h-8 w-8 text-${stat.color}`} />
                </div>
                <div className={`text-4xl md:text-5xl font-bold text-${stat.color} mb-3 group-hover:scale-110 transition-transform`}>
                  {stat.number}
                </div>
                <div className="text-text-muted font-semibold text-lg">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Values Section */}
        <div className="text-center mb-16">
          <h3 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="text-gradient-accent">Our Core Values</span>
          </h3>
          <p className="text-xl text-text-secondary max-w-3xl mx-auto">
            The principles that drive everything we do and define who we are
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((value, index) => (
            <div key={index} className={`group text-center p-8 rounded-3xl bg-gradient-to-br ${value.gradient} border border-${value.color}/20 hover:border-${value.color}/40 transition-all duration-500 hover:shadow-card-elevated`}>
              <div className={`w-20 h-20 bg-${value.color}/10 rounded-3xl flex items-center justify-center mx-auto mb-8 group-hover:bg-${value.color}/20 transition-all group-hover:scale-110`}>
                <value.icon className={`h-10 w-10 text-${value.color}`} />
              </div>
              <h4 className="text-2xl font-bold mb-4 group-hover:text-gradient-primary transition-all">{value.title}</h4>
              <p className="text-text-muted leading-relaxed text-lg">{value.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;