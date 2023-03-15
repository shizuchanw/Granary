import React, { useEffect, useState } from "react";
import SearchResultComponent from "../../components/search/SearchResultComponent";
import {
  getLikedArticles,
  getBookmarkedArticles,
} from "../../utils/articleAPI";

const LikedArticlePage = ({ liked }) => {
  const [results, setResults] = useState([]);

  useEffect(() => {
    if (liked) {
      getLikedArticles().then(setResults);
    } else {
      getBookmarkedArticles().then(setResults);
    }
  }, []);

  return (
    <div className="container search-result-box">
      <h1 className="search-result-title">
        {liked && "我喜欢的作品："}
        {!liked && "我收藏的作品："}
        {results.length}件
      </h1>
      <ul>
        {results.map((ele) => (
          <SearchResultComponent result={ele} key={ele.id} />
        ))}
      </ul>
    </div>
  );
};

export default LikedArticlePage;
