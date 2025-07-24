"use client"

import { useState, useEffect, useMemo } from "react"
import axios from "axios"
import {
  Download,
  User,
  FileText,
  AlertCircle,
  Loader2,
  ChevronDown,
  ChevronRight,
  Search,
  Filter,
  BookOpen,
  Eye,
} from "lucide-react"

const TICKET_TYPES = ["All", "Individual", "Group", "International", "Doctor", "TSU", "TSU All Inclusive"]
const PAYMENT_STATUSES = ["All", "pending", "completed"]
const ABSTRACT_CATEGORIES = [
  "All",
  "Literature Review",
  "Case Presentation",
  "Oral Presentation",
  "Poster Presentation",
  "Research Study",
  "Clinical Trial",
  "Other",
]

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("tickets")

  // Tickets state
  const [tickets, setTickets] = useState([])
  const [ticketsLoading, setTicketsLoading] = useState(true)
  const [ticketsError, setTicketsError] = useState(null)
  const [approvingTickets, setApprovingTickets] = useState(new Set())
  const [expandedGroups, setExpandedGroups] = useState(new Set())
  const [expandedTickets, setExpandedTickets] = useState(new Set())

  // Abstracts state
  const [abstracts, setAbstracts] = useState([])
  const [abstractsLoading, setAbstractsLoading] = useState(true)
  const [abstractsError, setAbstractsError] = useState(null)
  const [expandedAbstracts, setExpandedAbstracts] = useState(new Set())

  // Filter states for tickets
  const [ticketTypeFilter, setTicketTypeFilter] = useState("All")
  const [paymentStatusFilter, setPaymentStatusFilter] = useState("All")
  const [ticketSearchQuery, setTicketSearchQuery] = useState("")

  // Filter states for abstracts
  const [abstractCategoryFilter, setAbstractCategoryFilter] = useState("All")
  const [abstractSearchQuery, setAbstractSearchQuery] = useState("")

  useEffect(() => {
    if (activeTab === "tickets") {
      fetchTickets()
    } else if (activeTab === "abstracts") {
      fetchAbstracts()
    }
  }, [activeTab])

  // Filtered tickets
  const filteredTickets = useMemo(() => {
    return tickets.filter((ticket) => {
      if (ticketTypeFilter !== "All" && ticket.ticketType !== ticketTypeFilter) {
        return false
      }
      if (paymentStatusFilter !== "All" && ticket.paymentStatus !== paymentStatusFilter) {
        return false
      }
      if (ticketSearchQuery.trim()) {
        const query = ticketSearchQuery.toLowerCase()
        const matchesName = ticket.fullName?.toLowerCase().includes(query)
        const matchesEmail = ticket.email?.toLowerCase().includes(query)
        if (!matchesName && !matchesEmail) {
          return false
        }
      }
      return true
    })
  }, [tickets, ticketTypeFilter, paymentStatusFilter, ticketSearchQuery])

  // Filtered abstracts
  const filteredAbstracts = useMemo(() => {
    return abstracts.filter((abstract) => {
      if (abstractCategoryFilter !== "All" && abstract.category !== abstractCategoryFilter) {
        return false
      }
      if (abstractSearchQuery.trim()) {
        const query = abstractSearchQuery.toLowerCase()
        const matchesTitle = abstract.title?.toLowerCase().includes(query)
        const matchesName = abstract.fullName?.toLowerCase().includes(query)
        const matchesEmail = abstract.email?.toLowerCase().includes(query)
        const matchesAuthors = abstract.authors?.toLowerCase().includes(query)
        if (!matchesTitle && !matchesName && !matchesEmail && !matchesAuthors) {
          return false
        }
      }
      return true
    })
  }, [abstracts, abstractCategoryFilter, abstractSearchQuery])

  const fetchTickets = async () => {
    try {
      setTicketsLoading(true)
      setTicketsError(null)
      const response = await axios.get("https://gimsoc-backend.onrender.com/api/admin/getalltickets", { withCredentials: true })
      console.log("Fetched tickets:", response.data)
      setTickets(response.data)
    } catch (err) {
      console.error("Error fetching tickets:", err)
      setTicketsError(err.response?.data?.message || err.message || "Failed to fetch tickets.")
    } finally {
      setTicketsLoading(false)
    }
  }

  const fetchAbstracts = async () => {
    try {
      setAbstractsLoading(true)
      setAbstractsError(null)
      const response = await axios.get("https://gimsoc-backend.onrender.com/api/admin/getallabstracts", { withCredentials: true })
      setAbstracts(response.data)
    } catch (err) {
      console.error("Error fetching abstracts:", err)
      setAbstractsError(err.response?.data?.message || err.message || "Failed to fetch abstracts.")
    } finally {
      setAbstractsLoading(false)
    }
  }

  const approveTicket = async (ticketId) => {
    try {
      setApprovingTickets((prev) => new Set([...prev, ticketId]))
      await axios.patch(
        `https://gimsoc-backend.onrender.com/api/admin/approveticket/${ticketId}`,
        { paymentStatus: "completed" },
        { withCredentials: true },
      )
      setTickets((prevTickets) =>
        prevTickets.map((ticket) => (ticket._id === ticketId ? { ...ticket, paymentStatus: "completed" } : ticket)),
      )
      alert("Ticket approved successfully! Email sent to the user.")
    } catch (err) {
      console.error("Error approving ticket:", err)
      alert("Failed to approve ticket. Please try again.")
    } finally {
      setApprovingTickets((prev) => {
        const newSet = new Set(prev)
        newSet.delete(ticketId)
        return newSet
      })
    }
  }

  const rejectTicket = async (ticketId) => {
    try {
      setApprovingTickets((prev) => new Set([...prev, ticketId]))
      await axios.patch(
        `https://gimsoc-backend.onrender.com/api/admin/approveticket/${ticketId}`,
        { paymentStatus: "rejected" },
        { withCredentials: true },
      )
      setTickets((prevTickets) =>
        prevTickets.map((ticket) => (ticket._id === ticketId ? { ...ticket, paymentStatus: "rejected" } : ticket)),
      )
      alert("Ticket rejected successfully! Email sent to the user.")
    } catch (err) {
      console.error("Error rejecting ticket:", err)
      alert("Failed to reject ticket. Please try again.")
    } finally {
      setApprovingTickets((prev) => {
        const newSet = new Set(prev)
        newSet.delete(ticketId)
        return newSet
      })
    }
  }

  const toggleGroupExpansion = (ticketId) => {
    setExpandedGroups((prev) => {
      const newSet = new Set(prev)
      if (newSet.has(ticketId)) {
        newSet.delete(ticketId)
      } else {
        newSet.add(ticketId)
      }
      return newSet
    })
  }

  const toggleTicketDetails = (ticketId) => {
    setExpandedTickets((prev) => {
      const newSet = new Set(prev)
      if (newSet.has(ticketId)) {
        newSet.delete(ticketId)
      } else {
        newSet.add(ticketId)
      }
      return newSet
    })
  }

  const toggleAbstractExpansion = (abstractId) => {
    setExpandedAbstracts((prev) => {
      const newSet = new Set(prev)
      if (newSet.has(abstractId)) {
        newSet.delete(abstractId)
      } else {
        newSet.add(abstractId)
      }
      return newSet
    })
  }

  const handleDownload = async (url, filename) => {
    try {
      console.log("Attempting to download:", url)
      
      // For Cloudinary URLs, we can directly download
      if (url.includes("cloudinary.com") || url.includes("res.cloudinary.com")) {
        console.log("Detected Cloudinary URL, downloading directly...")
        const link = document.createElement("a")
        link.href = url
        link.download = filename || "download"
        link.target = "_blank"
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
        return
      }

      // For external URLs (like other cloud services), we can directly download
      if (url.startsWith("http") && !url.includes("gimsoc-backend.onrender.com")) {
        console.log("Detected external URL, downloading directly...")
        const link = document.createElement("a")
        link.href = url
        link.download = filename || "download"
        link.target = "_blank"
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
        return
      }

      // For backend URLs, check if the file actually exists locally
      if (url.includes("gimsoc-backend.onrender.com")) {
        console.log("Detected backend URL, checking if file exists locally...")
        
        // Extract the filename from the URL
        const urlParts = url.split('/')
        const originalFilename = urlParts[urlParts.length - 1]
        
        // Try the download endpoint first
        try {
          const downloadUrl = `https://gimsoc-backend.onrender.com/api/admin/download/${originalFilename}`
          console.log("Trying download endpoint:", downloadUrl)
          
          const response = await axios.get(downloadUrl, {
            responseType: "blob",
            withCredentials: true,
            headers: {
              'Accept': 'application/octet-stream',
            }
          })
          
          const blobUrl = window.URL.createObjectURL(response.data)
          const link = document.createElement("a")
          link.href = blobUrl
          link.download = filename || originalFilename
          document.body.appendChild(link)
          link.click()
          document.body.removeChild(link)
          window.URL.revokeObjectURL(blobUrl)
          return
        } catch (downloadError) {
          console.log("Download endpoint failed, trying direct URL...")
          
          // Fallback: try direct URL access
          const response = await axios.get(url, {
            responseType: "blob",
            withCredentials: true,
          })
          
          const blobUrl = window.URL.createObjectURL(response.data)
          const link = document.createElement("a")
          link.href = blobUrl
          link.download = filename || originalFilename
          document.body.appendChild(link)
          link.click()
          document.body.removeChild(link)
          window.URL.revokeObjectURL(blobUrl)
        }
      }
    } catch (err) {
      console.error("Download failed:", err)
      console.error("Error details:", err.response?.data || err.message)
      alert("Download failed. Please try again.")
    }
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const clearTicketFilters = () => {
    setTicketTypeFilter("All")
    setPaymentStatusFilter("All")
    setTicketSearchQuery("")
  }

  const clearAbstractFilters = () => {
    setAbstractCategoryFilter("All")
    setAbstractSearchQuery("")
  }

  const renderTicketsTab = () => {
    if (ticketsLoading) {
      return (
        <div className="flex items-center justify-center py-12">
          <div className="text-center">
            <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-gray-600" />
            <p className="text-gray-600">Loading tickets...</p>
          </div>
        </div>
      )
    }

    if (ticketsError) {
      return (
        <div className="flex items-center justify-center py-12">
          <div className="text-center max-w-md mx-auto p-6 bg-white rounded-lg shadow-sm border border-gray-200">
            <AlertCircle className="h-8 w-8 mx-auto mb-4 text-red-500" />
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Error Loading Tickets</h2>
            <p className="text-red-600 mb-6 text-sm">{ticketsError}</p>
            <button
              onClick={fetchTickets}
              className="px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      )
    }

    return (
      <>
        {/* Tickets Filter Bar */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex items-center gap-2 mb-4">
            <Filter className="h-5 w-5 text-gray-500" />
            <h3 className="text-lg font-medium text-gray-900">Filters</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Ticket Type</label>
              <select
                value={ticketTypeFilter}
                onChange={(e) => setTicketTypeFilter(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-gray-500"
              >
                {TICKET_TYPES.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Payment Status</label>
              <select
                value={paymentStatusFilter}
                onChange={(e) => setPaymentStatusFilter(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-gray-500"
              >
                {PAYMENT_STATUSES.map((status) => (
                  <option key={status} value={status}>
                    {status === "All" ? "All" : status.charAt(0).toUpperCase() + status.slice(1)}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Search</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search by name or email..."
                  value={ticketSearchQuery}
                  onChange={(e) => setTicketSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-gray-500"
                />
              </div>
            </div>
          </div>

          {(ticketTypeFilter !== "All" || paymentStatusFilter !== "All" || ticketSearchQuery.trim()) && (
            <div className="mt-4 pt-4 border-t border-gray-200">
              <button onClick={clearTicketFilters} className="text-sm text-gray-600 hover:text-gray-900 underline">
                Clear all filters
              </button>
            </div>
          )}
        </div>

        {/* Desktop Tickets Table */}
        <div className="hidden lg:block bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Participant
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Ticket Details
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Payment Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Headshot
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Payment Proof
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Details
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredTickets.map((ticket) => (
                  <>
                    <tr key={ticket._id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          {ticket.ticketType === "Group" && ticket.attendees && (
                            <button
                              onClick={() => toggleGroupExpansion(ticket._id)}
                              className="p-1 hover:bg-gray-100 rounded"
                            >
                              {expandedGroups.has(ticket._id) ? (
                                <ChevronDown className="h-4 w-4 text-gray-500" />
                              ) : (
                                <ChevronRight className="h-4 w-4 text-gray-500" />
                              )}
                            </button>
                          )}
                          <div>
                            <div className="text-sm font-medium text-gray-900">{ticket.fullName}</div>
                            <div className="text-sm text-gray-500">{ticket.email}</div>
                            {ticket.ticketType === "Group" && ticket.attendees && (
                              <div className="text-xs text-gray-400 mt-1">
                                Group Leader • {ticket.attendees.length} attendees
                              </div>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-medium text-gray-900">{ticket.ticketType}</div>
                          <div className="text-sm text-gray-500">
                            {ticket.subType && `${ticket.subType} • `}{ticket.workshopPackage}
                          </div>
                          {ticket.ticketCategory && (
                            <div className="text-xs text-gray-400">{ticket.ticketCategory}</div>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <span
                            className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                              ticket.paymentStatus === "completed"
                                ? "bg-green-100 text-green-800"
                                : ticket.paymentStatus === "rejected"
                                ? "bg-red-100 text-red-800"
                                : "bg-yellow-100 text-yellow-800"
                            }`}
                          >
                            {ticket.paymentStatus || "pending"}
                          </span>
                          {(!ticket.paymentStatus || ticket.paymentStatus === "pending") && (
                            <>
                            <button
                              onClick={() => approveTicket(ticket._id)}
                              disabled={approvingTickets.has(ticket._id)}
                              className="px-2 py-1 text-xs bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                              {approvingTickets.has(ticket._id) ? "Approving..." : "Approve"}
                            </button>
                              <button
                                onClick={() => rejectTicket(ticket._id)}
                                disabled={approvingTickets.has(ticket._id)}
                                className="px-2 py-1 text-xs bg-red-600 text-white rounded hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed ml-2"
                              >
                                {approvingTickets.has(ticket._id) ? "Rejecting..." : "Reject"}
                              </button>
                            </>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {ticket.headshotUrl ? (
                          <div className="flex items-center gap-2">
                            <img
                              src={
                                ticket.headshotUrl?.startsWith("http")
                                  ? ticket.headshotUrl
                                  : `${import.meta.env.VITE_SERVER_URL || "https://gimsoc-backend.onrender.com"}/uploads/${ticket.headshotUrl.replace(/^\/?uploads\//, "")}`
                              }
                              alt="Headshot"
                              className="h-10 w-10 rounded-full object-cover border border-gray-200"
                            />
                            {console.log("Headshot URL for", ticket.fullName, ":", ticket.headshotUrl)}
                            <button
                              onClick={() => {
                                const downloadUrl = ticket.headshotUrl?.startsWith("http")
                                  ? ticket.headshotUrl + (ticket.headshotUrl.includes("cloudinary.com") ? "?fl_attachment" : "")
                                  : `${import.meta.env.VITE_SERVER_URL || "https://gimsoc-backend.onrender.com"}/uploads/${ticket.headshotUrl}`
                                console.log("Download button clicked for", ticket.fullName, "URL:", downloadUrl)
                                handleDownload(downloadUrl, `headshot-${ticket.fullName}.png`)
                              }}
                              className="p-1 text-gray-400 hover:text-gray-600"
                              title="Download headshot"
                            >
                              <Download className="h-4 w-4" />
                            </button>
                          </div>
                        ) : (
                          <span className="text-gray-400 text-sm">No image</span>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {ticket.paymentProofUrl ? (
                          <button
                            onClick={() =>
                                                      handleDownload(
                          ticket.paymentProofUrl?.startsWith("http")
                            ? ticket.paymentProofUrl + (ticket.paymentProofUrl.includes("cloudinary.com") ? "?fl_attachment" : "")
                            : `${import.meta.env.VITE_SERVER_URL || "https://gimsoc-backend.onrender.com"}/uploads/${ticket.paymentProofUrl}`,
                          `payment-${ticket.fullName}.pdf`
                        )
                            }
                            className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900"
                          >
                            <FileText className="h-4 w-4" />
                            Download
                          </button>
                        ) : (
                          <span className="text-gray-400 text-sm">No file</span>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {formatDate(ticket.createdAt)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <button
                          onClick={() => toggleTicketDetails(ticket._id)}
                          className="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-800"
                        >
                          {expandedTickets.has(ticket._id) ? (
                            <ChevronDown className="h-4 w-4" />
                          ) : (
                            <ChevronRight className="h-4 w-4" />
                          )}
                          Details
                        </button>
                      </td>
                    </tr>

                    {ticket.ticketType === "Group" && ticket.attendees && expandedGroups.has(ticket._id) && (
                      <tr>
                        <td colSpan="6" className="px-6 py-4 bg-gray-50">
                          <div className="ml-6">
                            <h4 className="text-sm font-medium text-gray-900 mb-3">Group Attendees</h4>
                            <div className="bg-white rounded border border-gray-200 overflow-hidden">
                              <table className="min-w-full">
                                <thead className="bg-gray-100">
                                  <tr>
                                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                                      Name
                                    </th>
                                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                                      Email
                                    </th>
                                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                                      Headshot
                                    </th>
                                  </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                  {ticket.attendees.map((attendee, index) => (
                                    <tr key={index} className="hover:bg-gray-50">
                                      <td className="px-4 py-2 text-sm text-gray-900">{attendee.name}</td>
                                      <td className="px-4 py-2 text-sm text-gray-500">{attendee.email}</td>
                                      <td className="px-4 py-2">
                                        {attendee.headshotUrl ? (
                                          <div className="flex items-center gap-2">
                                            <img
                                              src={
                                                attendee.headshotUrl?.startsWith("http")
                                                  ? attendee.headshotUrl
                                                  : `${import.meta.env.VITE_SERVER_URL || "https://gimsoc-backend.onrender.com"}/uploads/${attendee.headshotUrl.replace(/^\/?uploads\//, "")}`
                                              }
                                              alt="Attendee headshot"
                                              className="h-8 w-8 rounded-full object-cover border border-gray-200"
                                            />
                                            <button
                                              onClick={() =>
                                                handleDownload(
                                                  attendee.headshotUrl?.startsWith("http")
                                                    ? attendee.headshotUrl + (attendee.headshotUrl.includes("cloudinary.com") ? "?fl_attachment" : "")
                                                    : `${import.meta.env.VITE_SERVER_URL || "https://gimsoc-backend.onrender.com"}/uploads/${attendee.headshotUrl.replace(/^\/?uploads\//, "")}`,
                                                  `headshot-${attendee.name}.png`
                                                )
                                              }
                                              className="p-1 text-gray-400 hover:text-gray-600"
                                              title="Download headshot"
                                            >
                                              <Download className="h-3 w-3" />
                                            </button>
                                          </div>
                                        ) : (
                                          <span className="text-gray-400 text-xs">No image</span>
                                        )}
                                      </td>
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            </div>
                          </div>
                        </td>
                      </tr>
                    )}

                    {/* Expanded Ticket Details */}
                    {expandedTickets.has(ticket._id) && (
                      <tr>
                        <td colSpan="7" className="px-6 py-4 bg-gray-50">
                          <div className="ml-6">
                            <h4 className="text-sm font-medium text-gray-900 mb-3">Ticket Details</h4>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                              {/* Personal Information */}
                              <div className="bg-white rounded border border-gray-200 p-4">
                                <h5 className="text-xs font-medium text-gray-500 uppercase mb-2">Personal Information</h5>
                                <div className="space-y-1 text-sm">
                                  <div><span className="font-medium">Name:</span> {ticket.fullName}</div>
                                  <div><span className="font-medium">Email:</span> {ticket.email}</div>
                                  <div><span className="font-medium">WhatsApp:</span> {ticket.whatsapp || 'Not provided'}</div>
                                  <div><span className="font-medium">Dashboard Password:</span> {ticket.dashboardPassword || 'Not set'}</div>
                                  {ticket.nationality && <div><span className="font-medium">Nationality:</span> {ticket.nationality}</div>}
                                  {ticket.countryOfResidence && <div><span className="font-medium">Country of Residence:</span> {ticket.countryOfResidence}</div>}
                                  {ticket.passportNumber && <div><span className="font-medium">Passport Number:</span> {ticket.passportNumber}</div>}
                                  {ticket.needsVisaSupport && <div><span className="font-medium">Visa Support:</span> {ticket.needsVisaSupport}</div>}
                                </div>
                              </div>

                              {/* Academic/Professional Information */}
                              <div className="bg-white rounded border border-gray-200 p-4">
                                <h5 className="text-xs font-medium text-gray-500 uppercase mb-2">Academic/Professional</h5>
                                <div className="space-y-1 text-sm">
                                  {ticket.universityName && <div><span className="font-medium">University:</span> {ticket.universityName}</div>}
                                  {ticket.semester && <div><span className="font-medium">Semester:</span> {ticket.semester}</div>}
                                  {ticket.medicalQualification && <div><span className="font-medium">Qualification:</span> {ticket.medicalQualification}</div>}
                                  {ticket.specialty && <div><span className="font-medium">Specialty:</span> {ticket.specialty}</div>}
                                  {ticket.currentWorkplace && <div><span className="font-medium">Workplace:</span> {ticket.currentWorkplace}</div>}
                                  {ticket.countryOfPractice && <div><span className="font-medium">Country of Practice:</span> {ticket.countryOfPractice}</div>}
                                </div>
                              </div>

                              {/* Ticket Information */}
                              <div className="bg-white rounded border border-gray-200 p-4">
                                <h5 className="text-xs font-medium text-gray-500 uppercase mb-2">Ticket Information</h5>
                                <div className="space-y-1 text-sm">
                                  <div><span className="font-medium">Type:</span> {ticket.ticketType}</div>
                                  <div><span className="font-medium">Category:</span> {ticket.ticketCategory}</div>
                                  <div><span className="font-medium">Sub Type:</span> {ticket.subType}</div>
                                  <div><span className="font-medium">Workshop Package:</span> {ticket.workshopPackage}</div>
                                  {ticket.isTsuStudent && <div><span className="font-medium">TSU Student:</span> Yes</div>}
                                  {ticket.tsuEmail && <div><span className="font-medium">TSU Email:</span> {ticket.tsuEmail}</div>}
                                  {ticket.isGimsocMember && <div><span className="font-medium">GIMSOC Member:</span> Yes</div>}
                                  {ticket.membershipCode && <div><span className="font-medium">Membership Code:</span> {ticket.membershipCode}</div>}
                                </div>
                              </div>

                              {/* Preferences */}
                              <div className="bg-white rounded border border-gray-200 p-4">
                                <h5 className="text-xs font-medium text-gray-500 uppercase mb-2">Preferences</h5>
                                <div className="space-y-1 text-sm">
                                  {ticket.foodPreference && <div><span className="font-medium">Food Preference:</span> {ticket.foodPreference}</div>}
                                  {ticket.dietaryRestrictions && <div><span className="font-medium">Dietary Restrictions:</span> {ticket.dietaryRestrictions}</div>}
                                  {ticket.accessibilityNeeds && <div><span className="font-medium">Accessibility Needs:</span> {ticket.accessibilityNeeds}</div>}
                                  {ticket.paymentMethod && <div><span className="font-medium">Payment Method:</span> {ticket.paymentMethod}</div>}
                                </div>
                              </div>

                              {/* Emergency Contact */}
                              <div className="bg-white rounded border border-gray-200 p-4">
                                <h5 className="text-xs font-medium text-gray-500 uppercase mb-2">Emergency Contact</h5>
                                <div className="space-y-1 text-sm">
                                  {ticket.emergencyContactName && <div><span className="font-medium">Name:</span> {ticket.emergencyContactName}</div>}
                                  {ticket.emergencyContactRelationship && <div><span className="font-medium">Relationship:</span> {ticket.emergencyContactRelationship}</div>}
                                  {ticket.emergencyContactPhone && <div><span className="font-medium">Phone:</span> {ticket.emergencyContactPhone}</div>}
                                </div>
                              </div>

                              {/* Consent Information */}
                              <div className="bg-white rounded border border-gray-200 p-4">
                                <h5 className="text-xs font-medium text-gray-500 uppercase mb-2">Consent</h5>
                                <div className="space-y-1 text-sm">
                                  <div><span className="font-medium">Info Accurate:</span> {ticket.infoAccurate ? 'Yes' : 'No'}</div>
                                  <div><span className="font-medium">Media Consent:</span> {ticket.mediaConsent ? 'Yes' : 'No'}</div>
                                  <div><span className="font-medium">Policies:</span> {ticket.policies ? 'Yes' : 'No'}</div>
                                  <div><span className="font-medium">Email Consent:</span> {ticket.emailConsent ? 'Yes' : 'No'}</div>
                                  <div><span className="font-medium">WhatsApp Consent:</span> {ticket.whatsappConsent ? 'Yes' : 'No'}</div>
                                  <div><span className="font-medium">Discount Confirmation:</span> {ticket.discountConfirmation ? 'Yes' : 'No'}</div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </td>
                      </tr>
                    )}
                  </>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Mobile Tickets Cards */}
        <div className="lg:hidden space-y-4">
          {filteredTickets.map((ticket) => (
            <div key={ticket._id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  {ticket.headshotUrl ? (
                    <img
                      src={ticket.headshotUrl || "/placeholder.svg"}
                      alt="Headshot"
                      className="h-12 w-12 rounded-full object-cover border border-gray-200"
                    />
                  ) : (
                    <div className="h-12 w-12 rounded-full bg-gray-100 flex items-center justify-center">
                      <User className="h-6 w-6 text-gray-400" />
                    </div>
                  )}
                  <div>
                    <h3 className="font-medium text-gray-900">{ticket.fullName}</h3>
                    <p className="text-sm text-gray-500">{ticket.email}</p>
                    {ticket.ticketType === "Group" && ticket.attendees && (
                      <p className="text-xs text-gray-400 mt-1">Group Leader • {ticket.attendees.length} attendees</p>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span
                    className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      ticket.paymentStatus === "completed"
                        ? "bg-green-100 text-green-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {ticket.paymentStatus || "pending"}
                  </span>
                  {(!ticket.paymentStatus || ticket.paymentStatus === "pending") && (
                    <>
                    <button
                      onClick={() => approveTicket(ticket._id)}
                      disabled={approvingTickets.has(ticket._id)}
                      className="px-2 py-1 text-xs bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {approvingTickets.has(ticket._id) ? "Approving..." : "Approve"}
                    </button>
                      <button
                        onClick={() => rejectTicket(ticket._id)}
                        disabled={approvingTickets.has(ticket._id)}
                        className="px-2 py-1 text-xs bg-red-600 text-white rounded hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed ml-2"
                      >
                        {approvingTickets.has(ticket._id) ? "Rejecting..." : "Reject"}
                      </button>
                    </>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">Ticket Type</p>
                  <p className="text-sm text-gray-900 mt-1">{ticket.ticketType}</p>
                </div>
                <div>
                  <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">Workshop</p>
                  <p className="text-sm text-gray-900 mt-1">{ticket.workshopPackage}</p>
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                <div className="flex items-center gap-4">
                  {ticket.headshotUrl && (
                    <button
                      onClick={() =>
                        handleDownload(
                          ticket.headshotUrl?.startsWith("http")
                            ? ticket.headshotUrl + (ticket.headshotUrl.includes("cloudinary.com") ? "?fl_attachment" : "")
                            : `${import.meta.env.VITE_SERVER_URL || "https://gimsoc-backend.onrender.com"}/uploads/${ticket.headshotUrl}`,
                          `headshot-${ticket.fullName}.png`
                        )
                      }
                      className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900"
                    >
                      <Download className="h-4 w-4" />
                      Headshot
                    </button>
                  )}
                  {ticket.paymentProofUrl && (
                    <button
                      onClick={() =>
                        handleDownload(
                          ticket.paymentProofUrl?.startsWith("http")
                            ? ticket.paymentProofUrl + (ticket.paymentProofUrl.includes("cloudinary.com") ? "?fl_attachment" : "")
                            : `${import.meta.env.VITE_SERVER_URL || "https://gimsoc-backend.onrender.com"}/uploads/${ticket.paymentProofUrl}`,
                          `payment-${ticket.fullName}.pdf`
                        )
                      }
                      className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900"
                    >
                      <FileText className="h-4 w-4" />
                      Payment
                    </button>
                  )}
                </div>
                <p className="text-xs text-gray-500">{formatDate(ticket.createdAt)}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State for Tickets */}
        {filteredTickets.length === 0 && tickets.length > 0 && (
          <div className="text-center py-12">
            <Search className="h-12 w-12 mx-auto text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No tickets match your filters</h3>
            <p className="text-gray-500 mb-4">Try adjusting your search criteria or clearing the filters.</p>
            <button
              onClick={clearTicketFilters}
              className="px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors"
            >
              Clear Filters
            </button>
          </div>
        )}

        {filteredTickets.length === 0 && tickets.length === 0 && (
          <div className="text-center py-12">
            <User className="h-12 w-12 mx-auto text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No tickets found</h3>
            <p className="text-gray-500">There are no booked tickets to display.</p>
          </div>
        )}
      </>
    )
  }

  const renderAbstractsTab = () => {
    if (abstractsLoading) {
      return (
        <div className="flex items-center justify-center py-12">
          <div className="text-center">
            <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-gray-600" />
            <p className="text-gray-600">Loading abstracts...</p>
          </div>
        </div>
      )
    }

    if (abstractsError) {
      return (
        <div className="flex items-center justify-center py-12">
          <div className="text-center max-w-md mx-auto p-6 bg-white rounded-lg shadow-sm border border-gray-200">
            <AlertCircle className="h-8 w-8 mx-auto mb-4 text-red-500" />
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Error Loading Abstracts</h2>
            <p className="text-red-600 mb-6 text-sm">{abstractsError}</p>
            <button
              onClick={fetchAbstracts}
              className="px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      )
    }

    return (
      <>
        {/* Abstracts Filter Bar */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex items-center gap-2 mb-4">
            <Filter className="h-5 w-5 text-gray-500" />
            <h3 className="text-lg font-medium text-gray-900">Filters</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
              <select
                value={abstractCategoryFilter}
                onChange={(e) => setAbstractCategoryFilter(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-gray-500"
              >
                {ABSTRACT_CATEGORIES.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Search</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search by title, author, or email..."
                  value={abstractSearchQuery}
                  onChange={(e) => setAbstractSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-gray-500"
                />
              </div>
            </div>
          </div>

          {(abstractCategoryFilter !== "All" || abstractSearchQuery.trim()) && (
            <div className="mt-4 pt-4 border-t border-gray-200">
              <button onClick={clearAbstractFilters} className="text-sm text-gray-600 hover:text-gray-900 underline">
                Clear all filters
              </button>
            </div>
          )}
        </div>

        {/* Desktop Abstracts Table */}
        <div className="hidden lg:block bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Abstract Details
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Submitter
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Category
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Ticket Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Abstract File
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Submitted
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredAbstracts.map((abstract) => (
                  <>
                    <tr key={abstract._id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => toggleAbstractExpansion(abstract._id)}
                            className="p-1 hover:bg-gray-100 rounded"
                          >
                            {expandedAbstracts.has(abstract._id) ? (
                              <ChevronDown className="h-4 w-4 text-gray-500" />
                            ) : (
                              <ChevronRight className="h-4 w-4 text-gray-500" />
                            )}
                          </button>
                          <div>
                            <div className="text-sm font-medium text-gray-900 max-w-xs truncate" title={abstract.title}>
                              {abstract.title}
                            </div>
                            <div className="text-sm text-gray-500">Presenting: {abstract.presentingAuthor}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-medium text-gray-900">{abstract.fullName}</div>
                          <div className="text-sm text-gray-500">{abstract.email}</div>
                          <div className="text-sm text-gray-500">{abstract.whatsapp}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                          {abstract.category}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm text-gray-900">
                            {abstract.hasTicket === "Yes" ? "Has Ticket" : "No Ticket"}
                          </div>
                          {abstract.ticketId && <div className="text-xs text-gray-500">ID: {abstract.ticketId}</div>}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {abstract.abstractFileURL ? (
  <button
    onClick={() =>
      handleDownload(
        abstract.abstractFileURL,
        `abstract-${abstract.title.replace(/[^a-zA-Z0-9]/g, "_")}.pdf`,
      )
    }
                            className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900"
                          >
                            <FileText className="h-4 w-4" />
                            Download PDF
                          </button>
                        ) : (
                          <span className="text-gray-400 text-sm">No file</span>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {formatDate(abstract.createdAt)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <button
                          onClick={() => toggleAbstractExpansion(abstract._id)}
                          className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900"
                        >
                          <Eye className="h-4 w-4" />
                          View Details
                        </button>
                      </td>
                    </tr>

                    {/* Expandable Abstract Details */}
                    {expandedAbstracts.has(abstract._id) && (
                      <tr>
                        <td colSpan="7" className="px-6 py-4 bg-gray-50">
                          <div className="ml-6">
                            <h4 className="text-sm font-medium text-gray-900 mb-3">Abstract Details</h4>
                            <div className="bg-white rounded border border-gray-200 p-4 space-y-3">
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                  <h5 className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">
                                    Title
                                  </h5>
                                  <p className="text-sm text-gray-900">{abstract.title}</p>
                                </div>
                                <div>
                                  <h5 className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">
                                    Category
                                  </h5>
                                  <p className="text-sm text-gray-900">{abstract.category}</p>
                                </div>
                              </div>

                              <div>
                                <h5 className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">
                                  Authors
                                </h5>
                                <p className="text-sm text-gray-900 whitespace-pre-line">{abstract.authors}</p>
                              </div>

                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                  <h5 className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">
                                    Presenting Author
                                  </h5>
                                  <p className="text-sm text-gray-900">{abstract.presentingAuthor}</p>
                                </div>
                                <div>
                                  <h5 className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">
                                    Same as Ticket Holder?
                                  </h5>
                                  <p className="text-sm text-gray-900">{abstract.isPresentingAuthorSame}</p>
                                </div>
                              </div>

                              <div className="pt-3 border-t border-gray-200">
                                <h5 className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">
                                  Consent Status
                                </h5>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-xs">
                                  <div className="flex items-center gap-2">
                                    <span
                                      className={`w-2 h-2 rounded-full ${abstract.originalityConsent ? "bg-green-500" : "bg-red-500"}`}
                                    ></span>
                                    <span className="text-gray-700">Originality</span>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <span
                                      className={`w-2 h-2 rounded-full ${abstract.disqualificationConsent ? "bg-green-500" : "bg-red-500"}`}
                                    ></span>
                                    <span className="text-gray-700">Disqualification</span>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <span
                                      className={`w-2 h-2 rounded-full ${abstract.permissionConsent ? "bg-green-500" : "bg-red-500"}`}
                                    ></span>
                                    <span className="text-gray-700">Permission</span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </td>
                      </tr>
                    )}
                  </>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Mobile Abstracts Cards */}
        <div className="lg:hidden space-y-4">
          {filteredAbstracts.map((abstract) => (
            <div key={abstract._id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="font-medium text-gray-900 mb-2">{abstract.title}</h3>
                  <div className="space-y-1">
                    <p className="text-sm text-gray-600">
                      <span className="font-medium">Submitter:</span> {abstract.fullName}
                    </p>
                    <p className="text-sm text-gray-600">
                      <span className="font-medium">Email:</span> {abstract.email}
                    </p>
                    <p className="text-sm text-gray-600">
                      <span className="font-medium">Presenting:</span> {abstract.presentingAuthor}
                    </p>
                  </div>
                </div>
                <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                  {abstract.category}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">Ticket Status</p>
                  <p className="text-sm text-gray-900 mt-1">
                    {abstract.hasTicket === "Yes" ? "Has Ticket" : "No Ticket"}
                  </p>
                  {abstract.ticketId && <p className="text-xs text-gray-500">ID: {abstract.ticketId}</p>}
                </div>
                <div>
                  <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">Submitted</p>
                  <p className="text-sm text-gray-900 mt-1">{formatDate(abstract.createdAt)}</p>
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                <div className="flex items-center gap-4">
                  {abstract.abstractFileURL && (
  <button
    onClick={() =>
      handleDownload(
        abstract.abstractFileURL,
        `abstract-${abstract.title.replace(/[^a-zA-Z0-9]/g, "_")}.pdf`,
      )
    }
                      className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900"
                    >
                      <FileText className="h-4 w-4" />
                      Download
                    </button>
                  )}
                  <button
                    onClick={() => toggleAbstractExpansion(abstract._id)}
                    className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900"
                  >
                    <Eye className="h-4 w-4" />
                    Details
                  </button>
                </div>
              </div>

              {/* Expandable Details for Mobile */}
              {expandedAbstracts.has(abstract._id) && (
                <div className="mt-4 pt-4 border-t border-gray-200 space-y-3">
                  <div>
                    <h5 className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">Authors</h5>
                    <p className="text-sm text-gray-900 whitespace-pre-line">{abstract.authors}</p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <h5 className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">
                        Same as Ticket Holder?
                      </h5>
                      <p className="text-sm text-gray-900">{abstract.isPresentingAuthorSame}</p>
                    </div>
                  </div>

                  <div>
                    <h5 className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">Consent Status</h5>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-xs">
                        <span
                          className={`w-2 h-2 rounded-full ${abstract.originalityConsent ? "bg-green-500" : "bg-red-500"}`}
                        ></span>
                        <span className="text-gray-700">Originality Consent</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs">
                        <span
                          className={`w-2 h-2 rounded-full ${abstract.disqualificationConsent ? "bg-green-500" : "bg-red-500"}`}
                        ></span>
                        <span className="text-gray-700">Disqualification Consent</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs">
                        <span
                          className={`w-2 h-2 rounded-full ${abstract.permissionConsent ? "bg-green-500" : "bg-red-500"}`}
                        ></span>
                        <span className="text-gray-700">Permission Consent</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Empty State for Abstracts */}
        {filteredAbstracts.length === 0 && abstracts.length > 0 && (
          <div className="text-center py-12">
            <Search className="h-12 w-12 mx-auto text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No abstracts match your filters</h3>
            <p className="text-gray-500 mb-4">Try adjusting your search criteria or clearing the filters.</p>
            <button
              onClick={clearAbstractFilters}
              className="px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors"
            >
              Clear Filters
            </button>
          </div>
        )}

        {filteredAbstracts.length === 0 && abstracts.length === 0 && (
          <div className="text-center py-12">
            <BookOpen className="h-12 w-12 mx-auto text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No abstracts found</h3>
            <p className="text-gray-500">There are no submitted abstracts to display.</p>
          </div>
        )}
      </>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-600 mt-2">Manage tickets and abstracts for MEDCON 2025</p>
        </div>

        {/* Tab Navigation */}
        <div className="mb-6">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              <button
                onClick={() => setActiveTab("tickets")}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === "tickets"
                    ? "border-gray-900 text-gray-900"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  Tickets
                  {tickets.length > 0 && (
                    <span className="bg-gray-100 text-gray-900 py-0.5 px-2 rounded-full text-xs font-medium">
                      {tickets.length}
                    </span>
                  )}
                </div>
              </button>
              <button
                onClick={() => setActiveTab("abstracts")}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === "abstracts"
                    ? "border-gray-900 text-gray-900"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                <div className="flex items-center gap-2">
                  <BookOpen className="h-4 w-4" />
                  Abstracts
                  {abstracts.length > 0 && (
                    <span className="bg-gray-100 text-gray-900 py-0.5 px-2 rounded-full text-xs font-medium">
                      {abstracts.length}
                    </span>
                  )}
                </div>
              </button>
            </nav>
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === "tickets" && renderTicketsTab()}
        {activeTab === "abstracts" && renderAbstractsTab()}
      </div>
    </div>
  )
}
