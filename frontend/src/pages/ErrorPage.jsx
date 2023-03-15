import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import not_found_img from "../assets/404.png";

const ErrorPage = () => {
  useEffect(() => {
    document.title = "粮仓 - 找不到当前界面";
  }, []);
  return (
    <div className="container">
      <div className="error">出错啦！找不到当前界面。</div>
      <img src={not_found_img} alt="not found!" className="error-img" />
      <div>
        <button>
          <Link to={"/"}>点击返回首页</Link>
        </button>
      </div>
    </div>
  );
};

export default ErrorPage;
