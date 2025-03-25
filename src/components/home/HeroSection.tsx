
import { motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { Parallax } from 'react-parallax';
import { ChevronDown } from 'lucide-react';
import gsap from 'gsap';
import { Link } from 'react-router-dom';

export default function HeroSection() {
  const textRef = useRef<HTMLDivElement>(null);
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  useEffect(() => {
    // Preload the hero image
    const img = new Image();
    img.src = '/images/hero-bg.jpg';
    img.onload = () => setIsImageLoaded(true);
    img.onerror = () => {
      // Fallback to placeholder if image fails to load
      console.warn('Hero image failed to load, using fallback');
      setIsImageLoaded(true);
    };

    if (textRef.current) {
      const el = textRef.current;
      
      // Create animation for the hero text
      gsap.fromTo(
        el.querySelectorAll('.gsap-hero-text'),
        { opacity: 0, y: 20 },
        { 
          opacity: 1, 
          y: 0, 
          stagger: 0.2,
          duration: 1,
          ease: "power3.out",
          delay: 0.5
        }
      );
    }
  }, []);

  const scrollToNextSection = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: 'smooth'
    });
  };

  return (
    <div className="relative min-h-screen flex items-center">
      {/* Background with multiple layers for depth and effect */}
      <div className="absolute inset-0 overflow-hidden">
        <Parallax
          bgImage="/images/hero-bg.jpg"
          strength={400}
          bgClassName="object-cover w-full h-full"
          bgImageStyle={{ objectFit: 'cover' }}
          bgImageAlt="Serene natural landscape with trees and peaceful environment"
          className="h-full"
          renderLayer={(percentage) => (
            <div
              style={{
                position: 'absolute',
                width: '100%',
                height: '100%',
                background: `rgba(0, 0, 0, ${0.5 + percentage * 0.2})`,
              }}
            />
          )}
        />
      </div>
      
      {/* Animated overlay gradient */}
      <div 
        className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/70 z-10"
        style={{
          backgroundImage: `
            radial-gradient(circle at 20% 30%, rgba(76, 29, 149, 0.3) 0%, rgba(0, 0, 0, 0) 30%),
            radial-gradient(circle at 80% 70%, rgba(16, 185, 129, 0.2) 0%, rgba(0, 0, 0, 0) 40%)
          `
        }}
      />
      
      {/* Animated particles effect */}
      <div className="absolute inset-0 z-10 opacity-30">
        <div className="firefly"></div>
        <div className="firefly"></div>
        <div className="firefly"></div>
        <div className="firefly"></div>
        <div className="firefly"></div>
        <div className="firefly"></div>
        <div className="firefly"></div>
        <div className="firefly"></div>
        <div className="firefly"></div>
        <div className="firefly"></div>
        <div className="firefly"></div>
        <div className="firefly"></div>
      </div>
      
      {/* Main content */}
      <div className="container mx-auto px-4 z-20 relative">
        <div ref={textRef} className="max-w-3xl mx-auto text-center">
          <motion.div 
            className="gsap-hero-text mb-2 opacity-0"
            initial={{ opacity: 0 }}
          >
            <span className="inline-block text-white/90 text-sm md:text-base uppercase tracking-widest bg-primary/20 px-3 py-1 rounded-full mb-3 backdrop-blur-sm">
              Eco-Friendly Crematorium
            </span>
          </motion.div>
          
          <h1 className="gsap-hero-text opacity-0 font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight drop-shadow-lg">
            A Dignified Farewell <br className="hidden md:block" />
            <span className="text-primary">In Harmony With Nature</span>
          </h1>
          
          <p className="gsap-hero-text opacity-0 text-white/90 text-lg md:text-xl mb-8 leading-relaxed drop-shadow-md backdrop-blur-[2px] bg-black/5 p-2 rounded-lg">
            Hyderabad's first eco-friendly, energy efficient, and pollution-free crematorium, providing respectful final journey services while preserving our environment.
          </p>
          
          <div className="gsap-hero-text opacity-0 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link 
              to="/services"
              className="bg-primary hover:bg-primary/90 text-white font-medium rounded-lg px-6 py-3 transition-all duration-300 shimmer-button w-full sm:w-auto transform hover:scale-105"
            >
              Our Services
            </Link>
            <Link 
              to="/contact"
              className="bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white font-medium rounded-lg px-6 py-3 border border-white/20 transition-all duration-300 w-full sm:w-auto transform hover:scale-105"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </div>

      <motion.div 
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white z-20"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <button 
          onClick={scrollToNextSection}
          aria-label="Scroll down"
          className="group flex flex-col items-center"
        >
          <span className="text-white/70 text-sm mb-2 group-hover:text-white">Learn More</span>
          <ChevronDown className="h-6 w-6 text-primary" />
        </button>
      </motion.div>
    </div>
  );
}
