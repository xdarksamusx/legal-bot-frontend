import React, { useEffect } from "react";
import { useState } from "react";
import { useAuth } from "context/AuthContext";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const ViewDisclaimer = () => {
  const navigate = useNavigate();

  const { id } = useParams<{ id: string }>();
  const [disclaimer, setDisclaimer] = useState<any>(null);
  const { isLoggedIn, login, logout, deletion } = useAuth();
  const [disclaimers, setDisclaimers] = useState([]);

  useEffect(() => {
    if (!id) return;

    fetch(`http://localhost:3000/disclaimers/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => setDisclaimer(data))
      .catch((err) => console.error("Failed to load disclaimer", err));
  }, [id]);

  const handleDelete = async (id: string) => {
    await deletion(id);
    setDisclaimers((prev) => prev.filter((d) => d.id != id));
  };

  return (
    <>
      <h1>Disclaimer information</h1>

      {disclaimer ? (
        <div>
          <div>{disclaimer.statement}</div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
      <button>
        {" "}
        <Link to={`/disclaimers/${id}/edit`}>Edit</Link>
      </button>
      <button onClick={() => handleDelete(disclaimer.id)}>
        {" "}
        <Link to="/dashboard">Delete</Link>
      </button>
      <div>
        {" "}
        <Link to="/dashboard">Dashboard</Link>{" "}
      </div>
      <button onClick={() => logout(navigate)}>Logout</button>
    </>
  );
};

export default ViewDisclaimer;
