"use client"

import { useEffect, useRef, useState } from "react"
import { CheckCircle, Users, GraduationCap, FileText, Plane, MapPin, Home } from "lucide-react"

const ProcessRoadmap = () => {
  const [visibleSteps, setVisibleSteps] = useState<number[]>([])
  const sectionRef = useRef<HTMLDivElement>(null)

  const steps = [
    {
      id: 1,
      icon: Users,
      title: "Initial Consultation",
      description: "Free counseling session to understand your goals and preferences.",
      details: ["Career assessment", "Budget planning", "Country preferences"],
      duration: "1-2 weeks",
      color: "from-red-500 to-rose-600",
    },
    {
      id: 2,
      icon: GraduationCap,
      title: "Course Selection",
      description: "Expert guidance to choose the right course and university.",
      details: ["University research", "Course comparison", "Scholarships"],
      duration: "2-3 weeks",
      color: "from-rose-500 to-pink-600",
    },
    {
      id: 3,
      icon: FileText,
      title: "Application Process",
      description: "Complete assistance with applications and documents.",
      details: ["Application forms", "SOP writing", "Document prep"],
      duration: "4-6 weeks",
      color: "from-pink-500 to-red-600",
    },
    {
      id: 4,
      icon: Plane,
      title: "Visa Application",
      description: "End-to-end visa support and interview preparation.",
      details: ["Visa docs", "Interview prep", "Embassy support"],
      duration: "3-4 weeks",
      color: "from-red-600 to-rose-700",
    },
    {
      id: 5,
      icon: MapPin,
      title: "Pre-departure",
      description: "Complete preparation for your journey abroad.",
      details: ["Accommodation", "Travel plans", "Orientation"],
      duration: "2-3 weeks",
      color: "from-rose-600 to-red-700",
    },
    {
      id: 6,
      icon: Home,
      title: "Arrival Support",
      description: "Ongoing support for settling in your new country.",
      details: ["Airport pickup", "Enrollment", "Local setup"],
      duration: "Ongoing",
      color: "from-red-700 to-rose-800",
    },
  ]

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const stepId = Number.parseInt(entry.target.getAttribute("data-step") || "0")
            setVisibleSteps((prev) => [...new Set([...prev, stepId])])
          }
        })
      },
      { threshold: 0.3 },
    )

    const stepElements = document.querySelectorAll("[data-step]")
    stepElements.forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="py-8 md:py-12 bg-gradient-to-br from-gray-50 to-white relative overflow-hidden"
    >
      {/* Background decorations */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-10 w-20 h-20 bg-red-500 rounded-full blur-2xl animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-24 h-24 bg-rose-500 rounded-full blur-2xl animate-pulse delay-1000"></div>
      </div>

      <div className="container-sm mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
            Your Study Abroad
            <span className="bg-gradient-to-r from-red-600 to-rose-600 bg-clip-text text-transparent"> Journey</span>
          </h2>
          <p className="text-base text-gray-600 max-w-xl mx-auto">
            Follow our proven 6-step process to make your dream of studying abroad a reality.
          </p>
        </div>

        {/* Horizontal Timeline for Desktop */}
        <div className="hidden md:block">
          <div className="relative max-w-6xl mx-auto">
            {/* Horizontal Timeline Line */}
            <div className="absolute top-16 left-0 right-0 h-0.5 bg-gradient-to-r from-red-200 via-rose-300 to-red-400"></div>

            {/* Steps Grid */}
            <div className="grid grid-cols-6 gap-2 lg:gap-4">
              {steps.map((step, index) => (
                <div
                  key={step.id}
                  data-step={step.id}
                  className={`relative ${
                    visibleSteps.includes(step.id) ? "animate-slide-up opacity-100" : "opacity-0 translate-y-4"
                  } transition-all duration-700`}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  {/* Timeline Node */}
                  <div className="flex justify-center mb-4">
                    <div
                      className={`w-8 h-8 rounded-full bg-gradient-to-r ${step.color} border-2 border-white shadow-lg flex items-center justify-center relative z-10 ${
                        visibleSteps.includes(step.id) ? "animate-bounce" : ""
                      }`}
                    >
                      <step.icon className="w-4 h-4 text-white" />
                    </div>
                  </div>

                  {/* Step Card */}
                  <div className="bg-white rounded-lg p-3 shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100 group hover:-translate-y-1">
                    {/* Step Number & Title */}
                    <div className="text-center mb-2">
                      <span className="text-xs font-semibold text-red-600 uppercase tracking-wide">Step {step.id}</span>
                      <h3 className="text-sm font-bold text-gray-900 group-hover:text-red-600 transition-colors duration-300 leading-tight">
                        {step.title}
                      </h3>
                    </div>

                    {/* Description */}
                    <p className="text-gray-600 text-xs mb-3 leading-relaxed">{step.description}</p>

                    {/* Details */}
                    <div className="space-y-1 mb-3">
                      {step.details.map((detail, idx) => (
                        <div key={idx} className="flex items-center text-gray-700">
                          <CheckCircle className="w-2.5 h-2.5 text-green-500 mr-1.5 flex-shrink-0" />
                          <span className="text-xs">{detail}</span>
                        </div>
                      ))}
                    </div>

                    {/* Duration */}
                    <div className="text-center">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-semibold bg-gradient-to-r ${step.color} text-white`}
                      >
                        {step.duration}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="md:hidden">
          <div className="relative max-w-sm mx-auto">
            {/* Vertical Timeline Line */}
            <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-red-200 via-rose-300 to-red-400"></div>

            {/* Steps */}
            <div className="space-y-6">
              {steps.map((step, index) => (
                <div
                  key={step.id}
                  data-step={step.id}
                  className={`relative flex items-start ${
                    visibleSteps.includes(step.id) ? "animate-slide-in-left opacity-100" : "opacity-0 translate-x-4"
                  } transition-all duration-700`}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  {/* Timeline Node */}
                  <div className="flex-shrink-0 relative z-10">
                    <div
                      className={`w-12 h-12 rounded-full bg-gradient-to-r ${step.color} border-2 border-white shadow-lg flex items-center justify-center ${
                        visibleSteps.includes(step.id) ? "animate-pulse" : ""
                      }`}
                    >
                      <step.icon className="w-5 h-5 text-white" />
                    </div>
                  </div>

                  {/* Step Content */}
                  <div className="ml-4 flex-1">
                    <div className="bg-white rounded-lg p-4 shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100">
                      {/* Step Number & Title */}
                      <div className="mb-2">
                        <span className="text-xs font-semibold text-red-600 uppercase tracking-wide">
                          Step {step.id}
                        </span>
                        <h3 className="text-base font-bold text-gray-900">{step.title}</h3>
                      </div>

                      {/* Description */}
                      <p className="text-gray-600 text-sm mb-3">{step.description}</p>

                      {/* Details */}
                      <div className="space-y-1 mb-3">
                        {step.details.map((detail, idx) => (
                          <div key={idx} className="flex items-center text-gray-700">
                            <CheckCircle className="w-3 h-3 text-green-500 mr-2 flex-shrink-0" />
                            <span className="text-xs">{detail}</span>
                          </div>
                        ))}
                      </div>

                      {/* Duration */}
                      <div>
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-semibold bg-gradient-to-r ${step.color} text-white`}
                        >
                          {step.duration}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes slide-in-left {
          from {
            opacity: 0;
            transform: translateX(30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        @keyframes slide-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-slide-in-left {
          animation: slide-in-left 0.7s ease-out forwards;
        }
        .animate-slide-up {
          animation: slide-up 0.7s ease-out forwards;
        }
      `}</style>
    </section>
  )
}

export default ProcessRoadmap
