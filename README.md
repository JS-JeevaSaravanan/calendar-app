## App live at : https://js-jeevasaravanan.github.io/calendar-app


![image](https://github.com/user-attachments/assets/399e0482-c972-4571-8820-ccd5ad7c2f01)

![image](https://github.com/user-attachments/assets/407eddb7-5332-40fb-b5f9-8e58e6378690)


# Event Calendar App

This is a React-based Event Calendar application where users can create events with details such as title, description, start and end times, color, and an image. The app includes validation for event details, supports image upload with compression, and has a responsive UI built using Tailwind CSS.

## Features

- **Create Event**: Allows users to input event details including title, description, start/end times.
- **Time Validation**: Ensures the end time is after the start time.
- **Image Upload**: Supports image upload with compression to optimize file size.
- **Color Picker**: Users can choose an event color from a set of predefined options.
- **Responsive UI**: Built using Tailwind CSS for a mobile-friendly design.
- **Event Creation Callback**: The created event data is passed to a parent component via a callback function (`onCreate`).

## Tech Stack

- **React** (v18+)
- **TypeScript**
- **Tailwind CSS**
- **react-big-calendar** (for calendar UI)
- **Image compression** (using `browser-image-compression`)

## Installation

Clone the repository and install dependencies:

```bash
git clone https://github.com/JS-JeevaSaravanan/calendar-app.git
cd calendar-app
npm install
```

## Available Scripts

In the project directory, you can run the following commands:

### `npm run dev`

Starts the development server.

```bash
npm run dev
```

### `npm run build`

Builds the app for production, including TypeScript compilation and Vite build process.

```bash
npm run build
```

### `npm run preview`

Preview the production build locally.

```bash
npm run preview
```

### `npm run lint`

Run ESLint to check for code issues.

```bash
npm run lint
```

### `npm run format`

Automatically format the code using Prettier.

```bash
npm run format
```

### `npm run deploy`

Builds and deploys the app to GitHub Pages.

```bash
npm run deploy
```

## Conclusion

This Event Calendar App allows users to easily create and manage events, with features for time validation, color selection, and image upload. It is built using modern web technologies such as React, TypeScript, and Tailwind CSS, ensuring a smooth and responsive user experience.


