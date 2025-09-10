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

const EXAM_OPTIONS = [
  "USMLE",
  "PLAB", 
  "FMGE",
  "IFOM",
  "Not Applicable",
  "Other"
]

const SOURCE_OPTIONS = [
  "Website",
  "Instagram", 
  "LinkedIn",
  "Facebook",
  "Word of Mouth",
  "Other"
]

export default function OnlineTicket() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    whatsapp: "",
    isGimsocMember: "",
    gimsocCode: "",
    isStudent: "",
    university: "",
    otherUniversity: "",
    fieldOfStudy: "",
    examPreparation: "",
    otherExam: "",
    country: "",
    timeZone: "",
    sourceOfInfo: "",
    otherSource: "",
    isDfcMember: "",
    paymentMethod: "",
    paymentProof: null,
    declarationAccurate: false,
    emailConsent: false,
    whatsappConsent: false,
    mediaConsent: ""
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

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    try {
      const formDataToSend = new FormData()
      
      // Add all form fields
      Object.keys(formData).forEach(key => {
        if (key === "paymentProof") {
          if (formData[key]) {
            formDataToSend.append(key, formData[key])
          }
        } else if (key === "declarationAccurate" || key === "emailConsent" || key === "whatsappConsent") {
          formDataToSend.append(key, formData[key] ? "true" : "false")
        } else {
          formDataToSend.append(key, formData[key] || "")
        }
      })

      // Determine ticket type based on GIMSOC membership
      const ticketType = formData.isGimsocMember === "Yes" ? "GIMSOC Member Online" : "Non-GIMSOC Member Online"
      const price = formData.isGimsocMember === "Yes" ? "14 USD / 30 GEL / 1000 INR" : "16 USD / 35 GEL / 1150 INR"
      
      // Add ticket type
      formDataToSend.append('ticketType', ticketType)
      formDataToSend.append('ticketCategory', 'Online')
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
      isGimsocMember: "",
      gimsocCode: "",
      isStudent: "",
      university: "",
      otherUniversity: "",
      fieldOfStudy: "",
      examPreparation: "",
      otherExam: "",
      country: "",
      timeZone: "",
      sourceOfInfo: "",
      otherSource: "",
      isDfcMember: "",
      paymentMethod: "",
      paymentProof: null,
      declarationAccurate: false,
      emailConsent: false,
      whatsappConsent: false,
      mediaConsent: ""
    })
    setSubmitStatus(null)
  }

  const getPriceDisplay = () => {
    if (formData.isGimsocMember === "Yes") {
      return "14 USD / 30 GEL / 1000 INR"
    } else if (formData.isGimsocMember === "No") {
      return "16 USD / 35 GEL / 1150 INR"
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
            Thank you for registering for MEDCON'25 Online Ticket. 
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
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-8 text-white relative overflow-hidden">
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
                  <h1 className="text-3xl font-bold mb-2">Online Ticket</h1>
                  <p className="text-white text-opacity-90 text-sm">{getPriceDisplay()}</p>
                </div>
              </div>
              
              <div className="bg-white bg-opacity-20 p-4 rounded-lg backdrop-blur-sm">
                <p className="text-sm">
                  This ticket grants you online access to speaker sessions and poster/oral presentations only. Booths and Gala Night are not included.
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
              {/* Section 1: Personal Information */}
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
                      placeholder="Enter your full legal name"
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
                      placeholder="Enter a valid email address"
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
                      placeholder="e.g., +995 123 456 789"
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
                        Yes (14 USD / 30 GEL / 1000 INR)
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
                        No (16 USD / 35 GEL / 1150 INR)
                      </label>
                    </div>
                  </div>

                  {formData.isGimsocMember === "Yes" && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">GIMSOC Membership Code (required for verification & discount) *</label>
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

              {/* Section 2: Academic Background */}
              <section className="space-y-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-3 bg-green-100 rounded-xl">
                    <GraduationCap className="w-6 h-6 text-green-600" />
                  </div>
                  <h2 className="text-2xl font-semibold text-gray-800">Academic / General Background</h2>
                </div>

                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">Are you currently a student? *</label>
                    <div className="flex gap-6">
                      <label className="flex items-center">
                        <input
                          type="radio"
                          name="isStudent"
                          value="Yes"
                          checked={formData.isStudent === "Yes"}
                          onChange={(e) => handleInputChange("isStudent", e.target.value)}
                          className="mr-2"
                        />
                        Yes
                      </label>
                      <label className="flex items-center">
                        <input
                          type="radio"
                          name="isStudent"
                          value="No"
                          checked={formData.isStudent === "No"}
                          onChange={(e) => handleInputChange("isStudent", e.target.value)}
                          className="mr-2"
                        />
                        No
                      </label>
                    </div>
                  </div>

                  {formData.isStudent === "Yes" && (
                    <>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">University/Institution Name</label>
                        <select
                          value={formData.university}
                          onChange={(e) => handleInputChange("university", e.target.value)}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        >
                          <option value="">Select your university</option>
                          {UNIVERSITIES.map((uni) => (
                            <option key={uni} value={uni}>{uni}</option>
                          ))}
                          <option value="Other">Other</option>
                        </select>
                        {formData.university === "Other" && (
                          <input
                            type="text"
                            value={formData.otherUniversity}
                            onChange={(e) => handleInputChange("otherUniversity", e.target.value)}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent mt-2"
                            placeholder="Please specify your university"
                          />
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Field of Study / Area of Interest</label>
                        <input
                          type="text"
                          value={formData.fieldOfStudy}
                          onChange={(e) => handleInputChange("fieldOfStudy", e.target.value)}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                          placeholder="e.g., Medicine, Public Health, etc."
                        />
                      </div>
                    </>
                  )}

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">Are you preparing for any medical or health-related exams? *</label>
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

              {/* Section 3: Country Information */}
              <section className="space-y-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-3 bg-purple-100 rounded-xl">
                    <MapPin className="w-6 h-6 text-purple-600" />
                  </div>
                  <h2 className="text-2xl font-semibold text-gray-800">Country Information</h2>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Country of Residence *</label>
                    <input
                      type="text"
                      required
                      value={formData.country}
                      onChange={(e) => handleInputChange("country", e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      placeholder="Enter your country"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Time Zone (optional)</label>
                    <input
                      type="text"
                      value={formData.timeZone}
                      onChange={(e) => handleInputChange("timeZone", e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      placeholder="e.g., GMT+4"
                    />
                  </div>
                </div>
              </section>

              {/* Section 4: Source of Information */}
              <section className="space-y-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-3 bg-orange-100 rounded-xl">
                    <Globe className="w-6 h-6 text-orange-600" />
                  </div>
                  <h2 className="text-2xl font-semibold text-gray-800">Source of Information</h2>
                </div>

                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">Where did you hear about MEDCON'25? *</label>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {SOURCE_OPTIONS.map((source) => (
                        <label key={source} className="flex items-center">
                          <input
                            type="radio"
                            name="sourceOfInfo"
                            value={source}
                            checked={formData.sourceOfInfo === source}
                            onChange={(e) => handleInputChange("sourceOfInfo", e.target.value)}
                            className="mr-2"
                          />
                          {source}
                        </label>
                      ))}
                    </div>
                    {formData.sourceOfInfo === "Other" && (
                      <input
                        type="text"
                        value={formData.otherSource}
                        onChange={(e) => handleInputChange("otherSource", e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent mt-2"
                        placeholder="Please specify"
                      />
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">Are you a Doctors For Cause (DFC) member? *</label>
                    <div className="flex gap-6">
                      <label className="flex items-center">
                        <input
                          type="radio"
                          name="isDfcMember"
                          value="Yes"
                          checked={formData.isDfcMember === "Yes"}
                          onChange={(e) => handleInputChange("isDfcMember", e.target.value)}
                          className="mr-2"
                        />
                        Yes
                      </label>
                      <label className="flex items-center">
                        <input
                          type="radio"
                          name="isDfcMember"
                          value="No"
                          checked={formData.isDfcMember === "No"}
                          onChange={(e) => handleInputChange("isDfcMember", e.target.value)}
                          className="mr-2"
                        />
                        No
                      </label>
                    </div>
                  </div>
                </div>
              </section>

              {/* Section 5: Payment Details */}
              <section className="space-y-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-3 bg-green-100 rounded-xl">
                    <CreditCard className="w-6 h-6 text-green-600" />
                  </div>
                  <h2 className="text-2xl font-semibold text-gray-800">Payment Details</h2>
                </div>

                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">Payment Method *</label>
                    <div className="flex gap-6">
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
                      <label className="flex items-center">
                        <input
                          type="radio"
                          name="paymentMethod"
                          value="Credit/Debit Card"
                          checked={formData.paymentMethod === "Credit/Debit Card"}
                          onChange={(e) => handleInputChange("paymentMethod", e.target.value)}
                          className="mr-2"
                        />
                        Credit/Debit Card
                      </label>
                    </div>
                  </div>

                  {formData.paymentMethod === "Bank Transfer" && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Upload Proof of Payment (PNG or JPEG only) *</label>
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                        <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                        <input
                          type="file"
                          accept=".jpg,.jpeg,.png"
                          onChange={handleFileChange}
                          className="hidden"
                          id="payment-upload"
                          required
                        />
                        <label htmlFor="payment-upload" className="cursor-pointer">
                          <span className="text-blue-600 hover:text-blue-500 font-medium">Click to upload</span>
                          <span className="text-gray-500"> or drag and drop</span>
                        </label>
                        <p className="text-xs text-gray-500 mt-1">Maximum file size: 5MB</p>
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

              {/* Section 6: Declaration & Consent */}
              <section className="space-y-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-3 bg-yellow-100 rounded-xl">
                    <ShieldCheck className="w-6 h-6 text-yellow-600" />
                  </div>
                  <h2 className="text-2xl font-semibold text-gray-800">Declaration & Consent</h2>
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
                    <span className="text-gray-700">I confirm that all information provided is accurate. (Required)</span>
                  </label>

                  <label className="flex items-start">
                    <input
                      type="checkbox"
                      checked={formData.emailConsent}
                      onChange={(e) => handleInputChange("emailConsent", e.target.checked)}
                      className="mr-3 mt-1"
                      required
                    />
                    <span className="text-gray-700">I agree to receive emails from GIMSOC with conference materials and updates. (Required)</span>
                  </label>

                  <label className="flex items-start">
                    <input
                      type="checkbox"
                      checked={formData.whatsappConsent}
                      onChange={(e) => handleInputChange("whatsappConsent", e.target.checked)}
                      className="mr-3 mt-1"
                      required
                    />
                    <span className="text-gray-700">I consent to be added to the official WhatsApp group for online participants. (Required)</span>
                  </label>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Do you consent to the use of screenshots or recordings during sessions where your name or image may appear (for promotional purposes)?
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
                  className="flex-1 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
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
