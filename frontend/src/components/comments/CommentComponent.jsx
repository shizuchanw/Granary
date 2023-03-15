import React, { useState } from "react";
import { Link } from "react-router-dom";
import { dateFormat } from "../../utils/utils";
import { IconBtn } from "./IconBtn";
import { FaEdit, FaReply, FaTrash } from "react-icons/fa";
import { useArticle } from "../../contexts/ArticleContext";
import CommentList from "./CommentList";
import CommentForm from "./CommentForm";
import { useAsyncFn } from "../../hooks/useAsync";
import {
  createComment,
  updateComment,
  deleteComment,
} from "../../utils/commentsAPI";

const CommentComponent = ({
  id,
  creator,
  username,
  content,
  createdTime,
  lastEditTime,
}) => {
  const {
    article,
    getReplies,
    createLocalComment,
    updateLocalComment,
    deleteLocalComment,
  } = useArticle();
  const [areChildrenHidden, setAreChildrenHidden] = useState(false);
  const [isReplying, setIsReplying] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const createCommentFn = useAsyncFn(createComment);
  const updateCommentFn = useAsyncFn(updateComment);
  const deleteCommentFn = useAsyncFn(deleteComment);
  const childComments = getReplies(id);

  function onCommentReply(message) {
    return createCommentFn
      .execute({ articleID: article.id, message, parentID: id })
      .then((comment) => {
        setIsReplying(false);
        createLocalComment(comment);
      });
  }

  function onCommentUpdate(message) {
    return updateCommentFn
      .execute({ articleID: article.id, message, id })
      .then((comment) => {
        setIsEditing(false);
        updateLocalComment(id, comment.message);
      });
  }

  function onCommentDelete() {
    if (window.confirm("确认要删除这条评论吗？")) {
      return deleteCommentFn
        .execute(id)
        .then((comment) => deleteLocalComment(comment.id))
        .finally(() => window.location.reload());
    }
  }

  return (
    <>
      {/* ========================= main comment=========================== */}
      <div className="comment-commentbox">
        <div className="header">
          <Link to={"/author/" + creator}>{username}</Link>
          <span>{"发布时间：" + dateFormat(createdTime)}</span>
        </div>
        {isEditing ? (
          <CommentForm
            autoFocus
            initialValue={content}
            onSubmit={onCommentUpdate}
            loading={updateCommentFn.loading}
            error={updateCommentFn.error}
          />
        ) : (
          <div className="message">{content}</div>
        )}
        <div className="bottom">
          <IconBtn
            Icon={FaReply}
            onClick={() => setIsReplying((prev) => !prev)}
            isActive={isReplying}
            aria-label={isReplying ? "Cancel Reply" : "Reply"}
          />
          {creator == localStorage.getItem("userID") && (
            <>
              <IconBtn
                onClick={() => setIsEditing((prev) => !prev)}
                isActive={isEditing}
                Icon={FaEdit}
                aria-label={isEditing ? "Cancel Edit" : "Edit"}
              />
              <IconBtn
                disabled={deleteCommentFn.loading}
                onClick={onCommentDelete}
                Icon={FaTrash}
                aria-label="Delete"
                color="danger"
              />
            </>
          )}
          {lastEditTime != createdTime && (
            <p>{"上次修改：" + dateFormat(lastEditTime)}</p>
          )}
        </div>
        {deleteCommentFn.error && (
          <div className="error-msg mt-1">{deleteCommentFn.error}</div>
        )}
      </div>
      {isReplying && (
        <div className="mt-1 ml-3">
          <CommentForm
            autoFocus
            onSubmit={onCommentReply}
            loading={createCommentFn.loading}
            error={createCommentFn.error}
          />
        </div>
      )}
      {/* ========================= child comments=========================== */}
      {childComments?.length > 0 && (
        <>
          <div
            className={`nested-comments-stack ${
              areChildrenHidden ? "hide" : ""
            }`}
          >
            <button
              className="collapse-line"
              aria-label="Hide Replies"
              onClick={() => setAreChildrenHidden(true)}
            />
            <div className="nested-comments">
              <CommentList comments={childComments} />
            </div>
          </div>
          <button
            className={`btnn mt-1 ${!areChildrenHidden ? "hide" : ""}`}
            onClick={() => setAreChildrenHidden(false)}
          >
            展开
          </button>
        </>
      )}
    </>
  );
};

export default CommentComponent;
