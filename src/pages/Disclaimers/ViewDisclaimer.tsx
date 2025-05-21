import React, { useEffect } from "react";
import { useState } from "react";
import { useAuth } from "context/AuthContext";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import ChatWidget from "pages/Disclaimers/ChatWidget";
import ContinueChatWidget from "./ContinueChatWidget";

const ViewDisclaimer = () => {
  const navigate = useNavigate();

  const [newPrompt, setNewPrompt] = useState("");

  const { id } = useParams<{ id: string }>();
  const [disclaimer, setDisclaimer] = useState<any>(null);
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
    continueConversation,
    downloadPDF,
  } = useAuth();

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

  const handleConversation = async () => {
    if (!disclaimer) return;
    setActiveDisclaimerId(disclaimer.id);
    const updated = await continueConversation(disclaimer.id, newPrompt);
    setDisclaimer(updated);
    setNewPrompt("");
  };

  return (
    <>
      <div className="relative">
        <h1>Disclaimer information:</h1>

        <ContinueChatWidget id={id} />

        {disclaimer ? (
          <>
            {disclaimer.chat_history?.map((msg, idx) => (
              <div key={idx}>
                <strong>
                  {msg.role === "user"
                    ? "You"
                    : msg.role === "assistant"
                    ? "Bot"
                    : "System"}
                  :
                </strong>{" "}
                {msg.content}
              </div>
            ))}
          </>
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

        <input
          type="text"
          placeholder="Ask a follow-up"
          value={newPrompt}
          onChange={(e) => setNewPrompt(e.target.value)}
        />

        <button onClick={handleConversation}>Continue Conversation</button>
      </div>
    </>
  );
};

export default ViewDisclaimer;
