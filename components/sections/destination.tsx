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
    },
    {
        id: 2,
        country: "United Kingdom",
        flag: "🇬🇧",
        universities: "150+",
        programs: "Law, Literature, Sciences",
        image: "/placeholder.svg?height=300&width=400",
        description: "Historic institutions like Oxford and Cambridge await you",
    },
    {
        id: 3,
        country: "Canada",
        flag: "🇨🇦",
        universities: "200+",
        programs: "Technology, Healthcare, Arts",
        image: "/placeholder.svg?height=300&width=400",
        description: "Quality education with excellent post-study work opportunities",
    },
    {
        id: 4,
        country: "Australia",
        flag: "🇦🇺",
        universities: "100+",
        programs: "Marine Biology, Mining, Tourism",
        image: "/placeholder.svg?height=300&width=400",
        description: "World-class education in a vibrant multicultural environment",
    },
    {
        id: 5,
        country: "Germany",
        flag: "🇩🇪",
        universities: "400+",
        programs: "Engineering, Research, Technology",
        image: "/placeholder.svg?height=300&width=400",
        description: "Excellence in engineering and research with affordable education",
    },
    {
        id: 6,
        country: "New Zealand",
        flag: "🇳🇿",
        universities: "40+",
        programs: "Agriculture, Environmental Science",
        image: "/placeholder.svg?height=300&width=400",
        description: "Innovative education system in stunning natural landscapes",
    },
]

