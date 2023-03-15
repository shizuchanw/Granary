import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import SearchResultComponent from "../../components/search/SearchResultComponent";
import { getArticlesByAuthor } from "../../utils/articleAPI";
import { getUser } from "../../utils/authAPI";
import { useAsync, useAsyncFn } from "../../hooks/useAsync";

const MyArticlesPage = () => {
  const { loading, error, value: data } = useAsync(getUser);
  const getArticlesFn = useAsyncFn(getArticlesByAuthor);
  const [results, setResults] = useState([]);

  useEffect(() => {
    if (data == null) return;
    getArticlesFn.execute(data.id).then(setResults);
  }, [data]);

  if (loading) return <h2>加载中…</h2>;
  if (error) return <h2>error: {error}</h2>;
  if (!data) return <h2>请先登录。</h2>;

  return (
    <div className="container search-result-box">
      <h1 className="search-result-title">
        {"我的全部作品："}
        {results.length}件
      </h1>
      <Link to="/dashboard/new">
        <div className="btn">发布新文章</div>
      </Link>
      <ul>
        {results.map((ele) => (
          <SearchResultComponent result={ele} key={ele.id} />
        ))}
      </ul>
    </div>
  );
};

export default MyArticlesPage;
