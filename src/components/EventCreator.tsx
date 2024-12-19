import React, { useState } from 'react';
import { SlotInfo } from 'react-big-calendar';
import { IEvent } from '../store/useEventListStore';

interface EventCreatorProps {
  onClose: () => void;
  open: boolean;
  onCreate: (event: IEvent) => void;
  selectedTime: SlotInfo;
}

const EventCreator: React.FC<EventCreatorProps> = ({
  onClose,
  open,
  onCreate,
  selectedTime,
}) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [from, setFrom] = useState(selectedTime.start);
  const [to, setTo] = useState(selectedTime.end);
  const [color, setColor] = useState('#ffffff');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title || !description || !from || !to || !color) {
      alert('Please fill in all fields.');
      return;
    }

    const newEvent: IEvent = {
      id: Date.now(),
      title,
      description,
      start: from,
      end: to,
      color,
    };

    onCreate(newEvent);
    setTitle('');
    setDescription('');
    setFrom(selectedTime.start);
    setTo(selectedTime.end);
    setColor('#ffffff');
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-96 p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Create New Event</h2>
          <button className="text-xl font-bold" onClick={onClose}>
            X
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-700"
            >
              Event Title
            </label>
            <input
              id="title"
              type="text"
              placeholder="Enter event title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700"
            >
              Description
            </label>
            <textarea
              id="description"
              placeholder="Enter event description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="start"
              className="block text-sm font-medium text-gray-700"
            >
              Start Time
            </label>
            <input
              id="start"
              type="datetime-local"
              value={from.toISOString().slice(0, 16)}
              onChange={(e) => setFrom(new Date(e.target.value))}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="end"
              className="block text-sm font-medium text-gray-700"
            >
              End Time
            </label>
            <input
              id="end"
              type="datetime-local"
              value={to.toISOString().slice(0, 16)}
              onChange={(e) => setTo(new Date(e.target.value))}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="color"
              className="block text-sm font-medium text-gray-700"
            >
              Color
            </label>
            <input
              id="color"
              type="color"
              value={color}
              onChange={(e) => setColor(e.target.value)}
              className="mt-1 block w-full"
              required
            />
          </div>

          <div className="mt-6">
            <button
              type="submit"
              className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              Create Event
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EventCreator;
