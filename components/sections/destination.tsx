"use client"

import { useKeenSlider } from "keen-slider/react"
import "keen-slider/keen-slider.min.css"
import { useState } from "react"

const destinations = [
    {
        id: 1,
        country: "United States",
        flag: "🇺🇸",
        universities: "4,000+",
        programs: "Engineering, Business, Medicine",
        image: "/placeholder.svg?height=300&width=400",
        description: "Home to world's top universities like Harvard, MIT, and Stanford",
        ranking: "#1",
        students: "1.2M+",
    },
    {
        id: 2,
        country: "United Kingdom",
        flag: "🇬🇧",
        universities: "150+",
        programs: "Law, Literature, Sciences",
        image: "/placeholder.svg?height=300&width=400",
        description: "Historic institutions like Oxford and Cambridge await you",
        ranking: "#2",
        students: "500K+",
    },
    {
        id: 3,
        country: "Canada",
        flag: "🇨🇦",
        universities: "200+",
        programs: "Technology, Healthcare, Arts",
        image: "/placeholder.svg?height=300&width=400",
        description: "Quality education with excellent post-study work opportunities",
        ranking: "#3",
        students: "800K+",
    },
    {
        id: 4,
        country: "Australia",
        flag: "🇦🇺",
        universities: "100+",
        programs: "Marine Biology, Mining, Tourism",
        image: "/placeholder.svg?height=300&width=400",
        description: "World-class education in a vibrant multicultural environment",
        ranking: "#4",
        students: "600K+",
    },
    {
        id: 5,
        country: "Germany",
        flag: "🇩🇪",
        universities: "400+",
        programs: "Engineering, Research, Technology",
        image: "/placeholder.svg?height=300&width=400",
        description: "Excellence in engineering and research with affordable education",
        ranking: "#5",
        students: "400K+",
    },
    {
        id: 6,
        country: "New Zealand",
        flag: "🇳🇿",
        universities: "40+",
        programs: "Agriculture, Environmental Science",
        image: "/placeholder.svg?height=300&width=400",
        description: "Innovative education system in stunning natural landscapes",
        ranking: "#6",
        students: "200K+",
    },
]

