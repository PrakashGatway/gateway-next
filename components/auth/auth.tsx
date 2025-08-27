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
import Swal from 'sweetalert2'
import { useGlobal } from '@/hooks/AppStateContext';
import { Checkbox } from '../ui/checkbox';
import axios from 'axios';

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

const Auth = ({ toggleDrawer }) => {
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
    const [loading, setLoading] = useState(false);
    const { toast } = useToast();
    const router = useRouter();
    const { userInfo } = useGlobal()

    // Simulate API calls
    const simulateAPI = (delay: number = 2000) =>
        new Promise(resolve => setTimeout(resolve, delay));

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();

        setLoading(true);
        try {
            let response = await axios.post("https://portal-backend-tczk.onrender.com/api/v1/auth/send_otp", { email: loginData.email })
            setOTPData({ otp: "" })
            Swal.fire({
                title: "Success",
                text: response?.data?.message,
                icon: response?.data?.success ? "success" : "error",
                customClass: {
                    popup: "swal-zindex"
                }
            });
            setMode('otp');

        } catch (error) {
            Swal.fire({
                title: "Error",
                text: error?.message,
                icon: "error",
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
                // localStorage.setItem("accessToken", response.data.token);
                userInfo()
            }
            setMode("success");
            toggleDrawer()
        } catch (error) {
            Swal.fire({
                title: "Message",
                text: error.message,
                icon: "error",
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

            setMode('otp');
        } catch (error) {

        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center p-2 mb-24 overflow-hidden ">
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-xl relative z-10"
            >
                <div className='mx-auto'><img src="/img/ga-logo.svg" alt="" className='w-[70%] mx-auto mb-8' /></div>
                <AnimatePresence mode="wait">
                    {mode === 'login' && (
                        <motion.div
                            key="login"
                            initial={{ opacity: 0, y: 50, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: -50, scale: 0.95 }}
                            transition={{ duration: 0.5 }}
                        >
                            <Card className="">
                                <CardHeader className="text-center">
                                    <CardTitle className="text-3xl font-bold text-red-800">Welcome Back</CardTitle>
                                    <CardDescription className="text-muted-foreground">
                                        Sign in to continue your journey
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <form onSubmit={handleLogin} className="space-y-4">
                                        <div className="space-y-2 my-3">
                                            <Label htmlFor="email" className="flex items-center gap-2 pb-2">
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
                                                className="rounded-[20px] border-2 mb-2 focus:border-primary"
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

                                        <div className="flex items-start space-x-2 my-3">
                                            <Checkbox
                                                id="terms"
                                                checked={loginData.acceptTerms}
                                                onCheckedChange={(checked) =>
                                                    setLoginData({ ...loginData, acceptTerms: checked })
                                                }
                                                required
                                            />
                                            <label
                                                htmlFor="terms"
                                                className="text-sm text-muted-foreground leading-tight"
                                            >
                                                I agree to the{" "}
                                                <a
                                                    href="/terms"
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="text-primary hover:underline font-medium"
                                                >
                                                    Terms of Service
                                                </a>{" "}
                                                and{" "}
                                                <a
                                                    href="/privacy"
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="text-primary hover:underline font-medium"
                                                >
                                                    Privacy Policy
                                                </a>
                                            </label>
                                        </div>
                                        <Button
                                            type="submit"
                                            variant="auth"
                                            className="w-full btn-primary"
                                            disabled={loading}
                                        >
                                            {loading ? "Signing In..." : "Login"}
                                        </Button>
                                        <div className="text-center space-y-2">
                                            {/* <button
                        type="button"
                        onClick={() => setMode('forgot')}
                        className="text-primary hover:underline text-sm"
                      >
                        Forgot Password?
                      </button> */}
                                            {/* <div className="text-sm text-muted-foreground">
                        Don't have an account?{' '}
                        <button
                          type="button"
                          onClick={() => setMode('register')}
                          className="text-primary hover:underline font-semibold"
                        >
                          Sign Up
                        </button>
                      </div> */}
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
                            <Card className="">
                                <CardHeader className="text-center">

                                    <CardTitle className="text-3xl relative font-bold text-red-800"><Button
                                        variant="ghost"
                                        onClick={() => setMode('login')}
                                        className="border border-2 hover:shadow px-3 absolute -left-4 top-0 rounded-full"
                                    >
                                        <ArrowLeft className="w-10 h-10" />
                                    </Button>Verify Email</CardTitle>
                                    <CardDescription className="text-muted-foreground">
                                        Enter the 6-digit code sent to your email
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <form onSubmit={handleOTPVerification} className="space-y-4">
                                        <div className="space-y-4">
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
                                            className="w-full btn-primary mt-6"
                                            disabled={loading}
                                        >
                                            {loading ? "Verifying..." : "Verify Email"}
                                        </Button>
                                        <div className="text-center text-sm text-muted-foreground">
                                            Didn't receive the code?{' '}
                                            <button
                                                type="button"
                                                onClick={(e) => handleLogin(e)}
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
                            <Card className="">
                                <CardContent className="text-center py-8">
                                    <motion.div
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                                    >
                                        <CheckCircle className="w-16 h-16 text-red-600 mx-auto mb-4" />
                                    </motion.div>
                                    <CardTitle className="text-2xl font-bold text-primary mb-2">Success!</CardTitle>
                                    <CardDescription className="text-muted-foreground mb-6">
                                        Welcome to Gateway Abroad! Your account is ready.
                                    </CardDescription>
                                    <Button
                                        variant="auth"
                                        onClick={() => window.location.href("https://google.com")}
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