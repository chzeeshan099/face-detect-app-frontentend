'use client';

import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { BsCloudUpload } from 'react-icons/bs';
import { MdDeleteOutline } from 'react-icons/md';

type UploadedImage = {
  id: string;
  file: File;
  preview: string;
  progress: number;
};

export default function MemeUpload() {
  const [images, setImages] = useState<UploadedImage[]>([]);
  const [caption, setCaption] = useState('');

  const onDropAccepted = useCallback((acceptedFiles: File[]) => {
    const previews = acceptedFiles.map((file) => {
      const previewURL = URL.createObjectURL(file);
      return {
        id: previewURL,
        file,
        preview: previewURL,
        progress: 100,
      };
    });
    setImages((prev) => [...prev, ...previews]);
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDropAccepted,
    accept: {
      'image/jpeg': [],
      'image/png': [],
      'image/gif': [],
    },
    multiple: true,
  });

  const handleDelete = (id: string) => {
    setImages((prev) => prev.filter((img) => img.id !== id));
  };

  return (
    <div className="text-white flex items-center justify-center">
      <div className="w-full max-w-7xl px-4">
        <h1 className="text-2xl font-bold mb-4 dark:text-white">$Mutt Army Hub</h1>

        <div className="dark:bg-[#0B272A] rounded-lg overflow-hidden bg-lightgray-primary">
          <div className="p-4 border-b dark:border-gray-400">
            <h1 className="text-xl font-medium text-center dark:text-white text-black">Meme Upload</h1>
          </div>

          <div
            {...getRootProps()}
            className="p-8 border-2 border-dashed border-gray-800 dark:border-gray-300 rounded-md m-4 flex flex-col items-center justify-center cursor-pointer dark:bg-greenPrimary-200 bg-lightgray-primary"
          >
            <input {...getInputProps()} />
            <BsCloudUpload size={40} className="text-gray-500 mb-2" />
            <p className="text-gray-400 text-center">
              Drag and Drop images here or <span className="text-green-400">Choose Files</span>
            </p>
            <p className="text-gray-500 text-sm mt-2">Accepted formats: JPEG, PNG, or GIF</p>
          </div>
          {images.length > 0 && (
            <div className="flex flex-wrap gap-4 px-4 pb-4">
              {images.map((img) => (
                <div
                  key={img.id}
                  className="dark:bg-[#092522] bg-white w-52 h-52 p-2 relative rounded-md flex flex-col "
                >
                  <div className="w-full h-40 flex items-center justify-center overflow-hidden relative rounded">
                    <img
                      src={img.preview}
                      alt="Preview"
                      className="max-w-full max-h-full object-contain rounded"
                    />
                  </div>

                  <div className="flex items-center justify-between mt-1 px-1">
                    <span className="text-[12px] text-[#000000] dark:text-white truncate max-w-[80%]">
                      {img.file.name}
                    </span>
                    <button onClick={() => handleDelete(img.id)}>
                      <MdDeleteOutline className="text-gray-900 dark:text-white text-lg hover:text-red-600 dark:hover:text-red-400" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
          <div className="p-4 border-t border-[#F9F6ED] dark:border-gray-100">
            <div className="mb-4">
              <textarea
                className="w-full dark:bg-[#092522]  bg-[#F9F6ED] border border-gray-200 dark:border-gray-300  rounded-md p-2 text-gray-900 dark:text-white"
                placeholder="Enter your caption here..."
                rows={2}
                maxLength={120}
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
              />
              <p className="text-[#A1A1A1] text-xs mt-1">
                Keep captions short and fun. Max 120 characters per meme.
              </p>
            </div>

            <div className="flex justify-end">
              <button className="bg-yellow-400 text-gray-900 font-medium py-2 px-4 rounded-md dark:text-[#000000]">
                Wallet Signature
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}