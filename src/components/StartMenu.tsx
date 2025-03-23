'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useSystem } from '@/context/SystemContext';

const StartMenu: React.FC = () => {
  const { state, dispatch } = useSystem();
  const { apps } = state;

  // Handle app click
  const handleAppClick = (id: string) => {
    dispatch({ type: 'OPEN_APP', payload: { id } });
  };

  return (
    <motion.div
      className="start-menu"
      initial={{ opacity: 0, scale: 0.95, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95, y: 20 }}
      transition={{ duration: 0.1 }}
    >
      <div className="start-menu-header">
        All Apps
      </div>
      
      <div className="app-list">
        {apps.map((app) => (
          <div
            key={app.id}
            className="app-item"
            onClick={() => handleAppClick(app.id)}
          >
            <div className="app-icon">{app.icon}</div>
            <div className="app-name">{app.name}</div>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default StartMenu; 