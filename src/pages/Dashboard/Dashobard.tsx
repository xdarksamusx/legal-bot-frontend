import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "context/AuthContext";
import { Navigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();
  const [disclaimers, setDisclaimers] = useState([]);
  const [selectedDisclaimer, setSelectedDisclaimer] = useState("");
  const { isLoggedIn, login, logout, deletion } = useAuth();

  useEffect(() => {
    const disclaimers = async () => {
      const res = await fetch(`http://localhost:3000/disclaimers`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        credentials: "include",
      });

      const data = await res.json();

      setDisclaimers(data);
    };
    disclaimers();
  }, []);

  const handleDelete = async (id: string) => {
    await deletion(id);
    setDisclaimers((prev) => prev.filter((d) => d.id != id));
  };

  return (
    <>
      <h1 className="text-3xl font-bold text-blue-500">Your Disclaimers</h1>

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
      <button onClick={() => logout(navigate)}>Logout</button>
    </>
  );
};

export default Dashboard;
