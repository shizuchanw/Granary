import React, { useState } from "react";
import Select from "react-select";

const MultiFilterComponent = ({ data, setFilter, label }) => {
  const [input, setInput] = useState("");

  const options = data.map((ele) => ({
    value: ele,
    label: ele,
  }));

  return (
    <div>
      <label htmlFor="input">{label}: </label>
      <Select
        isMulti
        isClearable
        options={options}
        value={input}
        onChange={(value) => {
          setInput(value);
          setFilter(value.map((ele) => ele.value));
        }}
      />
    </div>
  );
};

export default MultiFilterComponent;
