"use client"

import { useState, useEffect } from "react"
import { Loader2 } from "lucide-react"

const LoadingBar = ({ isVisible, message = "Booking your ticket..." }) => {
  const [progress, setProgress] = useState(0)
  const [dots, setDots] = useState("")
  const [isMobile, setIsMobile] = useState(false)

  // Debug logging
  useEffect(() => {
    console.log("🔄 LoadingBar isVisible:", isVisible, "Progress:", progress)
  }, [isVisible, progress])

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

    console.log("🚀 Starting LoadingBar animation")

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
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[9999] flex items-center justify-center">
      <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 max-w-md w-full mx-4 border border-white/20 shadow-2xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
            <Loader2 className="w-8 h-8 text-white animate-spin" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">Booking Your Ticket</h2>
          <p className="text-gray-300">Please wait while we process your registration...</p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between text-sm text-gray-400 mb-2">
            <span>Progress</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-3">
            <div 
              className="bg-gradient-to-r from-blue-500 to-purple-500 h-3 rounded-full transition-all duration-300 ease-out relative overflow-hidden"
              style={{ width: `${progress}%` }}
            >
              {/* Shimmer effect on progress bar */}
              <div 
                className="absolute top-0 left-0 h-full w-full bg-gradient-to-r from-transparent via-white/30 to-transparent"
                style={{
                  animation: 'shimmer 2s infinite'
                }}
              />
            </div>
          </div>
        </div>

        {/* Message */}
        <div className="text-center">
          <div className="flex items-center justify-center space-x-2">
            <Loader2 className="w-5 h-5 text-blue-400 animate-spin" />
            <span className="text-white font-semibold text-lg">
              {message}{dots}
            </span>
          </div>
        </div>

        {/* Animated dots at bottom */}
        <div className="flex justify-center space-x-1 mt-6">
          {[0, 1, 2].map((dot) => (
            <div
              key={dot}
              className={`w-2 h-2 rounded-full animate-pulse ${
                dot === (Math.floor(progress / 30) % 3) ? 'bg-blue-400' : 'bg-gray-600'
              }`}
              style={{
                animationDelay: `${dot * 0.2}s`
              }}
            ></div>
          ))}
        </div>

        <style dangerouslySetInnerHTML={{
          __html: `
            @keyframes shimmer {
              0% { transform: translateX(-100%); }
              100% { transform: translateX(100%); }
            }
          `
        }} />
      </div>
    </div>
  )
}

export default LoadingBar 