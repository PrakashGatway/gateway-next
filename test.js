import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowRight, User, Mail, Phone, GraduationCap } from "lucide-react";

interface BasicDetailsDialogProps {
  children: React.ReactNode;
}

const BasicDetailsDialog = ({ children }: BasicDetailsDialogProps) => {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent 
        className="max-w-md mx-auto"
        style={{
          background: "linear-gradient(135deg, hsl(221 83% 53%) 0%, hsl(0 100% 50%) 100%)",
          border: "1px solid rgba(255, 255, 255, 0.2)",
          backdropFilter: "blur(20px)",
          borderRadius: "16px",
          boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(255, 255, 255, 0.1)"
        }}
      >
        <DialogHeader>
          <DialogTitle 
            className="text-2xl font-bold text-center text-white mb-6"
            style={{
              textShadow: "0 2px 4px rgba(0, 0, 0, 0.3)"
            }}
          >
            Start Your UK Journey
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          <div 
            className="text-center text-white/90 mb-6"
            style={{
              textShadow: "0 1px 2px rgba(0, 0, 0, 0.2)"
            }}
          >
            Let's get to know you better and match you with the perfect UK university!
          </div>
          
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="firstName" className="text-white/90 text-sm font-medium">
                  <User className="w-4 h-4 inline mr-2" />
                  First Name
                </Label>
                <Input 
                  id="firstName" 
                  placeholder="John"
                  style={{
                    background: "rgba(255, 255, 255, 0.1)",
                    border: "1px solid rgba(255, 255, 255, 0.2)",
                    color: "white",
                    backdropFilter: "blur(10px)"
                  }}
                  className="placeholder:text-white/60 focus:ring-2 focus:ring-white/30 focus:border-white/40"
                />
              </div>
              <div>
                <Label htmlFor="lastName" className="text-white/90 text-sm font-medium">
                  Last Name
                </Label>
                <Input 
                  id="lastName" 
                  placeholder="Doe"
                  style={{
                    background: "rgba(255, 255, 255, 0.1)",
                    border: "1px solid rgba(255, 255, 255, 0.2)",
                    color: "white",
                    backdropFilter: "blur(10px)"
                  }}
                  className="placeholder:text-white/60 focus:ring-2 focus:ring-white/30 focus:border-white/40"
                />
              </div>
            </div>
            
            <div>
              <Label htmlFor="email" className="text-white/90 text-sm font-medium">
                <Mail className="w-4 h-4 inline mr-2" />
                Email Address
              </Label>
              <Input 
                id="email" 
                type="email" 
                placeholder="john@example.com"
                style={{
                  background: "rgba(255, 255, 255, 0.1)",
                  border: "1px solid rgba(255, 255, 255, 0.2)",
                  color: "white",
                  backdropFilter: "blur(10px)"
                }}
                className="placeholder:text-white/60 focus:ring-2 focus:ring-white/30 focus:border-white/40"
              />
            </div>
            
            <div>
              <Label htmlFor="phone" className="text-white/90 text-sm font-medium">
                <Phone className="w-4 h-4 inline mr-2" />
                Phone Number
              </Label>
              <Input 
                id="phone" 
                placeholder="+44 123 456 7890"
                style={{
                  background: "rgba(255, 255, 255, 0.1)",
                  border: "1px solid rgba(255, 255, 255, 0.2)",
                  color: "white",
                  backdropFilter: "blur(10px)"
                }}
                className="placeholder:text-white/60 focus:ring-2 focus:ring-white/30 focus:border-white/40"
              />
            </div>
            
            <div>
              <Label htmlFor="studyLevel" className="text-white/90 text-sm font-medium">
                <GraduationCap className="w-4 h-4 inline mr-2" />
                Study Level
              </Label>
              <Select>
                <SelectTrigger 
                  style={{
                    background: "rgba(255, 255, 255, 0.1)",
                    border: "1px solid rgba(255, 255, 255, 0.2)",
                    color: "white",
                    backdropFilter: "blur(10px)"
                  }}
                  className="focus:ring-2 focus:ring-white/30 focus:border-white/40"
                >
                  <SelectValue placeholder="Select your study level" className="text-white/60" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="undergraduate">Undergraduate</SelectItem>
                  <SelectItem value="postgraduate">Postgraduate</SelectItem>
                  <SelectItem value="phd">PhD</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="flex gap-3 pt-4">
            <Button 
              variant="outline" 
              onClick={() => setOpen(false)}
              style={{
                background: "rgba(255, 255, 255, 0.1)",
                border: "1px solid rgba(255, 255, 255, 0.3)",
                color: "white",
                backdropFilter: "blur(10px)"
              }}
              className="flex-1 hover:bg-white/20 transition-all duration-300"
            >
              Not Now
            </Button>
            <Button 
              style={{
                background: "linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(255, 255, 255, 0.8) 100%)",
                color: "hsl(221 83% 53%)",
                border: "none",
                fontWeight: "600",
                boxShadow: "0 4px 15px rgba(255, 255, 255, 0.3)"
              }}
              className="flex-1 hover:scale-105 transition-all duration-300 hover:shadow-lg"
              onClick={() => setOpen(false)}
            >
              Get Started
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default BasicDetailsDialog;


import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CalendarDays, Clock, ArrowRight, User } from "lucide-react";

