import React, { useState } from "react";

export const LoginForm = ({ login, path }) => {
  const [email, setEmail] = useState("someone@gmail.com");
  const [password, setPassword] = useState("someone");
  const [error, setError] = useState("");

  console.log(path);

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
    login(email, password, path);
    setError("");
    // setEmail("");
    // setPassword("");
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
          <h3 style={{ color: "#fff" }}>Login</h3>
          <label htmlFor="email">Email</label>
          <input
            className="auth-input"
            id="email"
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e?.target?.value)}
          />
          <label htmlFor="password">Password</label>

          <input
            className="auth-input"
            id="password"
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e?.target?.value)}
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
