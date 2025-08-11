"use client"

import { useState, useEffect } from "react"
import { Loader2, CheckCircle, CreditCard, Upload, User } from "lucide-react"

const LoadingAnimation = ({ isVisible, onComplete }) => {
  const [currentStep, setCurrentStep] = useState(0)
  const [progress, setProgress] = useState(0)

  const steps = [
    { icon: User, text: "Validating your information...", color: "text-blue-500" },
    { icon: Upload, text: "Uploading your documents...", color: "text-green-500" },
    { icon: CreditCard, text: "Processing payment...", color: "text-purple-500" },
    { icon: CheckCircle, text: "Confirming your ticket...", color: "text-yellow-500" },
    { icon: CheckCircle, text: "Ticket booked successfully!", color: "text-green-500" }
  ]

  useEffect(() => {
    if (!isVisible) {
      setCurrentStep(0)
      setProgress(0)
      return
    }

    const stepDuration = 1500 // 1.5 seconds per step
    const progressInterval = 50 // Update progress every 50ms

    const stepTimer = setInterval(() => {
      setCurrentStep(prev => {
        if (prev >= steps.length - 1) {
          clearInterval(stepTimer)
          setTimeout(() => {
            onComplete()
          }, 1000)
          return prev
        }
        return prev + 1
      })
    }, stepDuration)

    const progressTimer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressTimer)
          return 100
        }
        return prev + 2
      })
    }, progressInterval)

    return () => {
      clearInterval(stepTimer)
      clearInterval(progressTimer)
    }
  }, [isVisible, onComplete])

  if (!isVisible) return null

  return (
    <div className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-6 md:p-8 w-full max-w-sm md:max-w-md mx-4 border border-white/20">
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
            <span>{progress}%</span>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-300 ease-out"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>

        {/* Current Step */}
        <div className="space-y-3 md:space-y-4">
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

        {/* Animated dots */}
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
      </div>
      
      {/* Mobile-specific styles */}
      <style dangerouslySetInnerHTML={{
        __html: `
          @media (max-width: 768px) {
            .fixed.inset-0 {
              z-index: 9999 !important;
              background-color: rgba(0, 0, 0, 0.95) !important;
            }
          }
        `
      }} />
    </div>
  )
}

export default LoadingAnimation 