"use client"

import { useState } from "react"
import { Upload, FileText, User, AlertCircle, CheckCircle } from "lucide-react"
import axios from "axios"

export default function AbstractPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showSuccessModal, setShowSuccessModal] = useState(false)
  const [formData, setFormData] = useState({
    // Personal Information
    fullName: "",
    email: "",
    whatsapp: "",

    // Ticket Verification
    hasTicket: "",
    ticketId: "",

    // Abstract Details
    title: "",
    category: "",
    authors: "",
    presentingAuthor: "",
    isPresentingAuthorSame: "",

    // File Upload
    abstractFile: null,

    // Consent
    originalityConsent: false,
    disqualificationConsent: false,
    permissionConsent: false,
  })

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }))
  }

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    setFormData((prev) => ({
      ...prev,
      abstractFile: file,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const form = new FormData()

      // Append all form data
      for (const key in formData) {
        if (key === "abstractFile") {
          form.append("abstractFile", formData[key])
        } else {
          form.append(key, formData[key])
        }
      }

      const response = await axios.post("https://gimsoc-backend.onrender.com/api/abstract/submission", form, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      })

      // Show success modal instead of alert
      setShowSuccessModal(true)
      console.log("Server Response:", response.data)

      // Reset form
      setFormData({
        fullName: "",
        email: "",
        whatsapp: "",
        hasTicket: "",
        ticketId: "",
        title: "",
        category: "",
        authors: "",
        presentingAuthor: "",
        isPresentingAuthorSame: "",
        abstractFile: null,
        originalityConsent: false,
        disqualificationConsent: false,
        permissionConsent: false,
      })
    } catch (error) {
      console.error("❌ Submission failed:", error)
      alert("❌ Submission failed. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleContinue = () => {
    setShowSuccessModal(false)
    window.location.href = "/abstract-success"
  }

  const categories = ["Case Report", "Original Work ", "Systematic Review / Meta Analysis", "Clinical Trial", "Other"]

  return (
    <>
      <div className="min-h-screen bg-gray-50 py-8 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            {/* Header */}
            <div className="bg-gray-900 px-8 py-6">
              <h1 className="text-3xl font-bold text-white text-center">Abstract Submission</h1>
              <p className="text-gray-300 text-center mt-2">MEDCON'25</p>
            </div>

            {/* Important Notice */}
            <div className="bg-amber-50 border-l-4 border-amber-400 p-4 m-6">
              <div className="flex">
                <AlertCircle className="h-5 w-5 text-amber-400 mt-0.5" />
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-amber-800">Important Notice</h3>
                  <div className="mt-2 text-sm text-amber-700">
                    <ul className="list-disc list-inside space-y-1">
                      <li>
                        Once abstracts are accepted, participants must purchase a ticket. If you have not purchased a
                        ticket, your abstract will be disqualified.
                      </li>
                      <li>Make sure to follow the MEDCON'25 Author guidelines</li>
                      <li>
                        For any questions feel free to reach out by email to nikhilalizaby@gmail.com and CC
                        medconconferencegimsoc@gmail.com
                      </li>
                    </ul>
                  </div>
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
                  <h2 className="text-2xl font-semibold text-gray-800">1. Personal Information</h2>
                </div>

                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter your full legal name (as used during ticket registration)"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email Address *</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Provide the same email used when purchasing your ticket"
                      required
                    />
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
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="For communication related to abstract acceptance or queries"
                      required
                    />
                  </div>
                </div>
              </section>

              {/* Section 3: Abstract Details */}
              <section className="space-y-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-purple-100 rounded-lg">
                    <FileText className="w-6 h-6 text-purple-600" />
                  </div>
                  <h2 className="text-2xl font-semibold text-gray-800">2. Abstract Details</h2>
                </div>

                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Title of Abstract *</label>
                    <input
                      type="text"
                      name="title"
                      value={formData.title}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter the title of your abstract"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Category *</label>
                    <select
                      name="category"
                      value={formData.category}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    >
                      <option value="">Select the category most relevant to your submission</option>
                      {categories.map((category) => (
                        <option key={category} value={category}>
                          {category}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Authors (List all in order, including affiliations) *
                    </label>
                    <textarea
                      name="authors"
                      value={formData.authors}
                      onChange={handleInputChange}
                      rows="4"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Format: Full Name – Institution&#10;Example:&#10;John Doe – Harvard Medical School&#10;Jane Smith – Mayo Clinic"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Presenting Author *</label>
                    <input
                      type="text"
                      name="presentingAuthor"
                      value={formData.presentingAuthor}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Only one person can present. Please indicate who it will be."
                      required
                    />
                  </div>
                </div>
              </section>

              {/* Section 4: Abstract Upload */}
              <section className="space-y-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-orange-100 rounded-lg">
                    <Upload className="w-6 h-6 text-orange-600" />
                  </div>
                  <h2 className="text-2xl font-semibold text-gray-800">3. Abstract Upload</h2>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Upload Your Abstract File (Name your pdf as - (Lastname_Firstname_AbstractTitle) )*
                  </label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors">
                    <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                    <input
                      type="file"
                      onChange={handleFileChange}
                      accept=".pdf"
                      className="hidden"
                      id="abstract-upload"
                      required
                    />
                    <label htmlFor="abstract-upload" className="cursor-pointer">
                      <span className="text-blue-600 hover:text-blue-700 font-medium">Click to upload</span>
                      <span className="text-gray-500"> or drag and drop</span>
                    </label>
                    <p className="text-xs text-gray-500 mt-2">Format: PDF only. Max file size: 10MB.</p>

                    {formData.abstractFile && (
                      <p className="text-sm text-green-600 mt-2">✓ File selected: {formData.abstractFile.name}</p>
                    )}
                  </div>
                </div>
              </section>

              {/* Section 5: Consent and Declaration */}
              <section className="space-y-6">
                <h2 className="text-2xl font-semibold text-gray-800">4. Consent and Declaration</h2>

                <div className="space-y-4">
                  <label className="flex items-start space-x-3 cursor-pointer">
                    <input
                      type="checkbox"
                      name="originalityConsent"
                      checked={formData.originalityConsent}
                      onChange={handleInputChange}
                      className="mt-1 text-blue-600 focus:ring-blue-500"
                      required
                    />
                    <span className="text-sm text-gray-700">
                      I confirm that the abstract submitted is original and has not been plagiarized. *
                    </span>
                  </label>

                  <label className="flex items-start space-x-3 cursor-pointer">
                    <input
                      type="checkbox"
                      name="disqualificationConsent"
                      checked={formData.disqualificationConsent}
                      onChange={handleInputChange}
                      className="mt-1 text-blue-600 focus:ring-blue-500"
                      required
                    />
                    <span className="text-sm text-gray-700">
                      I consent that if my abstract is accepted to be added to a whatsapp group to a clearer
                      communication with the scientific committee. *
                    </span>
                  </label>

                  <label className="flex items-start space-x-3 cursor-pointer">
                    <input
                      type="checkbox"
                      name="permissionConsent"
                      checked={formData.permissionConsent}
                      onChange={handleInputChange}
                      className="mt-1 text-blue-600 focus:ring-blue-500"
                      required
                    />
                    <span className="text-sm text-gray-700">
                      I grant the organizing committee permission to use my abstract for the official conference booklet
                      and promotional materials if selected. *
                    </span>
                  </label>
                </div>
              </section>

              {/* Submit Button */}
              <div className="pt-6">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full py-4 px-6 rounded-lg font-semibold text-lg transition-all ${
                    isSubmitting
                      ? "bg-gray-400 text-gray-600 cursor-not-allowed"
                      : "bg-gray-900 text-white hover:bg-gray-800 focus:ring-4 focus:ring-gray-300"
                  }`}
                >
                  {isSubmitting ? "Submitting Abstract..." : "Submit Abstract"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Success Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[9999] p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md max-h-[90vh] overflow-y-auto relative">
            {/* Modal Content */}
            <div className="p-6 text-center">
              {/* Success Icon */}
              <div className="mx-auto flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>

              {/* Success Message */}
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Abstract Submitted Successfully!</h3>
              <p className="text-gray-600 mb-6">
                You will receive updates , acceptance or rejection through the provided emails.
              </p>

              {/* Continue Button */}
              <button
                onClick={handleContinue}
                className="w-full bg-green-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-green-700 transition-colors focus:ring-4 focus:ring-green-300"
              >
                Continue
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
