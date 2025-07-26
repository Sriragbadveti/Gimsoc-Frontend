"use client"

import { Calendar } from "lucide-react"
import Card from "./Card"

const BoothsPage = () => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Exhibition Booths</h1>
        <p className="text-gray-600 mt-2">Explore sponsor booths and academic exhibitions with interactive resources</p>
      </div>

      {/* Coming Soon Message */}
      <Card>
        <div className="p-12 text-center">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Calendar className="w-8 h-8 text-blue-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Coming Soon in September</h2>
          <p className="text-gray-600 text-lg">
            Exhibition booths will be available during the conference in September 2025.
          </p>
        </div>
      </Card>
    </div>
  )
}

export default BoothsPage
