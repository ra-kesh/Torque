import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../Hook";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const location = useLocation();
  const path = location.state?.from;

  const { login } = useAuth();

  function submitHandeller(e) {
    e.preventDefault();
    login(email, password, path);
  }
  return (
    <div className="container">
      <div className="auth-wrapper center-vertically">
        <div className="auth-form">
          <form onSubmit={submitHandeller} className="login-form">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="email"
              className="m-bottom-two form-input"
            />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="password"
              className="m-bottom-two form-input"
            />
            <button>submit</button>
          </form>
          <div className="container flex space-evenly m-top-two">
            <div>
              <h5>New Here ? Wanna Signup ..</h5>
            </div>
            <div className="center-vertically">
              <button onClick={() => navigate("/signup")}>signup</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
