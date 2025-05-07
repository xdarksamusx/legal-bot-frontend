import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const [disclaimers, setDisclaimers] = useState([]);
  const [selectedDisclaimer, setSelectedDisclaimer] = useState("");

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
              <div> {disclaimer.topic} </div>
              <div> {disclaimer.tone} </div>
              <div> {disclaimer.statement} </div>
              <div>
                {" "}
                <Link to={`/disclaimer/${disclaimer.id}`}>
                  View Disclaimer
                </Link>{" "}
              </div>
            </li>
          );
        })}
      </ul>

      <p>topic: </p>

      <p>tone:</p>

      <div>
        <p>statement:</p>
      </div>
    </>
  );
};

export default Dashboard;
