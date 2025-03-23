'use client';

import React from 'react';
import { FaExclamationTriangle, FaInfoCircle, FaCheckCircle, FaQuestionCircle } from 'react-icons/fa';
import AlertList from './AlertList';

// Komponent för Windows 7-stilad systemövervakning
export const SystemMonitor: React.FC = () => {
  return (
    <div className="p-2">
      <div className="window" style={{ width: '100%', height: '100%', position: 'relative', boxShadow: 'none', border: 'none' }}>
        <div className="window-body" style={{ padding: '8px' }}>
          <h4 style={{ marginTop: 0 }}>Systemövervakning</h4>
          
          <div className="field-row" style={{ marginBottom: '8px' }}>
            <label>CPU-användning:</label>
            <div style={{ flex: 1 }}>
              <div className="progress-bar">
                <div style={{ width: '45%' }}></div>
              </div>
            </div>
            <span>45%</span>
          </div>
          
          <div className="field-row" style={{ marginBottom: '8px' }}>
            <label>Minnesanvändning:</label>
            <div style={{ flex: 1 }}>
              <div className="progress-bar">
                <div style={{ width: '72%' }}></div>
              </div>
            </div>
            <span>72%</span>
          </div>
          
          <div className="field-row" style={{ marginBottom: '8px' }}>
            <label>Nätverksaktivitet:</label>
            <div style={{ flex: 1 }}>
              <div className="progress-bar">
                <div style={{ width: '23%' }}></div>
              </div>
            </div>
            <span>23%</span>
          </div>
          
          <div className="field-row" style={{ marginBottom: '8px' }}>
            <label>Diskaktivitet:</label>
            <div style={{ flex: 1 }}>
              <div className="progress-bar">
                <div style={{ width: '15%' }}></div>
              </div>
            </div>
            <span>15%</span>
          </div>
          
          <div className="field-row-stacked" style={{ marginTop: '12px' }}>
            <label>Systemstatus</label>
            <div className="status-bar">
              <p>System fungerar normalt. Inga varningar.</p>
            </div>
          </div>
          
          <div className="field-row" style={{ justifyContent: 'flex-end', marginTop: '12px' }}>
            <button>Uppdatera</button>
            <button>Detaljer</button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Exportera den nya AlertList-komponenten
export { AlertList };

// Komponent för Windows 7-stilad kontrollpanel
export const ControlPanel: React.FC = () => {
  return (
    <div className="p-2">
      <div className="window" style={{ width: '100%', height: '100%', position: 'relative', boxShadow: 'none', border: 'none' }}>
        <div className="window-body" style={{ padding: '8px' }}>
          <h4 style={{ marginTop: 0 }}>Kontrollpanel</h4>
          
          <div className="tabs">
            <div className="tab-row">
              <button className="tab active">Allmänt</button>
              <button className="tab">Nätverk</button>
              <button className="tab">Säkerhet</button>
              <button className="tab">System</button>
            </div>
            <div className="tab-contents">
              <div className="field-row-stacked">
                <label>Systemnamn</label>
                <input type="text" value="RESCUE-SYS-01" readOnly />
              </div>
              
              <div className="field-row-stacked" style={{ marginTop: '8px' }}>
                <label>Systemstatus</label>
                <select>
                  <option>Online</option>
                  <option>Underhållsläge</option>
                  <option>Begränsad funktion</option>
                  <option>Offline</option>
                </select>
              </div>
              
              <fieldset style={{ marginTop: '12px' }}>
                <legend>Systeminställningar</legend>
                <div className="field-row">
                  <input id="radio1" type="radio" name="systemMode" checked />
                  <label htmlFor="radio1">Normalläge</label>
                </div>
                <div className="field-row">
                  <input id="radio2" type="radio" name="systemMode" />
                  <label htmlFor="radio2">Nödläge</label>
                </div>
                <div className="field-row">
                  <input id="radio3" type="radio" name="systemMode" />
                  <label htmlFor="radio3">Diagnostikläge</label>
                </div>
              </fieldset>
              
              <div className="field-row" style={{ justifyContent: 'flex-end', marginTop: '12px' }}>
                <button>Avbryt</button>
                <button>Verkställ</button>
                <button>OK</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Komponent för Windows 7-stilad hjälpdialog
export const HelpDialog: React.FC = () => {
  return (
    <div className="p-2">
      <div className="window" style={{ width: '100%', height: '100%', position: 'relative', boxShadow: 'none', border: 'none' }}>
        <div className="window-body" style={{ padding: '8px' }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', marginBottom: '12px' }}>
            <FaQuestionCircle style={{ fontSize: '32px', color: '#0078d7', marginRight: '12px' }} />
            <div>
              <h4 style={{ marginTop: 0, marginBottom: '8px' }}>Hjälp: Nödsituationshantering</h4>
              <p>Denna modul används för att hantera nödsituationer och koordinera räddningsinsatser.</p>
            </div>
          </div>
          
          <div className="sunken-panel" style={{ padding: '8px', maxHeight: '150px', overflow: 'auto' }}>
            <p><strong>Snabbhjälp:</strong></p>
            <ul style={{ paddingLeft: '20px', margin: '8px 0' }}>
              <li>Klicka på "Ny Händelserapport" för att skapa en ny rapport</li>
              <li>Använd "Nödsamtal"-fliken för att se inkommande samtal</li>
              <li>Kartan visar aktiva insatser i realtid</li>
              <li>Statusfältet längst ner visar systemstatus</li>
            </ul>
            <p>För mer detaljerad hjälp, se användarhandboken eller kontakta systemadministratören.</p>
          </div>
          
          <div className="field-row" style={{ justifyContent: 'space-between', marginTop: '12px' }}>
            <button>Visa användarhandbok</button>
            <button>Stäng</button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Komponent för Windows 7-stilad loggvisare
export const LogViewer: React.FC = () => {
  return (
    <div className="p-2">
      <div className="window" style={{ width: '100%', height: '100%', position: 'relative', boxShadow: 'none', border: 'none' }}>
        <div className="window-body" style={{ padding: '8px' }}>
          <h4 style={{ marginTop: 0 }}>Systemlogg</h4>
          
          <div className="field-row" style={{ marginBottom: '8px' }}>
            <label>Filtrera:</label>
            <select style={{ marginRight: '8px' }}>
              <option>Alla händelser</option>
              <option>Fel</option>
              <option>Varningar</option>
              <option>Information</option>
            </select>
            <input type="text" placeholder="Sök..." style={{ flex: 1 }} />
          </div>
          
          <div className="sunken-panel" style={{ maxHeight: '200px', overflow: 'auto' }}>
            <table className="interactive" style={{ width: '100%' }}>
              <thead>
                <tr>
                  <th>Tid</th>
                  <th>Typ</th>
                  <th>Meddelande</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>14:32:01</td>
                  <td>INFO</td>
                  <td>System startad</td>
                </tr>
                <tr>
                  <td>14:35:12</td>
                  <td>WARN</td>
                  <td>Hög minnesanvändning detekterad</td>
                </tr>
                <tr>
                  <td>14:40:45</td>
                  <td>ERROR</td>
                  <td>Anslutning till databas misslyckades</td>
                </tr>
                <tr>
                  <td>14:42:30</td>
                  <td>INFO</td>
                  <td>Databasanslutning återupprättad</td>
                </tr>
                <tr>
                  <td>14:45:22</td>
                  <td>INFO</td>
                  <td>Ny användare inloggad: admin</td>
                </tr>
                <tr>
                  <td>14:50:18</td>
                  <td>WARN</td>
                  <td>Nätverkslatens över tröskelvärde</td>
                </tr>
              </tbody>
            </table>
          </div>
          
          <div className="status-bar" style={{ marginTop: '12px' }}>
            <p>6 händelser visas. Senast uppdaterad: 14:55:00</p>
          </div>
          
          <div className="field-row" style={{ justifyContent: 'flex-end', marginTop: '12px' }}>
            <button>Exportera</button>
            <button>Uppdatera</button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Komponent för Windows 7-stilad nätverksöversikt
export const NetworkOverview: React.FC = () => {
  return (
    <div className="p-2">
      <div className="window" style={{ width: '100%', height: '100%', position: 'relative', boxShadow: 'none', border: 'none' }}>
        <div className="window-body" style={{ padding: '8px' }}>
          <h4 style={{ marginTop: 0 }}>Nätverksöversikt</h4>
          
          <div style={{ display: 'flex', gap: '8px', marginBottom: '12px' }}>
            <div style={{ flex: 1 }}>
              <fieldset>
                <legend>Anslutningsstatus</legend>
                <div className="field-row">
                  <label>Internet:</label>
                  <span style={{ color: 'green' }}>Ansluten</span>
                </div>
                <div className="field-row">
                  <label>Lokalt nätverk:</label>
                  <span style={{ color: 'green' }}>Ansluten</span>
                </div>
                <div className="field-row">
                  <label>VPN:</label>
                  <span style={{ color: 'red' }}>Frånkopplad</span>
                </div>
              </fieldset>
            </div>
            
            <div style={{ flex: 1 }}>
              <fieldset>
                <legend>Nätverksstatistik</legend>
                <div className="field-row">
                  <label>Nedladdning:</label>
                  <span>1.2 MB/s</span>
                </div>
                <div className="field-row">
                  <label>Uppladdning:</label>
                  <span>0.3 MB/s</span>
                </div>
                <div className="field-row">
                  <label>Latens:</label>
                  <span>45 ms</span>
                </div>
              </fieldset>
            </div>
          </div>
          
          <fieldset>
            <legend>Anslutna enheter</legend>
            <div className="sunken-panel" style={{ maxHeight: '100px', overflow: 'auto' }}>
              <ul className="tree-view">
                <li>Ambulans 1 (192.168.1.101)</li>
                <li>Ambulans 2 (192.168.1.102)</li>
                <li>Brandstation (192.168.1.103)</li>
                <li>Polisstation (192.168.1.104)</li>
                <li>Sjukhus (192.168.1.105)</li>
              </ul>
            </div>
          </fieldset>
          
          <div className="field-row" style={{ justifyContent: 'flex-end', marginTop: '12px' }}>
            <button>Diagnostik</button>
            <button>Uppdatera</button>
          </div>
        </div>
      </div>
    </div>
  );
}; 