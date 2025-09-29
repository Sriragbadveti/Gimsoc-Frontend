"use client"

import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import { User, Mail, Phone, Building2, Utensils, CreditCard, CheckCircle, Users } from "lucide-react"

export default function GalaAddonTicket() {
  const [fadeIn, setFadeIn] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [memberType, setMemberType] = useState("") // GIMSOC | Non-GIMSOC | Volunteer
  const [bankTransferKey, setBankTransferKey] = useState(0)
  const navigate = useNavigate()

  useEffect(() => setFadeIn(true), [])

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    whatsapp: "",
    universityName: "",
    foodPreference: "",
    gimsocMembershipCode: "",
    hasOtherTicket: "",
    otherTicketType: "",
    paymentMethod: "",
    headshot: null,
    paymentProof: null,
    infoAccurate: false,
    emailConsent: false,
    whatsappConsent: false,
    mediaConsent: "",
    // Volunteer specific
    volunteerTeam: "",
    volunteerEmail: "",
  })

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }))
    if (name === "paymentMethod" && value === "Bank Transfer") {
      setBankTransferKey((k) => k + 1)
    }
  }

  const handleFileChange = (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    const maxSize = 5 * 1024 * 1024
    const allowed = ["image/jpeg", "image/jpg", "image/png"]
    if (!allowed.includes(file.type)) {
      alert("Please upload a PNG or JPEG image only.")
      e.target.value = ""
      return
    }
    if (file.size > maxSize) {
      alert("File size must be <= 5MB")
      e.target.value = ""
      return
    }
    const name = e.target.name || "paymentProof"
    setFormData((p) => ({ ...p, [name]: file }))
  }

  const getMemberTypeDisplay = () => {
    if (memberType === "GIMSOC") return "GIMSOC Member"
    if (memberType === "Non-GIMSOC") return "Non-GIMSOC Member"
    if (memberType === "Volunteer") return "MEDCON Volunteer"
    return ""
  }

  const handleSubmit = async (e) => {
    e?.preventDefault()
    if (isSubmitting) return

    // Validate required fields
    const missing = []
    const requiredBase = [
      "fullName",
      "email",
      "whatsapp",
      "universityName",
      "foodPreference",
      "paymentMethod",
      "paymentProof",
    ]
    requiredBase.forEach((f) => {
      const v = formData[f]
      if (!v || (typeof v === "string" && v.trim() === "")) missing.push(f)
    })
    if (!formData.infoAccurate) missing.push("infoAccurate")
    if (!formData.emailConsent) missing.push("emailConsent")
    if (!formData.whatsappConsent) missing.push("whatsappConsent")
    if (!formData.mediaConsent) missing.push("mediaConsent")

    if (memberType === "GIMSOC" && !formData.gimsocMembershipCode) missing.push("gimsocMembershipCode")
    if (memberType === "Volunteer") {
      if (!formData.volunteerTeam) missing.push("volunteerTeam")
      if (!formData.volunteerEmail) missing.push("volunteerEmail")
    }

    if (missing.length) {
      alert("Please complete: " + missing.join(", "))
      return
    }

    try {
      setIsSubmitting(true)
      const form = new FormData()
      // Ticket classification for backend parity with Standard+2
      form.append("ticketCategory", "Standard")
      form.append("subType", memberType)
      form.append("ticketType", "Gala Add-On")
      // Base fields
      form.append("fullName", formData.fullName)
      form.append("email", formData.email)
      form.append("whatsapp", formData.whatsapp)
      form.append("universityName", formData.universityName)
      form.append("foodPreference", formData.foodPreference)
      form.append("hasOtherTicket", formData.hasOtherTicket || "")
      form.append("otherTicketType", formData.otherTicketType || "")
      form.append("paymentMethod", formData.paymentMethod)
      if (formData.headshot) form.append("headshot", formData.headshot)
      form.append("paymentProof", formData.paymentProof)
      form.append("infoAccurate", String(!!formData.infoAccurate))
      form.append("emailConsent", String(!!formData.emailConsent))
      form.append("whatsappConsent", String(!!formData.whatsappConsent))
      form.append("mediaConsent", formData.mediaConsent === "Yes" ? "true" : "false")
      if (memberType === "GIMSOC") {
        form.append("gimsocMembershipCode", formData.gimsocMembershipCode)
      }
      if (memberType === "Volunteer") {
        form.append("volunteerTeam", formData.volunteerTeam)
        form.append("volunteerEmail", formData.volunteerEmail)
      }

      const resp = await axios.post("https://gimsoc-backend.onrender.com/api/form/submit", form, {
        headers: { "Content-Type": "multipart/form-data" },
        timeout: 60000,
      })

      if (resp.data?.message?.toLowerCase().includes("success")) {
        alert("Gala Add-On registration submitted successfully")
        navigate("/ticket-success")
      } else {
        alert("Unexpected response from server. Please verify in Admin.")
      }
    } catch (err) {
      console.error("Gala Add-On submission failed:", err.response?.data || err.message)
      alert("Submission failed: " + (err.response?.data?.message || err.message))
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!memberType) {
    return (
      <div className={`min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 py-8 px-4 ${fadeIn ? "opacity-100" : "opacity-0"}`}>
        <div className="max-w-3xl mx-auto">
          <div className="bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 overflow-hidden">
            <div className="relative bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 px-8 py-10">
              <div className="relative z-10 text-center">
                <h1 className="text-3xl md:text-5xl font-bold text-white mb-3">Gala Add-On Ticket</h1>
                <p className="text-blue-100">Please choose your Gala Add-On ticket type (40 GEL)</p>
              </div>
            </div>
            <div className="p-8 grid md:grid-cols-3 gap-6">
              <button onClick={() => setMemberType("GIMSOC")} className="bg-gradient-to-br from-blue-600/20 to-indigo-600/20 border-2 border-blue-300/50 rounded-2xl p-6 hover:border-blue-400 transition">
                <div className="flex items-center justify-center w-14 h-14 bg-blue-100 rounded-full mb-4"><Users className="w-7 h-7 text-blue-600"/></div>
                <div className="text-white font-semibold text-lg">GIMSOC Member</div>
                <div className="text-blue-300">40 GEL</div>
              </button>
              <button onClick={() => setMemberType("Non-GIMSOC")} className="bg-gradient-to-br from-blue-800/20 to-blue-900/20 border-2 border-blue-300/50 rounded-2xl p-6 hover:border-blue-400 transition">
                <div className="flex items-center justify-center w-14 h-14 bg-blue-100 rounded-full mb-4"><User className="w-7 h-7 text-blue-600"/></div>
                <div className="text-white font-semibold text-lg">Non-GIMSOC Member</div>
                <div className="text-blue-300">40 GEL</div>
              </button>
              <button onClick={() => setMemberType("Volunteer")} className="bg-gradient-to-br from-purple-600/20 to-violet-600/20 border-2 border-purple-300/50 rounded-2xl p-6 hover:border-purple-400 transition">
                <div className="flex items-center justify-center w-14 h-14 bg-purple-100 rounded-full mb-4"><Users className="w-7 h-7 text-purple-600"/></div>
                <div className="text-white font-semibold text-lg">MEDCON Volunteer</div>
                <div className="text-purple-300">40 GEL</div>
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className={`min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 py-8 px-4 ${fadeIn ? "opacity-100" : "opacity-0"}`}>
      <div className="max-w-3xl mx-auto">
        <form onSubmit={handleSubmit} className="bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 overflow-hidden">
          <div className="relative bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 px-8 py-8">
            <div className="text-center">
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">{getMemberTypeDisplay()} – Gala Add-On</h1>
              <p className="text-blue-100">Ticket Price: 40 GEL</p>
            </div>
          </div>

          <div className="p-8 space-y-8">
            {/* Identification (Headshot) */}
            <section className="space-y-4">
              <div className="flex items-center gap-3 mb-2"><Users className="w-6 h-6 text-blue-400"/><h2 className="text-xl text-white font-semibold">Identification</h2></div>
              <div>
                <label className="block text-sm text-white mb-2">Upload a Headshot for ID (PNG/JPEG) *</label>
                <div className="border-2 border-dashed border-white/30 rounded-xl p-6 text-center bg-white/10">
                  <input id="headshot" name="headshot" type="file" accept=".jpg,.jpeg,.png" onChange={handleFileChange} className="hidden" />
                  <label htmlFor="headshot" className="text-blue-300 cursor-pointer">Click to upload</label>
                  {formData.headshot && <div className="text-green-400 mt-2">✓ {formData.headshot.name}</div>}
                </div>
              </div>
            </section>

            {/* Personal Information */}
            <section className="space-y-6">
              <div className="flex items-center gap-3 mb-2"><User className="w-6 h-6 text-blue-400"/><h2 className="text-xl text-white font-semibold">Personal Information</h2></div>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm text-white mb-2">Full Name *</label>
                  <input name="fullName" value={formData.fullName} onChange={handleInputChange} required className="w-full px-4 py-3 rounded-xl border border-white/20 bg-white/90 text-gray-800" />
                </div>
                <div>
                  <label className="block text-sm text-white mb-2">Email Address *</label>
                  <input type="email" name="email" value={formData.email} onChange={handleInputChange} required className="w-full px-4 py-3 rounded-xl border border-white/20 bg-white/90 text-gray-800" />
                </div>
                <div>
                  <label className="block text-sm text-white mb-2">WhatsApp Number (with country code) *</label>
                  <input name="whatsapp" value={formData.whatsapp} onChange={handleInputChange} required className="w-full px-4 py-3 rounded-xl border border-white/20 bg-white/90 text-gray-800" />
                </div>
                <div>
                  <label className="block text-sm text-white mb-2">University/Institution Name *</label>
                  <input name="universityName" value={formData.universityName} onChange={handleInputChange} required className="w-full px-4 py-3 rounded-xl border border-white/20 bg-white/90 text-gray-800" />
                </div>
              </div>

              <div>
                <label className="block text-sm text-white mb-3">Food Preference *</label>
                <div className="grid md:grid-cols-2 gap-3">
                  {["Vegetarian","Non-Vegetarian Halal","Vegan"].map((opt) => (
                    <label key={opt} className="flex items-center gap-3 p-3 rounded-lg border border-white/20 bg-white/10">
                      <input type="radio" name="foodPreference" value={opt} checked={formData.foodPreference === opt} onChange={handleInputChange} required />
                      <span className="text-white">{opt}</span>
                    </label>
                  ))}
                  <div className="flex items-center gap-3 p-3 rounded-lg border border-white/20 bg-white/10">
                    <input type="radio" name="foodPreference" value="Other" checked={formData.foodPreference === "Other"} onChange={handleInputChange} />
                    <span className="text-white">Other</span>
                  </div>
                </div>
              </div>

              {memberType === "GIMSOC" && (
                <div>
                  <label className="block text-sm text-white mb-2">GIMSOC Membership Code *</label>
                  <input name="gimsocMembershipCode" value={formData.gimsocMembershipCode} onChange={handleInputChange} required className="w-full px-4 py-3 rounded-xl border border-white/20 bg-white/90 text-gray-800" />
                </div>
              )}

              {(memberType === "GIMSOC" || memberType === "Non-GIMSOC") && (
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm text-white mb-2">Have you bought any other MEDCON ticket type? *</label>
                    <div className="flex items-center gap-6 text-white">
                      <label className="flex items-center gap-2"><input type="radio" name="hasOtherTicket" value="Yes" checked={formData.hasOtherTicket === "Yes"} onChange={handleInputChange} required/> Yes</label>
                      <label className="flex items-center gap-2"><input type="radio" name="hasOtherTicket" value="No" checked={formData.hasOtherTicket === "No"} onChange={handleInputChange} required/> No</label>
                    </div>
                  </div>
                  {formData.hasOtherTicket === "Yes" && (
                    <div>
                      <label className="block text-sm text-white mb-2">If Yes, please specify ticket type</label>
                      <input name="otherTicketType" value={formData.otherTicketType} onChange={handleInputChange} className="w-full px-4 py-3 rounded-xl border border-white/20 bg-white/90 text-gray-800" />
                    </div>
                  )}
                </div>
              )}

              {memberType === "Volunteer" && (
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm text-white mb-2">Which MEDCON Team are you part of? *</label>
                    <input name="volunteerTeam" value={formData.volunteerTeam} onChange={handleInputChange} required className="w-full px-4 py-3 rounded-xl border border-white/20 bg-white/90 text-gray-800" />
                  </div>
                  <div>
                    <label className="block text-sm text-white mb-2">Email registered (for verification) *</label>
                    <input type="email" name="volunteerEmail" value={formData.volunteerEmail} onChange={handleInputChange} required className="w-full px-4 py-3 rounded-xl border border-white/20 bg-white/90 text-gray-800" />
                  </div>
                </div>
              )}
            </section>

            {/* Payment Details */}
            <section className="space-y-4">
              <div className="flex items-center gap-3 mb-2"><CreditCard className="w-6 h-6 text-green-400"/><h2 className="text-xl text-white font-semibold">Payment Details</h2></div>
              <div>
                <label className="block text-sm text-white mb-2">Payment Method *</label>
                <label className="flex items-center gap-3 p-3 rounded-lg border border-white/20 bg-white/10">
                  <input type="radio" name="paymentMethod" value="Bank Transfer" checked={formData.paymentMethod === "Bank Transfer"} onChange={handleInputChange} required />
                  <span className="text-white">Bank Transfer</span>
                </label>
              </div>

              {formData.paymentMethod === "Bank Transfer" && (
                <div key={`bank-${bankTransferKey}`} className="space-y-6">
                  {/* Bank Details (same as Standard+2) */}
                  <div className="bg-gradient-to-r from-green-50/10 to-emerald-50/10 border-2 border-green-200/30 rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-green-400 mb-4">Bank Transfer Details</h3>

                    {/* TBC Bank Details */}
                    <div className="mb-6">
                      <h4 className="text-md font-semibold text-green-300 mb-3">FOR LARI TRANSFER</h4>
                      <div className="bg-white/10 rounded-lg p-4 space-y-2">
                        <p className="text-sm text-gray-300"><strong>Beneficiary's Bank:</strong> JSC TBC Bank</p>
                        <p className="text-sm text-gray-300"><strong>Location:</strong> Tbilisi, Georgia</p>
                        <p className="text-sm text-gray-300"><strong>Swift:</strong> TBCBGE22</p>
                        <p className="text-sm text-gray-300"><strong>Beneficiary's IBAN:</strong> GE31TB7724245061200012</p>
                        <p className="text-sm text-gray-300"><strong>Name of Beneficiary:</strong> Mandrika Santosh Umanga Fernando</p>
                      </div>
                    </div>

                    {/* Bank of Georgia Details */}
                    <div className="mb-6">
                      <h4 className="text-md font-semibold text-green-300 mb-3">BANK DETAILS FOR TRANSFERS IN GEORGIAN LARI (GEL)</h4>
                      <div className="bg-white/10 rounded-lg p-4 space-y-2">
                        <p className="text-sm text-gray-300"><strong>Account with institution:</strong> Bank of Georgia</p>
                        <p className="text-sm text-gray-300"><strong>SWIFT:</strong> BAGAGE22</p>
                        <p className="text-sm text-gray-300"><strong>Beneficiary:</strong> FERNANDO MANDRIKA SANTOSH U.</p>
                        <p className="text-sm text-gray-300"><strong>Account:</strong> GE94BG0000000608342766</p>
                      </div>
                    </div>

                    {/* INR Transfer Details */}
                    <div>
                      <h4 className="text-md font-semibold text-green-300 mb-3">FOR INR TRANSFER (INDIAN RUPEES)</h4>
                      <div className="bg-white/10 rounded-lg p-4 space-y-2">
                        <p className="text-sm text-gray-300"><strong>UPI ID:</strong> divyeshkadiyala@ybl</p>
                        <p className="text-sm text-gray-300"><strong>Phone Number:</strong> +91 8971224430</p>
                      </div>
                    </div>
                  </div>

                  {/* PhonePe Image Section */}
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold text-white mb-4 text-center">💳 PhonePe Payment Option</h3>
                    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                      <img src="/phonepe.jpg" alt="PhonePe Payment" className="w-full h-auto rounded-lg shadow-lg" />
                      <p className="text-sm text-gray-300 mt-2 text-center">Scan QR code or use UPI ID for payment</p>
                    </div>
                  </div>

                  {/* Payment Proof Examples */}
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold text-white mb-4 text-center">📸 These are the images which needs to be submitted</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                        <img src="/ab8cedda-965c-424e-9ba4-18e837fcaadf.JPG" alt="Bank Transfer Example 1" className="w-full h-auto rounded-lg shadow-lg" />
                        <p className="text-sm text-gray-300 mt-2 text-center">Payment Order Example</p>
                      </div>
                      <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                        <img src="/1fedc4b1-f480-44cf-9351-b43895491c94.JPG" alt="Bank Transfer Example 2" className="w-full h-auto rounded-lg shadow-lg" />
                        <p className="text-sm text-gray-300 mt-2 text-center">External Transfer Example</p>
                      </div>
                    </div>
                  </div>

                  {/* Upload Proof of Payment */}
                  <div>
                    <h3 className="text-sm text-green-300 mb-2">Upload Proof of Payment (PNG or JPEG only) *</h3>
                    <div className="border-2 border-dashed border-white/30 rounded-xl p-6 text-center bg-white/10">
                      <input id="paymentProof" type="file" accept=".jpg,.jpeg,.png" onChange={handleFileChange} className="hidden" />
                      <label htmlFor="paymentProof" className="text-green-300 cursor-pointer">Click to upload</label>
                      <p className="text-xs text-gray-300 mt-1">Upload the exact payment receipt as a JPEG or PNG, not a PDF. Screenshots must clearly show full transaction details as shown in the examples</p>
                      <p className="text-xs text-red-300 mt-1">⚠️ Maximum file size: 5MB</p>
                      {formData.paymentProof && <div className="text-green-400 mt-2">✓ {formData.paymentProof.name}</div>}
                    </div>
                  </div>
                </div>
              )}
            </section>

            {/* Declaration & Consent */}
            <section className="space-y-3">
              <div className="flex items-center gap-3 mb-2"><CheckCircle className="w-6 h-6 text-blue-400"/><h2 className="text-xl text-white font-semibold">Declaration & Consent</h2></div>
              <label className="flex items-center gap-3 text-white">
                <input type="checkbox" name="infoAccurate" checked={formData.infoAccurate} onChange={handleInputChange} required />
                I confirm that all information provided is accurate.
              </label>
              <label className="flex items-center gap-3 text-white">
                <input type="checkbox" name="emailConsent" checked={formData.emailConsent} onChange={handleInputChange} required />
                I agree to receive event updates via email.
              </label>
              <label className="flex items-center gap-3 text-white">
                <input type="checkbox" name="whatsappConsent" checked={formData.whatsappConsent} onChange={handleInputChange} required />
                I agree to receive event updates via WhatsApp.
              </label>
              <div>
                <label className="block text-sm text-white mb-2">Media Consent *</label>
                <div className="flex items-center gap-6 text-white">
                  <label className="flex items-center gap-2"><input type="radio" name="mediaConsent" value="Yes" checked={formData.mediaConsent === "Yes"} onChange={handleInputChange} required /> Yes</label>
                  <label className="flex items-center gap-2"><input type="radio" name="mediaConsent" value="No" checked={formData.mediaConsent === "No"} onChange={handleInputChange} required /> No</label>
                </div>
              </div>
            </section>

            <div className="pt-4">
              <button type="submit" disabled={isSubmitting} className="w-full px-6 py-4 rounded-xl font-semibold text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 disabled:opacity-50">
                {isSubmitting ? "Submitting..." : "Complete Gala Add-On – 40 GEL"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}


