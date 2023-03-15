import React from "react";
import MultiTagComponent from "./MultiTagComponent";
import SingleTagComponent from "./SingleTagComponent";
import { getAllTags } from "../../utils/articleAPI";
import { useAsync } from "../../hooks/useAsync";

const TaggingComponent = ({ ...props }) => {
  const { loading, error, value: data } = useAsync(getAllTags);
  if (loading) return <h2>加载中…</h2>;
  if (error) return <h2>error: {error}</h2>;
  return (
    <div>
      <MultiTagComponent
        required={true}
        data={data.fandoms}
        initialValue={props.fandoms}
        setTag={props.setFandoms}
        label="原作"
      />
      <MultiTagComponent
        required={true}
        data={data.cps}
        initialValue={props.cps}
        setTag={props.setCPs}
        label="CP"
      />
      <MultiTagComponent
        required={true}
        data={data.characters}
        initialValue={props.characters}
        setTag={props.setCharacters}
        label="角色"
      />
      <SingleTagComponent
        required={true}
        data={data.gradings}
        initialValue={props.grading}
        setTag={props.setGrading}
        label="分级"
      />
      <MultiTagComponent
        required={false}
        data={data.tags}
        initialValue={props.tags}
        setTag={props.setTags}
        label="其他tag"
      />
    </div>
  );
};

export default TaggingComponent;
