"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { 
  User, 
  Mail, 
  Phone, 
  GraduationCap, 
  MapPin, 
  Clock, 
  Upload, 
  CheckCircle, 
  AlertCircle, 
  Loader2, 
  XCircle, 
  Sparkles, 
  ArrowRight, 
  Star, 
  BookOpen, 
  Shield, 
  Heart, 
  Zap, 
  Camera,
  CreditCard,
  Building,
  Globe,
  Users,
  FileText,
  Crown,
  Utensils,
  ShieldCheck
} from "lucide-react"

const UNIVERSITIES = [
  "Tbilisi State Medical University (TSMU)",
  "David Tvildiani Medical University (DTMU)",
  "University of Georgia (UG)",
  "Caucasus International University (CIU)",
  "Caucasus University (CU)",
  "Georgian American University (GAU)",
  "East European University (EEU)",
  "New Vision University (NVU)",
  "Petre Shotadze Tbilisi Medical Academy (TMA)",
  "European University (EU)",
  "Alte University",
  "Ivane Javakhishvili Tbilisi State University (TSU – Faculty of Medicine)",
  "Gruni (David Agmashenebeli University of Georgia)",
  "Ken Walker International University (KWIU)",
  "University Geomedi",
  "Ilia State University (ISU)",
  "Georgian National University (SEU)",
  "Akaki Tsereteli State University (ATSU – Faculty of Medicine)",
  "BAU International University, Batumi (BAU)",
  "Batumi Shota Rustaveli State University (BSU – Faculty of Medicine)"
]

const SEMESTER_OPTIONS = [
  "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "Graduated"
]

const EXAM_OPTIONS = [
  "USMLE",
  "AMC",
  "PLAB",
  "FMGE",
  "EMREE",
  "IFOM",
  "Other"
]

const FOOD_OPTIONS = [
  "Vegetarian",
  "Vegan",
  "Non-Vegetarian",
  "Non-Vegetarian (Halal)"
]

