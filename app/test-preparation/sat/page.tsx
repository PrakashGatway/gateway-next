import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { Award, CheckCircle, Calculator, FileText, Brain } from "lucide-react"

export const metadata: Metadata = {
  title: "SAT Preparation - Gateway Abroad Education | Expert SAT Coaching",
  description:
    "Excel in SAT with our comprehensive undergraduate preparation program. Expert training for Math, Evidence-Based Reading and Writing sections.",
}

export default function SATPage() {
  const features = [
    {
      icon: <Brain className="h-8 w-8" />,
      title: "Strategic Prep",
      description: "Test-taking strategies and time management",
    },
    {
      icon: <Calculator className="h-8 w-8" />,
      title: "Math Mastery",
      description: "Algebra, geometry, and advanced math concepts",
    },
    {
      icon: <FileText className="h-8 w-8" />,
      title: "Reading & Writing",
      description: "Critical reading and grammar excellence",
    },
    {
      icon: <Award className="h-8 w-8" />,
      title: "High Scores",
      description: "Average score improvement of 200+ points",
    },
  ]

  const sections = [
    {
      name: "Evidence-Based Reading and Writing",
      duration: "64 minutes",
      questions: "52 questions",
      scoreRange: "200-800",
      description: "Reading comprehension and writing & language skills",
      components: ["Reading Test (52 min, 52 questions)", "Writing and Language Test (35 min, 44 questions)"],
      skills: ["Command of Evidence", "Words in Context", "Analysis in History/Social Studies", "Analysis in Science"],
    },
    {
      name: "Math",
      duration: "80 minutes",
      questions: "58 questions",
      scoreRange: "200-800",
      description: "Problem solving and data analysis, algebra, and advanced math",
      components: ["Calculator Section (55 min, 38 questions)", "No Calculator Section (25 min, 20 questions)"],
      skills: ["Algebra", "Problem Solving and Data Analysis", "Advanced Math", "Geometry and Trigonometry"],
    },
  ]

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="hero-gradient section-padding relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-4 h-4 bg-rose-500 rounded-full animate-bounce-slow"></div>
          <div className="absolute top-40 right-20 w-6 h-6 bg-pink-500 rounded-full animate-float"></div>
          <div className="absolute bottom-20 left-1/4 w-8 h-8 bg-red-400 rounded-full animate-pulse-slow"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="animate-fadeInLeft">
                <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-4">
                  Master the <span className="text-gradient">SAT</span>
                </h1>
                <p className="text-xl text-gray-600 leading-relaxed">
                  Achieve your target SAT score and secure admission to top US universities with our comprehensive
                  preparation program.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 animate-fadeInLeft animate-stagger-2">
                <Link href="/contact" className="btn-primary">
                  Start Preparation
                </Link>
                <button className="btn-secondary">Free Practice Test</button>
              </div>

              <div className="grid grid-cols-2 gap-4 animate-fadeInLeft animate-stagger-3">
                <div className="bg-white/80 backdrop-blur-sm p-4 rounded-xl">
                  <div className="text-2xl font-bold text-gradient">1450+</div>
                  <p className="text-gray-600 text-sm">Average Score</p>
                </div>
                <div className="bg-white/80 backdrop-blur-sm p-4 rounded-xl">
                  <div className="text-2xl font-bold text-gradient">300+</div>
                  <p className="text-gray-600 text-sm">College Admits</p>
                </div>
              </div>
            </div>

            <div className="animate-fadeInRight">
              <div className="relative">
                <Image
                  src="/placeholder.svg?height=500&width=600"
                  alt="SAT Preparation"
                  width={600}
                  height={500}
                  className="w-full h-auto rounded-2xl shadow-2xl animate-float"
                />
                <div className="absolute -top-4 -right-4 bg-gradient-to-r from-rose-500 to-pink-500 text-white p-3 rounded-full animate-bounce-slow">
                  <Brain className="h-6 w-6" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="section-padding bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 animate-fadeInUp">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Choose Our SAT Program?</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive preparation for undergraduate admissions success
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="text-center p-6 bg-gradient-to-br from-rose-50 to-pink-50 rounded-xl card-hover animate-fadeInUp"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="text-rose-600 mb-4 flex justify-center animate-pulse-slow">{feature.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SAT Sections */}
      <section className="section-padding bg-gradient-to-br from-rose-50 to-pink-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 animate-fadeInUp">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">SAT Test Sections</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Master both sections with our targeted preparation approach
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {sections.map((section, index) => (
              <div
                key={index}
                className="bg-white p-8 rounded-2xl shadow-lg card-hover animate-fadeInUp"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{section.name}</h3>
                  <div className="text-rose-600 font-semibold">{section.scoreRange}</div>
                  <div className="text-sm text-gray-500">
                    {section.duration} • {section.questions}
                  </div>
                </div>

                <p className="text-gray-600 mb-6">{section.description}</p>

                <div className="mb-6">
                  <h4 className="font-semibold text-gray-900 mb-3">Test Components:</h4>
                  <div className="space-y-2">
                    {section.components.map((component, idx) => (
                      <div key={idx} className="flex items-start text-gray-600">
                        <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                        <span className="text-sm">{component}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">Key Skills:</h4>
                  <div className="space-y-2">
                    {section.skills.map((skill, idx) => (
                      <div key={idx} className="flex items-center text-gray-600">
                        <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                        <span className="text-sm">{skill}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Score Guide */}
      <section className="section-padding bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 animate-fadeInUp">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">SAT Score Guide</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Understand what scores you need for your target universities
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-8 bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl card-hover animate-fadeInUp">
              <div className="text-4xl font-bold text-green-600 mb-4">1200-1350</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Good Score</h3>
              <p className="text-gray-600">State universities and good colleges</p>
            </div>
            <div className="text-center p-8 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl card-hover animate-fadeInUp animate-stagger-1">
              <div className="text-4xl font-bold text-blue-600 mb-4">1350-1500</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Great Score</h3>
              <p className="text-gray-600">Top-tier universities</p>
            </div>
            <div className="text-center p-8 bg-gradient-to-br from-purple-50 to-violet-50 rounded-2xl card-hover animate-fadeInUp animate-stagger-2">
              <div className="text-4xl font-bold text-purple-600 mb-4">1500+</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Excellent Score</h3>
              <p className="text-gray-600">Ivy League and elite schools</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-gradient-to-r from-rose-600 to-pink-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <div className="animate-fadeInUp">
            <h2 className="text-4xl font-bold mb-4">Ready to Ace the SAT?</h2>
            <p className="text-xl mb-8 opacity-90">Start your SAT preparation journey and unlock your college dreams</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="bg-white text-rose-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
              >
                Book Free Consultation
              </Link>
              <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-rose-600 transition-colors">
                Download Study Plan
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
