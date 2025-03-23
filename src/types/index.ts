export interface WindowProps {
  id: string;
  title: string;
  isActive: boolean;
  isMinimized: boolean;
  isMaximized: boolean;
  zIndex: number;
  position: { x: number; y: number };
  size: { width: number; height: number };
  content: React.ReactNode;
  icon?: React.ReactNode;
}

export interface AppProps {
  id: string;
  name: string;
  icon: React.ReactNode;
  window?: WindowProps;
}

export interface SystemState {
  windows: WindowProps[];
  activeWindowId: string | null;
  isStartMenuOpen: boolean;
  apps: AppProps[];
  openApps: string[];
}

export type SystemAction =
  | { type: 'OPEN_WINDOW'; payload: WindowProps }
  | { type: 'CLOSE_WINDOW'; payload: { id: string } }
  | { type: 'MINIMIZE_WINDOW'; payload: { id: string } }
  | { type: 'MAXIMIZE_WINDOW'; payload: { id: string } }
  | { type: 'RESTORE_WINDOW'; payload: { id: string } }
  | { type: 'ACTIVATE_WINDOW'; payload: { id: string } }
  | { type: 'MOVE_WINDOW'; payload: { id: string; position: { x: number; y: number } } }
  | { type: 'RESIZE_WINDOW'; payload: { id: string; size: { width: number; height: number } } }
  | { type: 'TOGGLE_START_MENU' }
  | { type: 'OPEN_APP'; payload: { id: string } }
  | { type: 'CLOSE_APP'; payload: { id: string } }; 