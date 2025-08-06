import React from "react";
import { motion } from "framer-motion";
import "./AccreditedBy.css";

export default function AccreditedBy() {
  const logos = [
    {
      name: "MSME",
      logo: "https://res.cloudinary.com/duiotumuy/image/upload/v1753720444/msme_wclpvp.webp",
      isLarge: true,
    },
    {
      name: "MCA",
      logo: "https://res.cloudinary.com/duiotumuy/image/upload/v1753720445/mca_lsfim6.webp",
      isLarge: false,
    },
    {
      name: "Startup India",
      logo: "https://res.cloudinary.com/duiotumuy/image/upload/v1753720444/startupindia_ik17fn.webp",
      isLarge: true,
    },
    {
      name: "AICTE",
      logo: "https://res.cloudinary.com/duiotumuy/image/upload/v1753720444/aicte_vuhbqq.webp",
      isLarge: false,
    },
    {
      name: "Edtech Society",
      logo: "https://res.cloudinary.com/duiotumuy/image/upload/v1753720445/edtechsociety_ebmnly.webp",
      isLarge: false,
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  return (
    <section id="accredited-by" className="py-16 sm:py-24 bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-96 h-96 bg-purple-400/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-blue-400/10 rounded-full blur-3xl"></div>
      </div>
      
      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            <span className="text-purple-500">Accredited</span> by
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Trusted and recognized by leading government bodies and industry organizations
          </p>
        </motion.div>

        {/* Logos Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 md:gap-8 items-center justify-items-center"
        >
          {logos.map((accreditation, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ 
                scale: 1.05,
                transition: { duration: 0.2 }
              }}
              className="group relative bg-white rounded-xl p-6 md:p-8 shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 hover:border-blue-200 w-full h-32 md:h-36 flex items-center justify-center"
            >
              {/* Subtle gradient overlay on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-50/0 to-purple-50/0 group-hover:from-blue-50/30 group-hover:to-purple-50/30 rounded-xl transition-all duration-300" />
              
              <img
                src={accreditation.logo}
                alt={`${accreditation.name} logo`}
                className={`relative z-10 object-contain transition-all duration-300 group-hover:scale-105 ${
                  accreditation.isLarge 
                    ? "h-16 md:h-20 max-w-full" 
                    : "h-12 md:h-16 max-w-full"
                }`}
                loading="lazy"
              />
              
              {/* Tooltip */}
              <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 translate-y-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gray-900 text-white text-xs px-2 py-1 rounded whitespace-nowrap z-20">
                {accreditation.name}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Trust Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-50 border border-green-200 rounded-full">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <span className="text-sm font-medium text-green-700">
              Verified & Trusted Platform
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
