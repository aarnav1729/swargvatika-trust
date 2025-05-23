import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion, useScroll, useTransform } from 'framer-motion';
import PageTransition from '@/components/layout/PageTransition';
import PageHeader from '@/components/ui/PageHeader';
import SectionHeading from '@/components/ui/SectionHeading';
import ScrollReveal from '@/components/ui/ScrollReveal';
import { useInView } from 'react-intersection-observer';
import { Leaf, Award, Target, Users } from 'lucide-react';
import { cn } from '@/lib/utils';
import BackImg from '@/assets/7.jpg';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);
interface TrusteeProps {
  name: string;
  position: string;
  photo?: string;
}

const Trustees: TrusteeProps[] = [
  { name: "J. Ranjith Rao", position: "Chief Patron", photo: "" },
  { name: "Kallam Satish Reddy", position: "Chief Patron", photo: "" },
  { name: "Jayant Jain", position: "Patron Cum Trustee", photo: "" },
  { name: "T. B. Rao", position: "Patron Cum Trustee", photo: "" },
  { name: "Amarjyot Singh", position: "Donors Cum Trustee", photo: "" },
  { name: "Anil Dundoo", position: "Donors Cum Trustee", photo: "" },
  { name: "Anil Kumar Kedia", position: "Donors Cum Trustee", photo: "" },
  { name: "Ashok Kapoor", position: "Donors Cum Trustee", photo: "" },
  { name: "Avanindra Kumar D.", position: "Donors Cum Trustee", photo: "" },
  { name: "Bhupinder Talwar", position: "Donors Cum Trustee", photo: "" },
  { name: "Dr. Gokhale, A.G.K.", position: "Donors Cum Trustee", photo: "" },
  { name: "Gowra Srinivas", position: "Donors Cum Trustee", photo: "" },
  { name: "Dr. Gurava Reddy A. V.", position: "Donors Cum Trustee", photo: "" },
  { name: "Harish Kumar", position: "Donors Cum Trustee", photo: "" },
  { name: "Hiralal Thakral", position: "Donors Cum Trustee", photo: "" },
  { name: "Dr. Kasu Prasad Reddy", position: "Donors Cum Trustee", photo: "" },
  { name: "Kohli T.S.", position: "Donors Cum Trustee", photo: "" },
  { name: "Malla Reddy C.", position: "Donors Cum Trustee", photo: "" },
  { name: "Manjeet Singh Gandhi", position: "Donors Cum Trustee", photo: "" },
  { name: "Man Mohan Kanodia", position: "Donors Cum Trustee", photo: "" },
  { name: "Dr. Mohana Vamsy Ch.", position: "Donors Cum Trustee", photo: "" },
  { name: "Murti TVR", position: "Donors Cum Trustee", photo: "" },
  { name: "Narang V. S.", position: "Donors Cum Trustee", photo: "" },
  { name: "Narender Gauri", position: "Donors Cum Trustee", photo: "" },
  { name: "Dr. Narsaiah B.", position: "Donors Cum Trustee", photo: "" },
  { name: "Pradeep Ramrakhyani", position: "Donors Cum Trustee", photo: "" },
  { name: "Rajanarender B.", position: "Donors Cum Trustee", photo: "" },
  { name: "Rajesh Malik", position: "Donors Cum Trustee", photo: "" },
  { name: "Rajendra Prasad V.", position: "Donors Cum Trustee", photo: "" },
  { name: "Ramesh Malani", position: "Donors Cum Trustee", photo: "" },
  { name: "Ramesh P. R.", position: "Donors Cum Trustee", photo: "" },
  { name: "Ranjan Sood", position: "Donors Cum Trustee", photo: "" },
  { name: "Dr. Rao T. B.", position: "Donors Cum Trustee", photo: "" },
  { name: "Smt. Ratna Rao", position: "Donors Cum Trustee", photo: "" },
  { name: "Sanjay Dugar", position: "Donors Cum Trustee", photo: "" },
  { name: "Shyam Chandak", position: "Donors Cum Trustee", photo: "" },
  { name: "Sirish B. N.", position: "Donors Cum Trustee", photo: "" },
  { name: "Sivaprasad Reddy R.", position: "Donors Cum Trustee", photo: "" },
  { name: "Dr. Somaraju B.", position: "Donors Cum Trustee", photo: "" },
  { name: "Sunil Talwar", position: "Donors Cum Trustee", photo: "" },
  { name: "Surender Pal Singh Saluja", position: "Donors Cum Trustee", photo: "" },
  { name: "Agarwal Samaj, Balkampet", position: "Major Donors", photo: "" },
  { name: "Seshamamba Foundation", position: "Major Donors", photo: "" },
  { name: "Dr. G. Padma", position: "Major Donors", photo: "" },
  { name: "Ashitosh Modi", position: "Donors (Above INR 1 lakh)", photo: "" },
  { name: "Gautam Chand Jain", position: "Donors (Above INR 1 lakh)", photo: "" },
  { name: "Gerard Carr", position: "Donors (Above INR 1 lakh)", photo: "" },
  { name: "Govind Gupta", position: "Donors (Above INR 1 lakh)", photo: "" },
  { name: "Pradarsh Katyal", position: "Donors (Above INR 1 lakh)", photo: "" },
  { name: "Rajesh Khanna", position: "Donors (Above INR 1 lakh)", photo: "" },
  { name: "Ranbir Singh Gandhi", position: "Donors (Above INR 1 lakh)", photo: "" },
  { name: "Dr. Surender L. R", position: "Donors (Above INR 1 lakh)", photo: "" },
  { name: "Viram Reddy K.", position: "Donors (Above INR 1 lakh)", photo: "" },

];

