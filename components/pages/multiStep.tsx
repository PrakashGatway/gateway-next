"use client"

import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { AnimatePresence, motion } from "framer-motion"
import { ChevronRight, ChevronLeft, Check, User, MapPin, Calendar, GraduationCap } from "lucide-react"
import Swal from 'sweetalert2'
import axiosInstance from "@/services/axiosInstance"
import { useRouter } from "next/navigation"

// UK-specific steps and options
const ukSteps = ["course_intake", "english_education", "details"]
const ukCourses = ["MBA", "MSc", "Business", "Nursing", "Engineering"]
const ukIntakes = ["Jan 2026", "May 2026", "Sept 2026", "Not sure"]
const ukEnglishTests = ["Yes (IELTS)", "Yes (PTE)", "Not yet", "Planning soon"]
const ukEducationLevels = ["12th Pass", "Graduate", "Postgraduate", "Other"]

// Default steps and options
const defaultSteps = ["course", "country", "intake_details", "details"]
const defaultCourses = ["MBA", "MSc", "Business", "Nursing", "Engineering"]
const defaultCountries = ["UK", "USA", "Canada", "Australia"]
const defaultIntakes = ["Jan 2026", "May 2026", "September", "Nov 2026"]

const stepIcons = [GraduationCap, MapPin, Calendar, User] // Adjusted for default steps

