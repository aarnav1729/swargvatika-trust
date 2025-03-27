
import { useState } from 'react';
import { motion } from 'framer-motion';
import PageTransition from '@/components/layout/PageTransition';
import PageHeader from '@/components/ui/PageHeader';
import SectionHeading from '@/components/ui/SectionHeading';
import ScrollReveal from '@/components/ui/ScrollReveal';
import { Input } from '@/components/ui/input';
import { HeartHandshake } from 'lucide-react';
import { cn } from '@/lib/utils';

// Interface for donor data
interface Donor {
  id: number;
  name: string;
  category: 'Chief Patron' | 'Patron Cum Trustee' | 'Donor Cum Trustee' | 'Donors';
}

// Sample donor data
const donors: Donor[] = [
  // Platinum Donors
  { id: 1, name: 'Kallam Satish Reddy', category: 'Chief Patron' },
  { id: 2, name: 'J. Ranjith Rao', category: 'Chief Patron' },
  
  // Gold Donors
  { id: 3, name: 'Guda Krishna Prasad', category: 'Patron Cum Trustee' },
  { id: 4, name: 'Guda Krishna Prasad', category: 'Patron Cum Trustee' },
  
  // Silver Donors
  { id: 5, name: 'Amarjyot Singh', category: 'Donor Cum Trustee' },
  { id: 6, name: 'Anil Dundoo',  category: 'Donor Cum Trustee' },
  { id: 7, name: 'Anil Kumar Kedia', category: 'Donor Cum Trustee' },
  { id: 8, name: 'Ashok Kapoor', category: 'Donor Cum Trustee' },
  { id: 9, name: 'Avanindra Kumar D.', category: 'Donor Cum Trustee' },
  { id: 10, name: 'Bhupinder Talwar', category: 'Donor Cum Trustee' },
  { id: 11, name: 'Dr. Gokhale, A.G.K.', category: 'Donor Cum Trustee' },
  { id: 12, name: 'Gowra Srinivas', category: 'Donor Cum Trustee' },
  { id: 13, name: 'Dr. Gurava Reddy A. V.', category: 'Donor Cum Trustee' },
  { id: 14, name: 'Harish Kumar', category: 'Donor Cum Trustee' },
  { id: 15, name: 'Hiralal Thakral', category: 'Donor Cum Trustee' },
  { id: 16, name: 'Dr. Kasu Prasad Reddy', category: 'Donor Cum Trustee' },
  { id: 17, name: 'Kohli T.S.', category: 'Donor Cum Trustee' },
  { id: 18, name: 'Malla Reddy C.', category: 'Donor Cum Trustee' },
  { id: 19, name: 'Manjeet Singh Gandhi', category: 'Donor Cum Trustee' },
  { id: 20, name: 'ManMohan Kanodia', category: 'Donor Cum Trustee' },
  { id: 21, name: 'Dr. Mohana Vamsy Ch.', category: 'Donor Cum Trustee' },
  { id: 22, name: 'Murti TVR', category: 'Donor Cum Trustee' },
  { id: 23, name: 'Narang V. S.', category: 'Donor Cum Trustee' },
  { id: 24, name: 'Narender Gauri', category: 'Donor Cum Trustee' },
  { id: 25, name: 'Dr. Narsaiah B.', category: 'Donor Cum Trustee' },
  { id: 26, name: 'Pradeep Ramrakhyani', category: 'Donor Cum Trustee' },
  { id: 27, name: 'Rajanarender B.', category: 'Donor Cum Trustee' },
  { id: 28, name: 'Rajesh Malik', category: 'Donor Cum Trustee' },
  { id: 29, name: 'Rajendra Prasad V.', category: 'Donor Cum Trustee' },
  { id: 30, name: 'Ramesh Malani', category: 'Donor Cum Trustee' },
  { id: 31, name: 'Ramesh P. R.', category: 'Donor Cum Trustee' },
  { id: 32, name: 'Ranjan Sood', category: 'Donor Cum Trustee' },
  { id: 33, name: 'Dr. Rao T.B.', category: 'Donor Cum Trustee' },
  { id: 34, name: 'Smt. Ratna Rao', category: 'Donor Cum Trustee' },
  { id: 35, name: 'Sanjay Dugar', category: 'Donor Cum Trustee' },
  { id: 36, name: 'Shyam Chandak', category: 'Donor Cum Trustee' },
  { id: 37, name: 'Sirish B. N.', category: 'Donor Cum Trustee' },
  { id: 38, name: 'Sivaprasad Reddy R.', category: 'Donor Cum Trustee' },
  { id: 39, name: 'Dr. Somaraju B.', category: 'Donor Cum Trustee' },
  { id: 40, name: 'Sunil Talwar', category: 'Donor Cum Trustee' },
  { id: 41, name: 'Surender Pal Singh Saluja', category: 'Donor Cum Trustee' },

  
  // Individual Donors
  { id: 42, name: 'Agarwal Samaj, Balkampet', category: 'Donors' },
  { id: 43, name: 'Seshamamba Foundation', category: 'Donors' }, 
  { id: 44, name: 'Dr. G. Padma', category: 'Donors' },
  { id: 45, name: 'Ashitosh Modi', category: 'Donors' },
  { id: 46, name: 'Gautam Chand Jain', category: 'Donors' },
  { id: 47, name: 'Gerard Carr', category: 'Donors' },
  { id: 48, name: 'Govind Gupta', category: 'Donors' },
  { id: 49, name: 'Pradarsh Katyal', category: 'Donors' },
  { id: 50, name: 'Rajesh Khanna', category: 'Donors' },
  { id: 51, name: 'Ranbir Singh Gandhi', category: 'Donors' },
  { id: 52, name: 'Dr. Surender L. R', category: 'Donors' },
  { id: 53, name: 'Viram Reddy K.', category: 'Donors' },
];

