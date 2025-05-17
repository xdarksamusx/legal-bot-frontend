import React from "react";
import { useState, useEffect } from "react";
import { useAuth } from "context/AuthContext";
import CloseButton from "./CloseButton";

const DisclaimerModule = () => {
  const {
    isLoggedIn,
    login,
    logout,
    deletion,
    generatedDisclaimer,
    setGeneratedDisclaimer,
    isOpen,
    createDisclaimer,
    messages,
    setMessages,
    activeDisclaimerId,
    setActiveDisclaimerId,
  } = useAuth();

  const [formData, setFormData] = useState({ prompt: "" });

  useEffect(() => {
    if (isOpen) {
      setFormData({ prompt: "" });
      setGeneratedDisclaimer("");
    }
  }, [isOpen]);

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
      <form onSubmit={handleSubmit}>
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 bg-white p-6 rounded-lg shadow-lg z-50">
          <CloseButton />
          <div>
            <div>
              <label>prompt</label>
              <textarea
                name="prompt"
                value={formData.prompt}
                onChange={(e) =>
                  setFormData({ ...formData, [e.target.name]: e.target.value })
                }
              />
            </div>
          </div>

          <div></div>
          <button type="submit">Generate Disclaimer</button>
        </div>
      </form>
    </>
  );
};

export default DisclaimerModule;
