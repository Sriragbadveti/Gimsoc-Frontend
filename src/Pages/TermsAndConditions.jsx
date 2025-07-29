"use client"

import { useState, useEffect } from "react"
import { Shield, FileText, CheckCircle, AlertTriangle, Camera, Users, CreditCard, Calendar, Lock } from "lucide-react"
import { useNavigate } from "react-router-dom"

export default function TermsAndConditions() {
  const navigate = useNavigate()
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const sections = [
    {
      id: 1,
      title: "Ticket Purchase and Registration",
      icon: <CreditCard className="w-6 h-6 text-blue-600" />,
      items: [
        "All registrations are subject to availability and acceptance.",
        "Ticket prices are stated on the website and are inclusive of applicable taxes, unless otherwise specified.",
        "Registration is only confirmed upon successful payment and receipt of a confirmation email.",
        "Tickets are non-transferable/non-refundable unless explicitly stated or approved by the event organizers."
      ]
    },
    {
      id: 2,
      title: "Payment Terms",
      icon: <CheckCircle className="w-6 h-6 text-green-600" />,
      items: [
        "Full payment is required at the time of booking through the designated online payment platform.",
        "We accept major credit/debit cards (added option of Paypal for international attendees) as made available via our payment gateway partner.",
        "MEDCON'25, GIMSOC reserves the right to cancel unpaid or partially paid registrations."
      ]
    },
    {
      id: 3,
      title: "Cancellation and Refund Policy",
      icon: <AlertTriangle className="w-6 h-6 text-orange-600" />,
      items: [
        "Cancellations are not viable unless explicitly stated or approved by event organizers.",
        "No refunds will be made for non-attendance."
      ]
    },
    {
      id: 4,
      title: "Event Changes",
      icon: <Calendar className="w-6 h-6 text-purple-600" />,
      items: [
        "The organizers reserve the right to make changes to the event program, speakers, timing, or venue at any time.",
        "Notice of any changes will be posted on the website or communicated via the registered email address, on all official social media pages."
      ]
    },
    {
      id: 5,
      title: "Code of Conduct",
      icon: <Users className="w-6 h-6 text-indigo-600" />,
      items: [
        "All attendees are expected to behave professionally and respectfully.",
        "Harassment, discrimination, or any form of misconduct will result in immediate removal from the event without refund.",
        "Attendees must follow all health and safety protocols as outlined by the organizers or venue authorities."
      ]
    },
    {
      id: 6,
      title: "Use of Likeness",
      icon: <Camera className="w-6 h-6 text-pink-600" />,
      items: [
        "By attending the event, you consent to being photographed, filmed, or recorded.",
        "These materials may be used by MEDCON'25 GIMSOC for promotional, educational, or archival purposes without compensation."
      ]
    },
    {
      id: 7,
      title: "Privacy",
      icon: <Lock className="w-6 h-6 text-teal-600" />,
      items: [
        "Your personal information will be used only for conference-related communication and processing, as outlined in our Privacy Policy.",
        "Your data will not be shared with third parties without consent, except for essential service providers involved in conference management."
      ]
    },
    {
      id: 8,
      title: "Liability Disclaimer",
      icon: <Shield className="w-6 h-6 text-red-600" />,
      items: [
        "MEDCON'25, GIMSOC is not liable for personal injury, loss, or damage to property during the event.",
        "Travel and accommodation arrangements are the responsibility of the attendee (exception: 7 day package registered, International attendees).",
        "In case of unforeseen circumstances (force majeure), the organizers are not responsible for event delays or cancellations."
      ]
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute top-40 right-20 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-40 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-4000"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 min-h-screen py-8 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className={`text-center mb-12 transform transition-all duration-1000 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}>
            <div className="flex items-center justify-center mb-6">
              <div className="p-4 bg-white/10 backdrop-blur-sm rounded-full mr-4">
                <FileText className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-white">Terms and Conditions</h1>
            </div>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Welcome to MEDCON'25, GIMSOC. By purchasing a ticket for the conference hosted via www.medcongimsoc.com, 
              you agree to abide by the following Terms and Conditions. Please read them carefully before proceeding with your registration.
            </p>
          </div>

          {/* Terms Sections */}
          <div className="space-y-8">
            {sections.map((section, index) => (
              <div
                key={section.id}
                className={`bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 p-8 shadow-2xl transform transition-all duration-1000 ${
                  isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="flex items-center mb-6">
                  <div className="p-3 bg-white/20 rounded-xl mr-4">
                    {section.icon}
                  </div>
                  <h2 className="text-2xl font-bold text-white">{section.title}</h2>
                </div>
                
                <div className="space-y-4">
                  {section.items.map((item, itemIndex) => (
                    <div key={itemIndex} className="flex items-start">
                      <div className="w-2 h-2 bg-blue-400 rounded-full mt-3 mr-4 flex-shrink-0"></div>
                      <p className="text-gray-200 leading-relaxed">{item}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Footer */}
          <div className={`mt-12 text-center transform transition-all duration-1000 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`} style={{ transitionDelay: "800ms" }}>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 p-8">
              <h3 className="text-2xl font-bold text-white mb-4">Important Notice</h3>
              <p className="text-gray-300 mb-6">
                By proceeding with your ticket purchase, you acknowledge that you have read, understood, and agree to be bound by these Terms and Conditions.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={() => navigate("/tickets")}
                  className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold rounded-xl hover:from-blue-600 hover:to-purple-600 transform hover:scale-105 transition-all duration-300 shadow-lg"
                >
                  Proceed to Tickets
                </button>
                <button
                  onClick={() => navigate("/")}
                  className="px-8 py-4 bg-white/20 backdrop-blur-sm text-white font-semibold rounded-xl border border-white/30 hover:bg-white/30 transition-all duration-300"
                >
                  Back to Home
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/50 to-transparent"></div>
    </div>
  )
} 