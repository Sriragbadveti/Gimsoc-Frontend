import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import DynamicQRCode from '../Components/DynamicQRCode';
import './TicketQRPage.css';

const TicketQRPage = () => {
  const { ticketId } = useParams();
  const navigate = useNavigate();
  const [ticketData, setTicketData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [qrUpdateCount, setQrUpdateCount] = useState(0);
  const [lastUpdate, setLastUpdate] = useState(null);

  useEffect(() => {
    if (!ticketId) {
      setError('No ticket ID provided');
      setLoading(false);
      return;
    }

    // Fetch ticket data
    const fetchTicketData = async () => {
      try {
        console.log('🔍 Fetching ticket data for:', ticketId);
        const response = await fetch(`https://gimsoc-backend.onrender.com/api/form/ticket/${ticketId}`);
        console.log('📡 Response status:', response.status);
        
        if (response.ok) {
          const data = await response.json();
          console.log('✅ Ticket data received:', data);
          setTicketData(data);
        } else {
          const errorData = await response.json();
          console.error('❌ Ticket not found:', errorData);
          setError('Ticket not found');
        }
      } catch (error) {
        console.error('❌ Error fetching ticket:', error);
        setError('Failed to load ticket data');
      } finally {
        setLoading(false);
      }
    };

    fetchTicketData();
  }, [ticketId]);

  const handleQRUpdate = (qrData) => {
    setQrUpdateCount(prev => prev + 1);
    setLastUpdate(new Date());
    console.log('🔄 QR Code updated:', qrData);
  };

  const formatTime = (date) => {
    if (!date) return 'Never';
    return new Date(date).toLocaleTimeString();
  };

  if (loading) {
    return (
      <div className="qr-page-loading">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <h2>Loading Your Ticket QR Code...</h2>
          <p>Preparing your secure QR code for conference check-in</p>
        </div>
      </div>
    );
  }

  if (error && !ticketData) {
    return (
      <div className="qr-page-error">
        <div className="error-container">
          <div className="error-icon">⚠️</div>
          <h2>Ticket Not Found</h2>
          <p>{error}</p>
          <button onClick={() => navigate('/')} className="back-button">
            Return to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="ticket-qr-page">
      {/* Animated Background */}
      <div className="animated-background">
        <div className="floating-particles">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="particle"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 6}s`,
                animationDuration: `${6 + Math.random() * 4}s`,
              }}
            />
          ))}
        </div>
      </div>

      {/* Header */}
      <div className="qr-page-header">
        <div className="header-content">
          <h1>🎫 MEDCON 2025</h1>
          <h2>Your Secure Ticket QR Code</h2>
          <p>Scan this QR code at the conference for quick check-in</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="qr-page-content">
        <div className="qr-container">
          {/* Ticket Info */}
          <div className="ticket-info">
            <div className="info-card">
              <h3>📋 Ticket Details</h3>
              <div className="info-grid">
                <div className="info-item">
                  <span className="label">Name:</span>
                  <span className="value">{ticketData?.fullName || 'Loading...'}</span>
                </div>
                <div className="info-item">
                  <span className="label">Ticket Type:</span>
                  <span className="value">{ticketData?.ticketType || 'Loading...'}</span>
                </div>
                <div className="info-item">
                  <span className="label">Ticket ID:</span>
                  <span className="value">{ticketId}</span>
                </div>
                <div className="info-item">
                  <span className="label">Status:</span>
                  <span className="value status-active">✅ Active</span>
                </div>
              </div>
            </div>
          </div>

          {/* QR Code Display */}
          <div className="qr-display-section">
            <DynamicQRCode 
              ticketId={ticketId} 
              onQRUpdate={handleQRUpdate}
            />
          </div>

          {/* QR Status */}
          <div className="qr-status">
            <div className="status-card">
              <h3>🔒 Security Status</h3>
              <div className="status-grid">
                <div className="status-item">
                  <span className="status-icon">🔄</span>
                  <span className="status-text">Auto-updates every 5 minutes</span>
                </div>
                <div className="status-item">
                  <span className="status-icon">⚡</span>
                  <span className="status-text">Real-time timestamp validation</span>
                </div>
                <div className="status-item">
                  <span className="status-icon">🔐</span>
                  <span className="status-text">Cryptographically signed</span>
                </div>
                <div className="status-item">
                  <span className="status-icon">⏰</span>
                  <span className="status-text">Last updated: {formatTime(lastUpdate)}</span>
                </div>
                <div className="status-item">
                  <span className="status-icon">📊</span>
                  <span className="status-text">Updates: {qrUpdateCount}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Instructions */}
        <div className="instructions-section">
          <div className="instructions-card">
            <h3>📱 How to Use</h3>
            <div className="instructions-list">
              <div className="instruction-item">
                <span className="instruction-number">1</span>
                <span className="instruction-text">Show this QR code at conference check-in</span>
              </div>
              <div className="instruction-item">
                <span className="instruction-number">2</span>
                <span className="instruction-text">QR code updates every 5 minutes for security</span>
              </div>
              <div className="instruction-item">
                <span className="instruction-number">3</span>
                <span className="instruction-text">Keep this page open for live updates</span>
              </div>
              <div className="instruction-item">
                <span className="instruction-number">4</span>
                <span className="instruction-text">Use Ticket ID as backup if needed</span>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="action-buttons">
          <button 
            onClick={() => window.print()} 
            className="print-button"
          >
            🖨️ Print QR Code
          </button>
          <button 
            onClick={() => navigate('/')} 
            className="home-button"
          >
            🏠 Back to Home
          </button>
        </div>
      </div>

      {/* Footer */}
      <div className="qr-page-footer">
        <p>🔒 Your QR code is secure and updates automatically</p>
        <p>📧 You can also check your email for a copy of this QR code</p>
      </div>
    </div>
  );
};

export default TicketQRPage; 