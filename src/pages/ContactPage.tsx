
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PageTransition from '@/components/layout/PageTransition';
import PageHeader from '@/components/ui/PageHeader';
import SectionHeading from '@/components/ui/SectionHeading';
import ScrollReveal from '@/components/ui/ScrollReveal';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import { MapPin, Phone, Mail, Clock, Facebook, Twitter, Instagram } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function ContactPage() {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Handle form input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // In a real application, you would send the form data to a server
    // For demo purposes, we'll simulate a successful submission after a delay
    setTimeout(() => {
      toast({
        title: "Message Sent",
        description: "Thank you for your message. We will get back to you shortly.",
      });
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      });
      
      setIsSubmitting(false);
    }, 1500);
  };

  // Contact info items
  const contactInfo = [
    {
      icon: <MapPin className="h-6 w-6" />,
      title: "Our Location",
      content: "123 Eco Gardens, Near Green Park, Hyderabad, Telangana, India - 500001"
    },
    {
      icon: <Phone className="h-6 w-6" />,
      title: "Phone Numbers",
      content: (
        <>
          <a href="tel:+919876543210" className="hover:text-primary transition-colors">+91 9876 543 210</a>
          <br />
          <a href="tel:+919876543211" className="hover:text-primary transition-colors">+91 9876 543 211 (Emergency)</a>
        </>
      )
    },
    {
      icon: <Mail className="h-6 w-6" />,
      title: "Email Address",
      content: (
        <a href="mailto:info@swargvatika.org" className="hover:text-primary transition-colors">
          info@swargvatika.org
        </a>
      )
    },
    {
      icon: <Clock className="h-6 w-6" />,
      title: "Working Hours",
      content: "Open 24 hours, 7 days a week"
    }
  ];

  return (
    <PageTransition>
      {/* Page Header */}
      <PageHeader
        title="Contact Us"
        description="Reach out to us for inquiries, information, or assistance with our services."
        backgroundImage="https://images.unsplash.com/photo-1423666639041-f56000c27a9a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1174&q=80"
      />

      {/* Main Content */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Contact Form */}
            <ScrollReveal>
              <SectionHeading
                subtitle="Get in Touch"
                title="Send Us a Message"
                description="Fill out the form below, and our team will get back to you as soon as possible."
                align="left"
              />

              <form onSubmit={handleSubmit} className="mt-8 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium">Full Name</label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Enter your full name"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium">Email Address</label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="Enter your email address"
                      required
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="phone" className="text-sm font-medium">Phone Number</label>
                    <Input
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="Enter your phone number"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="subject" className="text-sm font-medium">Subject</label>
                    <Input
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      placeholder="What is this regarding?"
                      required
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-medium">Message</label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Please type your message here..."
                    rows={6}
                    required
                  />
                </div>
                
                <Button 
                  type="submit" 
                  className="shimmer-button bg-primary hover:bg-primary/90 w-full sm:w-auto"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <div className="flex items-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Sending...
                    </div>
                  ) : "Send Message"}
                </Button>
              </form>
            </ScrollReveal>

            {/* Contact Information */}
            <ScrollReveal direction="right">
              <div className="space-y-8">
                <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-8 shadow-md border border-gray-100 dark:border-gray-700">
                  <h3 className="font-serif text-2xl font-bold mb-6">Contact Information</h3>
                  
                  <div className="space-y-6">
                    {contactInfo.map((item, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-start"
                      >
                        <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center mr-4 shrink-0">
                          {item.icon}
                        </div>
                        <div>
                          <h4 className="font-medium text-lg mb-1">{item.title}</h4>
                          <div className="text-muted-foreground">{item.content}</div>
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
                    <h4 className="font-medium text-lg mb-4">Follow Us</h4>
                    <div className="flex space-x-4">
                      <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-primary/10 text-primary hover:bg-primary hover:text-white flex items-center justify-center transition-colors">
                        <Facebook className="h-5 w-5" />
                      </a>
                      <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-primary/10 text-primary hover:bg-primary hover:text-white flex items-center justify-center transition-colors">
                        <Twitter className="h-5 w-5" />
                      </a>
                      <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-primary/10 text-primary hover:bg-primary hover:text-white flex items-center justify-center transition-colors">
                        <Instagram className="h-5 w-5" />
                      </a>
                    </div>
                  </div>
                </div>

                <div className="rounded-xl overflow-hidden shadow-md border border-gray-100 dark:border-gray-700">
                  <iframe
                    title="Swargvatika Location"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d243647.31087540482!2d78.24323111885973!3d17.412608376148643!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb99daeaebd2c7%3A0xae93b78392bafbc2!2sHyderabad%2C%20Telangana%2C%20India!5e0!3m2!1sen!2sus!4v1650450458232!5m2!1sen!2sus"
                    width="100%"
                    height="250"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  ></iframe>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <SectionHeading
            subtitle="Common Questions"
            title="Frequently Asked Questions"
            description="Find answers to commonly asked questions about our services and facilities."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
            {[
              {
                question: "What are the operating hours of Swargvatika?",
                answer: "Swargvatika is open 24 hours a day, 7 days a week to serve the community in times of need. Our administrative office operates from 9:00 AM to 6:00 PM, Monday through Saturday."
              },
              {
                question: "How do I book a cremation service?",
                answer: "You can book a cremation service by calling our helpline at +91 9876 543 210, visiting our facility in person, or completing the service booking form on our website."
              },
              {
                question: "What eco-friendly options are available for cremation?",
                answer: "We offer several eco-friendly options including Gau Kashth (cow dung cakes), LPG/CNG cremation, and Bio-gas/Gassifier cremation, all of which significantly reduce environmental impact compared to traditional methods."
              },
              {
                question: "Is there parking available at the facility?",
                answer: "Yes, we have ample parking space available at our facility for visitors attending cremation ceremonies."
              },
              {
                question: "Can you arrange for transportation of the deceased?",
                answer: "Yes, we provide Last Journey Vehicle services for transporting the deceased from anywhere within Hyderabad to our facility. This can be arranged by contacting our helpline."
              },
              {
                question: "Are there concessions available for economically disadvantaged families?",
                answer: "Yes, we offer special concessions for economically backward families. These are provided on a case-by-case basis following verification. Please contact our administration for more details."
              },
            ].map((faq, index) => (
              <ScrollReveal key={index} delay={index * 0.1}>
                <div className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-md border border-gray-100 dark:border-gray-700">
                  <h4 className="font-serif text-lg font-bold mb-3">{faq.question}</h4>
                  <p className="text-muted-foreground">{faq.answer}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Emergency Contact */}
      <section className="py-12 bg-primary text-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="mb-6 md:mb-0">
              <h3 className="font-serif text-2xl font-bold">Need Immediate Assistance?</h3>
              <p className="mt-2 text-white/80">Our emergency helpline is available 24/7.</p>
            </div>
            <a 
              href="tel:+919876543211" 
              className="px-6 py-3 bg-white text-primary font-medium rounded-lg hover:bg-opacity-90 transition-colors shimmer-button"
            >
              <Phone className="inline-block mr-2 h-5 w-5" />
              Call Emergency Helpline
            </a>
          </div>
        </div>
      </section>
    </PageTransition>
  );
}
