import Image from "next/image"

interface TestPrepCard {
  id: string
  title: string
  description: string
  isHighlighted?: boolean
}

const testPrepData: TestPrepCard[] = [
  {
    id: "gmat",
    title: "GMAT",
    description: "Crack the business school code with our data-driven insights & practice.",
  },
  {
    id: "ielts",
    title: "IELTS",
    description: "Master English for global study & migration with expert guidance.",
  },
  {
    id: "toefl",
    title: "TOEFL",
    description: "Open doors to foreign universities with our comprehensive TOEFL prep.",
  },
  {
    id: "gre",
    title: "GRE",
    description: "Gateway Abroad: Your pathway to triumph in graduate school",
  },
  {
    id: "pte",
    title: "PTE",
    description: "Conquer the computer-based test with our flexible & focused prep.",
  },
  {
    id: "sat",
    title: "SAT",
    description: "Ace US university admissions with personalized strategies & top-notch materials.",
  },
]

const processSteps = [
  {
    id: 1,
    title: "Counsell",
    description:
      "It involves providing personalized advice to aid students in selecting the most suitable exam for their desired countries.",
    icon: "https://www.gatewayabroadeducations.com/assets/img/vetting1.svg",
    color: "text-[#ffa515]",
  },
  {
    id: 2,
    title: "Teach",
    description:
      "Guiding individuals through a comprehensive process aimed at clearing the fundamentals of the students.",
    icon: "https://www.gatewayabroadeducations.com/assets/img//vetting4.svg",
    color: "text-[#00817d]",
  },
  {
    id: 3,
    title: "Practice",
    description:
      "Engaging in regular and focused practice not only enhances one's understanding of the material but also hones skills, refines problem-solving abilities, and builds confidence.",
    icon: "https://www.gatewayabroadeducations.com/assets/img/vetting3.svg",
    color: "text-[#ff5e5b]",
  },
  {
    id: 4,
    title: "Feedback & Mock",
    description:
      "Regularly engage in mock exams and feedback sessions to familiarize yourself with the exam environment, improve time management, and identify areas that need further attention.",
    icon: "https://www.gatewayabroadeducations.com/assets/img//vetting4.svg",
    color: "text-[#7e5c6a]",
  },
  {
    id: 5,
    title: "Book Test Date",
    description: "Test date booking facility offered by Gateway Abroad.",
    icon: "https://www.gatewayabroadeducations.com/assets/img/vetting5.svg",
    color: "text-[#ff824b]",
  },
]

