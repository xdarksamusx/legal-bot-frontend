import React from "react";
import { Routes, Route } from "react-router-dom";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import DiscalimerGeneratorPage from "pages/Disclaimers/DisclaimerGeneratorPage";
import { AuthProvider } from "context/AuthContext";
import Dashboard from "pages/Dashboard/Dashobard";
import ViewDisclaimer from "pages/Disclaimers/ViewDisclaimer";
import EditDisclaimer from "pages/Disclaimers/EditDisclaimer";

const App = () => {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/" element={<DiscalimerGeneratorPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/disclaimers/:id" element={<ViewDisclaimer />} />
        <Route path="/disclaimers/:id/edit" element={<EditDisclaimer />} />
      </Routes>
    </AuthProvider>
  );
};

export default App;
