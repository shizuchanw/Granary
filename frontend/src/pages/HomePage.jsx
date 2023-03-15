import React, { useState } from "react";

import HomeBannerComponent from "../components/HomeBannerComponent";
import SearchBarComponent from "../components/search/SearchBarComponent";
import SearchPrefComponent from "../components/search/filter/SearchPrefComponent";

const HomePage = () => {
  const [searchPrefPanelOpen, setSearchPrefPanelOpen] = useState(false);
  const [fandoms, setFandoms] = useState([]);
  const [cps, setCPs] = useState([]);
  const [characters, setCharacters] = useState([]);
  const [grading, setGrading] = useState("");
  const [tags, setTags] = useState([]);

  return (
    <div className="container homebox">
      <HomeBannerComponent />
      <SearchBarComponent
        fandoms={fandoms}
        cps={cps}
        tags={tags}
        characters={characters}
        grading={grading}
      />
      <button
        className="search-pref-button btn"
        onClick={() => {
          setSearchPrefPanelOpen(!searchPrefPanelOpen);
        }}
      >
        高级设置
      </button>
      {searchPrefPanelOpen && (
        <SearchPrefComponent
          setFandoms={setFandoms}
          setCPs={setCPs}
          setTags={setTags}
          setCharacters={setCharacters}
          setGrading={setGrading}
        />
      )}
    </div>
  );
};

export default HomePage;
