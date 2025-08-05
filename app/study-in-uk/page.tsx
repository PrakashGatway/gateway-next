"use client"

import { Button } from "@/components/ui/button";
import { ArrowRight, MapPin, Users, Award } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { GraduationCap, Globe, Trophy, Clock, Shield, DollarSign } from "lucide-react";



import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { ChevronRight, ChevronLeft, User, BookOpen, FileText, Send } from "lucide-react";
import MultiStepForm from "@/components/pages/multiStep";

const ApplicationForm = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 4;
  const progressValue = (currentStep / totalSteps) * 100;

  const steps = [
    { number: 1, title: "Personal Info", icon: User },
    { number: 2, title: "Education", icon: BookOpen },
    { number: 3, title: "Documents", icon: FileText },
    { number: 4, title: "Submit", icon: Send },
  ];

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <section
      className="py-20 bg-cover bg-center bg-no-repeat relative"
      style={{
        backgroundImage: `url(/img/uk.webp)`,
        minHeight: "100vh"
      }}
    >
      <div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(135deg, hsl(221 83% 53% / 0.8) 0%, hsl(0 100% 50% / 0.9) 100%)"
        }}
      ></div>

      <div className="relative z-10 container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div
            className="text-white space-y-8 animate-fade-in"
          >
            <h2
              className="text-4xl lg:text-5xl font-bold leading-tight"
              style={{
                textShadow: "0 4px 20px rgba(0, 0, 0, 0.3)",
                background: "linear-gradient(45deg, white 0%, rgba(255, 255, 255, 0.8) 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text"
              }}
            >
              Start Your Application Journey
            </h2>
            <p
              className="text-xl"
              style={{
                color: "rgba(255, 255, 255, 0.9)",
                textShadow: "0 2px 8px rgba(0, 0, 0, 0.2)"
              }}
            >
              Take the first step towards your UK education with our simple,
              step-by-step application process.
            </p>

            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-secondary rounded-full flex items-center justify-center">
                  <span className="text-white font-bold">1</span>
                </div>
                <span className="text-lg">Fill out the application form</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-secondary rounded-full flex items-center justify-center">
                  <span className="text-white font-bold">2</span>
                </div>
                <span className="text-lg">Get matched with universities</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-secondary rounded-full flex items-center justify-center">
                  <span className="text-white font-bold">3</span>
                </div>
                <span className="text-lg">Receive expert guidance</span>
              </div>
            </div>
          </div>

          {/* Right Content - Form */}
          <div
            className="flex justify-end animate-fade-in"
            style={{
              animationDelay: "0.3s"
            }}
          >
            <Card
              className="w-full max-w-md"
              style={{
                background: "rgba(255, 255, 255, 0.95)",
                backdropFilter: "blur(20px)",
                border: "1px solid rgba(255, 255, 255, 0.2)",
                borderRadius: "20px",
                boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(255, 255, 255, 0.1)"
              }}
            >

              <CardHeader
                className="text-center"
                style={{
                  background: "linear-gradient(135deg, hsl(221 83% 53%) 0%, hsl(0 100% 50%) 100%)",
                  color: "white",
                  borderRadius: "20px 20px 0 0",
                  padding: "24px"
                }}
              >
                <CardTitle
                  className="text-2xl font-bold"
                  style={{
                    textShadow: "0 2px 4px rgba(0, 0, 0, 0.3)"
                  }}
                >
                  Application Form
                </CardTitle>
                <div className="mt-4">
                  <div className="flex justify-between mb-2">
                    {steps.map((step) => (
                      <div
                        key={step.number}
                        className="flex items-center justify-center w-12 h-12 rounded-full transition-all duration-300"
                        style={{
                          background: currentStep >= step.number
                            ? "rgba(255, 255, 255, 0.9)"
                            : "rgba(255, 255, 255, 0.2)",
                          color: currentStep >= step.number
                            ? "hsl(221 83% 53%)"
                            : "rgba(255, 255, 255, 0.7)",
                          boxShadow: currentStep >= step.number
                            ? "0 4px 15px rgba(255, 255, 255, 0.3)"
                            : "none",
                          transform: currentStep >= step.number ? "scale(1.1)" : "scale(1)"
                        }}
                      >
                        <step.icon className="w-5 h-5" />
                      </div>
                    ))}
                  </div>
                  <div
                    className="mt-4 rounded-full overflow-hidden"
                    style={{
                      background: "rgba(255, 255, 255, 0.2)",
                      height: "6px"
                    }}
                  >
                    <div
                      className="h-full transition-all duration-500 ease-out rounded-full"
                      style={{
                        background: "linear-gradient(90deg, rgba(255, 255, 255, 0.9) 0%, rgba(255, 255, 255, 0.7) 100%)",
                        width: `${progressValue}%`
                      }}
                    />
                  </div>
                  <p
                    className="text-sm mt-2"
                    style={{
                      color: "rgba(255, 255, 255, 0.8)",
                      textShadow: "0 1px 2px rgba(0, 0, 0, 0.2)"
                    }}
                  >
                    Step {currentStep} of {totalSteps}: {steps[currentStep - 1].title}
                  </p>
                </div>
              </CardHeader>

              <CardContent
                className="space-y-6"
                style={{
                  padding: "24px"
                }}
              >
                {currentStep === 1 && (
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="firstName">First Name</Label>
                        <Input id="firstName" placeholder="John" />
                      </div>
                      <div>
                        <Label htmlFor="lastName">Last Name</Label>
                        <Input id="lastName" placeholder="Doe" />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" type="email" placeholder="john@example.com" />
                    </div>
                    <div>
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input id="phone" placeholder="+44 123 456 7890" />
                    </div>
                  </div>
                )}

                {currentStep === 2 && (
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="course">Preferred Course</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a course" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="business">Business Studies</SelectItem>
                          <SelectItem value="engineering">Engineering</SelectItem>
                          <SelectItem value="medicine">Medicine</SelectItem>
                          <SelectItem value="law">Law</SelectItem>
                          <SelectItem value="arts">Arts & Humanities</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="level">Study Level</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select study level" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="undergraduate">Undergraduate</SelectItem>
                          <SelectItem value="postgraduate">Postgraduate</SelectItem>
                          <SelectItem value="phd">PhD</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="intake">Preferred Intake</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select intake" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="september">September 2024</SelectItem>
                          <SelectItem value="january">January 2025</SelectItem>
                          <SelectItem value="may">May 2025</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                )}

                {currentStep === 3 && (
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="transcript">Academic Transcripts</Label>
                      <Input id="transcript" type="file" />
                    </div>
                    <div>
                      <Label htmlFor="english">English Test Score</Label>
                      <Input id="english" placeholder="IELTS/TOEFL Score" />
                    </div>
                    <div>
                      <Label htmlFor="sop">Statement of Purpose</Label>
                      <Textarea id="sop" placeholder="Tell us about your goals..." />
                    </div>
                  </div>
                )}

                {currentStep === 4 && (
                  <div className="text-center space-y-4">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                      <Send className="w-8 h-8 text-green-600" />
                    </div>
                    <h3 className="text-xl font-bold">Ready to Submit!</h3>
                    <p className="text-muted-foreground">
                      Review your information and submit your application to get started
                      with your UK education journey.
                    </p>
                  </div>
                )}

                <div className="flex justify-between pt-6">
                  <Button
                    variant="outline"
                    onClick={prevStep}
                    disabled={currentStep === 1}
                  >
                    <ChevronLeft className="w-4 h-4 mr-2" />
                    Previous
                  </Button>

                  {currentStep < totalSteps ? (
                    <Button onClick={nextStep} variant="hero">
                      Next
                      <ChevronRight className="w-4 h-4 ml-2" />
                    </Button>
                  ) : (
                    <Button variant="cta">
                      Submit Application
                      <Send className="w-4 h-4 ml-2" />
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};


const HeroSection = () => {
  const reasons = [
    {
      title: "Assured Success",
      icon: "/icons/success.png", // Replace with actual icon path
      description:
        "Gateway Abroad Jaipur is committed to your global education dreams. With personalized guidance, expert strategies, and continuous support, we ensure students take confident steps toward successful overseas admissions."
    },
    {
      title: "Test Prep",
      icon: "/icons/test-prep.png", // Replace with actual icon path
      description:
        "We offer specialized coaching for IELTS, TOEFL, PTE, GRE, GMAT, and SAT. Our test prep ensures strong performance through proven techniques, mock tests, and individualized attention to weaknesses."
    },
    {
      title: "Expert Team",
      icon: "/icons/expert-team.png", // Replace with actual icon path
      description:
        "Our experienced consultants and trainers bring deep industry knowledge. They guide students at every stage—from course selection to visa interviews—with accurate, up-to-date information and friendly, professional support."
    },
    {
      title: "University Shortlists",
      icon: "/icons/university.png", // Replace with actual icon path
      description:
        "We help shortlist top universities based on academic background, test scores, and career goals. Our curated selections align with students’ profiles, boosting chances of admission and scholarship opportunities."
    },
    {
      title: "Financial Services",
      icon: "/icons/finance.png", // Replace with actual icon path
      description:
        "Our advisors assist in finding the best financial aid options—scholarships, education loans, fee waivers. We simplify the paperwork and guide students toward making cost-effective study abroad decisions."
    },
    {
      title: "Visa Application",
      icon: "/icons/visa.png", // Replace with actual icon path
      description:
        "From documentation to interview prep, we handle every aspect of the visa process. With a high success rate, Gateway Abroad Jaipur makes the student visa journey stress-free and efficient."
    }
  ];
  return (
    <>
      <section
        className="relative min-h-screen flex items-center bg-cover bg-center bg-no-repeat overflow-hidden"
        style={{ backgroundImage: `url(/img/uk.webp)` }}
      >
        {/* Enhanced Gradient Overlay */}
        <div
          style={{
            background: "linear-gradient(135deg, hsl(221 83% 53% / 0.5) 0%, hsl(0 100% 50% / 0.5) 50%, hsl(221 100% 57% / 0.7) 100%)"
          }}
          className="absolute inset-0"
        ></div>
        <div
          style={{
            background: "linear-gradient(to top, rgba(0, 0, 0, 0.3) 30%, transparent 100%, transparent 10%)"
          }}
          className="absolute inset-0"
        ></div>

        <div className="relative z-10 container-sm mx-auto px-4 pt-16 pb-12">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div
              className="text-white space-y-8 animate-fade-in"
            >
              <div className="space-y-4">
                <h1
                  className="text-4xl lg:text-4xl font-bold leading-tight"
                  style={{
                    textShadow: "0 4px 20px rgba(0, 0, 0, 0.5)"
                  }}
                >
                  Study in{" "}
                  <span className="text-gradient py-2 inline-block"
                  >
                    UK
                  </span> <br />
                  Explore the Best Ways to Success
                </h1>
                <p
                  className="text-base lg:text-lg leading-relaxed"
                  style={{
                    color: "rgba(255, 255, 255, 0.9)",
                    textShadow: "0 2px 8px rgba(0, 0, 0, 0.6)"
                  }}
                >
                  Unlock your potential with world-class education in the United Kingdom.
                  Experience academic excellence in historic universities.
                </p>
              </div>


              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Card 1: Students Placed */}
                <div
                  className="flex items-center gap-3 
      p-2 
      border-2 border-blue-300 
      shadow-lg 
      rounded-2xl 
      bg-gradient-to-br from-indigo-100/30 to-indigo-100/10 
      backdrop-blur-[2px] 
      hover:backdrop-blur-sm 
      hover:border-blue-600 
      transition-all duration-300 
      relative 
      overflow-hidden 
      group
      hover:shadow-blue-200/20 hover:shadow-2xl
      animate-slide-up"
                  style={{ animationDelay: '0.3s' }}
                >
                  {/* Text Content */}
                  <div className="text-left flex-1">
                    <div className="text-2xl font-bold 
        text-transparent bg-clip-text 
        bg-gradient-to-b from-white via-blue-50 to-cyan-100 
        drop-shadow-md group-hover:drop-shadow-lg
      ">
                      50K+
                    </div>
                    <div className="text-xs text-white/90 tracking-wide drop-shadow-sm">
                      Students Placed
                    </div>
                  </div>

                  {/* Anime Character */}
                  <div className="flex-shrink-0 w-24 h-24 opacity-90 pointer-events-none transition-transform duration-300 group-hover:scale-105">
                    <img src="/anime/a1.png" alt="Student" className="w-full h-full object-contain" />
                  </div>

                  {/* Glow Overlay */}
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-cyan-200/5 to-pink-200/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
                </div>

                {/* Card 2: Universities */}
                <div
                  className="flex items-center gap-3 
      p-2 
      border-2 border-violet-300 
      shadow-lg 
      rounded-2xl 
      bg-gradient-to-br from-violet-100/30 to-violet-100/10 
      backdrop-blur-[2px] 
      hover:backdrop-blur-sm 
      hover:border-violet-600 
      transition-all duration-300 
      relative 
      overflow-hidden 
      group
      hover:shadow-violet-200/20 hover:shadow-2xl
      animate-slide-up"
                  style={{ animationDelay: '0.5s' }}
                >
                  {/* Text Content */}
                  <div className="text-left flex-1">
                    <div className="text-2xl font-bold 
        text-transparent bg-clip-text 
        bg-gradient-to-b from-white via-violet-50 to-purple-100 
        drop-shadow-md group-hover:drop-shadow-lg
      ">
                      200+
                    </div>
                    <div className="text-xs text-white/90 tracking-wide drop-shadow-xl">
                      Universities
                    </div>
                  </div>

                  {/* Anime Character - Maybe a Grad Cap or Mascot? */}
                  <div className="flex-shrink-0 w-24 h-24 opacity-90 pointer-events-none transition-transform duration-300 group-hover:scale-105">
                    <img src="/anime/a1.png" alt="University" className="w-full h-full object-contain" />
                  </div>

                  {/* Glow Overlay */}
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-violet-200/5 to-purple-200/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
                </div>

                {/* Card 3: Cities */}
                <div
                  className="flex items-center gap-3 
      p-2 
      border-2 border-emerald-100 
      shadow-lg 
      rounded-2xl 
      bg-gradient-to-br from-emerald-100/30 to-emerald-100/10 
      backdrop-blur-[2px] 
      hover:backdrop-blur-sm 
      hover:border-emerald-400 
      transition-all duration-300 
      relative 
      overflow-hidden 
      group
      hover:shadow-emerald-200/20 hover:shadow-2xl
      animate-slide-up"
                  style={{ animationDelay: '0.7s' }}
                >
                  {/* Text Content */}
                  <div className="text-left flex-1">
                    <div className="text-2xl font-bold 
        text-transparent bg-clip-text 
        bg-gradient-to-b from-white via-emerald-50 to-emerald-100 
        drop-shadow-md group-hover:drop-shadow-lg
      ">
                      15+
                    </div>
                    <div className="text-xs text-white/90 tracking-wide drop-shadow-sm">
                      Cities
                    </div>
                  </div>

                  {/* Anime Character - Traveler or Explorer */}
                  <div className="flex-shrink-0 w-24 h-24 opacity-90 pointer-events-none transition-transform duration-300 group-hover:scale-105">
                    <img src="/anime/a1.png" alt="City Explorer" className="w-full h-full object-contain" />
                  </div>

                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-emerald-200/5 to-teal-200/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
                </div>
              </div>

              {/* CTA Buttons */}
              <div
                className="flex flex-col sm:flex-row gap-4 animate-scale-in"
                style={{
                  animationDelay: "0.6s"
                }}
              >
                <Button
                  size="lg"
                  className="btn-primary text-center border group"
                >
                  Start Your Journey
                  <ArrowRight
                    className="w-5 h-5 ml-2 transition-transform duration-300 group-hover:translate-x-1"
                  />
                </Button>
              </div>
            </div>

            <div className="flex justify-center lg:justify-end" >
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-primary/30 to-secondary/30 rounded-xl blur-2xl transform transition-transform duration-500"></div>
                <img
                  src={'https://www.gatewayabroadeducations.com/lp/uk_new_page/map_mobile.svg'}
                  alt="UK Map"
                  className="relative w-full max-w-md lg:max-w-xl h-auto drop-shadow-4xl filter brightness-120 contrast-110 transition-transform duration-500"
                />
                <div className="w-full text-center mt-8">
                  <p className="text-white text-base md:text-base font-medium bg-black/20 backdrop-blur-sm rounded-lg px-4 py-2 inline-block">
                    🎓 Top UK Universities Across 15+ Cities
                  </p>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>
      <section className="py-20 bg-background">
        <div className="container-sm mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="heading text-center d-block mb-2">
              Why Choose Our Study Platform?
            </h2>
            <p className="sub-heading !text-base max-w-3xl mx-auto">
              We provide comprehensive support to make your UK education dreams a reality
              with personalized guidance and expert assistance.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {reasons.map((reason, index) =>
              <div key={index}
                className="flex items-start gap-3 
      p-4 
      border-2 border-blue-300 
      shadow-lg 
      rounded-2xl 
      bg-gradient-to-br from-red-300/30 to-indigo-200/30 
      backdrop-blur-[2px] 
      hover:backdrop-blur-sm 
      hover:border-blue-600 
      transition-all duration-300 
      relative 
      overflow-hidden 
      group
      hover:shadow-blue-200/20 hover:shadow-2xl
      animate-slide-up"
                style={{ animationDelay: '0.3s' }}
              >
                {/* Text Content */}
                <div className="text-left flex-1">
                  <div className="sub-heading mb-2 bg-clip-text 
        bg-gradient-to-b from-white via-blue-50 to-cyan-100 
        drop-shadow-md group-hover:drop-shadow-lg
      ">
                    {reason.title}
                  </div>
                  <div className="descp !text-left !text-gray-700 !text-sm drop-shadow-lg">
                    {reason.description}
                  </div>
                </div>

                {/* Anime Character */}
                <div className="flex-shrink-0 w-24 h-24 opacity-90 pointer-events-none transition-transform duration-300 group-hover:scale-105">
                  <img src="https://www.gatewayabroadeducations.com/lp/uk_new_page/reasons_one.svg" alt="Student" className="w-full h-full object-contain" />
                </div>

                {/* Glow Overlay */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-cyan-200/5 to-pink-200/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
              </div>
            )}
          </div>
        </div>
      </section>
      {/* <MultiStepForm/> */}
      {/* <ApplicationForm /> */}
    </>
  );
};

export default HeroSection;