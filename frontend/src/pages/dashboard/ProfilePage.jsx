import React, { useEffect, useState } from "react";
import { useAsync, useAsyncFn } from "../../hooks/useAsync";
import { getUser, updateUser, updatePassword } from "../../utils/authAPI";

const ProfilePage = () => {
  // get current user info
  const { loading, error, value: data } = useAsync(getUser);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [isAdult, setIsAdult] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  useEffect(() => {
    if (data == null) return;
    setUsername(data.username);
    setEmail(data.email);
    setIsAdult(data.is_adult);
  }, [data]);

  // update user methods
  const updateUserFn = useAsyncFn(updateUser);
  const handleUpdateUser = async (e) => {
    e.preventDefault();
    updateUserFn
      .execute({
        username: username,
        email: email,
        is_adult: isAdult,
      })
      .then((res) => {
        alert("修改基本信息成功。");
      });
  };

  // update password methods
  const updatePasswordFn = useAsyncFn(updatePassword);
  const handleUpdatePassword = async (e) => {
    e.preventDefault();
    updatePasswordFn
      .execute({
        currentPassword: currentPassword,
        newPassword: newPassword,
      })
      .then((res) => {
        alert("修改密码成功。");
      });
  };

  if (loading) return <h2>加载中…</h2>;
  if (error) return <h2>error: {error}</h2>;
  if (!data) return <h1>请先登录。</h1>;
  return (
    <div className="container">
      <h1>{data.username}的个人资料</h1>
      <div>
        {/* =========================== 修改基本资料 =========================== */}
        <form className="register-form" onSubmit={(e) => handleUpdateUser(e)}>
          <div className="form-group row">
            <label
              htmlFor="username"
              className="form-label-required col-sm-3 col-form-label"
            >
              用户名
            </label>
            <input
              className="form-control col-sm-9"
              type="text"
              id="username"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="form-group row">
            <label
              htmlFor="email"
              className="form-label-required col-sm-3 col-form-label"
            >
              邮箱
            </label>
            <input
              className="form-control col-sm-9"
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group row">
            <label htmlFor="is-adult" className="col-sm-3 col-form-label">
              您是成年人吗？
            </label>
            <input
              className="form-control col-sm-9"
              type="checkbox"
              id="is-adult"
              checked={isAdult}
              onChange={() => setIsAdult(!isAdult)}
            />
          </div>
          <button disabled={updateUserFn.loading} className="btn">
            {updateUserFn.loading ? "加载中" : "更新资料"}
          </button>
        </form>
        <hr />
        {/* =========================== 修改密码 =========================== */}
        <form
          className="register-form"
          onSubmit={(e) => handleUpdatePassword(e)}
        >
          <div className="form-group row">
            <label
              htmlFor="currentPassword"
              className="form-label-required col-sm-3 col-form-label"
            >
              当前密码
            </label>
            <input
              className="form-control col-sm-9"
              type="password"
              id="currentPassword"
              name="currentPassword"
              onChange={(e) => setCurrentPassword(e.target.value)}
              required
            />
          </div>
          <div className="form-group row">
            <label
              htmlFor="newPassword"
              className="form-label-required col-sm-3 col-form-label"
            >
              新密码
            </label>
            <input
              className="form-control col-sm-9"
              type="password"
              id="newPassword"
              name="newPassword"
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
          </div>
          <div className="form-group row">
            <label
              htmlFor="confirmPassword"
              className="form-label-required col-sm-3 col-form-label"
            >
              再次输入新密码
            </label>
            <input
              className="form-control col-sm-9"
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          {confirmPassword !== newPassword && (
            <p style={{ color: "red" }}>两次输入的密码不相同</p>
          )}
          <button disabled={updateUserFn.loading} className="btn">
            {updateUserFn.loading ? "加载中" : "修改密码"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProfilePage;
