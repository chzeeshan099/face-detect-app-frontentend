'use client'
import React from 'react'
import { Dropdown, Text, Avatar } from "rizzui";
import { useRouter } from 'next/navigation';
interface User {
    name: string;
    email: string;
    _id: string;
}
const Profile = () => {
    const router = useRouter();
    const userData = JSON.parse(localStorage.getItem('user') || '{}') as User;
    const initials = userData?.name
        ?.split(' ')
        .map(word => word.charAt(0).toUpperCase())
        .join('');
    console.log("initialsinitials", initials);
    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        router.push("/auth/login");
    }
    return (
        <>
            <Dropdown placement="bottom-end">
                <Dropdown.Trigger>
                    <Avatar
                        name={userData?.name || 'N/A'}
                        initials={initials || 'NA'}
                        className="cursor-pointer"
                        color="info"

                    />
                </Dropdown.Trigger>
                <Dropdown.Menu className="w-56 divide-y text-gray-600">
                    <Dropdown.Item className="hover:bg-transparent">
                        <Avatar
                            name={userData?.name || 'N/A'}
                            initials={initials || 'NA'}
                            color="info"
                            className="cursor-pointer"


                        />
                        <span className="ml-2 text-start">
                            <Text className="text-gray-900 font-medium leading-tight">{userData?.name || 'N/A'}</Text>
                            <Text className="text-xs sm:text-sm text-gray-500 break-words max-w-[60%]">
                                {userData?.email || 'N/A'}
                            </Text>
                        </span>
                    </Dropdown.Item>
                    <div className="mt-2 pt-2">
                        <Dropdown.Item className="hover:bg-gray-900 hover:text-gray-50" onClick={handleLogout}>Sign Out</Dropdown.Item>
                    </div>
                </Dropdown.Menu>
            </Dropdown>
        </>
    )
}

export default Profile