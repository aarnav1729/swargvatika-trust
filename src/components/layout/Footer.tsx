
import { ChevronRight, Facebook, Instagram, Leaf, Mail, MapPin, Phone, Twitter } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useInView } from 'react-intersection-observer';
import { cn } from '@/lib/utils';
import path from 'path';

export default function Footer() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <footer ref={ref} className="bg-gradient-to-br from-gray-900 to-gray-950 text-white relative overflow-hidden">
      {/* Animated Leaf Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className={cn(
              "absolute text-green-500/10 animate-float",
              i % 2 === 0 ? "text-primary/5" : "text-secondary/5"
            )}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              transform: `rotate(${Math.random() * 360}deg) scale(${0.5 + Math.random() * 1.5})`,
              opacity: 0.1 + Math.random() * 0.2,
            }}
          >
            <Leaf size={30 + Math.random() * 40} />
          </div>
        ))}
      </div>

      <div className="container mx-auto px-4 pt-16 pb-8">
        <div className={cn(
          "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 transition-opacity duration-1000 ease-in-out",
          inView ? "opacity-100" : "opacity-0"
        )}>
          {/* About Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Leaf className="h-6 w-6 text-primary" />
              <h3 className="font-serif text-xl font-bold">Swarg Vatika</h3>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed">
              Hyderabad's first eco-friendly, energy efficient, and pollution-free crematorium, providing respectful final journey services while preserving our environment.
            </p>
            <div className="flex space-x-4 pt-2">
              <a href="#" className="text-gray-400 hover:text-primary transition-colors" aria-label="Facebook">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary transition-colors" aria-label="Twitter">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary transition-colors" aria-label="Instagram">
                <Instagram size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-serif text-lg font-medium">Quick Links</h3>
            <ul className="space-y-2">
              {[
                { name: "Home", path: "/" },
                { name: "About Us", path: "/about" },
                { name: "Our Services", path: "/services" },
                { name: "Donor List", path: "/donors" },
                { name: "Location", path: "/location" },
                { name: "Gallery", path: "/gallery" },
                { name: "Media", path: "/media" },
                { name: "Contact Us", path: "/contact" },
              ].map((link) => (
                <li key={link.path}>
                  <Link 
                    to={link.path}
                    className="text-gray-300 hover:text-primary transition-colors flex items-center group"
                  >
                    <ChevronRight size={16} className="mr-2 transition-transform group-hover:translate-x-1" />
                    <span>{link.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h3 className="font-serif text-lg font-medium">Our Services</h3>
            <ul className="space-y-2">
              {[
                "Gau Kashth",
                "LPG Crematorium",
                "Charitable Medical Centre",
                "Electrical Crematorium",
                "Conventional Platforms",
                "Last Journey Vehicle",
                "Eye Donation",
                "Body Freezer Boxes",
                "Mortuary Services",
                "Ash Preservation",
                "Pandit Arrangement",
                "Pooja Hall",
              ].map((service) => (
                <li key={service}>
                  <Link 
                    to="/services" 
                    className="text-gray-300 hover:text-primary transition-colors flex items-center group"
                  >
                    <ChevronRight size={16} className="mr-2 transition-transform group-hover:translate-x-1" />
                    <span>{service}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h3 className="font-serif text-lg font-medium">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin size={20} className="mr-3 text-primary shrink-0 mt-1" />
                <span className="text-gray-300">123 Eco Gardens, Hyderabad, Telangana, India - 500001</span>
              </li>
              <li className="flex items-center">
                <Phone size={20} className="mr-3 text-primary shrink-0" />
                <a href="tel:+919876543210" className="text-gray-300 hover:text-primary transition-colors">
                  +91 9876 543 210
                </a>
              </li>
              <li className="flex items-center">
                <Mail size={20} className="mr-3 text-primary shrink-0" />
                <a href="mailto:info@swargvatika.org" className="text-gray-300 hover:text-primary transition-colors">
                  info@swargvatika.org
                </a>
              </li>
            </ul>
          </div>
        </div>

        <hr className="border-gray-800 my-8" />

        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            © {new Date().getFullYear()} Swargvatika. All rights reserved.
          </p>
          <div className="mt-4 md:mt-0">
            <ul className="flex space-x-6 text-sm text-gray-400">
              <li><a href="#" className="hover:text-primary transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Terms of Service</a></li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