export default function DestinationsSection() {
    const [currentSlide, setCurrentSlide] = useState(0)
    const [loaded, setLoaded] = useState(false)

    const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>(
        {
            loop: true,
            mode: "free",
            slides: {
                perView: 3.5,
                spacing: 12,
            },
            breakpoints: {
                "(max-width: 768px)": {
                    slides: {
                        perView: 1,
                        spacing: 16,
                    },
                },
                "(max-width: 1024px)": {
                    slides: {
                        perView: 2,
                        spacing: 20,
                    },
                },
                "(max-width: 800px)": {
                    slides: {
                        perView: 1,
                        spacing: 20,
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
                    }, 4000)
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
            {/* Background Animation */}
            <div className="absolute inset-0 opacity-10">
                <div className="absolute top-10 left-10 w-72 h-72 bg-red-300 rounded-full mix-blend-multiply filter blur-xl animate-blob"></div>
                <div className="absolute top-10 right-10 w-72 h-72 bg-rose-300 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000"></div>
                <div className="absolute -bottom-8 left-20 w-72 h-72 bg-orange-300 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000"></div>
            </div>

            <div className="container-sm mx-auto px-4 relative z-10">
                {/* Section Header */}
                <div className="text-center mb-10 animate-fade-in">
                    <h2 className="heading mb-1">
                        Study Destinations
                    </h2>
                    <p className="text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed">
                        Explore world-class education opportunities across the globe. Choose your dream destination and start your
                        journey to academic excellence.
                    </p>
                </div>

                {/* Slider Container */}
                <div className="relative">
                    <div ref={sliderRef} className="keen-slider">
                        {destinations.map((destination, index) => (
                            <div key={destination.id} className="keen-slider__slide p-2">
                                <div
                                    className="destination-card bg-white rounded-xl transition-all duration-500 overflow-hidden group border border-red-100 animate-slide-up hover:shadow-2xl hover:-translate-y-3 hover:rotate-1 hover:border-red-600 hover:shadow-red-100/50"
                                    style={{ animationDelay: `${index * 150}ms` }}
                                >
                                    <div className="absolute inset-0 bg-gradient-to-r from-red-400/0 via-rose-400/0 to-orange-400/0 group-hover:from-red-400/5 group-hover:via-rose-400/5 group-hover:to-orange-400/5 rounded-3xl transition-all duration-500"></div>

                                    {/* Image Container */}
                                    <div className="relative h-52 overflow-hidden">
                                        <img
                                            src={"https://plus.unsplash.com/premium_photo-1661962726504-fa8f464a1bb8?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8dW5pdGVkJTIwa2luZ2RvbXxlbnwwfHwwfHx8MA%3D%3D"}
                                            alt={`Study in ${destination.country}`}
                                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                        />
                                        <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm rounded-lg p-1 shadow-lg transition-all duration-300 group-hover:scale-110 group-hover:-rotate-6">
                                            <img className="h-6" src="https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcTJeqUFtleLirXWkyLrr7bublUfMlDk8Ij64lG8dupcUVaoXvQVXp-dIQNF-bR0CwY4fWOgQQK0JtGj1snLOfeo7PvHag_qA-qLS3OtvsKEFofAhwYVnXge-A" alt="" />
                                        </div>
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent group-hover:from-red-900/50 transition-all duration-500"></div>

                                        <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded-xl px-3 py-2 transform transition-all duration-300 group-hover:scale-105 group-hover:bg-red-50">
                                            <span className="text-red-600 font-bold text-sm">{destination.universities}</span>
                                            <span className="text-slate-600 text-xs ml-1">Universities</span>
                                        </div>
                                    </div>

                                    {/* Content */}
                                    <div className="p-2">
                                        <h3 className="text-xl font-semibold mb-1">
                                            {destination.country}
                                        </h3>
                                        <p className="text-slate-600 text-sm mb-3 line-clamp-2 leading-relaxed transition-colors duration-300 group-hover:text-slate-700">
                                            {destination.description}
                                        </p>

                                        {/* Programs */}
                                        {/* <div className="mb-6">
                      <span className="text-slate-500 text-sm font-medium group-hover:text-red-600 transition-colors duration-300">
                        Popular Programs:
                      </span>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {destination.programs.split(", ").map((program, idx) => (
                          <span
                            key={idx}
                            className="bg-red-50 text-red-700 px-3 py-1 rounded-full text-xs font-medium border border-red-200 transition-all duration-300 group-hover:bg-red-100 group-hover:border-red-300 group-hover:scale-105"
                          >
                            {program}
                          </span>
                        ))}
                      </div>
                    </div> */}
                                        <div className="flex justify-end">
                                            <button className="btn-secondary !py-[6px] px-3 mb-2">
                                                <div className="absolute inset-0"></div>
                                                <span className="flex text-base items-center justify-center relative z-10">More
                                                    <svg
                                                        className="w-6 h-4 transform group-hover/btn:translate-x-1 transition-transform duration-300"
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
                            </div>
                        ))}
                    </div>

                    {/* Navigation Dots */}
                    {loaded && instanceRef.current && (
                        <div className="flex justify-center mt-8 space-x-3">
                            {Array.from({
                                length: Math.ceil(
                                    destinations.length / (window.innerWidth < 768 ? 1 : window.innerWidth < 1024 ? 2 : 3),
                                ),
                            }).map((_, idx) => (
                                <button
                                    key={idx}
                                    className={`relative transition-all duration-300 ${Math.floor(currentSlide / (window.innerWidth < 768 ? 1 : window.innerWidth < 1024 ? 2 : 3)) === idx
                                            ? "w-5 h-3 bg-gradient-to-r from-red-600 to-rose-600 rounded-full"
                                            : "w-3 h-3 bg-slate-300 hover:bg-red-300 rounded-full"
                                        }`}
                                    onClick={() => {
                                        const slidesPerView = window.innerWidth < 768 ? 1 : window.innerWidth < 1024 ? 2 : 3
                                        instanceRef.current?.moveToIdx(idx * slidesPerView)
                                    }}
                                >
                                    {Math.floor(currentSlide / (window.innerWidth < 768 ? 1 : window.innerWidth < 1024 ? 2 : 3)) ===
                                        idx && (
                                            <div className="absolute inset-0 bg-gradient-to-r from-red-600 to-rose-600 rounded-full animate-pulse"></div>
                                        )}
                                </button>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes slide-up {
          from { 
            opacity: 0; 
            transform: translateY(40px) scale(0.95); 
          }
          to { 
            opacity: 1; 
            transform: translateY(0) scale(1); 
          }
        }
        
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        
        .animate-fade-in {
          animation: fade-in 0.8s ease-out forwards;
        }
        
        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out forwards;
        }
        
        .animate-slide-up {
          animation: slide-up 0.6s ease-out forwards;
        }
        
        .animate-blob {
          animation: blob 7s infinite;
        }
        
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
        </section>
    )
}
