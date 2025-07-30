import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { Calendar, User, ArrowRight } from "lucide-react"

export const metadata: Metadata = {
  title: "Blogs - Gateway Abroad Education | Study Abroad Tips & Guides",
  description:
    "Read our latest blogs about study abroad tips, university guides, visa information, and test preparation strategies.",
}

export default function BlogsPage() {
  const blogs = [
    {
      id: 1,
      title: "Complete Guide to IELTS Preparation: Tips and Strategies",
      excerpt:
        "Master the IELTS exam with our comprehensive guide covering all four sections: Reading, Writing, Listening, and Speaking.",
      author: "Dr. Priya Sharma",
      date: "2024-01-15",
      category: "Test Preparation",
      image: "/placeholder.svg?height=300&width=400",
    },
    {
      id: 2,
      title: "Top 10 Universities in Canada for International Students",
      excerpt:
        "Discover the best Canadian universities offering world-class education and excellent opportunities for international students.",
      author: "Rahul Gupta",
      date: "2024-01-12",
      category: "University Guide",
      image: "/placeholder.svg?height=300&width=400",
    },
    {
      id: 3,
      title: "Student Visa Application Process: A Step-by-Step Guide",
      excerpt:
        "Navigate the complex visa application process with our detailed guide covering documentation, interviews, and common mistakes to avoid.",
      author: "Sneha Patel",
      date: "2024-01-10",
      category: "Visa Guide",
      image: "/placeholder.svg?height=300&width=400",
    },
    {
      id: 4,
      title: "Scholarship Opportunities for Indian Students Abroad",
      excerpt:
        "Explore various scholarship programs available for Indian students planning to study in USA, UK, Canada, and Australia.",
      author: "Dr. Amit Kumar",
      date: "2024-01-08",
      category: "Scholarships",
      image: "/placeholder.svg?height=300&width=400",
    },
    {
      id: 5,
      title: "Cost of Living Guide: Studying in Australia",
      excerpt:
        "Plan your budget effectively with our comprehensive guide to living costs in major Australian cities for international students.",
      author: "Meera Singh",
      date: "2024-01-05",
      category: "Country Guide",
      image: "/placeholder.svg?height=300&width=400",
    },
    {
      id: 6,
      title: "TOEFL vs IELTS: Which Test Should You Choose?",
      excerpt:
        "Compare TOEFL and IELTS exams to determine which English proficiency test is best suited for your study abroad goals.",
      author: "Dr. Priya Sharma",
      date: "2024-01-03",
      category: "Test Preparation",
      image: "/placeholder.svg?height=300&width=400",
    },
  ]

  const categories = ["All", "Test Preparation", "University Guide", "Visa Guide", "Scholarships", "Country Guide"]

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="hero-gradient section-padding">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6">
              Study Abroad <span className="text-gradient">Blogs</span>
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              Stay updated with the latest tips, guides, and insights for your study abroad journey
            </p>
          </div>
        </div>
      </section>

      {/* Blog Categories */}
      <section className="py-8 bg-white border-b">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category, index) => (
              <button
                key={index}
                className={`px-6 py-2 rounded-full font-medium transition-colors ${
                  index === 0
                    ? "bg-red-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-red-100 hover:text-red-600"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="section-padding bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogs.map((blog) => (
              <article
                key={blog.id}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
              >
                <div className="relative h-48">
                  <Image src={blog.image || "/placeholder.svg"} alt={blog.title} fill className="object-cover" />
                  <div className="absolute top-4 left-4">
                    <span className="bg-red-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                      {blog.category}
                    </span>
                  </div>
                </div>

                <div className="p-6">
                  <h2 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">{blog.title}</h2>

                  <p className="text-gray-600 mb-4 line-clamp-3">{blog.excerpt}</p>

                  <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                    <div className="flex items-center space-x-2">
                      <User className="h-4 w-4" />
                      <span>{blog.author}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Calendar className="h-4 w-4" />
                      <span>{new Date(blog.date).toLocaleDateString()}</span>
                    </div>
                  </div>

                  <Link
                    href={`/blogs/${blog.id}`}
                    className="inline-flex items-center text-red-600 hover:text-red-700 font-medium"
                  >
                    Read More
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="section-padding bg-gradient-to-r from-red-600 to-pink-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Stay Updated</h2>
          <p className="text-xl mb-8 opacity-90">
            Subscribe to our newsletter for the latest study abroad tips and updates
          </p>
          <div className="max-w-md mx-auto flex gap-4">
            <input type="email" placeholder="Enter your email" className="flex-1 px-4 py-3 rounded-lg text-gray-900" />
            <button className="bg-white text-red-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
              Subscribe
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}
