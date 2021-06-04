import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../Hook";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigate = useNavigate();

  const { signup } = useAuth();

  function submitHandeller(e) {
    e.preventDefault();
    if (password === confirmPassword) {
      signup(name, password, email);
    }
  }

  return (
    <div className="container">
      <div className="auth-wrapper center-vertically">
        <div className="auth-form">
          <form onSubmit={submitHandeller} className="login-form">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Name"
              className="m-bottom-two form-input"
            />
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
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="password"
              className="m-bottom-two form-input"
            />
            <button>submit</button>
          </form>
          <div className="container center-vertically m-top-two">
            <button onClick={() => navigate(-1)}>back</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
