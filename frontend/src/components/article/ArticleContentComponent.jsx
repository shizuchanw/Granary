import React from "react";
import { Link } from "react-router-dom";
import parse from "html-react-parser";

const ArticleContent = ({ title, description, creator, username, content }) => {
  return (
    <div>
      <h1>{title}</h1>
      <p>
        作者：<Link to={"/author/" + creator}>{username}</Link>
      </p>
      <p>
        简介：<span>{description}</span>
      </p>
      <div className="article-content">{parse(content)}</div>
    </div>
  );
};

export default ArticleContent;
