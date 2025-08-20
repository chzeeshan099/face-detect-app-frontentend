'use client';
import React, { useState, useEffect } from "react";
import { getAllUsersApi } from "@/apis/admin";
import { deleteUserHistoryApi } from "@/apis/history";
import { Empty, EmptyProductBoxIcon } from "rizzui";

type HistoryItem = {
    id: number;
    dateTime: string;
    imageUrl?: string;
    youtubeUrl?: string;
};

type User = {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    history: HistoryItem[];
};

const AdminPanel = () => {
    const [users, setUsers] = useState<User[]>();
    const [selectedUser, setSelectedUser] = useState<User | null>(null);
    const [showModal, setShowModal] = useState<boolean>(false);

    // confirm delete modal states
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [deleteTarget, setDeleteTarget] = useState<any>(null);

    const getAllUsers = async () => {
        const response = (await getAllUsersApi()) as any;
        setUsers(response?.users || []);
    };

    useEffect(() => {
        getAllUsers();
    }, []);

    // Delete history item (after confirmation)
    const confirmDeleteHistory = async () => {


        const response = await deleteUserHistoryApi(deleteTarget);
        console.log("Delete Response:", response);

        // close modal
        setShowDeleteModal(false);
        setDeleteTarget(null);
    };

    // open confirmation modal
    const handleDeleteHistory = (historyId: any) => {
        setDeleteTarget(historyId);
        setShowDeleteModal(true);
    };

    const handleUserClick = (user: User) => {
        setSelectedUser(user);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setSelectedUser(null);
    };

    return (
        <div className="p-4 md:p-8 bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 min-h-screen">
            <h1 className="text-xl sm:text-4xl font-extrabold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-pink-500 to-blue-500">
                Admin Panel - Users
            </h1>
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white rounded-2xl shadow-lg border border-purple-200">
                    <thead>
                        <tr className="bg-gradient-to-r from-purple-100 to-pink-100">
                            <th className="py-3 text-center min-w-40 text-purple-700">#</th>
                            <th className="py-3 text-center min-w-40 text-purple-700">First Name</th>
                            <th className="py-3 text-center min-w-40 text-purple-700">Last Name</th>
                            <th className="py-3 text-center min-w-40 text-purple-700">Email</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users?.map((user, idx) => {
                            return (
                                <tr
                                    key={user.id}
                                    className="cursor-pointer hover:bg-gradient-to-r hover:from-purple-50 hover:to-pink-50 transition"
                                    onClick={() => handleUserClick(user)}
                                >
                                    <td className="py-3 font-semibold text-purple-900 text-center">
                                        {idx + 1}
                                    </td>
                                    <td className="py-3 font-semibold text-purple-900 text-center">
                                        {user?.firstName}
                                    </td>
                                    <td className="py-3 font-semibold text-purple-900 text-center">
                                        {user?.lastName}
                                    </td>
                                    <td className="py-3 text-center">{user.email}</td>
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
                        <h2 className="text-3xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-500">
                            {`${selectedUser?.firstName} ${selectedUser?.lastName} `}
                        </h2>
                        <p className="mb-2 text-lg">
                            Email:{" "}
                            <span className="font-semibold text-purple-700">
                                {selectedUser.email}
                            </span>
                        </p>

                        <h3 className="text-xl font-semibold mb-2 text-purple-700">
                            Face Detect History
                        </h3>
                        <div className="overflow-x-auto">
                            {selectedUser.history.length ? (
                                <table className="w-full mb-4 rounded-xl overflow-hidden">
                                    <thead>
                                        <tr className="bg-gradient-to-r from-purple-100 to-pink-100">
                                            <th className="min-w-40 py-2 text-center text-purple-700">Image</th>
                                            <th className="min-w-40 py-2 text-center text-purple-700">Video</th>
                                            <th className="min-w-40 py-2 text-center text-purple-700">Date</th>
                                            <th className="min-w-40 py-2 text-center text-purple-700">Action</th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {selectedUser?.history?.map((h: any) => {
                                            const [date] = h?.dateTime.split(" ");
                                            const formattedDate = date.replaceAll("/", "-");
                                            console.log(h, 'hhhhhhhhhhh')
                                            return (
                                                <tr key={h.id} className="hover:bg-purple-50">
                                                    <td className="py-2 text-center flex justify-center items-center">
                                                        {h.imageUrl ? (
                                                            <img
                                                                src={h.imageUrl}
                                                                alt="Face Test"
                                                                className="w-16 h-16 object-cover rounded-lg border border-purple-200"
                                                            />
                                                        ) : (
                                                            <span className="text-gray-400">No Image</span>
                                                        )}
                                                    </td>
                                                    <td className="py-2 text-center px-8">
                                                        {h?.youtubeUrl ? (
                                                            <div className="w-24 h-16">
                                                                <iframe
                                                                    width="100%"
                                                                    height="100%"
                                                                    src={`https://www.youtube.com/embed/${h?.youtubeUrl}`}
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
                                                    <td className="py-2 text-center">{formattedDate}</td>

                                                    <td className="py-2 text-center">
                                                        <button
                                                            className="bg-red-500 text-white px-3 py-1 rounded-full text-xs shadow hover:bg-red-600 transition"
                                                            onClick={() => handleDeleteHistory(h?._id)}
                                                        >
                                                            Delete
                                                        </button>
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>
                            ) : (
                                <Empty
                                    image={<EmptyProductBoxIcon />}
                                    text="No User History Available"
                                />
                            )}
                        </div>
                    </div>
                </div>
            )}

            {/* Confirm Delete Modal */}
            {showDeleteModal && (
                <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
                    <div className="bg-white rounded-2xl shadow-2xl p-6 md:p-8 w-full max-w-md relative border-2 border-purple-200">
                        <h3 className="text-xl font-bold text-purple-700 mb-4">
                            Are you sure to delete this record?
                        </h3>
                        <div className="flex justify-end gap-4">
                            <button
                                className="bg-gray-300 text-purple-700 px-4 py-2 rounded-full shadow hover:bg-gray-400 transition"
                                onClick={() => setShowDeleteModal(false)}
                            >
                                Cancel
                            </button>
                            <button
                                className="bg-red-500 text-white px-4 py-2 rounded-full shadow hover:bg-red-600 transition"
                                onClick={confirmDeleteHistory}
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminPanel;
