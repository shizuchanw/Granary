import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import emailjs from "emailjs-com";
import { ServiceID, TemplateID, EmailUserID } from "../utils/constants";
import { useAsyncFn } from "../hooks/useAsync";
import { createUser } from "../utils/authAPI";

const RegisterPage = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [isAdult, setIsAdult] = useState(false);
  const [favcp, setFavcp] = useState("");
  const [favcpreason, setFavcpreason] = useState("");
  const [favcharacter, setFavcharacter] = useState("");
  const [favcharacterreason, setFavcharacterreason] = useState("");

  const createUserFn = useAsyncFn(createUser);
  const sendEmailFn = useAsyncFn(emailjs.sendForm);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      username: username,
      email: email,
      password: password,
      is_adult: isAdult,
    };

    createUserFn.execute(payload).then((res) => {
      console.log(res);
      // emailjs.sendForm(ServiceID, TemplateID, e.target, EmailUserID)
      sendEmailFn.execute(ServiceID, TemplateID, e.target, EmailUserID).then(
        (result) => {
          alert("注册成功。");
          navigate("/login");
        },
        (err) => {
          console.log(err.text);
        }
      );
    });
  };
  return (
    <div className="container register-box">
      <h1>注册</h1>
      <form className="register-form" onSubmit={(e) => handleSubmit(e)}>
        <section>
          <h4>基本信息</h4>
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
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group row">
            <label
              htmlFor="password"
              className="form-label-required col-sm-3 col-form-label"
            >
              密码
            </label>
            <input
              className="form-control col-sm-9"
              type="password"
              id="password"
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="section-blue new-password"
              required
            />
          </div>
          <div className="form-group row">
            <label
              htmlFor="confirm-password"
              className="form-label-required col-sm-3 col-form-label"
            >
              确认密码
            </label>
            <input
              className="form-control col-sm-9"
              type="password"
              id="confirm-password"
              onChange={(e) => setPassword2(e.target.value)}
              autoComplete="section-blue new-password"
              required
            />
            {password2 !== password && (
              <p style={{ color: "red" }}>两次输入的密码不相同</p>
            )}
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
        </section>

        <section>
          <h4>认证信息</h4>
          <div className="form-group row">
            <label
              htmlFor="favcp"
              className="form-label-required col-sm-3 col-form-label"
            >
              你最喜欢的CP
            </label>
            <input
              className="form-control col-sm-9"
              type="text"
              id="favcp"
              name="favcp"
              onChange={(e) => setFavcp(e.target.value)}
              required
            />
          </div>
          <div className="form-group row">
            <label
              htmlFor="favcpreason"
              className="form-label-required  col-sm-3 col-form-label"
            >
              简述理由
            </label>
            <textarea
              className="form-control col-sm-9"
              id="favcpreason"
              name="favcpreason"
              onChange={(e) => setFavcpreason(e.target.value)}
              required
              cols="30"
              rows="2"
            />
          </div>
          <div className="form-group row">
            <label
              htmlFor="favcharacter"
              className="form-label-required  col-sm-3 col-form-label"
            >
              你最喜欢的角色
            </label>
            <input
              className="form-control col-sm-9"
              type="text"
              id="favcharacter"
              name="favcharacter"
              onChange={(e) => setFavcharacter(e.target.value)}
              required
            />
          </div>
          <div className="form-group row">
            <label
              htmlFor="favcharacterreason"
              className="form-label-required  col-sm-3 col-form-label"
            >
              给出三个理由
            </label>
            <textarea
              className="form-control col-sm-9"
              id="favcharacterreason"
              name="favcharacterreason"
              onChange={(e) => setFavcharacterreason(e.target.value)}
              required
              cols="30"
              rows="3"
            />
          </div>
        </section>
        <button
          type="submit"
          className="btn btn-primary"
          disabled={createUserFn.loading || sendEmailFn.loading}
        >
          {createUserFn.loading || sendEmailFn.loading ? "加载中" : "注册"}
        </button>
      </form>
      {createUserFn.error && (
        <div className="error-msg mt-1">{createUserFn.error}</div>
      )}
      {sendEmailFn.error && (
        <div className="error-msg mt-1">{sendEmailFn.error}</div>
      )}
    </div>
  );
};

export default RegisterPage;
