import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import ArticleContent from "../components/article/ArticleContentComponent";
import ArticleInfo from "../components/article/ArticleInfoComponent";
import CommentList from "../components/comments/CommentList";
import CommentForm from "../components/comments/CommentForm";

import { IconBtn } from "../components/comments/IconBtn";
import {
  FaEdit,
  FaTrash,
  FaHeart,
  FaRegHeart,
  FaStar,
  FaRegStar,
} from "react-icons/fa";
import { useArticle } from "../contexts/ArticleContext";
import { createComment } from "../utils/commentsAPI";
import { toggleLike, toggleBookmark, deleteArticle } from "../utils/articleAPI";
import { useAsyncFn } from "../hooks/useAsync";

const ArticlePage = () => {
  const navigate = useNavigate();
  const { article, rootComments, createLocalComment } = useArticle();
  const [likedByMe, setLikedByMe] = useState(article?.liked_by_me);
  const [likedCount, setLikedCount] = useState(article?.like_count);
  const [markedByMe, setMarkedByMe] = useState(article?.bookmarked_by_me);
  const [markedCount, setMarkedCount] = useState(article?.bookmark_count);

  const createCommentFn = useAsyncFn(createComment);
  function onCommentCreate(message) {
    return createCommentFn
      .execute({ message, articleID: article.id })
      .then(createLocalComment);
  }

  const toggleLikeFn = useAsyncFn(toggleLike);
  function onToggleLike() {
    return toggleLikeFn.execute(article.id).then(() => {
      setLikedCount(likedByMe ? likedCount - 1 : likedCount + 1);
      setLikedByMe(!likedByMe);
    });
  }

  const toggleBookmarkFn = useAsyncFn(toggleBookmark);
  function onToggleBookmark() {
    if (localStorage.getItem("access_token") == null) {
      alert("收藏请先登录。");
      return;
    }
    return toggleBookmarkFn.execute(article.id).then(() => {
      setMarkedCount(markedByMe ? markedCount - 1 : markedCount + 1);
      setMarkedByMe(!markedByMe);
    });
  }

  function HandleDeleteArticle(message) {
    if (window.confirm("确认要删除这篇文章吗？")) {
      try {
        deleteArticle(article.id).then((res) => {
          alert("删除成功。");
          navigate("/");
        });
      } catch {
        alert("删除失败，请重新尝试。");
      }
    } else {
      console.log(article);
    }
  }

  return (
    <div className="container">
      {article && (
        <>
          <div className="article-main">
            <ArticleInfo {...article} />
            <ArticleContent {...article} />
            <div className="bottom">
              <IconBtn
                onClick={onToggleLike}
                disabled={toggleLikeFn.loading}
                Icon={likedByMe ? FaHeart : FaRegHeart}
                aria-label={likedByMe ? "Unlike" : "Like"}
              >
                {likedCount}
              </IconBtn>
              <IconBtn
                onClick={onToggleBookmark}
                disabled={toggleBookmarkFn.loading}
                Icon={markedByMe ? FaStar : FaRegStar}
                aria-label={markedByMe ? "UnBookmark" : "Bookmark"}
              >
                {markedCount}
              </IconBtn>
              {article.creator == localStorage.getItem("userID") && (
                <>
                  <IconBtn
                    onClick={() => navigate("/dashboard/edit/" + article.id)}
                    Icon={FaEdit}
                    aria-label="Edit"
                  />
                  <IconBtn
                    onClick={HandleDeleteArticle}
                    Icon={FaTrash}
                    aria-label="Delete"
                    color="danger"
                  />
                </>
              )}
            </div>
          </div>

          <div className="comment-section">
            <h3>评论区</h3>
            <hr />
            <CommentForm
              loading={createCommentFn.loading}
              error={createCommentFn.error}
              onSubmit={onCommentCreate}
            />
            <CommentList comments={rootComments} article={article.id} />
          </div>
        </>
      )}
    </div>
  );
};

export default ArticlePage;
