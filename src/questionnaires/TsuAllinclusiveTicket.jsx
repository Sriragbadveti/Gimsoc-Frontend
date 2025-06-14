"use client"
import { useState } from "react"
import {
  Upload,
  User,
  GraduationCap,
  Calendar,
  Camera,
  Utensils,
  CreditCard,
  AlertCircle,
  CheckCircle,
  Star,
} from "lucide-react"
import PayPalButton from "../Components/PaypalButton"
import axios from "axios"
export default function TsuAllInclusiveTicket() {
  // Payment states - exactly like individual ticket
  const [paymentCompleted, setPaymentCompleted] = useState(false)
  const [paymentDetails, setPaymentDetails] = useState(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const [formData, setFormData] = useState({
    isTsuStudent: "",
    fullName: "",
    email: "",
    whatsapp: "",
    semester: "",
    tsuEmail: "",
    examPrep: "",
    examOther: "",
    workshopPackage: "",
    headshot: null,
    foodPreference: "",
    dietaryRestrictions: "",
    accessibilityNeeds: "",
    discountConfirmation: false,
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

  // Calculate price based on workshop package - TSU discounted rates
  const calculatePrice = () => {
    const basePrice = 30 // TSU discounted base price
    const packagePrices = {
      "Package A": 0,
      "Package B": 15,
      "Package C": 25,
    }
    return basePrice + (packagePrices[formData.workshopPackage] || 0)
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

  // Submit handler with payment validation - exactly like individual ticket
  const handleSubmit = async (e) => {
  e.preventDefault();

  // Check if payment is required and completed
  if (formData.paymentMethod === "Credit/Debit Card" && !paymentCompleted) {
    alert("Please complete the payment before submitting the form.");
    return;
  }

  setIsSubmitting(true);

  const form = new FormData();
  form.append("ticketType", "TSU All Inclusive");

  Object.entries(formData).forEach(([key, value]) => {
    if (value !== null && value !== undefined) {
      // Convert string to Boolean for specific fields
      if (
        [
          "infoAccurate",
          "policies",
          "emailConsent",
          "whatsappConsent",
          "discountConfirmation",
        ].includes(key)
      ) {
        form.append(
          key,
          value === true || value === "true" || value === "Yes"
        );
      } else if (["isTsuStudent", "mediaConsent"].includes(key)) {
        form.append(key, value === "Yes");
      }
      // File fields
      else if (key === "headshot" || key === "paymentProof") {
        form.append(key, value); // multer handles File object
      }
      // All others as-is
      else {
        form.append(key, value);
      }
    }
  });

  // Add payment details if payment was completed
  if (paymentDetails) {
    form.append("paymentDetails", JSON.stringify(paymentDetails));
    form.append("paymentStatus", "completed");
  }

  try {
    const response = await axios.post(
      "https://gimsoc-backend.onrender.com/api/ticket/submit",
      form,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      }
    );

    console.log("✅ Submitted successfully:", response.data);
    alert("Form submitted successfully!");

    // Optionally reset form after submission — up to you
    // setFormData({ ... });  (you already have this in your original handleSubmit)
    // setPaymentCompleted(false);
    // setPaymentDetails(null);

  } catch (err) {
    console.error("❌ Submission failed:", err.response?.data || err.message);
    alert("Form submission failed.");
  } finally {
    setIsSubmitting(false);
  }
};

  const semesters = Array.from({ length: 12 }, (_, i) => `${i + 1}`).concat(["Graduated"])
  const exams = ["USMLE", "AMC", "PLAB", "FMGE", "EMREE", "IFOM"]

  // Show ineligibility message if not a TSU student
  if (formData.isTsuStudent === "No") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-orange-50 py-8 px-4">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
            <div className="bg-gradient-to-r from-red-500 to-orange-500 px-8 py-6">
              <h1 className="text-3xl font-bold text-white text-center">Registration Not Available</h1>
            </div>
            <div className="p-8 text-center">
              <div className="p-4 bg-red-100 rounded-full w-20 h-20 mx-auto mb-6 flex items-center justify-center">
                <AlertCircle className="w-10 h-10 text-red-600" />
              </div>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">TSU Students Only</h2>
              <p className="text-gray-600 mb-6 leading-relaxed">
                This registration form is only for TSU students eligible for the discounted ticket. Please return to the
                main registration page to select the appropriate registration option.
              </p>
              <button
                onClick={() => setFormData((prev) => ({ ...prev, isTsuStudent: "" }))}
                className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 px-6 rounded-lg font-semibold hover:from-blue-700 hover:to-indigo-700 focus:ring-4 focus:ring-blue-200 transition-all"
              >
                Back to Eligibility Check
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-6">
            <h1 className="text-3xl font-bold text-white text-center">TSU All Inclusive Ticket</h1>
            <p className="text-blue-100 text-center mt-2">
              Discounted all-inclusive registration for TSU medical students
            </p>
            <div className="flex justify-center mt-3">
              <div className="flex items-center gap-1 bg-yellow-400 text-yellow-900 px-3 py-1 rounded-full text-sm font-medium">
                <Star className="w-4 h-4" />
                All Inclusive Package
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="p-8 space-y-10">
            {/* Eligibility Confirmation */}
            <section className="space-y-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-green-100 rounded-lg">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                </div>
                <h2 className="text-2xl font-semibold text-gray-800">Eligibility Confirmation</h2>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Are you a currently enrolled student at Ivane Javakhishvili Tbilisi State University – Faculty of
                  Medicine? *
                </label>
                <div className="space-y-3">
                  {["Yes", "No"].map((option) => (
                    <label
                      key={option}
                      className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:bg-white cursor-pointer transition-all"
                    >
                      <input
                        type="radio"
                        name="isTsuStudent"
                        value={option}
                        checked={formData.isTsuStudent === option}
                        onChange={handleInputChange}
                        className="text-blue-600 focus:ring-blue-500"
                        required
                      />
                      <span className="text-gray-700 font-medium">{option}</span>
                    </label>
                  ))}
                </div>
              </div>
            </section>

            {/* Only show the rest of the form if they confirmed TSU student status */}
            {formData.isTsuStudent === "Yes" && (
              <>
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
                        placeholder="Please enter your full legal name"
                        required
                      />
                      <p className="text-xs text-gray-500 mt-1">
                        As you would like it to appear on your ID card and certificate
                      </p>
                    </div>

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
                </section>

                {/* Academic Verification */}
                <section className="space-y-6">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 bg-green-100 rounded-lg">
                      <GraduationCap className="w-6 h-6 text-green-600" />
                    </div>
                    <h2 className="text-2xl font-semibold text-gray-800">Academic Verification</h2>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">University Name</label>
                      <input
                        type="text"
                        value="Ivane Javakhishvili Tbilisi State University – Faculty of Medicine"
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg bg-gray-50 text-gray-600"
                        readOnly
                      />
                      <p className="text-xs text-gray-500 mt-1">Pre-filled based on your eligibility</p>
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
                        <option value="">Select your current semester</option>
                        {semesters.map((sem, index) => (
                          <option key={index} value={sem}>
                            {sem}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">TSU Email Address *</label>
                    <input
                      type="email"
                      name="tsuEmail"
                      value={formData.tsuEmail}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      placeholder="Enter your TSU email ID (e.g., student@tsu.ge)"
                      required
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Please enter your official TSU email address for verification
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Which exam are you preparing for?
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

                {/* Workshop Selection */}
                <section className="space-y-6">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 bg-purple-100 rounded-lg">
                      <Calendar className="w-6 h-6 text-purple-600" />
                    </div>
                    <h2 className="text-2xl font-semibold text-gray-800">Workshop Selection</h2>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Select Your Desired Workshop Package *
                    </label>
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
                            checked={formData.workshopPackage === pkg}
                            onChange={handleInputChange}
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
                      Upload a Headshot for Your Conference ID Card *
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
                      <p className="text-xs text-gray-500 mt-1">Clear, front-facing photo with plain background</p>
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
                    <p className="text-sm text-gray-600 mb-3">
                      Please select your food preference for the duration of the conference.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                      {["Vegetarian", "Non-Vegetarian", "Non Vegetarian Halal"].map((option) => (
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

                {/* Payment and Pricing Acknowledgment */}
                <section className="space-y-6">
                  <h2 className="text-2xl font-semibold text-gray-800">Payment and Pricing Acknowledgment</h2>

                  <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                    <label className="flex items-start space-x-3 cursor-pointer">
                      <input
                        type="checkbox"
                        name="discountConfirmation"
                        checked={formData.discountConfirmation}
                        onChange={handleInputChange}
                        className="mt-1 text-green-600 focus:ring-green-500"
                        required
                      />
                      <div>
                        <span className="text-sm font-medium text-gray-700">Discount Confirmation *</span>
                        <p className="text-sm text-gray-600 mt-1">
                          I acknowledge that I am eligible for the discounted TSU student ticket and understand that
                          this rate applies only with valid proof of enrollment.
                        </p>
                      </div>
                    </label>
                  </div>
                </section>

                {/* Declaration and Consent */}
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
                        Do you consent to the use of photos and videos of you taken during the conference for
                        promotional purposes?
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
                        I consent to be added to our WhatsApp group for updates, discussions, and announcements related
                        to MEDCON
                      </span>
                    </label>
                  </div>
                </section>

                {/* Payment Confirmation - Enhanced with PayPal integration */}
                <section className="space-y-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-yellow-100 rounded-lg">
                  <CreditCard className="w-6 h-6 text-yellow-600" />
                </div>
                <h2 className="text-2xl font-semibold text-gray-800">Payment Confirmation</h2>
              </div>

              {/* Price Display */}
              {formData.workshopPackage && (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-medium text-gray-700">Total Amount:</span>
                    <span className="text-2xl font-bold text-blue-600">{calculatePrice()} GEL</span>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">Individual ticket + {formData.workshopPackage}</p>
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
                        checked={formData.paymentMethod === method}
                        onChange={handleInputChange}
                        className="text-blue-600 focus:ring-blue-500"
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
                      <p className="text-xs text-gray-500 mt-1">PDF format only - Bank transfer confirmation</p>
                    </div>
                  </div>
                </div>
              )}
            </section>

                {/* Submit Button - exactly like individual ticket */}
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
                    {isSubmitting ? "Submitting..." : "Submit TSU All Inclusive Registration"}
                  </button>

                  {formData.paymentMethod === "Credit/Debit Card" && !paymentCompleted && (
                    <p className="text-sm text-gray-500 text-center mt-2">
                      Please complete the payment above before submitting
                    </p>
                  )}
                </div>
              </>
            )}
          </form>
        </div>
      </div>
    </div>
  )
}
