"use client"

import { useState } from "react"

export default function FAQSection() {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false)

  const openContactModal = () => setIsContactModalOpen(true)
  const closeContactModal = () => setIsContactModalOpen(false)

  const contactEmails = [
    { department: "General", email: "medconconferencegimsoc@gmail.com" },
    { department: "IT", email: "badvetisrirag@gmail.com" },
    { department: "Media", email: "workmail.hadeshchaudhary@gmail.com" },
    { department: "Ticketing", email: "nupuraajesh@gmail.com" },
  ]

  const faqs = [
    {
      question: "What is included in the registration fee?",
      answer:
        "Registration includes access to all keynote sessions, workshops, lunch and refreshments for all conference days, networking events, and a certificate of attendance.",
    },
    {
      question: "Can I get a refund if I can't attend?",
      answer:
        "Refunds are not possible due to the nature of our conference , Please make sure you can attend before buying the ticket.",
    },
    {
      question: "How do I submit an abstract?",
      answer:
        "Select the 'Abstract Submission' option during registration. You'll be prompted to provide your abstract title and text. The committee will review all submissions and notify selected presenters.",
    },
    {
      question: "Are there accommodations for international attendees?",
      answer:
        "Yes, we have partnered with local hotels to provide discounted rates for conference attendees. Select the 'International Package' option during registration for assistance with accommodations.",
    },
  ]

  return (
    <>
      <div className="bg-gray-50 py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-none">
            <div className="grid grid-cols-1 gap-x-8 gap-y-16 lg:grid-cols-2">
              <div>
                <h2 className="text-4xl font-semibold tracking-tight text-gray-900">Frequently asked questions</h2>
                <p className="mt-4 text-lg text-gray-600">
                  Can't find the answer you're looking for? Reach out to our{" "}
                  <button
                    onClick={openContactModal}
                    className="font-semibold text-indigo-600 hover:text-indigo-500 cursor-pointer underline"
                  >
                    customer support team
                  </button>
                  .
                </p>
              </div>
              <div className="grid grid-cols-1 gap-6">
                {faqs.map((faq, index) => (
                  <div
                    key={index}
                    className={`p-6 rounded-lg transform transition-all duration-300 hover:-translate-y-2 hover:scale-[1.03] hover:shadow-xl text-white ${
                      index % 2 === 0
                        ? "bg-gradient-to-br from-[#4aa053] to-[#1e4923] hover:from-[#3b8647] hover:to-[#153b1d]"
                        : "bg-gradient-to-br from-[#c43410] to-[#461307] hover:from-[#a62f0e] hover:to-[#320e05]"
                    }`}
                  >
                    <h3 className="text-lg font-medium mb-2">{faq.question}</h3>
                    <p>{faq.answer}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Modal */}
      {isContactModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-96 overflow-y-auto">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Contact Us</h3>
              <button onClick={closeContactModal} className="text-gray-400 hover:text-gray-600 transition-colors">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6">
              <p className="text-gray-600 mb-4">Get in touch with our team for any inquiries:</p>
              <div className="space-y-4">
                {contactEmails.map((contact, index) => (
                  <div key={index} className="border-l-4 border-blue-500 pl-4">
                    <h4 className="font-medium text-gray-900 capitalize">{contact.department}</h4>
                    <a
                      href={`mailto:${contact.email}`}
                      className="text-blue-600 hover:text-blue-800 text-sm break-all transition-colors"
                    >
                      {contact.email}
                    </a>
                  </div>
                ))}
              </div>
            </div>

            {/* Modal Footer */}
            <div className="px-6 py-4 bg-gray-50 rounded-b-lg">
              <button
                onClick={closeContactModal}
                className="w-full bg-gray-900 text-white py-2 px-4 rounded-md hover:bg-gray-800 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Click outside to close */}
      {isContactModalOpen && <div className="fixed inset-0 z-40" onClick={closeContactModal}></div>}
    </>
  )
}
