"use client"

import { useState, useEffect, useRef } from "react"
import { Calendar, Clock, Bell, Star, Sparkles, Ticket } from "lucide-react"
import { useNavigate } from "react-router-dom"

export default function TicketsSoon() {
  const navigate = useNavigate()
  const [isVisible, setIsVisible] = useState(false)
  const [currentTime, setCurrentTime] = useState(new Date())
  const [timeLeft, setTimeLeft] = useState({})
  const countdownDate = useRef(new Date("2025-07-29T21:00:00Z")) // 9 PM GMT on July 29th

  const calculateTimeLeft = () => {
    const now = new Date()
    const difference = countdownDate.current - now

    if (difference <= 0) {
      return null
    }

    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    }
  }

  useEffect(() => {
    setIsVisible(true)
    setTimeLeft(calculateTimeLeft())
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft())
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const formatTime = (date) => {
    return date.toLocaleTimeString("en-US", {
      hour12: true,
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    })
  }

  const formatDate = (date) => {
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute top-40 right-20 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-40 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-4000"></div>
      </div>

      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${3 + Math.random() * 4}s`,
            }}
          >
            <Star className="w-2 h-2 text-white opacity-30" />
          </div>
        ))}
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 text-center">
        <div
          className={`transform transition-all duration-1000 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}
        >
          {/* Logo/Icon Section */}
          <div className="mb-8">
            <div className="relative">
              <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full flex items-center justify-center shadow-2xl">
                <Sparkles className="w-12 h-12 text-white animate-spin-slow" />
              </div>
              <div className="absolute -top-2 -right-2 w-6 h-6 bg-yellow-400 rounded-full animate-ping"></div>
            </div>
          </div>

          {/* Main Heading */}
          <div className="mb-8">
            <h1 className="text-6xl md:text-8xl font-bold bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent mb-4 tracking-tight">
              Tickets
            </h1>
            <h2 className="text-4xl md:text-6xl font-light text-white mb-6 tracking-wide">Coming Soon</h2>
            <div className="w-32 h-1 bg-gradient-to-r from-purple-400 to-pink-400 mx-auto rounded-full"></div>
          </div>

          {/* Subtitle */}
          <div className="mb-12 max-w-2xl mx-auto">
            <p className="text-xl md:text-2xl text-gray-300 leading-relaxed font-light">
              Something extraordinary is on the way. Get ready for an unforgettable experience.
            </p>
          </div>

          {/* Countdown Timer */}
          <div className="mb-12 p-6 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 shadow-2xl">
            <div className="flex items-center justify-center mb-4">
              <Calendar className="w-6 h-6 text-purple-300 mr-3" />
              <span className="text-purple-300 font-medium">Countdown to Ticket Release (July 29th, 9 PM GMT)</span>
            </div>
            {timeLeft ? (
              <div className="text-3xl md:text-4xl font-mono text-white mb-2">
                {`${timeLeft.days}d ${timeLeft.hours}h ${timeLeft.minutes}m ${timeLeft.seconds}s`}
              </div>
            ) : (
              <div className="space-y-6">
                <div className="text-4xl font-bold text-green-400 mb-6 animate-pulse">
                  🎟️ Tickets are now live!
                </div>
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                  <button
                    onClick={() => navigate("/tickets")}
                    className="group px-10 py-5 bg-gradient-to-r from-green-500 to-emerald-500 text-white font-bold text-2xl rounded-full shadow-2xl hover:from-green-600 hover:to-emerald-600 transform hover:scale-105 transition-all duration-300 animate-bounce"
                  >
                    <div className="flex items-center gap-3">
                      <Ticket className="w-8 h-8 group-hover:rotate-12 transition-transform" />
                      <span>Get Tickets Now</span>
                    </div>
                  </button>
                  <button
                    onClick={() => navigate("/")}
                    className="px-8 py-4 bg-white/20 backdrop-blur-sm text-white font-semibold text-lg rounded-full border border-white/30 hover:bg-white/30 transition-all duration-300"
                  >
                    Back to Home
                  </button>
                </div>
                <div className="text-lg text-green-300 font-medium">
                  Don't miss out on this incredible opportunity!
                </div>
              </div>
            )}
          </div>

          

          

          {/* Footer Text */}
          <div className="text-gray-400 text-sm">
            <p>Stay tuned for updates • Follow us for the latest news</p>
          </div>

          {/* Back to Home Button */}
          <div className="mt-8">
            <button
              onClick={() => navigate("/")}
              className="px-6 py-3 bg-white text-purple-700 font-semibold rounded-full shadow-lg hover:bg-purple-100 transition"
            >
              Back to Home
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/50 to-transparent"></div>
    </div>
  )
}
