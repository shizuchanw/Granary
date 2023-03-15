import React from "react";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../utils/AxiosService";

const HeaderComponent = () => {
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      const response = await axiosInstance.post("/blacklist/", {
        refresh_token: localStorage.getItem("refresh_token"),
      });
      axiosInstance.defaults.headers["Authorization"] = null;
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
      localStorage.removeItem("userID");
      localStorage.removeItem("username");

      navigate("");
    } catch (e) {
      console.log(e);
    }
  };

  const isLoggedIn = localStorage.getItem("access_token") !== null;

  return (
    <header>
      <nav className="navbar navbar-expand-md navbar-dark bg-dark">
        <div>
          <Link className="navbar-brand" to="/">
            粮仓
          </Link>
        </div>

        <ul className="navbar-nav navbar-collapse justify-content-end">
          {!isLoggedIn ? (
            <>
              <li>
                <Link className="nav-link" to="/login">
                  登录
                </Link>
              </li>
              <li>
                <Link className="nav-link" to="/register">
                  注册
                </Link>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link className="nav-link" to="/dashboard">
                  个人中心
                </Link>
              </li>
              <li className="nav-link change-cursor" onClick={handleLogout}>
                登出
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default HeaderComponent;
