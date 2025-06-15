"use client"

import { useState } from "react"

export default function Footer() {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false)

  const openContactModal = () => setIsContactModalOpen(true)
  const closeContactModal = () => setIsContactModalOpen(false)

  const contactEmails = [
    { department: "General", email: "medconconferencegimsoc@gmail.com" },
    { department: "IT", email: "badvetisrirag@gmail.com" },
    { department: "Media", email: "workmail.hadeshchaudhary@gmail.com" },
    { department: "Ticketing", email: "nupuraajesh@gmail.com" },
  ]

  return (
    <>
      <footer className="bg-gray-900 text-white py-12 md:py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            {/* MEDCON Section */}
            <div>
              <h2 className="text-2xl font-bold tracking-tight text-white mb-4">MEDCON'25</h2>
              <p className="text-gray-300 text-sm max-w-xs">
                The premier medical conference for students and professionals. Join us for workshops, networking, and
                the latest in medical research.
              </p>
            </div>

            {/* QUICK LINKS Section */}
            <div>
              <h3 className="text-base font-semibold uppercase tracking-wider text-white mb-4">Quick Links</h3>
              <ul className="space-y-3">
                <li>
                  <a href="#" className="text-gray-300 hover:text-white transition-colors">
                    Home
                  </a>
                </li>
                <li>
                  <a href="/tickets" className="text-gray-300 hover:text-white transition-colors">
                    Registration
                  </a>
                </li>
                <li>
                  {/* <a href="#" className="text-gray-300 hover:text-white transition-colors">
                    Dashboard
                  </a> */}
                </li>
              </ul>
            </div>

            {/* SUPPORT Section */}
            <div>
              <h3 className="text-base font-semibold uppercase tracking-wider text-white mb-4">Support</h3>
              <ul className="space-y-3">
                <li>
                  <button
                    onClick={openContactModal}
                    className="text-gray-300 hover:text-white transition-colors cursor-pointer text-left"
                  >
                    Contact Us
                  </button>
                </li>
                <li>
                  <a href="#" className="text-gray-300 hover:text-white transition-colors">
                    Terms of Service
                  </a>
                </li>
              </ul>
            </div>

            {/* CONNECT WITH US Section */}
            <div>
              <h3 className="text-base font-semibold uppercase tracking-wider text-white mb-4">Connect with us</h3>
              <div className="flex space-x-6">
                <a
                  href="https://www.facebook.com/profile.php?id=61575322144494"
                  className="text-gray-300 hover:text-white"
                >
                  <span className="sr-only">Facebook</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path
                      fillRule="evenodd"
                      d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>

                <a href="https://www.instagram.com/medcon_gimsoc/" className="text-gray-300 hover:text-white">
                  <span className="sr-only">Instagram</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path
                      fillRule="evenodd"
                      d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
              </div>
            </div>
          </div>

          <div className="mt-12 border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between">
            <p className="text-sm text-gray-400">© 2025 MEDCON. All rights reserved.</p>
            <p className="text-sm text-gray-400 mt-2 md:mt-0">
              Made with <span className="text-red-500">❤</span> for medical students worldwide
            </p>
          </div>
        </div>
      </footer>

      {/* Contact Modal */}
      {isContactModalOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[9999] p-4"
          onClick={closeContactModal}
        >
          <div
            className="bg-white rounded-lg shadow-xl w-full max-w-md max-h-[90vh] overflow-y-auto relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between p-4 sm:p-6 border-b border-gray-200 sticky top-0 bg-white rounded-t-lg">
              <h3 className="text-lg font-semibold text-gray-900">Contact Us</h3>
              <button
                onClick={closeContactModal}
                className="text-gray-400 hover:text-gray-600 transition-colors p-1 rounded-full hover:bg-gray-100"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-4 sm:p-6">
              <p className="text-gray-600 mb-4 text-sm sm:text-base">Get in touch with our team for any inquiries:</p>
              <div className="space-y-4">
                {contactEmails.map((contact, index) => (
                  <div key={index} className="border-l-4 border-blue-500 pl-4 py-2">
                    <h4 className="font-medium text-gray-900 capitalize text-sm sm:text-base">{contact.department}</h4>
                    <a
                      href={`mailto:${contact.email}`}
                      className="text-blue-600 hover:text-blue-800 text-xs sm:text-sm break-all transition-colors block mt-1"
                    >
                      {contact.email}
                    </a>
                  </div>
                ))}
              </div>
            </div>

            {/* Modal Footer */}
            <div className="px-4 sm:px-6 py-4 bg-gray-50 rounded-b-lg sticky bottom-0">
              <button
                onClick={closeContactModal}
                className="w-full bg-gray-900 text-white py-2 px-4 rounded-md hover:bg-gray-800 transition-colors text-sm sm:text-base"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
