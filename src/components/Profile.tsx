'use client'
import React from 'react'
import { Dropdown, Text, Avatar } from "rizzui";
import { useRouter } from 'next/navigation';

const Profile = () => {
    const router = useRouter();
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
                        name="John Doe"
                        initials="JD"
                        className="cursor-pointer"
                    />
                </Dropdown.Trigger>
                <Dropdown.Menu className="w-56 divide-y text-gray-600">
                    <Dropdown.Item className="hover:bg-transparent">
                        <Avatar
                            name="John Doe"
                            initials="JD"
                        />
                        <span className="ml-2 text-start">
                            <Text className="text-gray-900 font-medium leading-tight">Mary Hoops</Text>
                            <Text>maryhe@demo.io</Text>
                        </span>
                    </Dropdown.Item>
                    {/* <div className="mt-3 mb-2 pt-2">
                  <Dropdown.Item className="hover:bg-gray-900 hover:text-gray-50">
                    Account Settings
                  </Dropdown.Item>
                  <Dropdown.Item className="hover:bg-gray-900 hover:text-gray-50">Support</Dropdown.Item>
                  <Dropdown.Item className="hover:bg-gray-900 hover:text-gray-50">License</Dropdown.Item>
                </div> */}
                    <div className="mt-2 pt-2">
                        <Dropdown.Item className="hover:bg-gray-900 hover:text-gray-50" onClick={handleLogout}>Sign Out</Dropdown.Item>
                    </div>
                </Dropdown.Menu>
            </Dropdown>
        </>
    )
}

export default Profile