import React from "react";
import { Link } from "react-router-dom";

const SearchResultComponent = ({ result }) => {
  return (
    <li className="search-result-component" key={result.id}>
      <h3 className="search-result-component-title">
        <Link to={"/article/" + result.id}>{result.title}</Link>&ensp;
        <span>
          作者: <Link to={"/author/" + result.creator}>{result.username}</Link>
        </span>
      </h3>
      <div className="search-result-component-tags">
        <span className="grading-tag">
          分级:
          <a href={"/tag/grading/" + result.grading}>
            {result.grading === "G" ? "G(清水)" : result.grading}
          </a>
        </span>
        <span>
          原作:
          {result.fandoms.map((ele, i) => (
            <a className="tag" key={i} href={"/tag/fandom/" + ele}>
              {ele}
            </a>
          ))}
        </span>
        <span>
          CP:
          {result.cps.map((ele, i) => (
            <a className="tag" key={i} href={"/tag/cp/" + ele}>
              {ele}
            </a>
          ))}
        </span>
        <span>
          角色:
          {result.characters.map((ele, i) => (
            <a className="tag" key={i} href={"/tag/character/" + ele}>
              {ele}
            </a>
          ))}
        </span>
        <span>
          其它tag:{" "}
          {result.tags.map((ele, i) => (
            <a className="tag" key={i} href={"/tag/othertag/" + ele}>
              {ele}
            </a>
          ))}
        </span>
      </div>
      <hr />
      {/* 简介 */}
      <div>{result.description}</div>
      <div className="stats">
        字数: {result.word_count} &ensp;喜欢: {result.like_count} &ensp;收藏:
        {result.bookmark_count}
      </div>
    </li>
  );
};

export default SearchResultComponent;
