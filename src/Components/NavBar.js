import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../Hook";

export const NavBar = () => {
  const { userInfo } = useAuth();
  return (
    <header>
      <div className="container">
        <div className="flex-row">
          <div className="flex-col-lg-2">
            <div className="nav-brand container">
              <h3>Torque TV</h3>
            </div>
          </div>
          <div className="flex-col-lg-9 flex align-center  ">
            <nav>
              <Link to="/">
                <li className="nav-link">Home</li>
              </Link>
              <Link to="/videos">
                <li className="nav-link">Videos</li>
              </Link>
            </nav>
          </div>
          <div className="flex-col-lg-1 flex align-center">
            <Link to={userInfo ? "/user" : "/login"}>
              <li className="nav-link">
                {userInfo ? `${userInfo.name}` : "login"}
              </li>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};
