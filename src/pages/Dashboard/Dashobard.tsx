import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "context/AuthContext";
import { Navigate } from "react-router-dom";
import DisclaimerList from "components/disclaimersList";

const Dashboard = () => {
  const navigate = useNavigate();
  const [disclaimers, setDisclaimers] = useState([]);
  const [selectedDisclaimer, setSelectedDisclaimer] = useState("");
  const { isLoggedIn, login, logout, deletion } = useAuth();

  return (
    <>
      <h1 className="text-3xl font-bold text-blue-500">Your Disclaimers</h1>

      <DisclaimerList />

      <button>Create a Disclaimer </button>

      <button onClick={() => logout(navigate)}>Logout</button>
    </>
  );
};

export default Dashboard;
