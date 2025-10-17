"use client"

import Card from "./Card"
import { AlertTriangle, Calendar, CheckCircle, Users, XCircle } from "lucide-react"
import { motion } from "framer-motion"

export default function Workshops({ userData }) {

  // Show animated "Workshop selections are over" message for all users
    return (
      <Card>
      <div className="p-12 text-center">
        {/* Animated background elements */}
        <div className="relative overflow-hidden">
          {/* Floating background elements */}
          <motion.div
            className="absolute top-0 left-1/4 w-32 h-32 bg-blue-100 rounded-full opacity-20"
            animate={{
              y: [-20, 20, -20],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div
            className="absolute top-1/3 right-1/4 w-24 h-24 bg-purple-100 rounded-full opacity-20"
            animate={{
              y: [20, -20, 20],
              rotate: [360, 180, 0],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1
            }}
          />
          <motion.div
            className="absolute bottom-1/4 left-1/3 w-20 h-20 bg-green-100 rounded-full opacity-20"
            animate={{
              y: [-15, 15, -15],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 7,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2
            }}
          />

          {/* Main content */}
          <div className="relative z-10">
            {/* Icon with animation */}
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ 
                duration: 1, 
                type: "spring", 
                stiffness: 200, 
                damping: 15 
              }}
              className="mb-8"
            >
              <div className="w-32 h-32 mx-auto bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-2xl">
                <Calendar className="w-16 h-16 text-white" />
              </div>
            </motion.div>

            {/* Title with typing animation */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="text-4xl md:text-5xl font-bold text-gray-900 mb-4"
            >
              Workshop Selections Are{" "}
              <motion.span
                className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-pink-600"
                animate={{
                  backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                style={{
                  backgroundSize: "200% 200%"
                }}
              >
                Over
              </motion.span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto"
            >
              Thank you for your interest! Workshop registration has officially closed.
            </motion.p>

            {/* Status cards */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1, duration: 0.8 }}
              className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-8"
            >
              {/* Registration Closed */}
              <div className="bg-red-50 border-2 border-red-200 rounded-xl p-6">
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                  className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4"
                >
                  <XCircle className="w-8 h-8 text-red-600" />
                </motion.div>
                <h3 className="text-lg font-semibold text-red-800 mb-2">Registration Closed</h3>
                <p className="text-sm text-red-600">Workshop selection period has ended</p>
              </div>

              {/* Event Status */}
              <div className="bg-green-50 border-2 border-green-200 rounded-xl p-6">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                  className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4"
                >
                  <CheckCircle className="w-8 h-8 text-green-600" />
                </motion.div>
                <h3 className="text-lg font-semibold text-green-800 mb-2">Event Active</h3>
                <p className="text-sm text-green-600">Conference is proceeding as scheduled</p>
          </div>
          
              {/* Next Steps */}
              <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-6">
                <motion.div
                  animate={{ y: [-5, 5, -5] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4"
                >
                  <Calendar className="w-8 h-8 text-blue-600" />
                </motion.div>
                <h3 className="text-lg font-semibold text-blue-800 mb-2">Conference Ready</h3>
                <p className="text-sm text-blue-600">Get ready for an amazing event!</p>
              </div>
            </motion.div>

            {/* Important notice */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.4, duration: 0.6 }}
              className="bg-gradient-to-r from-amber-50 to-orange-50 border-l-4 border-amber-400 rounded-lg p-6 max-w-3xl mx-auto"
            >
              <div className="flex items-start gap-4">
                <motion.div
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity, delay: 1.5 }}
                >
                  <AlertTriangle className="w-6 h-6 text-amber-600 flex-shrink-0 mt-1" />
                </motion.div>
                <div className="text-left">
                  <h4 className="font-semibold text-amber-800 mb-2">Important Notice</h4>
                  <p className="text-amber-700">
                    If you had previously registered for workshops, your selections have been confirmed. 
                    Please check your email for workshop details and conference schedule.
                  </p>
                      </div>
                    </div>
            </motion.div>

            {/* Conference info */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.7, duration: 0.8 }}
              className="mt-8 p-6 bg-gray-50 rounded-xl max-w-2xl mx-auto"
            >
              <h4 className="font-semibold text-gray-900 mb-3">Conference Information</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-gray-400" />
                  <span>October 24-25, 2025</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-gray-400" />
                  <span>In-Person & Online</span>
            </div>
          </div>
            </motion.div>
          </div>
          </div>
        </div>
      </Card>
    )

}


