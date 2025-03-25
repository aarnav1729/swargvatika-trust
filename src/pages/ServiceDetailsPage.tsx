
import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import PageTransition from '@/components/layout/PageTransition';
import PageHeader from '@/components/ui/PageHeader';
import ScrollReveal from '@/components/ui/ScrollReveal';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Leaf, Flame, Flower, Recycle, Car, CloudRain, Package } from 'lucide-react';
import { cn } from '@/lib/utils';

// Define service type
interface Service {
  id: string;
  title: string;
  description: string;
  fullDescription: string[];
  icon: JSX.Element;
  imageUrl: string;
  benefits: string[];
  price: number;
}

// Define sample services
const services: Service[] = [
  {
    id: 'gau-kashth',
    title: 'Gau Kashth',
    description: 'Traditional cremation using cow dung cakes, an eco-friendly alternative to conventional firewood.',
    fullDescription: [
      'Gau Kashth is an ancient and eco-friendly cremation method that uses cow dung cakes instead of wood, significantly reducing deforestation and air pollution.',
      'This traditional approach aligns spiritual practices with environmental consciousness, offering a meaningful farewell that honors both the departed and our planet.',
      'The process is carefully managed by our trained staff to ensure dignity, respect, and proper ceremonial procedures throughout.'
    ],
    icon: <Flower className="h-6 w-6" />,
    imageUrl: 'https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80',
    benefits: [
      'Environmentally sustainable alternative to wood',
      'Reduces carbon emissions by up to 75%',
      'Preserves traditional ceremonial practices',
      'Cost-effective option for families',
      'Completes the natural cycle of life'
    ],
    price: 5000
  },
  {
    id: 'lpg-cng',
    title: 'LPG/CNG Crematorium',
    description: 'Energy-efficient and pollution-free cremation with electrical backup for uninterrupted services.',
    fullDescription: [
      'Our LPG/CNG crematorium represents cutting-edge technology in eco-friendly cremation, providing a clean, efficient, and dignified alternative to traditional methods.',
      'This modern system reduces cremation time by 60% while producing minimal smoke and ash, creating a more comfortable environment for attending family members.',
      'With built-in electrical backup systems, we ensure uninterrupted services regardless of power outages or supply issues, providing peace of mind during an already difficult time.'
    ],
    icon: <Flame className="h-6 w-6" />,
    imageUrl: 'https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80',
    benefits: [
      'Zero smoke and minimal environmental impact',
      'Faster process (1-2 hours) compared to traditional methods',
      'Uninterrupted service with electrical backup',
      'Temperature-controlled system for complete cremation',
      'Modern facility with dignified surroundings'
    ],
    price: 7500
  },
  {
    id: 'biogas',
    title: 'Bio-gas/Gassifier Crematorium',
    description: 'Utilizing renewable energy sources for an environmentally sustainable cremation process.',
    fullDescription: [
      'Our Bio-gas/Gassifier Crematorium represents the pinnacle of sustainable cremation technology, using organic materials to generate the energy needed for the process.',
      'This innovative system captures and reuses energy, creating a closed-loop system that minimizes environmental impact while providing a thorough and respectful cremation.',
      'The bio-gas technology ensures a clean burning process with minimal emissions, contributing to better air quality and environmental health in the surrounding areas.'
    ],
    icon: <Recycle className="h-6 w-6" />,
    imageUrl: 'https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80',
    benefits: [
      'Carbon-neutral cremation process',
      'Uses renewable energy sources',
      'Reduces greenhouse gas emissions',
      'Electrical backup ensures reliability',
      'Modern, clean facility for families'
    ],
    price: 7000
  },
  {
    id: 'conventional',
    title: 'Conventional Firewood Platforms',
    description: 'Traditional firewood platforms with improved efficiency and reduced environmental impact.',
    fullDescription: [
      'Our Conventional Firewood Platforms offer a traditional approach to cremation while incorporating design improvements that enhance efficiency and reduce environmental impact.',
      "We've optimized airflow and wood placement to ensure more complete combustion, reducing the amount of wood needed while maintaining the traditional ceremonial experience.",
      'Our platforms are constructed with quality materials and maintained regularly to ensure safety, dignity, and respect for both the departed and attending family members.'
    ],
    icon: <CloudRain className="h-6 w-6" />,
    imageUrl: 'https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80',
    benefits: [
      'Traditional ceremonial experience',
      'Improved efficiency reduces wood consumption',
      'Enhanced design for better combustion',
      'Regularly maintained for safety and dignity',
      'Affordable option for families'
    ],
    price: 4000
  },
  {
    id: 'last-journey',
    title: 'Last Journey Vehicle',
    description: 'Transportation services for the deceased with dignity and respect.',
    fullDescription: [
      'Our Last Journey Vehicle service provides dignified and respectful transportation for the deceased from anywhere within Hyderabad to our crematorium facility.',
      'Our vehicles are specially designed to provide secure and appropriate conditions for transporting the departed, with trained staff who handle every aspect with the utmost care and respect.',
      'This service alleviates logistical concerns for grieving families, allowing them to focus on their emotional needs during this difficult time.'
    ],
    icon: <Car className="h-6 w-6" />,
    imageUrl: 'https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80',
    benefits: [
      'Prompt and reliable service throughout Hyderabad',
      'Respectful handling by trained professionals',
      'Clean, well-maintained vehicles',
      'Reduces logistical burden on grieving families',
      'Available 24/7 for emergencies'
    ],
    price: 2000
  },
  {
    id: 'freezer-box',
    title: 'Body Freezer Boxes',
    description: 'Temporary preservation of the deceased before the cremation ceremony.',
    fullDescription: [
      'Our Body Freezer Box service provides temporary preservation facilities for the deceased when immediate cremation is not possible or when waiting for family members to arrive from distant locations.',
      'Using modern refrigeration technology, we ensure the dignified preservation of the departed in clean, secure, and appropriate conditions for up to 72 hours.',
      'Our staff handles all aspects with sensitivity and respect, providing families with the flexibility they need to make proper arrangements during challenging times.'
    ],
    icon: <Package className="h-6 w-6" />,
    imageUrl: 'https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80',
    benefits: [
      'Modern preservation technology',
      'Clean, secure, and respectful facilities',
      'Available for up to 72 hours',
      'Allows time for family members to gather',
      'Professionally managed with utmost care'
    ],
    price: 1500
  }
];

