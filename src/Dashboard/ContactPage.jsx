"use client"

import { useState } from "react"
import { Mail, Phone, CheckCircle, AlertCircle, Clock } from "lucide-react"
import Card from "./Card"

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    category: "general",
    priority: "normal",
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [errors, setErrors] = useState({})

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }))
    }
  }

  const validateForm = () => {
    const newErrors = {}
    if (!formData.name.trim()) newErrors.name = "Name is required"
    if (!formData.email.trim()) newErrors.email = "Email is required"
    if (!formData.email.includes("@")) newErrors.email = "Please enter a valid email"
    if (!formData.subject.trim()) newErrors.subject = "Subject is required"
    if (!formData.message.trim()) newErrors.message = "Message is required"

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!validateForm()) return

    setIsSubmitting(true)

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500))

    setIsSubmitting(false)
    setSubmitted(true)

    // Reset form after 5 seconds
    setTimeout(() => {
      setSubmitted(false)
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
        category: "general",
        priority: "normal",
      })
    }, 5000)
  }

  const contactInfo = [
    {
      title: "General Information",
      email: "info@conference2024.com",
      phone: "+1 (555) 123-4567",
      icon: Mail,
      color: "bg-blue-50 border-blue-200 text-blue-800",
      description: "General inquiries and conference information",
    },
    {
      title: "Technical Support",
      email: "support@conference2024.com",
      phone: "+1 (555) 123-4568",
      icon: AlertCircle,
      color: "bg-orange-50 border-orange-200 text-orange-800",
      description: "Platform issues and technical assistance",
    },
    {
      title: "Registration Help",
      email: "registration@conference2024.com",
      phone: "+1 (555) 123-4569",
      icon: CheckCircle,
      color: "bg-green-50 border-green-200 text-green-800",
      description: "Registration and payment support",
    },
    {
      title: "Media Inquiries",
      email: "media@conference2024.com",
      phone: "+1 (555) 123-4570",
      icon: Phone,
      color: "bg-purple-50 border-purple-200 text-purple-800",
      description: "Press releases and media partnerships",
    },
  ]

  const faqItems = [
    {
      question: "How do I access my conference materials?",
      answer:
        "All conference materials are available in the Resources section of your dashboard. You can download presentations, workshop materials, and recordings after each session.",
    },
    {
      question: "Can I change my workshop selections?",
      answer:
        "Workshop selections can be modified up to 24 hours before the session starts, subject to availability. Contact registration support for assistance.",
    },
    {
      question: "What if I experience technical issues during live sessions?",
      answer:
        "Our technical support team is available during all live sessions. Use the chat feature in live sessions or contact support directly for immediate assistance.",
    },
    {
      question: "How do I network with other attendees?",
      answer:
        "Use the networking features in live sessions, join discussion forums, and participate in virtual coffee breaks and networking events scheduled throughout the conference.",
    },
  ]

  if (submitted) {
    return (
      <div className="space-y-6">
        <Card>
          <div className="p-12 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Message Sent Successfully!</h2>
            <p className="text-gray-600 mb-6">
              Thank you for contacting us. We've received your message and will respond within 24 hours.
            </p>
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 max-w-md mx-auto">
              <p className="text-green-800 text-sm">
                <strong>Reference ID:</strong> CONF2024-{Math.random().toString(36).substr(2, 9).toUpperCase()}
              </p>
            </div>
          </div>
        </Card>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Contact Support</h1>
        <p className="text-gray-600 mt-2">Get help with registration, technical issues, or general inquiries</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Contact Form */}
        <div className="lg:col-span-2">
          <Card>
            <div className="p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Send us a Message</h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        errors.name ? "border-red-300 bg-red-50" : "border-gray-300"
                      }`}
                      placeholder="Enter your full name"
                    />
                    {errors.name && <p className="text-red-600 text-sm mt-1">{errors.name}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email Address *</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        errors.email ? "border-red-300 bg-red-50" : "border-gray-300"
                      }`}
                      placeholder="Enter your email address"
                    />
                    {errors.email && <p className="text-red-600 text-sm mt-1">{errors.email}</p>}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                    <select
                      name="category"
                      value={formData.category}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="general">General Inquiry</option>
                      <option value="technical">Technical Support</option>
                      <option value="registration">Registration Help</option>
                      <option value="billing">Billing & Payment</option>
                      <option value="workshop">Workshop Questions</option>
                      <option value="networking">Networking Issues</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Priority</label>
                    <select
                      name="priority"
                      value={formData.priority}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="low">Low</option>
                      <option value="normal">Normal</option>
                      <option value="high">High</option>
                      <option value="urgent">Urgent</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Subject *</label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      errors.subject ? "border-red-300 bg-red-50" : "border-gray-300"
                    }`}
                    placeholder="Brief description of your inquiry"
                  />
                  {errors.subject && <p className="text-red-600 text-sm mt-1">{errors.subject}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Message *</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows="6"
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none ${
                      errors.message ? "border-red-300 bg-red-50" : "border-gray-300"
                    }`}
                    placeholder="Please provide detailed information about your inquiry..."
                  ></textarea>
                  {errors.message && <p className="text-red-600 text-sm mt-1">{errors.message}</p>}
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full py-3 px-6 rounded-lg font-medium transition-colors ${
                    isSubmitting
                      ? "bg-gray-400 text-gray-200 cursor-not-allowed"
                      : "bg-blue-600 text-white hover:bg-blue-700"
                  }`}
                >
                  {isSubmitting ? (
                    <div className="flex items-center justify-center">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Sending Message...
                    </div>
                  ) : (
                    "Send Message"
                  )}
                </button>
              </form>
            </div>
          </Card>
        </div>

        {/* Contact Information Sidebar */}
        <div className="space-y-6">
          {/* Contact Methods */}
          <Card>
            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Contact Information</h3>
              <div className="space-y-4">
                {contactInfo.map((contact, index) => {
                  const Icon = contact.icon
                  return (
                    <div key={index} className={`p-4 rounded-lg border ${contact.color}`}>
                      <div className="flex items-start space-x-3">
                        <Icon className="w-5 h-5 mt-0.5" />
                        <div className="flex-1">
                          <h4 className="font-medium mb-1">{contact.title}</h4>
                          <p className="text-sm mb-2">{contact.description}</p>
                          <div className="space-y-1 text-sm">
                            <div className="flex items-center">
                              <Mail className="w-3 h-3 mr-2" />
                              <a href={`mailto:${contact.email}`} className="hover:underline">
                                {contact.email}
                              </a>
                            </div>
                            <div className="flex items-center">
                              <Phone className="w-3 h-3 mr-2" />
                              <a href={`tel:${contact.phone}`} className="hover:underline">
                                {contact.phone}
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </Card>

          {/* Office Hours */}
          <Card>
            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <Clock className="w-5 h-5 mr-2" />
                Support Hours
              </h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Monday - Friday:</span>
                  <span className="font-medium">8:00 AM - 8:00 PM EST</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Saturday:</span>
                  <span className="font-medium">10:00 AM - 6:00 PM EST</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Sunday:</span>
                  <span className="font-medium">12:00 PM - 6:00 PM EST</span>
                </div>
                <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
                  <p className="text-blue-800 text-xs">
                    <strong>Conference Days:</strong> Extended support available 24/7 during June 15-17
                  </p>
                </div>
              </div>
            </div>
          </Card>

          {/* Response Time */}
          <Card>
            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Expected Response Times</h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">General Inquiries:</span>
                  <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
                    24 hours
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Technical Support:</span>
                  <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs font-medium">
                    4-8 hours
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Urgent Issues:</span>
                  <span className="px-2 py-1 bg-red-100 text-red-800 rounded-full text-xs font-medium">1-2 hours</span>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* FAQ Section */}
      <Card>
        <div className="p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Frequently Asked Questions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {faqItems.map((faq, index) => (
              <div key={index} className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-medium text-gray-900 mb-2">{faq.question}</h4>
                <p className="text-gray-700 text-sm leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </Card>

      {/* Emergency Contact */}
      <Card>
        <div className="p-6 bg-gradient-to-r from-red-50 to-orange-50 border border-red-200">
          <div className="flex items-start space-x-3">
            <AlertCircle className="w-6 h-6 text-red-600 mt-1" />
            <div>
              <h3 className="text-lg font-semibold text-red-900 mb-2">Emergency Support</h3>
              <p className="text-red-800 mb-3">
                For urgent technical issues during live sessions or critical registration problems:
              </p>
              <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
                <a
                  href="tel:+15551234567"
                  className="inline-flex items-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium"
                >
                  <Phone className="w-4 h-4 mr-2" />
                  Call Emergency Line
                </a>
                <span className="text-red-700 text-sm">Available 24/7 during conference dates</span>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  )
}

export default ContactPage
