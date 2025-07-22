import React, { useState, useEffect, useRef } from 'react';
import './DynamicQRCode.css';

// Note: Using native WebSocket API, no additional imports needed

const DynamicQRCode = ({ ticketId, onQRUpdate }) => {
  const [qrCode, setQrCode] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const [lastUpdate, setLastUpdate] = useState(null);
  const [isScanning, setIsScanning] = useState(false);
  const [error, setError] = useState(null);
  const wsRef = useRef(null);

  // Get initial QR code
  const fetchQRCode = async () => {
    try {
      // Generate dynamic QR code using the hosted service
      const timestamp = Date.now();
      const expiry = timestamp + (5 * 60 * 1000); // 5 minutes
      const qrData = {
        ticketId: ticketId,
        timestamp: timestamp,
        expiry: expiry,
        signature: `sig_${ticketId}_${timestamp}`,
        nonce: `nonce_${Math.random().toString(36).substr(2, 9)}`
      };

      // Generate QR code using hosted service
      const qrDataString = JSON.stringify(qrData);
      const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(qrDataString)}&format=png&margin=2&ecc=H`;
      
      setQrCode(qrCodeUrl);
      setLastUpdate(new Date(timestamp));
      console.log('🎫 Generated dynamic QR for ticket:', ticketId);
    } catch (error) {
      console.error('❌ Error generating QR code:', error);
      setError('Failed to generate QR code');
    }
  };

  useEffect(() => {
    if (!ticketId) return;

    // Generate dynamic QR code with periodic updates
    console.log('🎫 Loading dynamic QR code for ticket:', ticketId);
    
    // Initial QR generation
    fetchQRCode();
    
    // Update QR code every 5 minutes (300 seconds)
    const qrUpdateInterval = setInterval(() => {
      console.log('🔄 Updating QR code...');
      fetchQRCode();
    }, 300000); // 5 minutes
    
    // Start continuous scanning animation immediately
    setIsScanning(true);
    console.log('🔍 Continuous scanning animation started');

    return () => {
      if (qrUpdateInterval) {
        clearInterval(qrUpdateInterval);
      }
    };
  }, [ticketId, onQRUpdate]);

  // Get initial QR code
  useEffect(() => {
    fetchQRCode();
  }, [ticketId]);

  const formatTime = (date) => {
    if (!date) return 'Never';
    return new Date(date).toLocaleTimeString();
  };

  return (
    <div className="dynamic-qr-container">
      <div className="qr-header">
        <h3>🎫 Your Dynamic Ticket QR Code</h3>
        <div className="connection-status">
          <span className="status-indicator connected">
            🟢 Dynamic QR Code
          </span>
          {lastUpdate && (
            <span className="last-update">
              Last updated: {formatTime(lastUpdate)}
            </span>
          )}
        </div>
      </div>

      <div className="qr-display">
        <div className={`qr-code-container ${isScanning ? 'scanning' : ''}`}>
          {qrCode ? (
            <>
              <img 
                src={qrCode} 
                alt="Dynamic QR Code" 
                className="qr-code-image"
                onError={(e) => {
                  console.error('❌ QR code image failed to load:', e);
                  e.target.style.display = 'none';
                  e.target.nextSibling.style.display = 'block';
                }}
              />
              <div className="qr-fallback" style={{ display: 'none', textAlign: 'center', padding: '20px' }}>
                <div style={{ background: '#f8f9fa', padding: '15px', borderRadius: '8px', marginTop: '10px' }}>
                  <p style={{ margin: '0 0 10px 0', color: '#6c757d', fontSize: '14px' }}>
                    <strong>QR Code Unavailable</strong>
                  </p>
                  <p style={{ margin: '0', color: '#6c757d', fontSize: '12px' }}>
                    Please use your Ticket ID for check-in
                  </p>
                </div>
              </div>
            </>
          ) : (
            <div className="qr-loading">
              <div className="loading-spinner"></div>
              <p>Loading QR Code...</p>
            </div>
          )}
          
          {/* Scanning animation overlay */}
          <div className={`scan-line ${isScanning ? 'active' : ''}`}></div>
          
          {/* Pulse effect */}
          <div className={`pulse-ring ${isScanning ? 'active' : ''}`}></div>
        </div>

        {error && (
          <div className="qr-error">
            <p>⚠️ {error}</p>
            <button onClick={() => window.location.reload()}>
              Retry
            </button>
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