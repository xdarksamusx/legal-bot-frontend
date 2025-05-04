import { application } from "express";
import React from "react";
import { useState, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";

const SignIn = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    fetch("http://localhost:3000/users/sign_in", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ user: formData }),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Login Failed");
        return res.json();
      })
      .then((data) => {
        console.log("Login success", data);
        navigate("/");
      })
      .catch((err) => {
        console.error("Login error:", err.message);
      });
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
