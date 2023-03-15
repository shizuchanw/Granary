import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import SearchResultComponent from "../components/search/SearchResultComponent";
import { getArticlesByAuthor } from "../utils/articleAPI";

const AuthorPage = () => {
  const [results, setResults] = useState([]);
  const { authorID } = useParams();

  useEffect(() => {
    getArticlesByAuthor(authorID).then(setResults);
  }, []);

  return (
    <div className="container search-result-box">
      <h1 className="search-result-title">
        {results &&
          results[0] &&
          results[0]["username"] + "的作品：" + results.length + "件"}
        {(!results || !results[0]) && "该用户尚未发表作品。"}
      </h1>
      <ul>
        {results.map((ele) => (
          <SearchResultComponent result={ele} key={ele.id} />
        ))}
      </ul>
    </div>
  );
};

export default AuthorPage;
