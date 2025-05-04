import React from "react";
import { Link } from "react-router-dom";

const DiscalimerGeneratorPage = () => {
  return (
    <>
      <h1>Disclaimers </h1>

      <div>
        <label> Topic </label>
        <input type="text" />
      </div>

      <div>
        <label> Tone </label>
        <input type="text" />
      </div>

      <h3> Generated Disclaimer:</h3>
      <p></p>
    </>
  );
};

export default DiscalimerGeneratorPage;
