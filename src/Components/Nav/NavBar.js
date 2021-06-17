import React from "react";
// import { Link } from "react-router-dom";
import { useAuth } from "../../Hook";
import { useNavigate } from "react-router-dom";
// import MenuIcon from "@material-ui/icons/Menu";

export const NavBar = () => {
  const { userInfo, logout } = useAuth();
  const navigate = useNavigate();
  return (
    <header>
      <div className="container-fluid nav-wrapper">
        <div className="flex-row nav-bar">
          <div className="flex-col-lg-2">
            <div className="nav-brand container flex-row space-between align-center">
              {/* <div className="flex-col-1 center-vertically">
                <MenuIcon />
              </div> */}
              <div className="flex-col-10 logo-wrapper">
                <div className="logo">torQuee</div>
              </div>
            </div>
          </div>
          <div className="flex-col-lg-9 flex align-center  ">
            <div class="search-bar">
              <input type="text" placeholder="Search" />
            </div>
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
