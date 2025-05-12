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
  } = useAuth();

  const [formData, setFormData] = useState({ topic: "", tone: "" });

  useEffect(() => {
    if (isOpen) {
      setFormData({ topic: "", tone: "" });
      setGeneratedDisclaimer("");
    }
  }, [isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await createDisclaimer(formData.topic, formData.tone);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 bg-white p-6 rounded-lg shadow-lg z-50">
          <CloseButton />
          <div>
            <div>
              <label>topic</label>
              <input
                name="topic"
                value={formData.topic}
                onChange={(e) =>
                  setFormData({ ...formData, [e.target.name]: e.target.value })
                }
              />
            </div>

            <div>
              <label>tone</label>
              <input
                name="tone"
                value={formData.tone}
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
