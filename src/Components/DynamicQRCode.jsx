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
  const scanIntervalRef = useRef(null);

  useEffect(() => {
    if (!ticketId) return;

    // Connect to WebSocket for real-time updates
    const connectWebSocket = () => {
      const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
      const wsUrl = `${protocol}//${window.location.host}/ws/qr`;
      
      wsRef.current = new WebSocket(wsUrl);

      wsRef.current.onopen = () => {
        console.log('🔗 WebSocket connected');
        setIsConnected(true);
        setError(null);
        
        // Subscribe to QR updates for this ticket
        wsRef.current.send(JSON.stringify({
          type: 'subscribe',
          ticketId: ticketId
        }));
      };

      wsRef.current.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          
          if (data.type === 'qr_update') {
            setQrCode(data.qrCode);
            setLastUpdate(new Date(data.timestamp));
            
            // Trigger scanning animation
            setIsScanning(true);
            setTimeout(() => setIsScanning(false), 2000);
            
            // Notify parent component
            if (onQRUpdate) {
              onQRUpdate(data);
            }
          }
        } catch (error) {
          console.error('❌ Error parsing WebSocket message:', error);
        }
      };

      wsRef.current.onclose = () => {
        console.log('🔌 WebSocket disconnected');
        setIsConnected(false);
        
        // Attempt to reconnect after 5 seconds
        setTimeout(connectWebSocket, 5000);
      };

      wsRef.current.onerror = (error) => {
        console.error('❌ WebSocket error:', error);
        setError('Connection error. Retrying...');
      };
    };

    connectWebSocket();

    // Start scanning animation
    scanIntervalRef.current = setInterval(() => {
      setIsScanning(true);
      setTimeout(() => setIsScanning(false), 2000);
    }, 10000); // Every 10 seconds

    return () => {
      if (wsRef.current) {
        wsRef.current.close();
      }
      if (scanIntervalRef.current) {
        clearInterval(scanIntervalRef.current);
      }
    };
  }, [ticketId, onQRUpdate]);

  // Get initial QR code
  useEffect(() => {
    const fetchQRCode = async () => {
      try {
        const response = await fetch(`/api/qr/ticket/${ticketId}`);
        if (response.ok) {
          const data = await response.json();
          setQrCode(data.qrCode);
          setLastUpdate(new Date(data.lastUpdate));
        } else {
          setError('Failed to load QR code');
        }
      } catch (error) {
        console.error('❌ Error fetching QR code:', error);
        setError('Failed to load QR code');
      }
    };

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
          <span className={`status-indicator ${isConnected ? 'connected' : 'disconnected'}`}>
            {isConnected ? '🟢 Live' : '🔴 Offline'}
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
            <img 
              src={qrCode} 
              alt="Dynamic QR Code" 
              className="qr-code-image"
            />
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