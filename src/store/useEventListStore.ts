import { create } from 'zustand';

type Event = {
  id: number;
  title: string;
  description: string;
  start: Date;
  end: Date;
  color: string;
};

type EventListStore = {
  events: Event[];
  addEvent: (event: Event) => void;
  deleteEvent: (id: number) => void;
  updateEvent: (id: number, updatedData: Partial<Event>) => void;
};

const getStoredEvents = (): Event[] => {
  try {
    const storedEvents = localStorage.getItem('events');
    if (storedEvents) {
      const parsedEvents: Event[] = JSON.parse(storedEvents); // Specify Event type here
      return parsedEvents.map((event) => ({
        ...event,
        start: new Date(event.start),
        end: new Date(event.end),
      }));
    }
  } catch (error) {
    console.error('Error reading events from localStorage:', error);
  }
  return [];
};

const setStoredEvents = (events: Event[]) => {
  try {
    localStorage.setItem('events', JSON.stringify(events));
  } catch (error) {
    console.error('Error saving events to localStorage:', error);
  }
};

const useEventListStore = create<EventListStore>((set) => ({
  events: getStoredEvents(),

  addEvent: (event) =>
    set((state) => {
      const updatedEvents = [...state.events, event];
      setStoredEvents(updatedEvents);
      return { events: updatedEvents };
    }),

  deleteEvent: (id) =>
    set((state) => {
      const updatedEvents = state.events.filter((event) => event.id !== id);
      setStoredEvents(updatedEvents);
      return { events: updatedEvents };
    }),

  updateEvent: (id, updatedData) =>
    set((state) => {
      const updatedEvents = state.events.map((event) =>
        event.id === id ? { ...event, ...updatedData } : event,
      );
      setStoredEvents(updatedEvents);
      return { events: updatedEvents };
    }),
}));

export default useEventListStore;
