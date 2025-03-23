'use client';

import React from 'react';
import { useSystem } from '@/context/SystemContext';
import Window from './Window';

const Desktop: React.FC = () => {
  const { state, dispatch } = useSystem();
  const { windows, isStartMenuOpen } = state;

  // Close start menu when clicking on desktop
  const handleDesktopClick = () => {
    if (isStartMenuOpen) {
      dispatch({ type: 'TOGGLE_START_MENU' });
    }
  };

  return (
    <div className="desktop" onClick={handleDesktopClick}>
      {windows.map((window) => (
        <Window key={window.id} window={window} />
      ))}
    </div>
  );
};

export default Desktop; 