import React from "react";
import MultiTagComponent from "./MultiFilterComponent";
import SingleTagComponent from "./SingleFilterComponent";
import { getAllTags } from "../../../utils/articleAPI";
import { useAsync } from "../../../hooks/useAsync";

const SearchPrefComponent = ({ ...props }) => {
  const { loading, error, value: data } = useAsync(getAllTags);
  if (loading) return <h2>加载中…</h2>;
  if (error) return <h2>error</h2>;
  return (
    <div className="search-pref">
      <MultiTagComponent
        data={data.fandoms}
        setFilter={props.setFandoms}
        label="原作"
      />
      <MultiTagComponent data={data.cps} setFilter={props.setCPs} label="CP" />
      <MultiTagComponent
        data={data.characters}
        setFilter={props.setCharacters}
        label="角色"
      />
      <MultiTagComponent
        data={data.tags}
        setFilter={props.setTags}
        label="其他tag"
      />
      <SingleTagComponent
        data={data.gradings}
        setFilter={props.setGrading}
        label="分级"
      />
    </div>
  );
};

export default SearchPrefComponent;
