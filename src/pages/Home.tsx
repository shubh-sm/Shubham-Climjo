import React, { useMemo } from "react";
import Hero from "../components/Hero";
import ProductCard from "../components/ProductCard";
import { TESTIMONIALS } from "../constants";
import { useProducts } from "../context/ProductContext";
import { motion } from "motion/react";
import { Leaf, Award, ShieldCheck, Truck, Star, Quote, Sparkles, ArrowRight } from "lucide-react";
import { useParams, Link } from "react-router-dom";
import { cn } from "../lib/utils";

const Home: React.FC = () => {
  const { categoryName } = useParams<{ categoryName?: string }>();
  const { products } = useProducts();
  
  const filteredProducts = useMemo(() => {
    if (!categoryName) return products;
    return products.filter(p => p.category.toLowerCase() === categoryName.toLowerCase());
  }, [products, categoryName]);

  const featuredProducts = filteredProducts.filter(p => p.featured);
  const otherProducts = filteredProducts.filter(p => !p.featured);

  return (
    <div className="space-y-24 pb-20">
      {!categoryName && <Hero />}
      
      {/* Category Header (if active) */}
      {categoryName && (
        <section className="max-w-7xl mx-auto px-4 md:px-8 py-10 relative z-40">
          <div className="bg-emerald-900 text-white p-8 md:p-16 rounded-[48px] shadow-2xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-600/20 rounded-full blur-[100px] -mr-48 -mt-48 transition-transform group-hover:scale-110 duration-700" />
            <div className="relative z-10 space-y-4 max-w-2xl">
              <Link to="/" className="inline-flex items-center space-x-2 text-emerald-400 font-bold uppercase tracking-widest text-[10px] bg-emerald-800/40 px-3 py-1 rounded-full hover:bg-emerald-800 transition-colors mb-4">
                <ArrowRight className="w-3 h-3 rotate-180" />
                <span>Return to Home</span>
              </Link>
              <h2 className="text-4xl md:text-7xl font-serif font-bold capitalize leading-tight">{categoryName} Rituals</h2>
              <p className="text-emerald-100/70 text-lg leading-relaxed">
                Discover our curated selection of hand-crafted {categoryName.toLowerCase()} blends designed for your specific wellness goals.
              </p>
            </div>
            <div className="absolute bottom-8 right-8 bg-white/10 backdrop-blur-md px-10 py-6 rounded-3xl border border-white/10 text-center hidden md:block">
              <span className="block text-5xl font-serif font-bold">{filteredProducts.length}</span>
              <span className="text-xs uppercase font-bold tracking-widest text-emerald-300">Blends Ready</span>
            </div>
          </div>
        </section>
      )}

      {/* Trust Badges - Only show on main home */}
      {!categoryName && (
        <section className="max-w-7xl mx-auto px-4 -mt-12 relative z-30">
          <div className="bg-white rounded-[32px] p-8 shadow-2xl shadow-emerald-900/5 border border-emerald-50 grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { icon: Leaf, title: "100% Organic", desc: "Pure natural herbs" },
              { icon: Award, title: "Lab Tested", desc: "Certified purity" },
              { icon: ShieldCheck, title: "Cruelty Free", desc: "No animal testing" },
              { icon: Truck, title: "Fast Shipping", desc: "Ships in 24 hours" },
            ].map((item, idx) => (
              <div key={idx} className="flex flex-col items-center text-center space-y-2 group">
                <div className="w-12 h-12 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-600 transition-colors group-hover:bg-emerald-600 group-hover:text-white duration-300">
                  <item.icon className="w-6 h-6" />
                </div>
                <h4 className="font-bold text-emerald-900 text-sm">{item.title}</h4>
                <p className="text-xs text-emerald-700/60">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Shop by Category - New for better navigation */}
      {!categoryName && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-sm font-bold text-emerald-600 uppercase tracking-[0.2em] mb-2">Curated Rituals</h2>
            <h3 className="text-3xl md:text-5xl font-serif font-bold text-emerald-950">Shop by Intention</h3>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
            {[
              { name: "Detox", count: "8 Blends", color: "bg-emerald-100", icon: Leaf, path: "/category/detox" },
              { name: "Energy", count: "5 Blends", color: "bg-orange-100", icon: Sparkles, path: "/category/energy" },
              { name: "Wellness", count: "12 Blends", color: "bg-blue-100", icon: ShieldCheck, path: "/category/wellness" },
              { name: "Hydration", count: "6 Blends", color: "bg-cyan-100", icon: Truck, path: "/category/hydration" },
            ].map((cat) => (
              <motion.div
                key={cat.name}
                whileHover={{ 
                  scale: 1.05,
                  rotateY: 5,
                  rotateX: -5,
                  translateZ: 20
                }}
                className="perspective-1000"
              >
                <Link 
                  to={cat.path}
                  className="group relative h-48 sm:h-64 rounded-[32px] overflow-hidden bg-white border border-emerald-50 shadow-lg shadow-emerald-900/5 hover:shadow-2xl transition-all h-full block"
                  style={{ transformStyle: "preserve-3d" }}
                >
                  <div className={cn("absolute inset-x-0 bottom-0 h-1/2 transition-all duration-500 group-hover:h-full", cat.color)} />
                  <div className="relative h-full flex flex-col items-center justify-center p-6 text-center space-y-4" style={{ transform: "translateZ(40px)" }}>
                    <div className="w-16 h-16 bg-white rounded-2xl shadow-sm flex items-center justify-center text-emerald-600 group-hover:scale-110 transition-transform duration-500">
                      <cat.icon className="w-8 h-8" />
                    </div>
                    <div>
                      <h4 className="text-xl font-serif font-bold text-emerald-950">{cat.name}</h4>
                      <p className="text-xs font-bold text-emerald-600/60 uppercase tracking-widest">{cat.count}</p>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </section>
      )}

      {/* Featured Products */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Decorative Leaf */}
        <img 
          src="https://images.unsplash.com/photo-1510674485131-dc88d96369b4?q=80&w=400&auto=format&fit=crop" 
          className="absolute -right-20 top-20 w-64 h-64 opacity-5 rotate-12 pointer-events-none" 
          alt="botanical-deco"
        />
        
        <div className="flex justify-between items-end mb-12">
          <div className="space-y-2">
            <h2 className="text-sm font-bold text-emerald-600 uppercase tracking-[0.2em]">Our Bestsellers</h2>
            <h3 className="text-4xl md:text-5xl font-serif font-bold text-emerald-950">Pure Power Packs</h3>
          </div>
          <button className="hidden sm:block text-emerald-700 font-bold border-b-2 border-emerald-700/20 hover:border-emerald-700 pb-1 transition-all">
            View All Products
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredProducts.length > 0 ? (
            featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))
          ) : (
            <div className="col-span-full py-12 text-center text-emerald-800/40 font-bold border-2 border-dashed border-emerald-100 rounded-[48px]">
              No bestsellers currently listed in this category.
            </div>
          )}
        </div>
      </section>

      {/* Big Feature Banner */}
      <section className="bg-emerald-900 overflow-hidden py-24 sm:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="relative">
              <div className="absolute -top-20 -left-20 w-80 h-80 bg-emerald-600/20 rounded-full blur-[100px]" />
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="relative rounded-[48px] overflow-hidden shadow-2xl shadow-black/40"
              >
                <img
                  src="https://images.unsplash.com/photo-1540420773420-3366772f4999?q=80&w=1200&auto=format&fit=crop"
                  alt="Herbal mixing"
                  className="w-full h-auto"
                />
              </motion.div>
            </div>
            <div className="space-y-8">
              <h2 className="text-sm font-bold text-emerald-400 uppercase tracking-widest">Small Batch Craftsmanship</h2>
              <h3 className="text-4xl md:text-6xl font-serif font-bold text-white leading-tight">
                Hand-picked, Sun-dried, Heart-poured.
              </h3>
              <p className="text-lg text-emerald-100/70 leading-relaxed max-w-lg">
                We believe that the best medicine comes from the Earth. Our process preserves the vital life force of every herb we source.
              </p>
              <div className="space-y-6">
                <div className="space-y-4">
                  {[
                    "Ethically Sourced from Farmers",
                    "Traditional Sun-Drying Process",
                    "Zero Additives or Preservatives",
                  ].map((item, id) => (
                    <div key={id} className="flex items-center space-x-3 text-white">
                      <ShieldCheck className="w-6 h-6 text-emerald-500" />
                      <span className="font-semibold">{item}</span>
                    </div>
                  ))}
                </div>
                <Link 
                  to="/category/detox" 
                  className="inline-block bg-white text-emerald-900 px-8 py-4 rounded-2xl font-bold hover:bg-emerald-50 transition-colors shadow-xl"
                >
                  Explore Detox Range
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* More Products */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Decorative Botanical */}
        <img 
          src="https://images.unsplash.com/photo-1473091534298-04dcbce3278c?q=80&w=400&auto=format&fit=crop" 
          className="absolute -left-24 bottom-0 w-80 h-80 opacity-5 -rotate-12 pointer-events-none" 
          alt="botanical-deco"
        />
        <h3 className="text-3xl font-serif font-bold text-emerald-950 mb-12">
          {categoryName ? `More ${categoryName} Finds` : "New Arrivals"}
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {otherProducts.length > 0 ? (
            otherProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))
          ) : (
            <div className="col-span-full py-12 text-center text-emerald-800/40 italic">
              Check back soon for more additions to our {categoryName?.toLowerCase()} range.
            </div>
          )}
        </div>
      </section>

      {/* Testimonials */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-emerald-50/50 -z-10" />
        <img 
          src="https://images.unsplash.com/photo-1498837167922-ddd27525d352?q=80&w=2000&auto=format&fit=crop" 
          className="absolute inset-0 w-full h-full object-cover opacity-[0.03] -z-10"
          alt="bg-natural"
        />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-sm font-bold text-emerald-600 uppercase tracking-widest">Community Hub</h2>
            <h3 className="text-4xl font-serif font-bold text-emerald-950">Real Stories, Real Results</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {TESTIMONIALS.map((t) => (
              <div key={t.id} className="bg-white p-8 rounded-[32px] border border-emerald-100/50 shadow-lg shadow-emerald-900/5 space-y-6 relative group">
                <div className="absolute top-8 right-8 opacity-10 group-hover:scale-110 transition-transform duration-500">
                  <Quote className="w-12 h-12 text-emerald-600" />
                </div>
                <div className="flex space-x-1">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-emerald-400 text-emerald-400" />
                  ))}
                </div>
                <p className="text-emerald-900 leading-relaxed font-medium italic">"{t.comment}"</p>
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center font-bold text-emerald-700">
                    {t.name[0]}
                  </div>
                  <div>
                    <h4 className="font-bold text-emerald-950 text-sm">{t.name}</h4>
                    <p className="text-xs text-emerald-600">Verified Customer</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
