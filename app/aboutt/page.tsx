import type { Metadata } from "next"
import Image from "next/image"
import { Users, Target, Award, Globe } from "lucide-react"

export const metadata: Metadata = {
  title: "About Us - Gateway Abroad Education | Best Study Abroad Consultants",
  description:
    "Learn about Gateway Abroad Education, your trusted study abroad consultants in Jaipur. Expert guidance for overseas education with proven success.",
}

export default function AboutPage() {
  const values = [
    {
      icon: <Target className="h-12 w-12" />,
      title: "Our Mission",
      description:
        "To provide comprehensive guidance and support to students pursuing their dreams of studying abroad.",
    },
    {
      icon: <Users className="h-12 w-12" />,
      title: "Our Team",
      description: "Experienced counselors and education experts dedicated to your success in overseas education.",
    },
    {
      icon: <Award className="h-12 w-12" />,
      title: "Our Values",
      description: "Integrity, excellence, and student-first approach in everything we do.",
    },
    {
      icon: <Globe className="h-12 w-12" />,
      title: "Our Reach",
      description: "Global network of partner universities and institutions across 15+ countries.",
    },
  ]

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="hero-gradient section-padding">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6">
              About <span className="text-gradient">Gateway Abroad</span>
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              Your trusted partner in making overseas education dreams come true. We have been guiding students towards
              successful international academic careers for years.
            </p>
          </div>
        </div>
      </section>

      {/* Who We Are Section */}
      <section className="section-padding bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Who We Are</h2>
              <p className="text-gray-600 leading-relaxed mb-6">
                At Gateway Abroad Education, we are a trusted Overseas education consultants dedicated to helping
                students achieve their dreams of pursuing overseas study. Our expert team supports you at every step,
                from selecting the ideal course to excelling in test preparation for crucial exams, such as the English
                Proficiency test like IELTS, TOEFL, GRE, PTE, GMAT, SAT and more.
              </p>
              <p className="text-gray-600 leading-relaxed mb-6">
                We're more than just educators; we're your mentors and advisors, guiding you toward success in abroad
                education. Whether it's securing a study abroad scholarship, navigating the study visa process, or
                applying for a study loan, we are here to make your journey smoother and brighter.
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <div className="text-2xl font-bold text-gradient">10+</div>
                  <p className="text-gray-600">Years Experience</p>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <div className="text-2xl font-bold text-gradient">500+</div>
                  <p className="text-gray-600">Success Stories</p>
                </div>
              </div>
            </div>
            <div>
              <Image
                src="/placeholder.svg?height=500&width=600"
                alt="Gateway Abroad Team"
                width={600}
                height={500}
                className="w-full h-auto rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="section-padding bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Core Values</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              The principles that guide us in helping students achieve their study abroad dreams
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div key={index} className="bg-white p-8 rounded-xl shadow-lg text-center">
                <div className="text-red-600 mb-4 flex justify-center">{value.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="section-padding bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Choose Gateway Abroad?</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="p-6 border-l-4 border-red-600">
              <h3 className="text-xl font-bold text-gray-900 mb-3">Expert Guidance</h3>
              <p className="text-gray-600">
                Our experienced counselors provide personalized guidance based on your academic profile and career
                goals.
              </p>
            </div>
            <div className="p-6 border-l-4 border-pink-600">
              <h3 className="text-xl font-bold text-gray-900 mb-3">Comprehensive Support</h3>
              <p className="text-gray-600">
                From university selection to visa approval, we support you throughout your study abroad journey.
              </p>
            </div>
            <div className="p-6 border-l-4 border-red-600">
              <h3 className="text-xl font-bold text-gray-900 mb-3">Proven Track Record</h3>
              <p className="text-gray-600">
                With 98% visa success rate and 500+ successful placements, we have a proven track record of success.
              </p>
            </div>
            <div className="p-6 border-l-4 border-pink-600">
              <h3 className="text-xl font-bold text-gray-900 mb-3">Test Preparation</h3>
              <p className="text-gray-600">
                Comprehensive coaching for IELTS, TOEFL, GRE, GMAT, and other standardized tests.
              </p>
            </div>
            <div className="p-6 border-l-4 border-red-600">
              <h3 className="text-xl font-bold text-gray-900 mb-3">Global Network</h3>
              <p className="text-gray-600">
                Strong partnerships with universities and institutions across 15+ countries worldwide.
              </p>
            </div>
            <div className="p-6 border-l-4 border-pink-600">
              <h3 className="text-xl font-bold text-gray-900 mb-3">Affordable Services</h3>
              <p className="text-gray-600">
                Quality education consulting services at competitive prices with transparent fee structure.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