export default function EnhancedMultiStepForm() {
  const [step, setStep] = useState(0)
  const [stepDirection, setStepDirection] = useState<'forward' | 'backward' | null>(null); // Track direction
  const router = useRouter();
  const {
    register,
    handleSubmit,
    watch,
    trigger,
    formState: { errors },
    reset
  } = useForm({ mode: "onChange" })
  const [isUK, setIsUK] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const path = window.location.pathname.toLowerCase();
      setIsUK(path.includes("uk"));
    }
  }, []);

  // Get current steps based on isUK
  const currentSteps = isUK ? ukSteps : defaultSteps;

  // Watch form values for auto-advance
  const watchedCourse = watch("course");
  const watchedIntake = watch("intake");
  const watchedEnglish = watch("english");
  const watchedEducation = watch("education");
  const watchedCountry = watch("country");

  // Auto-advance for UK form when both questions are answered
  useEffect(() => {
    if (isUK && step === 0 && watchedCourse && watchedIntake && stepDirection === 'forward') {
      const timer = setTimeout(() => setStep(1), 500);
      return () => clearTimeout(timer);
    }
    if (isUK && step === 1 && watchedEnglish && watchedEducation && stepDirection === 'forward') {
      const timer = setTimeout(() => setStep(2), 500);
      return () => clearTimeout(timer);
    }
  }, [watchedCourse, watchedIntake, watchedEnglish, watchedEducation, step, isUK, stepDirection]);

  // Auto-advance for default form
  useEffect(() => {
    if (!isUK && step === 0 && watchedCourse && stepDirection === 'forward') {
      const timer = setTimeout(() => setStep(1), 500);
      return () => clearTimeout(timer);
    }
    if (!isUK && step === 1 && watchedCountry && stepDirection === 'forward') {
      const timer = setTimeout(() => setStep(2), 500);
      return () => clearTimeout(timer);
    }
  }, [watchedCourse, watchedCountry, step, isUK, stepDirection]);

  const onNext = async () => {
    setStepDirection('forward');
    const valid = await trigger()
    if (valid) setStep((prev) => prev + 1)
  }

  const onBack = () => {
    setStepDirection('backward');
    setStep((prev) => prev - 1)
  }

  const onSubmit = async (data: any) => {
    // Format data differently for UK form
    let formatData;
    if (isUK) {
      formatData = {
        name: data.name,
        email: data.email,
        phone: data.mobile,
        program: data.course,
        grade: null,
        city: data.city,
        perferedCountry: "UK", // Fixed for UK form
        study: data.intake,
        englishTest: data.english,
        educationLevel: data.education
      }
    } else {
      formatData = {
        name: data.name,
        email: data.email,
        phone: data.mobile,
        program: data.course,
        grade: null,
        city: data.city,
        perferedCountry: data.country,
        study: data.intake,
      }
    }

    let src = 'website' as any;

    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const from = params.get("src")
      if (from == 'facebook') {
        src = 'facebook';
      }
    }

    try {
      let res = await axiosInstance.post('/leads', {
        fullName: data.name,
        email: data.email,
        phone: data.mobile,
        source: src || "website",
        coursePreference: data.course,
        extraDetails: {
          city: data.city,
          preferredCountry: isUK ? "UK" : data.country,
          preferredIntake: data.intake,
          ...(isUK && {
            englishTest: data.english,
            educationLevel: data.education
          })
        }
      })
      if (res.data.success) {
        router.push('/thank-you');
        reset()
        setStep(0)
      } else {
        Swal.fire({
          title: "Error",
          text: "There was an error submitting the form. Please try again.",
          icon: "error"
        });
      }
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: "There was an error submitting the form. Please try again.",
        icon: "error"
      });
    }
  }

  return (
    <section id="multistepfrom" className="relative bg-white py-12 mx-[10px] overflow-hidden">
      <div className="relative z-10">
        <h3 className="sub-heading !text-black mx-auto font-semibold !text-center mb-16 pb-6 px-4">
          {isUK
            ? "Let's assess your eligibility for UK universities"
            : "Let's calculate your chances of getting into your dream University"}
        </h3>

        <div
          className="bg-pink-100 !border !border-2 relative mx-auto max-w-7xl sm:px-6 lg:px-6 py-8 backdrop-blu rounded-3xl  !border-gray-400 overflow-hidden"
          style={{
            backgroundRepeat: "no-repeat",
            backgroundPosition: "bottom center",
            backgroundSize: "cover",
          }}
        >
          <div className="relative z-10 grid grid-cols-1 md:grid-cols-6 gap-8 items-center">
            <div className="md:col-span-4">
              <div className="mb-1">
                <div className="flex mb-1 justify-center">
                  {currentSteps.map((_, index) => {
                    const Icon = stepIcons[index] || User;
                    return (
                      <div key={index} className="flex items-center">
                        <motion.div
                          initial={false}
                          animate={{
                            scale: step === index ? 1.05 : 1,
                            backgroundColor: step >= index ? "#D71635" : "#D71635",
                          }}
                          className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold shadow-md ${step >= index ? "bg-pink-500" : "bg-gray-300"
                            }`}
                        >
                          {step > index ? <Check className="w-4 h-4" /> : <Icon className="w-4 h-4" />}
                        </motion.div>
                        {index < currentSteps.length - 1 && (
                          <motion.div
                            initial={false}
                            animate={{
                              backgroundColor: step > index ? "#ec4848ff" : "#c9b29eff",
                            }}
                            className="w-4 md:w-12 h-0.5 mx-2 rounded-full"
                          />
                        )}
                      </div>
                    )
                  })}
                </div>
              </div>

              <div className="backdrop-blur-[1px] bg-white/0 rounded-2xl sm:p-6 p-3 border-white/0 shadow-3xl">
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={step}
                      initial={{ opacity: 0, x: -30 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 30 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                      {/* UK Form Steps */}
                      {isUK && (
                        <>
                          {step === 0 && (
                            <div className="space-y-5">
                              <div>
                                <h2 className="text-base sm:text-xl font-semibold mb-3 sm:mb-4 !text-black">
                                  Q. Which course are you planning to study in the UK?
                                </h2>
                                <div className="grid grid-cols-3 md:grid-cols-5 gap-1 sm:gap-3">
                                  {ukCourses.map((course, index) => (
                                    <motion.label
                                      key={course}
                                      initial={{ opacity: 0, y: 10 }}
                                      animate={{ opacity: 1, y: 0 }}
                                      transition={{ delay: index * 0.05 }}
                                      whileHover={{ scale: 1.02 }}
                                      whileTap={{ scale: 0.98 }}
                                      className={`group relative sm:p-2.5 p-2.5 !px-3 border rounded-xl  text-center cursor-pointer transition-all duration-200 backdrop-blur-sm ${watch("course") === course
                                        ? "bg-[#D71635] border-gray-400 text-white shadow-lg"
                                        : "bg-white/80 border-gray-400 hover:bg-white/80 hover:shadow-md"
                                        }`}
                                    >
                                      <input
                                        type="radio"
                                        value={course}
                                        {...register("course", { required: "Please select a course" })}
                                        className="hidden"
                                      />
                                      <div className="font-medium text-xs sm:text-base">{course}</div>
                                    </motion.label>
                                  ))}
                                </div>
                              </div>

                              <div>
                                <h2 className="text-base sm:text-xl font-semibold mb-2 sm:mb-4 !text-black">
                                  Q. When do you plan to apply?
                                </h2>
                                <div className="grid grid-cols-3 md:grid-cols-4 gap-1 sm:gap-3">
                                  {ukIntakes.map((intake, index) => (
                                    <motion.label
                                      key={intake}
                                      initial={{ opacity: 0, y: 10 }}
                                      animate={{ opacity: 1, y: 0 }}
                                      transition={{ delay: index * 0.05 }}
                                      whileHover={{ scale: 1.02 }}
                                      whileTap={{ scale: 0.98 }}
                                      className={`group relative sm:p-2.5 p-2.5 border rounded-xl text-center cursor-pointer transition-all duration-200 backdrop-blur-sm ${watch("intake") === intake
                                        ? "bg-[#D71635] border-red-600 text-white shadow-lg"
                                        : "bg-white/80 border-gray-400 hover:bg-white/60 hover:shadow-md"
                                        }`}
                                    >
                                      <input
                                        type="radio"
                                        value={intake}
                                        {...register("intake", { required: "Please select an intake" })}
                                        className="hidden"
                                      />
                                      <div className="font-medium text-xs sm:text-base">{intake}</div>
                                    </motion.label>
                                  ))}
                                </div>
                              </div>
                            </div>
                          )}

                          {step === 1 && (
                            <div className="space-y-5">
                              <div>
                                <h2 className="text-base sm:text-xl font-semibold mb-2 sm:mb-4 !text-black">
                                  Q. Have you taken any English test (IELTS/PTE)?
                                </h2>
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-1 sm:gap-3">
                                  {ukEnglishTests.map((test, index) => (
                                    <motion.label
                                      key={test}
                                      initial={{ opacity: 0, y: 10 }}
                                      animate={{ opacity: 1, y: 0 }}
                                      transition={{ delay: index * 0.05 }}
                                      whileHover={{ scale: 1.02 }}
                                      whileTap={{ scale: 0.98 }}
                                      className={`group relative sm:p-2.5 p-2.5 border rounded-xl text-center cursor-pointer transition-all duration-200 backdrop-blur-sm ${watch("english") === test
                                        ? "bg-[#D71635] border-red-600 text-white shadow-lg"
                                        : "bg-white/80 border-gray-400 hover:bg-white/60 hover:shadow-md"
                                        }`}
                                    >
                                      <input
                                        type="radio"
                                        value={test}
                                        {...register("english", { required: "Please select an option" })}
                                        className="hidden"
                                      />
                                      <div className="font-medium text-xs sm:text-base">{test}</div>
                                    </motion.label>
                                  ))}
                                </div>
                              </div>

                              <div>
                                <h2 className="text-base sm:text-xl font-semibold sm:mb-4 mb-2 !text-black">
                                  Q. What is your current education level?
                                </h2>
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-1 sm:gap-3">
                                  {ukEducationLevels.map((level, index) => (
                                    <motion.label
                                      key={level}
                                      initial={{ opacity: 0, y: 10 }}
                                      animate={{ opacity: 1, y: 0 }}
                                      transition={{ delay: index * 0.05 }}
                                      whileHover={{ scale: 1.02 }}
                                      whileTap={{ scale: 0.98 }}
                                      className={`group relative p-2.5 sm:p-2.5 border rounded-xl text-center cursor-pointer transition-all duration-200 backdrop-blur-sm ${watch("education") === level
                                        ? "bg-[#D71635] border-red-600 text-white shadow-lg"
                                        : "bg-white/80 border-gray-400 hover:bg-white/60 hover:shadow-md"
                                        }`}
                                    >
                                      <input
                                        type="radio"
                                        value={level}
                                        {...register("education", { required: "Please select your education level" })}
                                        className="hidden"
                                      />
                                      <div className="font-medium text-xs sm:text-base">{level}</div>
                                    </motion.label>
                                  ))}
                                </div>
                              </div>
                            </div>
                          )}

                          {step === 2 && (
                            <div className="space-y-5">
                              <h2 className="text-base sm:text-xl font-semibold mb-4 !text-black">
                                Q. Basic Details
                              </h2>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                {[
                                  {
                                    name: "name",
                                    label: "Full Name",
                                    type: "text",
                                    validation: { required: "Name is required" },
                                  },

                                  {
                                    name: "mobile",
                                    label: "Mobile",
                                    type: "text",
                                    validation: {
                                      required: "Mobile is required",
                                      pattern: { value: /^[0-9]{10}$/, message: "Enter a valid 10-digit number" },
                                    },
                                  },
                                  {
                                    name: "email",
                                    label: "Email",
                                    type: "email",
                                    validation: {
                                      pattern: { value: /^\S+@\S+$/i, message: "Invalid email address" },
                                    },
                                  },
                                  {
                                    name: "city",
                                    label: "City",
                                    type: "text",
                                    validation: { required: "City is required" },
                                  },
                                ].map((field, index) => (
                                  <motion.div
                                    key={field.name}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.05 }}
                                    className=""
                                  >
                                    <label className="block text-xs font-medium  mb-1">{field.label} *</label>
                                    <input
                                      type={field.type}
                                      {...register(field.name, field.validation)}
                                      className="w-full p-2.5 rounded-xl px-3 backdrop-blur-sm text-sm !border !border-gray-400 bg-white/90 focus:outline-none !focus:border-gray-600 focus:bg-white/80 transition-all duration-200"
                                      placeholder={`Enter your ${field.label.toLowerCase()}`}
                                    />
                                  </motion.div>
                                ))}
                              </div>
                            </div>
                          )}
                        </>
                      )}

                      {/* Default Form Steps - Updated to match UK form styling */}
                      {!isUK && (
                        <>
                          {step === 0 && (
                            <div className="space-y-4">
                              <h2 className="text-base sm:text-xl font-semibold mb-3 sm:mb-4 !text-black">
                                What is your desired academic course?
                              </h2>
                              <div className="grid grid-cols-3 md:grid-cols-5 gap-1 sm:gap-3">
                                {defaultCourses.map((course, index) => (
                                  <motion.label
                                    key={course}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.05 }}
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    className={`group relative sm:p-2.5 p-2.5 !px-3 border rounded-xl  text-center cursor-pointer transition-all duration-200 backdrop-blur-sm ${watch("course") === course
                                      ? "bg-[#D71635] border-gray-400 text-white shadow-lg"
                                      : "bg-white/80 border-gray-400 hover:bg-white/80 hover:shadow-md"
                                      }`}
                                  >
                                    <input
                                      type="radio"
                                      value={course}
                                      {...register("course", { required: "Please select a course" })}
                                      className="hidden"
                                    />
                                    <div className="font-medium text-xs sm:text-base">{course}</div>
                                  </motion.label>
                                ))}
                              </div>
                            </div>
                          )}

                          {step === 1 && (
                            <div className="space-y-4">
                              <h2 className="text-base sm:text-xl font-semibold mb-3 sm:mb-4 !text-black">
                                Which country do you want to go to?
                              </h2>
                              <div className="grid grid-cols-2 md:grid-cols-4 gap-1 sm:gap-3">
                                {defaultCountries.map((country, index) => (
                                  <motion.label
                                    key={country}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.05 }}
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    className={`group relative sm:p-2.5 p-2.5 border rounded-xl text-center cursor-pointer transition-all duration-200 backdrop-blur-sm ${watch("country") === country
                                      ? "bg-[#D71635] border-gray-400 text-white shadow-lg"
                                      : "bg-white/80 border-gray-400 hover:bg-white/60 hover:shadow-md"
                                      }`}
                                  >
                                    <input
                                      type="radio"
                                      value={country}
                                      {...register("country", { required: "Please select a country" })}
                                      className="hidden"
                                    />
                                    <div className="font-medium text-xs sm:text-base">{country}</div>
                                  </motion.label>
                                ))}
                              </div>
                            </div>
                          )}

                          {step === 2 && (
                            <div className="space-y-5">
                              <div>
                                <h2 className="text-base sm:text-xl font-semibold mb-3 sm:mb-4 !text-black">Preferred Intake Month?</h2>
                                <div className="grid grid-cols-2 md:grid-cols-3 gap-1 sm:gap-3">
                                  {defaultIntakes.map((month, index) => (
                                    <motion.label
                                      key={month}
                                      initial={{ opacity: 0, y: 10 }}
                                      animate={{ opacity: 1, y: 0 }}
                                      transition={{ delay: index * 0.05 }}
                                      whileHover={{ scale: 1.02 }}
                                      whileTap={{ scale: 0.98 }}
                                      className={`group relative sm:p-2.5 p-2.5 border rounded-xl text-center cursor-pointer transition-all duration-200 backdrop-blur-sm ${watch("intake") === month
                                        ? "bg-[#D71635] border-gray-400 text-white shadow-lg"
                                        : "bg-white/80 border-gray-400 hover:bg-white/60 hover:shadow-md"
                                        }`}
                                    >
                                      <input
                                        type="radio"
                                        value={month}
                                        {...register("intake", { required: "Please select an intake" })}
                                        className="hidden"
                                      />
                                      <div className="font-medium text-xs sm:text-base">{month}</div>
                                    </motion.label>
                                  ))}
                                </div>
                              </div>
                              
                            </div>
                          )}

                          {step === 3 && (
                            <div className="space-y-5">
                              <h2 className="text-base sm:text-xl font-semibold mb-4 !text-black">
                                Final Details
                              </h2>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                {[
                                  {
                                    name: "name",
                                    label: "Full Name",
                                    type: "text",
                                    validation: { required: "Name is required" },
                                  },
                                  {
                                    name: "city",
                                    label: "City",
                                    type: "text",
                                    validation: { required: "City is required" },
                                  },
                                  {
                                    name: "mobile",
                                    label: "Mobile",
                                    type: "text",
                                    validation: {
                                      required: "Mobile is required",
                                      pattern: { value: /^[0-9]{10}$/, message: "Enter a valid 10-digit number" },
                                    },
                                  },
                                  {
                                    name: "email",
                                    label: "Email",
                                    type: "email",
                                    validation: {
                                      pattern: { value: /^\S+@\S+$/i, message: "Invalid email address" },
                                    },
                                  },
                                ].map((field, index) => (
                                  <motion.div
                                    key={field.name}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.05 }}
                                    className=""
                                  >
                                    <label className="block text-xs font-medium  mb-1">{field.label} *</label>
                                    <input
                                      type={field.type}
                                      {...register(field.name, field.validation)}
                                      className="w-full p-2.5 rounded-xl px-3 backdrop-blur-sm text-sm !border !border-gray-400 bg-white/90 focus:outline-none !focus:border-gray-600 focus:bg-white/80 transition-all duration-200"
                                      placeholder={`Enter your ${field.label.toLowerCase()}`}
                                    />
                                  </motion.div>
                                ))}
                              </div>
                            </div>
                          )}
                        </>
                      )}
                    </motion.div>
                  </AnimatePresence>

                  <div className="flex justify-between items-center pt-6">
                    {step > 0 ? (
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        type="button"
                        onClick={onBack}
                        className="flex items-center px-6 py-2 btn-secondary border-1 transition-colors duration-200"
                      >
                        <ChevronLeft className="w-4 h-4 mr-1" />
                        Back
                      </motion.button>
                    ) : (
                      <div></div>
                    )}

                    {step < currentSteps.length - 1 ? (
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        type="button"
                        onClick={onNext}
                        className="flex items-center ml-auto px-6 py-2 btn-primary transition-colors duration-200"
                      >
                        Next
                        <ChevronRight className="w-4 h-4 ml-1" />
                      </motion.button>
                    ) : (
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        type="submit"
                        className="flex items-center ml-auto px-6 py-2 btn-primary transition-colors duration-200"
                      >
                        Submit
                        <Check className="w-4 h-4 ml-1" />
                      </motion.button>
                    )}
                  </div>
                </form>
              </div>
            </div>

            <div className="md:col-span-2 hidden md:flex justify-center relative">
              <div className="absolute inset-0 flex justify-center items-center pointer-events-none">
                <div className="w-[260px] h-full bg-white opacity-20 blur-2xl rounded-full"></div>
              </div>

              <motion.img
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2, duration: 0.4 }}
                src="/anime/formsid.png"
                alt="University Illustration"
                className="max-w-[460px] h-auto object-contain drop-shadow-xl relative z-10"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}