import React from "react";
import { Routes, Route } from "react-router-dom";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import DiscalimerGeneratorPage from "pages/Disclaimers/DisclaimerGeneratorPage";
import { AuthProvider } from "context/AuthContext";
import Dashboard from "pages/Dashboard/Dashobard";
import ViewDisclaimer from "pages/Disclaimers/ViewDisclaimer";

const App = () => {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/" element={<DiscalimerGeneratorPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/disclaimer/:id" element={<ViewDisclaimer />} />
      </Routes>
    </AuthProvider>
  );
};

export default App;
