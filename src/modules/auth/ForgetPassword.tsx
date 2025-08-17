'use client';
import { forgotPasswordApi } from "@/apis/auth/auth";
import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { Input } from "rizzui";

interface ForgetPasswordForm {
    email: string;
}
interface forgotPasswordApiResponse {
    email: string;
    isSuccess: boolean;
    message: string;
    resetToken: string;
}

const ForgetPassword = () => {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset,
    } = useForm<ForgetPasswordForm>();

    const onSubmit = async (data: ForgetPasswordForm) => {
        console.log("Reset Password Data:", data);
        try {
            const response = await forgotPasswordApi(data) as forgotPasswordApiResponse;
            console.log("Signup Response:", response);
            if (response?.isSuccess) {
                toast.success(response?.message || "Password reset email sent!");
                reset();
                localStorage.setItem("resetToken", response?.resetToken);
                localStorage.setItem("resetEmail", data?.email);
            } else {
                toast.error(response?.message);
            }
        } catch (error) {
            toast.error("Forget Password failed! Please try again.");
        }
    };

    return (
        <div className="flex flex-col items-center gap-4 h-screen overflow-y-auto p-4 bg-gradient-to-br from-blue-50 to-purple-50 rounded-3xl shadow-lg">
            <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500 mb-4">Reset Password</h2>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="bg-white rounded-3xl shadow-2xl p-8 flex flex-col items-center w-full max-w-md gap-6"
            >
                <Input
                    label="Email"
                    type="email"
                    placeholder="Enter your email"
                    {...register("email", {
                        required: "Email is required",
                        pattern: {
                            value: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
                            message: "Invalid email address",
                        },
                    })}
                    error={errors.email?.message}
                    className="w-full"
                />
                <button
                    type="submit"
                    className="px-8 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold rounded-full shadow-lg hover:scale-105 transition-transform duration-200 text-lg"
                    disabled={isSubmitting}
                >
                    {isSubmitting ? "Resetting..." : "Reset Password"}
                </button>
            </form>
        </div>
    );
};

export default ForgetPassword;
