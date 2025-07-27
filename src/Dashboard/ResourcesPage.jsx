"use client"

import { Calendar } from "lucide-react"
import Card from "./Card"

const ResourcesPage = () => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Resources & Downloads</h1>
        <p className="text-gray-600 mt-2">Access conference materials, workshop resources, and video recordings</p>
      </div>

      {/* Coming Soon Message */}
      <Card>
        <div className="p-12 text-center">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Calendar className="w-8 h-8 text-blue-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Coming Soon in September</h2>
          <p className="text-gray-600 text-lg">
            Resources and downloads will be available during the conference in September 2025.
          </p>
        </div>
      </Card>
    </div>
  )
}

export default ResourcesPage