export default function DestinationsSection() {
    const [currentSlide, setCurrentSlide] = useState(0)
    const [loaded, setLoaded] = useState(false)
    const [hoveredCard, setHoveredCard] = useState<number | null>(null)

    const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>(
        {
            loop: true,
            mode: "free",
            slides: {
                perView: 3.4,
                spacing: 20,
            },
            breakpoints: {
                "(max-width: 768px)": {
                    slides: {
                        perView: 2.1,
                        spacing: 16,
                    },
                },
                "(max-width: 1024px)": {
                    slides: {
                        perView: 1,
                        spacing: 4,
                    },
                },
            },
            slideChanged(slider) {
                setCurrentSlide(slider.track.details.rel)
            },
            created() {
                setLoaded(true)
            },
        },
        [
            (slider) => {
                let timeout: ReturnType<typeof setTimeout>
                let mouseOver = false

                function clearNextTimeout() {
                    clearTimeout(timeout)
                }

                function nextTimeout() {
                    clearTimeout(timeout)
                    if (mouseOver) return
                    timeout = setTimeout(() => {
                        slider.next()
                    }, 5000)
                }

                slider.on("created", () => {
                    slider.container.addEventListener("mouseover", () => {
                        mouseOver = true
                        clearNextTimeout()
                    })
                    slider.container.addEventListener("mouseout", () => {
                        mouseOver = false
                        nextTimeout()
                    })
                    nextTimeout()
                })

                slider.on("dragStarted", clearNextTimeout)
                slider.on("animationEnded", nextTimeout)
                slider.on("updated", nextTimeout)
            },
        ],
    )

    return (
        <section className="py-20 bg-pink-100 relative overflow-hidden">
            {/* Enhanced Background Effects */}
            <div className="absolute inset-0">
                {/* Floating Particles */}
                <div className="absolute top-20 left-10 w-2 h-2 bg-red-400 rounded-full animate-float"></div>
                <div className="absolute top-40 right-20 w-3 h-3 bg-rose-400 rounded-full animate-float-delayed opacity-40"></div>
                <div className="absolute bottom-32 left-1/4 w-2 h-2 bg-orange-400 rounded-full animate-float-slow opacity-50"></div>

                {/* Gradient Blobs */}
                <div className="absolute top-10 left-10 w-96 h-96 bg-gradient-to-r from-red-300/20 to-rose-300/20 rounded-full mix-blend-multiply filter blur-3xl animate-blob"></div>
                <div className="absolute top-20 right-10 w-80 h-80 bg-gradient-to-r from-rose-300/20 to-orange-300/20 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000"></div>
                <div className="absolute -bottom-10 left-1/3 w-72 h-72 bg-gradient-to-r from-orange-300/20 to-red-300/20 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000"></div>
            </div>

            <div className="container-sm mx-auto px-4 relative z-10">
                {/* Enhanced Section Header */}
                <div className="text-center mb-10 animate-fade-in">
                    <h2 className="heading mb-1">
                        Study Destinations
                    </h2>
                    <p className="text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed">
                        Explore world-class education opportunities across the globe. Choose your dream destination and start your
                        journey to academic excellence.
                    </p>
                </div>

                {/* Enhanced Slider Container */}
                <div className="relative">
                    <div ref={sliderRef} className="keen-slider">
                        {destinations.map((destination, index) => (
                            <div key={destination.id} className="keen-slider__slide px-1 py-6">
                                <div
                                    className="destination-card bg-white/90 backdrop-blur-sm rounded-2xl transition-all duration-700 overflow-hidden group border border-white/50 shadow-xl animate-slide-up hover:shadow-2xl hover:-translate-y-4 hover:rotate-1 hover:border-red-200 hover:shadow-red-100/50 hover:bg-white"
                                    style={{ animationDelay: `${index * 150}ms` }}
                                    onMouseEnter={() => setHoveredCard(destination.id)}
                                    onMouseLeave={() => setHoveredCard(null)}
                                >
                                    {/* Enhanced Gradient Overlay */}
                                    <div className="absolute inset-0 bg-gradient-to-br from-red-500/0 via-rose-500/0 to-orange-500/0 group-hover:from-red-500/5 group-hover:via-rose-500/5 group-hover:to-orange-500/5 rounded-2xl transition-all duration-700"></div>

                                    {/* Ranking Badge */}
                                    <div className="absolute top-4 left-4 z-20 bg-gradient-to-r from-red-600 to-rose-600 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg transform transition-all duration-300 group-hover:scale-110 group-hover:-rotate-3">
                                        {destination.ranking} Choice
                                    </div>

                                    {/* Enhanced Image Container */}
                                    <div className="relative h-48 overflow-hidden">
                                        <img
                                            src={"https://acko-cms.ackoassets.com/Best_time_to_visit_UK_6dae1f2b10.png"}
                                            alt={`Study in ${destination.country}`}
                                            className="w-full h-full object-cover transition-all duration-1000 group-hover:scale-110 group-hover:rotate-1"
                                        />

                                        {/* Flag with Enhanced Animation */}
                                        {/* <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm rounded-full p-3 shadow-xl transition-all duration-500 group-hover:scale-125 group-hover:-rotate-12 group-hover:shadow-2xl">
                                            <span className="text-2xl block transform transition-transform duration-300 group-hover:animate-bounce">
                                                {destination.flag}
                                            </span>
                                        </div> */}

                                        {/* Enhanced Gradient Overlay */}
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent group-hover:from-red-900/70 transition-all duration-700"></div>

                                        {/* Enhanced Stats Badge */}
                                        <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-sm rounded-xl px-2 py-1 transform transition-all duration-500 group-hover:scale-110 group-hover:bg-red-50 shadow-lg">
                                            <div className="flex items-center gap-2">
                                                <span className="text-red-600 font-bold text-sm">{destination.universities}</span>
                                                <span className="text-gray-700 text-xs">Universities</span>
                                            </div>
                                        </div>

                                        {/* Students Count Badge */}
                                        <div className="absolute bottom-4 right-4 bg-gradient-to-r from-red-600 to-rose-600 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg transform transition-all duration-300 group-hover:scale-110">
                                            {destination.students} Students
                                        </div>
                                    </div>

                                    {/* Enhanced Content */}
                                    <div className="p-3">
                                        <h3 className="sub-heading transition-all duration-300 mb-2 flex items-center gap-2">
                                            {destination.country}
                                        </h3>

                                        <p className="text-slate-600 text-sm mb-2 leading-relaxed duration-300">
                                            {destination.description}
                                        </p>

                                        {/* Enhanced Programs Tags */}
                                        <div className="mb-3">
                                            <div className="flex flex-wrap gap-1.5">
                                                {destination.programs
                                                    .split(", ")
                                                    .slice(0, 2)
                                                    .map((program, idx) => (
                                                        <span
                                                            key={idx}
                                                            className="bg-gradient-to-r from-red-50 to-rose-50 text-red-700 px-3 py-1 rounded-full text-xs font-medium border border-red-200/50 transition-all duration-300 group-hover:from-red-100 group-hover:to-rose-100 group-hover:border-red-300 group-hover:scale-105 group-hover:-translate-y-0.5"
                                                            style={{ animationDelay: `${idx * 100}ms` }}
                                                        >
                                                            {program}
                                                        </span>
                                                    ))}
                                                {destination.programs.split(", ").length > 2 && (
                                                    <span className="bg-slate-100 text-slate-600 px-3 py-1 rounded-full text-xs font-medium transition-all duration-300 group-hover:bg-red-100 group-hover:text-red-600">
                                                        +{destination.programs.split(", ").length - 2} more
                                                    </span>
                                                )}
                                            </div>
                                        </div>

                                        {/* Enhanced CTA Button */}
                                        <button className="w-full btn-primary group/btn">
                                            <span className="flex items-center justify-center relative z-10 gap-2">
                                                <span>Explore Now</span>
                                                <svg
                                                    className="w-4 h-4 transform group-hover/btn:translate-x-1 group-hover/btn:scale-110 transition-all duration-300"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={2}
                                                        d="M17 8l4 4m0 0l-4 4m4-4H3"
                                                    />
                                                </svg>
                                            </span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Enhanced Navigation Dots */}
                    {loaded && instanceRef.current && (
                        <div className="flex justify-center mt-12 space-x-2">
                            {Array.from({
                                length: Math.ceil(
                                    destinations.length / (window.innerWidth < 768 ? 1 : window.innerWidth < 1024 ? 2 : 3),
                                ),
                            }).map((_, idx) => (
                                <button
                                    key={idx}
                                    className={`relative transition-all duration-500 ${Math.floor(currentSlide / (window.innerWidth < 768 ? 1 : window.innerWidth < 1024 ? 2 : 3)) === idx
                                            ? "w-8 h-3 bg-gradient-to-r from-red-600 to-rose-600 rounded-full shadow-lg"
                                            : "w-3 h-3 bg-slate-300 hover:bg-red-300 rounded-full hover:scale-125"
                                        }`}
                                    onClick={() => {
                                        const slidesPerView = window.innerWidth < 768 ? 1 : window.innerWidth < 1024 ? 2 : 3
                                        instanceRef.current?.moveToIdx(idx * slidesPerView)
                                    }}
                                >
                                    {Math.floor(currentSlide / (window.innerWidth < 768 ? 1 : window.innerWidth < 1024 ? 2 : 3)) ===
                                        idx && (
                                            <div className="absolute inset-0 bg-gradient-to-r from-red-600 to-rose-600 rounded-full animate-pulse shadow-lg"></div>
                                        )}
                                </button>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </section>
    )
}
