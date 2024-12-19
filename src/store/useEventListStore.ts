import { create } from 'zustand';

export type IEvent = {
  id: string;
  title: string;
  description: string;
  start: Date;
  end: Date;
  color: string;
  image: string;
  isActive: boolean;
};

type EventListStore = {
  events: IEvent[];
  addEvent: (event: IEvent) => void;
  deleteEvent: (id: string) => void;
  updateEventStatus: (id: string) => void;
};

const getStoredEvents = (): IEvent[] => {
  try {
    const storedEvents = localStorage.getItem('events');
    if (storedEvents) {
      return JSON.parse(storedEvents).map((event: IEvent) => ({
        ...event,
        start: new Date(event.start),
        end: new Date(event.end),
      }));
    }
  } catch {
    return [];
  }
  return [];
};

const setStoredEvents = (events: IEvent[]) => {
  try {
    localStorage.setItem('events', JSON.stringify(events));
  } catch {
    console.error('Failed to store events');
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

  updateEventStatus: (id) =>
    set((state) => {
      const updatedEvents = state.events.map((event) =>
        event.id === id ? { ...event, isActive: !event.isActive } : event,
      );
      setStoredEvents(updatedEvents);
      return { events: updatedEvents };
    }),
}));

export default useEventListStore;
