'use client';

import React, { useState, useEffect } from 'react';

interface IncidentReportData {
  type: string;
  subtype?: string;
  priority: string;
  location: string;
  callerName: string;
  callerPhone: string;
  description: string;
  requiredUnits: string[];
  timestamp: Date;
}

const IncidentReport: React.FC = () => {
  const [currentDate, setCurrentDate] = useState<string>('');
  const [currentTime, setCurrentTime] = useState<string>('');
  const [incidentType, setIncidentType] = useState<string>('');
  const [priority, setPriority] = useState<string>('medium');
  const [location, setLocation] = useState<string>('');
  const [callerName, setCallerName] = useState<string>('');
  const [callerPhone, setCallerPhone] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [requiredUnits, setRequiredUnits] = useState<string[]>([]);
  const [fireType, setFireType] = useState<string>('building');
  const [medicalType, setMedicalType] = useState<string>('cardiac');
  const [policeType, setPoliceType] = useState<string>('assault');
  const [trafficType, setTrafficType] = useState<string>('collision');

  // Update date and time
  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date();
      const dateOptions: Intl.DateTimeFormatOptions = { 
        year: 'numeric', 
        month: '2-digit', 
        day: '2-digit' 
      };
      const timeOptions: Intl.DateTimeFormatOptions = { 
        hour: '2-digit', 
        minute: '2-digit', 
        second: '2-digit', 
        hour12: false 
      };
      
      setCurrentDate(now.toLocaleDateString('sv-SE', dateOptions));
      setCurrentTime(now.toLocaleTimeString('sv-SE', timeOptions));
    };
    
    updateDateTime();
    const interval = setInterval(updateDateTime, 1000);
    
    return () => clearInterval(interval);
  }, []);

  const handleDispatch = () => {
    if (!incidentType || !location) {
      alert('Vänligen fyll i typ av händelse och plats innan du skickar enheter.');
      return;
    }
    
    // Collect form data
    const report: IncidentReportData = {
      type: incidentType,
      priority: priority,
      location: location,
      callerName: callerName,
      callerPhone: callerPhone,
      description: description,
      requiredUnits: requiredUnits,
      timestamp: new Date()
    };
    
    // Get subtype if applicable
    if (incidentType === 'fire') {
      report.subtype = fireType;
    } else if (incidentType === 'medical') {
      report.subtype = medicalType;
    } else if (incidentType === 'police') {
      report.subtype = policeType;
    } else if (incidentType === 'traffic') {
      report.subtype = trafficType;
    }
    
    alert('Enheter skickade till platsen. Operatörer har informerats.');
    console.log('Incident report submitted:', report);
  };

  const handleCancel = () => {
    if (confirm('Är du säker på att du vill avbryta denna rapport?')) {
      setIncidentType('');
      setPriority('medium');
      setLocation('');
      setCallerName('');
      setCallerPhone('');
      setDescription('');
      setRequiredUnits([]);
      setFireType('building');
      setMedicalType('cardiac');
      setPoliceType('assault');
      setTrafficType('collision');
    }
  };

  const handleRequiredUnitsChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const options = e.target.options;
    const selectedValues: string[] = [];
    
    for (let i = 0; i < options.length; i++) {
      if (options[i].selected) {
        selectedValues.push(options[i].value);
      }
    }
    
    setRequiredUnits(selectedValues);
  };

  const getPriorityClass = () => {
    switch (priority) {
      case 'low':
        return 'win10-priority-low';
      case 'medium':
        return 'win10-priority-medium';
      case 'high':
        return 'win10-priority-high';
      case 'critical':
        return 'win10-priority-critical';
      default:
        return 'win10-priority-medium';
    }
  };

  return (
    <div className="win10-form-container">
      <div className="win10-form-header">
        <h2 className="win10-form-title">Akut Händelserapport</h2>
        <div className="win10-datetime">
          <span className="win10-date mr-2">{currentDate}</span>
          <span className="win10-time">{currentTime}</span>
        </div>
      </div>
      
      <div className={`win10-form ${getPriorityClass()}`}>
        <div className="win10-form-row">
          <div className="win10-form-group">
            <label htmlFor="incident-type" className="win10-label">Typ av händelse:</label>
            <select 
              id="incident-type" 
              className="win10-select"
              value={incidentType}
              onChange={(e) => setIncidentType(e.target.value)}
              style={{ backgroundColor: 'white' }}
            >
              <option value="">Välj typ...</option>
              <option value="fire">Brand</option>
              <option value="medical">Medicinsk</option>
              <option value="police">Polis</option>
              <option value="traffic">Trafikolycka</option>
            </select>
          </div>
          <div className="win10-form-group">
            <label htmlFor="priority" className="win10-label">Prioritet:</label>
            <select 
              id="priority" 
              className={`win10-select ${getPriorityClass()}`}
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              style={{ backgroundColor: 'white' }}
            >
              <option value="low">Låg</option>
              <option value="medium">Medium</option>
              <option value="high">Hög</option>
              <option value="critical">Kritisk</option>
            </select>
          </div>
        </div>
        
        <div className="win10-form-row">
          <div className="win10-form-group">
            <label htmlFor="location" className="win10-label">Plats:</label>
            <input 
              type="text" 
              id="location" 
              className="win10-input" 
              placeholder="Gatuadress eller koordinater"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              style={{ backgroundColor: 'white' }}
            />
          </div>
          <div className="win10-form-group">
            <label htmlFor="caller-name" className="win10-label">Anmälarens namn:</label>
            <input 
              type="text" 
              id="caller-name" 
              className="win10-input" 
              placeholder="För- och efternamn"
              value={callerName}
              onChange={(e) => setCallerName(e.target.value)}
              style={{ backgroundColor: 'white' }}
            />
          </div>
        </div>
        
        <div className="win10-form-row">
          <div className="win10-form-group">
            <label htmlFor="caller-phone" className="win10-label">Telefonnummer:</label>
            <input 
              type="text" 
              id="caller-phone" 
              className="win10-input" 
              placeholder="07X-XXX XX XX"
              value={callerPhone}
              onChange={(e) => setCallerPhone(e.target.value)}
              style={{ backgroundColor: 'white' }}
            />
          </div>
          {incidentType === 'fire' && (
            <div className="win10-form-group">
              <label htmlFor="fire-type" className="win10-label">Typ av brand:</label>
              <select 
                id="fire-type" 
                className="win10-select"
                value={fireType}
                onChange={(e) => setFireType(e.target.value)}
                style={{ backgroundColor: 'white' }}
              >
                <option value="building">Byggnad</option>
                <option value="vehicle">Fordon</option>
                <option value="forest">Skogsbrand</option>
                <option value="industrial">Industriell</option>
              </select>
            </div>
          )}
          {incidentType === 'medical' && (
            <div className="win10-form-group">
              <label htmlFor="medical-type" className="win10-label">Medicinsk situation:</label>
              <select 
                id="medical-type" 
                className="win10-select"
                value={medicalType}
                onChange={(e) => setMedicalType(e.target.value)}
                style={{ backgroundColor: 'white' }}
              >
                <option value="cardiac">Hjärtstopp</option>
                <option value="trauma">Trauma</option>
                <option value="breathing">Andningssvårigheter</option>
                <option value="stroke">Stroke</option>
              </select>
            </div>
          )}
          {incidentType === 'police' && (
            <div className="win10-form-group">
              <label htmlFor="police-type" className="win10-label">Polisärende:</label>
              <select 
                id="police-type" 
                className="win10-select"
                value={policeType}
                onChange={(e) => setPoliceType(e.target.value)}
                style={{ backgroundColor: 'white' }}
              >
                <option value="assault">Överfall</option>
                <option value="theft">Stöld</option>
                <option value="disturbance">Störning</option>
                <option value="suspicious">Misstänkt aktivitet</option>
              </select>
            </div>
          )}
          {incidentType === 'traffic' && (
            <div className="win10-form-group">
              <label htmlFor="traffic-type" className="win10-label">Typ av trafikolycka:</label>
              <select 
                id="traffic-type" 
                className="win10-select"
                value={trafficType}
                onChange={(e) => setTrafficType(e.target.value)}
                style={{ backgroundColor: 'white' }}
              >
                <option value="collision">Kollision</option>
                <option value="pedestrian">Fotgängare inblandad</option>
                <option value="motorcycle">Motorcykel inblandad</option>
                <option value="multiple">Flera fordon</option>
              </select>
            </div>
          )}
          {!incidentType && (
            <div className="win10-form-group">
              {/* Empty div to maintain layout */}
            </div>
          )}
        </div>
        
        <div className="win10-form-row">
          <div className="win10-form-group full-width">
            <label htmlFor="units-required" className="win10-label">Enheter som behövs:</label>
            <select 
              id="units-required" 
              className="win10-select" 
              multiple
              value={requiredUnits}
              onChange={handleRequiredUnitsChange}
              size={4}
              style={{ backgroundColor: 'white' }}
            >
              <option value="ambulance">Ambulans</option>
              <option value="fire-truck">Brandbil</option>
              <option value="police-car">Polisbil</option>
              <option value="helicopter">Helikopter</option>
              <option value="special">Specialenhet</option>
            </select>
            <small className="win10-help-text">Håll ned Ctrl för att välja flera</small>
          </div>
        </div>
        
        <div className="win10-form-row">
          <div className="win10-form-group full-width">
            <label htmlFor="incident-description" className="win10-label">Händelsebeskrivning:</label>
            <textarea 
              id="incident-description" 
              className="win10-textarea" 
              rows={3} 
              placeholder="Beskriv situationen i detalj..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              style={{ backgroundColor: 'white' }}
            ></textarea>
          </div>
        </div>
        
        <div className="win10-form-actions">
          <button 
            id="dispatch-btn" 
            className="win10-button win10-button-primary"
            onClick={handleDispatch}
          >
            Skicka enheter
          </button>
          <button 
            id="cancel-btn" 
            className="win10-button win10-button-secondary"
            onClick={handleCancel}
          >
            Avbryt
          </button>
        </div>
      </div>
    </div>
  );
};

export default IncidentReport; 