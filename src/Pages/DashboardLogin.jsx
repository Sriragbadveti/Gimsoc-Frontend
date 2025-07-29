"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import { Eye, EyeOff, Lock, Mail, User } from "lucide-react"
import { TypewriterEffectSmooth } from "../Components/TypewriterEffect"
import { BackgroundBeams } from "../Components/BackgroundBeams"

export default function DashboardLogin() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const navigate = useNavigate()

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
    // Clear error when user starts typing
    if (error) setError("")
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    try {
      const response = await axios.post(
        "https://gimsoc-backend.onrender.com/api/dashboard/login",
        formData,
        {
          withCredentials: true,
        }
      )

      console.log("✅ Dashboard login successful:", response.data)
      
      // Verify that the login was successful and user has access
      if (response.data.message === "Login successful") {
      // Store user data in localStorage for dashboard access
      localStorage.setItem('dashboardUserData', JSON.stringify(response.data.user))
      localStorage.setItem('dashboardUserEmail', formData.email)
      
      // Redirect to dashboard
      navigate("/attendeedashboard")
      } else {
        // Unexpected response
        setError("Login failed. Please try again.")
      }
    } catch (error) {
      console.error("❌ Dashboard login failed:", error)
      
      if (error.response?.status === 401) {
        setError("Invalid email or password")
      } else if (error.response?.status === 403) {
        setError("Your ticket is not yet approved. Please wait for approval email.")
      } else if (error.response?.data?.message) {
        setError(error.response.data.message)
      } else {
        setError("Login failed. Please try again.")
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-black relative flex items-center justify-center px-4 overflow-hidden">
      {/* Background Beams Animation */}
      <BackgroundBeams className="opacity-80" />
      
      <div className="w-full max-w-md relative z-10">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="mx-auto w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mb-4 backdrop-blur-sm">
            <User className="w-8 h-8 text-white" />
          </div>
          <div className="flex justify-center">
            <TypewriterEffectSmooth
              words={[
                {
                  text: "Login",
                },
                {
                  text: "to",
                },
                {
                  text: "your",
                },
                {
                  text: "MEDCON'25",
                  className: "text-blue-400",
                },
                {
                  text: "dashboard",
                },
              ]}
              className="text-white font-bold"
              cursorClassName="bg-blue-400"
            />
          </div>
          <p className="text-gray-300 mt-4">
            Enter your ticket credentials to access your dashboard
          </p>
        </div>

        {/* Login Form */}
        <div className="bg-black/40 backdrop-blur-md rounded-2xl p-8 border border-white/10 shadow-2xl">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Field */}
            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-4 py-3 border border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-black/50 backdrop-blur-sm text-white placeholder-gray-400"
                  placeholder="Enter your email address"
                  required
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Dashboard Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-12 py-3 border border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-black/50 backdrop-blur-sm text-white placeholder-gray-400"
                  placeholder="Enter your dashboard password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-300"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3">
                <p className="text-red-400 text-sm">{error}</p>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold py-3 px-4 rounded-xl transition-all duration-200 flex items-center justify-center backdrop-blur-sm"
            >
              {isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Signing in...
                </>
              ) : (
                "Access Dashboard"
              )}
            </button>
          </form>

          {/* Help Text */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-300">
              Use the email and password you provided during ticket booking
            </p>
            <p className="text-xs text-gray-400 mt-2">
              Don't have a ticket?{" "}
              <a href="/comingsoon" className="text-blue-400 hover:text-blue-300">
                Book your ticket here
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
} 