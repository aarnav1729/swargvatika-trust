
import { useState } from 'react';
import { motion } from 'framer-motion';
import PageTransition from '@/components/layout/PageTransition';
import PageHeader from '@/components/ui/PageHeader';
import SectionHeading from '@/components/ui/SectionHeading';
import ScrollReveal from '@/components/ui/ScrollReveal';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calendar, Clock, ExternalLink, FileText, Globe, Video } from 'lucide-react';
import { cn } from '@/lib/utils';
import imgg from '@/assets/11.jpg';
import img12 from '@/assets/12.jpg';
import img13 from '@/assets/13.jpg';
import img14 from '@/assets/14.jpg';
import img15 from '@/assets/15.jpg';
import img16 from '@/assets/16.jpg';
import img17 from '@/assets/17.jpg';
import img18 from '@/assets/18.jpg';
import img19 from '@/assets/19.jpg';
import img20 from '@/assets/20.jpg';

// Interface for news article
interface NewsArticle {
  id: string;
  title: string;
  date: string;
  source: string;
  excerpt: string;
  link: string;
  image: string;
}

// Interface for video
interface VideoItem {
  id: string;
  title: string;
  date: string;
  duration: string;
  thumbnail: string;
  youtubeId: string;
}

// Interface for publication
interface Publication {
  id: string;
  title: string;
  type: string;
  date: string;
  authors: string;
  link: string;
  image: string;
}

// Sample news articles
const newsArticles: NewsArticle[] = [
  {
    id: 'news-1',
    title: 'Swargvatika Inaugurates Hyderabad\'s First Eco-Friendly Crematorium',
    date: '2023-01-15',
    source: 'The Hindu',
    excerpt: 'Swargvatika, the city\'s first eco-friendly crematorium, was inaugurated yesterday by the Municipal Commissioner...',
    link: 'https://example.com/news1',
    image: img19,
  },
  {
    id: 'news-2',
    title: 'How Swargvatika is Revolutionizing Cremation Practices',
    date: '2023-02-28',
    source: 'Times of India',
    excerpt: 'The innovative approaches at Swargvatika are setting new standards for environmentally conscious final rites...',
    link: 'https://example.com/news2',
    image: img20,
  },
  {
    id: 'news-3',
    title: 'Green Practices Reduce Carbon Footprint at Swargvatika',
    date: '2023-04-10',
    source: 'Deccan Chronicle',
    excerpt: 'A recent environmental audit has shown that Swargvatika\'s eco-friendly practices have reduced carbon emissions by 75%...',
    link: 'https://example.com/news3',
    image: img13,
  },
  {
    id: 'news-4',
    title: 'Swargvatika Wins Environmental Excellence Award',
    date: '2023-05-22',
    source: 'Environmental Today',
    excerpt: 'In recognition of its innovative eco-friendly practices, Swargvatika has been awarded the Environmental Excellence Award...',
    link: 'https://example.com/news4',
    image: img14,
  },
];

// Sample videos
const videos: VideoItem[] = [
  {
    id: 'video-1',
    title: 'Swargvatika: A Tour of Our Eco-Friendly Facilities',
    date: '2023-03-15',
    duration: '5:27',
    thumbnail: img15,
    youtubeId: 'dQw4w9WgXcQ', // This is a placeholder ID
  },
  {
    id: 'video-2',
    title: 'The Environmental Impact of Traditional vs. Eco-Friendly Cremation',
    date: '2023-04-02',
    duration: '8:15',
    thumbnail: img16,
    youtubeId: 'dQw4w9WgXcQ', // This is a placeholder ID
  },
  {
    id: 'video-3',
    title: 'Interview with Dr. Sharma: The Vision Behind Swargvatika',
    date: '2023-02-18',
    duration: '12:36',
    thumbnail: img17,
    youtubeId: 'dQw4w9WgXcQ', // This is a placeholder ID
  },
];

