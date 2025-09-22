import { Github, Linkedin, Twitter, Mail } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-surface border-t border-border">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="md:col-span-2">
            <div className="mb-6">
              <h3 className="text-2xl font-bold">
                <span className="text-foreground">FS</span>
                <span className="text-primary"> Technology</span>
              </h3>
            </div>
            <p className="text-text-secondary leading-relaxed mb-6 max-w-md">
              Advanced technology solutions that transform businesses. 
              We build scalable, secure, and innovative systems for the modern world.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-text-muted hover:text-primary transition-colors">
                <Github className="h-5 w-5" />
              </a>
              <a href="#" className="text-text-muted hover:text-primary transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
              <a href="#" className="text-text-muted hover:text-primary transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-text-muted hover:text-primary transition-colors">
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Services</h4>
            <ul className="space-y-3">
              <li><a href="#" className="text-text-muted hover:text-primary transition-colors">Web Development</a></li>
              <li><a href="#" className="text-text-muted hover:text-primary transition-colors">Mobile Apps</a></li>
              <li><a href="#" className="text-text-muted hover:text-primary transition-colors">Backend Systems</a></li>
              <li><a href="#" className="text-text-muted hover:text-primary transition-colors">Cloud Solutions</a></li>
              <li><a href="#" className="text-text-muted hover:text-primary transition-colors">AI & ML</a></li>
              <li><a href="#" className="text-text-muted hover:text-primary transition-colors">Cybersecurity</a></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Company</h4>
            <ul className="space-y-3">
              <li><a href="#" className="text-text-muted hover:text-primary transition-colors">About Us</a></li>
              <li><a href="#" className="text-text-muted hover:text-primary transition-colors">Our Team</a></li>
              <li><a href="#" className="text-text-muted hover:text-primary transition-colors">Careers</a></li>
              <li><a href="#" className="text-text-muted hover:text-primary transition-colors">Portfolio</a></li>
              <li><a href="#" className="text-text-muted hover:text-primary transition-colors">Blog</a></li>
              <li><a href="#" className="text-text-muted hover:text-primary transition-colors">Contact</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-text-muted text-sm">
            © 2024 FS Technology. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="text-text-muted hover:text-primary text-sm transition-colors">Privacy Policy</a>
            <a href="#" className="text-text-muted hover:text-primary text-sm transition-colors">Terms of Service</a>
            <a href="#" className="text-text-muted hover:text-primary text-sm transition-colors">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;