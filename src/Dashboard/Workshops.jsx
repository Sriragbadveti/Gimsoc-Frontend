"use client"

import { useEffect, useMemo, useState } from "react"
import axios from "axios"
import Card from "./Card"
import { AlertTriangle, CheckCircle2, Clock, Lock, Users, XCircle } from "lucide-react"

export default function Workshops({ userData }) {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [sessions, setSessions] = useState([])
  const [selection, setSelection] = useState(null)
  const [ticketType, setTicketType] = useState("")
  const [email, setEmail] = useState("")
  const [submitting, setSubmitting] = useState(false)

  const venue = useMemo(() => {
    if (ticketType === "Standard+2") return "TSU"
    if (ticketType === "Standard+3" || ticketType === "Standard+4") return "NVU"
    return null
  }, [ticketType])

  useEffect(() => {
    const init = async () => {
      try {
        setLoading(true)
        const e = userData?.email
        if (!e) {
          setError("No user email available")
          setLoading(false)
          return
        }
        setEmail(e)
        const resp = await axios.get(`https://gimsoc-backend.onrender.com/api/workshops/sessions?email=${encodeURIComponent(e)}`)
        setSessions(resp.data.sessions || [])
        setSelection(resp.data.selection || null)
        setTicketType(resp.data.user?.ticketType || userData?.ticketType)
      } catch (err) {
        setError(err.response?.data?.message || err.message)
      } finally {
        setLoading(false)
      }
    }
    init()
  }, [userData])

  // Provide TSU fallback sessions (client-side) if backend returns none
  const effectiveSessions = useMemo(() => {
    const hasAny = Array.isArray(sessions) && sessions.length > 0
    if (hasAny) return sessions

    if (venue === "TSU") {
      // Fallback TSU definitions per spec
      const TSU_A = { day: 1, slot: "A", time: "2:00 PM – 3:30 PM", venue: "TSU" }
      const TSU_B = { day: 1, slot: "B", time: "4:00 PM – 5:30 PM", venue: "TSU" }
      const TSU_C = { day: 2, slot: "C", time: "2:00 PM – 3:30 PM", venue: "TSU" }
      const TSU_D = { day: 2, slot: "D", time: "4:00 PM – 5:30 PM", venue: "TSU" }
      return [
        // Day 1 — Slot A
        { code: "T1-A", title: "Foreign Object Removal + Suturing & Flap Closure", capacity: 40, reserved: 0, ...TSU_A },
        { code: "T3-A", title: "Central Line Placement", capacity: 40, reserved: 0, ...TSU_A },
        { code: "T4-A", title: "Incision & Drainage", capacity: 40, reserved: 0, ...TSU_A },
        // Day 1 — Slot B
        { code: "T1-B", title: "Foreign Object Removal + Suturing & Flap Closure", capacity: 40, reserved: 0, ...TSU_B },
        { code: "T3-B", title: "Central Line Placement", capacity: 40, reserved: 0, ...TSU_B },
        // Day 2 — Slot C
        { code: "T1-C", title: "Foreign Object Removal + Suturing & Flap Closure", capacity: 40, reserved: 0, ...TSU_C },
        { code: "T4-C", title: "Incision & Drainage", capacity: 40, reserved: 0, ...TSU_C },
        // Day 2 — Slot D
        { code: "T2-D", title: "AMBOSS: Bridging Textbooks & Clinics", capacity: 40, reserved: 0, ...TSU_D },
        { code: "T3-D", title: "Central Line Placement", capacity: 40, reserved: 0, ...TSU_D },
        { code: "T4-D", title: "Incision & Drainage", capacity: 40, reserved: 0, ...TSU_D },
      ]
    }

    if (venue === "NVU") {
      // Fallback NVU definitions per spec
      const NVU_A = { day: 1, slot: "A", time: "3:00 PM – 4:30 PM", venue: "NVU" }
      const NVU_B = { day: 1, slot: "B", time: "5:00 PM – 6:30 PM", venue: "NVU" }
      const NVU_C = { day: 2, slot: "C", time: "3:00 PM – 4:30 PM", venue: "NVU" }
      const NVU_D = { day: 2, slot: "D", time: "5:00 PM – 6:30 PM", venue: "NVU" }
      return [
        // Day 1 — Slot A
        { code: "N1A-A", title: "From Swab to Solution: STI Cultures", capacity: 40, reserved: 0, linkedGroup: "N1", ...NVU_A },
        { code: "N2A-A", title: "Wound Care & Drainage Management", capacity: 40, reserved: 0, linkedGroup: "N2", ...NVU_A },
        { code: "N3-A", title: "Outbreak Management Simulation", capacity: 40, reserved: 0, linkedGroup: "N3", ...NVU_A },
        { code: "N5-A", title: "Endotracheal Intubation", capacity: 40, reserved: 0, ...NVU_A },
        { code: "N6-A", title: "Venepuncture & Blood Culture Collection", capacity: 40, reserved: 0, ...NVU_A },
        // Day 1 — Slot B
        { code: "N1B-B", title: "Nasal Swabbing & Respiratory Pathogen ID", capacity: 40, reserved: 0, linkedGroup: "N1", ...NVU_B },
        { code: "N2B-B", title: "Wound Debridement & Suturing", capacity: 40, reserved: 0, linkedGroup: "N2", ...NVU_B },
        { code: "N4-B", title: "PPE Safety Practices & Critical Decision", capacity: 40, reserved: 0, linkedGroup: "N4", ...NVU_B },
        { code: "N5-B", title: "Endotracheal Intubation", capacity: 40, reserved: 0, ...NVU_B },
        { code: "N6-B", title: "Venepuncture & Blood Culture Collection", capacity: 40, reserved: 0, ...NVU_B },
        // Day 2 — Slot C
        { code: "N1A-C", title: "From Swab to Solution: STI Cultures", capacity: 40, reserved: 0, linkedGroup: "N1", ...NVU_C },
        { code: "N2A-C", title: "Wound Care & Drainage Management", capacity: 40, reserved: 0, linkedGroup: "N2", ...NVU_C },
        { code: "N3-C", title: "Outbreak Management Simulation", capacity: 40, reserved: 0, linkedGroup: "N3", ...NVU_C },
        { code: "N5-C", title: "Endotracheal Intubation", capacity: 40, reserved: 0, ...NVU_C },
        { code: "N6-C", title: "Venepuncture & Blood Culture Collection", capacity: 40, reserved: 0, ...NVU_C },
        // Day 2 — Slot D
        { code: "N1B-D", title: "Nasal Swabbing & Respiratory Pathogen ID", capacity: 40, reserved: 0, linkedGroup: "N1", ...NVU_D },
        { code: "N2B-D", title: "Wound Debridement & Suturing", capacity: 40, reserved: 0, linkedGroup: "N2", ...NVU_D },
        { code: "N4-D", title: "PPE Safety Practices & Critical Decision", capacity: 40, reserved: 0, linkedGroup: "N4", ...NVU_D },
        { code: "N5-D", title: "Endotracheal Intubation", capacity: 40, reserved: 0, ...NVU_D },
        { code: "N6-D", title: "Venepuncture & Blood Culture Collection", capacity: 40, reserved: 0, ...NVU_D },
      ]
    }

    return sessions
  }, [sessions, venue])

  const grouped = useMemo(() => {
    const g = { day1: { A: [], B: [] }, day2: { C: [], D: [] } }
    for (const s of effectiveSessions) {
      if (s.day === 1) {
        if (s.slot === "A") g.day1.A.push(s)
        if (s.slot === "B") g.day1.B.push(s)
      } else if (s.day === 2) {
        if (s.slot === "C") g.day2.C.push(s)
        if (s.slot === "D") g.day2.D.push(s)
      }
    }
    return g
  }, [effectiveSessions])

  const [chosen, setChosen] = useState(new Set())
  useEffect(() => {
    // initialize from existing selection
    if (selection?.selections?.length) setChosen(new Set(selection.selections))
  }, [selection])

  const toggle = (code, s) => {
    // Check if we're adding or removing
    const isRemoving = chosen.has(code)
    
    if (!isRemoving) {
      // Check capacity (40 seats per workshop)
      if (s.reserved >= s.capacity) {
        alert(`❌ Sorry, this workshop is FULL!\n\n"${s.title}" has reached its capacity of ${s.capacity} attendees. Please select a different workshop.`)
        return
      }

      // Check time slot conflict: only one per slot per day
      const slotKey = `${s.day}-${s.slot}`
      const inSameSlot = effectiveSessions.filter(x => chosen.has(x.code) && `${x.day}-${x.slot}` === slotKey)
      if (inSameSlot.length) {
        alert("❌ You've already chosen a workshop in this time slot.\n\nPlease select a different time slot.")
        return
      }

      // Check max 2 workshops per day
      const workshopsOnThisDay = effectiveSessions.filter(x => chosen.has(x.code) && x.day === s.day)
      if (workshopsOnThisDay.length >= 2) {
        alert("❌ You can select a maximum of 2 workshops per day.\n\nYou already have 2 workshops selected for this day.")
        return
      }

      // Check max workshops total (2 for st2, 3 for st3/st4)
      const maxWorkshops = ticketType === "Standard+2" ? 2 : 3
      if (chosen.size >= maxWorkshops) {
        alert(`❌ You can select a maximum of ${maxWorkshops} workshops total.\n\nYou have already selected ${maxWorkshops} workshops. Please deselect one if you want to choose a different workshop.`)
        return
      }

      // Linked mutual exclusion (NVU)
      if (venue === "NVU" && s.linkedGroup) {
        const inLinked = effectiveSessions.filter(x => chosen.has(x.code) && x.linkedGroup && x.linkedGroup === s.linkedGroup)
        if (inLinked.length) {
          alert("❌ This session is linked with another workshop you've already selected.\n\nPlease select only one workshop from this linked group.")
          return
        }
      }
    }

    const next = new Set(chosen)
    if (isRemoving) {
      next.delete(code)
    } else {
      next.add(code)
    }
    setChosen(next)
  }

  const handleSubmit = async () => {
    // Count workshops per day
    let d1 = 0, d2 = 0
    for (const s of effectiveSessions) {
      if (chosen.has(s.code)) {
        if (s.day === 1) d1++
        else if (s.day === 2) d2++
      }
    }

    const total = d1 + d2

    // Ticket-specific validation rules
    if (ticketType === "Standard+2") {
      // Standard+2 (TSU): Exactly 1 workshop per day (2 total)
      if (d1 !== 1 || d2 !== 1) {
        alert("You must select exactly 1 workshop for each day (2 workshops total).")
        return
      }
    } else if (ticketType === "Standard+3" || ticketType === "Standard+4") {
      // Standard+3 & Standard+4 (NVU): 1-2 workshops per day (3 total max)
      if (total > 3) {
        alert("You can select a maximum of 3 workshops total.")
        return
      }
      if (d1 < 1 || d2 < 1) {
        alert("Please select at least 1 workshop for each day.")
        return
      }
      if (d1 > 2 || d2 > 2) {
        alert("You can select a maximum of 2 workshops per day.")
        return
      }
    }

    // 4. Time slot conflict check (redundant but safe)
    const slotKeys = new Set()
    for (const s of effectiveSessions) {
      if (chosen.has(s.code)) {
        const key = `${s.day}-${s.slot}`
        if (slotKeys.has(key)) {
          alert("You've already chosen a workshop in this time slot.")
          return
        }
        slotKeys.add(key)
      }
    }

    try {
      setSubmitting(true)
      const selections = Array.from(chosen)
      const resp = await axios.post("https://gimsoc-backend.onrender.com/api/workshops/select", { email, selections })
      alert("Registration Completed 🎉\nYour selections have been saved.")
      setSelection(resp.data.selection)
    } catch (err) {
      alert(err.response?.data?.message || err.message)
    } finally {
      setSubmitting(false)
    }
  }

  if (loading) {
    return (
      <Card>
        <div className="p-8 text-gray-600">Loading workshops...</div>
      </Card>
    )
  }
  if (error) {
    return (
      <Card>
        <div className="p-8 text-red-600">{error}</div>
      </Card>
    )
  }
  if (!venue) {
    return (
      <Card>
        <div className="p-8 text-gray-700">Workshops are available for Standard+2/3/4 tickets only.</div>
      </Card>
    )
  }

  // If user has already submitted their selection, show congratulations message
  if (selection && selection.selections && selection.selections.length > 0) {
    const selectedWorkshops = effectiveSessions.filter(s => selection.selections.includes(s.code))
    return (
      <Card>
        <div className="p-8">
          <div className="text-center mb-6">
            <CheckCircle2 className="w-16 h-16 text-green-600 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">🎉 Congratulations!</h2>
            <p className="text-gray-600">You have successfully registered for your workshops.</p>
            <p className="text-sm text-gray-500 mt-2">
              Registered on: {new Date(selection.updatedAt || selection.createdAt).toLocaleString()}
            </p>
          </div>
          
          <div className="bg-green-50 border border-green-200 rounded-lg p-6">
            <h3 className="font-semibold text-gray-900 mb-4">Your Selected Workshops:</h3>
            <div className="space-y-3">
              {selectedWorkshops.map(workshop => (
                <div key={workshop.code} className="bg-white p-4 rounded-lg border border-gray-200">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="font-medium text-gray-900">{workshop.title}</div>
                      <div className="text-sm text-gray-600 mt-1">
                        <span className="font-medium">Day {workshop.day}</span> • {workshop.time} • {workshop.venue}
                      </div>
                    </div>
                    <CheckCircle2 className="w-5 h-5 text-green-600 mt-1" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-sm text-blue-800">
              ℹ️ A confirmation email has been sent to <strong>{email}</strong> with your workshop details.
            </p>
          </div>
        </div>
      </Card>
    )
  }

  const Title = () => {
    // Instructions based on ticket type
    const getInstructions = () => {
      if (ticketType === "Standard+2") {
        return {
          title: "TSU Workshops (Standard Plus 2)",
          items: [
            "✅ You are registered under Standard Plus 2 (TSU).",
            "All your workshops will be available at TSU",
            "You must choose 2 workshops total — 1 on Day 1 and 1 on Day 2.",
            "You cannot select two workshops on the same day.",
            "Workshops marked as FULL are unavailable and cannot be selected",
            "Workshops with Limited seats (≤5 remaining) may fill up quickly",
            "Seats are reserved in real-time when you submit your selection"
          ]
        }
      } else if (ticketType === "Standard+3") {
        return {
          title: "NVU Workshops (Standard Plus 3)",
          items: [
            "✅ You are registered under Standard Plus 3.",
            "All your workshops will be available at NVU",
            "You must choose 3 workshops total — 1 or 2 on Day 1 and 1 or 2 on Day 2. (Total of 3 workshops)",
            "You cannot select two workshops during same time slot.",
            "Workshops marked as FULL are unavailable and cannot be selected",
            "Certain workshops are linked (mutually exclusive), you can only pick one from each linked pair.",
            "Workshops with Limited seats (≤5 remaining) may fill up quickly",
            "Seats are reserved in real-time when you submit your selection"
          ]
        }
      } else if (ticketType === "Standard+4") {
        return {
          title: "NVU Workshops (Standard Plus 4)",
          items: [
            "✅ You are registered under Standard Plus 4.",
            "All your workshops will be available at NVU",
            "You must choose 3 workshops total — 1 or 2 on Day 1 and 1 or 2 on Day 2. (Total of 3 workshops)",
            "You cannot select two workshops during same time slot.",
            "Workshops marked as FULL are unavailable and cannot be selected",
            "Certain workshops are linked (mutually exclusive), you can only pick one from each linked pair.",
            "Workshops with Limited seats (≤5 remaining) may fill up quickly",
            "Seats are reserved in real-time when you submit your selection"
          ]
        }
      }
      return { title: "Workshop Selection", items: [] }
    }

    const instructions = getInstructions()

    return (
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900">{instructions.title}</h2>
        
        {/* Instructions Box */}
        <div className="mt-4 bg-blue-50 border border-blue-200 rounded-lg p-5">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
            <div className="flex-1">
              <h4 className="text-sm font-semibold text-blue-900 mb-3">Instructions for Attendees</h4>
              <ul className="text-sm text-blue-800 space-y-2">
                {instructions.items.map((item, index) => (
                  <li key={index} className={index === 0 ? "font-semibold" : ""}>
                    {item.startsWith('✅') ? item : `• ${item}`}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    )
  }

  const SessionCheckbox = ({ s }) => {
    const full = s.reserved >= s.capacity
    const checked = chosen.has(s.code)
    const seatsLeft = Math.max(0, s.capacity - s.reserved)
    const isAlmostFull = seatsLeft <= 5 && seatsLeft > 0
    
    return (
      <label className={`flex items-center gap-3 p-3 rounded-lg border transition-all ${
        full ? "border-red-300 bg-red-50 cursor-not-allowed opacity-60" : 
        checked ? "border-blue-500 bg-blue-50" : 
        "border-gray-200 bg-white hover:border-gray-300"
      }`}>
        <input 
          type="checkbox" 
          disabled={full && !checked} 
          checked={checked} 
          onChange={() => toggle(s.code, s)} 
          className="w-4 h-4"
        />
        <div className="flex-1">
          <div className="font-medium text-gray-900">{s.title}</div>
          <div className="text-xs text-gray-600 flex items-center gap-2 mt-1">
            <Clock className="w-4 h-4" /> {s.time}
            <Users className={`w-4 h-4 ml-2 ${isAlmostFull ? 'text-orange-600' : ''}`} /> 
            <span className={isAlmostFull ? 'text-orange-600 font-medium' : ''}>
              {seatsLeft} seat{seatsLeft !== 1 ? 's' : ''} left
            </span>
            {s.linkedGroup && venue === "NVU" && <span className="ml-2 text-amber-700 text-xs">Linked group</span>}
          </div>
        </div>
        {full && (
          <span className="text-xs text-red-600 flex items-center gap-1 font-medium">
            <Lock className="w-4 h-4" /> FULL
          </span>
        )}
        {isAlmostFull && !full && !checked && (
          <span className="text-xs text-orange-600 flex items-center gap-1 font-medium">
            <AlertTriangle className="w-4 h-4" /> Limited
          </span>
        )}
      </label>
    )
  }

  const DayBlock = ({ label, slots }) => (
    <div>
      <h3 className="text-lg font-semibold text-gray-900 mb-3">{label}</h3>
      <div className="grid md:grid-cols-2 gap-4">
        {Object.entries(slots).map(([slot, list]) => (
          <div key={slot} className="p-4 bg-gray-50 rounded-xl border border-gray-200">
            <div className="text-sm font-medium text-gray-700 mb-2">Slot {slot}</div>
            <div className="space-y-2">
              {list.map(s => <SessionCheckbox key={s.code} s={s} />)}
            </div>
          </div>
        ))}
      </div>
    </div>
  )

  return (
    <div className="space-y-6">
      <Card>
        <div className="p-6">
          <Title />
          {venue === "TSU" ? (
            <div className="space-y-8">
              <DayBlock label="Day 1 — Select One" slots={grouped.day1} />
              <DayBlock label="Day 2 — Select One" slots={grouped.day2} />
            </div>
          ) : (
            <div className="space-y-8">
              <DayBlock label="Day 1 — Workshop Selection" slots={grouped.day1} />
              <DayBlock label="Day 2 — Workshop Selection" slots={grouped.day2} />
            </div>
          )}

          <div className="pt-6 flex items-center gap-3">
            <button
              onClick={handleSubmit}
              disabled={submitting}
              className="px-6 py-3 rounded-lg bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {submitting ? "Submitting..." : "Submit My Workshops"}
            </button>
            {selection && (
              <span className="text-green-700 text-sm flex items-center gap-1">
                <CheckCircle2 className="w-4 h-4" /> Saved on {new Date(selection.updatedAt || selection.createdAt).toLocaleString()}
              </span>
            )}
          </div>
          <div className="mt-4 text-xs text-gray-600 flex items-center gap-2">
            <AlertTriangle className="w-4 h-4" /> Once a session is full, it will be marked as “Full.”
          </div>
        </div>
      </Card>
    </div>
  )
}


