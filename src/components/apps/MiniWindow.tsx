'use client';

import React, { useState, useEffect, useRef } from 'react';
import { FaWindowMinimize, FaTimes, FaWindowMaximize } from 'react-icons/fa';

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
  children,
}) => {
  const [windowPosition, setWindowPosition] = useState(position);
  const [windowSize, setWindowSize] = useState({ width, height });
  const [isDragging, setIsDragging] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [isMaximized, setIsMaximized] = useState(false);
  const windowRef = useRef<HTMLDivElement>(null);
  const previousSizeRef = useRef({ width, height, x: position.x, y: position.y });

  // Handle window activation
  const handleActivate = () => {
    if (onActivate) {
      onActivate();
    }
  };

  // Handle window drag
  const handleDragStart = (e: React.MouseEvent) => {
    if (isMaximized) return;
    e.preventDefault();
    setIsDragging(true);
    setDragStart({
      x: e.clientX - windowPosition.x,
      y: e.clientY - windowPosition.y
    });
    handleActivate();
  };

  const handleDragMove = (e: MouseEvent) => {
    if (!isDragging) return;

    const newX = e.clientX - dragStart.x;
    const newY = e.clientY - dragStart.y;

    // Optional: Add boundary constraints here if needed
    setWindowPosition({ x: newX, y: newY });
  };

  const handleDragEnd = () => {
    setIsDragging(false);
  };

  // Handle window resize
  const handleResizeStart = (e: React.MouseEvent) => {
    if (isMaximized) return;
    e.preventDefault();
    e.stopPropagation();
    setIsResizing(true);
    setDragStart({
      x: e.clientX,
      y: e.clientY
    });
  };

  const handleResizeMove = (e: MouseEvent) => {
    if (!isResizing) return;

    const deltaX = e.clientX - dragStart.x;
    const deltaY = e.clientY - dragStart.y;

    setWindowSize({
      width: Math.max(150, windowSize.width + deltaX),
      height: Math.max(100, windowSize.height + deltaY)
    });

    setDragStart({
      x: e.clientX,
      y: e.clientY
    });
  };

  const handleResizeEnd = () => {
    setIsResizing(false);
  };

  // Handle maximize/restore
  const handleMaximizeToggle = () => {
    if (isMaximized) {
      // Restore to previous size
      setWindowSize({
        width: previousSizeRef.current.width,
        height: previousSizeRef.current.height
      });
      setWindowPosition({
        x: previousSizeRef.current.x,
        y: previousSizeRef.current.y
      });
      setIsMaximized(false);
    } else {
      // Save current size and position
      previousSizeRef.current = {
        width: windowSize.width,
        height: windowSize.height,
        x: windowPosition.x,
        y: windowPosition.y
      };

      // Maximize to full content area
      const contentArea = document.querySelector('.win10-content');
      if (contentArea) {
        const rect = contentArea.getBoundingClientRect();
        setWindowSize({
          width: rect.width,
          height: rect.height
        });
        setWindowPosition({
          x: 0,
          y: 0
        });
      } else {
        // Fallback if content area not found
        setWindowSize({
          width: window.innerWidth,
          height: window.innerHeight - 100 // Approximate for taskbar
        });
        setWindowPosition({
          x: 0,
          y: 0
        });
      }
      setIsMaximized(true);
    }
  };

  // Add and remove event listeners
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        handleDragMove(e);
      } else if (isResizing) {
        handleResizeMove(e);
      }
    };

    const handleMouseUp = () => {
      if (isDragging) {
        handleDragEnd();
      } else if (isResizing) {
        handleResizeEnd();
      }
    };

    if (isDragging || isResizing) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, isResizing, windowSize, dragStart, windowPosition]);

  if (isMinimized) {
    return null;
  }

  return (
    <div
      ref={windowRef}
      className={`win10-window ${isDragging ? 'dragging' : ''} ${isResizing ? 'resizing' : ''} ${isMaximized ? 'maximized' : ''}`}
      style={{
        width: isMaximized ? '100%' : `${windowSize.width}px`,
        height: isMaximized ? '100%' : 'auto',
        minHeight: `${windowSize.height}px`,
        position: 'absolute',
        left: windowPosition.x,
        top: windowPosition.y,
        willChange: isDragging || isResizing ? 'transform, width, height' : 'auto',
        zIndex: isActive ? 200 : 100,
      }}
      onClick={handleActivate}
    >
      <div 
        className={`win10-window-header ${isActive ? 'win10-window-header-active' : 'win10-window-header-inactive'}`}
        onMouseDown={handleDragStart}
        onDoubleClick={handleMaximizeToggle}
      >
        <div className="win10-window-title">
          {/* Window icon based on title */}
          <span className="win10-window-icon" style={{paddingLeft: '5px'}}>
            {title.includes('Systemövervakning') && <img src="/app-icons/Computer.ico" width="16" height="16" alt="" />}
            {title.includes('Systemvarningar') && <img src="/app-icons/112_Tick_Green.ico" width="16" height="16" alt="" />}
            {title.includes('Responsstatistik') && <img src="/app-icons/ChartBar.ico" width="16" height="16" alt="" />}
            {title.includes('Tillgänglig Personal') && <img src="/app-icons/112_Persona_Blue.ico" width="16" height="16" alt="" />}
            {title.includes('Nödprotokoll') && <img src="/app-icons/005_Task.ico" width="16" height="16" alt="" />}
            {title.includes('Akut Händelserapport') && <img src="/app-icons/008_Reminder.ico" width="16" height="16" alt="" />}
            {title.includes('Kontrollpanel') && <img src="/app-icons/Gear.ico" width="16" height="16" alt="" />}
            {title.includes('Hjälp') && <img src="/app-icons/help.ico" width="16" height="16" alt="" />}
            {title.includes('Systemlogg') && <img src="/app-icons/112_Paste_Blue.ico" width="16" height="16" alt="" />}
            {title.includes('Nätverksöversikt') && <img src="/app-icons/Network.ico" width="16" height="16" alt="" />}
            {/* Default icon for windows that don't match specific criteria */}
            {!title.includes('Systemövervakning') && 
             !title.includes('Systemvarningar') && 
             !title.includes('Kontrollpanel') && 
             !title.includes('Hjälp') && 
             !title.includes('Systemlogg') && 
             !title.includes('Nätverksöversikt') &&
             !title.includes('Responsstatistik') &&
             !title.includes('Tillgänglig Personal') &&
             !title.includes('Nödprotokoll') &&
             !title.includes('Akut Händelserapport') &&
             !title.includes('Insatskarta') && 
             <img src="/app-icons/default.ico" width="16" height="16" alt="" />}
          </span>
          {title}
        </div>
        <div className="win10-window-controls">
          <button
            className="win10-window-control win10-minimize"
            onClick={() => onMinimize(id)}
            aria-label="Minimera"
            style={{ width: '39px', height: '28px', padding: 0 }}
          >
            <FaWindowMinimize size={10} />
          </button>
          <button
            className="win10-window-control win10-maximize"
            onClick={handleMaximizeToggle}
            aria-label={isMaximized ? "Återställ" : "Maximera"}
            style={{ width: '39px', height: '28px', padding: 0 }}
          >
            <FaWindowMaximize size={10} />
          </button>
          <button
            className="win10-window-control win10-close"
            onClick={() => onClose(id)}
            aria-label="Stäng"
            style={{ width: '39px', height: '28px', padding: 0 }}
          >
            <FaTimes size={10} />
          </button>
        </div>
      </div>
      <div className="win10-window-content">
        {children}
      </div>
      {!isMaximized && (
        <>
          <div 
            className="win10-resize-handle win10-resize-n" 
            onMouseDown={(e) => {
              e.preventDefault();
              e.stopPropagation();
              // Handle north resize logic
            }}
          />
          <div 
            className="win10-resize-handle win10-resize-e" 
            onMouseDown={(e) => {
              e.preventDefault();
              e.stopPropagation();
              // Handle east resize logic
            }}
          />
          <div 
            className="win10-resize-handle win10-resize-s" 
            onMouseDown={(e) => {
              e.preventDefault();
              e.stopPropagation();
              // Handle south resize logic
            }}
          />
          <div 
            className="win10-resize-handle win10-resize-w" 
            onMouseDown={(e) => {
              e.preventDefault();
              e.stopPropagation();
              // Handle west resize logic
            }}
          />
          <div 
            className="win10-resize-handle win10-resize-ne" 
            onMouseDown={(e) => {
              e.preventDefault();
              e.stopPropagation();
              // Handle northeast resize logic
            }}
          />
          <div 
            className="win10-resize-handle win10-resize-se" 
            onMouseDown={handleResizeStart}
          />
          <div 
            className="win10-resize-handle win10-resize-sw" 
            onMouseDown={(e) => {
              e.preventDefault();
              e.stopPropagation();
              // Handle southwest resize logic
            }}
          />
          <div 
            className="win10-resize-handle win10-resize-nw" 
            onMouseDown={(e) => {
              e.preventDefault();
              e.stopPropagation();
              // Handle northwest resize logic
            }}
          />
        </>
      )}
    </div>
  );
};

export default MiniWindow;