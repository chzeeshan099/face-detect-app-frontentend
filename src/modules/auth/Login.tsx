"use client";
import { loginApi } from "@/apis/auth/auth";
import React from "react";
import { useForm } from "react-hook-form";
import { Input } from "rizzui";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";



interface LoginForm {
    email: string;
    password: string;
}
interface loginApiResponse {
    message: string;
    token: string;
    isSuccess: boolean;
    user: {
        email: string;
        firstName?: string;
        lastName?: string;
        _id: string;
    };
}

const Login = () => {
    const router = useRouter();

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset,
    } = useForm<LoginForm>();

    const onSubmit = async (data: LoginForm) => {
        console.log("Login Data:", data);
        try {
            const response = await loginApi(data) as loginApiResponse;
            console.log("login Response:", response);
            if (response?.isSuccess) {
                toast.success(response?.message || "Login  successful!");
                reset();
                localStorage.setItem("token", response?.token);
                const name = `${response?.user?.firstName ?? ""} ${response?.user?.lastName ?? ""}`.trim();
                localStorage.setItem("user", JSON.stringify({
                    name: name,
                    email: response?.user?.email,
                    _id: response?.user?._id,
                }));
                router.push("/face-detect");
            } else {
                toast.error(response?.message || "Login failed!");
            }
        } catch (error) {
            toast.error("Signup failed! Please try again.");
        }
    };

    const handleSignup = () => {
        router.push("/auth/signup");
    }
    const handleForgetPassword = () => {
        router.push("/auth/forget-password");
    }

    return (
        <div className="flex flex-col items-center gap-4 h-screen overflow-y-auto p-4 bg-gradient-to-br from-blue-50 to-purple-50 rounded-3xl shadow-lg">
            <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500 mb-4">Login</h2>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="bg-white rounded-3xl shadow-2xl p-8 flex flex-col items-center w-full max-w-md gap-4"
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
                    errorClassName="text-xs"

                />
                <Input
                    label="Password"
                    // type="password"
                    placeholder="Enter your password"
                    {...register("password", { required: "Password is required", minLength: { value: 8, message: "Password must be at least 8 characters" } })}
                    error={errors.password?.message}
                    className="w-full"
                    errorClassName="text-xs"

                />
                <p className="text-blue cursor-pointer w-full text-right underline" onClick={handleForgetPassword}>Forget Password</p>

                <button
                    type="submit"
                    className=" w-full py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold rounded-full shadow-lg hover:scale-105 transition-transform duration-200 text-lg"
                    disabled={isSubmitting}
                >
                    {isSubmitting ? "Logging In..." : "Login"}
                </button>

                <p className="">Do you have not account? <span className="text-blue cursor-pointer" onClick={handleSignup}>Sign up</span></p>

            </form>
        </div>
    );
};

export default Login;
