"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { ChevronDown, ChevronUp, ArrowLeft, Mail, Instagram } from "lucide-react"

export default function FAQ() {
  const [openSections, setOpenSections] = useState({})
  const [openQuestions, setOpenQuestions] = useState({})
  const navigate = useNavigate()

  const toggleSection = (sectionId) => {
    setOpenSections(prev => ({
      ...prev,
      [sectionId]: !prev[sectionId]
    }))
  }

  const toggleQuestion = (questionId) => {
    setOpenQuestions(prev => ({
      ...prev,
      [questionId]: !prev[questionId]
    }))
  }

  const faqData = {
    "Registration & General Information": [
      {
        id: "reg1",
        question: "How do I register for the conference?",
        answer: "You can register online via our official conference website (Website link), or access it through the Link in Bio on our Instagram page (@medcon_gimsoc)."
      },
      {
        id: "reg2",
        question: "What are the registration fees?",
        answer: "Fees vary depending on the ticket category (All-Inclusive, Standard, etc.). A detailed fee structure is available on the registration page."
      },
      {
        id: "reg3",
        question: "What payment methods are accepted?",
        answer: "We accept payments via credit/debit cards, bank transfers, and online payment gateways."
      },
      {
        id: "reg4",
        question: "Is on-site registration available?",
        answer: "No, on-site registration will not be available. Please register in advance to secure your spot."
      },
      {
        id: "reg5",
        question: "Can I register on behalf of someone else?",
        answer: "No. All participants must register individually using their own details. Registrations made on behalf of others will not be valid. However, for group ticket registrations, one participant may complete the registration on behalf of themselves and one or two additional group members."
      },
      {
        id: "reg6",
        question: "How will I receive confirmation of my registration?",
        answer: "After successful registration and payment, a confirmation email will be sent to your registered email address with all relevant details and your ticket."
      },
      {
        id: "reg7",
        question: "What should I do if I didn't receive a confirmation email?",
        answer: "First, check your spam or junk folder. If it's still not there, please contact us at medconconferencegimsoc@gmail.com with the subject line: Unreceived Confirmation Email."
      },
      {
        id: "reg8",
        question: "Who do I contact for registration issues or technical problems?",
        answer: "You can email us at medconconferencegimsoc@gmail.com or send us a direct message on Instagram at @medcon_gimsoc."
      },
      {
        id: "reg9",
        question: "Can I modify or cancel my registration after submitting it?",
        answer: "No. Modifications or cancellations are not allowed once the form has been submitted. Please double-check all information before registering."
      },
      {
        id: "reg10",
        question: "Do I need to print my ticket/confirmation?",
        answer: "No, showing your confirmation email or unique ID code on your phone at check-in is sufficient."
      },
      {
        id: "reg11",
        question: "Will there be on-site help for registration or technical issues?",
        answer: "Yes, our registration help desk will be available at the venue throughout the conference to assist you."
      },
      {
        id: "reg12",
        question: "Is there an early bird discount?",
        answer: "No, we are not offering a specific early bird discount. Additionally, our ticketing does not follow a phased release (such as Phase 1, Phase 2, etc.), so there will be no changes in pricing over time. We encourage you to secure your tickets early to avoid missing out, as availability may be limited."
      },
      {
        id: "reg13",
        question: "Will there be an online ticket option?",
        answer: "Yes! Online tickets will be released soon. Stay tuned to our official announcements."
      },
      {
        id: "reg14",
        question: "What is the Gala and what does it include?",
        answer: "The Gala is the grand finale of MEDCON—an elegant evening designed to celebrate the success of the conference, reflect on inspiring moments shared, and strengthen the connections formed. It is a social and networking event that brings together delegates, speakers, and organizers in a relaxed, festive atmosphere. You'll enjoy: Live entertainment and music, A buffet-style dinner, A formal celebration of the MEDCON journey, Networking and photo opportunities, A chance to celebrate achievements and create lasting memories. (Gala access is included only with All-Inclusive and Doctor-All Inclusive tickets by default.)"
      }
    ],
    "Ticket Categories": [
      {
        id: "ticket1",
        question: "What is included in the Standard ticket?",
        answer: "Access to all speaker sessions, Workshops (separate registration may be required), Meals and refreshments, Academic and research fairs, Goodie bag, Certificate of participation"
      },
      {
        id: "ticket2",
        question: "What is included in the All-Inclusive ticket?",
        answer: "Everything in the Standard ticket, plus: Gala Dinner access: Formal evening celebration, Live entertainment, Dinner buffet, Networking with speakers and delegates"
      },
      {
        id: "ticket3",
        question: "What is included in the Basic ticket? (To be released later)",
        answer: "Access to speaker sessions, Research fairs and poster presentations. ❗ Does NOT include: workshops, meals, gala, or goodie bags."
      },
      {
        id: "ticket4",
        question: "What is a Group ticket?",
        answer: "Available for 2–3 participants registering under the Standard ticket, No Gala access, All group members must register via the designated group form, Not available for All-Inclusive tickets"
      },
      {
        id: "ticket5",
        question: "What is the Doctor ticket?",
        answer: "A special category for licensed medical doctors that includes: Full access to speaker sessions, Workshops, Meals and refreshments, Academic fairs and posters, Gala Dinner, Goodie bags, Certificate of participation"
      },
      {
        id: "ticket6",
        question: "Can I transfer my ticket to a friend if I'm unable to attend?",
        answer: "No. Tickets are strictly non-transferable and can only be used by the person who registered. We appreciate your understanding!"
      }
    ],
    "Discounts & Special Categories": [
      {
        id: "discount1",
        question: "Do GIMSOC members receive a discounted fee?",
        answer: "Yes! GIMSOC members are eligible for discounted rates. Enter your valid membership code during registration to unlock the discount."
      },
      {
        id: "discount2",
        question: "Do TSU students receive a discounted fee?",
        answer: "Yes. TSU students can register under designated ticket categories at a reduced rate. Use your TSU-registered email to access this benefit."
      }
    ],
    "Workshops, Certificates, and CPD Points": [
      {
        id: "workshop1",
        question: "Are workshops included in the conference?",
        answer: "Yes, but only with Standard and All-Inclusive tickets. Some workshops may require separate registration."
      },
      {
        id: "workshop2",
        question: "Are certificates available in digital format?",
        answer: "Yes, digital certificates will be emailed to all participants after the event. If you haven't received yours by November 6th, please email us at medconconferencegimsoc@gmail.com with the subject: Unreceived Certificate."
      },
      {
        id: "workshop3",
        question: "Will CPD points be awarded for attending the conference?",
        answer: "Yes, CPD points will be awarded only if you: Are officially registered, Attend all required sessions. ❗ Incomplete attendance or unregistered participants will not be eligible for CPD certification."
      },
      {
        id: "workshop4",
        question: "Will CME points be awarded?",
        answer: "CME point details will be announced soon. Stay tuned to our official channels for updates."
      },
      {
        id: "workshop5",
        question: "What should I do if I don't receive my certificate?",
        answer: "Certificates will be sent by November 6th. If not received, email us at medconconferencegimsoc@gmail.com with the subject line: Didn't Receive Certificate, and we'll get back to you as soon as possible."
      }
    ]
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900">
      {/* Header */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-blue-600/20"></div>
        <div className="relative z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="flex items-center mb-8">
              <button
                onClick={() => navigate(-1)}
                className="mr-4 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-all duration-300 text-white"
              >
                <ArrowLeft className="w-6 h-6" />
              </button>
              <h1 className="text-4xl md:text-5xl font-bold text-white">
                Frequently Asked Questions
              </h1>
            </div>
            <p className="text-xl text-gray-300 max-w-3xl">
              Find answers to all your questions about MEDCON conference registration, tickets, workshops, and more.
            </p>
          </div>
        </div>
      </div>

      {/* FAQ Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="space-y-8">
          {Object.entries(faqData).map(([sectionTitle, questions]) => (
            <div
              key={sectionTitle}
              className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 overflow-hidden animate-fade-in"
            >
              <button
                onClick={() => toggleSection(sectionTitle)}
                className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-white/10 transition-all duration-300"
              >
                <h2 className="text-xl font-semibold text-white">{sectionTitle}</h2>
                {openSections[sectionTitle] ? (
                  <ChevronUp className="w-6 h-6 text-white transition-transform duration-300" />
                ) : (
                  <ChevronDown className="w-6 h-6 text-white transition-transform duration-300" />
                )}
              </button>
              
              {openSections[sectionTitle] && (
                <div className="px-6 pb-6 space-y-4 animate-slide-down">
                  {questions.map((item) => (
                    <div
                      key={item.id}
                      className="bg-white/5 rounded-lg border border-white/10 overflow-hidden"
                    >
                      <button
                        onClick={() => toggleQuestion(item.id)}
                        className="w-full px-4 py-4 text-left flex items-center justify-between hover:bg-white/10 transition-all duration-300"
                      >
                        <h3 className="text-lg font-medium text-white pr-4">{item.question}</h3>
                        {openQuestions[item.id] ? (
                          <ChevronUp className="w-5 h-5 text-white flex-shrink-0 transition-transform duration-300" />
                        ) : (
                          <ChevronDown className="w-5 h-5 text-white flex-shrink-0 transition-transform duration-300" />
                        )}
                      </button>
                      
                      {openQuestions[item.id] && (
                        <div className="px-4 pb-4 animate-slide-down">
                          <p className="text-gray-300 leading-relaxed">{item.answer}</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Contact Section */}
        <div className="mt-16 bg-gradient-to-r from-purple-600/20 to-blue-600/20 rounded-2xl p-8 border border-white/10">
          <h2 className="text-2xl font-bold text-white mb-4">Still have questions?</h2>
          <p className="text-gray-300 mb-6">
            Can't find the answer you're looking for? Reach out to our support team.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href="mailto:medconconferencegimsoc@gmail.com"
              className="flex items-center justify-center px-6 py-3 bg-white/10 hover:bg-white/20 rounded-lg text-white transition-all duration-300 border border-white/20 hover:border-white/40"
            >
              <Mail className="w-5 h-5 mr-2" />
              Email Support
            </a>
            <a
              href="https://instagram.com/medcon_gimsoc"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center px-6 py-3 bg-white/10 hover:bg-white/20 rounded-lg text-white transition-all duration-300 border border-white/20 hover:border-white/40"
            >
              <Instagram className="w-5 h-5 mr-2" />
              Instagram DM
            </a>
          </div>
        </div>
      </div>

      {/* Floating particles background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white/20 rounded-full animate-float-particle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 6}s`,
              animationDuration: `${6 + Math.random() * 4}s`,
            }}
          />
        ))}
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes slide-down {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes float-particle {
          0%, 100% { transform: translateY(0px) translateX(0px); }
          25% { transform: translateY(-20px) translateX(10px); }
          50% { transform: translateY(-40px) translateX(-5px); }
          75% { transform: translateY(-20px) translateX(-10px); }
        }
        
        .animate-fade-in {
          animation: fade-in 0.6s ease-out;
        }
        
        .animate-slide-down {
          animation: slide-down 0.3s ease-out;
        }
        
        .animate-float-particle {
          animation: float-particle 6s ease-in-out infinite;
        }
      `}</style>
    </div>
  )
} 