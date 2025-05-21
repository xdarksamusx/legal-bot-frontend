import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "context/AuthContext";
import { useParams } from "react-router-dom";
import { useRef } from "react";
import Draggable from "react-draggable";

const ContinueChatWidget = ({ id }) => {
  const navigate = useNavigate();

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
    downloadPDF,
  } = useAuth();
  const [formData, setFormData] = useState({
    prompt: "",
  });

  const bottomRef = useRef(null);

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

  const handleDownload = async () => {
    downloadPDF(id);
  };

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

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
        <Draggable>
          <div className="fixed   top-[15%]  left-1/2 transform  -translate-x-1/2 -translate-y-1/2 w-[315px]    h-[500px] py-2 bg-red-300 border rounded-lg shadow-lg p-4 z-50 flex flex-col">
            <div className="mt-2 flex gap-2 pl-2 w-full  justify-center ">
              <input
                type="text"
                value={newPrompt}
                onChange={(e) => setNewPrompt(e.target.value)}
                placeholder="Ask a follow-up"
                className="flex-1 border  py-1 rounded  max-w-36 pl-2 "
              />
            </div>
            <ul className="overflow-y-auto flex-1 list-none flex flex-col items-center justify-evenly pr-4">
              {" "}
              {disclaimer.chat_history?.map((msg, idx) => (
                <li
                  key={idx}
                  className={`mt-2 pl-4   w-full max-w[90%] mb-2 p-2 rounded-lg text-sm ${
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
              <div ref={bottomRef} />
            </ul>

            <div className="mt-2 flex justify-center">
              <button
                onClick={handleConversation}
                className="bg-blue-600 text-white px-3 py-1 rounded"
              >
                Send
              </button>
              <button onClick={handleDownload}> Download Transcript </button>
            </div>
          </div>
        </Draggable>
      )}
    </>
  );
};

export default ContinueChatWidget;
