"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

const publicRoutes = [
    "/auth/login",
    "/auth/signup",
    "/auth/forget-password",
    "/auth/reset-password",
    "/auth/verify",
];

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
    const router = useRouter();

    useEffect(() => {
        const user = localStorage.getItem("user");
        const token = localStorage.getItem("token");
        const currentPath = window.location.pathname;
        const isPublic = publicRoutes.includes(currentPath);

        if (!user && !token) {
            if (!isPublic) {
                router.replace("/auth/login");
            }
        } else {
            if (isPublic) {
                router.replace("/face-detect");
            }
        }
    }, []);

    return <>{children}</>;
}
