import { application } from "express";
import React from "react";
import { useState, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "context/AuthContext";

const SignIn = () => {
  const { isLoggedIn, login } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState<string | null>(null);

  if (isLoggedIn) {
    return <Navigate to="/" />;
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    console.log("Form submitted:", formData);

    try {
      await login(
        { email: formData.email, password: formData.password },
        navigate
      );
      navigate("/");
    } catch (err) {
      console.error("Login error:", err);
      setError("Login failed. Please check your email and password.");
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <h1> Login </h1>
        <div>
          <label>Email</label>
          <input
            value={formData.email}
            name="email"
            onChange={handleChange}
            type="email"
          />
        </div>

        <div>
          <label>Password</label>
          <input
            value={formData.password}
            name="password"
            onChange={handleChange}
            type="password"
          />
        </div>
        <button>Submit</button>
      </form>
    </>
  );
};

export default SignIn;
