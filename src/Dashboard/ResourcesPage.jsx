"use client"

import { useState } from "react"
import { Download, Play, FileText, Archive, Video, Search, Filter } from "lucide-react"
import Card from "./Card"

const ResourcesPage = () => {
  const [activeCategory, setActiveCategory] = useState("all")
  const [searchTerm, setSearchTerm] = useState("")
  const [sortBy, setSortBy] = useState("newest")

  const resources = [
    {
      id: 1,
      title: "Conference Abstract Booklet 2024",
      type: "pdf",
      category: "abstracts",
      size: "2.5 MB",
      downloads: 1234,
      uploadDate: "2024-06-10",
      description: "Complete collection of all conference abstracts and research papers",
      featured: true,
      downloadUrl: "#",
    },
    {
      id: 2,
      title: "AI in Healthcare Workshop Materials",
      type: "zip",
      category: "workshops",
      size: "15.3 MB",
      downloads: 856,
      uploadDate: "2024-06-14",
      description: "Comprehensive workshop package including slides, code samples, and datasets",
      featured: true,
      downloadUrl: "#",
    },
    {
      id: 3,
      title: "Opening Keynote: The Future of AI",
      type: "video",
      category: "videos",
      size: "245 MB",
      downloads: 2341,
      uploadDate: "2024-06-15",
      description: "Dr. Jane Smith's inspiring keynote presentation on AI's future impact",
      featured: true,
      downloadUrl: "#",
    },
    {
      id: 4,
      title: "Python for Research Tutorial",
      type: "zip",
      category: "workshops",
      size: "8.7 MB",
      downloads: 567,
      uploadDate: "2024-06-15",
      description: "Hands-on tutorial with Jupyter notebooks and practical examples",
      featured: false,
      downloadUrl: "#",
    },
    {
      id: 5,
      title: "Machine Learning Panel Discussion",
      type: "video",
      category: "videos",
      size: "180 MB",
      downloads: 1456,
      uploadDate: "2024-06-15",
      description: "Expert panel discussing current trends and future directions in ML",
      featured: false,
      downloadUrl: "#",
    },
    {
      id: 6,
      title: "Conference Program Guide",
      type: "pdf",
      category: "general",
      size: "1.2 MB",
      downloads: 3421,
      uploadDate: "2024-06-01",
      description: "Complete program guide with schedules, venue maps, and speaker information",
      featured: false,
      downloadUrl: "#",
    },
    {
      id: 7,
      title: "Data Science Workshop Code Repository",
      type: "zip",
      category: "workshops",
      size: "12.4 MB",
      downloads: 432,
      uploadDate: "2024-06-16",
      description: "Complete code repository with examples and exercises from the data science track",
      featured: false,
      downloadUrl: "#",
    },
    {
      id: 8,
      title: "Ethics in AI Panel Recording",
      type: "video",
      category: "videos",
      size: "156 MB",
      downloads: 789,
      uploadDate: "2024-06-16",
      description: "Important discussion on ethical considerations in AI development and deployment",
      featured: false,
      downloadUrl: "#",
    },
  ]

  const categories = [
    { id: "all", label: "All Resources", count: resources.length },
    { id: "abstracts", label: "Abstract Booklets", count: resources.filter((r) => r.category === "abstracts").length },
    { id: "workshops", label: "Workshop Materials", count: resources.filter((r) => r.category === "workshops").length },
    { id: "videos", label: "Video Recordings", count: resources.filter((r) => r.category === "videos").length },
    { id: "general", label: "General Resources", count: resources.filter((r) => r.category === "general").length },
  ]

  const filteredResources = resources
    .filter((resource) => activeCategory === "all" || resource.category === activeCategory)
    .filter(
      (resource) =>
        resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        resource.description.toLowerCase().includes(searchTerm.toLowerCase()),
    )
    .sort((a, b) => {
      switch (sortBy) {
        case "newest":
          return new Date(b.uploadDate) - new Date(a.uploadDate)
        case "popular":
          return b.downloads - a.downloads
        case "size":
          return Number.parseFloat(b.size) - Number.parseFloat(a.size)
        case "name":
          return a.title.localeCompare(b.title)
        default:
          return 0
      }
    })

  const featuredResources = resources.filter((r) => r.featured)

  const getFileIcon = (type) => {
    const icons = {
      pdf: <FileText className="w-8 h-8 text-red-500" />,
      zip: <Archive className="w-8 h-8 text-blue-500" />,
      video: <Video className="w-8 h-8 text-purple-500" />,
      doc: <FileText className="w-8 h-8 text-green-500" />,
    }
    return icons[type] || <FileText className="w-8 h-8 text-gray-500" />
  }

  const getFileTypeColor = (type) => {
    const colors = {
      pdf: "bg-red-100 text-red-800 border-red-200",
      zip: "bg-blue-100 text-blue-800 border-blue-200",
      video: "bg-purple-100 text-purple-800 border-purple-200",
      doc: "bg-green-100 text-green-800 border-green-200",
    }
    return colors[type] || "bg-gray-100 text-gray-800 border-gray-200"
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Resources & Downloads</h1>
        <p className="text-gray-600 mt-2">Access conference materials, workshop resources, and video recordings</p>
      </div>

      {/* Featured Resources */}
      <Card>
        <div className="p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Featured Resources</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {featuredResources.map((resource) => (
              <div
                key={resource.id}
                className="bg-gradient-to-br from-blue-50 to-indigo-50 p-4 rounded-lg border border-blue-100"
              >
                <div className="flex items-center justify-between mb-3">
                  {getFileIcon(resource.type)}
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium border ${getFileTypeColor(resource.type)}`}
                  >
                    {resource.type.toUpperCase()}
                  </span>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">{resource.title}</h3>
                <p className="text-sm text-gray-600 mb-3 line-clamp-2">{resource.description}</p>
                <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
                  <span>{resource.size}</span>
                  <span>{resource.downloads} downloads</span>
                </div>
                <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium">
                  {resource.type === "video" ? "Watch" : "Download"}
                </button>
              </div>
            ))}
          </div>
        </div>
      </Card>

      {/* Search and Filter */}
      <Card>
        <div className="p-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0 sm:space-x-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search resources..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-2">
                <Filter className="w-4 h-4 text-gray-400" />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="newest">Newest First</option>
                  <option value="popular">Most Downloaded</option>
                  <option value="size">Largest First</option>
                  <option value="name">Alphabetical</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Category Filter */}
      <Card>
        <div className="p-6">
          <div className="flex flex-wrap gap-3">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  activeCategory === category.id
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {category.label} ({category.count})
              </button>
            ))}
          </div>
        </div>
      </Card>

      {/* Resources Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredResources.map((resource) => (
          <Card key={resource.id} className="hover:shadow-lg transition-shadow">
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                {getFileIcon(resource.type)}
                <span
                  className={`px-2 py-1 rounded-full text-xs font-medium border ${getFileTypeColor(resource.type)}`}
                >
                  {resource.type.toUpperCase()}
                </span>
              </div>

              <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">{resource.title}</h3>
              <p className="text-gray-600 text-sm mb-4 line-clamp-3">{resource.description}</p>

              <div className="space-y-2 mb-4">
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <span>Size: {resource.size}</span>
                  <span>{resource.downloads} downloads</span>
                </div>
                <div className="text-sm text-gray-500">Uploaded: {formatDate(resource.uploadDate)}</div>
              </div>

              <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center justify-center space-x-2">
                {resource.type === "video" ? (
                  <>
                    <Play className="w-4 h-4" />
                    <span>Watch</span>
                  </>
                ) : (
                  <>
                    <Download className="w-4 h-4" />
                    <span>Download</span>
                  </>
                )}
              </button>
            </div>
          </Card>
        ))}
      </div>

      {filteredResources.length === 0 && (
        <Card>
          <div className="p-12 text-center">
            <div className="text-gray-400 text-6xl mb-4">📁</div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No resources found</h3>
            <p className="text-gray-600">Try adjusting your search terms or category filter</p>
          </div>
        </Card>
      )}

      {/* Download Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <div className="p-6 text-center">
            <div className="text-2xl font-bold text-blue-600 mb-1">{resources.length}</div>
            <div className="text-sm text-gray-600">Total Resources</div>
          </div>
        </Card>
        <Card>
          <div className="p-6 text-center">
            <div className="text-2xl font-bold text-green-600 mb-1">
              {resources.reduce((sum, r) => sum + r.downloads, 0).toLocaleString()}
            </div>
            <div className="text-sm text-gray-600">Total Downloads</div>
          </div>
        </Card>
        <Card>
          <div className="p-6 text-center">
            <div className="text-2xl font-bold text-purple-600 mb-1">
              {resources.filter((r) => r.type === "video").length}
            </div>
            <div className="text-sm text-gray-600">Video Recordings</div>
          </div>
        </Card>
        <Card>
          <div className="p-6 text-center">
            <div className="text-2xl font-bold text-orange-600 mb-1">
              {resources.filter((r) => r.category === "workshops").length}
            </div>
            <div className="text-sm text-gray-600">Workshop Materials</div>
          </div>
        </Card>
      </div>
    </div>
  )
}

export default ResourcesPage
