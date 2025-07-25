export default function About() {
    return (
      <div className="bg-gray-50 py-24 sm:py-32">
        <div className="mx-auto max-w-2xl px-6 lg:max-w-7xl lg:px-8">
          <h2 className="text-center text-base/7 font-semibold text-indigo-600"></h2>
          <p className="mx-auto mt-2 max-w-lg text-center text-4xl font-semibold tracking-tight text-balance text-gray-950 sm:text-5xl">
            About MEDCON'25
          </p>
          <div className="mx-auto mt-8 max-w-2xl text-center">
            <p className="text-lg font-medium text-gray-500 sm:text-xl/8 tracking-tight">
              Centered around Infectious Diseases, this Conference offers a blend of new speakers, new innovations, bigger connections. Providing CPD accreditations, MEDCON’25 will bring together over 30 healthcare professionals, from USA, UK, UAE, South Africa, Georgia, India etc exploring the latest advancements, from Outbreaks to Breakthroughs in Infectious Diseases. Highlights include keynote sessions from notable speakers, hands-on workshops, and discussions on emerging therapies — offering an excellent opportunity for students and Healthcare professionals to engage directly with leading experts and practitioners.



            </p>
            
          </div>
          <div className="mt-10 grid gap-6 sm:mt-16 md:grid-cols-2 lg:grid-cols-3">
            {/* Card 1 - Networking */}
            {/* Card 1 - Networking */}
<div className="relative">
  <div className="flex flex-col items-center p-6 bg-gradient-to-br from-[#4aa053] to-[#1e4923] rounded-lg border border-gray-200 transition-all duration-300 hover:-translate-y-2 hover:shadow-lg">
    <div className="flex items-center justify-center w-16 h-16 rounded-full bg-white mb-4">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-8 h-8 text-[#4aa053]"
      >
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    </div>
    <h3 className="text-xl font-semibold text-center text-white mb-2">Networking</h3>
    <p className="text-white text-center">
      Connect with fellow students, renowned professors, and industry professionals to expand your medical
      network.
    </p>
  </div>
</div>

{/* Card 2 - Workshops */}
<div className="relative">
  <div className="flex flex-col items-center p-6 bg-gradient-to-br from-[#c43410] to-[#461307] rounded-lg border border-gray-200 transition-all duration-300 hover:-translate-y-2 hover:shadow-lg">
    <div className="flex items-center justify-center w-16 h-16 rounded-full bg-white mb-4">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-8 h-8 text-[#c43410]"
      >
        <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
        <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
      </svg>
    </div>
    <h3 className="text-xl font-semibold text-center text-white mb-2">Workshops</h3>
    <p className="text-white text-center">
      Participate in hands-on workshops led by expert practitioners across various medical specialties.
    </p>
  </div>
</div>
  
            {/* Card 3 - Research */}
            <div className="relative md:col-span-2 lg:col-span-1">
              <div className="flex flex-col items-center p-6 bg-gradient-to-br from-[#4aa053] to-[#1e4923] rounded-lg border border-gray-200 transition-all duration-300 hover:-translate-y-2 hover:shadow-lg">
                <div className="flex items-center justify-center w-16 h-16 rounded-full bg-white mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-8 h-8 text-blue-600"
                  >
                    <path d="M12 15l8.5-8.5c.8-.8.8-2 0-2.8l-1.8-1.8c-.8-.8-2-.8-2.8 0L7.5 10.5" />
                    <path d="M8.5 11.5 5 15H2l1-1 7-7 1-1 3 3-1 1-7 7-1 1v-3l3.5-3.5" />
                    <path d="M15 5 5 15" />
                    <path d="m18 12 4 4" />
                    <path d="M19 9v5h5" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-center text-white mb-2">Research</h3>
                <p className="text-white text-center">
                  Present your research through poster sessions and abstract submissions, with awards for outstanding
                  contributions.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
  