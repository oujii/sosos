'use client';

import React, { useState } from 'react';
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaExclamationTriangle, FaCheckCircle, FaClock, FaTimesCircle, FaChartBar, FaUserCircle, FaClipboardList, FaDatabase, FaPlus, FaFileAlt, FaBell, FaSearch, FaCog, FaQuestionCircle, FaHome } from 'react-icons/fa';
import MiniWindow from './MiniWindow';
import IncidentReport from './IncidentReport';
import { SystemMonitor, AlertList, ControlPanel, HelpDialog, LogViewer, NetworkOverview } from './Win7Components';

interface EmergencyCall {
  id: string;
  name: string;
  location: string;
  time: string;
  status: 'responding' | 'waiting' | 'closed';
  type: string;
}

interface InternalWindow {
  id: string;
  title: string;
  isMinimized: boolean;
  position: { x: number; y: number };
  width: number;
  height: number;
  content: React.ReactNode;
}

const ResCueXApp: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'start' | 'calls' | 'map' | 'messages'>('start');
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [activeWindowId, setActiveWindowId] = useState<string | null>(null);
  const [emergencyCalls, setEmergencyCalls] = useState<EmergencyCall[]>([
    {
      id: '1',
      name: 'Johan Svensson',
      location: 'Storgatan 123, Stockholm',
      time: '10:30',
      status: 'responding',
      type: 'Medicinsk Nödsituation',
    },
    {
      id: '2',
      name: 'Anna Lindberg',
      location: 'Ekvägen 456, Göteborg',
      time: '11:15',
      status: 'waiting',
      type: 'Brand',
    },
    {
      id: '3',
      name: 'Erik Johansson',
      location: 'Tallvägen 789, Malmö',
      time: '09:45',
      status: 'closed',
      type: 'Trafikolycka',
    },
  ]);

  // Internal windows state
  const [internalWindows, setInternalWindows] = useState<InternalWindow[]>([
    {
      id: 'stats',
      title: 'Responsstatistik',
      isMinimized: false,
      position: { x: 50, y: 50 },
      width: 300,
      height: 200,
      content: (
        <div className="p-2 win10-card">
          <h3 className="text-sm font-semibold mb-2 flex items-center win10-card-title">
            <FaChartBar className="mr-1 text-blue-600" /> Responsstatistik
          </h3>
          <div className="space-y-2 text-xs">
            <div className="flex justify-between">
              <span>Genomsnittlig responstid:</span>
              <span className="font-medium">4,2 minuter</span>
            </div>
            <div className="flex justify-between">
              <span>Aktiva utryckare:</span>
              <span className="font-medium">12</span>
            </div>
            <div className="flex justify-between">
              <span>Väntande ärenden:</span>
              <span className="font-medium">3</span>
            </div>
            <div className="flex justify-between">
              <span>Lösta idag:</span>
              <span className="font-medium">7</span>
            </div>
            <div className="mt-3 bg-gray-300 h-1.5 rounded-full overflow-hidden">
              <div className="bg-green-600 h-full" style={{ width: '75%' }}></div>
            </div>
            <div className="text-center text-gray-600">Systembelastning: 75%</div>
          </div>
        </div>
      ),
    },
    {
      id: 'personnel',
      title: 'Tillgänglig Personal',
      isMinimized: false,
      position: { x: 400, y: 100 },
      width: 250,
      height: 220,
      content: (
        <div className="p-2 win10-card">
          <h3 className="text-sm font-semibold mb-2 flex items-center win10-card-title">
            <FaUserCircle className="mr-1 text-green-600" /> Tillgänglig Personal
          </h3>
          <div className="space-y-2">
            {['Sara Karlsson', 'Jakob Rodriguez', 'Emma Chen', 'Mikael Björk'].map((name, index) => (
              <div key={index} className="flex items-center justify-between bg-white border border-gray-200 p-1.5 rounded text-xs">
                <div className="flex items-center">
                  <div className={`w-2 h-2 rounded-full mr-2 ${index < 3 ? 'bg-green-600' : 'bg-yellow-600'}`}></div>
                  <span>{name}</span>
                </div>
                <div className="text-gray-600">Enhet {index + 1}</div>
              </div>
            ))}
            <button className="win10-button w-full mt-1 flex items-center justify-center">
              <FaPlus className="mr-1" size={8} /> Tilldela Personal
            </button>
          </div>
        </div>
      ),
    },
    {
      id: 'protocol',
      title: 'Nödprotokoll',
      isMinimized: true,
      position: { x: 200, y: 150 },
      width: 280,
      height: 180,
      content: (
        <div className="p-2 win10-card">
          <h3 className="text-sm font-semibold mb-2 flex items-center win10-card-title">
            <FaClipboardList className="mr-1 text-red-600" /> Nödprotokoll
          </h3>
          <div className="space-y-1.5 text-xs">
            <div className="bg-white border border-gray-200 p-1.5 rounded">
              <div className="font-medium">Medicinsk Nödsituation - Kod Blå</div>
              <div className="text-gray-600 mt-0.5">Prioritet: Hög</div>
            </div>
            <div className="bg-white border border-gray-200 p-1.5 rounded">
              <div className="font-medium">Brandutryckning - Kod Röd</div>
              <div className="text-gray-600 mt-0.5">Prioritet: Kritisk</div>
            </div>
            <div className="bg-white border border-gray-200 p-1.5 rounded">
              <div className="font-medium">Trafikolycka - Kod Gul</div>
              <div className="text-gray-600 mt-0.5">Prioritet: Medium</div>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'database',
      title: 'Ärendedatabas',
      isMinimized: true,
      position: { x: 300, y: 200 },
      width: 320,
      height: 240,
      content: (
        <div className="p-2 win10-card">
          <h3 className="text-sm font-semibold mb-2 flex items-center win10-card-title">
            <FaDatabase className="mr-1 text-purple-600" /> Ärendedatabas
          </h3>
          <div className="space-y-2">
            <div className="flex text-xs bg-gray-100 p-1">
              <div className="w-12 font-medium">ID</div>
              <div className="flex-1 font-medium">Beskrivning</div>
              <div className="w-20 font-medium">Status</div>
            </div>
            {['Medicinsk', 'Brand', 'Olycka', 'Räddning', 'Säkerhet'].map((type, index) => (
              <div key={index} className="flex text-xs bg-white border border-gray-200 p-1.5 rounded">
                <div className="w-12 text-gray-600">#{index + 1001}</div>
                <div className="flex-1">{type} Nödsituation</div>
                <div className="w-20">
                  <span className={`px-1.5 py-0.5 rounded text-[10px] ${
                    index % 3 === 0 ? 'bg-green-100 text-green-800' : 
                    index % 3 === 1 ? 'bg-yellow-100 text-yellow-800' : 
                    'bg-blue-100 text-blue-800'
                  }`}>
                    {index % 3 === 0 ? 'Avslutad' : index % 3 === 1 ? 'Aktiv' : 'Väntande'}
                  </span>
                </div>
              </div>
            ))}
            <div className="text-right text-xs text-gray-600">
              Visar 5 av 128 ärenden
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'incident-report',
      title: 'Akut Händelserapport',
      isMinimized: false,
      position: { x: 100, y: 80 },
      width: 500,
      height: 450,
      content: <IncidentReport />
    },
    // Nya Windows 7-stilade fönster
    {
      id: 'system-monitor',
      title: 'Systemövervakning',
      isMinimized: false,
      position: { x: 150, y: 120 },
      width: 350,
      height: 300,
      content: <SystemMonitor />
    },
    {
      id: 'alert-list',
      title: 'Systemvarningar',
      isMinimized: false,
      position: { x: 520, y: 150 },
      width: 380,
      height: 320,
      content: <AlertList />
    },
    {
      id: 'control-panel',
      title: 'Kontrollpanel',
      isMinimized: true,
      position: { x: 200, y: 180 },
      width: 400,
      height: 350,
      content: <ControlPanel />
    },
    {
      id: 'help-dialog',
      title: 'Hjälp',
      isMinimized: true,
      position: { x: 250, y: 200 },
      width: 420,
      height: 300,
      content: <HelpDialog />
    },
    {
      id: 'log-viewer',
      title: 'Systemlogg',
      isMinimized: true,
      position: { x: 300, y: 220 },
      width: 450,
      height: 380,
      content: <LogViewer />
    },
    {
      id: 'network-overview',
      title: 'Nätverksöversikt',
      isMinimized: true,
      position: { x: 350, y: 240 },
      width: 420,
      height: 350,
      content: <NetworkOverview />
    }
  ]);

  // Handle closing an internal window
  const handleCloseInternalWindow = (id: string) => {
    setInternalWindows(windows => 
      windows.filter(window => window.id !== id)
    );
  };

  // Handle minimizing an internal window
  const handleMinimizeInternalWindow = (id: string) => {
    setInternalWindows(windows => 
      windows.map(window => 
        window.id === id 
          ? { ...window, isMinimized: true } 
          : window
      )
    );
  };

  // Handle restoring a minimized window
  const handleRestoreInternalWindow = (id: string) => {
    setInternalWindows(windows => 
      windows.map(window => 
        window.id === id 
          ? { ...window, isMinimized: false } 
          : window
      )
    );
  };

  // Add a new incident report
  const handleAddIncidentReport = () => {
    const newId = `incident-report-${Date.now()}`;
    setInternalWindows(windows => [
      ...windows,
      {
        id: newId,
        title: 'Akut Händelserapport',
        isMinimized: false,
        position: { x: 150, y: 100 },
        width: 500,
        height: 450,
        content: <IncidentReport />
      }
    ]);
  };

  // Handle window activation
  const handleWindowActivate = (id: string) => {
    setActiveWindowId(id);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'responding':
        return <div className="win10-status-indicator win10-status-warning"></div>;
      case 'waiting':
        return <div className="win10-status-indicator win10-status-info"></div>;
      case 'closed':
        return <div className="win10-status-indicator win10-status-success"></div>;
      default:
        return <div className="win10-status-indicator win10-status-critical"></div>;
    }
  };

  const handleMenuClick = (menu: string) => {
    if (activeMenu === menu) {
      setActiveMenu(null);
    } else {
      setActiveMenu(menu);
    }
  };

  // Add a new window with Windows 7 components
  const handleAddWin7Window = (type: string) => {
    let newWindow: InternalWindow | null = null;
    
    switch (type) {
      case 'system-monitor':
        newWindow = {
          id: `system-monitor-${Date.now()}`,
          title: 'Systemövervakning',
          isMinimized: false,
          position: { x: Math.random() * 100 + 100, y: Math.random() * 100 + 100 },
          width: 350,
          height: 300,
          content: <SystemMonitor />
        };
        break;
      case 'alert-list':
        newWindow = {
          id: `alert-list-${Date.now()}`,
          title: 'Systemvarningar',
          isMinimized: false,
          position: { x: Math.random() * 100 + 150, y: Math.random() * 100 + 150 },
          width: 380,
          height: 320,
          content: <AlertList />
        };
        break;
      case 'control-panel':
        newWindow = {
          id: `control-panel-${Date.now()}`,
          title: 'Kontrollpanel',
          isMinimized: false,
          position: { x: Math.random() * 100 + 200, y: Math.random() * 100 + 200 },
          width: 400,
          height: 350,
          content: <ControlPanel />
        };
        break;
      case 'help-dialog':
        newWindow = {
          id: `help-dialog-${Date.now()}`,
          title: 'Hjälp',
          isMinimized: false,
          position: { x: Math.random() * 100 + 250, y: Math.random() * 100 + 250 },
          width: 420,
          height: 300,
          content: <HelpDialog />
        };
        break;
      case 'log-viewer':
        newWindow = {
          id: `log-viewer-${Date.now()}`,
          title: 'Systemlogg',
          isMinimized: false,
          position: { x: Math.random() * 100 + 300, y: Math.random() * 100 + 300 },
          width: 450,
          height: 380,
          content: <LogViewer />
        };
        break;
      case 'network-overview':
        newWindow = {
          id: `network-overview-${Date.now()}`,
          title: 'Nätverksöversikt',
          isMinimized: false,
          position: { x: Math.random() * 100 + 350, y: Math.random() * 100 + 350 },
          width: 420,
          height: 350,
          content: <NetworkOverview />
        };
        break;
    }
    
    if (newWindow) {
      setInternalWindows(windows => [...windows, newWindow!]);
    }
  };

  return (
    <div className="win10-app">
      {/* Windows 10 style menu bar */}
      <div className="win10-menubar">
        <div className="win10-menubar-item" onClick={() => handleMenuClick('arkiv')}>
          Arkiv
          {activeMenu === 'arkiv' && (
            <div className="win10-menu-dropdown">
              <div className="win10-menu-item">Ny rapport</div>
              <div className="win10-menu-item">Öppna</div>
              <div className="win10-menu-item">Spara</div>
              <div className="win10-menu-divider"></div>
              <div className="win10-menu-item">Avsluta</div>
            </div>
          )}
        </div>
        
        <div className="win10-menubar-item" onClick={() => handleMenuClick('visa')}>
          Visa
          {activeMenu === 'visa' && (
            <div className="win10-menu-dropdown">
              <div className="win10-menu-item" onClick={() => handleAddWin7Window('system-monitor')}>Systemövervakning</div>
              <div className="win10-menu-item" onClick={() => handleAddWin7Window('alert-list')}>Systemvarningar</div>
              <div className="win10-menu-item" onClick={() => handleAddWin7Window('control-panel')}>Kontrollpanel</div>
              <div className="win10-menu-item" onClick={() => handleAddWin7Window('log-viewer')}>Systemlogg</div>
              <div className="win10-menu-item" onClick={() => handleAddWin7Window('network-overview')}>Nätverksöversikt</div>
            </div>
          )}
        </div>
        
        <div className="win10-menubar-item" onClick={() => handleMenuClick('hjälp')}>
          Hjälp
          {activeMenu === 'hjälp' && (
            <div className="win10-menu-dropdown">
              <div className="win10-menu-item" onClick={() => handleAddWin7Window('help-dialog')}>Visa hjälp</div>
              <div className="win10-menu-item">Dokumentation</div>
              <div className="win10-menu-item">Om ResCueX</div>
            </div>
          )}
        </div>
      </div>

      {/* App tabs */}
      <div className="win10-tabs">
        <div
          className={`win10-tab ${activeTab === 'start' ? 'active' : ''}`}
          onClick={() => setActiveTab('start')}
        >
          <FaHome className="win10-tab-icon text-blue-600" /> Start
        </div>
        <div
          className={`win10-tab ${activeTab === 'calls' ? 'active' : ''}`}
          onClick={() => setActiveTab('calls')}
        >
          <FaPhone className="win10-tab-icon text-blue-600" /> Nödsamtal
        </div>
        <div
          className={`win10-tab ${activeTab === 'map' ? 'active' : ''}`}
          onClick={() => setActiveTab('map')}
        >
          <FaMapMarkerAlt className="win10-tab-icon text-blue-600" /> Karta
        </div>
        <div
          className={`win10-tab ${activeTab === 'messages' ? 'active' : ''}`}
          onClick={() => setActiveTab('messages')}
        >
          <FaEnvelope className="win10-tab-icon text-blue-600" /> Meddelanden
        </div>
        <div
          className="win10-tab ml-auto"
          onClick={handleAddIncidentReport}
        >
          <FaFileAlt className="win10-tab-icon text-blue-600" /> Ny Händelserapport
        </div>
      </div>

      {/* App content */}
      <div className="win10-content">
        {/* Floating internal windows */}
        {internalWindows.map(window => (
          !window.isMinimized && (
            <MiniWindow
              key={window.id}
              id={window.id}
              title={window.title}
              isMinimized={window.isMinimized}
              position={window.position}
              width={window.width}
              height={window.height}
              onClose={handleCloseInternalWindow}
              onMinimize={handleMinimizeInternalWindow}
              isActive={activeWindowId === window.id}
              onActivate={() => handleWindowActivate(window.id)}
            >
              {window.content}
            </MiniWindow>
          )
        ))}

        {activeTab === 'start' && (
          <div className="h-full w-full" style={{ backgroundColor: '#B9B9B9' }}>
            {/* Start tab content with just the background color */}
          </div>
        )}

        {activeTab === 'calls' && (
          <div>
            <h2 className="text-lg font-semibold mb-4">Inkommande Nödsamtal</h2>
            <div className="space-y-4">
              {emergencyCalls.map((call) => (
                <div key={call.id} className="win10-card">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="win10-card-title">{call.name}</h3>
                      <p className="win10-card-subtitle">{call.type}</p>
                      <div className="flex items-center mt-2 text-sm">
                        <FaMapMarkerAlt className="mr-1 text-red-600" />
                        <span>{call.location}</span>
                      </div>
                      <div className="text-sm text-gray-600 mt-1">
                        <FaClock className="inline mr-1" /> {call.time}
                      </div>
                    </div>
                    <div className="flex flex-col items-end">
                      <div className="win10-status mb-2">
                        {getStatusIcon(call.status)}
                        <span className="capitalize">
                          {call.status === 'responding' ? 'Utrycker' : 
                           call.status === 'waiting' ? 'Väntar' : 
                           call.status === 'closed' ? 'Avslutad' : 'Okänd'}
                        </span>
                      </div>
                      <button className="win10-button win10-button-primary">
                        Svara
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'map' && (
          <div>
            <h2 className="text-lg font-semibold mb-4">Positionsspårning i realtid</h2>
            <div className="win10-card" style={{ height: '400px' }}>
              <div className="h-full flex items-center justify-center bg-gray-100">
                <div className="text-center">
                  <FaMapMarkerAlt className="text-red-600 text-4xl mx-auto mb-2" />
                  <p>Interaktiv karta skulle visas här</p>
                  <p className="text-sm text-gray-600 mt-2">Visar 3 aktiva nödlägesplatser</p>
                </div>
              </div>
            </div>
            <div className="mt-4 grid grid-cols-3 gap-4">
              <div className="win10-card p-3">
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-red-600 mr-2"></div>
                  <span>Medicinsk</span>
                </div>
                <p className="text-sm text-gray-600 mt-1">2 aktiva ärenden</p>
              </div>
              <div className="win10-card p-3">
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-orange-600 mr-2"></div>
                  <span>Brand</span>
                </div>
                <p className="text-sm text-gray-600 mt-1">1 aktivt ärende</p>
              </div>
              <div className="win10-card p-3">
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-blue-600 mr-2"></div>
                  <span>Polis</span>
                </div>
                <p className="text-sm text-gray-600 mt-1">0 aktiva ärenden</p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'messages' && (
          <div>
            <h2 className="text-lg font-semibold mb-4">Meddelandenotiser</h2>
            <div className="space-y-3">
              <div className="win10-card border-l-4 border-yellow-500">
                <p className="win10-card-title">Systemnotis</p>
                <p className="win10-card-subtitle">Nytt nödprotokoll aktiverat för centrumområdet</p>
                <p className="text-xs text-gray-500 mt-1">12:30</p>
              </div>
              <div className="win10-card border-l-4 border-blue-500">
                <p className="win10-card-title">Teammeddelande</p>
                <p className="win10-card-subtitle">Förstärkning begärd på Storgatan 123 för medicinsk nödsituation</p>
                <p className="text-xs text-gray-500 mt-1">11:45</p>
              </div>
              <div className="win10-card border-l-4 border-green-500">
                <p className="win10-card-title">Statusuppdatering</p>
                <p className="win10-card-subtitle">Ärende #2458 har lösts och avslutats</p>
                <p className="text-xs text-gray-500 mt-1">10:15</p>
              </div>
            </div>
            <div className="mt-4">
              <div className="flex">
                <input
                  type="text"
                  placeholder="Skriv ett meddelande..."
                  className="win10-input rounded-r-none flex-1"
                />
                <button className="win10-button win10-button-primary rounded-l-none">
                  Skicka
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Mini window taskbar */}
      <div className="win10-statusbar" style={{ justifyContent: 'flex-start', borderTop: 'none', borderBottom: '1px solid #d1d1d1' }}>
        {internalWindows.filter(w => w.isMinimized).map(window => (
          <div 
            key={window.id}
            className="win10-button win10-button-secondary"
            onClick={() => handleRestoreInternalWindow(window.id)}
            style={{ margin: '0 4px', padding: '2px 8px', fontSize: '11px' }}
          >
            {window.title}
          </div>
        ))}
      </div>

      {/* Status bar */}
      <div className="win10-statusbar">
        <div>
          <span className="inline-block w-3 h-3 rounded-full bg-green-600 mr-1"></span>
          System Online
        </div>
        <div>3 Aktiva Nödsituationer</div>
        <div>Senast uppdaterad: Just nu</div>
      </div>
    </div>
  );
};

export default ResCueXApp; 