// Sample publications
const publications: Publication[] = [
  {
    id: 'pub-1',
    title: 'Eco-Friendly Cremation Practices in Urban India: A Case Study of Swargvatika',
    type: 'Research Paper',
    date: '2023-01',
    authors: 'Dr. A. Kumar, Dr. B. Singh',
    link: 'https://example.com/paper1',
    image: img18,
  },
  {
    id: 'pub-2',
    title: 'Reducing Carbon Footprint through Alternative Cremation Methods',
    type: 'White Paper',
    date: '2022-11',
    authors: 'Swargvatika Environmental Research Team',
    link: 'https://example.com/paper2',
    image: img17,
  },
  {
    id: 'pub-3',
    title: 'Annual Environmental Impact Report: Swargvatika 2022',
    type: 'Report',
    date: '2023-02',
    authors: 'Swargvatika Sustainability Office',
    link: 'https://example.com/report1',
    image: img16,
  },
];

export default function MediaPage() {
  const [activeVideo, setActiveVideo] = useState<VideoItem | null>(null);

  // Function to open YouTube video in modal
  const openVideo = (video: VideoItem) => {
    setActiveVideo(video);
    // In a real implementation, you would open a modal to show the video
    window.open(`https://www.youtube.com/watch?v=${video.youtubeId}`, '_blank');
  };

  return (
    <PageTransition>
      {/* Page Header */}
      <PageHeader
        title="Media & News"
        description="Stay updated with the latest news, videos, and publications about Swargvatika and our initiatives."
        backgroundImage="https://images.unsplash.com/photo-1557005450-2a1cca9a2203?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
      />

      {/* Main Content - Tabs */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <Tabs defaultValue="news" className="w-full">
            <div className="flex justify-center mb-8">
              <TabsList className="grid grid-cols-3 w-full max-w-md">
                <TabsTrigger value="news">News</TabsTrigger>
                <TabsTrigger value="videos">Videos</TabsTrigger>
                <TabsTrigger value="publications">Publications</TabsTrigger>
              </TabsList>
            </div>

            {/* News Tab */}
            <TabsContent value="news">
              <SectionHeading
                subtitle="Press Coverage"
                title="Swargvatika in the News"
                description="Browse the latest news articles and press coverage about our eco-friendly crematorium."
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
                {newsArticles.map((article, index) => (
                  <ScrollReveal key={article.id} delay={index * 0.1}>
                    <motion.div 
                      whileHover={{ y: -5 }}
                      className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-md border border-gray-100 dark:border-gray-700 h-full flex flex-col"
                    >
                      <div className="relative h-48 overflow-hidden">
                        <img 
                          src={article.image} 
                          alt={article.title}
                          className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                        />
                      </div>
                      <div className="p-6 flex-grow">
                        <div className="flex items-center mb-3 text-sm text-muted-foreground">
                          <Calendar className="h-4 w-4 mr-2" />
                          <span>{new Date(article.date).toLocaleDateString('en-US', { 
                            year: 'numeric', 
                            month: 'short', 
                            day: 'numeric' 
                          })}</span>
                          <span className="mx-2">•</span>
                          <span>{article.source}</span>
                        </div>
                        <h3 className="font-serif text-xl font-bold mb-3">{article.title}</h3>
                        <p className="text-muted-foreground mb-4">{article.excerpt}</p>
                        <a 
                          href={article.link} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="inline-flex items-center text-primary hover:text-primary/80 mt-auto font-medium transition-colors"
                        >
                          Read Full Article
                          <ExternalLink className="ml-2 h-4 w-4" />
                        </a>
                      </div>
                    </motion.div>
                  </ScrollReveal>
                ))}
              </div>
            </TabsContent>

            {/* Videos Tab */}
            <TabsContent value="videos">
              <SectionHeading
                subtitle="Visual Media"
                title="Swargvatika Videos"
                description="Watch our informative videos about eco-friendly cremation practices and our facilities."
              />

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
                {videos.map((video, index) => (
                  <ScrollReveal key={video.id} delay={index * 0.1}>
                    <motion.div 
                      whileHover={{ y: -5 }}
                      className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-md border border-gray-100 dark:border-gray-700 h-full flex flex-col"
                    >
                      <div 
                        className="relative h-48 overflow-hidden cursor-pointer"
                        onClick={() => openVideo(video)}
                      >
                        <img 
                          src={video.thumbnail} 
                          alt={video.title}
                          className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                          <div className="w-16 h-16 rounded-full bg-primary/90 flex items-center justify-center">
                            <Video className="h-6 w-6 text-white" />
                          </div>
                        </div>
                      </div>
                      <div className="p-6 flex-grow">
                        <div className="flex items-center mb-3 text-sm text-muted-foreground">
                          <Calendar className="h-4 w-4 mr-2" />
                          <span>{new Date(video.date).toLocaleDateString('en-US', { 
                            year: 'numeric', 
                            month: 'short', 
                            day: 'numeric' 
                          })}</span>
                          <span className="mx-2">•</span>
                          <Clock className="h-4 w-4 mr-2" />
                          <span>{video.duration}</span>
                        </div>
                        <h3 className="font-serif text-xl font-bold mb-3">{video.title}</h3>
                        <Button 
                          onClick={() => openVideo(video)}
                          className="mt-4 w-full"
                        >
                          Watch Video
                        </Button>
                      </div>
                    </motion.div>
                  </ScrollReveal>
                ))}
              </div>
            </TabsContent>

            {/* Publications Tab */}
            <TabsContent value="publications">
              <SectionHeading
                subtitle="Research & Reports"
                title="Publications & Documents"
                description="Access our research papers, reports, and other publications related to eco-friendly cremation practices."
              />

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
                {publications.map((publication, index) => (
                  <ScrollReveal key={publication.id} delay={index * 0.1}>
                    <motion.div 
                      whileHover={{ y: -5 }}
                      className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-md border border-gray-100 dark:border-gray-700 h-full flex flex-col"
                    >
                      <div className="p-6 flex-grow">
                        <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center mb-4">
                          <FileText className="h-6 w-6" />
                        </div>
                        <div className="flex items-center mb-3 text-sm text-muted-foreground">
                          <span className="bg-primary/10 text-primary text-xs px-2 py-1 rounded-full">
                            {publication.type}
                          </span>
                          <span className="mx-2">•</span>
                          <Calendar className="h-4 w-4 mr-1" />
                          <span>{publication.date}</span>
                        </div>
                        <h3 className="font-serif text-xl font-bold mb-3">{publication.title}</h3>
                        <p className="text-muted-foreground mb-4">
                          <span className="font-medium">Authors:</span> {publication.authors}
                        </p>
                        <a 
                          href={publication.link} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="inline-flex items-center text-primary hover:text-primary/80 mt-auto font-medium transition-colors"
                        >
                          Download Publication
                          <ExternalLink className="ml-2 h-4 w-4" />
                        </a>
                      </div>
                    </motion.div>
                  </ScrollReveal>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="py-16 bg-gradient-to-r from-primary/10 to-secondary/10 dark:from-primary/5 dark:to-secondary/5">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <ScrollReveal>
              <h2 className="font-serif text-3xl font-bold mb-4">Stay Updated</h2>
              <p className="text-muted-foreground mb-8">
                Subscribe to our newsletter to receive the latest news, event announcements, and updates from Swargvatika directly in your inbox.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Your email address"
                  className="px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 flex-grow focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <Button className="shimmer-button bg-primary hover:bg-primary/90">
                  Subscribe
                </Button>
              </div>
              <p className="text-xs text-muted-foreground mt-4">
                By subscribing, you agree to our Privacy Policy. You can unsubscribe at any time.
              </p>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Press Contact */}
      <section className="py-16 bg-white dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <ScrollReveal>
              <div className="w-16 h-16 rounded-full bg-primary/10 text-primary flex items-center justify-center mx-auto mb-6">
                <Globe className="h-8 w-8" />
              </div>
              <h2 className="font-serif text-3xl font-bold mb-4">Media Inquiries</h2>
              <p className="text-muted-foreground mb-8">
                For press inquiries, interview requests, or media information, please contact our communications team.
              </p>
              <div className="space-y-2">
                <p><span className="font-medium">Email:</span> media@swargvatika.org</p>
                <p><span className="font-medium">Phone:</span> +91 9876 543 212</p>
                <p><span className="font-medium">Press Kit:</span> <a href="#" className="text-primary hover:underline">Download Press Kit</a></p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>
    </PageTransition>
  );
}
