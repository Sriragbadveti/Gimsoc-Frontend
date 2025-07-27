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
      name: "Dr. Abhishek Ray",
      title: "Gastroenterologist",
      affiliation: "UK",
      category: "keynote",
      bio: "Dr. Abhishek Ray is a distinguished gastroenterologist based in the UK with extensive experience in digestive health and gastrointestinal disorders. His expertise spans from diagnostic procedures to advanced therapeutic interventions in gastroenterology.",
      sessions: [
        { title: "Advances in Gastroenterology", time: "Day 1, 10:00", location: "Main Auditorium" },
        { title: "Gastrointestinal Case Studies", time: "Day 2, 14:00", location: "Conference Room A" },
      ],
      image: "/Abhishek.jpeg",
      expertise: ["Gastroenterology", "Endoscopy", "Digestive Health", "Gastrointestinal Disorders"],
      achievements: ["Fellowship in Gastroenterology", "UK Medical Council Certified", "Published Research in Digestive Health"],
      social: {
        website: "",
        twitter: "",
        linkedin: "",
      },
    },
    {
      id: 2,
      name: "Chisomo (Mark) Kanthanga",
      title: "Microbiologist",
      affiliation: "Malawi Liverpool Wellcome Research Programme",
      category: "research",
      bio: "Chisomo Kanthanga is a dedicated microbiologist working with the Malawi Liverpool Wellcome Research Programme. His research focuses on infectious diseases and public health, contributing significantly to understanding disease transmission and prevention strategies.",
      sessions: [
        { title: "Microbiology Research Insights", time: "Day 1, 11:30", location: "Research Hall" },
        { title: "Public Health Microbiology", time: "Day 2, 09:00", location: "Conference Room B" },
      ],
      image: "/Chisomo.jpeg",
      expertise: ["Microbiology", "Infectious Diseases", "Public Health", "Research Methodology"],
      achievements: ["Wellcome Trust Research Fellow", "Published in International Journals", "Public Health Excellence Award"],
      social: {
        website: "",
        twitter: "",
        linkedin: "",
      },
    },
    {
      id: 3,
      name: "Annam Jan",
      title: "Histology",
      affiliation: "University of Georgia",
      category: "academic",
      bio: "Annam Jan specializes in histology and cellular biology at the University of Georgia. Her work involves studying tissue structures and cellular organization, providing crucial insights into disease pathology and tissue engineering.",
      sessions: [
        { title: "Histological Analysis Techniques", time: "Day 1, 15:00", location: "Laboratory Hall" },
        { title: "Cellular Biology Workshop", time: "Day 3, 10:00", location: "Workshop Room" },
      ],
      image: "/Anaam.jpg",
      expertise: ["Histology", "Cellular Biology", "Tissue Analysis", "Pathology"],
      achievements: ["University of Georgia Faculty", "Histology Research Grant", "Teaching Excellence Award"],
      social: {
        website: "",
        twitter: "",
        linkedin: "",
      },
    },
    {
      id: 4,
      name: "Salome Tasaria",
      title: "Epidemiologist and Dean of UG",
      affiliation: "University of Georgia",
      category: "leadership",
      bio: "Salome Tasaria serves as both an epidemiologist and Dean at the University of Georgia. Her leadership combines academic excellence with epidemiological research, focusing on disease patterns and public health interventions.",
      sessions: [
        { title: "Epidemiology Keynote", time: "Day 1, 09:00", location: "Main Auditorium" },
        { title: "Academic Leadership Panel", time: "Day 2, 16:00", location: "Leadership Forum" },
      ],
      image: "/flat.webp",
      expertise: ["Epidemiology", "Public Health", "Academic Leadership", "Disease Prevention"],
      achievements: ["Dean of University of Georgia", "Epidemiology Research Award", "Leadership Excellence Recognition"],
      social: {
        website: "",
        twitter: "",
        linkedin: "",
      },
    },
    {
      id: 5,
      name: "Dr. Tahseen J. Siddiqui",
      title: "Board Certified in Internal Medicine & Infectious Diseases",
      affiliation: "IMG Unity",
      category: "clinical",
      bio: "Dr. Tahseen Siddiqui is board certified in both Internal Medicine and Infectious Diseases. His clinical expertise spans from general internal medicine to specialized infectious disease treatment, with a focus on evidence-based patient care.",
      sessions: [
        { title: "Infectious Diseases Update", time: "Day 2, 11:00", location: "Clinical Hall" },
        { title: "Internal Medicine Cases", time: "Day 3, 14:00", location: "Case Study Room" },
      ],
      image: "/Tahseen.png",
      expertise: ["Internal Medicine", "Infectious Diseases", "Clinical Practice", "Patient Care"],
      achievements: ["Board Certified Internal Medicine", "Board Certified Infectious Diseases", "IMG Unity Recognition"],
      social: {
        website: "",
        twitter: "",
        linkedin: "",
      },
    },
    {
      id: 6,
      name: "Dr. Giorgi Derevenskikh",
      title: "Pulmonology, Internal Medicine, USA Fellowship",
      affiliation: "-",
      category: "fellowship",
      bio: "Dr. Giorgi Derevenskikh specializes in pulmonology and internal medicine, with extensive fellowship training in the USA. His expertise includes respiratory disorders, pulmonary function testing, and advanced respiratory care.",
      sessions: [
        { title: "Pulmonology Advances", time: "Day 2, 13:00", location: "Pulmonary Hall" },
        { title: "Respiratory Care Workshop", time: "Day 3, 11:00", location: "Workshop Room" },
      ],
      image: "/Giorgi.png",
      expertise: ["Pulmonology", "Internal Medicine", "Respiratory Care", "Pulmonary Function"],
      achievements: ["USA Fellowship Trained", "Pulmonology Certification", "Clinical Excellence Award"],
      social: {
        website: "",
        twitter: "",
        linkedin: "",
      },
    },
    {
      id: 7,
      name: "Dr. Otar Chokoshvili",
      title: "-",
      affiliation: "Geomedi",
      category: "institutional",
      bio: "Dr. Otar Chokoshvili represents Geomedi University, contributing to medical education and research. His work focuses on advancing medical knowledge and training the next generation of healthcare professionals.",
      sessions: [
        { title: "Medical Education Innovation", time: "Day 1, 16:00", location: "Education Hall" },
        { title: "Geomedi University Presentation", time: "Day 2, 15:00", location: "Institutional Forum" },
      ],
      image: "/flat.webp",
      expertise: ["Medical Education", "Institutional Development", "Academic Research", "Healthcare Training"],
      achievements: ["Geomedi University Faculty", "Medical Education Excellence", "Institutional Leadership"],
      social: {
        website: "",
        twitter: "",
        linkedin: "",
      },
    },
    {
      id: 8,
      name: "Dr. Ketevan Papaliashvili MD, MSc",
      title: "MD Program Head Assistant, Lecturer",
      affiliation: "Georgian-American University",
      category: "academic",
      bio: "Dr. Ketevan Papaliashvili serves as MD Program Head Assistant and Lecturer at Georgian-American University. Her academic focus includes medical education, curriculum development, and mentoring future physicians.",
      sessions: [
        { title: "Medical Education Trends", time: "Day 2, 10:00", location: "Education Hall" },
        { title: "Curriculum Development Workshop", time: "Day 3, 13:00", location: "Workshop Room" },
      ],
      image: "/Ketevan.png",
      expertise: ["Medical Education", "Curriculum Development", "Academic Leadership", "Student Mentoring"],
      achievements: ["MD Program Head Assistant", "MSc in Medical Education", "Teaching Excellence Award"],
      social: {
        website: "",
        twitter: "",
        linkedin: "",
      },
    },
    {
      id: 9,
      name: "Dr. Nana Chkhikvadze MD",
      title: "Allergiologist, Immunologist",
      affiliation: "Center of Allergy and Immunology, Tbilisi",
      category: "specialist",
      bio: "Dr. Nana Chkhikvadze is a specialized allergiologist and immunologist at the Center of Allergy and Immunology in Tbilisi. Her expertise includes allergy diagnosis, immunotherapy, and immunological disorders.",
      sessions: [
        { title: "Allergy and Immunology Update", time: "Day 1, 14:00", location: "Specialist Hall" },
        { title: "Immunotherapy Advances", time: "Day 3, 09:00", location: "Clinical Workshop" },
      ],
      image: "/Nana.jpg",
      expertise: ["Allergiology", "Immunology", "Allergy Diagnosis", "Immunotherapy"],
      achievements: ["Specialist in Allergiology", "Immunology Certification", "Clinical Excellence Award"],
      social: {
        website: "",
        twitter: "",
        linkedin: "",
      },
    },
    {
      id: 10,
      name: "Dr. Nayab Mustafa MD",
      title: "Family Medicine Resident",
      affiliation: "Mohammed Bin Rashid University of Medicine and Health Sciences (MBRU) and Dubai Health",
      category: "residency",
      bio: "Dr. Nayab Mustafa is a Family Medicine Resident at MBRU and Dubai Health. Her training focuses on comprehensive family care, preventive medicine, and community health promotion.",
      sessions: [
        { title: "Family Medicine Perspectives", time: "Day 2, 12:00", location: "Family Medicine Hall" },
        { title: "Preventive Care Workshop", time: "Day 3, 15:00", location: "Community Health Room" },
      ],
      image: "/unnamed.png",
      expertise: ["Family Medicine", "Preventive Care", "Community Health", "Primary Care"],
      achievements: ["MBRU Residency Program", "Dubai Health Recognition", "Family Medicine Excellence"],
      social: {
        website: "",
        twitter: "",
        linkedin: "",
      },
    },
    {
      id: 11,
      name: "Dr. Aby Joseph",
      title: "Academician | Forensic Science Consultant | CSI & Forensic Facility Designer | Forensic Technical Assessor | Molecular Biologist (Forensic DNA) | PhD Candidate (Forensic QMS)",
      affiliation: "",
      category: "forensic",
      bio: "Dr. Aby Joseph is a multi-faceted forensic science expert with expertise in CSI, forensic facility design, and molecular biology. As a PhD candidate in Forensic QMS, she combines academic rigor with practical forensic applications.",
      sessions: [
        { title: "Forensic Science Innovation", time: "Day 1, 13:00", location: "Forensic Hall" },
        { title: "DNA Analysis Workshop", time: "Day 2, 16:00", location: "Laboratory Workshop" },
      ],
      image: "/Aby.png",
      expertise: ["Forensic Science", "CSI", "Molecular Biology", "Forensic DNA", "Quality Management"],
      achievements: ["Forensic Science Consultant", "CSI Facility Designer", "PhD Candidate", "Technical Assessor"],
      social: {
        website: "",
        twitter: "",
        linkedin: "",
      },
    },
  ]

  const categories = [
    { id: "all", label: "All Speakers", count: speakers.length },
    { id: "keynote", label: "Keynote Speakers", count: speakers.filter((s) => s.category === "keynote").length },
    { id: "research", label: "Research Experts", count: speakers.filter((s) => s.category === "research").length },
    { id: "academic", label: "Academic Leaders", count: speakers.filter((s) => s.category === "academic").length },
    { id: "clinical", label: "Clinical Specialists", count: speakers.filter((s) => s.category === "clinical").length },
    { id: "specialist", label: "Medical Specialists", count: speakers.filter((s) => s.category === "specialist").length },
    { id: "forensic", label: "Forensic Experts", count: speakers.filter((s) => s.category === "forensic").length },
  ]

  const filteredSpeakers =
    filterCategory === "all" ? speakers : speakers.filter((speaker) => speaker.category === filterCategory)

  const getCategoryColor = (category) => {
    const colors = {
      keynote: "bg-blue-100 text-blue-800",
      research: "bg-green-100 text-green-800",
      academic: "bg-purple-100 text-purple-800",
      clinical: "bg-red-100 text-red-800",
      specialist: "bg-indigo-100 text-indigo-800",
      forensic: "bg-orange-100 text-orange-800",
      leadership: "bg-yellow-100 text-yellow-800",
      fellowship: "bg-teal-100 text-teal-800",
      institutional: "bg-pink-100 text-pink-800",
      residency: "bg-cyan-100 text-cyan-800",
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
                    className="w-80 h-80 rounded-xl mx-auto mb-6 object-cover shadow-lg"
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
                    className="w-40 h-40 rounded-full mx-auto mb-4 object-cover shadow-md"
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
