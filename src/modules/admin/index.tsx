'use client';
import React, { useState } from "react";

type HistoryItem = {
    id: number;
    date: string;
    saved: boolean;
    imageUrl?: string;
    videoUrl?: string;
};

type User = {
    id: number;
    name: string;
    email: string;
    history: HistoryItem[];
};

// Dummy users data for UI demonstration
const users: User[] = [
    {
        id: 1,
        name: "Ali Raza",
        email: "ali@example.com",
        history: [
            {
                id: 101,
                date: "2025-08-01",
                saved: true,
                imageUrl: "/public/loginPage.png",
                videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
            },
            {
                id: 102,
                date: "2025-08-02",
                saved: false,
                imageUrl: "/public/welcome-laptop.png",
            },
            {
                id: 103,
                date: "2025-08-03",
                saved: true,
                videoUrl: "https://www.youtube.com/embed/3JZ_D3ELwOQ",
            },
            {
                id: 101,
                date: "2025-08-01",
                saved: true,
                imageUrl: "/public/loginPage.png",
                videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
            },
            {
                id: 102,
                date: "2025-08-02",
                saved: false,
                imageUrl: "/public/welcome-laptop.png",
            },
            {
                id: 103,
                date: "2025-08-03",
                saved: true,
                videoUrl: "https://www.youtube.com/embed/3JZ_D3ELwOQ",
            },
        ],
    },
    {
        id: 2,
        name: "Sara Khan",
        email: "sara@example.com",
        history: [
            {
                id: 201,
                date: "2025-08-01",
                saved: true,
                imageUrl: "/public/home-front.png",
            },
            {
                id: 202,
                date: "2025-08-04",
                saved: true,
                videoUrl: "https://www.youtube.com/embed/tgbNymZ7vqY",
            },
            {
                id: 201,
                date: "2025-08-01",
                saved: true,
                imageUrl: "/public/home-front.png",
            },
            {
                id: 202,
                date: "2025-08-04",
                saved: true,
                videoUrl: "https://www.youtube.com/embed/tgbNymZ7vqY",
            },
            {
                id: 201,
                date: "2025-08-01",
                saved: true,
                imageUrl: "/public/home-front.png",
            },
            {
                id: 202,
                date: "2025-08-04",
                saved: true,
                videoUrl: "https://www.youtube.com/embed/tgbNymZ7vqY",
            },
        ],
    },
];

