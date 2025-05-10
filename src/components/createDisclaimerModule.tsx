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
      <div className="w-48 bg-sky-600">
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
          <p>statement</p>
        </div>
      </div>
    </>
  );
};

export default DisclaimerModule;
