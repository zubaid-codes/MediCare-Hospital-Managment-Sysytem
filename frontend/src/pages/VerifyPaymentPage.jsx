import axios from "axios";
import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const API_BASE = "https://medicare-backend2-rt62.onrender.com";

const VerifyPaymentPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    let cancelled = false;

    const verifyPayment = async () => {
      // ✅ Get session_id from URL
      const params = new URLSearchParams(location.search || "");
      const sessionId = params.get("session_id");

      console.log("Session ID:", sessionId); // 🔍 Debug

      // ✅ Handle cancel case
      if (location.pathname === "/appointment/cancel") {
        if (!cancelled) {
          navigate("/appointments?payment_status=Cancelled", {
            replace: true,
          });
        }
        return;
      }

      // ❌ If no session_id → fail
      if (!sessionId) {
        if (!cancelled) {
          navigate("/appointments?payment_status=Failed", {
            replace: true,
          });
        }
        return;
      }

      try {
        // ✅ Correct API call
        const res = await axios.get(`${API_BASE}/api/appointments/confirm`, {
          params: { session_id: sessionId }, // 🔥 FIXED HERE
          timeout: 15000,
        });

        if (cancelled) return;

        console.log("Response:", res.data); // 🔍 Debug

        // ✅ Success handling
        if (res?.data?.success) {
          navigate("/appointments?payment_status=Paid", {
            replace: true,
          });
        } else {
          navigate("/appointments?payment_status=Failed", {
            replace: true,
          });
        }
      } catch (error) {
        console.error(
          "Payment Verification failed:",
          error.response?.data || error.message,
        );

        if (!cancelled) {
          navigate("/appointments?payment_status=Failed", {
            replace: true,
          });
        }
      }
    };

    verifyPayment();

    return () => {
      cancelled = true;
    };
  }, [location, navigate]);

  return null;
};

export default VerifyPaymentPage;
