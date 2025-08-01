"use client"
import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import { ThemeToggle } from "./theme-toggle"
import {
  ChevronDown,
  GraduationCap,
  FileText,
  Languages,
  Award,
  User,
  Settings,
  LayoutDashboard,
  LogOut,
  Menu,
  X,
} from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import useAsync from "@/hooks/useAsync"
import PageServices from "@/services/PageServices"
import { constant } from "@/constant/index.constant"

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [openMenu, setOpenMenu] = useState(null) // 'studyAbroad', 'testPrep', 'userMenu'
  const [isScrolled, setIsScrolled] = useState(false)
  const studyAbroadRef = useRef(null)
  const testPrepRef = useRef(null)
  const userMenuRef = useRef(null)

  const { data: course } = useAsync(PageServices.getCourse)
  const [CourseData, setCourseData] = useState([])

  // Mock user data
  const user = {
    name: "Prakash Jangid",
    email: "Prakash@example.com",
    avatar: "/placeholder-user.jpg",
    isLoggedIn: true,
  }

  useEffect(() => {
    if (course?.data?.page) {
      setCourseData(course.data.page)
    }
  }, [course])

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Close dropdowns on outside click
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        studyAbroadRef.current &&
        !studyAbroadRef.current.contains(event.target)
      ) {
        setOpenMenu((prev) => (prev === "studyAbroad" ? null : prev))
      }
      if (testPrepRef.current && !testPrepRef.current.contains(event.target)) {
        setOpenMenu((prev) => (prev === "testPrep" ? null : prev))
      }
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setOpenMenu((prev) => (prev === "userMenu" ? null : prev))
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)
  const handleClick = (menuName) => {
    setOpenMenu(openMenu === menuName ? null : menuName)
  }

  return (
    <header
      className={`fixed w-full top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled || isMenuOpen
        ? "bg-white/95 dark:bg-slate-900/95 backdrop-blur-md shadow-lg md:py-[2.7rem] sm:py-2 py-2"
        : "header-gradient dark:bg-slate-900/20 backdrop-blur-sm py-3 sm:py-2"
        }`}
    >
      <div className="mx-auto px-2 lg:p-0 sm:px-4 container-sm">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3 group flex-shrink-0">
            <Image
              src="/images/logo.svg"
              alt="Company Logo"
              width={200}
              height={40}
              className="w-auto h-12 sm:h-14 transition-all duration-300 group-hover:scale-105"
              priority
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-4 xl:space-x-6">
            <Link
              href="/"
              className="flex items-center text-gray-700 dark:text-gray-300 hover:text-[#E83A3A] dark:hover:text-[#FF6B6B] font-medium transition-all duration-300 group text-sm xl:text-base"
            >
              Home
            </Link>
            <Link
              href="/about"
              className="flex items-center text-gray-700 dark:text-gray-300 hover:text-[#E83A3A] dark:hover:text-[#FF6B6B] font-medium transition-all duration-300 group text-sm xl:text-base"
            >
              About Us
            </Link>
            <Link
              href="/spoken-english"
              className="flex items-center text-gray-700 dark:text-gray-300 hover:text-[#E83A3A] dark:hover:text-[#FF6B6B] font-medium transition-all duration-300 group text-sm xl:text-base"
            >
              Spoken English
            </Link>

            {/* Test Prep Dropdown */}
            <div
              className="relative"
              ref={testPrepRef}
              onMouseEnter={() => setOpenMenu("testPrep")}
              onMouseLeave={() => setOpenMenu(null)}
            >
              <button
                onClick={() => handleClick("testPrep")}
                className="flex items-center text-gray-700 dark:text-gray-300 hover:text-[#E83A3A] dark:hover:text-[#FF6B6B] font-medium transition-all duration-300 group text-sm xl:text-base"
              >
                Test Preparation
                <ChevronDown
                  className={`ml-1 h-4 w-4 transition-transform duration-300 ${openMenu === "testPrep" ? "rotate-180" : ""
                    }`}
                />
              </button>
              <AnimatePresence>
                {openMenu === "testPrep" && (
                  <motion.div
                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                    transition={{ type: "spring", stiffness: 300, damping: 25 }}
                    className="absolute top-full left-0 mt-2 w-[600px] bg-gradient-to-br from-[#f8f9fa] via-[#f1f3f5] to-[#e9ecef] dark:from-[#1a1a2e] dark:via-[#16213e] dark:to-[#0f3460] rounded-xl shadow-2xl py-6 px-6 z-50 border border-gray-100 dark:border-gray-700"
                  >
                    <div className="grid grid-cols-2 gap-2">
                      {CourseData.map((course, index) => (
                        <Link
                          key={index}
                          href={`/course/${course.pageName.toLowerCase()}`}
                          className="flex items-center space-x-2 p-3 rounded-lg bg-white dark:bg-slate-800 shadow-lg transition-all duration-300 hover:scale-[1.02] hover:shadow-xl hover:bg-gradient-to-r hover:from-blue-50 hover:to-green-50 dark:hover:from-slate-700 dark:hover:to-slate-600"
                        >
                          <Image
                            alt="course logo"
                            src={`${constant.REACT_APP_URL}/uploads/${course.image}`}
                            width={60}
                            height={0}
                            className="rounded-full border-2 border-gray-200 dark:border-gray-600"
                          />
                          <div className="my-auto">
                            <h3 className="text-sm font-bold text-gray-600 p-0 m-0 dark:text-white">
                              {course.pageName}
                            </h3>
                            <p className="text-xs m-0 p-0 text-gray-600 dark:text-gray-400">
                              {course.textFild}
                            </p>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <Link
              href="/blog"
              className="flex items-center text-gray-700 dark:text-gray-300 hover:text-[#E83A3A] dark:hover:text-[#FF6B6B] font-medium transition-all duration-300 group text-sm xl:text-base"
            >
              Blogs
            </Link>
            <Link
              href="/career"
              className="flex items-center text-gray-700 dark:text-gray-300 hover:text-[#E83A3A] dark:hover:text-[#FF6B6B] font-medium transition-all duration-300 group text-sm xl:text-base"
            >
              Career
            </Link>
            <Link
              href="/contact"
              className="flex items-center text-gray-700 dark:text-gray-300 hover:text-[#E83A3A] dark:hover:text-[#FF6B6B] font-medium transition-all duration-300 group text-sm xl:text-base"
            >
              Contact Us
            </Link>
          </nav>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            {user.isLoggedIn ? (
              <div
                className="relative"
                ref={userMenuRef}
                onMouseEnter={() => setOpenMenu("userMenu")}
                onMouseLeave={() => setOpenMenu(null)}
              >
                <button
                  onClick={() => handleClick("userMenu")}
                  className="flex items-center space-x-2 p-1 rounded-full hover:bg-red-50 dark:hover:bg-slate-800 transition-all duration-300 group"
                >
                  <Image
                    src="/placeholder-user.jpg"
                    alt={user.name}
                    width={36}
                    height={36}
                    className="rounded-full border-2 border-gray-200 dark:border-gray-700 group-hover:border-[#E83A3A] dark:group-hover:border-[#FF6B6B] transition-all duration-300"
                  />
                  <ChevronDown
                    className={`hidden lg:block h-4 w-4 text-gray-700 dark:text-gray-300 transition-transform duration-300 ${openMenu === "userMenu" ? "rotate-180" : ""
                      }`}
                  />
                </button>
                <AnimatePresence>
                  {openMenu === "userMenu" && (
                    <motion.div
                      initial={{ opacity: 0, y: -10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -10, scale: 0.95 }}
                      transition={{ type: "spring", stiffness: 300, damping: 25 }}
                      className="absolute top-full right-0 mt-2 w-64 bg-white dark:bg-slate-800 rounded-xl shadow-xl py-2 z-50 border border-gray-100 dark:border-gray-700"
                    >
                      <div className="px-3 py-3 border-b border-gray-100 dark:border-gray-700">
                        <div className="flex items-center space-x-3">
                          <Image
                            src={user.avatar || "/placeholder.svg"}
                            alt={user.name}
                            width={48}
                            height={48}
                            className="rounded-full border-2 border-gray-200 dark:border-gray-600"
                          />
                          <div>
                            <p className="font-semibold text-gray-900 dark:text-white m-0 p-0">{user.name}</p>
                            <p className="text-sm text-gray-600 dark:text-gray-400 m-0 p-0">{user.email}</p>
                          </div>
                        </div>
                      </div>
                      <div className="py-2">
                        <Link
                          href="/profile"
                          className="flex items-center space-x-3 px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-red-50 dark:hover:bg-slate-700 hover:text-[#E83A3A] dark:hover:text-[#FF6B6B] transition-all duration-300"
                          onClick={() => setOpenMenu(null)}
                        >
                          <User className="h-5 w-5" />
                          <span>My Profile</span>
                        </Link>
                        <Link
                          href="/dashboard"
                          className="flex items-center space-x-3 px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-red-50 dark:hover:bg-slate-700 hover:text-[#E83A3A] dark:hover:text-[#FF6B6B] transition-all duration-300"
                          onClick={() => setOpenMenu(null)}
                        >
                          <LayoutDashboard className="h-5 w-5" />
                          <span>Dashboard</span>
                        </Link>
                        <Link
                          href="/settings"
                          className="flex items-center space-x-3 px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-red-50 dark:hover:bg-slate-700 hover:text-[#E83A3A] dark:hover:text-[#FF6B6B] transition-all duration-300"
                          onClick={() => setOpenMenu(null)}
                        >
                          <Settings className="h-5 w-5" />
                          <span>Settings</span>
                        </Link>
                        <div className="border-t border-gray-100 dark:border-gray-700 my-2"></div>

                        <button
                          className="flex items-center space-x-3 px-4 py-2 w-full text-left text-[#E83A3A] dark:text-[#FF6B6B] hover:bg-red-50 dark:hover:bg-slate-700 transition-all duration-300"
                          onClick={() => {
                            setOpenMenu(null)
                            console.log("Logout clicked")
                          }}
                        >
                          <LogOut className="h-5 w-5" />
                          <span>Logout</span>
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <Link
                href="/login"
                className="hidden lg:flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-[#E83A3A] to-[#FF6B6B] text-white rounded-lg hover:from-[#D12F2F] hover:to-[#E83A3A] transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-[1.02] text-sm xl:text-base"
              >
                <User className="h-4 w-4" />
                <span>Login</span>
              </Link>
            )}

            {/* Mobile Menu Button (Animated Hamburger) */}
            <button
              onClick={toggleMenu}
              className="lg:hidden p-2 rounded-md bg-transparent hover:bg-red-50 dark:hover:bg-slate-800 focus:outline-none transition-all duration-300"
              aria-label="Toggle menu"
            >
              <div className="relative w-6 h-6 flex items-center justify-center">
                {/* Top Bar */}
                <span
                  className={`absolute h-0.5 w-6 bg-current rounded-full transition-all duration-300 ${isMenuOpen ? "rotate-45" : "-translate-y-2"
                    }`}
                ></span>

                {/* Middle Bar */}
                <span
                  className={`absolute h-0.5 w-6 bg-current rounded-full transition-all duration-300 ${isMenuOpen ? "opacity-0" : "opacity-100"
                    }`}
                ></span>

                {/* Bottom Bar */}
                <span
                  className={`absolute h-0.5 w-6 bg-current rounded-full transition-all duration-300 ${isMenuOpen ? "-rotate-45" : "translate-y-2"
                    }`}
                ></span>
              </div>
            </button>

          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`lg:hidden transition-all duration-500 overflow-y-auto ${isMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0 pointer-events-none"
            }`}
          style={{
            maxHeight: isMenuOpen ? "calc(100vh - 80px)" : "0",
          }}
        >
          <style jsx>{`
            /* Hide scrollbar but keep scrollable */
            div::-webkit-scrollbar {
              display: none;
            }
            div {
              -ms-overflow-style: none;
              scrollbar-width: none;
            }
          `}</style>

          <nav className="py-4 mt-2 border-t border-gray-100 dark:border-gray-700">
            {/* Mobile User Info */}
            {user.isLoggedIn && (
              <div className="mb-2 px-2">
                <div className="flex items-center space-x-3 px-3 py-2 bg-gradient-to-r from-red-50 to-pink-50 dark:from-slate-800 dark:to-slate-700 rounded-lg">
                  <Image
                    src={user.avatar || "/placeholder.svg"}
                    alt={user.name}
                    width={40}
                    height={40}
                    className="rounded-full border-2 border-[#E83A3A] dark:border-[#FF6B6B]"
                  />
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-white m-0 p-1">{user.name}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400 m-0 p-1">{user.email}</p>
                  </div>
                </div>
              </div>
            )}

            <div className="flex flex-col space-y-1 px-2">
              <Link
                href="/"
                className="flex items-center space-x-3 text-gray-700 dark:text-gray-300 hover:text-[#E83A3A] dark:hover:text-[#FF6B6B] font-medium transition-all duration-300 p-3 rounded-lg hover:bg-red-50 dark:hover:bg-slate-800"
                onClick={() => setIsMenuOpen(false)}
              >
                <GraduationCap className="h-5 w-5" />
                <span>Home</span>
              </Link>
              <Link
                href="/about"
                className="flex items-center space-x-3 text-gray-700 dark:text-gray-300 hover:text-[#E83A3A] dark:hover:text-[#FF6B6B] font-medium transition-all duration-300 p-3 rounded-lg hover:bg-red-50 dark:hover:bg-slate-800"
                onClick={() => setIsMenuOpen(false)}
              >
                <User className="h-5 w-5" />
                <span>About Us</span>
              </Link>
              <Link
                href="/spoken-english"
                className="flex items-center space-x-3 text-gray-700 dark:text-gray-300 hover:text-[#E83A3A] dark:hover:text-[#FF6B6B] font-medium transition-all duration-300 p-3 rounded-lg hover:bg-red-50 dark:hover:bg-slate-800"
                onClick={() => setIsMenuOpen(false)}
              >
                <Languages className="h-5 w-5" />
                <span>Spoken English</span>
              </Link>

              {/* Test Prep Mobile Dropdown */}
              <div className="relative">
                <button
                  onClick={() => handleClick("testPrepMobile")}
                  className="flex items-center justify-between w-full space-x-3 text-gray-700 dark:text-gray-300 hover:text-[#E83A3A] dark:hover:text-[#FF6B6B] font-medium transition-all duration-300 p-3 rounded-lg hover:bg-red-50 dark:hover:bg-slate-800"
                >
                  <div className="flex items-center space-x-3">
                    <FileText className="h-5 w-5" />
                    <span>Test Preparation</span>
                  </div>
                  <ChevronDown
                    className={`h-4 w-4 transition-transform duration-300 ${openMenu === "testPrepMobile" ? "rotate-180" : ""
                      }`}
                  />
                </button>
                <AnimatePresence>
                  {openMenu === "testPrepMobile" && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden pl-8"
                    >
                      <div className="space-y-1 py-2">
                        {CourseData.map((course, index) => (
                          <Link
                            key={index}
                            href={`/course/${course.pageName.toLowerCase()}`}
                            className="block text-sm text-gray-600 dark:text-gray-400 hover:text-[#E83A3A] dark:hover:text-[#FF6B6B] transition-colors flex items-center space-x-2 p-2 rounded-lg hover:bg-red-50 dark:hover:bg-slate-800"
                            onClick={() => {
                              setIsMenuOpen(false)
                              setOpenMenu(null)
                            }}
                          >
                            <FileText className="h-4 w-4" />
                            <span>{course.pageName}</span>
                          </Link>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <Link
                href="/blog"
                className="flex items-center space-x-3 text-gray-700 dark:text-gray-300 hover:text-[#E83A3A] dark:hover:text-[#FF6B6B] font-medium transition-all duration-300 p-3 rounded-lg hover:bg-red-50 dark:hover:bg-slate-800"
                onClick={() => setIsMenuOpen(false)}
              >
                <FileText className="h-5 w-5" />
                <span>Blogs</span>
              </Link>
              <Link
                href="/career"
                className="flex items-center space-x-3 text-gray-700 dark:text-gray-300 hover:text-[#E83A3A] dark:hover:text-[#FF6B6B] font-medium transition-all duration-300 p-3 rounded-lg hover:bg-red-50 dark:hover:bg-slate-800"
                onClick={() => setIsMenuOpen(false)}
              >
                <Award className="h-5 w-5" />
                <span>Career</span>
              </Link>
              <Link
                href="/contact"
                className="flex items-center space-x-3 text-gray-700 dark:text-gray-300 hover:text-[#E83A3A] dark:hover:text-[#FF6B6B] font-medium transition-all duration-300 p-3 rounded-lg hover:bg-red-50 dark:hover:bg-slate-800"
                onClick={() => setIsMenuOpen(false)}
              >
                <User className="h-5 w-5" />
                <span>Contact Us</span>
              </Link>

              {/* User Menu Items for Mobile */}
              {user.isLoggedIn && (
                <>
                  <div className="border-t border-gray-200 dark:border-gray-700 my-2"></div>
                  <Link
                    href="/profile"
                    className="flex items-center space-x-3 text-gray-700 dark:text-gray-300 hover:text-[#E83A3A] dark:hover:text-[#FF6B6B] font-medium transition-all duration-300 p-2 rounded-lg hover:bg-red-50 dark:hover:bg-slate-800"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <User className="h-5 w-5" />
                    <span>My Profile</span>
                  </Link>
                  <Link
                    href="/dashboard"
                    className="flex items-center space-x-3 text-gray-700 dark:text-gray-300 hover:text-[#E83A3A] dark:hover:text-[#FF6B6B] font-medium transition-all duration-300 p-3 rounded-lg hover:bg-red-50 dark:hover:bg-slate-800"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <LayoutDashboard className="h-5 w-5" />
                    <span>Dashboard</span>
                  </Link>
                  <Link
                    href="/settings"
                    className="flex items-center space-x-3 text-gray-700 dark:text-gray-300 hover:text-[#E83A3A] dark:hover:text-[#FF6B6B] font-medium transition-all duration-300 p-3 rounded-lg hover:bg-red-50 dark:hover:bg-slate-800"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <Settings className="h-5 w-5" />
                    <span>Settings</span>
                  </Link>
                  <div className="border-t border-gray-200 dark:border-gray-700 my-2"></div>
                  <button
                    className="flex items-center space-x-3 text-red-600 dark:text-red-400 font-medium transition-all duration-300 p-3 rounded-lg hover:bg-red-50 dark:hover:bg-slate-800 w-full text-left"
                    onClick={() => {
                      setIsMenuOpen(false)
                      console.log("Logout clicked")
                    }}
                  >
                    <LogOut className="h-5 w-5" />
                    <span>Logout</span>
                  </button>
                </>
              )}

              {/* Mobile Login Button */}
              {!user.isLoggedIn && (
                <Link
                  href="/login"
                  className="flex items-center justify-center space-x-2 mt-2 px-4 py-3 bg-gradient-to-r from-[#E83A3A] to-[#FF6B6B] text-white rounded-lg hover:from-[#D12F2F] hover:to-[#E83A3A] transition-all duration-300 shadow-md hover:shadow-lg"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <User className="h-5 w-5" />
                  <span>Login</span>
                </Link>
              )}
            </div>
          </nav>
        </div>
      </div>
    </header>
  )
}

export default Header