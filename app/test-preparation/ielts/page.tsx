import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { Clock, Users, Award, BookOpen, CheckCircle, Star } from "lucide-react"

export const metadata: Metadata = {
  title: "IELTS Preparation - Gateway Abroad Education | Expert IELTS Coaching",
  description:
    "Master IELTS with our expert coaching. Achieve your target band score with comprehensive training in Listening, Reading, Writing, and Speaking.",
}

export default function IELTSPage() {
  const features = [
    {
      icon: <Users className="h-8 w-8" />,
      title: "Expert Trainers",
      description: "Certified IELTS trainers with 8+ band scores",
    },
    {
      icon: <BookOpen className="h-8 w-8" />,
      title: "Comprehensive Material",
      description: "Latest Cambridge materials and practice tests",
    },
    {
      icon: <Clock className="h-8 w-8" />,
      title: "Flexible Batches",
      description: "Morning, evening, and weekend options",
    },
    {
      icon: <Award className="h-8 w-8" />,
      title: "Proven Results",
      description: "95% students achieve their target band",
    },
  ]

  const modules = [
    {
      name: "Listening",
      duration: "30 minutes",
      sections: 4,
      description: "Master different accents and question types",
      tips: ["Practice with various accents", "Note-taking techniques", "Time management"],
    },
    {
      name: "Reading",
      duration: "60 minutes",
      sections: 3,
      description: "Academic and General Training passages",
      tips: ["Skimming and scanning", "Keyword identification", "Question analysis"],
    },
    {
      name: "Writing",
      duration: "60 minutes",
      sections: 2,
      description: "Task 1 (graphs/letters) and Task 2 (essays)",
      tips: ["Structure and organization", "Vocabulary enhancement", "Grammar accuracy"],
    },
    {
      name: "Speaking",
      duration: "11-14 minutes",
      sections: 3,
      description: "Face-to-face interview with examiner",
      tips: ["Fluency and coherence", "Pronunciation practice", "Confidence building"],
    },
  ]

  const courses = [
    {
      name: "Regular Batch",
      duration: "2 months",
      price: "₹15,000",
      features: ["4 days/week", "2 hours/day", "Mock tests", "Study material"],
      popular: false,
    },
    {
      name: "Intensive Batch",
      duration: "1 month",
      price: "₹20,000",
      features: ["6 days/week", "3 hours/day", "Daily mock tests", "Personal attention"],
      popular: true,
    },
    {
      name: "Weekend Batch",
      duration: "3 months",
      price: "₹12,000",
      features: ["Sat-Sun only", "4 hours/day", "Flexible timing", "Working professionals"],
      popular: false,
    },
  ]

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="hero-gradient section-padding relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-4 h-4 bg-blue-500 rounded-full animate-bounce-slow"></div>
          <div className="absolute top-40 right-20 w-6 h-6 bg-green-500 rounded-full animate-float"></div>
          <div className="absolute bottom-20 left-1/4 w-8 h-8 bg-yellow-400 rounded-full animate-pulse-slow"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="animate-fadeInLeft">
                <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-4">
                  Master <span className="text-gradient">IELTS</span>
                </h1>
                <p className="text-xl text-gray-600 leading-relaxed">
                  Achieve your target band score with our comprehensive IELTS preparation program. Expert guidance for
                  all four modules.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 animate-fadeInLeft animate-stagger-2">
                <Link href="/contact" className="btn-primary">
                  Enroll Now
                </Link>
                <button className="btn-secondary">Free Demo Class</button>
              </div>

              <div className="grid grid-cols-2 gap-4 animate-fadeInLeft animate-stagger-3">
                <div className="bg-white/80 backdrop-blur-sm p-4 rounded-xl">
                  <div className="text-2xl font-bold text-gradient">8.5+</div>
                  <p className="text-gray-600 text-sm">Average Band Score</p>
                </div>
                <div className="bg-white/80 backdrop-blur-sm p-4 rounded-xl">
                  <div className="text-2xl font-bold text-gradient">1000+</div>
                  <p className="text-gray-600 text-sm">Success Stories</p>
                </div>
              </div>
            </div>

            <div className="animate-fadeInRight">
              <div className="relative">
                <Image
                  src="/placeholder.svg?height=500&width=600"
                  alt="IELTS Preparation"
                  width={600}
                  height={500}
                  className="w-full h-auto rounded-2xl shadow-2xl animate-float"
                />
                <div className="absolute -top-4 -right-4 bg-gradient-to-r from-blue-500 to-green-500 text-white p-3 rounded-full animate-bounce-slow">
                  <Star className="h-6 w-6" />
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
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Choose Our IELTS Program?</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive training with proven methodologies to ensure your success
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="text-center p-6 bg-gray-50 rounded-xl card-hover animate-fadeInUp"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="text-blue-600 mb-4 flex justify-center animate-pulse-slow">{feature.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* IELTS Modules Section */}
      <section className="section-padding bg-gradient-to-br from-blue-50 to-green-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 animate-fadeInUp">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">IELTS Test Modules</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Master all four skills with our structured approach
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {modules.map((module, index) => (
              <div
                key={index}
                className="bg-white p-8 rounded-2xl shadow-lg card-hover animate-fadeInUp"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-2xl font-bold text-gray-900">{module.name}</h3>
                  <div className="text-right">
                    <div className="text-sm text-gray-500">{module.duration}</div>
                    <div className="text-sm text-blue-600">{module.sections} sections</div>
                  </div>
                </div>

                <p className="text-gray-600 mb-6">{module.description}</p>

                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">Key Strategies:</h4>
                  <ul className="space-y-2">
                    {module.tips.map((tip, idx) => (
                      <li key={idx} className="flex items-center text-gray-600">
                        <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                        {tip}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Course Options */}
      <section className="section-padding bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 animate-fadeInUp">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Choose Your Course</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Flexible options to suit your schedule and learning needs
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {courses.map((course, index) => (
              <div
                key={index}
                className={`relative p-8 rounded-2xl shadow-lg card-hover animate-fadeInUp ${
                  course.popular
                    ? "bg-gradient-to-br from-blue-600 to-purple-600 text-white"
                    : "bg-white border border-gray-200"
                }`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {course.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-yellow-400 text-gray-900 px-4 py-1 rounded-full text-sm font-semibold animate-pulse-slow">
                      Most Popular
                    </span>
                  </div>
                )}

                <div className="text-center mb-6">
                  <h3 className={`text-2xl font-bold mb-2 ${course.popular ? "text-white" : "text-gray-900"}`}>
                    {course.name}
                  </h3>
                  <div className={`text-3xl font-bold mb-1 ${course.popular ? "text-white" : "text-gradient"}`}>
                    {course.price}
                  </div>
                  <p className={`text-sm ${course.popular ? "text-blue-100" : "text-gray-500"}`}>{course.duration}</p>
                </div>

                <ul className="space-y-3 mb-8">
                  {course.features.map((feature, idx) => (
                    <li key={idx} className={`flex items-center ${course.popular ? "text-white" : "text-gray-600"}`}>
                      <CheckCircle
                        className={`h-4 w-4 mr-2 flex-shrink-0 ${course.popular ? "text-green-300" : "text-green-500"}`}
                      />
                      {feature}
                    </li>
                  ))}
                </ul>

                <button
                  className={`w-full py-3 rounded-lg font-semibold transition-all duration-300 ${
                    course.popular
                      ? "bg-white text-blue-600 hover:bg-gray-100"
                      : "bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:shadow-lg"
                  }`}
                >
                  Choose Plan
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <div className="animate-fadeInUp">
            <h2 className="text-4xl font-bold mb-4">Ready to Start Your IELTS Journey?</h2>
            <p className="text-xl mb-8 opacity-90">
              Join thousands of successful students who achieved their target band scores
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
              >
                Book Free Consultation
              </Link>
              <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors">
                Download Syllabus
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
