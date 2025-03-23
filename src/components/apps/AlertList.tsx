'use client';

import React from 'react';
import { FaExclamationTriangle, FaInfoCircle, FaCheckCircle } from 'react-icons/fa';

const AlertList: React.FC = () => {
  return (
    <div className="p-0">
      <div className="window-custom" style={{ width: '100%', height: '100%', position: 'relative', boxShadow: 'none', border: 'none' }}>
        <div className="window-body-custom" style={{ padding: '0' }}>
          <div className="alert-header">
            <h2 className="alert-title">Systemvarningar</h2>
          </div>
          
          <div className="alert-content">
            <div className="alert-item alert-critical">
              <div className="alert-icon">
                <FaExclamationTriangle />
              </div>
              <div className="alert-text">
                <span>Kritiskt fel i nätverksanslutning</span>
              </div>
              <div className="alert-time">
                10:45
              </div>
            </div>
            
            <div className="alert-item alert-warning">
              <div className="alert-icon">
                <FaExclamationTriangle />
              </div>
              <div className="alert-text">
                <span>Varning: Hög CPU-användning</span>
              </div>
              <div className="alert-time">
                11:30
              </div>
            </div>
            
            <div className="alert-item alert-info">
              <div className="alert-icon">
                <FaInfoCircle />
              </div>
              <div className="alert-text">
                <span>Information: Systemuppdatering tillgänglig</span>
              </div>
              <div className="alert-time">
                12:15
              </div>
            </div>
            
            <div className="alert-item alert-success">
              <div className="alert-icon">
                <FaCheckCircle />
              </div>
              <div className="alert-text">
                <span>Säkerhetskopiering slutförd</span>
              </div>
              <div className="alert-time">
                13:00
              </div>
            </div>
          </div>
          
          <div className="alert-footer">
            <div className="alert-checkbox">
              <input type="checkbox" id="show-all" />
              <label htmlFor="show-all">Visa alla</label>
            </div>
            <div className="alert-actions">
              <button className="alert-button">Rensa alla</button>
              <button className="alert-button">Detaljer</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AlertList; 