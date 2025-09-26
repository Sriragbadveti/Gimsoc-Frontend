import React from "react"
import Navbar from "../Components/Navbar"
import Footer from "../Components/Footer"
import { motion } from "framer-motion"

const SectionHeader = ({ day, date }) => (
  <div className="text-center mb-10">
    <h2 className="text-4xl md:text-6xl font-extrabold tracking-tight bg-gradient-to-r from-blue-300 via-purple-300 to-indigo-300 bg-clip-text text-transparent drop-shadow-[0_0_20px_rgba(59,130,246,0.25)]">
      {day}
    </h2>
    <p className="mt-2 text-lg md:text-xl text-gray-300">{date}</p>
  </div>
)

const TimelineItem = ({ time, title, subtitle, speakers, accent = "blue" }) => {
  const accentMap = {
    blue: "from-blue-600/20 to-indigo-600/20 border-blue-500/30",
    purple: "from-purple-600/20 to-pink-600/20 border-purple-500/30",
    emerald: "from-emerald-600/20 to-teal-600/20 border-emerald-500/30",
    amber: "from-amber-600/20 to-orange-600/20 border-amber-500/30",
    rose: "from-rose-600/20 to-fuchsia-600/20 border-rose-500/30",
  }
  const accentClasses = accentMap[accent] || accentMap.blue

  return (
    <motion.div
      className={`relative group rounded-3xl p-6 md:p-8 bg-gray-800/60 backdrop-blur border ${accentClasses} transition-all duration-300`}
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      whileHover={{ y: -4, scale: 1.01 }}
    >
      {/* Animated corner glow */}
      <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-white/0 via-white/0 to-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

      {/* Floating glow dot */}
      <span className="absolute -top-2 -left-2 h-3 w-3 rounded-full bg-gradient-to-r from-blue-400 to-purple-400 blur-[1px] animate-pulse" />

      {/* Animated sheen on hover */}
      <span className="pointer-events-none absolute inset-y-0 -left-1 w-1 rounded-full bg-gradient-to-b from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      <div className="flex flex-col md:flex-row md:items-start gap-4">
        <div className="md:w-40 shrink-0">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/40 border border-white/10 text-gray-200 text-sm">
            <span className="inline-block w-2 h-2 rounded-full bg-gradient-to-r from-blue-400 to-purple-400 animate-[pulse_2s_ease-in-out_infinite]" />
            {time}
          </div>
        </div>
        <div className="flex-1">
          {title && (
            <motion.h3
              className="text-xl md:text-2xl font-bold text-white mb-1"
              initial={{ opacity: 0, y: 6 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ delay: 0.05 }}
            >
              {title}
            </motion.h3>
          )}
          {subtitle && (
            <motion.p
              className="text-base md:text-lg text-gray-300 mb-3"
              initial={{ opacity: 0, y: 6 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ delay: 0.08 }}
            >
              {subtitle}
            </motion.p>
          )}
          {Array.isArray(speakers) && speakers.length > 0 && (
            <motion.ul
              className="space-y-2 mt-2 list-disc list-inside marker:text-gray-400"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={{
                hidden: { opacity: 1 },
                visible: { opacity: 1, transition: { staggerChildren: 0.04 } },
              }}
            >
              {speakers.map((s, idx) => (
                <motion.li
                  key={idx}
                  className="text-gray-200/90"
                  variants={{ hidden: { opacity: 0, y: 6 }, visible: { opacity: 1, y: 0 } }}
                >
                  {s}
                </motion.li>
              ))}
            </motion.ul>
          )}
        </div>
      </div>
    </motion.div>
  )
}

const Divider = () => (
  <div className="relative my-10 md:my-12">
    <div className="h-px w-full bg-gradient-to-r from-transparent via-gray-600/40 to-transparent" />
  </div>
)

