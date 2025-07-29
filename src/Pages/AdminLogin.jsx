"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import { Eye, EyeOff, Lock, Mail, Shield } from "lucide-react"
import { TypewriterEffectSmooth } from "../Components/TypewriterEffect"
import { BackgroundBeams } from "../Components/BackgroundBeams"

export default function AdminLogin() {
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
        "https://gimsoc-backend.onrender.com/api/admin-auth/login",
        formData,
        {
          withCredentials: true,
        }
      )

      console.log("✅ Admin login successful:", response.data)
      
      // Verify that the login was successful
      if (response.data.message === "Admin login successful") {
        // Store admin data in localStorage for admin dashboard access
        localStorage.setItem('adminData', JSON.stringify(response.data.admin))
        localStorage.setItem('adminEmail', formData.email)
        
        // Redirect to admin dashboard
        navigate("/adminpage")
      } else {
        // Unexpected response
        setError("Login failed. Please try again.")
      }
    } catch (error) {
      console.error("❌ Admin login failed:", error)
      
      if (error.response?.status === 401) {
        setError("Invalid email or password")
      } else if (error.response?.status === 403) {
        setError("Your admin account is inactive. Please contact the administrator.")
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
    <div className="min-h-screen flex items-center justify-center bg-black relative overflow-hidden">
      <BackgroundBeams />
      
      <div className="relative z-10 w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <Shield className="h-12 w-12 text-blue-500" />
          </div>
          <TypewriterEffectSmooth
            words={[
              {
                text: "Admin",
                className: "text-4xl font-bold text-white",
              },
              {
                text: "Dashboard",
                className: "text-4xl font-bold text-blue-500",
              },
            ]}
          />
          <p className="text-gray-400 mt-4">
            Restricted access for authorized administrators only
          </p>
        </div>

        {/* Login Form */}
        <div className="bg-black/40 backdrop-blur-md rounded-2xl p-8 border border-white/10 shadow-2xl">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Field */}
            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Admin Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-4 py-3 border border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-black/50 backdrop-blur-sm text-white placeholder-gray-400"
                  placeholder="Enter your admin email"
                  required
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Admin Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-12 py-3 border border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-black/50 backdrop-blur-sm text-white placeholder-gray-400"
                  placeholder="Enter your admin password"
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
                "Access Admin Dashboard"
              )}
            </button>
          </form>

          {/* Security Notice */}
          <div className="mt-6 text-center">
            <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-3 mb-4">
              <p className="text-yellow-400 text-sm">
                <Shield className="inline w-4 h-4 mr-1" />
                <strong>Security Notice:</strong> This area is restricted to authorized administrators only.
              </p>
            </div>
            <p className="text-xs text-gray-400">
              If you need admin access, please contact the system administrator.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
} 