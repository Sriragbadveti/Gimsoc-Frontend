"use client"

import { useState } from "react"
import { Upload, User, GraduationCap, Camera, Utensils, CreditCard, Star } from "lucide-react"

export default function ExecutiveIndividualTicket() {
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Form data state
  const [formData, setFormData] = useState({
    // Ticket Category
    ticketCategory: "",

    // Personal Information
    fullName: "",
    email: "",
    whatsapp: "",

    // Academic Information
    universityName: "",
    semester: "",
    examPrep: "",
    examOther: "",

    // Uploads
    headshot: null,
    paymentProof: null,

    // Preferences
    foodPreference: "",
    dietaryRestrictions: "",
    accessibilityNeeds: "",

    // GIMSOC Membership
    isGimsocMember: "",
    membershipCode: "",

    // Consent
    infoAccurate: false,
    mediaConsent: "",
    policies: false,
    emailConsent: false,
    whatsappConsent: false,

    // Payment
    paymentMethod: "",
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

  // Calculate price based on ticket category and GIMSOC membership
  const calculatePrice = () => {
    let basePrice = 0
    if (formData.ticketCategory === "Standard") {
      basePrice = 50 // Standard ticket price
    } else if (formData.ticketCategory === "All-Inclusive") {
      basePrice = 100 // All-Inclusive ticket price
    }

    // Apply GIMSOC member discount (10 GEL off)
    if (formData.isGimsocMember === "Yes") {
      basePrice -= 10
    }

    return basePrice
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1500))

      console.log("✅ Executive ticket submitted successfully:", {
        ticketCategory: formData.ticketCategory,
        subType: "Executive & Subcom",
        ...formData,
      })

      alert("✅ Executive ticket submitted successfully!")

      // Reset form
      setFormData({
        ticketCategory: "",
        fullName: "",
        email: "",
        whatsapp: "",
        universityName: "",
        semester: "",
        examPrep: "",
        examOther: "",
        headshot: null,
        paymentProof: null,
        foodPreference: "",
        dietaryRestrictions: "",
        accessibilityNeeds: "",
        isGimsocMember: "",
        membershipCode: "",
        infoAccurate: false,
        mediaConsent: "",
        policies: false,
        emailConsent: false,
        whatsappConsent: false,
        paymentMethod: "",
      })
    } catch (err) {
      console.error("❌ Error submitting executive ticket:", err)
      alert("Submission failed. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const universities = [
    "Tbilisi State Medical University",
    "David Tvildiani Medical University",
    "University of Georgia",
    "Caucasus International University",
    "Georgian American University",
    "East European University",
    "New Vision University",
    "Petre Shotadze Tbilisi Medical Academy",
    "European University",
    "Alte University",
    "Ivane Javakhishvili Tbilisi State University (Faculty of Medicine)",
    "Gruni",
    "Kenwalker",
    "Akaki Tsereteli State University (Faculty of Medicine)",
    "BAU International University, Batumi",
    "Batumi Shota Rustaveli State University (Faculty of Medicine)",
    "Other",
  ]

  const semesters = Array.from({ length: 12 }, (_, i) => `${i + 1}`).concat(["Graduated"])
  const exams = ["USMLE", "AMC", "PLAB", "FMGE", "EMREE", "IFOM"]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-6">
            <h1 className="text-3xl font-bold text-white text-center">Executive & Subcom Registration</h1>
            <p className="text-blue-100 text-center mt-2">Complete your executive registration below</p>

            {/* Dynamic Price Display */}
            {formData.ticketCategory && (
              <div className="text-center mt-4">
                <div className="inline-block bg-white/20 backdrop-blur-sm rounded-lg px-6 py-3">
                  <span className="text-white text-lg font-medium">Ticket Price: </span>
                  <span className="text-white text-2xl font-bold">{calculatePrice()} GEL</span>
                  <div className="text-blue-100 text-sm mt-1">
                    {formData.ticketCategory} Executive Ticket
                    {formData.isGimsocMember === "Yes" && " • GIMSOC Discount Applied!"}
                  </div>
                </div>
              </div>
            )}
          </div>

          <form onSubmit={handleSubmit} className="p-8 space-y-10">
            {/* Ticket Category Selection */}
            <section className="space-y-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-orange-100 rounded-lg">
                  <Star className="w-6 h-6 text-orange-600" />
                </div>
                <h2 className="text-2xl font-semibold text-gray-800">Ticket Category</h2>
              </div>

              <div className="bg-orange-50 border border-orange-200 rounded-lg p-6">
                <label className="block text-sm font-medium text-gray-700 mb-3">Select your ticket category *</label>
                <div className="space-y-3">
                  <label className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:bg-white cursor-pointer transition-all">
                    <input
                      type="radio"
                      name="ticketCategory"
                      value="Standard"
                      checked={formData.ticketCategory === "Standard"}
                      onChange={handleInputChange}
                      className="text-orange-600 focus:ring-orange-500"
                      required
                    />
                    <div className="flex-1">
                      <span className="text-gray-700 font-medium">Standard Executive Ticket</span>
                      <p className="text-sm text-gray-600">
                        Access to main conference sessions and executive networking
                      </p>
                    </div>
                    <span className="text-orange-600 text-lg font-bold">50 GEL</span>
                  </label>

                  <label className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:bg-white cursor-pointer transition-all">
                    <input
                      type="radio"
                      name="ticketCategory"
                      value="All-Inclusive"
                      checked={formData.ticketCategory === "All-Inclusive"}
                      onChange={handleInputChange}
                      className="text-orange-600 focus:ring-orange-500"
                      required
                    />
                    <div className="flex-1">
                      <span className="text-gray-700 font-medium">All-Inclusive Executive Ticket</span>
                      <p className="text-sm text-gray-600">
                        Full conference access + exclusive sessions + meals + materials
                      </p>
                    </div>
                    <span className="text-orange-600 text-lg font-bold">100 GEL</span>
                  </label>
                </div>
                <p className="text-xs text-gray-500 mt-3">
                  GIMSOC members receive 10 GEL discount on all ticket categories.
                </p>
              </div>
            </section>

            {/* Personal Information */}
            {formData.ticketCategory && (
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
                      placeholder="Please enter your full legal name"
                      required
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      As you would like it to appear on your ID card and certificate
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
                        placeholder="+995 XXX XXX XXX"
                        required
                      />
                      <p className="text-xs text-gray-500 mt-1">
                        For important updates before and during the conference
                      </p>
                    </div>
                  </div>
                </div>
              </section>
            )}

            {/* Academic Information */}
            {formData.ticketCategory && (
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
                    <select
                      name="universityName"
                      value={formData.universityName}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      required
                    >
                      <option value="">Select your university</option>
                      {universities.map((uni, index) => (
                        <option key={index} value={uni}>
                          {uni}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Current Semester/Year of Study *
                    </label>
                    <select
                      name="semester"
                      value={formData.semester}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      required
                    >
                      <option value="">Select semester</option>
                      {semesters.map((sem, index) => (
                        <option key={index} value={sem}>
                          {sem}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Which exam are you preparing for? *
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {exams.map((exam) => (
                      <label key={exam} className="flex items-center space-x-2 cursor-pointer">
                        <input
                          type="radio"
                          name="examPrep"
                          value={exam}
                          checked={formData.examPrep === exam}
                          onChange={handleInputChange}
                          className="text-blue-600 focus:ring-blue-500"
                        />
                        <span className="text-sm text-gray-700">{exam}</span>
                      </label>
                    ))}
                  </div>
                  <div className="mt-3">
                    <input
                      type="text"
                      name="examOther"
                      value={formData.examOther}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      placeholder="Specify other exam"
                    />
                  </div>
                </div>
              </section>
            )}

            {/* Identification */}
            {formData.ticketCategory && (
              <section className="space-y-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-orange-100 rounded-lg">
                    <Camera className="w-6 h-6 text-orange-600" />
                  </div>
                  <h2 className="text-2xl font-semibold text-gray-800">Identification</h2>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Upload a Headshot for Your Conference ID Card
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
                    <p className="text-xs text-gray-500 mt-1">Clear, front-facing photo with plain background</p>
                    {formData.headshot && (
                      <p className="text-sm text-green-600 mt-2">✓ File selected: {formData.headshot.name}</p>
                    )}
                  </div>
                </div>
              </section>
            )}

            {/* Food Preferences */}
            {formData.ticketCategory && (
              <section className="space-y-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-red-100 rounded-lg">
                    <Utensils className="w-6 h-6 text-red-600" />
                  </div>
                  <h2 className="text-2xl font-semibold text-gray-800">Food Preferences and Health Needs</h2>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">Preferred Food Option *</label>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    {["Vegetarian", "Non-Vegetarian", "Non-Vegetarian (Halal)"].map((option) => (
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
                      placeholder="e.g., lactose intolerance, gluten-free, allergies"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Accessibility Needs or Health Conditions
                    </label>
                    <textarea
                      name="accessibilityNeeds"
                      value={formData.accessibilityNeeds}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      rows="3"
                      placeholder="This information will help us ensure your comfort and safety during the event"
                    />
                  </div>
                </div>
              </section>
            )}

            {/* GIMSOC Membership */}
            {formData.ticketCategory && (
              <section className="space-y-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-purple-100 rounded-lg">
                    <User className="w-6 h-6 text-purple-600" />
                  </div>
                  <h2 className="text-2xl font-semibold text-gray-800">GIMSOC Membership</h2>
                </div>

                <div className="bg-purple-50 border border-purple-200 rounded-lg p-6">
                  <label className="block text-sm font-medium text-gray-700 mb-3">Are you a GIMSOC member? *</label>
                  <div className="space-y-3">
                    {["Yes", "No"].map((option) => (
                      <label
                        key={option}
                        className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:bg-white cursor-pointer transition-all"
                      >
                        <input
                          type="radio"
                          name="isGimsocMember"
                          value={option}
                          checked={formData.isGimsocMember === option}
                          onChange={handleInputChange}
                          className="text-purple-600 focus:ring-purple-500"
                          required
                        />
                        <span className="text-gray-700 font-medium">{option}</span>
                        {option === "Yes" && (
                          <span className="ml-auto text-green-600 text-sm font-medium">10 GEL Discount!</span>
                        )}
                      </label>
                    ))}
                  </div>

                  {formData.isGimsocMember === "Yes" && (
                    <div className="mt-4">
                      <label className="block text-sm font-medium text-gray-700 mb-2">GIMSOC Membership Code *</label>
                      <input
                        type="text"
                        name="membershipCode"
                        value={formData.membershipCode}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                        placeholder="Enter your GIMSOC membership code"
                        required
                      />
                    </div>
                  )}
                </div>
              </section>
            )}

            {/* Declaration and Consent */}
            {formData.ticketCategory && (
              <section className="space-y-6">
                <h2 className="text-2xl font-semibold text-gray-800">Declaration and Consent</h2>

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
                      Do you consent to the use of photos and videos of you taken during the conference for promotional
                      purposes?
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
            )}

            {/* Payment Confirmation */}
            {formData.ticketCategory && (
              <section className="space-y-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-yellow-100 rounded-lg">
                    <CreditCard className="w-6 h-6 text-yellow-600" />
                  </div>
                  <h2 className="text-2xl font-semibold text-gray-800">Payment Confirmation</h2>
                </div>

                {/* Dynamic Price Display */}
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-medium text-gray-700">Total Amount:</span>
                    <span className="text-2xl font-bold text-blue-600">{calculatePrice()} GEL</span>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">
                    {formData.ticketCategory} Executive & Subcom Ticket
                    {formData.isGimsocMember === "Yes" && " (GIMSOC Discount Applied)"}
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    How will you be making the payment? *
                  </label>
                  <div className="space-y-3">
                    {["Bank Transfer"].map((method) => (
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
            )}

            {/* Submit Button */}
            {formData.ticketCategory && (
              <div className="pt-6">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full py-4 px-6 rounded-lg font-semibold text-lg transition-all transform hover:scale-[1.02] ${
                    isSubmitting
                      ? "bg-gray-400 text-gray-600 cursor-not-allowed"
                      : "bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700 focus:ring-4 focus:ring-blue-200"
                  }`}
                >
                  {isSubmitting ? "Submitting..." : `Submit Executive Registration - ${calculatePrice()} GEL`}
                </button>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  )
}
