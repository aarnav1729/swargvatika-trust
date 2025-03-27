
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useInView } from 'react-intersection-observer';
import HeroSection from '@/components/home/HeroSection';
import SectionHeading from '@/components/ui/SectionHeading';
import ScrollReveal from '@/components/ui/ScrollReveal';
import AnimatedCounter from '@/components/ui/AnimatedCounter';
import PageTransition from '@/components/layout/PageTransition';
import { ArrowRight, Leaf, Flower, Flame, CloudRain, CloudSun, Recycle } from 'lucide-react';
import { cn } from '@/lib/utils';
import aboutimg from '@/assets/1.jpg';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

export default function HomePage() {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, 300]);
  
  const [statsRef, statsInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  useEffect(() => {
    // Initialize GSAP animations
    const fadeElements = document.querySelectorAll('.gsap-fade-in');
    
    fadeElements.forEach((element) => {
      gsap.fromTo(
        element,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          scrollTrigger: {
            trigger: element,
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none none',
          },
        }
      );
    });

    return () => {
      // Clean up ScrollTrigger instances
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <PageTransition>
      {/* Hero Section */}
      <HeroSection />

      {/* About Section */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 overflow-hidden relative">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <ScrollReveal>
              <SectionHeading
                subtitle="About Swargvatika"
                title="Redefining Final Rites with Eco-Friendly Solutions"
                description="Dedicated to providing dignified farewells while preserving our environment. Our innovative facilities combine traditional values with modern eco-conscious technology."
                align="left"
              />
              <div className="space-y-4 text-muted-foreground">
                <p>
                  Swargvatika is Hyderabad's first eco-friendly crematorium, designed to minimize environmental impact while providing respectful services for the deceased and their families.
                </p>
                <p>
                  We combine age-old traditions with environmentally sustainable practices, offering multiple cremation options including Gau Kasht, Electric and LPG systems.
                </p>
              </div>
              <div className="mt-8">
                <Link 
                  to="/about" 
                  className="inline-flex items-center text-primary hover:text-primary/80 font-medium transition-colors group"
                >
                  <span>Learn More About Us</span>
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </ScrollReveal>

            <div className="relative">
              <motion.div
                style={{ y }}
                className="absolute -top-16 -right-16 text-primary/10 z-0"
              >
                <Leaf className="w-64 h-64" />
              </motion.div>
              
              <ScrollReveal 
                direction="right" 
                className="relative z-10"
              >
                <div className="rounded-2xl overflow-hidden shadow-2xl card-3d">
                  <div className="bg-white p-2 dark:bg-gray-800">
                    <img 
                      src="/assets/1.jpg" 
                      alt="Swargvatika Crematorium" 
                      className="rounded-xl w-full h-[400px] object-cover"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = aboutimg;
                      }}
                    />
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section 
        ref={statsRef}
        className="py-16 bg-primary/5 dark:bg-gray-800"
      >
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              <AnimatedCounter 
                end={10000} 
                title="Families Served" 
                suffix="+" 
              />
              <AnimatedCounter 
                end={95} 
                title="Pollution Reduction" 
                suffix="%" 
              />
              <AnimatedCounter 
                end={12} 
                title="Years of Service" 
              />
              <AnimatedCounter 
                end={5000} 
                title="Trees Saved" 
                suffix="+" 
              />
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-white dark:bg-gray-900 overflow-hidden">
        <div className="container mx-auto px-4">
          <SectionHeading
            subtitle="Our Services"
            title="Eco-Friendly Cremation Options"
            description="We offer a range of respectful and environmentally conscious cremation services to honor your loved ones while preserving nature."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
            {[
              {
                icon: <Flower className="h-6 w-6" />,
                title: "Gau Kasht",
                description: "Traditional cremation using cow dung cakes, an eco-friendly alternative to conventional firewood.",
                delay: 0,
              },
              {
                icon: <Flame className="h-6 w-6" />,
                title: "LPG Based",
                description: "Energy-efficient and pollution-free cremation that uses liquefied petroleum gas as fuel for cremation.",
                delay: 0.1,
              },
              {
                icon: <Recycle className="h-6 w-6" />,
                title: "Charitable Medical Centre",
                description: "Swarg Vatika's new Charitable Medical Centre provides essential diagnostic, dental, physiotherapy, and ENT services along with affordable generic medicines, offering care and support to the families who need it most.",
                delay: 0.2,
              },
              {
                icon: <CloudRain className="h-6 w-6" />,
                title: "Conventional Platforms",
                description: "Traditional firewood platforms with improved efficiency and reduced environmental impact.",
                delay: 0.3,
              },
              {
                icon: <CloudSun className="h-6 w-6" />,
                title: "Last Journey Vehicle",
                description: "Transportation services for the deceased with dignity and respect in AC hearses/vans.",
                delay: 0.4,
              },
              {
                icon: <Leaf className="h-6 w-6" />,
                title: "Eye-Donation Tie-Up with LV Prasad Eye Institute", 
                description: "Swargvatika has tied up with LV Prasad Eye Institute to facilitate donation of eyes to help the visually impaired. Those who opt for eye donation will recieve free cremation service.",
                delay: 0.5,
              },
              {
                icon: <Leaf className="h-6 w-6" />,
                title: "BPL Families",
                description: "Swarg Vatika offers a 50% discount on cremation services for Below Poverty Line families.",
                delay: 0.5,
              },
              {
                icon: <Leaf className="h-6 w-6" />,
                title: "Additional Services",
                description: "Body freezer boxes, preservation of ashes, mortuary, pandit arrangements, and pooja halls for a complete funeral service. Swarg Vatika also offers free cremation services for unclaimed bodies.",
                delay: 0.5,
              },
            ].map((service, index) => (
              <Link 
                to="/services" 
                key={index}
                className={cn(
                  "gsap-fade-in opacity-0",
                  "group bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md border border-gray-100 dark:border-gray-700",
                  "hover:shadow-lg transition-all duration-300 h-full flex flex-col"
                )}
              >
                <div className="w-14 h-14 flex items-center justify-center rounded-lg mb-4 bg-primary/10 text-primary dark:bg-primary/20">
                  {service.icon}
                </div>
                <h3 className="font-serif text-xl font-semibold mb-3">{service.title}</h3>
                <p className="text-muted-foreground text-sm flex-grow">{service.description}</p>
                <div className="mt-4 text-primary flex items-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="text-sm font-medium">Learn More</span>
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              to="/services"
              className="inline-block bg-primary hover:bg-primary/90 text-white font-medium rounded-lg px-6 py-3 transition duration-300 shimmer-button"
            >
              View All Services
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-spiritual-900 to-spiritual-700 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <ScrollReveal>
              <h2 className="font-serif text-3xl md:text-4xl font-bold mb-6">Ready to Learn More About Our Eco-Friendly Services?</h2>
              <p className="text-white/80 text-lg mb-8">
                Contact us today to discover how Swarg Vatika can provide a dignified farewell in harmony with nature.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  to="/contact"
                  className="bg-white text-spiritual-900 hover:bg-white/90 font-medium rounded-lg px-6 py-3 transition duration-300 shimmer-button"
                >
                  Contact Us
                </Link>
                <Link
                  to="/services"
                  className="bg-transparent hover:bg-white/10 text-white font-medium rounded-lg px-6 py-3 border border-white/30 transition duration-300"
                >
                  Explore Services
                </Link>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>
    </PageTransition>
  );
}
