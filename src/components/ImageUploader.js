import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload } from 'lucide-react';

const ImageUploader = ({ onUpload }) => {
    const onDrop = useCallback(acceptedFiles => {
        // Extend file objects with preview preview
        const mappedFiles = acceptedFiles.map(file => Object.assign(file, {
            preview: URL.createObjectURL(file)
        }));
        onUpload(mappedFiles);
    }, [onUpload]);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: {
            'image/*': ['.jpeg', '.jpg', '.png']
        }
    });

    return (
        <div
            {...getRootProps()}
            className={`p-10 border-2 border-dashed rounded-lg cursor-pointer transition-colors
        ${isDragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-blue-400 hover:bg-gray-50'}`}
        >
            <input {...getInputProps()} />
            <div className="flex flex-col items-center justify-center text-gray-500">
                <Upload className="w-12 h-12 mb-4 text-gray-400" />
                {isDragActive ? (
                    <p className="text-lg font-medium text-blue-500">Drop the images here...</p>
                ) : (
                    <>
                        <p className="text-lg font-medium">Drag & drop images here, or click to select files</p>
                        <p className="text-sm mt-2">Supports JPG, PNG</p>
                    </>
                )}
            </div>
        </div>
    );
};

export default ImageUploader;
