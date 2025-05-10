import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "context/AuthContext";
import { Navigate } from "react-router-dom";
import DisclaimerList from "components/disclaimersList";
import DisclaimerModule from "components/createDisclaimerModule";

const Dashboard = () => {
  const navigate = useNavigate();
  const [disclaimers, setDisclaimers] = useState([]);
  const [selectedDisclaimer, setSelectedDisclaimer] = useState("");
  const { isLoggedIn, login, logout, deletion, isOpen, setIsOpen } = useAuth();

  const handleCreateDisclaimer = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <>
      <div className="relative">
        <h1 className="text-3xl font-bold text-blue-500">Your Disclaimers</h1>

        <DisclaimerList />

        <button onClick={handleCreateDisclaimer}>Create a Disclaimer </button>

        <button onClick={() => logout(navigate)}>Logout</button>
        {isOpen && (
          <>
            <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40" />
            <DisclaimerModule />
          </>
        )}
      </div>
    </>
  );
};

export default Dashboard;
