"use client";
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useSearchParams } from "next/navigation";
import { Label } from "@/components/ui/label";
import { ArrowLeft, CheckCircle, Mail } from "lucide-react";
import Swal from "sweetalert2";
import axiosInstance from "@/services/axiosInstance";
import { useGlobal } from "@/hooks/AppStateContext";

type AuthMode = "login" | "otp" | "register" | "success";

export default function Auth({ toggleDrawer }: any) {
  const searchParams = useSearchParams();
  const ReferalFromUrl = searchParams.get("ref");
  const { userInfo } = useGlobal();

  const [mode, setMode] = useState<AuthMode>("login");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [newaccount, setNewAccount] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(true); // ✅ Default checked
  const [errors, setErrors] = useState<any>({});

  const [formData, setFormData] = useState({
    name: "",
    phoneNumber: "",
    referCode: "",
  });

  useEffect(() => {
    if (ReferalFromUrl) {
      setFormData((prev) => ({ ...prev, referCode: ReferalFromUrl }));
    }
  }, [ReferalFromUrl]);

  const validatePhone = (value: string) => /^[6-9]\d{9}$/.test(value);
  const validateName = (value: string) => /^[A-Za-z ]+$/.test(value);

  // ✅ LOGIN SUBMIT
  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: any = {};

    if (!email) newErrors.email = "Email is required.";

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    setLoading(true);
    try {
      const res = await axiosInstance.get(`/auth/verify_email?email=${email}`);
      const exists = res?.data?.isExists;

      if (exists) {
        await sendOtp();
        setMode("otp");
      } else {
        setNewAccount(true);
        setMode("register");
      }
    } catch {
      setErrors({ email: "Failed to verify email." });
    } finally {
      setLoading(false);
    }
  };

  // ✅ SEND OTP
  const sendOtp = async () => {
    try {
      const res = await axiosInstance.post("/auth/send_otp", { email });
      if (res?.data?.success)
        Swal.fire("OTP Sent!", "Check your email.", "success");
      else Swal.fire("Failed", "Unable to send OTP.", "error");
    } catch {
      setErrors({ otp: "Failed to send OTP." });
    }
  };

  // ✅ VERIFY OTP
  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const payload = newaccount ? { email, otp, ...formData } : { email, otp };
      const res = await axiosInstance.post("/auth/verify_otp", payload);
      if (res?.data?.success) {
        userInfo();
        setMode("success");
        toggleDrawer();
        window.location.href =
          "https://dashboard.gatewayabroadeducations.com/";
      } else setErrors({ otp: "Invalid OTP. Try again." });
    } catch {
      setErrors({ otp: "OTP verification failed." });
    } finally {
      setLoading(false);
    }
  };

  // ✅ REGISTER
  const handleCreateAccount = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: any = {};

    if (!validateName(formData.name))
      newErrors.name = "Name should be valid.";
    if (!validatePhone(formData.phoneNumber))
      newErrors.phoneNumber = "Phone number should be valid.";

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    setLoading(true);
    try {
      await sendOtp();
      setMode("otp");
    } catch {
      setErrors({ general: "Failed to send OTP." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-red-50 to-red-100 px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-xl relative z-10"
      >
        <div className="mx-auto mb-6">
          <img src="/img/ga-logo.svg" alt="Logo" className="w-[70%] mx-auto" />
        </div>

        <AnimatePresence mode="wait">
          {/* LOGIN FORM */}
          {mode === "login" && (
            <motion.form
              key="login"
              onSubmit={handleEmailSubmit}
              className="space-y-6 text-center"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-3xl font-bold text-red-800 mb-2">
                Welcome Back
              </h2>
              <p className="text-muted-foreground mb-4">
                Sign in to continue your journey
              </p>

              <div className="flex flex-col text-left mb-4">
                <div className="flex items-center mb-2">
                  <Mail className="w-5 h-5 text-gray-500 mr-2" />
                  <Label htmlFor="email" className="font-medium">
                    Email
                  </Label>
                </div>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                  className="rounded-[20px] border-2 focus:border-primary w-full py-3 px-4 text-black"
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                )}
              </div>

              {/* ✅ Terms Checked by Default */}
              <div className="text-left">
                <div className="flex items-center space-x-2 text-sm text-gray-700">
                  <input
                    type="checkbox"
                    id="terms"
                    checked={termsAccepted}
                    onChange={(e) => setTermsAccepted(e.target.checked)}
                    className="w-4 h-4 accent-red-600"
                  />
                  <label htmlFor="terms">
                    I agree to the{" "}
                    <a href="/terms" className="text-red-600 underline">
                      Terms & Conditions
                    </a>
                  </label>
                </div>
              </div>

              <Button
                type="submit"
                className="w-full bg-red-600 text-white font-semibold rounded-[20px] py-3 hover:bg-red-700 transition"
                disabled={loading}
              >
                {loading ? "Signing In..." : "Login"}
              </Button>
            </motion.form>
          )}

          {/* REGISTER FORM */}
          {mode === "register" && (
            <motion.div
              key="register"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex items-center mb-4">
                <Button
                  variant="ghost"
                  onClick={() => setMode("login")}
                  className="border border-2 px-3 rounded-full mr-2"
                >
                  <ArrowLeft className="w-6 h-6" />
                </Button>
                <h2 className="text-3xl font-bold text-red-800">
                  Register Account
                </h2>
              </div>

              <form onSubmit={handleCreateAccount} className="space-y-3">
                <div className="text-left">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="Full Name"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    required
                    className="rounded-[20px] border-2 focus:border-primary w-full"
                  />
                  {errors.name && (
                    <p className="text-red-500 text-xs mt-1">{errors.name}</p>
                  )}
                </div>

                <div className="text-left">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    type="text"
                    placeholder="Phone Number"
                    value={formData.phoneNumber}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        phoneNumber: e.target.value,
                      })
                    }
                    required
                    maxLength={10}
                    className="rounded-[20px] border-2 focus:border-primary w-full"
                  />
                  {errors.phoneNumber && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.phoneNumber}
                    </p>
                  )}
                </div>

                <div className="text-left">
                  <Label htmlFor="ref">Referral Code (Optional)</Label>
                  <Input
                    id="ref"
                    type="text"
                    placeholder="Referral Code"
                    value={formData.referCode}
                    onChange={(e) =>
                      setFormData({ ...formData, referCode: e.target.value })
                    }
                    className="rounded-[20px] border-2 focus:border-primary w-full"
                  />
                </div>

                {errors.general && (
                  <p className="text-red-500 text-sm text-center">
                    {errors.general}
                  </p>
                )}

                <Button
                  type="submit"
                  className="w-full py-3 rounded-[20px] bg-red-600 text-white font-semibold hover:bg-red-700 transition"
                  disabled={loading}
                >
                  {loading ? "Sending OTP..." : "Send OTP"}
                </Button>
              </form>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
