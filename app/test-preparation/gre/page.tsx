import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { Award, CheckCircle, Calculator, PenTool, Brain } from "lucide-react"

export const metadata: Metadata = {
  title: "GRE Preparation - Gateway Abroad Education | Expert GRE Coaching",
  description:
    "Master GRE with our comprehensive preparation program. Expert training for Verbal Reasoning, Quantitative Reasoning, and Analytical Writing.",
}

export default function GREPage() {
  const features = [
    {
      icon: <Brain className="h-8 w-8" />,
      title: "Strategic Approach",
      description: "Proven strategies for each question type",
    },
    {
      icon: <Calculator className="h-8 w-8" />,
      title: "Quant Mastery",
      description: "Advanced mathematical concepts and shortcuts",
    },
    {
      icon: <PenTool className="h-8 w-8" />,
      title: "Verbal Excellence",
      description: "Vocabulary building and reading comprehension",
    },
    {
      icon: <Award className="h-8 w-8" />,
      title: "High Scores",
      description: "Average score improvement of 50+ points",
    },
  ]

  const sections = [
    {
      name: "Verbal Reasoning",
      duration: "60 minutes",
      questions: "40 questions (2 sections)",
      scoreRange: "130-170",
      description: "Reading comprehension, text completion, and sentence equivalence",
      topics: ["Reading Comprehension", "Text Completion", "Sentence Equivalence", "Vocabulary"],
    },
    {
      name: "Quantitative Reasoning",
      duration: "70 minutes",
      questions: "40 questions (2 sections)",
      scoreRange: "130-170",
      description: "Arithmetic, algebra, geometry, and data analysis",
      topics: ["Arithmetic", "Algebra", "Geometry", "Data Analysis"],
    },
    {
      name: "Analytical Writing",
      duration: "60 minutes",
      questions: "2 essays",
      scoreRange: "0-6",
      description: "Analyze an issue and analyze an argument",
      topics: ["Issue Task", "Argument Task", "Critical Thinking", "Essay Structure"],
    },
  ]

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="hero-gradient section-padding relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-4 h-4 bg-orange-500 rounded-full animate-bounce-slow"></div>
          <div className="absolute top-40 right-20 w-6 h-6 bg-red-500 rounded-full animate-float"></div>
          <div className="absolute bottom-20 left-1/4 w-8 h-8 bg-yellow-400 rounded-full animate-pulse-slow"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="animate-fadeInLeft">
                <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-4">
                  Master the <span className="text-gradient">GRE</span>
                </h1>
                <p className="text-xl text-gray-600 leading-relaxed">
                  Achieve your target GRE score with our comprehensive preparation program. Expert training for graduate
                  school success.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 animate-fadeInLeft animate-stagger-2">
                <Link href="/contact" className="btn-primary">
                  Start Preparation
                </Link>
                <button className="btn-secondary">Free Diagnostic Test</button>
              </div>

              <div className="grid grid-cols-2 gap-4 animate-fadeInLeft animate-stagger-3">
                <div className="bg-white/80 backdrop-blur-sm p-4 rounded-xl">
                  <div className="text-2xl font-bold text-gradient">320+</div>
                  <p className="text-gray-600 text-sm">Average Score</p>
                </div>
                <div className="bg-white/80 backdrop-blur-sm p-4 rounded-xl">
                  <div className="text-2xl font-bold text-gradient">600+</div>
                  <p className="text-gray-600 text-sm">Students Placed</p>
                </div>
              </div>
            </div>

            <div className="animate-fadeInRight">
              <div className="relative">
                <Image
                  src="/placeholder.svg?height=500&width=600"
                  alt="GRE Preparation"
                  width={600}
                  height={500}
                  className="w-full h-auto rounded-2xl shadow-2xl animate-float"
                />
                <div className="absolute -top-4 -right-4 bg-gradient-to-r from-orange-500 to-red-500 text-white p-3 rounded-full animate-bounce-slow">
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
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Choose Our GRE Program?</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive preparation with proven strategies and expert guidance
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="text-center p-6 bg-gradient-to-br from-orange-50 to-red-50 rounded-xl card-hover animate-fadeInUp"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="text-orange-600 mb-4 flex justify-center animate-pulse-slow">{feature.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* GRE Sections */}
      <section className="section-padding bg-gradient-to-br from-orange-50 to-red-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 animate-fadeInUp">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">GRE Test Sections</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Master each section with targeted preparation strategies
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
                  <div className="text-orange-600 font-semibold">{section.scoreRange}</div>
                </div>

                <div className="space-y-4 mb-6">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Duration:</span>
                    <span className="font-medium">{section.duration}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Questions:</span>
                    <span className="font-medium">{section.questions}</span>
                  </div>
                </div>

                <p className="text-gray-600 mb-6">{section.description}</p>

                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">Key Topics:</h4>
                  <div className="space-y-2">
                    {section.topics.map((topic, idx) => (
                      <div key={idx} className="flex items-center text-gray-600">
                        <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                        <span className="text-sm">{topic}</span>
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
            <h2 className="text-4xl font-bold text-gray-900 mb-4">GRE Score Guide</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Understand what scores you need for your target graduate programs
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-8 bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl card-hover animate-fadeInUp">
              <div className="text-4xl font-bold text-green-600 mb-4">300-310</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Good Score</h3>
              <p className="text-gray-600">Acceptable for most graduate programs</p>
            </div>
            <div className="text-center p-8 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl card-hover animate-fadeInUp animate-stagger-1">
              <div className="text-4xl font-bold text-blue-600 mb-4">310-320</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Great Score</h3>
              <p className="text-gray-600">Competitive for top universities</p>
            </div>
            <div className="text-center p-8 bg-gradient-to-br from-purple-50 to-violet-50 rounded-2xl card-hover animate-fadeInUp animate-stagger-2">
              <div className="text-4xl font-bold text-purple-600 mb-4">320+</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Excellent Score</h3>
              <p className="text-gray-600">Opens doors to Ivy League schools</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-gradient-to-r from-orange-600 to-red-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <div className="animate-fadeInUp">
            <h2 className="text-4xl font-bold mb-4">Ready to Ace the GRE?</h2>
            <p className="text-xl mb-8 opacity-90">Start your GRE preparation journey with our proven methodology</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="bg-white text-orange-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
              >
                Book Free Consultation
              </Link>
              <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-orange-600 transition-colors">
                Download Study Guide
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
