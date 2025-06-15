"use client"

import { useState, useEffect } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { Users, Globe, Award, Microscope, Heart, Zap, Sparkles, ArrowRight, Star } from "lucide-react"

const FallingStars = () => {
  const [stars, setStars] = useState([])

  useEffect(() => {
    const generateStars = () => {
      const newStars = Array.from({ length: 15 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        delay: Math.random() * 10,
        duration: 8 + Math.random() * 4,
        size: 0.5 + Math.random() * 1,
        opacity: 0.2 + Math.random() * 0.3,
      }))
      setStars(newStars)
    }

    generateStars()
  }, [])

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {stars.map((star) => (
        <motion.div
          key={star.id}
          className="absolute"
          style={{
            left: `${star.x}%`,
            top: "-20px",
          }}
          animate={{
            y: ["0vh", "120vh"],
            rotate: [0, 360],
            opacity: [0, star.opacity, star.opacity, 0],
          }}
          transition={{
            duration: star.duration,
            delay: star.delay,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
        >
          <Star
            className="text-blue-300"
            style={{
              width: `${star.size}rem`,
              height: `${star.size}rem`,
              filter: "drop-shadow(0 0 4px rgba(147, 197, 253, 0.3))",
            }}
          />
        </motion.div>
      ))}
    </div>
  )
}

