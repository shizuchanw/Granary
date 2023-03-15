import React, { useState } from "react";
import { createSearchParams, useNavigate } from "react-router-dom";
import search_icon from "../../assets/search_icon.png";

const SearchBarComponent = ({ fandoms, cps, tags, characters, grading }) => {
  const navigate = useNavigate();
  const [keywords, setKeywords] = useState("");
  const keyword_required =
    fandoms.length === 0 &&
    cps.length === 0 &&
    tags.length === 0 &&
    characters.length === 0 &&
    grading === "";

  return (
    <form
      className="search-bar"
      onSubmit={() => {
        navigate({
          pathname: "/search",
          search: createSearchParams({
            keywords: keywords,
            fandoms: "[" + fandoms.join(",") + "]",
            cps: "[" + cps.join(",") + "]",
            characters: "[" + characters.join(",") + "]",
            grading: grading,
            tags: "[" + tags.join(",") + "]",
          }).toString(),
        });
      }}
    >
      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="搜索你想看的文"
          value={keywords}
          required={keyword_required}
          onChange={(e) => {
            setKeywords(e.target.value);
            // console.log(keywords);
          }}
        />

        <div className="input-group-append">
          <button className="btn btn-outline-secondary">
            <img src={search_icon} alt="search icon" />
          </button>
        </div>
      </div>
    </form>
  );
};

export default SearchBarComponent;
