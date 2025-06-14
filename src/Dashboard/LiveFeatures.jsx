"use client"

import { useState } from "react"
import { Play, Users, MessageCircle, BarChart3, ThumbsUp, Send, Video } from "lucide-react"
import Card from "./Card"

const LiveFeatures = () => {
  const [activeTab, setActiveTab] = useState("sessions")
  const [chatMessage, setChatMessage] = useState("")
  const [pollAnswer, setPollAnswer] = useState("")

  const liveSessions = [
    {
      id: 1,
      title: "AI in Healthcare: Current Applications",
      speaker: "Prof. John Doe",
      status: "live",
      viewers: 234,
      startTime: "11:00 AM",
      duration: "90 min",
      room: "Conference Room A",
    },
    {
      id: 2,
      title: "Machine Learning Panel Discussion",
      speaker: "Multiple Experts",
      status: "upcoming",
      viewers: 0,
      startTime: "2:00 PM",
      duration: "75 min",
      room: "Grand Auditorium",
    },
    {
      id: 3,
      title: "Opening Keynote: The Future of AI",
      speaker: "Dr. Jane Smith",
      status: "ended",
      viewers: 456,
      startTime: "9:00 AM",
      duration: "90 min",
      room: "Grand Auditorium",
    },
  ]

  const activePolls = [
    {
      id: 1,
      question: "Which AI application area interests you most for future research?",
      options: [
        { text: "Healthcare & Medical Diagnosis", votes: 45 },
        { text: "Autonomous Vehicles", votes: 32 },
        { text: "Natural Language Processing", votes: 38 },
        { text: "Computer Vision", votes: 29 },
      ],
      totalVotes: 144,
      timeLeft: "5 minutes",
    },
  ]

  const chatMessages = [
    {
      id: 1,
      user: "Dr. Sarah Chen",
      message: "Excellent point about neural network architectures!",
      time: "11:45",
      role: "speaker",
    },
    {
      id: 2,
      user: "Alex Johnson",
      message: "Could you elaborate on the preprocessing steps?",
      time: "11:44",
      role: "attendee",
    },
    {
      id: 3,
      user: "Maria Rodriguez",
      message: "The case study results are impressive",
      time: "11:43",
      role: "attendee",
    },
    {
      id: 4,
      user: "Prof. John Doe",
      message: "Great question Alex! Let me address that in detail...",
      time: "11:42",
      role: "speaker",
    },
  ]

  const queuedQuestions = [
    {
      id: 1,
      question: "How do you handle data privacy concerns in healthcare AI?",
      author: "Anonymous",
      votes: 12,
      answered: false,
    },
    {
      id: 2,
      question: "What are the computational requirements for training these models?",
      author: "Student123",
      votes: 8,
      answered: false,
    },
    {
      id: 3,
      question: "Can these techniques be applied to smaller datasets?",
      author: "ResearcherX",
      votes: 15,
      answered: true,
    },
  ]

  const getStatusConfig = (status) => {
    const configs = {
      live: { color: "bg-red-100 text-red-800 border-red-200", icon: "🔴", label: "LIVE" },
      upcoming: { color: "bg-yellow-100 text-yellow-800 border-yellow-200", icon: "⏰", label: "UPCOMING" },
      ended: { color: "bg-gray-100 text-gray-600 border-gray-200", icon: "⏹️", label: "ENDED" },
    }
    return configs[status]
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Live Conference Features</h1>
        <p className="text-gray-600 mt-2">
          Join live sessions, participate in polls, and engage with speakers and attendees
        </p>
      </div>

      {/* Tab Navigation */}
      <Card>
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            {[
              { id: "sessions", label: "Live Sessions", icon: Play },
              { id: "qa", label: "Q&A", icon: MessageCircle },
              { id: "polls", label: "Live Polls", icon: BarChart3 },
              { id: "chat", label: "Discussion", icon: MessageCircle },
              { id: "feedback", label: "Feedback", icon: ThumbsUp },
            ].map((tab) => {
              const Icon = tab.icon
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 ${
                    activeTab === tab.id
                      ? "border-blue-500 text-blue-600"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </button>
              )
            })}
          </nav>
        </div>

        <div className="p-6">
          {/* Live Sessions Tab */}
          {activeTab === "sessions" && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {liveSessions.map((session) => {
                  const statusConfig = getStatusConfig(session.status)
                  return (
                    <div
                      key={session.id}
                      className="bg-gradient-to-r from-gray-50 to-white p-6 rounded-lg border border-gray-200"
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            <span
                              className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${statusConfig.color}`}
                            >
                              <span className="mr-1">{statusConfig.icon}</span>
                              {statusConfig.label}
                            </span>
                            {session.status === "live" && (
                              <div className="flex items-center text-sm text-gray-600">
                                <Users className="w-4 h-4 mr-1" />
                                {session.viewers} watching
                              </div>
                            )}
                          </div>
                          <h3 className="text-lg font-semibold text-gray-900 mb-1">{session.title}</h3>
                          <p className="text-gray-600 text-sm mb-2">{session.speaker}</p>
                          <div className="text-sm text-gray-500">
                            {session.startTime} • {session.duration} • {session.room}
                          </div>
                        </div>
                      </div>

                      <div className="flex space-x-3">
                        {session.status === "live" && (
                          <>
                            <button className="flex-1 bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition-colors font-medium">
                              Join Live Session
                            </button>
                            <button className="p-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors">
                              <Video className="w-5 h-5" />
                            </button>
                          </>
                        )}
                        {session.status === "upcoming" && (
                          <button className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium">
                            Set Reminder
                          </button>
                        )}
                        {session.status === "ended" && (
                          <button className="flex-1 bg-gray-100 text-gray-600 py-2 px-4 rounded-lg hover:bg-gray-200 transition-colors font-medium">
                            Watch Recording
                          </button>
                        )}
                      </div>
                    </div>
                  )
                })}
              </div>

              {/* Interactive Features */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-blue-50 p-6 rounded-lg border border-blue-100 text-center">
                  <MessageCircle className="w-8 h-8 text-blue-600 mx-auto mb-3" />
                  <h4 className="font-semibold text-blue-900 mb-2">Live Q&A</h4>
                  <p className="text-sm text-blue-700">Ask questions to speakers in real-time</p>
                </div>
                <div className="bg-green-50 p-6 rounded-lg border border-green-100 text-center">
                  <BarChart3 className="w-8 h-8 text-green-600 mx-auto mb-3" />
                  <h4 className="font-semibold text-green-900 mb-2">Live Polling</h4>
                  <p className="text-sm text-green-700">Participate in interactive polls</p>
                </div>
                <div className="bg-purple-50 p-6 rounded-lg border border-purple-100 text-center">
                  <Users className="w-8 h-8 text-purple-600 mx-auto mb-3" />
                  <h4 className="font-semibold text-purple-900 mb-2">Networking</h4>
                  <p className="text-sm text-purple-700">Connect with other attendees</p>
                </div>
              </div>
            </div>
          )}

          {/* Q&A Tab */}
          {activeTab === "qa" && (
            <div className="space-y-6">
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-lg border border-blue-100">
                <h3 className="text-lg font-semibold text-blue-900 mb-4">Submit Your Question</h3>
                <div className="space-y-4">
                  <textarea
                    placeholder="Ask a question to the speaker..."
                    className="w-full p-4 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                    rows="3"
                  ></textarea>
                  <div className="flex justify-between items-center">
                    <label className="flex items-center text-sm text-gray-600">
                      <input type="checkbox" className="mr-2" />
                      Submit anonymously
                    </label>
                    <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium">
                      Submit Question
                    </button>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Question Queue</h3>
                <div className="space-y-3">
                  {queuedQuestions.map((q) => (
                    <div
                      key={q.id}
                      className={`p-4 rounded-lg border ${q.answered ? "bg-green-50 border-green-200" : "bg-white border-gray-200"}`}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <p className="text-gray-900 font-medium">{q.question}</p>
                          <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                            <span>by {q.author}</span>
                            <div className="flex items-center">
                              <ThumbsUp className="w-4 h-4 mr-1" />
                              {q.votes} votes
                            </div>
                          </div>
                        </div>
                        <div className="ml-4">
                          {q.answered ? (
                            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                              Answered
                            </span>
                          ) : (
                            <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">Vote</button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Polls Tab */}
          {activeTab === "polls" && (
            <div className="space-y-6">
              {activePolls.map((poll) => (
                <div
                  key={poll.id}
                  className="bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-lg border border-purple-100"
                >
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-lg font-semibold text-purple-900">{poll.question}</h3>
                    <span className="text-sm text-purple-600 bg-purple-100 px-2 py-1 rounded-full">
                      {poll.timeLeft} left
                    </span>
                  </div>

                  <div className="space-y-3 mb-4">
                    {poll.options.map((option, index) => {
                      const percentage = Math.round((option.votes / poll.totalVotes) * 100)
                      return (
                        <label key={index} className="block cursor-pointer">
                          <div className="flex items-center justify-between p-3 bg-white rounded-lg border border-purple-200 hover:border-purple-300 transition-colors">
                            <div className="flex items-center">
                              <input
                                type="radio"
                                name={`poll-${poll.id}`}
                                value={option.text}
                                onChange={(e) => setPollAnswer(e.target.value)}
                                className="text-purple-600 focus:ring-purple-500 mr-3"
                              />
                              <span className="text-gray-900">{option.text}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <div className="w-16 bg-gray-200 rounded-full h-2">
                                <div
                                  className="bg-purple-600 h-2 rounded-full transition-all duration-300"
                                  style={{ width: `${percentage}%` }}
                                ></div>
                              </div>
                              <span className="text-sm text-gray-600 w-12 text-right">{percentage}%</span>
                            </div>
                          </div>
                        </label>
                      )
                    })}
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-sm text-purple-600">{poll.totalVotes} total votes</span>
                    <button className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition-colors font-medium">
                      Submit Vote
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Chat Tab */}
          {activeTab === "chat" && (
            <div className="space-y-6">
              <div className="bg-white border border-gray-200 rounded-lg h-96 flex flex-col">
                <div className="p-4 border-b border-gray-200 bg-gray-50 rounded-t-lg">
                  <h3 className="font-semibold text-gray-900">Live Discussion</h3>
                  <p className="text-sm text-gray-600">AI in Healthcare Workshop</p>
                </div>

                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                  {chatMessages.map((msg) => (
                    <div key={msg.id} className="flex space-x-3">
                      <div className="flex-shrink-0">
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-medium ${
                            msg.role === "speaker" ? "bg-blue-500" : "bg-gray-500"
                          }`}
                        >
                          {msg.user.charAt(0)}
                        </div>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2">
                          <span className={`font-medium ${msg.role === "speaker" ? "text-blue-900" : "text-gray-900"}`}>
                            {msg.user}
                          </span>
                          {msg.role === "speaker" && (
                            <span className="text-xs bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full">Speaker</span>
                          )}
                          <span className="text-xs text-gray-500">{msg.time}</span>
                        </div>
                        <p className="text-gray-700 mt-1">{msg.message}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="p-4 border-t border-gray-200">
                  <div className="flex space-x-3">
                    <input
                      type="text"
                      value={chatMessage}
                      onChange={(e) => setChatMessage(e.target.value)}
                      placeholder="Type your message..."
                      className="flex-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors">
                      <Send className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Feedback Tab */}
          {activeTab === "feedback" && (
            <div className="space-y-6">
              <div className="bg-gradient-to-r from-green-50 to-blue-50 p-6 rounded-lg border border-green-100">
                <h3 className="text-lg font-semibold text-green-900 mb-4">Session Feedback</h3>
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      How would you rate this session? (1-5 stars)
                    </label>
                    <div className="flex space-x-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button key={star} className="text-3xl text-gray-300 hover:text-yellow-400 transition-colors">
                          ⭐
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      What did you find most valuable?
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      {["Content Quality", "Speaker Expertise", "Interactive Elements", "Practical Examples"].map(
                        (aspect) => (
                          <label key={aspect} className="flex items-center">
                            <input type="checkbox" className="mr-2 text-green-600 focus:ring-green-500" />
                            <span className="text-sm text-gray-700">{aspect}</span>
                          </label>
                        ),
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Additional Comments</label>
                    <textarea
                      placeholder="Share your thoughts about this session..."
                      className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                      rows="4"
                    ></textarea>
                  </div>

                  <button className="w-full bg-green-600 text-white py-3 px-4 rounded-lg hover:bg-green-700 transition-colors font-medium">
                    Submit Feedback
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </Card>
    </div>
  )
}

export default LiveFeatures
