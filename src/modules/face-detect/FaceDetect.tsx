'use client'
import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { analyzeEmotionBackend } from '@/lib/emotionApi';
import { EmotionResult } from '@/lib/emotionTypes';
import { getVideosByMood } from '@/lib/spotify';
import { FileInput } from "rizzui";
import { toast } from "react-toastify";

const WebcamCapture = dynamic(() => import('@/components/WebcamCapture/WebcamCapture.jsx'), { ssr: false });

const FaceDetect = () => {
    const [token, setToken] = useState<any>(null);
    const [mood, setMood] = useState<any>('');
    const [capturedImage, setCapturedImage] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [videoId, setVideoId] = useState<string | null>(null);
    const [saveLoading, setSaveLoading] = useState(false);
    const fileInputRef = React.useRef<HTMLInputElement>(null);
    // Save record to localStorage
    const handleSaveRecord = () => {
        if (!capturedImage || !videoId) return;
        setSaveLoading(true);
        const now = new Date();
        const record = {
            image: capturedImage,
            date: now.toLocaleDateString(),
            time: now.toLocaleTimeString(),
            videoId,
            mood,
        };
        let history: any[] = [];
        try {
            history = JSON.parse(localStorage.getItem('faceDetectHistory') || '[]') as any[];
        } catch { }
        history.unshift(record);
        localStorage.setItem('faceDetectHistory', JSON.stringify(history));
        setSaveLoading(false);
        toast.success('Record saved to history!');
    };

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.hash.substring(1));
        const accessToken = urlParams.get('access_token');
        if (accessToken) {
            setToken(accessToken);
        }
    }, []);

    // Webcam capture
    const handleCapture = (imgData: any) => {
        setCapturedImage(imgData);
        setMood('');
        // Clear file input if any file is selected
        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    };

    // File upload
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const validTypes = ["image/png", "image/jpeg", "image/jpg", "image/svg+xml", "image/webp", "image/avif"];
        if (!validTypes.includes(file.type)) {
            toast.error("Only PNG, JPG, and SVG, jpeg, webp, avif files are allowed!");
            return;
        }

        const reader = new FileReader();
        reader.onloadend = () => {
            setCapturedImage(reader.result as string);
            setMood('');
        };
        reader.readAsDataURL(file);
    };

    // Call API when Test button is clicked
    const handleTest = async () => {
        if (!capturedImage) return;
        setLoading(true);
        setMood('Analyzing...');
        setVideoId(null);
        try {
            const result = await analyzeEmotionBackend(capturedImage) as EmotionResult;
            if (!result || !result.dominant_emotion) {
                setMood('No mood detected');
                setLoading(false);
                return;
            }
            const detectedMood = result.dominant_emotion.toLowerCase();
            setMood(detectedMood);
            try {
                const videos = await getVideosByMood(detectedMood);
                if (videos && videos.length > 0) {
                    setVideoId(videos[0].id.videoId);
                } else {
                    setVideoId(null);
                }
            } catch (err) {
                console.error('Error getting videos by mood:', err);
                setVideoId(null);
            }
            setLoading(false);
        } catch (err) {
            console.log('Error analyzing emotion:', err);
            setMood('Error detecting mood');
            setLoading(false);
        }
    };

    return (
        <>
            <div className='flex flex-col items-center gap-4 h-[73vh] overflow-y-auto p-4 no-scrollbar'>
                <p className='text-gray-500 text-2xl font-bold'>Face detection and emotion analysis 👤</p>
                <div className="bg-white rounded-3xl shadow-2xl p-8 flex flex-col items-center w-full max-w-md">
                    {/* Webcam Capture */}
                    <WebcamCapture onCapture={handleCapture} />

                    {/* File Upload */}
                    <div className="w-full mt-4">
                        <FileInput
                            label="Upload File"
                            accept="image/png,image/jpeg,image/jpg,image/svg+xml,image/webp,image/avif"
                            onChange={handleFileChange}
                            ref={fileInputRef}
                        />
                    </div>

                    {/* Image Preview + Test Button */}
                    {capturedImage && (
                        <div className="mt-6 flex flex-col items-center">
                            <img src={capturedImage} alt="Captured" className="rounded-xl border-4 border-purple-200 shadow-lg w-72" />
                            <button
                                onClick={handleTest}
                                className="mt-4 px-8 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold rounded-full shadow-lg hover:scale-105 transition-transform duration-200 text-lg"
                                disabled={loading}
                            >
                                {loading ? (
                                    <span className="flex items-center gap-2">
                                        <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path></svg>
                                        Testing...
                                    </span>
                                ) : (
                                    'Test Mood'
                                )}
                            </button>
                        </div>
                    )}

                    {/* Mood Result */}
                    <p className="mt-6 text-lg font-semibold text-gray-700">
                        Detected Mood: <span className="text-purple-600">{mood}</span>
                    </p>

                    {/* YouTube Video for Mood + Save Button */}
                    {videoId && (
                        <div className="mt-6 w-full flex flex-col items-center justify-center gap-4">
                            <iframe
                                width="320"
                                height="180"
                                src={`https://www.youtube.com/embed/${videoId}`}
                                frameBorder="0"
                                allow="autoplay; encrypted-media"
                                allowFullScreen
                                title="Mood Video"
                                className="rounded-xl shadow-lg"
                            />
                            <button
                                onClick={handleSaveRecord}
                                className="px-6 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold rounded-full shadow-lg hover:scale-105 transition-transform duration-200 text-md"
                                disabled={saveLoading}
                            >
                                {saveLoading ? 'Saving...' : 'Save Record'}
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}

export default FaceDetect;
