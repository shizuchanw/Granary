import React, { useState } from "react";

const CommentForm = ({
  loading,
  error,
  onSubmit,
  autoFocus = false,
  initialValue = "",
}) => {
  const [comment, setComment] = useState(initialValue);

  const HandleSubmit = (e) => {
    e.preventDefault();
    onSubmit(comment).then(() => setComment(""));
    window.location.reload();
  };

  return (
    <div>
      <form onSubmit={HandleSubmit} className="new-comment-box">
        <textarea
          autoFocus={autoFocus}
          className="comment"
          value={comment}
          placeholder={localStorage.getItem(
            "access_token" ? "留下你的评论…" : "note: 匿名用户评论后无法修改"
          )}
          onChange={(e) => {
            setComment(e.target.value);
          }}
          required
        />
        <button disabled={loading}>{loading ? "加载中" : "评论"}</button>
        <div className="error-msg">{error}</div>
      </form>
    </div>
  );
};

export default CommentForm;