const OfficeBearers: TrusteeProps[] = [
  { name: "Surender Pal Singh Saluja", position: "President", photo: "" },
  { name: "Sanjay Dugar", position: "Vice President", photo: "" },
  { name: "Jayant Jain", position: "Vice President", photo: "" },
  { name: "T. B. Rao", position: "Vice President", photo: "" },
  { name: "Ranjan Sood", position: "General Secretary", photo: "" },
  { name: "Ramesh Chand Malani", position: "Treasurer", photo: "" },
  { name: "Dayanand Gauri", position: "Founder Trustee Cum Settler", photo: "" },
  { name: "Amarnath V", position: "Committee Member", photo: "" },
  { name: "Anil Dondoo", position: "Committee Member", photo: "" },
  { name: "Ashok Kapoor", position: "Committee Member", photo: "" },
  { name: "B. N. Sirish", position: "Committee Member", photo: "" },
  { name: "Manjeet Singh Gandhi", position: "Committee Member", photo: "" },
  { name: "Narender Gauri", position: "Committee Member", photo: "" },
  { name: "Ram Goyal", position: "Committee Member", photo: "" },
  { name: "Shiv Prasad", position: "Committee Member", photo: "" },
  { name: "District Collector, Hyderabad", position: "Ex-Officio Chairman", photo: "" },
  { name: "K. Amarender Rao", position: "Ex-Officio Member", photo: "" },
  { name: "Padam Jain", position: "Ex-Officio Member", photo: "" },
  { name: "Pramod Kumar Rumta", position: "Ex-Officio Member", photo: "" },
  { name: "Praveen Jain", position: "Ex-Officio Member", photo: "" },
  { name: "Ranbir Singh Gandhi", position: "Ex-Officio Member", photo: "" },
  { name: "Rajendra Agarwal", position: "Ex-Officio Member", photo: "" },
  { name: "Ravinder Reddy", position: "Ex-Officio Member", photo: "" }, 
  { name: "Guda Krishna Prasad", position: "Patron", photo: "" }, 
];

