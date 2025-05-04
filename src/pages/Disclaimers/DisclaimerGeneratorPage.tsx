import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";

const DiscalimerGeneratorPage = () => {
  const [formData, setFormData] = useState({
    topic: "",
    tone: "",
  });

  const [generatedDisclaimer, setGeneratedDisclaimer] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:3000/api/generate_disclaimer", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          topic: formData.topic,
          tone: formData.tone,
        }),
      });

      console.log("response", res);

      const data = await res.json();
      setGeneratedDisclaimer(data.disclaimer);
      console.log(data, "generated disclaimer");
    } catch (error) {
      console.error("Error generating disclaimer:", error);
      setGeneratedDisclaimer(
        "Something went wrong while generating the disclaimer."
      );
    }
  };

  return (
    <>
      <h1>Disclaimers </h1>

      <form onSubmit={handleSubmit}>
        <div>
          <label>Topic</label>
          <input
            value={formData.tone}
            name="tone"
            onChange={handleChange}
            type="tone"
          />
        </div>

        <div>
          <label>Tone</label>
          <input
            value={formData.topic}
            name="topic"
            onChange={handleChange}
            type="topic"
          />
        </div>
        <button>Generate</button>
      </form>

      <h3> Generated Disclaimer:</h3>
      <p>{generatedDisclaimer}</p>

      <p></p>
    </>
  );
};

export default DiscalimerGeneratorPage;