export default function ServiceDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const [service, setService] = useState<Service | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Find service by ID
    const foundService = services.find(s => s.id === id);
    
    if (foundService) {
      setService(foundService);
    } else {
      // Redirect to services page if service not found
      navigate('/services');
    }
  }, [id, navigate]);

  if (!service) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="leaf-loader"></div>
      </div>
    );
  }

  return (
    <PageTransition>
      {/* Page Header */}
      <PageHeader
        title={service.title}
        description={service.description}
        backgroundImage={service.imageUrl}
      />

      {/* Main Content */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <Link 
            to="/services" 
            className="inline-flex items-center text-primary hover:text-primary/80 mb-8 transition-colors"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            <span>Back to all services</span>
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <ScrollReveal>
                <div className="space-y-6">
                  <div className="flex items-start">
                    <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center mr-4 mt-1">
                      {service.icon}
                    </div>
                    <h2 className="font-serif text-3xl font-bold">{service.title}</h2>
                  </div>

                  <div className="space-y-4 text-muted-foreground">
                    {service.fullDescription.map((paragraph, index) => (
                      <p key={index}>{paragraph}</p>
                    ))}
                  </div>

                  <h3 className="font-serif text-xl font-semibold mt-8">Benefits</h3>
                  <ul className="space-y-3">
                    {service.benefits.map((benefit, index) => (
                      <motion.li 
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-start"
                      >
                        <span className="text-primary mr-3 mt-1">
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" stroke="currentColor" fill="none" />
                            <path d="M9 12L11 14L15 10" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" stroke="currentColor" />
                          </svg>
                        </span>
                        <span>{benefit}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </ScrollReveal>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <ScrollReveal direction="left">
                <div className={cn(
                  "bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-100 dark:border-gray-700",
                  "sticky top-24"
                )}>
                  <h3 className="font-serif text-xl font-semibold mb-4">Service Details</h3>
                  
                  <div className="space-y-4">
                    <div>
                      <p className="text-muted-foreground text-sm">Price</p>
                      <p className="font-bold text-2xl">₹{service.price.toLocaleString()}</p>
                    </div>
                    
                    <div>
                      <p className="text-muted-foreground text-sm">Duration</p>
                      <p className="font-medium">2-3 hours</p>
                    </div>
                    
                    <div>
                      <p className="text-muted-foreground text-sm">Availability</p>
                      <p className="font-medium">24/7</p>
                    </div>
                  </div>
                  
                  <div className="mt-6 space-y-3">
                    <Button 
                      className="w-full bg-primary hover:bg-primary/90 text-white font-medium shimmer-button"
                      asChild
                    >
                      <Link to="/services">Book This Service</Link>
                    </Button>
                    
                    <Button 
                      variant="outline" 
                      className="w-full"
                      asChild
                    >
                      <Link to="/contact">Contact Us</Link>
                    </Button>
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>
    </PageTransition>
  );
}
