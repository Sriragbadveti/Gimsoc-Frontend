"use client"

import { motion } from "framer-motion"
import { XCircle, AlertTriangle, Calendar, Users } from "lucide-react"
import LightRays from '../Components/LightRays'

const SoldOut = () => {
  return (
    <div className="min-h-screen bg-black relative overflow-hidden">

      {/* Light Rays Background */}
      <div style={{ 
        width: '100%', 
        height: '100vh', 
        position: 'absolute',
        top: 0,
        left: 0,
        zIndex: 1
      }}>
        <LightRays
          raysOrigin="top-center"
          raysColor="#ffffff"
          raysSpeed={1.8}
          lightSpread={1.0}
          rayLength={3.0}
          pulsating={true}
          fadeDistance={1.0}
          saturation={1.0}
          followMouse={true}
          mouseInfluence={0.4}
          noiseAmount={0.0}
          distortion={0.0}
          className="soldout-light-rays"
        />
        
      </div>



      {/* Main Content */}
      <div className="relative z-50 min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          {/* Icon */}
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, type: "spring", stiffness: 200 }}
            className="mb-8"
          >
            <div className="w-32 h-32 mx-auto bg-gradient-to-br from-red-600 to-red-800 rounded-full flex items-center justify-center shadow-2xl border-4 border-red-400/30">
              <XCircle className="w-16 h-16 text-white" />
            </div>
          </motion.div>

          {/* Main Message */}
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-8"
          >
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight">
              Sorry, Tickets Are
              <span className="block text-red-400 drop-shadow-lg">Sold Out!</span>
            </h1>
            
            <div className="w-32 h-1 bg-gradient-to-r from-red-500 to-orange-500 mx-auto rounded-full mb-8 shadow-lg"></div>
            
            <p className="text-xl md:text-2xl text-gray-300 leading-relaxed max-w-3xl mx-auto">
              We're thrilled by the overwhelming response! All tickets for MEDCON'25 have been sold out.
            </p>
          </motion.div>

          {/* Alert Box */}
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mb-12"
          >
            <div className="bg-black/50 backdrop-blur-sm rounded-2xl border border-red-500/50 shadow-2xl p-8 max-w-2xl mx-auto">
              <div className="flex items-center justify-center mb-4">
                <AlertTriangle className="w-8 h-8 text-red-400 mr-3" />
                <h3 className="text-2xl font-bold text-white">Event at Full Capacity</h3>
              </div>
              <p className="text-gray-300 text-lg leading-relaxed">
                Due to the incredible demand and limited venue capacity, we've reached our maximum attendance limit. 
                Thank you for your interest in MEDCON'25!
              </p>
            </div>
          </motion.div>

          {/* Event Details */}
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-12"
          >
            <div className="bg-black/30 backdrop-blur-sm rounded-xl border border-white/20 p-6 shadow-lg">
              <div className="flex items-center mb-4">
                <Calendar className="w-8 h-8 text-blue-400 mr-3" />
                <h4 className="text-xl font-semibold text-white">Event Details</h4>
              </div>
              <div className="text-gray-300 space-y-2">
                <p><span className="font-semibold text-white">Date:</span> February 15-16, 2025</p>
                <p><span className="font-semibold text-white">Venue:</span> Tbilisi State University</p>
                <p><span className="font-semibold text-white">Theme:</span> Infectious Diseases</p>
              </div>
            </div>

            <div className="bg-black/30 backdrop-blur-sm rounded-xl border border-white/20 p-6 shadow-lg">
              <div className="flex items-center mb-4">
                <Users className="w-8 h-8 text-green-400 mr-3" />
                <h4 className="text-xl font-semibold text-white">Capacity Reached</h4>
              </div>
              <div className="text-gray-300 space-y-2">
                <p><span className="font-semibold text-white">Total Attendees:</span> 10,000+</p>
                <p><span className="font-semibold text-white">Countries:</span> 15+</p>
                <p><span className="font-semibold text-white">Status:</span> Sold Out</p>
              </div>
            </div>
          </motion.div>

          {/* Call to Action */}
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="space-y-6"
          >
            <div className="bg-black/50 backdrop-blur-sm rounded-2xl border border-red-500/50 p-8 shadow-2xl">
              <h3 className="text-2xl font-bold text-white mb-4">Stay Connected</h3>
              <p className="text-gray-300 mb-6">
                Follow us for updates on future events, conference highlights, and early bird notifications for MEDCON'26!
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-3 bg-gradient-to-r from-red-500 to-orange-500 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  Follow on Social Media
                </motion.button>
                
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-3 bg-white/10 backdrop-blur-sm border border-white/20 text-white font-semibold rounded-lg hover:bg-white/20 transition-all duration-300"
                >
                  Visit Our Website
                </motion.button>
              </div>
            </div>
          </motion.div>

          {/* Footer Note */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1 }}
            className="mt-12"
          >
            <p className="text-gray-400 text-sm">
              Thank you for your overwhelming support! MEDCON'25 will be an incredible event.
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default SoldOut 