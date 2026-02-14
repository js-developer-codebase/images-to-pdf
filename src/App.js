import React, { useState } from 'react';
import ImageUploader from './components/ImageUploader';
import ImagePreview from './components/ImagePreview';
import { generatePDF } from './utils/pdfGenerator';
import { FileText, Settings, Download } from 'lucide-react';

function App() {
  const [files, setFiles] = useState([]);
  const [pageSize, setPageSize] = useState('auto');
  const [isGenerating, setIsGenerating] = useState(false);

  const handleUpload = (newFiles) => {
    setFiles(prev => [...prev, ...newFiles]);
  };

  const handleRemove = (index) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleMove = (index, direction) => {
    const newFiles = [...files];
    const targetIndex = index + direction;
    if (targetIndex >= 0 && targetIndex < newFiles.length) {
      [newFiles[index], newFiles[targetIndex]] = [newFiles[targetIndex], newFiles[index]];
      setFiles(newFiles);
    }
  };

  const handleGeneratePDF = async () => {
    if (files.length === 0) return;
    setIsGenerating(true);
    try {
      await generatePDF(files, pageSize);
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Failed to generate PDF. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 font-sans">
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FileText className="text-blue-600 w-8 h-8" />
            <h1 className="text-xl font-bold text-gray-900">Image into PDF</h1>
          </div>
          <div className="text-sm text-gray-500 hidden sm:block">
            Convert your images to PDF in seconds
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-8">
          {/* Controls & Upload Section */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

              {/* Left Column: Upload */}
              <div className="lg:col-span-2">
                <h2 className="text-lg font-semibold mb-4">Upload Images</h2>
                <ImageUploader onUpload={handleUpload} />
              </div>

              {/* Right Column: Settings & Action */}
              <div className="space-y-6">
                <div>
                  <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <Settings className="w-5 h-5" />
                    PDF Settings
                  </h2>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Page Size
                      </label>
                      <select
                        value={pageSize}
                        onChange={(e) => setPageSize(e.target.value)}
                        className="w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 px-3 py-2 border"
                      >
                        <option value="auto">Auto (Match Image Size)</option>
                        <option value="a4">A4 (Fit to Page)</option>
                        <option value="a3">A3 (Single Page)</option>
                      </select>
                      <p className="text-xs text-gray-500 mt-1">
                        {pageSize === 'auto' ? 'Pages will be created with the exact dimensions of each image.' : `Images will be scaled to fit exactly into ${pageSize.toUpperCase()} pages.`}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-100">
                  <button
                    onClick={handleGeneratePDF}
                    disabled={files.length === 0 || isGenerating}
                    className={`w-full py-3 px-4 rounded-lg flex items-center justify-center gap-2 font-medium transition-all shadow-sm
                            ${files.length === 0
                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                        : 'bg-blue-600 text-white hover:bg-blue-700 hover:shadow-md active:transform active:scale-95'
                      }`}
                  >
                    {isGenerating ? (
                      <span className="flex items-center gap-2">
                        <span className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></span>
                        Generating PDF...
                      </span>
                    ) : (
                      <>
                        <Download className="w-5 h-5" />
                        Convert to PDF
                      </>
                    )}
                  </button>
                  {files.length > 0 && (
                    <p className="text-center text-sm text-gray-500 mt-2">
                      {files.length} {files.length === 1 ? 'image' : 'images'} selected
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Preview Section */}
          {files.length > 0 && (
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold">Preview & Reorder</h2>
                <button
                  onClick={() => setFiles([])}
                  className="text-sm text-red-500 hover:text-red-700 hover:underline"
                >
                  Clear All
                </button>
              </div>
              <ImagePreview
                files={files}
                onRemove={handleRemove}
                onMove={handleMove}
              />
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default App;
