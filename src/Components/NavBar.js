import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../Hook";
import { useNavigate } from "react-router-dom";

export const NavBar = () => {
  const { userInfo, logout } = useAuth();
  const navigate = useNavigate();
  return (
    <header>
      <div className="container">
        <div className="flex-row">
          <div className="flex-col-lg-2">
            <div className="nav-brand container">
              <h3>Torque </h3>
            </div>
          </div>
          <div className="flex-col-lg-9 flex align-center  ">
            <nav>
              <Link to="/">
                <li className="nav-link">Home</li>
              </Link>
              <Link to="/explore">
                <li className="nav-link">Explore</li>
              </Link>
              <Link to="/library">
                <li className="nav-link">Library</li>
              </Link>
              <Link to="/profile">
                <li className="nav-link">Profile</li>
              </Link>
            </nav>
          </div>
          <div className="flex-col-lg-1 flex align-center">
            <li className="nav-link">
              {userInfo ? (
                <span onClick={() => logout()}>Logout</span>
              ) : (
                <span onClick={() => navigate("/login")}>Login</span>
              )}
            </li>
          </div>
        </div>
      </div>
    </header>
  );
};
