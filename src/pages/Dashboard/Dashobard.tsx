import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "context/AuthContext";
import { Navigate } from "react-router-dom";
import DisclaimerList from "components/disclaimersList";
import DisclaimerModule from "components/createDisclaimerModule";
import ChatWidget from "pages/Disclaimers/ChatWidget";

const Dashboard = () => {
  const navigate = useNavigate();
  const [selectedDisclaimer, setSelectedDisclaimer] = useState("");
  const {
    isLoggedIn,
    login,
    logout,
    deletion,
    isOpen,
    setIsOpen,
    updateDisclaimers,
    disclaimers,
  } = useAuth();

  const handleCreateDisclaimer = () => {
    setIsOpen((prev) => !prev);
  };

  useEffect(() => {
    updateDisclaimers();
  }, []);

  return (
    <>
      <div className="relative">
        <h1 className="text-3xl font-bold text-blue-500">Your Disclaimers</h1>
        <ChatWidget />

        <DisclaimerList />

        <button onClick={handleCreateDisclaimer}>Create a Disclaimer </button>

        <button onClick={() => logout(navigate)}>Logout</button>
        <Link to="/">Home</Link>
      </div>
    </>
  );
};

export default Dashboard;
