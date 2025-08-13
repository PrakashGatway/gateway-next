"use client"

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { toast } from "@/hooks/use-toast";
import { GraduationCap, Plane, MapPin, FileCheck2, Calendar, Star, Quote } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import RandomBlob from "@/components/shapeGenerator";
import EnhancedMultiStepForm from "@/components/pages/multiStep";
import { useKeenSlider } from "keen-slider/react"
import Component from "@/components/pages/partnerSlider";
import DestinationSection from "@/components/sections/destination";
import ReadMoreSection from "@/components/sections/content";
import CardLayout from "@/components/sections/whyus";
import DegreesSection from "@/components/sections/degreeSection";
import ProcessRoadmap from "@/components/sections/processRoad";
import PageServices from "@/services/PageServices";



const reasons = [
    {
        title: "Assured Success",
        icon: "/anime/reasons_one.svg", // Replace with actual icon path
        description:
            "Gateway Abroad Jaipur is committed to your global education dreams. With personalized guidance, expert strategies, and continuous support, we ensure students take confident steps toward successful overseas admissions."
    },
    {
        title: "Test Prep",
        icon: "/anime/reasons_two.svg", // Replace with actual icon path
        description:
            "We offer specialized coaching for IELTS, TOEFL, PTE, GRE, GMAT, and SAT. Our test prep ensures strong performance through proven techniques, mock tests, and individualized attention to weaknesses."
    },
    {
        title: "Expert Team",
        icon: "/anime/reasons_three.svg", // Replace with actual icon path
        description:
            "Our experienced consultants and trainers bring deep industry knowledge. They guide students at every stage—from course selection to visa interviews—with accurate, up-to-date information and friendly, professional support."
    },
    {
        title: "University Shortlists",
        icon: "/anime/reasons_four.svg", // Replace with actual icon path
        description:
            "We help shortlist top universities based on academic background, test scores, and career goals. Our curated selections align with students’ profiles, boosting chances of admission and scholarship opportunities."
    },
    {
        title: "Financial Services",
        icon: "/anime/reasons_five.svg", // Replace with actual icon path
        description:
            "Our advisors assist in finding the best financial aid options—scholarships, education loans, fee waivers. We simplify the paperwork and guide students toward making cost-effective study abroad decisions."
    },
    {
        title: "Visa Application",
        icon: "/anime/reasons_six.svg", // Replace with actual icon path
        description:
            "From documentation to interview prep, we handle every aspect of the visa process. With a high success rate, Gateway Abroad Jaipur makes the student visa journey stress-free and efficient."
    }
];

const heroImages = [
    {
        id: 1,
        src: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/14/10/2f/fe/united-kingdom.jpg?w=1200&h=700&s=1",
        alt: "Students studying in university",
        tags: ["Top Universities", "World-Class Education", "Global Recognition"],
    },
    {
        id: 2,
        src: "https://thumbs.dreamstime.com/b/london-uk-march-tower-bridge-opening-up-night-was-built-362396001.jpg",
        alt: "Graduation ceremony",
        tags: ["98% Success Rate", "Career Growth", "Alumni Network"],
    },
    {
        id: 3,
        src: "/placeholder.svg?height=400&width=460",
        alt: "Visa approval",
        tags: ["Visa Assistance", "Expert Guidance", "Quick Processing"],
    },
    {
        id: 4,
        src: "/placeholder.svg?height=400&width=460",
        alt: "International students",
        tags: ["Cultural Diversity", "Global Network", "Life Experience"],
    },
]

