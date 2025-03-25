
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
  amount: number;
  date: string;
  category: 'platinum' | 'gold' | 'silver' | 'individual';
}

// Sample donor data
const donors: Donor[] = [
  // Platinum Donors
  { id: 1, name: 'Green Earth Foundation', amount: 2500000, date: '2023-01-15', category: 'platinum' },
  { id: 2, name: 'Sustainable Futures Corp', amount: 2000000, date: '2023-02-20', category: 'platinum' },
  { id: 3, name: 'EcoLife Trust', amount: 1800000, date: '2023-03-05', category: 'platinum' },
  
  // Gold Donors
  { id: 4, name: 'Nature First Initiative', amount: 1000000, date: '2023-02-10', category: 'gold' },
  { id: 5, name: 'Mohan & Family Charitable Trust', amount: 800000, date: '2023-03-12', category: 'gold' },
  { id: 6, name: 'Harmony Foundation', amount: 750000, date: '2023-04-18', category: 'gold' },
  { id: 7, name: 'GreenTech Industries', amount: 700000, date: '2023-05-22', category: 'gold' },
  
  // Silver Donors
  { id: 8, name: 'Sharma Family Trust', amount: 500000, date: '2023-01-30', category: 'silver' },
  { id: 9, name: 'Progressive Community Group', amount: 450000, date: '2023-02-14', category: 'silver' },
  { id: 10, name: 'Eco Warriors Club', amount: 400000, date: '2023-03-25', category: 'silver' },
  { id: 11, name: 'United Green Alliance', amount: 350000, date: '2023-04-10', category: 'silver' },
  { id: 12, name: 'Clean Earth Association', amount: 300000, date: '2023-05-15', category: 'silver' },
  
  // Individual Donors
  { id: 13, name: 'Dr. Rajesh Kumar', amount: 250000, date: '2023-01-05', category: 'individual' },
  { id: 14, name: 'Mrs. Anita Desai', amount: 200000, date: '2023-02-08', category: 'individual' },
  { id: 15, name: 'Mr. Vikram Singh', amount: 150000, date: '2023-03-12', category: 'individual' },
  { id: 16, name: 'Ms. Priya Sharma', amount: 100000, date: '2023-04-17', category: 'individual' },
  { id: 17, name: 'Mr. Mohan Rao', amount: 75000, date: '2023-05-20', category: 'individual' },
  { id: 18, name: 'Mrs. Sunita Reddy', amount: 50000, date: '2023-06-02', category: 'individual' },
  { id: 19, name: 'Dr. Sanjay Patel', amount: 25000, date: '2023-06-15', category: 'individual' },
  { id: 20, name: 'Mr. Ravi Krishnan', amount: 20000, date: '2023-07-01', category: 'individual' },
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
  const platinumDonors = filteredDonors.filter(donor => donor.category === 'platinum');
  const goldDonors = filteredDonors.filter(donor => donor.category === 'gold');
  const silverDonors = filteredDonors.filter(donor => donor.category === 'silver');
  const individualDonors = filteredDonors.filter(donor => donor.category === 'individual');

  // Get donor badge color based on category
  const getDonorBadgeColor = (category: string) => {
    switch (category) {
      case 'platinum':
        return 'bg-gradient-to-r from-gray-300 to-gray-100 border-gray-300';
      case 'gold':
        return 'bg-gradient-to-r from-amber-300 to-amber-100 border-amber-300';
      case 'silver':
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
                  onClick={() => setFilter('platinum')}
                  className={cn(
                    "px-4 py-2 rounded-full text-sm whitespace-nowrap",
                    filter === 'platinum'
                      ? "bg-primary text-white"
                      : "bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700"
                  )}
                >
                  Platinum
                </button>
                <button
                  onClick={() => setFilter('gold')}
                  className={cn(
                    "px-4 py-2 rounded-full text-sm whitespace-nowrap",
                    filter === 'gold'
                      ? "bg-primary text-white"
                      : "bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700"
                  )}
                >
                  Gold
                </button>
                <button
                  onClick={() => setFilter('silver')}
                  className={cn(
                    "px-4 py-2 rounded-full text-sm whitespace-nowrap",
                    filter === 'silver'
                      ? "bg-primary text-white"
                      : "bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700"
                  )}
                >
                  Silver
                </button>
                <button
                  onClick={() => setFilter('individual')}
                  className={cn(
                    "px-4 py-2 rounded-full text-sm whitespace-nowrap",
                    filter === 'individual'
                      ? "bg-primary text-white"
                      : "bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700"
                  )}
                >
                  Individual
                </button>
              </div>
            </div>
          </div>

          {/* Platinum Donors */}
          {(filter === 'all' || filter === 'platinum') && platinumDonors.length > 0 && (
            <div className="mb-12">
              <ScrollReveal>
                <h3 className="font-serif text-2xl font-bold mb-6 flex items-center">
                  <span className="w-10 h-10 flex items-center justify-center rounded-full bg-gradient-to-r from-gray-300 to-gray-100 mr-3">
                    <HeartHandshake className="h-5 w-5 text-gray-700" />
                  </span>
                  Platinum Donors (₹15,00,000+)
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
                      <p className="text-gray-700 dark:text-gray-300 mb-2">
                        ₹{donor.amount.toLocaleString()}
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {new Date(donor.date).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                        })}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </ScrollReveal>
            </div>
          )}

          {/* Gold Donors */}
          {(filter === 'all' || filter === 'gold') && goldDonors.length > 0 && (
            <div className="mb-12">
              <ScrollReveal>
                <h3 className="font-serif text-2xl font-bold mb-6 flex items-center">
                  <span className="w-10 h-10 flex items-center justify-center rounded-full bg-gradient-to-r from-amber-300 to-amber-100 mr-3">
                    <HeartHandshake className="h-5 w-5 text-amber-700" />
                  </span>
                  Gold Donors (₹5,00,000 - ₹15,00,000)
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
                      <p className="text-gray-700 dark:text-gray-300 mb-2">
                        ₹{donor.amount.toLocaleString()}
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {new Date(donor.date).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                        })}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </ScrollReveal>
            </div>
          )}

          {/* Silver Donors */}
          {(filter === 'all' || filter === 'silver') && silverDonors.length > 0 && (
            <div className="mb-12">
              <ScrollReveal>
                <h3 className="font-serif text-2xl font-bold mb-6 flex items-center">
                  <span className="w-10 h-10 flex items-center justify-center rounded-full bg-gradient-to-r from-gray-300 to-gray-100 mr-3">
                    <HeartHandshake className="h-5 w-5 text-gray-600" />
                  </span>
                  Silver Donors (₹3,00,000 - ₹5,00,000)
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
                      <p className="text-gray-700 dark:text-gray-300 mb-2">
                        ₹{donor.amount.toLocaleString()}
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {new Date(donor.date).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                        })}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </ScrollReveal>
            </div>
          )}

          {/* Individual Donors */}
          {(filter === 'all' || filter === 'individual') && individualDonors.length > 0 && (
            <div>
              <ScrollReveal>
                <h3 className="font-serif text-2xl font-bold mb-6 flex items-center">
                  <span className="w-10 h-10 flex items-center justify-center rounded-full bg-gradient-to-r from-blue-100 to-white mr-3">
                    <HeartHandshake className="h-5 w-5 text-blue-600" />
                  </span>
                  Individual Donors
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
                      <p className="text-gray-700 dark:text-gray-300 mb-2">
                        ₹{donor.amount.toLocaleString()}
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {new Date(donor.date).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                        })}
                      </p>
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
