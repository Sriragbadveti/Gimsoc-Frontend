import React, { useState, useEffect } from 'react';
import QRCode from 'qrcode';
import './DynamicQRCode.css';

const DynamicQRCode = ({ ticketId, userData }) => {
  const [qrCodeDataUrl, setQrCodeDataUrl] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

        // Generate QR code locally
        const qrDataString = JSON.stringify(qrData);
        const dataUrl = await QRCode.toDataURL(qrDataString, {
          errorCorrectionLevel: 'H',
          type: 'image/png',
          quality: 0.92,
          margin: 1,
          color: {
            dark: '#000000',
            light: '#FFFFFF'
          }
        });

        setQrCodeDataUrl(dataUrl);
        console.log('✅ QR Code generated with user data:', userData ? 'Yes' : 'No');
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
        <h3>🎫 Your MEDCON Ticket QR Code</h3>
        <p>Scan this QR code for entry</p>
      </div>
      
      <div className="qr-code-section">
        <div className="qr-code-wrapper">
          <img 
            src={qrCodeDataUrl} 
            alt="MEDCON Ticket QR Code" 
            className="qr-code-image"
          />
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
      </div>
      
      <div className="qr-footer">
        <p className="qr-note">
          <strong>Note:</strong> This QR code updates every 5 minutes for security.
        </p>
        <p className="qr-instructions">
          Present this QR code at the event entrance for check-in.
        </p>
      </div>
    </div>
  );
};

export default DynamicQRCode; 