const AboutusMain = () => {
  const [hoveredCard, setHoveredCard] = useState(null)
  const { scrollYProgress } = useScroll()
  const y = useTransform(scrollYProgress, [0, 1], [0, -30])

  const fadeInUp = {
    initial: { opacity: 0, y: 40 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: "easeOut" },
  }

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-slate-800 relative overflow-hidden">
      {/* Falling Stars Background */}
      <FallingStars />

      {/* Subtle Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-96 h-96 bg-blue-600/10 rounded-full filter blur-3xl"></div>
        <div className="absolute top-40 right-20 w-80 h-80 bg-purple-600/10 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-20 left-40 w-72 h-72 bg-indigo-600/10 rounded-full filter blur-3xl"></div>
      </div>

      {/* Subtle Grid Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.3) 1px, transparent 0)`,
            backgroundSize: "50px 50px",
          }}
        ></div>
      </div>

      {/* Main Content */}
      <motion.div className="relative z-10 px-4 sm:px-6 lg:px-8 py-16" style={{ y }}>
        <div className="max-w-7xl mx-auto">
          {/* Professional Header */}
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              className="w-24 h-24 mx-auto mb-8 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl flex items-center justify-center shadow-xl"
              whileHover={{ scale: 1.05, rotate: 3 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <Microscope className="w-12 h-12 text-white" />
            </motion.div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-4 tracking-tight">
              About MEDCON'25
            </h1>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-indigo-600 mx-auto rounded-full mb-6"></div>
            <p className="text-xl md:text-2xl text-gray-300 leading-relaxed font-light max-w-4xl mx-auto">
              Advancing infectious disease medicine through evidence-based research, professional collaboration, and
              innovative healthcare solutions
            </p>
          </motion.div>

          {/* GIMSOC Introduction */}
          <motion.div className="mb-16" variants={fadeInUp} initial="initial" animate="animate">
            <motion.div
              className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 shadow-xl p-8 md:p-12"
              whileHover={{
                backgroundColor: "rgba(255, 255, 255, 0.08)",
                borderColor: "rgba(255, 255, 255, 0.15)",
              }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex items-center mb-8">
                <motion.div
                  className="w-16 h-16 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-xl flex items-center justify-center mr-6 shadow-lg"
                  whileHover={{ scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Heart className="w-8 h-8 text-white" />
                </motion.div>
                <h2 className="text-3xl md:text-4xl font-bold text-white">About GIMSOC</h2>
              </div>

              <div className="space-y-6 text-gray-200 leading-relaxed">
                <p className="text-lg md:text-xl">
                  <span className="font-semibold text-white">GIMSOC</span> is a non-profit organization dedicated to
                  fostering a vibrant community and providing unique opportunities for medical students in Georgia.
                  Having established itself as one of the most professional and rapidly growing societies, we embody the
                  principle of{" "}
                  <span className="font-semibold text-blue-300 bg-blue-600/20 px-2 py-1 rounded">
                    "For the students, by the students"
                  </span>{" "}
                  while focusing on empowering the next generation of healthcare professionals.
                </p>

                <p className="text-lg md:text-xl">
                  We promote professional and personal development through mentorship programs, clinical exposure,
                  research opportunities, and community service initiatives. Our organization creates high-quality,
                  innovative educational experiences that foster a sense of belonging for medical students worldwide.
                </p>

                <motion.div
                  className="bg-gradient-to-r from-blue-600/20 to-indigo-600/20 rounded-xl p-6 border border-blue-500/30"
                  whileHover={{ scale: 1.01 }}
                  transition={{ duration: 0.2 }}
                >
                  <p className="text-lg md:text-xl font-medium text-white">
                    We are proud to present <span className="font-bold text-blue-300">MEDCON'25</span>, our 3rd Annual
                    International Conference, dedicated to advancing infectious disease medicine globally.
                  </p>
                </motion.div>

                {/* Professional Statistics */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-8">
                  {[
                    {
                      number: "10,000+",
                      label: "Expected Participants",
                      icon: Users,
                      color: "from-blue-600 to-indigo-700",
                    },
                    {
                      number: "3rd",
                      label: "Annual Conference",
                      icon: Award,
                      color: "from-indigo-600 to-purple-700",
                    },
                    {
                      number: "2025",
                      label: "Infectious Disease Focus",
                      icon: Globe,
                      color: "from-purple-600 to-blue-700",
                    },
                  ].map((stat, index) => (
                    <motion.div
                      key={index}
                      className="text-center bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10"
                      whileHover={{
                        scale: 1.02,
                        backgroundColor: "rgba(255, 255, 255, 0.08)",
                        borderColor: "rgba(255, 255, 255, 0.15)",
                      }}
                      transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    >
                      <div
                        className={`w-12 h-12 bg-gradient-to-r ${stat.color} rounded-lg flex items-center justify-center mx-auto mb-4 shadow-lg`}
                      >
                        <stat.icon className="w-6 h-6 text-white" />
                      </div>
                      <div className="text-2xl font-bold text-white mb-2">{stat.number}</div>
                      <div className="text-sm text-gray-300">{stat.label}</div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Conference History */}
          <motion.div className="mb-16" variants={staggerContainer} initial="initial" animate="animate">
            <motion.h3 className="text-3xl md:text-4xl font-bold text-center text-white mb-12" variants={fadeInUp}>
              Conference History
            </motion.h3>

            <div className="grid md:grid-cols-2 gap-8">
              {/* MEDCON'23 */}
              <motion.div
                className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 shadow-xl overflow-hidden"
                variants={fadeInUp}
                whileHover={{
                  scale: 1.02,
                  backgroundColor: "rgba(255, 255, 255, 0.08)",
                  borderColor: "rgba(255, 255, 255, 0.15)",
                }}
                transition={{ duration: 0.3 }}
              >
                <div className="bg-gradient-to-r from-emerald-600 to-teal-700 p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-2xl font-bold text-white mb-1">MEDCON'23</h4>
                      <p className="text-emerald-100 font-medium">RESUSCITATE</p>
                    </div>
                    <Zap className="w-10 h-10 text-white opacity-80" />
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="w-10 h-10 bg-emerald-600/20 rounded-lg flex items-center justify-center mr-3">
                      <Heart className="w-5 h-5 text-emerald-400" />
                    </div>
                    <span className="font-semibold text-white">Emergency Medicine</span>
                  </div>
                  <p className="text-gray-300 mb-4 leading-relaxed">
                    Our inaugural multidisciplinary conference, conducted over two days (October 7-8) at Ivane
                    Javakhishvili State University, establishing the foundation for future medical conferences.
                  </p>
                  <div className="flex items-center justify-between text-sm text-gray-400 bg-white/5 rounded-lg p-3">
                    <span>📍 TSU Building 1</span>
                    <span>👥 100+ Participants</span>
                  </div>
                </div>
              </motion.div>

              {/* MEDCON'24 */}
              <motion.div
                className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 shadow-xl overflow-hidden"
                variants={fadeInUp}
                whileHover={{
                  scale: 1.02,
                  backgroundColor: "rgba(255, 255, 255, 0.08)",
                  borderColor: "rgba(255, 255, 255, 0.15)",
                }}
                transition={{ duration: 0.3 }}
              >
                <div className="bg-gradient-to-r from-purple-600 to-indigo-700 p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-2xl font-bold text-white mb-1">MEDCON'24</h4>
                      <p className="text-purple-100 font-medium">PULSE TO PRECISION</p>
                    </div>
                    <Sparkles className="w-10 h-10 text-white opacity-80" />
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="w-10 h-10 bg-purple-600/20 rounded-lg flex items-center justify-center mr-3">
                      <Microscope className="w-5 h-5 text-purple-400" />
                    </div>
                    <span className="font-semibold text-white">Internal Medicine</span>
                  </div>
                  <p className="text-gray-300 mb-4 leading-relaxed">
                    Expanded to four prestigious venues (TSU, ISU, CIU, and NVU) on November 2-3, demonstrating
                    significant growth and establishing partnerships across multiple institutions.
                  </p>
                  <div className="flex items-center justify-between text-sm text-gray-400 bg-white/5 rounded-lg p-3">
                    <span>📍 4 Universities</span>
                    <span>👥 1,000+ Participants</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Key Features 2025 */}
          <motion.div className="mb-16" variants={fadeInUp} initial="initial" animate="animate">
            <div className="text-center mb-12">
              <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">MEDCON'25 Key Features</h3>
              <p className="text-xl text-gray-300">Professional development through innovation and collaboration</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  icon: "🔬",
                  title: "Advanced Workshops",
                  description:
                    "Comprehensive hands-on workshops designed to enhance practical skills and clinical competencies in infectious disease management.",
                  color: "from-blue-600 to-cyan-700",
                },
                {
                  icon: "🤝",
                  title: "Professional Networking",
                  description:
                    "Structured networking opportunities connecting students with industry professionals, researchers, and healthcare leaders.",
                  color: "from-purple-600 to-indigo-700",
                },
                {
                  icon: "🥽",
                  title: "Technology Integration",
                  description:
                    "Virtual reality and simulation-based learning experiences to enhance medical education and clinical training.",
                  color: "from-emerald-600 to-teal-700",
                },
                {
                  icon: "👨‍💼",
                  title: "Expert Speakers",
                  description:
                    "Distinguished faculty including physician-executives, healthcare policymakers, and medical technology innovators.",
                  color: "from-red-600 to-rose-700",
                },
                {
                  icon: "🎓",
                  title: "CME Accreditation",
                  description:
                    "Continuing Medical Education credits recognized by international medical boards for professional development.",
                  color: "from-indigo-600 to-purple-700",
                },
                {
                  icon: "🌍",
                  title: "Global Participation",
                  description:
                    "International attendee support including accommodation assistance and cultural exchange programs.",
                  color: "from-pink-600 to-purple-700",
                },
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 shadow-lg p-6"
                  variants={fadeInUp}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{
                    scale: 1.02,
                    backgroundColor: "rgba(255, 255, 255, 0.08)",
                    borderColor: "rgba(255, 255, 255, 0.15)",
                  }}
                >
                  <div
                    className={`w-14 h-14 bg-gradient-to-r ${feature.color} rounded-lg flex items-center justify-center text-2xl mb-4 shadow-lg`}
                  >
                    {feature.icon}
                  </div>
                  <h4 className="text-xl font-bold text-white mb-3">{feature.title}</h4>
                  <p className="text-gray-300 leading-relaxed">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Professional Call to Action */}
          <motion.div className="text-center" variants={fadeInUp} initial="initial" animate="animate">
            <motion.div
              className="bg-gradient-to-r from-blue-600/20 to-indigo-600/20 backdrop-blur-sm rounded-2xl border border-white/10 shadow-xl p-8 md:p-12"
              whileHover={{
                backgroundColor: "rgba(59, 130, 246, 0.15)",
                borderColor: "rgba(255, 255, 255, 0.15)",
              }}
              transition={{ duration: 0.3 }}
            >
              <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-r from-blue-600 to-indigo-700 rounded-xl flex items-center justify-center shadow-lg">
                <Microscope className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">Join MEDCON'25</h3>
              <p className="text-xl text-gray-300 mb-8 leading-relaxed max-w-3xl mx-auto">
                Advance your career in infectious disease medicine through evidence-based learning, professional
                networking, and innovative healthcare solutions.
              </p>
              <motion.a
                href="/abstract"
                className="inline-flex items-center bg-gradient-to-r from-blue-600 to-indigo-700 text-white font-semibold py-4 px-8 rounded-lg shadow-lg group"
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 20px 40px -12px rgba(59, 130, 246, 0.4)",
                }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.2 }}
              >
                Register Now
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </motion.a>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  )
}

export default AboutusMain
