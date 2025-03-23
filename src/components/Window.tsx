'use client';

import React, { useState, useRef, useEffect } from 'react';
import Draggable from 'react-draggable';
import { Resizable } from 'react-resizable';
import { FaWindowMinimize, FaWindowMaximize, FaWindowRestore, FaTimes } from 'react-icons/fa';
import { useSystem } from '@/context/SystemContext';
import { WindowProps } from '@/types';

interface WindowComponentProps {
  window: WindowProps;
}

const Window: React.FC<WindowComponentProps> = ({ window: windowProps }) => {
  const { dispatch } = useSystem();
  const nodeRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [maxConstraints, setMaxConstraints] = useState<[number, number]>([800, 600]);
  const [localPosition, setLocalPosition] = useState(windowProps.position);

  // Set max constraints based on window size
  useEffect(() => {
    const updateMaxConstraints = () => {
      setMaxConstraints([
        typeof globalThis.window !== 'undefined' ? globalThis.window.innerWidth - 50 : 800,
        typeof globalThis.window !== 'undefined' ? globalThis.window.innerHeight - 100 : 600,
      ]);
    };

    updateMaxConstraints();
    if (typeof globalThis.window !== 'undefined') {
      globalThis.window.addEventListener('resize', updateMaxConstraints);
      return () => globalThis.window.removeEventListener('resize', updateMaxConstraints);
    }
  }, []);

  // Update local position when window position changes from outside
  useEffect(() => {
    if (!isDragging) {
      setLocalPosition(windowProps.position);
    }
  }, [windowProps.position, isDragging]);

  const {
    id,
    title,
    isActive,
    isMinimized,
    isMaximized,
    zIndex,
    size,
    content,
  } = windowProps;

  // Handle window activation on click
  const handleActivate = () => {
    if (!isActive) {
      dispatch({ type: 'ACTIVATE_WINDOW', payload: { id } });
    }
  };

  // Handle window close
  const handleClose = (e: React.MouseEvent) => {
    e.stopPropagation();
    dispatch({ type: 'CLOSE_WINDOW', payload: { id } });
  };

  // Handle window minimize
  const handleMinimize = (e: React.MouseEvent) => {
    e.stopPropagation();
    dispatch({ type: 'MINIMIZE_WINDOW', payload: { id } });
  };

  // Handle window maximize/restore
  const handleMaximizeRestore = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isMaximized) {
      dispatch({ type: 'RESTORE_WINDOW', payload: { id } });
    } else {
      dispatch({ type: 'MAXIMIZE_WINDOW', payload: { id } });
    }
  };

  // Handle window drag start
  const handleDragStart = () => {
    setIsDragging(true);
  };

  // Handle window drag
  const handleDrag = (e: any, data: { x: number; y: number }) => {
    setLocalPosition({ x: data.x, y: data.y });
  };

  // Handle window resize
  const handleResize = (e: React.SyntheticEvent, { size }: { size: { width: number; height: number } }) => {
    dispatch({
      type: 'RESIZE_WINDOW',
      payload: { id, size },
    });
  };

  // Reset dragging state when drag ends and update position in store
  const handleDragStop = (e: any, data: { x: number; y: number }) => {
    setIsDragging(false);
    dispatch({
      type: 'MOVE_WINDOW',
      payload: { id, position: { x: data.x, y: data.y } },
    });
  };

  // If window is minimized, don't render it
  if (isMinimized) {
    return null;
  }

  // If window is maximized, render it at full size
  if (isMaximized) {
    return (
      <div
        className={`window ${isActive ? 'active' : ''} ${isDragging ? 'dragging' : ''}`}
        style={{
          zIndex,
          top: 0,
          left: 0,
          right: 0,
          bottom: 'var(--taskbar-height)',
          width: '100%',
          height: `calc(100% - var(--taskbar-height))`,
          willChange: 'transform',
        }}
        onClick={handleActivate}
        ref={nodeRef}
      >
        <div className="window-header">
          <div className="window-title">{title}</div>
          <div className="window-controls">
            <div className="window-control" onClick={handleMinimize}>
              <FaWindowMinimize size={10} />
            </div>
            <div className="window-control" onClick={handleMaximizeRestore}>
              <FaWindowRestore size={10} />
            </div>
            <div className="window-control close" onClick={handleClose}>
              <FaTimes size={12} />
            </div>
          </div>
        </div>
        <div className="window-content">{content}</div>
      </div>
    );
  }

  // Otherwise, render a draggable and resizable window
  return (
    <Draggable
      handle=".window-header"
      nodeRef={nodeRef}
      position={localPosition}
      onStart={handleDragStart}
      onDrag={handleDrag}
      onStop={handleDragStop}
      bounds=".desktop"
    >
      <div>
        <Resizable
          width={size.width}
          height={size.height}
          minConstraints={[300, 200]}
          maxConstraints={maxConstraints}
          onResize={handleResize}
          resizeHandles={['se']}
          handle={
            <div className="resize-handle bottom-right" />
          }
        >
          <div
            className={`window ${isActive ? 'active' : ''} ${isDragging ? 'dragging' : ''}`}
            style={{
              zIndex,
              width: `${size.width}px`,
              height: `${size.height}px`,
              willChange: 'transform',
            }}
            onClick={handleActivate}
            ref={nodeRef}
          >
            <div className="window-header">
              <div className="window-title">{title}</div>
              <div className="window-controls">
                <div className="window-control" onClick={handleMinimize}>
                  <FaWindowMinimize size={10} />
                </div>
                <div className="window-control" onClick={handleMaximizeRestore}>
                  <FaWindowMaximize size={10} />
                </div>
                <div className="window-control close" onClick={handleClose}>
                  <FaTimes size={12} />
                </div>
              </div>
            </div>
            <div className="window-content">{content}</div>
          </div>
        </Resizable>
      </div>
    </Draggable>
  );
};

export default Window; 