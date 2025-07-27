"use client"

import { Navigation } from "lucide-react"
import Card from "./Card"

const VenuePage = () => {
  const venueLocation = "https://maps.app.goo.gl/HjgH9gKbMGKHTi3V9?g_st=ipc"

  const handleNavigate = () => {
    window.open(venueLocation, "_blank")
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Venue Map</h1>
          <p className="text-gray-600 mt-2">Navigate to the conference venue with our interactive map</p>
        </div>
      </div>

      {/* Google Maps Integration */}
      <Card>
        <div className="p-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-900">Conference Venue</h2>
              <button
                onClick={handleNavigate}
                className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors font-medium"
              >
                <Navigation className="w-4 h-4" />
                Navigate
              </button>
            </div>
            
            {/* Responsive Google Maps iframe */}
            <div className="relative w-full h-96 rounded-lg overflow-hidden border border-gray-200">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2978.1234567890123!2d44.7890123456789!3d41.71234567890123!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDHCsDQyJzQ0LjQiTiA0NMKwNDcnMjAuNCJF!5e0!3m2!1sen!2sge!4v1234567890123"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Conference Venue"
                className="absolute inset-0"
              ></iframe>
            </div>

            {/* Venue Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
                <h3 className="text-lg font-semibold text-blue-900 mb-3">Venue Details</h3>
                <div className="space-y-2 text-sm text-blue-800">
                  <p><strong>Address:</strong> Tbilisi, Georgia</p>
                  <p><strong>Conference Center:</strong> Main Conference Hall</p>
                  <p><strong>Capacity:</strong> 500+ attendees</p>
                  <p><strong>Parking:</strong> Available on-site</p>
                </div>
              </div>

              <div className="bg-green-50 p-6 rounded-lg border border-green-200">
                <h3 className="text-lg font-semibold text-green-900 mb-3">Getting There</h3>
                <div className="space-y-2 text-sm text-green-800">
                  <p><strong>Public Transport:</strong> Metro and bus routes available</p>
                  <p><strong>Taxi:</strong> 24/7 taxi service</p>
                  <p><strong>Walking:</strong> 10 minutes from city center</p>
                  <p><strong>Accessibility:</strong> Wheelchair accessible</p>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="flex flex-wrap gap-3 mt-6">
              <button
                onClick={handleNavigate}
                className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-colors font-medium"
              >
                <Navigation className="w-4 h-4" />
                Get Directions
              </button>
              <button
                onClick={() => window.open("tel:+995123456789", "_blank")}
                className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg transition-colors font-medium"
              >
                📞 Call Venue
              </button>
              <button
                onClick={() => window.open("mailto:venue@medcon25.com", "_blank")}
                className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg transition-colors font-medium"
              >
                📧 Contact Venue
              </button>
            </div>
          </div>
        </div>
      </Card>
    </div>
  )
}

export default VenuePage
