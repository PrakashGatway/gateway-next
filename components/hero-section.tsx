import Image from "next/image"
import Link from "next/link"

const HeroSection = ({type ,title,description,image}:any) => {
  return (
    <section className="hero-gradient min-h-screen pt-6 flex items-center relative overflow-hidden">
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
              <h1 className="text-3xl lg:text-[2.6rem] font-bold leading-tight">
                <span className="inline-block">{title?.split(';')[0]}</span>
                <br />
              { type != "about" &&<> <span className="text-gradient py-2 inline-block">
                  {title?.split(';')?.slice(1, title?.split(';')?.length)?.join(" ")}
                </span>
                <br /> </>}
              </h1>
            </div>

            <div className="">
              <div className="text-gray-600 text-base leading-relaxed max-w-2xl" dangerouslySetInnerHTML={{__html :description}}></div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 animate-stagger-4">
              <Link href="/contact" className="btn-primary inline-block text-center group">
                <span className="relative z-10">Get Started Today</span>
              </Link>
              <Link href="/about" className="btn-secondary text-center group">
                Learn More
              </Link>
            </div>

            {/* Stats with animation */}
            {/* <div className="grid grid-cols-3 gap-6 pt-8 animate-fadeInUp animate-stagger-5">
              <div className="text-center group">
                <div className="text-2xl lg:text-3xl font-bold text-gradient group-hover:scale-110 transition-transform duration-300">
                  500+
                </div>
                <p className="text-gray-600 text-sm">Students Placed</p>
              </div>
              <div className="text-center group">
                <div className="text-2xl lg:text-3xl font-bold text-gradient group-hover:scale-110 transition-transform duration-300">
                  15+
                </div>
                <p className="text-gray-600 text-sm">Countries</p>
              </div>
              <div className="text-center group">
                <div className="text-2xl lg:text-3xl font-bold text-gradient group-hover:scale-110 transition-transform duration-300">
                  98%
                </div>
                <p className="text-gray-600 text-sm">Success Rate</p>
              </div>
            </div> */}
          </div>

          {/* Right Illustration with floating animation */}
          <div className="relative animate-fadeInRight mx-auto">
            <div className="relative z-10 animate-float mx-auto">
              <Image
                src={image}
                alt="Study Abroad Illustration"
                width={type == "about" ? 490 :430}
                height={470}
                className="drop-shadow-2xl"
                priority
              />
            </div>

            {/* Background circle with pulse animation */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-white bg-opacity-30 rounded-full animate-pulse-slow -z-10"></div>

            {/* Additional decorative elements */}
            <div className="absolute -top-4 -right-4 w-8 h-8 bg-gradient-to-r from-red-500 to-pink-500 rounded-full animate-bounce-slow"></div>
            <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full animate-pulse-slow"></div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-gray-400 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  )
}

export default HeroSection