export default function BasicTicket() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    whatsapp: "",
    university: "",
    otherUniversity: "",
    currentSemester: "",
    examPreparation: "",
    otherExam: "",
    headshot: null,
    foodPreference: "",
    dietaryRestrictions: "",
    accessibilityNeeds: "",
    isGimsocMember: "",
    gimsocCode: "",
    declarationAccurate: false,
    mediaConsent: "",
    policyCompliance: false,
    emailConsent: false,
    whatsappConsent: false,
    paymentMethod: "",
    paymentProof: null
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState(null)

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleFileChange = (event) => {
    const file = event.target.files[0]
    const fieldName = event.target.name
    
    if (fieldName === "headshot") {
      if (file && (file.type === "image/jpeg" || file.type === "image/png")) {
        if (file.size > 5 * 1024 * 1024) {
          alert("File size must be less than 5MB.")
          return
        }
        setFormData(prev => ({
          ...prev,
          headshot: file
        }))
      } else {
        alert("Please upload a JPEG or PNG image file only.")
      }
    } else if (fieldName === "paymentProof") {
      if (file && (file.type === "image/jpeg" || file.type === "image/png")) {
        if (file.size > 5 * 1024 * 1024) {
          alert("File size must be less than 5MB.")
          return
        }
        setFormData(prev => ({
          ...prev,
          paymentProof: file
        }))
      } else {
        alert("Please upload a JPEG or PNG image file only.")
      }
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    try {
      const formDataToSend = new FormData()
      
      // Add all form fields
      Object.keys(formData).forEach(key => {
        if (key === "headshot" || key === "paymentProof") {
          if (formData[key]) {
            formDataToSend.append(key, formData[key])
          }
        } else if (key === "declarationAccurate" || key === "policyCompliance" || key === "emailConsent" || key === "whatsappConsent") {
          formDataToSend.append(key, formData[key] ? "true" : "false")
        } else {
          formDataToSend.append(key, formData[key] || "")
        }
      })

      // Determine ticket type based on GIMSOC membership
      const ticketType = formData.isGimsocMember === "Yes" ? "GIMSOC Member Basic" : "Non-GIMSOC Member Basic"
      const price = formData.isGimsocMember === "Yes" ? "30 GEL / 1000 INR" : "40 GEL / 1320 INR"
      
      // Add ticket type
      formDataToSend.append('ticketType', ticketType)
      formDataToSend.append('ticketCategory', 'Basic')
      formDataToSend.append('subType', formData.isGimsocMember === "Yes" ? "GIMSOC" : "Non-GIMSOC")
      formDataToSend.append('price', price)
      
      const response = await fetch('https://gimsoc-backend.onrender.com/api/form/submit', {
        method: 'POST',
        body: formDataToSend
      })
      
      const result = await response.json()
      
      if (result.success) {
        setSubmitStatus("success")
      } else {
        throw new Error(result.message || 'Registration failed')
      }
    } catch (error) {
      console.error('Registration error:', error)
      setSubmitStatus("error")
      alert(`Registration failed: ${error.message}`)
    } finally {
      setIsSubmitting(false)
    }
  }

  const resetForm = () => {
    setFormData({
      fullName: "",
      email: "",
      whatsapp: "",
      university: "",
      otherUniversity: "",
      currentSemester: "",
      examPreparation: "",
      otherExam: "",
      headshot: null,
      foodPreference: "",
      dietaryRestrictions: "",
      accessibilityNeeds: "",
      isGimsocMember: "",
      gimsocCode: "",
      declarationAccurate: false,
      mediaConsent: "",
      policyCompliance: false,
      emailConsent: false,
      whatsappConsent: false,
      paymentMethod: "",
      paymentProof: null
    })
    setSubmitStatus(null)
  }

  const getPriceDisplay = () => {
    if (formData.isGimsocMember === "Yes") {
      return "30 GEL / 1000 INR"
    } else if (formData.isGimsocMember === "No") {
      return "40 GEL / 1320 INR"
    }
    return "Select membership status to see price"
  }

  if (submitStatus === "success") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full text-center">
          <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Registration Successful!</h2>
          <p className="text-gray-600 mb-6">
            Thank you for registering for MEDCON'25 Basic Ticket. 
            You will receive a confirmation email shortly.
          </p>
          <button
            onClick={resetForm}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Register Another Ticket
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.div 
          className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-green-600 to-teal-600 p-8 text-white relative overflow-hidden">
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white rounded-full -translate-y-16 translate-x-16"></div>
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-white rounded-full translate-y-12 -translate-x-12"></div>
            </div>
            
            <div className="relative">
              <div className="flex items-center gap-4 mb-4">
                <motion.div
                  className="p-3 bg-white bg-opacity-20 rounded-xl backdrop-blur-sm"
                  whileHover={{ rotate: 5, scale: 1.1 }}
                >
                  <Users className="w-8 h-8" />
                </motion.div>
                <div>
                  <h1 className="text-3xl font-bold mb-2">Basic Ticket</h1>
                  <p className="text-white text-opacity-90 text-sm">{getPriceDisplay()}</p>
                </div>
              </div>
              
              <div className="bg-white bg-opacity-20 p-4 rounded-lg backdrop-blur-sm">
                <p className="text-sm">
                  This is a BASIC TICKET which includes access to speakers, poster/oral presentations, and limited access to fairs and booths only. Workshops are not included with this ticket.
                </p>
              </div>
            </div>
          </div>

          {/* Form */}
          <motion.form 
            onSubmit={handleSubmit} 
            className="p-8"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div className="space-y-8">
              {/* Personal Information */}
              <section className="space-y-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-3 bg-blue-100 rounded-xl">
                    <User className="w-6 h-6 text-blue-600" />
                  </div>
                  <h2 className="text-2xl font-semibold text-gray-800">Personal Information</h2>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
                    <input
                      type="text"
                      required
                      value={formData.fullName}
                      onChange={(e) => handleInputChange("fullName", e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Please enter your full legal name as you would like it to appear on your ID card and certificate"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email Address *</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter a valid email address for all official conference communication"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">WhatsApp Number (with country code) *</label>
                    <input
                      type="text"
                      required
                      value={formData.whatsapp}
                      onChange={(e) => handleInputChange("whatsapp", e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="This will be used to send important updates before and during the conference"
                    />
                  </div>
                </div>
              </section>

              {/* GIMSOC Membership */}
              <section className="space-y-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-3 bg-yellow-100 rounded-xl">
                    <Shield className="w-6 h-6 text-yellow-600" />
                  </div>
                  <h2 className="text-2xl font-semibold text-gray-800">GIMSOC Membership</h2>
                </div>

                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">Are you a GIMSOC member? *</label>
                    <div className="flex gap-6">
                      <label className="flex items-center">
                        <input
                          type="radio"
                          name="isGimsocMember"
                          value="Yes"
                          checked={formData.isGimsocMember === "Yes"}
                          onChange={(e) => handleInputChange("isGimsocMember", e.target.value)}
                          className="mr-2"
                        />
                        Yes (30 GEL / 1000 INR)
                      </label>
                      <label className="flex items-center">
                        <input
                          type="radio"
                          name="isGimsocMember"
                          value="No"
                          checked={formData.isGimsocMember === "No"}
                          onChange={(e) => handleInputChange("isGimsocMember", e.target.value)}
                          className="mr-2"
                        />
                        No (40 GEL / 1320 INR)
                      </label>
                    </div>
                  </div>

                  {formData.isGimsocMember === "Yes" && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Please enter your GIMSOC membership Code *</label>
                      <input
                        type="text"
                        required
                        value={formData.gimsocCode}
                        onChange={(e) => handleInputChange("gimsocCode", e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                        placeholder="Enter your GIMSOC membership code"
                      />
                    </div>
                  )}
                </div>
              </section>

              {/* Academic Information */}
              <section className="space-y-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-3 bg-green-100 rounded-xl">
                    <GraduationCap className="w-6 h-6 text-green-600" />
                  </div>
                  <h2 className="text-2xl font-semibold text-gray-800">Academic Information</h2>
                </div>

                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">University Name *</label>
                    <select
                      required
                      value={formData.university}
                      onChange={(e) => handleInputChange("university", e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    >
                      <option value="">Please select the name of your current university</option>
                      {UNIVERSITIES.map((uni) => (
                        <option key={uni} value={uni}>{uni}</option>
                      ))}
                      <option value="Other">Other</option>
                    </select>
                    {formData.university === "Other" && (
                      <input
                        type="text"
                        required
                        value={formData.otherUniversity}
                        onChange={(e) => handleInputChange("otherUniversity", e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent mt-2"
                        placeholder="Please specify your university"
                      />
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Current Semester/Year of Study *</label>
                    <select
                      required
                      value={formData.currentSemester}
                      onChange={(e) => handleInputChange("currentSemester", e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    >
                      <option value="">Mention your current academic semester</option>
                      {SEMESTER_OPTIONS.map((sem) => (
                        <option key={sem} value={sem}>{sem}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">Which exam are you preparing for? *</label>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {EXAM_OPTIONS.map((exam) => (
                        <label key={exam} className="flex items-center">
                          <input
                            type="radio"
                            name="examPreparation"
                            value={exam}
                            checked={formData.examPreparation === exam}
                            onChange={(e) => handleInputChange("examPreparation", e.target.value)}
                            className="mr-2"
                          />
                          {exam}
                        </label>
                      ))}
                    </div>
                    {formData.examPreparation === "Other" && (
                      <input
                        type="text"
                        value={formData.otherExam}
                        onChange={(e) => handleInputChange("otherExam", e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent mt-2"
                        placeholder="Please specify"
                      />
                    )}
                  </div>
                </div>
              </section>

              {/* Identification */}
              <section className="space-y-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-3 bg-purple-100 rounded-xl">
                    <Camera className="w-6 h-6 text-purple-600" />
                  </div>
                  <h2 className="text-2xl font-semibold text-gray-800">Identification</h2>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Upload a Headshot for Your Conference ID Card *</label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                    <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                    <input
                      type="file"
                      accept=".jpg,.jpeg,.png"
                      onChange={handleFileChange}
                      name="headshot"
                      className="hidden"
                      id="headshot-upload"
                      required
                    />
                    <label htmlFor="headshot-upload" className="cursor-pointer">
                      <span className="text-blue-600 hover:text-blue-500 font-medium">Click to upload</span>
                      <span className="text-gray-500"> or drag and drop</span>
                    </label>
                    <p className="text-xs text-gray-500 mt-1">
                      Please upload a clear, front-facing photo (passport-style) with a plain background.
                    </p>
                    <p className="text-xs text-yellow-600 mt-1">Note: Your ID will be made without a photo if none is uploaded.</p>
                    <p className="text-xs text-red-500 mt-1">⚠️ Maximum file size: 5MB</p>
                    {formData.headshot && (
                      <p className="text-sm text-green-600 mt-2">✓ File selected: {formData.headshot.name}</p>
                    )}
                  </div>
                </div>
              </section>

              {/* Food Preferences and Health Needs */}
              <section className="space-y-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-3 bg-orange-100 rounded-xl">
                    <Utensils className="w-6 h-6 text-orange-600" />
                  </div>
                  <h2 className="text-2xl font-semibold text-gray-800">Food Preferences and Health Needs</h2>
                </div>

                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">Preferred Food Option *</label>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      {FOOD_OPTIONS.map((option) => (
                        <label key={option} className="flex items-center">
                          <input
                            type="radio"
                            name="foodPreference"
                            value={option}
                            checked={formData.foodPreference === option}
                            onChange={(e) => handleInputChange("foodPreference", e.target.value)}
                            className="mr-2"
                          />
                          {option}
                        </label>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Do you have any dietary restrictions?</label>
                    <textarea
                      value={formData.dietaryRestrictions}
                      onChange={(e) => handleInputChange("dietaryRestrictions", e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      placeholder="If yes, please specify (e.g., lactose intolerance, gluten-free, allergies)"
                      rows="3"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Do you have any accessibility needs or health conditions we should be aware of?</label>
                    <textarea
                      value={formData.accessibilityNeeds}
                      onChange={(e) => handleInputChange("accessibilityNeeds", e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      placeholder="This information will help us ensure your comfort and safety during the event"
                      rows="3"
                    />
                  </div>
                </div>
              </section>

              {/* Declaration and Consent */}
              <section className="space-y-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-3 bg-red-100 rounded-xl">
                    <ShieldCheck className="w-6 h-6 text-red-600" />
                  </div>
                  <h2 className="text-2xl font-semibold text-gray-800">Declaration and Consent</h2>
                </div>

                <div className="space-y-4">
                  <label className="flex items-start">
                    <input
                      type="checkbox"
                      checked={formData.declarationAccurate}
                      onChange={(e) => handleInputChange("declarationAccurate", e.target.checked)}
                      className="mr-3 mt-1"
                      required
                    />
                    <span className="text-gray-700">I confirm that all the information provided is accurate to the best of my knowledge. (Required)</span>
                  </label>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Do you consent to the use of photos and videos of you taken during the conference for promotional purposes? (Required)
                    </label>
                    <div className="flex gap-6">
                      <label className="flex items-center">
                        <input
                          type="radio"
                          name="mediaConsent"
                          value="Yes"
                          checked={formData.mediaConsent === "Yes"}
                          onChange={(e) => handleInputChange("mediaConsent", e.target.value)}
                          className="mr-2"
                        />
                        Yes
                      </label>
                      <label className="flex items-center">
                        <input
                          type="radio"
                          name="mediaConsent"
                          value="No"
                          checked={formData.mediaConsent === "No"}
                          onChange={(e) => handleInputChange("mediaConsent", e.target.value)}
                          className="mr-2"
                        />
                        No
                      </label>
                    </div>
                  </div>

                  <label className="flex items-start">
                    <input
                      type="checkbox"
                      checked={formData.policyCompliance}
                      onChange={(e) => handleInputChange("policyCompliance", e.target.checked)}
                      className="mr-3 mt-1"
                      required
                    />
                    <span className="text-gray-700">I agree to comply with all conference policies, rules, and guidelines. (Required)</span>
                  </label>

                  <label className="flex items-start">
                    <input
                      type="checkbox"
                      checked={formData.emailConsent}
                      onChange={(e) => handleInputChange("emailConsent", e.target.checked)}
                      className="mr-3 mt-1"
                    />
                    <span className="text-gray-700">I agree to receive emails from GIMSOC, including updates, resources, and conference-related information.</span>
                  </label>

                  <label className="flex items-start">
                    <input
                      type="checkbox"
                      checked={formData.whatsappConsent}
                      onChange={(e) => handleInputChange("whatsappConsent", e.target.checked)}
                      className="mr-3 mt-1"
                    />
                    <span className="text-gray-700">I consent to be added to our WhatsApp group for updates, discussions, and announcements related to MEDCON.</span>
                  </label>
                </div>
              </section>

              {/* Payment Confirmation */}
              <section className="space-y-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-3 bg-green-100 rounded-xl">
                    <CreditCard className="w-6 h-6 text-green-600" />
                  </div>
                  <h2 className="text-2xl font-semibold text-gray-800">Payment Confirmation</h2>
                </div>

                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">How will you be making the payment? (Required) *</label>
                    <div className="flex gap-6">
                      <label className="flex items-center">
                        <input
                          type="radio"
                          name="paymentMethod"
                          value="Credit/Debit Card"
                          checked={formData.paymentMethod === "Credit/Debit Card"}
                          onChange={(e) => handleInputChange("paymentMethod", e.target.value)}
                          className="mr-2"
                        />
                        Credit/Debit Card (note regarding the tax)
                      </label>
                      <label className="flex items-center">
                        <input
                          type="radio"
                          name="paymentMethod"
                          value="Bank Transfer"
                          checked={formData.paymentMethod === "Bank Transfer"}
                          onChange={(e) => handleInputChange("paymentMethod", e.target.value)}
                          className="mr-2"
                        />
                        Bank Transfer
                      </label>
                    </div>
                  </div>

                  {formData.paymentMethod === "Bank Transfer" && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Upload Proof of Payment (PNG and JPEG formats only) *</label>
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                        <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                        <input
                          type="file"
                          accept=".jpg,.jpeg,.png"
                          onChange={handleFileChange}
                          name="paymentProof"
                          className="hidden"
                          id="payment-upload"
                          required
                        />
                        <label htmlFor="payment-upload" className="cursor-pointer">
                          <span className="text-blue-600 hover:text-blue-500 font-medium">Click to upload</span>
                          <span className="text-gray-500"> or drag and drop</span>
                        </label>
                        <p className="text-xs text-gray-500 mt-1">Please upload a screenshot of your bank transfer confirmation</p>
                        <p className="text-xs text-red-500 mt-1">⚠️ Maximum file size: 5MB</p>
                        {formData.paymentProof && (
                          <p className="text-sm text-green-600 mt-2">✓ File selected: {formData.paymentProof.name}</p>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Bank Details */}
                  <div className="bg-gray-50 p-6 rounded-lg">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Payment Information</h3>
                    <div className="space-y-4 text-sm">
                      <div>
                        <h4 className="font-medium text-gray-700 mb-2">Bank of Georgia (GEL, USD, EUR, GBP)</h4>
                        <p className="text-gray-600">IBAN: GE94BG0000000608342766</p>
                        <p className="text-gray-600">SWIFT: BAGAGE22</p>
                        <p className="text-gray-600">Beneficiary: FERNANDO MANDRIKA SANTOSH U.</p>
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-700 mb-2">TBC Bank</h4>
                        <p className="text-gray-600">IBAN: GE31TB7724245061200012</p>
                        <p className="text-gray-600">SWIFT: TBCBGE22</p>
                        <p className="text-gray-600">Beneficiary: Mandrika Santosh Umanga Fernand</p>
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-700 mb-2">UPI (for transfers from India)</h4>
                        <p className="text-gray-600">UPI ID: divyeshkadiyala@ybl</p>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* Submit Button */}
              <div className="flex gap-4 pt-6">
                <button
                  type="button"
                  onClick={() => window.history.back()}
                  className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Back
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    "Submit Registration"
                  )}
                </button>
              </div>
            </div>
          </motion.form>
        </motion.div>
      </div>
    </div>
  )
}
