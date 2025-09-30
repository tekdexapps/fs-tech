import { Button } from "@/components/ui/button";
import { ArrowRight, Code, Play, Shield, Sparkles, Zap } from "lucide-react";
import MetaballBackground from "./MetaballBackground";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center px-6 overflow-hidden pt-16">
      {/* Background Grid */}
      <div className="absolute inset-0 bg-grid"></div>

      {/* Dynamic Particle Animation */}
      <MetaballBackground />

      <div className="max-w-7xl mx-auto text-left relative z-10">
        {/* Badge with animation */}
        <div className="inline-flex items-center gap-2 bg-glass px-6 py-3 rounded-full mb-8 border border-golden/30 animate-bounce-in">
          <Sparkles className="h-4 w-4 text-golden animate-pulse" />
          <span className="text-sm font-medium text-text-secondary">
            Premium Software Solutions
          </span>
        </div>

        {/* Main Heading with staggered animations */}
        <div className="mb-8">
          <h1 className="text-6xl md:text-8xl font-bold mb-6 tracking-tight leading-none animate-slide-up">
            <span className="text-foreground">FS</span>
            <span className="text-gradient-primary"> Technology</span>
          </h1>
          <p
            className="text-2xl md:text-3xl text-text-secondary max-w-3xl leading-relaxed font-light animate-slide-up"
            style={{ animationDelay: "0.2s" }}
          >
            Transform your business with{" "}
            <span className="text-gradient-accent font-semibold">
              cutting-edge technology
            </span>
            <br />
            that scales beyond expectations
          </p>
        </div>

        {/* CTA Buttons with animations */}
        <div
          className="flex flex-col sm:flex-row gap-6 justify-start mb-20 animate-slide-up"
          style={{ animationDelay: "0.4s" }}
        >
          <Button
            size="lg"
            className="bg-golden hover:bg-golden-bright text-white px-12 py-8 text-xl font-semibold rounded-2xl shadow-glow-primary group transition-all duration-300 hover:scale-105"
            onClick={() => (window.location.href = "#contact")}
          >
            <Play className="mr-3 h-6 w-6 group-hover:scale-110 transition-transform" />
            Start Your Journey
            <ArrowRight className="ml-3 h-6 w-6 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>

        {/* Feature Cards with staggered animations */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl pb-8">
          <div
            className="group p-8 rounded-3xl bg-glass border border-golden/20 hover:border-golden/40 transition-all duration-500 hover:shadow-card-elevated text-left animate-fade-in hover:scale-105"
            style={{ animationDelay: "0.6s" }}
          >
            <div className="w-16 h-16 bg-golden/10 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-golden/20 transition-colors group-hover:animate-pulse">
              <Code className="h-8 w-8 text-golden" />
            </div>
            <h3 className="text-2xl font-bold mb-4 group-hover:text-gradient-primary transition-all">
              Premium Development
            </h3>
            <p className="text-text-muted leading-relaxed">
              Handcrafted software solutions built with premium frameworks and
              optimized for exceptional performance
            </p>
          </div>

          <div
            className="group p-8 rounded-3xl bg-glass border border-orange-red/20 hover:border-orange-red/40 transition-all duration-500 hover:shadow-card-elevated text-left animate-fade-in hover:scale-105"
            style={{ animationDelay: "0.8s" }}
          >
            <div className="w-16 h-16 bg-orange-red/10 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-orange-red/20 transition-colors group-hover:animate-pulse">
              <Zap className="h-8 w-8 text-orange-red" />
            </div>
            <h3 className="text-2xl font-bold mb-4 group-hover:text-gradient-accent transition-all">
              Lightning Performance
            </h3>
            <p className="text-text-muted leading-relaxed">
              Ultra-fast applications with smooth user experiences that scale
              beautifully with your growing business
            </p>
          </div>

          <div
            className="group p-8 rounded-3xl bg-glass border border-warm-gray/30 hover:border-warm-gray/50 transition-all duration-500 hover:shadow-card-elevated text-left animate-fade-in hover:scale-105"
            style={{ animationDelay: "1s" }}
          >
            <div className="w-16 h-16 bg-warm-gray/20 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-warm-gray/30 transition-colors group-hover:animate-pulse">
              <Shield className="h-8 w-8 text-warm-gray" />
            </div>
            <h3 className="text-2xl font-bold mb-4 group-hover:text-warm-gray transition-all">
              Enterprise Security
            </h3>
            <p className="text-text-muted leading-relaxed">
              Military-grade security protocols with advanced encryption
              protecting your valuable digital assets
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
