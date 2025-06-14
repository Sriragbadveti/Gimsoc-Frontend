"use client"

import { useState, useCallback, useMemo } from "react"
import { Upload, Users, Calendar, User, CreditCard } from 'lucide-react'

// Move AttendeeSection outside to prevent recreation on every render
const AttendeeSection = ({ attendeeNum, attendee, onAttendeeChange, onAttendeeFileChange }) => {
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
  ]

  const semesters = Array.from({ length: 12 }, (_, i) => `${i + 1}`).concat(["Graduated"])
  const exams = ["USMLE", "AMC", "PLAB", "FMGE", "EMREE", "IFOM"]

  return (
    <section className="space-y-6 bg-gray-50 p-6 rounded-xl border border-gray-200">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-blue-100 rounded-lg">
          <User className="w-6 h-6 text-blue-600" />
        </div>
        <h2 className="text-2xl font-semibold text-gray-800">Attendee {attendeeNum}</h2>
      </div>

      {/* Personal Information */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium text-gray-700 border-b border-gray-200 pb-2">Personal Information</h3>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
          <input
            type="text"
            value={attendee.fullName}
            onChange={(e) => onAttendeeChange(attendeeNum, "fullName", e.target.value)}
            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            placeholder="Please enter your full legal name"
            required
          />
          <p className="text-xs text-gray-500 mt-1">As you would like it to appear on your ID card and certificate</p>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Email Address *</label>
            <input
              type="email"
              value={attendee.email}
              onChange={(e) => onAttendeeChange(attendeeNum, "email", e.target.value)}
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              placeholder="Enter a valid email address"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              WhatsApp Number (with country code) *
            </label>
            <input
              type="tel"
              value={attendee.whatsapp}
              onChange={(e) => onAttendeeChange(attendeeNum, "whatsapp", e.target.value)}
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              placeholder="+995 XXX XXX XXX"
              required
            />
          </div>
        </div>
      </div>

      {/* Academic Information */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium text-gray-700 border-b border-gray-200 pb-2">Academic Information</h3>

        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">University Name *</label>
            <select
              value={attendee.university}
              onChange={(e) => onAttendeeChange(attendeeNum, "university", e.target.value)}
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
            <label className="block text-sm font-medium text-gray-700 mb-2">Current Semester/Year of Study *</label>
            <select
              value={attendee.semester}
              onChange={(e) => onAttendeeChange(attendeeNum, "semester", e.target.value)}
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
          <label className="block text-sm font-medium text-gray-700 mb-3">Which exam are you preparing for?</label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {exams.map((exam) => (
              <label key={exam} className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="radio"
                  name={`examPrep-${attendeeNum}`}
                  value={exam}
                  checked={attendee.examPrep === exam}
                  onChange={(e) => onAttendeeChange(attendeeNum, "examPrep", e.target.value)}
                  className="text-blue-600 focus:ring-blue-500"
                />
                <span className="text-sm text-gray-700">{exam}</span>
              </label>
            ))}
          </div>
          <div className="mt-3">
            <input
              type="text"
              value={attendee.examOther}
              onChange={(e) => onAttendeeChange(attendeeNum, "examOther", e.target.value)}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              placeholder="Specify other exam"
            />
          </div>
        </div>
      </div>

      {/* Identification */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium text-gray-700 border-b border-gray-200 pb-2">Identification</h3>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Upload a Headshot for Your Conference ID Card
          </label>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors">
            <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
            <input
              type="file"
              onChange={(e) => onAttendeeFileChange(attendeeNum, "headshot", e.target.files[0])}
              accept="image/*"
              className="hidden"
              id={`headshot-upload-${attendeeNum}`}
            />
            <label htmlFor={`headshot-upload-${attendeeNum}`} className="cursor-pointer">
              <span className="text-blue-600 hover:text-blue-700 font-medium">Click to upload</span>
              <span className="text-gray-500"> or drag and drop</span>
            </label>
            <p className="text-xs text-gray-500 mt-1">Clear, front-facing photo with plain background</p>
            {attendee.headshot && (
              <p className="text-sm text-green-600 mt-2">✓ File selected: {attendee.headshot.name}</p>
            )}
          </div>
        </div>
      </div>

      {/* Food Preferences */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium text-gray-700 border-b border-gray-200 pb-2">
          Food Preferences and Health Needs
        </h3>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">Preferred Food Option *</label>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {["Vegetarian", "Non-Vegetarian", "Non-Vegetarian (Halal)"].map((option) => (
              <label key={option} className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="radio"
                  name={`foodPreference-${attendeeNum}`}
                  value={option}
                  checked={attendee.foodPreference === option}
                  onChange={(e) => onAttendeeChange(attendeeNum, "foodPreference", e.target.value)}
                  className="text-blue-600 focus:ring-blue-500"
                />
                <span className="text-sm text-gray-700">{option}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Dietary Restrictions</label>
            <textarea
              value={attendee.dietaryRestrictions}
              onChange={(e) => onAttendeeChange(attendeeNum, "dietaryRestrictions", e.target.value)}
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
              value={attendee.accessibilityNeeds}
              onChange={(e) => onAttendeeChange(attendeeNum, "accessibilityNeeds", e.target.value)}
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              rows="3"
              placeholder="This information will help us ensure your comfort and safety"
            />
          </div>
        </div>
      </div>

      {/* GIMSOC Membership */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium text-gray-700 border-b border-gray-200 pb-2">GIMSOC Membership</h3>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">Are you a GIMSOC member? *</label>
          <div className="space-y-2">
            {["Yes", "No"].map((option) => (
              <label key={option} className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="radio"
                  name={`isGimsocMember-${attendeeNum}`}
                  value={option}
                  checked={attendee.isGimsocMember === option}
                  onChange={(e) => onAttendeeChange(attendeeNum, "isGimsocMember", e.target.value)}
                  className="text-blue-600 focus:ring-blue-500"
                />
                <span className="text-sm text-gray-700">{option}</span>
              </label>
            ))}
          </div>
        </div>

        {attendee.isGimsocMember === "Yes" && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Enter your GIMSOC Membership Code *</label>
            <input
              type="text"
              value={attendee.membershipCode}
              onChange={(e) => onAttendeeChange(attendeeNum, "membershipCode", e.target.value)}
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              placeholder="Enter your membership code"
              required
            />
          </div>
        )}
      </div>

      {/* Declaration and Consent */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium text-gray-700 border-b border-gray-200 pb-2">Declaration and Consent</h3>

        <div className="space-y-4">
          <label className="flex items-start space-x-3 cursor-pointer">
            <input
              type="checkbox"
              checked={attendee.infoAccurate}
              onChange={(e) => onAttendeeChange(attendeeNum, "infoAccurate", e.target.checked)}
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
                    name={`mediaConsent-${attendeeNum}`}
                    value={option}
                    checked={attendee.mediaConsent === option}
                    onChange={(e) => onAttendeeChange(attendeeNum, "mediaConsent", e.target.value)}
                    className="text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-700">{option}</span>
                </label>
              ))}
            </div>
          </div>

          <label className="flex items-start space-x-3 cursor-pointer">
            <input
              type="checkbox"
              checked={attendee.policies}
              onChange={(e) => onAttendeeChange(attendeeNum, "policies", e.target.checked)}
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
              checked={attendee.emailConsent}
              onChange={(e) => onAttendeeChange(attendeeNum, "emailConsent", e.target.checked)}
              className="mt-1 text-blue-600 focus:ring-blue-500"
            />
            <span className="text-sm text-gray-700">
              I agree to receive emails from GIMSOC, including updates, resources, and conference-related information
            </span>
          </label>

          <label className="flex items-start space-x-3 cursor-pointer">
            <input
              type="checkbox"
              checked={attendee.whatsappConsent}
              onChange={(e) => onAttendeeChange(attendeeNum, "whatsappConsent", e.target.checked)}
              className="mt-1 text-blue-600 focus:ring-blue-500"
            />
            <span className="text-sm text-gray-700">
              I consent to be added to our WhatsApp group for updates, discussions, and announcements related to MEDCON
            </span>
          </label>
        </div>
      </div>
    </section>
  )
}

export default function GroupTicket() {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const [groupSize, setGroupSize] = useState("")
  const [workshopPackage, setWorkshopPackage] = useState("")
  const [paymentMethod, setPaymentMethod] = useState("")
  const [paymentProof, setPaymentProof] = useState(null)

  const [attendees, setAttendees] = useState({
    1: {
      fullName: "",
      email: "",
      whatsapp: "",
      university: "",
      semester: "",
      examPrep: "",
      examOther: "",
      headshot: null,
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
    },
    2: {
      fullName: "",
      email: "",
      whatsapp: "",
      university: "",
      semester: "",
      examPrep: "",
      examOther: "",
      headshot: null,
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
    },
    3: {
      fullName: "",
      email: "",
      whatsapp: "",
      university: "",
      semester: "",
      examPrep: "",
      examOther: "",
      headshot: null,
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
    },
  })

  // Calculate price based on group size and workshop package
  const calculatePrice = () => {
    const numAttendees = groupSize ? parseInt(groupSize.split(" ")[2]) : 0
    const basePrice = 50 // Base price per individual ticket
    const packagePrices = {
      "Package A": 0,
      "Package B": 25,
      "Package C": 50,
    }
    const groupDiscount = numAttendees >= 2 ? 0.1 : 0 // 10% group discount
    const totalBeforeDiscount = numAttendees * (basePrice + (packagePrices[workshopPackage] || 0))
    return Math.round(totalBeforeDiscount * (1 - groupDiscount))
  }

  // Memoize the callback functions to prevent unnecessary re-renders
  const handleAttendeeChange = useCallback((attendeeNum, field, value) => {
    setAttendees((prev) => ({
      ...prev,
      [attendeeNum]: {
        ...prev[attendeeNum],
        [field]: value,
      },
    }))
  }, [])

  const handleAttendeeFileChange = useCallback((attendeeNum, field, file) => {
    setAttendees((prev) => ({
      ...prev,
      [attendeeNum]: {
        ...prev[attendeeNum],
        [field]: file,
      },
    }))
  }, [])

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault()

      setIsSubmitting(true)

      try {
        // Simulate API call delay
        await new Promise((resolve) => setTimeout(resolve, 1500))

        const trimmedAttendees = Object.fromEntries(
          Object.entries(attendees).slice(0, parseInt(groupSize.split(" ")[2]))
        )

        console.log("✅ Group ticket submitted successfully:", {
          ticketType: "Group",
          groupSize,
          workshopPackage,
          paymentMethod,
          attendees: Object.values(trimmedAttendees),
        })

        alert("✅ Group ticket submitted successfully!")

        // Reset form
        setGroupSize("")
        setWorkshopPackage("")
        setPaymentMethod("")
        setPaymentProof(null)
        setAttendees({
          1: {
            fullName: "",
            email: "",
            whatsapp: "",
            university: "",
            semester: "",
            examPrep: "",
            examOther: "",
            headshot: null,
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
          },
          2: {
            fullName: "",
            email: "",
            whatsapp: "",
            university: "",
            semester: "",
            examPrep: "",
            examOther: "",
            headshot: null,
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
          },
          3: {
            fullName: "",
            email: "",
            whatsapp: "",
            university: "",
            semester: "",
            examPrep: "",
            examOther: "",
            headshot: null,
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
          },
        })
      } catch (err) {
        console.error("❌ Error submitting group ticket:", err)
        alert("Submission failed. Please try again.")
      } finally {
        setIsSubmitting(false)
      }
    },
    [groupSize, workshopPackage, paymentMethod, paymentProof, attendees]
  )

  // Calculate number of attendees based on group size
  const numAttendees = useMemo(() => {
    return groupSize ? parseInt(groupSize.split(" ")[2]) : 0
  }, [groupSize])

  // Memoize attendee sections to prevent unnecessary re-renders
  const attendeeSections = useMemo(() => {
    return Array.from({ length: numAttendees }, (_, i) => {
      const attendeeNum = i + 1
      return (
        <AttendeeSection
          key={`attendee-${attendeeNum}`}
          attendeeNum={attendeeNum}
          attendee={attendees[attendeeNum]}
          onAttendeeChange={handleAttendeeChange}
          onAttendeeFileChange={handleAttendeeFileChange}
        />
      )
    })
  }, [numAttendees, attendees, handleAttendeeChange, handleAttendeeFileChange])

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-6">
            <h1 className="text-3xl font-bold text-white text-center">Group Registration</h1>
            <p className="text-blue-100 text-center mt-2">Register multiple attendees together</p>
          </div>

          <form onSubmit={handleSubmit} className="p-8 space-y-10">
            {/* Group Size Selection */}
            <section className="space-y-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <Users className="w-6 h-6 text-purple-600" />
                </div>
                <h2 className="text-2xl font-semibold text-gray-800">Group Size</h2>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  How many attendees are registering in this group? *
                </label>
                <div className="space-y-3">
                  {["Group of 2", "Group of 3"].map((size) => (
                    <label
                      key={size}
                      className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer transition-all"
                    >
                      <input
                        type="radio"
                        name="groupSize"
                        value={size}
                        checked={groupSize === size}
                        onChange={(e) => setGroupSize(e.target.value)}
                        className="text-blue-600 focus:ring-blue-500"
                        required
                      />
                      <span className="text-gray-700 font-medium">{size}</span>
                    </label>
                  ))}
                </div>
              </div>
            </section>

            {/* Workshop Package Selection */}
            {groupSize && (
              <section className="space-y-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <Calendar className="w-6 h-6 text-green-600" />
                  </div>
                  <h2 className="text-2xl font-semibold text-gray-800">Select Your Group's Workshop Package</h2>
                </div>

                <div>
                  <p className="text-sm text-gray-600 mb-4">
                    The entire group will be registered under one workshop track. Please select your preferred package:
                  </p>
                  <div className="space-y-3">
                    {["Package A", "Package B", "Package C"].map((pkg) => (
                      <label
                        key={pkg}
                        className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer transition-all"
                      >
                        <input
                          type="radio"
                          name="workshopPackage"
                          value={pkg}
                          checked={workshopPackage === pkg}
                          onChange={(e) => setWorkshopPackage(e.target.value)}
                          className="text-blue-600 focus:ring-blue-500"
                          required
                        />
                        <span className="text-gray-700 font-medium">{pkg}</span>
                      </label>
                    ))}
                  </div>
                  <p className="text-xs text-gray-500 mt-2">
                    Workshop spots are limited and will be confirmed based on availability
                  </p>
                </div>
              </section>
            )}

            {/* Attendee Sections */}
            {workshopPackage && <div className="space-y-8">{attendeeSections}</div>}

            {/* Payment Confirmation */}
            {numAttendees > 0 && (
              <section className="space-y-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-yellow-100 rounded-lg">
                    <CreditCard className="w-6 h-6 text-yellow-600" />
                  </div>
                  <h2 className="text-2xl font-semibold text-gray-800">Payment Confirmation</h2>
                </div>

                {/* Price Display */}
                {workshopPackage && (
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-medium text-gray-700">Group Total Amount:</span>
                      <span className="text-2xl font-bold text-blue-600">{calculatePrice()} GEL</span>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">
                      {groupSize} × ({workshopPackage}) with 10% group discount
                    </p>
                  </div>
                )}

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
                          checked={paymentMethod === method}
                          onChange={(e) => setPaymentMethod(e.target.value)}
                          className="text-blue-600 focus:ring-blue-500"
                          required
                        />
                        <span className="text-gray-700">{method}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {paymentMethod === "Bank Transfer" && (
                  <div className="space-y-6">
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                      <h3 className="text-lg font-semibold text-blue-800 mb-4">Bank Details for Transfer</h3>
                      
                      <div className="space-y-4">
                        <div className="bg-white rounded-lg p-4 border border-blue-100">
                          <h4 className="font-semibold text-gray-800 mb-3">BANK DETAILS FOR TRANSFERS IN GEORGIAN LARI (GEL)</h4>
                          <div className="space-y-2 text-sm">
                            <p><span className="font-medium">Account with institution:</span> Bank of Georgia</p>
                            <p><span className="font-medium">SWIFT:</span> BAGAGE22</p>
                            <p><span className="font-medium">Beneficiary:</span> FERNANDO MANDRIKA SANTOSH U.</p>
                            <p><span className="font-medium">Account:</span> GE94BG0000000608342766</p>
                            <p><span className="font-medium">Phone:</span> (+995 32) 2 444 444</p>
                            <p><span className="font-medium">E-mail:</span> welcome@bog.ge</p>
                          </div>
                        </div>

                        <div className="bg-white rounded-lg p-4 border border-blue-100">
                          <h4 className="font-semibold text-gray-800 mb-3">FOR LARI TRANSFER</h4>
                          <div className="space-y-2 text-sm">
                            <p><span className="font-medium">Beneficiary's Bank:</span> JSC TBC Bank</p>
                            <p><span className="font-medium">Location:</span> Tbilisi, Georgia</p>
                            <p><span className="font-medium">Swift:</span> TBCBGE22</p>
                            <p><span className="font-medium">Beneficiary's IBAN:</span> GE31TB7724245061200012</p>
                            <p><span className="font-medium">Name of Beneficiary:</span> Mandrika Santosh Umanga Fernando</p>
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
                          onChange={(e) => setPaymentProof(e.target.files[0])}
                          accept=".pdf"
                          className="hidden"
                          id="payment-upload"
                        />
                        <label htmlFor="payment-upload" className="cursor-pointer">
                          <span className="text-blue-600 hover:text-blue-700 font-medium">Click to upload</span>
                          <span className="text-gray-500"> or drag and drop</span>
                        </label>
                        <p className="text-xs text-gray-500 mt-1">PDF format only - Bank transfer confirmation</p>
                        {paymentProof && (
                          <p className="text-sm text-green-600 mt-2">✓ File selected: {paymentProof.name}</p>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </section>
            )}

            {/* Submit Button */}
            {numAttendees > 0 && (
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
                  {isSubmitting ? "Submitting..." : "Submit Group Registration"}
                </button>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  )
}