import React from "react";
import { Link } from "react-router-dom";
import { Facebook, Twitter, Instagram, Mail, Phone, MapPin, Leaf } from "lucide-react";

const Footer: React.FC = () => {
  return (
    <footer className="relative bg-emerald-950 text-emerald-50/80 overflow-hidden">
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/natural-paper.png")', backgroundRepeat: 'repeat' }} />
      <div className="absolute -right-24 -bottom-24 w-96 h-96 opacity-[0.05] pointer-events-none">
        <img src="https://images.unsplash.com/photo-1510674485131-dc88d96369b4?q=80&w=600&auto=format&fit=crop" alt="deco" className="w-full h-full object-cover rounded-full" />
      </div>
      <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="space-y-6">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-emerald-600 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-lg">CLJ</span>
              </div>
              <span className="text-2xl font-bold font-serif text-white tracking-tight">Climjo</span>
            </div>
            <p className="text-sm leading-relaxed max-w-xs italic text-emerald-400 font-medium">
              Clean Living + Joy • Natural. Pure. You.
            </p>
            <p className="text-sm leading-relaxed max-w-xs">
              Bringing centuries of herbal wisdom to your modern lifestyle. Pure, potent, and 100% natural.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="p-2 bg-emerald-900 rounded-lg hover:bg-emerald-800 transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="p-2 bg-emerald-900 rounded-lg hover:bg-emerald-800 transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="p-2 bg-emerald-900 rounded-lg hover:bg-emerald-800 transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Shop */}
          <div>
            <h3 className="text-white font-bold mb-6 text-lg">Shop Natural</h3>
            <ul className="space-y-4 text-sm">
              <li><Link to="/category/detox" className="hover:text-emerald-400 transition-colors">Detox & Cleanse</Link></li>
              <li><Link to="/category/energy" className="hover:text-emerald-400 transition-colors">Energy & Vitality</Link></li>
              <li><Link to="/category/wellness" className="hover:text-emerald-400 transition-colors">Daily Wellness</Link></li>
              <li><Link to="/category/hydration" className="hover:text-emerald-400 transition-colors">Natural Hydration</Link></li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-bold mb-6 text-lg">Company</h3>
            <ul className="space-y-4 text-sm">
              <li><Link to="/about" className="hover:text-emerald-400 transition-colors">Our Story</Link></li>
              <li><Link to="/quality" className="hover:text-emerald-400 transition-colors">Purity Labs</Link></li>
              <li><Link to="/shipping" className="hover:text-emerald-400 transition-colors">Shipping Policy</Link></li>
              <li><Link to="/contact" className="hover:text-emerald-400 transition-colors">Contact Us</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-bold mb-6 text-lg">Get in Touch</h3>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-emerald-500 mt-1" />
                <span>123 Herbal Way, Nature District, Earth 560001</span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-emerald-500" />
                <span>+91 98765 43210</span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-emerald-500" />
                <span>hello@climjo.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-emerald-900 text-center space-y-4">
          <div className="flex items-center justify-center space-x-2 text-emerald-600">
            <Leaf className="w-4 h-4" />
            <span className="text-xs uppercase tracking-widest font-bold">100% Certified Organic</span>
            <Leaf className="w-4 h-4" />
          </div>
          <p className="text-xs">
            &copy; {new Date().getFullYear()} Climjo. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
