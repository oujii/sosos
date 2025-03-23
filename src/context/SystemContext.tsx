'use client';

import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { SystemState, SystemAction, AppProps } from '@/types';
import { FaWindows, FaLifeRing, FaFolder, FaGear, FaTerminal } from 'react-icons/fa6';
import ResCueXApp from '@/components/apps/ResCueX';

// Initial apps
const initialApps: AppProps[] = [
  {
    id: 'rescuex',
    name: 'ResCueX',
    icon: <FaLifeRing />,
  },
  {
    id: 'explorer',
    name: 'File Explorer',
    icon: <FaFolder />,
  },
  {
    id: 'settings',
    name: 'Settings',
    icon: <FaGear />,
  },
  {
    id: 'terminal',
    name: 'Terminal',
    icon: <FaTerminal />,
  },
];

// Initial state
const initialState: SystemState = {
  windows: [],
  activeWindowId: null,
  isStartMenuOpen: false,
  apps: initialApps,
  openApps: [],
};

// Reducer function
function systemReducer(state: SystemState, action: SystemAction): SystemState {
  switch (action.type) {
    case 'OPEN_WINDOW':
      // If window already exists, just activate it
      const existingWindow = state.windows.find(w => w.id === action.payload.id);
      if (existingWindow) {
        return {
          ...state,
          windows: state.windows.map(w => ({
            ...w,
            isActive: w.id === action.payload.id,
            isMinimized: w.id === action.payload.id ? false : w.isMinimized,
            zIndex: w.id === action.payload.id ? Math.max(...state.windows.map(w => w.zIndex)) + 1 : w.zIndex,
          })),
          activeWindowId: action.payload.id,
        };
      }
      
      // Otherwise, create a new window
      return {
        ...state,
        windows: [
          ...state.windows.map(w => ({ ...w, isActive: false })),
          {
            ...action.payload,
            isActive: true,
            zIndex: state.windows.length > 0 
              ? Math.max(...state.windows.map(w => w.zIndex)) + 1 
              : 1,
          },
        ],
        activeWindowId: action.payload.id,
      };
      
    case 'CLOSE_WINDOW':
      return {
        ...state,
        windows: state.windows.filter(w => w.id !== action.payload.id),
        activeWindowId: state.windows.length > 1 
          ? state.windows.find(w => w.id !== action.payload.id && !w.isMinimized)?.id || null 
          : null,
        openApps: state.openApps.filter(id => id !== action.payload.id),
      };
      
    case 'MINIMIZE_WINDOW':
      return {
        ...state,
        windows: state.windows.map(w => 
          w.id === action.payload.id 
            ? { ...w, isMinimized: true, isActive: false } 
            : w
        ),
        activeWindowId: state.windows.find(w => !w.isMinimized && w.id !== action.payload.id)?.id || null,
      };
      
    case 'MAXIMIZE_WINDOW':
      return {
        ...state,
        windows: state.windows.map(w => 
          w.id === action.payload.id 
            ? { ...w, isMaximized: true, isActive: true } 
            : { ...w, isActive: false }
        ),
        activeWindowId: action.payload.id,
      };
      
    case 'RESTORE_WINDOW':
      return {
        ...state,
        windows: state.windows.map(w => 
          w.id === action.payload.id 
            ? { ...w, isMaximized: false, isActive: true } 
            : { ...w, isActive: false }
        ),
        activeWindowId: action.payload.id,
      };
      
    case 'ACTIVATE_WINDOW':
      return {
        ...state,
        windows: state.windows.map(w => ({
          ...w,
          isActive: w.id === action.payload.id,
          isMinimized: w.id === action.payload.id ? false : w.isMinimized,
          zIndex: w.id === action.payload.id ? Math.max(...state.windows.map(w => w.zIndex)) + 1 : w.zIndex,
        })),
        activeWindowId: action.payload.id,
      };
      
    case 'MOVE_WINDOW':
      return {
        ...state,
        windows: state.windows.map(w => 
          w.id === action.payload.id 
            ? { ...w, position: action.payload.position } 
            : w
        ),
      };
      
    case 'RESIZE_WINDOW':
      return {
        ...state,
        windows: state.windows.map(w => 
          w.id === action.payload.id 
            ? { ...w, size: action.payload.size } 
            : w
        ),
      };
      
    case 'TOGGLE_START_MENU':
      return {
        ...state,
        isStartMenuOpen: !state.isStartMenuOpen,
      };
      
    case 'OPEN_APP':
      const app = state.apps.find(a => a.id === action.payload.id);
      if (!app) return state;
      
      // If app is already open, just activate its window
      if (state.openApps.includes(action.payload.id)) {
        const windowId = action.payload.id;
        return {
          ...state,
          windows: state.windows.map(w => ({
            ...w,
            isActive: w.id === windowId,
            isMinimized: w.id === windowId ? false : w.isMinimized,
            zIndex: w.id === windowId ? Math.max(...state.windows.map(w => w.zIndex)) + 1 : w.zIndex,
          })),
          activeWindowId: windowId,
          isStartMenuOpen: false,
        };
      }
      
      // Create window content based on app ID
      let content: React.ReactNode;
      switch (action.payload.id) {
        case 'rescuex':
          content = <ResCueXApp />;
          break;
        case 'explorer':
          content = <div className="p-4">File Explorer</div>;
          break;
        case 'settings':
          content = <div className="p-4">Settings</div>;
          break;
        case 'terminal':
          content = <div className="p-4">Terminal</div>;
          break;
        default:
          content = <div className="p-4">App content</div>;
      }
      
      // Create a new window for the app
      const newWindow = {
        id: action.payload.id,
        title: app.name,
        isActive: true,
        isMinimized: false,
        isMaximized: false,
        zIndex: state.windows.length > 0 ? Math.max(...state.windows.map(w => w.zIndex)) + 1 : 1,
        position: { x: 100 + (state.openApps.length * 30), y: 100 + (state.openApps.length * 30) },
        size: { width: 800, height: 600 },
        content,
        icon: app.icon,
      };
      
      return {
        ...state,
        windows: [
          ...state.windows.map(w => ({ ...w, isActive: false })),
          newWindow,
        ],
        activeWindowId: action.payload.id,
        openApps: [...state.openApps, action.payload.id],
        isStartMenuOpen: false,
      };
      
    case 'CLOSE_APP':
      return {
        ...state,
        windows: state.windows.filter(w => w.id !== action.payload.id),
        activeWindowId: state.windows.length > 1 
          ? state.windows.find(w => w.id !== action.payload.id && !w.isMinimized)?.id || null 
          : null,
        openApps: state.openApps.filter(id => id !== action.payload.id),
      };
      
    default:
      return state;
  }
}

// Create context
type SystemContextType = {
  state: SystemState;
  dispatch: React.Dispatch<SystemAction>;
};

const SystemContext = createContext<SystemContextType | undefined>(undefined);

// Provider component
export function SystemProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(systemReducer, initialState);
  
  return (
    <SystemContext.Provider value={{ state, dispatch }}>
      {children}
    </SystemContext.Provider>
  );
}

// Custom hook to use the context
export function useSystem() {
  const context = useContext(SystemContext);
  if (context === undefined) {
    throw new Error('useSystem must be used within a SystemProvider');
  }
  return context;
} 