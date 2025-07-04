"use client"

import { useState } from "react"
import {
  Upload,
  User,
  GraduationCap,
  Camera,
  Utensils,
  CreditCard,
  FileText,
  AlertTriangle,
  CheckCircle,
  Calendar,
} from "lucide-react"
import axios from "axios"
import PayPalButton from "../Components/PaypalButton"

export default function InternationalTicket() {
  // Payment states - exactly like individual ticket
  const [paymentCompleted, setPaymentCompleted] = useState(false)
  const [paymentDetails, setPaymentDetails] = useState(null)

  const [isSubmitting, setIsSubmitting] = useState(false)

  const [formData, setFormData] = useState({
    // Ticket Duration
    ticketDuration: "",

    fullName: "",
    email: "",
    whatsapp: "",
    nationality: "",
    countryOfResidence: "",
    passportNumber: "",
    needsVisaSupport: "",
    universityName: "",
    yearOfStudy: "",
    studentIdProof: null,
    headshot: null,
    foodPreference: "",
    dietaryRestrictions: "",
    accessibilityNeeds: "",
    emergencyContactName: "",
    emergencyContactRelationship: "",
    emergencyContactPhone: "",
    infoAccurate: false,
    mediaConsent: "",
    policies: false,
    emailConsent: false,
    whatsappConsent: false,
    paymentMethod: "",
    paymentProof: null,
  })

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }))
  }

  const handleFileChange = (e) => {
    const { name, files } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: files[0],
    }))
  }

  // PayPal payment handlers - exactly like individual ticket
  const handlePaymentSuccess = (details) => {
    console.log("Payment successful:", details)
    setPaymentCompleted(true)
    setPaymentDetails(details)
    alert("Payment completed successfully!")
  }

  const handlePaymentError = (error) => {
    console.error("Payment failed:", error)
    alert("Payment failed. Please try again.")
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    // Check if payment is required and completed - same logic as individual ticket
    if (formData.paymentMethod === "Credit/Debit Card" && !paymentCompleted) {
      alert("Please complete the payment before submitting the form.")
      return
    }

    setIsSubmitting(true)

    const form = new FormData()
    form.append("ticketType", "International")

    Object.entries(formData).forEach(([key, value]) => {
      if (value !== null && value !== undefined) {
        if (["infoAccurate", "policies", "emailConsent", "whatsappConsent"].includes(key)) {
          form.append(key, value === true || value === "true" || value === "Yes")
        } else if (["isGimsocMember", "mediaConsent"].includes(key)) {
          form.append(key, value === "Yes")
        } else if (key === "headshot" || key === "paymentProof" || key === "studentIdProof") {
          form.append(key, value)
        } else {
          form.append(key, value)
        }
      }
    })

    // Add payment details if payment was completed - same as individual ticket
    if (paymentDetails) {
      form.append("paymentDetails", JSON.stringify(paymentDetails))
      form.append("paymentStatus", "completed")
    }

    try {
      const response = await axios.post("https://gimsoc-backend.onrender.com/api/form/submit", form, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      })

      console.log("✅ Submitted successfully:", response.data)
      alert("Form submitted successfully!")
      window.location.href = "/ticket-success"
    } catch (err) {
      console.error("❌ Submission failed:", err.response?.data || err.message)
      alert("Form submission failed.")
    } finally {
      setIsSubmitting(false)
    }
  }

  // Calculate price based on ticket duration
  const calculatePrice = () => {
    if (formData.ticketDuration === "3-day") {
      return 100 // 3-day International Ticket price
    } else if (formData.ticketDuration === "7-day") {
      return 125 // 7-day International Ticket price
    } else {
      return 125 // Default price if no selection
    }
  }

  const yearOptions = Array.from({ length: 12 }, (_, i) => `${i + 1}`).concat(["Graduated"])

  const countries = [
    "Afghanistan",
    "Albania",
    "Algeria",
    "Argentina",
    "Armenia",
    "Australia",
    "Austria",
    "Azerbaijan",
    "Bahrain",
    "Bangladesh",
    "Belarus",
    "Belgium",
    "Brazil",
    "Bulgaria",
    "Canada",
    "China",
    "Croatia",
    "Czech Republic",
    "Denmark",
    "Egypt",
    "Estonia",
    "Finland",
    "France",
    "Germany",
    "Ghana",
    "Greece",
    "Hungary",
    "Iceland",
    "India",
    "Indonesia",
    "Iran",
    "Iraq",
    "Ireland",
    "Israel",
    "Italy",
    "Japan",
    "Jordan",
    "Kazakhstan",
    "Kenya",
    "Kuwait",
    "Latvia",
    "Lebanon",
    "Lithuania",
    "Luxembourg",
    "Malaysia",
    "Mexico",
    "Morocco",
    "Netherlands",
    "New Zealand",
    "Nigeria",
    "Norway",
    "Pakistan",
    "Philippines",
    "Poland",
    "Portugal",
    "Qatar",
    "Romania",
    "Russia",
    "Saudi Arabia",
    "Singapore",
    "South Africa",
    "South Korea",
    "Spain",
    "Sri Lanka",
    "Sweden",
    "Switzerland",
    "Syria",
    "Thailand",
    "Turkey",
    "Ukraine",
    "United Arab Emirates",
    "United Kingdom",
    "United States",
    "Uzbekistan",
    "Vietnam",
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-6">
            <h1 className="text-3xl font-bold text-white text-center">International Students Registration</h1>
            <p className="text-blue-100 text-center mt-2">Welcome international medical students</p>

            {/* Dynamic Price Display */}
            <div className="text-center mt-4">
              <div className="inline-block bg-white/20 backdrop-blur-sm rounded-lg px-6 py-3">
                <span className="text-white text-lg font-medium">Ticket Price: </span>
                <span className="text-white text-2xl font-bold">{calculatePrice()} GEL</span>
                {formData.ticketDuration && (
                  <div className="text-blue-100 text-sm mt-1">
                    {formData.ticketDuration === "3-day" ? "3-Day Conference Package" : "7-Day Full Conference Package"}
                  </div>
                )}
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="p-8 space-y-10">
            {/* Ticket Duration Selection */}
            <section className="space-y-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <Calendar className="w-6 h-6 text-purple-600" />
                </div>
                <h2 className="text-2xl font-semibold text-gray-800">Conference Duration</h2>
              </div>

              <div className="bg-purple-50 border border-purple-200 rounded-lg p-6">
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Select your conference ticket duration *
                </label>
                <div className="space-y-3">
                  <label className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:bg-white cursor-pointer transition-all">
                    <input
                      type="radio"
                      name="ticketDuration"
                      value="3-day"
                      checked={formData.ticketDuration === "3-day"}
                      onChange={handleInputChange}
                      className="text-purple-600 focus:ring-purple-500"
                      required
                    />
                    <div className="flex-1">
                      <span className="text-gray-700 font-medium">3-Day Conference Package</span>
                      <p className="text-sm text-gray-600">Access to main conference days (Day 1-3)</p>
                    </div>
                    <span className="text-purple-600 text-lg font-bold">100 GEL</span>
                  </label>

                  <label className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:bg-white cursor-pointer transition-all">
                    <input
                      type="radio"
                      name="ticketDuration"
                      value="7-day"
                      checked={formData.ticketDuration === "7-day"}
                      onChange={handleInputChange}
                      className="text-purple-600 focus:ring-purple-500"
                      required
                    />
                    <div className="flex-1">
                      <span className="text-gray-700 font-medium">7-Day Full Conference Package</span>
                      <p className="text-sm text-gray-600">Complete access to all conference activities (Day 1-7)</p>
                    </div>
                    <span className="text-purple-600 text-lg font-bold">125 GEL</span>
                  </label>
                </div>
              </div>
            </section>

            {/* Personal Information */}
            <section className="space-y-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <User className="w-6 h-6 text-blue-600" />
                </div>
                <h2 className="text-2xl font-semibold text-gray-800">Personal Information</h2>
              </div>

              <div className="grid md:grid-cols-1 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="Enter your full legal name"
                    required
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    As it appears on your passport (for ID card and certificate)
                  </p>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email Address *</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      placeholder="Enter a valid email address"
                      required
                    />
                    <p className="text-xs text-gray-500 mt-1">For all official conference communication</p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      WhatsApp Number (with country code) *
                    </label>
                    <input
                      type="tel"
                      name="whatsapp"
                      value={formData.whatsapp}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      placeholder="+1 XXX XXX XXXX"
                      required
                    />
                    <p className="text-xs text-gray-500 mt-1">Used for urgent updates and conference reminders</p>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Nationality *</label>
                    <select
                      name="nationality"
                      value={formData.nationality}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      required
                    >
                      <option value="">Select your nationality</option>
                      {countries.map((country, index) => (
                        <option key={index} value={country}>
                          {country}
                        </option>
                      ))}
                    </select>
                    <p className="text-xs text-gray-500 mt-1">As in your passport</p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Country of Residence *</label>
                    <select
                      name="countryOfResidence"
                      value={formData.countryOfResidence}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      required
                    >
                      <option value="">Select country of residence</option>
                      {countries.map((country, index) => (
                        <option key={index} value={country}>
                          {country}
                        </option>
                      ))}
                    </select>
                    <p className="text-xs text-gray-500 mt-1">Where are you currently living or studying?</p>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Passport Number *</label>
                  <input
                    type="text"
                    name="passportNumber"
                    value={formData.passportNumber}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="Enter your passport number"
                    required
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Required for international ID verification and visa assistance if applicable
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Do you need a visa support/invitation letter? *
                  </label>
                  <div className="space-y-2">
                    {["Yes", "No"].map((option) => (
                      <label key={option} className="flex items-center space-x-2 cursor-pointer">
                        <input
                          type="radio"
                          name="needsVisaSupport"
                          value={option}
                          checked={formData.needsVisaSupport === option}
                          onChange={handleInputChange}
                          className="text-blue-600 focus:ring-blue-500"
                          required
                        />
                        <span className="text-sm text-gray-700">{option}</span>
                      </label>
                    ))}
                  </div>
                  {formData.needsVisaSupport === "Yes" && (
                    <div className="mt-3 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                      <p className="text-sm text-blue-700">
                        We will contact you for additional information required for visa support documentation.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </section>

            {/* Academic Information */}
            <section className="space-y-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-green-100 rounded-lg">
                  <GraduationCap className="w-6 h-6 text-green-600" />
                </div>
                <h2 className="text-2xl font-semibold text-gray-800">Academic Information</h2>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">University Name *</label>
                  <input
                    type="text"
                    name="universityName"
                    value={formData.universityName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="Enter the full name of your university or medical school"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Current Year/Semester of Study *
                  </label>
                  <select
                    name="yearOfStudy"
                    value={formData.yearOfStudy}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    required
                  >
                    <option value="">Select your current year/semester</option>
                    {yearOptions.map((year, index) => (
                      <option key={index} value={year}>
                        {year}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Upload a Valid Student ID or Enrollment Proof *
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors">
                  <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                  <input
                    type="file"
                    name="studentIdProof"
                    onChange={handleFileChange}
                    accept="image/*,.pdf"
                    className="hidden"
                    id="student-id-upload"
                    required
                  />
                  <label htmlFor="student-id-upload" className="cursor-pointer">
                    <span className="text-blue-600 hover:text-blue-700 font-medium">Click to upload</span>
                    <span className="text-gray-500"> or drag and drop</span>
                  </label>
                  <p className="text-xs text-gray-500 mt-1">Required for student registration validation</p>
                  {formData.studentIdProof && (
                    <p className="text-sm text-green-600 mt-2">✓ File selected: {formData.studentIdProof.name}</p>
                  )}
                </div>
              </div>
            </section>

            {/* Identification */}
            <section className="space-y-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-orange-100 rounded-lg">
                  <Camera className="w-6 h-6 text-orange-600" />
                </div>
                <h2 className="text-2xl font-semibold text-gray-800">Identification</h2>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Upload a Headshot for Conference ID Card
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors">
                  <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                  <input
                    type="file"
                    name="headshot"
                    onChange={handleFileChange}
                    accept="image/*"
                    className="hidden"
                    id="headshot-upload"
                  />
                  <label htmlFor="headshot-upload" className="cursor-pointer">
                    <span className="text-blue-600 hover:text-blue-700 font-medium">Click to upload</span>
                    <span className="text-gray-500"> or drag and drop</span>
                  </label>
                  <p className="text-xs text-gray-500 mt-1">
                    A clear, front-facing photo (passport-style) with a plain background
                  </p>
                  {formData.headshot && (
                    <p className="text-sm text-green-600 mt-2">✓ File selected: {formData.headshot.name}</p>
                  )}
                </div>
              </div>
            </section>

            {/* Food Preferences */}
            <section className="space-y-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-red-100 rounded-lg">
                  <Utensils className="w-6 h-6 text-red-600" />
                </div>
                <h2 className="text-2xl font-semibold text-gray-800">Food Preferences and Health Needs</h2>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">Preferred Food Option *</label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {["Vegetarian", "Non-Vegetarian Halal"].map((option) => (
                    <label key={option} className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="radio"
                        name="foodPreference"
                        value={option}
                        checked={formData.foodPreference === option}
                        onChange={handleInputChange}
                        className="text-blue-600 focus:ring-blue-500"
                        required
                      />
                      <span className="text-sm text-gray-700">{option}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Dietary Restrictions</label>
                  <textarea
                    name="dietaryRestrictions"
                    value={formData.dietaryRestrictions}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    rows="3"
                    placeholder="e.g., gluten-free, halal, nut allergies"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Accessibility or Health Needs</label>
                  <textarea
                    name="accessibilityNeeds"
                    value={formData.accessibilityNeeds}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    rows="3"
                    placeholder="Any accessibility or health needs we should be aware of"
                  />
                </div>
              </div>
            </section>

            {/* Emergency Contact */}
            <section className="space-y-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-red-100 rounded-lg">
                  <AlertTriangle className="w-6 h-6 text-red-600" />
                </div>
                <h2 className="text-2xl font-semibold text-gray-800">Emergency Contact</h2>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Emergency Contact Name *</label>
                  <input
                    type="text"
                    name="emergencyContactName"
                    value={formData.emergencyContactName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="Full name"
                    required
                  />
                  <label className="block text-sm font-medium text-gray-700 mb-2 mt-4">Relationship *</label>
                  <input
                    type="text"
                    name="emergencyContactRelationship"
                    value={formData.emergencyContactRelationship}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="Relationship (e.g., Parent, Spouse, Sibling)"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Emergency Contact Phone Number (with country code) *
                  </label>
                  <input
                    type="tel"
                    name="emergencyContactPhone"
                    value={formData.emergencyContactPhone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="+1 XXX XXX XXXX"
                    required
                  />
                </div>
              </div>
            </section>

            {/* Declarations */}
            <section className="space-y-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-indigo-100 rounded-lg">
                  <FileText className="w-6 h-6 text-indigo-600" />
                </div>
                <h2 className="text-2xl font-semibold text-gray-800">Declarations</h2>
              </div>

              <div className="space-y-4">
                <label className="flex items-start space-x-3 cursor-pointer">
                  <input
                    type="checkbox"
                    name="infoAccurate"
                    checked={formData.infoAccurate}
                    onChange={handleInputChange}
                    className="mt-1 text-blue-600 focus:ring-blue-500"
                    required
                  />
                  <span className="text-sm text-gray-700">
                    I confirm that all the information provided is accurate to the best of my knowledge. *
                  </span>
                </label>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">Media Consent *</label>
                  <p className="text-sm text-gray-600 mb-3">
                    Do you consent to the use of photos/videos taken of you during the event for promotional purposes?
                  </p>
                  <div className="space-y-2">
                    {["Yes", "No"].map((option) => (
                      <label key={option} className="flex items-center space-x-2 cursor-pointer">
                        <input
                          type="radio"
                          name="mediaConsent"
                          value={option}
                          checked={formData.mediaConsent === option}
                          onChange={handleInputChange}
                          className="text-blue-600 focus:ring-blue-500"
                          required
                        />
                        <span className="text-sm text-gray-700">{option}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <label className="flex items-start space-x-3 cursor-pointer">
                  <input
                    type="checkbox"
                    name="policies"
                    checked={formData.policies}
                    onChange={handleInputChange}
                    className="mt-1 text-blue-600 focus:ring-blue-500"
                    required
                  />
                  <span className="text-sm text-gray-700">
                    I agree to comply with all conference policies, rules, and guidelines. *
                  </span>
                </label>

                <label className="flex items-start space-x-3 cursor-pointer">
                  <input
                    type="checkbox"
                    name="emailConsent"
                    checked={formData.emailConsent}
                    onChange={handleInputChange}
                    className="mt-1 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-700">
                    I agree to receive emails from GIMSOC, including updates, resources, and conference-related
                    information
                  </span>
                </label>

                <label className="flex items-start space-x-3 cursor-pointer">
                  <input
                    type="checkbox"
                    name="whatsappConsent"
                    checked={formData.whatsappConsent}
                    onChange={handleInputChange}
                    className="mt-1 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-700">
                    I consent to be added to our WhatsApp group for updates, discussions, and announcements related to
                    MEDCON
                  </span>
                </label>
              </div>
            </section>

            {/* Payment Confirmation */}
            <section className="space-y-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-yellow-100 rounded-lg">
                  <CreditCard className="w-6 h-6 text-yellow-600" />
                </div>
                <h2 className="text-2xl font-semibold text-gray-800">Payment Confirmation</h2>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-medium text-gray-700">Total Amount:</span>
                  <span className="text-2xl font-bold text-blue-600">{calculatePrice()} GEL</span>
                </div>
                <p className="text-sm text-gray-600 mt-1">
                  {formData.ticketDuration === "3-day"
                    ? "3-Day International Student Ticket"
                    : formData.ticketDuration === "7-day"
                      ? "7-Day International Student Ticket"
                      : "International Student Ticket"}
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  How will you be making the payment? *
                </label>
                <div className="space-y-3">
                  {["Credit/Debit Card", "Bank Transfer"].map((method) => (
                    <label
                      key={method}
                      className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer transition-all"
                    >
                      <input
                        type="radio"
                        name="paymentMethod"
                        value={method}
                        checked={formData.paymentMethod === method}
                        onChange={handleInputChange}
                        className="text-blue-600 focus:ring-blue-500"
                        required
                      />
                      <span className="text-gray-700">{method}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* PayPal Button for Credit Card - exactly like individual ticket */}
              {formData.paymentMethod === "Credit/Debit Card" && (
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
                  <h3 className="text-lg font-medium text-gray-800 mb-4">Complete Your Payment</h3>
                  <div className="mb-4">
                    <div className="flex justify-between text-sm text-gray-600 mb-2">
                      <span>Amount to pay:</span>
                      <span className="font-medium">{calculatePrice()} GEL</span>
                    </div>
                  </div>

                  {!paymentCompleted ? (
                    <PayPalButton
                      amount={calculatePrice()}
                      onSuccess={handlePaymentSuccess}
                      onError={handlePaymentError}
                    />
                  ) : (
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-center gap-3">
                      <CheckCircle className="w-6 h-6 text-green-600" />
                      <div>
                        <p className="text-green-800 font-medium">Payment Completed Successfully!</p>
                        <p className="text-green-600 text-sm">Transaction ID: {paymentDetails?.id || "N/A"}</p>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {formData.paymentMethod === "Bank Transfer" && (
                <div className="space-y-6">
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-blue-800 mb-4">Bank Details for Transfer</h3>

                    <div className="space-y-4">
                      <div className="bg-white rounded-lg p-4 border border-blue-100">
                        <h4 className="font-semibold text-gray-800 mb-3">BANK OF GEORGIA</h4>
                        <div className="space-y-2 text-sm">
                          <p>
                            <span className="font-medium">Account with institution:</span> Bank of Georgia
                          </p>
                          <p>
                            <span className="font-medium">SWIFT:</span> BAGAGE22
                          </p>
                          <p>
                            <span className="font-medium">Beneficiary:</span> FERNANDO MANDRIKA SANTOSH U.
                          </p>
                          <p>
                            <span className="font-medium">Account:</span> GE94BG0000000608342766
                          </p>
                          <p>
                            <span className="font-medium">Phone:</span> (+995 32) 2 444 444
                          </p>
                          <p>
                            <span className="font-medium">E-mail:</span> welcome@bog.ge
                          </p>
                        </div>
                      </div>

                      <div className="bg-white rounded-lg p-4 border border-blue-100">
                        <h4 className="font-semibold text-gray-800 mb-3">TBC BANK</h4>
                        <div className="space-y-2 text-sm">
                          <p>
                            <span className="font-medium">Beneficiary's Bank:</span> JSC TBC Bank
                          </p>
                          <p>
                            <span className="font-medium">Location:</span> Tbilisi, Georgia
                          </p>
                          <p>
                            <span className="font-medium">Swift:</span> TBCBGE22
                          </p>
                          <p>
                            <span className="font-medium">Beneficiary's IBAN:</span> GE31TB7724245061200012
                          </p>
                          <p>
                            <span className="font-medium">Name of Beneficiary:</span> Mandrika Santosh Umanga Fernando
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Upload Proof of Payment *</label>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors">
                      <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                      <input
                        type="file"
                        name="paymentProof"
                        onChange={handleFileChange}
                        accept=".pdf"
                        className="hidden"
                        id="payment-upload"
                        required
                      />
                      <label htmlFor="payment-upload" className="cursor-pointer">
                        <span className="text-blue-600 hover:text-blue-700 font-medium">Click to upload</span>
                        <span className="text-gray-500"> or drag and drop</span>
                      </label>
                      <p className="text-xs text-gray-500 mt-1">PDF format only - Bank transfer confirmation</p>
                      {formData.paymentProof && (
                        <p className="text-sm text-green-600 mt-2">✓ File selected: {formData.paymentProof.name}</p>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </section>

            {/* Submit Button */}
            <div className="pt-6">
              <button
                type="submit"
                disabled={isSubmitting || (formData.paymentMethod === "Credit/Debit Card" && !paymentCompleted)}
                className={`w-full py-4 px-6 rounded-lg font-semibold text-lg transition-all transform hover:scale-[1.02] ${
                  isSubmitting || (formData.paymentMethod === "Credit/Debit Card" && !paymentCompleted)
                    ? "bg-gray-400 text-gray-600 cursor-not-allowed"
                    : "bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700 focus:ring-4 focus:ring-blue-200"
                }`}
              >
                {isSubmitting ? "Submitting..." : `Submit International Registration - ${calculatePrice()} GEL`}
              </button>

              {formData.paymentMethod === "Credit/Debit Card" && !paymentCompleted && (
                <p className="text-sm text-gray-500 text-center mt-2">
                  Please complete the payment above before submitting
                </p>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
