"use client";
import { loginApi, resetPasswordAPi } from "@/apis/auth/auth";
import React from "react";
import { useForm } from "react-hook-form";
import { Input } from "rizzui";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";



interface ResetPasswordForm {
    password: string;
    confirmPassword: string;
}
interface resetPasswordApiResponse {
    message: string;
    isSuccess: boolean;
}

const ResetPassword = () => {
    const router = useRouter();

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset,
    } = useForm<ResetPasswordForm>();

    const onSubmit = async (data: ResetPasswordForm) => {
        const resetToken = localStorage.getItem("resetToken");
        const resetEmail = localStorage.getItem("resetEmail");
        console.log("Login Data:", data);
        const payload = {
            newPassword: data?.confirmPassword,
            token: resetToken,
        }
        try {
            const response = await resetPasswordAPi(payload) as resetPasswordApiResponse;
            console.log("Signup Response:", response);
            if (response?.isSuccess) {
                toast.success(response?.message || "Password Reset successful!");
                reset();
                localStorage.removeItem("resetToken");
                localStorage.removeItem("resetEmail");
                router.push("/auth/login");
            } else {
                toast.error(response?.message || "Password Reset failed!");
            }
        } catch (error) {
            toast.error("Password Reset failed! Please try again.");
        }

        reset();
    };



    return (
        <div className="flex flex-col items-center gap-4 h-screen overflow-y-auto p-4 bg-gradient-to-br from-blue-50 to-purple-50 rounded-3xl shadow-lg">
            <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500 mb-4">Reset Password</h2>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="bg-white rounded-3xl shadow-2xl p-8 flex flex-col items-center w-full max-w-md gap-4"
            >
                <Input
                    label="Password"
                    // type="password"
                    placeholder="Enter your password"
                    {...register("password", { required: "Password is required", minLength: { value: 8, message: "Password must be at least 8 characters" } })}
                    error={errors.password?.message}
                    className="w-full"
                    errorClassName="text-xs"

                />
                <Input
                    label="Confirm Password"
                    // type="password"
                    placeholder="Enter your Confirm password"
                    {...register("confirmPassword", {
                        required: "Confirm Password is required",
                        minLength: { value: 8, message: "Password must be at least 8 characters" },
                        validate: (value, formValues) =>
                            value === formValues.password || "Passwords do not match"
                    })}
                    error={errors.confirmPassword?.message}
                    className="w-full"
                    errorClassName="text-xs"

                />

                <button
                    type="submit"
                    className=" w-full py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold rounded-full shadow-lg hover:scale-105 transition-transform duration-200 text-lg"
                    disabled={isSubmitting}
                >
                    {isSubmitting ? "Reset Password ..." : "Reset Password"}
                </button>


            </form>
        </div>
    );
};

export default ResetPassword;