const ConferenceProgram = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-black to-gray-900 relative overflow-hidden">
      {/* Ambient background lights */}
      <div className="pointer-events-none absolute -top-20 -left-20 w-[40rem] h-[40rem] rounded-full bg-blue-600/10 blur-3xl animate-[float_18s_ease-in-out_infinite]" />
      <div className="pointer-events-none absolute top-1/3 -right-20 w-[40rem] h-[40rem] rounded-full bg-purple-600/10 blur-3xl animate-[float_22s_ease-in-out_infinite_reverse]" />
      <div className="pointer-events-none absolute bottom-0 left-1/2 -translate-x-1/2 w-[50rem] h-[30rem] rounded-full bg-indigo-500/10 blur-3xl animate-[float_26s_ease-in-out_infinite]" />

      <Navbar />

      {/* Hero */}
      <section className="pt-32 pb-10 relative z-10">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center">
            <motion.h1
              className="inline-block text-5xl md:text-7xl font-extrabold tracking-tight bg-gradient-to-r from-blue-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent drop-shadow-[0_0_30px_rgba(99,102,241,0.35)]"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              Conference Program
            </motion.h1>
            <div className="mx-auto mt-3 h-[3px] w-40 rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-500 animate-[shimmer_3s_linear_infinite]" />
            <motion.p
              className="mt-4 text-lg md:text-xl text-gray-300 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.5 }}
            >
              Explore the two-day journey packed with keynotes, panels, workshops, and networking.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Day 1 */}
      <section className="relative z-10 pb-6">
        <div className="max-w-6xl mx-auto px-4">
          <SectionHeader day="Day 1: Friday" date="24th October" />

          <div className="grid grid-cols-1 gap-6">
            <TimelineItem time="9:00 AM - 10:00 AM" title="Registration" accent="emerald" />

            <TimelineItem
              time="10:00 AM - 10:30 AM"
              title="Press Conference (Opening Ceremony)"
              subtitle="Title: The Global Continuum of Infection: Unified struggles, Unified solutions"
              speakers={[
                "Dr. Iuri Migrauli (Georgia | Vice Dean at David Tvildiani Medical University | Training and Simulation Teaching Center Manager at Alte University | Invited Professor and Manager of Quality Assurance for the Program of Medicine at University of Georgia)",
                "Dr. Tatia Maglaperidze MD (Georgia | Researcher at National Center for Tuberculosis and Lung Diseases | Phthisiology-Pulmonology Residency at TSMU | M2 Master’s program | Invited lecturer at Tbilisi State Medical University, University of Georgia)",
                
                "Dr. Maia Butsashvili, MD, Phd (Georgia | Managing Director at Health Research Union (HRU) | Infectious Disease Epidemiologist | Expert in HIV, Hepatitis, Tuberculosis, and Public Health | Author of 140+ scientific publications)",
                "Dr. Otar Chokoshvili MD, PhD (Georgia | PhD, CDC-Certified Epidemiologist | Head of Epidemiology at Infectious Diseases, AIDS & Clinical Immunology Research Center | Expert in HIV, AMR, and outbreak response with 28+ peer-reviewed publications)",
              ]}
              accent="blue"
            />

            <TimelineItem time="10:30 AM - 10:45 AM" title="Opening Speech by Ms. Kay Mamphoka" subtitle="Co-Chair of GIMSOC, 2025" accent="purple" />

            <TimelineItem
              time="10:45 AM - 11:05 AM"
              title="Keynote Speaker 1: Dr. Otar Chokoshvili MD, PhD"
              subtitle="Topic: Understanding Antimicrobial Resistance in the Country of Georgia: Drivers and Hospital IPC Practices"
              accent="amber"
            />

            <TimelineItem
              time="11:05 AM - 11:25 AM"
              title="Keynote Speaker 2: Dr. Malvina Javakhadze MD, PhD"
              subtitle="Topic: The Impact of Global Pandemics on the Epidemiology and Structure of Respiratory Viral Infections"
              accent="amber"
            />

            <TimelineItem time="11:25 AM - 11:40 AM" title="Oral Student Presenter 1" accent="rose" />

            <TimelineItem time="11:40 AM - 12:10 PM" title="Poster Presentations + Coffee Break" accent="emerald" />

            <TimelineItem time="12:10 PM - 12:15 PM" title="Sponsors Showcase" accent="purple" />

            <TimelineItem time="12:15 PM - 12:30 PM" title="Oral Student Presenter 2" accent="rose" />

            <TimelineItem
              time="12:30 PM - 1:00 PM"
              title="Infectious Disease Specialists’ Panel"
              subtitle="Topic: The Rise of Antimicrobial Resistance (AMR): A Global Public Health Emergency"
              speakers={[
                "Dr. Nino Didbaridze MD (Georgia | Preventive Medical Doctor of General Practice Diploma | Invited Professor at BAU International University, European Teaching University, Tbilisi State Medical University)",
                "Dr. Tamar Didbaridze MD (Georgia | Professor and Head of Microbiology Department of TSMU, Clinical Microbiologist at TSMU The First University Clinic | Member of Microbiology Society | Member of National Antimicrobial Resistance and Hospital Acquired Infections (AMR/HAI) Surveillance)",
                "Dr. Mariam Acharadze, MD (Georgia | Department of Infectious Diseases, First University Clinic of Tbilisi State Medical University | Affiliated with the University of Georgia | Contributor to medical case research in infectious diseases and public health)",
                "Dr. Giorgi Mgeladze, MD (Georgia | Lecturer in Microbiology & Gastroenterology at Georgian American University | Gastroenterologist at TEST imp | Former Microbiologist at Richard Lugar Research Center | PhD Candidate in Microbiology & Immunology)",
              ]}
              accent="blue"
            />

            <TimelineItem
              time="1:00 PM - 1:20 PM"
              title="Keynote Speaker 3: Dr. Nana Chkhikvadze MD"
              subtitle="Topic: The Allergic March & Immune Dysregulation – From eczema to asthma to food allergies: understanding immune system misfiring"
              accent="amber"
            />

            <TimelineItem time="1:20 PM - 1:35 PM" title="Oral Student Presenter 3" accent="rose" />
            <TimelineItem time="1:35 PM - 1:45 PM" title="Closing Speech by Toyin Dairo" subtitle="Former Co-Chair GIMSOC, 2024" accent="purple" />

            <Divider />

            <TimelineItem time="1:45 PM - 2:30 PM" title="LUNCH BREAK + Networking" accent="emerald" />

            <TimelineItem
              time="2:30 PM - 6:00 PM"
              title="Workshops"
              speakers={[
                "1) Foreign Object removal + suturing & flap closure",
                "2) PPE safety practices & critical decision workshop",
                "3) CSF collection and analysis in suspected meningitis",
                "4) Endotracheal intubation",
                "5) Outbreak management simulation",
                "6) Wound care & drainage management",
              ]}
              accent="blue"
            />

            <TimelineItem
              time="2:30 PM - 6:00 PM"
              title="Collaboration & Networking Lounges"
              speakers={["Research Fair", "Academic Lounge", "Social Service Lounge", "Global MUN Lounge", "PICU Booth (TSU Student Exclusive)"]}
              accent="purple"
            />
          </div>
        </div>
      </section>

      {/* Day 2 */}
      <section className="relative z-10 pb-16">
        <div className="max-w-6xl mx-auto px-4">
          <SectionHeader day="Day 2: Saturday" date="25th October" />

          <div className="grid grid-cols-1 gap-6">
            <TimelineItem time="9:00 AM - 9:50 AM" title="Registration" accent="emerald" />
            <TimelineItem time="9:50 AM - 10:00 AM" title="Opening Speech by Ms. Radha Jaiswal" subtitle="Co-Chair of GIMSOC, 2025" accent="purple" />

            <TimelineItem
              time="10:00 AM - 10:30 AM"
              title="Researcher Panel"
              subtitle="Topic: Research Without Borders: From Local Questions to Global Impact"
              speakers={[
                "Joseph Aby (United Arab Emirates | Academician | Forensic Science Consultant | CSI & Forensic Facility Designer | Forensic Technical Assessor | Molecular Biologist (Forensic DNA) | PhD Candidate (Forensic QMS) | Assistant Professor at Amity University, Dubai)",
                "Dr. Mariam Khurashvili MD (Georgia | Neurologist | Addiction Psychiatry Resident | Junior Doctor at Medical Holding Georgia 2022 | Invited Lecturer at GAU, SEU, CIU)",
                "Dr. Tatia Malaperidze (Georgia | Researcher at National Center for Tuberculosis and Lung Diseases | Phthisiology-Pulmonology Residency at TSMU | M2 Master's program | Invited lecturer at Tbilisi State Medical University, University of Georgia)",
                "Dr. Akaki Abutidze (Georgia | M.D Infectious Disease | Deputy Director for Research at Infectious Diseases, AIDS & Clinical Immunology Research Center | Associate Professor at Tbilisi State University | Member of National Hepatitis C Elimination Clinical Group | Researcher in HIV and Viral Hepatitis)",
              ]}
              accent="blue"
            />

            <TimelineItem
              time="10:30 AM - 10:50 AM"
              title="Keynote Speaker 4: Dr. Annam Jan MD"
              subtitle="Topic: Gut-Brain-Infection Axis: How Microbes Influence Mental and Neurological Health"
              speakers={["Dr. Annam Jan MD (Georgia | MD, Medical Lecturer at The University of Georgia & Georgian National University (SEU) | Chairperson of the CBL-PBL Committee | Academic Neuroscience Researcher and Medical Educator)"]}
              accent="amber"
            />

            <TimelineItem
              time="10:50 AM - 11:10 AM"
              title="Keynote Speaker 5: Dr. Abhishek Ray"
              subtitle="Topic: Fecal Transplants for Multidrug-Resistant GI Infections Beyond C. diff: Trials of FMT in eradicating carbapenemase-producing Enterobacteriaceae or vancomycin-resistant Enterococci"
              speakers={["Dr. Abhishek Ray (UK | Diploma in UK Medical Practice, Specialty Registrar Gastroenterology and Hepatology ST5/ST6, NHS faculty, MRCP PACES Instructor)"]}
              accent="amber"
            />

            <TimelineItem time="11:10 AM - 11:25 AM" title="Oral Student Presenter 4" accent="rose" />

            <TimelineItem time="11:25 AM - 11:55 AM" title="Poster Presentations + Networking" accent="emerald" />
            <TimelineItem time="11:55 AM - 12:05 PM" title="Sponsors' Spotlight session" speakers={["Speaker: Michael E. Hermosa (Project IMG)"]} accent="purple" />

            <TimelineItem time="12:05 PM - 12:20 PM" title="Oral Student Presenter 5" accent="rose" />

            <TimelineItem
              time="12:20 PM - 12:40 PM"
              title="Keynote Speaker 6: Dr. Aleksandra Barnovi MD"
              subtitle="Topic: Rise of non-TB mycobacterial lung infections (NTM) in developed countries: An underdiagnosed threat"
              speakers={["Dr. Aleksandra Barnovi MD (Georgia | MD, Invited Lecturer in Biochemistry and Microbiology | USMLE Step 1 Certified | Clinician-Educator with international training in cardiology and medical education)"]}
              accent="amber"
            />

            <TimelineItem time="12:40 PM - 12:55 PM" title="Oral Student Presenter 6" accent="rose" />

            <TimelineItem
              time="12:55 PM - 1:40 PM"
              title="The Changemakers' Lounge"
              subtitle="Topics: Forensic medicine, Hospital administration, medical journalism"
              speakers={[
                "Dr. Sesil Tsirekidze MD (Georgia | Obstetrician-gynecologist at Gudushauri National Medical Centre | MBA in Healthcare Management | Invited lecturer at TSMU for clinical skills and multidisciplinary simulation centre | Drug Registration manager at Pharmaceutical company Iberi+ 2017)",
                "Joseph Aby (United Arab Emirates | Academician | Forensic Science Consultant | CSI & Forensic Facility Designer | Forensic Technical Assessor | Molecular Biologist (Forensic DNA) | PhD Candidate (Forensic QMS))",
              ]}
              accent="blue"
            />

            <TimelineItem time="1:40 PM - 1:45 PM" title="Prize announcement" subtitle="The top three winners of Scientific Oral & Poster Presentations, will be awarded onstage." accent="purple" />

            <TimelineItem time="1:45 PM - 1:55 PM" title="Closing Ceremony by Conference Director" accent="purple" />

            <Divider />

            <TimelineItem time="1:55 PM - 2:30 PM" title="LUNCH + Networking" accent="emerald" />

            <TimelineItem
              time="2:30 PM - 6:00 PM"
              title="Workshops"
              speakers={[
                "1) Skin scraping & KOH preparation for fungal infections",
                "2) Abscess drainage (Seldinger technique) & pig-tail catheter placement workshop",
                "3) Lymph node biopsy techniques for suspected TB",
                "4) Pus under pressure: Paronychia & felon drainage",
                "5) Venepuncture and blood culture collection techniques",
                "6) Fungi gone viral: When opportunists strike",
                "7) Genital ulcer protocol simulation and lap interpretation",
              ]}
              accent="blue"
            />

            <TimelineItem
              time="2:30 PM - 6:00 PM"
              title="Collaborative & Networking Lounges"
              speakers={["Research Fair", "Activity Lounge", "Academic Lounge", "Global MUN Lounge", "Exclusive White Coat Lounge"]}
              accent="purple"
            />

            <TimelineItem time="4:45 PM - 5:45 PM" title="Day 2 Exclusive: White Coat Lounge (First half of attendees)" accent="rose" />
          </div>
        </div>
      </section>

      <Footer />

      <style>{`
        @keyframes fadeInUp {
          0% { opacity: 0; transform: translateY(12px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        @keyframes shimmer {
          0% { background-position: 0% 50%; }
          100% { background-position: 200% 50%; }
        }
      `}</style>
    </div>
  )
}

export default ConferenceProgram
