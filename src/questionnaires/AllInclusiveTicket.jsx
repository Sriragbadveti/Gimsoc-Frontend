"use client";

import { useState } from "react";
import { Upload, User, GraduationCap, Calendar, Camera, Utensils, CreditCard, Users, ArrowLeft } from 'lucide-react';
import axios from "axios";

export default function AllInclusiveTicket() {
  const [ticketType, setTicketType] = useState(""); // "member" or "non-member"
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    whatsapp: "",
    university: "",
    semester: "",
    examPrep: "",
    examOther: "",
    workshopPackage: "",
    headshot: null,
    foodPreference: "",
    dietaryRestrictions: "",
    accessibilityNeeds: "",
    membershipCode: "",
    infoAccurate: false,
    mediaConsent: "",
    policies: false,
    emailConsent: false,
    whatsappConsent: false,
    paymentMethod: "",
    paymentProof: null,
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files[0],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = new FormData();
    form.append("ticketType", "All Inclusive");

    Object.entries(formData).forEach(([key, value]) => {
      if (value !== null && value !== undefined) {
        // File fields
        if (key === "headshot" || key === "paymentProof") {
          form.append(key, value); // multer handles File object
        } else {
          form.append(key, value);
        }
      }
    });

    try {
      const response = await axios.post(
        "http://localhost:8000/api/ticket/submit",
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
    } catch (err) {
      console.error("❌ Submission failed:", err.response?.data || err.message);
      alert("Form submission failed.");
    }
  };

  const handleBack = () => {
    setTicketType("");
    setFormData({
      fullName: "",
      email: "",
      whatsapp: "",
      university: "",
      semester: "",
      examPrep: "",
      examOther: "",
      workshopPackage: "",
      headshot: null,
      foodPreference: "",
      dietaryRestrictions: "",
      accessibilityNeeds: "",
      membershipCode: "",
      infoAccurate: false,
      mediaConsent: "",
      policies: false,
      emailConsent: false,
      whatsappConsent: false,
      paymentMethod: "",
      paymentProof: null,
    });
  };

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
  ];

  const memberSemesters = Array.from(
    { length: 12 },
    (_, i) => `${i + 1}`
  ).concat(["Graduated"]);
  const nonMemberSemesters = Array.from({ length: 12 }, (_, i) => `${i + 1}`);
  const exams = ["USMLE", "AMC", "PLAB", "FMGE", "EMREE", "IFOM"];

  // Ticket Type Selection Screen
  if (!ticketType) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 py-8 px-4">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-6">
              <h1 className="text-3xl font-bold text-white text-center">
                All Inclusive Ticket
              </h1>
              <p className="text-blue-100 text-center mt-2">
                Choose your registration type
              </p>
            </div>

            <div className="p-8">
              <div className="text-center mb-8">
                <div className="p-4 bg-blue-100 rounded-full w-20 h-20 mx-auto mb-4 flex items-center justify-center">
                  <Users className="w-10 h-10 text-blue-600" />
                </div>
                <h2 className="text-2xl font-semibold text-gray-800 mb-2">
                  Select Your Ticket Type
                </h2>
                <p className="text-gray-600">
                  Choose the option that applies to you
                </p>
              </div>

              <div className="space-y-4 max-w-md mx-auto">
                <button
                  onClick={() => setTicketType("member")}
                  className="w-full p-6 border-2 border-gray-200 rounded-xl hover:border-blue-500 hover:bg-blue-50 transition-all group"
                >
                  <div className="text-center">
                    <div className="p-3 bg-green-100 rounded-lg w-16 h-16 mx-auto mb-3 flex items-center justify-center group-hover:bg-green-200 transition-colors">
                      <User className="w-8 h-8 text-green-600" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">
                      GIMSOC Member Ticket
                    </h3>
                    <p className="text-sm text-gray-600">
                      For current GIMSOC members with membership code
                    </p>
                  </div>
                </button>

                <button
                  onClick={() => setTicketType("non-member")}
                  className="w-full p-6 border-2 border-gray-200 rounded-xl hover:border-blue-500 hover:bg-blue-50 transition-all group"
                >
                  <div className="text-center">
                    <div className="p-3 bg-purple-100 rounded-lg w-16 h-16 mx-auto mb-3 flex items-center justify-center group-hover:bg-purple-200 transition-colors">
                      <Users className="w-8 h-8 text-purple-600" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">
                      Non-GIMSOC Member Ticket
                    </h3>
                    <p className="text-sm text-gray-600">
                      For students who are not GIMSOC members
                    </p>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Main Registration Form
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-6">
            <div className="flex items-center justify-between">
              <button
                onClick={handleBack}
                className="text-white hover:text-blue-200 transition-colors flex items-center gap-2"
              >
                <ArrowLeft className="w-5 h-5" />
                Back
              </button>
              <div className="text-center flex-1">
                <h1 className="text-3xl font-bold text-white">
                  {ticketType === "member"
                    ? "GIMSOC Member"
                    : "Non-GIMSOC Member"}{" "}
                  Registration
                </h1>
                <p className="text-blue-100 mt-2">All Inclusive Ticket</p>
              </div>
              <div className="w-16"></div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="p-8 space-y-10">
            {/* Personal Information */}
            <section className="space-y-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <User className="w-6 h-6 text-blue-600" />
                </div>
                <h2 className="text-2xl font-semibold text-gray-800">
                  Personal Information
                </h2>
              </div>

              <div className="grid md:grid-cols-1 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name *
                  </label>
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
                    As you would like it to appear on your ID card and
                    certificate
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="Enter a valid email address"
                    required
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    For all official conference communication
                  </p>
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

            {/* Academic Information */}
            <section className="space-y-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-green-100 rounded-lg">
                  <GraduationCap className="w-6 h-6 text-green-600" />
                </div>
                <h2 className="text-2xl font-semibold text-gray-800">
                  Academic Information
                </h2>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    University Name *
                  </label>
                  <select
                    name="university"
                    value={formData.university}
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
                    {(ticketType === "member"
                      ? memberSemesters
                      : nonMemberSemesters
                    ).map((sem, index) => (
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
                    <label
                      key={exam}
                      className="flex items-center space-x-2 cursor-pointer"
                    >
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
                <h2 className="text-2xl font-semibold text-gray-800">
                  Workshop Selection
                </h2>
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
                  Workshop spots are limited and will be confirmed based on
                  availability
                </p>
              </div>
            </section>

            {/* Identification */}
            <section className="space-y-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-orange-100 rounded-lg">
                  <Camera className="w-6 h-6 text-orange-600" />
                </div>
                <h2 className="text-2xl font-semibold text-gray-800">
                  Identification
                </h2>
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
                    <span className="text-blue-600 hover:text-blue-700 font-medium">
                      Click to upload
                    </span>
                    <span className="text-gray-500"> or drag and drop</span>
                  </label>
                  <p className="text-xs text-gray-500 mt-1">
                    Clear, front-facing photo with plain background
                  </p>
                  <p className="text-xs text-gray-500">
                    Your ID will be made without a photo if none is uploaded
                  </p>
                </div>
              </div>
            </section>

            {/* Food Preferences */}
            <section className="space-y-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-red-100 rounded-lg">
                  <Utensils className="w-6 h-6 text-red-600" />
                </div>
                <h2 className="text-2xl font-semibold text-gray-800">
                  Food Preferences and Health Needs
                </h2>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Preferred Food Option *
                </label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {ticketType === "member"
                    ? ["Vegetarian", "Non-Vegetarian (Halal)"].map((option) => (
                        <label
                          key={option}
                          className="flex items-center space-x-2 cursor-pointer"
                        >
                          <input
                            type="radio"
                            name="foodPreference"
                            value={option}
                            checked={formData.foodPreference === option}
                            onChange={handleInputChange}
                            className="text-blue-600 focus:ring-blue-500"
                            required
                          />
                          <span className="text-sm text-gray-700">
                            {option}
                          </span>
                        </label>
                      ))
                    : [
                        "Vegetarian",
                        "Non-Vegetarian",
                        "Non-Vegetarian (Halal)",
                      ].map((option) => (
                        <label
                          key={option}
                          className="flex items-center space-x-2 cursor-pointer"
                        >
                          <input
                            type="radio"
                            name="foodPreference"
                            value={option}
                            checked={formData.foodPreference === option}
                            onChange={handleInputChange}
                            className="text-blue-600 focus:ring-blue-500"
                            required
                          />
                          <span className="text-sm text-gray-700">
                            {option}
                          </span>
                        </label>
                      ))}
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Dietary Restrictions
                  </label>
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

            {/* GIMSOC Membership - Only for members */}
            {ticketType === "member" && (
              <section className="space-y-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-indigo-100 rounded-lg">
                    <User className="w-6 h-6 text-indigo-600" />
                  </div>
                  <h2 className="text-2xl font-semibold text-gray-800">
                    GIMSOC Membership
                  </h2>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    GIMSOC Membership Code *
                  </label>
                  <input
                    type="text"
                    name="membershipCode"
                    value={formData.membershipCode}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="Enter your membership code"
                    required
                  />
                </div>
              </section>
            )}

            {/* Declaration and Consent */}
            <section className="space-y-6">
              <h2 className="text-2xl font-semibold text-gray-800">
                Declaration and Consent
              </h2>

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
                    I confirm that all the information provided is accurate to
                    the best of my knowledge. *
                  </span>
                </label>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Media Consent *
                  </label>
                  <p className="text-sm text-gray-600 mb-3">
                    Do you consent to the use of photos and videos of you taken
                    during the conference for promotional purposes?
                  </p>
                  <div className="space-y-2">
                    {["Yes", "No"].map((option) => (
                      <label
                        key={option}
                        className="flex items-center space-x-2 cursor-pointer"
                      >
                        <input
                          type="radio"
                          name="mediaConsent"
                          value={option}
                          checked={formData.mediaConsent === option}
                          onChange={handleInputChange}
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
                    name="policies"
                    checked={formData.policies}
                    onChange={handleInputChange}
                    className="mt-1 text-blue-600 focus:ring-blue-500"
                    required
                  />
                  <span className="text-sm text-gray-700">
                    I agree to comply with all conference policies, rules, and
                    guidelines. *
                  </span>
                </label>

                {/* GIMSOC-specific consents - Only for members */}
                {ticketType === "member" && (
                  <>
                    <label className="flex items-start space-x-3 cursor-pointer">
                      <input
                        type="checkbox"
                        name="emailConsent"
                        checked={formData.emailConsent}
                        onChange={handleInputChange}
                        className="mt-1 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="text-sm text-gray-700">
                        I agree to receive emails from GIMSOC, including
                        updates, resources, and conference-related information
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
                        I consent to be added to our WhatsApp group for updates,
                        discussions, and announcements related to MEDCON
                      </span>
                    </label>
                  </>
                )}
              </div>
            </section>

            {/* Payment Confirmation */}
            <section className="space-y-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-yellow-100 rounded-lg">
                  <CreditCard className="w-6 h-6 text-yellow-600" />
                </div>
                <h2 className="text-2xl font-semibold text-gray-800">
                  Payment Confirmation
                </h2>
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
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Upload Proof of Payment *
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
                        <span className="text-blue-600 hover:text-blue-700 font-medium">
                          Click to upload
                        </span>
                        <span className="text-gray-500"> or drag and drop</span>
                      </label>
                      <p className="text-xs text-gray-500 mt-1">
                        PDF format only - Bank transfer confirmation
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </section>

            {/* Submit Button */}
            <div className="pt-6">
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-4 px-6 rounded-lg font-semibold text-lg hover:from-blue-700 hover:to-indigo-700 focus:ring-4 focus:ring-blue-200 transition-all transform hover:scale-[1.02]"
              >
                Submit{" "}
                {ticketType === "member"
                  ? "GIMSOC Member"
                  : "Non-GIMSOC Member"}{" "}
                Registration
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}