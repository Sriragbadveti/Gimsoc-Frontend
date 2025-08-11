"use client"

import { useState, useEffect } from "react"
import { Loader2, CheckCircle, Upload, User, CreditCard, Mail, FileText } from "lucide-react"

const LoadingBar = ({ isVisible, message = "Booking your ticket...", currentStep = 0, totalSteps = 5, fileUploadProgress = 0 }) => {
  const [progress, setProgress] = useState(0)
  const [dots, setDots] = useState("")
  const [isMobile, setIsMobile] = useState(false)
  const [forceMobile, setForceMobile] = useState(false)

  // Debug logging
  useEffect(() => {
    console.log("🔄 LoadingBar isVisible:", isVisible, "Progress:", progress, "Step:", currentStep, "FileUploadProgress:", fileUploadProgress, "isMobile:", isMobile, "forceMobile:", forceMobile)
  }, [isVisible, progress, currentStep, fileUploadProgress, isMobile, forceMobile])

  // Check if device is mobile
  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 768
      setIsMobile(mobile)
      // Force mobile view on small screens to ensure visibility
      setForceMobile(mobile || window.innerWidth < 1024)
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

    // Calculate progress based on current step and file upload progress
    const stepProgress = (currentStep / totalSteps) * 100
    const fileProgress = fileUploadProgress > 0 ? (fileUploadProgress / totalSteps) : 0
    const totalProgress = Math.min(stepProgress + fileProgress, 95) // Don't go to 100% until complete

    setProgress(totalProgress)

    // Animate dots
    const dotsInterval = setInterval(() => {
      setDots(prev => {
        if (prev === "...") return ""
        return prev + "."
      })
    }, 500)

    return () => {
      clearInterval(dotsInterval)
    }
  }, [isVisible, currentStep, totalSteps, fileUploadProgress])

  // Complete the progress when submission is done
  useEffect(() => {
    if (!isVisible && progress > 0) {
      setProgress(100)
    }
  }, [isVisible, progress])

  if (!isVisible) return null

  // Ensure the modal is always visible on mobile devices
  const mobileStyles = forceMobile ? {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 9999,
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '1rem'
  } : {}

  // Define steps with icons and descriptions
  const steps = [
    { icon: User, text: "Validating information...", color: "text-blue-500" },
    { icon: Upload, text: "Uploading files...", color: "text-green-500" },
    { icon: CreditCard, text: "Processing payment...", color: "text-purple-500" },
    { icon: FileText, text: "Saving ticket...", color: "text-yellow-500" },
    { icon: Mail, text: "Sending confirmation...", color: "text-pink-500" },
    { icon: CheckCircle, text: "Ticket booked successfully!", color: "text-green-500" }
  ]

  return (
    <div 
      className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[9999] flex items-center justify-center p-4"
      style={forceMobile ? mobileStyles : {}}
    >
      <div className={`bg-white/10 backdrop-blur-xl rounded-3xl p-6 md:p-8 w-full mx-4 border border-white/20 shadow-2xl ${
        forceMobile ? 'max-w-sm' : 'max-w-md'
      } ${forceMobile ? 'mobile-loading-bar' : ''}`}>
        {/* Header */}
        <div className="text-center mb-6 md:mb-8">
          <div className="w-12 h-12 md:w-16 md:h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4 animate-pulse">
            <Loader2 className="w-6 h-6 md:w-8 md:h-8 text-white animate-spin" />
          </div>
          <h2 className="text-xl md:text-2xl font-bold text-white mb-2">Booking Your Ticket</h2>
          <p className="text-gray-300 text-sm md:text-base">Please wait while we process your registration...</p>
        </div>

        {/* Progress Bar */}
        <div className="mb-6 md:mb-8">
          <div className="flex justify-between text-xs md:text-sm text-gray-400 mb-2">
            <span>Progress</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-2 md:h-3">
            <div 
              className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 md:h-3 rounded-full transition-all duration-300 ease-out relative overflow-hidden"
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

        {/* Current Step */}
        <div className="space-y-3 md:space-y-4 mb-6">
          {steps.map((step, index) => {
            const Icon = step.icon
            const isActive = index === currentStep
            const isCompleted = index < currentStep
            
            return (
              <div 
                key={index}
                className={`flex items-center space-x-2 md:space-x-3 p-2 md:p-3 rounded-lg transition-all duration-300 ${
                  isActive 
                    ? 'bg-white/20 border border-white/30' 
                    : isCompleted 
                    ? 'bg-green-500/20 border border-green-500/30' 
                    : 'bg-gray-700/50 border border-gray-600/30'
                }`}
              >
                <div className={`flex-shrink-0 w-6 h-6 md:w-8 md:h-8 rounded-full flex items-center justify-center ${
                  isActive 
                    ? 'bg-blue-500 animate-pulse' 
                    : isCompleted 
                    ? 'bg-green-500' 
                    : 'bg-gray-600'
                }`}>
                  {isActive ? (
                    <Loader2 className="w-3 h-3 md:w-4 md:h-4 text-white animate-spin" />
                  ) : (
                    <Icon className={`w-3 h-3 md:w-4 md:h-4 text-white ${step.color}`} />
                  )}
                </div>
                <span className={`text-xs md:text-sm font-medium ${
                  isActive 
                    ? 'text-white' 
                    : isCompleted 
                    ? 'text-green-300' 
                    : 'text-gray-400'
                }`}>
                  {step.text}
                </span>
              </div>
            )
          })}
        </div>

        {/* File Upload Progress (if applicable) */}
        {fileUploadProgress > 0 && currentStep === 2 && (
          <div className="mb-6">
            <div className="flex justify-between text-xs md:text-sm text-gray-400 mb-2">
              <span>File Upload</span>
              <span>{Math.round(fileUploadProgress)}%</span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-2">
              <div 
                className="bg-green-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${fileUploadProgress}%` }}
              />
            </div>
          </div>
        )}

        {/* Message */}
        <div className="text-center">
          <div className="flex items-center justify-center space-x-2">
            <Loader2 className="w-4 h-4 md:w-5 md:h-5 text-blue-400 animate-spin" />
            <span className="text-white font-semibold text-base md:text-lg">
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
                dot === (currentStep % 3) ? 'bg-blue-400' : 'bg-gray-600'
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
            
            .mobile-loading-bar {
              transform: scale(1.05);
              box-shadow: 0 0 30px rgba(59, 130, 246, 0.5);
            }
            
            @media (max-width: 768px) {
              .mobile-loading-bar {
                transform: scale(1.02);
                margin: 0.5rem;
                max-width: calc(100vw - 1rem);
              }
            }
          `
        }} />
      </div>
    </div>
  )
}

export default LoadingBar 