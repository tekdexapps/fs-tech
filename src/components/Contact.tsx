import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Phone, MapPin, Send, MessageCircle, Calendar, ArrowRight } from "lucide-react";

const Contact = () => {
  const contactInfo = [
    {
      icon: Mail,
      title: "Email Us",
      content: "hello@fstechnology.com",
      subtext: "Get a response within 2 hours",
      color: "emerald"
    },
    {
      icon: Phone,
      title: "Call Us",
      content: "+1 (555) 123-4567",
      subtext: "Mon-Fri 9AM-6PM EST",
      color: "orange"
    },
    {
      icon: MapPin,
      title: "Visit Us",
      content: "123 Tech Street, Silicon Valley",
      subtext: "Schedule a consultation",
      color: "purple"
    }
  ];

  return (
    <section id="contact" className="py-32 px-6 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-emerald/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-orange/5 rounded-full blur-3xl"></div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 bg-glass px-6 py-3 rounded-full mb-8 border border-emerald/20">
            <MessageCircle className="h-4 w-4 text-emerald" />
            <span className="text-sm font-medium text-text-secondary">Get In Touch</span>
          </div>
          
          <h2 className="text-5xl md:text-7xl font-bold mb-8">
            <span className="text-gradient-primary">Contact Us</span>
          </h2>
          <p className="text-2xl text-text-secondary max-w-4xl mx-auto leading-relaxed">
            Ready to <span className="text-gradient-accent font-semibold">transform your business</span>? 
            Let's discuss your next breakthrough project.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Contact Form */}
          <div className="bg-glass border-2 border-emerald/20 rounded-3xl p-10">
            <div className="flex items-center gap-3 mb-8">
              <Send className="h-6 w-6 text-emerald" />
              <h3 className="text-3xl font-bold">Start Your Project</h3>
            </div>
            
            <form className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-text-secondary mb-3">First Name</label>
                  <Input 
                    placeholder="John" 
                    className="bg-surface/50 border-2 border-border focus:border-emerald h-14 text-lg rounded-xl"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-text-secondary mb-3">Last Name</label>
                  <Input 
                    placeholder="Doe" 
                    className="bg-surface/50 border-2 border-border focus:border-emerald h-14 text-lg rounded-xl"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-text-secondary mb-3">Email Address</label>
                <Input 
                  type="email" 
                  placeholder="john@company.com" 
                  className="bg-surface/50 border-2 border-border focus:border-emerald h-14 text-lg rounded-xl"
                />
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-text-secondary mb-3">Project Budget</label>
                <select className="w-full bg-surface/50 border-2 border-border focus:border-emerald h-14 text-lg rounded-xl px-4 text-foreground">
                  <option>$10k - $25k</option>
                  <option>$25k - $50k</option>
                  <option>$50k - $100k</option>
                  <option>$100k+</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-text-secondary mb-3">Project Details</label>
                <Textarea 
                  placeholder="Tell us about your project, goals, and timeline..." 
                  rows={6}
                  className="bg-surface/50 border-2 border-border focus:border-emerald text-lg rounded-xl resize-none"
                />
              </div>
              
              <Button 
                type="submit" 
                size="lg" 
                className="w-full bg-gradient-to-r from-emerald to-cyan hover:from-emerald/90 hover:to-cyan/90 text-white py-6 text-xl font-semibold rounded-2xl shadow-glow-primary group"
              >
                Send Message
                <ArrowRight className="ml-3 h-6 w-6 group-hover:translate-x-1 transition-transform" />
              </Button>
            </form>
          </div>

          {/* Contact Information */}
          <div className="space-y-8">
            {contactInfo.map((info, index) => (
              <div key={index} className={`group p-8 rounded-3xl bg-glass border-2 border-${info.color}/20 hover:border-${info.color}/40 transition-all duration-500 cursor-pointer hover:shadow-card-elevated`}>
                <div className="flex items-start gap-6">
                  <div className={`w-16 h-16 bg-${info.color}/10 rounded-2xl flex items-center justify-center group-hover:bg-${info.color}/20 transition-all group-hover:scale-110`}>
                    <info.icon className={`h-8 w-8 text-${info.color}`} />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-2xl font-bold mb-2 group-hover:text-gradient-primary transition-all">{info.title}</h4>
                    <p className="text-xl font-semibold text-text-secondary mb-2">{info.content}</p>
                    <p className="text-text-muted">{info.subtext}</p>
                  </div>
                </div>
              </div>
            ))}

            {/* CTA Card */}
            <div className="bg-glass border-2 border-orange/20 rounded-3xl p-8">
              <div className="text-center">
                <Calendar className="h-12 w-12 text-orange mx-auto mb-6" />
                <h4 className="text-2xl font-bold mb-4 text-gradient-accent">Book a Free Consultation</h4>
                <p className="text-text-secondary mb-6">Schedule a 30-minute strategy session to discuss your project</p>
                <Button 
                  size="lg" 
                  className="bg-gradient-to-r from-orange to-purple hover:from-orange/90 hover:to-purple/90 text-white px-8 py-4 text-lg font-semibold rounded-xl"
                >
                  Schedule Call
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;