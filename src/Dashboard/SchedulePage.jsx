"use client"

import { useState } from "react"
import { Calendar, Clock, MapPin, Users } from "lucide-react"
import Card from "./Card"

const SchedulePage = () => {
  const [selectedDay, setSelectedDay] = useState(1)

  const scheduleData = {
    1: [
      {
        time: "08:30",
        title: "Registration",
        speaker: "",
        location: "Main Hall",
        type: "break",
        duration: "60 min",
        attendees: 500,
      },
      {
        time: "09:30",
        title: "Press Conference (Opening Ceremony)",
        subtitle: "Title: The Global Continuum of Infection: Unified struggles, Unified solutions",
        speaker: "Dr. Iuri Migrauli, Dr. Tatia Maglaperidze MD, Dr. Maia Butsashvili MD PhD, Dr. Otar Chokoshvili MD PhD",
        location: "Grand Auditorium",
        type: "keynote",
        duration: "30 min",
        attendees: 500,
        description: "Dr. Iuri Migrauli (Georgia | Vice Dean at David Tvildiani Medical University | Training and Simulation Teaching Center Manager at Alte University | Invited Professor and Manager of Quality Assurance for the Program of Medicine at University of Georgia), Dr. Tatia Maglaperidze MD (Georgia | Researcher at National Center for Tuberculosis and Lung Diseases | Phthisiology-Pulmonology Residency at TSMU | M2 Master's program | Invited lecturer at Tbilisi State Medical University, University of Georgia), Dr. Maia Butsashvili, MD, PhD (Georgia | Managing Director at Health Research Union (HRU) | Infectious Disease Epidemiologist | Expert in HIV, Hepatitis, Tuberculosis, and Public Health | Author of 140+ scientific publications), Dr. Otar Chokoshvili MD, PhD (Georgia | PhD, CDC-Certified Epidemiologist | Head of Epidemiology at Infectious Diseases, AIDS & Clinical Immunology Research Center | Expert in HIV, AMR, and outbreak response with 28+ peer-reviewed publications)",
      },
      {
        time: "10:00",
        title: "Opening Speech by Ms. Kgothatso Mamphoka",
        speaker: "Ms. Kgothatso Mamphoka",
        location: "Grand Auditorium",
        type: "ceremony",
        duration: "15 min",
        attendees: 500,
        description: "Co-Chair of GIMSOC, 2025 | East European University",
      },
      {
        time: "10:15",
        title: "Keynote Speaker 1: Dr. Otar Chokoshvili MD, PhD",
        subtitle: "Topic: Understanding Antimicrobial Resistance in the Country of Georgia: Drivers and Hospital IPC Practices",
        speaker: "Dr. Otar Chokoshvili MD, PhD",
        location: "Grand Auditorium",
        type: "keynote",
        duration: "20 min",
        attendees: 500,
        description: "Georgia | PhD, CDC-Certified Epidemiologist | Head of Epidemiology at Infectious Diseases, AIDS & Clinical Immunology Research Center | Expert in HIV, AMR, and outbreak response with 28+ peer-reviewed publications",
      },
      {
        time: "10:35",
        title: "Keynote Speaker 2: Dr. Malvina Javakhadze MD, PhD",
        subtitle: "Topic: The Impact of Global Pandemics on the Epidemiology and Structure of Respiratory Viral Infections",
        speaker: "Dr. Malvina Javakhadze MD, PhD",
        location: "Grand Auditorium",
        type: "keynote",
        duration: "20 min",
        attendees: 500,
        description: "Georgia | PhD, Pediatric Infectious Disease Specialist | Associate Professor at TSMU | Head Of Pediatric Infectious Diseases Department at the Acad.V.Bochorishvili Clinic",
      },
      {
        time: "10:55",
        title: "Ms. Amy Elizabeth Mathew",
        subtitle: "Rash in a Child with EBV Infection: A Pediatric Diagnostic Puzzle",
        speaker: "Ms. Amy Elizabeth Mathew",
        location: "Grand Auditorium",
        type: "session",
        duration: "15 min",
        attendees: 500,
      },
      {
        time: "11:10",
        title: "Poster Presentations + Coffee Break",
        speaker: "",
        location: "Exhibition Hall",
        type: "break",
        duration: "30 min",
        attendees: 500,
      },
      {
        time: "11:40",
        title: "Sponsor's showcase",
        subtitle: "Geomedi University",
        speaker: "Geomedi University",
        location: "Grand Auditorium",
        type: "showcase",
        duration: "5 min",
        attendees: 500,
      },
      {
        time: "11:45",
        title: "Ms. Sidrah Siddiqui",
        subtitle: "Rapid Molecular Diagnostics in Sepsis: Effect on Mortality and Length of Stay Compared with Conventional Testing - A Systematic Review and Meta-Analysis",
        speaker: "Ms. Sidrah Siddiqui",
        location: "Grand Auditorium",
        type: "session",
        duration: "15 min",
        attendees: 500,
      },
      {
        time: "12:00",
        title: "Infectious Disease Specialists' Panel",
        subtitle: "Topic: The Rise of Antimicrobial Resistance (AMR): A Global Public Health Emergency",
        speaker: "Dr. Nino Didbaridze MD, Dr. Tamar Didbaridze MD, Dr. Mariam Acharadze MD, Dr. Giorgi Mgeladze MD",
        location: "Grand Auditorium",
        type: "panel",
        duration: "30 min",
        attendees: 500,
        description: "Dr. Nino Didbaridze MD (Georgia | Preventive Medical Doctor of General Practice Diploma | Invited Professor at BAU International University, European Teaching University, Tbilisi State Medical University), Dr. Tamar Didbaridze MD (Georgia | Professor and Head of Microbiology Department of TSMU, Clinical Microbiologist at TSMU The First University Clinic | Member of Microbiology Society | Member of National Antimicrobial Resistance and Hospital Acquired Infections (AMR/HAI) Surveillance), Dr. Mariam Acharadze, MD (Georgia | Department of Infectious Diseases, First University Clinic of Tbilisi State Medical University | Affiliated with the University of Georgia | Contributor to medical case research in infectious diseases and public health), Dr. Giorgi Mgeladze, MD (Georgia | Lecturer in Microbiology & Gastroenterology at Georgian American University | Gastroenterologist at TEST imp | Former Microbiologist at Richard Lugar Research Center | PhD Candidate in Microbiology & Immunology)",
      },
      {
        time: "12:30",
        title: "Keynote Speaker 3: Dr. Nana Chkhikvadze MD",
        subtitle: "Topic: The Allergic March & Immune Dysregulation – From eczema to asthma to food allergies: understanding immune system misfiring",
        speaker: "Dr. Nana Chkhikvadze MD",
        location: "Grand Auditorium",
        type: "keynote",
        duration: "20 min",
        attendees: 500,
        description: "Georgia | Resident Doctor in Allergy and Immunology | MD (TSMU), Clinician and Researcher in Allergic Diseases | Published in Cureus, ALLERGY (Wiley), and European Respiratory Journal",
      },
      {
        time: "12:50",
        title: "Closing Speech by Ms. Radha Jaiswal",
        speaker: "Ms. Radha Jaiswal",
        location: "Grand Auditorium",
        type: "ceremony",
        duration: "10 min",
        attendees: 500,
        description: "Co-Chair of GIMSOC, 2025 | Georgian National University",
      },
      {
        time: "13:00",
        title: "LUNCH BREAK + Networking",
        speaker: "",
        location: "Main Dining Hall",
        type: "break",
        duration: "60 min",
        attendees: 500,
      },
      {
        time: "14:30",
        title: "Workshops",
        speaker: "Various Instructors",
        location: "Workshop Rooms",
        type: "workshop",
        duration: "210 min",
        attendees: 200,
        description: "1) Foreign Object removal + suturing & flap closure, 2) PPE safety practices & critical decision workshop, 3) CSF collection and analysis in suspected meningitis, 4) Endotracheal intubation, 5) Outbreak management simulation, 6) Wound care & drainage management",
      },
      {
        time: "14:30",
        title: "Collaboration & Networking Lounges",
        speaker: "Various Organizations",
        location: "Lounge Areas",
        type: "networking",
        duration: "210 min",
        attendees: 200,
        description: "Research Fair, Academic Lounge, Social Service Lounge, Global MUN Lounge, PICU Booth (TSU Student Exclusive)",
      },
    ],
    2: [
      {
        time: "08:30",
        title: "Registration",
        speaker: "",
        location: "Main Hall",
        type: "break",
        duration: "60 min",
        attendees: 500,
      },
      {
        time: "09:30",
        title: "Opening Speech by Ms. Oluwatoyin Dairo",
        speaker: "Ms. Oluwatoyin Dairo",
        location: "Grand Auditorium",
        type: "ceremony",
        duration: "10 min",
        attendees: 500,
        description: "Former Co-Chair GIMSOC, 2024 | New Vision University",
      },
      {
        time: "09:40",
        title: "Researcher Panel",
        subtitle: "Topic: Research Without Borders: From Local Questions to Global Impact",
        speaker: "Joseph Aby, Dr. Mariam Khurashvili MD, Dr. Tatia Malaperidze, Dr. Akaki Abutidze",
        location: "Grand Auditorium",
        type: "panel",
        duration: "30 min",
        attendees: 500,
        description: "Joseph Aby (United Arab Emirates | Academician | Forensic Science Consultant | CSI & Forensic Facility Designer | Forensic Technical Assessor | Molecular Biologist (Forensic DNA) | PhD Candidate (Forensic QMS) | Assistant Professor at Amity University, Dubai), Dr. Mariam Khurashvili MD (Georgia | Neurologist | Addiction Psychiatry Resident | Junior Doctor at Medical Holding Georgia 2022 | Invited Lecturer at GAU, SEU, CIU), Dr. Tatia Malaperidze (Georgia | Researcher at National Center for Tuberculosis and Lung Diseases | Phthisiology-Pulmonology Residency at TSMU | M2 Master's program | Invited lecturer at Tbilisi State Medical University, University of Georgia), Dr. Akaki Abutidze (Georgia | M.D Infectious Disease | Deputy Director for Research at Infectious Diseases, AIDS & Clinical Immunology Research Center | Associate Professor at Tbilisi State University | Member of National Hepatitis C Elimination Clinical Group | Researcher in HIV and Viral Hepatitis)",
      },
      {
        time: "10:10",
        title: "Keynote Speaker 4: Dr. Annam Jan MD",
        subtitle: "Topic: Gut-Brain-Infection Axis: How Microbes Influence Mental and Neurological Health",
        speaker: "Dr. Annam Jan MD",
        location: "Grand Auditorium",
        type: "keynote",
        duration: "20 min",
        attendees: 500,
        description: "Georgia | MD, Medical Lecturer at The University of Georgia & Georgian National University (SEU) | Chairperson of the CBL-PBL Committee | Academic Neuroscience Researcher and Medical Educator",
      },
      {
        time: "10:30",
        title: "Keynote Speaker 5: Dr. Abhishek Ray",
        subtitle: "Topic: Fecal Transplants for Multidrug-Resistant GI Infections Beyond C. diff: Trials of FMT in eradicating carbapenemase-producing Enterobacteriaceae or vancomycin-resistant Enterococci",
        speaker: "Dr. Abhishek Ray",
        location: "Grand Auditorium",
        type: "keynote",
        duration: "20 min",
        attendees: 500,
        description: "UK | Diploma in UK Medical Practice, Specialty Registrar Gastroenterology and Hepatology ST5/ST6, NHS faculty, MRCP PACES Instructor",
      },
      {
        time: "10:50",
        title: "Gisoo Farhani",
        subtitle: "Latent TB Screening in Healthcare Workers: A Comparative Evaluation of IGRA and TST at Baseline and One-Year Follow-Up in a High Burden Setting",
        speaker: "Gisoo Farhani",
        location: "Grand Auditorium",
        type: "session",
        duration: "15 min",
        attendees: 500,
      },
      {
        time: "11:05",
        title: "Poster Presentations + Networking",
        subtitle: "Local & International Organizations' booths",
        speaker: "",
        location: "Exhibition Hall",
        type: "poster",
        duration: "30 min",
        attendees: 500,
      },
      {
        time: "11:35",
        title: "Sponsors' Spotlight session",
        subtitle: "Speaker: Mr. Michael Hermoisa (C.O.O - Project IMG)",
        speaker: "Mr. Michael Hermoisa",
        location: "Grand Auditorium",
        type: "showcase",
        duration: "10 min",
        attendees: 500,
        description: "C.O.O - Project IMG",
      },
      {
        time: "11:45",
        title: "Keynote Speaker 6: Dr. Aleksandra Barnovi MD",
        subtitle: "Topic: Rise of non-TB mycobacterial lung infections (NTM) in developed countries: An underdiagnosed threat",
        speaker: "Dr. Aleksandra Barnovi MD",
        location: "Grand Auditorium",
        type: "keynote",
        duration: "20 min",
        attendees: 500,
        description: "Georgia | MD, Invited Lecturer in Biochemistry and Microbiology | USMLE Step 1 Certified | Clinician-Educator with international training in cardiology and medical education",
      },
      {
        time: "12:05",
        title: "Ms. Mariami Varazashvili",
        subtitle: "Antibiotic Resistance Awareness Among Medical Students in Georgia: A Cross-Sectional Study",
        speaker: "Ms. Mariami Varazashvili",
        location: "Grand Auditorium",
        type: "session",
        duration: "15 min",
        attendees: 500,
      },
      {
        time: "12:20",
        title: "The Changemakers' Segment",
        subtitle: "Topics: Forensic medicine, Hospital administration, medical journalism",
        speaker: "Dr. Sesil Tsirekidze MD, Joseph Aby",
        location: "Grand Auditorium",
        type: "networking",
        duration: "45 min",
        attendees: 200,
        description: "Dr. Sesil Tsirekidze MD (Georgia | Obstetrician-gynecologist at Gudushauri National Medical Centre | MBA in Healthcare Management | Invited lecturer at TSMU for clinical skills and multidisciplinary simulation centre | Drug Registration manager at Pharmaceutical company Iberi+ 2017), Joseph Aby (United Arab Emirates | Academician | Forensic Science Consultant | CSI & Forensic Facility Designer | Forensic Technical Assessor | Molecular Biologist (Forensic DNA) | PhD Candidate (Forensic QMS))",
      },
      {
        time: "13:05",
        title: "Prize announcement",
        subtitle: "The top three winners of Scientific Oral & Poster Presentations, will be awarded onstage.",
        speaker: "Conference Organizers",
        location: "Grand Auditorium",
        type: "ceremony",
        duration: "5 min",
        attendees: 500,
      },
      {
        time: "13:10",
        title: "Closing Ceremony by Conference Director - Ms. Guncha Shaikh",
        speaker: "Ms. Guncha Shaikh",
        location: "Grand Auditorium",
        type: "ceremony",
        duration: "10 min",
        attendees: 500,
        description: "Geomedi University",
      },
      {
        time: "13:20",
        title: "LUNCH + Networking",
        speaker: "",
        location: "Main Dining Hall",
        type: "break",
        duration: "40 min",
        attendees: 500,
      },
      {
        time: "14:30",
        title: "Workshops",
        speaker: "Various Instructors",
        location: "Workshop Rooms",
        type: "workshop",
        duration: "210 min",
        attendees: 200,
        description: "1) Skin scraping & KOH preparation for fungal infections, 2) Abscess drainage (Seldinger technique) & pig-tail catheter placement workshop, 3) Lymph node biopsy techniques for suspected TB, 4) Pus under pressure: Paronychia & felon drainage, 5) Venepuncture and blood culture collection techniques, 6) Fungi gone viral: When opportunists strike, 7) Genital ulcer protocol simulation and lap interpretation",
      },
      {
        time: "14:30",
        title: "Collaborative & Networking Lounges",
        speaker: "Various Organizations",
        location: "Lounge Areas",
        type: "networking",
        duration: "210 min",
        attendees: 200,
        description: "Research Fair, Activity Lounge, Academic Lounge, Global MUN Lounge, Exclusive White Coat Lounge",
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

