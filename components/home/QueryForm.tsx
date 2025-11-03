'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import axiosInstance from '@/services/axiosInstance';
import { useRouter } from 'next/navigation';

type FormData = {
    name: string;
    email: string;
    mobile: string;
    studyDestination: string;
    query: string;
};

export default function TestPrepEnquiryForm() {
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<FormData>();

    const onSubmit = async (data: FormData) => {
        setIsLoading(true);
        try {
            const payload = {
                fullName: data.name,
                email: data.email,
                phone: data.mobile,
                coursePreference: "unfilled",
                source: "website",
                extraDetails: {
                    query: data.query || "No additional query provided",
                }
            };

            const res = await axiosInstance.post('/leads', payload);

            if (res?.data?.success) {
                router.push('/thank-you');
                // Swal.fire({
                //     title: 'Thank You!',
                //     text: 'Our team will contact you shortly.',
                //     icon: 'success',
                //     confirmButtonText: 'OK',
                // });
                reset();
            } else {
                throw new Error(res?.data?.message || 'Submission failed');
            }
        } catch (error: any) {
            Swal.fire({
                title: 'Error',
                text: error.message || 'Something went wrong. Please try again.',
                icon: 'error',
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="relative flex justify-center">
            <div className="relative mx-auto w-full max-w-md rounded-[2rem] p-[2px] shadow-2xl overflow-hidden bg-gradient-to-r from-pink-300 via-purple-300 to-amber-300 ">
                {/* Animated glowing border */}
                {/* <div className="absolute inset-0 rounded-[2rem] bg-gradient-to-r from-pink-500 via-purple-500 to-amber-400 animate-rotate"></div> */}

                {/* White card content */}
                <div className="relative rounded-[2rem] bg-white p-6 z-10">
                    <h2 className="text-xl font-bold text-center text-gray-800 mb-6">
                        Speak to an Expert
                    </h2>

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
                        {/* Full Name */}
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                                Full Name <span className="text-red-500">*</span>
                            </label>
                            <input
                                id="name"
                                type="text"
                                {...register('name', {
                                    required: 'Name is required',
                                    minLength: { value: 2, message: 'Name must be at least 2 characters' },
                                })}
                                className={`w-full rounded-3xl border-2 px-4 py-2 text-gray-800 focus:outline-none transition-colors ${errors.name ? 'border-red-500' : 'border-gray-400 focus:border-[#E83A3A]'
                                    }`}
                                placeholder="Enter your full name"
                            />
                            {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
                        </div>

                        {/* Email */}
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                                Email Address <span className="text-red-500">*</span>
                            </label>
                            <input
                                id="email"
                                type="email"
                                {...register('email', {
                                    required: 'Email is required',
                                    pattern: {
                                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                        message: 'Invalid email address',
                                    },
                                })}
                                className={`w-full rounded-3xl border-2 px-4 py-2 text-gray-800 focus:outline-none transition-colors ${errors.email ? 'border-red-500' : 'border-gray-400 focus:border-[#E83A3A]'
                                    }`}
                                placeholder="you@example.com"
                            />
                            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
                        </div>

                        {/* Phone */}
                        <div>
                            <label htmlFor="mobile" className="block text-sm font-medium text-gray-700 mb-1">
                                Mobile Number <span className="text-red-500">*</span>
                            </label>
                            <input
                                id="mobile"
                                type="tel"
                                {...register('mobile', {
                                    required: 'Phone is required',
                                    pattern: {
                                        value: /^[6-9]\d{9}$/,
                                        message: 'Enter a valid 10-digit Indian mobile number',
                                    },
                                })}
                                className={`w-full rounded-3xl border-2 px-4 py-2 text-gray-800 focus:outline-none transition-colors ${errors.mobile ? 'border-red-500' : 'border-gray-400 focus:border-[#E83A3A]'
                                    }`}
                                placeholder="9876543210"
                            />
                            {errors.mobile && <p className="text-red-500 text-xs mt-1">{errors.mobile.message}</p>}
                        </div>

                        {/* Test Type */}
                        {/* <div>
              <label htmlFor="studyDestination" className="block text-sm font-medium text-gray-700 mb-1">
                Interested In <span className="text-red-500">*</span>
              </label>
              <select
                id="studyDestination"
                {...register('studyDestination', { required: 'Please select a test' })}
                className={`w-full rounded-3xl border-2 px-4 py-2 text-gray-800 focus:outline-none transition-colors appearance-none bg-white ${
                  errors.studyDestination ? 'border-red-500' : 'border-gray-300 focus:border-[#E83A3A]'
                }`}
              >
                <option value="">Interested In</option>
                <option value="IELTS">IELTS</option>
                <option value="TOEFL">TOEFL</option>
                <option value="PTE">PTE</option>
                <option value="SAT">SAT</option>
                <option value="GRE">GRE</option>
                <option value="GMAT">GMAT</option>
                <option value="Duolingo">Duolingo</option>
                <option value="Spoken English">Spoken English</option>
              </select>
              {errors.studyDestination && (
                <p className="text-red-500 text-xs mt-1">{errors.studyDestination.message}</p>
              )}
            </div> */}

                        {/* Message */}
                        <div>
                            <label htmlFor="query" className="block text-sm font-medium text-gray-700 mb-1">
                                Message (Optional)
                            </label>
                            <textarea
                                id="query"
                                {...register('query')}
                                rows={2}
                                className="w-full rounded-3xl border-2 border-gray-400 px-4 py-2 text-gray-800 focus:outline-none focus:border-[#E83A3A] transition-colors resize-none"
                                placeholder="Tell us more about your goals..."
                            />
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={isLoading}
                            className={`w-full font-semibold rounded-3xl py-2 text-white transition-all duration-200 flex items-center justify-center ${isLoading
                                ? 'bg-gray-400 cursor-not-allowed'
                                : 'bg-[#E83A3A] hover:bg-red-700 hover:scale-[1.02] shadow-md hover:shadow-lg'
                                }`}
                        >
                            {isLoading ? (
                                <>
                                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Submitting...
                                </>
                            ) : (
                                'SUBMIT ENQUIRY'
                            )}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}