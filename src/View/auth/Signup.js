import { useAuth } from "../../Hook";
import { useLocation, useNavigate } from "react-router-dom";
import { SignUpForm } from "../../Components/Form/SignUpForm";

export const Signup = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const path = location.state?.from;

  const { signup, loading, error } = useAuth();

  return (
    <>
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
          {error ? <h4>{error}</h4> : null}
          {loading ? <h4>loading</h4> : null}

          <div>
            <SignUpForm path={path} signup={signup} />
          </div>
          <div style={{ width: "100%", paddingLeft: "40px" }}>
            {" "}
            Already have an account ?
            <span className="auth-link" onClick={() => navigate("/login")}>
              Log In
            </span>{" "}
          </div>
        </div>
      </div>
    </>
  );
};
