"use client"

import { useState, useEffect } from "react"
import { Route, Routes } from "react-router-dom"
import { ScrollReveal } from "./Pages/ScrollReveal"
import { SparklesCore } from "../Animations/Sparkles"

import LoginForm from "./Pages/LoginForm"
import SignupForm from "./Components/SignupForm"
import Hero from "./Components/Hero"
import Information from "./Components/Information"
import About from "./Components/About"
import FeaturedSpeakers from "./Components/FeaturedSpeakers"
import FAQSection from "./Components/FaqSection"
import Footer from "./Components/Footer"
import TicketDisplay from "./Pages/TicketDisplay"
import IndividualTicket from "./questionnaires/IndividualTicket"
import GroupTicket from "./questionnaires/GroupTicket"
// import TsuTicket from "./questionnaires/TsuTicket"
import AllInclusiveTicket from "./questionnaires/AllInclusiveTicket"
// import TsuAllInclusiveTicket from "./questionnaires/TsuAllinclusiveTicket"
import InternationalTicket from "./questionnaires/InternationalTicket"
import DoctorTicket from "./questionnaires/DoctorTicket"
import AttendeeDashboard from "./Dashboard/AttendeeDashboard"
import AdminTicketDashboard from "./Pages/AdminPage"
import AbstractPage from "./Pages/AbstractPage"
import ExecutiveTicket from "./questionnaires/ExecutiveTicket"
import TicketSuccessPage from "./Pages/TicketSuccessPage"
import TicketsSoon from "./Pages/TicketsSoon"
import AbstractSuccessPage from "./Pages/AbstractSuccess"




const HomePage = () => (
  <>
    {/* Hero doesn't need animation as it's the first thing visible */}
    <Hero />

    {/* Each section gets its own scroll reveal animation */}
    <ScrollReveal animation="fadeInUp">
      <Information />
    </ScrollReveal>

    <ScrollReveal animation="fadeInLeft" delay={0.2}>
      <About />
    </ScrollReveal>

    <ScrollReveal animation="zoomIn" delay={0.1}>
      <FeaturedSpeakers />
    </ScrollReveal>

    <ScrollReveal animation="fadeInRight" delay={0.2}>
      <FAQSection />
    </ScrollReveal>

    <ScrollReveal animation="fadeIn" delay={0.3}>
      <Footer />
    </ScrollReveal>
  </>
)

const LoadingScreen = () => {
  return (
    <div className="fixed inset-0 w-full h-screen flex items-center justify-center bg-black z-50">
      <div className="w-full h-full absolute inset-0">
        <SparklesCore
          id="tsparticlesfullpage"
          background="transparent"
          minSize={0.6}
          maxSize={1.4}
          particleDensity={100}
          className="w-full h-full"
          particleColor="#FFFFFF"
        />
      </div>
      <h1 className="text-4xl md:text-7xl font-bold text-center text-white relative z-20">MEDCON'25</h1>
    </div>
  )
}

const App = () => {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Set a timeout to hide the loading screen after 3 seconds
    const timer = setTimeout(() => {
      setLoading(false)
    }, 2000)

    // Clean up the timer if the component unmounts
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="w-full min-h-screen">
      {loading ? (
        <LoadingScreen />
      ) : (
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/signup" element={<SignupForm/>}/>
          <Route path="/tickets" element={<TicketDisplay />} />
          <Route path="/individual-ticket" element={<IndividualTicket/>}/>
          <Route path="/group-ticket" element={<GroupTicket/>}/>
          {/* <Route path="/tsu-ticket" element={<TsuTicket/>}/> */}
          <Route path="/allinclusive-ticket" element={<AllInclusiveTicket/>}/>
          {/* <Route path="/tsuallinclusive-ticket" element={<TsuAllInclusiveTicket/>}/> */}
          <Route path="/international-ticket" element={<InternationalTicket/>}/>
          <Route path="/doctor-ticket" element={<DoctorTicket/>} />
          <Route path="/attendeedashboard" element={<AttendeeDashboard/>}/>
          <Route path="/adminpage" element={<AdminTicketDashboard/>}/>
          <Route path="/abstract" element={<AbstractPage/>}/>
          <Route path="/executive-ticket" element={<ExecutiveTicket/>}/>
          <Route path="/ticket-success" element={<TicketSuccessPage/>}/>
          <Route path="/comingsoon" element={<TicketsSoon/>}/>
          <Route path="/abstract-success" element={<AbstractSuccessPage/>}/>
        </Routes>
      )}
    </div>
  )
}

export default App
