"use client"

import { useState } from "react"
import { Upload, User, Stethoscope, Camera, Utensils, CreditCard, FileText, Award } from "lucide-react"
import axios from "axios"
import { useNavigate } from "react-router-dom";
export default function DoctorTicket() {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    whatsapp: "",
    medicalQualification: "",
    specialty: "",
    currentWorkplace: "",
    countryOfPractice: "",
    headshot: null,
    foodPreference: "",
    dietaryRestrictions: "",
    accessibilityNeeds: "",
    paymentMethod: "",
    paymentProof: null,
    infoAccurate: false,
    mediaConsent: false,
    policies: false,
    emailConsent: false,
    whatsappConsent: false,
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

  // Fixed price for doctor professional ticket
  const doctorTicketPrice = 200 // Fixed professional rate in GEL
const navigate =  useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault()

    setIsSubmitting(true)

    const form = new FormData()
    form.append("ticketType", "Doctor")

    Object.entries(formData).forEach(([key, value]) => {
      if (value !== null && value !== undefined) {
        if (["infoAccurate", "policies", "emailConsent", "whatsappConsent"].includes(key)) {
          form.append(key, value === true || value === "true" || value === "Yes")
        } else if (["mediaConsent"].includes(key)) {
          form.append(key, value === true || value === "true" || value === "Yes")
        } else if (key === "headshot" || key === "paymentProof") {
          form.append(key, value)
        } else {
          form.append(key, value)
        }
      }
    })

    try {
      const response = await axios.post("https://gimsoc-backend.onrender.com/api/form/submit", form, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      })

      console.log("✅ Doctor ticket submitted successfully:", response.data)
      alert("Doctor registration submitted successfully!")
      window.location.href = "/ticket-success"
      // Reset form
      setFormData({
        fullName: "",
        email: "",
        whatsapp: "",
        medicalQualification: "",
        specialty: "",
        currentWorkplace: "",
        countryOfPractice: "",
        headshot: null,
        foodPreference: "",
        dietaryRestrictions: "",
        accessibilityNeeds: "",
        paymentMethod: "",
        paymentProof: null,
        infoAccurate: false,
        mediaConsent: false,
        policies: false,
        emailConsent: false,
        whatsappConsent: false,
      })
    } catch (err) {
      console.error("❌ Doctor submission failed:", err.response?.data || err.message)
      alert("Form submission failed.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const medicalQualifications = [
    "MBBS",
    "MD",
    "MS",
    "DM",
    "MCh",
    "DNB",
    "MRCP",
    "MRCS",
    "FRCP",
    "FRCS",
    "DO",
    "PharmD",
    "BDS",
    "MDS",
    "BAMS",
    "BHMS",
    "BUMS",
    "Other",
  ]

  const specialties = [
    "General Medicine",
    "Internal Medicine",
    "Family Medicine",
    "Cardiology",
    "Dermatology",
    "Neurology",
    "Psychiatry",
    "Pediatrics",
    "Obstetrics & Gynecology",
    "Surgery",
    "Orthopedics",
    "Ophthalmology",
    "ENT",
    "Anesthesiology",
    "Radiology",
    "Pathology",
    "Emergency Medicine",
    "Critical Care",
    "Oncology",
    "Endocrinology",
    "Gastroenterology",
    "Pulmonology",
    "Nephrology",
    "Rheumatology",
    "Infectious Diseases",
    "Geriatrics",
    "Sports Medicine",
    "Plastic Surgery",
    "Urology",
    "Other",
  ]

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
    "Georgia",
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
            <h1 className="text-3xl font-bold text-white text-center">Doctor Registration</h1>
            <p className="text-blue-100 text-center mt-2">Professional medical conference registration</p>
            <div className="flex justify-center mt-3">
              <div className="flex items-center gap-1 bg-emerald-400 text-emerald-900 px-3 py-1 rounded-full text-sm font-medium">
                <Award className="w-4 h-4" />
                Professional Ticket
              </div>
            </div>
            {/* Price Display in Header */}
            <div className="text-center mt-4">
              <div className="inline-block bg-white/20 backdrop-blur-sm rounded-lg px-6 py-3">
                <span className="text-white text-lg font-medium">Professional Rate: </span>
                <span className="text-white text-2xl font-bold">{doctorTicketPrice} GEL</span>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="p-8 space-y-10">
            {/* Section 1: Personal Information */}
            <section className="space-y-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <User className="w-6 h-6 text-blue-600" />
                </div>
                <h2 className="text-2xl font-semibold text-gray-800">Section 1: Personal Information</h2>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="Enter your full name"
                    required
                  />
                  <p className="text-xs text-gray-500 mt-1">As it should appear on your ID badge and certificate</p>
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
                      placeholder="Enter your email address"
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
                    <p className="text-xs text-gray-500 mt-1">For important updates and urgent communication</p>
                  </div>
                </div>
              </div>
            </section>

            {/* Section 2: Professional Information */}
            <section className="space-y-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-green-100 rounded-lg">
                  <Stethoscope className="w-6 h-6 text-green-600" />
                </div>
                <h2 className="text-2xl font-semibold text-gray-800">Section 2: Professional Information</h2>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Medical Qualification *</label>
                  <select
                    name="medicalQualification"
                    value={formData.medicalQualification}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    required
                  >
                    <option value="">Select your highest qualification</option>
                    {medicalQualifications.map((qualification, index) => (
                      <option key={index} value={qualification}>
                        {qualification}
                      </option>
                    ))}
                  </select>
                  <p className="text-xs text-gray-500 mt-1">e.g., MBBS, MD, MS, DM, MRCP</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Specialty/Area of Practice *</label>
                  <select
                    name="specialty"
                    value={formData.specialty}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    required
                  >
                    <option value="">Select your specialty</option>
                    {specialties.map((specialty, index) => (
                      <option key={index} value={specialty}>
                        {specialty}
                      </option>
                    ))}
                  </select>
                  <p className="text-xs text-gray-500 mt-1">e.g., General Medicine, Dermatology, Surgery, Pediatrics</p>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Current Workplace / Affiliation *
                </label>
                <input
                  type="text"
                  name="currentWorkplace"
                  value={formData.currentWorkplace}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="Include hospital/clinic/medical college or institution name"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Country of Practice *</label>
                <select
                  name="countryOfPractice"
                  value={formData.countryOfPractice}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  required
                >
                  <option value="">Select country where you practice</option>
                  {countries.map((country, index) => (
                    <option key={index} value={country}>
                      {country}
                    </option>
                  ))}
                </select>
                <p className="text-xs text-gray-500 mt-1">Where you are currently practicing medicine</p>
              </div>
            </section>

            {/* Section 3: Identification */}
            <section className="space-y-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-orange-100 rounded-lg">
                  <Camera className="w-6 h-6 text-orange-600" />
                </div>
                <h2 className="text-2xl font-semibold text-gray-800">Section 3: Identification</h2>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Upload a Recent Headshot for ID Badge *
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
                    required
                  />
                  <label htmlFor="headshot-upload" className="cursor-pointer">
                    <span className="text-blue-600 hover:text-blue-700 font-medium">Click to upload</span>
                    <span className="text-gray-500"> or drag and drop</span>
                  </label>
                  <p className="text-xs text-gray-500 mt-1">
                    Please upload a clear, front-facing, passport-style photo with a plain background
                  </p>
                  {formData.headshot && (
                    <p className="text-sm text-green-600 mt-2">✓ File selected: {formData.headshot.name}</p>
                  )}
                </div>
              </div>
            </section>

            {/* Section 4: Food Preferences & Health Needs */}
            <section className="space-y-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-red-100 rounded-lg">
                  <Utensils className="w-6 h-6 text-red-600" />
                </div>
                <h2 className="text-2xl font-semibold text-gray-800">Section 4: Food Preferences & Health Needs</h2>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">Preferred Food Option *</label>
                <p className="text-sm text-gray-600 mb-3">Choose your food preference for the conference:</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {["Vegetarian", "Non-Vegetarian"].map((option) => (
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
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Dietary Restrictions or Allergies
                  </label>
                  <textarea
                    name="dietaryRestrictions"
                    value={formData.dietaryRestrictions}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    rows="3"
                    placeholder="If yes, please specify (e.g., gluten-free, nut allergy)"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Accessibility Needs or Medical Conditions
                  </label>
                  <textarea
                    name="accessibilityNeeds"
                    value={formData.accessibilityNeeds}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    rows="3"
                    placeholder="Any accessibility needs or medical conditions we should be aware of"
                  />
                </div>
              </div>
            </section>

            {/* Section 5: Payment Confirmation */}
            <section className="space-y-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-yellow-100 rounded-lg">
                  <CreditCard className="w-6 h-6 text-yellow-600" />
                </div>
                <h2 className="text-2xl font-semibold text-gray-800">Section 5: Payment Confirmation</h2>
              </div>

              {/* Fixed Price Display */}
              <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4 mb-4">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-medium text-gray-700">Professional Rate Total:</span>
                  <span className="text-2xl font-bold text-emerald-600">{doctorTicketPrice} GEL</span>
                </div>
                <p className="text-sm text-gray-600 mt-1">Doctor Professional Conference Ticket</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">Choose Your Payment Method *</label>
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
                        <h4 className="font-semibold text-gray-800 mb-3">
                          BANK OF GEORGIA
                        </h4>
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
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Upload Proof of Payment (if paid via bank transfer) *
                    </label>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors">
                      <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                      <input
                        type="file"
                        name="paymentProof"
                        onChange={handleFileChange}
                        accept=".pdf"
                        className="hidden"
                        id="payment-upload"
                      />
                      <label htmlFor="payment-upload" className="cursor-pointer">
                        <span className="text-blue-600 hover:text-blue-700 font-medium">Click to upload</span>
                        <span className="text-gray-500"> or drag and drop</span>
                      </label>
                      <p className="text-xs text-gray-500 mt-1">
                        Make sure the payment slip is clear and includes your full name (PDF format)
                      </p>
                      {formData.paymentProof && (
                        <p className="text-sm text-green-600 mt-2">✓ File selected: {formData.paymentProof.name}</p>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </section>

            {/* Section 6: Declaration and Consent */}
            <section className="space-y-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-indigo-100 rounded-lg">
                  <FileText className="w-6 h-6 text-indigo-600" />
                </div>
                <h2 className="text-2xl font-semibold text-gray-800">Section 6: Declaration and Consent</h2>
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
                    I confirm that all the information provided above is true and correct to the best of my knowledge. *
                  </span>
                </label>

                <label className="flex items-start space-x-3 cursor-pointer">
                  <input
                    type="checkbox"
                    name="mediaConsent"
                    checked={formData.mediaConsent}
                    onChange={handleInputChange}
                    className="mt-1 text-blue-600 focus:ring-blue-500"
                    required
                  />
                  <span className="text-sm text-gray-700">
                    I consent to the use of photos or videos taken of me during the event for promotional purposes. *
                  </span>
                </label>

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
                    I agree to abide by all rules, guidelines, and policies set by the conference organizing team. *
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

            {/* Submit Button */}
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
                {isSubmitting ? "Submitting..." : "Submit Doctor Registration"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
