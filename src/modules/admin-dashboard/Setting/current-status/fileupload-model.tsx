'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Modal, Button, Badge } from 'rizzui';
import FilePageUploader from './upload';
import { BsUpload } from 'react-icons/bs';
import { MdClose } from 'react-icons/md';

interface FileUploadModalProps {
  projectId: any;
  onUploadComplete?: (fileUrl: string) => void;
  isOpen?: boolean;
  onClose?: () => void;
}

const FileUploadModal: React.FC<FileUploadModalProps> = ({
  onUploadComplete, 
  projectId,
  isOpen = true,
  onClose
}) => {
    const [loading, setLoading] = useState(false);
    const uploaderRef = useRef<any>();
    const [files, setFiles] = useState<any[]>([]); 
    const [error, setError] = useState<string | null>(null);

    const handleClose = () => {
        if (!loading && onClose) {
            onClose();
        }
    };

    const handleFileChange = (newFiles: any[]) => {
        setFiles(newFiles);
        setError(null);
    };

    const handleUpload = async () => {
        if (files.length === 0) {
            setError('Please select an image to upload');
            return;
        }

        setError(null);
        setLoading(true);
        
        try {
            await uploaderRef.current?.uploadNow();
            if (onUploadComplete && files[0]?.preview) {
                onUploadComplete(files[0].preview || files[0].path);
            }
            setLoading(false);
            handleClose();
        } catch (error) {
            console.error('Upload error:', error);
            setError('Failed to upload image. Please try again.');
            setLoading(false);
        }
    };

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape' && !loading) {
                handleClose();
            }
        };
        
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [loading]);

    return (
        <>
            <Modal 
                isOpen={isOpen} 
                onClose={handleClose} 
                size="md"
                className="p-0 overflow-hidden"
            >
                <div className="dark:bg-greenPrimary-300 p-6 bg-white rounded-lg shadow-lg overflow-hidden">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <h2 className="text-lg font-semibold">Upload Logo</h2>
                          
                        </div>
                        <button 
                            onClick={handleClose}
                            disabled={loading}
                            className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors disabled:opacity-50"
                            aria-label="Close"
                        >
                            <MdClose size={20} />
                        </button>
                    </div>
                    
                    <div className="my-4">
                        <FilePageUploader
                            ref={uploaderRef}
                            projectId={projectId}
                            onChange={handleFileChange}
                            files={files}
                        />

                      
                    </div>
                    
                    <div className="flex justify-end gap-3 ">
                       
                        <Button 
                            onClick={handleUpload} 
                            disabled={loading || files.length === 0} 
                            isLoading={loading}
                            className="!bg-yellow-primary  text-greenPrimary-secodarydark  hover:opacity-90 flex items-center gap-2"
                        >
                            {!loading && <BsUpload size={16} />}
                            {loading ? 'Uploading...' : 'Upload'}
                        </Button>
                    </div>
                </div>
            </Modal>
        </>
    );
};

export default FileUploadModal;
