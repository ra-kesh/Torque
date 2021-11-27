import React, { useState } from "react";

export const SignUpForm = ({ signup, path }) => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email === "") {
      setError("email cannot be blank");
      return;
    }
    if (password === "") {
      setError("password cannot be blank");
      return;
    }
    if (password !== confirmPassword) {
      setError("password should match");
      return;
    }
    signup(name, email, password, path);
    setError("");
    setName("");
    setEmail("");
    setPassword("");
  };

  const ErrorDiv = () => {
    return (
      <div className="auth-error">
        <p>{error}</p>
      </div>
    );
  };

  return (
    <>
      <div className="formWrapper">
        <form className="auth-form" onSubmit={handleSubmit}>
          <h3 style={{ color: "#fff" }}>Sign up</h3>
          <label htmlFor="name">Name</label>
          <input
            className="auth-input"
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e?.target?.value)}
          />
          <label htmlFor="email">Email</label>
          <input
            className="auth-input"
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e?.target?.value)}
          />
          <label htmlFor="password">Password</label>
          <input
            className="auth-input"
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e?.target?.value)}
          />
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            className="auth-input"
            id="confirmPassword"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e?.target?.value)}
          />

          {error && <ErrorDiv />}
          <button className="auth-button" type="submit">
            submit
          </button>
        </form>
      </div>
    </>
  );
};
