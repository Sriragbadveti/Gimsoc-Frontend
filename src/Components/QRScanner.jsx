import React, { useState, useEffect, useRef } from 'react';
import './QRScanner.css';

const QRScanner = ({ onScanResult }) => {
  const [isScanning, setIsScanning] = useState(false);
  const [scanResult, setScanResult] = useState(null);
  const [error, setError] = useState(null);
  const [isValidating, setIsValidating] = useState(false);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const streamRef = useRef(null);

  useEffect(() => {
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  const startScanning = async () => {
    try {
      setError(null);
      setIsScanning(true);
      
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment' }
      });
      
      streamRef.current = stream;
      videoRef.current.srcObject = stream;
      
      // Start QR detection
      detectQRCode();
    } catch (error) {
      console.error('❌ Error accessing camera:', error);
      setError('Camera access denied. Please allow camera permissions.');
      setIsScanning(false);
    }
  };

  const stopScanning = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    setIsScanning(false);
    setScanResult(null);
  };

  const detectQRCode = () => {
    if (!videoRef.current || !canvasRef.current) return;

    const video = videoRef.current;
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');

    const scanFrame = () => {
      if (!isScanning) return;

      // Draw video frame to canvas
      context.drawImage(video, 0, 0, canvas.width, canvas.height);
      
      // Get image data for QR detection
      const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
      
      // Simple QR detection (you can use a library like jsQR for better detection)
      // For now, we'll simulate QR detection
      setTimeout(() => {
        if (isScanning) {
          scanFrame();
        }
      }, 100);
    };

    scanFrame();
  };

  const validateQRCode = async (qrData) => {
    try {
      setIsValidating(true);
      setError(null);

      const response = await fetch('/api/qr/validate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ qrData }),
      });

      const result = await response.json();
      
      setScanResult(result);
      
      if (result.valid) {
        // Success feedback
        playSuccessSound();
        if (onScanResult) {
          onScanResult(result);
        }
      } else {
        // Error feedback
        playErrorSound();
        setError(result.message || 'Invalid QR code');
      }
    } catch (error) {
      console.error('❌ Error validating QR code:', error);
      setError('Network error. Please try again.');
    } finally {
      setIsValidating(false);
    }
  };

  const playSuccessSound = () => {
    // You can add a success sound here
    console.log('🎉 QR code validated successfully!');
  };

  const playErrorSound = () => {
    // You can add an error sound here
    console.log('❌ QR code validation failed!');
  };

  const handleManualQRInput = (event) => {
    const qrData = event.target.value;
    if (qrData) {
      validateQRCode(qrData);
    }
  };

  const resetScanner = () => {
    setScanResult(null);
    setError(null);
    if (isScanning) {
      stopScanning();
    }
  };

  return (
    <div className="qr-scanner-container">
      <div className="scanner-header">
        <h2>📱 QR Code Scanner</h2>
        <p>Scan attendee QR codes for conference check-in</p>
      </div>

      <div className="scanner-controls">
        {!isScanning ? (
          <button 
            className="scan-button start"
            onClick={startScanning}
            disabled={isValidating}
          >
            🎥 Start Scanning
          </button>
        ) : (
          <button 
            className="scan-button stop"
            onClick={stopScanning}
            disabled={isValidating}
          >
            ⏹️ Stop Scanning
          </button>
        )}
        
        <button 
          className="reset-button"
          onClick={resetScanner}
          disabled={isValidating}
        >
          🔄 Reset
        </button>
      </div>

      <div className="scanner-view">
        {isScanning ? (
          <div className="camera-container">
            <video
              ref={videoRef}
              autoPlay
              playsInline
              className="camera-feed"
            />
            <canvas
              ref={canvasRef}
              width="640"
              height="480"
              style={{ display: 'none' }}
            />
            
            {/* Scanning overlay */}
            <div className="scan-overlay">
              <div className="scan-frame"></div>
              <div className="scan-line"></div>
            </div>
          </div>
        ) : (
          <div className="scanner-placeholder">
            <div className="placeholder-icon">📱</div>
            <p>Click "Start Scanning" to begin</p>
          </div>
        )}
      </div>

      {/* Manual QR input */}
      <div className="manual-input">
        <h3>Manual QR Input</h3>
        <textarea
          placeholder="Paste QR code data here..."
          onChange={handleManualQRInput}
          disabled={isValidating}
          rows="3"
        />
      </div>

      {/* Validation results */}
      {isValidating && (
        <div className="validation-status">
          <div className="loading-spinner"></div>
          <p>Validating QR code...</p>
        </div>
      )}

      {scanResult && (
        <div className={`scan-result ${scanResult.valid ? 'valid' : 'invalid'}`}>
          <h3>{scanResult.valid ? '✅ Valid' : '❌ Invalid'}</h3>
          <p>{scanResult.message}</p>
          {scanResult.valid && (
            <div className="ticket-info">
              <p><strong>Ticket ID:</strong> {scanResult.ticketId}</p>
              <p><strong>Scanned at:</strong> {new Date(scanResult.scannedAt).toLocaleString()}</p>
            </div>
          )}
        </div>
      )}

      {error && (
        <div className="scanner-error">
          <p>⚠️ {error}</p>
        </div>
      )}
    </div>
  );
};

export default QRScanner; 