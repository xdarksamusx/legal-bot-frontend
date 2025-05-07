import React from "react";
import { useAuth } from "context/AuthContext";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const navigate = useNavigate();
  const { isLoggedIn, login, logout } = useAuth();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    password_confirmation: "",
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const res = await fetch("http://localhost:3000/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ user: formData }),
    });

    console.log("sign up response", res);

    if (res.ok) {
      await login({ email: formData.email, password: formData.password });
      navigate("/");
    } else {
      console.error("Sign up failed");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <>
      <h1> Sign up </h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>

        <div>
          <label>Password:</label>
          <input
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
          />
        </div>

        <div>
          <label>Password confirmation:</label>
          <input
            name="password_confirmation"
            type="password_confirmation"
            value={formData.password_confirmation}
            onChange={handleChange}
          />
        </div>
        <div>
          <button>Sign Up</button>
        </div>
      </form>
    </>
  );
};

export default SignUp;
