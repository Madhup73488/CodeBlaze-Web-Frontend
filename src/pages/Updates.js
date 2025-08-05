import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import {
  Play,
  Calendar,
  Clock,
  Eye,
  ThumbsUp,
  Share2,
  Filter,
  Search,
  Video,
  FileText,
  Megaphone,
  Award,
  Users,
  TrendingUp,
  ExternalLink,
  Loader,
  AlertCircle,
  CheckCircle
} from "lucide-react";
import updatesApi from "../services/updatesApi";
import { useAuth } from "../contexts/AuthContext";

const Updates = () => {
  const [activeFilter, setActiveFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [updates, setUpdates] = useState([]);
  const [featuredUpdates, setFeaturedUpdates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [readStatus, setReadStatus] = useState({});
  const [subscribing, setSubscribing] = useState(false);
  const [subscriptionMessage, setSubscriptionMessage] = useState("");
  const { isAuthenticated } = useAuth();

  // Fallback static data for development
  const staticUpdates = [
    {
      id: 1,
      type: "vlog",
      title: "Behind the Scenes: AI Research Lab Tour",
      description: "Take an exclusive look inside our cutting-edge AI research facility where innovation meets reality. See how our team is pushing the boundaries of artificial intelligence.",
      thumbnail: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?q=80&w=2070&auto=format&fit=crop",
      videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      duration: "12:45",
      views: "15.2K",
      likes: "892",
      publishedAt: "2025-01-03",
      category: "Research",
      featured: true
    },
    {
      id: 2,
      type: "announcement",
      title: "New Partnership with Google Cloud",
      description: "We're excited to announce our strategic partnership with Google Cloud to provide enhanced learning experiences and cloud infrastructure for our students.",
      thumbnail: "https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?q=80&w=2069&auto=format&fit=crop",
      publishedAt: "2025-01-02",
      category: "Partnership",
      featured: false
    },
    {
      id: 3,
      type: "vlog",
      title: "Student Success Stories: From Zero to Hero",
      description: "Meet our amazing students who transformed their careers through our programs. Hear their inspiring journeys and career transformations.",
      thumbnail: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2071&auto=format&fit=crop",
      videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      duration: "18:30",
      views: "23.7K",
      likes: "1.2K",
      publishedAt: "2025-01-01",
      category: "Success Stories",
      featured: true
    },
    {
      id: 4,
      type: "blog",
      title: "The Future of Machine Learning in 2025",
      description: "Explore the latest trends and predictions in machine learning technology. Our experts share insights on what to expect in the coming year.",
      thumbnail: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?q=80&w=2070&auto=format&fit=crop",
      readTime: "8 min read",
      publishedAt: "2024-12-30",
      category: "Technology",
      featured: false
    },
    {
      id: 5,
      type: "vlog",
      title: "Day in the Life: Syntellite Labs Instructor",
      description: "Follow one of our senior instructors through a typical day of teaching, mentoring, and developing cutting-edge curriculum.",
      thumbnail: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=2070&auto=format&fit=crop",
      videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      duration: "15:22",
      views: "8.9K",
      likes: "567",
      publishedAt: "2024-12-28",
      category: "Behind the Scenes",
      featured: false
    },
    {
      id: 6,
      type: "announcement",
      title: "New Campus Opening in Bangalore",
      description: "We're expanding! Our new state-of-the-art campus in Bangalore will feature advanced labs, collaborative spaces, and cutting-edge technology.",
      thumbnail: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop",
      publishedAt: "2024-12-25",
      category: "Expansion",
      featured: true
    }
  ];

  // Dynamic categories based on actual data
  const [categories, setCategories] = useState(["all"]);

  // Load updates from API or use static data as fallback
  useEffect(() => {
    const loadUpdates = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Try to fetch from API
        const response = await updatesApi.getAllUpdates();
        console.log('API Response:', response); // Debug log
        
        // Handle the correct response structure
        let apiUpdates = [];
        if (response.success && response.data && response.data.updates) {
          apiUpdates = response.data.updates;
        } else if (response.updates) {
          apiUpdates = response.updates;
        } else if (Array.isArray(response.data)) {
          apiUpdates = response.data;
        } else if (Array.isArray(response)) {
          apiUpdates = response;
        }
        
        console.log('Processed API Updates:', apiUpdates); // Debug log
        
        if (apiUpdates.length > 0) {
          setUpdates(apiUpdates);
          setFeaturedUpdates(apiUpdates.filter(update => update.featured));
          
          // Extract unique categories from API data
          const uniqueCategories = [...new Set(apiUpdates.map(update => update.category))];
          setCategories(["all", ...uniqueCategories]);
        } else {
          // Fallback to static data
          console.log('No API updates found, using static data');
          setUpdates(staticUpdates);
          setFeaturedUpdates(staticUpdates.filter(update => update.featured));
          
          // Extract unique categories from static data
          const uniqueCategories = [...new Set(staticUpdates.map(update => update.category))];
          setCategories(["all", ...uniqueCategories]);
        }
        
        // Load read status for authenticated users
        if (isAuthenticated) {
          try {
            const readStatusResponse = await updatesApi.getUserReadStatus();
            setReadStatus(readStatusResponse.readStatus || {});
          } catch (readError) {
            console.log('Could not load read status:', readError);
          }
        }
      } catch (error) {
        console.log('API not available, using static data:', error);
        // Fallback to static data
        setUpdates(staticUpdates);
        setFeaturedUpdates(staticUpdates.filter(update => update.featured));
        
        // Extract unique categories from static data
        const uniqueCategories = [...new Set(staticUpdates.map(update => update.category))];
        setCategories(["all", ...uniqueCategories]);
      } finally {
        setLoading(false);
      }
    };

    loadUpdates();
  }, [isAuthenticated]);

  // Handle newsletter subscription
  const handleSubscription = async (email) => {
    if (!email) return;
    
    try {
      setSubscribing(true);
      await updatesApi.subscribeToNewsletter(email);
      setSubscriptionMessage("Successfully subscribed to updates!");
    } catch (error) {
      setSubscriptionMessage("Subscription failed. Please try again.");
    } finally {
      setSubscribing(false);
    }
  };

  // Handle marking update as read
  const handleMarkAsRead = async (updateId) => {
    if (!isAuthenticated) return;
    
    try {
      await updatesApi.markAsRead(updateId);
      setReadStatus(prev => ({ ...prev, [updateId]: true }));
    } catch (error) {
      console.error('Failed to mark as read:', error);
    }
  };

  const filteredUpdates = updates.filter(update => {
    const matchesFilter = activeFilter === "all" || update.category === activeFilter;
    const matchesSearch = update.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         update.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const getTypeIcon = (type) => {
    switch (type) {
      case "vlog":
        return <Video className="w-4 h-4" />;
      case "blog":
        return <FileText className="w-4 h-4" />;
      case "announcement":
        return <Megaphone className="w-4 h-4" />;
      default:
        return <FileText className="w-4 h-4" />;
    }
  };

  const getTypeColor = (type) => {
    switch (type) {
      case "vlog":
        return "bg-red-100 text-red-700";
      case "blog":
        return "bg-blue-100 text-blue-700";
      case "announcement":
        return "bg-green-100 text-green-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <Helmet>
        <title>Updates - Syntellite Labs</title>
        <meta
          name="description"
          content="Stay updated with the latest news, vlogs, and announcements from Syntellite Labs. Discover our research breakthroughs, student success stories, and company updates."
        />
      </Helmet>

      {/* Hero Section */}
      <section className="pt-24 pb-16 px-6">
        <div className="container mx-auto max-w-7xl">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="text-center mb-16"
          >
            <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 rounded-full mb-6">
              <TrendingUp className="w-4 h-4 text-blue-600" />
              <span className="text-sm font-medium text-blue-700">Latest Updates</span>
            </motion.div>

            <motion.h1 variants={itemVariants} className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Stay Updated with{" "}
              <span className="text-blue-500">Syntellite Labs</span>
            </motion.h1>

            <motion.p variants={itemVariants} className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Discover the latest news, research breakthroughs, student success stories, and behind-the-scenes content from our innovation labs.
            </motion.p>
          </motion.div>

          {/* Search and Filter */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col md:flex-row gap-4 mb-12"
          >
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search updates..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            
            <div className="flex gap-2 overflow-x-auto pb-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveFilter(category)}
                  className={`px-4 py-2 rounded-lg whitespace-nowrap transition-all duration-200 ${
                    activeFilter === category
                      ? "bg-blue-600 text-white"
                      : "bg-white text-gray-600 hover:bg-gray-50 border border-gray-200"
                  }`}
                >
                  {category === "all" ? "All Updates" : category}
                </button>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured Updates */}
      {featuredUpdates.length > 0 && (
        <section className="pb-16 px-6">
          <div className="container mx-auto max-w-7xl">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={containerVariants}
            >
              <motion.h2 variants={itemVariants} className="text-3xl font-bold text-gray-900 mb-8 flex items-center gap-2">
                <Award className="w-8 h-8 text-yellow-500" />
                Featured Updates
              </motion.h2>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {featuredUpdates.map((update) => (
                  <motion.div
                    key={update.id}
                    variants={itemVariants}
                    whileHover={{ y: -8 }}
                    className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300"
                  >
                    <div className="relative">
                      <img
                        src={update.thumbnail}
                        alt={update.title}
                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      {update.type === "vlog" && (
                        <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <Play className="w-12 h-12 text-white" />
                        </div>
                      )}
                      <div className="absolute top-4 left-4">
                        <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${getTypeColor(update.type)}`}>
                          {getTypeIcon(update.type)}
                          {update.type.charAt(0).toUpperCase() + update.type.slice(1)}
                        </span>
                      </div>
                      {update.duration && (
                        <div className="absolute bottom-4 right-4 bg-black bg-opacity-70 text-white px-2 py-1 rounded text-xs">
                          {update.duration}
                        </div>
                      )}
                    </div>

                    <div className="p-6">
                      <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                        {update.title}
                      </h3>
                      <p className="text-gray-600 mb-4 line-clamp-2">
                        {update.description}
                      </p>

                      <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4" />
                          {formatDate(update.published_at || update.publishedAt)}
                        </div>
                        {update.views && (
                          <div className="flex items-center gap-4">
                            <div className="flex items-center gap-1">
                              <Eye className="w-4 h-4" />
                              {update.views}
                            </div>
                            <div className="flex items-center gap-1">
                              <ThumbsUp className="w-4 h-4" />
                              {update.likes}
                            </div>
                          </div>
                        )}
                      </div>

                      <div className="flex items-center justify-between">
                        <span className="text-xs font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded">
                          {update.category}
                        </span>
                        <button className="flex items-center gap-1 text-blue-600 hover:text-blue-700 transition-colors">
                          <span className="text-sm font-medium">
                            {update.type === "vlog" ? "Watch" : "Read"}
                          </span>
                          <ExternalLink className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* All Updates */}
      <section className="pb-16 px-6">
        <div className="container mx-auto max-w-7xl">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
          >
            <motion.h2 variants={itemVariants} className="text-3xl font-bold text-gray-900 mb-8">
              All Updates ({filteredUpdates.length})
            </motion.h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredUpdates.map((update) => (
                <motion.div
                  key={update.id}
                  variants={itemVariants}
                  whileHover={{ y: -4 }}
                  className="group bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300"
                >
                  <div className="relative">
                    <img
                      src={update.thumbnail}
                      alt={update.title}
                      className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    {update.type === "vlog" && (
                      <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <Play className="w-8 h-8 text-white" />
                      </div>
                    )}
                    <div className="absolute top-3 left-3">
                      <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(update.type)}`}>
                        {getTypeIcon(update.type)}
                        {update.type.charAt(0).toUpperCase() + update.type.slice(1)}
                      </span>
                    </div>
                    {update.duration && (
                      <div className="absolute bottom-3 right-3 bg-black bg-opacity-70 text-white px-2 py-1 rounded text-xs">
                        {update.duration}
                      </div>
                    )}
                  </div>

                  <div className="p-5">
                    <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors line-clamp-2">
                      {update.title}
                    </h3>
                    <p className="text-gray-600 mb-3 text-sm line-clamp-2">
                      {update.description}
                    </p>

                    <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {formatDate(update.published_at || update.publishedAt)}
                      </div>
                      {update.views && (
                        <div className="flex items-center gap-3">
                          <div className="flex items-center gap-1">
                            <Eye className="w-3 h-3" />
                            {update.views}
                          </div>
                          <div className="flex items-center gap-1">
                            <ThumbsUp className="w-3 h-3" />
                            {update.likes}
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-xs font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded">
                        {update.category}
                      </span>
                      <button className="flex items-center gap-1 text-blue-600 hover:text-blue-700 transition-colors">
                        <span className="text-sm font-medium">
                          {update.type === "vlog" ? "Watch" : "Read"}
                        </span>
                        <ExternalLink className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {filteredUpdates.length === 0 && (
              <motion.div variants={itemVariants} className="text-center py-16">
                <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search className="w-12 h-12 text-gray-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No updates found</h3>
                <p className="text-gray-600">Try adjusting your search or filter criteria.</p>
              </motion.div>
            )}
          </motion.div>
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="py-16 px-6 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="container mx-auto max-w-4xl text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
          >
            <motion.h2 variants={itemVariants} className="text-3xl md:text-4xl font-bold text-white mb-4">
              Never Miss an Update
            </motion.h2>
            <motion.p variants={itemVariants} className="text-xl text-blue-100 mb-8">
              Subscribe to our newsletter and be the first to know about new vlogs, research breakthroughs, and company updates.
            </motion.p>
            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                id="newsletter-email"
                className="flex-1 px-4 py-3 rounded-lg border-0 focus:outline-none focus:ring-2 focus:ring-white"
              />
              <button 
                onClick={() => {
                  const email = document.getElementById('newsletter-email').value;
                  handleSubscription(email);
                }}
                disabled={subscribing}
                className="px-6 py-3 bg-white text-blue-600 font-semibold rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                {subscribing && <Loader className="w-4 h-4 animate-spin" />}
                {subscribing ? 'Subscribing...' : 'Subscribe'}
              </button>
            </motion.div>
            {subscriptionMessage && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`mt-4 p-3 rounded-lg flex items-center gap-2 ${
                  subscriptionMessage.includes('Successfully') 
                    ? 'bg-green-100 text-green-700' 
                    : 'bg-red-100 text-red-700'
                }`}
              >
                {subscriptionMessage.includes('Successfully') ? (
                  <CheckCircle className="w-4 h-4" />
                ) : (
                  <AlertCircle className="w-4 h-4" />
                )}
                {subscriptionMessage}
              </motion.div>
            )}
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Updates;
