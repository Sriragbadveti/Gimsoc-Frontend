"use client"

import { useState, useEffect } from "react"
import { X, AlertCircle, UserX, Ticket, Users } from "lucide-react"

const ErrorAnimation = ({ 
  errorType, 
  message, 
  isVisible, 
  onClose, 
  onRetry 
}) => {
  const [isAnimating, setIsAnimating] = useState(false)

  useEffect(() => {
    if (isVisible) {
      setIsAnimating(true)
      // Auto-hide after 8 seconds
      const timer = setTimeout(() => {
        onClose()
      }, 8000)
      return () => clearTimeout(timer)
    }
  }, [isVisible, onClose])

  const getErrorIcon = () => {
    switch (errorType) {
      case "email_used":
        return <UserX className="w-8 h-8 text-red-400" />
      case "sold_out":
        return <Ticket className="w-8 h-8 text-orange-400" />
      case "gala_sold_out":
        return <Users className="w-8 h-8 text-purple-400" />
      default:
        return <AlertCircle className="w-8 h-8 text-red-400" />
    }
  }

  const getErrorColor = () => {
    switch (errorType) {
      case "email_used":
        return "bg-red-500/90 border-red-400"
      case "sold_out":
        return "bg-orange-500/90 border-orange-400"
      case "gala_sold_out":
        return "bg-purple-500/90 border-purple-400"
      default:
        return "bg-red-500/90 border-red-400"
    }
  }

  if (!isVisible) return null

  return (
    <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-md">
      <div 
        className={`${getErrorColor()} backdrop-blur-sm border-2 rounded-xl p-4 shadow-2xl animate-slide-down`}
      >
        <div className="flex items-start space-x-3">
          <div className="flex-shrink-0 mt-1">
            {getErrorIcon()}
          </div>
          
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-white mb-1">
                {errorType === "email_used" && "Email Already Used"}
                {errorType === "sold_out" && "Tickets Sold Out"}
                {errorType === "gala_sold_out" && "Gala Dinner Sold Out"}
                {errorType === "general" && "Error"}
              </h3>
              <button
                onClick={onClose}
                className="flex-shrink-0 ml-2 p-1 rounded-full hover:bg-white/20 transition-colors"
              >
                <X className="w-4 h-4 text-white" />
              </button>
            </div>
            
            <p className="text-white/90 text-sm leading-relaxed">
              {message}
            </p>
            
            {onRetry && (
              <button
                onClick={onRetry}
                className="mt-3 px-4 py-2 bg-white/20 hover:bg-white/30 text-white rounded-lg text-sm font-medium transition-colors"
              >
                Try Again
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ErrorAnimation 