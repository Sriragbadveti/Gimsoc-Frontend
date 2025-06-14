"use client"

import { useState } from "react"
import { MapPin, Calendar, Users, ExternalLink, Star, Award } from "lucide-react"
import Card from "./Card"

const SpeakersPage = () => {
  const [selectedSpeaker, setSelectedSpeaker] = useState(null)
  const [filterCategory, setFilterCategory] = useState("all")

  const speakers = [
    {
      id: 1,
      name: "Dr. Jane Smith",
      title: "Chief AI Researcher",
      affiliation: "MIT Computer Science Lab",
      category: "keynote",
      bio: "Dr. Jane Smith is a world-renowned expert in artificial intelligence with over 20 years of experience. She has published more than 150 peer-reviewed papers and holds 25 patents in machine learning and neural networks. Her groundbreaking work in deep learning has revolutionized the field of computer vision.",
      sessions: [
        { title: "Opening Keynote: The Future of AI", time: "June 15, 09:00", location: "Grand Auditorium" },
        { title: "AI Ethics Panel Discussion", time: "June 16, 14:00", location: "Conference Room A" },
      ],
      image: "/placeholder.svg?height=300&width=300",
      expertise: ["Machine Learning", "Neural Networks", "Computer Vision", "AI Ethics"],
      achievements: ["IEEE Fellow", "ACM Distinguished Scientist", "Best Paper Award 2023"],
      social: {
        website: "https://janesmith.ai",
        twitter: "@drjanesmith",
        linkedin: "jane-smith-ai",
      },
    },
    {
      id: 2,
      name: "Prof. John Doe",
      title: "Professor of Biomedical Engineering",
      affiliation: "Stanford University",
      category: "workshop",
      bio: "Professor John Doe is a leading researcher in healthcare AI applications. His interdisciplinary work combines computer science with medical expertise to develop AI systems that assist in diagnosis and treatment planning. He has collaborated with major hospitals worldwide.",
      sessions: [
        { title: "AI in Healthcare Workshop", time: "June 15, 11:00", location: "Conference Room A" },
        { title: "Medical AI Case Studies", time: "June 16, 10:00", location: "Medical Track Room" },
      ],
      image: "/placeholder.svg?height=300&width=300",
      expertise: ["Healthcare AI", "Medical Imaging", "Diagnostic Systems", "Clinical AI"],
      achievements: ["NIH Research Award", "Medical AI Pioneer Award", "Top 40 Under 40 in Healthcare"],
      social: {
        website: "https://johndoe.stanford.edu",
        twitter: "@profjohndoe",
        linkedin: "john-doe-stanford",
      },
    },
    {
      id: 3,
      name: "Dr. Alice Brown",
      title: "Director of Data Science",
      affiliation: "Google Research",
      category: "industry",
      bio: "Dr. Alice Brown leads Google's data science initiatives and has been instrumental in developing large-scale machine learning systems. Her work focuses on making AI more accessible and practical for real-world applications across various industries.",
      sessions: [
        { title: "Data Science Trends Keynote", time: "June 16, 09:00", location: "Grand Auditorium" },
        { title: "Industry Applications Panel", time: "June 17, 13:30", location: "Industry Track Room" },
      ],
      image: "/placeholder.svg?height=300&width=300",
      expertise: ["Big Data", "Data Mining", "Distributed Systems", "Industry AI"],
      achievements: ["Google Research Award", "Data Science Leadership Award", "Forbes 30 Under 30"],
      social: {
        website: "https://alicebrown.research.google.com",
        twitter: "@dralicebrown",
        linkedin: "alice-brown-google",
      },
    },
    {
      id: 4,
      name: "Dr. David Lee",
      title: "Technology Futurist & Entrepreneur",
      affiliation: "Tech Innovations Inc.",
      category: "startup",
      bio: "Dr. David Lee is a serial entrepreneur and technology futurist who has founded three successful AI startups. He specializes in identifying emerging technology trends and translating research into practical business applications.",
      sessions: [
        { title: "Future of Technology Keynote", time: "June 17, 09:00", location: "Grand Auditorium" },
        { title: "Startup Pitch Competition", time: "June 17, 10:30", location: "Innovation Hub" },
      ],
      image: "/placeholder.svg?height=300&width=300",
      expertise: ["Technology Trends", "Innovation Strategy", "Startup Development", "Digital Transformation"],
      achievements: ["Entrepreneur of the Year", "Innovation Excellence Award", "TED Speaker"],
      social: {
        website: "https://davidlee.tech",
        twitter: "@drdavidlee",
        linkedin: "david-lee-tech",
      },
    },
  ]

  const categories = [
    { id: "all", label: "All Speakers", count: speakers.length },
    { id: "keynote", label: "Keynote Speakers", count: speakers.filter((s) => s.category === "keynote").length },
    { id: "workshop", label: "Workshop Leaders", count: speakers.filter((s) => s.category === "workshop").length },
    { id: "industry", label: "Industry Experts", count: speakers.filter((s) => s.category === "industry").length },
    { id: "startup", label: "Entrepreneurs", count: speakers.filter((s) => s.category === "startup").length },
  ]

  const filteredSpeakers =
    filterCategory === "all" ? speakers : speakers.filter((speaker) => speaker.category === filterCategory)

  const getCategoryColor = (category) => {
    const colors = {
      keynote: "bg-blue-100 text-blue-800",
      workshop: "bg-green-100 text-green-800",
      industry: "bg-purple-100 text-purple-800",
      startup: "bg-orange-100 text-orange-800",
    }
    return colors[category] || "bg-gray-100 text-gray-800"
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Conference Speakers</h1>
          <p className="text-gray-600 mt-2">Meet our distinguished speakers and learn about their expertise</p>
        </div>
      </div>

      {/* Category Filter */}
      <Card>
        <div className="p-6">
          <div className="flex flex-wrap gap-3">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setFilterCategory(category.id)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  filterCategory === category.id
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

      {selectedSpeaker ? (
        // Speaker Detail View
        <Card>
          <div className="p-8">
            <button
              onClick={() => setSelectedSpeaker(null)}
              className="mb-6 flex items-center text-blue-600 hover:text-blue-800 font-medium"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Speakers
            </button>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-1">
                <div className="text-center">
                  <img
                    src={selectedSpeaker.image || "/placeholder.svg"}
                    alt={selectedSpeaker.name}
                    className="w-64 h-64 rounded-xl mx-auto mb-6 object-cover shadow-lg"
                  />
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">{selectedSpeaker.name}</h2>
                  <p className="text-lg text-gray-600 mb-1">{selectedSpeaker.title}</p>
                  <p className="text-gray-500 mb-4">{selectedSpeaker.affiliation}</p>
                  <span
                    className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getCategoryColor(selectedSpeaker.category)}`}
                  >
                    {selectedSpeaker.category.charAt(0).toUpperCase() + selectedSpeaker.category.slice(1)} Speaker
                  </span>
                </div>

                {/* Social Links */}
                <div className="mt-6 flex justify-center space-x-4">
                  {selectedSpeaker.social.website && (
                    <a href={selectedSpeaker.social.website} className="text-gray-400 hover:text-blue-600">
                      <ExternalLink className="w-5 h-5" />
                    </a>
                  )}
                </div>

                {/* Achievements */}
                <div className="mt-8">
                  <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                    <Award className="w-5 h-5 mr-2" />
                    Achievements
                  </h4>
                  <div className="space-y-2">
                    {selectedSpeaker.achievements.map((achievement, index) => (
                      <div key={index} className="flex items-center text-sm text-gray-600">
                        <Star className="w-4 h-4 mr-2 text-yellow-500" />
                        {achievement}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="lg:col-span-2">
                <div className="space-y-8">
                  {/* Biography */}
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">Biography</h3>
                    <p className="text-gray-700 leading-relaxed">{selectedSpeaker.bio}</p>
                  </div>

                  {/* Expertise */}
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">Areas of Expertise</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedSpeaker.expertise.map((skill, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Sessions */}
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">Conference Sessions</h3>
                    <div className="space-y-4">
                      {selectedSpeaker.sessions.map((session, index) => (
                        <div
                          key={index}
                          className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-lg border border-blue-100"
                        >
                          <h4 className="font-semibold text-blue-900 mb-2">{session.title}</h4>
                          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
                            <div className="flex items-center">
                              <Calendar className="w-4 h-4 mr-1" />
                              {session.time}
                            </div>
                            <div className="flex items-center">
                              <MapPin className="w-4 h-4 mr-1" />
                              {session.location}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Card>
      ) : (
        // Speakers Grid View
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSpeakers.map((speaker) => (
            <Card key={speaker.id} className="hover:shadow-lg transition-shadow cursor-pointer">
              <div className="p-6" onClick={() => setSelectedSpeaker(speaker)}>
                <div className="text-center mb-6">
                  <img
                    src={speaker.image || "/placeholder.svg"}
                    alt={speaker.name}
                    className="w-32 h-32 rounded-full mx-auto mb-4 object-cover shadow-md"
                  />
                  <h3 className="text-xl font-semibold text-gray-900 mb-1">{speaker.name}</h3>
                  <p className="text-gray-600 text-sm mb-1">{speaker.title}</p>
                  <p className="text-gray-500 text-sm mb-3">{speaker.affiliation}</p>
                  <span
                    className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(speaker.category)}`}
                  >
                    {speaker.category.charAt(0).toUpperCase() + speaker.category.slice(1)}
                  </span>
                </div>

                <div className="mb-4">
                  <p className="text-gray-700 text-sm line-clamp-3">{speaker.bio}</p>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center text-gray-500">
                    <Users className="w-4 h-4 mr-1" />
                    {speaker.sessions.length} session{speaker.sessions.length > 1 ? "s" : ""}
                  </div>
                  <span className="text-blue-600 font-medium hover:text-blue-800">View Details →</span>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}

export default SpeakersPage
