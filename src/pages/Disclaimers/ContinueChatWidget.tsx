import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "context/AuthContext";
import { useParams } from "react-router-dom";

const ContinueChatWidget = () => {
  const navigate = useNavigate();

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
    setIsOpen,
    continueConversation,
  } = useAuth();
  const [formData, setFormData] = useState({
    prompt: "",
  });

  const [newPrompt, setNewPrompt] = useState("");

  const handleConversation = async () => {
    if (!disclaimer) return;
    console.log("disclaimer id", disclaimer.id);
    setActiveDisclaimerId(disclaimer.id);
    const updated = await continueConversation(disclaimer.id, newPrompt);
    console.log("checking updated conversation", updated);
    setDisclaimer(updated);
    setNewPrompt("");
  };

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
      <button
        className="fixed bottom-4 right-4 bg-blue-600 text-white p-3 rounded-full z-50 "
        onClick={() => setIsOpen(!isOpen)}
      ></button>

      {isOpen && (
        <div className="fixed bottom-20 right-4 w-48 h-[500px] py-2 bg-red-300 border rounded-lg shadow-lg p-4 z-50 flex flex-col">
          <div className="mt-2 flex gap-2 pl-2 w-48  ">
            <input
              type="text"
              value={newPrompt}
              onChange={(e) => setNewPrompt(e.target.value)}
              placeholder="Ask a follow-up"
              className="flex-1 border  py-1 rounded  max-w-36 pl-2 "
            />
          </div>
          <ul className="overflow-y-auto flex-1 pl-1 list-none flex flex-col items-center justify-evenly  ">
            {" "}
            {disclaimer.chat_history?.map((msg, idx) => (
              <li
                key={idx}
                className={`items-start text-left w-full w-36 mb-2 p-2 rounded-lg text-sm ${
                  msg.role === "user"
                    ? "bg-blue-100 text-left"
                    : "bg-gray-100 text-left"
                }`}
              >
                <strong>
                  {msg.role === "user"
                    ? "You"
                    : msg.role === "assistant"
                    ? "Bot"
                    : "System"}
                  :
                </strong>{" "}
                {msg.content}
              </li>
            ))}
          </ul>

          <div className="mt-2 flex justify-center">
            <button
              onClick={handleConversation}
              className="bg-blue-600 text-white px-3 py-1 rounded"
            >
              Send
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default ContinueChatWidget;
