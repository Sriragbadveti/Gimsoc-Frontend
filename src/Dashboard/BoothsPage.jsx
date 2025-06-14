"use client"

import { useState } from "react"
import { Video, Mail, ExternalLink, Download, Users, Award, MapPin } from "lucide-react"
import Card from "./Card"

const BoothsPage = () => {
  const [activeTab, setActiveTab] = useState("sponsors")
  const [selectedBooth, setSelectedBooth] = useState(null)
  const [filterTier, setFilterTier] = useState("all")

  const sponsors = [
    {
      id: 1,
      name: "TechCorp Solutions",
      logo: "/placeholder.svg?height=120&width=240",
      tier: "platinum",
      description:
        "Leading provider of AI and machine learning solutions for enterprise applications. Specializing in healthcare AI, financial technology, and autonomous systems.",
      category: "Technology Partner",
      resources: [
        { name: "AI Platform Demo", type: "demo", size: "Interactive" },
        { name: "Enterprise AI White Paper", type: "pdf", size: "2.1 MB" },
        { name: "Case Studies Collection", type: "pdf", size: "5.3 MB" },
        { name: "Free Trial Access", type: "access", size: "30 days" },
      ],
      contact: {
        email: "booth@techcorp.com",
        website: "https://techcorp.ai",
        representative: "Sarah Chen, VP of Solutions",
      },
      videoChatAvailable: true,
      boothLocation: "Exhibition Hall - Booth A1",
      specialOffers: ["30% discount on enterprise licenses", "Free consultation session"],
      achievements: ["Best AI Innovation Award 2024", "Fortune 500 Partner"],
    },
    {
      id: 2,
      name: "DataScience Pro",
      logo: "/placeholder.svg?height=120&width=240",
      tier: "gold",
      description:
        "Advanced analytics and data visualization platform trusted by researchers and data scientists worldwide. Offering cutting-edge tools for machine learning and statistical analysis.",
      category: "Analytics Platform",
      resources: [
        { name: "Platform Free Trial", type: "access", size: "14 days" },
        { name: "Getting Started Guide", type: "pdf", size: "1.8 MB" },
        { name: "Video Tutorials", type: "video", size: "2.1 GB" },
        { name: "API Documentation", type: "pdf", size: "3.2 MB" },
      ],
      contact: {
        email: "info@datasciencepro.com",
        website: "https://datasciencepro.com",
        representative: "Michael Rodriguez, Product Manager",
      },
      videoChatAvailable: true,
      boothLocation: "Exhibition Hall - Booth B3",
      specialOffers: ["50% student discount", "Free premium features for 6 months"],
      achievements: ["Top Analytics Tool 2024", "Editor's Choice Award"],
    },
    {
      id: 3,
      name: "AI Innovations Inc",
      logo: "/placeholder.svg?height=120&width=240",
      tier: "silver",
      description:
        "Cutting-edge artificial intelligence research and development company focused on breakthrough technologies in computer vision and natural language processing.",
      category: "Research & Development",
      resources: [
        { name: "Research Papers Collection", type: "pdf", size: "12.4 MB" },
        { name: "Open Source Tools", type: "code", size: "GitHub" },
        { name: "Technical Documentation", type: "pdf", size: "4.7 MB" },
      ],
      contact: {
        email: "contact@aiinnovations.com",
        website: "https://aiinnovations.com",
        representative: "Dr. Emily Watson, CTO",
      },
      videoChatAvailable: false,
      boothLocation: "Exhibition Hall - Booth C2",
      specialOffers: ["Open source license", "Research collaboration opportunities"],
      achievements: ["Innovation Excellence Award", "Top 10 AI Startups 2024"],
    },
  ]

  const academicBooths = [
    {
      id: 1,
      name: "MIT Computer Science Lab",
      logo: "/placeholder.svg?height=120&width=240",
      tier: "premier",
      description:
        "World-renowned research institution leading breakthrough discoveries in artificial intelligence, machine learning, and computational sciences.",
      category: "Research Institution",
      resources: [
        { name: "Latest Research Publications", type: "pdf", size: "18.2 MB" },
        { name: "PhD Program Information", type: "pdf", size: "3.1 MB" },
        { name: "Lab Tour Virtual Reality", type: "vr", size: "Interactive" },
        { name: "Collaboration Opportunities", type: "pdf", size: "2.4 MB" },
      ],
      contact: {
        email: "cslab@mit.edu",
        website: "https://csail.mit.edu",
        representative: "Prof. David Kim, Lab Director",
      },
      videoChatAvailable: true,
      boothLocation: "Academic Pavilion - Booth A1",
      specialOffers: ["Research internship opportunities", "Graduate program scholarships"],
      achievements: ["#1 CS Research Institution", "Nobel Prize Recipients"],
    },
    {
      id: 2,
      name: "Stanford AI Research",
      logo: "/placeholder.svg?height=120&width=240",
      tier: "premier",
      description:
        "Pioneering research in neural networks, deep learning, and human-centered AI. Home to groundbreaking discoveries that shape the future of artificial intelligence.",
      category: "Academic Partner",
      resources: [
        { name: "HAI Research Publications", type: "pdf", size: "15.7 MB" },
        { name: "Open Datasets Collection", type: "data", size: "2.3 TB" },
        { name: "Educational Resources", type: "pdf", size: "8.9 MB" },
        { name: "Online Course Access", type: "access", size: "6 months" },
      ],
      contact: {
        email: "ai-research@stanford.edu",
        website: "https://hai.stanford.edu",
        representative: "Dr. Lisa Zhang, Research Director",
      },
      videoChatAvailable: true,
      boothLocation: "Academic Pavilion - Booth A2",
      specialOffers: ["Free online course access", "Research collaboration grants"],
      achievements: ["Leading AI Ethics Research", "Top University Rankings"],
    },
    {
      id: 3,
      name: "Carnegie Mellon Robotics",
      logo: "/placeholder.svg?height=120&width=240",
      tier: "standard",
      description:
        "Advanced robotics and autonomous systems research center developing next-generation robotic technologies for healthcare, manufacturing, and space exploration.",
      category: "Research Center",
      resources: [
        { name: "Robotics Demo Videos", type: "video", size: "1.8 GB" },
        { name: "Technical Papers Archive", type: "pdf", size: "22.1 MB" },
        { name: "Virtual Lab Tours", type: "video", size: "890 MB" },
        { name: "Industry Partnership Info", type: "pdf", size: "1.9 MB" },
      ],
      contact: {
        email: "robotics@cmu.edu",
        website: "https://ri.cmu.edu",
        representative: "Prof. Robert Chen, Institute Director",
      },
      videoChatAvailable: false,
      boothLocation: "Academic Pavilion - Booth B1",
      specialOffers: ["Industry partnership programs", "Student exchange opportunities"],
      achievements: ["Robotics Innovation Leader", "NASA Partnership"],
    },
  ]

  const currentBooths = activeTab === "sponsors" ? sponsors : academicBooths

  const filteredBooths =
    filterTier === "all" ? currentBooths : currentBooths.filter((booth) => booth.tier === filterTier)

  const getTierConfig = (tier) => {
    const configs = {
      platinum: { color: "bg-purple-100 text-purple-800 border-purple-200", label: "Platinum Sponsor" },
      gold: { color: "bg-yellow-100 text-yellow-800 border-yellow-200", label: "Gold Sponsor" },
      silver: { color: "bg-gray-100 text-gray-600 border-gray-200", label: "Silver Sponsor" },
      premier: { color: "bg-blue-100 text-blue-800 border-blue-200", label: "Premier Institution" },
      standard: { color: "bg-green-100 text-green-800 border-green-200", label: "Academic Partner" },
    }
    return configs[tier] || configs.standard
  }

  const getResourceIcon = (type) => {
    const icons = {
      demo: "🎮",
      pdf: "📄",
      video: "🎥",
      access: "🔑",
      code: "💻",
      data: "📊",
      vr: "🥽",
    }
    return icons[type] || "📄"
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Exhibition Booths</h1>
        <p className="text-gray-600 mt-2">Explore sponsor booths and academic exhibitions with interactive resources</p>
      </div>

      {/* Tab Navigation */}
      <Card>
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            <button
              onClick={() => setActiveTab("sponsors")}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === "sponsors"
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              Sponsor Booths ({sponsors.length})
            </button>
            <button
              onClick={() => setActiveTab("academic")}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === "academic"
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              Academic Booths ({academicBooths.length})
            </button>
          </nav>
        </div>

        {/* Filter */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => setFilterTier("all")}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                filterTier === "all" ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              All Tiers
            </button>
            {activeTab === "sponsors" ? (
              <>
                <button
                  onClick={() => setFilterTier("platinum")}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    filterTier === "platinum"
                      ? "bg-purple-600 text-white"
                      : "bg-purple-100 text-purple-700 hover:bg-purple-200"
                  }`}
                >
                  Platinum
                </button>
                <button
                  onClick={() => setFilterTier("gold")}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    filterTier === "gold"
                      ? "bg-yellow-600 text-white"
                      : "bg-yellow-100 text-yellow-700 hover:bg-yellow-200"
                  }`}
                >
                  Gold
                </button>
                <button
                  onClick={() => setFilterTier("silver")}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    filterTier === "silver" ? "bg-gray-600 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  Silver
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => setFilterTier("premier")}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    filterTier === "premier" ? "bg-blue-600 text-white" : "bg-blue-100 text-blue-700 hover:bg-blue-200"
                  }`}
                >
                  Premier
                </button>
                <button
                  onClick={() => setFilterTier("standard")}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    filterTier === "standard"
                      ? "bg-green-600 text-white"
                      : "bg-green-100 text-green-700 hover:bg-green-200"
                  }`}
                >
                  Standard
                </button>
              </>
            )}
          </div>
        </div>
      </Card>

      {selectedBooth ? (
        // Booth Detail View
        <Card>
          <div className="p-8">
            <button
              onClick={() => setSelectedBooth(null)}
              className="mb-6 flex items-center text-blue-600 hover:text-blue-800 font-medium"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Booths
            </button>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <div className="space-y-8">
                  {/* Header */}
                  <div className="flex items-start space-x-6">
                    <img
                      src={selectedBooth.logo || "/placeholder.svg"}
                      alt={selectedBooth.name}
                      className="w-32 h-16 object-contain bg-white p-2 rounded-lg border border-gray-200"
                    />
                    <div className="flex-1">
                      <h2 className="text-3xl font-bold text-gray-900 mb-2">{selectedBooth.name}</h2>
                      <div className="flex items-center space-x-3 mb-3">
                        <span
                          className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${getTierConfig(selectedBooth.tier).color}`}
                        >
                          {getTierConfig(selectedBooth.tier).label}
                        </span>
                        <span className="text-gray-600">{selectedBooth.category}</span>
                      </div>
                      <div className="flex items-center text-gray-600 mb-4">
                        <MapPin className="w-4 h-4 mr-2" />
                        {selectedBooth.boothLocation}
                      </div>
                    </div>
                  </div>

                  {/* Description */}
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">About</h3>
                    <p className="text-gray-700 leading-relaxed">{selectedBooth.description}</p>
                  </div>

                  {/* Achievements */}
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                      <Award className="w-5 h-5 mr-2" />
                      Achievements & Recognition
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {selectedBooth.achievements.map((achievement, index) => (
                        <div
                          key={index}
                          className="flex items-center p-3 bg-yellow-50 rounded-lg border border-yellow-200"
                        >
                          <Award className="w-4 h-4 text-yellow-600 mr-2" />
                          <span className="text-yellow-800 text-sm font-medium">{achievement}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Resources */}
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">Available Resources</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {selectedBooth.resources.map((resource, index) => (
                        <div
                          key={index}
                          className="bg-gray-50 p-4 rounded-lg border border-gray-200 hover:shadow-md transition-shadow"
                        >
                          <div className="flex items-start space-x-3">
                            <span className="text-2xl">{getResourceIcon(resource.type)}</span>
                            <div className="flex-1">
                              <h4 className="font-medium text-gray-900 mb-1">{resource.name}</h4>
                              <p className="text-sm text-gray-600">{resource.size}</p>
                            </div>
                            <button className="text-blue-600 hover:text-blue-800">
                              <Download className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Special Offers */}
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">Special Conference Offers</h3>
                    <div className="space-y-3">
                      {selectedBooth.specialOffers.map((offer, index) => (
                        <div
                          key={index}
                          className="flex items-center p-4 bg-green-50 rounded-lg border border-green-200"
                        >
                          <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                          <span className="text-green-800 font-medium">{offer}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                <Card className="bg-gradient-to-br from-blue-50 to-indigo-50">
                  <div className="p-6">
                    <h4 className="text-lg font-semibold text-blue-900 mb-4">Contact Information</h4>
                    <div className="space-y-4">
                      <div>
                        <span className="text-sm font-medium text-blue-700">Representative:</span>
                        <p className="text-blue-900">{selectedBooth.contact.representative}</p>
                      </div>
                      <div>
                        <span className="text-sm font-medium text-blue-700">Email:</span>
                        <p className="text-blue-900">{selectedBooth.contact.email}</p>
                      </div>
                      <div>
                        <span className="text-sm font-medium text-blue-700">Website:</span>
                        <a
                          href={selectedBooth.contact.website}
                          className="text-blue-600 hover:text-blue-800 flex items-center"
                        >
                          Visit Website <ExternalLink className="w-3 h-3 ml-1" />
                        </a>
                      </div>
                    </div>
                  </div>
                </Card>

                <Card>
                  <div className="p-6">
                    <h4 className="text-lg font-semibold text-gray-900 mb-4">Actions</h4>
                    <div className="space-y-3">
                      <button className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium">
                        Download All Resources
                      </button>
                      {selectedBooth.videoChatAvailable ? (
                        <button className="w-full bg-green-600 text-white py-3 px-4 rounded-lg hover:bg-green-700 transition-colors font-medium flex items-center justify-center space-x-2">
                          <Video className="w-4 h-4" />
                          <span>Start Video Chat</span>
                        </button>
                      ) : (
                        <button
                          className="w-full bg-gray-300 text-gray-600 py-3 px-4 rounded-lg cursor-not-allowed font-medium"
                          disabled
                        >
                          Video Chat Unavailable
                        </button>
                      )}
                      <button className="w-full border border-gray-300 text-gray-700 py-3 px-4 rounded-lg hover:bg-gray-50 transition-colors font-medium flex items-center justify-center space-x-2">
                        <Mail className="w-4 h-4" />
                        <span>Send Message</span>
                      </button>
                    </div>
                  </div>
                </Card>

                <Card>
                  <div className="p-6">
                    <h4 className="text-lg font-semibold text-gray-900 mb-4">Booth Statistics</h4>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Visitors Today:</span>
                        <span className="font-semibold">127</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Resources Downloaded:</span>
                        <span className="font-semibold">89</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Video Chats:</span>
                        <span className="font-semibold">23</span>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </Card>
      ) : (
        // Booths Grid View
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBooths.map((booth) => {
            const tierConfig = getTierConfig(booth.tier)
            return (
              <Card key={booth.id} className="hover:shadow-lg transition-shadow cursor-pointer">
                <div className="p-6" onClick={() => setSelectedBooth(booth)}>
                  <div className="flex items-start justify-between mb-4">
                    <img
                      src={booth.logo || "/placeholder.svg"}
                      alt={booth.name}
                      className="h-12 w-24 object-contain bg-white p-1 rounded border border-gray-200"
                    />
                    <span className={`px-2 py-1 rounded-full text-xs font-medium border ${tierConfig.color}`}>
                      {tierConfig.label}
                    </span>
                  </div>

                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{booth.name}</h3>
                  <p className="text-sm text-gray-600 mb-1">{booth.category}</p>
                  <p className="text-gray-700 text-sm mb-4 line-clamp-3">{booth.description}</p>

                  <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                    <div className="flex items-center">
                      <Users className="w-4 h-4 mr-1" />
                      <span>{booth.resources.length} resources</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      {booth.videoChatAvailable && (
                        <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full flex items-center">
                          <Video className="w-3 h-3 mr-1" />
                          Video Chat
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-gray-500 text-sm">
                      <MapPin className="w-3 h-3 mr-1" />
                      <span>{booth.boothLocation.split(" - ")[1]}</span>
                    </div>
                    <span className="text-blue-600 font-medium hover:text-blue-800 text-sm">Visit Booth →</span>
                  </div>
                </div>
              </Card>
            )
          })}
        </div>
      )}
    </div>
  )
}

export default BoothsPage
