import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "context/AuthContext";

const DisclaimerList = () => {
  const {
    isLoggedIn,
    login,
    logout,
    deletion,
    updateDisclaimers,
    disclaimers,
    setDisclaimers,
    messages,
  } = useAuth();

  const handleDelete = async (id: string) => {
    await deletion(id);
    setDisclaimers((prev) => prev.filter((d) => d.id != id));
  };

  console.log("list of disclaimers", disclaimers);

  return (
    <>
      <ul>
        {disclaimers.map((disclaimer) => {
          const firstUserMsg = disclaimer.chat_history?.find(
            (msg) => msg.role === "user"
          );
          return (
            <li
              key={disclaimer.id}
              className="border-2 border-solid border-red-500 p-4 my-2"
            >
              <div>
                <strong>Topic:</strong>{" "}
                {firstUserMsg?.content || "(no topic found)"}
              </div>
              <div>
                <strong>Latest Response:</strong> {disclaimer.statement}
              </div>
              <div className="mt-2 space-x-2">
                <Link to={`/disclaimers/${disclaimer.id}`}>
                  View Disclaimer
                </Link>
                <Link to={`/disclaimers/${disclaimer.id}/edit`}>
                  Edit Disclaimer
                </Link>
                <button onClick={() => handleDelete(disclaimer.id)}>
                  Delete
                </button>
              </div>
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default DisclaimerList;
