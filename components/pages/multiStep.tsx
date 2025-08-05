'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { AnimatePresence, motion } from 'framer-motion';

const steps = ['course', 'country', 'intake', 'details'];
const courses = ['UG', 'PG', 'PHD', 'MBBS'];
const countries = ['UK', 'USA', 'Canada', 'Australia'];
const intakes = ['January', 'May', 'September'];

export default function MultiStepForm() {
  const [step, setStep] = useState(0);

  const {
    register,
    handleSubmit,
    watch,
    trigger,
    formState: { errors },
  } = useForm({ mode: 'onChange' });

  const onNext = async () => {
    const valid = await trigger();
    if (valid) setStep((prev) => prev + 1);
  };

  const onBack = () => setStep((prev) => prev - 1);

  const onSubmit = ( any) => {
    console.log('Final Data Submitted:', data);
    alert('Form Submitted Successfully!');
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden max-w-5xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[500px]">
        {/* Left: Form */}
        <div className="p-6 md:p-8 bg-gray-50">
          {/* Step Indicator */}
          <div className="flex justify-center mb-6">
            {steps.map((_, i) => (
              <div
                key={i}
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition-all duration-300 ${
                  i === step
                    ? 'bg-blue-600 text-white shadow-md scale-105'
                    : i < step
                    ? 'bg-green-500 text-white'
                    : 'bg-gray-200 text-gray-600'
                }`}
              >
                {i < step ? '✓' : i + 1}
              </div>
            ))}
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="h-full flex flex-col">
            <AnimatePresence mode="wait">
              <motion.div
                key={step}
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 30 }}
                transition={{ duration: 0.3 }}
                className="flex-1"
              >
                {/* Step 0: Course */}
                {step === 0 && (
                  <>
                    <h2 className="text-xl font-bold text-center mb-6 text-gray-800">
                      What is your desired academic course?
                    </h2>
                    <div className="flex flex-wrap gap-3 justify-center">
                      {courses.map((course) => {
                        const isSelected = watch('course') === course;
                        return (
                          <label
                            key={course}
                            className={`px-6 py-3 border-2 rounded-xl min-w-[100px] text-center font-medium cursor-pointer transition-all duration-200 ${
                              isSelected
                                ? 'bg-blue-600 text-white border-blue-600 shadow-lg'
                                : 'bg-white text-gray-700 border-gray-300 hover:shadow-md'
                            }`}
                          >
                            <input
                              type="radio"
                              value={course}
                              {...register('course', { required: 'Course is required' })}
                              className="hidden"
                            />
                            {course}
                          </label>
                        );
                      })}
                    </div>
                    {errors.course && (
                      <p className="text-red-500 text-sm text-center mt-2">
                        {errors.course.message?.toString()}
                      </p>
                    )}
                  </>
                )}

                {/* Step 1: Country */}
                {step === 1 && (
                  <>
                    <h2 className="text-xl font-bold text-center mb-6 text-gray-800">
                      Which country do you want to go to?
                    </h2>
                    <div className="flex flex-wrap gap-3 justify-center">
                      {countries.map((country) => {
                        const isSelected = watch('country') === country;
                        return (
                          <label
                            key={country}
                            className={`px-6 py-3 border-2 rounded-xl min-w-[100px] text-center font-medium cursor-pointer transition-all duration-200 ${
                              isSelected
                                ? 'bg-blue-600 text-white border-blue-600 shadow-lg'
                                : 'bg-white text-gray-700 border-gray-300 hover:shadow-md'
                            }`}
                          >
                            <input
                              type="radio"
                              value={country}
                              {...register('country', { required: 'Country is required' })}
                              className="hidden"
                            />
                            {country}
                          </label>
                        );
                      })}
                    </div>
                    {errors.country && (
                      <p className="text-red-500 text-sm text-center mt-2">
                        {errors.country.message?.toString()}
                      </p>
                    )}
                  </>
                )}

                {/* Step 2: Intake */}
                {step === 2 && (
                  <>
                    <h2 className="text-xl font-bold text-center mb-6 text-gray-800">
                      Preferred Intake Month?
                    </h2>
                    <div className="flex flex-wrap gap-3 justify-center">
                      {intakes.map((month) => {
                        const isSelected = watch('intake') === month;
                        return (
                          <label
                            key={month}
                            className={`px-6 py-3 border-2 rounded-xl min-w-[100px] text-center font-medium cursor-pointer transition-all duration-200 ${
                              isSelected
                                ? 'bg-blue-600 text-white border-blue-600 shadow-lg'
                                : 'bg-white text-gray-700 border-gray-300 hover:shadow-md'
                            }`}
                          >
                            <input
                              type="radio"
                              value={month}
                              {...register('intake', { required: 'Intake is required' })}
                              className="hidden"
                            />
                            {month}
                          </label>
                        );
                      })}
                    </div>
                    {errors.intake && (
                      <p className="text-red-500 text-sm text-center mt-2">
                        {errors.intake.message?.toString()}
                      </p>
                    )}
                  </>
                )}

                {/* Step 3: Details */}
                {step === 3 && (
                  <>
                    <h2 className="text-xl font-bold text-center mb-6 text-gray-800">
                      Basic Details
                    </h2>
                    <div className="space-y-4">
                      {[
                        { label: 'Full Name', name: 'name', type: 'text' },
                        { label: 'City', name: 'city', type: 'text' },
                        { label: 'Mobile', name: 'mobile', type: 'text' },
                        { label: 'Email', name: 'email', type: 'email' },
                      ].map((field) => (
                        <div key={field.name}>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            {field.label}
                          </label>
                          <input
                            type={field.type}
                            {...register(field.name, {
                              required: `${field.label} is required`,
                              ...(field.name === 'mobile' && {
                                pattern: {
                                  value: /^[0-9]{10}$/,
                                  message: 'Enter a valid 10-digit number',
                                },
                              }),
                              ...(field.name === 'email' && {
                                pattern: {
                                  value: /^\S+@\S+$/i,
                                  message: 'Invalid email address',
                                },
                              }),
                            })}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                          />
                          {errors[field.name as keyof typeof errors] && (
                            <p className="text-red-500 text-xs mt-1">
                              {errors[field.name as keyof typeof errors]?.message?.toString()}
                            </p>
                          )}
                        </div>
                      ))}
                    </div>
                  </>
                )}
              </motion.div>
            </AnimatePresence>

            {/* Navigation Buttons */}
            <div className="flex justify-between items-center mt-8 gap-4">
              {step > 0 && (
                <button
                  type="button"
                  onClick={onBack}
                  className="px-5 py-2.5 bg-gray-400 text-white rounded-lg hover:bg-gray-500 transition"
                >
                  ← Previous
                </button>
              )}
              {step < steps.length - 1 ? (
                <button
                  type="button"
                  onClick={onNext}
                  className="ml-auto px-5 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition shadow-md hover:shadow-lg"
                >
                  Save & Go Next →
                </button>
              ) : (
                <button
                  type="submit"
                  className="ml-auto px-5 py-2.5 bg-green-600 text-white rounded-lg hover:bg-green-700 transition shadow-md hover:shadow-lg"
                >
                  Submit ✔
                </button>
              )}
            </div>
          </form>
        </div>

        {/* Right: Illustration */}
        <div className="hidden lg:flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
          <div className="relative">
            <img
              src="/images/students.png"
              alt="Study Abroad Illustration"
              className="max-w-full h-auto object-contain drop-shadow-2xl"
              style={{ maxHeight: '400px' }}
            />
            {/* Optional floating element */}
            <div className="absolute -top-4 -right-4 w-16 h-16 bg-yellow-300 rounded-full opacity-60 blur-xl"></div>
          </div>
        </div>
      </div>
    </div>
  );
}