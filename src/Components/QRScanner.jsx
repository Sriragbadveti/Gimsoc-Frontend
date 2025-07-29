import React, { useState, useRef, useEffect } from 'react';
import './QRScanner.css';

const QRScanner = () => {
  const [isScanning, setIsScanning] = useState(false);
  const [scannedData, setScannedData] = useState(null);
  const [ticketDetails, setTicketDetails] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const videoRef = useRef(null);
  const streamRef = useRef(null);

  const startScanning = async () => {
    try {
      setError(null);
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: 'environment' } 
      });
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        streamRef.current = stream;
        setIsScanning(true);
      }
    } catch (err) {
      setError('Camera access denied. Please allow camera access to scan QR codes.');
    }
  };

  const stopScanning = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    setIsScanning(false);
  };

  const fetchTicketDetails = async (ticketId) => {
    try {
      setLoading(true);
      setError(null);
      
      console.log('🔍 Fetching ticket details for:', ticketId);
      const response = await fetch(`https://gimsoc-backend.onrender.com/api/form/ticket/${ticketId}`);
      
      console.log('📡 Response status:', response.status);
      console.log('📡 Response headers:', response.headers);
      
      if (response.ok) {
        const data = await response.json();
        console.log('✅ Ticket details received:', data);
        setTicketDetails(data);
      } else {
        const errorData = await response.json().catch(() => ({ error: 'Failed to parse error response' }));
        console.error('❌ Ticket not found:', errorData);
        setError(`Ticket not found in database (Status: ${response.status})`);
      }
    } catch (error) {
      console.error('❌ Error fetching ticket details:', error);
      setError(`Failed to fetch ticket details: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleQRScan = (qrData) => {
    try {
      console.log('📱 QR Code scanned:', qrData);
      setScannedData(qrData);
      
      // Extract ticket ID from QR data - handle both string and object formats
      let ticketId = null;
      let userData = null;
      
      if (typeof qrData === 'string') {
        // Try to parse as JSON if it's a string
        try {
          const parsedData = JSON.parse(qrData);
          ticketId = parsedData.ticketId;
          userData = parsedData;
        } catch (e) {
          // If it's not JSON, treat as direct ticket ID
          ticketId = qrData;
        }
      } else if (typeof qrData === 'object') {
        ticketId = qrData.ticketId;
        userData = qrData;
      }
      
      if (ticketId) {
        console.log('🎫 Ticket ID extracted:', ticketId);
        
        // If QR data contains user information, use it directly
        if (userData && userData.fullName) {
          console.log('✅ User data found in QR code:', userData);
          setTicketDetails({
            ticketId: userData.ticketId,
            fullName: userData.fullName,
            email: userData.email,
            ticketType: userData.ticketType,
            ticketCategory: userData.ticketCategory,
            createdAt: new Date(userData.timestamp)
          });
        } else {
          // Fall back to fetching from database
          console.log('🔍 No user data in QR, fetching from database');
          fetchTicketDetails(ticketId);
        }
      } else {
        console.error('❌ No ticket ID found in QR data:', qrData);
        setError('Invalid QR code format - no ticket ID found');
      }
    } catch (error) {
      console.error('❌ Error processing QR data:', error);
      setError('Invalid QR code');
    }
  };

  const handleManualInput = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const qrDataString = formData.get('qrData');
    
    try {
      const qrData = JSON.parse(qrDataString);
      handleQRScan(qrData);
    } catch (error) {
      setError('Invalid JSON format');
    }
  };

  const resetScan = () => {
    setScannedData(null);
    setTicketDetails(null);
    setError(null);
    stopScanning();
  };

  useEffect(() => {
    return () => {
      stopScanning();
    };
  }, []);

  return (
    <div className="qr-scanner-container">
      <div className="scanner-header">
        <h2>🎫 MEDCON QR Scanner</h2>
        <p>Scan QR codes to validate tickets and view details</p>
      </div>

      {!isScanning && !scannedData && (
        <div className="scanner-controls">
          <button onClick={startScanning} className="scan-button">
            📱 Start Camera Scan
          </button>
        </div>
      )}

      {isScanning && (
        <div className="camera-container">
          <video 
            ref={videoRef} 
            autoPlay 
            playsInline 
            className="camera-feed"
          />
          <div className="scan-frame">
            <div className="scan-line"></div>
          </div>
          <button onClick={stopScanning} className="stop-button">
            ⏹️ Stop Scanning
          </button>
        </div>
      )}

      {!isScanning && (
        <div className="manual-input">
          <h3>📝 Manual QR Data Input</h3>
          <form onSubmit={handleManualInput}>
            <textarea
              name="qrData"
              placeholder="Paste QR code JSON data here..."
              rows="4"
              className="qr-input"
            />
            <button type="submit" className="submit-button">
              🔍 Validate QR Code
            </button>
          </form>
        </div>
      )}

      {error && (
        <div className="error-message">
          <p>❌ {error}</p>
          <button onClick={resetScan} className="reset-button">
            🔄 Try Again
          </button>
        </div>
      )}

      {loading && (
        <div className="loading-message">
          <div className="loading-spinner"></div>
          <p>🔍 Fetching ticket details...</p>
        </div>
      )}

      {scannedData && (
        <div className="scanned-data">
          <h3>📱 Scanned QR Data</h3>
          <div className="data-card">
            <div className="data-item">
              <span className="label">Raw Data:</span>
              <span className="value">{JSON.stringify(scannedData, null, 2)}</span>
            </div>
            <div className="data-item">
              <span className="label">Ticket ID:</span>
              <span className="value">{scannedData.ticketId || 'Not found'}</span>
            </div>
            {scannedData.timestamp && (
              <div className="data-item">
                <span className="label">Timestamp:</span>
                <span className="value">{new Date(scannedData.timestamp).toLocaleString()}</span>
              </div>
            )}
            {scannedData.expiry && (
              <div className="data-item">
                <span className="label">Expiry:</span>
                <span className="value">{new Date(scannedData.expiry).toLocaleString()}</span>
              </div>
            )}
            {scannedData.expiry && (
              <div className="data-item">
                <span className="label">Status:</span>
                <span className="value">
                  {Date.now() < scannedData.expiry ? '✅ Valid' : '❌ Expired'}
                </span>
              </div>
            )}
            {scannedData.fullName && (
              <div className="data-item">
                <span className="label">Name:</span>
                <span className="value">{scannedData.fullName}</span>
              </div>
            )}
            {scannedData.email && (
              <div className="data-item">
                <span className="label">Email:</span>
                <span className="value">{scannedData.email}</span>
              </div>
            )}
            {scannedData.ticketType && (
              <div className="data-item">
                <span className="label">Ticket Type:</span>
                <span className="value">{scannedData.ticketType}</span>
              </div>
            )}
          </div>
        </div>
      )}

      {ticketDetails && (
        <div className="name-display">
          <h2>👤 {ticketDetails.fullName}</h2>
        </div>
      )}

      {ticketDetails && (
        <div className="ticket-details">
          <h3>🎫 Ticket Details</h3>
          <div className="ticket-card">
            <div className="ticket-item">
              <span className="label">Name:</span>
              <span className="value">{ticketDetails.fullName}</span>
            </div>
            <div className="ticket-item">
              <span className="label">Email:</span>
              <span className="value">{ticketDetails.email}</span>
            </div>
            <div className="ticket-item">
              <span className="label">Ticket Type:</span>
              <span className="value">{ticketDetails.ticketType}</span>
            </div>
            <div className="ticket-item">
              <span className="label">Category:</span>
              <span className="value">{ticketDetails.ticketCategory}</span>
            </div>
            <div className="ticket-item">
              <span className="label">Registration Date:</span>
              <span className="value">{new Date(ticketDetails.createdAt).toLocaleDateString()}</span>
            </div>
            <div className="ticket-item">
              <span className="label">Status:</span>
              <span className="value status-valid">✅ Valid Ticket</span>
            </div>

          </div>
        </div>
      )}

      {(scannedData || ticketDetails) && (
        <div className="scanner-actions">
          <button onClick={resetScan} className="reset-button">
            🔄 Scan Another QR Code
          </button>
        </div>
      )}
    </div>
  );
};

export default QRScanner; 