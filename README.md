# Windows 10 Web OS

A web-based operating system inspired by Windows 10, built with Next.js, React, and TypeScript.

## Features

- **Windows 10-Style Interface**: Dark gray background with a taskbar at the bottom.
- **Window Management**:
  - Draggable windows
  - Resizable windows
  - Window layering (active windows appear in front)
  - Minimize, maximize, and close functionality
- **Start Menu**: Click the Windows icon to open a start menu with app shortcuts.
- **ResCueX Application**: Emergency response system application with:
  - Live location tracking
  - Emergency call logs
  - Message alerts
  - Status indicators

## Technologies Used

- **Next.js**: React framework for server-rendered applications
- **TypeScript**: Type-safe JavaScript
- **React**: UI library
- **Tailwind CSS**: Utility-first CSS framework
- **Framer Motion**: Animation library
- **React Draggable**: For window dragging functionality
- **React Resizable**: For window resizing functionality
- **React Icons**: Icon library

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the development server:
   ```bash
   npm run dev
   ```
4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Usage

- Click the Windows icon in the taskbar to open the Start menu
- Click on "ResCueX" to open the emergency response application
- Drag windows by their title bars
- Resize windows by dragging the bottom-right corner
- Use the window controls (minimize, maximize, close) in the top-right of each window

## License

MIT
