import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "context/AuthContext";
import { Navigate } from "react-router-dom";
import Draggable from "react-draggable";

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
    messages,
    setMessages,
    activeDisclaimerId,
    setActiveDisclaimerId,
  } = useAuth();
  const [formData, setFormData] = useState({
    prompt: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newUserMessage = {
      role: "user",
      content: formData.prompt,
    };

    const updatedMessages = [...messages, newUserMessage];

    const statement = await createDisclaimer(updatedMessages);

    const assistantMessage = {
      role: "assistant",
      content: statement,
    };

    const fullMessages = [...updatedMessages, assistantMessage];

    setMessages(fullMessages);
    setFormData({ prompt: "" });
  };

  useEffect(() => {
    if (messages.length > 0) {
    }
  }, [messages]);

  return (
    <>
      <h1>Disclaimers </h1>

      <form onSubmit={handleSubmit}>
        <label htmlFor="prompt"></label>

        <textarea
          id="prompt"
          name="prompt"
          value={formData.prompt}
          onChange={handleChange}
        />

        <button>Generate</button>
      </form>

      <h3> Generated Disclaimer:</h3>

      <p></p>
      <div>
        <ul>
          {messages.map((message, index) => (
            <li key={index}>
              <strong>{message.role === "user" ? "You" : "Bot"}:</strong>{" "}
              {message.content}
            </li>
          ))}
        </ul>

        {isLoggedIn ? (
          <button onClick={() => logout(navigate)}>Logout</button>
        ) : (
          <div>
            <button>
              <Link to="/signin">Login</Link>
            </button>
            <Link to="/signup">SignUp</Link>
          </div>
        )}

        <Link to="/dashboard">Dashboard</Link>
      </div>
    </>
  );
};

export default DisclaimerGeneratorPage;
