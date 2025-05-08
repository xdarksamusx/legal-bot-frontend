import React, { useEffect } from "react";
import { useState } from "react";
import { useAuth } from "context/AuthContext";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

const ViewDisclaimer = () => {
  const { id } = useParams<{ id: string }>();
  const [disclaimer, setDisclaimer] = useState<any>(null);

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
      <Link to={`/disclaimers/${id}/edit`}>Edit</Link>
      <Link to="/dashboard">Dashboard</Link>
    </>
  );
};

export default ViewDisclaimer;