export default function DonorsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState<string>('all');
  
  // Filter and search donors
  const filteredDonors = donors.filter(donor => {
    const matchesSearch = donor.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filter === 'all' || donor.category === filter;
    return matchesSearch && matchesFilter;
  });
  
  // Group donors by category for display
  const platinumDonors = filteredDonors.filter(donor => donor.category === 'Chief Patron');
  const goldDonors = filteredDonors.filter(donor => donor.category === 'Patron Cum Trustee');
  const silverDonors = filteredDonors.filter(donor => donor.category === 'Donor Cum Trustee');
  const individualDonors = filteredDonors.filter(donor => donor.category === 'Donors');

  // Get donor badge color based on category
  const getDonorBadgeColor = (category: string) => {
    switch (category) {
      case 'Chief Patron':
        return 'bg-gradient-to-r from-gray-300 to-gray-100 border-gray-300';
      case 'Patron Cum Trustee':
        return 'bg-gradient-to-r from-amber-300 to-amber-100 border-amber-300';
      case 'Donor Cum Trustee':
        return 'bg-gradient-to-r from-gray-300 to-gray-100 border-gray-200';
      default:
        return 'bg-gradient-to-r from-blue-100 to-white border-blue-200';
    }
  };

  return (
    <PageTransition>
      {/* Page Header */}
      <PageHeader
        title="Our Generous Donors"
        description="We extend our heartfelt gratitude to all individuals and organizations who have contributed to our eco-friendly initiative."
        backgroundImage="https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
      />

      {/* Main Content */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <SectionHeading
            subtitle="Donor Recognition"
            title="Honoring Our Supporters"
            description="Swargvatika thrives through the generous support of corporations, foundations, and individuals who share our vision of environmentally conscious final rites."
          />

          {/* Search and Filter */}
          <div className="mt-8 mb-12 grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="md:col-span-2">
              <Input
                placeholder="Search donors..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full"
              />
            </div>
            <div className="md:col-span-2">
              <div className="flex space-x-2 overflow-x-auto pb-2">
                <button
                  onClick={() => setFilter('all')}
                  className={cn(
                    "px-4 py-2 rounded-full text-sm whitespace-nowrap",
                    filter === 'all'
                      ? "bg-primary text-white"
                      : "bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700"
                  )}
                >
                  All Donors
                </button>
                <button
                  onClick={() => setFilter('Chief Patron')}
                  className={cn(
                    "px-4 py-2 rounded-full text-sm whitespace-nowrap",
                    filter === 'Chief Patron'
                      ? "bg-primary text-white"
                      : "bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700"
                  )}
                >
                  Chief Patron
                </button>
                <button
                  onClick={() => setFilter('Patron Cum Trustee')}
                  className={cn(
                    "px-4 py-2 rounded-full text-sm whitespace-nowrap",
                    filter === 'Patron Cum Trustee'
                      ? "bg-primary text-white"
                      : "bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700"
                  )}
                >
                  Patron Cum Trustee
                </button>
                <button
                  onClick={() => setFilter('Donor Cum Trustee')}
                  className={cn(
                    "px-4 py-2 rounded-full text-sm whitespace-nowrap",
                    filter === 'Donor Cum Trustee'
                      ? "bg-primary text-white"
                      : "bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700"
                  )}
                >
                  Donor Cum Trustee
                </button>
                <button
                  onClick={() => setFilter('Donors')}
                  className={cn(
                    "px-4 py-2 rounded-full text-sm whitespace-nowrap",
                    filter === 'Donors'
                      ? "bg-primary text-white"
                      : "bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700"
                  )}
                >
                  Donors
                </button>
              </div>
            </div>
          </div>

          {/* Platinum Donors */}
          {(filter === 'all' || filter === 'Chief Patron') && platinumDonors.length > 0 && (
            <div className="mb-12">
              <ScrollReveal>
                <h3 className="font-serif text-2xl font-bold mb-6 flex items-center">
                  <span className="w-10 h-10 flex items-center justify-center rounded-full bg-gradient-to-r from-gray-300 to-gray-100 mr-3">
                    <HeartHandshake className="h-5 w-5 text-gray-700" />
                  </span>
                  Chief Patron
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {platinumDonors.map((donor, index) => (
                    <motion.div
                      key={donor.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className={cn(
                        "rounded-xl p-6 shadow-md border hover:shadow-lg transition-all",
                        getDonorBadgeColor(donor.category)
                      )}
                    >
                      <h4 className="font-serif text-xl font-bold mb-2">{donor.name}</h4>
                    </motion.div>
                  ))}
                </div>
              </ScrollReveal>
            </div>
          )}

          {/* Gold Donors */}
          {(filter === 'all' || filter === 'Patron Cum Trustee') && goldDonors.length > 0 && (
            <div className="mb-12">
              <ScrollReveal>
                <h3 className="font-serif text-2xl font-bold mb-6 flex items-center">
                  <span className="w-10 h-10 flex items-center justify-center rounded-full bg-gradient-to-r from-amber-300 to-amber-100 mr-3">
                    <HeartHandshake className="h-5 w-5 text-amber-700" />
                  </span>
                  Patron Cum Trustee
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {goldDonors.map((donor, index) => (
                    <motion.div
                      key={donor.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className={cn(
                        "rounded-xl p-6 shadow-md border hover:shadow-lg transition-all",
                        getDonorBadgeColor(donor.category)
                      )}
                    >
                      <h4 className="font-serif text-xl font-bold mb-2">{donor.name}</h4>

                    </motion.div>
                  ))}
                </div>
              </ScrollReveal>
            </div>
          )}

          {/* Silver Donors */}
          {(filter === 'all' || filter === 'Donor Cum Trustee') && silverDonors.length > 0 && (
            <div className="mb-12">
              <ScrollReveal>
                <h3 className="font-serif text-2xl font-bold mb-6 flex items-center">
                  <span className="w-10 h-10 flex items-center justify-center rounded-full bg-gradient-to-r from-gray-300 to-gray-100 mr-3">
                    <HeartHandshake className="h-5 w-5 text-gray-600" />
                  </span>
                  Donor Cum Trustee
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {silverDonors.map((donor, index) => (
                    <motion.div
                      key={donor.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className={cn(
                        "rounded-xl p-6 shadow-md border hover:shadow-lg transition-all",
                        getDonorBadgeColor(donor.category)
                      )}
                    >
                      <h4 className="font-serif text-xl font-bold mb-2">{donor.name}</h4>
                    </motion.div>
                  ))}
                </div>
              </ScrollReveal>
            </div>
          )}

          {/* Individual Donors */}
          {(filter === 'all' || filter === 'Donors') && individualDonors.length > 0 && (
            <div>
              <ScrollReveal>
                <h3 className="font-serif text-2xl font-bold mb-6 flex items-center">
                  <span className="w-10 h-10 flex items-center justify-center rounded-full bg-gradient-to-r from-blue-100 to-white mr-3">
                    <HeartHandshake className="h-5 w-5 text-blue-600" />
                  </span>
                  Donors
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {individualDonors.map((donor, index) => (
                    <motion.div
                      key={donor.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className={cn(
                        "rounded-xl p-6 shadow-md border hover:shadow-lg transition-all",
                        getDonorBadgeColor(donor.category)
                      )}
                    >
                      <h4 className="font-serif text-xl font-bold mb-2">{donor.name}</h4>
                    </motion.div>
                  ))}
                </div>
              </ScrollReveal>
            </div>
          )}

          {/* No results */}
          {filteredDonors.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No donors found matching your search criteria.</p>
            </div>
          )}
        </div>
      </section>
    </PageTransition>
  );
}
