"use client"

import { useKeenSlider } from "keen-slider/react"
import "keen-slider/keen-slider.min.css"
import { useState, useEffect } from "react"
import { GraduationCap, Clock, Users, Award, BookOpen, Star } from "lucide-react"

const degrees = [
    {
        id: 1,
        title: "Master's Degree",
        subtitle: "Advanced Graduate Program",
        duration: "1-2 Years",
        description: "Advance your career with specialized knowledge and research skills in your chosen field.",
        features: ["Research Opportunities", "Industry Connections", "Career Advancement"],
        students: "50K+ Students",
        rating: 4.9,
        icon: GraduationCap,
        color: "from-red-500 to-rose-600",
        bgColor: "bg-gradient-to-br from-red-50 to-rose-50",
    },
    {
        id: 2,
        title: "Bachelor's Degree",
        subtitle: "Undergraduate Program",
        duration: "3-4 Years",
        description: "Build a strong foundation with comprehensive education and practical skills for your career.",
        features: ["Core Subjects", "Practical Training", "Global Recognition"],
        students: "100K+ Students",
        rating: 4.8,
        icon: BookOpen,
        color: "from-orange-500 to-red-500",
        bgColor: "bg-gradient-to-br from-orange-50 to-red-50",
    },
    {
        id: 3,
        title: "PhD Program",
        subtitle: "Doctoral Research",
        duration: "3-5 Years",
        description: "Conduct cutting-edge research and become an expert in your field with doctoral studies.",
        features: ["Original Research", "Academic Excellence", "Expert Mentorship"],
        students: "15K+ Students",
        rating: 4.9,
        icon: Award,
        color: "from-rose-500 to-pink-600",
        bgColor: "bg-gradient-to-br from-rose-50 to-pink-50",
    },
    {
        id: 4,
        title: "Diploma Programs",
        subtitle: "Professional Certification",
        duration: "6-18 Months",
        description: "Gain practical skills and industry-specific knowledge with focused diploma programs.",
        features: ["Industry Focus", "Quick Entry", "Practical Skills"],
        students: "75K+ Students",
        rating: 4.7,
        icon: Users,
        color: "from-red-600 to-rose-700",
        bgColor: "bg-gradient-to-br from-red-50 to-rose-50",
    },
    {
        id: 5,
        title: "Certificate Courses",
        subtitle: "Skill Enhancement",
        duration: "3-12 Months",
        description: "Enhance your skills with specialized certificate courses designed for working professionals.",
        features: ["Flexible Schedule", "Industry Relevant", "Quick Completion"],
        students: "200K+ Students",
        rating: 4.6,
        icon: Star,
        color: "from-orange-600 to-red-600",
        bgColor: "bg-gradient-to-br from-orange-50 to-red-50",
    },
]

