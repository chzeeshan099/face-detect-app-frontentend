'use client';

import React, {
    useState,
    useCallback,
    useEffect,
    forwardRef,
    useImperativeHandle,
} from 'react';
import { useDropzone } from 'react-dropzone';
import { MdDeleteOutline } from 'react-icons/md';
import { Progressbar, Loader, Text } from 'rizzui';
import { siteConfig } from '@/config/site.config';
import { BsCloudUpload } from 'react-icons/bs';
import { IoTrashBinOutline } from 'react-icons/io5';
import { socketService } from '@/utils/socketService';

interface FilePageUploaderProps {
    projectId: string;
    onUploadComplete?: (files: any[]) => void;
    onChange?: (files: any[]) => void;
    files?: any[];
}

const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

const FilePageUploader = forwardRef(({ 
    projectId, 
    onUploadComplete, 
    onChange,
    files: propFiles
}: FilePageUploaderProps, ref) => {
    const [files, setFiles] = useState<any[]>(propFiles || []);
    const [uploadProgress, setUploadProgress] = useState<any>({});
    const [isUploading, setIsUploading] = useState(false);
    const [socketConnected, setSocketConnected] = useState(false);

    useEffect(() => {
        if (propFiles) {
            setFiles(propFiles);
        }
    }, [propFiles]);

    useEffect(() => {
        const socket = socketService.getSocket();
        if (socket) {
            socket.on('connect', () => {
                console.log('Socket connected');
                setSocketConnected(true);
            });
            
            socket.on('disconnect', () => {
                console.log('Socket disconnected');
                setSocketConnected(false);
            });

            socket.on('s3Progress', ({ progress, path }: { progress: number; path: string }) => {
                setUploadProgress((prev: any) => ({
                    ...prev,
                    [path]: progress,
                }));
            });

            return () => {
                socket.off('connect');
                socket.off('disconnect');
                socket.off('s3Progress');
            };
        }
        
        return () => {};
    }, []);

    useImperativeHandle(ref, () => ({
        uploadNow: async () => {
            if (files.length === 0) {
                throw new Error('No files to upload');
            }
            
            setIsUploading(true);
            
            try {
                const uploadPromises = files.map(async (file) => {
                    setUploadProgress((prev: any) => ({
                        ...prev,
                        [file.filename]: 0,
                    }));
                    
                    for (let progress = 5; progress <= 95; progress += 5) {
                        setUploadProgress((prev: any) => ({
                            ...prev,
                            [file.filename]: progress,
                        }));
                        await new Promise(resolve => setTimeout(resolve, 100));
                    }
                    
                    setUploadProgress((prev: any) => ({
                        ...prev,
                        [file.filename]: 100,
                    }));
                });
                
                await Promise.all(uploadPromises);
                
                await new Promise(resolve => setTimeout(resolve, 500));
                
                if (onUploadComplete) {
                    onUploadComplete(files);
                }
                
                return files;
            } catch (error) {
                console.error('Upload failed:', error);
                throw error;
            } finally {
                
                setTimeout(() => {
                    setIsUploading(false);
                }, 300);
            }
        },
        getFiles: () => files,
    }));

    const onDropAccepted = useCallback((acceptedFiles: File[]) => {
      
        const imageFiles = acceptedFiles.filter(file => 
            file.type.startsWith('image/')
        );
        
        if (imageFiles.length > 0) {
         
            const file = imageFiles[0];
            const previewURL = URL.createObjectURL(file);
            const newFile = {
                _id: previewURL,
                filename: file.name,
                path: previewURL,
                preview: previewURL,
                raw: file,
                size: file.size,
                type: file.type,
                lastModified: file.lastModified
            };
            
            const newFiles = [newFile];
            setFiles(newFiles);
            
            if (onChange) {
                onChange(newFiles);
            }
        }
    }, [onChange]);

    const { getRootProps, getInputProps, fileRejections, isDragActive } = useDropzone({
        onDropAccepted,
        accept: {
            'image/jpeg': [],
            'image/png': [],
            'image/gif': [],
            'image/webp': [],
        },
        multiple: false,
        maxFiles: 1,
    });

    const removeFile = () => {
        setFiles([]);
        if (onChange) {
            onChange([]);
        }
    };

    if (files.length > 0) {
        const file = files[0];
        
        return (
            <div className="">
                <div className="relative h-44 w-88 mx-auto my-2 rounded-lg mb-2 overflow-hidden border border-gray-200 dark:border-greenPrimary-100 bg-white dark:bg-greenPrimary-secodarydark">
                    <div className="h-full w-full">
                        <img 
                            src={file.preview || file.path} 
                            alt={file.filename}
                            className="object-cover w-full h-full rounded-lg"
                        />
                    </div>
   
                    {isUploading && (
                        <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center p-4">
                            <Loader size="md" className="text-yellow-primary animate-spin mb-2" />
                            <div className="w-full max-w-xs">
                                <Progressbar
                                    value={uploadProgress[file.filename] || 0}
                                    size="md"
                                    variant="solid"
                                    className="h-2 bg-gray-700"
                                    color={uploadProgress[file.filename] === 100 ? "success" : "primary"}
                                />
                                <div className="flex justify-between mt-2">
                                    <span className="text-sm text-white font-medium">
                                        {uploadProgress[file.filename] || 0}%
                                    </span>
                                    <span className="text-sm text-yellow-primary animate-pulse">
                                        Uploading...
                                    </span>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
                    
                <div className="bg-lightgray-primary flex justify-between gap-2 dark:bg-greenPrimary-200 p-4 rounded-lg shadow-md">
                        <div className="dark:text-white text-greenPrimary-700 text-sm font-medium truncate">
                            {file.filename}
                            <Text className="text-xs mt-2 text-gray-500 dark:text-gray-400">
                                {formatFileSize(file.size)}
                            </Text>
                        </div>
                       
                            <button
                                onClick={removeFile}
                                disabled={isUploading}
                                className="bg-red-500 hover:bg-red-600  text-white p-1.5 px-3 rounded-md transition-colors"
                                title="Remove image"
                            >
                                <MdDeleteOutline size={18} />
                            </button>
                       
                    </div>
            </div>
        );
    }

    return (
        <div className="">
            <div
                {...getRootProps()}
                className={`border-2 border-dashed cursor-pointer dark:border-greenPrimary-100 flex flex-col items-center justify-center rounded-lg p-6`}>
                <input {...getInputProps()} />
                <BsCloudUpload size={50} className="text-yellow-primary mb-3" />
                <p className="font-medium text-greenPrimary-700 dark:text-gray-100">
                    <span className='text-yellow-primary'>Drop your image here or click to browse </span>
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">JPEG, PNG, GIF, WebP (Max 1 image)</p>
            </div>

            {fileRejections.length > 0 && (
                <div className="mt-2 text-red-500 text-xs p-2 bg-red-50 dark:bg-red-900/20 rounded border border-red-200 dark:border-red-700">
                    <p>Invalid file: Only image files are allowed.</p>
                </div>
            )}
        </div>
    );
});

FilePageUploader.displayName = 'FilePageUploader';

export default FilePageUploader;
