import type { Metadata } from "next"
import { Briefcase, MapPin, Clock, DollarSign } from "lucide-react"

export const metadata: Metadata = {
  title: "Career Opportunities - Gateway Abroad Education | Join Our Team",
  description:
    "Explore career opportunities at Gateway Abroad Education. Join our team of education consultants and help students achieve their study abroad dreams.",
}

export default function CareerPage() {
  const positions = [
    {
      title: "Education Counselor",
      department: "Student Services",
      location: "Jaipur, Rajasthan",
      type: "Full-time",
      experience: "2-4 years",
      salary: "₹3-5 LPA",
      description: "Guide students through their study abroad journey, from university selection to visa application.",
      requirements: [
        "Bachelor's degree in any field",
        "2+ years experience in education counseling",
        "Excellent communication skills",
        "Knowledge of international education systems",
      ],
    },
    {
      title: "IELTS Trainer",
      department: "Test Preparation",
      location: "Jaipur, Rajasthan",
      type: "Full-time",
      experience: "3-5 years",
      salary: "₹4-6 LPA",
      description: "Conduct IELTS preparation classes and help students achieve their target scores.",
      requirements: [
        "IELTS score of 8.0 or above",
        "Teaching certification preferred",
        "3+ years of IELTS training experience",
        "Strong presentation skills",
      ],
    },
    {
      title: "Marketing Executive",
      department: "Marketing",
      location: "Jaipur, Rajasthan",
      type: "Full-time",
      experience: "1-3 years",
      salary: "₹2.5-4 LPA",
      description: "Develop and execute marketing strategies to promote our services and attract new students.",
      requirements: [
        "Bachelor's degree in Marketing/Business",
        "1+ years in digital marketing",
        "Knowledge of social media platforms",
        "Creative thinking and analytical skills",
      ],
    },
    {
      title: "Visa Processing Executive",
      department: "Visa Services",
      location: "Jaipur, Rajasthan",
      type: "Full-time",
      experience: "2-4 years",
      salary: "₹3-4.5 LPA",
      description: "Assist students with visa documentation and application processes for various countries.",
      requirements: [
        "Knowledge of visa processes for major countries",
        "Attention to detail and accuracy",
        "2+ years in visa processing",
        "Good organizational skills",
      ],
    },
  ]

  const benefits = [
    "Competitive salary and performance bonuses",
    "Health insurance coverage",
    "Professional development opportunities",
    "Flexible working hours",
    "Friendly and supportive work environment",
    "Career growth opportunities",
  ]

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="hero-gradient section-padding">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6">
              Join Our <span className="text-gradient">Team</span>
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              Be part of a dynamic team that helps students achieve their study abroad dreams. Explore exciting career
              opportunities with Gateway Abroad Education.
            </p>
          </div>
        </div>
      </section>

      {/* Current Openings */}
      <section className="section-padding bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Current Openings</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover opportunities to grow your career while making a difference in students' lives
            </p>
          </div>

          <div className="space-y-8">
            {positions.map((position, index) => (
              <div key={index} className="bg-gray-50 rounded-xl p-8 hover:shadow-lg transition-shadow duration-300">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  <div className="lg:col-span-2">
                    <div className="flex flex-wrap items-center gap-4 mb-4">
                      <h3 className="text-2xl font-bold text-gray-900">{position.title}</h3>
                      <span className="bg-red-100 text-red-600 px-3 py-1 rounded-full text-sm font-medium">
                        {position.department}
                      </span>
                    </div>

                    <p className="text-gray-600 mb-6">{position.description}</p>

                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">Requirements:</h4>
                      <ul className="space-y-2">
                        {position.requirements.map((req, idx) => (
                          <li key={idx} className="flex items-start text-gray-600">
                            <div className="w-2 h-2 bg-red-600 rounded-full mr-3 mt-2 flex-shrink-0"></div>
                            {req}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center text-gray-600">
                      <MapPin className="h-5 w-5 mr-2 text-red-600" />
                      {position.location}
                    </div>
                    <div className="flex items-center text-gray-600">
                      <Clock className="h-5 w-5 mr-2 text-red-600" />
                      {position.type}
                    </div>
                    <div className="flex items-center text-gray-600">
                      <Briefcase className="h-5 w-5 mr-2 text-red-600" />
                      {position.experience}
                    </div>
                    <div className="flex items-center text-gray-600">
                      <DollarSign className="h-5 w-5 mr-2 text-red-600" />
                      {position.salary}
                    </div>

                    <button className="w-full btn-primary mt-6">Apply Now</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="section-padding bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Work With Us?</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We offer a comprehensive benefits package and a great work environment
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((benefit, index) => (
              <div key={index} className="flex items-center p-4 bg-white rounded-lg shadow-sm">
                <div className="w-3 h-3 bg-red-600 rounded-full mr-4 flex-shrink-0"></div>
                <span className="text-gray-700">{benefit}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Application Process */}
      <section className="section-padding bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Application Process</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-red-600">1</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Apply Online</h3>
              <p className="text-gray-600">Submit your application through our online portal</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-red-600">2</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Initial Screening</h3>
              <p className="text-gray-600">Our HR team will review your application</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-red-600">3</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Interview</h3>
              <p className="text-gray-600">Face-to-face or virtual interview with our team</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-red-600">4</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Welcome Aboard</h3>
              <p className="text-gray-600">Join our team and start making a difference</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-gradient-to-r from-red-600 to-pink-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-4">Ready to Join Our Team?</h2>
          <p className="text-xl mb-8 opacity-90">
            Take the next step in your career and help students achieve their dreams
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-red-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
              View All Positions
            </button>
            <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-red-600 transition-colors">
              Submit Resume
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}
