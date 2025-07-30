"use client"
import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import { ThemeToggle } from "./theme-toggle"
import {
  ChevronDown,
  ChevronRight,
  GraduationCap,
  FileText,
  Languages,
  Wrench,
  BookOpen,
  Tag,
  Calendar,
  University,
  Award,
  User,
  Settings,
  LayoutDashboard,
  LogOut,
  Bell,
  Search,
  Menu,
  X,
} from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [openMenu, setOpenMenu] = useState(null) // 'studyAbroad', 'testPrep', 'userMenu'
  const [isScrolled, setIsScrolled] = useState(false)
  const [notifications, setNotifications] = useState(3)
  const studyAbroadRef = useRef(null)
  const testPrepRef = useRef(null)
  const userMenuRef = useRef(null)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Close dropdowns if clicked outside
  useEffect(() => {
    function handleClickOutside(event: any) {
      if (studyAbroadRef.current && !studyAbroadRef.current.contains(event.target)) {
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

  // --- Updated handleMouseEnter ---
  const handleMouseEnter = (menuName: any) => {
    if (window.dropdownCloseTimeout) {
      clearTimeout(window.dropdownCloseTimeout);
      window.dropdownCloseTimeout = null;
    }
    setOpenMenu(menuName); // Open the menu associated with this trigger
  };

  // --- Updated handleMouseLeave (for the trigger element) ---
  const handleTriggerMouseLeave = () => {
    // Set a timeout to close the menu, but allow time to move to the dropdown content
    if (window.dropdownCloseTimeout) {
      clearTimeout(window.dropdownCloseTimeout); // Clear any existing timeout
    }
    window.dropdownCloseTimeout = setTimeout(() => {
      setOpenMenu(null); // Close the menu
      window.dropdownCloseTimeout = null; // Clear the reference
    }, 400); // 300ms delay before closing
  };

  // --- New handler for dropdown content mouse leave ---
  const handleDropdownMouseLeave = () => {
    // Set a timeout to close the menu when leaving the dropdown content
    if (window.dropdownCloseTimeout) {
      clearTimeout(window.dropdownCloseTimeout); // Clear any existing timeout
    }
    window.dropdownCloseTimeout = setTimeout(() => {
      setOpenMenu(null); // Close the menu
      window.dropdownCloseTimeout = null; // Clear the reference
    }, 300); // 300ms delay before closing
  };

  const handleClick = (menuName: any) => {
    setOpenMenu(openMenu === menuName ? null : menuName)
  }

  // Mock user data
  const user = {
    name: "Prakash Jangid",
    email: "Prakash@example.com",
    avatar: "/placeholder-user.jpg",
    isLoggedIn: true,
  }

  return (
    <header
      className={`fixed px-2 top-0 left-0 right-0 z-50 transition-all duration-500 ${(isScrolled || isMenuOpen)
          ? "bg-white/95 dark:bg-slate-900/95 backdrop-blur-md shadow-lg py-3"
          : `bg-white/10 dark:bg-slate-900/90 backdrop-blur-sm py-4`
        }`}
    >
      <div className="mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3 group">
            <Image
              src="/images/logo.svg"
              alt="Company Logo"
              width={280}
              height={48}
              className="transition-all duration-300 group-hover:scale-105"
            />
          </Link>
          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-6">
            <Link
              href="/"
              className="flex items-center text-gray-700 dark:text-gray-300 hover:text-[#E83A3A] dark:hover:text-[#FF6B6B] font-medium transition-all duration-300 group"
            >
              Home
            </Link>
            <Link
              href="/about"
              className="flex items-center text-gray-700 dark:text-gray-300 hover:text-[#E83A3A] dark:hover:text-[#FF6B6B] font-medium transition-all duration-300 group"
            >
              About Us
            </Link>
            {/* Study Abroad Dropdown */}
            {/* <div
              className="relative"
              ref={studyAbroadRef}
              onMouseEnter={() => handleMouseEnter("studyAbroad")} // Use updated handler
              onMouseLeave={handleTriggerMouseLeave} // Use specific handler for trigger leave
            >
              <button
                onClick={() => handleClick("studyAbroad")}
                className="flex items-center text-gray-700 dark:text-gray-300 hover:text-[#E83A3A] dark:hover:text-[#FF6B6B] font-medium transition-all duration-300 group"
              >
                Study Abroad
                <ChevronDown
                  className={`ml-1 h-4 w-4 transition-transform duration-300 ${
                    openMenu === "studyAbroad" ? "rotate-180" : ""
                  }`}
                />
              </button>
              <AnimatePresence>
                {openMenu === "studyAbroad" && (
                  // Use motion.div for animation
                  <motion.div
                    key="studyAbroadDropdown" // Unique key for AnimatePresence
                    initial={{ opacity: 0, y: -10, scale: 0.95 }} // Start state (slightly above, faded, smaller)
                    animate={{ opacity: 1, y: 0, scale: 1 }}     // Animate to (visible, in place, full size)
                    exit={{ opacity: 0, y: -10, scale: 0.95 }}   // Exit state (fade out, move up slightly, shrink)
                    transition={{
                      type: "spring", // Use spring for a natural pop effect
                      stiffness: 300, // Adjust stiffness for more/less pop
                      damping: 25,    // Adjust damping for more/less bounce
                    }}
                    // Removed Tailwind animate-in classes and onMouseEnter
                    onMouseLeave={handleDropdownMouseLeave} // Use specific handler for dropdown leave
                    className="absolute top-full left-0 mt-2 w-[500px] bg-gradient-to-br from-[#f8f9fa] via-[#f1f3f5] to-[#e9ecef] dark:from-[#1a1a2e] dark:via-[#16213e] dark:to-[#0f3460] rounded-xl shadow-2xl py-6 px-6 z-50 border border-gray-100 dark:border-gray-700"
                  >
                    <div className="grid grid-cols-2 gap-4">
                      <Link
                        href="/study-abroad/united-kingdom"
                        className="group flex items-center space-x-3 p-4 rounded-lg bg-white dark:bg-slate-800 shadow-md transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 dark:hover:from-slate-700 dark:hover:to-slate-600"
                      >
                        <Image
                          src={ukFlag || "/placeholder.svg"}
                          alt="United Kingdom Flag"
                          width={32}
                          height={32}
                          className="rounded-full border border-gray-200 dark:border-gray-700"
                        />
                        <div>
                          <h3 className="text-sm font-bold text-gray-800 dark:text-white">United Kingdom</h3>
                          <p className="text-xs text-gray-600 dark:text-gray-400">160+ Universities</p>
                        </div>
                      </Link>
                      <Link
                        href="/study-abroad/canada"
                        className="group flex items-center space-x-3 p-4 rounded-lg bg-white dark:bg-slate-800 shadow-md transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 dark:hover:from-slate-700 dark:hover:to-slate-600"
                      >
                        <Image
                          src={caFlag || "/placeholder.svg"}
                          alt="Canada Flag"
                          width={32}
                          height={32}
                          className="rounded-full border border-gray-200 dark:border-gray-700"
                        />
                        <div>
                          <h3 className="text-sm font-bold text-gray-800 dark:text-white">Canada</h3>
                          <p className="text-xs text-gray-600 dark:text-gray-400">120+ Universities</p>
                        </div>
                      </Link>
                      <Link
                        href="/study-abroad/usa"
                        className="group flex items-center space-x-3 p-4 rounded-lg bg-white dark:bg-slate-800 shadow-md transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 dark:hover:from-slate-700 dark:hover:to-slate-600"
                      >
                        <University className="h-8 w-8 text-blue-500 dark:text-blue-400" />
                        <div>
                          <h3 className="text-sm font-bold text-gray-800 dark:text-white">USA</h3>
                          <p className="text-xs text-gray-600 dark:text-gray-400">200+ Universities</p>
                        </div>
                      </Link>
                      <Link
                        href="/study-abroad/australia"
                        className="group flex items-center space-x-3 p-4 rounded-lg bg-white dark:bg-slate-800 shadow-md transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 dark:hover:from-slate-700 dark:hover:to-slate-600"
                      >
                        <University className="h-8 w-8 text-green-500 dark:text-green-400" />
                        <div>
                          <h3 className="text-sm font-bold text-gray-800 dark:text-white">Australia</h3>
                          <p className="text-xs text-gray-600 dark:text-gray-400">100+ Universities</p>
                        </div>
                      </Link>
                    </div>
                     <div className="mt-6">
                      <Link
                        href="/scholarships"
                        className="flex items-center justify-center space-x-2 px-6 py-3 rounded-lg bg-gradient-to-r from-[#E83A3A] to-[#FF6B6B] text-white hover:from-[#D12F2F] hover:to-[#E83A3A] transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-[1.02]"
                      >
                        <Award className="h-5 w-5" />
                        <span className="font-medium">Claim Scholarship Now</span>
                        <ChevronRight className="h-4 w-4" />
                      </Link>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div> */}
            {/* Test Prep Dropdown */}
            <Link
              href="/spoken-english"
              className="flex items-center text-gray-700 dark:text-gray-300 hover:text-[#E83A3A] dark:hover:text-[#FF6B6B] font-medium transition-all duration-300 group"
            >
              Spoken English
            </Link>
            <div
              className="relative"
              ref={testPrepRef}
              onMouseEnter={() => handleMouseEnter("testPrep")} // Use updated handler
              onMouseLeave={handleTriggerMouseLeave} // Use specific handler for trigger leave
            >
              <button
                onClick={() => handleClick("testPrep")}
                className="flex items-center text-gray-700 dark:text-gray-300 hover:text-[#E83A3A] dark:hover:text-[#FF6B6B] font-medium transition-all duration-300 group"
              >
                Test Prep
                <ChevronDown
                  className={`ml-1 h-4 w-4 transition-transform duration-300 ${openMenu === "testPrep" ? "rotate-180" : ""
                    }`}
                />
              </button>
              {/* Wrap dropdowns in AnimatePresence for exit animations */}
              <AnimatePresence>
                {openMenu === "testPrep" && (
                  // Use motion.div for animation
                  <motion.div
                    key="testPrepDropdown" // Unique key
                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                    transition={{
                      type: "spring",
                      stiffness: 300,
                      damping: 25,
                    }}
                    // Removed Tailwind animate-in classes and onMouseEnter
                    onMouseLeave={handleDropdownMouseLeave} // Use specific handler for dropdown leave
                    className="absolute top-full left-0 mt-2 w-[400px] bg-gradient-to-br from-[#f8f9fa] via-[#f1f3f5] to-[#e9ecef] dark:from-[#1a1a2e] dark:via-[#16213e] dark:to-[#0f3460] rounded-xl shadow-2xl py-6 px-6 z-50 border border-gray-100 dark:border-gray-700"
                  >
                    <div className="grid grid-cols-2 gap-4">
                      <Link
                        href="/test-preparation/ielts"
                        className="group flex items-center space-x-3 p-4 rounded-lg bg-white dark:bg-slate-800 shadow-md transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:bg-gradient-to-r hover:from-blue-50 hover:to-green-50 dark:hover:from-slate-700 dark:hover:to-slate-600"
                      >
                        <FileText className="h-8 w-8 text-blue-500 dark:text-blue-400" />
                        <div>
                          <h3 className="text-sm font-bold text-gray-800 dark:text-white">IELTS</h3>
                          <p className="text-xs text-gray-600 dark:text-gray-400">Comprehensive Prep</p>
                        </div>
                      </Link>
                      <Link
                        href="/test-preparation/toefl"
                        className="group flex items-center space-x-3 p-4 rounded-lg bg-white dark:bg-slate-800 shadow-md transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:bg-gradient-to-r hover:from-green-50 hover:to-blue-50 dark:hover:from-slate-700 dark:hover:to-slate-600"
                      >
                        <FileText className="h-8 w-8 text-green-500 dark:text-green-400" />
                        <div>
                          <h3 className="text-sm font-bold text-gray-800 dark:text-white">TOEFL</h3>
                          <p className="text-xs text-gray-600 dark:text-gray-400">Intensive Training</p>
                        </div>
                      </Link>
                      <Link
                        href="/test-preparation/pte"
                        className="group flex items-center space-x-3 p-4 rounded-lg bg-white dark:bg-slate-800 shadow-md transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:bg-gradient-to-r hover:from-purple-50 hover:to-pink-50 dark:hover:from-slate-700 dark:hover:to-slate-600"
                      >
                        <FileText className="h-8 w-8 text-purple-500 dark:text-purple-400" />
                        <div>
                          <h3 className="text-sm font-bold text-gray-800 dark:text-white">PTE</h3>
                          <p className="text-xs text-gray-600 dark:text-gray-400">Fast Results</p>
                        </div>
                      </Link>
                      <Link
                        href="/test-preparation/gmat"
                        className="group flex items-center space-x-3 p-4 rounded-lg bg-white dark:bg-slate-800 shadow-md transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:bg-gradient-to-r hover:from-red-50 hover:to-orange-50 dark:hover:from-slate-700 dark:hover:to-slate-600"
                      >
                        <FileText className="h-8 w-8 text-red-500 dark:text-red-400" />
                        <div>
                          <h3 className="text-sm font-bold text-gray-800 dark:text-white">GMAT</h3>
                          <p className="text-xs text-gray-600 dark:text-gray-400">Business School</p>
                        </div>
                      </Link>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            <Link
              href="/blog"
              className="flex items-center text-gray-700 dark:text-gray-300 hover:text-[#E83A3A] dark:hover:text-[#FF6B6B] font-medium transition-all duration-300 group"
            >
              Blogs
            </Link>
            <Link
              href="/career"
              className="flex items-center text-gray-700 dark:text-gray-300 hover:text-[#E83A3A] dark:hover:text-[#FF6B6B] font-medium transition-all duration-300 group"
            >
              Career
            </Link>
            <Link
              href="/contact-us"
              className="flex items-center text-gray-700 dark:text-gray-300 hover:text-[#E83A3A] dark:hover:text-[#FF6B6B] font-medium transition-all duration-300 group"
            >
              Contact Us
            </Link>
          </nav>
          <div className="flex items-center space-x-3">
            {user.isLoggedIn ? (
              <div
                className="relative"
                ref={userMenuRef}
                onMouseEnter={() => handleMouseEnter("userMenu")} // Use updated handler
                onMouseLeave={handleTriggerMouseLeave} // Use specific handler for trigger leave
              >
                <button
                  onClick={() => handleClick("userMenu")}
                  className="flex items-center space-x-2 p-1 rounded-full hover:bg-red-50 dark:hover:bg-slate-800 transition-all duration-300 group"
                >
                  <Image
                    src="/placeholder-user.jpg"
                    alt={user.name}
                    width={40}
                    height={40}
                    className="rounded-full border-2 border-gray-200 dark:border-gray-700 group-hover:border-[#E83A3A] dark:group-hover:border-[#FF6B6B] transition-all duration-300"
                  />
                  <ChevronDown
                    className={`hidden lg:block h-4 w-4 text-gray-700 dark:text-gray-300 transition-transform duration-300 ${openMenu === "userMenu" ? "rotate-180" : ""
                      }`}
                  />
                </button>
                {/* Wrap dropdowns in AnimatePresence for exit animations */}
                <AnimatePresence>
                  {openMenu === "userMenu" && (
                    // Use motion.div for animation
                    <motion.div
                      key="userMenuDropdown" // Unique key
                      initial={{ opacity: 0, y: -10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -10, scale: 0.95 }}
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 25,
                      }}
                      // Removed Tailwind animate-in classes and onMouseEnter
                      onMouseLeave={handleDropdownMouseLeave} // Use specific handler for dropdown leave
                      className="absolute top-full right-0 mt-2 w-64 bg-white dark:bg-slate-800 rounded-xl shadow-xl py-4 z-50 border border-gray-100 dark:border-gray-700"
                    >
                      {/* User Info */}
                      <div className="px-4 py-3 border-b border-gray-100 dark:border-gray-700">
                        <div className="flex items-center space-x-3">
                          <Image
                            src={user.avatar || "/placeholder.svg"}
                            alt={user.name}
                            width={48}
                            height={48}
                            className="rounded-full border-2 border-gray-200 dark:border-gray-600"
                          />
                          <div>
                            <p className="font-semibold text-gray-900 dark:text-white">{user.name}</p>
                            <p className="text-sm text-gray-600 dark:text-gray-400">{user.email}</p>
                          </div>
                        </div>
                      </div>
                      {/* Menu Items */}
                      <div className="py-2">
                        <Link
                          href="/profile"
                          className="flex items-center space-x-3 px-4 py-3 text-gray-700 dark:text-gray-300 hover:bg-red-50 dark:hover:bg-slate-700 hover:text-[#E83A3A] dark:hover:text-[#FF6B6B] transition-all duration-300"
                          onClick={() => setOpenMenu(null)}
                        >
                          <User className="h-5 w-5" />
                          <span>My Profile</span>
                        </Link>
                        <Link
                          href="/dashboard"
                          className="flex items-center space-x-3 px-4 py-3 text-gray-700 dark:text-gray-300 hover:bg-red-50 dark:hover:bg-slate-700 hover:text-[#E83A3A] dark:hover:text-[#FF6B6B] transition-all duration-300"
                          onClick={() => setOpenMenu(null)}
                        >
                          <LayoutDashboard className="h-5 w-5" />
                          <span>Dashboard</span>
                        </Link>
                        <Link
                          href="/settings"
                          className="flex items-center space-x-3 px-4 py-3 text-gray-700 dark:text-gray-300 hover:bg-red-50 dark:hover:bg-slate-700 hover:text-[#E83A3A] dark:hover:text-[#FF6B6B] transition-all duration-300"
                          onClick={() => setOpenMenu(null)}
                        >
                          <Settings className="h-5 w-5" />
                          <span>Settings</span>
                        </Link>
                        <div className="border-t border-gray-100 dark:border-gray-700 my-2"></div>
                        <button
                          className="flex items-center space-x-3 px-4 py-3 w-full text-left text-[#E83A3A] dark:text-[#FF6B6B] hover:bg-red-50 dark:hover:bg-slate-700 transition-all duration-300"
                          onClick={() => {
                            setOpenMenu(null)
                            // Handle logout logic here
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
                className="hidden lg:flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-[#E83A3A] to-[#FF6B6B] text-white rounded-lg hover:from-[#D12F2F] hover:to-[#E83A3A] transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-[1.02]"
              >
                <User className="h-4 w-4" />
                <span>Login</span>
              </Link>
            )}
            {/* Mobile menu button */}
            <div className="lg:hidden flex items-center space-x-2">
              {/* <ThemeToggle /> */}
              <button
                onClick={toggleMenu}
                className="p-2 rounded-md text-gray-700 dark:text-gray-300 hover:text-[#E83A3A] dark:hover:text-[#FF6B6B] transition-all duration-300 hover:bg-red-50 dark:hover:bg-slate-800"
                aria-label="Toggle menu"
              >
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>
        {/* Mobile Navigation - Added scrolling capability */}
        <div
          className={`lg:hidden transition-all duration-500 overflow-hidden ${isMenuOpen ? "max-h-screen opacity-100 pb-4" : "max-h-0 opacity-0"
            }`}
        >
          {/* Make the inner nav scrollable if content overflows */}
          <nav className="py-4 border-t border-gray-100 dark:border-gray-700 max-h-[70vh] overflow-y-auto">
            {/* Mobile User Info */}
            {user.isLoggedIn && (
              <div className="mb-4 px-2">
                <div className="flex items-center space-x-3 p-3 bg-gradient-to-r from-red-50 to-pink-50 dark:from-slate-800 dark:to-slate-700 rounded-lg">
                  <Image
                    src={user.avatar || "/placeholder.svg"}
                    alt={user.name}
                    width={40}
                    height={40}
                    className="rounded-full border-2 border-[#E83A3A] dark:border-[#FF6B6B]"
                  />
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-white">{user.name}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{user.email}</p>
                  </div>
                </div>
              </div>
            )}
            <div className="flex flex-col space-y-2 px-2">
              {/* User Menu Items for Mobile */}
              {user.isLoggedIn && (
                <>
                  <Link
                    href="/profile"
                    className="flex items-center space-x-3 text-gray-700 dark:text-gray-300 hover:text-[#E83A3A] dark:hover:text-[#FF6B6B] font-medium transition-all duration-300 hover:translate-x-2 p-2 rounded-lg hover:bg-red-50 dark:hover:bg-slate-800"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <User className="h-5 w-5" />
                    <span>My Profile</span>
                  </Link>
                  <Link
                    href="/dashboard"
                    className="flex items-center space-x-3 text-gray-700 dark:text-gray-300 hover:text-[#E83A3A] dark:hover:text-[#FF6B6B] font-medium transition-all duration-300 hover:translate-x-2 p-2 rounded-lg hover:bg-red-50 dark:hover:bg-slate-800"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <LayoutDashboard className="h-5 w-5" />
                    <span>Dashboard</span>
                  </Link>
                  <Link
                    href="/settings"
                    className="flex items-center space-x-3 text-gray-700 dark:text-gray-300 hover:text-[#E83A3A] dark:hover:text-[#FF6B6B] font-medium transition-all duration-300 hover:translate-x-2 p-2 rounded-lg hover:bg-red-50 dark:hover:bg-slate-800"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <Settings className="h-5 w-5" />
                    <span>Settings</span>
                  </Link>
                  <div className="border-t border-gray-200 dark:border-gray-700 my-2"></div>
                </>
              )}
              {/* Navigation Items */}
              <Link
                href="/"
                className="flex items-center space-x-3 text-gray-700 dark:text-gray-300 hover:text-[#E83A3A] dark:hover:text-[#FF6B6B] font-medium transition-all duration-300 hover:translate-x-2 p-2 rounded-lg hover:bg-red-50 dark:hover:bg-slate-800"
                onClick={() => setIsMenuOpen(false)}
              >
                <GraduationCap className="h-5 w-5" />
                <span>Home</span>
              </Link>
              {/* Study Abroad Mobile Dropdown */}
              {/* <details className="group">
                <summary className="flex items-center space-x-3 text-gray-700 dark:text-gray-300 hover:text-[#E83A3A] dark:hover:text-[#FF6B6B] font-medium transition-all duration-300 hover:translate-x-2 list-none cursor-pointer p-2 rounded-lg hover:bg-red-50 dark:hover:bg-slate-800">
                  <GraduationCap className="h-5 w-5" />
                  <span>Study Abroad</span>
                  <ChevronDown className="h-4 w-4 ml-auto transition-transform duration-300 group-open:rotate-180" />
                </summary>
                <div className="pl-8 pt-2 space-y-2">
                  <Link
                    href="/study-abroad/united-kingdom"
                    className="block text-sm text-gray-600 dark:text-gray-400 hover:text-[#E83A3A] dark:hover:text-[#FF6B6B] transition-colors flex items-center space-x-2 p-2 rounded-lg hover:bg-red-50 dark:hover:bg-slate-800"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <University className="h-4 w-4" />
                    <span>United Kingdom</span>
                  </Link>
                  <Link
                    href="/study-abroad/canada"
                    className="block text-sm text-gray-600 dark:text-gray-400 hover:text-[#E83A3A] dark:hover:text-[#FF6B6B] transition-colors flex items-center space-x-2 p-2 rounded-lg hover:bg-red-50 dark:hover:bg-slate-800"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <University className="h-4 w-4" />
                    <span>Canada</span>
                  </Link>
                  <Link
                    href="/study-abroad/usa"
                    className="block text-sm text-gray-600 dark:text-gray-400 hover:text-[#E83A3A] dark:hover:text-[#FF6B6B] transition-colors flex items-center space-x-2 p-2 rounded-lg hover:bg-red-50 dark:hover:bg-slate-800"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <University className="h-4 w-4" />
                    <span>USA</span>
                  </Link>
                  <Link
                    href="/study-abroad/australia"
                    className="block text-sm text-gray-600 dark:text-gray-400 hover:text-[#E83A3A] dark:hover:text-[#FF6B6B] transition-colors flex items-center space-x-2 p-2 rounded-lg hover:bg-red-50 dark:hover:bg-slate-800"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <University className="h-4 w-4" />
                    <span>Australia</span>
                  </Link>
                  <Link
                    href="/scholarships"
                    className="block text-sm text-[#E83A3A] dark:text-[#FF6B6B] hover:text-[#D12F2F] dark:hover:text-[#E83A3A] transition-colors font-medium flex items-center space-x-2 p-2 rounded-lg hover:bg-red-50 dark:hover:bg-slate-800"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <Award className="h-4 w-4" />
                    <span>Claim Scholarship</span>
                  </Link>
                </div>
              </details> */}
              {/* Test Prep Mobile Dropdown */}
              <details className="group">
                <summary className="flex items-center space-x-3 text-gray-700 dark:text-gray-300 hover:text-[#E83A3A] dark:hover:text-[#FF6B6B] font-medium transition-all duration-300 hover:translate-x-2 list-none cursor-pointer p-2 rounded-lg hover:bg-red-50 dark:hover:bg-slate-800">
                  <FileText className="h-5 w-5" />
                  <span>Test Prep</span>
                  <ChevronDown className="h-4 w-4 ml-auto transition-transform duration-300 group-open:rotate-180" />
                </summary>
                <div className="pl-8 pt-2 space-y-2">
                  <Link
                    href="/test-preparation/ielts"
                    className="block text-sm text-gray-600 dark:text-gray-400 hover:text-[#E83A3A] dark:hover:text-[#FF6B6B] transition-colors flex items-center space-x-2 p-2 rounded-lg hover:bg-red-50 dark:hover:bg-slate-800"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <FileText className="h-4 w-4" />
                    <span>IELTS</span>
                  </Link>
                  <Link
                    href="/test-preparation/toefl"
                    className="block text-sm text-gray-600 dark:text-gray-400 hover:text-[#E83A3A] dark:hover:text-[#FF6B6B] transition-colors flex items-center space-x-2 p-2 rounded-lg hover:bg-red-50 dark:hover:bg-slate-800"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <FileText className="h-4 w-4" />
                    <span>TOEFL</span>
                  </Link>
                  <Link
                    href="/test-preparation/pte"
                    className="block text-sm text-gray-600 dark:text-gray-400 hover:text-[#E83A3A] dark:hover:text-[#FF6B6B] transition-colors flex items-center space-x-2 p-2 rounded-lg hover:bg-red-50 dark:hover:bg-slate-800"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <FileText className="h-4 w-4" />
                    <span>PTE</span>
                  </Link>
                  <Link
                    href="/test-preparation/gmat"
                    className="block text-sm text-gray-600 dark:text-gray-400 hover:text-[#E83A3A] dark:hover:text-[#FF6B6B] transition-colors flex items-center space-x-2 p-2 rounded-lg hover:bg-red-50 dark:hover:bg-slate-800"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <FileText className="h-4 w-4" />
                    <span>GMAT</span>
                  </Link>
                </div>
              </details>
              <Link
                href="/spoken-english"
                className="flex items-center space-x-3 text-gray-700 dark:text-gray-300 hover:text-[#E83A3A] dark:hover:text-[#FF6B6B] font-medium transition-all duration-300 hover:translate-x-2 p-2 rounded-lg hover:bg-red-50 dark:hover:bg-slate-800"
                onClick={() => setIsMenuOpen(false)}
              >
                <Languages className="h-5 w-5" />
                <span>Spoken English</span>
              </Link>
              <Link
                href="/about"
                className="flex items-center space-x-3 text-gray-700 dark:text-gray-300 hover:text-[#E83A3A] dark:hover:text-[#FF6B6B] font-medium transition-all duration-300 hover:translate-x-2 p-2 rounded-lg hover:bg-red-50 dark:hover:bg-slate-800"
                onClick={() => setIsMenuOpen(false)}
              >
                <User className="h-5 w-5" />
                <span>About Us</span>
              </Link>
              {/* Mobile Logout */}
              {user.isLoggedIn && (
                <>
                  <div className="border-t border-gray-200 dark:border-gray-700 my-2"></div>
                  <button
                    className="flex items-center space-x-3 text-red-600 dark:text-red-400 font-medium transition-all duration-300 hover:translate-x-2 p-2 rounded-lg hover:bg-red-50 dark:hover:bg-slate-800 w-full text-left"
                    onClick={() => {
                      setIsMenuOpen(false)
                      // Handle logout logic here
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
                  className="flex items-center justify-center space-x-2 mt-4 px-4 py-3 bg-gradient-to-r from-red-500 to-pink-600 text-white rounded-lg hover:from-red-600 hover:to-pink-700 transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105"
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