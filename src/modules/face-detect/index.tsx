'use client'
import React from 'react';
import Tabs from '@/components/Tabs';
import History from '@/modules/face-detect/History';
import FaceDetect from '@/modules/face-detect/FaceDetect';
import Profile from '@/components/Profile';

const tabs = [
  {
    label: "Detect Emotion",
    content: <FaceDetect />,
  },
  {
    label: "Emotion History",
    content: <History />,
  },
];

const index = () => {
  return (
    <>
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100">
        <div className='flex items-center w-full'>
          <h1 className="w-4/5 text-center text-base sm:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500 drop-shadow-lg">🎵 Mood Music Player</h1>
          <div className='w-1/5 flex justify-end pr-6'>
           <Profile />
          </div>
        </div>
        <div className="w-full">
          <Tabs tabs={tabs} />
        </div>
      </div>
    </>
  )
}

export default index