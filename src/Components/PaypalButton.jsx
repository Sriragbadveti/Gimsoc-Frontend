"use client";

import { useEffect, useRef } from "react";
import axios from "axios";

export default function PayPalButton({ amount, onSuccess, onError }) {
  const containerRef = useRef(null);
  const buttonRef = useRef(null);

  useEffect(() => {
    if (!window.paypal || !containerRef.current) return;

    // Clear any existing buttons
    if (buttonRef.current) {
      buttonRef.current.close();
    }

    // Create unique container ID
    const containerId = `paypal-button-container-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    containerRef.current.id = containerId;

    buttonRef.current = window.paypal
      .Buttons({
        createOrder: async () => {
          try {
            const response = await axios.post("https://gimsoc-backend.onrender.com/api/paypal/create-order", {
              amount: amount || "15.00",
            });
            return response.data.id;
          } catch (error) {
            console.error("Error creating PayPal order:", error);
            onError && onError(error);
            throw error;
          }
        },
        onApprove: async (data) => {
          try {
            const response = await axios.post(
              `https://gimsoc-backend.onrender.com/api/paypal/capture-order/${data.orderID}`
            );
            onSuccess && onSuccess(response.data);
          } catch (error) {
            console.error("Error capturing PayPal order:", error);
            onError && onError(error);
            throw error;
          }
        },
        onError: (err) => {
          console.error("PayPal error:", err);
          onError && onError(err);
        },
      })
      .render(`#${containerId}`);

    // Cleanup function
    return () => {
      if (buttonRef.current) {
        buttonRef.current.close();
      }
    };
  }, [amount, onSuccess, onError]);

  return (
    <div className="mt-4">
      <div ref={containerRef} className="w-full"></div>
      <p className="text-xs text-brand-dark-gray/70 mt-2 text-center">
        Secure payment processed by PayPal. Your transaction is protected.
      </p>
    </div>
  );
}