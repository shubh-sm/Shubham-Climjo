import React, { useState, useEffect } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "motion/react";
import { HERO_SLIDES } from "../constants";
import { cn } from "../lib/utils";
import { ChevronLeft, ChevronRight, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

const Hero: React.FC = () => {
  const [current, setCurrent] = useState(0);

  // Parallax effects
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 50, damping: 20 });

  const rotateX = useTransform(springY, [-300, 300], [5, -5]);
  const rotateY = useTransform(springX, [-300, 300], [-5, 5]);
  const translateX = useTransform(springX, [-300, 300], [-15, 15]);
  const translateY = useTransform(springY, [-300, 300], [-15, 15]);

  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    mouseX.set(clientX - innerWidth / 2);
    mouseY.set(clientY - innerHeight / 2);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev === HERO_SLIDES.length - 1 ? 0 : prev + 1));
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const prevSlide = () => {
    setCurrent((prev) => (prev === 0 ? HERO_SLIDES.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrent((prev) => (prev === HERO_SLIDES.length - 1 ? 0 : prev + 1));
  };

  return (
    <section 
      className="relative h-[85vh] overflow-hidden bg-emerald-950"
      onMouseMove={handleMouseMove}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
          className="absolute inset-0"
        >
          {/* Background Image with Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-950 via-emerald-950/40 to-transparent z-10" />
          <img
            src={HERO_SLIDES[current].image}
            alt={HERO_SLIDES[current].title}
            className="absolute inset-0 w-full h-full object-cover scale-110 animate-subtle-zoom"
          />

          {/* Content */}
          <div className="relative z-20 h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-center">
            <motion.div
              style={{
                rotateX,
                rotateY,
                x: translateX,
                y: translateY,
                transformStyle: "preserve-3d",
              }}
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="max-w-2xl space-y-6"
            >
              <div 
                className="flex items-center space-x-2 text-emerald-400 font-bold tracking-widest text-sm uppercase"
                style={{ transform: "translateZ(20px)" }}
              >
                <Sparkles className="w-4 h-4" />
                <span>{HERO_SLIDES[current].offer}</span>
              </div>
              <h1 
                className="text-5xl md:text-7xl font-serif font-bold text-white leading-[1.1] tracking-tight"
                style={{ transform: "translateZ(40px)" }}
              >
                {HERO_SLIDES[current].title}
              </h1>
              <p 
                className="text-lg md:text-xl text-emerald-50/80 leading-relaxed max-w-xl"
                style={{ transform: "translateZ(30px)" }}
              >
                {HERO_SLIDES[current].subtitle}
              </p>
              <div className="pt-4 flex flex-wrap gap-4">
                <Link
                  to="/"
                  className="bg-emerald-600 hover:bg-emerald-500 text-white px-8 py-4 rounded-2xl font-bold text-lg transition-all transform hover:scale-105 shadow-xl shadow-emerald-900/40"
                >
                  Explore Collection
                </Link>
                <Link
                  to="/about"
                  className="bg-white/10 hover:bg-white/20 backdrop-blur-md text-white px-8 py-4 rounded-2xl font-bold text-lg border border-white/30 transition-all"
                >
                  Our Story
                </Link>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation Buttons */}
      <div className="absolute bottom-12 right-12 z-30 flex space-x-4">
        <button
          onClick={prevSlide}
          className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-white/10 transition-colors"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button
          onClick={nextSlide}
          className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-white/10 transition-colors"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-30 flex space-x-2">
        {HERO_SLIDES.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrent(idx)}
            className={cn(
              "w-2 h-2 rounded-full transition-all duration-300",
              idx === current ? "bg-white w-8" : "bg-white/30"
            )}
          />
        ))}
      </div>
    </section>
  );
};

export default Hero;
