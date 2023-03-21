import React, { useContext, useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { useAsync } from "../hooks/useAsync";
import { getArticle } from "../utils/articleAPI";
import { getComments } from "../utils/commentsAPI";

const Context = React.createContext();

export function useArticle() {
  return useContext(Context);
}

export function ArticleProvider({ children }) {
  const { id } = useParams();
  const {
    loading: loading_article,
    error: error_article,
    value: article,
  } = useAsync(() => getArticle(id), [id]);
  const {
    loading: loading_comments,
    error: error_comments,
    value: init_comments,
  } = useAsync(() => getComments(id), [id]);

  useEffect(() => {
    if (error_article == null) return;
    console.log(error_article);
  }, [error_article]);

  // ========== set up local comments ==========
  const [comments, setComments] = useState([]);
  const commentsByParentId = useMemo(() => {
    const group = {};
    comments.forEach((comment) => {
      group[comment.parent] ||= [];
      group[comment.parent].push(comment);
    });
    return group;
  }, [comments]);

  useEffect(() => {
    if (init_comments == null) return;
    setComments(init_comments);
  }, [init_comments]);

  // ========== comment functions ==========
  function getReplies(parentId) {
    return commentsByParentId[parentId];
  }

  function createLocalComment(comment) {
    setComments((prevComments) => {
      return [comment, ...prevComments];
    });
  }

  function updateLocalComment(id, message) {
    setComments((prevComments) => {
      return prevComments.map((comment) => {
        if (comment.id === id) {
          return { ...comment, message };
        } else {
          return comment;
        }
      });
    });
  }

  function deleteLocalComment(id) {
    setComments((prevComments) => {
      return prevComments.filter((comment) => comment.id !== id);
    });
  }

  return (
    <Context.Provider
      value={{
        article: { ...article },
        rootComments: commentsByParentId[null],
        getReplies,
        createLocalComment,
        updateLocalComment,
        deleteLocalComment,
      }}
    >
      {loading_article || loading_comments ? (
        <h2>加载中…</h2>
      ) : error_article || error_comments ? (
        <div className="screenFiller ">
          {error_article ? <h2>{error_article}</h2> : ""}{" "}
          {error_comments ? <h2>{error_comments}</h2> : ""}
        </div>
      ) : (
        children
      )}
    </Context.Provider>
  );
}
