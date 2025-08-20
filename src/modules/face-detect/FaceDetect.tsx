'use client'
import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { analyzeEmotionBackend } from '@/lib/emotionApi';
import { EmotionResult } from '@/lib/emotionTypes';
import { getVideosByMood } from '@/lib/spotify';
import { FileInput } from "rizzui";
import { toast } from "react-toastify";
import { addUserHistoryApi } from '@/apis/history/index';
import { uploadToCloudinary } from '@/utils/uploadToCloudinary ';
import { Loader } from "rizzui";

const WebcamCapture = dynamic(() => import('@/components/WebcamCapture/WebcamCapture.jsx'), { ssr: false });

const FaceDetect = () => {
    const [token, setToken] = useState<any>(null);
    const [mood, setMood] = useState<string>('');
    const [capturedImage, setCapturedImage] = useState<string | null>(null); // base64/file URL
    const [loading, setLoading] = useState(false);
    const [videoId, setVideoId] = useState<string | null>(null);
    const [saveLoading, setSaveLoading] = useState(false);
    const [fileToSave, setFileToSave] = useState<File | null>(null); // real file save karna hai

    // ================= Save Record =================
    const handleSaveRecord = async () => {
        if (!fileToSave || !videoId) {
            toast.error("No image or video found!");
            return;
        }
        setSaveLoading(true);

        try {
            // 1. Upload to cloudinary
            const imageUrl = await uploadToCloudinary(fileToSave);
            console.log(imageUrl, 'imageUrlimageUrl')
            // 2. Prepare payload
            const now = new Date();
            const userString = localStorage.getItem('user');
            const user_Data = userString ? JSON.parse(userString) : null as any;
            const user = user_Data?._id || '';
            const time = `${now.toLocaleDateString()} ${now.toLocaleTimeString()}`;
            const youtubeUrl = `${videoId}`;

            const payload = {
                user,
                dateTime: time,
                youtubeUrl,
                imageUrl,
                mood,
            };
            console.log(payload, 'payloadpayloadpayload')
            const response = await addUserHistoryApi(payload);
            console.log("Save Record Response:", response);
            toast.success("Record saved successfully!");
        } catch (error) {
            console.error("Save Record Error:", error);
            toast.error("Failed to save record");
        } finally {
            setSaveLoading(false);
        }
    };

    // ================= File Upload Handler =================
    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]; // 👈 file nikalne ka sahi tarika
        console.log("targettarget file:", e.target);
        console.log("Selected file:", file);
        if (!file) {
            console.error("No file selected");
            return;
        }
        const validTypes = ["image/png", "image/jpeg", "image/jpg", "image/svg+xml", "image/webp", "image/avif"];
        if (!validTypes.includes(file?.type)) {
            toast.error("Only PNG, JPG, JPEG, SVG, WebP, AVIF files are allowed!");
            return;
        }

        setFileToSave(file);
        setCapturedImage(URL.createObjectURL(file)); // sirf preview ke liye
        setMood('');
        toast.success("Image selected!");
    };

    // ================= Webcam Capture =================
    const handleCapture = async (imgData: any) => {
        console.log("Captured image data:", imgData);
        try {
            // Base64 → File
            const arr = imgData.split(',');
            const mime = arr[0].match(/:(.*?);/)?.[1] || "image/png";
            const bstr = atob(arr[1]);
            let n = bstr.length;
            const u8arr = new Uint8Array(n);
            while (n--) {
                u8arr[n] = bstr.charCodeAt(n);
            }
            const file = new File([u8arr], `capture_${Date.now()}.png`, { type: mime });

            setFileToSave(file);
            setCapturedImage(imgData); // preview ke liye base64
            setMood('');
            console.log("Captured file:", file);
        } catch (error) {
            console.error("Capture Error:", error);
            toast.error("Failed to capture image!");
        }
    };

    // ================= Mood Test =================
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

            const videos = await getVideosByMood(detectedMood);
            if (videos && videos.length > 0) {
                setVideoId(videos[0].id.videoId);
            }
        } catch (err) {
            console.error('Error analyzing emotion:', err);
            setMood('Error detecting mood');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.hash.substring(1));
        const accessToken = urlParams.get('access_token');
        if (accessToken) setToken(accessToken);
    }, []);

    return (
        <div className='flex flex-col items-center gap-4 h-[73vh] overflow-y-auto p-4 no-scrollbar'>
            <p className='text-gray-500 text-2xl font-bold'>Face detection and emotion analysis 👤</p>
            <div className="bg-white rounded-3xl shadow-2xl p-8 flex flex-col items-center w-full max-w-md">
                {/* Webcam */}
                <WebcamCapture onCapture={handleCapture} />

                {/* File Upload */}
                <div className="w-full mt-4">
                    <FileInput
                        label="Upload Image"
                        accept="image/png,image/jpeg,image/jpg,image/svg+xml,image/webp,image/avif"
                        onChange={handleFileChange} />
                </div>

                {/* Preview */}
                {capturedImage && (
                    <div className="mt-6 flex flex-col items-center">
                        <img src={capturedImage} alt="Captured" className="rounded-xl border-4 border-purple-200 shadow-lg w-72" />
                        <button
                            onClick={handleTest}
                            className="mt-4 px-8 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold rounded-full shadow-lg hover:scale-105 transition-transform duration-200 text-lg"
                            disabled={loading}
                        >
                            {loading ? <Loader variant="threeDot" /> : 'Test Mood'}
                        </button>
                    </div>
                )}

                {/* Mood */}
                <p className="mt-6 text-lg font-semibold text-gray-700">
                    Detected Mood: <span className="text-purple-600">{mood}</span>
                </p>

                {/* YouTube + Save */}
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
    )
}

export default FaceDetect;
