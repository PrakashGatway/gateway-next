import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { Award, CheckCircle, TrendingUp, BarChart, PieChart } from "lucide-react"

export const metadata: Metadata = {
  title: "GMAT Preparation - Gateway Abroad Education | Expert GMAT Coaching",
  description:
    "Excel in GMAT with our comprehensive MBA preparation program. Expert training for Quantitative, Verbal, Integrated Reasoning, and AWA sections.",
}

export default function GMATPage() {
  const features = [
    {
      icon: <TrendingUp className="h-8 w-8" />,
      title: "MBA Focus",
      description: "Specialized preparation for business school admissions",
    },
    {
      icon: <BarChart className="h-8 w-8" />,
      title: "Data Sufficiency",
      description: "Master unique GMAT question types",
    },
    {
      icon: <PieChart className="h-8 w-8" />,
      title: "Integrated Reasoning",
      description: "Excel in multi-source reasoning and graphics",
    },
    {
      icon: <Award className="h-8 w-8" />,
      title: "High Scores",
      description: "Average score improvement of 100+ points",
    },
  ]

  const sections = [
    {
      name: "Quantitative Reasoning",
      duration: "62 minutes",
      questions: "31 questions",
      scoreRange: "6-51",
      description: "Problem solving and data sufficiency questions",
      topics: ["Problem Solving", "Data Sufficiency", "Arithmetic", "Algebra", "Geometry"],
    },
    {
      name: "Verbal Reasoning",
      duration: "65 minutes",
      questions: "36 questions",
      scoreRange: "6-51",
      description: "Reading comprehension, critical reasoning, and sentence correction",
      topics: ["Reading Comprehension", "Critical Reasoning", "Sentence Correction", "Grammar"],
    },
    {
      name: "Integrated Reasoning",
      duration: "30 minutes",
      questions: "12 questions",
      scoreRange: "1-8",
      description: "Multi-source reasoning, graphics interpretation, and analysis",
      topics: ["Multi-Source Reasoning", "Graphics Interpretation", "Two-Part Analysis", "Table Analysis"],
    },
    {
      name: "Analytical Writing",
      duration: "30 minutes",
      questions: "1 essay",
      scoreRange: "0-6",
      description: "Analysis of an argument essay",
      topics: ["Argument Analysis", "Critical Thinking", "Essay Structure", "Writing Skills"],
    },
  ]

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="hero-gradient section-padding relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-4 h-4 bg-emerald-500 rounded-full animate-bounce-slow"></div>
          <div className="absolute top-40 right-20 w-6 h-6 bg-teal-500 rounded-full animate-float"></div>
          <div className="absolute bottom-20 left-1/4 w-8 h-8 bg-cyan-400 rounded-full animate-pulse-slow"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="animate-fadeInLeft">
                <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-4">
                  Conquer the <span className="text-gradient">GMAT</span>
                </h1>
                <p className="text-xl text-gray-600 leading-relaxed">
                  Achieve your target GMAT score and secure admission to top MBA programs worldwide with our expert
                  preparation.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 animate-fadeInLeft animate-stagger-2">
                <Link href="/contact" className="btn-primary">
                  Start MBA Journey
                </Link>
                <button className="btn-secondary">Free Mock Test</button>
              </div>

              <div className="grid grid-cols-2 gap-4 animate-fadeInLeft animate-stagger-3">
                <div className="bg-white/80 backdrop-blur-sm p-4 rounded-xl">
                  <div className="text-2xl font-bold text-gradient">720+</div>
                  <p className="text-gray-600 text-sm">Average Score</p>
                </div>
                <div className="bg-white/80 backdrop-blur-sm p-4 rounded-xl">
                  <div className="text-2xl font-bold text-gradient">400+</div>
                  <p className="text-gray-600 text-sm">MBA Admits</p>
                </div>
              </div>
            </div>

            <div className="animate-fadeInRight">
              <div className="relative">
                <Image
                  src="/placeholder.svg?height=500&width=600"
                  alt="GMAT Preparation"
                  width={600}
                  height={500}
                  className="w-full h-auto rounded-2xl shadow-2xl animate-float"
                />
                <div className="absolute -top-4 -right-4 bg-gradient-to-r from-emerald-500 to-teal-500 text-white p-3 rounded-full animate-bounce-slow">
                  <TrendingUp className="h-6 w-6" />
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
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Choose Our GMAT Program?</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              MBA-focused preparation with business school admission expertise
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="text-center p-6 bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl card-hover animate-fadeInUp"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="text-emerald-600 mb-4 flex justify-center animate-pulse-slow">{feature.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* GMAT Sections */}
      <section className="section-padding bg-gradient-to-br from-emerald-50 to-teal-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 animate-fadeInUp">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">GMAT Test Sections</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Master each section with our comprehensive approach
            </p>
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
                    <div className="text-emerald-600 font-semibold">{section.scoreRange}</div>
                    <div className="text-sm text-gray-500">{section.duration}</div>
                  </div>
                </div>

                <div className="mb-4">
                  <p className="text-gray-600 mb-2">{section.description}</p>
                  <p className="text-sm text-teal-600">{section.questions}</p>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">Key Areas:</h4>
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

      {/* MBA Programs */}
      <section className="section-padding bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 animate-fadeInUp">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Target MBA Programs</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              GMAT scores required for top business schools worldwide
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-8 bg-gradient-to-br from-yellow-50 to-amber-50 rounded-2xl card-hover animate-fadeInUp">
              <div className="text-4xl font-bold text-yellow-600 mb-4">650-700</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Good Programs</h3>
              <p className="text-gray-600">Top 50 business schools globally</p>
            </div>
            <div className="text-center p-8 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl card-hover animate-fadeInUp animate-stagger-1">
              <div className="text-4xl font-bold text-blue-600 mb-4">700-750</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Elite Programs</h3>
              <p className="text-gray-600">Top 20 business schools</p>
            </div>
            <div className="text-center p-8 bg-gradient-to-br from-purple-50 to-violet-50 rounded-2xl card-hover animate-fadeInUp animate-stagger-2">
              <div className="text-4xl font-bold text-purple-600 mb-4">750+</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">M7 Schools</h3>
              <p className="text-gray-600">Harvard, Wharton, Stanford, etc.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-gradient-to-r from-emerald-600 to-teal-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <div className="animate-fadeInUp">
            <h2 className="text-4xl font-bold mb-4">Ready for Your MBA Journey?</h2>
            <p className="text-xl mb-8 opacity-90">
              Start your GMAT preparation and take the first step towards your dream MBA
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="bg-white text-emerald-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
              >
                Book Free Consultation
              </Link>
              <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-emerald-600 transition-colors">
                Download MBA Guide
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
