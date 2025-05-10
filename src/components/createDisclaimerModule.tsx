import React from "react";
import { useState } from "react";
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
  } = useAuth();

  return (
    <>
      <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 bg-white p-6 rounded-lg shadow-lg z-50">
        <CloseButton />
        <div>
          <div>
            <label>topic</label>
            <input />
          </div>

          <div>
            <label>tone</label>
            <input />
          </div>
        </div>

        <div>
          <p>
            statement : <span> {generatedDisclaimer}</span>
          </p>
        </div>
        <button>Generate Disclaimer</button>
      </div>
    </>
  );
};

export default DisclaimerModule;
