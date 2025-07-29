"use client";

import { useEffect, useRef, useState } from "react";
import axios from "axios";

export default function PayPalButton({ amount, onSuccess, onError }) {
  const containerRef = useRef(null);
  const buttonRef = useRef(null);
  const [paypalBlocked, setPaypalBlocked] = useState(false);
  const [loading, setLoading] = useState(false);
  const [debugInfo, setDebugInfo] = useState("");

  useEffect(() => {
    console.log("🔍 PayPal Button Debug:", {
      paypalLoaded: !!window.paypal,
      containerRef: !!containerRef.current,
      amount: amount
    });

    // Check if PayPal is blocked by ad blocker
    const checkPayPalBlocked = () => {
      const testImg = new Image();
      testImg.onerror = () => {
        console.warn("⚠️ PayPal may be blocked by ad blocker");
        setPaypalBlocked(true);
        setDebugInfo("PayPal blocked by ad blocker");
      };
      testImg.onload = () => {
        setPaypalBlocked(false);
        setDebugInfo("PayPal accessible");
      };
      testImg.src = "https://www.paypal.com/favicon.ico";
    };

    checkPayPalBlocked();

    if (!window.paypal) {
      console.warn("⚠️ PayPal SDK not loaded");
      setPaypalBlocked(true);
      setDebugInfo("PayPal SDK not loaded");
      return;
    }

    if (!containerRef.current) {
      console.warn("⚠️ Container ref not available");
      setDebugInfo("Container not ready");
      return;
    }

    // Clear any existing buttons
    if (buttonRef.current) {
      buttonRef.current.close();
    }

    // Create unique container ID
    const containerId = `paypal-button-container-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    containerRef.current.id = containerId;

    console.log("🎯 Creating PayPal button with container:", containerId);

    try {
      buttonRef.current = window.paypal
        .Buttons({
          // Style configuration for better UX
          style: {
            layout: 'vertical',
            color: 'blue',
            shape: 'rect',
            label: 'pay'
          },

          createOrder: async () => {
            try {
              setLoading(true);
              console.log("💳 Creating PayPal order for amount:", amount);
              const response = await axios.post("https://gimsoc-backend.onrender.com/api/paypal/create-order", {
                amount: amount || "15.00",
              });
              console.log("✅ PayPal order created:", response.data.id);
              return response.data.id;
            } catch (error) {
              console.error("❌ Error creating PayPal order:", error);
              onError && onError(error);
              throw error;
            } finally {
              setLoading(false);
            }
          },
          onApprove: async (data) => {
            try {
              setLoading(true);
              console.log("✅ PayPal payment approved:", data.orderID);
              const response = await axios.post(
                `https://gimsoc-backend.onrender.com/api/paypal/capture-order/${data.orderID}`
              );
              console.log("✅ PayPal payment captured:", response.data);
              onSuccess && onSuccess(response.data);
            } catch (error) {
              console.error("❌ Error capturing PayPal order:", error);
              onError && onError(error);
              throw error;
            } finally {
              setLoading(false);
            }
          },
          onError: (err) => {
            console.error("❌ PayPal error:", err);
            onError && onError(err);
            setLoading(false);
            setDebugInfo(`PayPal error: ${err.message}`);
          },
          onCancel: () => {
            console.log("❌ PayPal payment cancelled");
            setLoading(false);
            setDebugInfo("Payment cancelled");
          },
        })
        .render(`#${containerId}`);

      console.log("✅ PayPal button rendered successfully");
      setDebugInfo("PayPal button loaded");

      // Cleanup function
      return () => {
        if (buttonRef.current) {
          buttonRef.current.close();
        }
      };
    } catch (error) {
      console.error("❌ Error initializing PayPal button:", error);
      setPaypalBlocked(true);
      setDebugInfo(`Initialization error: ${error.message}`);
    }
  }, [amount, onSuccess, onError]);

  // Fallback when PayPal is blocked
  if (paypalBlocked) {
    return (
      <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
        <div className="flex items-center mb-3">
          <div className="w-5 h-5 bg-yellow-400 rounded-full flex items-center justify-center mr-3">
            <span className="text-yellow-800 text-xs">!</span>
          </div>
          <h3 className="text-sm font-medium text-yellow-800">PayPal Temporarily Unavailable</h3>
        </div>
        <p className="text-sm text-yellow-700 mb-3">
          PayPal may be blocked by your ad blocker or privacy extension. Please try:
        </p>
        <ul className="text-sm text-yellow-700 space-y-1 mb-4">
          <li>• Disable ad blocker for this site</li>
          <li>• Use a different browser</li>
          <li>• Try incognito/private mode</li>
        </ul>
        <button
          onClick={() => window.location.reload()}
          className="w-full bg-yellow-500 hover:bg-yellow-600 text-white font-medium py-2 px-4 rounded-lg transition-colors"
        >
          🔄 Retry PayPal
        </button>
      </div>
    );
  }

  return (
    <div className="mt-4">
      <div ref={containerRef} className="w-full min-h-[150px] border border-gray-200 rounded-lg p-4 bg-gray-50">
        {!debugInfo && (
          <div className="flex items-center justify-center h-32">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            <span className="ml-2 text-gray-600">Loading PayPal...</span>
          </div>
        )}
      </div>
      {debugInfo && (
        <div className="mt-2 text-xs text-gray-500 text-center">
          Debug: {debugInfo}
        </div>
      )}
      {loading && (
        <div className="mt-2 text-center">
          <div className="inline-flex items-center text-sm text-gray-600">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600 mr-2"></div>
            Processing payment...
          </div>
        </div>
      )}
      <p className="text-xs text-brand-dark-gray/70 mt-2 text-center">
        Secure payment processed by PayPal. Your transaction is protected.
      </p>
    </div>
  );
}