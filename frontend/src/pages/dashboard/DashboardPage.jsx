import React, { useEffect } from "react";
import { Link } from "react-router-dom";

const DashboardPage = () => {
  useEffect(() => {
    document.title = "粮仓 - 个人中心";
  }, []);
  return (
    <div className="container dashboard-box">
      <Link to="/dashboard/my-articles">
        <div>创作中心</div>
      </Link>
      <Link to="/dashboard/profile">
        <div>个人资料</div>
      </Link>
      <Link to="/dashboard/bookmarked">
        <div>收藏夹</div>
      </Link>
      <Link to="/dashboard/liked">
        <div>我的喜欢</div>
      </Link>
    </div>
  );
};

export default DashboardPage;
