"use client"

import { Mail, Phone, Users, MessageCircle, AlertCircle, CheckCircle } from "lucide-react"
import Card from "./Card"

const ContactPage = () => {
  const departments = [
    {
      title: "General Information",
      email: "medconconferencegimsoc@gmail.com",
      
      icon: Mail,
      color: "bg-blue-500",
      borderColor: "border-blue-200",
      textColor: "text-blue-800",
      description: "General inquiries about MEDCON'25 conference, registration, and general information.",
      responseTime: "24 hours",
      features: ["Conference Information", "Registration Queries", "General Support"]
    },
    {
      title: "Technical Support",
      email: "badvetisrirag@gmail.com",
      
      icon: AlertCircle,
      color: "bg-orange-500",
      borderColor: "border-orange-200",
      textColor: "text-orange-800",
      description: "Technical issues with the dashboard, website, or digital platform support.",
      responseTime: "4-8 hours",
      features: ["Dashboard Issues", "Website Problems", "Digital Platform Support"]
    },
    {
      title: "Registration & Billing",
      email: "nupuraajesh@gmail.com",
      phone: "+995 123 456 791",
      icon: CheckCircle,
      color: "bg-green-500",
      borderColor: "border-green-200",
      textColor: "text-green-800",
      description: "Ticket registration, payment issues, and billing-related inquiries.",
      responseTime: "12 hours",
      features: ["Ticket Registration", "Payment Issues", "Billing Support"]
    },
    {
      title: "Finance",
      email: "mandrika311@gmail.com",
      phone: "+995 123 456 792",
      icon: Users,
      color: "bg-purple-500",
      borderColor: "border-purple-200",
      textColor: "text-purple-800",
      description: "Media inquiries, partnership opportunities, and sponsorship information.",
      responseTime: "48 hours",
      features: ["Media Inquiries", "Partnerships", "Sponsorship"]
    }
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Contact Us</h1>
        <p className="text-gray-600 mt-2">Get in touch with our dedicated support teams</p>
      </div>

      {/* Department Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {departments.map((dept, index) => {
          const Icon = dept.icon
          return (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <div className="p-6">
                <div className="flex items-start space-x-4">
                  <div className={`p-3 rounded-lg ${dept.color} text-white`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{dept.title}</h3>
                    <p className="text-gray-600 mb-4">{dept.description}</p>
                    
                    <div className="space-y-3">
                      <div className="flex items-center space-x-2">
                        <Mail className="w-4 h-4 text-gray-400" />
                        <a 
                          href={`mailto:${dept.email}`}
                          className="text-blue-600 hover:text-blue-800 font-medium"
                        >
                          {dept.email}
                        </a>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Phone className="w-4 h-4 text-gray-400" />
                        <a 
                          href={`tel:${dept.phone}`}
                          className="text-gray-700 hover:text-gray-900 font-medium"
                        >
                          {dept.phone}
                        </a>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <MessageCircle className="w-4 h-4 text-gray-400" />
                        <span className={`text-sm font-medium ${dept.textColor}`}>
                          Response time: {dept.responseTime}
                        </span>
                      </div>
                    </div>

                    <div className="mt-4 pt-4 border-t border-gray-200">
                      <h4 className="text-sm font-medium text-gray-700 mb-2">Services:</h4>
                      <div className="flex flex-wrap gap-2">
                        {dept.features.map((feature, idx) => (
                          <span 
                            key={idx}
                            className={`px-2 py-1 rounded-full text-xs font-medium ${dept.borderColor} ${dept.textColor} bg-opacity-10`}
                          >
                            {feature}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          )
        })}
      </div>

      {/* Contact Information Summary */}
      <Card>
        <div className="p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Contact Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-medium text-gray-900 mb-3">Email Addresses</h3>
              <div className="space-y-2">
                {departments.map((dept, index) => (
                  <div key={index} className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">{dept.title}:</span>
                    <a 
                      href={`mailto:${dept.email}`}
                      className="text-sm text-blue-600 hover:text-blue-800 font-medium"
                    >
                      {dept.email}
                    </a>
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="font-medium text-gray-900 mb-3">Phone Numbers</h3>
              <div className="space-y-2">
                {departments.map((dept, index) => (
                  <div key={index} className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">{dept.title}:</span>
                    <a 
                      href={`tel:${dept.phone}`}
                      className="text-sm text-gray-700 hover:text-gray-900 font-medium"
                    >
                      {dept.phone}
                    </a>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Office Hours */}
      <Card>
        <div className="p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Support Hours</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
              <h3 className="font-medium text-blue-900 mb-2">Weekdays</h3>
              <p className="text-sm text-blue-800">Monday - Friday</p>
              <p className="text-sm text-blue-800 font-medium">9:00 AM - 6:00 PM (GMT+4)</p>
            </div>
            <div className="bg-green-50 p-4 rounded-lg border border-green-200">
              <h3 className="font-medium text-green-900 mb-2">Weekends</h3>
              <p className="text-sm text-green-800">Saturday - Sunday</p>
              <p className="text-sm text-green-800 font-medium">10:00 AM - 4:00 PM (GMT+4)</p>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
              <h3 className="font-medium text-purple-900 mb-2">Emergency</h3>
              <p className="text-sm text-purple-800">24/7 Support</p>
              <p className="text-sm text-purple-800 font-medium">During Conference Days</p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  )
}

export default ContactPage
