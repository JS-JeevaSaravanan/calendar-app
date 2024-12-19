import React from 'react';

interface ImageUploadProps {
  image: File | null;
  onImageUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  setImage: React.Dispatch<React.SetStateAction<File | null>>;
}

const ImageUpload: React.FC<ImageUploadProps> = ({
  image,
  onImageUpload,
  setImage,
}) => (
  <div className="mb-4">
    <label htmlFor="image" className="block text-sm font-medium text-gray-700">
      Upload Image
    </label>
    <div className="relative">
      <input
        id="image"
        type="file"
        accept="image/*"
        onChange={onImageUpload}
        className="hidden"
      />
      <button
        type="button"
        className="w-full bg-gray-200 border border-gray-300 rounded-md py-3 text-gray-700 text-sm flex justify-center items-center"
        onClick={() => document.getElementById('image')?.click()}
        aria-label="Upload event image"
      >
        {image ? (
          <>
            <img
              src={URL.createObjectURL(image)}
              alt="Event Image"
              className="w-full h-24 object-cover rounded-md"
            />
            <button
              type="button"
              onClick={() => setImage(null)}
              className="absolute top-0 right-0 p-2 text-red-600"
              aria-label="Remove image"
            >
              X
            </button>
          </>
        ) : (
          <span>Choose an image</span>
        )}
      </button>
    </div>
  </div>
);

export default ImageUpload;
