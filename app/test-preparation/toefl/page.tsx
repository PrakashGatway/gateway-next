import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { Users, Award, BookOpen, CheckCircle, Monitor } from "lucide-react"

export const metadata: Metadata = {
  title: "TOEFL Preparation - Gateway Abroad Education | Expert TOEFL Coaching",
  description:
    "Excel in TOEFL iBT with our comprehensive preparation program. Expert training for Reading, Listening, Speaking, and Writing sections.",
}

export default function TOEFLPage() {
  const features = [
    {
      icon: <Monitor className="h-8 w-8" />,
      title: "iBT Focused",
      description: "Internet-based test preparation with computer practice",
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: "Expert Faculty",
      description: "Trainers with 110+ TOEFL scores and US education",
    },
    {
      icon: <BookOpen className="h-8 w-8" />,
      title: "ETS Materials",
      description: "Official ETS materials and practice tests",
    },
    {
      icon: <Award className="h-8 w-8" />,
      title: "High Scores",
      description: "Average student score improvement of 25+ points",
    },
  ]

  const sections = [
    {
      name: "Reading",
      duration: "54-72 minutes",
      passages: "3-4 passages",
      questions: "30-40 questions",
      description: "Academic passages from university-level textbooks",
      skills: ["Main ideas", "Details", "Inferences", "Vocabulary"],
    },
    {
      name: "Listening",
      duration: "41-57 minutes",
      passages: "3-4 lectures, 2-3 conversations",
      questions: "28-39 questions",
      description: "University lectures and campus conversations",
      skills: ["Main ideas", "Details", "Function", "Attitude"],
    },
    {
      name: "Speaking",
      duration: "17 minutes",
      passages: "4 tasks",
      questions: "Independent & Integrated",
      description: "Express opinions and summarize information",
      skills: ["Fluency", "Pronunciation", "Grammar", "Vocabulary"],
    },
    {
      name: "Writing",
      duration: "50 minutes",
      passages: "2 tasks",
      questions: "Integrated & Independent",
      description: "Academic writing tasks with time management",
      skills: ["Organization", "Development", "Grammar", "Vocabulary"],
    },
  ]

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="hero-gradient section-padding relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-4 h-4 bg-purple-500 rounded-full animate-bounce-slow"></div>
          <div className="absolute top-40 right-20 w-6 h-6 bg-indigo-500 rounded-full animate-float"></div>
          <div className="absolute bottom-20 left-1/4 w-8 h-8 bg-blue-400 rounded-full animate-pulse-slow"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="animate-fadeInLeft">
                <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-4">
                  Excel in <span className="text-gradient">TOEFL iBT</span>
                </h1>
                <p className="text-xl text-gray-600 leading-relaxed">
                  Achieve your target TOEFL score with our comprehensive iBT preparation program. Master all four
                  sections with expert guidance.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 animate-fadeInLeft animate-stagger-2">
                <Link href="/contact" className="btn-primary">
                  Start Preparation
                </Link>
                <button className="btn-secondary">Free Assessment</button>
              </div>

              <div className="grid grid-cols-2 gap-4 animate-fadeInLeft animate-stagger-3">
                <div className="bg-white/80 backdrop-blur-sm p-4 rounded-xl">
                  <div className="text-2xl font-bold text-gradient">110+</div>
                  <p className="text-gray-600 text-sm">Average Score</p>
                </div>
                <div className="bg-white/80 backdrop-blur-sm p-4 rounded-xl">
                  <div className="text-2xl font-bold text-gradient">800+</div>
                  <p className="text-gray-600 text-sm">Students Trained</p>
                </div>
              </div>
            </div>

            <div className="animate-fadeInRight">
              <div className="relative">
                <Image
                  src="/placeholder.svg?height=500&width=600"
                  alt="TOEFL Preparation"
                  width={600}
                  height={500}
                  className="w-full h-auto rounded-2xl shadow-2xl animate-float"
                />
                <div className="absolute -top-4 -right-4 bg-gradient-to-r from-purple-500 to-indigo-500 text-white p-3 rounded-full animate-bounce-slow">
                  <Monitor className="h-6 w-6" />
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
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Choose Our TOEFL Program?</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Specialized training for the internet-based TOEFL test format
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="text-center p-6 bg-gradient-to-br from-purple-50 to-indigo-50 rounded-xl card-hover animate-fadeInUp"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="text-purple-600 mb-4 flex justify-center animate-pulse-slow">{feature.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TOEFL Sections */}
      <section className="section-padding bg-gradient-to-br from-purple-50 to-indigo-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 animate-fadeInUp">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">TOEFL iBT Test Sections</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">Master each section with our targeted approach</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {sections.map((section, index) => (
              <div
                key={index}
                className="bg-white p-8 rounded-2xl shadow-lg card-hover animate-fadeInUp"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-2xl font-bold text-gray-900">{section.name}</h3>
                  <div className="text-right">
                    <div className="text-sm text-gray-500">{section.duration}</div>
                    <div className="text-sm text-purple-600">{section.questions}</div>
                  </div>
                </div>

                <div className="mb-4">
                  <p className="text-gray-600 mb-2">{section.description}</p>
                  <p className="text-sm text-indigo-600">{section.passages}</p>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">Key Skills:</h4>
                  <div className="grid grid-cols-2 gap-2">
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
            <h2 className="text-4xl font-bold text-gray-900 mb-4">TOEFL Score Guide</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Understand what scores you need for your target universities
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-8 bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl card-hover animate-fadeInUp">
              <div className="text-4xl font-bold text-green-600 mb-4">80-90</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Good Score</h3>
              <p className="text-gray-600">Acceptable for most universities and programs</p>
            </div>
            <div className="text-center p-8 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl card-hover animate-fadeInUp animate-stagger-1">
              <div className="text-4xl font-bold text-blue-600 mb-4">90-100</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Great Score</h3>
              <p className="text-gray-600">Competitive for top-tier universities</p>
            </div>
            <div className="text-center p-8 bg-gradient-to-br from-purple-50 to-violet-50 rounded-2xl card-hover animate-fadeInUp animate-stagger-2">
              <div className="text-4xl font-bold text-purple-600 mb-4">100+</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Excellent Score</h3>
              <p className="text-gray-600">Opens doors to Ivy League schools</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-gradient-to-r from-purple-600 to-indigo-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <div className="animate-fadeInUp">
            <h2 className="text-4xl font-bold mb-4">Ready to Conquer TOEFL?</h2>
            <p className="text-xl mb-8 opacity-90">Start your TOEFL preparation journey with our expert guidance</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="bg-white text-purple-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
              >
                Book Free Demo
              </Link>
              <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-purple-600 transition-colors">
                Get Study Plan
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
