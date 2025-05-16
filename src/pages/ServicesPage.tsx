
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import PageTransition from '@/components/layout/PageTransition';
import PageHeader from '@/components/ui/PageHeader';
import SectionHeading from '@/components/ui/SectionHeading';
import ScrollReveal from '@/components/ui/ScrollReveal';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { toast } from '@/components/ui/use-toast';
import { 
  ArrowRight, Flame, Flower, Recycle, Car, 
  CloudRain, Package, Clock, Users, UserCog, HeartHandshake, 
} from 'lucide-react';

// Define types for our services
interface ServiceOption {
  id: string;
  title: string;
  description: string;
  icon: JSX.Element;
  price: number;
  category: 'main' | 'additional';
}

const allServices: ServiceOption[] = [
  {
    id: 'gau-kashth',
    title: 'Gau Kashth',
    description: 'Traditional cremation using cow dung cakes, an eco-friendly alternative to conventional firewood.',
    icon: <Flower className="h-6 w-6" />,
    price: 4000,
    category: 'main'
  },
  {
    id: 'lpg-cng',
    title: 'LPG Cremation',
    description: 'Energy-efficient and pollution-free cremation with electrical backup for uninterrupted services.',
    icon: <Flame className="h-6 w-6" />,
    price: 4000,
    category: 'main'
  },
  {
    id: 'conventional',
    title: 'Conventional Firewood Platforms',
    description: 'Traditional firewood platforms with improved efficiency and reduced environmental impact.',
    icon: <CloudRain className="h-6 w-6" />,
    price: 5000,
    category: 'main'
  },
  {
    id: 'freezer-box',
    title: 'Body Freezer Boxes',
    description: 'Temporary preservation of the deceased before the cremation ceremony (excluding transportation charges).',
    icon: <Package className="h-6 w-6" />,
    price: 2000,
    category: 'additional'
  },
  {
    id: 'last-journey-1-10',
    title: 'Last Journey Vehicle (1-10 km)',
    description: 'Air conditioned transportation services for the deceased with dignity and respect. (Upto 10 km to & from)',
    icon: <Car className="h-6 w-6" />,
    price: 2000,
    category: 'additional'
  },
  {
    id: 'last-journey-11-20',
    title: 'Last Journey Vehicle (11-20 km)',
    description: 'Air conditioned transportation services for the deceased with dignity and respect. (11-20 km to & from)',
    icon: <Car className="h-6 w-6" />,
    price: 2500,
    category: 'additional'
  },
  {
    id: 'last-journey-21-30',
    title: 'Last Journey Vehicle (21-30 km)',
    description: 'Air conditioned transportation services for the deceased with dignity and respect. (21-30 km to & from)',
    icon: <Car className="h-6 w-6" />,
    price: 3000,
    category: 'additional'
  },
  {
    id: 'last-journey-31-40',
    title: 'Last Journey Vehicle (31-40 km)',
    description: 'Air conditioned transportation services for the deceased with dignity and respect. (31-40 km to & from)',
    icon: <Car className="h-6 w-6" />,
    price: 3500,
    category: 'additional'
  },
  {
    id: 'last-journey-41-50',
    title: 'Last Journey Vehicle (41-50 km)',
    description: 'Air conditioned transportation services for the deceased with dignity and respect. (41-50 km to & from)',
    icon: <Car className="h-6 w-6" />,
    price: 4000,
    category: 'additional'
  },
  {
    id: 'large-pooja-hall',
    title: 'Large Pooja Hall',
    description: 'Spacious pooja hall for large ceremonies and gatherings.',
    icon: <Flower className="h-6 w-6" />, // Assuming an icon component like "Temple"
    price: 2000,
    category: 'additional'
  },
  {
    id: 'small-pooja-hall',
    title: 'Small Pooja Hall',
    description: 'Cozy pooja hall for smaller ceremonies and gatherings.',
    icon: <Flower className="h-6 w-6" />, // Same icon or different based on your preference
    price: 600,
    category: 'additional'
  },
  {
    id: 'test-item',
    title: 'test-item',
    description: 'test-item',
    icon: <Flower className="h-6 w-6" />, // Same icon or different based on your preference
    price: 10,
    category: 'additional'
  },
];


