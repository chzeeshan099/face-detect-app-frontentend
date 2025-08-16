'use client';

import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { BsCloudUpload } from 'react-icons/bs';
import { MdDeleteOutline } from 'react-icons/md';
import { Controller } from 'react-hook-form';
import { GoUpload } from 'react-icons/go';

type UploadedImage = {
    id: string;
    file: File;
    preview: string;
    progress: number;
};

interface FileUploadProps {
    control: any;
    setValue: any;
    name: string;
    errors: any;
    value: UploadedImage[];
}

const FileUpload = ({ control, setValue, name, errors, value }: FileUploadProps) => {
    const [images, setImages] = useState<UploadedImage[]>(value || []);

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
        setValue(name, [...images, ...previews]);
    }, [images, setValue, name]);

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
        setValue(name, images.filter((img) => img.id !== id));
    };

    return (
        <div>

            <div
                {...getRootProps()}
                className="p-8 border border-dashed border-greenPrimary-100 rounded-md mb-4 flex flex-col items-center justify-center cursor-pointer dark:bg-greenPrimary-200 bg-white"
            >
                <input {...getInputProps()} />
                <GoUpload  className="text-gray-500 mb-2 w-6 h-6" />
                <p className="text-gray-850 text-sm font-normal text-center">
                    Drag and Drop images here or <span className="text-greenPrimary-100 text-sm font-medium">Choose Files</span>
                </p>
                <p className="text-gray-1100 font-normal text-sm mt-2">Accepted formats: JPEG, PNG, or GIF</p>
            </div>
            {images.length > 0 && (
                <div className="flex flex-wrap gap-6 px-6 ">
                    {images.map((img) => (
                        <div
                            key={img.id}
                            className="bg-white dark:bg-greenPrimary-100 rounded-lg shadow-md overflow-hidden w-40"
                        >
                            <div className="w-full h-28 p-1 rounded-lg flex items-center justify-center bg-white dark:bg-greenPrimary-100">
                                <img
                                    src={img.preview}
                                    alt="Preview"
                                    className="object-contain h-full rounded-lg w-full"
                                />
                            </div>

                            <div className="flex items-center justify-between px-3 py-2">
                                <span className="text-sm text-gray-800 dark:text-white truncate w-32">
                                    {img.file.name}
                                </span>
                                <button onClick={() => handleDelete(img.id)} className="p-1">
                                    <MdDeleteOutline className="text-gray-600 dark:text-white text-xl hover:text-red-600 dark:hover:text-red-400" />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

            )}
           
        </div>
    );
};

export default FileUpload;
