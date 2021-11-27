import React from "react";
import { LoginForm } from "../../Components/Form/LoginForm";
import { useAuth } from "../../Hook";
import { useNavigate, useLocation } from "react-router-dom";

export const Login = () => {
  const { error, login, loading } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();

  const path = location.state?.from;
  const message = location.state?.message;

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        {error && <h4>{error}</h4>}
        {loading && <h4>loading</h4>}
        {!loading && !error && message && <h4>{message}</h4>}

        <div>
          <LoginForm path={path} login={login} />
        </div>
        <div style={{ width: "100%", paddingLeft: "40px" }}>
          {" "}
          Don't have an account ?
          <span className="auth-link" onClick={() => navigate("/signup")}>
            SIGN UP
          </span>{" "}
        </div>
      </div>
    </div>
  );
};
