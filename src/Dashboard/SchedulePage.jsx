"use client"

import { useState } from "react"
import { Calendar, Clock, MapPin, Users } from "lucide-react"
import Card from "./Card"

const SchedulePage = () => {
  const [selectedDay, setSelectedDay] = useState(1)

  const scheduleData = {
    1: [
      {
        time: "09:00",
        title: "Registration",
        speaker: "",
        location: "Main Hall",
        type: "break",
        duration: "60 min",
        attendees: 500,
      },
      {
        time: "10:00",
        title: "Press Conference (Opening Ceremony)",
        speaker: "Dr. Nodar Vashakidze",
        location: "Grand Auditorium",
        type: "keynote",
        duration: "30 min",
        attendees: 500,
        description: "M.D, Gastroenterologist, Endoscopist at European Society of Gastrointestinal Endoscopy (ESGE) and Todua Clinic, Invited Lecturer at TSU",
      },
      {
        time: "10:30",
        title: "Opening Speech by GIMSOC + Esteemed TSU Dean",
        speaker: "GIMSOC & TSU Dean",
        location: "Grand Auditorium",
        type: "ceremony",
        duration: "15 min",
        attendees: 500,
      },
      {
        time: "10:45",
        title: "Keynote Speaker 1: Fecal Transplants for Multidrug-Resistant GI Infections",
        speaker: "Dr. Abhishek Ray",
        location: "Grand Auditorium",
        type: "keynote",
        duration: "20 min",
        attendees: 500,
        description: "UK | Diploma in UK Medical Practice, Specialty Registrar Gastroenterology and Hepatology ST5/ST6, NHS faculty, MRCP PACES Instructor. Topic: Fecal Transplants for Multidrug-Resistant GI Infections Beyond C. diff: Trials of FMT in eradicating carbapenemase-producing Enterobacteriaceae or vancomycin-resistant Enterococci.",
      },
      {
        time: "11:05",
        title: "Keynote Speaker 2",
        speaker: "Dr. Akaki Abutidze",
        location: "Grand Auditorium",
        type: "keynote",
        duration: "20 min",
        attendees: 500,
        description: "Georgia | M.D Infectious Disease, Assistant Professor at TSU Infectious disease Faculty",
      },
      {
        time: "11:25",
        title: "Oral Student Presenter 1",
        speaker: "Student Presenter",
        location: "Grand Auditorium",
        type: "session",
        duration: "15 min",
        attendees: 500,
      },
      {
        time: "11:40",
        title: "Poster Presentations + Coffee Break",
        speaker: "",
        location: "Exhibition Hall",
        type: "break",
        duration: "30 min",
        attendees: 500,
      },
      {
        time: "12:10",
        title: "Sponsors' Spotlight session",
        speaker: "Sponsors",
        location: "Grand Auditorium",
        type: "showcase",
        duration: "10 min",
        attendees: 500,
      },
      {
        time: "12:20",
        title: "Oral Student Presenter 2",
        speaker: "Student Presenter",
        location: "Grand Auditorium",
        type: "session",
        duration: "15 min",
        attendees: 500,
      },
      {
        time: "12:35",
        title: "Infectious Disease Specialists' Panel",
        speaker: "Dr. Akaki Abutidze, Dr. Abhishek Ray, Dr. Anjum Pervez",
        location: "Grand Auditorium",
        type: "panel",
        duration: "30 min",
        attendees: 500,
      },
      {
        time: "13:05",
        title: "Keynote Speaker 3: Biotechnology in Microbial Diagnostics and Therapy",
        speaker: "Dr. Anjum Pervez",
        location: "Grand Auditorium",
        type: "keynote",
        duration: "20 min",
        attendees: 500,
        description: "Georgia | M.D. Professor of Microbiology at Geomedi and TSU. Topic: CRISPR-based diagnostics, bacteriophage therapy, probiotics",
      },
      {
        time: "13:25",
        title: "Oral Student Presenter 3",
        speaker: "Student Presenter",
        location: "Grand Auditorium",
        type: "session",
        duration: "15 min",
        attendees: 500,
      },
      {
        time: "13:40",
        title: "Closing Speech by Deputy Conference Director",
        speaker: "Deputy Conference Director",
        location: "Grand Auditorium",
        type: "ceremony",
        duration: "10 min",
        attendees: 500,
      },
      {
        time: "13:50",
        title: "LUNCH BREAK + Networking",
        speaker: "",
        location: "Main Dining Hall",
        type: "break",
        duration: "40 min",
        attendees: 500,
      },
      {
        time: "14:30",
        title: "Workshops & Collaboration Lounges",
        speaker: "Various Instructors",
        location: "Workshop Rooms & Lounges",
        type: "workshop",
        duration: "180 min",
        attendees: 200,
        description: "Workshops: 1) Foreign Object removal + suturing & flap closure, 2) PPE safety practices & critical decision workshop, 3) CSF collection and analysis in suspected meningitis, 4) Endotracheal intubation, 5) Outbreak management simulation, 6) Wound care & drainage management. Lounges: Research Fair, Academic Lounge, Social Service Lounge, Global MUN Lounge, PICU Booth (TSU Student Exclusive)",
      },
    ],
    2: [
      {
        time: "09:00",
        title: "Registration",
        speaker: "",
        location: "Main Hall",
        type: "break",
        duration: "50 min",
        attendees: 500,
      },
      {
        time: "09:50",
        title: "Opening Speech by Co-Chair Radha Jaiswal",
        speaker: "Co-Chair Radha Jaiswal",
        location: "Grand Auditorium",
        type: "ceremony",
        duration: "10 min",
        attendees: 500,
      },
      {
        time: "10:00",
        title: "Researcher Panel",
        speaker: "Dr. Chisomo Mark Kanthanga",
        location: "Grand Auditorium",
        type: "panel",
        duration: "30 min",
        attendees: 500,
        description: "Southeastern Africa | BSc Medical Microbiology, Researcher at Malawi-Liverpool-Wellcome Programm, Antimicrobial Stewardship (AMS) Committee member at Queen Elizabeth Central Hospital",
      },
      {
        time: "10:30",
        title: "Keynote Speaker 4: Post-COVID Surge in Fungal Infections",
        speaker: "Dr. Lali Sharvadze",
        location: "Grand Auditorium",
        type: "keynote",
        duration: "20 min",
        attendees: 500,
        description: "Georgia | M.D, Associate Professor at TSU Infectious Disease Faculty. Topic: Post-COVID Surge in Fungal Infections (e.g., mucormycosis)",
      },
      {
        time: "10:50",
        title: "Keynote Speaker 5: Post-COVID Surge in Fungal Infections",
        speaker: "Dr. Lali Sharvadze",
        location: "Grand Auditorium",
        type: "keynote",
        duration: "20 min",
        attendees: 500,
        description: "Georgia | M.D, Associate Professor at TSU Infectious Disease Faculty. Topic: Post-COVID Surge in Fungal Infections (e.g., mucormycosis)",
      },
      {
        time: "11:10",
        title: "Keynote Speaker 6: Post-COVID Surge in Fungal Infections",
        speaker: "Dr. Lali Sharvadze",
        location: "Grand Auditorium",
        type: "keynote",
        duration: "20 min",
        attendees: 500,
        description: "Georgia | M.D, Associate Professor at TSU Infectious Disease Faculty. Topic: Post-COVID Surge in Fungal Infections (e.g., mucormycosis)",
      },
      {
        time: "11:30",
        title: "Poster Presentations + Networking",
        speaker: "",
        location: "Exhibition Hall",
        type: "poster",
        duration: "30 min",
        attendees: 500,
      },
      {
        time: "12:00",
        title: "Sponsors' Spotlight session",
        speaker: "Sponsors",
        location: "Grand Auditorium",
        type: "showcase",
        duration: "10 min",
        attendees: 500,
      },
      {
        time: "12:10",
        title: "Oral Student Presenter 4",
        speaker: "Student Presenter",
        location: "Grand Auditorium",
        type: "session",
        duration: "15 min",
        attendees: 500,
      },
      {
        time: "12:25",
        title: "Oral Student Presenter 5",
        speaker: "Student Presenter",
        location: "Grand Auditorium",
        type: "session",
        duration: "15 min",
        attendees: 500,
      },
      {
        time: "12:40",
        title: "Oral Student Presenter 6",
        speaker: "Student Presenter",
        location: "Grand Auditorium",
        type: "session",
        duration: "15 min",
        attendees: 500,
      },
      {
        time: "12:55",
        title: "Changemakers' Lounge",
        speaker: "Changemakers",
        location: "Lounge Area",
        type: "networking",
        duration: "45 min",
        attendees: 200,
      },
      {
        time: "13:40",
        title: "Prize announcement & closing ceremony by Conference Director",
        speaker: "Conference Director",
        location: "Grand Auditorium",
        type: "ceremony",
        duration: "15 min",
        attendees: 500,
      },
      {
        time: "13:55",
        title: "LUNCH + Networking",
        speaker: "",
        location: "Main Dining Hall",
        type: "break",
        duration: "35 min",
        attendees: 500,
      },
      {
        time: "14:30",
        title: "Workshops & Collaborative Lounges",
        speaker: "Various Instructors",
        location: "Workshop Rooms & Lounges",
        type: "workshop",
        duration: "150 min",
        attendees: 200,
        description: "Workshops: 1) Skin scraping & KOH preparation for fungal infections, 2) Abscess drainage (Seldinger technique) & pig-tail catheter placement workshop, 3) Lymph node biopsy techniques for suspected TB, 4) Pus under pressure: Paronychia & felon drainage, 5) Venepuncture and blood culture collection techniques, 6) Fungi gone viral: When opportunists strike, 7) Genital ulcer protocol simulation and lap interpretation. Lounges: Research Fair, Activity Lounge, Academic Lounge, Global MUN Lounge, Exclusive White Coat Lounge",
      },
      {
        time: "16:45",
        title: "Day 2 Exclusive: White Coat Lounge (First half of attendees)",
        speaker: "Exclusive Event",
        location: "White Coat Lounge",
        type: "networking",
        duration: "60 min",
        attendees: 100,
      },
    ],
  }

  const getTypeConfig = (type) => {
    const configs = {
      keynote: { color: "bg-blue-100 text-blue-800 border-blue-200", icon: "🎤" },
      workshop: { color: "bg-green-100 text-green-800 border-green-200", icon: "🛠️" },
      panel: { color: "bg-purple-100 text-purple-800 border-purple-200", icon: "👥" },
      session: { color: "bg-orange-100 text-orange-800 border-orange-200", icon: "📋" },
      break: { color: "bg-gray-100 text-gray-600 border-gray-200", icon: "☕" },
      networking: { color: "bg-pink-100 text-pink-800 border-pink-200", icon: "🤝" },
      poster: { color: "bg-yellow-100 text-yellow-800 border-yellow-200", icon: "📊" },
      showcase: { color: "bg-indigo-100 text-indigo-800 border-indigo-200", icon: "🚀" },
      ceremony: { color: "bg-red-100 text-red-800 border-red-200", icon: "🏆" },
    }
    return configs[type] || configs.session
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Conference Schedule</h1>
          <p className="text-gray-600 mt-2">Your personalized 2-day conference itinerary</p>
        </div>
      </div>

      {/* Day Selector */}
      <Card>
        <div className="p-6">
          <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg max-w-md">
            {[
              { day: 1, date: "Friday", label: "Day 1" },
              { day: 2, date: "Saturday", label: "Day 2" },
            ].map((dayInfo) => (
              <button
                key={dayInfo.day}
                onClick={() => setSelectedDay(dayInfo.day)}
                className={`flex-1 py-3 px-4 rounded-md text-sm font-medium transition-colors ${
                  selectedDay === dayInfo.day ? "bg-white text-blue-600 shadow-sm" : "text-gray-600 hover:text-gray-900"
                }`}
              >
                <div className="text-center">
                  <div className="font-semibold">{dayInfo.label}</div>
                  <div className="text-xs opacity-75">{dayInfo.date}</div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </Card>

      {/* Coming Soon Message */}
      <Card>
        <div className="p-12 text-center">
          <div className="max-w-md mx-auto">
            <div className="text-6xl mb-6">📅</div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Schedule Coming Soon</h2>
            <p className="text-lg text-gray-600 mb-6">
              The complete conference schedule will be available in September 2025.
            </p>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p className="text-sm text-blue-800">
                <strong>Stay tuned!</strong> We're finalizing the schedule with our speakers and will share the detailed program soon.
              </p>
            </div>
          </div>
        </div>
      </Card>

      {/* Schedule Summary - Commented out until schedule is ready */}
      {/*
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <div className="p-6 text-center">
            <div className="text-2xl font-bold text-blue-600 mb-2">
              {scheduleData[selectedDay].filter((s) => s.type !== "break").length}
            </div>
            <div className="text-sm text-gray-600">Total Sessions</div>
          </div>
        </Card>
        <Card>
          <div className="p-6 text-center">
            <div className="text-2xl font-bold text-green-600 mb-2">
              {scheduleData[selectedDay].filter((s) => s.type === "workshop").length}
            </div>
            <div className="text-sm text-gray-600">Workshops Available</div>
          </div>
        </Card>
        <Card>
          <div className="p-6 text-center">
            <div className="text-2xl font-bold text-purple-600 mb-2">
              {scheduleData[selectedDay].filter((s) => s.type === "keynote").length}
            </div>
            <div className="text-sm text-gray-600">Keynote Sessions</div>
          </div>
        </Card>
      </div>
      */}
    </div>
  )
}

export default SchedulePage