const StudyAbroad = () => {

    const [currentSlide, setCurrentSlide] = useState(0)
    const [loaded, setLoaded] = useState(false)
    const [faqData, setFaqData] = useState([]);


    const [sliderRef, instanceRef] = useKeenSlider<any>(
        {
            loop: true,
            slides: {
                perView: 1,
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

    const getAllfaqData = async (value) => {
        try {
            const response = await PageServices.getAllFaq();
            if (response.status === 'success') {
                setFaqData(response.data.faq || [])
            } else {
                console.log('something went wrong');
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    useEffect(() => {
        getAllfaqData(null)
    }, [])

    return (
        <>
            {/* HERO */}
            <section className="hero-gradient pt-10 py-12 pb-0 lg:pb-10 flex items-center relative overflow-hidden">
                {/* Animated background elements */}
                <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute top-28 left-10 w-4 h-4 bg-red-500 rounded-full animate-bounce-slow"></div>
                    <div className="absolute top-32 left-16 w-2 h-2 bg-red-500 rounded-full animate-pulse-slow animate-stagger-1"></div>
                    <div className="absolute top-44 left-12 w-2 h-2 bg-red-500 rounded-full animate-pulse-slow animate-stagger-2"></div>
                    <div className="absolute top-56 left-18 w-2 h-2 bg-red-500 rounded-full animate-pulse-slow animate-stagger-3"></div>
                    <div className="absolute top-68 left-14 w-2 h-2 bg-red-500 rounded-full animate-pulse-slow animate-stagger-4"></div>

                    <div className="absolute top-20 right-20 w-20 h-20 border-2 border-red-300 rounded-full animate-rotate-slow"></div>
                    <div className="absolute bottom-40 left-20 w-0 h-0 border-l-[20px] border-l-transparent border-r-[20px] border-r-transparent border-b-[30px] border-b-red-300 animate-float"></div>

                    {/* Additional floating elements */}
                    <div className="absolute top-1/4 right-1/4 w-6 h-6 bg-pink-400 rounded-full animate-float animate-stagger-2"></div>
                    <div className="absolute bottom-1/3 right-1/3 w-8 h-8 bg-yellow-400 rounded-full animate-bounce-slow animate-stagger-3"></div>
                </div>

                <div className="container-sm mx-auto px-12 py-28 relative z-10">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        {/* Left Content with staggered animations */}
                        <div className="space-y-3">
                            <div className="">
                                <h1 className="text-3xl lg:text-[2.5rem] font-bold leading-tight">
                                    <span className="inline-block">Study Abroad with</span>
                                    <br />
                                    {<> <span className="text-gradient py-2 inline-block">
                                        Gateway Abroad <br /> Jaipur
                                    </span>
                                        <br /> </>}
                                </h1>
                            </div>

                            <div className="mb-3">
                                <div className="text-gray-800 text-base leading-relaxed max-w-2xl" >Complete your overseas education dreams with expert guidance. From test preparation to visa assistance, we make your journey to studying abroad seamless and stress-free. </div>
                            </div>

                            <div className="flex flex-col sm:flex-row gap-4 animate-stagger-4">
                                <Link href="/contact" className="btn-primary inline-block text-center group">
                                    <span className="relative z-10">Get Started Today</span>
                                </Link>
                                <Link href="/about" className="btn-secondary text-center group">
                                    Learn More
                                </Link>
                            </div>
                            <div className="mt-6 flex items-center gap-3 text-base text-muted-foreground">
                                <Star className="text-primary" /> Trusted by 5,000+ students | 4.9/5 reviews
                            </div>
                        </div>

                        {/* Right Illustration with floating animation */}
                        <div className="relative animate-fadeInRight mx-auto w-full max-w-lg lg:max-w-none">
                            <div className="relative z-10 mx-auto">
                                <div
                                    ref={sliderRef}
                                    className="keen-slider rounded-[40px] overflow-hidden shadow-2xl bg-white/10 backdrop-blur-sm border border-white/20 relative"
                                    style={{ height: "450px", width: "98%" }}
                                >
                                    {heroImages.map((image, index) => (
                                        <div key={image.id} className="keen-slider__slide relative">
                                            <div className="w-full h-full relative">
                                                <Image
                                                    src={image.src || "/placeholder.svg"}
                                                    alt={image.alt}
                                                    fill
                                                    className="object-cover transition-all duration-1000 ease-in-out"
                                                    priority={index === 0}
                                                />

                                                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent">
                                                    <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 right-4 sm:right-6">
                                                        <div className="flex flex-wrap gap-2">
                                                            {image.tags.map((tag, tagIndex) => (
                                                                <div
                                                                    key={tag}
                                                                    className={`bg-white/95 backdrop-blur-sm text-red-600 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-semibold shadow-lg transform transition-all duration-700 ease-out ${currentSlide === index
                                                                        ? "translate-y-0 opacity-100 scale-100"
                                                                        : "translate-y-6 opacity-0 scale-90"
                                                                        }`}
                                                                    style={{
                                                                        transitionDelay: currentSlide === index ? `${tagIndex * 200 + 300}ms` : "0ms",
                                                                    }}
                                                                >
                                                                    {tag}
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="absolute top-3 sm:top-4 right-3 sm:right-4 bg-white/95 backdrop-blur-sm rounded-full px-2 sm:px-3 py-1 text-red-600 font-bold text-xs sm:text-sm shadow-lg">
                                                    {index + 1}/{heroImages.length}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {/* {loaded && instanceRef.current && (
                                    <div className="flex justify-center mt-4 sm:mt-6 space-x-2">
                                        {heroImages.map((_, idx) => (
                                            <button
                                                key={idx}
                                                className={`transition-all duration-500 ease-out transform hover:scale-110 ${currentSlide === idx
                                                        ? "w-6 sm:w-8 h-2 sm:h-3 bg-gradient-to-r from-red-600 to-rose-600 rounded-full shadow-lg"
                                                        : "w-2 sm:w-3 h-2 sm:h-3 bg-white/60 hover:bg-red-300 rounded-full"
                                                    }`}
                                                onClick={() => instanceRef.current?.moveToIdx(idx)}
                                            >
                                                {currentSlide === idx && (
                                                    <div className="w-full h-full bg-gradient-to-r from-red-600 to-rose-600 rounded-full animate-pulse-gentle"></div>
                                                )}
                                            </button>
                                        ))}
                                    </div>
                                )} */}
                            </div>

                            {/* Background circle with pulse animation */}
                            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 sm:w-96 h-72 sm:h-96 bg-white bg-opacity-20 rounded-full animate-pulse-slow -z-10"></div>

                            <div className="absolute -top-2 sm:-top-4 -right-2 sm:-right-4 w-6 sm:w-8 h-6 sm:h-8 bg-gradient-to-r from-red-500 to-pink-500 rounded-full animate-bounce-slow"></div>
                            <div className="absolute lg:-bottom-10 -bottom-12 lg:-left-10 left-0 z-10 border border-2 border-red-600 bg-white shadow-3xl rounded-xl p-2 sm:p-3">
                                <h3 className="text-lg sm:text-xl m-0 font-bold text-center">98%</h3>
                                <p className="text-xs sm:text-sm m-0 text-center">Success Rate</p>
                            </div>
                        </div>
                    </div>
                </div>

            </section>
            <EnhancedMultiStepForm />
            <DestinationSection />
            <DegreesSection />
            <CardLayout />
            <ProcessRoadmap />
            <Component />
            <ReadMoreSection />
            <section className="faq-section py-70 mb-0">
                <div className="container">
                    <div className="title text-center mb-5">
                        <h2 className="heading mb-2">Frequently asked questions</h2>
                        <p className="descp text-center">Can't find the answer you are looking for?</p>
                    </div>
                    <div className="max-w-5xl mx-auto">
                        <Accordion type="single" collapsible className="w-full">
                            {faqData.map((f: any, index: number) => (
                                <AccordionItem value={`item-${index}`} key={index}>
                                    <AccordionTrigger className="text-lg font-semibold text-left py-3">{f.title}</AccordionTrigger>
                                    <AccordionContent className="text-gray-700 pb-3">{f.content}</AccordionContent>
                                </AccordionItem>
                            ))}
                        </Accordion>
                    </div>
                </div>
            </section>
        </>
    );
};

export default StudyAbroad;