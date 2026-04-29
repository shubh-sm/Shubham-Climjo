import React from "react";
import { Leaf, Award, ShieldCheck, Heart, Users, MapPin } from "lucide-react";
import { motion } from "motion/react";

const About: React.FC = () => {
  return (
    <div className="pb-20">
      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center justify-center bg-emerald-950 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1540420773420-3366772f4999?q=80&w=2000&auto=format&fit=crop" 
            className="w-full h-full object-cover opacity-30"
            alt="About Clean Living + Joy"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-emerald-950/50 to-emerald-950" />
        </div>
        
        <div className="relative z-10 text-center space-y-4 max-w-3xl px-4">
          <motion.h1 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-5xl md:text-7xl font-serif font-bold text-white"
          >
            Our Herbal Legacy
          </motion.h1>
          <motion.p 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-emerald-100/80"
          >
            Rooted in nature, crafted for the modern soul. Discover the story behind every mix.
          </motion.p>
        </div>
      </section>

      {/* Mission */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <h2 className="text-4xl font-serif font-bold text-emerald-950">Mission: Pure Purity</h2>
            <p className="text-lg text-emerald-800/70 leading-relaxed">
              At Climjo, we believe that modern living shouldn't mean losing touch with nature's wisdom. 
              Our journey started in a small kitchen, experimenting with traditional herbs to find relief 
              from the stresses of urban life. 'Clean Living + Joy' is more than a slogan; it's our promise.
            </p>
            <p className="text-lg text-emerald-800/70 leading-relaxed">
              Today, we partner with sustainable farmers across the country to bring you the highest quality, 
              unadulterated herbal blends. No fillers, no chemicals, just nature in its most potent form.
            </p>
            <div className="grid grid-cols-2 gap-8 pt-8">
              <div className="space-y-2">
                <h4 className="text-3xl font-serif font-bold text-emerald-700">10k+</h4>
                <p className="text-sm font-bold text-emerald-900/40 uppercase tracking-widest">Happy Customers</p>
              </div>
              <div className="space-y-2">
                <h4 className="text-3xl font-serif font-bold text-emerald-700">50+</h4>
                <p className="text-sm font-bold text-emerald-900/40 uppercase tracking-widest">Natural Blends</p>
              </div>
            </div>
          </div>
          <div className="relative">
            <div className="aspect-square rounded-[48px] overflow-hidden shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1510674485131-dc88d96369b4?q=80&w=1200&auto=format&fit=crop" 
                className="w-full h-full object-cover"
                alt="Herbal processing"
              />
            </div>
            <div className="absolute -bottom-8 -left-8 bg-white p-8 rounded-3xl shadow-xl border border-emerald-50 hidden md:block">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-emerald-100 rounded-2xl flex items-center justify-center text-emerald-600">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-emerald-950">Certified Pure</h4>
                  <p className="text-xs text-emerald-700/60">Lab tested for 100% purity</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-emerald-50/50 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-sm font-bold text-emerald-600 uppercase tracking-widest">Our Values</h2>
            <h3 className="text-4xl font-serif font-bold text-emerald-950">What Drives Us</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: Leaf, title: "Sustainably Sourced", desc: "We ensure every herb is picked with respect for the Earth's ecosystems." },
              { icon: Heart, title: "People First", desc: "Supporting local farmers and ensuring fair trade across our entire supply chain." },
              { icon: Award, title: "Unmatched Quality", desc: "Rigorous testing at every stage, from soil to sachet, to ensure zero impurities." },
            ].map((value, idx) => (
              <div key={idx} className="bg-white p-10 rounded-[40px] shadow-lg shadow-emerald-900/5 space-y-6 text-center border border-emerald-100/50">
                <div className="w-16 h-16 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-600 mx-auto">
                  <value.icon className="w-8 h-8" />
                </div>
                <h4 className="text-xl font-bold text-emerald-950">{value.title}</h4>
                <p className="text-emerald-800/60 leading-relaxed">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team/Location Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="bg-emerald-900 rounded-[64px] p-12 md:p-24 text-white overflow-hidden relative">
          <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-600/20 rounded-full blur-[120px]" />
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <h2 className="text-4xl md:text-5xl font-serif font-bold">Visit our Sanctuary</h2>
              <p className="text-lg text-emerald-100/70">
                Experience the aroma of fresh herbs and witness our small-batch processing unit in the heart of nature.
              </p>
              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <MapPin className="w-6 h-6 text-emerald-400" />
                  <div>
                    <h4 className="font-bold">Main Headquarters</h4>
                    <p className="text-emerald-100/60 text-sm">123 Herbal Way, Nature District, Earth 560001</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <Users className="w-6 h-6 text-emerald-400" />
                  <div>
                    <h4 className="font-bold">Guided Tours</h4>
                    <p className="text-emerald-100/60 text-sm">Available Monday to Friday, 10 AM - 4 PM</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="rounded-[40px] overflow-hidden shadow-2xl h-80">
              <img 
                src="https://images.unsplash.com/photo-1473091534298-04dcbce3278c?q=80&w=1200&auto=format&fit=crop" 
                className="w-full h-full object-cover"
                alt="Sanctuary"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
