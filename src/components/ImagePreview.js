import React from 'react';
import { X, ArrowUp, ArrowDown } from 'lucide-react';

const ImagePreview = ({ files, onRemove, onMove }) => {
    if (files.length === 0) return null;

    return (
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {files.map((file, index) => (
                <div key={file.name + index} className="relative group bg-white p-2 rounded-lg shadow-sm border border-gray-200">
                    <div className="aspect-w-3 aspect-h-4 w-full overflow-hidden rounded-md bg-gray-200">
                        <img
                            src={file.preview}
                            alt={file.name}
                            className="object-contain w-full h-48"
                        />
                    </div>

                    <div className="absolute top-2 right-2 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                            onClick={() => onRemove(index)}
                            className="p-1 bg-red-500 text-white rounded-full hover:bg-red-600 shadow-md"
                            title="Remove"
                        >
                            <X size={16} />
                        </button>
                    </div>

                    <div className="absolute bottom-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                            onClick={() => onMove(index, -1)}
                            disabled={index === 0}
                            className={`p-1 rounded-full shadow-md ${index === 0 ? 'bg-gray-300 text-gray-500' : 'bg-white text-gray-700 hover:bg-gray-100'}`}
                            title="Move Up"
                        >
                            <ArrowUp size={16} />
                        </button>
                        <button
                            onClick={() => onMove(index, 1)}
                            disabled={index === files.length - 1}
                            className={`p-1 rounded-full shadow-md ${index === files.length - 1 ? 'bg-gray-300 text-gray-500' : 'bg-white text-gray-700 hover:bg-gray-100'}`}
                            title="Move Down"
                        >
                            <ArrowDown size={16} />
                        </button>
                    </div>

                    <div className="mt-2 text-xs text-gray-500 truncate px-1">
                        {file.name}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default ImagePreview;
