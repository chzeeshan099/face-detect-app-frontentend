import React, { useState, useEffect } from 'react';
import { getUserHistoryApi } from '@/apis/history/index';
import Loader from '@/components/Loader';
import { Empty, EmptyProductBoxIcon } from "rizzui";
const History = () => {
    const [modalImg, setModalImg] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [userHistory, setUserHistory] = useState<any[]>([]);
    let history: any[] = [];
    // try {
    //     history = JSON.parse(typeof window !== 'undefined' ? localStorage.getItem('faceDetectHistory') || '[]' : '[]') as any[];
    // } catch { }
    const getUserHistory = async () => {
        try {
            setLoading(true);
            const userString = localStorage.getItem('user');
            const user_Data = userString ? JSON.parse(userString) : null as any;
            console.log("Saving record with userID:", user_Data);
            const user_ID = user_Data?._id || ''
            const response = await getUserHistoryApi(user_ID) as any;
            setUserHistory(response?.history || []);
            console.log("get User History Response:", response);
            setLoading(false);
        }
        catch (error) {
            console.log(error, 'eerroorr')

        }
    }
    useEffect(() => {
        getUserHistory();
    }, []);
    return (
        <>
            <div className='flex flex-col items-center gap-4 h-[73vh] overflow-y-auto py-4 px-4 sm:px-10 no-scrollbar'>
                <h2 className="text-base sm:text-2xl font-bold text-gray-500">🕒 Your Face Detect History</h2>
                {
                    loading && (
                        <div className="flex items-center justify-center w-full h-full">
                            <Loader />
                        </div>
                    )
                }
                {userHistory?.length === 0 ? (
                    <div className='flex items-center justify-center w-full h-full'>
                        <Empty
                            image={<EmptyProductBoxIcon />}
                            text="No History Available"
                        />
                    </div>
                ) : (
                    <div className="w-full flex flex-col gap-4">
                        {userHistory?.map((item, idx) => {
                            const [date, time, zone] = item?.dateTime.split(' ');
                            const finalDate = date.replaceAll("/", "-");
                            const finalTime = `${time} ${zone}`;
                            return (
                                <div key={idx} className="bg-white rounded-3xl shadow-xl px-2 md:px-6 py-4 sm:py-6 flex flex-col md:flex-row justify-center items-center gap-2 md:gap-6">
                                    <div className="flex items-center justify-center md:justify-start w-full md:w-2/12 ">
                                        <img
                                            src={item?.imageUrl}
                                            alt={`Detected face ${idx}`}
                                            className="w-44 h-28 object-cover rounded-xl border-4 border-purple-200 shadow-lg cursor-pointer hover:scale-105 transition-transform"
                                            onClick={() => setModalImg(item?.imageUrl)}
                                        />
                                    </div>
                                    <div className='w-full md:w-1/2  text-center'>
                                        <p className="text-lg sm:text-2xl font-semibold text-purple-600">Mood: {item?.mood}</p>
                                        <p className="text-xs sm:text-base text-gray-500">Date: {finalDate} | Time: {finalTime}</p>
                                    </div>
                                    <div className="flex-1 flex gap-2 items-center md:items-start  w-2/6">
                                        <div className="w-full flex justify-center md:justify-end">
                                            <iframe
                                                width="210"
                                                height="124"
                                                src={`https://www.youtube.com/embed/${item.youtubeUrl}`}
                                                frameBorder="0"
                                                allow="autoplay; encrypted-media ; volume"
                                                allowFullScreen
                                                title={`History Video ${idx}`}
                                                className="rounded-xl shadow-lg"
                                            />
                                        </div>
                                    </div>
                                </div>
                            )
                        }
                        )}
                    </div>
                )}
                {/* Modal for big image */}
                {modalImg && (
                    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50" onClick={() => setModalImg(null)}>
                        <div className="bg-white rounded-3xl p-6 shadow-2xl flex flex-col items-center">
                            <img src={modalImg} alt="Big face" className="max-w-[80vw] max-h-[80vh] rounded-xl border-4 border-purple-200 shadow-lg" />
                            <button
                                className="mt-4 px-6 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold rounded-full shadow-lg"
                                onClick={() => setModalImg(null)}
                            >
                                Close
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
};

export default History;