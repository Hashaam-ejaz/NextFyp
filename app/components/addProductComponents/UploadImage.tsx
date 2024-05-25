import React, { useState } from 'react';

const ImageUpload: React.FC<{ onUpload: (files: FileList | null, index: number) => void, index: number }> = ({ onUpload, index }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [imageSrc, setImageSrc] = useState<string | null>(null);

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    onUpload(e.dataTransfer.files, index);
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.result && typeof reader.result === 'string') {
          setImageSrc(reader.result);
        }
      };

      reader.readAsDataURL(file);

      onUpload(e.target.files, index);
    }
  };

  return (
    <div
      className={`flex mx-3 items-center justify-center w-full h-35 border-2 border-gray-300 border-dashed rounded-sm cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600 ${isDragging ? 'border-blue-500' : ''}`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <label htmlFor={`image-upload-${index}`} className="flex flex-col items-center justify-center w-full">
        <div className="flex flex-col items-center justify-center pt-5 pb-6">
          {imageSrc ? (
            <img src={imageSrc} alt="Uploaded" className="w-full h-full object-contain" />
          ) : (
            <>
              <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
              </svg>
              <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">Upload Image </p>
            </>
          )}
        </div>
        <input id={`image-upload-${index}`} type="file" className="hidden" onChange={handleFileInputChange} multiple />
      </label>
    </div>
  );
};

export default ImageUpload;
