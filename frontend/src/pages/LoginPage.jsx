import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../utils/AxiosService";
import jwtDecode from "jwt-decode";

const LoginPage = () => {
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.post("/token/obtain/", {
        username: e.target.username.value,
        password: e.target.password.value,
      });
      axiosInstance.defaults.headers["Authorization"] =
        "JWT " + response.data.access;
      localStorage.setItem("access_token", response.data.access);
      localStorage.setItem("refresh_token", response.data.refresh);
      const decoded = jwtDecode(response.data.access);
      localStorage.setItem("userID", decoded.user_id);
      localStorage.setItem("username", decoded.username);

      navigate("/dashboard");
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    document.title = "粮仓 - 登录";
  }, []);

  return (
    <div className="container d-flex justify-content-center align-items-start loginbox">
      <div className="card shadow">
        <div className="card-body">
          <h1 className="card-title">登录</h1>
          <form className="validated-form" onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label" htmlFor="username">
                用户名
              </label>
              <input
                className="form-control"
                type="text"
                id="username"
                name="username"
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label" htmlFor="password">
                密码
              </label>
              <input
                className="form-control"
                type="password"
                id="password"
                name="password"
                required
                autoComplete="section-blue current-password"
              />
            </div>
            <button type="submit" className="btn btn-success w-100">
              登录
            </button>
            <Link className="textlink" to="/register">
              没有账号？点击此处注册
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
