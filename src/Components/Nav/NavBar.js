import React from "react";
import { useAuth } from "../../Hook";
import { useNavigate } from "react-router-dom";
import PowerSettingsNewIcon from "@material-ui/icons/PowerSettingsNew";

export const NavBar = () => {
  const { userInfo, logout } = useAuth();
  const navigate = useNavigate();
  return (
    <header>
      <div className="container ">
        <div className="flex-row">
          <div className="flex-col-lg-2">
            <div className="nav-brand container" onClick={() => navigate("/")}>
              <span className="nav-brand-text">Torque.</span>
            </div>
          </div>
          <div className="flex-col-lg-10 align-center">
            <ul className="nav-link-container">
              <li className="nav-link" onClick={() => navigate("/")}>
                Home
              </li>
              <li className="nav-link" onClick={() => navigate("/explore")}>
                Explore
              </li>
              <li className="nav-link" onClick={() => navigate("/library")}>
                Library
              </li>
              {userInfo ? (
                <li className="nav-link ">
                  <div className="flex align-center">
                    <span className=" m-right">{userInfo.name}</span>
                    <div className="flex align-center" onClick={() => logout()}>
                      <PowerSettingsNewIcon />
                    </div>
                  </div>
                </li>
              ) : (
                <li className="nav-link" onClick={() => navigate("/login")}>
                  Login
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </header>
  );
};
