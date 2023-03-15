import React from "react";
import { Link } from "react-router-dom";

const ArticleInfo = ({ grading, fandoms, cps, characters, tags }) => {
  return (
    <div className="article-info">
      <div className="grading-tag">
        分级:
        <a href={"/tag/grading/" + grading}>
          {grading === "G" ? "G(清水)" : grading}
        </a>
      </div>
      <div>
        原作:
        {fandoms.map((ele, i) => (
          <a className="tag" key={i} href={"/tag/fandom/" + ele}>
            {ele}
          </a>
        ))}
      </div>
      <div>
        CP:
        {cps.map((ele, i) => (
          <a className="tag" key={i} href={"/tag/cp/" + ele}>
            {ele}
          </a>
        ))}
      </div>
      <div>
        角色:
        {characters.map((ele, i) => (
          <a className="tag" key={i} href={"/tag/character/" + ele}>
            {ele}
          </a>
        ))}
      </div>
      <div>
        其它tag:{" "}
        {tags.map((ele, i) => (
          <a className="tag" key={i} href={"/tag/othertag/" + ele}>
            {ele}
          </a>
        ))}
      </div>
    </div>
  );
};

export default ArticleInfo;
