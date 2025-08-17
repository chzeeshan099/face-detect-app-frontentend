'use client'
import React from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { Input } from "rizzui";
import { toast } from "react-toastify";
import { signupApi } from "@/apis/auth/auth";


interface SignupForm {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}
interface SignupApiResponse {
    message: string;
    token: string;
    success: boolean;
}

const Signup = () => {
    const router = useRouter();
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset,
    } = useForm<SignupForm>();

    const onSubmit = async (data: SignupForm) => {
        console.log("Signup Data:", data);
        try {
            const response = await signupApi(data) as SignupApiResponse;
            console.log("Signup Response:", response);
            if (response?.success) {
                toast.success(response?.message || "Signup successful!");
                reset();
                localStorage.setItem("token", response?.token);
                router.push("/auth/login");
            } else {
                toast.error(response?.message || "Signup failed!");
            }
        } catch (error) {
            toast.error("Signup failed! Please try again.");
        }
    };
    const handleLogin = () => {
        router.push("/auth/login");
    }

    return (
        <div className="flex flex-col items-center gap-4 h-screen overflow-y-auto p-4 bg-gradient-to-br from-blue-50 to-purple-50 rounded-3xl shadow-lg">
            <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500 mb-4">Sign Up</h2>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="bg-white rounded-3xl shadow-2xl p-8 flex flex-col items-center w-full max-w-md gap-2"
            >
                <Input
                    label="First Name"
                    placeholder="Enter your first name"
                    {...register("firstName", {
                        required: "First name is required",
                        minLength: { value: 4, message: "First name must be at least 4 characters" },
                    })}
                    error={errors.firstName?.message}
                    className="w-full"
                    errorClassName="text-xs"

                />
                <Input
                    label="Last Name"
                    placeholder="Enter your last name"
                    {...register("lastName")}
                    className="w-full"

                />
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
                    errorClassName="text-xs"

                />
                <Input
                    label="Password"
                    // type="password"
                    placeholder="Enter your password"
                    {...register("password", {
                        required: "Password is required",
                        minLength: { value: 8, message: "Password must be at least 8 characters" },
                        pattern: {
                            value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,}$/,
                            message: "Password must contain uppercase, lowercase, number, and special character",
                        },
                    })}
                    error={errors.password?.message}
                    className="w-full"
                    errorClassName="text-xs"
                />
                <button
                    type="submit"
                    className="w-full py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold rounded-full shadow-lg hover:scale-105 transition-transform duration-200 text-lg mt-2"
                    disabled={isSubmitting}
                >
                    {isSubmitting ? "Signing Up..." : "Sign Up"}
                </button>
                <p className="py-2">Do you have account? <span className="text-blue cursor-pointer" onClick={handleLogin}>Login Here</span></p>
            </form>
        </div>
    );
};

export default Signup;
