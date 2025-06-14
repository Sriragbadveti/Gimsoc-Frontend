"use client"

export default function FAQSection() {
  const faqs = [
    {
      question: "What is included in the registration fee?",
      answer:
        "Registration includes access to all keynote sessions, workshops, lunch and refreshments for all conference days, networking events, and a certificate of attendance.",
    },
    {
      question: "Can I get a refund if I can't attend?",
      answer:
        "Refunds are available up to 30 days before the event with a 15% processing fee. Within 30 days of the event, we offer credit for next year's conference instead of refunds.",
    },
    {
      question: "How do I submit an abstract?",
      answer:
        "Select the 'Abstract Submission' option during registration. You'll be prompted to provide your abstract title and text. The committee will review all submissions and notify selected presenters.",
    },
    {
      question: "Are there accommodations for international attendees?",
      answer:
        "Yes, we have partnered with local hotels to provide discounted rates for conference attendees. Select the 'International Package' option during registration for assistance with accommodations.",
    },
  ]

  return (
    <div className="bg-gray-50 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-none">
          <div className="grid grid-cols-1 gap-x-8 gap-y-16 lg:grid-cols-2">
            <div>
              <h2 className="text-4xl font-semibold tracking-tight text-gray-900">Frequently asked questions</h2>
              <p className="mt-4 text-lg text-gray-600">
                Can't find the answer you're looking for? Reach out to our{" "}
                <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                  customer support team
                </a>
                .
              </p>
            </div>
            <div className="grid grid-cols-1 gap-6">
  {faqs.map((faq, index) => (
    <div
      key={index}
      className={`p-6 rounded-lg transform transition-all duration-300 hover:-translate-y-2 hover:scale-[1.03] hover:shadow-xl text-white ${
        index % 2 === 0
          ? "bg-gradient-to-br from-[#4aa053] to-[#1e4923] hover:from-[#3b8647] hover:to-[#153b1d]"
          : "bg-gradient-to-br from-[#c43410] to-[#461307] hover:from-[#a62f0e] hover:to-[#320e05]"
      }`}
    >
      <h3 className="text-lg font-medium mb-2">{faq.question}</h3>
      <p>{faq.answer}</p>
    </div>
  ))}
</div>
          </div>
        </div>
      </div>
    </div>
  )
}
