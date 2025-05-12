import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "context/AuthContext";
import { Navigate } from "react-router-dom";

const DisclaimerGeneratorPage = () => {
  const navigate = useNavigate();
  const {
    isLoggedIn,
    login,
    logout,
    deletion,
    generatedDisclaimer,
    setGeneratedDisclaimer,
    isOpen,
    createDisclaimer,
    disclaimers,
    setDisclaimers,
  } = useAuth();
  const [formData, setFormData] = useState({
    topic: "",
    tone: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    await createDisclaimer(formData.topic, formData.tone);
  };

  useEffect(() => {
    if (generatedDisclaimer) {
      console.log("✔️ generated disclaimer updated:", generatedDisclaimer);
    }
  }, [generatedDisclaimer]);

  return (
    <>
      <h1>Disclaimers </h1>

      <form onSubmit={handleSubmit}>
        <div>
          <label>Topic</label>
          <input
            value={formData.topic}
            name="topic"
            onChange={handleChange}
            type="topic"
          />
        </div>

        <div>
          <label>Tone</label>
          <input
            value={formData.tone}
            name="tone"
            onChange={handleChange}
            type="tone"
          />
        </div>
        <button>Generate</button>
      </form>

      <h3> Generated Disclaimer:</h3>
      {generatedDisclaimer && (
        <p className="mt-4 whitespace-pre-line">{generatedDisclaimer}</p>
      )}
      <p></p>
      <div>
        {" "}
        {isLoggedIn ? (
          <button onClick={() => logout(navigate)}> Logout</button>
        ) : (
          <div>
            <button>
              {" "}
              <Link to="/signin"> Login </Link>
            </button>
            <Link to="/signup"> SignUp </Link>
          </div>
        )}{" "}
        <Link to="/dashboard">Dashobard</Link>
      </div>
    </>
  );
};

export default DisclaimerGeneratorPage;
