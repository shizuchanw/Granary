import React, { useState } from "react";
import { useSearchParams, useParams } from "react-router-dom";
import SearchResultComponent from "../components/search/SearchResultComponent";
import { getArticlesByTag, getArticlesByQuery } from "../utils/articleAPI";

const SearchResultPage = () => {
  const [results, setResults] = useState([]);
  const [params] = useSearchParams();
  const { tagType, tag } = useParams();
  const keywords = params.get("keywords");
  const error = "";

  if (tag) {
    getArticlesByTag(tag, tagType)
      .then(setResults)
      .catch((err) => {
        console.log(err);
      });
  } else {
    getArticlesByQuery(window.location.search)
      .then(setResults)
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <div className="container search-result-box">
      <h1 className="search-result-title">
        {keywords === null && 'tag"' + tag + '"下的搜索结果：'}
        {keywords === "" && "根据多个tag搜索的结果："}
        {keywords !== null &&
          keywords !== "" &&
          "搜索“" + keywords + "”的结果："}
        {results.length}件
      </h1>
      <h2>{error}</h2>
      <ul>
        {results.map((ele) => (
          <SearchResultComponent result={ele} key={ele.id} />
        ))}
      </ul>
    </div>
  );
};

export default SearchResultPage;
