Here's an updated version of your `README.md` with a cleaner structure, removing the license section, and focusing on the key details for deployment and usage:

---

# Calendar App with Event Management

A **Calendar App** built with **React**, **TypeScript**, and **React Big Calendar**. It allows users to view, create, and manage events, with events stored globally and displayed in various calendar views.

## Features

- **Event Creation**: Select time slots to create events with title, description, and color.
- **Multiple Views**: Supports Day, Week, and Month calendar views.
- **Responsive UI**: Designed to work across different screen sizes.
- **State Management**: Global state management using Zustand for event storage.

## Tech Stack

- **React**
- **TypeScript**
- **React Big Calendar**
- **Date-fns**
- **Tailwind CSS**

## Getting Started

### Prerequisites

- Node.js and npm/yarn installed.

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/JS-JeevaSaravanan/calendar-app.git
   cd calendar-app
   ```

2. Install dependencies:

   ```bash
   npm install
   # or
   yarn install
   ```

3. Start the development server:

   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. Open your browser and navigate to `http://localhost:3000`.

## How It Works

### Calendar Component

The `CalendarSection` component renders the calendar UI using `react-big-calendar`. Users can create new events by selecting a time slot, which opens a modal (`EventCreator`) to input event details.

### Event Management

Events are managed using the custom store `useEventListStore`. You can add, update, and delete events, with changes automatically reflected on the calendar.

### Event Creation

The `EventCreator` modal allows users to input event details, including title, description, time, and color. Upon submission, the event is added to the global state and rendered on the calendar.

### Event Styling

Each event is styled using a custom color, which can be selected during event creation. The color is applied as the event's background color.

## Folder Structure

```
src/
│
├── components/
│   ├── CalendarSection.tsx   # Calendar UI and event handling
│   ├── EventCreator.tsx      # Modal for creating/editing events
│
├── store/
│   └── useEventListStore.ts  # Global state for managing events
│
├── App.tsx                   # Main app component
├── index.tsx                 # Entry point for React
└── tailwind.config.js        # Tailwind CSS configuration
```

## Deploying to GitHub Pages

Follow these steps to deploy your app to **GitHub Pages**:

### Step 1: Install `gh-pages`

Install the `gh-pages` package:

```bash
npm install gh-pages --save-dev
```

### Step 2: Update `package.json`

1. Add a `homepage` field to specify where the app will be hosted:

   ```json
   "homepage": "https://JS-JeevaSaravanan.github.io/calendar-app"
   ```

2. Add the `predeploy` and `deploy` scripts:

   ```json
   "scripts": {
     "dev": "vite",
     "build": "tsc -b && vite build",
     "predeploy": "vite build",
     "deploy": "gh-pages -d dist"
   }

   ```

### Step 3: Build and Deploy

1. Build your app:

   ```bash
   npm run build
   ```

2. Deploy the app:

   ```bash

   npm run deploy
   ```

### Step 4: Access Your App

After deployment, your app will be available at:

```
https://JS-JeevaSaravanan.github.io/calendar-app
```

## Contributing

1. Fork this repository.
2. Create a new branch for your feature/fix.
3. Make changes and commit them.
4. Push to your fork and create a pull request.