export default function ServicesPage() {
  // State for selected services
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  
  // Group services by category
  const mainServices = allServices.filter(service => service.category === 'main');
  const additionalServices = allServices.filter(service => service.category === 'additional');

  // Handle service selection/deselection
  const handleServiceToggle = (serviceId: string) => {
    setSelectedServices(prev => 
      prev.includes(serviceId)
        ? prev.filter(id => id !== serviceId)
        : [...prev, serviceId]
    );
  };

  // Calculate total based on selected services
  const calculateTotal = () => {
    return allServices
      .filter(service => selectedServices.includes(service.id))
      .reduce((total, service) => total + service.price, 0);
  };

  // Proceed to payment
  const handleProceedToPayment = () => {
    if (selectedServices.length === 0) {
      toast({
        title: "No services selected",
        description: "Please select at least one service to continue.",
        variant: "destructive",
      });
      return;
    }

    // Store selected services in session storage for the payment page
    sessionStorage.setItem('selectedServices', JSON.stringify(
      selectedServices.map(id => allServices.find(service => service.id === id))
    ));
    
    // Navigate to payment page
    window.location.href = '/payment';
  };

  // Service card component
  const ServiceCard = ({ service }: { service: ServiceOption }) => {
    const isSelected = selectedServices.includes(service.id);
    
    return (
      <motion.div
        whileHover={{ y: -5 }}
        className={`
          bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md border 
          ${isSelected 
            ? 'border-primary shadow-lg' 
            : 'border-gray-100 dark:border-gray-700'}
          transition-all duration-300 h-full relative flex flex-col
        `}
      >
        {/* Checkbox for selection */}
        <div className="absolute top-4 right-4">
          <Checkbox
            id={`service-${service.id}`}
            checked={isSelected}
            onCheckedChange={() => handleServiceToggle(service.id)}
            className="h-5 w-5"
          />
        </div>
        
        {/* Service info */}
        <div className="w-14 h-14 flex items-center justify-center rounded-lg mb-4 bg-primary/10 text-primary dark:bg-primary/20">
          {service.icon}
        </div>
        <h3 className="font-serif text-xl font-semibold mb-2">{service.title}</h3>
        <p className="text-muted-foreground text-sm mb-4">{service.description}</p>
        
        {/* Price */}
        <div className="mt-auto">
          <p className="font-medium text-lg">
            {service.price > 0 
              ? `₹${service.price.toLocaleString()}`
              : "Custom pricing"}
          </p>
          <button
            onClick={() => handleServiceToggle(service.id)}
            className="mt-3 text-primary hover:text-primary-dark flex items-center text-sm font-medium"
          >
            {isSelected ? "Deselect Service" : "Select Service"}
          </button>
        </div>
      </motion.div>
    );
  };

  // Facility perks section
  const facilityPerks = [
    "Visitors' lounge with comfortable seating arrangements",
    "RO plant for clean drinking water",
    "Modern washrooms for guests",
    "Storage room for ashes with secure lockers"
  ];

  return (
    <PageTransition>
      {/* Page Header */}
      <PageHeader
        title="Our Services"
        description="Discover our eco-friendly cremation services and additional offerings."
        backgroundImage="https://images.unsplash.com/photo-1613513305768-0e10c2cbadac?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80"
      />

      {/* Introduction Section */}
      <section className="py-12 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <SectionHeading
            subtitle="Eco-Friendly Solutions"
            title="Dignified Farewell Services"
            description="At Swargvatika, we offer a range of environmentally conscious cremation options that honor tradition while protecting our planet. Select the services you need and proceed to booking."
          />
        </div>
      </section>

      {/* Main Services Section */}
      <section className="py-12 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <SectionHeading
              subtitle="Primary Services"
              title="Cremation Options"
              description="Choose from our range of eco-friendly cremation platforms and methods."
              align="left"
            />
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
            {mainServices.map((service, index) => (
              <ScrollReveal key={service.id} delay={index * 0.1}>
                <ServiceCard service={service} />
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Facility Perks Section */}
      <section className="py-12 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <SectionHeading
              subtitle="Facility Features"
              title="Comfort For Visiting Families"
              description="Our crematorium is designed with amenities to provide comfort to grieving families and visitors."
              align="left"
            />
          </ScrollReveal>

          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            {facilityPerks.map((perk, index) => (
              <ScrollReveal 
                key={index} 
                delay={index * 0.1}
                className="bg-gray-50 dark:bg-gray-800 p-6 rounded-xl border border-gray-100 dark:border-gray-700 flex"
              >
                <div className="mr-4 mt-1 text-primary">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" stroke="currentColor" fill="none" />
                    <path d="M9 12L11 14L15 10" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" stroke="currentColor" />
                  </svg>
                </div>
                <div className="text-foreground font-medium">{perk}</div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Additional Services Section */}
      <section className="py-12 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <SectionHeading
              subtitle="Additional Offerings"
              title="Complementary Services"
              description="Enhance your arrangements with these additional services for a complete ceremony."
              align="left"
            />
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
            {additionalServices.map((service, index) => (
              <ScrollReveal key={service.id} delay={index * 0.1}>
                <ServiceCard service={service} />
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Service Selection Summary */}
      <section className="py-12 bg-white dark:bg-gray-900 sticky bottom-0 border-t border-gray-200 dark:border-gray-700 shadow-lg">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div>
              <h3 className="font-serif text-xl font-bold mb-2">
                Selected Services: <span className="text-primary">{selectedServices.length}</span>
              </h3>
              <p className="text-muted-foreground">
                Total Amount: <span className="font-bold text-foreground">₹{calculateTotal().toLocaleString()}</span>
              </p>
            </div>
            <div className="mt-4 md:mt-0">
              <Button 
                onClick={handleProceedToPayment}
                className="bg-primary hover:bg-primary/90 text-white font-medium px-6 py-3 h-auto shimmer-button"
                disabled={selectedServices.length === 0}
              >
                Proceed to Payment
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </section>
    </PageTransition>
  );
}
