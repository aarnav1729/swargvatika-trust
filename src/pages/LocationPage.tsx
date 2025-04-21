import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { Parallax } from 'react-parallax';
import PageTransition from '@/components/layout/PageTransition';
import PageHeader from '@/components/ui/PageHeader';
import SectionHeading from '@/components/ui/SectionHeading';
import ScrollReveal from '@/components/ui/ScrollReveal';
import { Button } from '@/components/ui/button';
import { MapPin, Clock, Phone, Navigation, Route } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function LocationPage() {
  useEffect(() => {
    // Create GSAP animation for the location card
    gsap.fromTo(
      '.location-card',
      { y: 100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: 'power3.out', stagger: 0.2 }
    );
  }, []);

  return (
    <PageTransition>
      {/* Page Header */}
      <PageHeader
        title="Our Location"
        description="Find us and get directions to Swargvatika Eco-Friendly Crematorium."
        backgroundImage="https://images.unsplash.com/photo-1569336415962-a4bd9f69c07a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1631&q=80"
      />

      {/* Main Content */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <ScrollReveal>
              <SectionHeading
                subtitle="Where to Find Us"
                title="Directions to Swargvatika"
                description="Our eco-friendly crematorium is conveniently located and accessible from all parts of Hyderabad."
                align="left"
              />
              <div className="space-y-6">
                <div className="location-card flex items-start p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <MapPin className="h-6 w-6 text-primary mr-4 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-medium text-lg mb-1">Address</h3>
                    <p className="text-muted-foreground">
                      Swarg Vatika Trust, RTC Colony, Tirumalagiri, Secunderabad<br />
                      (Road to Manasarovar Heights & Beside Leela Gardens)
                    </p>
                  </div>
                </div>
                
                <div className="location-card flex items-start p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <Clock className="h-6 w-6 text-primary mr-4 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-medium text-lg mb-1">Hours of Operation</h3>
                    <p className="text-muted-foreground">
                      Open 24 hours, 7 days a week
                    </p>
                  </div>
                </div>
                
                <div className="location-card flex items-start p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <Phone className="h-6 w-6 text-primary mr-4 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-medium text-lg mb-1">Contact</h3>
                    <p className="text-muted-foreground">
                      <a href="tel:+918008694888" className="hover:text-primary transition-colors">+91 8008694888</a>
                      <br />
                      <a href="tel:+919701171222" className="hover:text-primary transition-colors">+91 9701171222</a>
                      <br />
                      <a href="mailto:info@swargvatika.org" className="hover:text-primary transition-colors">
                        info@swargvatika.org
                      </a>
                    </p>
                  </div>
                </div>
                
                <div className="mt-8 flex flex-col sm:flex-row gap-4">
                  <Button 
                    className="shimmer-button bg-primary hover:bg-primary/90"
                    onClick={() => window.open('https://maps.google.com', '_blank')}
                  >
                    <Navigation className="mr-2 h-4 w-4" />
                    Get Directions
                  </Button>
                  
                  <Button 
                    variant="outline"
                    onClick={() => window.open('tel:+918008694888')}
                  >
                    <Phone className="mr-2 h-4 w-4" />
                    Call for Assistance
                  </Button>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal direction="right">
              <div className="rounded-xl overflow-hidden shadow-xl border border-gray-200 dark:border-gray-700">
                <iframe
                  title="Swargvatika Location"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3805.6166363401117!2d78.49708179999999!3d17.478053600000003!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb9af52a216111%3A0xea5ed1fbf85fe193!2sSwarg%20Vatika%20Trust!5e0!3m2!1sen!2sin!4v1743156354842!5m2!1sen!2sin"
                  width="100%"
                  height="450"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Transportation Options */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <SectionHeading
            subtitle="Getting Here"
            title="Transportation Options"
            description="Multiple transportation options are available to reach Swargvatika from different parts of the city."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
            {[
              {
                icon: <Route className="h-6 w-6" />,
                title: "By Car",
                description: "15 minutes from city center via NH65. Ample parking space available at the premises.",
              },
              {
                icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-train-front"><path d="M8 3.1V7a4 4 0 0 0 8 0V3.1"/><path d="m9 15-1-1"/><path d="m15 15 1-1"/><path d="M9 19c-2.8 0-5-2.2-5-5v-4a8 8 0 0 1 16 0v4c0 2.8-2.2 5-5 5Z"/><path d="m8 19-2 3"/><path d="m16 19 2 3"/></svg>,
                title: "By Metro",
                description: "Get down at Green Park Metro Station. 15 minutes walk or 5 minutes by auto rickshaw.",
              },
              {
                icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-bus"><path d="M8 6v6"/><path d="M16 6v6"/><path d="M3 12h18"/><rect width="18" height="16" x="3" y="3" rx="2"/><path d="M4 19h1.5"/><path d="M18.5 19H20"/><path d="M8 19v2"/><path d="M16 19v2"/></svg>,
                title: "By Bus",
                description: "City buses 45, 72, and 108 stop within walking distance. Get down at Central Park bus stop.",
              },
              {
                icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-car-taxi"><path d="M10 2h4"/><path d="m21 8-2 2-1.5-3.7A2 2 0 0 0 15.646 5H8.4a2 2 0 0 0-1.903 1.257L5 10 3 8"/><path d="M7 14h.01"/><path d="M17 14h.01"/><rect width="18" height="8" x="3" y="10" rx="2"/><path d="M5 18v2"/><path d="M19 18v2"/></svg>,
                title: "By Taxi/Auto",
                description: "Available from all parts of the city. Use ride-sharing apps or call our location for assistance.",
              },
            ].map((option, index) => (
              <ScrollReveal key={index} delay={index * 0.1}>
                <div className={cn(
                  "bg-white dark:bg-gray-900 rounded-xl p-6 shadow-md border border-gray-100 dark:border-gray-700",
                  "hover:shadow-lg transition-all duration-300 h-full flex flex-col"
                )}>
                  <div className="w-14 h-14 flex items-center justify-center rounded-lg mb-4 bg-primary/10 text-primary dark:bg-primary/20">
                    {option.icon}
                  </div>
                  <h3 className="font-serif text-xl font-semibold mb-3">{option.title}</h3>
                  <p className="text-muted-foreground text-sm">{option.description}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Area Map with Parallax */}
      <Parallax
        bgImage="https://images.unsplash.com/photo-1524661135-423995f22d0b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80"
        strength={300}
        bgImageStyle={{ objectFit: 'cover', objectPosition: 'center' }}
        bgImageAlt="Aerial view of Hyderabad city"
        className="h-96 relative"
      >
        <div className="absolute inset-0 bg-black/50 z-0" />
        <div className="container mx-auto px-4 h-full flex items-center justify-center relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="max-w-xl text-center text-white"
          >
            <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4">Serving All of Hyderabad</h2>
            <p className="text-white/80 mb-6">
              Our central location makes Swargvatika accessible from all parts of the city, allowing us to serve families across Hyderabad with our eco-friendly cremation services.
            </p>
            <Button 
              className="shimmer-button bg-white text-gray-900 hover:bg-white/90"
              onClick={() => window.open('tel:+918008694888')}
            >
              <Phone className="mr-2 h-4 w-4" />
              Contact for Emergency Services
            </Button>
          </motion.div>
        </div>
      </Parallax>
    </PageTransition>
  );
}
