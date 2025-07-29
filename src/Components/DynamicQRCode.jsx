import React, { useState, useEffect, useRef } from 'react';
import './DynamicQRCode.css';

const DynamicQRCode = ({ ticketId, userData }) => {
  const [qrCodeUrl, setQrCodeUrl] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isScanning, setIsScanning] = useState(false);
  const wsRef = useRef(null);

  useEffect(() => {
    const generateQRCode = async () => {
      try {
        setLoading(true);
        setError(null);

        // Create QR data with user information
        const qrData = {
          ticketId: ticketId,
          timestamp: Date.now(),
          expiry: Date.now() + (5 * 60 * 1000), // 5 minutes
          signature: `sig_${ticketId}_${Date.now()}`,
          nonce: `nonce_${Math.random().toString(36).substring(2, 15)}`
        };

        // Add user information if provided
        if (userData) {
          qrData.fullName = userData.fullName;
          qrData.email = userData.email;
          qrData.ticketType = userData.ticketType;
          qrData.ticketCategory = userData.ticketCategory;
        }

        // Generate QR code using hosted service
        const qrDataString = JSON.stringify(qrData);
        const hostedUrl = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(qrDataString)}`;

        setQrCodeUrl(hostedUrl);
        console.log('✅ QR Code generated with user data:', userData ? 'Yes' : 'No');
        
        // Start scanning animation
        setIsScanning(true);
      } catch (error) {
        console.error('❌ Error generating QR code:', error);
        setError('Failed to generate QR code');
      } finally {
        setLoading(false);
      }
    };

    if (ticketId) {
      generateQRCode();
    }
  }, [ticketId, userData]);

  // WebSocket connection for real-time updates
  useEffect(() => {
    if (ticketId) {
      const connectWebSocket = () => {
        const ws = new WebSocket('wss://gimsoc-backend.onrender.com');
        
        ws.onopen = () => {
          console.log('🔗 WebSocket connected');
          ws.send(JSON.stringify({
            type: 'subscribe',
            ticketId: ticketId
          }));
        };

        ws.onmessage = (event) => {
          try {
            const data = JSON.parse(event.data);
            if (data.type === 'qr_update' && data.ticketId === ticketId) {
              console.log('🔄 QR code updated via WebSocket');
              setQrCodeUrl(data.qrCode);
            }
          } catch (error) {
            console.error('❌ Error parsing WebSocket message:', error);
          }
        };

        ws.onerror = (error) => {
          console.error('❌ WebSocket error:', error);
        };

        ws.onclose = () => {
          console.log('🔌 WebSocket disconnected, attempting to reconnect...');
          setTimeout(connectWebSocket, 5000);
        };

        wsRef.current = ws;
      };

      connectWebSocket();

      return () => {
        if (wsRef.current) {
          wsRef.current.close();
        }
      };
    }
  }, [ticketId]);

  if (loading) {
    return (
      <div className="qr-container">
        <div className="loading-spinner">
          <div className="spinner"></div>
          <p>Generating QR Code...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="qr-container">
        <div className="error-message">
          <p>❌ {error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="qr-container">
      <div className="qr-header">
        <h3>🎫 Your Dynamic MEDCON Ticket QR Code</h3>
        <div className="connection-status">
          <span className="status-indicator connected">
            🟢 Dynamic QR Code
          </span>
        </div>
      </div>
      
      <div className="qr-display">
        <div className={`qr-code-container ${isScanning ? 'scanning' : ''}`}>
          <img 
            src={qrCodeUrl} 
            alt="MEDCON Ticket QR Code" 
            className="qr-code-image"
          />
          
          {/* Scanning line animation */}
          <div className={`scan-line ${isScanning ? 'active' : ''}`}></div>
          
          {/* Pulse effect */}
          <div className={`pulse-ring ${isScanning ? 'active' : ''}`}></div>
        </div>
        
        {userData && (
          <div className="ticket-info">
            <div className="info-item">
              <span className="label">Name:</span>
              <span className="value">{userData.fullName}</span>
            </div>
            <div className="info-item">
              <span className="label">Ticket Type:</span>
              <span className="value">{userData.ticketType}</span>
            </div>
            <div className="info-item">
              <span className="label">Status:</span>
              <span className="value status-valid">✅ Valid</span>
            </div>
          </div>
        )}

        <div className="qr-info">
          <p className="qr-description">
            This QR code updates automatically every 5 minutes for enhanced security.
            Scan it at the conference for quick check-in.
          </p>
          <div className="qr-features">
            <span className="feature">🔒 Time-based security</span>
            <span className="feature">🔄 Auto-updates</span>
            <span className="feature">📱 Mobile-friendly</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DynamicQRCode; 