import React, { useEffect } from "react";
import { useState } from "react";
import { useAuth } from "context/AuthContext";
import { useParams } from "react-router-dom";

const ViewDisclaimer = () => {
  const { id } = useParams<{ id: string }>();
  const [disclaimer, setDisclaimer] = useState<any>(null);

  useEffect(() => {
    if (!id) return;
    fetch(`http://localhost:3000/disclaimers/${id}`)
      .then((res) => res.json())
      .then((data) => setDisclaimer(data))
      .catch((err) => console.error("Failed to load disclaimer"));
  }, [id]);

  return (
    <>
      <h1> Disclaimer information</h1>
    </>
  );
};

export default ViewDisclaimer;