export default function AboutPage() {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  
  const [missionRef, missionInView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
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

  // Table rendering function for trustees and office bearers
  const renderTable = (data: TrusteeProps[], title: string) => (
    <div className="overflow-x-auto mt-8 rounded-xl border border-gray-200 dark:border-gray-700 shadow-md">
      <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
        <thead className="bg-gray-50 dark:bg-gray-800">
          <tr>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              Name
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              Position
            </th>
          </tr>
        </thead>
        <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
          {data.map((person, index) => (
            <tr key={index} className="hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                {person.name}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                {person.position}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  return (
    <PageTransition>
      {/* Page Header */}
      <PageHeader
        title="About Swarg Vatika"
        description="Discover our vision, mission, and the team behind Hyderabad's first eco-friendly crematorium."
        backgroundImage= 'BackImg'
      />

      {/* Main Content */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <ScrollReveal>
              <SectionHeading
                subtitle="Our Story"
                title="A Vision of Harmony and Respect"
                align="left"
              />
              <div className="space-y-4 text-muted-foreground">
                <p>
                  Swargvatika was established with a vision to transform the traditional cremation practices and provide an environmentally responsible alternative that honors both the departed and our planet.
                </p>
                <p>
                  Founded in 2018, we began as a small initiative by environmentally conscious citizens who recognized the need for sustainable end-of-life services. Over the years, we have grown to become Hyderabad's leading eco-friendly crematorium, serving thousands of families with dignity and compassion.
                </p>
                <p>
                  Our facility combines ancient traditions with modern technology, offering various cremation options that significantly reduce wood consumption and air pollution.
                </p>
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
                      src= "/assets/1.jpg" 
                      alt="Swargvatika Crematorium" 
                      className="rounded-xl w-full h-[400px] object-cover"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = BackImg;
                      }}
                    />
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* Vision & Mission Section */}
      <section 
        ref={missionRef}
        className="py-16 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 overflow-hidden"
      >
        <div className="container mx-auto px-4">
          <SectionHeading
            subtitle="Vision & Mission"
            title="Our Guiding Principles"
            description="We are driven by a clear vision and mission that guides everything we do at Swargvatika."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
            <ScrollReveal delay={0.1} className={cn(
              "bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg border border-gray-100 dark:border-gray-700",
              "hover:shadow-xl transition-all duration-300 h-full card-3d"
            )}>
              <div className="card-3d-content">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center mr-4">
                    <Target className="h-6 w-6" />
                  </div>
                  <h3 className="font-serif text-2xl font-bold">Our Vision</h3>
                </div>
                <div className="card-3d-layer space-y-4 text-muted-foreground">
                  <p>
                    To create a world where end-of-life practices harmoniously blend tradition, dignity, and environmental sustainability.
                  </p>
                  <p>
                    We envision a future where cremations no longer contribute to deforestation and air pollution, and where every family can bid farewell to their loved ones in a meaningful, respectful, and environmentally responsible manner.
                  </p>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.3} className={cn(
              "bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg border border-gray-100 dark:border-gray-700",
              "hover:shadow-xl transition-all duration-300 h-full card-3d"
            )}>
              <div className="card-3d-content">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center mr-4">
                    <Award className="h-6 w-6" />
                  </div>
                  <h3 className="font-serif text-2xl font-bold">Our Mission</h3>
                </div>
                <div className="card-3d-layer space-y-4 text-muted-foreground">
                  <p>
                    To provide eco-friendly and dignified cremation services that respect both cultural traditions and environmental concerns.
                  </p>
                  <p>
                    We are committed to:
                  </p>
                  <ul className="list-disc list-inside space-y-2">
                    <li>Reducing the carbon footprint of cremation practices</li>
                    <li>Preserving forests by minimizing wood consumption</li>
                    <li>Ensuring affordability and accessibility for all sections of society</li>
                    <li>Educating communities about sustainable end-of-life options</li>
                    <li>Supporting families with compassionate service during difficult times</li>
                  </ul>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Team Section - Trustees */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <SectionHeading
            subtitle="Our Leadership"
            title="Board of Trustees"
            description="Meet the dedicated individuals who guide our vision and oversee our operations."
          />

          {renderTable(Trustees, "Trustees")}
        </div>
      </section>

      {/* Team Section - Office Bearers */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <SectionHeading
            subtitle="Management Team"
            title="Office Bearers"
            description="Our day-to-day operations are managed by experienced professionals committed to our mission."
          />

          {renderTable(OfficeBearers, "Office Bearers")}
        </div>
      </section>
    </PageTransition>
  );
}