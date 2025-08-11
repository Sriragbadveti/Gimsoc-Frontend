"use client"

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BackgroundBeams } from "../Components/BackgroundBeams";
import { TypewriterEffectSmooth } from "../Components/TypewriterEffect";
import axios from "axios";

const VolunteerApplication = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    email: "",
    isGimsocMember: false,
    gimsocMembershipId: "",
    fullName: "",
    whatsappNumber: "",
    university: "",
    whatMakesYouUnique: "",
    handleConstructiveCriticism: "",
    dateOfArrival: "",
    dateOfDeparture: "",
    firstChoice: "",
    secondChoice: "",
    thirdChoice: "",
    logisticsResponses: {},
    prMarketingResponses: {},
    organizationResponses: {},
    workshopResponses: {},
    registrationResponses: {},
    itTechResponses: {}
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [error, setError] = useState("");

  const universities = [
    "Geomedi University",
    "Ivane Javakhishvili Tbilisi State University (TSU)",
    "Tbilisi State Medical University (TSMU)",
    "Georgian American University (GAU)",
    "Georgian National University (SEU)",
    "Caucasus International University (CIU)",
    "Alte University",
    "David Tvildiani Medical University (DTMU)",
    "New Vision University (NVU)",
    "Ilia State University (ISU)",
    "East European University (EEU)",
    "Tbilisi Medical Academy (TMA)",
    "Grigol Robakidze University (GRUNI)",
    "Ken Walker International University",
    "European University (EU)",
    "University of Georgia (UG)"
  ];

  const teamChoices = [
    "LOGISTICS TEAM - Volunteer",
    "PR and MARKETING TEAM - Volunteer",
    "ORGANIZATION and PROGRAMME PLANNING TEAM - Volunteer",
    "WORKSHOP TEAM - Volunteer",
    "REGISTRATION and ATTENDEES SERVICES TEAM - Volunteer",
    "IT and TECH SUPPORT TEAM - Volunteer"
  ];

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    // Handle nested form data (e.g., logisticsResponses.comfortablePhysicalTasks)
    if (name.includes('.')) {
      const [parentKey, childKey] = name.split('.');
      setFormData(prev => ({
        ...prev,
        [parentKey]: {
          ...prev[parentKey],
          [childKey]: type === 'checkbox' ? checked : value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value
      }));
    }
  };

  const nextStep = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      const response = await axios.post(
        
        "https://gimsoc-backend.onrender.com/api/volunteer/submit",
        formData
      );

      if (response.status === 201) {
        setSubmitSuccess(true);
      }
    } catch (error) {
      console.error("Error submitting application:", error);
      setError(error.response?.data?.message || "Failed to submit application");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitSuccess) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black relative overflow-hidden">
        <BackgroundBeams />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative z-10 text-center text-white max-w-2xl mx-auto px-6"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2 }}
            className="mb-8"
          >
            <div className="w-24 h-24 bg-green-500 rounded-full mx-auto mb-6 flex items-center justify-center">
              <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
          </motion.div>
          
          <h1 className="text-4xl font-bold mb-4 text-green-400">
            Application Submitted Successfully!
          </h1>
          
          <p className="text-xl text-gray-300 mb-8">
            Thank you for your interest in volunteering for MEDCON'25. We have received your application and will review it carefully.
          </p>
          
          <div className="bg-gray-800 rounded-lg p-6 mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-blue-400">What happens next?</h2>
            <ul className="text-left text-gray-300 space-y-2">
              <li>• Our team will review your application within 48 hours</li>
              <li>• You'll receive an email confirmation with your application details</li>
              <li>• If selected, you'll be contacted for further coordination</li>
              <li>• Training sessions will be scheduled for approved volunteers</li>
            </ul>
          </div>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => window.location.href = "/"}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg transition-colors"
          >
            Return to Home
          </motion.button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      <BackgroundBeams />
      
      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <TypewriterEffectSmooth
            words={[
              {
                text: "Volunteer",
                className: "text-5xl font-bold text-white",
              },
              {
                text: "Applications",
                className: "text-5xl font-bold text-blue-500",
              },
            ]}
          />
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-xl text-gray-300 mt-6 max-w-4xl mx-auto"
          >
            Join the Volunteers Team for MEDCON'25: Outbreaks to Breakthroughs
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="mt-8 p-6 bg-gradient-to-r from-blue-900/20 to-purple-900/20 rounded-lg border border-blue-500/30"
          >
            <p className="text-lg text-blue-200">
              <strong>Organized by:</strong> Georgian International Medical Students' Society (GIMSOC)
            </p>
            <p className="text-lg text-purple-200 mt-2">
              <strong>Theme:</strong> Infectious Disease | <strong>Location:</strong> Tbilisi, Georgia
            </p>
          </motion.div>
        </motion.div>

        {/* Progress Bar */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between mb-4">
            {[1, 2, 3, 4].map((step) => (
              <div key={step} className="flex items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold ${
                    step <= currentStep
                      ? "bg-blue-500 text-white"
                      : "bg-gray-600 text-gray-300"
                  }`}
                >
                  {step}
                </div>
                {step < 4 && (
                  <div
                    className={`w-16 h-1 mx-2 ${
                      step < currentStep ? "bg-blue-500" : "bg-gray-600"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
          
          <div className="text-center text-gray-400">
            {currentStep === 1 && "Basic Information"}
            {currentStep === 2 && "Team Selection"}
            {currentStep === 3 && "Role-Specific Questions"}
            {currentStep === 4 && "Review & Submit"}
          </div>
        </motion.div>

        {/* Form */}
        <motion.form
          key={currentStep}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          className="max-w-4xl mx-auto"
          onSubmit={handleSubmit}
        >
          <AnimatePresence mode="wait">
            {currentStep === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="bg-white/10 backdrop-blur-xl rounded-2xl p-8 border border-white/20"
              >
                <h2 className="text-3xl font-bold text-white mb-6 text-center">
                  Basic Information
                </h2>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-white mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-white/90 text-gray-800 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      placeholder="Enter your email address"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-white mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-white/90 text-gray-800 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      placeholder="Enter your full name"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-white mb-2">
                      WhatsApp Number with Country Code *
                    </label>
                    <input
                      type="tel"
                      name="whatsappNumber"
                      value={formData.whatsappNumber}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-white/90 text-gray-800 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      placeholder="+1 234 567 8900"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-white mb-2">
                      University *
                    </label>
                    <select
                      name="university"
                      value={formData.university}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-white/90 text-gray-800 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      required
                    >
                      <option value="">Select your university</option>
                      {universities.map((uni) => (
                        <option key={uni} value={uni}>{uni}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div className="md:col-span-2">
                    <div className="flex items-center mb-4">
                      <input
                        type="checkbox"
                        name="isGimsocMember"
                        checked={formData.isGimsocMember}
                        onChange={handleInputChange}
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                      />
                      <label className="ml-2 text-sm font-medium text-white">
                        Are you a GIMSOC member?
                      </label>
                    </div>
                    
                    {formData.isGimsocMember && (
                      <div>
                        <label className="block text-sm font-medium text-white mb-2">
                          GIMSOC Membership ID
                        </label>
                        <input
                          type="text"
                          name="gimsocMembershipId"
                          value={formData.gimsocMembershipId}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 bg-white/90 text-gray-800 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                          placeholder="Enter your GIMSOC membership ID"
                        />
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="flex justify-end mt-8">
                  <motion.button
                    type="button"
                    onClick={nextStep}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg transition-colors"
                  >
                    Next Step
                  </motion.button>
                </div>
              </motion.div>
            )}

            {currentStep === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="bg-white/10 backdrop-blur-xl rounded-2xl p-8 border border-white/20"
              >
                <h2 className="text-3xl font-bold text-white mb-6 text-center">
                  Team Selection
                </h2>
                
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-white mb-2">
                      What makes you unique, and why should you be selected for this role? *
                    </label>
                    <textarea
                      name="whatMakesYouUnique"
                      value={formData.whatMakesYouUnique}
                      onChange={handleInputChange}
                      rows={4}
                      className="w-full px-4 py-3 bg-white/90 text-gray-800 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      placeholder="Tell us what makes you stand out..."
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-white mb-2">
                      How do you handle constructive criticism in a collaborative environment? *
                    </label>
                    <textarea
                      name="handleConstructiveCriticism"
                      value={formData.handleConstructiveCriticism}
                      onChange={handleInputChange}
                      rows={4}
                      className="w-full px-4 py-3 bg-white/90 text-gray-800 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      placeholder="Describe your approach to feedback..."
                      required
                    />
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-white mb-2">
                        Date of Arrival (Coming to Tbilisi) *
                      </label>
                      <input
                        type="date"
                        name="dateOfArrival"
                        value={formData.dateOfArrival}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-white/90 text-gray-800 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-white mb-2">
                        Date of Departure (Leaving from Tbilisi) *
                      </label>
                      <input
                        type="date"
                        name="dateOfDeparture"
                        value={formData.dateOfDeparture}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-white/90 text-gray-800 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        required
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-white mb-2">
                      What is your 1st choice for Volunteer Spot? *
                    </label>
                    <select
                      name="firstChoice"
                      value={formData.firstChoice}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-white/90 text-gray-800 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      required
                    >
                      <option value="">Select your first choice</option>
                      {teamChoices.map((choice) => (
                        <option key={choice} value={choice}>{choice}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-white mb-2">
                      What is your 2nd choice for Volunteer Spot?
                    </label>
                    <select
                      name="secondChoice"
                      value={formData.secondChoice}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-white/90 text-gray-800 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    >
                      <option value="">Select your second choice (optional)</option>
                      <option value="I don't want to choose any more teams">I don't want to choose any more teams</option>
                      {teamChoices.filter(choice => choice !== formData.firstChoice).map((choice) => (
                        <option key={choice} value={choice}>{choice}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-white mb-2">
                      What is your 3rd choice for Volunteer Spot?
                    </label>
                    <select
                      name="thirdChoice"
                      value={formData.thirdChoice}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-white/90 text-gray-800 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    >
                      <option value="">Select your third choice (optional)</option>
                      <option value="I don't want to choose any more teams">I don't want to choose any more teams</option>
                      {teamChoices.filter(choice => choice !== formData.firstChoice && choice !== formData.secondChoice).map((choice) => (
                        <option key={choice} value={choice}>{choice}</option>
                      ))}
                    </select>
                  </div>
                </div>
                
                <div className="flex justify-between mt-8">
                  <motion.button
                    type="button"
                    onClick={prevStep}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-gray-600 hover:bg-gray-700 text-white font-semibold py-3 px-8 rounded-lg transition-colors"
                  >
                    Previous
                  </motion.button>
                  
                  <motion.button
                    type="button"
                    onClick={nextStep}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg transition-colors"
                  >
                    Next Step
                  </motion.button>
                </div>
              </motion.div>
            )}

            {currentStep === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="bg-white/10 backdrop-blur-xl rounded-2xl p-8 border border-white/20"
              >
                <h2 className="text-3xl font-bold text-white mb-6 text-center">
                  Role-Specific Questions
                </h2>
                
                <div className="space-y-8">
                  {/* Logistics Team Questions */}
                  {formData.firstChoice === "LOGISTICS TEAM - Volunteer" && (
                    <div className="space-y-6">
                      <h3 className="text-2xl font-semibold text-blue-400 mb-4">
                        Logistics Team - Volunteer Role
                      </h3>
                      <p className="text-gray-300 mb-6">
                        As a volunteer of the Logistics Team, your role includes coordination of event logistics, 
                        venue setup, equipment management, information booth management, crowd control, and 
                        audience communication.
                      </p>
                      
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-white mb-2">
                            The logistics roles often involve physical tasks. Are you comfortable in performing such tasks? *
                          </label>
                          <select
                            name="logisticsResponses.comfortablePhysicalTasks"
                            value={formData.logisticsResponses?.comfortablePhysicalTasks || ""}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 bg-white/90 text-gray-800 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                            required
                          >
                            <option value="">Select your answer</option>
                            <option value="Yes">Yes</option>
                            <option value="No">No</option>
                          </select>
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-white mb-2">
                            A session is running behind schedule while you're expected to help the information booth. How would you prioritize and manage this situation? *
                          </label>
                          <textarea
                            name="logisticsResponses.sessionBehindSchedule"
                            value={formData.logisticsResponses?.sessionBehindSchedule || ""}
                            onChange={handleInputChange}
                            rows={3}
                            className="w-full px-4 py-3 bg-white/90 text-gray-800 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                            placeholder="Describe your approach..."
                            required
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-white mb-2">
                            Describe a time where you helped solve a problem *
                          </label>
                          <textarea
                            name="logisticsResponses.problemSolving"
                            value={formData.logisticsResponses?.problemSolving || ""}
                            onChange={handleInputChange}
                            rows={3}
                            className="w-full px-4 py-3 bg-white/90 text-gray-800 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                            placeholder="Share your experience..."
                            required
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-white mb-2">
                            Working in logistics can be hectic and high-pressure during an event. How do you typically handle stress in a fast-paced situation? *
                          </label>
                          <textarea
                            name="logisticsResponses.handleStress"
                            value={formData.logisticsResponses?.handleStress || ""}
                            onChange={handleInputChange}
                            rows={3}
                            className="w-full px-4 py-3 bg-white/90 text-gray-800 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                            placeholder="Explain your stress management approach..."
                            required
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-white mb-2">
                            During the event, a fellow volunteer on your team disagrees with your approach in front of attendees. How would you handle the situation? *
                          </label>
                          <textarea
                            name="logisticsResponses.teamDisagreement"
                            value={formData.logisticsResponses?.teamDisagreement || ""}
                            onChange={handleInputChange}
                            rows={3}
                            className="w-full px-4 py-3 bg-white/90 text-gray-800 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                            placeholder="Describe your conflict resolution approach..."
                            required
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-white mb-2">
                            Do you have past experience? Describe your role and any tasks that are relevant to logistics *
                          </label>
                          <textarea
                            name="logisticsResponses.pastExperience"
                            value={formData.logisticsResponses?.pastExperience || ""}
                            onChange={handleInputChange}
                            rows={3}
                            className="w-full px-4 py-3 bg-white/90 text-gray-800 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                            placeholder="Share your relevant experience..."
                            required
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-white mb-2">
                            Are you comfortable in handling basic technical setups? Or do you have your own transportation? *
                          </label>
                          <textarea
                            name="logisticsResponses.technicalSetup"
                            value={formData.logisticsResponses?.technicalSetup || ""}
                            onChange={handleInputChange}
                            rows={3}
                            className="w-full px-4 py-3 bg-white/90 text-gray-800 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                            placeholder="Describe your technical capabilities or transportation..."
                            required
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-white mb-2">
                            How would you ensure a smooth guest experience — especially for faculty and international attendees? *
                          </label>
                          <textarea
                            name="logisticsResponses.smoothGuestExperience"
                            value={formData.logisticsResponses?.smoothGuestExperience || ""}
                            onChange={handleInputChange}
                            rows={3}
                            className="w-full px-4 py-3 bg-white/90 text-gray-800 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                            placeholder="Explain your approach to guest service..."
                            required
                          />
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {/* PR and Marketing Team */}
                  {formData.firstChoice === "PR and MARKETING TEAM - Volunteer" && (
                    <div className="space-y-6">
                      <h3 className="text-2xl font-semibold text-pink-400 mb-4">PR and Marketing Team - Volunteer</h3>
                      <p className="text-gray-300 mb-6">Assist on-site with photography and videography. Editing is optional if skilled.</p>
                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-medium text-white mb-2">Editing Tools (optional)</label>
                          <select name="prMarketingResponses.editingTool" value={formData.prMarketingResponses?.editingTool || ""} onChange={handleInputChange} className="w-full px-4 py-3 bg-white/90 text-gray-800 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all">
                            <option value="">Select one</option>
                            <option value="CapCut">CapCut</option>
                            <option value="Canva">Canva</option>
                            <option value="Adobe Premiere Pro">Adobe Premiere Pro</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-white mb-2">Camera Availability</label>
                          <select name="prMarketingResponses.cameraType" value={formData.prMarketingResponses?.cameraType || ""} onChange={handleInputChange} className="w-full px-4 py-3 bg-white/90 text-gray-800 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all" required>
                            <option value="">Select one</option>
                            <option value="Phone Camera">Phone Camera</option>
                            <option value="Professional Camera">Professional Camera</option>
                          </select>
                        </div>
                      </div>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-white mb-2">Portfolio link or description</label>
                          <textarea name="prMarketingResponses.portfolio" value={formData.prMarketingResponses?.portfolio || ""} onChange={handleInputChange} rows={3} className="w-full px-4 py-3 bg-white/90 text-gray-800 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all" />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-white mb-2">Ensure visual consistency with the event theme</label>
                          <textarea name="prMarketingResponses.visualConsistency" value={formData.prMarketingResponses?.visualConsistency || ""} onChange={handleInputChange} rows={3} className="w-full px-4 py-3 bg-white/90 text-gray-800 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all" required />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-white mb-2">Plan content capture without disrupting sessions</label>
                          <textarea name="prMarketingResponses.capturePlan" value={formData.prMarketingResponses?.capturePlan || ""} onChange={handleInputChange} rows={3} className="w-full px-4 py-3 bg-white/90 text-gray-800 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all" required />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-white mb-2">Increase attendee engagement (one creative strategy)</label>
                          <textarea name="prMarketingResponses.engagementStrategy" value={formData.prMarketingResponses?.engagementStrategy || ""} onChange={handleInputChange} rows={3} className="w-full px-4 py-3 bg-white/90 text-gray-800 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all" required />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-white mb-2">Prior experience in Advertising/Marketing?</label>
                          <select name="prMarketingResponses.hasExperience" value={formData.prMarketingResponses?.hasExperience || ""} onChange={handleInputChange} className="w-full px-4 py-3 bg-white/90 text-gray-800 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all" required>
                            <option value="">Select one</option>
                            <option value="Yes">Yes</option>
                            <option value="No">No</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Organization & Programme Planning */}
                  {formData.firstChoice === "ORGANIZATION and PROGRAMME PLANNING TEAM - Volunteer" && (
                    <div className="space-y-6">
                      <h3 className="text-2xl font-semibold text-amber-400 mb-4">Organization & Programme Planning</h3>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-white mb-2">Past experience in organizing/planning events</label>
                          <textarea name="organizationResponses.pastExperience" value={formData.organizationResponses?.pastExperience || ""} onChange={handleInputChange} rows={3} className="w-full px-4 py-3 bg-white/90 text-gray-800 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all" required />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-white mb-2">Handle hallway crowd block during transitions</label>
                          <textarea name="organizationResponses.hallwayBlock" value={formData.organizationResponses?.hallwayBlock || ""} onChange={handleInputChange} rows={3} className="w-full px-4 py-3 bg-white/90 text-gray-800 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all" required />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-white mb-2">Handle conflict with a team member during event</label>
                          <textarea name="organizationResponses.conflict" value={formData.organizationResponses?.conflict || ""} onChange={handleInputChange} rows={3} className="w-full px-4 py-3 bg-white/90 text-gray-800 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all" required />
                        </div>
                        <div className="grid md:grid-cols-2 gap-6">
                          <div>
                            <label className="block text-sm font-medium text-white mb-2">Available full duration (9AM-6PM)?</label>
                            <select name="organizationResponses.fullEvent" value={formData.organizationResponses?.fullEvent || ""} onChange={handleInputChange} className="w-full px-4 py-3 bg-white/90 text-gray-800 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all" required>
                              <option value="">Select one</option>
                              <option value="Yes">Yes</option>
                              <option value="No">No</option>
                            </select>
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-white mb-2">Available for pre-conference events?</label>
                            <select name="organizationResponses.preConference" value={formData.organizationResponses?.preConference || ""} onChange={handleInputChange} className="w-full px-4 py-3 bg-white/90 text-gray-800 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all" required>
                              <option value="">Select one</option>
                              <option value="Yes">Yes</option>
                              <option value="No">No</option>
                            </select>
                          </div>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-white mb-2">Comfortable assisting speakers and guests?</label>
                          <select name="organizationResponses.assistSpeakers" value={formData.organizationResponses?.assistSpeakers || ""} onChange={handleInputChange} className="w-full px-4 py-3 bg-white/90 text-gray-800 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all" required>
                            <option value="">Select one</option>
                            <option value="Yes">Yes</option>
                            <option value="No">No</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-white mb-2">First-time attendee asks for help mid-task</label>
                          <textarea name="organizationResponses.helpAttendee" value={formData.organizationResponses?.helpAttendee || ""} onChange={handleInputChange} rows={3} className="w-full px-4 py-3 bg-white/90 text-gray-800 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all" required />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-white mb-2">Doctor is lost and team busy</label>
                          <textarea name="organizationResponses.helpDoctor" value={formData.organizationResponses?.helpDoctor || ""} onChange={handleInputChange} rows={3} className="w-full px-4 py-3 bg-white/90 text-gray-800 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all" required />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-white mb-2">Session moved rooms suddenly</label>
                          <textarea name="organizationResponses.roomChange" value={formData.organizationResponses?.roomChange || ""} onChange={handleInputChange} rows={3} className="w-full px-4 py-3 bg-white/90 text-gray-800 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all" required />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-white mb-2">Willing to follow protocols and adapt to changes?</label>
                          <select name="organizationResponses.adaptability" value={formData.organizationResponses?.adaptability || ""} onChange={handleInputChange} className="w-full px-4 py-3 bg-white/90 text-gray-800 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all" required>
                            <option value="">Select one</option>
                            <option value="Yes">Yes</option>
                            <option value="No">No</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Workshops */}
                  {formData.firstChoice === "WORKSHOP TEAM - Volunteer" && (
                    <div className="space-y-6">
                      <h3 className="text-2xl font-semibold text-green-400 mb-4">Workshops Team</h3>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-white mb-2">Available for mandatory pre-conference training and planning?</label>
                          <select name="workshopResponses.trainingAvailability" value={formData.workshopResponses?.trainingAvailability || ""} onChange={handleInputChange} className="w-full px-4 py-3 bg-white/90 text-gray-800 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all" required>
                            <option value="">Select one</option>
                            <option value="Yes">Yes</option>
                            <option value="No">No</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-white mb-2">Describe a structured activity you organized/supported</label>
                          <textarea name="workshopResponses.orgSupport" value={formData.workshopResponses?.orgSupport || ""} onChange={handleInputChange} rows={3} className="w-full px-4 py-3 bg-white/90 text-gray-800 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all" required />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-white mb-2">Assist trainers with setup/time/engagement</label>
                          <select name="workshopResponses.assistTrainers" value={formData.workshopResponses?.assistTrainers || ""} onChange={handleInputChange} className="w-full px-4 py-3 bg-white/90 text-gray-800 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all" required>
                            <option value="">Select one</option>
                            <option value="Yes">Yes</option>
                            <option value="No">No</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-white mb-2">Track and communicate responsibilities within a team</label>
                          <textarea name="workshopResponses.teamCoordination" value={formData.workshopResponses?.teamCoordination || ""} onChange={handleInputChange} rows={3} className="w-full px-4 py-3 bg-white/90 text-gray-800 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all" required />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-white mb-2">Open to behind-the-scenes and participant-facing tasks?</label>
                          <select name="workshopResponses.flexibleRoles" value={formData.workshopResponses?.flexibleRoles || ""} onChange={handleInputChange} className="w-full px-4 py-3 bg-white/90 text-gray-800 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all" required>
                            <option value="">Select one</option>
                            <option value="Yes">Yes</option>
                            <option value="No">No</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-white mb-2">Trainer's equipment fails mid-session</label>
                          <textarea name="workshopResponses.equipmentFailure" value={formData.workshopResponses?.equipmentFailure || ""} onChange={handleInputChange} rows={3} className="w-full px-4 py-3 bg-white/90 text-gray-800 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all" required />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-white mb-2">Perform under pressure with multiple tasks</label>
                          <textarea name="workshopResponses.underPressure" value={formData.workshopResponses?.underPressure || ""} onChange={handleInputChange} rows={3} className="w-full px-4 py-3 bg-white/90 text-gray-800 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all" required />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-white mb-2">Comfortable setting up basic workshop equipment?</label>
                          <select name="workshopResponses.basicSetup" value={formData.workshopResponses?.basicSetup || ""} onChange={handleInputChange} className="w-full px-4 py-3 bg-white/90 text-gray-800 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all" required>
                            <option value="">Select one</option>
                            <option value="Yes">Yes</option>
                            <option value="No">No</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Registration & Attendees Services */}
                  {formData.firstChoice === "REGISTRATION and ATTENDEES SERVICES TEAM - Volunteer" && (
                    <div className="space-y-6">
                      <h3 className="text-2xl font-semibold text-cyan-400 mb-4">Registration & Attendees Services</h3>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-white mb-2">Available to go to assigned universities for workshop registration?</label>
                          <select name="registrationResponses.universityCommitment" value={formData.registrationResponses?.universityCommitment || ""} onChange={handleInputChange} className="w-full px-4 py-3 bg-white/90 text-gray-800 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all" required>
                            <option value="">Select one</option>
                            <option value="Yes">Yes</option>
                            <option value="No">No</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-white mb-2">Willing to assist in physical tasks before the conference?</label>
                          <select name="registrationResponses.physicalTasks" value={formData.registrationResponses?.physicalTasks || ""} onChange={handleInputChange} className="w-full px-4 py-3 bg-white/90 text-gray-800 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all" required>
                            <option value="">Select one</option>
                            <option value="Yes">Yes</option>
                            <option value="No">No</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-white mb-2">Assist a frustrated/ confused attendee about registration/location</label>
                          <textarea name="registrationResponses.handleFrustration" value={formData.registrationResponses?.handleFrustration || ""} onChange={handleInputChange} rows={3} className="w-full px-4 py-3 bg-white/90 text-gray-800 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all" required />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-white mb-2">Comfortable with Canva or similar platforms?</label>
                          <select name="registrationResponses.canva" value={formData.registrationResponses?.canva || ""} onChange={handleInputChange} className="w-full px-4 py-3 bg-white/90 text-gray-800 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all" required>
                            <option value="">Select one</option>
                            <option value="Yes">Yes</option>
                            <option value="No">No</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-white mb-2">Google Sheets & Forms Proficiency (1-5)</label>
                          <input type="number" min={1} max={5} name="registrationResponses.googleSkills" value={formData.registrationResponses?.googleSkills || ""} onChange={handleInputChange} className="w-full px-4 py-3 bg-white/90 text-gray-800 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all" required />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-white mb-2">Resolve a registration mix-up with Workshop Team</label>
                          <textarea name="registrationResponses.mixup" value={formData.registrationResponses?.mixup || ""} onChange={handleInputChange} rows={3} className="w-full px-4 py-3 bg-white/90 text-gray-800 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all" required />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-white mb-2">Confident answering attendee questions and directing them?</label>
                          <select name="registrationResponses.confident" value={formData.registrationResponses?.confident || ""} onChange={handleInputChange} className="w-full px-4 py-3 bg-white/90 text-gray-800 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all" required>
                            <option value="">Select one</option>
                            <option value="Yes">Yes</option>
                            <option value="No">No</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-white mb-2">Prioritize tasks when working on multiple items</label>
                          <textarea name="registrationResponses.prioritize" value={formData.registrationResponses?.prioritize || ""} onChange={handleInputChange} rows={3} className="w-full px-4 py-3 bg-white/90 text-gray-800 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all" required />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-white mb-2">Prior experience in registration/welcome/logistics</label>
                          <textarea name="registrationResponses.pastExperience" value={formData.registrationResponses?.pastExperience || ""} onChange={handleInputChange} rows={3} className="w-full px-4 py-3 bg-white/90 text-gray-800 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all" />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* IT & Tech Support */}
                  {formData.firstChoice === "IT and TECH SUPPORT TEAM -  Volunteer" || formData.firstChoice === "IT and TECH SUPPORT TEAM - Volunteer" ? (
                    <div className="space-y-6">
                      <h3 className="text-2xl font-semibold text-indigo-400 mb-4">IT & Tech Support</h3>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-white mb-2">Experience with AV equipment (mics, projectors, speakers, laptops)?</label>
                          <select name="itTechResponses.avExperience" value={formData.itTechResponses?.avExperience || ""} onChange={handleInputChange} className="w-full px-4 py-3 bg-white/90 text-gray-800 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all" required>
                            <option value="">Select one</option>
                            <option value="Yes">Yes</option>
                            <option value="No">No</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-white mb-2">Mic stops working mid-session — your response?</label>
                          <textarea name="itTechResponses.micIssue" value={formData.itTechResponses?.micIssue || ""} onChange={handleInputChange} rows={3} className="w-full px-4 py-3 bg-white/90 text-gray-800 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all" required />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-white mb-2">Experience with Zoom/Meet live setup?</label>
                          <select name="itTechResponses.virtualPlatform" value={formData.itTechResponses?.virtualPlatform || ""} onChange={handleInputChange} className="w-full px-4 py-3 bg-white/90 text-gray-800 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all" required>
                            <option value="">Select one</option>
                            <option value="Yes">Yes</option>
                            <option value="No">No</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-white mb-2">Staying calm and efficient during sudden failures</label>
                          <textarea name="itTechResponses.stayCalm" value={formData.itTechResponses?.stayCalm || ""} onChange={handleInputChange} rows={3} className="w-full px-4 py-3 bg-white/90 text-gray-800 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all" required />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-white mb-2">Troubleshoot screen freezing/audio/connectivity?</label>
                          <select name="itTechResponses.troubleshootCommon" value={formData.itTechResponses?.troubleshootCommon || ""} onChange={handleInputChange} className="w-full px-4 py-3 bg-white/90 text-gray-800 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all" required>
                            <option value="">Select one</option>
                            <option value="Yes">Yes</option>
                            <option value="No">No</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-white mb-2">Presenter needs laptop help while teammate handles sound elsewhere</label>
                          <textarea name="itTechResponses.prioritization" value={formData.itTechResponses?.prioritization || ""} onChange={handleInputChange} rows={3} className="w-full px-4 py-3 bg-white/90 text-gray-800 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all" required />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-white mb-2">Previous event tech/AV experience (describe)</label>
                          <textarea name="itTechResponses.pastExperience" value={formData.itTechResponses?.pastExperience || ""} onChange={handleInputChange} rows={3} className="w-full px-4 py-3 bg-white/90 text-gray-800 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all" />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-white mb-2">Manage live presentation and simultaneous virtual broadcast</label>
                          <textarea name="itTechResponses.liveAndVirtual" value={formData.itTechResponses?.liveAndVirtual || ""} onChange={handleInputChange} rows={3} className="w-full px-4 py-3 bg-white/90 text-gray-800 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all" required />
                        </div>
                      </div>
                    </div>
                  ) : null}
                </div>
                
                <div className="flex justify-between mt-8">
                  <motion.button
                    type="button"
                    onClick={prevStep}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-gray-600 hover:bg-gray-700 text-white font-semibold py-3 px-8 rounded-lg transition-colors"
                  >
                    Previous
                  </motion.button>
                  
                  <motion.button
                    type="button"
                    onClick={nextStep}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg transition-colors"
                  >
                    Next Step
                  </motion.button>
                </div>
              </motion.div>
            )}

            {currentStep === 4 && (
              <motion.div
                key="step4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="bg-white/10 backdrop-blur-xl rounded-2xl p-8 border border-white/20"
              >
                <h2 className="text-3xl font-bold text-white mb-6 text-center">
                  Review & Submit
                </h2>
                
                <div className="space-y-6 mb-8">
                  <div className="bg-gray-800/50 rounded-lg p-6">
                    <h3 className="text-xl font-semibold text-blue-400 mb-4">Application Summary</h3>
                    <div className="grid md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-gray-400">Email:</p>
                        <p className="text-white">{formData.email}</p>
                      </div>
                      <div>
                        <p className="text-gray-400">Full Name:</p>
                        <p className="text-white">{formData.fullName}</p>
                      </div>
                      <div>
                        <p className="text-gray-400">WhatsApp:</p>
                        <p className="text-white">{formData.whatsappNumber}</p>
                      </div>
                      <div>
                        <p className="text-gray-400">University:</p>
                        <p className="text-white">{formData.university}</p>
                      </div>
                      <div>
                        <p className="text-gray-400">GIMSOC Member:</p>
                        <p className="text-white">{formData.isGimsocMember ? "Yes" : "No"}</p>
                      </div>
                      {formData.isGimsocMember && (
                        <div>
                          <p className="text-gray-400">Membership ID:</p>
                          <p className="text-white">{formData.gimsocMembershipId}</p>
                        </div>
                      )}
                      <div>
                        <p className="text-gray-400">1st Choice:</p>
                        <p className="text-white">{formData.firstChoice}</p>
                      </div>
                      {formData.secondChoice && (
                        <div>
                          <p className="text-gray-400">2nd Choice:</p>
                          <p className="text-white">{formData.secondChoice}</p>
                        </div>
                      )}
                      {formData.thirdChoice && (
                        <div>
                          <p className="text-gray-400">3rd Choice:</p>
                          <p className="text-white">{formData.thirdChoice}</p>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  {error && (
                    <div className="p-4 bg-red-500/20 border border-red-300/30 rounded-lg">
                      <p className="text-red-200">{error}</p>
                    </div>
                  )}
                  
                  <div className="bg-yellow-500/20 border border-yellow-300/30 rounded-lg p-4">
                    <p className="text-yellow-200 text-sm">
                      <strong>Important:</strong> Please review all information carefully before submitting. 
                      You cannot edit your application after submission.
                    </p>
                  </div>
                </div>
                
                <div className="flex justify-between">
                  <motion.button
                    type="button"
                    onClick={prevStep}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-gray-600 hover:bg-gray-700 text-white font-semibold py-3 px-8 rounded-lg transition-colors"
                  >
                    Previous
                  </motion.button>
                  
                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    whileHover={{ scale: isSubmitting ? 1 : 1.05 }}
                    whileTap={{ scale: isSubmitting ? 1 : 0.95 }}
                    className={`font-semibold py-3 px-8 rounded-lg transition-colors ${
                      isSubmitting
                        ? "bg-gray-600 cursor-not-allowed"
                        : "bg-green-600 hover:bg-green-700"
                    } text-white`}
                  >
                    {isSubmitting ? "Submitting..." : "Submit Application"}
                  </motion.button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.form>
      </div>
    </div>
  );
};

export default VolunteerApplication; 