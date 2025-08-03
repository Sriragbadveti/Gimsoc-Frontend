"use client"

import { useState, useEffect } from "react"
import { Loader2 } from "lucide-react"

const LoadingBar = ({ isVisible, message = "Booking your ticket..." }) => {
  const [progress, setProgress] = useState(0)
  const [dots, setDots] = useState("")
  const [isMobile, setIsMobile] = useState(false)

  // Check if device is mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  useEffect(() => {
    if (!isVisible) {
      setProgress(0)
      setDots("")
      return
    }

    // Animate progress bar with different speeds for mobile/desktop
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 95) {
          clearInterval(progressInterval)
          return 95 // Don't go to 100% until submission is complete
        }
        // Faster progress on mobile for better UX
        const increment = isMobile ? Math.random() * 4 + 2 : Math.random() * 3 + 1
        return prev + increment
      })
    }, isMobile ? 150 : 200) // Faster updates on mobile

    // Animate dots
    const dotsInterval = setInterval(() => {
      setDots(prev => {
        if (prev === "...") return ""
        return prev + "."
      })
    }, 500)

    return () => {
      clearInterval(progressInterval)
      clearInterval(dotsInterval)
    }
  }, [isVisible, isMobile])

  // Complete the progress when submission is done
  useEffect(() => {
    if (!isVisible && progress > 0) {
      setProgress(100)
    }
  }, [isVisible, progress])

  if (!isVisible) return null

  return (
    <div className="fixed top-0 left-0 w-full z-50">
      {/* Animated gradient progress bar */}
      <div className="relative h-2 sm:h-3 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 overflow-hidden">
        <div 
          className="absolute top-0 left-0 h-full bg-gradient-to-r from-white/30 to-white/50 transition-all duration-300 ease-out"
          style={{ width: `${progress}%` }}
        />
        {/* Animated shimmer effect */}
        <div className="absolute top-0 left-0 h-full w-full bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" />
        {/* Glow effect */}
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-blue-400/20 via-purple-400/20 to-pink-400/20 animate-pulse" />
      </div>

      {/* Message bar - responsive design */}
      <div className="bg-gradient-to-r from-blue-900/95 via-purple-900/95 to-pink-900/95 backdrop-blur-sm border-b border-white/20">
        <div className="flex items-center justify-center py-2 sm:py-3 px-3 sm:px-4">
          <Loader2 className="w-4 h-4 sm:w-5 sm:h-5 text-white animate-spin mr-2 sm:mr-3 flex-shrink-0" />
          <span className="text-white font-semibold text-sm sm:text-lg text-center">
            {message}{dots}
          </span>
        </div>
      </div>

      {/* Additional glow effect for better visibility */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 animate-pulse opacity-50" />

      <style jsx>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        .animate-shimmer {
          animation: shimmer 2s infinite;
        }
        
        /* Mobile-specific optimizations */
        @media (max-width: 768px) {
          .animate-shimmer {
            animation: shimmer 1.5s infinite;
          }
        }
      `}</style>
    </div>
  )
}

export default LoadingBar 