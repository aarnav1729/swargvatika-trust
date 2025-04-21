
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PageTransition from '@/components/layout/PageTransition';
import PageHeader from '@/components/ui/PageHeader';
import SectionHeading from '@/components/ui/SectionHeading';
import ScrollReveal from '@/components/ui/ScrollReveal';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';
import med1 from '@/assets/28.jpg';
import med2 from '@/assets/29.jpg';
import med3 from '@/assets/27.jpg';
import med4 from '@/assets/25.jpg';
import med5 from '@/assets/2.jpg';
import med6 from '@/assets/7.jpg';
import med7 from '@/assets/3.jpg';
import med8 from '@/assets/1.jpg';


// Define gallery image interface
interface GalleryImage {
  id: string;
  src: string;
  alt: string;
  category: string;
}

// Sample gallery images
const galleryImages: GalleryImage[] = [
  // Facility Images
  {
    id: 'img-1',
    src: med1,
    alt: 'Main entrance of Swargvatika',
    category: 'facility'
  },
  {
    id: 'img-2',
    src: med2,
    alt: 'Eco-friendly cremation platform',
    category: 'facility'
  },
  {
    id: 'img-3',
    src: med3,
    alt: 'Visitor\'s lounge with seating area',
    category: 'facility'
  },
  {
    id: 'img-4',
    src: med4,
    alt: 'Gau Kashth preparation area',
    category: 'facility'
  },
  {
    id: 'img-5',
    src: med5,
    alt: 'CNG/LPG cremation system',
    category: 'facility'
  },
  
  // Nature Images
  {
    id: 'img-6',
    src: med6,
    alt: 'Garden area with native plants',
    category: 'nature'
  },
  {
    id: 'img-7',
    src: med7,
    alt: 'Water conservation system',
    category: 'nature'
  },
  {
    id: 'img-8',
    src: med8,
    alt: 'Solar panels on facility roof',
    category: 'nature'
  },
  {
    id: 'img-9',
    src: med1,
    alt: 'Tree plantation area',
    category: 'nature'
  },
  
  // Events Images
  {
    id: 'img-10',
    src: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1169&q=80',
    alt: 'Inauguration ceremony',
    category: 'event'
  },
  {
    id: 'img-11',
    src: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
    alt: 'Environmental awareness workshop',
    category: 'event'
  },
  {
    id: 'img-12',
    src: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
    alt: 'Tree planting drive',
    category: 'event'
  },
  {
    id: 'img-13',
    src: 'https://images.unsplash.com/photo-1576267423445-b2e0074d68a4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=880&q=80',
    alt: 'Award ceremony',
    category: 'event'
  },
  {
    id: 'img-14',
    src: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1112&q=80',
    alt: 'Community outreach program',
    category: 'event'
  },
  {
    id: 'img-15',
    src: 'https://images.unsplash.com/photo-1560523159-4a9692d222f9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
    alt: 'Educational tour for students',
    category: 'event'
  },
];

export default function GalleryPage() {
  const [filter, setFilter] = useState<string>('all');
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  // Filter images based on category
  const filteredImages = filter === 'all' 
    ? galleryImages 
    : galleryImages.filter(img => img.category === filter);

  // Open lightbox with selected image
  const openLightbox = (image: GalleryImage) => {
    setSelectedImage(image);
    setLightboxOpen(true);
  };

  // Close lightbox
  const closeLightbox = () => {
    setLightboxOpen(false);
  };

  return (
    <PageTransition>
      {/* Page Header */}
      <PageHeader
        title="Image Gallery"
        description="Explore our facilities, events, and environmental initiatives through our gallery of images."
        backgroundImage="https://images.unsplash.com/photo-1500051638674-ff996a0ec29e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1218&q=80"
      />

      {/* Main Content */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <SectionHeading
            subtitle="Visual Archive"
            title="Our Gallery Collection"
            description="Browse through images of our eco-friendly facilities, natural surroundings, and special events."
          />

          {/* Filter Buttons */}
          <div className="flex flex-wrap justify-center gap-4 mt-8 mb-12">
            <Button
              variant={filter === 'all' ? 'default' : 'outline'}
              onClick={() => setFilter('all')}
              className="rounded-full"
            >
              All Images
            </Button>
            <Button
              variant={filter === 'facility' ? 'default' : 'outline'}
              onClick={() => setFilter('facility')}
              className="rounded-full"
            >
              Facilities
            </Button>
            <Button
              variant={filter === 'nature' ? 'default' : 'outline'}
              onClick={() => setFilter('nature')}
              className="rounded-full"
            >
              Nature & Environment
            </Button>
            <Button
              variant={filter === 'event' ? 'default' : 'outline'}
              onClick={() => setFilter('event')}
              className="rounded-full"
            >
              Events
            </Button>
          </div>

          {/* Image Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            <AnimatePresence>
              {filteredImages.map((image, index) => (
                <motion.div
                  key={image.id}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  layout
                  className="overflow-hidden rounded-xl shadow-md hover:shadow-lg transition-all"
                >
                  <div 
                    className="cursor-pointer relative overflow-hidden h-64 group"
                    onClick={() => openLightbox(image)}
                  >
                    <img 
                      src={image.src} 
                      alt={image.alt}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <span className="text-white text-sm bg-black/50 px-3 py-1 rounded-full">View</span>
                    </div>
                  </div>
                  <div className="p-3 bg-white dark:bg-gray-800">
                    <p className="text-sm text-muted-foreground">{image.alt}</p>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* No results message */}
          {filteredImages.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No images found in this category.</p>
            </div>
          )}
        </div>
      </section>

      {/* Lightbox Dialog */}
      <Dialog open={lightboxOpen} onOpenChange={setLightboxOpen}>
        <DialogContent className="max-w-5xl bg-black/95 border-none">
          <button 
            onClick={closeLightbox}
            className="absolute right-4 top-4 text-white hover:text-gray-300 transition-colors z-50"
          >
            <X className="h-6 w-6" />
          </button>
          
          {selectedImage && (
            <div className="flex items-center justify-center h-full w-full">
              <motion.img 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                src={selectedImage.src} 
                alt={selectedImage.alt}
                className="max-h-[80vh] max-w-full object-contain"
              />
            </div>
          )}
          
          {selectedImage && (
            <div className="text-center text-white mt-2">
              <p>{selectedImage.alt}</p>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </PageTransition>
  );
}
