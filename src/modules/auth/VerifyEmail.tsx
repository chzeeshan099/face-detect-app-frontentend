"use client";
import React, { useEffect, useState, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { verifyEmailApi } from "@/apis/auth/auth";
import { toast } from "react-toastify";

interface VerifyEmailApiResponse {
    isSuccess: boolean;
    message: string;
}

const VerifyEmail = () => {
    const router = useRouter();
    const searchParams = useSearchParams();

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    // ✅ Single reusable function for verification
    const verify = useCallback(
        async (token: string) => {
            try {
                setLoading(true);
                setError("");

                const response = (await verifyEmailApi(token)) as VerifyEmailApiResponse;
                console.log("Verify Email Response:", response);
                if (response?.isSuccess) {
                    toast.success(response?.message || "Email verified successfully!");
                    router.push("/auth/login");
                } else {
                    setError(response?.message || "Verification failed. Please try again.");
                }
            } catch (err: any) {
                setError(err?.message || "Something went wrong. Please try again.");
            } finally {
                setLoading(false);
            }
        },
        [router]
    );

    // ✅ Run verification on mount
    useEffect(() => {
        const token = searchParams.get("token");
        console.log("Verification Token:", token);
        if (!token) {
            setError("Invalid or missing verification token.");
            setLoading(false);
            return;
        }
        verify(token);
    }, [searchParams, verify]);

    // ✅ Retry handler
    const handleRetry = () => {
        const token = searchParams.get("token");
        if (token) verify(token);
    };

    return (
        <div className="flex flex-col items-center justify-center gap-4 h-screen overflow-y-auto p-4 bg-gradient-to-br from-blue-50 to-purple-50 rounded-3xl shadow-lg">
            <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500 mb-4">
                Verify Email
            </h2>

            <div className="bg-white rounded-3xl shadow-2xl p-8 flex flex-col items-center w-full max-w-md gap-4">
                {loading ? (
                    <div className="text-lg font-semibold text-purple-500">
                        Verifying your email, please wait...
                    </div>
                ) : error ? (
                    <>
                        <div className="text-red-500 font-semibold text-center">{error}</div>
                        <button
                            onClick={handleRetry}
                            className="w-full py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold rounded-full shadow-lg hover:scale-105 transition-transform duration-200 text-lg mt-2"
                        >
                            Retry Verification
                        </button>
                    </>
                ) : (
                    <div className="text-green-500 font-semibold text-center">
                        Email verified! Redirecting to login...
                    </div>
                )}
            </div>
        </div>
    );
};

export default VerifyEmail;
