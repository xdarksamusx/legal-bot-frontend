import React from "react";
import { Routes, Route } from "react-router-dom";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import DiscalimerGeneratorPage from "pages/Disclaimers/DisclaimerGeneratorPage";

const App = () => {
  return (
    <Routes>
      <Route path="/signup" element={<SignUp />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/" element={<DiscalimerGeneratorPage />} />
    </Routes>
  );
};

export default App;