const BlogsSection = () => {
  const blogs = [
    {
      title: "Complete Guide to UK Student Visa Requirements 2024",
      excerpt: "Everything you need to know about UK student visa application process, required documents, and recent updates to immigration policies.",
      author: "Sarah Johnson",
      date: "Dec 15, 2024",
      readTime: "8 min read",
      category: "Visa Guide",
      image: "📄",
      trending: true,
    },
    {
      title: "Top 10 Scholarships for International Students in UK",
      excerpt: "Discover fully-funded and partial scholarships available for international students across various fields of study in UK universities.",
      author: "Michael Chen",
      date: "Dec 12, 2024", 
      readTime: "6 min read",
      category: "Scholarships",
      image: "💰",
      trending: false,
    },
    {
      title: "Living in London: A Student's Complete Guide",
      excerpt: "From accommodation to transportation, discover everything about student life in London including budget tips and must-visit places.",
      author: "Emma Williams",
      date: "Dec 10, 2024",
      readTime: "10 min read", 
      category: "Student Life",
      image: "🏙️",
      trending: true,
    },
    {
      title: "IELTS vs TOEFL: Which English Test is Better for UK?",
      excerpt: "Compare IELTS and TOEFL exams to determine which English proficiency test is more suitable for UK university applications.",
      author: "Dr. James Brown",
      date: "Dec 8, 2024",
      readTime: "5 min read",
      category: "Test Prep",
      image: "📝",
      trending: false,
    },
    {
      title: "Post-Study Work Visa: Your Guide to Working in UK",
      excerpt: "Learn about the Graduate Route visa that allows you to stay and work in the UK for up to 2 years after completing your studies.",
      author: "Emma Williams", 
      date: "Dec 5, 2024",
      readTime: "7 min read",
      category: "Work Visa",
      image: "💼",
      trending: false,
    },
    {
      title: "Best Universities for Engineering in UK 2024",
      excerpt: "Explore the top-ranked engineering programs in UK universities with admission requirements and career prospects.",
      author: "Dr. Sarah Johnson",
      date: "Dec 3, 2024",
      readTime: "9 min read",
      category: "Universities",
      image: "⚙️",
      trending: true,
    },
  ];

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Latest Insights & Guides
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Stay updated with the latest information about UK education, visa updates, 
            and helpful tips for international students.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs.map((blog, index) => (
            <Card 
              key={index}
              className="group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden border-0 shadow-lg"
            >
              <CardHeader className="p-0">
                <div className="relative h-48 bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center">
                  <div className="text-6xl group-hover:scale-110 transition-transform duration-300">
                    {blog.image}
                  </div>
                  {blog.trending && (
                    <Badge className="absolute top-4 left-4 bg-secondary text-white">
                      Trending
                    </Badge>
                  )}
                  <Badge 
                    variant="outline" 
                    className="absolute top-4 right-4 bg-white/90 text-primary border-primary"
                  >
                    {blog.category}
                  </Badge>
                </div>
              </CardHeader>
              
              <CardContent className="p-6">
                <h3 className="font-bold text-lg mb-3 text-foreground line-clamp-2 group-hover:text-primary transition-colors">
                  {blog.title}
                </h3>
                
                <p className="text-muted-foreground text-sm leading-relaxed mb-4 line-clamp-3">
                  {blog.excerpt}
                </p>
                
                <div className="flex items-center space-x-4 text-xs text-muted-foreground mb-4">
                  <div className="flex items-center space-x-1">
                    <User className="w-3 h-3" />
                    <span>{blog.author}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <CalendarDays className="w-3 h-3" />
                    <span>{blog.date}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Clock className="w-3 h-3" />
                    <span>{blog.readTime}</span>
                  </div>
                </div>
                
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full group-hover:bg-primary group-hover:text-white group-hover:border-primary transition-all"
                >
                  Read More
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <Button variant="hero" size="lg">
            View All Articles
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default BlogsSection;


import { Card, CardContent } from "@/components/ui/card";

const PartnersSection = () => {
  const universities = [
    {
      name: "University of Oxford",
      location: "Oxford, England",
      ranking: "#1 in UK",
      logo: "🎓",
    },
    {
      name: "University of Cambridge",
      location: "Cambridge, England", 
      ranking: "#2 in UK",
      logo: "🏛️",
    },
    {
      name: "Imperial College London",
      location: "London, England",
      ranking: "#3 in UK",
      logo: "🔬",
    },
    {
      name: "London School of Economics",
      location: "London, England",
      ranking: "#4 in UK",
      logo: "💼",
    },
    {
      name: "University College London",
      location: "London, England",
      ranking: "#5 in UK",
      logo: "🏫",
    },
    {
      name: "University of Edinburgh",
      location: "Edinburgh, Scotland",
      ranking: "#6 in UK",
      logo: "🏰",
    },
    {
      name: "King's College London",
      location: "London, England",
      ranking: "#7 in UK",
      logo: "👑",
    },
    {
      name: "University of Manchester",
      location: "Manchester, England",
      ranking: "#8 in UK",
      logo: "⚡",
    },
  ];

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Our Partner Universities
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            We have partnerships with top-ranked universities across the UK, 
            ensuring you get access to the best educational opportunities.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {universities.map((university, index) => (
            <Card 
              key={index}
              className="group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border-0 shadow-lg"
            >
              <CardContent className="p-6 text-center">
                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
                  {university.logo}
                </div>
                <h3 className="font-bold text-lg mb-2 text-foreground">
                  {university.name}
                </h3>
                <p className="text-muted-foreground text-sm mb-2">
                  {university.location}
                </p>
                <span className="inline-block bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-semibold">
                  {university.ranking}
                </span>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <p className="text-lg text-muted-foreground mb-6">
            And many more prestigious institutions across the UK
          </p>
          <div className="flex flex-wrap justify-center gap-8 opacity-60">
            <span className="text-2xl">🏛️</span>
            <span className="text-2xl">🎓</span>
            <span className="text-2xl">📚</span>
            <span className="text-2xl">🔬</span>
            <span className="text-2xl">💻</span>
            <span className="text-2xl">🎨</span>
            <span className="text-2xl">⚖️</span>
            <span className="text-2xl">🏥</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PartnersSection;

import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, FileSearch, School, Plane, GraduationCap, Briefcase } from "lucide-react";

const RoadmapSection = () => {
  const steps = [
    {
      step: 1,
      icon: FileSearch,
      title: "Initial Consultation",
      description: "Free consultation to understand your goals, preferences, and academic background. We'll assess your profile and provide personalized recommendations.",
      duration: "1-2 days",
    },
    {
      step: 2,
      icon: School,
      title: "University Selection",
      description: "Based on your profile, we'll shortlist the best-fit universities and courses. Get detailed information about admission requirements and deadlines.",
      duration: "1 week",
    },
    {
      step: 3,
      icon: CheckCircle,
      title: "Application Preparation",
      description: "Complete guidance on preparing application documents, writing statements, and gathering required certificates for your chosen universities.",
      duration: "2-3 weeks",
    },
    {
      step: 4,
      icon: Plane,
      title: "Visa Process",
      description: "Expert assistance with student visa application, documentation, and interview preparation to ensure smooth visa approval.",
      duration: "4-6 weeks",
    },
    {
      step: 5,
      icon: GraduationCap,
      title: "Pre-Departure",
      description: "Comprehensive pre-departure briefing covering accommodation, travel arrangements, and orientation to help you settle in the UK.",
      duration: "1-2 weeks",
    },
    {
      step: 6,
      icon: Briefcase,
      title: "Career Support",
      description: "Ongoing career guidance, internship opportunities, and job placement assistance throughout your studies and beyond graduation.",
      duration: "Ongoing",
    },
  ];

  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Your Journey Roadmap
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Follow our proven 6-step process to successfully secure admission and 
            visa for your dream university in the UK.
          </p>
        </div>
        
        <div className="relative">
          {/* Timeline Line */}
          <div className="hidden lg:block absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-primary to-secondary"></div>
          
          <div className="space-y-12">
            {steps.map((step, index) => (
              <div 
                key={step.step}
                className={`flex flex-col lg:flex-row items-center gap-8 ${
                  index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
                }`}
              >
                {/* Content Card */}
                <div className="lg:w-5/12">
                  <Card className="group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                    <CardContent className="p-8">
                      <div className="flex items-start space-x-4">
                        <div className="flex-shrink-0">
                          <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                            <step.icon className="w-6 h-6 text-white" />
                          </div>
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            <span className="text-sm font-semibold text-primary bg-primary/10 px-2 py-1 rounded-full">
                              Step {step.step}
                            </span>
                            <span className="text-sm text-muted-foreground">
                              {step.duration}
                            </span>
                          </div>
                          <h3 className="text-xl font-bold text-foreground mb-3">
                            {step.title}
                          </h3>
                          <p className="text-muted-foreground leading-relaxed">
                            {step.description}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
                
                {/* Timeline Node */}
                <div className="hidden lg:block lg:w-2/12 flex justify-center">
                  <div className="w-8 h-8 bg-white border-4 border-primary rounded-full shadow-lg flex items-center justify-center">
                    <span className="text-xs font-bold text-primary">{step.step}</span>
                  </div>
                </div>
                
                {/* Spacer */}
                <div className="lg:w-5/12"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default RoadmapSection;


import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import teamBackground from "@/assets/team-bg.jpg";
import { Linkedin, Mail } from "lucide-react";

const TeamSection = () => {
  const teamMembers = [
    {
      name: "Dr. Sarah Johnson",
      role: "Education Consultant",
      specialization: "UK Universities",
      experience: "15+ years",
      description: "Former admissions officer at Oxford University with extensive knowledge of UK education system.",
      avatar: "👩‍🏫",
    },
    {
      name: "Michael Chen", 
      role: "Visa Specialist",
      specialization: "Student Visas",
      experience: "10+ years",
      description: "Immigration law expert helping thousands of students secure their UK student visas successfully.",
      avatar: "👨‍💼",
    },
    {
      name: "Emma Williams",
      role: "Career Advisor",
      specialization: "Post-Study Work",
      experience: "8+ years",
      description: "Career guidance specialist helping students transition from education to successful careers in the UK.",
      avatar: "👩‍💼",
    },
    {
      name: "Dr. James Brown",
      role: "Academic Advisor",
      specialization: "Research Programs",
      experience: "12+ years",
      description: "PhD supervisor and research consultant specializing in postgraduate and doctoral programs.",
      avatar: "👨‍🔬",
    },
  ];

  return (
    <section 
      className="py-20 bg-cover bg-center relative"
      style={{ backgroundImage: `url(${teamBackground})` }}
    >
      <div className="absolute inset-0 bg-primary/85"></div>
      
      <div className="relative z-10 container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
            Meet Our Expert Team
          </h2>
          <p className="text-xl text-white/90 max-w-3xl mx-auto">
            Our experienced counselors and advisors are here to guide you through 
            every step of your UK education journey.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembers.map((member, index) => (
            <Card 
              key={index}
              className="group hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-4 bg-white/95 backdrop-blur-sm"
            >
              <CardContent className="p-6 text-center">
                <div className="relative mb-6">
                  <div className="text-6xl mb-4 group-hover:scale-110 transition-transform duration-300">
                    {member.avatar}
                  </div>
                  <Badge 
                    variant="secondary" 
                    className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-primary text-white"
                  >
                    {member.experience}
                  </Badge>
                </div>
                
                <h3 className="font-bold text-xl mb-2 text-foreground">
                  {member.name}
                </h3>
                
                <p className="text-primary font-semibold mb-2">
                  {member.role}
                </p>
                
                <p className="text-sm text-muted-foreground mb-4">
                  Specializes in {member.specialization}
                </p>
                
                <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                  {member.description}
                </p>
                
                <div className="flex justify-center space-x-3">
                  <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center cursor-pointer hover:bg-primary-hover transition-colors">
                    <Linkedin className="w-4 h-4 text-white" />
                  </div>
                  <div className="w-8 h-8 bg-secondary rounded-full flex items-center justify-center cursor-pointer hover:bg-secondary-hover transition-colors">
                    <Mail className="w-4 h-4 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamSection;

server {
    listen 80;
    listen [::]:80;
    server_name uat.gatewayabroadeducations.com;

    return 301 https://uat.gatewayabroadeducations.com$request_uri;
}

# HTTPS for UAT Subdomain
server {
    listen 443 ssl;
    listen [::]:443 ssl;
    server_name uat.gatewayabroadeducations.com;
    root /var/www/html/web-app;

    ssl_certificate /etc/letsencrypt/live/uat.gatewayabroadeducations.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/uat.gatewayabroadeducations.com/privkey.pem;
    include /etc/letsencrypt/options-ssl-nginx.conf;
    ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem;

    # Requests starting with /lp go to Next.js (localhost:3002)
    location  /lp {
        proxy_pass http://localhost:3002;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }

    # All other requests go to your main app (localhost:3001)
    location / {
      try_files $uri $uri/ /index.html;
      add_header Cache-Control "no-cache, no-store, must-revalidate";
      add_header Pragma "no-cache";
      add_header Expires 0;
    }

    # Caching for assets
    location /assets/ {
        add_header Cache-Control "public, max-age=31536000, immutable";  # Cache for one year
    }
    location /static/ {
        add_header Cache-Control "public, max-age=31536000, immutable";  # Cache for one year
    }

    location /api {
        proxy_pass http://localhost:3001;
    }

     location /uploads {
        proxy_pass http://localhost:3001/uploads;
    }
}
# Redirect non-www to www and HTTP to HTTPS
server {
    listen 80;
    listen [::]:80;
    server_name gatewayabroadeducations.com www.gatewayabroadeducations.com;

    # Redirect all HTTP requests to HTTPS
    return 301 https://www.gatewayabroadeducations.com$request_uri;
}

server {
    listen 443 ssl;
    listen [::]:443 ssl;
    server_name gatewayabroadeducations.com www.gatewayabroadeducations.com;
    root /var/www/html/build;

    index index.html;

    ssl_certificate /etc/letsencrypt/live/gatewayabroadeducations.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/gatewayabroadeducations.com/privkey.pem;
    include /etc/letsencrypt/options-ssl-nginx.conf;
    ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem;

    # Redirect non-www to www on HTTPS
    if ($host = gatewayabroadeducations.com) {
        return 301 https://www.gatewayabroadeducations.com$request_uri;
    }
    
    location  /lp {
        proxy_pass http://localhost:3030;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
    # Main site configuration for www.gatewayabroadeducations.com
    location / {
      try_files $uri $uri/ /index.html;
      add_header Cache-Control "no-cache, no-store, must-revalidate";
      add_header Pragma "no-cache";
      add_header Expires 0;
    }

    # Caching for assets
    location /assets/ {
        add_header Cache-Control "public, max-age=31536000, immutable";  # Cache for one year
    }
    location /static/ {
        add_header Cache-Control "public, max-age=31536000, immutable";  # Cache for one year
    }

    location /api {
        proxy_pass http://localhost:3001;
    }

    location /uploads {
        proxy_pass http://localhost:3001/uploads;
    }
}
