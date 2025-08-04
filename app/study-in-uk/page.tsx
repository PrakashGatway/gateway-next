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
      icon: GraduationCap,
      title: "World-Class Education",
      description: "Learn from top-ranked universities with cutting-edge research facilities and renowned faculty members.",
    },
    {
      icon: Globe,
      title: "Global Recognition",
      description: "UK degrees are recognized worldwide, opening doors to international career opportunities.",
    },
    {
      icon: Trophy,
      title: "Academic Excellence",
      description: "Experience the highest standards of education with innovative teaching methodologies.",
    },
    {
      icon: Clock,
      title: "Shorter Duration",
      description: "Complete your degree faster with UK's efficient education system and save time.",
    },
    {
      icon: Shield,
      title: "Quality Assurance",
      description: "All UK institutions are regularly monitored to ensure consistent quality of education.",
    },
    {
      icon: DollarSign,
      title: "Value for Money",
      description: "Get excellent return on investment with competitive tuition fees and living costs.",
    },
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
          background: "linear-gradient(135deg, hsl(221 83% 53% / 0.95) 0%, hsl(0 100% 50% / 0.85) 50%, hsl(14 100% 57% / 0.90) 100%)"
        }}
        className="absolute inset-0"
      ></div>
      <div 
        style={{
          background: "linear-gradient(to top, rgba(0, 0, 0, 0.2) 0%, transparent 50%, transparent 100%)"
        }}
        className="absolute inset-0"
      ></div>
      
      {/* Animated Background Elements */}
      <div 
        className="absolute top-20 left-10 w-72 h-72 rounded-full blur-3xl opacity-30 animate-bounce"
        style={{
          background: "linear-gradient(45deg, hsl(0 100% 50% / 0.2) 0%, hsl(221 83% 53% / 0.2) 100%)",
          animationDuration: "6s"
        }}
      ></div>
      <div 
        className="absolute bottom-20 right-10 w-96 h-96 rounded-full blur-3xl opacity-30 animate-bounce"
        style={{
          background: "linear-gradient(45deg, hsl(221 83% 53% / 0.2) 0%, hsl(0 100% 50% / 0.2) 100%)",
          animationDuration: "6s",
          animationDelay: "1s"
        }}
      ></div>
      
      
      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div 
            className="text-white space-y-8 animate-fade-in"
          >
            <div className="space-y-4">
              <h1 
                className="text-5xl lg:text-7xl font-bold leading-tight"
                style={{
                  textShadow: "0 4px 20px rgba(0, 0, 0, 0.3)"
                }}
              >
                Study in{" "}
                <span 
                  style={{
                    background: "linear-gradient(45deg, hsl(45 100% 60%) 0%, hsl(14 100% 57%) 50%, hsl(0 100% 50%) 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                    backgroundSize: "200% 200%",
                    animation: "gradient-shift 3s ease infinite",
                    filter: "drop-shadow(0 2px 4px rgba(255, 69, 0, 0.3))"
                  }}
                >
                  UK
                </span>
              </h1>
              <p 
                className="text-xl lg:text-2xl leading-relaxed"
                style={{
                  color: "rgba(255, 255, 255, 0.9)",
                  textShadow: "0 2px 8px rgba(0, 0, 0, 0.2)"
                }}
              >
                Unlock your potential with world-class education in the United Kingdom. 
                Experience academic excellence in historic universities.
              </p>
            </div>
            
            
            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 animate-slide-up" style={{animationDelay: '0.3s'}}>
              <div className="text-center group">
                <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-white/30 to-white/10 backdrop-blur-sm rounded-full mb-2 mx-auto border border-white/20 group-hover:scale-110 transition-transform duration-300">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <div className="text-2xl font-bold">50K+</div>
                <div className="text-sm text-white/80">Students Placed</div>
              </div>
              <div className="text-center group">
                <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-white/30 to-white/10 backdrop-blur-sm rounded-full mb-2 mx-auto border border-white/20 group-hover:scale-110 transition-transform duration-300">
                  <Award className="w-6 h-6 text-white" />
                </div>
                <div className="text-2xl font-bold">200+</div>
                <div className="text-sm text-white/80">Universities</div>
              </div>
              <div className="text-center group">
                <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-white/30 to-white/10 backdrop-blur-sm rounded-full mb-2 mx-auto border border-white/20 group-hover:scale-110 transition-transform duration-300">
                  <MapPin className="w-6 h-6 text-white" />
                </div>
                <div className="text-2xl font-bold">15+</div>
                <div className="text-sm text-white/80">Cities</div>
              </div>
            </div>
            
            {/* CTA Buttons */}
            <div 
              className="flex flex-col sm:flex-row gap-4 animate-scale-in"
              style={{
                animationDelay: "0.6s"
              }}
            >
              {/* <BasicDetailsDialog> */}
                <Button 
                  size="lg" 
                  className="text-lg px-8 group"
                  style={{
                    background: "linear-gradient(135deg, hsl(0 100% 50%) 0%, hsl(14 100% 57%) 50%, hsl(45 100% 60%) 100%)",
                    border: "none",
                    color: "white",
                    fontWeight: "600",
                    boxShadow: "0 8px 32px rgba(255, 69, 0, 0.4), 0 0 0 1px rgba(255, 255, 255, 0.1)",
                    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
                  }}
                  // onMouseEnter={(e) => {
                  //   e.currentTarget.style.transform = "translateY(-2px) scale(1.05)";
                  //   e.currentTarget.style.boxShadow = "0 12px 40px rgba(255, 69, 0, 0.5), 0 0 0 1px rgba(255, 255, 255, 0.2)";
                  // }}
                  // onMouseLeave={(e) => {
                  //   e.currentTarget.style.transform = "translateY(0) scale(1)";
                  //   e.currentTarget.style.boxShadow = "0 8px 32px rgba(255, 69, 0, 0.4), 0 0 0 1px rgba(255, 255, 255, 0.1)";
                  // }}
                >
                  Start Your Journey
                  <ArrowRight 
                    className="w-5 h-5 ml-2 transition-transform duration-300 group-hover:translate-x-1" 
                  />
                </Button>
              {/* </BasicDetailsDialog> */}
              <Button 
                variant="outline" 
                size="lg" 
                className="text-lg px-8"
                style={{
                  background: "rgba(255, 255, 255, 0.1)",
                  border: "1px solid rgba(255, 255, 255, 0.3)",
                  color: "white",
                  backdropFilter: "blur(20px)",
                  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
                }}
                // onMouseEnter={(e) => {
                //   e.currentTarget.style.background = "rgba(255, 255, 255, 0.2)";
                //   e.currentTarget.style.transform = "translateY(-2px) scale(1.05)";
                //   e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.5)";
                // }}
                // onMouseLeave={(e) => {
                //   e.currentTarget.style.background = "rgba(255, 255, 255, 0.1)";
                //   e.currentTarget.style.transform = "translateY(0) scale(1)";
                //   e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.3)";
                // }}
              >
                Download Guide
              </Button>
            </div>
          </div>
          
          {/* Right Content - UK Map */}
          <div className="flex justify-center lg:justify-end animate-fade-in" style={{animationDelay: '0.4s'}}>
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-primary/30 to-secondary/30 rounded-xl blur-2xl transform group-hover:scale-110 transition-transform duration-500"></div>
              <img 
                src={'https://www.gatewayabroadeducations.com/lp/uk_new_page/map.svg'} 
                alt="UK Map" 
                className="relative w-full max-w-md lg:max-w-lg h-auto drop-shadow-2xl filter brightness-110 contrast-110 group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-1/4 left-1/4 w-4 h-4 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full animate-pulse shadow-lg"></div>
              <div className="absolute top-1/3 right-1/3 w-4 h-4 bg-gradient-to-r from-red-400 to-pink-500 rounded-full animate-pulse shadow-lg" style={{animationDelay: '0.5s'}}></div>
              <div className="absolute bottom-1/3 left-1/2 w-4 h-4 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full animate-pulse shadow-lg" style={{animationDelay: '1s'}}></div>
            </div>
          </div>
        </div>
      </div>
    </section>
        <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Why Choose Our Study Platform?
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            We provide comprehensive support to make your UK education dreams a reality 
            with personalized guidance and expert assistance.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reasons.map((reason, index) => (
            <Card 
              key={index} 
              className="group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border-0 shadow-lg bg-white"
            >
              <CardHeader className="text-center pb-4">
                <div className="w-16 h-16 bg-gradient-to-br from-primary to-primary-hover rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <reason.icon className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-xl font-bold text-foreground">
                  {reason.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-center leading-relaxed">
                  {reason.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
    <ApplicationForm/>
    </>
  );
};

export default HeroSection;