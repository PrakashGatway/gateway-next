import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { Award, CheckCircle, Mic, Headphones, Monitor } from "lucide-react"

export const metadata: Metadata = {
  title: "PTE Preparation - Gateway Abroad Education | Expert PTE Coaching",
  description:
    "Excel in PTE Academic with our comprehensive computer-based test preparation. Expert training for Speaking, Writing, Reading, and Listening.",
}

export default function PTEPage() {
  const features = [
    {
      icon: <Monitor className="h-8 w-8" />,
      title: "Computer-Based",
      description: "Specialized training for AI-scored test format",
    },
    {
      icon: <Mic className="h-8 w-8" />,
      title: "Speaking Practice",
      description: "Advanced microphone and pronunciation training",
    },
    {
      icon: <Headphones className="h-8 w-8" />,
      title: "Listening Skills",
      description: "Audio-based question type mastery",
    },
    {
      icon: <Award className="h-8 w-8" />,
      title: "Quick Results",
      description: "Fast score reporting within 2 business days",
    },
  ]

  const sections = [
    {
      name: "Speaking & Writing",
      duration: "77-93 minutes",
      tasks: "7 question types",
      description: "Integrated skills assessment with computer recording",
      types: [
        "Read Aloud",
        "Repeat Sentence",
        "Describe Image",
        "Re-tell Lecture",
        "Answer Short Question",
        "Summarize Written Text",
        "Essay Writing",
      ],
    },
    {
      name: "Reading",
      duration: "32-41 minutes",
      tasks: "5 question types",
      description: "Academic reading comprehension and language skills",
      types: [
        "Multiple Choice Single",
        "Multiple Choice Multiple",
        "Re-order Paragraphs",
        "Fill in the Blanks",
        "Reading & Writing Fill Blanks",
      ],
    },
    {
      name: "Listening",
      duration: "45-57 minutes",
      tasks: "8 question types",
      description: "Audio-based comprehension and note-taking skills",
      types: [
        "Summarize Spoken Text",
        "Multiple Choice Multiple",
        "Fill in the Blanks",
        "Highlight Correct Summary",
        "Multiple Choice Single",
        "Select Missing Word",
        "Highlight Incorrect Words",
        "Write from Dictation",
      ],
    },
  ]

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="hero-gradient section-padding relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-4 h-4 bg-violet-500 rounded-full animate-bounce-slow"></div>
          <div className="absolute top-40 right-20 w-6 h-6 bg-purple-500 rounded-full animate-float"></div>
          <div className="absolute bottom-20 left-1/4 w-8 h-8 bg-indigo-400 rounded-full animate-pulse-slow"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="animate-fadeInLeft">
                <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-4">
                  Excel in <span className="text-gradient">PTE Academic</span>
                </h1>
                <p className="text-xl text-gray-600 leading-relaxed">
                  Master the computer-based PTE Academic test with our specialized preparation program. Get your results
                  in just 2 business days.
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
                  <div className="text-2xl font-bold text-gradient">79+</div>
                  <p className="text-gray-600 text-sm">Average Score</p>
                </div>
                <div className="bg-white/80 backdrop-blur-sm p-4 rounded-xl">
                  <div className="text-2xl font-bold text-gradient">2 Days</div>
                  <p className="text-gray-600 text-sm">Result Time</p>
                </div>
              </div>
            </div>

            <div className="animate-fadeInRight">
              <div className="relative">
                <Image
                  src="/placeholder.svg?height=500&width=600"
                  alt="PTE Preparation"
                  width={600}
                  height={500}
                  className="w-full h-auto rounded-2xl shadow-2xl animate-float"
                />
                <div className="absolute -top-4 -right-4 bg-gradient-to-r from-violet-500 to-purple-500 text-white p-3 rounded-full animate-bounce-slow">
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
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Choose Our PTE Program?</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Specialized training for the AI-powered computer-based test format
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="text-center p-6 bg-gradient-to-br from-violet-50 to-purple-50 rounded-xl card-hover animate-fadeInUp"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="text-violet-600 mb-4 flex justify-center animate-pulse-slow">{feature.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PTE Sections */}
      <section className="section-padding bg-gradient-to-br from-violet-50 to-purple-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 animate-fadeInUp">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">PTE Academic Test Format</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Integrated skills assessment with computer-based delivery
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {sections.map((section, index) => (
              <div
                key={index}
                className="bg-white p-8 rounded-2xl shadow-lg card-hover animate-fadeInUp"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{section.name}</h3>
                  <div className="text-violet-600 font-semibold">{section.duration}</div>
                  <div className="text-sm text-gray-500">{section.tasks}</div>
                </div>

                <p className="text-gray-600 mb-6">{section.description}</p>

                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">Question Types:</h4>
                  <div className="space-y-2 max-h-48 overflow-y-auto">
                    {section.types.map((type, idx) => (
                      <div key={idx} className="flex items-start text-gray-600">
                        <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                        <span className="text-sm">{type}</span>
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
            <h2 className="text-4xl font-bold text-gray-900 mb-4">PTE Score Guide</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Understand PTE scoring and university requirements
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-8 bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl card-hover animate-fadeInUp">
              <div className="text-4xl font-bold text-green-600 mb-4">50-65</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Good Score</h3>
              <p className="text-gray-600">Equivalent to IELTS 6.0-6.5</p>
            </div>
            <div className="text-center p-8 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl card-hover animate-fadeInUp animate-stagger-1">
              <div className="text-4xl font-bold text-blue-600 mb-4">65-79</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Great Score</h3>
              <p className="text-gray-600">Equivalent to IELTS 7.0-7.5</p>
            </div>
            <div className="text-center p-8 bg-gradient-to-br from-purple-50 to-violet-50 rounded-2xl card-hover animate-fadeInUp animate-stagger-2">
              <div className="text-4xl font-bold text-purple-600 mb-4">79+</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Excellent Score</h3>
              <p className="text-gray-600">Equivalent to IELTS 8.0+</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-gradient-to-r from-violet-600 to-purple-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <div className="animate-fadeInUp">
            <h2 className="text-4xl font-bold mb-4">Ready to Master PTE Academic?</h2>
            <p className="text-xl mb-8 opacity-90">
              Start your PTE preparation and get your results in just 2 business days
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="bg-white text-violet-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
              >
                Book Free Demo
              </Link>
              <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-violet-600 transition-colors">
                Practice Online
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
