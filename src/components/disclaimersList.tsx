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
  } = useAuth();

  const handleDelete = async (id: string) => {
    await deletion(id);
    setDisclaimers((prev) => prev.filter((d) => d.id != id));
  };

  useEffect(() => {
    updateDisclaimers();
  }, []);

  return (
    <>
      <ul>
        {disclaimers.map((disclaimer) => {
          return (
            <li
              key={disclaimer.id}
              className="border-2 border-solid border-red-500"
            >
              <div>
                {" "}
                <span>topic </span> {disclaimer.topic}{" "}
              </div>
              <div> tone: {disclaimer.tone} </div>
              <div>
                <span>statement:</span>
                {disclaimer.statement}
              </div>
              <div>
                <button>
                  {" "}
                  <Link to={`/disclaimers/${disclaimer.id}`}>
                    View Disclaimer
                  </Link>{" "}
                </button>

                <button>
                  <Link to={`/disclaimers/${disclaimer.id}/edit`}>
                    Edit Disclaimer
                  </Link>{" "}
                </button>

                <button onClick={() => handleDelete(disclaimer.id)}>
                  {" "}
                  <Link to="/dashboard">Delete</Link>
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
