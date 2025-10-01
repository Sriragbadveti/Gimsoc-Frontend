"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { 
  Calendar, 
  Clock, 
  MapPin, 
  Users, 
  FileText, 
  Upload,
  CheckCircle,
  AlertCircle,
  Loader2,
  XCircle,
  Sparkles,
  ArrowRight,
  Star,
  BookOpen,
  GraduationCap,
  Shield,
  Heart,
  Zap,
  User,
  Mail,
  Phone,
  Globe,
  Building,
  GraduationCap as School,
  CreditCard
} from "lucide-react"

const WORKSHOP_OPTIONS = [
  // BIOME shown but disabled/closed
  {
    id: "biome",
    title: "Biome - Leading Minds in Gut Health",
    date: "7th September, 2025",
    platform: "Online",
    speaker: "Dr. Segenet Bizuneh",
    description: "Gut health has quickly become one of the most fascinating and impactful areas of modern medicine, and this session will dive deep into its mysteries.",
    icon: Heart,
    color: "from-green-500 to-emerald-600",
    bgColor: "bg-green-50",
    borderColor: "border-green-200",
    closed: true
  },
  {
    id: "scientific-series",
    title: "From Curiosity to Conference: The Researcher's Toolkit",
    date: "24th & 28th September, 2025",
    platform: "Online",
    speaker: "Dr. Hashim Siraj MD, Ms. Nikhila Aby, Ms. Mennah Emam",
    organization: "          Scientific Department",
    description: "Join our 2-part webinar series designed to equip participants with essential research skills. Covering study design, literature review, poster creation, and data application, the series bridges the gap between curiosity and conference-level presentation.",
    hasPayment: true,
    icon: BookOpen,
    color: "from-purple-500 to-violet-600",
    bgColor: "bg-purple-50",
    borderColor: "border-purple-200",
    closed: true
  },
  {
    id: "project-img",
    title: "From Isolation to Solidarity: Social Impacts of Infectious Disease",
    date: "1st October 2025",
    platform: "Online",
    speaker: "Dr. Tehseen Siddiqui (Specialist at Chicago Infectious Disease Physicians) ",
    organization: "Project IMG",
    description: "Explores how disease outbreaks transform community relationships and health behaviors.",
    icon: Users,
    color: "from-orange-500 to-red-600",
    bgColor: "bg-orange-50",
    borderColor: "border-orange-200"
  },
  {
    id: "vaccine-voices",
    title: "Vaccine Voices: Addressing Hesitancy, Protecting Futures",
    date: "5th October, 2025",
    
    speaker: "Dr. Giorgi Derevenskikh (US), Dr. Nino Didbaridze (Georgia) , Dr. Shyamshree Das (India)",
    organization: "Doctors for a Cause (DFC)",
    description: "Focuses on the resurgence of measles, vaccine hesitancy, and the critical role of healthcare advocacy.",
    icon: Shield,
    color: "from-teal-500 to-cyan-600",
    bgColor: "bg-teal-50",
    borderColor: "border-teal-200"
  },
  {
    id: "silent-siege",
    title: "Silent Siege: Navigating AMR and Mold Epidemics",
    date: "12th October, 2025",
    platform: "Offline",
    speaker: "Dr. Brandon (pharmacologist, AMR survivor), Dr. Natia Shavgulidze",
    description: "Join us for an exciting and impactful event exploring the urgent challenge of antibiotic resistance and the hidden dangers of mold toxicity. Dive into the 'Antimicrobial Resistance Arena,' a high-energy simulation where you'll take on roles like healthcare providers, policy-makers, and pathogens.",
    icon: Zap,
    color: "from-red-500 to-pink-600",
    bgColor: "bg-red-50",
    borderColor: "border-red-200"
  },
  {
    id: "uae-licensing",
    title: "Pathway to Practice – UAE Medical Licensing",
    date: "15th October, 2025",
    platform: "Online",
    speaker: "Dr. Nayab Mustafa (Licensed in UAE)",
    description: "Are you ready to build a secure and thriving medical career—regardless of global uncertainties? In a time of shifting visa policies and career challenges, the UAE is fast becoming a top destination for ambitious international medical graduates.",
    icon: Star,
    color: "from-yellow-500 to-amber-600",
    bgColor: "bg-yellow-50",
    borderColor: "border-yellow-200"
  },
  {
    id: "linkedin-proficiency",
    title: "Career Snap 360 - Your Guide to LinkedIn Proficiency",
    date: "18th October, 2025",
    platform: "Offline",
    venue: "New Vision University (NVU) Health Hub",
    speaker: "Toyin Dairo, Arun Venkiteswaran, Dr. Tamar Didbaridze",
    description: "Ready to supercharge your career path in medicine? In today's competitive landscape, your professional online presence is as crucial as your clinical skills. Don't just study medicine; strategically build your future!",
    icon: Sparkles,
    color: "from-indigo-500 to-purple-600",
    bgColor: "bg-indigo-50",
    borderColor: "border-indigo-200"
  },
  {
    id: "amboss",
    title: "The AMBOSS Compass: Navigating the USMLE Pathway",
    date: "22nd October 2025",
    platform: "Online",
    speaker: "Margherita",
    organization: "AMBOSS",
    description: "This offline event session is designed to guide medical students through the USMLE journey, offering strategies, preparation insights, and resources to excel in this important career milestone.",
    icon: GraduationCap,
    color: "from-blue-500 to-indigo-600",
    bgColor: "bg-blue-50",
    borderColor: "border-blue-200"
  }
]

