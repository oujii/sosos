'use client';

import React, { useState, useEffect } from 'react';
import { FaWindows, FaVolumeUp, FaWifi, FaCog } from 'react-icons/fa';
import { useSystem } from '@/context/SystemContext';
import StartMenu from './StartMenu';

const Taskbar: React.FC = () => {
  const { state, dispatch } = useSystem();
  const { isStartMenuOpen, windows, openApps, apps } = state;
  const [time, setTime] = useState<string>('');
  const [date, setDate] = useState<string>('');

  // Update time and date
  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
      setDate(now.toLocaleDateString());
    };

    updateDateTime();
    const interval = setInterval(updateDateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Toggle start menu
  const handleStartClick = () => {
    dispatch({ type: 'TOGGLE_START_MENU' });
  };

  // Activate window when clicking on taskbar icon
  const handleTaskbarIconClick = (id: string) => {
    dispatch({ type: 'ACTIVATE_WINDOW', payload: { id } });
  };

  return (
    <>
      {isStartMenuOpen && <StartMenu />}
      <div className="taskbar">
        <div className="start-button" onClick={handleStartClick}>
          <FaWindows color="#0078d7" size={18} />
        </div>
        
        <div className="taskbar-icons">
          {openApps.map((appId) => {
            const app = apps.find(a => a.id === appId);
            const window = windows.find(w => w.id === appId);
            
            if (!app) return null;
            
            return (
              <div 
                key={appId}
                className={`taskbar-icon ${window && window.isActive ? 'active' : ''}`}
                onClick={() => handleTaskbarIconClick(appId)}
              >
                {app.icon}
              </div>
            );
          })}
        </div>
        
        <div className="taskbar-right">
          <div className="system-icons">
            <div className="system-icon">
              <FaVolumeUp size={14} />
            </div>
            <div className="system-icon">
              <FaWifi size={14} />
            </div>
            <div className="system-icon">
              <FaCog size={14} />
            </div>
          </div>
          
          <div className="clock">
            <div>{time}</div>
            <div className="text-xs">{date}</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Taskbar; 