'use client';

import React, { useRef, useEffect, useState } from 'react';

interface MiniWindowProps {
  id: string;
  title: string;
  isMinimized: boolean;
  position: { x: number; y: number };
  width: number;
  height: number;
  onClose: (id: string) => void;
  onMinimize: (id: string) => void;
  isActive?: boolean;
  onActivate?: () => void;
  children: React.ReactNode;
}

const MiniWindow: React.FC<MiniWindowProps> = ({
  id,
  title,
  isMinimized,
  position,
  width,
  height,
  onClose,
  onMinimize,
  isActive = false,
  onActivate,
  children
}) => {
  const windowRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [currentPosition, setCurrentPosition] = useState(position);

  useEffect(() => {
    setCurrentPosition(position);
  }, [position]);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (headerRef.current && headerRef.current.contains(e.target as Node)) {
      setIsDragging(true);
      if (onActivate) onActivate();

      const rect = windowRef.current?.getBoundingClientRect();
      if (rect) {
        setDragOffset({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top
        });
      }
    }
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (isDragging && windowRef.current) {
      e.preventDefault();

      const newX = e.clientX - dragOffset.x;
      const newY = e.clientY - dragOffset.y;

      setCurrentPosition({ x: newX, y: newY });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    } else {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging]);

  if (isMinimized) return null;

  return (
    <div
      ref={windowRef}
      className={`mini-window ${isActive ? 'active' : ''}`}
      style={{
        width: `${width}px`,
        height: `${height}px`,
        left: `${currentPosition.x}px`,
        top: `${currentPosition.y}px`,
        zIndex: isActive ? 100 : 10
      }}
      onMouseDown={(e) => {
        handleMouseDown(e);
        if (onActivate) onActivate();
      }}
    >
      <div ref={headerRef} className="mini-window-header">
        <div className="mini-window-title">{title}</div>
        <div className="mini-window-controls">
          <button 
            className="mini-window-control minimize" 
            onClick={(e) => {
              e.stopPropagation();
              onMinimize(id);
            }}
            aria-label="Minimize"
          >
            &#x2012;
          </button>
          <button 
            className="mini-window-control maximize" 
            onClick={(e) => e.stopPropagation()}
            aria-label="Maximize"
          >
            &#x25A1;
          </button>
          <button 
            className="mini-window-control close" 
            onClick={(e) => {
              e.stopPropagation();
              onClose(id);
            }}
            aria-label="Close"
          >
            &#x2715;
          </button>
        </div>
      </div>
      <div className="mini-window-content">
        {children}
      </div>
    </div>
  );
};

export default MiniWindow;