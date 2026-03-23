import React, { useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import Doctors from "./pages/Doctors";
import DoctorDetails from "./pages/DoctorDetails";
import Service from "./pages/Service";
import ServiceDetails from "./pages/ServiceDetails";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import DHome from "./pages/DHome";
import List from "./doctor/List";
import EditDoctor from "./doctor/EditDoctor";
import Appoinmtmnet from "./pages/Appoinmtmnet";
import { CircleChevronUp } from "lucide-react";
import { useState } from "react";
import VerifyPaymentPage from "./pages/VerifyPaymentPage";
import VerifyServicePaymentPage from "./pages/VerifyServicePaymentPage";

const ScrollToTop = () => {
  const { pathName } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }, [pathName]);
  return null;
};

// scroll button
const ScrollButton = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => setVisible(window.scrollY > 200);
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <button
      onClick={scrollTop}
      className={`fixed right-4 bottom-6 z-50 w-11 h-11 rounded-full flex items-center justify-center 
      bg-emerald-600 text-white shadow-lg transition-all duration-300 
      ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"} 
      hover:scale-110 hover:shadow-xl`}
      title="Go to top"
    >
      <CircleChevronUp size={22} />
    </button>
  );
};

function App() {
  useEffect(() => {
    document.body.style.overflowX = "hidden";
    document.documentElement.style.overflowX = "hidden";
    return () => {
      document.body.style.overflowX = "auto";
      document.documentElement.style.overflowX = "auto";
    };
  }, []);
  return (
    <>
      <ScrollToTop />
      <div className="overflow-x-hidden bg-white text-gray-900">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/doctors" element={<Doctors />} />
          <Route path="/doctors/:id" element={<DoctorDetails />} />
          <Route path="/services" element={<Service />} />
          <Route path="/services/:id" element={<ServiceDetails />} />
          <Route path="/appointements" element={<Appoinmtmnet />} />
          <Route path="/contact" element={<Contact />} />

          {/* DOctor */}
          <Route path="/doctor-admin/login" element={<Login />} />
          <Route path="/doctor-admin/:id" element={<DHome />} />
          <Route path="/doctor-admin/:id/appointments" element={<List />} />
          <Route
            path="/doctor-admin/:id/profile/edit"
            element={<EditDoctor />}
          />

          {/* for payment */}
          <Route path="/appointment/success" element={<VerifyPaymentPage />} />
          <Route path="/appointment/cancel" element={<VerifyPaymentPage />} />

          <Route
            path="/service-appointment/success"
            element={<VerifyServicePaymentPage />}
          />

          <Route
            path="/service-appointment/cancel"
            element={<VerifyServicePaymentPage />}
          />
        </Routes>
      </div>

      <ScrollButton />
    </>
  );
}

export default App;
