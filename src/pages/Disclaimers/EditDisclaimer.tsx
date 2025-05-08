import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "context/AuthContext";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const EditDisclaimer = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [formData, setFormData] = useState<any>({
    topic: "",
    tone: "",
    statement: "",
  });

  const handleForm = (e: React.FormEvent) => {
    e.preventDefault();

    fetch(`http://localhost:3000/disclaimers/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        disclaimer: formData,
      }),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          console.error("Update failed");
        }
      })
      .then((data) => {
        console.log("disclaimer updated", data);
        setFormData(data);
        navigate("/dashboard");
      })
      .catch((err) => {
        console.error("Error  submitted update", err);
      });
  };

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
      .then((data) => setFormData(data))
      .catch((err) => console.error("Failed to load disclaimer"));
  }, [id]);

  return (
    <>
      <form onSubmit={handleForm}>
        <table>
          <tbody>
            <tr>
              <td>
                {" "}
                <label htmlFor="disclaimer_topic"> Topic </label>{" "}
              </td>
              <td>
                {" "}
                <input
                  type="text"
                  name="topic"
                  value={formData.topic}
                  onChange={(e) =>
                    setFormData({ ...formData, topic: e.target.value })
                  }
                />{" "}
              </td>
            </tr>

            <tr>
              <td>
                {" "}
                <label htmlFor="disclaimer_tone"> tone </label>{" "}
              </td>
              <td>
                {" "}
                <input
                  type="text"
                  name="tone"
                  value={formData.tone}
                  onChange={(e) =>
                    setFormData({ ...formData, tone: e.target.value })
                  }
                />{" "}
              </td>
            </tr>

            <tr>
              <td>
                {" "}
                <label htmlFor="disclaimer_statement"> statement </label>{" "}
              </td>
            </tr>

            <tr>
              <td>
                <textarea
                  name="statement"
                  value={formData.statement}
                  onChange={(e) =>
                    setFormData({ ...formData, statement: e.target.value })
                  }
                >
                  {" "}
                </textarea>
              </td>
            </tr>
            <tr>
              {" "}
              <td>
                {" "}
                <button>Update Disclaimer </button>
              </td>
            </tr>
          </tbody>
        </table>
      </form>
      <Link to="/dashboard">Dashboard</Link>
      <Link to={`/disclaimers/${id}`}>View Disclaimer</Link>
    </>
  );
};

export default EditDisclaimer;
