import React, { useState, useEffect } from 'react';
import { SlotInfo } from 'react-big-calendar';
import { IEvent } from '../store/useEventListStore.ts';
import { compressImage, getDefaultImage } from '../utils/imageUtils.ts';
import { colorOptions } from '../constants/colorOptions.ts';

interface EventCreatorProps {
  onClose: () => void;
  open: boolean;
  onSave: (event: IEvent) => void;
  selectedTime: SlotInfo | null;
  selectedEvent: IEvent | null;
}

const EventCreator: React.FC<EventCreatorProps> = ({
  onClose,
  open,
  onSave,
  selectedTime,
  selectedEvent,
}) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [from, setFrom] = useState<Date>(new Date());
  const [to, setTo] = useState<Date>(new Date());
  const [color, setColor] = useState(colorOptions[0]);
  const [image, setImage] = useState<File | null>(null);

  useEffect(() => {
    if (selectedEvent) {
      setTitle(selectedEvent.title);
      setDescription(selectedEvent.description);
      setFrom(selectedEvent.start);
      setTo(selectedEvent.end);
      setColor(selectedEvent.color);
    } else if (selectedTime) {
      setFrom(selectedTime.start);
      setTo(selectedTime.end);
    }
  }, [selectedEvent, selectedTime]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setImage(file);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title || !description || !from || !to || !color) {
      alert('Please fill in all fields.');
      return;
    }

    if (from >= to) {
      alert('End time must be later than start time.');
      return;
    }

    const compressedImage = image ? await compressImage(image) : null;

    const event: IEvent = {
      id: selectedEvent ? selectedEvent.id : Date.now().toString(),
      title,
      description,
      start: from,
      end: to,
      color,
      image: compressedImage || getDefaultImage(),
      isActive: true,
    };

    onSave(event);
    resetForm();
  };

  const resetForm = () => {
    setTitle('');
    setDescription('');
    setFrom(new Date());
    setTo(new Date());
    setColor(colorOptions[0]);
    setImage(null);
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-96 p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">
            {selectedEvent ? 'Edit Event' : 'Create New Event'}
          </h2>
          <button className="text-xl font-bold" onClick={onClose}>
            X
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <InputField
            id="title"
            label="Event Title"
            value={title}
            setValue={setTitle}
          />
          <TextareaField
            id="description"
            label="Description"
            value={description}
            setValue={setDescription}
          />
          <DateTimeField
            id="start"
            label="Start Time"
            value={from}
            setValue={setFrom}
          />
          <DateTimeField
            id="end"
            label="End Time"
            value={to}
            setValue={setTo}
          />

          <div className="mb-4">
            <label
              htmlFor="color"
              className="block text-sm font-medium text-gray-700"
            >
              Color
            </label>
            <div className="flex space-x-2">
              {colorOptions.map((option, index) => (
                <button
                  key={index}
                  type="button"
                  style={{ backgroundColor: option }}
                  onClick={() => setColor(option)}
                  className={`w-8 h-8 rounded-full border-2 border-white ${color === option ? 'ring-2 ring-indigo-500' : ''}`}
                />
              ))}
            </div>
          </div>

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

          <div className="mt-6">
            <button
              type="submit"
              className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              {selectedEvent ? 'Save Changes' : 'Create Event'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const InputField = ({
  id,
  label,
  value,
  setValue,
}: {
  id: string;
  label: string;
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
}) => (
  <div className="mb-4">
    <label htmlFor={id} className="block text-sm font-medium text-gray-700">
      {label}
    </label>
    <input
      id={id}
      type="text"
      placeholder={`Enter ${label.toLowerCase()}`}
      value={value}
      onChange={(e) => setValue(e.target.value)}
      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
      required
    />
  </div>
);

const TextareaField = ({
  id,
  label,
  value,
  setValue,
}: {
  id: string;
  label: string;
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
}) => (
  <div className="mb-4">
    <label htmlFor={id} className="block text-sm font-medium text-gray-700">
      {label}
    </label>
    <textarea
      id={id}
      placeholder={`Enter ${label.toLowerCase()}`}
      value={value}
      onChange={(e) => setValue(e.target.value)}
      rows={3}
      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
      required
    />
  </div>
);

const DateTimeField = ({
  id,
  label,
  value,
  setValue,
}: {
  id: string;
  label: string;
  value: Date;
  setValue: React.Dispatch<React.SetStateAction<Date>>;
}) => (
  <div className="mb-4">
    <label htmlFor={id} className="block text-sm font-medium text-gray-700">
      {label}
    </label>
    <input
      id={id}
      type="datetime-local"
      value={value.toISOString().slice(0, 16)}
      onChange={(e) => setValue(new Date(e.target.value))}
      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
      required
    />
  </div>
);

export default EventCreator;
