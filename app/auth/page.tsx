"use client"

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useRouter } from "next/navigation";
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Eye, EyeOff, Mail, Lock, User, Phone, ArrowLeft, CheckCircle } from 'lucide-react';
import axiosInstance from '@/services/axiosInstance';

interface FormData {
  fullName: string;
  email: string;
  mobile: string;
  password: string;
  confirmPassword: string;
}

interface LoginData {
  email: string;
  password: string;
}

interface OTPData {
  otp: string;
}

type AuthMode = 'login' | 'register' | 'forgot' | 'otp' | 'resetPassword' | 'success';

const Auth = () => {
  const [mode, setMode] = useState<AuthMode>('login');
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    email: '',
    mobile: '',
    password: '',
    confirmPassword: ''
  });
  const [loginData, setLoginData] = useState<LoginData>({ email: '', password: '' });
  const [otpData, setOTPData] = useState<OTPData>({ otp: '' });
  const [resetEmail, setResetEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const router = useRouter();

  // Simulate API calls
  const simulateAPI = (delay: number = 2000) =>
    new Promise(resolve => setTimeout(resolve, delay));

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      toast({
        title: "Password Mismatch",
        description: "Passwords do not match",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);
    try {
      await simulateAPI();
      toast({
        title: "Registration Initiated",
        description: "Please check your email for OTP verification"
      });
      setMode('otp');
    } catch (error) {
      toast({
        title: "Registration Failed",
        description: "Something went wrong. Please try again.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      let response = await axiosInstance.post("auth/send_otp", { email: loginData.email })
      setMode('otp');
    } catch (error) {
      toast({
        title: "Login Failed",
        description: "Invalid email or password",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

const handleOTPVerification = async (e: React.FormEvent) => {
  e.preventDefault();
  setLoading(true);

  try {
    const response = await axiosInstance.post("auth/verify_otp", {
      email: loginData.email,
      otp: otpData.otp
    });

    if (response.data) {
      localStorage.setItem("accessToken", response.data.token);
    }
    setMode("success");
    router.push("/")
  } catch (error) {
    toast({
      title: "Verification Failed",
      description: "Invalid OTP. Please try again.",
      variant: "destructive"
    });
  } finally {
    setLoading(false);
  }
};


  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await simulateAPI();
      toast({
        title: "Reset Code Sent",
        description: "Please check your email for the reset code"
      });
      setMode('otp');
    } catch (error) {
      toast({
        title: "Failed to Send Reset Code",
        description: "Please check your email and try again.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordReset = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmNewPassword) {
      toast({
        title: "Password Mismatch",
        description: "Passwords do not match",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);
    try {
      await simulateAPI();
      toast({
        title: "Password Reset Successful",
        description: "Your password has been updated successfully"
      });
      setMode('login');
    } catch (error) {
      toast({
        title: "Reset Failed",
        description: "Something went wrong. Please try again.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen hero-gradient mt-16 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-20 left-10 w-4 h-4 bg-primary rounded-full"
          animate={{
            y: [0, -20, 0],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute top-32 right-20 w-6 h-6 bg-secondary rounded-full"
          animate={{
            y: [0, -20, 0],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
        />
        <motion.div
          className="absolute bottom-40 left-20 w-0 h-0 border-l-[20px] border-l-transparent border-r-[20px] border-r-transparent border-b-[30px] border-b-accent"
          animate={{
            y: [0, -20, 0],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
        />
        <motion.div
          className="absolute top-1/4 right-1/4 w-8 h-8 bg-muted rounded-full"
          animate={{
            y: [0, -20, 0],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 3
          }}
        />
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-xl rounded-xl bg-white relative z-10"
      >
        <AnimatePresence mode="wait">
          {mode === 'login' && (
            <motion.div
              key="login"
              initial={{ opacity: 0, y: 50, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -50, scale: 0.95 }}
              transition={{ duration: 0.5 }}
            >
              <Card className="card-gradient border-0 shadow-2xl">
                <CardHeader className="text-center">
                  <CardTitle className="text-3xl font-bold text-red-800">Welcome Back</CardTitle>
                  <CardDescription className="text-muted-foreground">
                    Sign in to continue your journey
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleLogin} className="space-y-4">
                    <div className="space-y-2 my-3">
                      <Label htmlFor="email" className="flex items-center gap-2">
                        <Mail className="w-4 h-4" />
                        Email
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        value={loginData.email}
                        onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                        placeholder="Enter your email"
                        required
                        className="rounded-[20px] border-2 focus:border-primary"
                      />
                    </div>
                    {/* <div className="space-y-2">
                      <Label htmlFor="password" className="flex items-center gap-2">
                        <Lock className="w-4 h-4" />
                        Password
                      </Label>
                      <div className="relative">
                        <Input
                          id="password"
                          type={showPassword ? "text" : "password"}
                          value={loginData.password}
                          onChange={(e) => setLoginData({...loginData, password: e.target.value})}
                          placeholder="Enter your password"
                          required
                          className="rounded-[20px] border-2 focus:border-primary pr-10"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2"
                        >
                          {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>
                    </div> */}
                    <Button
                      type="submit"
                      variant="auth"
                      className="w-full btn-primary"
                      disabled={loading}
                    >
                      {loading ? "Signing In..." : "Sign In"}
                    </Button>
                    <div className="text-center space-y-2">
                      <button
                        type="button"
                        onClick={() => setMode('forgot')}
                        className="text-primary hover:underline text-sm"
                      >
                        Forgot Password?
                      </button>
                      <div className="text-sm text-muted-foreground">
                        Don't have an account?{' '}
                        <button
                          type="button"
                          onClick={() => setMode('register')}
                          className="text-primary hover:underline font-semibold"
                        >
                          Sign Up
                        </button>
                      </div>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {mode === 'register' && (
            <motion.div
              key="register"
              initial={{ opacity: 0, y: 50, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -50, scale: 0.95 }}
              transition={{ duration: 0.5 }}
            >
              <Card className="card-gradient border-0 shadow-2xl">
                <CardHeader className="text-center">
                  <CardTitle className="text-3xl font-bold text-primary">Create Account</CardTitle>
                  <CardDescription className="text-muted-foreground">
                    Join us today and start your journey
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleRegister} className="space-y-4">
                    {/* <div className="space-y-2">
                      <Label htmlFor="fullName" className="flex items-center gap-2">
                        <User className="w-4 h-4" />
                        Full Name
                      </Label>
                      <Input
                        id="fullName"
                        type="text"
                        value={formData.fullName}
                        onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                        placeholder="Enter your full name"
                        required
                        className="rounded-[20px] border-2 focus:border-primary"
                      />
                    </div> */}
                    <div className="space-y-2">
                      <Label htmlFor="email" className="flex items-center gap-2">
                        <Mail className="w-4 h-4" />
                        Email
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="Enter your email"
                        required
                        className="rounded-[20px] border-2 focus:border-primary"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="mobile" className="flex items-center gap-2">
                        <Phone className="w-4 h-4" />
                        Mobile Number
                      </Label>
                      <Input
                        id="mobile"
                        type="tel"
                        value={formData.mobile}
                        onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                        placeholder="Enter your mobile number"
                        required
                        className="rounded-[20px] border-2 focus:border-primary"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="password" className="flex items-center gap-2">
                        <Lock className="w-4 h-4" />
                        Password
                      </Label>
                      <div className="relative">
                        <Input
                          id="password"
                          type={showPassword ? "text" : "password"}
                          value={formData.password}
                          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                          placeholder="Create a password"
                          required
                          className="rounded-[20px] border-2 focus:border-primary pr-10"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2"
                        >
                          {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="confirmPassword">Confirm Password</Label>
                      <Input
                        id="confirmPassword"
                        type="password"
                        value={formData.confirmPassword}
                        onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                        placeholder="Confirm your password"
                        required
                        className="rounded-[20px] border-2 focus:border-primary"
                      />
                    </div>
                    <Button
                      type="submit"
                      variant="auth"
                      className="w-full btn-primary"
                      disabled={loading}
                    >
                      {loading ? "Creating Account..." : "Create Account"}
                    </Button>
                    <div className="text-center text-sm text-muted-foreground">
                      Already have an account?{' '}
                      <button
                        type="button"
                        onClick={() => setMode('login')}
                        className="text-primary hover:underline font-semibold"
                      >
                        Sign In
                      </button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {mode === 'forgot' && (
            <motion.div
              key="forgot"
              initial={{ opacity: 0, y: 50, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -50, scale: 0.95 }}
              transition={{ duration: 0.5 }}
            >
              <Card className="card-gradient border-0 shadow-2xl">
                <CardHeader className="text-center">
                  <Button
                    variant="ghost"
                    onClick={() => setMode('login')}
                    className="absolute left-4 top-4 rounded-full"
                  >
                    <ArrowLeft className="w-4 h-4" />
                  </Button>
                  <CardTitle className="text-3xl font-bold text-primary">Reset Password</CardTitle>
                  <CardDescription className="text-muted-foreground">
                    Enter your email to receive a reset code
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleForgotPassword} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="resetEmail" className="flex items-center gap-2">
                        <Mail className="w-4 h-4" />
                        Email
                      </Label>
                      <Input
                        id="resetEmail"
                        type="email"
                        value={resetEmail}
                        onChange={(e) => setResetEmail(e.target.value)}
                        placeholder="Enter your email"
                        required
                        className="rounded-[20px] border-2 focus:border-primary"
                      />
                    </div>
                    <Button
                      type="submit"
                      variant="auth"
                      className="w-full"
                      disabled={loading}
                    >
                      {loading ? "Sending..." : "Send Reset Code"}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {mode === 'otp' && (
            <motion.div
              key="otp"
              initial={{ opacity: 0, y: 50, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -50, scale: 0.95 }}
              transition={{ duration: 0.5 }}
            >
              <Card className="card-gradient border-0 shadow-2xl">
                <CardHeader className="text-center">
                  <Button
                    variant="ghost"
                    onClick={() => setMode('login')}
                    className="absolute left-4 top-4 rounded-full"
                  >
                    <ArrowLeft className="w-4 h-4" />
                  </Button>
                  <CardTitle className="text-3xl font-bold text-primary">Verify Email</CardTitle>
                  <CardDescription className="text-muted-foreground">
                    Enter the 6-digit code sent to your email
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleOTPVerification} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="otp">Verification Code</Label>
                      <Input
                        id="otp"
                        type="text"
                        value={otpData.otp}
                        onChange={(e) => setOTPData({ otp: e.target.value })}
                        placeholder="Enter 6-digit code"
                        maxLength={6}
                        required
                        className="rounded-[20px] border-2 focus:border-primary text-center text-lg tracking-widest"
                      />
                    </div>
                    <Button
                      type="submit"
                      variant="auth"
                      className="w-full"
                      disabled={loading}
                    >
                      {loading ? "Verifying..." : "Verify Email"}
                    </Button>
                    <div className="text-center text-sm text-muted-foreground">
                      Didn't receive the code?{' '}
                      <button
                        type="button"
                        onClick={() => toast({ title: "Code Resent", description: "A new code has been sent to your email" })}
                        className="text-primary hover:underline"
                      >
                        Resend
                      </button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {mode === 'success' && (
            <motion.div
              key="success"
              initial={{ opacity: 0, y: 50, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -50, scale: 0.95 }}
              transition={{ duration: 0.5 }}
            >
              <Card className="card-gradient border-0 shadow-2xl">
                <CardContent className="text-center py-8">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                  >
                    <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                  </motion.div>
                  <CardTitle className="text-2xl font-bold text-primary mb-2">Success!</CardTitle>
                  <CardDescription className="text-muted-foreground mb-6">
                    Welcome to Gateway Abroad! Your account is ready.
                  </CardDescription>
                  <Button
                    variant="auth"
                    onClick={() => setMode('login')}
                    className="w-full"
                  >
                    Continue to Dashboard
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default Auth;