const SEMESTER_OPTIONS = [
  "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "Graduated"
]

const SCIENTIFIC_SERIES_OPTIONS = [
  "5 GEL / 175 INR – GIMSOC Member",
  "7 GEL / 240 INR – Non-Member"
]

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
  "Batumi Shota Rustaveli State University (BSU – Faculty of Medicine)",
  "Other"
]

export default function WorkshopRegistrationPage() {
  const [selectedWorkshop, setSelectedWorkshop] = useState(null)
  const [ssStep, setSsStep] = useState("email")
  const [ssEligible, setSsEligible] = useState(null)
  const [isVerifyingEmail, setIsVerifyingEmail] = useState(false)
  
  // Add CSS animations
  useEffect(() => {
    const style = document.createElement('style')
    style.textContent = `
      @keyframes blob {
        0% {
          transform: translate(0px, 0px) scale(1);
        }
        33% {
          transform: translate(30px, -50px) scale(1.1);
        }
        66% {
          transform: translate(-20px, 20px) scale(0.9);
        }
        100% {
          transform: translate(0px, 0px) scale(1);
        }
      }
      .animate-blob {
        animation: blob 7s infinite;
      }
      .animation-delay-2000 {
        animation-delay: 2s;
      }
      .animation-delay-4000 {
        animation-delay: 4s;
      }
    `
    document.head.appendChild(style)
    return () => document.head.removeChild(style)
  }, [])
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    whatsapp: "",
    country: "",
    university: "",
    otherUniversity: "",
    currentSemester: "",
    isGimsocMember: "",
    gimsocCode: "",
    isMedconAttendee: "",
    selectedScientificSeries: "",
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

  const handleFileUpload = (event) => {
    const file = event.target.files[0]
    if (file && (file.type === "image/jpeg" || file.type === "image/png")) {
      // Check file size (5MB limit)
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
      // Validate scientific series selection for non-eligible users
      if (selectedWorkshop.id === "scientific-series" && ssEligible === false && !formData.selectedScientificSeries) {
        alert('Please select a fee category to continue.')
        setIsSubmitting(false)
        return
      }
      // Prepare form data
      const formDataToSend = new FormData()
      
      // Add all form fields
      formDataToSend.append('workshopId', selectedWorkshop.id)
      formDataToSend.append('workshopTitle', selectedWorkshop.title)
      formDataToSend.append('fullName', formData.fullName)
      formDataToSend.append('email', formData.email)
      formDataToSend.append('whatsapp', formData.whatsapp)
      formDataToSend.append('country', formData.country)
      formDataToSend.append('university', formData.university)
      formDataToSend.append('currentSemester', formData.currentSemester)
      formDataToSend.append('isGimsocMember', formData.isGimsocMember)
      
      // Handle MEDCON attendee status - only required for scientific series
      if (selectedWorkshop.id === "scientific-series") {
        formDataToSend.append('isMedconAttendee', formData.isMedconAttendee)
      } else {
        // For other workshops, set default value to "No"
        formDataToSend.append('isMedconAttendee', 'No')
      }
      
      // Add optional fields
      if (formData.otherUniversity) {
        formDataToSend.append('otherUniversity', formData.otherUniversity)
      }
      if (formData.gimsocCode) {
        formDataToSend.append('gimsocCode', formData.gimsocCode)
      }
      // Handle scientific series selection - only required for non-eligible users
      if (selectedWorkshop.id === "scientific-series") {
        if (ssEligible === true) {
          // MEDCON ticket holders get free access
          formDataToSend.append('selectedScientificSeries', 'Free Access - MEDCON Ticket Holder')
        } else if (formData.selectedScientificSeries) {
          // Non-eligible users must select a fee category
          formDataToSend.append('selectedScientificSeries', formData.selectedScientificSeries)
        }
      }
      if (formData.paymentProof) {
        formDataToSend.append('paymentProof', formData.paymentProof)
      }
      
      // Submit to backend
      const response = await fetch('https://gimsoc-backend.onrender.com/api/workshop/register', {
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
    setSelectedWorkshop(null)
    setSsStep("email")
    setSsEligible(null)
    setIsVerifyingEmail(false)
    setFormData({
      fullName: "",
      email: "",
      whatsapp: "",
      country: "",
      university: "",
      otherUniversity: "",
      currentSemester: "",
      isGimsocMember: "",
      gimsocCode: "",
      isMedconAttendee: "",
      selectedScientificSeries: "",
      paymentProof: null
    })
    setSubmitStatus(null)
  }

  if (submitStatus === "success") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full text-center">
          <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Registration Successful!</h2>
          <p className="text-gray-600 mb-6">
            Thank you for registering for {selectedWorkshop?.title}. 
            You will receive a confirmation email shortly.
          </p>
          <button
            onClick={resetForm}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Register for Another Workshop
          </button>
        </div>
      </div>
    )
  }

  if (!selectedWorkshop) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 py-12 px-4">
        {/* Animated Background */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
          <div className="absolute top-40 left-40 w-80 h-80 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
        </div>

        <div className="relative max-w-7xl mx-auto">
          {/* Header with Animation */}
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="inline-block"
            >
              <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent mb-6">
                MEDCON'25 Pre-Conference Events
              </h1>
            </motion.div>
            <motion.p 
              className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Join our exclusive pre-conference events and gain valuable insights from industry experts. 
              <span className="text-blue-600 font-semibold"> Select a pre-conference below to begin registration.</span>
            </motion.p>
          </motion.div>

          {/* Workshop Cards Grid */}
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {WORKSHOP_OPTIONS.map((workshop, index) => {
              const IconComponent = workshop.icon
              return (
                <motion.div
                  key={workshop.id}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ 
                    y: -10,
                    scale: 1.02,
                    transition: { duration: 0.3 }
                  }}
                  whileTap={{ scale: 0.98 }}
                  className={`group ${workshop.closed ? 'cursor-not-allowed opacity-60' : 'cursor-pointer'}`}
                  onClick={() => {
                    if (workshop.closed) return;
                    setSelectedWorkshop(workshop)
                    if (workshop.id === "scientific-series" || workshop.id === "project-img") {
                      setSsStep("email")
                      setSsEligible(null)
                      setIsVerifyingEmail(false)
                    }
                  }}
                >
                  <div className={`relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 border-2 ${workshop.borderColor} hover:border-opacity-100 overflow-hidden`}>
                    {/* Gradient Header */}
                    <div className={`h-2 bg-gradient-to-r ${workshop.color}`}></div>
                    
                    {/* Icon and Badge */}
                    <div className="relative p-6">
                      <div className="flex items-start justify-between mb-4">
                        <motion.div 
                          className={`p-3 rounded-xl bg-gradient-to-r ${workshop.color} text-white shadow-lg`}
                          whileHover={{ rotate: 5, scale: 1.1 }}
                          transition={{ duration: 0.3 }}
                        >
                          <IconComponent className="w-6 h-6" />
                        </motion.div>
                        {(workshop.hasPayment || workshop.closed) && (
                          <motion.span 
                            className={`text-white text-xs px-3 py-1 rounded-full font-semibold shadow-md ${workshop.closed ? 'bg-red-600' : 'bg-gradient-to-r from-yellow-400 to-orange-500'}`}
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: index * 0.1 + 0.5 }}
                          >
                            {workshop.closed ? 'Closed' : '💰 Paid Event'}
                          </motion.span>
                        )}
                      </div>
                      
                      {/* Title */}
                      <motion.h3 
                        className="text-lg font-bold text-gray-800 leading-tight mb-3 group-hover:text-blue-600 transition-colors duration-300"
                        whileHover={{ x: 5 }}
                      >
                        {workshop.title}
                      </motion.h3>
                      
                      {/* Description */}
                      <p className="text-gray-600 text-sm mb-6 line-clamp-3 leading-relaxed">
                        {workshop.description}
                      </p>

                      {/* Event Details */}
                      <div className="space-y-3 text-sm text-gray-500 mb-6">
                        <motion.div 
                          className="flex items-center gap-3"
                          whileHover={{ x: 5 }}
                        >
                          <Calendar className="w-4 h-4 text-blue-500" />
                          <span className="font-medium">{workshop.date}</span>
                        </motion.div>
                        {workshop.time && (
                          <motion.div 
                            className="flex items-center gap-3"
                            whileHover={{ x: 5 }}
                          >
                            <Clock className="w-4 h-4 text-green-500" />
                            <span>{workshop.time}</span>
                          </motion.div>
                        )}
                        <motion.div 
                          className="flex items-center gap-3"
                          whileHover={{ x: 5 }}
                        >
                          <Users className="w-4 h-4 text-purple-500" />
                          <span>{workshop.platform}</span>
                        </motion.div>
                        {workshop.venue && (
                          <motion.div 
                            className="flex items-center gap-3"
                            whileHover={{ x: 5 }}
                          >
                            <MapPin className="w-4 h-4 text-red-500" />
                            <span className="truncate">{workshop.venue}</span>
                          </motion.div>
                        )}
                      </div>

                      {/* Speaker Info */}
                      <div className="pt-4 border-t border-gray-100">
                        <p className="text-xs text-gray-500 mb-1">
                          <span className="font-semibold text-gray-700">Speaker:</span> {workshop.speaker}
                        </p>
                        {workshop.organization && (
                          <p className="text-xs text-gray-500">
                            <span className="font-semibold text-gray-700">Organization:</span> {workshop.organization}
                          </p>
                        )}
                      </div>

                      {/* Hover Arrow */}
                      <motion.div 
                        className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        initial={{ x: -10 }}
                        whileHover={{ x: 0 }}
                      >
                        <ArrowRight className="w-5 h-5 text-blue-500" />
                      </motion.div>
                    </div>

                    {/* Hover Effect Overlay */}
                    <motion.div 
                      className={`absolute inset-0 bg-gradient-to-r ${workshop.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}
                    ></motion.div>
                  </div>
                </motion.div>
              )
            })}
          </div>


        </div>
      </div>
    )
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div 
        className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 py-12 px-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="max-w-5xl mx-auto">
          <motion.div 
            className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            {/* Enhanced Header */}
            <div className={`bg-gradient-to-r ${selectedWorkshop.color} p-8 text-white relative overflow-hidden`}>
              {/* Background Pattern */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white rounded-full -translate-y-16 translate-x-16"></div>
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-white rounded-full translate-y-12 -translate-x-12"></div>
              </div>
              
              <div className="relative flex items-center justify-between">
                <motion.div
                  initial={{ x: -30, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  <div className="flex items-center gap-4 mb-4">
                    <motion.div
                      className="p-3 bg-white bg-opacity-20 rounded-xl backdrop-blur-sm"
                      whileHover={{ rotate: 5, scale: 1.1 }}
                    >
                      {selectedWorkshop.icon && <selectedWorkshop.icon className="w-8 h-8" />}
                    </motion.div>
                    <div>
                      <h1 className="text-3xl font-bold mb-2">{selectedWorkshop.title}</h1>
                      <p className="text-white text-opacity-90 text-sm">{selectedWorkshop.organization}</p>
                    </div>
                  </div>
                  
                  <motion.div 
                    className="flex flex-wrap gap-6 text-sm"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                  >
                    <motion.div 
                      className="flex items-center gap-2 bg-white bg-opacity-20 px-3 py-2 rounded-lg backdrop-blur-sm"
                      whileHover={{ scale: 1.05 }}
                    >
                      <Calendar className="w-4 h-4" />
                      <span className="font-medium">{selectedWorkshop.date}</span>
                    </motion.div>
                    {selectedWorkshop.time && (
                      <motion.div 
                        className="flex items-center gap-2 bg-white bg-opacity-20 px-3 py-2 rounded-lg backdrop-blur-sm"
                        whileHover={{ scale: 1.05 }}
                      >
                        <Clock className="w-4 h-4" />
                        <span className="font-medium">{selectedWorkshop.time}</span>
                      </motion.div>
                    )}
                    <motion.div 
                      className="flex items-center gap-2 bg-white bg-opacity-20 px-3 py-2 rounded-lg backdrop-blur-sm"
                      whileHover={{ scale: 1.05 }}
                    >
                      <Users className="w-4 h-4" />
                      <span className="font-medium">{selectedWorkshop.platform}</span>
                    </motion.div>
                    {selectedWorkshop.venue && (
                      <motion.div 
                        className="flex items-center gap-2 bg-white bg-opacity-20 px-3 py-2 rounded-lg backdrop-blur-sm"
                        whileHover={{ scale: 1.05 }}
                      >
                        <MapPin className="w-4 h-4" />
                        <span className="font-medium">{selectedWorkshop.venue}</span>
                      </motion.div>
                    )}
                  </motion.div>
                </motion.div>
                
                <motion.button
                  onClick={() => setSelectedWorkshop(null)}
                  className="text-white hover:text-gray-200 transition-colors p-2 hover:bg-white hover:bg-opacity-20 rounded-lg"
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  initial={{ x: 30, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                >
                  <XCircle className="w-6 h-6" />
                </motion.button>
              </div>
            </div>

            {/* Biome closed; Scientific Series & Project IMG email gate; Others default */}
            {selectedWorkshop.id === "biome" ? (
            <div className="p-8">
              <div className="bg-red-50 border border-red-200 text-red-800 p-4 rounded-lg">
                Registration for this pre-conference is closed.
              </div>
              <div className="mt-6">
                <button
                  type="button"
                  onClick={() => setSelectedWorkshop(null)}
                  className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Back to Pre-Conference Selection
                </button>
              </div>
            </div>
            ) : selectedWorkshop.id === "scientific-series" ? (
            <div className="p-8">
              <div className="bg-red-50 border border-red-200 text-red-800 p-4 rounded-lg">
                Registration for this pre-conference is closed.
              </div>
              <div className="mt-6">
                <button
                  type="button"
                  onClick={() => setSelectedWorkshop(null)}
                  className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Back to Pre-Conference Selection
                </button>
              </div>
            </div>
            ) : selectedWorkshop.id === "scientific-series" && ssStep === "email" ? (
            <div className="p-8">
              <div className="max-w-2xl">
                <h3 className="text-xl font-semibold text-gray-900 mb-6">Registration Check</h3>
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Are you a registered MEDCON'25 attendee?
                    </label>
                    <div className="space-y-3">
                      <label className="flex items-center">
                        <input
                          type="radio"
                          name="isMedconAttendee"
                          value="Yes"
                          checked={formData.isMedconAttendee === "Yes"}
                          onChange={(e) => handleInputChange("isMedconAttendee", e.target.value)}
                          className="mr-3"
                        />
                        <span>Yes – I already have a MEDCON'25 ticket (Complimentary access)</span>
                      </label>
                      <label className="flex items-center">
                        <input
                          type="radio"
                          name="isMedconAttendee"
                          value="No"
                          checked={formData.isMedconAttendee === "No"}
                          onChange={(e) => handleInputChange("isMedconAttendee", e.target.value)}
                          className="mr-3"
                        />
                        <span>No – I do not have a MEDCON'25 ticket (Payment required)</span>
                      </label>
                    </div>
                  </div>
                  
                  {formData.isMedconAttendee === "Yes" && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Please provide your email address so we can verify your registration status:
                      </label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Enter your email address"
                      />
                    </div>
                  )}
                  
                  <button
                    type="button"
                    onClick={async () => {
                      if (!formData.isMedconAttendee) {
                        alert('Please select whether you are a MEDCON\'25 attendee');
                        return;
                      }
                      
                      if (formData.isMedconAttendee === "Yes") {
                        if (!formData.email || !formData.email.includes('@')) {
                          alert('Please enter a valid email');
                          return;
                        }
                        setIsVerifyingEmail(true);
                        try {
                          const resp = await fetch(`https://gimsoc-backend.onrender.com/api/workshop/eligibility?email=${encodeURIComponent(formData.email)}`);
                          const data = await resp.json();
                          if (data.success) {
                            setSsEligible(!!data.eligible);
                            setSsStep('form');
                          } else {
                            alert(data.message || 'Eligibility check failed');
                          }
                        } catch (e) {
                          alert('Eligibility check failed');
                        } finally {
                          setIsVerifyingEmail(false);
                        }
                      } else {
                        setSsEligible(false);
                        setSsStep('form');
                      }
                    }}
                    disabled={isVerifyingEmail}
                    className="w-full px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {isVerifyingEmail ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Verifying with backend...
                      </>
                    ) : (
                      'Continue'
                    )}
                  </button>
                  {ssEligible === false && (
                    <p className="mt-3 text-sm text-yellow-700">No MEDCON ticket found for this email. Payment will be required.</p>
                  )}
                  {ssEligible === true && (
                    <p className="mt-3 text-sm text-green-700">✅ MEDCON ticket found! This Scientific Series is FREE for you.</p>
                  )}
                </div>
              </div>
            </div>
            ) : selectedWorkshop.id === "scientific-series" && ssStep === "form" ? (
            <motion.form 
              onSubmit={handleSubmit} 
              className="p-8"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <div className="space-y-8">
                {/* Full Name */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                >
                  <label className="block text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                    <User className="w-4 h-4 text-blue-500" />
                    Full Name *
                  </label>
                  <motion.input
                    type="text"
                    required
                    value={formData.fullName}
                    onChange={(e) => handleInputChange("fullName", e.target.value)}
                    className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 bg-gray-50 focus:bg-white"
                    placeholder="Enter your full name"
                    whileFocus={{ scale: 1.02 }}
                  />
                </motion.div>

                {/* Email */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                >
                  <label className="block text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                    <Mail className="w-4 h-4 text-green-500" />
                    Email Address *
                  </label>
                  <motion.input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-300 bg-gray-50 focus:bg-white"
                    placeholder="Enter a valid email address for all official communication"
                    whileFocus={{ scale: 1.02 }}
                  />
                </motion.div>

                {/* WhatsApp */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                >
                  <label className="block text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                    <Phone className="w-4 h-4 text-emerald-500" />
                    WhatsApp Contact *
                  </label>
                  <motion.input
                    type="text"
                    required
                    value={formData.whatsapp}
                    onChange={(e) => handleInputChange("whatsapp", e.target.value)}
                    className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-300 bg-gray-50 focus:bg-white"
                    placeholder="Please include the country code in brackets"
                    whileFocus={{ scale: 1.02 }}
                  />
                </motion.div>

              {/* Country */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Which country are you joining from? *
                </label>
                <input
                  type="text"
                  required
                  value={formData.country}
                  onChange={(e) => handleInputChange("country", e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter your country"
                />
              </div>

              {/* University */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  University Name *
                </label>
                <select
                  required
                  value={formData.university}
                  onChange={(e) => handleInputChange("university", e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent mt-2"
                    placeholder="Please specify your university"
                  />
                )}
              </div>

              {/* Current Semester */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Current Semester *
                </label>
                <select
                  required
                  value={formData.currentSemester}
                  onChange={(e) => handleInputChange("currentSemester", e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Mention your current academic semester</option>
                  {SEMESTER_OPTIONS.map((sem) => (
                    <option key={sem} value={sem}>{sem}</option>
                  ))}
                </select>
              </div>

              {/* GIMSOC Membership */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Are you a member of GIMSOC? *
                </label>
                <div className="flex gap-4">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="isGimsocMember"
                      value="Yes"
                      checked={formData.isGimsocMember === "Yes"}
                      onChange={(e) => handleInputChange("isGimsocMember", e.target.value)}
                      className="mr-2"
                    />
                    Yes
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
                    No
                  </label>
                </div>
                {formData.isGimsocMember === "Yes" && (
                  <input
                    type="text"
                    required
                    value={formData.gimsocCode}
                    onChange={(e) => handleInputChange("gimsocCode", e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent mt-2"
                    placeholder="Please enter your GIMSOC membership code"
                  />
                )}
              </div>

              {/* MEDCON Attendee */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Are you a MEDCON'25 Attendee? *
                </label>
                <div className="flex gap-4">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="isMedconAttendee"
                      value="Yes"
                      checked={formData.isMedconAttendee === "Yes"}
                      onChange={(e) => handleInputChange("isMedconAttendee", e.target.value)}
                      className="mr-2"
                    />
                    Yes
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="isMedconAttendee"
                      value="No"
                      checked={formData.isMedconAttendee === "No"}
                      onChange={(e) => handleInputChange("isMedconAttendee", e.target.value)}
                      className="mr-2"
                    />
                    No
                  </label>
                </div>
                {formData.isMedconAttendee === "No" && (
                  <p className="text-sm text-blue-600 mt-2">
                    If not yet, buy your ticket here:{" "}
                    <a href="www.medcongimsoc.com/tickets" className="underline" target="_blank" rel="noopener noreferrer">
                      www.medcongimsoc.com/tickets
                    </a>
                  </p>
                )}
              </div>

              {/* Webinar Session Details (only for scientific series) */}
              {selectedWorkshop.id === "scientific-series" && (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
                  <h4 className="text-lg font-semibold text-gray-900 mb-4">Webinar Session Details</h4>
                  <div className="space-y-4">
                    <div className="border-l-4 border-purple-500 pl-4">
                      <h5 className="font-semibold text-gray-900">Session 1 – Unlocking CDC WONDER: Tools, Trends & Research Opportunities</h5>
                      <p className="text-sm text-gray-600 mt-1">Date & Time: 24 September 2025, 5:30–7:30 pm GST</p>
                      <p className="text-sm text-gray-600">Speaker: Dr. Hashim Siraj MD</p>
                      <p className="text-sm text-gray-700 mt-2">Learn to navigate and extract U.S. public health datasets, generate tables/graphs, and apply data to your own research.</p>
                    </div>
                    <div className="border-l-4 border-purple-500 pl-4">
                      <h5 className="font-semibold text-gray-900">Session 2 – From Literature Mastery to Poster: Essential Tools for Scientific Research</h5>
                      <p className="text-sm text-gray-600 mt-1">Date & Time: 28 September 2025, 2:00–5:00 pm GST</p>
                      <p className="text-sm text-gray-600">Speakers: Ms. Nikhila Aby & Ms. Mennah Emam</p>
                      <p className="text-sm text-gray-700 mt-2">Part 1: Cross-Sectional Study Design & Literature Review Mastery</p>
                      <p className="text-sm text-gray-700">Part 2: PosterPath – Designing Effective Scientific Posters</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Project IMG Workshop Details (only for project-img) */}
              {selectedWorkshop.id === "project-img" && (
                <div className="bg-orange-50 border border-orange-200 rounded-lg p-6 mb-6">
                  <h4 className="text-lg font-semibold text-gray-900 mb-4">Workshop Details</h4>
                  <div className="space-y-4">
                    <div className="border-l-4 border-orange-500 pl-4">
                      <h5 className="font-semibold text-gray-900">From Isolation to Solidarity: Social Impacts of Infectious Disease</h5>
                      <p className="text-sm text-gray-600 mt-1">Date & Time: 1st October 2025, Online</p>
                      <p className="text-sm text-gray-600">Speaker: Mr. Michael Hermosa (Project IMG)</p>
                      <p className="text-sm text-gray-700 mt-2">This workshop explores how disease outbreaks transform community relationships and health behaviors, examining the social dynamics that emerge during infectious disease crises.</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Scientific Series Selection (only for scientific series and non-eligible users) */}
              {selectedWorkshop.id === "scientific-series" && ssEligible === false && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Select Fee Category: *
                  </label>
                  <div className="space-y-2">
                    {SCIENTIFIC_SERIES_OPTIONS.map((option) => (
                      <label key={option} className="flex items-center">
                        <input
                          type="radio"
                          name="selectedScientificSeries"
                          value={option}
                          checked={formData.selectedScientificSeries === option}
                          onChange={(e) => handleInputChange("selectedScientificSeries", e.target.value)}
                          className="mr-3"
                        />
                        <span className="text-gray-700">{option}</span>
                      </label>
                    ))}
                  </div>
                </div>
              )}

              {/* Show eligibility status for all workshop users */}
              {(selectedWorkshop.id === "scientific-series" || selectedWorkshop.id === "project-img") && (
                <>
                  {ssEligible === true && (
                    <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
                      <div className="flex items-center">
                        <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
                        <span className="text-green-800 font-medium">
                          🎉 Great! You have a valid MEDCON ticket. This workshop is FREE for you!
                        </span>
                      </div>
                    </div>
                  )}
                  
                  {ssEligible === false && (
                    <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                      <div className="flex items-center">
                        <AlertCircle className="w-5 h-5 text-yellow-600 mr-2" />
                        <span className="text-yellow-800 font-medium">
                          No MEDCON ticket found for this email. Payment will be required.
                        </span>
                      </div>
                    </div>
                  )}
                </>
              )}

              {/* Payment Proof Upload (for paid events) */}
              {((selectedWorkshop.id === "scientific-series" && ssEligible === false && formData.selectedScientificSeries) || (selectedWorkshop.id === "project-img" && ssEligible === false)) && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Proof of Payment *
                  </label>
                  
                  {/* Payment Proof Examples */}
                  <div className="mb-6">
                    <p className="text-sm text-gray-600 mb-4">Please upload a clear screenshot of your payment confirmation. Examples:</p>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                        <img 
                          src="/ab8cedda-965c-424e-9ba4-18e837fcaadf.JPG" 
                          alt="Bank Transfer Example 1" 
                          className="w-full h-auto rounded-lg shadow-lg"
                        />
                        <p className="text-sm text-gray-500 mt-2 text-center">Payment Order Example</p>
                      </div>
                      <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                        <img 
                          src="/1fedc4b1-f480-44cf-9351-b43895491c94.JPG" 
                          alt="Bank Transfer Example 2" 
                          className="w-full h-auto rounded-lg shadow-lg"
                        />
                        <p className="text-sm text-gray-500 mt-2 text-center">External Transfer Example</p>
                      </div>
                    </div>
                  </div>

                  <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-blue-400 transition-colors bg-gray-50">
                    <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                    <input
                      type="file"
                      accept=".jpg,.jpeg,.png"
                      onChange={handleFileUpload}
                      className="hidden"
                      id="payment-upload"
                      required
                    />
                    <label htmlFor="payment-upload" className="cursor-pointer">
                      <span className="text-blue-600 hover:text-blue-500 font-medium">Click to upload</span>
                      <span className="text-gray-500"> or drag and drop</span>
                    </label>
                    <p className="text-xs text-gray-500 mt-1">
                      Upload the exact payment receipt as a JPEG or PNG, not a PDF. Screenshots must clearly show full transaction details as shown in the examples
                    </p>
                    <p className="text-xs text-red-500 mt-1">⚠️ Maximum file size: 5MB</p>
                    {formData.paymentProof && (
                      <p className="text-sm text-green-600 mt-2">✓ File selected: {formData.paymentProof.name}</p>
                    )}
                  </div>
                </div>
              )}

              {/* Bank Details (for paid events) */}
              {selectedWorkshop.id === "scientific-series" && ssEligible === false && (
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
              )}

              {/* Consent & Submission */}
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                <label className="flex items-start">
                  <input
                    type="checkbox"
                    required
                    className="mt-1 mr-3"
                  />
                  <span className="text-sm text-gray-700">
                    I confirm that the information provided is accurate and I agree to receive event-related communications.
                  </span>
                </label>
              </div>

              {/* Submit Button */}
              <div className="flex gap-4 pt-6">
                <button
                  type="button"
                  onClick={() => setSelectedWorkshop(null)}
                  className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Back to Pre-conference Page
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
            ) : selectedWorkshop.id === "project-img" ? (
            <motion.form 
              onSubmit={handleSubmit} 
              className="p-8"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <div className="space-y-8">
                {/* Full Name */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                >
                  <label className="block text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                    <User className="w-4 h-4 text-blue-500" />
                    Full Name *
                  </label>
                  <motion.input
                    type="text"
                    required
                    value={formData.fullName}
                    onChange={(e) => handleInputChange("fullName", e.target.value)}
                    className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 bg-gray-50 focus:bg-white"
                    placeholder="Enter your full name"
                    whileFocus={{ scale: 1.02 }}
                  />
                </motion.div>

                {/* Email */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                >
                  <label className="block text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                    <Mail className="w-4 h-4 text-green-500" />
                    Email Address *
                  </label>
                  <motion.input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-300 bg-gray-50 focus:bg-white"
                    placeholder="Enter a valid email address for all official communication"
                    whileFocus={{ scale: 1.02 }}
                  />
                </motion.div>

                {/* WhatsApp */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                >
                  <label className="block text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                    <Phone className="w-4 h-4 text-emerald-500" />
                    WhatsApp Contact *
                  </label>
                  <motion.input
                    type="text"
                    required
                    value={formData.whatsapp}
                    onChange={(e) => handleInputChange("whatsapp", e.target.value)}
                    className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-300 bg-gray-50 focus:bg-white"
                    placeholder="Please include the country code in brackets"
                    whileFocus={{ scale: 1.02 }}
                  />
                </motion.div>

                {/* Country */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.7 }}
                >
                  <label className="block text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                    <Globe className="w-4 h-4 text-purple-500" />
                    Country *
                  </label>
                  <motion.input
                    type="text"
                    required
                    value={formData.country}
                    onChange={(e) => handleInputChange("country", e.target.value)}
                    className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-300 bg-gray-50 focus:bg-white"
                    placeholder="Which country are you joining from?"
                    whileFocus={{ scale: 1.02 }}
                  />
                </motion.div>

                {/* University */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.8 }}
                >
                  <label className="block text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                    <Building className="w-4 h-4 text-indigo-500" />
                    University Name *
                  </label>
                  <motion.select
                    required
                    value={formData.university}
                    onChange={(e) => handleInputChange("university", e.target.value)}
                    className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300 bg-gray-50 focus:bg-white"
                    whileFocus={{ scale: 1.02 }}
                  >
                    <option value="">Please select the name of your current university</option>
                    {UNIVERSITIES.map((uni) => (
                      <option key={uni} value={uni}>{uni}</option>
                    ))}
                    <option value="Other">Other</option>
                  </motion.select>
                  {formData.university === "Other" && (
                    <motion.input
                      type="text"
                      required
                      value={formData.otherUniversity}
                      onChange={(e) => handleInputChange("otherUniversity", e.target.value)}
                      className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300 bg-gray-50 focus:bg-white mt-3"
                      placeholder="Please specify your university"
                      whileFocus={{ scale: 1.02 }}
                    />
                  )}
                </motion.div>

                {/* Current Semester */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.9 }}
                >
                  <label className="block text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                    <School className="w-4 h-4 text-teal-500" />
                    Current Semester *
                  </label>
                  <motion.select
                    required
                    value={formData.currentSemester}
                    onChange={(e) => handleInputChange("currentSemester", e.target.value)}
                    className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all duration-300 bg-gray-50 focus:bg-white"
                    whileFocus={{ scale: 1.02 }}
                  >
                    <option value="">Mention your current academic semester</option>
                    {SEMESTER_OPTIONS.map((sem) => (
                      <option key={sem} value={sem}>{sem}</option>
                    ))}
                  </motion.select>
                </motion.div>

                {/* GIMSOC Membership */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 1.0 }}
                >
                  <label className="block text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                    <Users className="w-4 h-4 text-amber-500" />
                    Are you a member of GIMSOC? *
                  </label>
                  <div className="flex gap-6">
                    <label className="flex items-center cursor-pointer">
                      <input
                        type="radio"
                        name="isGimsocMember"
                        value="Yes"
                        checked={formData.isGimsocMember === "Yes"}
                        onChange={(e) => handleInputChange("isGimsocMember", e.target.value)}
                        className="mr-3 w-4 h-4 text-blue-600"
                      />
                      <span className="text-gray-700">Yes</span>
                    </label>
                    <label className="flex items-center cursor-pointer">
                      <input
                        type="radio"
                        name="isGimsocMember"
                        value="No"
                        checked={formData.isGimsocMember === "No"}
                        onChange={(e) => handleInputChange("isGimsocMember", e.target.value)}
                        className="mr-3 w-4 h-4 text-blue-600"
                      />
                      <span className="text-gray-700">No</span>
                    </label>
                  </div>
                  {formData.isGimsocMember === "Yes" && (
                    <motion.input
                      type="text"
                      required
                      value={formData.gimsocCode}
                      onChange={(e) => handleInputChange("gimsocCode", e.target.value)}
                      className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all duration-300 bg-gray-50 focus:bg-white mt-3"
                      placeholder="Please enter your GIMSOC membership code"
                      whileFocus={{ scale: 1.02 }}
                    />
                  )}
                </motion.div>

                {/* Project IMG Workshop Details */}
                <div className="bg-orange-50 border border-orange-200 rounded-lg p-6 mb-6">
                  <h4 className="text-lg font-semibold text-gray-900 mb-4">Workshop Details</h4>
                  <div className="space-y-4">
                    <div className="border-l-4 border-orange-500 pl-4">
                      <h5 className="font-semibold text-gray-900">From Isolation to Solidarity: Social Impacts of Infectious Disease</h5>
                      <p className="text-sm text-gray-600 mt-1">Date & Time: 1st October 2025, Online</p>
                      <p className="text-sm text-gray-600">Speaker: Dr. Tehseen Siddiqui (Specialist at Chicago Infectious Disease Physicians)</p>
                      <p className="text-sm text-gray-700 mt-2">This workshop explores how disease outbreaks transform community relationships and health behaviors, examining the social dynamics that emerge during infectious disease crises.</p>
                    </div>
                  </div>
                </div>

                {/* Free Event Notice */}
                <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                  <div className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
                    <span className="text-green-800 font-medium">
                      🎉 This is a FREE workshop! No payment required.
                    </span>
                  </div>
                </div>

                {/* Consent & Submission */}
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                  <label className="flex items-start">
                    <input
                      type="checkbox"
                      required
                      className="mt-1 mr-3"
                    />
                    <span className="text-sm text-gray-700">
                      I confirm that the information provided is accurate and I agree to receive event-related communications.
                    </span>
                  </label>
                </div>

                {/* Submit Button */}
                <div className="flex gap-4 pt-6">
                  <button
                    type="button"
                    onClick={() => setSelectedWorkshop(null)}
                    className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Back to Pre-conference Page
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-1 bg-gradient-to-r from-orange-500 to-red-600 text-white px-6 py-3 rounded-lg hover:from-orange-600 hover:to-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Submitting...
                      </>
                    ) : (
                      <>
                        <CheckCircle className="w-4 h-4" />
                        Register for Free Workshop
                      </>
                    )}
                  </button>
                </div>
              </div>
            </motion.form>
            ) : (
              <div className="p-8">
                <div className="bg-yellow-50 border border-yellow-200 text-yellow-800 p-4 rounded-lg">
                  Registration for this pre-conference is not open online. Please check back later.
                </div>
                <div className="mt-6">
                  <button
                    type="button"
                    onClick={() => setSelectedWorkshop(null)}
                    className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Back to Pre-Conference Selection
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}
