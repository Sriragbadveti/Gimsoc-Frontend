import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";

const SponsorsPage = () => {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [emailCopied, setEmailCopied] = useState(false);

  const gimsocEmail = "medconconferencegimsoc@gmail.com";

  const openContactModal = () => setIsContactModalOpen(true);
  const closeContactModal = () => {
    setIsContactModalOpen(false);
    setEmailCopied(false);
  };

  const copyEmailToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(gimsocEmail);
      setEmailCopied(true);
      setTimeout(() => setEmailCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy email:', err);
    }
  };
  
  const sponsors = [
    
    {
      name: "Project IMG",
      logo: "projectimg.jpg",
      description: "Project IMG is a global network uniting international medical students and graduates to promote equality in medical education and access to opportunity. ",
      website: "https://projectimg.com/",
      
    },
    {
      name: "IMG Unity",
      logo: "IMG UNITY logo.jpeg",
      description: "IMG Unity provides medical imaging solutions and diagnostic technology to enhance patient care and medical diagnosis.",
      website: "https://www.imgunity.com",
      category: "Medical Imaging",
      features: ["Medical Imaging", "Diagnostic Technology", "Patient Care"]
    },

    {
      name: "AMBOSS",
      logo: "AMBOSS logo.jpg",
      description: "AMBOSS is a medical learning platform that provides comprehensive study materials and clinical knowledge for medical students and professionals worldwide.",
      website: "https://www.amboss.com",
      category: "Medical Education",
      features: ["Clinical Knowledge", "Study Materials", "Medical Training"]
    },
    {
      name: "GEOMEDI",
      logo: "GEOMEDI logo.jpeg",
      description: "GEOMEDI specializes in geographic medicine and global health initiatives, working to improve healthcare access worldwide.",
      website: "https://www.geomedi.com",
      category: "Global Health",
      features: ["Global Health", "Geographic Medicine", "Health Access"]
    },
    {
      name: "SAS Geomedi",
      logo: "SAS geomedi.jpeg",
      description: "SAS Geomedi provides statistical analysis and research support for medical studies and clinical research projects.",
      website: "https://www.sasgeomedi.com",
      category: "Medical Statistics",
      features: ["Statistical Analysis", "Research Support", "Clinical Studies"]
    },

    {
      name: "ClinNova",
      logo: "ClinNova logo.jpeg",
      description: "ClinNova is a leading clinical research organization dedicated to advancing medical research and bringing innovative treatments to patients.",
      website: "https://www.clinnova.com",
      category: "Clinical Research",
      features: ["Clinical Trials", "Medical Research", "Patient Care"]
    },

    {
      name: "Walter E Dandy",
      logo: "walter e dandy logo.jpeg",
      description: "Named after the pioneering neurosurgeon, Walter E Dandy Foundation supports neurosurgical education and research initiatives.",
      website: "https://www.walteredandy.org",
      category: "Neurosurgery",
      features: ["Neurosurgical Education", "Medical Research", "Surgical Innovation"]
    },
    {
      name: "GRAE",
      logo: "GREA logo.jpeg",
      description: "GRAE (Global Research and Education Alliance) promotes international collaboration in medical research and education.",
      website: "https://www.grae.org",
      category: "Research Alliance",
      features: ["International Collaboration", "Medical Research", "Education"]
    },

    {
      name: "GSAOT",
      logo: "gsaot_logo.jpeg",
      description: "GSAOT (Georgian Society for Advanced Orthopedic Technology) advances orthopedic care through innovative surgical techniques and technology.",
      website: "https://www.gsaot.org",
      category: "Orthopedic Technology",
      features: ["Orthopedic Care", "Surgical Innovation", "Medical Technology"]
    },

    {
      name: "INAMS",
      logo: "INAMS logo.jpeg",
      description: "INAMS (International Network for Advanced Medical Studies) connects medical professionals worldwide for collaborative learning and research.",
      website: "https://www.inams.org",
      category: "Medical Network",
      features: ["Professional Network", "Collaborative Learning", "Medical Studies"]
    },

    {
      name: "DFC",
      logo: "DFC logo.jpeg",
      description: "DFC (Digital Health Foundation) focuses on digital health solutions and medical technology innovations to improve healthcare delivery.",
      website: "https://www.dfc.com",
      category: "Digital Health",
      features: ["Digital Solutions", "Health Technology", "Medical Innovation"]
    },

    {
      name: "Compendium Medicine",
      logo: "compendium medicine logo.jpeg",
      description: "Compendium Medicine offers comprehensive medical reference materials and educational resources for healthcare professionals and students.",
      website: "https://www.compendiummedicine.com",
      category: "Medical Reference",
      features: ["Medical References", "Educational Resources", "Clinical Guidelines"]
    },

    {
      name: "Blackwells Scrubs",
      logo: "blackwells scrubs LOGO.png",
      description: "Blackwells Scrubs provides high-quality medical uniforms and scrubs for healthcare professionals, combining comfort with professional appearance.",
      website: "https://www.blackwellsscrubs.com",
      category: "Medical Apparel",
      features: ["Professional Scrubs", "Medical Uniforms", "Healthcare Apparel"]
    },
    
    
    
    
    
    
    
    
   
    
   
  ];


  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 relative overflow-hidden">
      {/* Dark background effects */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-900/20 via-transparent to-purple-900/20"></div>
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/30 via-transparent to-transparent"></div>
      
      <Navbar />
      
      {/* Hero Section */}
      <div className="pt-32 pb-16 relative z-10">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent mb-6 drop-shadow-2xl">
            Our Sponsors
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
            We are grateful to our valued sponsors who make MEDCON'25 possible. 
            Their support helps us bring together the medical community for this incredible event.
          </p>
        </div>
      </div>

      {/* Sponsors Grid */}
      <div className="container mx-auto px-4 pb-20 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {sponsors.map((sponsor, index) => (
            <div 
              key={sponsor.name}
              className="group relative bg-gray-800/80 backdrop-blur-sm rounded-3xl shadow-2xl hover:shadow-blue-500/25 transition-all duration-300 p-8 border border-gray-700/50 hover:border-blue-400/50 hover:scale-105 hover:bg-gray-800/90 transform hover:translate-y-[-5px]"
              style={{
                animation: `fadeInUp 0.6s ease-out ${index * 0.1}s both`
              }}
            >
                {/* Glow effect */}
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-blue-600/10 via-purple-600/10 to-indigo-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                {/* Logo Section */}
                <div className="flex justify-center mb-6 relative z-10">
                  <div className="w-32 h-32 md:w-40 md:h-40 bg-gradient-to-br from-gray-700/50 to-gray-800/50 rounded-2xl flex items-center justify-center p-4 transition-all duration-300 border border-gray-600/30 group-hover:border-blue-400/50 group-hover:shadow-lg group-hover:shadow-blue-500/20 group-hover:scale-110">
                    <img
                      src={`/${sponsor.logo}`}
                      alt={sponsor.name}
                      className="max-w-full max-h-full object-contain filter brightness-75 group-hover:brightness-100 transition-all duration-300"
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.nextSibling.style.display = 'flex';
                      }}
                    />
                    <div className="hidden items-center justify-center text-gray-400 text-sm text-center font-semibold">
                      {sponsor.name}
                    </div>
                  </div>
                </div>

                {/* Content Section */}
                <div className="text-center relative z-10">
                  <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors duration-300">
                    {sponsor.name}
                  </h3>
                  
                  <div className="inline-block bg-gradient-to-r from-blue-600/20 to-purple-600/20 text-blue-300 px-4 py-2 rounded-full text-sm font-semibold mb-4 border border-blue-500/30">
                    {sponsor.category}
                  </div>

                  <p className="text-gray-300 leading-relaxed mb-6 text-sm">
                    {sponsor.description}
                  </p>

                  {/* Features */}
                  <div className="mb-6">
                    <h4 className="text-sm font-semibold text-gray-300 mb-3">Key Features:</h4>
                    <div className="flex flex-wrap gap-2 justify-center">
                      {sponsor.features.map((feature, featureIndex) => (
                        <span 
                          key={featureIndex}
                          className="bg-gray-700/50 text-blue-300 px-3 py-1 rounded-full text-xs font-medium border border-gray-600/30 hover:border-blue-400/50 transition-colors duration-300"
                        >
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Website Link */}
                  <a
                    href={sponsor.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-full font-semibold hover:from-blue-500 hover:to-purple-500 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-blue-500/50 border border-blue-500/30"
                  >
                    Visit Website
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                </div>

                {/* Decorative Glow Elements */}
                <div className="absolute top-4 right-4 w-8 h-8 bg-blue-500/20 rounded-full opacity-50 group-hover:opacity-100 transition-all duration-300 group-hover:scale-110"></div>
                <div className="absolute bottom-4 left-4 w-6 h-6 bg-purple-500/20 rounded-full opacity-50 group-hover:opacity-100 transition-all duration-300 group-hover:scale-110"></div>
                
                {/* Corner glow effects */}
                <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-blue-500/10 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute bottom-0 left-0 w-16 h-16 bg-gradient-to-tr from-purple-500/10 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
          ))}
        </div>
      </div>

      {/* Call to Action Section */}
      <div className="relative py-16 overflow-hidden">
        {/* Dark gradient background with glow */}
        <div className="absolute inset-0 bg-gradient-to-r from-gray-800 via-gray-900 to-black"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-indigo-600/20"></div>
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-600/10 via-transparent to-transparent"></div>
        
        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent mb-6 drop-shadow-2xl">
            Interested in Becoming a Sponsor?
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
            Join our prestigious list of sponsors and support the medical community. 
            Get in touch with us to explore sponsorship opportunities for MEDCON'25.
          </p>
          <div className="flex justify-center">
            <button 
              onClick={openContactModal}
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-full font-bold text-lg hover:from-blue-500 hover:to-purple-500 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-blue-500/50 border border-blue-500/30"
            >
              Contact Us
            </button>
          </div>
        </div>
      </div>

      {/* Animated Contact Modal */}
      <AnimatePresence>
        {isContactModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            onClick={closeContactModal}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 50 }}
              transition={{ 
                type: "spring", 
                damping: 25, 
                stiffness: 300,
                duration: 0.4 
              }}
              className="bg-gray-800/90 backdrop-blur-sm rounded-3xl p-8 max-w-md w-full mx-4 border border-gray-600/50 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={closeContactModal}
                className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors p-2 rounded-full hover:bg-gray-700/50"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              {/* Modal Content */}
              <div className="text-center">
                {/* Icon */}
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring", damping: 15 }}
                  className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-6"
                >
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </motion.div>

                {/* Title */}
                <motion.h3
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="text-2xl font-bold text-white mb-4"
                >
                  Contact GIMSOC
                </motion.h3>

                {/* Description */}
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="text-gray-300 mb-6"
                >
                  Get in touch with us for sponsorship opportunities and partnerships.
                </motion.p>

                {/* Email Display */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="bg-gray-700/50 rounded-xl p-4 mb-6 border border-gray-600/50"
                >
                  <p className="text-sm text-gray-400 mb-2">Email Address:</p>
                  <p className="text-lg font-mono text-blue-400 break-all">{gimsocEmail}</p>
                </motion.div>

                {/* Copy Button */}
                <motion.button
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  onClick={copyEmailToClipboard}
                  className={`w-full py-3 px-6 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 ${
                    emailCopied
                      ? 'bg-green-600 text-white'
                      : 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-500 hover:to-purple-500'
                  }`}
                >
                  {emailCopied ? (
                    <div className="flex items-center justify-center gap-2">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      Email Copied!
                    </div>
                  ) : (
                    <div className="flex items-center justify-center gap-2">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      </svg>
                      Copy Email Address
                    </div>
                  )}
                </motion.button>

                {/* Additional Info */}
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.7 }}
                  className="text-xs text-gray-500 mt-4"
                >
                  We'll get back to you within 24 hours
                </motion.p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
};

export default SponsorsPage;
