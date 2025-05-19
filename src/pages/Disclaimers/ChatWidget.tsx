import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "context/AuthContext";

const ChatWidget = () => {
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
    setIsOpen,
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

    console.log("statement", statement);

    const assistantMessage = {
      role: "assistant",
      content: statement,
    };

    const fullMessages = [...updatedMessages, assistantMessage];

    console.log("full messages", fullMessages);

    setMessages(fullMessages);
    setFormData({ prompt: "" });
  };

  useEffect(() => {
    if (messages.length > 0) {
    }
  }, [messages]);

  return (
    <>
      <button
        className="fixed bottom-4 right-4 bg-blue-600 text-white p-3 rounded-full z-50 "
        onClick={() => setIsOpen(!isOpen)}
      ></button>

      {isOpen && (
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 bg-white border rounded-lg shadow-lg p-4 z-50 flex flex-col">
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

          <div className="overflow-y-auto max-h-60 mb-2 pr-1">
            <ul>
              {messages.map((message, index) => (
                <li key={index}>
                  <strong>{message.role === "user" ? "You" : "Bot"}:</strong>{" "}
                  {message.content}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatWidget;