const AdminPanel = () => {
    const [selectedUser, setSelectedUser] = useState<User | null>(null);
    const [showModal, setShowModal] = useState<boolean>(false);

    // Calculate stats
    const getStats = (history: HistoryItem[]) => {
        const total = history.length;
        const saved = history.filter((h) => h.saved).length;
        const percent = total ? Math.round((saved / total) * 100) : 0;
        return { total, saved, percent };
    };

    // Delete history item
    const handleDeleteHistory = (userId: number, historyId: number) => {
        if (!selectedUser) return;
        const updatedHistory = selectedUser.history.filter((h) => h.id !== historyId);
        setSelectedUser({ ...selectedUser, history: updatedHistory });
    };

    // Open user details
    const handleUserClick = (user: User) => {
        setSelectedUser(user);
        setShowModal(true);
    };

    // Close modal
    const handleCloseModal = () => {
        setShowModal(false);
        setSelectedUser(null);
    };

    return (
        <div className="p-4 md:p-8 bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 min-h-screen">
            <h1 className="text-4xl font-extrabold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-pink-500 to-blue-500">Admin Panel - Users</h1>
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white rounded-2xl shadow-lg border border-purple-200">
                    <thead>
                        <tr className="bg-gradient-to-r from-purple-100 to-pink-100">
                            <th className="py-3 text-center min-w-40 text-purple-700">Name</th>
                            <th className="py-3 text-center min-w-40 text-purple-700">Email</th>
                            <th className="py-3 text-center min-w-40 text-purple-700">Total Tests</th>
                            <th className="py-3 text-center min-w-40 text-purple-700">Saved %</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => {
                            const stats = getStats(user.history);
                            return (
                                <tr
                                    key={user.id}
                                    className="cursor-pointer hover:bg-gradient-to-r hover:from-purple-50 hover:to-pink-50 transition"
                                    onClick={() => handleUserClick(user)}
                                >
                                    <td className="py-3 font-semibold text-purple-900 text-center">{user.name}</td>
                                    <td className="py-3 text-center">{user.email}</td>
                                    <td className="py-3 text-center">{stats.total}</td>
                                    <td className="py-3 text-center">{stats.percent}%</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>

            {/* User Details Modal */}
            {showModal && selectedUser && (
                <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50 overflow-y-auto">
                    <div className="bg-white rounded-2xl shadow-2xl p-6 md:p-10 w-full max-w-3xl relative border-2 border-purple-200 overflow-y-auto h-screen">
                        <button
                            className="absolute top-3 right-3 text-2xl font-bold text-purple-600 hover:text-pink-500"
                            onClick={handleCloseModal}
                        >
                            ×
                        </button>
                        <h2 className="text-3xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-500">{selectedUser.name}</h2>
                        <p className="mb-2 text-lg">Email: <span className="font-semibold text-purple-700">{selectedUser.email}</span></p>
                        <div className="flex justify-center flex-wrap gap-4 mb-4">
                            <div className="bg-gradient-to-r from-purple-100 to-pink-100 rounded-xl p-4 shadow w-40 text-center">
                                <div className="text-2xl font-bold text-purple-700">{getStats(selectedUser.history).total}</div>
                                <div className="text-xs text-gray-500">Total Face Detect Tests</div>
                            </div>
                            <div className="bg-gradient-to-r from-pink-100 to-blue-100 rounded-xl p-4 shadow w-40 text-center">
                                <div className="text-2xl font-bold text-pink-600">{getStats(selectedUser.history).saved}</div>
                                <div className="text-xs text-gray-500">Saved History</div>
                            </div>
                            <div className="bg-gradient-to-r from-blue-100 to-purple-100 rounded-xl p-4 shadow w-40 text-center">
                                <div className="text-2xl font-bold text-blue-600">{getStats(selectedUser.history).percent}%</div>
                                <div className="text-xs text-gray-500">Saved Percentage</div>
                            </div>
                        </div>
                        <h3 className="text-xl font-semibold mb-2 text-purple-700">Face Detect History</h3>
                        <div className="overflow-x-auto">
                            <table className="w-full mb-4 rounded-xl overflow-hidden">
                                <thead>
                                    <tr className="bg-gradient-to-r from-purple-100 to-pink-100">
                                        <th className="min-w-40 py-2 text-center text-purple-700">Date</th>
                                        <th className="min-w-40 py-2 text-center text-purple-700">Saved</th>
                                        <th className="min-w-40 py-2 text-center text-purple-700">Image</th>
                                        <th className="min-w-40 py-2 text-center text-purple-700">Video</th>
                                        <th className="min-w-40 py-2 text-center text-purple-700">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {selectedUser.history.map((h) => (
                                        <tr key={h.id} className="hover:bg-purple-50">
                                            <td className="py-2 text-center">{h.date}</td>
                                            <td className="py-2 text-center">{h.saved ? "Yes" : "No"}</td>
                                            <td className="py-2 text-center flex justify-center items-center">
                                                {h.imageUrl ? (
                                                    <img src={h.imageUrl} alt="Face Test" className="w-16 h-16 object-cover rounded-lg border border-purple-200" />
                                                ) : (
                                                    <span className="text-gray-400">No Image</span>
                                                )}
                                            </td>
                                            <td className="py-2 text-center px-8">
                                                {h.videoUrl ? (
                                                    <div className="w-24 h-16">
                                                        <iframe
                                                            width="100%"
                                                            height="100%"
                                                            src={h.videoUrl}
                                                            title="YouTube video"
                                                            frameBorder="0"
                                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                                            allowFullScreen
                                                        ></iframe>
                                                    </div>
                                                ) : (
                                                    <span className="text-gray-400">No Video</span>
                                                )}
                                            </td>
                                            <td className="py-2 text-center">
                                                <button
                                                    className="bg-red-500 text-white px-3 py-1 rounded-full text-xs shadow hover:bg-red-600 transition"
                                                    onClick={() => handleDeleteHistory(selectedUser.id, h.id)}
                                                >
                                                    Delete
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminPanel;