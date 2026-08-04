import React, { useState, useCallback } from 'react';
import Cropper from 'react-easy-crop';

// Helper to create the cropped image
const createImage = (url) =>
  new Promise((resolve, reject) => {
    const image = new Image();
    image.addEventListener('load', () => resolve(image));
    image.addEventListener('error', (error) => reject(error));
    image.setAttribute('crossOrigin', 'anonymous');
    image.src = url;
  });

export default function ImageCropperModal({ isOpen, onClose, imageSrc, onCropComplete, aspect = 4 / 3 }) {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

  const handleCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const getCroppedImg = async () => {
    try {
      const image = await createImage(imageSrc);
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');

      if (!ctx) return null;

      canvas.width = croppedAreaPixels.width;
      canvas.height = croppedAreaPixels.height;

      // 1. Draw the blurred background
      // Fill the entire canvas with the stretched, blurred original image
      ctx.filter = 'blur(15px) brightness(0.8)';
      ctx.drawImage(
        image,
        0,
        0,
        image.width,
        image.height,
        0,
        0,
        canvas.width,
        canvas.height
      );

      // Reset filter for the main image
      ctx.filter = 'none';

      // 2. Draw the actual image
      ctx.drawImage(
        image,
        croppedAreaPixels.x,
        croppedAreaPixels.y,
        croppedAreaPixels.width,
        croppedAreaPixels.height,
        0,
        0,
        croppedAreaPixels.width,
        croppedAreaPixels.height
      );

      // As Blob
      return new Promise((resolve) => {
        canvas.toBlob((file) => {
          if (file) {
            file.name = 'cropped.jpeg';
            resolve(file);
          }
        }, 'image/jpeg');
      });
    } catch (e) {
      console.error(e);
      return null;
    }
  };

  const saveCroppedImage = async () => {
    const croppedBlob = await getCroppedImg();
    if (croppedBlob) {
      // Create a File object from the blob
      const croppedFile = new File([croppedBlob], "cropped-image.jpg", { type: "image/jpeg" });
      
      // Also generate a preview URL to display in the UI
      const previewUrl = URL.createObjectURL(croppedBlob);
      
      onCropComplete(croppedFile, previewUrl);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl overflow-hidden">
        <div className="p-4 border-b border-gray-200 flex justify-between items-center">
          <h3 className="text-lg font-semibold text-gray-800">Crop Image</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-800 text-2xl leading-none">&times;</button>
        </div>
        
        <div className="relative h-96 w-full bg-gray-100">
          <Cropper
            image={imageSrc}
            crop={crop}
            zoom={zoom}
            aspect={aspect}
            minZoom={0.2}
            restrictPosition={false}
            onCropChange={setCrop}
            onCropComplete={handleCropComplete}
            onZoomChange={setZoom}
          />
        </div>
        
        <div className="p-4 border-t border-gray-200 bg-gray-50 flex flex-col gap-4">
          <div className="flex items-center gap-4">
            <span className="text-sm font-medium text-gray-600">Zoom:</span>
            <input
              type="range"
              value={zoom}
              min={0.2}
              max={3}
              step={0.1}
              aria-labelledby="Zoom"
              onChange={(e) => setZoom(Number(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
          </div>
          
          <div className="flex justify-end gap-3">
            <button 
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded text-gray-700 hover:bg-gray-100"
            >
              Cancel
            </button>
            <button 
              onClick={saveCroppedImage}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 font-medium"
            >
              Save Cropped Image
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
