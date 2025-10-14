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

  const grouped = useMemo(() => {
    const g = { day1: { A: [], B: [] }, day2: { C: [], D: [] } }
    for (const s of sessions) {
      if (s.day === 1) {
        if (s.slot === "A") g.day1.A.push(s)
        if (s.slot === "B") g.day1.B.push(s)
      } else if (s.day === 2) {
        if (s.slot === "C") g.day2.C.push(s)
        if (s.slot === "D") g.day2.D.push(s)
      }
    }
    return g
  }, [sessions])

  const [chosen, setChosen] = useState(new Set())
  useEffect(() => {
    // initialize from existing selection
    if (selection?.selections?.length) setChosen(new Set(selection.selections))
  }, [selection])

  const toggle = (code, s) => {
    // slot conflict: only one per slot per day
    const slotKey = `${s.day}-${s.slot}`
    const inSameSlot = sessions.filter(x => chosen.has(x.code) && `${x.day}-${x.slot}` === slotKey)
    if (inSameSlot.length && !chosen.has(code)) {
      alert("You’ve already chosen a workshop in this time slot.")
      return
    }

    // linked mutual exclusion (NVU)
    if (venue === "NVU" && s.linkedGroup) {
      const inLinked = sessions.filter(x => chosen.has(x.code) && x.linkedGroup && x.linkedGroup === s.linkedGroup)
      if (inLinked.length && !chosen.has(code)) {
        alert("This session is linked with another — please select only one.")
        return
      }
    }

    const next = new Set(chosen)
    if (next.has(code)) next.delete(code)
    else {
      if (s.reserved >= s.capacity) {
        alert("Sorry, this session is full.")
        return
      }
      next.add(code)
    }
    setChosen(next)
  }

  const handleSubmit = async () => {
    // day counts
    let d1 = 0, d2 = 0
    for (const s of sessions) {
      if (chosen.has(s.code)) {
        if (s.day === 1) d1++
        else if (s.day === 2) d2++
      }
    }

    if (ticketType === "Standard+2") {
      if (!(d1 === 1 && d2 === 1)) {
        alert("Please ensure you have selected 1 workshop on each day before submitting.")
        return
      }
    } else if (ticketType === "Standard+3") {
      const total = d1 + d2
      if (!(total === 3 && d1 >= 1 && d2 >= 1 && d1 <= 2 && d2 <= 2)) {
        alert("Please ensure you’ve selected a minimum of one workshop per day.")
        return
      }
    } else if (ticketType === "Standard+4") {
      if (!(d1 === 2 && d2 === 2)) {
        alert("You must select two workshops per day.")
        return
      }
    } else {
      alert("Workshops are available only for Standard+2/3/4 tickets.")
      return
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

  const Title = () => (
    <div className="mb-6">
      <h2 className="text-2xl font-bold text-gray-900">{venue === "TSU" ? "TSU Workshops (Standard Plus 2)" : "NVU Workshops (Standard Plus 3 & 4)"}</h2>
      <p className="text-gray-600 mt-1">
        {venue === "TSU"
          ? "Choose 2 workshops total — 1 on Day 1 and 1 on Day 2."
          : ticketType === "Standard+3"
            ? "Select 3 total (1–2 per day)."
            : "Select 4 total (exactly 2 per day)."}
      </p>
    </div>
  )

  const SessionCheckbox = ({ s }) => {
    const full = s.reserved >= s.capacity
    const checked = chosen.has(s.code)
    return (
      <label className={`flex items-center gap-3 p-3 rounded-lg border ${checked ? "border-blue-500 bg-blue-50" : "border-gray-200 bg-white"} ${full ? "opacity-50" : ""}`}>
        <input type="checkbox" disabled={full} checked={checked} onChange={() => toggle(s.code, s)} />
        <div className="flex-1">
          <div className="font-medium text-gray-900">{s.title}</div>
          <div className="text-xs text-gray-600 flex items-center gap-2">
            <Clock className="w-4 h-4" /> {s.time}
            <Users className="w-4 h-4 ml-2" /> {Math.max(0, s.capacity - s.reserved)} seats left
            {s.linkedGroup && venue === "NVU" && <span className="ml-2 text-amber-700 text-xs">Linked group</span>}
          </div>
        </div>
        {full && <span className="text-xs text-red-600 flex items-center gap-1"><Lock className="w-3 h-3" /> Full</span>}
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