const TestPreparation = () => {
  return (
    <>
      <div className="bg-gradient-to-br from-slate-50 via-white to-slate-100 py-16 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Title */}
          <div className="mb-10">
            <h1 className="text-4xl md:text-4xl font-extrabold bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent mb-4">
              Test Preparation
            </h1>
          </div>
          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mx-auto">
            {testPrepData.map((test, index) => (
              <div
                key={test.id}
                className={`
                relative overflow-hidden rounded-3xl p-8 cursor-pointer
                transition-all duration-500 ease-out
                transform hover:scale-105 hover:-translate-y-2
                shadow-lg hover:shadow-2xl hover:shadow-rose-500/25
                backdrop-blur-sm border border-white/20
                ${
                  test.isHighlighted
                    ? "bg-gradient-to-br from-rose-600 via-rose-500 to-pink-600 text-white"
                    : "bg-gradient-to-br from-gray-200 via-gray-50 to-white text-gray-800 hover:from-rose-600 hover:via-rose-500 hover:to-pink-600 hover:text-white"
                }
                group animate-fade-in
              `}
                style={{ animationDelay: `${index * 150}ms` }}
              >
                {/* Animated background patterns */}
                <div className="absolute inset-0 opacity-10">
                  <div className="absolute top-0 left-0 w-32 h-32 bg-gray rounded-full -translate-x-16 -translate-y-16 group-hover:scale-150 transition-transform duration-700"></div>
                  <div className="absolute bottom-0 right-0 w-24 h-24 bg-white rounded-full translate-x-12 translate-y-12 group-hover:scale-150 transition-transform duration-700"></div>
                </div>
                {/* Shimmer effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                {/* Content */}
                <div className="relative z-10">
                  {/* Test Name */}
                  <h2 className="text-2xl md:text-2xl font-bold mb-4 text-center transition-all duration-300 group-hover:scale-105">
                    {test.title}
                  </h2>
                  {/* Description */}
                  <p className="text-sm md:text-base leading-relaxed text-center transition-all duration-300 opacity-90 group-hover:opacity-100">
                    {test.description}
                  </p>
                </div>
                {/* Glowing border effect */}
                <div className="absolute inset-0 rounded-3xl transition-all duration-500 opacity-0 group-hover:opacity-100">
                  <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-rose-400 via-pink-400 to-rose-400 p-0.5">
                    <div className="w-full h-full rounded-3xl bg-transparent"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <section className="max-w-7xl mx-auto py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-3">Our working Process</h2>
          <p className="text-center text-gray-600">
            A platform that takes care of everything beforehand. Gateway Abroad sources, <br />
            vets, matches and manages all the talents.
          </p>

          {/* Desktop Layout */}
          <div className="hidden lg:flex mt-10 flex-col lg:flex-row items-center lg:items-start justify-center">
            {/* Left Side */}
            <div className="flex flex-col gap-12 lg:w-1/3 max-w-[300px] text-right">
              <div className="py-10"></div>
              <div>
                <div className="group cursor-pointer">
                  <Image
                    src="https://www.gatewayabroadeducations.com/assets/img//vetting4.svg"
                    alt="Teach"
                    width={60}
                    height={60}
                    className="mx-auto lg:ml-auto lg:mr-0 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6"
                  />
                </div>
                <h3 className="text-xl font-semibold text-[#00817d] mt-3">Teach</h3>
                <p className="text-gray-600 mt-2 text-sm font-semibold">
                  Guiding individuals through a comprehensive process aimed at clearing the fundamentals of the
                  students.
                </p>
              </div>
              <div className="mt-5">
                <div className="group cursor-pointer">
                  <Image
                    src="https://www.gatewayabroadeducations.com/assets/img//vetting4.svg"
                    alt="Feedback & Mock"
                    width={60}
                    height={60}
                    className="mx-auto lg:ml-auto lg:mr-0 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6"
                  />
                </div>
                <h3 className="text-xl font-semibold text-[#7e5c6a] mt-2">Feedback & Mock</h3>
                <p className="text-gray-600 text-sm font-semibold mt-2">
                  Regularly engage in mock exams and feedback sessions to familiarize yourself with the exam
                  environment, improve time management, and identify areas that need further attention.
                </p>
              </div>
              <div className="mt-5">
                <div className="group cursor-pointer">
                  <Image
                    src="https://www.gatewayabroadeducations.com/assets/img//vetting4.svg"
                    alt="Feedback & Mock"
                    width={60}
                    height={60}
                    className="mx-auto lg:ml-auto lg:mr-0 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6"
                  />
                </div>
              </div>
            </div>
            {/* Center Timeline */}
            <div className="flex flex-col items-center mt-8 w-1/3">
              <Image
                src="https://www.gatewayabroadeducations.com/assets/img//vaetting-process-number.svg"
                alt="process"
                width={330}
                height={100}
              />
            </div>
            {/* Right Side */}
            <div className="flex flex-col gap-10 lg:w-1/3 max-w-[300px] text-left">
              <div className="mt-[-10px]">
                <div className="group cursor-pointer">
                  <Image
                    src="https://www.gatewayabroadeducations.com/assets/img/vetting1.svg"
                    alt="Counsell"
                    width={60}
                    height={60}
                    className="transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6"
                  />
                </div>
                <h3 className="text-xl font-semibold text-[#ffa515] mt-3">Counsell</h3>
                <p className="text-gray-600 mt-2 text-sm font-semibold">
                  It involves providing personalized advice to aid students in selecting the most suitable exam for
                  their desired countries.
                </p>
              </div>
              <div className="mt-4">
                <div className="group cursor-pointer">
                  <Image
                    src="https://www.gatewayabroadeducations.com/assets/img/vetting3.svg"
                    alt="Practice"
                    width={60}
                    height={60}
                    className="transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6"
                  />
                </div>
                <h3 className="text-xl font-semibold text-[#ff5e5b] mt-3">Practice</h3>
                <p className="text-gray-600 mt-2 text-sm font-semibold">
                  Engaging in regular and focused practice not only enhances one's understanding of the material but
                  also hones skills, refines problem-solving abilities, and builds confidence.
                </p>
              </div>
              <div className="mt-[-10px]">
                <div className="group cursor-pointer">
                  <Image
                    src="https://www.gatewayabroadeducations.com/assets/img/vetting5.svg"
                    alt="Book Test Date"
                    width={60}
                    height={60}
                    className="transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6"
                  />
                </div>
                <h3 className="text-xl font-semibold text-[#ff824b] mt-3">Book Test Date</h3>
                <p className="text-gray-600 mt-2 text-sm font-semibold">
                  Test date booking facility offered by Gateway Abroad.
                </p>
              </div>
            </div>
          </div>

          {/* Mobile Layout */}
          <div className="lg:hidden mt-10">
            <div className="space-y-8">
              {processSteps.map((step, index) => (
                <div key={step.id} className="flex items-start gap-4 group">
                  {/* Step Number */}
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-red-500 text-white rounded-full flex items-center justify-center font-bold text-lg shadow-lg group-hover:bg-red-600 transition-colors duration-300">
                      {step.id}
                    </div>
                    {/* Connecting Line */}
                    {index < processSteps.length - 1 && <div className="w-0.5 h-16 bg-gray-300 mx-auto mt-4"></div>}
                  </div>

                  {/* Step Content */}
                  <div className="flex-1 pb-8">
                    <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100">
                      <div className="flex items-start gap-4">
                        <div className="group/icon cursor-pointer">
                          <Image
                            src={step.icon || "/placeholder.svg"}
                            alt={step.title}
                            width={50}
                            height={50}
                            className="transition-transform duration-300 group-hover/icon:scale-110 group-hover/icon:rotate-6"
                          />
                        </div>
                        <div className="flex-1">
                          <h3
                            className={`text-lg font-semibold ${step.color} mb-2 group-hover:scale-105 transition-transform duration-300`}
                          >
                            {step.title}
                          </h3>
                          <p className="text-gray-600 text-sm font-medium leading-relaxed">{step.description}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default TestPreparation
