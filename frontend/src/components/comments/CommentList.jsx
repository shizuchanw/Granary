import React from "react";
import CommentComponent from "./CommentComponent";

const CommentList = ({ comments, article }) => {
  return (
    <>
      {comments !== undefined &&
        comments.map((ele, i) => <CommentComponent {...ele} key={i} />)}
    </>
  );
};

export default CommentList;
