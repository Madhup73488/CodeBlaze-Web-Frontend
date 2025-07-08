import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import Hero from "../components/landing/Hero";
import ProductDevelopment from "../components/landing/ProductDevelopment";
import Services from "../components/landing/Services";
import PremiumInternships from "../components/landing/PremiumInternships";
import Strategy from "../components/landing/Strategy";
import FeaturedTechnology from "../components/landing/FeaturedTechnology";
import contentApi from "../admin/utils/contentApi"; // Import the content API

const Landing = ({ theme, color, openCallbackModal }) => { // Add openCallbackModal to props
  const [banners, setBanners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBanners = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await contentApi.getBannersAndCarousels();
        console.log("Fetched banner data:", data); // Log fetched data
        // Filter active banners and sort by order
        const activeBanners = data
          .filter(item => item.isActive)
          .sort((a, b) => a.order - b.order);
        setBanners(activeBanners);
        console.log("Active banners for display:", activeBanners); // Log filtered data
      } catch (err) {
        console.error("Failed to fetch banners for landing page:", err);
        setError("Failed to load dynamic content.");
      } finally {
        setLoading(false);
        console.log("Loading state after fetch:", false); // Log loading state
      }
    };

    fetchBanners();
  }, []);

  console.log("Current banners state:", banners); // Log current state
  console.log("Current loading state:", loading); // Log current loading state
  console.log("Current error state:", error); // Log current error state

  return (
    <main 
      className="landing-page" // Changed class name
      style={{
        backgroundColor: `var(--bg-primary)`,
        color: `var(--text-primary)`
      }}
    >
      <Helmet>
        <title>CodeBlaze - Ignite Your Tech Career</title>
        <meta name="description" content="CodeBlaze offers cutting-edge internship programs, job placement services, and expert-led courses to help you launch your career in tech." />
        <meta property="og:title" content="CodeBlaze - Ignite Your Tech Career" />
        <meta property="og:description" content="CodeBlaze offers cutting-edge internship programs, job placement services, and expert-led courses to help you launch your career in tech." />
        <meta property="og:image" content="https://www.codeblaze.net/logo512.png" />
        <meta property="og:url" content="https://www.codeblaze.net" />
        <meta property="og:type" content="website" />
      </Helmet>
      <Hero theme={theme} color={color} openCallbackModal={openCallbackModal} /> {/* Pass openCallbackModal to Hero */}
{/* 
      {loading && <p className="text-center text-gray-500 dark:text-gray-400">Loading dynamic content...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}

      {!loading && !error && banners.length > 0 && (
        <div className="container mx-auto px-4 py-8">
          {banners.map(banner => (
            <BannerCarouselDisplay key={banner.id} item={banner} theme={theme} color={color} />
          ))}
        </div>
      )}
      {!loading && !error && banners.length === 0 && (
        <p className="text-center text-gray-500 dark:text-gray-400">No active banners to display.</p>
      )} */}

      <PremiumInternships theme={theme} color={color} />
      <Services theme={theme} color={color} />
      <Strategy theme={theme} color={color} />
      <ProductDevelopment theme={theme} color={color} />
      <FeaturedTechnology theme={theme} color={color} />
    </main>
  );
};

export default Landing;
