import React from 'react';

interface ImageUploadProps {
  imageBase64: string | null;
  image: File | null;
  setImage: React.Dispatch<React.SetStateAction<File | null>>;
  setImageBase64: React.Dispatch<React.SetStateAction<string | null>>;
}

const ImageUpload: React.FC<ImageUploadProps> = ({
  imageBase64,
  image,
  setImage,
  setImageBase64,
}) => {
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const base64 = await toBase64(file);
      setImageBase64(base64);
      setImage(file);
    }
  };

  const toBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    document.getElementById('image')?.click();
  };

  return (
    <div className="mb-4">
      <label
        htmlFor="image"
        className="block text-sm font-medium text-gray-700"
      >
        Upload Image
      </label>
      <div className="relative">
        <input
          id="image"
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="hidden"
        />
        <button
          type="button"
          className="w-full bg-gray-100 border border-gray-300 rounded-md py-1 text-gray-600 text-sm flex justify-center items-center"
          onClick={handleClick}
          aria-label="Upload event image"
        >
          {imageBase64 ? (
            <>
              <img
                src={imageBase64}
                alt="Event Image"
                className="w-full h-20 object-cover rounded-md"
              />
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setImageBase64(null);
                  setImage(null);
                }}
                className="absolute top-0 right-0 p-1 text-red-600"
                aria-label="Remove image"
              >
                X
              </button>
            </>
          ) : image ? (
            <>
              <img
                src={URL.createObjectURL(image)}
                alt="Event Image"
                className="w-full h-20 object-cover rounded-md"
              />
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setImage(null);
                }}
                className="absolute top-0 right-0 p-1 text-red-600"
                aria-label="Remove image"
              >
                X
              </button>
            </>
          ) : (
            <span className="text-xs">Choose an image</span>
          )}
        </button>
      </div>
    </div>
  );
};

export default ImageUpload;