export default function DegreesSection() {
    const [currentSlide, setCurrentSlide] = useState(0)
    const [loaded, setLoaded] = useState(false)

    const [sliderRef, instanceRef] = useKeenSlider({
        initial: 0,
        loop: true,
        mode: "free-snap",
        slides: {
            perView: 1.2,
            spacing: 0,
        },
        breakpoints: {
            "(min-width: 640px)": {
                slides: {
                    perView: 2.2,
                    spacing: 12,
                },
            },
            "(min-width: 1024px)": {
                slides: {
                    perView: 3.5,
                    spacing: 6,
                },
            },
        },
        slideChanged(slider) {
            setCurrentSlide(slider.track.details.rel)
        },
        created() {
            setLoaded(true)
        },
    })

    // Auto-play functionality
    useEffect(() => {
        if (!instanceRef.current) return

        const interval = setInterval(() => {
            instanceRef.current?.next()
        }, 8000)

        return () => clearInterval(interval)
    }, [instanceRef])

    return (
        <section className="py-20 bg-gradient-to-b from-white to-gray-50 overflow-hidden">
            <div className="container-sm mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="text-center mb-16">
                    <h2 className="heading text-center d-block mb-2">
                        Academic Programs
                    </h2>
                    <p className="sub-heading !text-base max-w-3xl mx-auto">
                        Explore our comprehensive range of academic programs designed to help you achieve your educational and
                        career goals
                    </p>
                </div>

                {/* Slider */}
                <div className="relative">
                    <div ref={sliderRef} className="keen-slider">
                        {degrees.map((degree, index) => {
                            const IconComponent = degree.icon
                            return (
                                <div key={degree.id} className="keen-slider__slide p-2">
                                    <div
                                        className={`group relative h-full ${degree.bgColor} rounded-2xl p-4 border border-gray-100 shadow-sm hover:border-red-700 transition-all duration-500 transform hover:-translate-y-2`}
                                    >
                                        {/* Background Pattern */}
                                        {/* <div className="absolute inset-0 opacity-5">
                                            <div className="absolute top-4 right-4 w-32 h-32 rounded-full bg-gradient-to-br from-red-400 to-rose-500 blur-3xl"></div>
                                            <div className="absolute bottom-4 left-4 w-24 h-24 rounded-full bg-gradient-to-br from-orange-400 to-red-500 blur-2xl"></div>
                                        </div> */}

                                        {/* Content */}
                                        <div className="relative z-10">
                                            {/* Icon and Badge */}
                                            <div className="flex items-start justify-between mb-3">
                                                <div
                                                    className={`p-3 rounded-2xl bg-gradient-to-br ${degree.color} shadow-lg group-hover:scale-110 transition-transform duration-300`}
                                                >
                                                    <IconComponent className="w-6 h-6 text-white" />
                                                </div>
                                                <div className="flex items-center gap-1 bg-white/80 backdrop-blur-sm px-3 py-1 rounded-full">
                                                    <Star className="w-4 h-4 text-yellow-500 fill-current" />
                                                    <span className="text-sm font-semibold text-gray-700">{degree.rating}</span>
                                                </div>
                                            </div>

                                            {/* Title and Duration */}
                                            <div className="mb-2">
                                                <h3 className="sub-heading font-bold mb-1 group-hover:text-red-700 transition-colors duration-300">
                                                    {degree.title}
                                                </h3>
                                                <p className="text-red-600 text-base font-medium mb-2">{degree.subtitle}</p>
                                                <div className="flex items-center gap-2 text-gray-600">
                                                    <Clock className="w-4 h-4" />
                                                    <span className="text-sm font-medium">{degree.duration}</span>
                                                </div>
                                            </div>

                                            {/* Description */}
                                            <p className="text-gray-600 text-base mb-2 leading-relaxed">{degree.description}</p>

                                            {/* Features */}
                                            <div className="mb-3">
                                                <h4 className="text-sm font-semibold text-gray-900 mb-2">Key Features:</h4>
                                                <div className="space-y-2">
                                                    {degree.features.map((feature, idx) => (
                                                        <div key={idx} className="flex items-center gap-2 text-sm text-gray-600">
                                                            <div className="w-1.5 h-1.5 rounded-full bg-red-500"></div>
                                                            {feature}
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>

                                            {/* Students Count */}
                                            <div className="flex items-center justify-between pt-3 border-t border-gray-200">
                                                <div className="flex items-center gap-2 text-gray-600">
                                                    <Users className="w-4 h-4" />
                                                    <span className="text-sm font-medium">{degree.students}</span>
                                                </div>
                                                <button className="btn-primary py-2">
                                                    Learn More
                                                </button>
                                            </div>
                                        </div>

                                        {/* Hover Glow Effect */}
                                        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-red-500/10 to-rose-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>

                    {/* Navigation Dots */}
                    {loaded && instanceRef.current && (
                        <div className="flex justify-center gap-2 mt-8">
                            {Array.from({ length: Math.ceil(degrees.length / 3) }).map((_, idx) => (
                                <button
                                    key={idx}
                                    className={`w-3 h-3 rounded-full transition-all duration-300 ${Math.floor(currentSlide / 3) === idx ? "bg-red-600 w-8" : "bg-gray-300 hover:bg-red-400"
                                        }`}
                                    onClick={() => {
                                        instanceRef.current?.moveToIdx(idx * 3)
                                    }}
                                />
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </section>
    )
}
