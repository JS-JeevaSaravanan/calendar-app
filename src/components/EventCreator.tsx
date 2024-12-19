import React, { useState, useEffect } from 'react';
import { SlotInfo } from 'react-big-calendar';
import { IEvent } from '../store/useEventListStore.ts';
import { compressImage, getDefaultImage } from '../utils/imageUtils.ts';
import { colorOptions } from '../constants/colorOptions.ts';
import InputField from './EventCreator/InputField.tsx';
import TextareaField from './EventCreator/TextAreaField.tsx';
import DateTimeField from './EventCreator/DateTimeField.tsx';
import ColorPicker from './EventCreator/ColorPicker.tsx';
import ImageUpload from './EventCreator/ImageUpload.tsx'; // Import the new component

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
  const [imageBase64, setImageBase64] = useState<string | null>(null);

  useEffect(() => {
    if (selectedEvent) {
      setTitle(selectedEvent.title);
      setDescription(selectedEvent.description);
      setFrom(selectedEvent.start);
      setTo(selectedEvent.end);
      setColor(selectedEvent.color);

      if (selectedEvent.image) {
        setImageBase64(selectedEvent.image);
        setImage(null);
      } else {
        setImage(null);
      }
    } else if (selectedTime) {
      setFrom(selectedTime.start);
      setTo(selectedTime.end);
    }
  }, [selectedEvent, selectedTime]);

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
      image: compressedImage || (imageBase64 ? imageBase64 : getDefaultImage()), // use base64 if available
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
    setImageBase64(null); // Clear base64 image
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-xl shadow-md w-80 p-4 max-h-[90vh] overflow-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-gray-800">
            {selectedEvent ? 'Edit Event' : 'Create New Event'}
          </h2>
          <button
            className="text-lg font-bold text-gray-600 hover:text-gray-800"
            onClick={onClose}
          >
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
          <ColorPicker color={color} setColor={setColor} />

          <ImageUpload
            imageBase64={imageBase64}
            image={image}
            setImage={setImage}
            setImageBase64={setImageBase64}
          />

          <div className="mt-4">
            <button
              type="submit"
              className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
            >
              {selectedEvent ? 'Save Changes' : 'Create Event'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EventCreator;
