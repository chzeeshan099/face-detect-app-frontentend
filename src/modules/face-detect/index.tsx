'use client'
import React from 'react';
import Tabs from '@/components/Tabs';
import History from '@/modules/face-detect/History';
import FaceDetect from '@/modules/face-detect/FaceDetect';

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
        <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500 mb-6 drop-shadow-lg">🎵 Mood Music Player</h1>
        <div className="w-full">
          <Tabs tabs={tabs} />
        </div>
      </div>
    </>
  )
}

export default index